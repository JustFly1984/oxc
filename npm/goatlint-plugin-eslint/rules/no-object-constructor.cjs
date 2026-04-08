const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-object-constructor.js
/**
* @fileoverview Rule to disallow calls to the `Object` constructor without an argument
* @author Francesco Trotta
*/
var require_no_object_constructor = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { getVariableByName, isArrowToken, isStartOfExpressionStatement, needsPrecedingSemicolon } = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow calls to the `Object` constructor without an argument",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-object-constructor"
			},
			hasSuggestions: !0,
			schema: [],
			messages: {
				preferLiteral: "The object literal notation {} is preferable.",
				useLiteral: "Replace with '{{replacement}}'.",
				useLiteralAfterSemicolon: "Replace with '{{replacement}}', add preceding semicolon."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Determines whether or not an object literal that replaces a specified node needs to be enclosed in parentheses.
			* @param {ASTNode} node The node to be replaced.
			* @returns {boolean} Whether or not parentheses around the object literal are required.
			*/
			function needsParentheses(node) {
				if (isStartOfExpressionStatement(node)) return !0;
				let prevToken = sourceCode.getTokenBefore(node);
				return !!(prevToken && isArrowToken(prevToken));
			}
			/**
			* Reports on nodes where the `Object` constructor is called without arguments.
			* @param {ASTNode} node The node to evaluate.
			* @returns {void}
			*/
			function check(node) {
				if (node.callee.type !== "Identifier" || node.callee.name !== "Object" || node.arguments.length) return;
				let variable = getVariableByName(sourceCode.getScope(node), "Object");
				if (variable && variable.identifiers.length === 0) {
					let replacement, fixText, messageId = "useLiteral";
					needsParentheses(node) ? (replacement = "({})", needsPrecedingSemicolon(sourceCode, node) ? (fixText = ";({})", messageId = "useLiteralAfterSemicolon") : fixText = "({})") : replacement = fixText = "{}", context.report({
						node,
						messageId: "preferLiteral",
						suggest: [{
							messageId,
							data: { replacement },
							fix: (fixer) => fixer.replaceText(node, fixText)
						}]
					});
				}
			}
			return {
				CallExpression: check,
				NewExpression: check
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-object-constructor.cjs
module.exports = require_no_object_constructor().create;
//#endregion
