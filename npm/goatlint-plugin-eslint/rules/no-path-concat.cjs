//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-path-concat.js
/**
* @fileoverview Disallow string concatenation when using __dirname and __filename
* @author Nicholas C. Zakas
* @deprecated in ESLint v7.0.0
*/
var require_no_path_concat = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Node.js rules were moved out of ESLint core.",
				url: "https://eslint.org/docs/latest/use/migrating-to-7.0.0#deprecate-node-rules",
				deprecatedSince: "7.0.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "eslint-plugin-n now maintains deprecated Node.js-related rules.",
					plugin: {
						name: "eslint-plugin-n",
						url: "https://github.com/eslint-community/eslint-plugin-n"
					},
					rule: {
						name: "no-path-concat",
						url: "https://github.com/eslint-community/eslint-plugin-n/tree/master/docs/rules/no-path-concat.md"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Disallow string concatenation with `__dirname` and `__filename`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-path-concat"
			},
			schema: [],
			messages: { usePathFunctions: "Use path.join() or path.resolve() instead of + to create paths." }
		},
		create(context) {
			let MATCHER = /^__(?:dir|file)name$/u;
			return { BinaryExpression(node) {
				let left = node.left, right = node.right;
				node.operator === "+" && (left.type === "Identifier" && MATCHER.test(left.name) || right.type === "Identifier" && MATCHER.test(right.name)) && context.report({
					node,
					messageId: "usePathFunctions"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-path-concat.cjs
module.exports = require_no_path_concat().create;
//#endregion
