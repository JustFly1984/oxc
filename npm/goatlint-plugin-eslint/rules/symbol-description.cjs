const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/symbol-description.js
/**
* @fileoverview Rule to enforce description with the `Symbol` object
* @author Jarek Rencz
*/
var require_symbol_description = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require symbol descriptions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/symbol-description"
			},
			fixable: null,
			schema: [],
			messages: { expected: "Expected Symbol to have a description." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Reports if node does not conform the rule in case rule is set to
			* report missing description
			* @param {ASTNode} node A CallExpression node to check.
			* @returns {void}
			*/
			function checkArgument(node) {
				node.arguments.length === 0 && context.report({
					node,
					messageId: "expected"
				});
			}
			return { "Program:exit"(node) {
				let scope = sourceCode.getScope(node), variable = astUtils.getVariableByName(scope, "Symbol");
				variable && variable.defs.length === 0 && variable.references.forEach((reference) => {
					let idNode = reference.identifier;
					astUtils.isCallee(idNode) && checkArgument(idNode.parent);
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/symbol-description.cjs
module.exports = require_symbol_description().create;
//#endregion
