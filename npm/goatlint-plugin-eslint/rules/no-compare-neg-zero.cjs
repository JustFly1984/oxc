//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-compare-neg-zero.js
/**
* @fileoverview The rule should warn against code that tries to compare against -0.
* @author Aladdin-ADD <hh_2013@foxmail.com>
*/
var require_no_compare_neg_zero = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow comparing against `-0`",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-compare-neg-zero"
			},
			fixable: null,
			schema: [],
			messages: { unexpected: "Do not use the '{{operator}}' operator to compare against -0." }
		},
		create(context) {
			/**
			* Checks a given node is -0
			* @param {ASTNode} node A node to check.
			* @returns {boolean} `true` if the node is -0.
			*/
			function isNegZero(node) {
				return node.type === "UnaryExpression" && node.operator === "-" && node.argument.type === "Literal" && node.argument.value === 0;
			}
			let OPERATORS_TO_CHECK = new Set([
				">",
				">=",
				"<",
				"<=",
				"==",
				"===",
				"!=",
				"!=="
			]);
			return { BinaryExpression(node) {
				OPERATORS_TO_CHECK.has(node.operator) && (isNegZero(node.left) || isNegZero(node.right)) && context.report({
					node,
					messageId: "unexpected",
					data: { operator: node.operator }
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-compare-neg-zero.cjs
module.exports = require_no_compare_neg_zero().create;
//#endregion
