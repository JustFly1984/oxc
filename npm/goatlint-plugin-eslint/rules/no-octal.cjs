//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-octal.js
/**
* @fileoverview Rule to flag when initializing octal literal
* @author Ilya Volodin
*/
var require_no_octal = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow octal literals",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-octal"
			},
			schema: [],
			messages: { noOctal: "Octal literals should not be used." }
		},
		create(context) {
			return { Literal(node) {
				typeof node.value == "number" && /^0\d/u.test(node.raw) && context.report({
					node,
					messageId: "noOctal"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-octal.cjs
module.exports = require_no_octal().create;
//#endregion
