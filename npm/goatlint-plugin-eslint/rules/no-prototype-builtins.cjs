const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-prototype-builtins.js
/**
* @fileoverview Rule to disallow use of Object.prototype builtins on objects
* @author Andrew Levine
*/
var require_no_prototype_builtins = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Returns true if the node or any of the objects
	* to the left of it in the member/call chain is optional.
	*
	* e.g. `a?.b`, `a?.b.c`, `a?.()`, `a()?.()`
	* @param {ASTNode} node The expression to check
	* @returns {boolean} `true` if there is a short-circuiting optional `?.`
	* in the same option chain to the left of this call or member expression,
	* or the node itself is an optional call or member `?.`.
	*/
	function isAfterOptional(node) {
		let leftNode;
		if (node.type === "MemberExpression") leftNode = node.object;
		else if (node.type === "CallExpression") leftNode = node.callee;
		else return !1;
		return node.optional ? !0 : isAfterOptional(leftNode);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow calling some `Object.prototype` methods directly on objects",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-prototype-builtins"
			},
			hasSuggestions: !0,
			schema: [],
			messages: {
				prototypeBuildIn: "Do not access Object.prototype method '{{prop}}' from target object.",
				callObjectPrototype: "Call Object.prototype.{{prop}} explicitly."
			}
		},
		create(context) {
			let DISALLOWED_PROPS = new Set([
				"hasOwnProperty",
				"isPrototypeOf",
				"propertyIsEnumerable"
			]);
			/**
			* Reports if a disallowed property is used in a CallExpression
			* @param {ASTNode} node The CallExpression node.
			* @returns {void}
			*/
			function disallowBuiltIns(node) {
				let callee = astUtils.skipChainExpression(node.callee);
				if (callee.type !== "MemberExpression") return;
				let propName = astUtils.getStaticPropertyName(callee);
				propName !== null && DISALLOWED_PROPS.has(propName) && context.report({
					messageId: "prototypeBuildIn",
					loc: callee.property.loc,
					data: { prop: propName },
					node,
					suggest: [{
						messageId: "callObjectPrototype",
						data: { prop: propName },
						fix(fixer) {
							let sourceCode = context.sourceCode;
							if (isAfterOptional(node) || node.callee.type === "ChainExpression") return null;
							let objectVariable = astUtils.getVariableByName(sourceCode.getScope(node), "Object");
							if (!objectVariable || objectVariable.scope.type !== "global" || objectVariable.defs.length > 0) return null;
							let objectText = sourceCode.getText(callee.object);
							astUtils.getPrecedence(callee.object) <= astUtils.getPrecedence({ type: "SequenceExpression" }) && (objectText = `(${objectText})`);
							let openParenToken = sourceCode.getTokenAfter(node.callee, astUtils.isOpeningParenToken), delim = node.arguments.length === 0 ? "" : ", ";
							return [fixer.replaceText(callee, `Object.prototype.${propName}.call`), fixer.insertTextAfter(openParenToken, objectText + delim)];
						}
					}]
				});
			}
			return { CallExpression: disallowBuiltIns };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-prototype-builtins.cjs
module.exports = require_no_prototype_builtins().create;
//#endregion
