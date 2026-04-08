//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-template-curly-in-string.js
/**
* @fileoverview Warn when using template string syntax in regular strings
* @author Jeroen Engels
*/
var require_no_template_curly_in_string = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow template literal placeholder syntax in regular strings",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-template-curly-in-string"
			},
			schema: [],
			messages: { unexpectedTemplateExpression: "Unexpected template string expression." }
		},
		create(context) {
			let regex = /\$\{[^}]+\}/u;
			return { Literal(node) {
				typeof node.value == "string" && regex.test(node.value) && context.report({
					node,
					messageId: "unexpectedTemplateExpression"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-template-curly-in-string.cjs
module.exports = require_no_template_curly_in_string().create;
//#endregion
