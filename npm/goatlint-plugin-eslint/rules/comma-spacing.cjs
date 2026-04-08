const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/comma-spacing.js
/**
* @fileoverview Comma spacing - validates spacing before and after comma
* @author Vignesh Anand aka vegetableman.
* @deprecated in ESLint v8.53.0
*/
var require_comma_spacing = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "comma-spacing",
						url: "https://eslint.style/rules/comma-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent spacing before and after commas",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/comma-spacing"
			},
			fixable: "whitespace",
			schema: [{
				type: "object",
				properties: {
					before: {
						type: "boolean",
						default: !1
					},
					after: {
						type: "boolean",
						default: !0
					}
				},
				additionalProperties: !1
			}],
			messages: {
				missing: "A space is required {{loc}} ','.",
				unexpected: "There should be no space {{loc}} ','."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, tokensAndComments = sourceCode.tokensAndComments, options = {
				before: context.options[0] ? context.options[0].before : !1,
				after: context.options[0] ? context.options[0].after : !0
			}, commaTokensToIgnore = [];
			/**
			* Reports a spacing error with an appropriate message.
			* @param {ASTNode} node The binary expression node to report.
			* @param {string} loc Is the error "before" or "after" the comma?
			* @param {ASTNode} otherNode The node at the left or right of `node`
			* @returns {void}
			* @private
			*/
			function report(node, loc, otherNode) {
				context.report({
					node,
					fix(fixer) {
						if (options[loc]) return loc === "before" ? fixer.insertTextBefore(node, " ") : fixer.insertTextAfter(node, " ");
						let start, end;
						return loc === "before" ? (start = otherNode.range[1], end = node.range[0]) : (start = node.range[1], end = otherNode.range[0]), fixer.replaceTextRange([start, end], "");
					},
					messageId: options[loc] ? "missing" : "unexpected",
					data: { loc }
				});
			}
			/**
			* Adds null elements of the given ArrayExpression or ArrayPattern node to the ignore list.
			* @param {ASTNode} node An ArrayExpression or ArrayPattern node.
			* @returns {void}
			*/
			function addNullElementsToIgnoreList(node) {
				let previousToken = sourceCode.getFirstToken(node);
				node.elements.forEach((element) => {
					let token;
					element === null ? (token = sourceCode.getTokenAfter(previousToken), astUtils.isCommaToken(token) && commaTokensToIgnore.push(token)) : token = sourceCode.getTokenAfter(element), previousToken = token;
				});
			}
			return {
				"Program:exit"() {
					tokensAndComments.forEach((token, i) => {
						if (!astUtils.isCommaToken(token)) return;
						let previousToken = tokensAndComments[i - 1], nextToken = tokensAndComments[i + 1];
						previousToken && !astUtils.isCommaToken(previousToken) && !commaTokensToIgnore.includes(token) && astUtils.isTokenOnSameLine(previousToken, token) && options.before !== sourceCode.isSpaceBetweenTokens(previousToken, token) && report(token, "before", previousToken), nextToken && !astUtils.isCommaToken(nextToken) && !astUtils.isClosingParenToken(nextToken) && !astUtils.isClosingBracketToken(nextToken) && !astUtils.isClosingBraceToken(nextToken) && !(!options.after && nextToken.type === "Line") && astUtils.isTokenOnSameLine(token, nextToken) && options.after !== sourceCode.isSpaceBetweenTokens(token, nextToken) && report(token, "after", nextToken);
					});
				},
				ArrayExpression: addNullElementsToIgnoreList,
				ArrayPattern: addNullElementsToIgnoreList
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/comma-spacing.cjs
module.exports = require_comma_spacing().create;
//#endregion
