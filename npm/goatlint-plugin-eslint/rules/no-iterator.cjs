const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-iterator.js
/**
* @fileoverview Rule to flag usage of __iterator__ property
* @author Ian Christian Myers
*/
var require_no_iterator = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { getStaticPropertyName } = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow the use of the `__iterator__` property",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-iterator"
			},
			schema: [],
			messages: { noIterator: "Reserved name '__iterator__'." }
		},
		create(context) {
			return { MemberExpression(node) {
				getStaticPropertyName(node) === "__iterator__" && context.report({
					node,
					messageId: "noIterator"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-iterator.cjs
module.exports = require_no_iterator().create;
//#endregion
