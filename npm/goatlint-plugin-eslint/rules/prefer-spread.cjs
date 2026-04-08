const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-spread.js
/**
* @fileoverview A rule to suggest using of the spread operator instead of `.apply()`.
* @author Toru Nagashima
*/
var require_prefer_spread = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether or not a node is a `.apply()` for variadic.
	* @param {ASTNode} node A CallExpression node to check.
	* @returns {boolean} Whether or not the node is a `.apply()` for variadic.
	*/
	function isVariadicApplyCalling(node) {
		return astUtils.isSpecificMemberAccess(node.callee, null, "apply") && node.arguments.length === 2 && node.arguments[1].type !== "ArrayExpression" && node.arguments[1].type !== "SpreadElement";
	}
	/**
	* Checks whether or not `thisArg` is not changed by `.apply()`.
	* @param {ASTNode|null} expectedThis The node that is the owner of the applied function.
	* @param {ASTNode} thisArg The node that is given to the first argument of the `.apply()`.
	* @param {RuleContext} context The ESLint rule context object.
	* @returns {boolean} Whether or not `thisArg` is not changed by `.apply()`.
	*/
	function isValidThisArg(expectedThis, thisArg, context) {
		return expectedThis ? astUtils.equalTokens(expectedThis, thisArg, context) : astUtils.isNullOrUndefined(thisArg);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require spread operators instead of `.apply()`",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/prefer-spread"
			},
			schema: [],
			fixable: null,
			messages: { preferSpread: "Use the spread operator instead of '.apply()'." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { CallExpression(node) {
				if (!isVariadicApplyCalling(node)) return;
				let applied = astUtils.skipChainExpression(astUtils.skipChainExpression(node.callee).object), expectedThis = applied.type === "MemberExpression" ? applied.object : null, thisArg = node.arguments[0];
				isValidThisArg(expectedThis, thisArg, sourceCode) && context.report({
					node,
					messageId: "preferSpread"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-spread.cjs
module.exports = require_prefer_spread().create;
//#endregion
