const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/space-in-parens.js
/**
* @fileoverview Disallows or enforces spaces inside of parentheses.
* @author Jonathan Rajavuori
* @deprecated in ESLint v8.53.0
*/
var require_space_in_parens = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "space-in-parens",
						url: "https://eslint.style/rules/space-in-parens"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent spacing inside parentheses",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/space-in-parens"
			},
			fixable: "whitespace",
			schema: [{ enum: ["always", "never"] }, {
				type: "object",
				properties: { exceptions: {
					type: "array",
					items: { enum: [
						"{}",
						"[]",
						"()",
						"empty"
					] },
					uniqueItems: !0
				} },
				additionalProperties: !1
			}],
			messages: {
				missingOpeningSpace: "There must be a space after this paren.",
				missingClosingSpace: "There must be a space before this paren.",
				rejectedOpeningSpace: "There should be no space after this paren.",
				rejectedClosingSpace: "There should be no space before this paren."
			}
		},
		create(context) {
			let ALWAYS = context.options[0] === "always", exceptionsArrayOptions = context.options[1] && context.options[1].exceptions || [], options = {}, exceptions;
			exceptionsArrayOptions.length && (options.braceException = exceptionsArrayOptions.includes("{}"), options.bracketException = exceptionsArrayOptions.includes("[]"), options.parenException = exceptionsArrayOptions.includes("()"), options.empty = exceptionsArrayOptions.includes("empty"));
			/**
			* Produces an object with the opener and closer exception values
			* @returns {Object} `openers` and `closers` exception values
			* @private
			*/
			function getExceptions() {
				let openers = [], closers = [];
				return options.braceException && (openers.push("{"), closers.push("}")), options.bracketException && (openers.push("["), closers.push("]")), options.parenException && (openers.push("("), closers.push(")")), options.empty && (openers.push(")"), closers.push("(")), {
					openers,
					closers
				};
			}
			let sourceCode = context.sourceCode;
			/**
			* Determines if a token is one of the exceptions for the opener paren
			* @param {Object} token The token to check
			* @returns {boolean} True if the token is one of the exceptions for the opener paren
			*/
			function isOpenerException(token) {
				return exceptions.openers.includes(token.value);
			}
			/**
			* Determines if a token is one of the exceptions for the closer paren
			* @param {Object} token The token to check
			* @returns {boolean} True if the token is one of the exceptions for the closer paren
			*/
			function isCloserException(token) {
				return exceptions.closers.includes(token.value);
			}
			/**
			* Determines if an opening paren is immediately followed by a required space
			* @param {Object} openingParenToken The paren token
			* @param {Object} tokenAfterOpeningParen The token after it
			* @returns {boolean} True if the opening paren is missing a required space
			*/
			function openerMissingSpace(openingParenToken, tokenAfterOpeningParen) {
				return sourceCode.isSpaceBetweenTokens(openingParenToken, tokenAfterOpeningParen) || !options.empty && astUtils.isClosingParenToken(tokenAfterOpeningParen) ? !1 : ALWAYS ? !isOpenerException(tokenAfterOpeningParen) : isOpenerException(tokenAfterOpeningParen);
			}
			/**
			* Determines if an opening paren is immediately followed by a disallowed space
			* @param {Object} openingParenToken The paren token
			* @param {Object} tokenAfterOpeningParen The token after it
			* @returns {boolean} True if the opening paren has a disallowed space
			*/
			function openerRejectsSpace(openingParenToken, tokenAfterOpeningParen) {
				return !astUtils.isTokenOnSameLine(openingParenToken, tokenAfterOpeningParen) || tokenAfterOpeningParen.type === "Line" || !sourceCode.isSpaceBetweenTokens(openingParenToken, tokenAfterOpeningParen) ? !1 : ALWAYS ? isOpenerException(tokenAfterOpeningParen) : !isOpenerException(tokenAfterOpeningParen);
			}
			/**
			* Determines if a closing paren is immediately preceded by a required space
			* @param {Object} tokenBeforeClosingParen The token before the paren
			* @param {Object} closingParenToken The paren token
			* @returns {boolean} True if the closing paren is missing a required space
			*/
			function closerMissingSpace(tokenBeforeClosingParen, closingParenToken) {
				return sourceCode.isSpaceBetweenTokens(tokenBeforeClosingParen, closingParenToken) || !options.empty && astUtils.isOpeningParenToken(tokenBeforeClosingParen) ? !1 : ALWAYS ? !isCloserException(tokenBeforeClosingParen) : isCloserException(tokenBeforeClosingParen);
			}
			/**
			* Determines if a closer paren is immediately preceded by a disallowed space
			* @param {Object} tokenBeforeClosingParen The token before the paren
			* @param {Object} closingParenToken The paren token
			* @returns {boolean} True if the closing paren has a disallowed space
			*/
			function closerRejectsSpace(tokenBeforeClosingParen, closingParenToken) {
				return !astUtils.isTokenOnSameLine(tokenBeforeClosingParen, closingParenToken) || !sourceCode.isSpaceBetweenTokens(tokenBeforeClosingParen, closingParenToken) ? !1 : ALWAYS ? isCloserException(tokenBeforeClosingParen) : !isCloserException(tokenBeforeClosingParen);
			}
			return { Program: function checkParenSpaces(node) {
				exceptions = getExceptions();
				let tokens = sourceCode.tokensAndComments;
				tokens.forEach((token, i) => {
					let prevToken = tokens[i - 1], nextToken = tokens[i + 1];
					!astUtils.isOpeningParenToken(token) && !astUtils.isClosingParenToken(token) || (token.value === "(" && openerMissingSpace(token, nextToken) && context.report({
						node,
						loc: token.loc,
						messageId: "missingOpeningSpace",
						fix(fixer) {
							return fixer.insertTextAfter(token, " ");
						}
					}), token.value === "(" && openerRejectsSpace(token, nextToken) && context.report({
						node,
						loc: {
							start: token.loc.end,
							end: nextToken.loc.start
						},
						messageId: "rejectedOpeningSpace",
						fix(fixer) {
							return fixer.removeRange([token.range[1], nextToken.range[0]]);
						}
					}), token.value === ")" && closerMissingSpace(prevToken, token) && context.report({
						node,
						loc: token.loc,
						messageId: "missingClosingSpace",
						fix(fixer) {
							return fixer.insertTextBefore(token, " ");
						}
					}), token.value === ")" && closerRejectsSpace(prevToken, token) && context.report({
						node,
						loc: {
							start: prevToken.loc.end,
							end: token.loc.start
						},
						messageId: "rejectedClosingSpace",
						fix(fixer) {
							return fixer.removeRange([prevToken.range[1], token.range[0]]);
						}
					}));
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/space-in-parens.cjs
module.exports = require_space_in_parens().create;
//#endregion
