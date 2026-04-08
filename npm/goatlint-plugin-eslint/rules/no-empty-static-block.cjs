//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-empty-static-block.js
/**
* @fileoverview Rule to disallow empty static blocks.
* @author Sosuke Suzuki
*/
var require_no_empty_static_block = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			hasSuggestions: !0,
			type: "suggestion",
			docs: {
				description: "Disallow empty static blocks",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-empty-static-block"
			},
			schema: [],
			messages: {
				unexpected: "Unexpected empty static block.",
				suggestComment: "Add comment inside empty static block."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { StaticBlock(node) {
				if (node.body.length === 0) {
					let openingBrace = sourceCode.getFirstToken(node, { skip: 1 }), closingBrace = sourceCode.getLastToken(node);
					sourceCode.getCommentsBefore(closingBrace).length === 0 && context.report({
						loc: {
							start: openingBrace.loc.start,
							end: closingBrace.loc.end
						},
						messageId: "unexpected",
						suggest: [{
							messageId: "suggestComment",
							fix(fixer) {
								let range = [openingBrace.range[1], closingBrace.range[0]];
								return fixer.replaceTextRange(range, " /* empty */ ");
							}
						}]
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-empty-static-block.cjs
module.exports = require_no_empty_static_block().create;
//#endregion
