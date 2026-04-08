//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-nonoctal-decimal-escape.js
/**
* @fileoverview Rule to disallow `\8` and `\9` escape sequences in string literals.
* @author Milos Djermanovic
*/
var require_no_nonoctal_decimal_escape = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/**
	* @import { SourceRange } from "@eslint/core";
	*/
	let QUICK_TEST_REGEX = /\\[89]/u;
	/**
	* Returns unicode escape sequence that represents the given character.
	* @param {string} character A single code unit.
	* @returns {string} "\uXXXX" sequence.
	*/
	function getUnicodeEscape(character) {
		return `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `\\8` and `\\9` escape sequences in string literals",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape"
			},
			hasSuggestions: !0,
			schema: [],
			messages: {
				decimalEscape: "Don't use '{{decimalEscape}}' escape sequence.",
				refactor: "Replace '{{original}}' with '{{replacement}}'. This maintains the current functionality.",
				escapeBackslash: "Replace '{{original}}' with '{{replacement}}' to include the actual backslash character."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Creates a new Suggestion object.
			* @param {string} messageId "refactor" or "escapeBackslash".
			* @param {SourceRange} range The range to replace.
			* @param {string} replacement New text for the range.
			* @returns {Object} Suggestion
			*/
			function createSuggestion(messageId, range, replacement) {
				return {
					messageId,
					data: {
						original: sourceCode.getText().slice(...range),
						replacement
					},
					fix(fixer) {
						return fixer.replaceTextRange(range, replacement);
					}
				};
			}
			return { Literal(node) {
				if (typeof node.value != "string" || !QUICK_TEST_REGEX.test(node.raw)) return;
				let regex = /(?:[^\\]|(?<previousEscape>\\.))*?(?<decimalEscape>\\[89])/suy, match;
				for (; match = regex.exec(node.raw);) {
					let { previousEscape, decimalEscape } = match.groups, decimalEscapeRangeEnd = node.range[0] + match.index + match[0].length, decimalEscapeRangeStart = decimalEscapeRangeEnd - decimalEscape.length, decimalEscapeRange = [decimalEscapeRangeStart, decimalEscapeRangeEnd], suggest = [];
					previousEscape === "\\0" ? suggest.push(createSuggestion("refactor", [decimalEscapeRangeStart - previousEscape.length, decimalEscapeRangeEnd], `${getUnicodeEscape("\0")}${decimalEscape[1]}`), createSuggestion("refactor", decimalEscapeRange, getUnicodeEscape(decimalEscape[1]))) : suggest.push(createSuggestion("refactor", decimalEscapeRange, decimalEscape[1])), suggest.push(createSuggestion("escapeBackslash", decimalEscapeRange, `\\${decimalEscape}`)), context.report({
						node,
						loc: {
							start: sourceCode.getLocFromIndex(decimalEscapeRangeStart),
							end: sourceCode.getLocFromIndex(decimalEscapeRangeEnd)
						},
						messageId: "decimalEscape",
						data: { decimalEscape },
						suggest
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-nonoctal-decimal-escape.cjs
module.exports = require_no_nonoctal_decimal_escape().create;
//#endregion
