const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/array-bracket-newline.js
/**
* @fileoverview Rule to enforce linebreaks after open and before close array brackets
* @author Jan Peer Stöcklmair <https://github.com/JPeer264>
* @deprecated in ESLint v8.53.0
*/
var require_array_bracket_newline = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "array-bracket-newline",
						url: "https://eslint.style/rules/array-bracket-newline"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce linebreaks after opening and before closing array brackets",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/array-bracket-newline"
			},
			fixable: "whitespace",
			schema: [{ oneOf: [{ enum: [
				"always",
				"never",
				"consistent"
			] }, {
				type: "object",
				properties: {
					multiline: { type: "boolean" },
					minItems: {
						type: ["integer", "null"],
						minimum: 0
					}
				},
				additionalProperties: !1
			}] }],
			messages: {
				unexpectedOpeningLinebreak: "There should be no linebreak after '['.",
				unexpectedClosingLinebreak: "There should be no linebreak before ']'.",
				missingOpeningLinebreak: "A linebreak is required after '['.",
				missingClosingLinebreak: "A linebreak is required before ']'."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Normalizes a given option value.
			* @param {string|Object|undefined} option An option value to parse.
			* @returns {{multiline: boolean, minItems: number}} Normalized option object.
			*/
			function normalizeOptionValue(option) {
				let consistent = !1, multiline = !1, minItems;
				return option ? option === "consistent" ? (consistent = !0, minItems = Infinity) : option === "always" || option.minItems === 0 ? minItems = 0 : option === "never" ? minItems = Infinity : (multiline = !!option.multiline, minItems = option.minItems || Infinity) : (consistent = !1, multiline = !0, minItems = Infinity), {
					consistent,
					multiline,
					minItems
				};
			}
			/**
			* Normalizes a given option value.
			* @param {string|Object|undefined} options An option value to parse.
			* @returns {{ArrayExpression: {multiline: boolean, minItems: number}, ArrayPattern: {multiline: boolean, minItems: number}}} Normalized option object.
			*/
			function normalizeOptions(options) {
				let value = normalizeOptionValue(options);
				return {
					ArrayExpression: value,
					ArrayPattern: value
				};
			}
			/**
			* Reports that there shouldn't be a linebreak after the first token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportNoBeginningLinebreak(node, token) {
				context.report({
					node,
					loc: token.loc,
					messageId: "unexpectedOpeningLinebreak",
					fix(fixer) {
						let nextToken = sourceCode.getTokenAfter(token, { includeComments: !0 });
						return astUtils.isCommentToken(nextToken) ? null : fixer.removeRange([token.range[1], nextToken.range[0]]);
					}
				});
			}
			/**
			* Reports that there shouldn't be a linebreak before the last token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportNoEndingLinebreak(node, token) {
				context.report({
					node,
					loc: token.loc,
					messageId: "unexpectedClosingLinebreak",
					fix(fixer) {
						let previousToken = sourceCode.getTokenBefore(token, { includeComments: !0 });
						return astUtils.isCommentToken(previousToken) ? null : fixer.removeRange([previousToken.range[1], token.range[0]]);
					}
				});
			}
			/**
			* Reports that there should be a linebreak after the first token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportRequiredBeginningLinebreak(node, token) {
				context.report({
					node,
					loc: token.loc,
					messageId: "missingOpeningLinebreak",
					fix(fixer) {
						return fixer.insertTextAfter(token, "\n");
					}
				});
			}
			/**
			* Reports that there should be a linebreak before the last token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportRequiredEndingLinebreak(node, token) {
				context.report({
					node,
					loc: token.loc,
					messageId: "missingClosingLinebreak",
					fix(fixer) {
						return fixer.insertTextBefore(token, "\n");
					}
				});
			}
			/**
			* Reports a given node if it violated this rule.
			* @param {ASTNode} node A node to check. This is an ArrayExpression node or an ArrayPattern node.
			* @returns {void}
			*/
			function check(node) {
				let elements = node.elements, options = normalizeOptions(context.options[0])[node.type], openBracket = sourceCode.getFirstToken(node), closeBracket = sourceCode.getLastToken(node), firstIncComment = sourceCode.getTokenAfter(openBracket, { includeComments: !0 }), lastIncComment = sourceCode.getTokenBefore(closeBracket, { includeComments: !0 }), first = sourceCode.getTokenAfter(openBracket), last = sourceCode.getTokenBefore(closeBracket);
				elements.length >= options.minItems || options.multiline && elements.length > 0 && firstIncComment.loc.start.line !== lastIncComment.loc.end.line || elements.length === 0 && firstIncComment.type === "Block" && firstIncComment.loc.start.line !== lastIncComment.loc.end.line && firstIncComment === lastIncComment || options.consistent && openBracket.loc.end.line !== first.loc.start.line ? (astUtils.isTokenOnSameLine(openBracket, first) && reportRequiredBeginningLinebreak(node, openBracket), astUtils.isTokenOnSameLine(last, closeBracket) && reportRequiredEndingLinebreak(node, closeBracket)) : (astUtils.isTokenOnSameLine(openBracket, first) || reportNoBeginningLinebreak(node, openBracket), astUtils.isTokenOnSameLine(last, closeBracket) || reportNoEndingLinebreak(node, closeBracket));
			}
			return {
				ArrayPattern: check,
				ArrayExpression: check
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/array-bracket-newline.cjs
module.exports = require_array_bracket_newline().create;
//#endregion
