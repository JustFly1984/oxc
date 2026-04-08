const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/linebreak-style.js
/**
* @fileoverview Rule to enforce a single linebreak style.
* @author Erik Mueller
* @deprecated in ESLint v8.53.0
*/
var require_linebreak_style = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* @import { SourceRange } from "@eslint/core";
	*/
	let astUtils = require_ast_utils$1.t();
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
						name: "linebreak-style",
						url: "https://eslint.style/rules/linebreak-style"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent linebreak style",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/linebreak-style"
			},
			fixable: "whitespace",
			schema: [{ enum: ["unix", "windows"] }],
			messages: {
				expectedLF: "Expected linebreaks to be 'LF' but found 'CRLF'.",
				expectedCRLF: "Expected linebreaks to be 'CRLF' but found 'LF'."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Builds a fix function that replaces text at the specified range in the source text.
			* @param {SourceRange} range The range to replace
			* @param {string} text The text to insert.
			* @returns {Function} Fixer function
			* @private
			*/
			function createFix(range, text) {
				return function(fixer) {
					return fixer.replaceTextRange(range, text);
				};
			}
			return { Program: function checkForLinebreakStyle(node) {
				let expectedLF = (context.options[0] || "unix") === "unix", expectedLFChars = expectedLF ? "\n" : "\r\n", source = sourceCode.getText(), pattern = astUtils.createGlobalLinebreakMatcher(), match, i = 0;
				for (; (match = pattern.exec(source)) !== null;) {
					if (i++, match[0] === expectedLFChars) continue;
					let index = match.index, range = [index, index + match[0].length];
					context.report({
						node,
						loc: {
							start: {
								line: i,
								column: sourceCode.lines[i - 1].length
							},
							end: {
								line: i + 1,
								column: 0
							}
						},
						messageId: expectedLF ? "expectedLF" : "expectedCRLF",
						fix: createFix(range, expectedLFChars)
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/linebreak-style.cjs
module.exports = require_linebreak_style().create;
//#endregion
