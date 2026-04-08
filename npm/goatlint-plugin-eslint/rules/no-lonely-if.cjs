const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-lonely-if.js
/**
* @fileoverview Rule to disallow if as the only statement in an else block
* @author Brandon Mills
*/
var require_no_lonely_if = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `if` statements as the only statement in `else` blocks",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-lonely-if"
			},
			schema: [],
			fixable: "code",
			messages: { unexpectedLonelyIf: "Unexpected if as the only statement in an else block." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { IfStatement(node) {
				let parent = node.parent, grandparent = parent.parent;
				parent && parent.type === "BlockStatement" && parent.body.length === 1 && !astUtils.areBracesNecessary(parent, sourceCode) && grandparent && grandparent.type === "IfStatement" && parent === grandparent.alternate && context.report({
					node,
					messageId: "unexpectedLonelyIf",
					fix(fixer) {
						let openingElseCurly = sourceCode.getFirstToken(parent), closingElseCurly = sourceCode.getLastToken(parent), elseKeyword = sourceCode.getTokenBefore(openingElseCurly), tokenAfterElseBlock = sourceCode.getTokenAfter(closingElseCurly), lastIfToken = sourceCode.getLastToken(node.consequent), sourceText = sourceCode.getText();
						return sourceText.slice(openingElseCurly.range[1], node.range[0]).trim() || sourceText.slice(node.range[1], closingElseCurly.range[0]).trim() || node.consequent.type !== "BlockStatement" && lastIfToken.value !== ";" && tokenAfterElseBlock && (node.consequent.loc.end.line === tokenAfterElseBlock.loc.start.line || /^[([/+`-]/u.test(tokenAfterElseBlock.value) || lastIfToken.value === "++" || lastIfToken.value === "--") ? null : fixer.replaceTextRange([openingElseCurly.range[0], closingElseCurly.range[1]], (elseKeyword.range[1] === openingElseCurly.range[0] ? " " : "") + sourceCode.getText(node));
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-lonely-if.cjs
module.exports = require_no_lonely_if().create;
//#endregion
