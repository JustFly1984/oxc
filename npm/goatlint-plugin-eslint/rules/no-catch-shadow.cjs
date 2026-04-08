const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-catch-shadow.js
/**
* @fileoverview Rule to flag variable leak in CatchClauses in IE 8 and earlier
* @author Ian Christian Myers
* @deprecated in ESLint v5.1.0
*/
var require_no_catch_shadow = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `catch` clause parameters from shadowing variables in the outer scope",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-catch-shadow"
			},
			deprecated: {
				message: "This rule was renamed.",
				url: "https://eslint.org/blog/2018/07/eslint-v5.1.0-released/",
				deprecatedSince: "5.1.0",
				availableUntil: "11.0.0",
				replacedBy: [{ rule: {
					name: "no-shadow",
					url: "https://eslint.org/docs/rules/no-shadow"
				} }]
			},
			schema: [],
			messages: { mutable: "Value of '{{name}}' may be overwritten in IE 8 and earlier." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Check if the parameters are been shadowed
			* @param {Object} scope current scope
			* @param {string} name parameter name
			* @returns {boolean} True is its been shadowed
			*/
			function paramIsShadowing(scope, name) {
				return astUtils.getVariableByName(scope, name) !== null;
			}
			return { "CatchClause[param!=null]"(node) {
				let scope = sourceCode.getScope(node);
				scope.block === node && (scope = scope.upper), paramIsShadowing(scope, node.param.name) && context.report({
					node,
					messageId: "mutable",
					data: { name: node.param.name }
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-catch-shadow.cjs
module.exports = require_no_catch_shadow().create;
//#endregion
