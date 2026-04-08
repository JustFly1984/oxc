//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-ternary.js
/**
* @fileoverview Rule to flag use of ternary operators.
* @author Ian Christian Myers
*/
var require_no_ternary = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow ternary operators",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-ternary"
			},
			schema: [],
			messages: { noTernaryOperator: "Ternary operator used." }
		},
		create(context) {
			return { ConditionalExpression(node) {
				context.report({
					node,
					messageId: "noTernaryOperator"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-ternary.cjs
module.exports = require_no_ternary().create;
//#endregion
