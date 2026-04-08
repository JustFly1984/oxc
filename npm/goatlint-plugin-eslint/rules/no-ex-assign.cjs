const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-ex-assign.js
/**
* @fileoverview Rule to flag assignment of the exception parameter
* @author Stephen Murray <spmurrayzzz>
*/
var require_no_ex_assign = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow reassigning exceptions in `catch` clauses",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-ex-assign"
			},
			schema: [],
			messages: { unexpected: "Do not assign to the exception parameter." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Finds and reports references that are non initializer and writable.
			* @param {Variable} variable A variable to check.
			* @returns {void}
			*/
			function checkVariable(variable) {
				astUtils.getModifyingReferences(variable.references).forEach((reference) => {
					context.report({
						node: reference.identifier,
						messageId: "unexpected"
					});
				});
			}
			return { CatchClause(node) {
				sourceCode.getDeclaredVariables(node).forEach(checkVariable);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-ex-assign.cjs
module.exports = require_no_ex_assign().create;
//#endregion
