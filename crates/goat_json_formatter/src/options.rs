/// Options for the JSON formatter.
#[derive(Debug, Clone)]
pub struct Options {
    /// Indentation string (e.g. "  " for 2 spaces, "\t" for tabs).
    pub indent_string: String,
    /// Whether to add trailing commas (JSON5 only).
    pub trailing_comma: bool,
    /// Use CRLF line endings instead of LF.
    pub crlf: bool,
    /// Append a trailing newline at end of file.
    pub trailing_newline: bool,
    /// JSON variant to format.
    pub variant: JsonVariant,
}

/// The JSON variant being formatted.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum JsonVariant {
    /// Standard JSON (no comments, no trailing commas).
    Json,
    /// JSON with Comments (preserves comments, strips trailing commas).
    Jsonc,
    /// JSON5 (preserves comments and trailing commas).
    Json5,
    /// `json-stringify` parser: like JSON but with specific Prettier formatting
    /// (e.g. always expand arrays/objects in package.json).
    JsonStringify,
}

impl Default for Options {
    fn default() -> Self {
        Self {
            indent_string: "  ".to_string(),
            trailing_comma: false,
            crlf: false,
            trailing_newline: true,
            variant: JsonVariant::Json,
        }
    }
}
