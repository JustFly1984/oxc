//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/sort-vars.js
/**
* @fileoverview Rule to require sorting of variables within a single Variable Declaration block
* @author Ilya Volodin
*/
var require_sort_vars = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ ignoreCase: !1 }],
			docs: {
				description: "Require variables within the same declaration block to be sorted",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/sort-vars"
			},
			schema: [{
				type: "object",
				properties: { ignoreCase: { type: "boolean" } },
				additionalProperties: !1
			}],
			fixable: "code",
			messages: { sortVars: "Variables within the same declaration block should be sorted alphabetically." }
		},
		create(context) {
			let [{ ignoreCase }] = context.options, sourceCode = context.sourceCode;
			return { VariableDeclaration(node) {
				let idDeclarations = node.declarations.filter((decl) => decl.id.type === "Identifier"), getSortableName = ignoreCase ? (decl) => decl.id.name.toLowerCase() : (decl) => decl.id.name, unfixable = idDeclarations.some((decl) => decl.init !== null && decl.init.type !== "Literal"), fixed = !1;
				idDeclarations.slice(1).reduce((memo, decl) => {
					let lastVariableName = getSortableName(memo);
					return getSortableName(decl) < lastVariableName ? (context.report({
						node: decl,
						messageId: "sortVars",
						fix(fixer) {
							return unfixable || fixed ? null : fixer.replaceTextRange([idDeclarations[0].range[0], idDeclarations.at(-1).range[1]], idDeclarations.slice().sort((declA, declB) => getSortableName(declA) > getSortableName(declB) ? 1 : -1).reduce((sourceText, identifier, index) => {
								let textAfterIdentifier = index === idDeclarations.length - 1 ? "" : sourceCode.getText().slice(idDeclarations[index].range[1], idDeclarations[index + 1].range[0]);
								return sourceText + sourceCode.getText(identifier) + textAfterIdentifier;
							}, ""));
						}
					}), fixed = !0, memo) : decl;
				}, idDeclarations[0]);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/sort-vars.cjs
module.exports = require_sort_vars().create;
//#endregion
