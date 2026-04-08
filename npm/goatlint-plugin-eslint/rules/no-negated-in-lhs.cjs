//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-negated-in-lhs.js
/**
* @fileoverview A rule to disallow negated left operands of the `in` operator
* @author Michael Ficarra
* @deprecated in ESLint v3.3.0
*/
var require_no_negated_in_lhs = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow negating the left operand in `in` expressions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-negated-in-lhs"
			},
			deprecated: {
				message: "Renamed rule.",
				url: "https://eslint.org/blog/2016/08/eslint-v3.3.0-released/#deprecated-rules",
				deprecatedSince: "3.3.0",
				availableUntil: "11.0.0",
				replacedBy: [{ rule: {
					name: "no-unsafe-negation",
					url: "https://eslint.org/docs/rules/no-unsafe-negation"
				} }]
			},
			schema: [],
			messages: { negatedLHS: "The 'in' expression's left operand is negated." }
		},
		create(context) {
			return { BinaryExpression(node) {
				node.operator === "in" && node.left.type === "UnaryExpression" && node.left.operator === "!" && context.report({
					node,
					messageId: "negatedLHS"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-negated-in-lhs.cjs
module.exports = require_no_negated_in_lhs().create;
//#endregion
