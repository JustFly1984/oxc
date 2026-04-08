const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/implicit-arrow-linebreak.js
/**
* @fileoverview enforce the location of arrow function bodies
* @author Sharmila Jesupaul
* @deprecated in ESLint v8.53.0
*/
var require_implicit_arrow_linebreak = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { isCommentToken, isNotOpeningParenToken } = require_ast_utils$1.t();
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
						name: "implicit-arrow-linebreak",
						url: "https://eslint.style/rules/implicit-arrow-linebreak"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce the location of arrow function bodies",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/implicit-arrow-linebreak"
			},
			fixable: "whitespace",
			schema: [{ enum: ["beside", "below"] }],
			messages: {
				expected: "Expected a linebreak before this expression.",
				unexpected: "Expected no linebreak before this expression."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, option = context.options[0] || "beside";
			/**
			* Validates the location of an arrow function body
			* @param {ASTNode} node The arrow function body
			* @returns {void}
			*/
			function validateExpression(node) {
				if (node.body.type === "BlockStatement") return;
				let arrowToken = sourceCode.getTokenBefore(node.body, isNotOpeningParenToken), firstTokenOfBody = sourceCode.getTokenAfter(arrowToken);
				arrowToken.loc.end.line === firstTokenOfBody.loc.start.line && option === "below" ? context.report({
					node: firstTokenOfBody,
					messageId: "expected",
					fix: (fixer) => fixer.insertTextBefore(firstTokenOfBody, "\n")
				}) : arrowToken.loc.end.line !== firstTokenOfBody.loc.start.line && option === "beside" && context.report({
					node: firstTokenOfBody,
					messageId: "unexpected",
					fix(fixer) {
						return sourceCode.getFirstTokenBetween(arrowToken, firstTokenOfBody, {
							includeComments: !0,
							filter: isCommentToken
						}) ? null : fixer.replaceTextRange([arrowToken.range[1], firstTokenOfBody.range[0]], " ");
					}
				});
			}
			return { ArrowFunctionExpression: (node) => validateExpression(node) };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/implicit-arrow-linebreak.cjs
module.exports = require_implicit_arrow_linebreak().create;
//#endregion
