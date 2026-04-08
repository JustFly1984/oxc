use goat_ast::AstKind;
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_span::Span;
use goat_syntax::operator::UnaryOperator;

use crate::{AstNode, context::LintContext, rule::Rule};

fn no_delete_var_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Variables should not be deleted")
        .with_help("Assign `undefined` to the variable instead of using `delete`. The `delete` operator is intended for removing properties from objects, not for variables.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct NoDeleteVar;

declare_goat_lint!(
    /// ### What it does
    ///
    /// The purpose of the `delete` operator is to remove a property from an
    /// object.
    ///
    /// ### Why is this bad?
    ///
    /// Using the `delete` operator on a variable might lead to unexpected
    /// behavior.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```javascript
    /// var x;
    /// delete x;
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```javascript
    /// var x;
    ///
    /// var y;
    /// delete y.prop;
    /// ```
    NoDeleteVar,
    eslint,
    correctness
);

impl Rule for NoDeleteVar {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        let AstKind::UnaryExpression(expr) = node.kind() else {
            return;
        };
        if expr.operator == UnaryOperator::Delete && expr.argument.is_identifier_reference() {
            ctx.diagnostic(no_delete_var_diagnostic(expr.span));
        }
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec!["delete x.prop;"];

    let fail = vec!["delete x"];

    Tester::new(NoDeleteVar::NAME, NoDeleteVar::PLUGIN, pass, fail).test_and_snapshot();
}
