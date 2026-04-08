const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/brace-style.js
/**
* @fileoverview Rule to flag block statements that do not use the one true brace style
* @author Ian Christian Myers
* @deprecated in ESLint v8.53.0
*/
var require_brace_style = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "brace-style",
						url: "https://eslint.style/rules/brace-style"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent brace style for blocks",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/brace-style"
			},
			schema: [{ enum: [
				"1tbs",
				"stroustrup",
				"allman"
			] }, {
				type: "object",
				properties: { allowSingleLine: {
					type: "boolean",
					default: !1
				} },
				additionalProperties: !1
			}],
			fixable: "whitespace",
			messages: {
				nextLineOpen: "Opening curly brace does not appear on the same line as controlling statement.",
				sameLineOpen: "Opening curly brace appears on the same line as controlling statement.",
				blockSameLine: "Statement inside of curly braces should be on next line.",
				nextLineClose: "Closing curly brace does not appear on the same line as the subsequent block.",
				singleLineClose: "Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.",
				sameLineClose: "Closing curly brace appears on the same line as the subsequent block."
			}
		},
		create(context) {
			let style = context.options[0] || "1tbs", params = context.options[1] || {}, sourceCode = context.sourceCode;
			/**
			* Fixes a place where a newline unexpectedly appears
			* @param {Token} firstToken The token before the unexpected newline
			* @param {Token} secondToken The token after the unexpected newline
			* @returns {Function} A fixer function to remove the newlines between the tokens
			*/
			function removeNewlineBetween(firstToken, secondToken) {
				let textRange = [firstToken.range[1], secondToken.range[0]];
				return sourceCode.text.slice(textRange[0], textRange[1]).trim() ? null : (fixer) => fixer.replaceTextRange(textRange, " ");
			}
			/**
			* Validates a pair of curly brackets based on the user's config
			* @param {Token} openingCurly The opening curly bracket
			* @param {Token} closingCurly The closing curly bracket
			* @returns {void}
			*/
			function validateCurlyPair(openingCurly, closingCurly) {
				let tokenBeforeOpeningCurly = sourceCode.getTokenBefore(openingCurly), tokenAfterOpeningCurly = sourceCode.getTokenAfter(openingCurly), tokenBeforeClosingCurly = sourceCode.getTokenBefore(closingCurly), singleLineException = params.allowSingleLine && astUtils.isTokenOnSameLine(openingCurly, closingCurly);
				style !== "allman" && !astUtils.isTokenOnSameLine(tokenBeforeOpeningCurly, openingCurly) && context.report({
					node: openingCurly,
					messageId: "nextLineOpen",
					fix: removeNewlineBetween(tokenBeforeOpeningCurly, openingCurly)
				}), style === "allman" && astUtils.isTokenOnSameLine(tokenBeforeOpeningCurly, openingCurly) && !singleLineException && context.report({
					node: openingCurly,
					messageId: "sameLineOpen",
					fix: (fixer) => fixer.insertTextBefore(openingCurly, "\n")
				}), astUtils.isTokenOnSameLine(openingCurly, tokenAfterOpeningCurly) && tokenAfterOpeningCurly !== closingCurly && !singleLineException && context.report({
					node: openingCurly,
					messageId: "blockSameLine",
					fix: (fixer) => fixer.insertTextAfter(openingCurly, "\n")
				}), tokenBeforeClosingCurly !== openingCurly && !singleLineException && astUtils.isTokenOnSameLine(tokenBeforeClosingCurly, closingCurly) && context.report({
					node: closingCurly,
					messageId: "singleLineClose",
					fix: (fixer) => fixer.insertTextBefore(closingCurly, "\n")
				});
			}
			/**
			* Validates the location of a token that appears before a keyword (e.g. a newline before `else`)
			* @param {Token} curlyToken The closing curly token. This is assumed to precede a keyword token (such as `else` or `finally`).
			* @returns {void}
			*/
			function validateCurlyBeforeKeyword(curlyToken) {
				let keywordToken = sourceCode.getTokenAfter(curlyToken);
				style === "1tbs" && !astUtils.isTokenOnSameLine(curlyToken, keywordToken) && context.report({
					node: curlyToken,
					messageId: "nextLineClose",
					fix: removeNewlineBetween(curlyToken, keywordToken)
				}), style !== "1tbs" && astUtils.isTokenOnSameLine(curlyToken, keywordToken) && context.report({
					node: curlyToken,
					messageId: "sameLineClose",
					fix: (fixer) => fixer.insertTextAfter(curlyToken, "\n")
				});
			}
			return {
				BlockStatement(node) {
					astUtils.STATEMENT_LIST_PARENTS.has(node.parent.type) || validateCurlyPair(sourceCode.getFirstToken(node), sourceCode.getLastToken(node));
				},
				StaticBlock(node) {
					validateCurlyPair(sourceCode.getFirstToken(node, { skip: 1 }), sourceCode.getLastToken(node));
				},
				ClassBody(node) {
					validateCurlyPair(sourceCode.getFirstToken(node), sourceCode.getLastToken(node));
				},
				SwitchStatement(node) {
					let closingCurly = sourceCode.getLastToken(node);
					validateCurlyPair(sourceCode.getTokenBefore(node.cases.length ? node.cases[0] : closingCurly), closingCurly);
				},
				IfStatement(node) {
					node.consequent.type === "BlockStatement" && node.alternate && validateCurlyBeforeKeyword(sourceCode.getLastToken(node.consequent));
				},
				TryStatement(node) {
					validateCurlyBeforeKeyword(sourceCode.getLastToken(node.block)), node.handler && node.finalizer && validateCurlyBeforeKeyword(sourceCode.getLastToken(node.handler.body));
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/brace-style.cjs
module.exports = require_brace_style().create;
//#endregion
