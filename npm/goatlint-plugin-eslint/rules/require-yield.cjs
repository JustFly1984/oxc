//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/require-yield.js
/**
* @fileoverview Rule to flag the generator functions that does not have yield.
* @author Toru Nagashima
*/
var require_require_yield = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require generator functions to contain `yield`",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/require-yield"
			},
			schema: [],
			messages: { missingYield: "This generator function does not have 'yield'." }
		},
		create(context) {
			let stack = [];
			/**
			* If the node is a generator function, start counting `yield` keywords.
			* @param {Node} node A function node to check.
			* @returns {void}
			*/
			function beginChecking(node) {
				node.generator && stack.push(0);
			}
			/**
			* If the node is a generator function, end counting `yield` keywords, then
			* reports result.
			* @param {Node} node A function node to check.
			* @returns {void}
			*/
			function endChecking(node) {
				node.generator && stack.pop() === 0 && node.body.body.length > 0 && context.report({
					node,
					messageId: "missingYield"
				});
			}
			return {
				FunctionDeclaration: beginChecking,
				"FunctionDeclaration:exit": endChecking,
				FunctionExpression: beginChecking,
				"FunctionExpression:exit": endChecking,
				YieldExpression() {
					stack.length > 0 && (stack[stack.length - 1] += 1);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/require-yield.cjs
module.exports = require_require_yield().create;
//#endregion
