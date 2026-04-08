const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-useless-call.js
/**
* @fileoverview A rule to disallow unnecessary `.call()` and `.apply()`.
* @author Toru Nagashima
*/
var require_no_useless_call = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether or not a node is a `.call()`/`.apply()`.
	* @param {ASTNode} node A CallExpression node to check.
	* @returns {boolean} Whether or not the node is a `.call()`/`.apply()`.
	*/
	function isCallOrNonVariadicApply(node) {
		let callee = astUtils.skipChainExpression(node.callee);
		return callee.type === "MemberExpression" && callee.property.type === "Identifier" && callee.computed === !1 && (callee.property.name === "call" && node.arguments.length >= 1 || callee.property.name === "apply" && node.arguments.length === 2 && node.arguments[1].type === "ArrayExpression");
	}
	/**
	* Checks whether or not `thisArg` is not changed by `.call()`/`.apply()`.
	* @param {ASTNode|null} expectedThis The node that is the owner of the applied function.
	* @param {ASTNode} thisArg The node that is given to the first argument of the `.call()`/`.apply()`.
	* @param {SourceCode} sourceCode The ESLint source code object.
	* @returns {boolean} Whether or not `thisArg` is not changed by `.call()`/`.apply()`.
	*/
	function isValidThisArg(expectedThis, thisArg, sourceCode) {
		return expectedThis ? astUtils.equalTokens(expectedThis, thisArg, sourceCode) : astUtils.isNullOrUndefined(thisArg);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow unnecessary calls to `.call()` and `.apply()`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-useless-call"
			},
			schema: [],
			messages: { unnecessaryCall: "Unnecessary '.{{name}}()'." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { CallExpression(node) {
				if (!isCallOrNonVariadicApply(node)) return;
				let callee = astUtils.skipChainExpression(node.callee), applied = astUtils.skipChainExpression(callee.object), expectedThis = applied.type === "MemberExpression" ? applied.object : null, thisArg = node.arguments[0];
				isValidThisArg(expectedThis, thisArg, sourceCode) && context.report({
					node,
					messageId: "unnecessaryCall",
					data: { name: callee.property.name }
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-useless-call.cjs
module.exports = require_no_useless_call().create;
//#endregion
