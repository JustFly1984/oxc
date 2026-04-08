const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/line-comment-position.js
/**
* @fileoverview Rule to enforce the position of line comments
* @author Alberto Rodríguez
* @deprecated in ESLint v9.3.0
*/
var require_line_comment_position = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Formatting rules are being moved out of ESLint core.",
				url: "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
				deprecatedSince: "9.3.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "ESLint Stylistic now maintains deprecated stylistic core rules.",
					url: "https://eslint.style/guide/migration",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "line-comment-position",
						url: "https://eslint.style/rules/line-comment-position"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce position of line comments",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/line-comment-position"
			},
			schema: [{ oneOf: [{ enum: ["above", "beside"] }, {
				type: "object",
				properties: {
					position: { enum: ["above", "beside"] },
					ignorePattern: { type: "string" },
					applyDefaultPatterns: { type: "boolean" },
					applyDefaultIgnorePatterns: { type: "boolean" }
				},
				additionalProperties: !1
			}] }],
			messages: {
				above: "Expected comment to be above code.",
				beside: "Expected comment to be beside code."
			}
		},
		create(context) {
			let options = context.options[0], above, ignorePattern, applyDefaultIgnorePatterns = !0;
			!options || typeof options == "string" ? above = !options || options === "above" : (above = !options.position || options.position === "above", ignorePattern = options.ignorePattern, applyDefaultIgnorePatterns = Object.hasOwn(options, "applyDefaultIgnorePatterns") ? options.applyDefaultIgnorePatterns : options.applyDefaultPatterns !== !1);
			let defaultIgnoreRegExp = astUtils.COMMENTS_IGNORE_PATTERN, fallThroughRegExp = /^\s*falls?\s?through/u, customIgnoreRegExp = new RegExp(ignorePattern, "u"), sourceCode = context.sourceCode;
			return { Program() {
				sourceCode.getAllComments().filter((token) => token.type === "Line").forEach((node) => {
					if (applyDefaultIgnorePatterns && (defaultIgnoreRegExp.test(node.value) || fallThroughRegExp.test(node.value)) || ignorePattern && customIgnoreRegExp.test(node.value)) return;
					let previous = sourceCode.getTokenBefore(node, { includeComments: !0 }), isOnSameLine = previous && previous.loc.end.line === node.loc.start.line;
					above ? isOnSameLine && context.report({
						node,
						messageId: "above"
					}) : isOnSameLine || context.report({
						node,
						messageId: "beside"
					});
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/line-comment-position.cjs
module.exports = require_line_comment_position().create;
//#endregion
