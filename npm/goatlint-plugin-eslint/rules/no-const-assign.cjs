const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-const-assign.js
/**
* @fileoverview A rule to disallow modifying variables that are declared using `const`
* @author Toru Nagashima
*/
var require_no_const_assign = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), CONSTANT_BINDINGS = new Set([
		"const",
		"using",
		"await using"
	]);
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow reassigning `const`, `using`, and `await using` variables",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-const-assign"
			},
			schema: [],
			messages: { const: "'{{name}}' is constant." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Finds and reports references that are non initializer and writable.
			* @param {Variable} variable A variable to check.
			* @returns {void}
			*/
			function checkVariable(variable) {
				astUtils.getModifyingReferences(variable.references).forEach((reference) => {
					context.report({
						node: reference.identifier,
						messageId: "const",
						data: { name: reference.identifier.name }
					});
				});
			}
			return { VariableDeclaration(node) {
				CONSTANT_BINDINGS.has(node.kind) && sourceCode.getDeclaredVariables(node).forEach(checkVariable);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-const-assign.cjs
module.exports = require_no_const_assign().create;
//#endregion
