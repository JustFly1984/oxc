const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-inline-comments.js
/**
* @fileoverview Enforces or disallows inline comments.
* @author Greg Cochard
*/
var require_no_inline_comments = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{}],
			docs: {
				description: "Disallow inline comments after code",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-inline-comments"
			},
			schema: [{
				type: "object",
				properties: { ignorePattern: { type: "string" } },
				additionalProperties: !1
			}],
			messages: { unexpectedInlineComment: "Unexpected comment inline with code." }
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ ignorePattern }] = context.options, customIgnoreRegExp = ignorePattern && new RegExp(ignorePattern, "u");
			/**
			* Will check that comments are not on lines starting with or ending with code
			* @param {ASTNode} node The comment node to check
			* @private
			* @returns {void}
			*/
			function testCodeAroundComment(node) {
				let startLine = String(sourceCode.lines[node.loc.start.line - 1]), endLine = String(sourceCode.lines[node.loc.end.line - 1]), preamble = startLine.slice(0, node.loc.start.column).trim(), postamble = endLine.slice(node.loc.end.column).trim(), isPreambleEmpty = !preamble, isPostambleEmpty = !postamble;
				if (!(isPreambleEmpty && isPostambleEmpty) && !(customIgnoreRegExp && customIgnoreRegExp.test(node.value))) {
					if ((isPreambleEmpty || preamble === "{") && (isPostambleEmpty || postamble === "}")) {
						let enclosingNode = sourceCode.getNodeByRangeIndex(node.range[0]);
						if (enclosingNode && enclosingNode.type === "JSXEmptyExpression") return;
					}
					astUtils.isDirectiveComment(node) || context.report({
						node,
						messageId: "unexpectedInlineComment"
					});
				}
			}
			return { Program() {
				sourceCode.getAllComments().filter((token) => token.type !== "Shebang").forEach(testCodeAroundComment);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-inline-comments.cjs
module.exports = require_no_inline_comments().create;
//#endregion
