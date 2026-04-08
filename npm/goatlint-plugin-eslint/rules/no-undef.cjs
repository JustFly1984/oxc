//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-undef.js
/**
* @fileoverview Rule to flag references to undeclared variables.
* @author Mark Macdonald
*/
var require_no_undef = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/**
	* Checks if the given node is the argument of a typeof operator.
	* @param {ASTNode} node The AST node being checked.
	* @returns {boolean} Whether or not the node is the argument of a typeof operator.
	*/
	function hasTypeOfOperator(node) {
		let parent = node.parent;
		return parent.type === "UnaryExpression" && parent.operator === "typeof";
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{ typeof: !1 }],
			docs: {
				description: "Disallow the use of undeclared variables unless mentioned in `/*global */` comments",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-undef"
			},
			schema: [{
				type: "object",
				properties: { typeof: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { undef: "'{{name}}' is not defined." }
		},
		create(context) {
			let [{ typeof: considerTypeOf }] = context.options, sourceCode = context.sourceCode;
			return { "Program:exit"(node) {
				sourceCode.getScope(node).through.forEach((ref) => {
					let identifier = ref.identifier;
					!considerTypeOf && hasTypeOfOperator(identifier) || context.report({
						node: identifier,
						messageId: "undef",
						data: identifier
					});
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-undef.cjs
module.exports = require_no_undef().create;
//#endregion
