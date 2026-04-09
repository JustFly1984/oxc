use goat_ast::{AstKind, ast::Argument};
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn prefer_global_buffer_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Prefer the global `Buffer` over `require('buffer').Buffer`.")
        .with_help("`Buffer` is a global in Node.js and does not need to be imported.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct PreferGlobalBuffer;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Enforces using the global `Buffer` class instead of `require('buffer').Buffer`.
    ///
    /// ### Why is this bad?
    ///
    /// The `Buffer` class is a global in Node.js. Importing it via `require()` is
    /// unnecessary and adds noise to the code.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// const { Buffer } = require("buffer");
    /// const { Buffer } = require("node:buffer");
    /// import { Buffer } from "buffer";
    /// import { Buffer } from "node:buffer";
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// const buf = Buffer.from("hello");
    /// Buffer.alloc(16);
    /// ```
    PreferGlobalBuffer,
    node,
    style,
    pending
);

impl Rule for PreferGlobalBuffer {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        match node.kind() {
            AstKind::CallExpression(call_expr) => {
                if crate::ast_util::is_global_require_call(call_expr, ctx.semantic())
                    && let Argument::StringLiteral(arg) = &call_expr.arguments[0]
                {
                    let value = arg.value.as_str();
                    if value == "buffer" || value == "node:buffer" {
                        ctx.diagnostic(prefer_global_buffer_diagnostic(call_expr.span));
                    }
                }
            }
            AstKind::ImportDeclaration(import_decl) => {
                let source = import_decl.source.value.as_str();
                if source == "buffer" || source == "node:buffer" {
                    ctx.diagnostic(prefer_global_buffer_diagnostic(import_decl.span));
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
        "const buf = Buffer.from('hello');",
        "Buffer.alloc(16);",
        r#"const fs = require("fs");"#,
    ];

    let fail = vec![
        r#"const { Buffer } = require("buffer");"#,
        r#"const { Buffer } = require("node:buffer");"#,
    ];

    Tester::new(PreferGlobalBuffer::NAME, PreferGlobalBuffer::PLUGIN, pass, fail)
        .test_and_snapshot();
}
