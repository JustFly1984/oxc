//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-continue.js
/**
* @fileoverview Rule to flag use of continue statement
* @author Borislav Zhivkov
*/
var require_no_continue = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `continue` statements",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-continue"
			},
			schema: [],
			messages: { unexpected: "Unexpected use of continue statement." }
		},
		create(context) {
			return { ContinueStatement(node) {
				context.report({
					node,
					messageId: "unexpected"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-continue.cjs
module.exports = require_no_continue().create;
//#endregion
