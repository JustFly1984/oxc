//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-debugger.js
/**
* @fileoverview Rule to flag use of a debugger statement
* @author Nicholas C. Zakas
*/
var require_no_debugger = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow the use of `debugger`",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-debugger"
			},
			fixable: null,
			schema: [],
			messages: { unexpected: "Unexpected 'debugger' statement." }
		},
		create(context) {
			return { DebuggerStatement(node) {
				context.report({
					node,
					messageId: "unexpected"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-debugger.cjs
module.exports = require_no_debugger().create;
//#endregion
