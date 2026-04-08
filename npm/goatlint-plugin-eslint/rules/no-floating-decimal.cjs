const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-floating-decimal.js
/**
* @fileoverview Rule to flag use of a leading/trailing decimal point in a numeric literal
* @author James Allardice
* @deprecated in ESLint v8.53.0
*/
var require_no_floating_decimal = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "no-floating-decimal",
						url: "https://eslint.style/rules/no-floating-decimal"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Disallow leading or trailing decimal points in numeric literals",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-floating-decimal"
			},
			schema: [],
			fixable: "code",
			messages: {
				leading: "A leading decimal point can be confused with a dot.",
				trailing: "A trailing decimal point can be confused with a dot."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { Literal(node) {
				typeof node.value == "number" && (node.raw.startsWith(".") && context.report({
					node,
					messageId: "leading",
					fix(fixer) {
						let tokenBefore = sourceCode.getTokenBefore(node), needsSpaceBefore = tokenBefore && tokenBefore.range[1] === node.range[0] && !astUtils.canTokensBeAdjacent(tokenBefore, `0${node.raw}`);
						return fixer.insertTextBefore(node, needsSpaceBefore ? " 0" : "0");
					}
				}), node.raw.indexOf(".") === node.raw.length - 1 && context.report({
					node,
					messageId: "trailing",
					fix: (fixer) => fixer.insertTextAfter(node, "0")
				}));
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-floating-decimal.cjs
module.exports = require_no_floating_decimal().create;
//#endregion
