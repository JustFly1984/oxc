const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-object-has-own.js
/**
* @fileoverview Prefers Object.hasOwn() instead of Object.prototype.hasOwnProperty.call()
* @author Nitin Kumar
* @author Gautam Arora
*/
var require_prefer_object_has_own = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks if the given node is considered to be an access to a property of `Object.prototype`.
	* @param {ASTNode} node `MemberExpression` node to evaluate.
	* @returns {boolean} `true` if `node.object` is `Object`, `Object.prototype`, or `{}` (empty 'ObjectExpression' node).
	*/
	function hasLeftHandObject(node) {
		if (node.object.type === "ObjectExpression" && node.object.properties.length === 0) return !0;
		let objectNodeToCheck = node.object.type === "MemberExpression" && astUtils.getStaticPropertyName(node.object) === "prototype" ? node.object.object : node.object;
		return objectNodeToCheck.type === "Identifier" && objectNodeToCheck.name === "Object";
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow use of `Object.prototype.hasOwnProperty.call()` and prefer use of `Object.hasOwn()`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/prefer-object-has-own"
			},
			schema: [],
			messages: { useHasOwn: "Use 'Object.hasOwn()' instead of 'Object.prototype.hasOwnProperty.call()'." },
			fixable: "code"
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { CallExpression(node) {
				if (!(node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression")) return;
				let calleePropertyName = astUtils.getStaticPropertyName(node.callee), objectPropertyName = astUtils.getStaticPropertyName(node.callee.object), isObject = hasLeftHandObject(node.callee.object), scope = sourceCode.getScope(node), variable = astUtils.getVariableByName(scope, "Object");
				calleePropertyName === "call" && objectPropertyName === "hasOwnProperty" && isObject && variable && variable.scope.type === "global" && context.report({
					node,
					messageId: "useHasOwn",
					fix(fixer) {
						if (sourceCode.getCommentsInside(node.callee).length > 0) return null;
						let tokenJustBeforeNode = sourceCode.getTokenBefore(node.callee, { includeComments: !0 });
						return tokenJustBeforeNode && tokenJustBeforeNode.range[1] === node.callee.range[0] && !astUtils.canTokensBeAdjacent(tokenJustBeforeNode, "Object.hasOwn") ? fixer.replaceText(node.callee, " Object.hasOwn") : fixer.replaceText(node.callee, "Object.hasOwn");
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-object-has-own.cjs
module.exports = require_prefer_object_has_own().create;
//#endregion
