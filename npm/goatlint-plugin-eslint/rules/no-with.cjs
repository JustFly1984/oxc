//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-with.js
/**
* @fileoverview Rule to flag use of with statement
* @author Nicholas C. Zakas
*/
var require_no_with = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `with` statements",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-with"
			},
			schema: [],
			messages: { unexpectedWith: "Unexpected use of 'with' statement." }
		},
		create(context) {
			return { WithStatement(node) {
				context.report({
					node,
					messageId: "unexpectedWith"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-with.cjs
module.exports = require_no_with().create;
//#endregion
