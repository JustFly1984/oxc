const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-new-func.js
/**
* @fileoverview Rule to flag when using new Function
* @author Ilya Volodin
*/
var require_no_new_func = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), callMethods = new Set([
		"apply",
		"bind",
		"call"
	]);
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `new` operators with the `Function` object",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-new-func"
			},
			schema: [],
			messages: { noFunctionConstructor: "The Function constructor is eval." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { "Program:exit"(node) {
				let variable = sourceCode.getScope(node).set.get("Function");
				variable && variable.defs.length === 0 && variable.references.forEach((ref) => {
					let idNode = ref.identifier, { parent } = idNode, evalNode;
					if (parent) {
						if (idNode === parent.callee && (parent.type === "NewExpression" || parent.type === "CallExpression")) evalNode = parent;
						else if (parent.type === "MemberExpression" && idNode === parent.object && callMethods.has(astUtils.getStaticPropertyName(parent))) {
							let maybeCallee = parent.parent.type === "ChainExpression" ? parent.parent : parent;
							maybeCallee.parent.type === "CallExpression" && maybeCallee.parent.callee === maybeCallee && (evalNode = maybeCallee.parent);
						}
					}
					evalNode && context.report({
						node: evalNode,
						messageId: "noFunctionConstructor"
					});
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-new-func.cjs
module.exports = require_no_new_func().create;
//#endregion
