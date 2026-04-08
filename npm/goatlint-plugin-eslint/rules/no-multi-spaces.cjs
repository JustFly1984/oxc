const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-multi-spaces.js
/**
* @fileoverview Disallow use of multiple spaces.
* @author Nicholas C. Zakas
* @deprecated in ESLint v8.53.0
*/
var require_no_multi_spaces = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "no-multi-spaces",
						url: "https://eslint.style/rules/no-multi-spaces"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Disallow multiple spaces",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-multi-spaces"
			},
			fixable: "whitespace",
			schema: [{
				type: "object",
				properties: {
					exceptions: {
						type: "object",
						patternProperties: { "^([A-Z][a-z]*)+$": { type: "boolean" } },
						additionalProperties: !1
					},
					ignoreEOLComments: {
						type: "boolean",
						default: !1
					}
				},
				additionalProperties: !1
			}],
			messages: { multipleSpaces: "Multiple spaces found before '{{displayValue}}'." }
		},
		create(context) {
			let sourceCode = context.sourceCode, options = context.options[0] || {}, ignoreEOLComments = options.ignoreEOLComments, exceptions = Object.assign({ Property: !0 }, options.exceptions), hasExceptions = Object.keys(exceptions).some((key) => exceptions[key]);
			/**
			* Formats value of given comment token for error message by truncating its length.
			* @param {Token} token comment token
			* @returns {string} formatted value
			* @private
			*/
			function formatReportedCommentValue(token) {
				let valueLines = token.value.split("\n"), value = valueLines[0], formattedValue = `${value.slice(0, 12)}...`;
				return valueLines.length === 1 && value.length <= 12 ? value : formattedValue;
			}
			return { Program() {
				sourceCode.tokensAndComments.forEach((leftToken, leftIndex, tokensAndComments) => {
					if (leftIndex === tokensAndComments.length - 1) return;
					let rightToken = tokensAndComments[leftIndex + 1];
					if (!sourceCode.text.slice(leftToken.range[1], rightToken.range[0]).includes("  ") || leftToken.loc.end.line < rightToken.loc.start.line || ignoreEOLComments && astUtils.isCommentToken(rightToken) && (leftIndex === tokensAndComments.length - 2 || rightToken.loc.end.line < tokensAndComments[leftIndex + 2].loc.start.line)) return;
					if (hasExceptions) {
						let parentNode = sourceCode.getNodeByRangeIndex(rightToken.range[0] - 1);
						if (parentNode && exceptions[parentNode.type]) return;
					}
					let displayValue;
					displayValue = rightToken.type === "Block" ? `/*${formatReportedCommentValue(rightToken)}*/` : rightToken.type === "Line" ? `//${formatReportedCommentValue(rightToken)}` : rightToken.value, context.report({
						node: rightToken,
						loc: {
							start: leftToken.loc.end,
							end: rightToken.loc.start
						},
						messageId: "multipleSpaces",
						data: { displayValue },
						fix: (fixer) => fixer.replaceTextRange([leftToken.range[1], rightToken.range[0]], " ")
					});
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-multi-spaces.cjs
module.exports = require_no_multi_spaces().create;
//#endregion
