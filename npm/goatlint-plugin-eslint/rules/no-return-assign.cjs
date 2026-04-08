const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-return-assign.js
/**
* @fileoverview Rule to flag when return statement contains assignment
* @author Ilya Volodin
*/
var require_no_return_assign = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), SENTINEL_TYPE = /^(?:[a-zA-Z]+?Statement|ArrowFunctionExpression|FunctionExpression|ClassExpression)$/u;
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: ["except-parens"],
			docs: {
				description: "Disallow assignment operators in `return` statements",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-return-assign"
			},
			schema: [{ enum: ["except-parens", "always"] }],
			messages: {
				returnAssignment: "Return statement should not contain assignment.",
				arrowAssignment: "Arrow function should not return assignment."
			}
		},
		create(context) {
			let always = context.options[0] !== "except-parens", sourceCode = context.sourceCode;
			return { AssignmentExpression(node) {
				if (!always && astUtils.isParenthesised(sourceCode, node)) return;
				let currentChild = node, parent = currentChild.parent;
				for (; parent && !SENTINEL_TYPE.test(parent.type);) currentChild = parent, parent = parent.parent;
				parent && parent.type === "ReturnStatement" ? context.report({
					node: parent,
					messageId: "returnAssignment"
				}) : parent && parent.type === "ArrowFunctionExpression" && parent.body === currentChild && context.report({
					node: parent,
					messageId: "arrowAssignment"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-return-assign.cjs
module.exports = require_no_return_assign().create;
//#endregion
