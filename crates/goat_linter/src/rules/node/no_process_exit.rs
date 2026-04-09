use goat_ast::AstKind;
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn no_process_exit_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Don't use `process.exit()`.")
        .with_help("Use `throw` or allow the process to exit naturally. `process.exit()` prevents cleanup handlers and can hide errors.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct NoProcessExit;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Disallows the use of `process.exit()`.
    ///
    /// ### Why is this bad?
    ///
    /// `process.exit()` immediately terminates the Node.js process, preventing
    /// cleanup handlers from running and potentially hiding errors. It's better
    /// to throw an error or let the process exit naturally.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// process.exit(1);
    /// process.exit(0);
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// process.exitCode = 1;
    /// throw new Error("Something went wrong");
    /// ```
    NoProcessExit,
    node,
    restriction,
    pending
);

impl Rule for NoProcessExit {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        let AstKind::CallExpression(call_expr) = node.kind() else {
            return;
        };

        if call_expr.callee.is_specific_member_access("process", "exit") {
            ctx.diagnostic(no_process_exit_diagnostic(call_expr.span));
        }
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec!["process.exitCode = 1;", "var exit = process.exit;", "f(process.exit);"];

    let fail = vec!["process.exit(0);", "process.exit(1);", "process.exit();"];

    Tester::new(NoProcessExit::NAME, NoProcessExit::PLUGIN, pass, fail).test_and_snapshot();
}
