use goat_ast::{AstKind, ast::Argument};
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn prefer_global_console_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Prefer the global `console` over `require('console')`.")
        .with_help("`console` is a global in Node.js and does not need to be imported.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct PreferGlobalConsole;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Enforces using the global `console` object instead of `require('console')`.
    ///
    /// ### Why is this bad?
    ///
    /// The `console` object is a global in Node.js. Importing it via `require()` is
    /// unnecessary and adds noise to the code.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// const console = require("console");
    /// const console = require("node:console");
    /// import console from "console";
    /// import console from "node:console";
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// console.log("hello");
    /// ```
    PreferGlobalConsole,
    node,
    style,
    pending
);

impl Rule for PreferGlobalConsole {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        match node.kind() {
            AstKind::CallExpression(call_expr) => {
                if crate::ast_util::is_global_require_call(call_expr, ctx.semantic())
                    && let Argument::StringLiteral(arg) = &call_expr.arguments[0]
                {
                    let value = arg.value.as_str();
                    if value == "console" || value == "node:console" {
                        ctx.diagnostic(prefer_global_console_diagnostic(call_expr.span));
                    }
                }
            }
            AstKind::ImportDeclaration(import_decl) => {
                let source = import_decl.source.value.as_str();
                if source == "console" || source == "node:console" {
                    ctx.diagnostic(prefer_global_console_diagnostic(import_decl.span));
                }
            }
            _ => {}
        }
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec!["console.log('hello');", r#"const fs = require("fs");"#];

    let fail = vec![
        r#"const console = require("console");"#,
        r#"const console = require("node:console");"#,
    ];

    Tester::new(PreferGlobalConsole::NAME, PreferGlobalConsole::PLUGIN, pass, fail)
        .test_and_snapshot();
}
