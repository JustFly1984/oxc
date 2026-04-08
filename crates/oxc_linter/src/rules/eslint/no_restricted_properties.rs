use oxc_diagnostics::OxcDiagnostic;
use oxc_macros::declare_oxc_lint;
use oxc_span::Span;
use schemars::JsonSchema;
use serde::Deserialize;

use crate::{AstNode, context::LintContext, rule::Rule};

fn no_restricted_properties_diagnostic(
    object: Option<&str>,
    property: &str,
    message: &str,
    span: Span,
) -> OxcDiagnostic {
    let title = if let Some(obj) = object {
        if message.is_empty() {
            format!("'{obj}.{property}' is restricted from being used.")
        } else {
            format!("'{obj}.{property}' is restricted from being used. {message}")
        }
    } else if message.is_empty() {
        format!("'{property}' is restricted from being used.")
    } else {
        format!("'{property}' is restricted from being used. {message}")
    };

    OxcDiagnostic::warn(title).with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct NoRestrictedProperties(Box<NoRestrictedPropertiesConfig>);

#[derive(Debug, Default, Clone, JsonSchema, Deserialize)]
#[serde(default)]
pub struct NoRestrictedPropertiesConfig {
    #[serde(skip)]
    restrictions: Vec<PropertyRestriction>,
}

#[derive(Debug, Clone)]
struct PropertyRestriction {
    object: Option<String>,
    property: Option<String>,
    message: String,
}

declare_oxc_lint!(
    /// ### What it does
    ///
    /// Disallows certain object properties.
    ///
    /// ### Why is this bad?
    ///
    /// Certain properties on certain objects may be undesirable in a codebase.
    /// For example, you might want to disallow `Object.assign` in favor of
    /// explicit property assignment, or `Math.pow` in favor of the `**` operator.
    ///
    /// ### Examples
    ///
    /// Given `"no-restricted-properties": ["error", { "object": "Object", "property": "assign", "message": "Use explicit properties." }]`:
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```javascript
    /// Object.assign(target, source);
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```javascript
    /// target.a = source.a;
    /// target.b = source.b;
    /// ```
    NoRestrictedProperties,
    eslint,
    restriction,
    config = NoRestrictedPropertiesConfig,
);

impl Rule for NoRestrictedProperties {
    fn from_configuration(value: serde_json::Value) -> Result<Self, serde_json::Error> {
        let restrictions = match value {
            serde_json::Value::Array(arr) => arr
                .iter()
                .filter_map(|v| {
                    let obj = v.as_object()?;
                    let object =
                        obj.get("object").and_then(serde_json::Value::as_str).map(String::from);
                    let property =
                        obj.get("property").and_then(serde_json::Value::as_str).map(String::from);
                    let message = obj
                        .get("message")
                        .and_then(serde_json::Value::as_str)
                        .unwrap_or_default()
                        .to_string();

                    if object.is_none() && property.is_none() {
                        return None;
                    }

                    Some(PropertyRestriction { object, property, message })
                })
                .collect(),
            _ => Vec::new(),
        };

        Ok(Self(Box::new(NoRestrictedPropertiesConfig { restrictions })))
    }

    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        let Some(member_expr) = node.kind().as_member_expression_kind() else {
            return;
        };

        let object_name = match member_expr.object().without_parentheses() {
            oxc_ast::ast::Expression::Identifier(ident) => Some(ident.name.as_str()),
            _ => None,
        };

        let property_name = member_expr.static_property_name();

        for restriction in &self.0.restrictions {
            let object_matches = match (&restriction.object, object_name) {
                (Some(expected), Some(actual)) => expected.as_str() == actual,
                (Some(_), None) => false,
                (None, _) => true,
            };

            let property_matches = match (&restriction.property, property_name) {
                (Some(expected), Some(actual)) => expected.as_str() == actual.as_ref(),
                (Some(_), None) => false,
                (None, _) => true,
            };

            if object_matches && property_matches {
                let prop_owned = property_name.map(|p| p.to_string());
                let prop_str = prop_owned.as_deref().unwrap_or("");
                let span = match node.kind() {
                    oxc_ast::AstKind::StaticMemberExpression(e) => e.span,
                    oxc_ast::AstKind::ComputedMemberExpression(e) => e.span,
                    _ => Span::default(),
                };
                ctx.diagnostic(no_restricted_properties_diagnostic(
                    object_name,
                    prop_str,
                    &restriction.message,
                    span,
                ));
                return;
            }
        }
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec![
        (
            "someObject.someProperty",
            Some(serde_json::json!([{ "object": "Object", "property": "assign" }])),
        ),
        (
            "someObject.assign",
            Some(serde_json::json!([{ "object": "Object", "property": "assign" }])),
        ),
        ("Object.keys", Some(serde_json::json!([{ "object": "Object", "property": "assign" }]))),
        ("var x = 1", Some(serde_json::json!([{ "object": "Object", "property": "assign" }]))),
    ];

    let fail = vec![
        (
            "Object.assign(target, source)",
            Some(serde_json::json!([{ "object": "Object", "property": "assign" }])),
        ),
        (
            "Object.assign(target, source)",
            Some(serde_json::json!([{
                "object": "Object",
                "property": "assign",
                "message": "Use explicit properties."
            }])),
        ),
        ("Math.pow(2, 3)", Some(serde_json::json!([{ "object": "Math", "property": "pow" }]))),
        (
            "foo.bar",
            Some(serde_json::json!([{ "property": "bar", "message": "Use baz instead." }])),
        ),
        ("foo.assign", Some(serde_json::json!([{ "object": "foo" }]))),
    ];

    Tester::new(NoRestrictedProperties::NAME, NoRestrictedProperties::PLUGIN, pass, fail)
        .test_and_snapshot();
}
