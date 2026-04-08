//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-new.js
/**
* @fileoverview Rule to flag statements with function invocation preceded by
* "new" and not part of assignment
* @author Ilya Volodin
*/
var require_no_new = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `new` operators outside of assignments or comparisons",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-new"
			},
			schema: [],
			messages: { noNewStatement: "Do not use 'new' for side effects." }
		},
		create(context) {
			return { "ExpressionStatement > NewExpression"(node) {
				context.report({
					node: node.parent,
					messageId: "noNewStatement"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-new.cjs
module.exports = require_no_new().create;
//#endregion
