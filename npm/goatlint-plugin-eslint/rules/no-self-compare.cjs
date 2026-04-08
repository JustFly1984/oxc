//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-self-compare.js
/**
* @fileoverview Rule to flag comparison where left part is the same as the right
* part.
* @author Ilya Volodin
*/
var require_no_self_compare = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow comparisons where both sides are exactly the same",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-self-compare"
			},
			schema: [],
			messages: { comparingToSelf: "Comparing to itself is potentially pointless." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Determines whether two nodes are composed of the same tokens.
			* @param {ASTNode} nodeA The first node
			* @param {ASTNode} nodeB The second node
			* @returns {boolean} true if the nodes have identical token representations
			*/
			function hasSameTokens(nodeA, nodeB) {
				let tokensA = sourceCode.getTokens(nodeA), tokensB = sourceCode.getTokens(nodeB);
				return tokensA.length === tokensB.length && tokensA.every((token, index) => token.type === tokensB[index].type && token.value === tokensB[index].value);
			}
			return { BinaryExpression(node) {
				new Set([
					"===",
					"==",
					"!==",
					"!=",
					">",
					"<",
					">=",
					"<="
				]).has(node.operator) && hasSameTokens(node.left, node.right) && context.report({
					node,
					messageId: "comparingToSelf"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-self-compare.cjs
module.exports = require_no_self_compare().create;
//#endregion
