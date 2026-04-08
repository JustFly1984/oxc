const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-dupe-else-if.js
/**
* @fileoverview Rule to disallow duplicate conditions in if-else-if chains
* @author Milos Djermanovic
*/
var require_no_dupe_else_if = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Determines whether the first given array is a subset of the second given array.
	* @param {Function} comparator A function to compare two elements, should return `true` if they are equal.
	* @param {Array} arrA The array to compare from.
	* @param {Array} arrB The array to compare against.
	* @returns {boolean} `true` if the array `arrA` is a subset of the array `arrB`.
	*/
	function isSubsetByComparator(comparator, arrA, arrB) {
		return arrA.every((a) => arrB.some((b) => comparator(a, b)));
	}
	/**
	* Splits the given node by the given logical operator.
	* @param {string} operator Logical operator `||` or `&&`.
	* @param {ASTNode} node The node to split.
	* @returns {ASTNode[]} Array of conditions that makes the node when joined by the operator.
	*/
	function splitByLogicalOperator(operator, node) {
		return node.type === "LogicalExpression" && node.operator === operator ? [...splitByLogicalOperator(operator, node.left), ...splitByLogicalOperator(operator, node.right)] : [node];
	}
	let splitByOr = splitByLogicalOperator.bind(null, "||"), splitByAnd = splitByLogicalOperator.bind(null, "&&");
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow duplicate conditions in if-else-if chains",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-dupe-else-if"
			},
			schema: [],
			messages: { unexpected: "This branch can never execute. Its condition is a duplicate or covered by previous conditions in the if-else-if chain." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Determines whether the two given nodes are considered to be equal. In particular, given that the nodes
			* represent expressions in a boolean context, `||` and `&&` can be considered as commutative operators.
			* @param {ASTNode} a First node.
			* @param {ASTNode} b Second node.
			* @returns {boolean} `true` if the nodes are considered to be equal.
			*/
			function equal(a, b) {
				return a.type === b.type ? a.type === "LogicalExpression" && (a.operator === "||" || a.operator === "&&") && a.operator === b.operator ? equal(a.left, b.left) && equal(a.right, b.right) || equal(a.left, b.right) && equal(a.right, b.left) : astUtils.equalTokens(a, b, sourceCode) : !1;
			}
			let isSubset = isSubsetByComparator.bind(null, equal);
			return { IfStatement(node) {
				let test = node.test, conditionsToCheck = test.type === "LogicalExpression" && test.operator === "&&" ? [test, ...splitByAnd(test)] : [test], current = node, listToCheck = conditionsToCheck.map((c) => splitByOr(c).map(splitByAnd));
				for (; current.parent && current.parent.type === "IfStatement" && current.parent.alternate === current;) {
					current = current.parent;
					let currentOrOperands = splitByOr(current.test).map(splitByAnd);
					if (listToCheck = listToCheck.map((orOperands) => orOperands.filter((orOperand) => !currentOrOperands.some((currentOrOperand) => isSubset(currentOrOperand, orOperand)))), listToCheck.some((orOperands) => orOperands.length === 0)) {
						context.report({
							node: test,
							messageId: "unexpected"
						});
						break;
					}
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-dupe-else-if.cjs
module.exports = require_no_dupe_else_if().create;
//#endregion
