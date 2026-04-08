//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/eol-last.js
/**
* @fileoverview Require or disallow newline at the end of files
* @author Nodeca Team <https://github.com/nodeca>
* @deprecated in ESLint v8.53.0
*/
var require_eol_last = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
						name: "eol-last",
						url: "https://eslint.style/rules/eol-last"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require or disallow newline at the end of files",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/eol-last"
			},
			fixable: "whitespace",
			schema: [{ enum: [
				"always",
				"never",
				"unix",
				"windows"
			] }],
			messages: {
				missing: "Newline required at end of file but not found.",
				unexpected: "Newline not allowed at end of file."
			}
		},
		create(context) {
			return { Program: function checkBadEOF(node) {
				let sourceCode = context.sourceCode, src = sourceCode.getText(), location = {
					column: sourceCode.lines.at(-1).length,
					line: sourceCode.lines.length
				}, endsWithNewline = src.endsWith("\n");
				if (!src.length) return;
				let mode = context.options[0] || "always", appendCRLF = !1;
				if (mode === "unix" && (mode = "always"), mode === "windows" && (mode = "always", appendCRLF = !0), mode === "always" && !endsWithNewline) context.report({
					node,
					loc: location,
					messageId: "missing",
					fix(fixer) {
						return fixer.insertTextAfterRange([0, src.length], appendCRLF ? "\r\n" : "\n");
					}
				});
				else if (mode === "never" && endsWithNewline) {
					let secondLastLine = sourceCode.lines.at(-2);
					context.report({
						node,
						loc: {
							start: {
								line: sourceCode.lines.length - 1,
								column: secondLastLine.length
							},
							end: {
								line: sourceCode.lines.length,
								column: 0
							}
						},
						messageId: "unexpected",
						fix(fixer) {
							let start = /(?:\r?\n)+$/u.exec(sourceCode.text).index, end = sourceCode.text.length;
							return fixer.replaceTextRange([start, end], "");
						}
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/eol-last.cjs
module.exports = require_eol_last().create;
//#endregion
