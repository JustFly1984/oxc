use goat_ast::AstKind;
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn no_global_dirname_filename_diagnostic(span: Span, name: &str) -> GoatDiagnostic {
    GoatDiagnostic::warn(format!("Use `import.meta.{name}` instead of `{name}`."))
        .with_help(format!(
            "In ES modules, use `import.meta.{name}` instead of the CommonJS global `{name}`."
        ))
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct NoGlobalDirnameFilename;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Disallows the use of `__dirname` and `__filename` globals in ES modules.
    ///
    /// ### Why is this bad?
    ///
    /// `__dirname` and `__filename` are CommonJS globals that are not available
    /// in ES modules. Use `import.meta.dirname` and `import.meta.filename`
    /// instead (available in Node.js 20.11+).
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// const dir = __dirname;
    /// const file = __filename;
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// const dir = import.meta.dirname;
    /// const file = import.meta.filename;
    /// ```
    NoGlobalDirnameFilename,
    node,
    style,
    pending
);

impl Rule for NoGlobalDirnameFilename {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        if !ctx.source_type().is_module() {
            return;
        }

        let AstKind::IdentifierReference(ident) = node.kind() else {
            return;
        };

        match ident.name.as_str() {
            "__dirname" => {
                ctx.diagnostic(no_global_dirname_filename_diagnostic(ident.span, "dirname"));
            }
            "__filename" => {
                ctx.diagnostic(no_global_dirname_filename_diagnostic(ident.span, "filename"));
            }
            _ => {}
        }
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    // Note: ESM tests need module source type
    let pass = vec![
        // CJS: __dirname is fine
        "const dir = __dirname;",
    ];

    let fail = vec![];

    Tester::new(NoGlobalDirnameFilename::NAME, NoGlobalDirnameFilename::PLUGIN, pass, fail)
        .test_and_snapshot();
}
