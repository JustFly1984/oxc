//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/newline-before-return.js
/**
* @fileoverview Rule to require newlines before `return` statement
* @author Kai Cataldo
* @deprecated in ESLint v4.0.0
*/
var require_newline_before_return = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "layout",
			docs: {
				description: "Require an empty line before `return` statements",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/newline-before-return"
			},
			fixable: "whitespace",
			schema: [],
			messages: { expected: "Expected newline before return statement." },
			deprecated: {
				message: "The rule was replaced with a more general rule.",
				url: "https://eslint.org/blog/2017/06/eslint-v4.0.0-released/",
				deprecatedSince: "4.0.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "The new rule moved to a plugin.",
					url: "https://eslint.org/docs/latest/rules/padding-line-between-statements#examples",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "padding-line-between-statements",
						url: "https://eslint.style/rules/padding-line-between-statements"
					}
				}]
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Tests whether node is preceded by supplied tokens
			* @param {ASTNode} node node to check
			* @param {Array} testTokens array of tokens to test against
			* @returns {boolean} Whether or not the node is preceded by one of the supplied tokens
			* @private
			*/
			function isPrecededByTokens(node, testTokens) {
				let tokenBefore = sourceCode.getTokenBefore(node);
				return testTokens.includes(tokenBefore.value);
			}
			/**
			* Checks whether node is the first node after statement or in block
			* @param {ASTNode} node node to check
			* @returns {boolean} Whether or not the node is the first node after statement or in block
			* @private
			*/
			function isFirstNode(node) {
				let parentType = node.parent.type;
				return node.parent.body ? Array.isArray(node.parent.body) ? node.parent.body[0] === node : node.parent.body === node : parentType === "IfStatement" ? isPrecededByTokens(node, ["else", ")"]) : parentType === "DoWhileStatement" ? isPrecededByTokens(node, ["do"]) : parentType === "SwitchCase" ? isPrecededByTokens(node, [":"]) : isPrecededByTokens(node, [")"]);
			}
			/**
			* Returns the number of lines of comments that precede the node
			* @param {ASTNode} node node to check for overlapping comments
			* @param {number} lineNumTokenBefore line number of previous token, to check for overlapping comments
			* @returns {number} Number of lines of comments that precede the node
			* @private
			*/
			function calcCommentLines(node, lineNumTokenBefore) {
				let comments = sourceCode.getCommentsBefore(node), numLinesComments = 0;
				return comments.length && comments.forEach((comment) => {
					numLinesComments++, comment.type === "Block" && (numLinesComments += comment.loc.end.line - comment.loc.start.line), comment.loc.start.line === lineNumTokenBefore && numLinesComments--, comment.loc.end.line === node.loc.start.line && numLinesComments--;
				}), numLinesComments;
			}
			/**
			* Returns the line number of the token before the node that is passed in as an argument
			* @param {ASTNode} node The node to use as the start of the calculation
			* @returns {number} Line number of the token before `node`
			* @private
			*/
			function getLineNumberOfTokenBefore(node) {
				let tokenBefore = sourceCode.getTokenBefore(node), lineNumTokenBefore;
				return lineNumTokenBefore = tokenBefore ? tokenBefore.loc.end.line : 0, lineNumTokenBefore;
			}
			/**
			* Checks whether node is preceded by a newline
			* @param {ASTNode} node node to check
			* @returns {boolean} Whether or not the node is preceded by a newline
			* @private
			*/
			function hasNewlineBefore(node) {
				let lineNumNode = node.loc.start.line, lineNumTokenBefore = getLineNumberOfTokenBefore(node), commentLines = calcCommentLines(node, lineNumTokenBefore);
				return lineNumNode - lineNumTokenBefore - commentLines > 1;
			}
			/**
			* Checks whether it is safe to apply a fix to a given return statement.
			*
			* The fix is not considered safe if the given return statement has leading comments,
			* as we cannot safely determine if the newline should be added before or after the comments.
			* For more information, see: https://github.com/eslint/eslint/issues/5958#issuecomment-222767211
			* @param {ASTNode} node The return statement node to check.
			* @returns {boolean} `true` if it can fix the node.
			* @private
			*/
			function canFix(node) {
				let leadingComments = sourceCode.getCommentsBefore(node), lastLeadingComment = leadingComments.at(-1), tokenBefore = sourceCode.getTokenBefore(node);
				return leadingComments.length === 0 || lastLeadingComment.loc.end.line === tokenBefore.loc.end.line && lastLeadingComment.loc.end.line !== node.loc.start.line;
			}
			return { ReturnStatement(node) {
				!isFirstNode(node) && !hasNewlineBefore(node) && context.report({
					node,
					messageId: "expected",
					fix(fixer) {
						if (canFix(node)) {
							let tokenBefore = sourceCode.getTokenBefore(node), newlines = node.loc.start.line === tokenBefore.loc.end.line ? "\n\n" : "\n";
							return fixer.insertTextBefore(node, newlines);
						}
						return null;
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/newline-before-return.cjs
module.exports = require_newline_before_return().create;
//#endregion
