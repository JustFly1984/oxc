use crate::options::Options;
use crate::tokenizer::{Token, tokenize};

/// Format a JSON/JSONC/JSON5 source string according to the given options.
///
/// Returns the formatted string, or an error message on parse failure.
pub fn format(source: &str, options: Options) -> Result<String, String> {
    let tokens = tokenize(source)?;
    let eol = if options.crlf { "\r\n" } else { "\n" };

    let mut output = String::with_capacity(source.len());
    let mut depth: usize = 0;
    let len = tokens.len();
    let mut i = 0;

    // Collect leading comments
    while i < len && is_comment(&tokens[i]) {
        write_comment(&mut output, &tokens[i], &options, depth, eol);
        output.push_str(eol);
        i += 1;
    }

    while i < len {
        let token = &tokens[i];
        match token {
            Token::ObjectStart | Token::ArrayStart => {
                let is_object = matches!(token, Token::ObjectStart);
                let open = if is_object { "{" } else { "[" };

                // Collect any comments after the opening bracket
                let mut inner_comments = Vec::new();
                let mut j = i + 1;
                while j < len && is_comment(&tokens[j]) {
                    inner_comments.push(j);
                    j += 1;
                }

                // Check if the container is empty (possibly with only comments)
                let closing = if is_object { Token::ObjectEnd } else { Token::ArrayEnd };
                if j < len && tokens[j] == closing {
                    if inner_comments.is_empty() {
                        // Empty container: `{}` or `[]`
                        output.push_str(if is_object { "{}" } else { "[]" });
                        i = j + 1;
                    } else {
                        // Container with only comments
                        output.push_str(open);
                        depth += 1;
                        for &ci in &inner_comments {
                            output.push_str(eol);
                            write_comment(&mut output, &tokens[ci], &options, depth, eol);
                        }
                        output.push_str(eol);
                        depth -= 1;
                        write_indent(&mut output, &options, depth);
                        output.push_str(if is_object { "}" } else { "]" });
                        i = j + 1;
                    }
                } else {
                    // Non-empty container: always expand (Prettier behavior)
                    output.push_str(open);
                    depth += 1;

                    // Write comments that appeared right after opening bracket
                    for &ci in &inner_comments {
                        output.push_str(eol);
                        write_comment(&mut output, &tokens[ci], &options, depth, eol);
                    }

                    i = j;
                    // Format the container contents
                    i = format_container_contents(
                        &tokens,
                        i,
                        len,
                        &mut output,
                        &options,
                        depth,
                        eol,
                        is_object,
                    );

                    // Closing bracket
                    output.push_str(eol);
                    depth -= 1;
                    write_indent(&mut output, &options, depth);
                    output.push_str(if is_object { "}" } else { "]" });

                    // Skip closing bracket token
                    if i < len && tokens[i] == closing {
                        i += 1;
                    }
                }
            }
            Token::LineComment(_) | Token::BlockComment(_) => {
                write_comment(&mut output, token, &options, depth, eol);
                output.push_str(eol);
                i += 1;
            }
            _ => {
                // Top-level value (rare but valid for JSON)
                write_value(&mut output, token);
                i += 1;
            }
        }
    }

    // Trailing newline
    if options.trailing_newline && !output.ends_with('\n') {
        output.push_str(eol);
    } else if !options.trailing_newline {
        let trimmed_len = output.trim_end().len();
        output.truncate(trimmed_len);
    }

    Ok(output)
}

/// Format the contents of an object or array (between `{`/`[` and `}`/`]`).
/// Returns the index pointing at the closing bracket.
#[expect(clippy::too_many_arguments)]
fn format_container_contents(
    tokens: &[Token<'_>],
    mut i: usize,
    len: usize,
    output: &mut String,
    options: &Options,
    depth: usize,
    eol: &str,
    is_object: bool,
) -> usize {
    let closing = if is_object { Token::ObjectEnd } else { Token::ArrayEnd };
    let mut first = true;

    while i < len && tokens[i] != closing {
        // Skip commas (we control comma placement)
        if tokens[i] == Token::Comma {
            i += 1;
            // Collect trailing comments after comma
            while i < len && is_inline_block_comment(&tokens[i]) {
                output.push(' ');
                write_comment(output, &tokens[i], options, depth, eol);
                i += 1;
            }
            continue;
        }

        // Skip standalone comments
        if is_comment(&tokens[i]) {
            if !first {
                output.push(',');
            }
            output.push_str(eol);
            write_comment(output, &tokens[i], options, depth, eol);
            i += 1;
            // Reset first since we already have content
            first = false;
            continue;
        }

        // Add comma for non-first elements
        if !first {
            output.push(',');
        }
        first = false;

        output.push_str(eol);
        write_indent(output, options, depth);

        if is_object {
            // Key
            write_value(output, &tokens[i]);
            i += 1;

            // Colon
            if i < len && tokens[i] == Token::Colon {
                i += 1;
            }
            output.push_str(": ");

            // Skip comments between colon and value
            while i < len && is_comment(&tokens[i]) {
                write_comment(output, &tokens[i], options, depth, eol);
                output.push_str(eol);
                write_indent(output, options, depth);
                i += 1;
            }

            // Value
            i = format_value(tokens, i, len, output, options, depth, eol);
        } else {
            // Array element value
            i = format_value(tokens, i, len, output, options, depth, eol);
        }

        // Collect trailing inline comments
        while i < len && is_inline_block_comment(&tokens[i]) {
            output.push(' ');
            write_comment(output, &tokens[i], options, depth, eol);
            i += 1;
        }
    }

    // Handle trailing comma for JSON5
    // For JSON/JSONC, no trailing comma
    // Prettier doesn't add trailing commas in JSON

    i
}

/// Format a single value (which may be a nested object/array).
/// Returns the index after the value.
fn format_value(
    tokens: &[Token<'_>],
    i: usize,
    len: usize,
    output: &mut String,
    options: &Options,
    depth: usize,
    eol: &str,
) -> usize {
    if i >= len {
        return i;
    }

    match &tokens[i] {
        Token::ObjectStart => {
            let mut inner_depth = depth;
            // Check if empty
            let mut j = i + 1;
            // Skip comments
            let mut inner_comments = Vec::new();
            while j < len && is_comment(&tokens[j]) {
                inner_comments.push(j);
                j += 1;
            }

            if j < len && tokens[j] == Token::ObjectEnd {
                if inner_comments.is_empty() {
                    output.push_str("{}");
                    return j + 1;
                }
                output.push('{');
                inner_depth += 1;
                for &ci in &inner_comments {
                    output.push_str(eol);
                    write_comment(output, &tokens[ci], options, inner_depth, eol);
                }
                output.push_str(eol);
                write_indent(output, options, depth);
                output.push('}');
                return j + 1;
            }

            output.push('{');
            inner_depth += 1;

            for &ci in &inner_comments {
                output.push_str(eol);
                write_comment(output, &tokens[ci], options, inner_depth, eol);
            }

            let next_i =
                format_container_contents(tokens, j, len, output, options, inner_depth, eol, true);

            output.push_str(eol);
            write_indent(output, options, depth);
            output.push('}');

            if next_i < len && tokens[next_i] == Token::ObjectEnd { next_i + 1 } else { next_i }
        }
        Token::ArrayStart => {
            let mut inner_depth = depth;
            let mut j = i + 1;
            let mut inner_comments = Vec::new();
            while j < len && is_comment(&tokens[j]) {
                inner_comments.push(j);
                j += 1;
            }

            if j < len && tokens[j] == Token::ArrayEnd {
                if inner_comments.is_empty() {
                    output.push_str("[]");
                    return j + 1;
                }
                output.push('[');
                inner_depth += 1;
                for &ci in &inner_comments {
                    output.push_str(eol);
                    write_comment(output, &tokens[ci], options, inner_depth, eol);
                }
                output.push_str(eol);
                write_indent(output, options, depth);
                output.push(']');
                return j + 1;
            }

            output.push('[');
            inner_depth += 1;

            for &ci in &inner_comments {
                output.push_str(eol);
                write_comment(output, &tokens[ci], options, inner_depth, eol);
            }

            let next_i =
                format_container_contents(tokens, j, len, output, options, inner_depth, eol, false);

            output.push_str(eol);
            write_indent(output, options, depth);
            output.push(']');

            if next_i < len && tokens[next_i] == Token::ArrayEnd { next_i + 1 } else { next_i }
        }
        _ => {
            write_value(output, &tokens[i]);
            i + 1
        }
    }
}

fn write_value(output: &mut String, token: &Token<'_>) {
    match token {
        Token::String(s) => output.push_str(s),
        Token::Number(n) => output.push_str(n),
        Token::Keyword(k) => output.push_str(k),
        Token::Identifier(id) => output.push_str(id),
        _ => {}
    }
}

fn write_indent(output: &mut String, options: &Options, depth: usize) {
    for _ in 0..depth {
        output.push_str(&options.indent_string);
    }
}

fn write_comment(
    output: &mut String,
    token: &Token<'_>,
    options: &Options,
    depth: usize,
    _eol: &str,
) {
    match token {
        Token::LineComment(c) => {
            write_indent(output, options, depth);
            output.push_str(c);
        }
        Token::BlockComment(c) => {
            write_indent(output, options, depth);
            output.push_str(c);
        }
        _ => {}
    }
}

fn is_comment(token: &Token<'_>) -> bool {
    matches!(token, Token::LineComment(_) | Token::BlockComment(_))
}

fn is_inline_block_comment(token: &Token<'_>) -> bool {
    matches!(token, Token::BlockComment(c) if !c.contains('\n'))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn fmt(source: &str) -> String {
        format(source, Options::default()).unwrap()
    }

    fn fmt_jsonc(source: &str) -> String {
        format(
            source,
            Options { variant: crate::options::JsonVariant::Jsonc, ..Options::default() },
        )
        .unwrap()
    }

    #[test]
    fn test_empty_object() {
        assert_eq!(fmt("{}"), "{}\n");
    }

    #[test]
    fn test_empty_array() {
        assert_eq!(fmt("[]"), "[]\n");
    }

    #[test]
    fn test_simple_object() {
        assert_eq!(fmt(r#"{"a":1,"b":"hello"}"#), "{\n  \"a\": 1,\n  \"b\": \"hello\"\n}\n");
    }

    #[test]
    fn test_simple_array() {
        assert_eq!(fmt("[1,2,3]"), "[\n  1,\n  2,\n  3\n]\n");
    }

    #[test]
    fn test_nested() {
        let input = r#"{"a":{"b":[1,2]}}"#;
        let expected = "{\n  \"a\": {\n    \"b\": [\n      1,\n      2\n    ]\n  }\n}\n";
        assert_eq!(fmt(input), expected);
    }

    #[test]
    fn test_already_formatted() {
        let input = "{\n  \"a\": 1\n}\n";
        assert_eq!(fmt(input), input);
    }

    #[test]
    fn test_jsonc_with_line_comments() {
        let input = r#"{
// This is a comment
"a": 1
}"#;
        let result = fmt_jsonc(input);
        assert!(result.contains("// This is a comment"));
        assert!(result.contains("\"a\": 1"));
    }

    #[test]
    fn test_jsonc_with_block_comments() {
        let input = r#"{
/* block comment */
"a": 1
}"#;
        let result = fmt_jsonc(input);
        assert!(result.contains("/* block comment */"));
    }

    #[test]
    fn test_tabs() {
        let result = format(
            r#"{"a": 1}"#,
            Options { indent_string: "\t".to_string(), ..Options::default() },
        )
        .unwrap();
        assert_eq!(result, "{\n\t\"a\": 1\n}\n");
    }

    #[test]
    fn test_crlf() {
        let result = format(r#"{"a": 1}"#, Options { crlf: true, ..Options::default() }).unwrap();
        assert_eq!(result, "{\r\n  \"a\": 1\r\n}\r\n");
    }

    #[test]
    fn test_no_trailing_newline() {
        let result =
            format(r#"{"a": 1}"#, Options { trailing_newline: false, ..Options::default() })
                .unwrap();
        assert_eq!(result, "{\n  \"a\": 1\n}");
    }

    #[test]
    fn test_null_value() {
        assert_eq!(fmt(r#"{"a": null}"#), "{\n  \"a\": null\n}\n");
    }

    #[test]
    fn test_boolean_values() {
        assert_eq!(fmt(r#"{"t": true, "f": false}"#), "{\n  \"t\": true,\n  \"f\": false\n}\n");
    }

    #[test]
    fn test_string_escapes() {
        assert_eq!(fmt(r#"{"a": "hello \"world\""}"#), "{\n  \"a\": \"hello \\\"world\\\"\"\n}\n");
    }

    #[test]
    fn test_trailing_commas_in_input() {
        // Input has trailing commas; formatter should handle gracefully
        let input = r#"{"a": 1, "b": 2,}"#;
        let result = fmt(input);
        assert_eq!(result, "{\n  \"a\": 1,\n  \"b\": 2\n}\n");
    }

    #[test]
    fn test_deeply_nested() {
        let input = r#"{"a":{"b":{"c":{"d": 1}}}}"#;
        let expected = concat!(
            "{\n",
            "  \"a\": {\n",
            "    \"b\": {\n",
            "      \"c\": {\n",
            "        \"d\": 1\n",
            "      }\n",
            "    }\n",
            "  }\n",
            "}\n",
        );
        assert_eq!(fmt(input), expected);
    }
}
