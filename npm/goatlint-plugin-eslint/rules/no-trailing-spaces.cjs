const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-trailing-spaces.js
/**
* @fileoverview Disallow trailing spaces at the end of lines.
* @author Nodeca Team <https://github.com/nodeca>
* @deprecated in ESLint v8.53.0
*/
var require_no_trailing_spaces = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* @import { SourceLocation, SourceRange } from "@eslint/core";
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
						name: "no-trailing-spaces",
						url: "https://eslint.style/rules/no-trailing-spaces"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Disallow trailing whitespace at the end of lines",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-trailing-spaces"
			},
			fixable: "whitespace",
			schema: [{
				type: "object",
				properties: {
					skipBlankLines: {
						type: "boolean",
						default: !1
					},
					ignoreComments: {
						type: "boolean",
						default: !1
					}
				},
				additionalProperties: !1
			}],
			messages: { trailingSpace: "Trailing spaces not allowed." }
		},
		create(context) {
			let sourceCode = context.sourceCode, BLANK_CLASS = "[ 	\xA0           ​　]", SKIP_BLANK = `^${BLANK_CLASS}*$`, NONBLANK = `${BLANK_CLASS}+$`, options = context.options[0] || {}, skipBlankLines = options.skipBlankLines || !1, ignoreComments = options.ignoreComments || !1;
			/**
			* Report the error message
			* @param {ASTNode} node node to report
			* @param {SourceLocation} location range information
			* @param {SourceRange} fixRange Range based on the whole program
			* @returns {void}
			*/
			function report(node, location, fixRange) {
				context.report({
					node,
					loc: location,
					messageId: "trailingSpace",
					fix(fixer) {
						return fixer.removeRange(fixRange);
					}
				});
			}
			/**
			* Given a list of comment nodes, return the line numbers for those comments.
			* @param {Array} comments An array of comment nodes.
			* @returns {number[]} An array of line numbers containing comments.
			*/
			function getCommentLineNumbers(comments) {
				let lines = /* @__PURE__ */ new Set();
				return comments.forEach((comment) => {
					let endLine = comment.type === "Block" ? comment.loc.end.line - 1 : comment.loc.end.line;
					for (let i = comment.loc.start.line; i <= endLine; i++) lines.add(i);
				}), lines;
			}
			return { Program: function checkTrailingSpaces(node) {
				let re = new RegExp(NONBLANK, "u"), skipMatch = new RegExp(SKIP_BLANK, "u"), lines = sourceCode.lines, linebreaks = sourceCode.getText().match(astUtils.createGlobalLinebreakMatcher()), commentLineNumbers = getCommentLineNumbers(sourceCode.getAllComments()), totalLength = 0;
				for (let i = 0, ii = lines.length; i < ii; i++) {
					let lineNumber = i + 1, linebreakLength = linebreaks && linebreaks[i] ? linebreaks[i].length : 1, lineLength = lines[i].length + linebreakLength, matches = re.exec(lines[i]);
					if (matches) {
						let location = {
							start: {
								line: lineNumber,
								column: matches.index
							},
							end: {
								line: lineNumber,
								column: lineLength - linebreakLength
							}
						}, rangeStart = totalLength + location.start.column, rangeEnd = totalLength + location.end.column, containingNode = sourceCode.getNodeByRangeIndex(rangeStart);
						if (containingNode && containingNode.type === "TemplateElement" && rangeStart > containingNode.parent.range[0] && rangeEnd < containingNode.parent.range[1]) {
							totalLength += lineLength;
							continue;
						}
						if (skipBlankLines && skipMatch.test(lines[i])) {
							totalLength += lineLength;
							continue;
						}
						let fixRange = [rangeStart, rangeEnd];
						(!ignoreComments || !commentLineNumbers.has(lineNumber)) && report(node, location, fixRange);
					}
					totalLength += lineLength;
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-trailing-spaces.cjs
module.exports = require_no_trailing_spaces().create;
//#endregion
