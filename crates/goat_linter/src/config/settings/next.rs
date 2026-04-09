use std::borrow::Cow;

use schemars::JsonSchema;
use serde::{Deserialize, Serialize, Serializer};

/// Configure Next.js plugin rules.
#[derive(Debug, Clone, Deserialize, Default, Serialize, JsonSchema, PartialEq)]
pub struct NextPluginSettings {
    /// The root directory of the Next.js project.
    ///
    /// This is particularly useful when you have a monorepo and your Next.js
    /// project is in a subfolder.
    ///
    /// Example:
    ///
    /// ```json
    /// {
    ///   "settings": {
    ///     "next": {
    ///       "rootDir": "apps/dashboard/"
    ///     }
    ///   }
    /// }
    /// ```
    #[serde(default)]
    #[serde(rename = "rootDir")]
    root_dir: OneOrMany<String>,
}

impl NextPluginSettings {
    pub fn get_root_dirs(&self) -> Cow<'_, [String]> {
        match &self.root_dir {
            OneOrMany::One(val) => Cow::Owned(vec![val.clone()]),
            OneOrMany::Many(vec) => Cow::Borrowed(vec),
        }
    }
}

// Deserialize helper types

#[derive(Clone, Debug, Deserialize, PartialEq, JsonSchema)]
#[serde(untagged)]
enum OneOrMany<T> {
    One(T),
    Many(Vec<T>),
}

impl<T> Default for OneOrMany<T> {
    fn default() -> Self {
        OneOrMany::Many(Vec::new())
    }
}

impl<T: Serialize> Serialize for OneOrMany<T> {
    fn serialize<S: Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        match self {
            Self::One(val) => val.serialize(serializer),
            Self::Many(vec) => vec.serialize(serializer),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_single_root_dir() {
        let settings: NextPluginSettings =
            serde_json::from_str(r#"{ "rootDir": "apps/web" }"#).unwrap();
        let dirs = settings.get_root_dirs();
        assert_eq!(dirs.as_ref(), &["apps/web".to_string()]);
    }

    #[test]
    fn test_multiple_root_dirs() {
        let settings: NextPluginSettings =
            serde_json::from_str(r#"{ "rootDir": ["apps/web", "apps/docs"] }"#).unwrap();
        let dirs = settings.get_root_dirs();
        assert_eq!(dirs.as_ref(), &["apps/web".to_string(), "apps/docs".to_string()]);
    }

    #[test]
    fn test_default_root_dir() {
        let settings: NextPluginSettings = serde_json::from_str(r"{}").unwrap();
        let dirs = settings.get_root_dirs();
        assert!(dirs.is_empty());
    }

    #[test]
    fn test_empty_array_root_dir() {
        let settings: NextPluginSettings =
            serde_json::from_str(r#"{ "rootDir": [] }"#).unwrap();
        let dirs = settings.get_root_dirs();
        assert!(dirs.is_empty());
    }

    #[test]
    fn test_roundtrip_single() {
        let settings: NextPluginSettings =
            serde_json::from_str(r#"{ "rootDir": "apps/web" }"#).unwrap();
        let serialized = serde_json::to_string(&settings).unwrap();
        let deserialized: NextPluginSettings = serde_json::from_str(&serialized).unwrap();
        assert_eq!(settings, deserialized);
    }

    #[test]
    fn test_roundtrip_many() {
        let settings: NextPluginSettings =
            serde_json::from_str(r#"{ "rootDir": ["a", "b"] }"#).unwrap();
        let serialized = serde_json::to_string(&settings).unwrap();
        let deserialized: NextPluginSettings = serde_json::from_str(&serialized).unwrap();
        assert_eq!(settings, deserialized);
    }

    #[test]
    fn test_unknown_fields_rejected() {
        // NextPluginSettings doesn't have deny_unknown_fields, so this should pass
        // but OneOrMany<String> should handle only strings
        let result = serde_json::from_str::<NextPluginSettings>(r#"{ "rootDir": 42 }"#);
        assert!(result.is_err());
    }
}
