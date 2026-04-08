//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-case-declarations.js
/**
* @fileoverview Rule to flag use of an lexical declarations inside a case clause
* @author Erik Arvidsson
*/
var require_no_case_declarations = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow lexical declarations in case clauses",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-case-declarations"
			},
			hasSuggestions: !0,
			schema: [],
			messages: {
				addBrackets: "Add {} brackets around the case block.",
				unexpected: "Unexpected lexical declaration in case block."
			}
		},
		create(context) {
			/**
			* Checks whether or not a node is a lexical declaration.
			* @param {ASTNode} node A direct child statement of a switch case.
			* @returns {boolean} Whether or not the node is a lexical declaration.
			*/
			function isLexicalDeclaration(node) {
				switch (node.type) {
					case "FunctionDeclaration":
					case "ClassDeclaration": return !0;
					case "VariableDeclaration": return node.kind !== "var";
					default: return !1;
				}
			}
			return { SwitchCase(node) {
				for (let i = 0; i < node.consequent.length; i++) {
					let statement = node.consequent[i];
					isLexicalDeclaration(statement) && context.report({
						node: statement,
						messageId: "unexpected",
						suggest: [{
							messageId: "addBrackets",
							fix: (fixer) => [fixer.insertTextBefore(node.consequent[0], "{ "), fixer.insertTextAfter(node.consequent.at(-1), " }")]
						}]
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-case-declarations.cjs
module.exports = require_no_case_declarations().create;
//#endregion
