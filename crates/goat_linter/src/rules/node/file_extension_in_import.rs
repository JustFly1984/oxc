use goat_ast::AstKind;
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn file_extension_in_import_diagnostic(span: Span, source: &str) -> GoatDiagnostic {
    GoatDiagnostic::warn(format!("Import path `{source}` requires a file extension."))
        .with_help("Add a file extension to the import path. In ES modules, relative imports must include file extensions.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct FileExtensionInImport;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Enforces file extensions in `import` and `export` declarations for
    /// relative paths.
    ///
    /// ### Why is this bad?
    ///
    /// In ES modules, Node.js requires file extensions for relative imports.
    /// Omitting extensions causes `ERR_MODULE_NOT_FOUND` errors at runtime.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// import foo from "./foo";
    /// import bar from "../utils/bar";
    /// export { baz } from "./baz";
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// import foo from "./foo.js";
    /// import bar from "../utils/bar.ts";
    /// import styles from "./styles.css";
    /// import data from "./data.json";
    /// import pkg from "lodash"; // non-relative imports are fine
    /// ```
    FileExtensionInImport,
    node,
    correctness,
    pending
);

impl Rule for FileExtensionInImport {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        if !ctx.source_type().is_module() {
            return;
        }

        match node.kind() {
            AstKind::ImportDeclaration(import_decl) => {
                check_source(ctx, import_decl.source.value.as_str(), import_decl.source.span);
            }
            AstKind::ExportNamedDeclaration(export_decl) => {
                if let Some(source) = &export_decl.source {
                    check_source(ctx, source.value.as_str(), source.span);
                }
            }
            AstKind::ExportAllDeclaration(export_all) => {
                check_source(ctx, export_all.source.value.as_str(), export_all.source.span);
            }
            _ => {}
        }
    }
}

fn check_source(ctx: &LintContext<'_>, source: &str, span: Span) {
    // Only check relative imports
    if !source.starts_with('.') {
        return;
    }

    // Skip if it already has an extension
    if let Some(last_segment) = source.rsplit('/').next()
        && last_segment.contains('.')
    {
        return;
    }

    // Skip directory imports (ending with /)
    if source.ends_with('/') {
        return;
    }

    ctx.diagnostic(file_extension_in_import_diagnostic(span, source));
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec![
        // Has extension
        (r#"import foo from "./foo.js";"#, None),
        (r#"import foo from "./foo.ts";"#, None),
        (r#"import foo from "./foo.mjs";"#, None),
        // Non-relative import (npm package)
        (r#"import lodash from "lodash";"#, None),
        (r#"import React from "react";"#, None),
        // CJS
        (r#"const foo = require("./foo");"#, None),
        // JSON import
        (r#"import data from "./data.json";"#, None),
        // CSS import
        (r#"import styles from "./styles.css";"#, None),
    ];

    let fail = vec![
        // Missing extension in relative import
        (r#"import foo from "./foo";"#, None),
        (r#"import bar from "../utils/bar";"#, None),
        (r#"export { baz } from "./baz";"#, None),
        (r#"export * from "./baz";"#, None),
    ];

    Tester::new(FileExtensionInImport::NAME, FileExtensionInImport::PLUGIN, pass, fail)
        .with_snapshot_suffix("esm")
        .test_and_snapshot();
}
