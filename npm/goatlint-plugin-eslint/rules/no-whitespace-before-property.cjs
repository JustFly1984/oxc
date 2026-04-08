const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-whitespace-before-property.js
/**
* @fileoverview Rule to disallow whitespace before properties
* @author Kai Cataldo
* @deprecated in ESLint v8.53.0
*/
var require_no_whitespace_before_property = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Formatting rules are being moved out of ESLint core.",
				url: "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
				deprecatedSince: "8.53.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "ESLint Stylistic now maintains deprecated stylistic core rules.",
					url: "https://eslint.style/guide/migration",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "no-whitespace-before-property",
						url: "https://eslint.style/rules/no-whitespace-before-property"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Disallow whitespace before properties",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-whitespace-before-property"
			},
			fixable: "whitespace",
			schema: [],
			messages: { unexpectedWhitespace: "Unexpected whitespace before property {{propName}}." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Reports whitespace before property token
			* @param {ASTNode} node the node to report in the event of an error
			* @param {Token} leftToken the left token
			* @param {Token} rightToken the right token
			* @returns {void}
			* @private
			*/
			function reportError(node, leftToken, rightToken) {
				context.report({
					node,
					messageId: "unexpectedWhitespace",
					data: { propName: sourceCode.getText(node.property) },
					fix(fixer) {
						let replacementText = "";
						return !node.computed && !node.optional && astUtils.isDecimalInteger(node.object) || sourceCode.commentsExistBetween(leftToken, rightToken) ? null : (node.optional ? replacementText = "?." : node.computed || (replacementText = "."), fixer.replaceTextRange([leftToken.range[1], rightToken.range[0]], replacementText));
					}
				});
			}
			return { MemberExpression(node) {
				let rightToken, leftToken;
				astUtils.isTokenOnSameLine(node.object, node.property) && (node.computed ? (rightToken = sourceCode.getTokenBefore(node.property, astUtils.isOpeningBracketToken), leftToken = sourceCode.getTokenBefore(rightToken, node.optional ? 1 : 0)) : (rightToken = sourceCode.getFirstToken(node.property), leftToken = sourceCode.getTokenBefore(rightToken, 1)), sourceCode.isSpaceBetweenTokens(leftToken, rightToken) && reportError(node, leftToken, rightToken));
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-whitespace-before-property.cjs
module.exports = require_no_whitespace_before_property().create;
//#endregion
