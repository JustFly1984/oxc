//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-multiple-empty-lines.js
/**
* @fileoverview Disallows multiple blank lines.
* implementation adapted from the no-trailing-spaces rule.
* @author Greg Cochard
* @deprecated in ESLint v8.53.0
*/
var require_no_multiple_empty_lines = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
						name: "no-multiple-empty-lines",
						url: "https://eslint.style/rules/no-multiple-empty-lines"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Disallow multiple empty lines",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-multiple-empty-lines"
			},
			fixable: "whitespace",
			schema: [{
				type: "object",
				properties: {
					max: {
						type: "integer",
						minimum: 0
					},
					maxEOF: {
						type: "integer",
						minimum: 0
					},
					maxBOF: {
						type: "integer",
						minimum: 0
					}
				},
				required: ["max"],
				additionalProperties: !1
			}],
			messages: {
				blankBeginningOfFile: "Too many blank lines at the beginning of file. Max of {{max}} allowed.",
				blankEndOfFile: "Too many blank lines at the end of file. Max of {{max}} allowed.",
				consecutiveBlank: "More than {{max}} blank {{pluralizedLines}} not allowed."
			}
		},
		create(context) {
			let max = 2, maxEOF = max, maxBOF = max;
			context.options.length && (max = context.options[0].max, maxEOF = context.options[0].maxEOF === void 0 ? max : context.options[0].maxEOF, maxBOF = context.options[0].maxBOF === void 0 ? max : context.options[0].maxBOF);
			let sourceCode = context.sourceCode, allLines = sourceCode.lines.at(-1) === "" ? sourceCode.lines.slice(0, -1) : sourceCode.lines, templateLiteralLines = /* @__PURE__ */ new Set();
			return {
				TemplateLiteral(node) {
					node.quasis.forEach((literalPart) => {
						for (let ignoredLine = literalPart.loc.start.line; ignoredLine < literalPart.loc.end.line; ignoredLine++) templateLiteralLines.add(ignoredLine);
					});
				},
				"Program:exit"(node) {
					return allLines.reduce((nonEmptyLineNumbers, line, index) => ((line.trim() || templateLiteralLines.has(index + 1)) && nonEmptyLineNumbers.push(index + 1), nonEmptyLineNumbers), []).concat(allLines.length + 1).reduce((lastLineNumber, lineNumber) => {
						let messageId, maxAllowed;
						return lastLineNumber === 0 ? (messageId = "blankBeginningOfFile", maxAllowed = maxBOF) : lineNumber === allLines.length + 1 ? (messageId = "blankEndOfFile", maxAllowed = maxEOF) : (messageId = "consecutiveBlank", maxAllowed = max), lineNumber - lastLineNumber - 1 > maxAllowed && context.report({
							node,
							loc: {
								start: {
									line: lastLineNumber + maxAllowed + 1,
									column: 0
								},
								end: {
									line: lineNumber,
									column: 0
								}
							},
							messageId,
							data: {
								max: maxAllowed,
								pluralizedLines: maxAllowed === 1 ? "line" : "lines"
							},
							fix(fixer) {
								let rangeStart = sourceCode.getIndexFromLoc({
									line: lastLineNumber + 1,
									column: 0
								}), lineNumberAfterRemovedLines = lineNumber - maxAllowed, rangeEnd = lineNumberAfterRemovedLines <= allLines.length ? sourceCode.getIndexFromLoc({
									line: lineNumberAfterRemovedLines,
									column: 0
								}) : sourceCode.text.length;
								return fixer.removeRange([rangeStart, rangeEnd]);
							}
						}), lineNumber;
					}, 0);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-multiple-empty-lines.cjs
module.exports = require_no_multiple_empty_lines().create;
//#endregion
