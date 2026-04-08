use goat_ast::{AstKind, ast::Expression};
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;

use crate::{AstNode, context::LintContext, rule::Rule};

fn detect_pseudo_random_bytes_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("crypto.pseudoRandomBytes() is not cryptographically secure")
        .with_help("Use crypto.randomBytes() instead of crypto.pseudoRandomBytes().")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct DetectPseudoRandomBytes;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Detects calls to `crypto.pseudoRandomBytes()`.
    ///
    /// ### Why is this bad?
    ///
    /// `pseudoRandomBytes` is not guaranteed to be cryptographically secure.
    /// Use `crypto.randomBytes()` instead for security-sensitive operations.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// crypto.pseudoRandomBytes(16);
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// crypto.randomBytes(16);
    /// ```
    DetectPseudoRandomBytes,
    goat,
    suspicious,
    none
);

impl Rule for DetectPseudoRandomBytes {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        let AstKind::CallExpression(call_expr) = node.kind() else {
            return;
        };

        let Expression::StaticMemberExpression(member) = &call_expr.callee else {
            return;
        };

        if member.property.name == "pseudoRandomBytes" {
            ctx.diagnostic(detect_pseudo_random_bytes_diagnostic(call_expr.span));
        }
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec!["crypto.randomBytes(16)", "foo.bar()", "pseudoRandomBytes(16)"];

    let fail = vec!["crypto.pseudoRandomBytes(16)", "obj.pseudoRandomBytes(32)"];

    Tester::new(DetectPseudoRandomBytes::NAME, DetectPseudoRandomBytes::PLUGIN, pass, fail)
        .test_and_snapshot();
}
