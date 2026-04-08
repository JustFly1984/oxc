//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-global-assign.js
/**
* @fileoverview Rule to disallow assignments to native objects or read-only global variables
* @author Ilya Volodin
*/
var require_no_global_assign = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ exceptions: [] }],
			docs: {
				description: "Disallow assignments to native objects or read-only global variables",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-global-assign"
			},
			schema: [{
				type: "object",
				properties: { exceptions: {
					type: "array",
					items: { type: "string" },
					uniqueItems: !0
				} },
				additionalProperties: !1
			}],
			messages: { globalShouldNotBeModified: "Read-only global '{{name}}' should not be modified." }
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ exceptions }] = context.options;
			/**
			* Reports write references.
			* @param {Reference} reference A reference to check.
			* @param {number} index The index of the reference in the references.
			* @param {Reference[]} references The array that the reference belongs to.
			* @returns {void}
			*/
			function checkReference(reference, index, references) {
				let identifier = reference.identifier;
				reference.init === !1 && reference.isWrite() && (index === 0 || references[index - 1].identifier !== identifier) && context.report({
					node: identifier,
					messageId: "globalShouldNotBeModified",
					data: { name: identifier.name }
				});
			}
			/**
			* Reports write references if a given variable is read-only builtin.
			* @param {Variable} variable A variable to check.
			* @returns {void}
			*/
			function checkVariable(variable) {
				variable.writeable === !1 && !exceptions.includes(variable.name) && variable.references.forEach(checkReference);
			}
			return { Program(node) {
				sourceCode.getScope(node).variables.forEach(checkVariable);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-global-assign.cjs
module.exports = require_no_global_assign().create;
//#endregion
