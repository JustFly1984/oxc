use goat_ast::{AstKind, ast::Argument};
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn prefer_promises_fs_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Prefer `fs/promises` over callback-based `fs` methods.")
        .with_help("Use `require('fs/promises')` or `import fs from 'node:fs/promises'` instead of the callback-based `fs` API.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct PreferPromisesFs;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Enforces using `fs/promises` instead of the callback-based `fs` module.
    ///
    /// ### Why is this bad?
    ///
    /// The callback-based `fs` API is harder to use correctly and leads to
    /// callback hell. The promise-based API (`fs/promises`) is cleaner and
    /// works well with `async/await`.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// const fs = require("fs");
    /// import fs from "fs";
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// const fs = require("fs/promises");
    /// import fs from "node:fs/promises";
    /// ```
    PreferPromisesFs,
    node,
    style,
    pending
);

impl Rule for PreferPromisesFs {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        match node.kind() {
            AstKind::CallExpression(call_expr) => {
                if crate::ast_util::is_global_require_call(call_expr, ctx.semantic())
                    && let Argument::StringLiteral(arg) = &call_expr.arguments[0]
                {
                    let value = arg.value.as_str();
                    if value == "fs" || value == "node:fs" {
                        ctx.diagnostic(prefer_promises_fs_diagnostic(call_expr.span));
                    }
                }
            }
            AstKind::ImportDeclaration(import_decl) => {
                let source = import_decl.source.value.as_str();
                if source == "fs" || source == "node:fs" {
                    ctx.diagnostic(prefer_promises_fs_diagnostic(import_decl.span));
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
        r#"const fs = require("fs/promises");"#,
        r#"const fs = require("node:fs/promises");"#,
        r#"const path = require("path");"#,
    ];

    let fail = vec![r#"const fs = require("fs");"#, r#"const fs = require("node:fs");"#];

    Tester::new(PreferPromisesFs::NAME, PreferPromisesFs::PLUGIN, pass, fail).test_and_snapshot();
}
