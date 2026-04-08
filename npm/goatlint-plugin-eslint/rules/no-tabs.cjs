//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-tabs.js
/**
* @fileoverview Rule to check for tabs inside a file
* @author Gyandeep Singh
* @deprecated in ESLint v8.53.0
*/
var require_no_tabs = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let tabRegex = /\t+/gu, anyNonWhitespaceRegex = /\S/u;
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
						name: "no-tabs",
						url: "https://eslint.style/rules/no-tabs"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Disallow all tabs",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-tabs"
			},
			schema: [{
				type: "object",
				properties: { allowIndentationTabs: {
					type: "boolean",
					default: !1
				} },
				additionalProperties: !1
			}],
			messages: { unexpectedTab: "Unexpected tab character." }
		},
		create(context) {
			let sourceCode = context.sourceCode, allowIndentationTabs = context.options && context.options[0] && context.options[0].allowIndentationTabs;
			return { Program(node) {
				sourceCode.getLines().forEach((line, index) => {
					let match;
					for (; (match = tabRegex.exec(line)) !== null;) allowIndentationTabs && !anyNonWhitespaceRegex.test(line.slice(0, match.index)) || context.report({
						node,
						loc: {
							start: {
								line: index + 1,
								column: match.index
							},
							end: {
								line: index + 1,
								column: match.index + match[0].length
							}
						},
						messageId: "unexpectedTab"
					});
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-tabs.cjs
module.exports = require_no_tabs().create;
//#endregion
