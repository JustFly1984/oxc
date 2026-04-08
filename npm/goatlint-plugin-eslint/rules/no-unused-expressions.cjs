const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unused-expressions.js
/**
* @fileoverview Flag expressions in statement position that do not side effect
* @author Michael Ficarra
*/
var require_no_unused_expressions = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Returns `true`.
	* @returns {boolean} `true`.
	*/
	function alwaysTrue() {
		return !0;
	}
	/**
	* Returns `false`.
	* @returns {boolean} `false`.
	*/
	function alwaysFalse() {
		return !1;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			dialects: ["javascript", "typescript"],
			language: "javascript",
			type: "suggestion",
			docs: {
				description: "Disallow unused expressions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-unused-expressions"
			},
			schema: [{
				type: "object",
				properties: {
					allowShortCircuit: { type: "boolean" },
					allowTernary: { type: "boolean" },
					allowTaggedTemplates: { type: "boolean" },
					enforceForJSX: { type: "boolean" },
					ignoreDirectives: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			defaultOptions: [{
				allowShortCircuit: !1,
				allowTernary: !1,
				allowTaggedTemplates: !1,
				enforceForJSX: !1,
				ignoreDirectives: !1
			}],
			messages: { unusedExpression: "Expected an assignment or function call and instead saw an expression." }
		},
		create(context) {
			let [{ allowShortCircuit, allowTernary, allowTaggedTemplates, enforceForJSX, ignoreDirectives }] = context.options;
			/**
			* Has AST suggesting a directive.
			* @param {ASTNode} node any node
			* @returns {boolean} whether the given node structurally represents a directive
			*/
			function looksLikeDirective(node) {
				return node.type === "ExpressionStatement" && node.expression.type === "Literal" && typeof node.expression.value == "string";
			}
			/**
			* Gets the leading sequence of members in a list that pass the predicate.
			* @param {Function} predicate ([a] -> Boolean) the function used to make the determination
			* @param {a[]} list the input list
			* @returns {a[]} the leading sequence of members in the given list that pass the given predicate
			*/
			function takeWhile(predicate, list) {
				for (let i = 0; i < list.length; ++i) if (!predicate(list[i])) return list.slice(0, i);
				return list.slice();
			}
			/**
			* Gets leading directives nodes in a Node body.
			* @param {ASTNode} node a Program or BlockStatement node
			* @returns {ASTNode[]} the leading sequence of directive nodes in the given node's body
			*/
			function directives(node) {
				return takeWhile(looksLikeDirective, node.body);
			}
			/**
			* Detect if a Node is a directive.
			* @param {ASTNode} node any node
			* @returns {boolean} whether the given node is considered a directive in its current position
			*/
			function isDirective(node) {
				/**
				* https://tc39.es/ecma262/#directive-prologue
				*
				* Only `FunctionBody`, `ScriptBody` and `ModuleBody` can have directive prologue.
				* Class static blocks do not have directive prologue.
				*/
				return astUtils.isTopLevelExpressionStatement(node) && directives(node.parent).includes(node);
			}
			/**
			* The member functions return `true` if the type has no side-effects.
			* Unknown nodes are handled as `false`, then this rule ignores those.
			*/
			let Checker = Object.assign(Object.create(null), {
				isDisallowed(node) {
					return (Checker[node.type] || alwaysFalse)(node);
				},
				ArrayExpression: alwaysTrue,
				ArrowFunctionExpression: alwaysTrue,
				BinaryExpression: alwaysTrue,
				ChainExpression(node) {
					return Checker.isDisallowed(node.expression);
				},
				ClassExpression: alwaysTrue,
				ConditionalExpression(node) {
					return allowTernary ? Checker.isDisallowed(node.consequent) || Checker.isDisallowed(node.alternate) : !0;
				},
				FunctionExpression: alwaysTrue,
				Identifier: alwaysTrue,
				JSXElement() {
					return enforceForJSX;
				},
				JSXFragment() {
					return enforceForJSX;
				},
				Literal: alwaysTrue,
				LogicalExpression(node) {
					return allowShortCircuit ? Checker.isDisallowed(node.right) : !0;
				},
				MemberExpression: alwaysTrue,
				MetaProperty: alwaysTrue,
				ObjectExpression: alwaysTrue,
				SequenceExpression: alwaysTrue,
				TaggedTemplateExpression() {
					return !allowTaggedTemplates;
				},
				TemplateLiteral: alwaysTrue,
				ThisExpression: alwaysTrue,
				UnaryExpression(node) {
					return node.operator !== "void" && node.operator !== "delete";
				},
				TSAsExpression(node) {
					return Checker.isDisallowed(node.expression);
				},
				TSTypeAssertion(node) {
					return Checker.isDisallowed(node.expression);
				},
				TSNonNullExpression(node) {
					return Checker.isDisallowed(node.expression);
				},
				TSInstantiationExpression(node) {
					return Checker.isDisallowed(node.expression);
				}
			});
			return { ExpressionStatement(node) {
				Checker.isDisallowed(node.expression) && !astUtils.isDirective(node) && !(ignoreDirectives && isDirective(node)) && context.report({
					node,
					messageId: "unusedExpression"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unused-expressions.cjs
module.exports = require_no_unused_expressions().create;
//#endregion
