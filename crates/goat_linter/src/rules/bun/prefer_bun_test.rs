use goat_ast::{AstKind, ast::Argument};
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn prefer_bun_test_diagnostic(span: Span, source: &str) -> GoatDiagnostic {
    GoatDiagnostic::warn(format!("Prefer `bun:test` over `{source}`."))
        .with_help("Use `import { describe, it, expect } from 'bun:test'` instead.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct PreferBunTest;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Flags imports from Jest or Vitest and suggests using `bun:test` instead.
    ///
    /// ### Why is this bad?
    ///
    /// Bun has a built-in test runner (`bun:test`) that is faster and requires
    /// no additional dependencies. It provides the same `describe`, `it`, `expect`
    /// API that Jest and Vitest users are familiar with.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// import { describe, it, expect } from "vitest";
    /// import { jest } from "@jest/globals";
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// import { describe, it, expect } from "bun:test";
    /// ```
    PreferBunTest,
    bun,
    style,
    pending
);

const FLAGGED_TEST_SOURCES: [&str; 3] = ["@jest/globals", "vitest", "@vitest/expect"];

impl Rule for PreferBunTest {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        match node.kind() {
            AstKind::CallExpression(call_expr) => {
                if crate::ast_util::is_global_require_call(call_expr, ctx.semantic())
                    && let Argument::StringLiteral(arg) = &call_expr.arguments[0]
                    && FLAGGED_TEST_SOURCES.contains(&arg.value.as_str())
                {
                    ctx.diagnostic(prefer_bun_test_diagnostic(call_expr.span, arg.value.as_str()));
                }
            }
            AstKind::ImportDeclaration(import_decl) => {
                let source = import_decl.source.value.as_str();
                if FLAGGED_TEST_SOURCES.contains(&source) {
                    ctx.diagnostic(prefer_bun_test_diagnostic(import_decl.span, source));
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
        r#"import { describe, it, expect } from "bun:test";"#,
        r#"import assert from "node:assert";"#,
        r#"require("mocha");"#,
        r#"import { render } from "@testing-library/react";"#,
    ];

    let fail = vec![
        r#"import { describe, it } from "@jest/globals";"#,
        r#"import { expect } from "vitest";"#,
        r#"import { expect } from "@vitest/expect";"#,
        r#"const { describe } = require("vitest");"#,
        r#"const { jest } = require("@jest/globals");"#,
    ];

    Tester::new(PreferBunTest::NAME, PreferBunTest::PLUGIN, pass, fail).test_and_snapshot();
}
