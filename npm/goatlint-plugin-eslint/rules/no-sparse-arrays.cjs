const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-sparse-arrays.js
/**
* @fileoverview Disallow sparse arrays
* @author Nicholas C. Zakas
*/
var require_no_sparse_arrays = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow sparse arrays",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-sparse-arrays"
			},
			schema: [],
			messages: { unexpectedSparseArray: "Unexpected comma in middle of array." }
		},
		create(context) {
			return { ArrayExpression(node) {
				if (!node.elements.includes(null)) return;
				let { sourceCode } = context, commaToken;
				for (let [index, element] of node.elements.entries()) {
					if (index === node.elements.length - 1 && element) return;
					commaToken = sourceCode.getTokenAfter(element ?? commaToken ?? sourceCode.getFirstToken(node), astUtils.isCommaToken), !element && context.report({
						node,
						loc: commaToken.loc,
						messageId: "unexpectedSparseArray"
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-sparse-arrays.cjs
module.exports = require_no_sparse_arrays().create;
//#endregion
