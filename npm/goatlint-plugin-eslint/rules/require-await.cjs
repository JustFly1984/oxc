const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/require-await.js
/**
* @fileoverview Rule to disallow async functions which have no `await` expression.
* @author Toru Nagashima
*/
var require_require_await = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Capitalize the 1st letter of the given text.
	* @param {string} text The text to capitalize.
	* @returns {string} The text that the 1st letter was capitalized.
	*/
	function capitalizeFirstLetter(text) {
		return text[0].toUpperCase() + text.slice(1);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow async functions which have no `await` expression",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/require-await"
			},
			schema: [],
			messages: {
				missingAwait: "{{name}} has no 'await' expression.",
				removeAsync: "Remove 'async'."
			},
			hasSuggestions: !0
		},
		create(context) {
			let sourceCode = context.sourceCode, scopeInfo = null;
			/**
			* Push the scope info object to the stack.
			* @returns {void}
			*/
			function enterFunction() {
				scopeInfo = {
					upper: scopeInfo,
					hasAwait: !1
				};
			}
			/**
			* Pop the top scope info object from the stack.
			* Also, it reports the function if needed.
			* @param {ASTNode} node The node to report.
			* @returns {void}
			*/
			function exitFunction(node) {
				if (!node.generator && node.async && !scopeInfo.hasAwait && !astUtils.isEmptyFunction(node)) {
					let nodeWithAsyncKeyword = node.parent.type === "MethodDefinition" && node.parent.value === node || node.parent.type === "Property" && node.parent.method && node.parent.value === node ? node.parent : node, asyncToken = sourceCode.getFirstToken(nodeWithAsyncKeyword, (token) => token.value === "async"), asyncRange = [asyncToken.range[0], sourceCode.getTokenAfter(asyncToken, { includeComments: !0 }).range[0]], nextToken = sourceCode.getTokenAfter(asyncToken), addSemiColon = nextToken.type === "Punctuator" && (nextToken.value === "[" || nextToken.value === "(") && (nodeWithAsyncKeyword.type === "MethodDefinition" || astUtils.isStartOfExpressionStatement(nodeWithAsyncKeyword)) && astUtils.needsPrecedingSemicolon(sourceCode, nodeWithAsyncKeyword);
					context.report({
						node,
						loc: astUtils.getFunctionHeadLoc(node, sourceCode),
						messageId: "missingAwait",
						data: { name: capitalizeFirstLetter(astUtils.getFunctionNameWithKind(node)) },
						suggest: [{
							messageId: "removeAsync",
							fix: (fixer) => fixer.replaceTextRange(asyncRange, addSemiColon ? ";" : "")
						}]
					});
				}
				scopeInfo = scopeInfo.upper;
			}
			return {
				FunctionDeclaration: enterFunction,
				FunctionExpression: enterFunction,
				ArrowFunctionExpression: enterFunction,
				"FunctionDeclaration:exit": exitFunction,
				"FunctionExpression:exit": exitFunction,
				"ArrowFunctionExpression:exit": exitFunction,
				AwaitExpression() {
					scopeInfo && (scopeInfo.hasAwait = !0);
				},
				ForOfStatement(node) {
					scopeInfo && node.await && (scopeInfo.hasAwait = !0);
				},
				VariableDeclaration(node) {
					scopeInfo && node.kind === "await using" && (scopeInfo.hasAwait = !0);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/require-await.cjs
module.exports = require_require_await().create;
//#endregion
