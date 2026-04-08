const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/lines-around-directive.js
/**
* @fileoverview Require or disallow newlines around directives.
* @author Kai Cataldo
* @deprecated in ESLint v4.0.0
*/
var require_lines_around_directive = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "layout",
			docs: {
				description: "Require or disallow newlines around directives",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/lines-around-directive"
			},
			schema: [{ oneOf: [{ enum: ["always", "never"] }, {
				type: "object",
				properties: {
					before: { enum: ["always", "never"] },
					after: { enum: ["always", "never"] }
				},
				additionalProperties: !1,
				minProperties: 2
			}] }],
			fixable: "whitespace",
			messages: {
				expected: "Expected newline {{location}} \"{{value}}\" directive.",
				unexpected: "Unexpected newline {{location}} \"{{value}}\" directive."
			},
			deprecated: {
				message: "The rule was replaced with a more general rule.",
				url: "https://eslint.org/blog/2017/06/eslint-v4.0.0-released/",
				deprecatedSince: "4.0.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "The new rule moved to a plugin.",
					url: "https://eslint.org/docs/latest/rules/padding-line-between-statements#examples",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "padding-line-between-statements",
						url: "https://eslint.style/rules/padding-line-between-statements"
					}
				}]
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, config = context.options[0] || "always", expectLineBefore = typeof config == "string" ? config : config.before, expectLineAfter = typeof config == "string" ? config : config.after;
			/**
			* Check if node is preceded by a blank newline.
			* @param {ASTNode} node Node to check.
			* @returns {boolean} Whether or not the passed in node is preceded by a blank newline.
			*/
			function hasNewlineBefore(node) {
				let tokenBefore = sourceCode.getTokenBefore(node, { includeComments: !0 }), tokenLineBefore = tokenBefore ? tokenBefore.loc.end.line : 0;
				return node.loc.start.line - tokenLineBefore >= 2;
			}
			/**
			* Gets the last token of a node that is on the same line as the rest of the node.
			* This will usually be the last token of the node, but it will be the second-to-last token if the node has a trailing
			* semicolon on a different line.
			* @param {ASTNode} node A directive node
			* @returns {Token} The last token of the node on the line
			*/
			function getLastTokenOnLine(node) {
				let lastToken = sourceCode.getLastToken(node), secondToLastToken = sourceCode.getTokenBefore(lastToken);
				return astUtils.isSemicolonToken(lastToken) && lastToken.loc.start.line > secondToLastToken.loc.end.line ? secondToLastToken : lastToken;
			}
			/**
			* Check if node is followed by a blank newline.
			* @param {ASTNode} node Node to check.
			* @returns {boolean} Whether or not the passed in node is followed by a blank newline.
			*/
			function hasNewlineAfter(node) {
				let lastToken = getLastTokenOnLine(node);
				return sourceCode.getTokenAfter(lastToken, { includeComments: !0 }).loc.start.line - lastToken.loc.end.line >= 2;
			}
			/**
			* Report errors for newlines around directives.
			* @param {ASTNode} node Node to check.
			* @param {string} location Whether the error was found before or after the directive.
			* @param {boolean} expected Whether or not a newline was expected or unexpected.
			* @returns {void}
			*/
			function reportError(node, location, expected) {
				context.report({
					node,
					messageId: expected ? "expected" : "unexpected",
					data: {
						value: node.expression.value,
						location
					},
					fix(fixer) {
						let lastToken = getLastTokenOnLine(node);
						return expected ? location === "before" ? fixer.insertTextBefore(node, "\n") : fixer.insertTextAfter(lastToken, "\n") : fixer.removeRange(location === "before" ? [node.range[0] - 1, node.range[0]] : [lastToken.range[1], lastToken.range[1] + 1]);
					}
				});
			}
			/**
			* Check lines around directives in node
			* @param {ASTNode} node node to check
			* @returns {void}
			*/
			function checkDirectives(node) {
				let directives = astUtils.getDirectivePrologue(node);
				if (!directives.length) return;
				let firstDirective = directives[0], leadingComments = sourceCode.getCommentsBefore(firstDirective);
				leadingComments.length ? (expectLineBefore === "always" && !hasNewlineBefore(firstDirective) && reportError(firstDirective, "before", !0), expectLineBefore === "never" && hasNewlineBefore(firstDirective) && reportError(firstDirective, "before", !1)) : node.type === "Program" && expectLineBefore === "never" && !leadingComments.length && hasNewlineBefore(firstDirective) && reportError(firstDirective, "before", !1);
				let lastDirective = directives.at(-1);
				lastDirective === (node.type === "Program" ? node.body : node.body.body).at(-1) && !lastDirective.trailingComments || (expectLineAfter === "always" && !hasNewlineAfter(lastDirective) && reportError(lastDirective, "after", !0), expectLineAfter === "never" && hasNewlineAfter(lastDirective) && reportError(lastDirective, "after", !1));
			}
			return {
				Program: checkDirectives,
				FunctionDeclaration: checkDirectives,
				FunctionExpression: checkDirectives,
				ArrowFunctionExpression: checkDirectives
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/lines-around-directive.cjs
module.exports = require_lines_around_directive().create;
//#endregion
