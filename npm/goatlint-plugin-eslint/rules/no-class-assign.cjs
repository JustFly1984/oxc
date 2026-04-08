const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-class-assign.js
/**
* @fileoverview A rule to disallow modifying variables of class declarations
* @author Toru Nagashima
*/
var require_no_class_assign = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow reassigning class members",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-class-assign"
			},
			schema: [],
			messages: { class: "'{{name}}' is a class." }
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
						messageId: "class",
						data: { name: reference.identifier.name }
					});
				});
			}
			/**
			* Finds and reports references that are non initializer and writable.
			* @param {ASTNode} node A ClassDeclaration/ClassExpression node to check.
			* @returns {void}
			*/
			function checkForClass(node) {
				sourceCode.getDeclaredVariables(node).forEach(checkVariable);
			}
			return {
				ClassDeclaration: checkForClass,
				ClassExpression: checkForClass
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-class-assign.cjs
module.exports = require_no_class_assign().create;
//#endregion
