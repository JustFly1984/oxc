use goat_ast::{AstKind, ast::Argument};
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn prefer_global_url_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Prefer the global `URL`/`URLSearchParams` over `require('url')`.")
        .with_help("`URL` and `URLSearchParams` are globals in Node.js 10+ and do not need to be imported.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct PreferGlobalUrl;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Enforces using the global `URL` and `URLSearchParams` classes instead of
    /// importing from the `url` module.
    ///
    /// ### Why is this bad?
    ///
    /// `URL` and `URLSearchParams` have been globals since Node.js 10.
    /// Importing them via `require('url')` is unnecessary.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// const { URL } = require("url");
    /// const { URLSearchParams } = require("node:url");
    /// import { URL } from "url";
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// const url = new URL("https://example.com");
    /// const params = new URLSearchParams("a=1&b=2");
    /// ```
    PreferGlobalUrl,
    node,
    style,
    pending
);

impl Rule for PreferGlobalUrl {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        match node.kind() {
            AstKind::CallExpression(call_expr) => {
                if crate::ast_util::is_global_require_call(call_expr, ctx.semantic())
                    && let Argument::StringLiteral(arg) = &call_expr.arguments[0]
                {
                    let value = arg.value.as_str();
                    if value == "url" || value == "node:url" {
                        ctx.diagnostic(prefer_global_url_diagnostic(call_expr.span));
                    }
                }
            }
            AstKind::ImportDeclaration(import_decl) => {
                let source = import_decl.source.value.as_str();
                if source == "url" || source == "node:url" {
                    ctx.diagnostic(prefer_global_url_diagnostic(import_decl.span));
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
        r#"const url = new URL("https://example.com");"#,
        r#"const params = new URLSearchParams("a=1");"#,
        r#"const fs = require("fs");"#,
    ];

    let fail =
        vec![r#"const { URL } = require("url");"#, r#"const { URL } = require("node:url");"#];

    Tester::new(PreferGlobalUrl::NAME, PreferGlobalUrl::PLUGIN, pass, fail).test_and_snapshot();
}
