const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-new-object.js
/**
* @fileoverview A rule to disallow calls to the Object constructor
* @author Matt DuVall <http://www.mattduvall.com/>
* @deprecated in ESLint v8.50.0
*/
var require_no_new_object = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `Object` constructors",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-new-object"
			},
			deprecated: {
				message: "The new rule flags more situations where object literal syntax can be used, and it does not report a problem when the `Object` constructor is invoked with an argument.",
				url: "https://eslint.org/blog/2023/09/eslint-v8.50.0-released/",
				deprecatedSince: "8.50.0",
				availableUntil: "11.0.0",
				replacedBy: [{ rule: {
					name: "no-object-constructor",
					url: "https://eslint.org/docs/rules/no-object-constructor"
				} }]
			},
			schema: [],
			messages: { preferLiteral: "The object literal notation {} is preferable." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { NewExpression(node) {
				let variable = astUtils.getVariableByName(sourceCode.getScope(node), node.callee.name);
				variable && variable.identifiers.length > 0 || node.callee.name === "Object" && context.report({
					node,
					messageId: "preferLiteral"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-new-object.cjs
module.exports = require_no_new_object().create;
//#endregion
