//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-multi-assign.js
/**
* @fileoverview Rule to check use of chained assignment expressions
* @author Stewart Rand
*/
var require_no_multi_assign = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ ignoreNonDeclaration: !1 }],
			docs: {
				description: "Disallow use of chained assignment expressions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-multi-assign"
			},
			schema: [{
				type: "object",
				properties: { ignoreNonDeclaration: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { unexpectedChain: "Unexpected chained assignment." }
		},
		create(context) {
			let [{ ignoreNonDeclaration }] = context.options, selectors = ["VariableDeclarator > AssignmentExpression.init", "PropertyDefinition > AssignmentExpression.value"];
			return ignoreNonDeclaration || selectors.push("AssignmentExpression > AssignmentExpression.right"), { [selectors](node) {
				context.report({
					node,
					messageId: "unexpectedChain"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-multi-assign.cjs
module.exports = require_no_multi_assign().create;
//#endregion
