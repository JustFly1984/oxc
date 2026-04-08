//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/template-tag-spacing.js
/**
* @fileoverview Rule to check spacing between template tags and their literals
* @author Jonathan Wilsson
* @deprecated in ESLint v8.53.0
*/
var require_template_tag_spacing = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
						name: "template-tag-spacing",
						url: "https://eslint.style/rules/template-tag-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require or disallow spacing between template tags and their literals",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/template-tag-spacing"
			},
			fixable: "whitespace",
			schema: [{ enum: ["always", "never"] }],
			messages: {
				unexpected: "Unexpected space between template tag and template literal.",
				missing: "Missing space between template tag and template literal."
			}
		},
		create(context) {
			let never = context.options[0] !== "always", sourceCode = context.sourceCode;
			/**
			* Check if a space is present between a template tag and its literal
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function checkSpacing(node) {
				let tagToken = sourceCode.getTokenBefore(node.quasi), literalToken = sourceCode.getFirstToken(node.quasi), hasWhitespace = sourceCode.isSpaceBetweenTokens(tagToken, literalToken);
				never && hasWhitespace ? context.report({
					node,
					loc: {
						start: tagToken.loc.end,
						end: literalToken.loc.start
					},
					messageId: "unexpected",
					fix(fixer) {
						let comments = sourceCode.getCommentsBefore(node.quasi);
						return comments.some((comment) => comment.type === "Line") ? null : fixer.replaceTextRange([tagToken.range[1], literalToken.range[0]], comments.reduce((text, comment) => text + sourceCode.getText(comment), ""));
					}
				}) : !never && !hasWhitespace && context.report({
					node,
					loc: {
						start: node.loc.start,
						end: literalToken.loc.start
					},
					messageId: "missing",
					fix(fixer) {
						return fixer.insertTextAfter(tagToken, " ");
					}
				});
			}
			return { TaggedTemplateExpression: checkSpacing };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/template-tag-spacing.cjs
module.exports = require_template_tag_spacing().create;
//#endregion
