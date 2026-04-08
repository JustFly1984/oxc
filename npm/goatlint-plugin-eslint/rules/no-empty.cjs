const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-empty.js
/**
* @fileoverview Rule to flag use of an empty block statement
* @author Nicholas C. Zakas
*/
var require_no_empty = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			hasSuggestions: !0,
			type: "suggestion",
			defaultOptions: [{ allowEmptyCatch: !1 }],
			docs: {
				description: "Disallow empty block statements",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-empty"
			},
			schema: [{
				type: "object",
				properties: { allowEmptyCatch: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: {
				unexpected: "Empty {{type}} statement.",
				suggestComment: "Add comment inside empty {{type}} statement."
			}
		},
		create(context) {
			let [{ allowEmptyCatch }] = context.options, sourceCode = context.sourceCode;
			return {
				BlockStatement(node) {
					node.body.length === 0 && (astUtils.isFunction(node.parent) || allowEmptyCatch && node.parent.type === "CatchClause" || sourceCode.getCommentsInside(node).length > 0 || context.report({
						node,
						messageId: "unexpected",
						data: { type: "block" },
						suggest: [{
							messageId: "suggestComment",
							data: { type: "block" },
							fix(fixer) {
								let range = [node.range[0] + 1, node.range[1] - 1];
								return fixer.replaceTextRange(range, " /* empty */ ");
							}
						}]
					}));
				},
				SwitchStatement(node) {
					if (node.cases === void 0 || node.cases.length === 0) {
						let openingBrace = sourceCode.getTokenAfter(node.discriminant, astUtils.isOpeningBraceToken), closingBrace = sourceCode.getLastToken(node);
						if (sourceCode.commentsExistBetween(openingBrace, closingBrace)) return;
						context.report({
							node,
							loc: {
								start: openingBrace.loc.start,
								end: closingBrace.loc.end
							},
							messageId: "unexpected",
							data: { type: "switch" },
							suggest: [{
								messageId: "suggestComment",
								data: { type: "switch" },
								fix(fixer) {
									let range = [openingBrace.range[1], closingBrace.range[0]];
									return fixer.replaceTextRange(range, " /* empty */ ");
								}
							}]
						});
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-empty.cjs
module.exports = require_no_empty().create;
//#endregion
