//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/default-case-last.js
/**
* @fileoverview Rule to enforce `default` clauses in `switch` statements to be last
* @author Milos Djermanovic
*/
var require_default_case_last = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce `default` clauses in `switch` statements to be last",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/default-case-last"
			},
			schema: [],
			messages: { notLast: "Default clause should be the last clause." }
		},
		create(context) {
			return { SwitchStatement(node) {
				let cases = node.cases, indexOfDefault = cases.findIndex((c) => c.test === null);
				if (indexOfDefault !== -1 && indexOfDefault !== cases.length - 1) {
					let defaultClause = cases[indexOfDefault];
					context.report({
						node: defaultClause,
						messageId: "notLast"
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/default-case-last.cjs
module.exports = require_default_case_last().create;
//#endregion
