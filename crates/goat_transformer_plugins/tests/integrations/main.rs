mod inject_global_variables;
mod replace_global_defines;

use goat_allocator::Allocator;
use goat_codegen::{Codegen, CodegenOptions};
use goat_parser::Parser;
use goat_span::SourceType;

/// # Panics
/// Panics if there are parse errors.
pub fn codegen(source_text: &str, source_type: SourceType) -> String {
    let allocator = Allocator::default();
    let ret = Parser::new(&allocator, source_text, source_type).parse();
    assert!(ret.errors.is_empty());
    Codegen::new()
        .with_options(CodegenOptions { single_quote: true, ..CodegenOptions::default() })
        .build(&ret.program)
        .code
}
