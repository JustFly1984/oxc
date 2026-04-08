const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-new-wrappers.js
/**
* @fileoverview Rule to flag when using constructor for wrapper objects
* @author Ilya Volodin
*/
var require_no_new_wrappers = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { getVariableByName } = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `new` operators with the `String`, `Number`, and `Boolean` objects",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-new-wrappers"
			},
			schema: [],
			messages: { noConstructor: "Do not use {{fn}} as a constructor." }
		},
		create(context) {
			let { sourceCode } = context;
			return { NewExpression(node) {
				let wrapperObjects = [
					"String",
					"Number",
					"Boolean"
				], { name } = node.callee;
				if (wrapperObjects.includes(name)) {
					let variable = getVariableByName(sourceCode.getScope(node), name);
					variable && variable.identifiers.length === 0 && context.report({
						node,
						messageId: "noConstructor",
						data: { fn: name }
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-new-wrappers.cjs
module.exports = require_no_new_wrappers().create;
//#endregion
