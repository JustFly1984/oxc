const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-useless-concat.js
/**
* @fileoverview disallow unnecessary concatenation of template strings
* @author Henry Zhu
*/
var require_no_useless_concat = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether or not a given node is a concatenation.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node is a concatenation.
	*/
	function isConcatenation(node) {
		return node.type === "BinaryExpression" && node.operator === "+";
	}
	/**
	* Checks if the given token is a `+` token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a `+` token.
	*/
	function isConcatOperatorToken(token) {
		return token.value === "+" && token.type === "Punctuator";
	}
	/**
	* Get's the right most node on the left side of a BinaryExpression with + operator.
	* @param {ASTNode} node A BinaryExpression node to check.
	* @returns {ASTNode} node
	*/
	function getLeft(node) {
		let left = node.left;
		for (; isConcatenation(left);) left = left.right;
		return left;
	}
	/**
	* Get's the left most node on the right side of a BinaryExpression with + operator.
	* @param {ASTNode} node A BinaryExpression node to check.
	* @returns {ASTNode} node
	*/
	function getRight(node) {
		let right = node.right;
		for (; isConcatenation(right);) right = right.left;
		return right;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow unnecessary concatenation of literals or template literals",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-useless-concat"
			},
			schema: [],
			messages: { unexpectedConcat: "Unexpected string concatenation of literals." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { BinaryExpression(node) {
				if (node.operator !== "+") return;
				let left = getLeft(node), right = getRight(node);
				if (astUtils.isStringLiteral(left) && astUtils.isStringLiteral(right) && astUtils.isTokenOnSameLine(left, right)) {
					let operatorToken = sourceCode.getFirstTokenBetween(left, right, isConcatOperatorToken);
					context.report({
						node,
						loc: operatorToken.loc,
						messageId: "unexpectedConcat"
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-useless-concat.cjs
module.exports = require_no_useless_concat().create;
//#endregion
