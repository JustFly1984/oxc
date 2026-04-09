use goat_ast::AstKind;
use goat_diagnostics::GoatDiagnostic;
use goat_macros::declare_goat_lint;
use goat_semantic::IsGlobalReference;
use goat_span::{GetSpan, Span, ident::PROCESS};

use crate::{AstNode, context::LintContext, rule::Rule};

fn prefer_bun_env_diagnostic(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Use `Bun.env` instead of `process.env`.")
        .with_help("`Bun.env` is faster and provides typed access to environment variables.")
        .with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct PreferBunEnv;

declare_goat_lint!(
    /// ### What it does
    ///
    /// Flags usage of `process.env` and suggests using `Bun.env` instead.
    ///
    /// ### Why is this bad?
    ///
    /// `Bun.env` is faster than `process.env` and provides typed access
    /// to environment variables in Bun projects.
    ///
    /// ### Examples
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```js
    /// const val = process.env.NODE_ENV;
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```js
    /// const val = Bun.env.NODE_ENV;
    /// ```
    PreferBunEnv,
    bun,
    style,
    suggestion
);

impl Rule for PreferBunEnv {
    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        let (span, object) = match node.kind() {
            AstKind::StaticMemberExpression(mem) if mem.property.name.as_str() == "env" => {
                (mem.span, &mem.object)
            }
            AstKind::ComputedMemberExpression(mem)
                if mem
                    .static_property_name()
                    .is_some_and(|name| name.as_str() == "env") =>
            {
                (mem.span, &mem.object)
            }
            _ => return,
        };

        let Some(obj_id) = object.get_identifier_reference() else {
            return;
        };

        if !obj_id.is_global_reference_name(PROCESS, ctx.scoping()) {
            return;
        }

        ctx.diagnostic_with_suggestion(prefer_bun_env_diagnostic(span), |fixer| {
            fixer.replace(obj_id.span(), "Bun")
        });
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec![
        "Bun.env.NODE_ENV",
        "process.nextTick",
        "process.exit(1)",
        "process.execArgv",
        "Process.env",
        "process[env]",
        "notprocess.env.FOO",
    ];

    let fail = vec![
        "process.env.NODE_ENV",
        r#"process.env["FOO"]"#,
        "const x = process.env",
        "f(process.env)",
        r#"process['env']"#,
    ];

    let fix = vec![
        ("process.env.NODE_ENV", "Bun.env.NODE_ENV"),
        (r#"process.env["FOO"]"#, r#"Bun.env["FOO"]"#),
        ("const x = process.env", "const x = Bun.env"),
        ("f(process.env)", "f(Bun.env)"),
        (r#"process['env']"#, r#"Bun['env']"#),
    ];

    Tester::new(PreferBunEnv::NAME, PreferBunEnv::PLUGIN, pass, fail)
        .expect_fix(fix)
        .test_and_snapshot();
}
