//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-nested-ternary.js
/**
* @fileoverview Rule to flag nested ternary expressions
* @author Ian Christian Myers
*/
var require_no_nested_ternary = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow nested ternary expressions",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-nested-ternary"
			},
			schema: [],
			messages: { noNestedTernary: "Do not nest ternary expressions." }
		},
		create(context) {
			return { ConditionalExpression(node) {
				(node.alternate.type === "ConditionalExpression" || node.consequent.type === "ConditionalExpression") && context.report({
					node,
					messageId: "noNestedTernary"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-nested-ternary.cjs
module.exports = require_no_nested_ternary().create;
//#endregion
