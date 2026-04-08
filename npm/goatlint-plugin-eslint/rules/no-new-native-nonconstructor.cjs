//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-new-native-nonconstructor.js
/**
* @fileoverview Rule to disallow use of the new operator with global non-constructor functions
* @author Sosuke Suzuki
*/
var require_no_new_native_nonconstructor = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let nonConstructorGlobalFunctionNames = ["Symbol", "BigInt"];
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow `new` operators with global non-constructor functions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-new-native-nonconstructor"
			},
			schema: [],
			messages: { noNewNonconstructor: "`{{name}}` cannot be called as a constructor." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { "Program:exit"(node) {
				let globalScope = sourceCode.getScope(node);
				for (let nonConstructorName of nonConstructorGlobalFunctionNames) {
					let variable = globalScope.set.get(nonConstructorName);
					variable && variable.defs.length === 0 && variable.references.forEach((ref) => {
						let idNode = ref.identifier, parent = idNode.parent;
						parent && parent.type === "NewExpression" && parent.callee === idNode && context.report({
							node: idNode,
							messageId: "noNewNonconstructor",
							data: { name: nonConstructorName }
						});
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-new-native-nonconstructor.cjs
module.exports = require_no_new_native_nonconstructor().create;
//#endregion
