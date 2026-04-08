use oxc_ast::AstKind;
use oxc_diagnostics::OxcDiagnostic;
use oxc_macros::declare_oxc_lint;
use oxc_span::Span;
use schemars::JsonSchema;
use serde::Deserialize;

use crate::{AstNode, context::LintContext, rule::Rule};

fn no_restricted_syntax_diagnostic(selector: &str, message: &str, span: Span) -> OxcDiagnostic {
    let title = if message.is_empty() {
        format!("Using '{selector}' is not allowed.")
    } else {
        message.to_string()
    };

    OxcDiagnostic::warn(title).with_label(span)
}

#[derive(Debug, Default, Clone)]
pub struct NoRestrictedSyntax(Box<NoRestrictedSyntaxConfig>);

#[derive(Debug, Default, Clone, JsonSchema, Deserialize)]
#[serde(default)]
pub struct NoRestrictedSyntaxConfig {
    #[serde(skip)]
    restrictions: Vec<SyntaxRestriction>,
}

#[derive(Debug, Clone)]
struct SyntaxRestriction {
    selector: String,
    message: String,
}

declare_oxc_lint!(
    /// ### What it does
    ///
    /// Disallows specified syntax. Supports a subset of ESLint's AST selector syntax
    /// including node types (e.g. `ForInStatement`) and attribute selectors
    /// (e.g. `SpreadElement[parent.type='ObjectExpression']`).
    ///
    /// ### Why is this bad?
    ///
    /// Certain syntax patterns may be undesirable in a codebase for consistency,
    /// performance, or safety reasons.
    ///
    /// ### Examples
    ///
    /// Given `"no-restricted-syntax": ["error", { "selector": "ForInStatement", "message": "Use for...of instead." }]`:
    ///
    /// Examples of **incorrect** code for this rule:
    /// ```javascript
    /// for (const key in obj) {}
    /// ```
    ///
    /// Examples of **correct** code for this rule:
    /// ```javascript
    /// for (const key of Object.keys(obj)) {}
    /// ```
    NoRestrictedSyntax,
    eslint,
    restriction,
    config = NoRestrictedSyntaxConfig,
);

impl Rule for NoRestrictedSyntax {
    fn from_configuration(value: serde_json::Value) -> Result<Self, serde_json::Error> {
        let restrictions = match value {
            serde_json::Value::Array(arr) => arr
                .iter()
                .filter_map(|v| match v {
                    serde_json::Value::String(selector) => Some(SyntaxRestriction {
                        selector: selector.clone(),
                        message: String::new(),
                    }),
                    serde_json::Value::Object(obj) => {
                        let selector =
                            obj.get("selector").and_then(serde_json::Value::as_str)?.to_string();
                        let message = obj
                            .get("message")
                            .and_then(serde_json::Value::as_str)
                            .unwrap_or_default()
                            .to_string();
                        Some(SyntaxRestriction { selector, message })
                    }
                    _ => None,
                })
                .collect(),
            _ => Vec::new(),
        };

        Ok(Self(Box::new(NoRestrictedSyntaxConfig { restrictions })))
    }

    fn run<'a>(&self, node: &AstNode<'a>, ctx: &LintContext<'a>) {
        for restriction in &self.0.restrictions {
            if matches_selector(node, ctx, &restriction.selector) {
                let span = node_span(node);
                ctx.diagnostic(no_restricted_syntax_diagnostic(
                    &restriction.selector,
                    &restriction.message,
                    span,
                ));
            }
        }
    }
}

/// Extract span from an AST node.
fn node_span(node: &AstNode<'_>) -> Span {
    match node.kind() {
        AstKind::ForInStatement(s) => s.span,
        AstKind::ForOfStatement(s) => s.span,
        AstKind::WithStatement(s) => s.span,
        AstKind::LabeledStatement(s) => s.span,
        AstKind::ContinueStatement(s) => s.span,
        AstKind::DebuggerStatement(s) => s.span,
        AstKind::TSEnumDeclaration(s) => s.span,
        AstKind::SpreadElement(s) => s.span,
        AstKind::CallExpression(s) => s.span,
        AstKind::NewExpression(s) => s.span,
        AstKind::SequenceExpression(s) => s.span,
        AstKind::BinaryExpression(s) => s.span,
        AstKind::UnaryExpression(s) => s.span,
        AstKind::AssignmentExpression(s) => s.span,
        AstKind::ConditionalExpression(s) => s.span,
        AstKind::VariableDeclaration(s) => s.span,
        AstKind::Function(s) => s.span,
        AstKind::ExportDefaultDeclaration(s) => s.span,
        AstKind::ExportNamedDeclaration(s) => s.span,
        AstKind::ImportDeclaration(s) => s.span,
        AstKind::StaticMemberExpression(s) => s.span,
        AstKind::ComputedMemberExpression(s) => s.span,
        AstKind::ObjectExpression(s) => s.span,
        AstKind::ArrayExpression(s) => s.span,
        _ => Span::default(),
    }
}

/// Match an AST node against a simplified selector string.
///
/// Supports:
/// - Simple node type: `ForInStatement`, `SpreadElement`, `TSEnumDeclaration`, etc.
/// - Attribute selector: `SpreadElement[parent.type='ObjectExpression']`
fn matches_selector(node: &AstNode<'_>, ctx: &LintContext<'_>, selector: &str) -> bool {
    // Parse selector: "NodeType" or "NodeType[attr.path='value']"
    let (node_type, attribute_filter) = if let Some(bracket_start) = selector.find('[') {
        let node_type = &selector[..bracket_start];
        let rest = selector[bracket_start + 1..].trim_end_matches(']');
        (node_type, Some(rest))
    } else {
        (selector.as_ref(), None)
    };

    // Check node type
    if !matches_node_type(node, node_type) {
        return false;
    }

    // Check attribute filter if present
    if let Some(filter) = attribute_filter {
        return matches_attribute(node, ctx, filter);
    }

    true
}

fn matches_node_type(node: &AstNode<'_>, expected: &str) -> bool {
    let actual = ast_kind_name(node.kind());
    actual == expected
}

fn ast_kind_name(kind: AstKind<'_>) -> &'static str {
    match kind {
        AstKind::BooleanLiteral(_) => "Literal",
        AstKind::NullLiteral(_) => "Literal",
        AstKind::NumericLiteral(_) => "Literal",
        AstKind::StringLiteral(_) => "Literal",
        AstKind::RegExpLiteral(_) => "Literal",
        AstKind::TemplateLiteral(_) => "TemplateLiteral",
        AstKind::IdentifierReference(_) => "Identifier",
        AstKind::BindingIdentifier(_) => "Identifier",
        AstKind::SpreadElement(_) => "SpreadElement",
        AstKind::ArrayExpression(_) => "ArrayExpression",
        AstKind::ObjectExpression(_) => "ObjectExpression",
        AstKind::ObjectProperty(_) => "Property",
        AstKind::Function(f) => {
            if f.is_expression() {
                "FunctionExpression"
            } else {
                "FunctionDeclaration"
            }
        }
        AstKind::ArrowFunctionExpression(_) => "ArrowFunctionExpression",
        AstKind::UnaryExpression(_) => "UnaryExpression",
        AstKind::BinaryExpression(_) => "BinaryExpression",
        AstKind::LogicalExpression(_) => "LogicalExpression",
        AstKind::ConditionalExpression(_) => "ConditionalExpression",
        AstKind::CallExpression(_) => "CallExpression",
        AstKind::NewExpression(_) => "NewExpression",
        AstKind::StaticMemberExpression(_) => "MemberExpression",
        AstKind::ComputedMemberExpression(_) => "MemberExpression",
        AstKind::SequenceExpression(_) => "SequenceExpression",
        AstKind::AssignmentExpression(_) => "AssignmentExpression",
        AstKind::UpdateExpression(_) => "UpdateExpression",
        AstKind::YieldExpression(_) => "YieldExpression",
        AstKind::AwaitExpression(_) => "AwaitExpression",
        AstKind::TaggedTemplateExpression(_) => "TaggedTemplateExpression",
        AstKind::VariableDeclaration(_) => "VariableDeclaration",
        AstKind::VariableDeclarator(_) => "VariableDeclarator",
        AstKind::Class(_) => "ClassDeclaration",
        AstKind::BlockStatement(_) => "BlockStatement",
        AstKind::BreakStatement(_) => "BreakStatement",
        AstKind::ContinueStatement(_) => "ContinueStatement",
        AstKind::DebuggerStatement(_) => "DebuggerStatement",
        AstKind::DoWhileStatement(_) => "DoWhileStatement",
        AstKind::ExpressionStatement(_) => "ExpressionStatement",
        AstKind::ForInStatement(_) => "ForInStatement",
        AstKind::ForOfStatement(_) => "ForOfStatement",
        AstKind::ForStatement(_) => "ForStatement",
        AstKind::IfStatement(_) => "IfStatement",
        AstKind::LabeledStatement(_) => "LabeledStatement",
        AstKind::ReturnStatement(_) => "ReturnStatement",
        AstKind::SwitchStatement(_) => "SwitchStatement",
        AstKind::ThrowStatement(_) => "ThrowStatement",
        AstKind::TryStatement(_) => "TryStatement",
        AstKind::WhileStatement(_) => "WhileStatement",
        AstKind::WithStatement(_) => "WithStatement",
        AstKind::ImportDeclaration(_) => "ImportDeclaration",
        AstKind::ExportDefaultDeclaration(_) => "ExportDefaultDeclaration",
        AstKind::ExportNamedDeclaration(_) => "ExportNamedDeclaration",
        AstKind::ExportAllDeclaration(_) => "ExportAllDeclaration",
        AstKind::TSEnumDeclaration(_) => "TSEnumDeclaration",
        AstKind::TSInterfaceDeclaration(_) => "TSInterfaceDeclaration",
        AstKind::TSTypeAliasDeclaration(_) => "TSTypeAliasDeclaration",
        AstKind::TSModuleDeclaration(_) => "TSModuleDeclaration",
        AstKind::TSAsExpression(_) => "TSAsExpression",
        AstKind::TSNonNullExpression(_) => "TSNonNullExpression",
        AstKind::TSTypeAssertion(_) => "TSTypeAssertion",
        _ => "",
    }
}

/// Match an attribute filter like `parent.type='ObjectExpression'`.
fn matches_attribute(node: &AstNode<'_>, ctx: &LintContext<'_>, filter: &str) -> bool {
    // Parse: "path=value" or "path='value'"
    let Some((path, value)) = filter.split_once('=') else {
        return false;
    };

    let value = value.trim_matches('\'').trim_matches('"');

    // Navigate the path
    let parts: Vec<&str> = path.split('.').collect();

    if parts.is_empty() {
        return false;
    }

    match parts[0] {
        "parent" => {
            let parent_id = ctx.nodes().parent_id(node.id());
            let parent_node = ctx.nodes().get_node(parent_id);
            resolve_node_property(parent_node, &parts[1..]) == value
        }
        "type" => ast_kind_name(node.kind()) == value,
        _ => false,
    }
}

/// Resolve a property path on a node (e.g., `type`, `kind`).
fn resolve_node_property(node: &AstNode<'_>, path: &[&str]) -> &'static str {
    if path.is_empty() {
        return "";
    }

    match path[0] {
        "type" => ast_kind_name(node.kind()),
        _ => "",
    }
}

#[test]
fn test() {
    use crate::tester::Tester;

    let pass = vec![
        ("for (const x of arr) {}", Some(serde_json::json!(["ForInStatement"]))),
        ("var x = 1", Some(serde_json::json!(["ForInStatement"]))),
        (
            "var x = { ...a }",
            Some(serde_json::json!([{
                "selector": "SpreadElement[parent.type='ArrayExpression']",
                "message": "No array spread."
            }])),
        ),
    ];

    let fail = vec![
        ("for (const key in obj) {}", Some(serde_json::json!(["ForInStatement"]))),
        (
            "for (const key in obj) {}",
            Some(
                serde_json::json!([{ "selector": "ForInStatement", "message": "Use for...of instead." }]),
            ),
        ),
        (
            "var x = { ...a }",
            Some(serde_json::json!([{
                "selector": "SpreadElement[parent.type='ObjectExpression']",
                "message": "Object spread is forbidden."
            }])),
        ),
    ];

    Tester::new(NoRestrictedSyntax::NAME, NoRestrictedSyntax::PLUGIN, pass, fail)
        .test_and_snapshot();
}
