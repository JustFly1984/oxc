//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/one-var-declaration-per-line.js
/**
* @fileoverview Rule to check multiple var declarations per line
* @author Alberto Rodríguez
* @deprecated in ESLint v8.53.0
*/
var require_one_var_declaration_per_line = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Formatting rules are being moved out of ESLint core.",
				url: "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
				deprecatedSince: "8.53.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "ESLint Stylistic now maintains deprecated stylistic core rules.",
					url: "https://eslint.style/guide/migration",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "one-var-declaration-per-line",
						url: "https://eslint.style/rules/one-var-declaration-per-line"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Require or disallow newlines around variable declarations",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/one-var-declaration-per-line"
			},
			schema: [{ enum: ["always", "initializations"] }],
			fixable: "whitespace",
			messages: { expectVarOnNewline: "Expected variable declaration to be on a new line." }
		},
		create(context) {
			let always = context.options[0] === "always";
			/**
			* Determine if provided keyword is a variant of for specifiers
			* @private
			* @param {string} keyword keyword to test
			* @returns {boolean} True if `keyword` is a variant of for specifier
			*/
			function isForTypeSpecifier(keyword) {
				return keyword === "ForStatement" || keyword === "ForInStatement" || keyword === "ForOfStatement";
			}
			/**
			* Checks newlines around variable declarations.
			* @private
			* @param {ASTNode} node `VariableDeclaration` node to test
			* @returns {void}
			*/
			function checkForNewLine(node) {
				if (isForTypeSpecifier(node.parent.type)) return;
				let declarations = node.declarations, prev;
				declarations.forEach((current) => {
					prev && prev.loc.end.line === current.loc.start.line && (always || prev.init || current.init) && context.report({
						node,
						messageId: "expectVarOnNewline",
						loc: current.loc,
						fix: (fixer) => fixer.insertTextBefore(current, "\n")
					}), prev = current;
				});
			}
			return { VariableDeclaration: checkForNewLine };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/one-var-declaration-per-line.cjs
module.exports = require_one_var_declaration_per_line().create;
//#endregion
