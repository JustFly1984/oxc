//! # Oxc Minifier
//!
//! High-performance JavaScript/TypeScript minifier focused on maximum compression.
//!
//! ## Overview
//!
//! The Oxc minifier applies a comprehensive set of optimizations to JavaScript code
//! to achieve the smallest possible output while maintaining correctness. It draws
//! inspiration from industry-leading minifiers like Closure Compiler, Terser, esbuild,
//! and SWC.
//!
//! ## Features
//!
//! - **Maximum Compression**: Fixed-point iteration ensures all optimization opportunities are found
//! - **Comprehensive Optimizations**: 17+ transformation passes and growing
//! - **100% Correct**: Extensive testing with test262, Babel, and TypeScript test suites
//! - **Fast**: Efficient algorithms and arena allocation for performance
//!
//! ## Example
//!
//! ```rust
//! use goat_minifier::{Minifier, MinifierOptions};
//! use goat_allocator::Allocator;
//! use goat_parser::Parser;
//! use goat_span::SourceType;
//!
//! let allocator = Allocator::default();
//! let source_text = "const x = 1 + 1; console.log(x);";
//! let source_type = SourceType::mjs();
//! let ret = Parser::new(&allocator, source_text, source_type).parse();
//! let mut program = ret.program;
//!
//! let options = MinifierOptions::default();
//! let minifier = Minifier::new(options);
//! let result = minifier.minify(&allocator, &mut program);
//! ```
//!
//! ## Architecture
//!
//! The minifier consists of:
//! - **Compressor**: Orchestrates the optimization pipeline
//! - **Peephole Optimizations**: Individual transformation passes
//! - **Mangler**: Variable renaming for size reduction
//!
//! See the [crate documentation](https://github.com/goat-project/oxc/tree/main/crates/goat_minifier) for more details.

mod compressor;
pub(crate) mod generated;
mod keep_var;
mod minifier_traverse;
mod options;
mod peephole;
mod state;
mod symbol_value;
mod traverse_context;

use goat_allocator::Allocator;
use goat_ast::ast::Program;
use oxc_index::IndexVec;
use goat_mangler::Mangler;
use goat_semantic::{Scoping, SemanticBuilder};
use goat_span::CompactStr;
use goat_syntax::class::ClassId;
use rustc_hash::FxHashMap;

pub use goat_mangler::{MangleOptions, MangleOptionsKeepNames};

pub(crate) use crate::generated::traverse::Traverse;
#[doc(hidden)]
pub(crate) use crate::traverse_context::MinifierTraverseCtx as TraverseCtx;
pub(crate) use crate::traverse_context::ReusableMinifierTraverseCtx as ReusableTraverseCtx;
pub use crate::{compressor::Compressor, options::*};

#[derive(Debug, Clone)]
pub struct MinifierOptions {
    pub mangle: Option<MangleOptions>,
    pub compress: Option<CompressOptions>,
}

impl Default for MinifierOptions {
    fn default() -> Self {
        Self { mangle: Some(MangleOptions::default()), compress: Some(CompressOptions::default()) }
    }
}

pub struct MinifierReturn {
    pub scoping: Option<Scoping>,

    /// A vector where each element corresponds to a class in declaration order.
    /// Each element is a mapping from original private member names to their mangled names.
    pub class_private_mappings: Option<IndexVec<ClassId, FxHashMap<String, CompactStr>>>,

    /// Total number of iterations ran. Useful for debugging performance issues.
    pub iterations: u8,
}

pub struct Minifier {
    options: MinifierOptions,
}

impl<'a> Minifier {
    pub fn new(options: MinifierOptions) -> Self {
        Self { options }
    }

    pub fn minify(self, allocator: &'a Allocator, program: &mut Program<'a>) -> MinifierReturn {
        self.build(false, allocator, program)
    }

    pub fn dce(self, allocator: &'a Allocator, program: &mut Program<'a>) -> MinifierReturn {
        self.build(true, allocator, program)
    }

    fn build(
        self,
        dce: bool,
        allocator: &'a Allocator,
        program: &mut Program<'a>,
    ) -> MinifierReturn {
        let (stats, iterations) = self
            .options
            .compress
            .map(|options| {
                let semantic = SemanticBuilder::new().build(program).semantic;
                let stats = semantic.stats();
                let scoping = semantic.into_scoping();
                let compressor = Compressor::new(allocator);
                let iterations = if dce {
                    let options = CompressOptions {
                        target: options.target,
                        treeshake: options.treeshake,
                        ..CompressOptions::dce()
                    };
                    compressor.dead_code_elimination_with_scoping(program, scoping, options)
                } else {
                    compressor.build_with_scoping(program, scoping, options)
                };
                (stats, iterations)
            })
            .unwrap_or_default();
        let (scoping, class_private_mappings) = self
            .options
            .mangle
            .map(|options| {
                let mut semantic = SemanticBuilder::new().with_stats(stats).build(program).semantic;
                let class_private_mappings = Mangler::default()
                    .with_options(options)
                    .build_with_semantic(&mut semantic, program);
                (semantic.into_scoping(), class_private_mappings)
            })
            .map_or((None, None), |(scoping, mappings)| (Some(scoping), Some(mappings)));
        MinifierReturn { scoping, class_private_mappings, iterations }
    }
}
