const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-func-assign.js
/**
* @fileoverview Rule to flag use of function declaration identifiers as variables.
* @author Ian Christian Myers
*/
var require_no_func_assign = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow reassigning `function` declarations",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-func-assign"
			},
			schema: [],
			messages: { isAFunction: "'{{name}}' is a function." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Reports a reference if is non initializer and writable.
			* @param {References} references Collection of reference to check.
			* @returns {void}
			*/
			function checkReference(references) {
				astUtils.getModifyingReferences(references).forEach((reference) => {
					context.report({
						node: reference.identifier,
						messageId: "isAFunction",
						data: { name: reference.identifier.name }
					});
				});
			}
			/**
			* Finds and reports references that are non initializer and writable.
			* @param {Variable} variable A variable to check.
			* @returns {void}
			*/
			function checkVariable(variable) {
				variable.defs[0].type === "FunctionName" && checkReference(variable.references);
			}
			/**
			* Checks parameters of a given function node.
			* @param {ASTNode} node A function node to check.
			* @returns {void}
			*/
			function checkForFunction(node) {
				sourceCode.getDeclaredVariables(node).forEach(checkVariable);
			}
			return {
				FunctionDeclaration: checkForFunction,
				FunctionExpression: checkForFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-func-assign.cjs
module.exports = require_no_func_assign().create;
//#endregion
