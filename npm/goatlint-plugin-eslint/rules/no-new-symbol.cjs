//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-new-symbol.js
/**
* @fileoverview Rule to disallow use of the new operator with the `Symbol` object
* @author Alberto Rodríguez
* @deprecated in ESLint v9.0.0
*/
var require_no_new_symbol = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow `new` operators with the `Symbol` object",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-new-symbol"
			},
			deprecated: {
				message: "The rule was replaced with a more general rule.",
				url: "https://eslint.org/docs/latest/use/migrate-to-9.0.0#eslint-recommended",
				deprecatedSince: "9.0.0",
				availableUntil: "11.0.0",
				replacedBy: [{ rule: {
					name: "no-new-native-nonconstructor",
					url: "https://eslint.org/docs/latest/rules/no-new-native-nonconstructor"
				} }]
			},
			schema: [],
			messages: { noNewSymbol: "`Symbol` cannot be called as a constructor." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { "Program:exit"(node) {
				let variable = sourceCode.getScope(node).set.get("Symbol");
				variable && variable.defs.length === 0 && variable.references.forEach((ref) => {
					let idNode = ref.identifier, parent = idNode.parent;
					parent && parent.type === "NewExpression" && parent.callee === idNode && context.report({
						node: idNode,
						messageId: "noNewSymbol"
					});
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-new-symbol.cjs
module.exports = require_no_new_symbol().create;
//#endregion
