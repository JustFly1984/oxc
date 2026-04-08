const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/new-parens.js
/**
* @fileoverview Rule to flag when using constructor without parentheses
* @author Ilya Volodin
* @deprecated in ESLint v8.53.0
*/
var require_new_parens = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "new-parens",
						url: "https://eslint.style/rules/new-parens"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce or disallow parentheses when invoking a constructor with no arguments",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/new-parens"
			},
			fixable: "code",
			schema: [{ enum: ["always", "never"] }],
			messages: {
				missing: "Missing '()' invoking a constructor.",
				unnecessary: "Unnecessary '()' invoking a constructor with no arguments."
			}
		},
		create(context) {
			let always = context.options[0] !== "never", sourceCode = context.sourceCode;
			return { NewExpression(node) {
				if (node.arguments.length !== 0) return;
				let lastToken = sourceCode.getLastToken(node), hasParens = lastToken && astUtils.isClosingParenToken(lastToken) && astUtils.isOpeningParenToken(sourceCode.getTokenBefore(lastToken)) && node.callee.range[1] < node.range[1];
				always ? hasParens || context.report({
					node,
					messageId: "missing",
					fix: (fixer) => fixer.insertTextAfter(node, "()")
				}) : hasParens && context.report({
					node,
					messageId: "unnecessary",
					fix: (fixer) => [
						fixer.remove(sourceCode.getTokenBefore(lastToken)),
						fixer.remove(lastToken),
						fixer.insertTextBefore(node, "("),
						fixer.insertTextAfter(node, ")")
					]
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/new-parens.cjs
module.exports = require_new_parens().create;
//#endregion
