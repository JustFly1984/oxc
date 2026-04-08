const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/block-spacing.js
/**
* @fileoverview A rule to disallow or enforce spaces inside of single line blocks.
* @author Toru Nagashima
* @deprecated in ESLint v8.53.0
*/
var require_block_spacing = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let util = require_ast_utils$1.t();
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
						name: "block-spacing",
						url: "https://eslint.style/rules/block-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Disallow or enforce spaces inside of blocks after opening block and before closing block",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/block-spacing"
			},
			fixable: "whitespace",
			schema: [{ enum: ["always", "never"] }],
			messages: {
				missing: "Requires a space {{location}} '{{token}}'.",
				extra: "Unexpected space(s) {{location}} '{{token}}'."
			}
		},
		create(context) {
			let always = context.options[0] !== "never", messageId = always ? "missing" : "extra", sourceCode = context.sourceCode;
			/**
			* Gets the open brace token from a given node.
			* @param {ASTNode} node A BlockStatement/StaticBlock/SwitchStatement node to get.
			* @returns {Token} The token of the open brace.
			*/
			function getOpenBrace(node) {
				return node.type === "SwitchStatement" ? node.cases.length > 0 ? sourceCode.getTokenBefore(node.cases[0]) : sourceCode.getLastToken(node, 1) : node.type === "StaticBlock" ? sourceCode.getFirstToken(node, { skip: 1 }) : sourceCode.getFirstToken(node);
			}
			/**
			* Checks whether or not:
			*   - given tokens are on same line.
			*   - there is/isn't a space between given tokens.
			* @param {Token} left A token to check.
			* @param {Token} right The token which is next to `left`.
			* @returns {boolean}
			*    When the option is `"always"`, `true` if there are one or more spaces between given tokens.
			*    When the option is `"never"`, `true` if there are not any spaces between given tokens.
			*    If given tokens are not on same line, it's always `true`.
			*/
			function isValid(left, right) {
				return !util.isTokenOnSameLine(left, right) || sourceCode.isSpaceBetweenTokens(left, right) === always;
			}
			/**
			* Checks and reports invalid spacing style inside braces.
			* @param {ASTNode} node A BlockStatement/StaticBlock/SwitchStatement node to check.
			* @returns {void}
			*/
			function checkSpacingInsideBraces(node) {
				let openBrace = getOpenBrace(node), closeBrace = sourceCode.getLastToken(node), firstToken = sourceCode.getTokenAfter(openBrace, { includeComments: !0 }), lastToken = sourceCode.getTokenBefore(closeBrace, { includeComments: !0 });
				if (!(openBrace.type !== "Punctuator" || openBrace.value !== "{" || closeBrace.type !== "Punctuator" || closeBrace.value !== "}" || firstToken === closeBrace) && !(!always && firstToken.type === "Line")) {
					if (!isValid(openBrace, firstToken)) {
						let loc = openBrace.loc;
						messageId === "extra" && (loc = {
							start: openBrace.loc.end,
							end: firstToken.loc.start
						}), context.report({
							node,
							loc,
							messageId,
							data: {
								location: "after",
								token: openBrace.value
							},
							fix(fixer) {
								return always ? fixer.insertTextBefore(firstToken, " ") : fixer.removeRange([openBrace.range[1], firstToken.range[0]]);
							}
						});
					}
					if (!isValid(lastToken, closeBrace)) {
						let loc = closeBrace.loc;
						messageId === "extra" && (loc = {
							start: lastToken.loc.end,
							end: closeBrace.loc.start
						}), context.report({
							node,
							loc,
							messageId,
							data: {
								location: "before",
								token: closeBrace.value
							},
							fix(fixer) {
								return always ? fixer.insertTextAfter(lastToken, " ") : fixer.removeRange([lastToken.range[1], closeBrace.range[0]]);
							}
						});
					}
				}
			}
			return {
				BlockStatement: checkSpacingInsideBraces,
				StaticBlock: checkSpacingInsideBraces,
				SwitchStatement: checkSpacingInsideBraces
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/block-spacing.cjs
module.exports = require_block_spacing().create;
//#endregion
