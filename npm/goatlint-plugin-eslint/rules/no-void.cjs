//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-void.js
/**
* @fileoverview Rule to disallow use of void operator.
* @author Mike Sidorov
*/
var require_no_void = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ allowAsStatement: !1 }],
			docs: {
				description: "Disallow `void` operators",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-void"
			},
			messages: { noVoid: "Expected 'undefined' and instead saw 'void'." },
			schema: [{
				type: "object",
				properties: { allowAsStatement: { type: "boolean" } },
				additionalProperties: !1
			}]
		},
		create(context) {
			let [{ allowAsStatement }] = context.options;
			return { "UnaryExpression[operator=\"void\"]"(node) {
				allowAsStatement && node.parent && node.parent.type === "ExpressionStatement" || context.report({
					node,
					messageId: "noVoid"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-void.cjs
module.exports = require_no_void().create;
//#endregion
