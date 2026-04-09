use goat_ast::{AstKind, ast::Argument};
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn prefer_promises_dns_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Prefer `dns/promises` over callback-based `dns` methods.")
        .with_help("Use `require('dns/promises')` or `import dns from 'node:dns/promises'` instead of the callback-based `dns` API.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct PreferPromisesDns;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Enforces using `dns/promises` instead of the callback-based `dns` module.
    ///
    /// ### Why is this bad?
    ///
    /// The callback-based `dns` API is harder to use correctly. The promise-based
    /// API (`dns/promises`) is cleaner and works well with `async/await`.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// const dns = require("dns");
    /// import dns from "dns";
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// const dns = require("dns/promises");
    /// import dns from "node:dns/promises";
    /// ```
    PreferPromisesDns,
    node,
    style,
    pending
);

impl Rule for PreferPromisesDns {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        match node.kind() {
            AstKind::CallExpression(call_expr) => {
                if crate::ast_util::is_global_require_call(call_expr, ctx.semantic())
                    && let Argument::StringLiteral(arg) = &call_expr.arguments[0]
                {
                    let value = arg.value.as_str();
                    if value == "dns" || value == "node:dns" {
                        ctx.diagnostic(prefer_promises_dns_diagnostic(call_expr.span));
                    }
                }
            }
            AstKind::ImportDeclaration(import_decl) => {
                let source = import_decl.source.value.as_str();
                if source == "dns" || source == "node:dns" {
                    ctx.diagnostic(prefer_promises_dns_diagnostic(import_decl.span));
                }
            }
            _ => {}
        }
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec![
        r#"const dns = require("dns/promises");"#,
        r#"const dns = require("node:dns/promises");"#,
        r#"const fs = require("fs");"#,
    ];

    let fail = vec![r#"const dns = require("dns");"#, r#"const dns = require("node:dns");"#];

    Tester::new(PreferPromisesDns::NAME, PreferPromisesDns::PLUGIN, pass, fail).test_and_snapshot();
}
