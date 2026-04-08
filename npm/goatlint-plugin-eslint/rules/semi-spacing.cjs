const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/semi-spacing.js
/**
* @fileoverview Validates spacing before and after semicolon
* @author Mathias Schreck
* @deprecated in ESLint v8.53.0
*/
var require_semi_spacing = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "semi-spacing",
						url: "https://eslint.style/rules/semi-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent spacing before and after semicolons",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/semi-spacing"
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
				unexpectedWhitespaceBefore: "Unexpected whitespace before semicolon.",
				unexpectedWhitespaceAfter: "Unexpected whitespace after semicolon.",
				missingWhitespaceBefore: "Missing whitespace before semicolon.",
				missingWhitespaceAfter: "Missing whitespace after semicolon."
			}
		},
		create(context) {
			let config = context.options[0], sourceCode = context.sourceCode, requireSpaceBefore = !1, requireSpaceAfter = !0;
			typeof config == "object" && (requireSpaceBefore = config.before, requireSpaceAfter = config.after);
			/**
			* Checks if a given token has leading whitespace.
			* @param {Object} token The token to check.
			* @returns {boolean} True if the given token has leading space, false if not.
			*/
			function hasLeadingSpace(token) {
				let tokenBefore = sourceCode.getTokenBefore(token);
				return tokenBefore && astUtils.isTokenOnSameLine(tokenBefore, token) && sourceCode.isSpaceBetweenTokens(tokenBefore, token);
			}
			/**
			* Checks if a given token has trailing whitespace.
			* @param {Object} token The token to check.
			* @returns {boolean} True if the given token has trailing space, false if not.
			*/
			function hasTrailingSpace(token) {
				let tokenAfter = sourceCode.getTokenAfter(token);
				return tokenAfter && astUtils.isTokenOnSameLine(token, tokenAfter) && sourceCode.isSpaceBetweenTokens(token, tokenAfter);
			}
			/**
			* Checks if the given token is the last token in its line.
			* @param {Token} token The token to check.
			* @returns {boolean} Whether or not the token is the last in its line.
			*/
			function isLastTokenInCurrentLine(token) {
				let tokenAfter = sourceCode.getTokenAfter(token);
				return !(tokenAfter && astUtils.isTokenOnSameLine(token, tokenAfter));
			}
			/**
			* Checks if the given token is the first token in its line
			* @param {Token} token The token to check.
			* @returns {boolean} Whether or not the token is the first in its line.
			*/
			function isFirstTokenInCurrentLine(token) {
				let tokenBefore = sourceCode.getTokenBefore(token);
				return !(tokenBefore && astUtils.isTokenOnSameLine(token, tokenBefore));
			}
			/**
			* Checks if the next token of a given token is a closing parenthesis.
			* @param {Token} token The token to check.
			* @returns {boolean} Whether or not the next token of a given token is a closing parenthesis.
			*/
			function isBeforeClosingParen(token) {
				let nextToken = sourceCode.getTokenAfter(token);
				return nextToken && astUtils.isClosingBraceToken(nextToken) || astUtils.isClosingParenToken(nextToken);
			}
			/**
			* Report location example :
			*
			* for unexpected space `before`
			*
			* var a = 'b'   ;
			*            ^^^
			*
			* for unexpected space `after`
			*
			* var a = 'b';  c = 10;
			*             ^^
			*
			* Reports if the given token has invalid spacing.
			* @param {Token} token The semicolon token to check.
			* @param {ASTNode} node The corresponding node of the token.
			* @returns {void}
			*/
			function checkSemicolonSpacing(token, node) {
				if (astUtils.isSemicolonToken(token)) {
					if (hasLeadingSpace(token)) {
						if (!requireSpaceBefore) {
							let tokenBefore = sourceCode.getTokenBefore(token), loc = {
								start: tokenBefore.loc.end,
								end: token.loc.start
							};
							context.report({
								node,
								loc,
								messageId: "unexpectedWhitespaceBefore",
								fix(fixer) {
									return fixer.removeRange([tokenBefore.range[1], token.range[0]]);
								}
							});
						}
					} else if (requireSpaceBefore) {
						let loc = token.loc;
						context.report({
							node,
							loc,
							messageId: "missingWhitespaceBefore",
							fix(fixer) {
								return fixer.insertTextBefore(token, " ");
							}
						});
					}
					if (!isFirstTokenInCurrentLine(token) && !isLastTokenInCurrentLine(token) && !isBeforeClosingParen(token)) {
						if (hasTrailingSpace(token)) {
							if (!requireSpaceAfter) {
								let tokenAfter = sourceCode.getTokenAfter(token), loc = {
									start: token.loc.end,
									end: tokenAfter.loc.start
								};
								context.report({
									node,
									loc,
									messageId: "unexpectedWhitespaceAfter",
									fix(fixer) {
										return fixer.removeRange([token.range[1], tokenAfter.range[0]]);
									}
								});
							}
						} else if (requireSpaceAfter) {
							let loc = token.loc;
							context.report({
								node,
								loc,
								messageId: "missingWhitespaceAfter",
								fix(fixer) {
									return fixer.insertTextAfter(token, " ");
								}
							});
						}
					}
				}
			}
			/**
			* Checks the spacing of the semicolon with the assumption that the last token is the semicolon.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			*/
			function checkNode(node) {
				checkSemicolonSpacing(sourceCode.getLastToken(node), node);
			}
			return {
				VariableDeclaration: checkNode,
				ExpressionStatement: checkNode,
				BreakStatement: checkNode,
				ContinueStatement: checkNode,
				DebuggerStatement: checkNode,
				DoWhileStatement: checkNode,
				ReturnStatement: checkNode,
				ThrowStatement: checkNode,
				ImportDeclaration: checkNode,
				ExportNamedDeclaration: checkNode,
				ExportAllDeclaration: checkNode,
				ExportDefaultDeclaration: checkNode,
				ForStatement(node) {
					node.init && checkSemicolonSpacing(sourceCode.getTokenAfter(node.init), node), node.test && checkSemicolonSpacing(sourceCode.getTokenAfter(node.test), node);
				},
				PropertyDefinition: checkNode
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/semi-spacing.cjs
module.exports = require_semi_spacing().create;
//#endregion
