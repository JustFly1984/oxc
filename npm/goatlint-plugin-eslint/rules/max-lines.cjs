const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/max-lines.js
/**
* @fileoverview enforce a maximum file length
* @author Alberto Rodríguez
*/
var require_max_lines = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Creates an array of numbers from `start` up to, but not including, `end`
	* @param {number} start The start of the range
	* @param {number} end The end of the range
	* @returns {number[]} The range of numbers
	*/
	function range(start, end) {
		return [...Array(end - start).keys()].map((x) => x + start);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce a maximum number of lines per file",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/max-lines"
			},
			schema: [{ oneOf: [{
				type: "integer",
				minimum: 0
			}, {
				type: "object",
				properties: {
					max: {
						type: "integer",
						minimum: 0
					},
					skipComments: { type: "boolean" },
					skipBlankLines: { type: "boolean" }
				},
				additionalProperties: !1
			}] }],
			messages: { exceed: "File has too many lines ({{actual}}). Maximum allowed is {{max}}." }
		},
		create(context) {
			let option = context.options[0], max = 300;
			typeof option == "object" && Object.hasOwn(option, "max") ? max = option.max : typeof option == "number" && (max = option);
			let skipComments = option && option.skipComments, skipBlankLines = option && option.skipBlankLines, sourceCode = context.sourceCode;
			/**
			* Returns whether or not a token is a comment node type
			* @param {Token} token The token to check
			* @returns {boolean} True if the token is a comment node
			*/
			function isCommentNodeType(token) {
				return token && (token.type === "Block" || token.type === "Line");
			}
			/**
			* Returns the line numbers of a comment that don't have any code on the same line
			* @param {Node} comment The comment node to check
			* @returns {number[]} The line numbers
			*/
			function getLinesWithoutCode(comment) {
				let start = comment.loc.start.line, end = comment.loc.end.line, token;
				token = comment;
				do
					token = sourceCode.getTokenBefore(token, { includeComments: !0 });
				while (isCommentNodeType(token));
				token && astUtils.isTokenOnSameLine(token, comment) && (start += 1), token = comment;
				do
					token = sourceCode.getTokenAfter(token, { includeComments: !0 });
				while (isCommentNodeType(token));
				return token && astUtils.isTokenOnSameLine(comment, token) && --end, start <= end ? range(start, end + 1) : [];
			}
			return { "Program:exit"() {
				let lines = sourceCode.lines.map((text, i) => ({
					lineNumber: i + 1,
					text
				}));
				if (lines.length > 1 && lines.at(-1).text === "" && lines.pop(), skipBlankLines && (lines = lines.filter((l) => l.text.trim() !== "")), skipComments) {
					let comments = sourceCode.getAllComments(), commentLines = new Set(comments.flatMap(getLinesWithoutCode));
					lines = lines.filter((l) => !commentLines.has(l.lineNumber));
				}
				if (lines.length > max) {
					let loc = {
						start: {
							line: lines[max].lineNumber,
							column: 0
						},
						end: {
							line: sourceCode.lines.length,
							column: sourceCode.lines.at(-1).length
						}
					};
					context.report({
						loc,
						messageId: "exceed",
						data: {
							max,
							actual: lines.length
						}
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/max-lines.cjs
module.exports = require_max_lines().create;
//#endregion
