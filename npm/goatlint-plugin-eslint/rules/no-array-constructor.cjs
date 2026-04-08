const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-array-constructor.js
/**
* @fileoverview Disallow construction of dense arrays using the Array constructor
* @author Matt DuVall <http://www.mattduvall.com/>
*/
var require_no_array_constructor = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { getVariableByName, isClosingParenToken, isOpeningParenToken, isStartOfExpressionStatement, needsPrecedingSemicolon } = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			dialects: ["javascript", "typescript"],
			language: "javascript",
			type: "suggestion",
			docs: {
				description: "Disallow `Array` constructors",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-array-constructor"
			},
			fixable: "code",
			hasSuggestions: !0,
			schema: [],
			messages: {
				preferLiteral: "The array literal notation [] is preferable.",
				useLiteral: "Replace with an array literal.",
				useLiteralAfterSemicolon: "Replace with an array literal, add preceding semicolon."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Checks if there are comments in Array constructor expressions.
			* @param {ASTNode} node A CallExpression or NewExpression node.
			* @returns {boolean} True if there are comments, false otherwise.
			*/
			function hasCommentsInArrayConstructor(node) {
				let firstToken = sourceCode.getFirstToken(node), lastToken = sourceCode.getLastToken(node), lastRelevantToken = sourceCode.getLastToken(node.callee);
				for (; lastRelevantToken !== lastToken && !isOpeningParenToken(lastRelevantToken);) lastRelevantToken = sourceCode.getTokenAfter(lastRelevantToken);
				return sourceCode.commentsExistBetween(firstToken, lastRelevantToken);
			}
			/**
			* Gets the text between the calling parentheses of a CallExpression or NewExpression.
			* @param {ASTNode} node A CallExpression or NewExpression node.
			* @returns {string} The text between the calling parentheses, or an empty string if there are none.
			*/
			function getArgumentsText(node) {
				let lastToken = sourceCode.getLastToken(node);
				if (!isClosingParenToken(lastToken)) return "";
				let firstToken = node.callee;
				do
					if (firstToken = sourceCode.getTokenAfter(firstToken), !firstToken || firstToken === lastToken) return "";
				while (!isOpeningParenToken(firstToken));
				return sourceCode.text.slice(firstToken.range[1], lastToken.range[0]);
			}
			/**
			* Disallow construction of dense arrays using the Array constructor
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function check(node) {
				if (node.callee.type !== "Identifier" || node.callee.name !== "Array" || node.typeArguments || node.arguments.length === 1 && node.arguments[0].type !== "SpreadElement") return;
				let variable = getVariableByName(sourceCode.getScope(node), "Array");
				if (variable && variable.identifiers.length === 0) {
					let argsText = getArgumentsText(node), fixText, messageId, nonSpreadCount = node.arguments.reduce((count, arg) => arg.type === "SpreadElement" ? count : count + 1, 0), shouldSuggest = node.optional || node.arguments.length > 0 && nonSpreadCount < 2 || hasCommentsInArrayConstructor(node);
					isStartOfExpressionStatement(node) && needsPrecedingSemicolon(sourceCode, node) ? (fixText = `;[${argsText}]`, messageId = "useLiteralAfterSemicolon") : (fixText = `[${argsText}]`, messageId = "useLiteral"), context.report({
						node,
						messageId: "preferLiteral",
						fix(fixer) {
							return shouldSuggest ? null : fixer.replaceText(node, fixText);
						},
						suggest: [{
							messageId,
							fix(fixer) {
								return shouldSuggest ? fixer.replaceText(node, fixText) : null;
							}
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
//#region src-js/generated/plugin-eslint/rules/no-array-constructor.cjs
module.exports = require_no_array_constructor().create;
//#endregion
