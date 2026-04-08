const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/switch-colon-spacing.js
/**
* @fileoverview Rule to enforce spacing around colons of switch statements.
* @author Toru Nagashima
* @deprecated in ESLint v8.53.0
*/
var require_switch_colon_spacing = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "switch-colon-spacing",
						url: "https://eslint.style/rules/switch-colon-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce spacing around colons of switch statements",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/switch-colon-spacing"
			},
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
			fixable: "whitespace",
			messages: {
				expectedBefore: "Expected space(s) before this colon.",
				expectedAfter: "Expected space(s) after this colon.",
				unexpectedBefore: "Unexpected space(s) before this colon.",
				unexpectedAfter: "Unexpected space(s) after this colon."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, options = context.options[0] || {}, beforeSpacing = options.before === !0, afterSpacing = options.after !== !1;
			/**
			* Check whether the spacing between the given 2 tokens is valid or not.
			* @param {Token} left The left token to check.
			* @param {Token} right The right token to check.
			* @param {boolean} expected The expected spacing to check. `true` if there should be a space.
			* @returns {boolean} `true` if the spacing between the tokens is valid.
			*/
			function isValidSpacing(left, right, expected) {
				return astUtils.isClosingBraceToken(right) || !astUtils.isTokenOnSameLine(left, right) || sourceCode.isSpaceBetweenTokens(left, right) === expected;
			}
			/**
			* Check whether comments exist between the given 2 tokens.
			* @param {Token} left The left token to check.
			* @param {Token} right The right token to check.
			* @returns {boolean} `true` if comments exist between the given 2 tokens.
			*/
			function commentsExistBetween(left, right) {
				return sourceCode.getFirstTokenBetween(left, right, {
					includeComments: !0,
					filter: astUtils.isCommentToken
				}) !== null;
			}
			/**
			* Fix the spacing between the given 2 tokens.
			* @param {RuleFixer} fixer The fixer to fix.
			* @param {Token} left The left token of fix range.
			* @param {Token} right The right token of fix range.
			* @param {boolean} spacing The spacing style. `true` if there should be a space.
			* @returns {Fix|null} The fix object.
			*/
			function fix(fixer, left, right, spacing) {
				return commentsExistBetween(left, right) ? null : spacing ? fixer.insertTextAfter(left, " ") : fixer.removeRange([left.range[1], right.range[0]]);
			}
			return { SwitchCase(node) {
				let colonToken = astUtils.getSwitchCaseColonToken(node, sourceCode), beforeToken = sourceCode.getTokenBefore(colonToken), afterToken = sourceCode.getTokenAfter(colonToken);
				isValidSpacing(beforeToken, colonToken, beforeSpacing) || context.report({
					node,
					loc: colonToken.loc,
					messageId: beforeSpacing ? "expectedBefore" : "unexpectedBefore",
					fix: (fixer) => fix(fixer, beforeToken, colonToken, beforeSpacing)
				}), isValidSpacing(colonToken, afterToken, afterSpacing) || context.report({
					node,
					loc: colonToken.loc,
					messageId: afterSpacing ? "expectedAfter" : "unexpectedAfter",
					fix: (fixer) => fix(fixer, colonToken, afterToken, afterSpacing)
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/switch-colon-spacing.cjs
module.exports = require_switch_colon_spacing().create;
//#endregion
