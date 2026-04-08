const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-empty-pattern.js
/**
* @fileoverview Rule to disallow an empty pattern
* @author Alberto Rodríguez
*/
var require_no_empty_pattern = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{ allowObjectPatternsAsParameters: !1 }],
			docs: {
				description: "Disallow empty destructuring patterns",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-empty-pattern"
			},
			schema: [{
				type: "object",
				properties: { allowObjectPatternsAsParameters: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { unexpected: "Unexpected empty {{type}} pattern." }
		},
		create(context) {
			let [{ allowObjectPatternsAsParameters }] = context.options;
			return {
				ObjectPattern(node) {
					node.properties.length > 0 || allowObjectPatternsAsParameters && (astUtils.isFunction(node.parent) || node.parent.type === "AssignmentPattern" && astUtils.isFunction(node.parent.parent) && node.parent.right.type === "ObjectExpression" && node.parent.right.properties.length === 0) || context.report({
						node,
						messageId: "unexpected",
						data: { type: "object" }
					});
				},
				ArrayPattern(node) {
					node.elements.length === 0 && context.report({
						node,
						messageId: "unexpected",
						data: { type: "array" }
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-empty-pattern.cjs
module.exports = require_no_empty_pattern().create;
//#endregion
