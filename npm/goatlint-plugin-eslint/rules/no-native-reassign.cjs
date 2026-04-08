//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-native-reassign.js
/**
* @fileoverview Rule to disallow assignments to native objects or read-only global variables
* @author Ilya Volodin
* @deprecated in ESLint v3.3.0
*/
var require_no_native_reassign = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow assignments to native objects or read-only global variables",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-native-reassign"
			},
			deprecated: {
				message: "Renamed rule.",
				url: "https://eslint.org/blog/2016/08/eslint-v3.3.0-released/#deprecated-rules",
				deprecatedSince: "3.3.0",
				availableUntil: "11.0.0",
				replacedBy: [{ rule: {
					name: "no-global-assign",
					url: "https://eslint.org/docs/rules/no-global-assign"
				} }]
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
			messages: { nativeReassign: "Read-only global '{{name}}' should not be modified." }
		},
		create(context) {
			let config = context.options[0], exceptions = config && config.exceptions || [], sourceCode = context.sourceCode;
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
					messageId: "nativeReassign",
					data: identifier
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
//#region src-js/generated/plugin-eslint/rules/no-native-reassign.cjs
module.exports = require_no_native_reassign().create;
//#endregion
