//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/default-param-last.js
/**
* @fileoverview enforce default parameters to be last
* @author Chiawen Chen
*/
var require_default_param_last = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/**
	* Checks if node is required: i.e. does not have a default value or ? optional indicator.
	* @param {ASTNode} node the node to be evaluated
	* @returns {boolean} true if the node is required, false if not.
	*/
	function isRequiredParameter(node) {
		return !(node.type === "AssignmentPattern" || node.type === "RestElement" || node.optional);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			dialects: ["javascript", "typescript"],
			language: "javascript",
			type: "suggestion",
			docs: {
				description: "Enforce default parameters to be last",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/default-param-last"
			},
			schema: [],
			messages: { shouldBeLast: "Default parameters should be last." }
		},
		create(context) {
			/**
			* Handler for function contexts.
			* @param {ASTNode} node function node
			* @returns {void}
			*/
			function handleFunction(node) {
				let hasSeenRequiredParameter = !1;
				for (let i = node.params.length - 1; i >= 0; --i) {
					let current = node.params[i];
					if (isRequiredParameter(current.type === "TSParameterProperty" ? current.parameter : current)) {
						hasSeenRequiredParameter = !0;
						continue;
					}
					hasSeenRequiredParameter && context.report({
						node: current,
						messageId: "shouldBeLast"
					});
				}
			}
			return {
				FunctionDeclaration: handleFunction,
				FunctionExpression: handleFunction,
				ArrowFunctionExpression: handleFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/default-param-last.cjs
module.exports = require_default_param_last().create;
//#endregion
