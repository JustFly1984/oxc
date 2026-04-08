//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-delete-var.js
/**
* @fileoverview Rule to flag when deleting variables
* @author Ilya Volodin
*/
var require_no_delete_var = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow deleting variables",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-delete-var"
			},
			schema: [],
			messages: { unexpected: "Variables should not be deleted." }
		},
		create(context) {
			return { UnaryExpression(node) {
				node.operator === "delete" && node.argument.type === "Identifier" && context.report({
					node,
					messageId: "unexpected"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-delete-var.cjs
module.exports = require_no_delete_var().create;
//#endregion
