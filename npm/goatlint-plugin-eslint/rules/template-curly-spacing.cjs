const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/template-curly-spacing.js
/**
* @fileoverview Rule to enforce spacing around embedded expressions of template strings
* @author Toru Nagashima
* @deprecated in ESLint v8.53.0
*/
var require_template_curly_spacing = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "template-curly-spacing",
						url: "https://eslint.style/rules/template-curly-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require or disallow spacing around embedded expressions of template strings",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/template-curly-spacing"
			},
			fixable: "whitespace",
			schema: [{ enum: ["always", "never"] }],
			messages: {
				expectedBefore: "Expected space(s) before '}'.",
				expectedAfter: "Expected space(s) after '${'.",
				unexpectedBefore: "Unexpected space(s) before '}'.",
				unexpectedAfter: "Unexpected space(s) after '${'."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, always = context.options[0] === "always";
			/**
			* Checks spacing before `}` of a given token.
			* @param {Token} token A token to check. This is a Template token.
			* @returns {void}
			*/
			function checkSpacingBefore(token) {
				if (!token.value.startsWith("}")) return;
				let prevToken = sourceCode.getTokenBefore(token, { includeComments: !0 }), hasSpace = sourceCode.isSpaceBetween(prevToken, token);
				astUtils.isTokenOnSameLine(prevToken, token) && (always && !hasSpace && context.report({
					loc: {
						start: token.loc.start,
						end: {
							line: token.loc.start.line,
							column: token.loc.start.column + 1
						}
					},
					messageId: "expectedBefore",
					fix: (fixer) => fixer.insertTextBefore(token, " ")
				}), !always && hasSpace && context.report({
					loc: {
						start: prevToken.loc.end,
						end: token.loc.start
					},
					messageId: "unexpectedBefore",
					fix: (fixer) => fixer.removeRange([prevToken.range[1], token.range[0]])
				}));
			}
			/**
			* Checks spacing after `${` of a given token.
			* @param {Token} token A token to check. This is a Template token.
			* @returns {void}
			*/
			function checkSpacingAfter(token) {
				if (!token.value.endsWith("${")) return;
				let nextToken = sourceCode.getTokenAfter(token, { includeComments: !0 }), hasSpace = sourceCode.isSpaceBetween(token, nextToken);
				astUtils.isTokenOnSameLine(token, nextToken) && (always && !hasSpace && context.report({
					loc: {
						start: {
							line: token.loc.end.line,
							column: token.loc.end.column - 2
						},
						end: token.loc.end
					},
					messageId: "expectedAfter",
					fix: (fixer) => fixer.insertTextAfter(token, " ")
				}), !always && hasSpace && context.report({
					loc: {
						start: token.loc.end,
						end: nextToken.loc.start
					},
					messageId: "unexpectedAfter",
					fix: (fixer) => fixer.removeRange([token.range[1], nextToken.range[0]])
				}));
			}
			return { TemplateElement(node) {
				let token = sourceCode.getFirstToken(node);
				checkSpacingBefore(token), checkSpacingAfter(token);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/template-curly-spacing.cjs
module.exports = require_template_curly_spacing().create;
//#endregion
