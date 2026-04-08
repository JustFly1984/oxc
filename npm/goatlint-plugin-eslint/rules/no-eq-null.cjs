//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-eq-null.js
/**
* @fileoverview Rule to flag comparisons to null without a type-checking
* operator.
* @author Ian Christian Myers
*/
var require_no_eq_null = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `null` comparisons without type-checking operators",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-eq-null"
			},
			schema: [],
			messages: { unexpected: "Use '===' to compare with null." }
		},
		create(context) {
			return { BinaryExpression(node) {
				let badOperator = node.operator === "==" || node.operator === "!=";
				(node.right.type === "Literal" && node.right.raw === "null" && badOperator || node.left.type === "Literal" && node.left.raw === "null" && badOperator) && context.report({
					node,
					messageId: "unexpected"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-eq-null.cjs
module.exports = require_no_eq_null().create;
//#endregion
