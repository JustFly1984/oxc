const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-label-var.js
/**
* @fileoverview Rule to flag labels that are the same as an identifier
* @author Ian Christian Myers
*/
var require_no_label_var = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow labels that share a name with a variable",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-label-var"
			},
			schema: [],
			messages: { identifierClashWithLabel: "Found identifier with same name as label." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Check if the identifier is present inside current scope
			* @param {Object} scope current scope
			* @param {string} name To evaluate
			* @returns {boolean} True if its present
			* @private
			*/
			function findIdentifier(scope, name) {
				return astUtils.getVariableByName(scope, name) !== null;
			}
			return { LabeledStatement(node) {
				findIdentifier(sourceCode.getScope(node), node.label.name) && context.report({
					node,
					messageId: "identifierClashWithLabel"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-label-var.cjs
module.exports = require_no_label_var().create;
//#endregion
