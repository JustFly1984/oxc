//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-restricted-syntax.js
/**
* @fileoverview Rule to flag use of certain node types
* @author Burak Yigit Kaya
*/
var require_no_restricted_syntax = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow specified syntax",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-restricted-syntax"
			},
			schema: {
				type: "array",
				items: { oneOf: [{ type: "string" }, {
					type: "object",
					properties: {
						selector: { type: "string" },
						message: { type: "string" }
					},
					required: ["selector"],
					additionalProperties: !1
				}] },
				uniqueItems: !0,
				minItems: 0
			},
			messages: { restrictedSyntax: "{{message}}" }
		},
		create(context) {
			return context.options.reduce((result, selectorOrObject) => {
				let isStringFormat = typeof selectorOrObject == "string", hasCustomMessage = !isStringFormat && !!selectorOrObject.message, selector = isStringFormat ? selectorOrObject : selectorOrObject.selector, message = hasCustomMessage ? selectorOrObject.message : `Using '${selector}' is not allowed.`;
				return Object.assign(result, { [selector](node) {
					context.report({
						node,
						messageId: "restrictedSyntax",
						data: { message }
					});
				} });
			}, {});
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-restricted-syntax.cjs
module.exports = require_no_restricted_syntax().create;
//#endregion
