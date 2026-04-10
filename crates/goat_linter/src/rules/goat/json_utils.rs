use std::{
    ffi::OsStr,
    path::{Component, Path, PathBuf},
};

use goat_span::Span;

use crate::json_parser::{JsonObject, JsonProperty, JsonValue};

pub(super) fn is_json_file(path: &Path) -> bool {
    path.extension().is_some_and(|ext| ext == OsStr::new("json"))
}

pub(super) fn file_start_span(source_text: &str) -> Span {
    if source_text.is_empty() { Span::default() } else { Span::new(0, 1) }
}

/// Compute the span to delete for a JSON property, including its associated
/// comma and surrounding whitespace so that the remaining JSON stays valid.
#[expect(clippy::cast_possible_truncation)] // Span uses u32 by design
pub(super) fn property_deletion_span(
    source_text: &str,
    object: &JsonObject<'_>,
    prop: &JsonProperty<'_>,
    index: usize,
) -> Span {
    let prop_start = prop.span.start as usize;
    let prop_end = prop.span.end as usize;
    let obj_end = object.span.end as usize;

    // Try to consume trailing comma + whitespace
    let after = &source_text[prop_end..obj_end];
    let trimmed_after = after.trim_start();
    if trimmed_after.starts_with(',') {
        let comma_pos = prop_end + (after.len() - trimmed_after.len());
        let after_comma = &source_text[comma_pos + 1..obj_end];
        let ws_after_comma = after_comma.len() - after_comma.trim_start().len();
        return Span::new(prop_start as u32, (comma_pos + 1 + ws_after_comma) as u32);
    }

    // Last property — consume leading comma + whitespace before it
    if index > 0 {
        let prev_end = object.properties[index - 1].span.end as usize;
        let before = &source_text[prev_end..prop_start];
        let trimmed_before = before.trim_end();
        if trimmed_before.ends_with(',') {
            let comma_pos = prev_end + trimmed_before.len() - 1;
            return Span::new(comma_pos as u32, prop_end as u32);
        }
    }

    // Only property — just delete it
    Span::new(prop_start as u32, prop_end as u32)
}

fn join_object_path(parent: &str, key: &str) -> String {
    if parent.is_empty() { key.to_string() } else { format!("{parent}.{key}") }
}

fn join_array_path(parent: &str, index: usize) -> String {
    if parent.is_empty() { format!("[{index}]") } else { format!("{parent}[{index}]") }
}

fn display_path(path: &str) -> &str {
    if path.is_empty() { "<root>" } else { path }
}

pub(super) fn resolve_reference_path(current_file: &Path, raw_path: &str) -> PathBuf {
    let reference_path = Path::new(raw_path);
    if reference_path.is_absolute() {
        return normalize_path(reference_path);
    }

    let combined = current_file
        .parent()
        .map_or_else(|| reference_path.to_path_buf(), |parent| parent.join(reference_path));

    normalize_path(&combined)
}

fn normalize_path(path: &Path) -> PathBuf {
    let mut normalized = PathBuf::new();

    for component in path.components() {
        match component {
            Component::CurDir => {}
            Component::ParentDir => {
                if !normalized.pop() {
                    normalized.push(component.as_os_str());
                }
            }
            _ => normalized.push(component.as_os_str()),
        }
    }

    normalized
}

#[derive(Debug, Default)]
pub(super) struct JsonShapeDiff {
    pub missing: Vec<String>,
    pub extra: Vec<String>,
    pub type_mismatches: Vec<String>,
}

pub(super) fn compare_json_shapes(
    reference: &JsonValue<'_>,
    candidate: &JsonValue<'_>,
    path: &str,
    diff: &mut JsonShapeDiff,
) {
    match (reference, candidate) {
        (JsonValue::Object(reference), JsonValue::Object(candidate)) => {
            for ref_prop in &reference.properties {
                let child_path = join_object_path(path, ref_prop.key);
                match candidate.get(ref_prop.key) {
                    Some(candidate_value) => {
                        compare_json_shapes(&ref_prop.value, candidate_value, &child_path, diff);
                    }
                    None => diff.missing.push(child_path),
                }
            }

            for cand_prop in &candidate.properties {
                if reference.get(cand_prop.key).is_none() {
                    diff.extra.push(join_object_path(path, cand_prop.key));
                }
            }
        }
        (JsonValue::Array(reference), JsonValue::Array(candidate)) => {
            let shared_len = reference.elements.len().min(candidate.elements.len());
            for index in 0..shared_len {
                compare_json_shapes(
                    &reference.elements[index],
                    &candidate.elements[index],
                    &join_array_path(path, index),
                    diff,
                );
            }

            for index in shared_len..reference.elements.len() {
                diff.missing.push(join_array_path(path, index));
            }

            for index in shared_len..candidate.elements.len() {
                diff.extra.push(join_array_path(path, index));
            }
        }
        (JsonValue::Object(_) | JsonValue::Array(_), _)
        | (_, JsonValue::Object(_) | JsonValue::Array(_)) => {
            diff.type_mismatches.push(display_path(path).to_string());
        }
        _ => {}
    }
}

#[cfg(test)]
mod test {
    use std::path::Path;

    use goat_span::Span;

    use super::*;
    use crate::json_parser::{JsonArray, JsonObject, JsonProperty};

    #[test]
    fn test_is_json_file() {
        assert!(is_json_file(Path::new("foo.json")));
        assert!(is_json_file(Path::new("/a/b/c.json")));
        assert!(!is_json_file(Path::new("foo.jsonc")));
        assert!(!is_json_file(Path::new("foo.js")));
        assert!(!is_json_file(Path::new("foo")));
    }

    #[test]
    fn test_file_start_span() {
        assert_eq!(file_start_span(""), Span::default());
        assert_eq!(file_start_span("x"), Span::new(0, 1));
        assert_eq!(file_start_span("hello"), Span::new(0, 1));
    }

    #[test]
    fn test_resolve_reference_path_absolute() {
        let result = resolve_reference_path(Path::new("/a/b/c.json"), "/x/y/z.json");
        assert_eq!(result, Path::new("/x/y/z.json"));
    }

    #[test]
    fn test_resolve_reference_path_relative() {
        let result = resolve_reference_path(Path::new("/a/b/c.json"), "./d.json");
        assert_eq!(result, Path::new("/a/b/d.json"));
    }

    #[test]
    fn test_resolve_reference_path_parent() {
        let result = resolve_reference_path(Path::new("/a/b/c.json"), "../d.json");
        assert_eq!(result, Path::new("/a/d.json"));
    }

    #[test]
    fn test_normalize_path() {
        assert_eq!(normalize_path(Path::new("/a/b/../c")), Path::new("/a/c"));
        assert_eq!(normalize_path(Path::new("/a/./b/c")), Path::new("/a/b/c"));
        assert_eq!(normalize_path(Path::new("/a/b/c/../..")), Path::new("/a"));
    }

    #[test]
    fn test_join_object_path() {
        assert_eq!(join_object_path("", "key"), "key");
        assert_eq!(join_object_path("root", "key"), "root.key");
    }

    #[test]
    fn test_join_array_path() {
        assert_eq!(join_array_path("", 0), "[0]");
        assert_eq!(join_array_path("arr", 2), "arr[2]");
    }

    #[test]
    fn test_display_path() {
        assert_eq!(display_path(""), "<root>");
        assert_eq!(display_path("foo"), "foo");
    }

    #[test]
    fn test_compare_json_shapes_matching_scalars() {
        let a = JsonValue::String("hello", Span::new(0, 7));
        let b = JsonValue::String("world", Span::new(0, 7));
        let mut diff = JsonShapeDiff::default();
        compare_json_shapes(&a, &b, "", &mut diff);
        assert!(diff.missing.is_empty());
        assert!(diff.extra.is_empty());
        assert!(diff.type_mismatches.is_empty());
    }

    #[test]
    fn test_compare_json_shapes_type_mismatch() {
        let a = JsonValue::Object(JsonObject { properties: vec![], span: Span::new(0, 2) });
        let b = JsonValue::String("x", Span::new(0, 3));
        let mut diff = JsonShapeDiff::default();
        compare_json_shapes(&a, &b, "root", &mut diff);
        assert_eq!(diff.type_mismatches, vec!["root"]);
    }

    #[test]
    fn test_compare_json_shapes_missing_and_extra_keys() {
        let ref_obj = JsonValue::Object(JsonObject {
            properties: vec![JsonProperty {
                key: "a",
                key_span: Span::new(1, 4),
                value: JsonValue::Null(Span::new(6, 10)),
                span: Span::new(1, 10),
            }],
            span: Span::new(0, 11),
        });
        let cand_obj = JsonValue::Object(JsonObject {
            properties: vec![JsonProperty {
                key: "b",
                key_span: Span::new(1, 4),
                value: JsonValue::Null(Span::new(6, 10)),
                span: Span::new(1, 10),
            }],
            span: Span::new(0, 11),
        });
        let mut diff = JsonShapeDiff::default();
        compare_json_shapes(&ref_obj, &cand_obj, "", &mut diff);
        assert_eq!(diff.missing, vec!["a"]);
        assert_eq!(diff.extra, vec!["b"]);
    }

    #[test]
    fn test_compare_json_shapes_array_length_diff() {
        let ref_arr = JsonValue::Array(JsonArray {
            elements: vec![
                JsonValue::Null(Span::new(1, 5)),
                JsonValue::Null(Span::new(7, 11)),
            ],
            span: Span::new(0, 12),
        });
        let cand_arr = JsonValue::Array(JsonArray {
            elements: vec![JsonValue::Null(Span::new(1, 5))],
            span: Span::new(0, 6),
        });
        let mut diff = JsonShapeDiff::default();
        compare_json_shapes(&ref_arr, &cand_arr, "arr", &mut diff);
        assert_eq!(diff.missing, vec!["arr[1]"]);
        assert!(diff.extra.is_empty());
    }

    #[test]
    fn test_property_deletion_span_trailing_comma() {
        //                    0123456789012345678
        let source_text = r#"{ "a": 1, "b": 2 }"#;
        let obj = JsonObject {
            properties: vec![
                JsonProperty {
                    key: "a",
                    key_span: Span::new(2, 5),
                    value: JsonValue::Number("1", Span::new(7, 8)),
                    span: Span::new(2, 8),
                },
                JsonProperty {
                    key: "b",
                    key_span: Span::new(10, 13),
                    value: JsonValue::Number("2", Span::new(15, 16)),
                    span: Span::new(10, 16),
                },
            ],
            span: Span::new(0, 18),
        };
        // Deleting first property should consume the trailing comma + whitespace
        let span = property_deletion_span(source_text, &obj, &obj.properties[0], 0);
        assert!(span.start <= obj.properties[0].span.start);
        assert!(span.end > obj.properties[0].span.end);
    }

    #[test]
    fn test_property_deletion_span_only_property() {
        let source_text = r#"{ "a": 1 }"#;
        let obj = JsonObject {
            properties: vec![JsonProperty {
                key: "a",
                key_span: Span::new(2, 5),
                value: JsonValue::Number("1", Span::new(7, 8)),
                span: Span::new(2, 8),
            }],
            span: Span::new(0, 10),
        };
        let span = property_deletion_span(source_text, &obj, &obj.properties[0], 0);
        assert_eq!(span, Span::new(2, 8));
    }
}
