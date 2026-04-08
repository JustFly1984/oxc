const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/multiline-ternary.js
/**
* @fileoverview Enforce newlines between operands of ternary expressions
* @author Kai Cataldo
* @deprecated in ESLint v8.53.0
*/
var require_multiline_ternary = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "multiline-ternary",
						url: "https://eslint.style/rules/multiline-ternary"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce newlines between operands of ternary expressions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/multiline-ternary"
			},
			schema: [{ enum: [
				"always",
				"always-multiline",
				"never"
			] }],
			messages: {
				expectedTestCons: "Expected newline between test and consequent of ternary expression.",
				expectedConsAlt: "Expected newline between consequent and alternate of ternary expression.",
				unexpectedTestCons: "Unexpected newline between test and consequent of ternary expression.",
				unexpectedConsAlt: "Unexpected newline between consequent and alternate of ternary expression."
			},
			fixable: "whitespace"
		},
		create(context) {
			let sourceCode = context.sourceCode, option = context.options[0], multiline = option !== "never", allowSingleLine = option === "always-multiline";
			return { ConditionalExpression(node) {
				let questionToken = sourceCode.getTokenAfter(node.test, astUtils.isNotClosingParenToken), colonToken = sourceCode.getTokenAfter(node.consequent, astUtils.isNotClosingParenToken), firstTokenOfTest = sourceCode.getFirstToken(node), lastTokenOfTest = sourceCode.getTokenBefore(questionToken), firstTokenOfConsequent = sourceCode.getTokenAfter(questionToken), lastTokenOfConsequent = sourceCode.getTokenBefore(colonToken), firstTokenOfAlternate = sourceCode.getTokenAfter(colonToken), areTestAndConsequentOnSameLine = astUtils.isTokenOnSameLine(lastTokenOfTest, firstTokenOfConsequent), areConsequentAndAlternateOnSameLine = astUtils.isTokenOnSameLine(lastTokenOfConsequent, firstTokenOfAlternate), hasComments = !!sourceCode.getCommentsInside(node).length;
				if (!multiline) areTestAndConsequentOnSameLine || context.report({
					node: node.test,
					loc: {
						start: firstTokenOfTest.loc.start,
						end: lastTokenOfTest.loc.end
					},
					messageId: "unexpectedTestCons",
					fix(fixer) {
						if (hasComments) return null;
						let fixers = [], areTestAndQuestionOnSameLine = astUtils.isTokenOnSameLine(lastTokenOfTest, questionToken), areQuestionAndConsOnSameLine = astUtils.isTokenOnSameLine(questionToken, firstTokenOfConsequent);
						return areTestAndQuestionOnSameLine || fixers.push(fixer.removeRange([lastTokenOfTest.range[1], questionToken.range[0]])), areQuestionAndConsOnSameLine || fixers.push(fixer.removeRange([questionToken.range[1], firstTokenOfConsequent.range[0]])), fixers;
					}
				}), areConsequentAndAlternateOnSameLine || context.report({
					node: node.consequent,
					loc: {
						start: firstTokenOfConsequent.loc.start,
						end: lastTokenOfConsequent.loc.end
					},
					messageId: "unexpectedConsAlt",
					fix(fixer) {
						if (hasComments) return null;
						let fixers = [], areConsAndColonOnSameLine = astUtils.isTokenOnSameLine(lastTokenOfConsequent, colonToken), areColonAndAltOnSameLine = astUtils.isTokenOnSameLine(colonToken, firstTokenOfAlternate);
						return areConsAndColonOnSameLine || fixers.push(fixer.removeRange([lastTokenOfConsequent.range[1], colonToken.range[0]])), areColonAndAltOnSameLine || fixers.push(fixer.removeRange([colonToken.range[1], firstTokenOfAlternate.range[0]])), fixers;
					}
				});
				else {
					if (allowSingleLine && node.loc.start.line === node.loc.end.line) return;
					areTestAndConsequentOnSameLine && context.report({
						node: node.test,
						loc: {
							start: firstTokenOfTest.loc.start,
							end: lastTokenOfTest.loc.end
						},
						messageId: "expectedTestCons",
						fix: (fixer) => hasComments ? null : fixer.replaceTextRange([lastTokenOfTest.range[1], questionToken.range[0]], "\n")
					}), areConsequentAndAlternateOnSameLine && context.report({
						node: node.consequent,
						loc: {
							start: firstTokenOfConsequent.loc.start,
							end: lastTokenOfConsequent.loc.end
						},
						messageId: "expectedConsAlt",
						fix: (fixer) => hasComments ? null : fixer.replaceTextRange([lastTokenOfConsequent.range[1], colonToken.range[0]], "\n")
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/multiline-ternary.cjs
module.exports = require_multiline_ternary().create;
//#endregion
