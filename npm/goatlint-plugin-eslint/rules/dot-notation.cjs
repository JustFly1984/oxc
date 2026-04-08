const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_keywords$1 = require("../common/keywords.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/dot-notation.js
/**
* @fileoverview Rule to warn about using dot notation instead of square bracket notation when possible.
* @author Josh Perez
*/
var require_dot_notation = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), keywords = require_keywords$1.t(), validIdentifier = /^[a-zA-Z_$][\w$]*$/u, literalTypesToCheck = new Set(["string", "boolean"]);
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				allowKeywords: !0,
				allowPattern: ""
			}],
			docs: {
				description: "Enforce dot notation whenever possible",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/dot-notation"
			},
			schema: [{
				type: "object",
				properties: {
					allowKeywords: { type: "boolean" },
					allowPattern: { type: "string" }
				},
				additionalProperties: !1
			}],
			fixable: "code",
			messages: {
				useDot: "[{{key}}] is better written in dot notation.",
				useBrackets: ".{{key}} is a syntax error."
			}
		},
		create(context) {
			let [options] = context.options, allowKeywords = options.allowKeywords, sourceCode = context.sourceCode, allowPattern;
			options.allowPattern && (allowPattern = new RegExp(options.allowPattern, "u"));
			/**
			* Check if the property is valid dot notation
			* @param {ASTNode} node The dot notation node
			* @param {string} value Value which is to be checked
			* @returns {void}
			*/
			function checkComputedProperty(node, value) {
				if (validIdentifier.test(value) && (allowKeywords || !keywords.includes(String(value))) && !(allowPattern && allowPattern.test(value))) {
					let formattedValue = node.property.type === "Literal" ? JSON.stringify(value) : `\`${value}\``;
					context.report({
						node: node.property,
						messageId: "useDot",
						data: { key: formattedValue },
						*fix(fixer) {
							let leftBracket = sourceCode.getTokenAfter(node.object, astUtils.isOpeningBracketToken), rightBracket = sourceCode.getLastToken(node), nextToken = sourceCode.getTokenAfter(node);
							sourceCode.commentsExistBetween(leftBracket, rightBracket) || (node.optional || (yield fixer.insertTextBefore(leftBracket, astUtils.isDecimalInteger(node.object) ? " ." : ".")), yield fixer.replaceTextRange([leftBracket.range[0], rightBracket.range[1]], value), nextToken && rightBracket.range[1] === nextToken.range[0] && !astUtils.canTokensBeAdjacent(String(value), nextToken) && (yield fixer.insertTextAfter(node, " ")));
						}
					});
				}
			}
			return { MemberExpression(node) {
				node.computed && node.property.type === "Literal" && (literalTypesToCheck.has(typeof node.property.value) || astUtils.isNullLiteral(node.property)) && checkComputedProperty(node, node.property.value), node.computed && astUtils.isStaticTemplateLiteral(node.property) && checkComputedProperty(node, node.property.quasis[0].value.cooked), !allowKeywords && !node.computed && node.property.type === "Identifier" && keywords.includes(String(node.property.name)) && context.report({
					node: node.property,
					messageId: "useBrackets",
					data: { key: node.property.name },
					*fix(fixer) {
						let dotToken = sourceCode.getTokenBefore(node.property);
						node.object.type === "Identifier" && node.object.name === "let" && !node.optional || sourceCode.commentsExistBetween(dotToken, node.property) || (node.optional || (yield fixer.remove(dotToken)), yield fixer.replaceText(node.property, `["${node.property.name}"]`));
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/dot-notation.cjs
module.exports = require_dot_notation().create;
//#endregion
