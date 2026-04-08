const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-irregular-whitespace.js
/**
* @fileoverview Rule to disallow whitespace that is not a tab or space, whitespace inside strings and comments are allowed
* @author Jonathan Kingston
* @author Christophe Porteneuve
*/
var require_no_irregular_whitespace = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), ALL_IRREGULARS = /[\f\v\u0085\ufeff\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u202f\u205f\u3000\u2028\u2029]/u, IRREGULAR_WHITESPACE = /[\f\v\u0085\ufeff\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u202f\u205f\u3000]+/gu, IRREGULAR_LINE_TERMINATORS = /[\u2028\u2029]/gu, LINE_BREAK = astUtils.createGlobalLinebreakMatcher();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{
				skipComments: !1,
				skipJSXText: !1,
				skipRegExps: !1,
				skipStrings: !0,
				skipTemplates: !1
			}],
			docs: {
				description: "Disallow irregular whitespace",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-irregular-whitespace"
			},
			schema: [{
				type: "object",
				properties: {
					skipComments: { type: "boolean" },
					skipStrings: { type: "boolean" },
					skipTemplates: { type: "boolean" },
					skipRegExps: { type: "boolean" },
					skipJSXText: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: { noIrregularWhitespace: "Irregular whitespace not allowed." }
		},
		create(context) {
			let [{ skipComments, skipStrings, skipRegExps, skipTemplates, skipJSXText }] = context.options, sourceCode = context.sourceCode, commentNodes = sourceCode.getAllComments(), errors = [];
			/**
			* Removes errors that occur inside the given node
			* @param {ASTNode} node to check for matching errors.
			* @returns {void}
			* @private
			*/
			function removeWhitespaceError(node) {
				let locStart = node.loc.start, locEnd = node.loc.end;
				errors = errors.filter(({ loc: { start: errorLocStart } }) => errorLocStart.line < locStart.line || errorLocStart.line === locStart.line && errorLocStart.column < locStart.column || errorLocStart.line === locEnd.line && errorLocStart.column >= locEnd.column || errorLocStart.line > locEnd.line);
			}
			/**
			* Checks literal nodes for errors that we are choosing to ignore and calls the relevant methods to remove the errors
			* @param {ASTNode} node to check for matching errors.
			* @returns {void}
			* @private
			*/
			function removeInvalidNodeErrorsInLiteral(node) {
				let shouldCheckStrings = skipStrings && typeof node.value == "string", shouldCheckRegExps = skipRegExps && !!node.regex;
				(shouldCheckStrings || shouldCheckRegExps) && ALL_IRREGULARS.test(node.raw) && removeWhitespaceError(node);
			}
			/**
			* Checks template string literal nodes for errors that we are choosing to ignore and calls the relevant methods to remove the errors
			* @param {ASTNode} node to check for matching errors.
			* @returns {void}
			* @private
			*/
			function removeInvalidNodeErrorsInTemplateLiteral(node) {
				typeof node.value.raw == "string" && ALL_IRREGULARS.test(node.value.raw) && removeWhitespaceError(node);
			}
			/**
			* Checks comment nodes for errors that we are choosing to ignore and calls the relevant methods to remove the errors
			* @param {ASTNode} node to check for matching errors.
			* @returns {void}
			* @private
			*/
			function removeInvalidNodeErrorsInComment(node) {
				ALL_IRREGULARS.test(node.value) && removeWhitespaceError(node);
			}
			/**
			* Checks JSX nodes for errors that we are choosing to ignore and calls the relevant methods to remove the errors
			* @param {ASTNode} node to check for matching errors.
			* @returns {void}
			* @private
			*/
			function removeInvalidNodeErrorsInJSXText(node) {
				ALL_IRREGULARS.test(node.raw) && removeWhitespaceError(node);
			}
			/**
			* Checks the program source for irregular whitespace
			* @param {ASTNode} node The program node
			* @returns {void}
			* @private
			*/
			function checkForIrregularWhitespace(node) {
				sourceCode.lines.forEach((sourceLine, lineIndex) => {
					let lineNumber = lineIndex + 1, match;
					for (; (match = IRREGULAR_WHITESPACE.exec(sourceLine)) !== null;) errors.push({
						node,
						messageId: "noIrregularWhitespace",
						loc: {
							start: {
								line: lineNumber,
								column: match.index
							},
							end: {
								line: lineNumber,
								column: match.index + match[0].length
							}
						}
					});
				});
			}
			/**
			* Checks the program source for irregular line terminators
			* @param {ASTNode} node The program node
			* @returns {void}
			* @private
			*/
			function checkForIrregularLineTerminators(node) {
				let source = sourceCode.getText(), sourceLines = sourceCode.lines, linebreaks = source.match(LINE_BREAK), lastLineIndex = -1, match;
				for (; (match = IRREGULAR_LINE_TERMINATORS.exec(source)) !== null;) {
					let lineIndex = linebreaks.indexOf(match[0], lastLineIndex + 1) || 0;
					errors.push({
						node,
						messageId: "noIrregularWhitespace",
						loc: {
							start: {
								line: lineIndex + 1,
								column: sourceLines[lineIndex].length
							},
							end: {
								line: lineIndex + 2,
								column: 0
							}
						}
					}), lastLineIndex = lineIndex;
				}
			}
			/**
			* A no-op function to act as placeholder for comment accumulation when the `skipComments` option is `false`.
			* @returns {void}
			* @private
			*/
			function noop() {}
			let nodes = {};
			return ALL_IRREGULARS.test(sourceCode.getText()) ? (nodes.Program = function(node) {
				checkForIrregularWhitespace(node), checkForIrregularLineTerminators(node);
			}, nodes.Literal = removeInvalidNodeErrorsInLiteral, nodes.TemplateElement = skipTemplates ? removeInvalidNodeErrorsInTemplateLiteral : noop, nodes.JSXText = skipJSXText ? removeInvalidNodeErrorsInJSXText : noop, nodes["Program:exit"] = function() {
				skipComments && commentNodes.forEach(removeInvalidNodeErrorsInComment), errors.forEach((error) => context.report(error));
			}) : nodes.Program = noop, nodes;
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-irregular-whitespace.cjs
module.exports = require_no_irregular_whitespace().create;
//#endregion
