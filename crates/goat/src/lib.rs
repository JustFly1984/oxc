#[cfg(feature = "full")]
mod compiler;

#[cfg(feature = "full")]
pub use compiler::{Compiler, CompilerInterface};

pub mod allocator {
    //! Memory arena allocator used by all other submodules.
    //!
    //! See the [`goat_allocator` module-level documentation](goat_allocator) for more information.
    #[doc(inline)]
    pub use goat_allocator::*;
}

pub mod ast {
    #[doc(inline)]
    pub use goat_ast::*;
}

#[cfg(feature = "ast_visit")]
pub mod ast_visit {
    #[doc(inline)]
    pub use goat_ast_visit::*;
}

pub mod diagnostics {
    //! Error data types and utilities for handling/reporting them.
    //!
    //! See the [`goat_diagnostics` module-level documentation](goat_diagnostics) for more information.
    #[doc(inline)]
    pub use goat_diagnostics::*;
}

pub mod parser {
    //! JavaScript/TypeScript parser.
    //!
    //! See the [`goat_parser` module-level documentation](goat_parser) for more information.
    #[doc(inline)]
    pub use goat_parser::*;
}

#[cfg(feature = "regular_expression")]
pub mod regular_expression {
    #[doc(inline)]
    pub use goat_regular_expression::*;
}

pub mod span {
    //! Source text Span and string types.
    //!
    //! See the [`goat_span` module-level documentation](goat_span) for more information.
    #[doc(inline)]
    pub use goat_span::*;
}

pub mod syntax {
    //! Common code for JavaScript Syntax
    //!
    //! See the [`goat_syntax` module-level documentation](goat_syntax) for more information.
    #[doc(inline)]
    pub use goat_syntax::*;
}

#[cfg(feature = "semantic")]
pub mod semantic {
    //! Semantic analysis of a JavaScript/TypeScript program.
    //!
    //! See the [`goat_semantic` module-level documentation](goat_semantic) for more information.
    #[doc(inline)]
    pub use goat_semantic::*;
}

#[cfg(feature = "transformer")]
pub mod transformer {
    //! Transformer/Transpiler
    //!
    //! See the [`goat_transformer` module-level documentation](goat_transformer) for more
    //! information.
    #[doc(inline)]
    pub use goat_transformer::*;
}

#[cfg(feature = "transformer")]
pub mod transformer_plugins {
    //! Transformer/Transpiler
    //!
    //! See the [`goat_transformer_plugins` module-level documentation](goat_transformer_plugins) for more
    //! information.
    #[doc(inline)]
    pub use goat_transformer_plugins::*;
}

#[cfg(feature = "minifier")]
pub mod minifier {
    //! Source code minifier.
    //!
    //! See the [`goat_minifier` module-level documentation](goat_minifier) for more information.
    #[doc(inline)]
    pub use goat_minifier::*;
}

#[cfg(feature = "mangler")]
pub mod mangler {
    #[doc(inline)]
    pub use goat_mangler::*;
}

#[cfg(feature = "codegen")]
pub mod codegen {
    //! AST code printer
    //!
    //! See the [`goat_codegen` module-level documentation](goat_codegen) for more information.
    #[doc(inline)]
    pub use goat_codegen::*;
}

#[cfg(feature = "isolated_declarations")]
pub mod isolated_declarations {
    //! `.d.ts` emit for Isolated Declarations.
    //!
    //! See the [`goat_isolated_declarations` module-level documentation](goat_isolated_declarations)
    //! for more information.
    #[doc(inline)]
    pub use goat_isolated_declarations::*;
}

#[cfg(feature = "cfg")]
pub mod cfg {
    #[doc(inline)]
    pub use goat_cfg::*;
}
