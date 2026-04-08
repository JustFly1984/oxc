const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/operator-assignment.js
/**
* @fileoverview Rule to replace assignment expressions with operator assignment
* @author Brandon Mills
*/
var require_operator_assignment = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether an operator is commutative and has an operator assignment
	* shorthand form.
	* @param {string} operator Operator to check.
	* @returns {boolean} True if the operator is commutative and has a
	*     shorthand form.
	*/
	function isCommutativeOperatorWithShorthand(operator) {
		return [
			"*",
			"&",
			"^",
			"|"
		].includes(operator);
	}
	/**
	* Checks whether an operator is not commutative and has an operator assignment
	* shorthand form.
	* @param {string} operator Operator to check.
	* @returns {boolean} True if the operator is not commutative and has
	*     a shorthand form.
	*/
	function isNonCommutativeOperatorWithShorthand(operator) {
		return [
			"+",
			"-",
			"/",
			"%",
			"<<",
			">>",
			">>>",
			"**"
		].includes(operator);
	}
	/**
	* Determines if the left side of a node can be safely fixed (i.e. if it activates the same getters/setters and)
	* toString calls regardless of whether assignment shorthand is used)
	* @param {ASTNode} node The node on the left side of the expression
	* @returns {boolean} `true` if the node can be fixed
	*/
	function canBeFixed(node) {
		return node.type === "Identifier" || node.type === "MemberExpression" && (node.object.type === "Identifier" || node.object.type === "ThisExpression") && (!node.computed || node.property.type === "Literal");
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: ["always"],
			docs: {
				description: "Require or disallow assignment operator shorthand where possible",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/operator-assignment"
			},
			schema: [{ enum: ["always", "never"] }],
			fixable: "code",
			messages: {
				replaced: "Assignment (=) can be replaced with operator assignment ({{operator}}).",
				unexpected: "Unexpected operator assignment ({{operator}}) shorthand."
			}
		},
		create(context) {
			let never = context.options[0] === "never", sourceCode = context.sourceCode;
			/**
			* Returns the operator token of an AssignmentExpression or BinaryExpression
			* @param {ASTNode} node An AssignmentExpression or BinaryExpression node
			* @returns {Token} The operator token in the node
			*/
			function getOperatorToken(node) {
				return sourceCode.getFirstTokenBetween(node.left, node.right, (token) => token.value === node.operator);
			}
			/**
			* Ensures that an assignment uses the shorthand form where possible.
			* @param {ASTNode} node An AssignmentExpression node.
			* @returns {void}
			*/
			function verify(node) {
				if (node.operator !== "=" || node.right.type !== "BinaryExpression") return;
				let left = node.left, expr = node.right, operator = expr.operator;
				if (isCommutativeOperatorWithShorthand(operator) || isNonCommutativeOperatorWithShorthand(operator)) {
					let replacementOperator = `${operator}=`;
					astUtils.isSameReference(left, expr.left, !0) ? context.report({
						node,
						messageId: "replaced",
						data: { operator: replacementOperator },
						fix(fixer) {
							if (canBeFixed(left) && canBeFixed(expr.left)) {
								let equalsToken = getOperatorToken(node), operatorToken = getOperatorToken(expr), leftText = sourceCode.getText().slice(node.range[0], equalsToken.range[0]), rightText = sourceCode.getText().slice(operatorToken.range[1], node.right.range[1]);
								return sourceCode.commentsExistBetween(equalsToken, operatorToken) ? null : fixer.replaceText(node, `${leftText}${replacementOperator}${rightText}`);
							}
							return null;
						}
					}) : astUtils.isSameReference(left, expr.right, !0) && isCommutativeOperatorWithShorthand(operator) && context.report({
						node,
						messageId: "replaced",
						data: { operator: replacementOperator }
					});
				}
			}
			/**
			* Warns if an assignment expression uses operator assignment shorthand.
			* @param {ASTNode} node An AssignmentExpression node.
			* @returns {void}
			*/
			function prohibit(node) {
				node.operator !== "=" && !astUtils.isLogicalAssignmentOperator(node.operator) && context.report({
					node,
					messageId: "unexpected",
					data: { operator: node.operator },
					fix(fixer) {
						if (canBeFixed(node.left)) {
							let firstToken = sourceCode.getFirstToken(node), operatorToken = getOperatorToken(node), leftText = sourceCode.getText().slice(node.range[0], operatorToken.range[0]), newOperator = node.operator.slice(0, -1), rightText;
							if (sourceCode.commentsExistBetween(firstToken, operatorToken)) return null;
							if (astUtils.getPrecedence(node.right) <= astUtils.getPrecedence({
								type: "BinaryExpression",
								operator: newOperator
							}) && !astUtils.isParenthesised(sourceCode, node.right)) rightText = `${sourceCode.text.slice(operatorToken.range[1], node.right.range[0])}(${sourceCode.getText(node.right)})`;
							else {
								let tokenAfterOperator = sourceCode.getTokenAfter(operatorToken, { includeComments: !0 }), rightTextPrefix = "";
								operatorToken.range[1] === tokenAfterOperator.range[0] && !astUtils.canTokensBeAdjacent({
									type: "Punctuator",
									value: newOperator
								}, tokenAfterOperator) && (rightTextPrefix = " "), rightText = `${rightTextPrefix}${sourceCode.text.slice(operatorToken.range[1], node.range[1])}`;
							}
							return fixer.replaceText(node, `${leftText}= ${leftText}${newOperator}${rightText}`);
						}
						return null;
					}
				});
			}
			return { AssignmentExpression: never ? prohibit : verify };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/operator-assignment.cjs
module.exports = require_operator_assignment().create;
//#endregion
