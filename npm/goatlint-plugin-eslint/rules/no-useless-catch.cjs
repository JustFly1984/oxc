//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-useless-catch.js
/**
* @fileoverview Reports useless `catch` clauses that just rethrow their error.
* @author Teddy Katz
*/
var require_no_useless_catch = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow unnecessary `catch` clauses",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-useless-catch"
			},
			schema: [],
			messages: {
				unnecessaryCatchClause: "Unnecessary catch clause.",
				unnecessaryCatch: "Unnecessary try/catch wrapper."
			}
		},
		create(context) {
			return { CatchClause(node) {
				node.param && node.param.type === "Identifier" && node.body.body.length && node.body.body[0].type === "ThrowStatement" && node.body.body[0].argument.type === "Identifier" && node.body.body[0].argument.name === node.param.name && (node.parent.finalizer ? context.report({
					node,
					messageId: "unnecessaryCatchClause"
				}) : context.report({
					node: node.parent,
					messageId: "unnecessaryCatch"
				}));
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-useless-catch.cjs
module.exports = require_no_useless_catch().create;
//#endregion
