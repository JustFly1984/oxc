use goat_ast::{AstKind, ast::Argument};
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn prefer_global_process_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Prefer the global `process` over `require('process')`.")
        .with_help("The `process` object is a global in Node.js and does not need to be imported.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct PreferGlobalProcess;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Enforces using the global `process` variable instead of `require('process')`.
    ///
    /// ### Why is this bad?
    ///
    /// The `process` object is a global in Node.js. Importing it via `require()` is
    /// unnecessary and adds noise to the code.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// const process = require("process");
    /// const process = require("node:process");
    /// import process from "process";
    /// import process from "node:process";
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// process.exit(1);
    /// const { env } = process;
    /// ```
    PreferGlobalProcess,
    node,
    style,
    pending
);

impl Rule for PreferGlobalProcess {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        match node.kind() {
            AstKind::CallExpression(call_expr) => {
                if crate::ast_util::is_global_require_call(call_expr, ctx.semantic())
                    && let Argument::StringLiteral(arg) = &call_expr.arguments[0]
                {
                    let value = arg.value.as_str();
                    if value == "process" || value == "node:process" {
                        ctx.diagnostic(prefer_global_process_diagnostic(call_expr.span));
                    }
                }
            }
            AstKind::ImportDeclaration(import_decl) => {
                let source = import_decl.source.value.as_str();
                if source == "process" || source == "node:process" {
                    ctx.diagnostic(prefer_global_process_diagnostic(import_decl.span));
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
        "process.exit(1);",
        "const { env } = process;",
        r#"const fs = require("fs");"#,
    ];

    let fail = vec![
        r#"const process = require("process");"#,
        r#"const process = require("node:process");"#,
    ];

    Tester::new(PreferGlobalProcess::NAME, PreferGlobalProcess::PLUGIN, pass, fail)
        .test_and_snapshot();
}
