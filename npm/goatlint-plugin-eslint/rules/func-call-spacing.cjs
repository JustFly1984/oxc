const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/func-call-spacing.js
/**
* @fileoverview Rule to control spacing within function calls
* @author Matt DuVall <http://www.mattduvall.com>
* @deprecated in ESLint v8.53.0
*/
var require_func_call_spacing = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "function-call-spacing",
						url: "https://eslint.style/rules/function-call-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require or disallow spacing between function identifiers and their invocations",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/func-call-spacing"
			},
			fixable: "whitespace",
			schema: { anyOf: [{
				type: "array",
				items: [{ enum: ["never"] }],
				minItems: 0,
				maxItems: 1
			}, {
				type: "array",
				items: [{ enum: ["always"] }, {
					type: "object",
					properties: { allowNewlines: { type: "boolean" } },
					additionalProperties: !1
				}],
				minItems: 0,
				maxItems: 2
			}] },
			messages: {
				unexpectedWhitespace: "Unexpected whitespace between function name and paren.",
				unexpectedNewline: "Unexpected newline between function name and paren.",
				missing: "Missing space between function name and paren."
			}
		},
		create(context) {
			let never = context.options[0] !== "always", allowNewlines = !never && context.options[1] && context.options[1].allowNewlines, sourceCode = context.sourceCode, text = sourceCode.getText();
			/**
			* Check if open space is present in a function name
			* @param {ASTNode} node node to evaluate
			* @param {Token} leftToken The last token of the callee. This may be the closing parenthesis that encloses the callee.
			* @param {Token} rightToken The first token of the arguments. this is the opening parenthesis that encloses the arguments.
			* @returns {void}
			* @private
			*/
			function checkSpacing(node, leftToken, rightToken) {
				let textBetweenTokens = text.slice(leftToken.range[1], rightToken.range[0]).replace(/\/\*.*?\*\//gu, ""), hasWhitespace = /\s/u.test(textBetweenTokens), hasNewline = hasWhitespace && astUtils.LINEBREAK_MATCHER.test(textBetweenTokens);
				never && hasWhitespace ? context.report({
					node,
					loc: {
						start: leftToken.loc.end,
						end: {
							line: rightToken.loc.start.line,
							column: rightToken.loc.start.column - 1
						}
					},
					messageId: "unexpectedWhitespace",
					fix(fixer) {
						return sourceCode.commentsExistBetween(leftToken, rightToken) ? null : node.optional ? fixer.replaceTextRange([leftToken.range[1], rightToken.range[0]], "?.") : hasNewline ? null : fixer.removeRange([leftToken.range[1], rightToken.range[0]]);
					}
				}) : !never && !hasWhitespace ? context.report({
					node,
					loc: {
						start: {
							line: leftToken.loc.end.line,
							column: leftToken.loc.end.column - 1
						},
						end: rightToken.loc.start
					},
					messageId: "missing",
					fix(fixer) {
						return node.optional ? null : fixer.insertTextBefore(rightToken, " ");
					}
				}) : !never && !allowNewlines && hasNewline && context.report({
					node,
					loc: {
						start: leftToken.loc.end,
						end: rightToken.loc.start
					},
					messageId: "unexpectedNewline",
					fix(fixer) {
						if (!node.optional || sourceCode.commentsExistBetween(leftToken, rightToken)) return null;
						let range = [leftToken.range[1], rightToken.range[0]], qdToken = sourceCode.getTokenAfter(leftToken);
						return qdToken.range[0] === leftToken.range[1] ? fixer.replaceTextRange(range, "?. ") : qdToken.range[1] === rightToken.range[0] ? fixer.replaceTextRange(range, " ?.") : fixer.replaceTextRange(range, " ?. ");
					}
				});
			}
			return {
				"CallExpression, NewExpression"(node) {
					let lastToken = sourceCode.getLastToken(node), lastCalleeToken = sourceCode.getLastToken(node.callee), parenToken = sourceCode.getFirstTokenBetween(lastCalleeToken, lastToken, astUtils.isOpeningParenToken), prevToken = parenToken && sourceCode.getTokenBefore(parenToken, astUtils.isNotQuestionDotToken);
					parenToken && parenToken.range[1] < node.range[1] && checkSpacing(node, prevToken, parenToken);
				},
				ImportExpression(node) {
					let leftToken = sourceCode.getFirstToken(node);
					checkSpacing(node, leftToken, sourceCode.getTokenAfter(leftToken));
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/func-call-spacing.cjs
module.exports = require_func_call_spacing().create;
//#endregion
