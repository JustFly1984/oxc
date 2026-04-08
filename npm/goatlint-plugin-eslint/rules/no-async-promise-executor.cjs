//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-async-promise-executor.js
/**
* @fileoverview disallow using an async function as a Promise executor
* @author Teddy Katz
*/
var require_no_async_promise_executor = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow using an async function as a Promise executor",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-async-promise-executor"
			},
			fixable: null,
			schema: [],
			messages: { async: "Promise executor functions should not be async." }
		},
		create(context) {
			return { "NewExpression[callee.name='Promise'][arguments.0.async=true]"(node) {
				context.report({
					node: context.sourceCode.getFirstToken(node.arguments[0], (token) => token.value === "async"),
					messageId: "async"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-async-promise-executor.cjs
module.exports = require_no_async_promise_executor().create;
//#endregion
