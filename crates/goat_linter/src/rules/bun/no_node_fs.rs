use goat_ast::{AstKind, ast::Argument};
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn no_node_fs_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Avoid using the Node.js `fs` module in Bun projects.")
        .with_help("Use `Bun.file()` and `Bun.write()` for file operations instead.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct NoNodeFs;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Disallows importing the Node.js `fs` module in Bun projects.
    ///
    /// ### Why is this bad?
    ///
    /// Bun provides native file APIs (`Bun.file()`, `Bun.write()`) that are
    /// faster and simpler than the Node.js `fs` module.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// const fs = require("fs");
    /// import fs from "node:fs";
    /// import { readFile } from "fs/promises";
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// const file = Bun.file("path.txt");
    /// await Bun.write("output.txt", data);
    /// ```
    NoNodeFs,
    bun,
    restriction,
    pending
);

const FS_MODULES: [&str; 4] = ["fs", "node:fs", "fs/promises", "node:fs/promises"];

impl Rule for NoNodeFs {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        match node.kind() {
            AstKind::CallExpression(call_expr) => {
                if crate::ast_util::is_global_require_call(call_expr, ctx.semantic())
                    && let Argument::StringLiteral(arg) = &call_expr.arguments[0]
                    && FS_MODULES.contains(&arg.value.as_str())
                {
                    ctx.diagnostic(no_node_fs_diagnostic(call_expr.span));
                }
            }
            AstKind::ImportDeclaration(import_decl) => {
                if FS_MODULES.contains(&import_decl.source.value.as_str()) {
                    ctx.diagnostic(no_node_fs_diagnostic(import_decl.span));
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
        r#"const path = require("path");"#,
        r#"import path from "path";"#,
        r#"require("bun:sqlite");"#,
        r#"Bun.file("foo.txt");"#,
        r#"import { Glob } from "bun";"#,
    ];

    let fail = vec![
        r#"const fs = require("fs");"#,
        r#"const fs = require("node:fs");"#,
        r#"const fsp = require("fs/promises");"#,
        r#"const fsp = require("node:fs/promises");"#,
        r#"import fs from "fs";"#,
        r#"import fs from "node:fs";"#,
        r#"import { readFile } from "fs/promises";"#,
        r#"import { readFile } from "node:fs/promises";"#,
    ];

    Tester::new(NoNodeFs::NAME, NoNodeFs::PLUGIN, pass, fail).test_and_snapshot();
}
