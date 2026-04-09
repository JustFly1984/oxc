//! Native JSON/JSONC formatter for goatfmt.
//!
//! Formats JSON, JSONC (JSON with Comments), and JSON5 files
//! with Prettier-compatible output.

mod formatter;
mod options;
mod tokenizer;

pub use formatter::format;
pub use options::{JsonVariant, Options};
