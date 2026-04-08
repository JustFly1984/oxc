//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/yield-star-spacing.js
/**
* @fileoverview Rule to check the spacing around the * in yield* expressions.
* @author Bryan Smith
* @deprecated in ESLint v8.53.0
*/
var require_yield_star_spacing = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
						name: "yield-star-spacing",
						url: "https://eslint.style/rules/yield-star-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require or disallow spacing around the `*` in `yield*` expressions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/yield-star-spacing"
			},
			fixable: "whitespace",
			schema: [{ oneOf: [{ enum: [
				"before",
				"after",
				"both",
				"neither"
			] }, {
				type: "object",
				properties: {
					before: { type: "boolean" },
					after: { type: "boolean" }
				},
				additionalProperties: !1
			}] }],
			messages: {
				missingBefore: "Missing space before *.",
				missingAfter: "Missing space after *.",
				unexpectedBefore: "Unexpected space before *.",
				unexpectedAfter: "Unexpected space after *."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, mode = (function(option) {
				return !option || typeof option == "string" ? {
					before: {
						before: !0,
						after: !1
					},
					after: {
						before: !1,
						after: !0
					},
					both: {
						before: !0,
						after: !0
					},
					neither: {
						before: !1,
						after: !1
					}
				}[option || "after"] : option;
			})(context.options[0]);
			/**
			* Checks the spacing between two tokens before or after the star token.
			* @param {string} side Either "before" or "after".
			* @param {Token} leftToken `function` keyword token if side is "before", or
			*     star token if side is "after".
			* @param {Token} rightToken Star token if side is "before", or identifier
			*     token if side is "after".
			* @returns {void}
			*/
			function checkSpacing(side, leftToken, rightToken) {
				if (sourceCode.isSpaceBetweenTokens(leftToken, rightToken) !== mode[side]) {
					let after = leftToken.value === "*", spaceRequired = mode[side], node = after ? leftToken : rightToken, messageId;
					messageId = spaceRequired ? side === "before" ? "missingBefore" : "missingAfter" : side === "before" ? "unexpectedBefore" : "unexpectedAfter", context.report({
						node,
						messageId,
						fix(fixer) {
							return spaceRequired ? after ? fixer.insertTextAfter(node, " ") : fixer.insertTextBefore(node, " ") : fixer.removeRange([leftToken.range[1], rightToken.range[0]]);
						}
					});
				}
			}
			/**
			* Enforces the spacing around the star if node is a yield* expression.
			* @param {ASTNode} node A yield expression node.
			* @returns {void}
			*/
			function checkExpression(node) {
				if (!node.delegate) return;
				let tokens = sourceCode.getFirstTokens(node, 3), yieldToken = tokens[0], starToken = tokens[1], nextToken = tokens[2];
				checkSpacing("before", yieldToken, starToken), checkSpacing("after", starToken, nextToken);
			}
			return { YieldExpression: checkExpression };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/yield-star-spacing.cjs
module.exports = require_yield_star_spacing().create;
//#endregion
