//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unassigned-vars.js
/**
* @fileoverview Rule to flag variables that are never assigned
* @author Jacob Bandes-Storch <https://github.com/jtbandes>
*/
var require_no_unassigned_vars = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			dialects: ["typescript", "javascript"],
			language: "javascript",
			docs: {
				description: "Disallow `let` or `var` variables that are read but never assigned",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-unassigned-vars"
			},
			schema: [],
			messages: { unassigned: "'{{name}}' is always 'undefined' because it's never assigned." }
		},
		create(context) {
			let sourceCode = context.sourceCode, insideDeclareModule = !1;
			return {
				"TSModuleDeclaration[declare=true]"() {
					insideDeclareModule = !0;
				},
				"TSModuleDeclaration[declare=true]:exit"() {
					insideDeclareModule = !1;
				},
				VariableDeclarator(node) {
					/** @type {import('estree').VariableDeclaration} */
					let declaration = node.parent;
					if (node.init || node.id.type !== "Identifier" || declaration.kind === "const" || declaration.declare || insideDeclareModule) return;
					let [variable] = sourceCode.getDeclaredVariables(node);
					if (!variable) return;
					let hasRead = !1;
					for (let reference of variable.references) {
						if (reference.isWrite()) return;
						reference.isRead() && (hasRead = !0);
					}
					hasRead && context.report({
						node,
						messageId: "unassigned",
						data: { name: node.id.name }
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unassigned-vars.cjs
module.exports = require_no_unassigned_vars().create;
//#endregion
