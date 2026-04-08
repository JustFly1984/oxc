use goat_ast::AstKind;
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn no_new_require(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Unexpected use of `new` operator with `require`")
        .with_help("Separate `require()` from `new` operator")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct NoNewRequire;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Warn about calling `new` on `require`.
    ///
    /// ### Why is this bad?
    ///
    /// The `require` function is used to include modules and might return a constructor. As this
    /// is not always the case this can be confusing.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// var appHeader = new require('app-header');
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// var AppHeader = require('app-header');
    /// var appHeader = new AppHeader();
    /// ```
    NoNewRequire,
    node,
    restriction
);

impl Rule for NoNewRequire {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        let AstKind::NewExpression(new_expression) = node.kind() else {
            return;
        };
        if new_expression.callee.is_specific_id("require") {
            ctx.diagnostic(no_new_require(new_expression.span));
        }
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec![
        "var appHeader = require('app-header')",
        "var AppHeader = new (require('app-header'))",
        "var AppHeader = new (require('headers').appHeader)",
        "var AppHeader = require('app-header'); var appHeader = new AppHeader();",
    ];

    let fail = vec![
        "var appHeader = new require('app-header')",
        "var appHeader = new require('headers').appHeader",
    ];

    Tester::new(NoNewRequire::NAME, NoNewRequire::PLUGIN, pass, fail).test_and_snapshot();
}
