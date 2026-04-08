const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unsafe-negation.js
/**
* @fileoverview Rule to disallow negating the left operand of relational operators
* @author Toru Nagashima
*/
var require_no_unsafe_negation = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether the given operator is `in` or `instanceof`
	* @param {string} op The operator type to check.
	* @returns {boolean} `true` if the operator is `in` or `instanceof`
	*/
	function isInOrInstanceOfOperator(op) {
		return op === "in" || op === "instanceof";
	}
	/**
	* Checks whether the given operator is an ordering relational operator or not.
	* @param {string} op The operator type to check.
	* @returns {boolean} `true` if the operator is an ordering relational operator.
	*/
	function isOrderingRelationalOperator(op) {
		return op === "<" || op === ">" || op === ">=" || op === "<=";
	}
	/**
	* Checks whether the given node is a logical negation expression or not.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is a logical negation expression.
	*/
	function isNegation(node) {
		return node.type === "UnaryExpression" && node.operator === "!";
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{ enforceForOrderingRelations: !1 }],
			docs: {
				description: "Disallow negating the left operand of relational operators",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-unsafe-negation"
			},
			hasSuggestions: !0,
			schema: [{
				type: "object",
				properties: { enforceForOrderingRelations: { type: "boolean" } },
				additionalProperties: !1
			}],
			fixable: null,
			messages: {
				unexpected: "Unexpected negating the left operand of '{{operator}}' operator.",
				suggestNegatedExpression: "Negate '{{operator}}' expression instead of its left operand. This changes the current behavior.",
				suggestParenthesisedNegation: "Wrap negation in '()' to make the intention explicit. This preserves the current behavior."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ enforceForOrderingRelations }] = context.options;
			return { BinaryExpression(node) {
				let operator = node.operator, orderingRelationRuleApplies = enforceForOrderingRelations && isOrderingRelationalOperator(operator);
				(isInOrInstanceOfOperator(operator) || orderingRelationRuleApplies) && isNegation(node.left) && !astUtils.isParenthesised(sourceCode, node.left) && context.report({
					node,
					loc: node.left.loc,
					messageId: "unexpected",
					data: { operator },
					suggest: [{
						messageId: "suggestNegatedExpression",
						data: { operator },
						fix(fixer) {
							let fixRange = [sourceCode.getFirstToken(node.left).range[1], node.range[1]], text = sourceCode.text.slice(fixRange[0], fixRange[1]);
							return fixer.replaceTextRange(fixRange, `(${text})`);
						}
					}, {
						messageId: "suggestParenthesisedNegation",
						fix(fixer) {
							return fixer.replaceText(node.left, `(${sourceCode.getText(node.left)})`);
						}
					}]
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unsafe-negation.cjs
module.exports = require_no_unsafe_negation().create;
//#endregion
