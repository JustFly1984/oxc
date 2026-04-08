const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/newline-after-var.js
/**
* @fileoverview Rule to check empty newline after "var" statement
* @author Gopal Venkatesan
* @deprecated in ESLint v4.0.0
*/
var require_newline_after_var = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "layout",
			docs: {
				description: "Require or disallow an empty line after variable declarations",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/newline-after-var"
			},
			schema: [{ enum: ["never", "always"] }],
			fixable: "whitespace",
			messages: {
				expected: "Expected blank line after variable declarations.",
				unexpected: "Unexpected blank line after variable declarations."
			},
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
			let sourceCode = context.sourceCode, mode = context.options[0] === "never" ? "never" : "always", commentEndLine = sourceCode.getAllComments().reduce((result, token) => (result[token.loc.start.line] = token.loc.end.line, result), {});
			/**
			* Gets a token from the given node to compare line to the next statement.
			*
			* In general, the token is the last token of the node. However, the token is the second last token if the following conditions satisfy.
			*
			* - The last token is semicolon.
			* - The semicolon is on a different line from the previous token of the semicolon.
			*
			* This behavior would address semicolon-less style code. e.g.:
			*
			*     var foo = 1
			*
			*     ;(a || b).doSomething()
			* @param {ASTNode} node The node to get.
			* @returns {Token} The token to compare line to the next statement.
			*/
			function getLastToken(node) {
				let lastToken = sourceCode.getLastToken(node);
				if (lastToken.type === "Punctuator" && lastToken.value === ";") {
					let prevToken = sourceCode.getTokenBefore(lastToken);
					if (prevToken.loc.end.line !== lastToken.loc.start.line) return prevToken;
				}
				return lastToken;
			}
			/**
			* Determine if provided keyword is a variable declaration
			* @private
			* @param {string} keyword keyword to test
			* @returns {boolean} True if `keyword` is a type of var
			*/
			function isVar(keyword) {
				return keyword === "var" || keyword === "let" || keyword === "const";
			}
			/**
			* Determine if provided keyword is a variant of for specifiers
			* @private
			* @param {string} keyword keyword to test
			* @returns {boolean} True if `keyword` is a variant of for specifier
			*/
			function isForTypeSpecifier(keyword) {
				return keyword === "ForStatement" || keyword === "ForInStatement" || keyword === "ForOfStatement";
			}
			/**
			* Determine if provided keyword is an export specifiers
			* @private
			* @param {string} nodeType nodeType to test
			* @returns {boolean} True if `nodeType` is an export specifier
			*/
			function isExportSpecifier(nodeType) {
				return nodeType === "ExportNamedDeclaration" || nodeType === "ExportSpecifier" || nodeType === "ExportDefaultDeclaration" || nodeType === "ExportAllDeclaration";
			}
			/**
			* Determine if provided node is the last of their parent block.
			* @private
			* @param {ASTNode} node node to test
			* @returns {boolean} True if `node` is last of their parent block.
			*/
			function isLastNode(node) {
				let token = sourceCode.getTokenAfter(node);
				return !token || token.type === "Punctuator" && token.value === "}";
			}
			/**
			* Gets the last line of a group of consecutive comments
			* @param {number} commentStartLine The starting line of the group
			* @returns {number} The number of the last comment line of the group
			*/
			function getLastCommentLineOfBlock(commentStartLine) {
				let currentCommentEnd = commentEndLine[commentStartLine];
				return commentEndLine[currentCommentEnd + 1] ? getLastCommentLineOfBlock(currentCommentEnd + 1) : currentCommentEnd;
			}
			/**
			* Determine if a token starts more than one line after a comment ends
			* @param {token} token The token being checked
			* @param {integer} commentStartLine The line number on which the comment starts
			* @returns {boolean} True if `token` does not start immediately after a comment
			*/
			function hasBlankLineAfterComment(token, commentStartLine) {
				return token.loc.start.line > getLastCommentLineOfBlock(commentStartLine) + 1;
			}
			/**
			* Checks that a blank line exists after a variable declaration when mode is
			* set to "always", or checks that there is no blank line when mode is set
			* to "never"
			* @private
			* @param {ASTNode} node `VariableDeclaration` node to test
			* @returns {void}
			*/
			function checkForBlankLine(node) {
				let lastToken = getLastToken(node), nextToken = lastToken === sourceCode.getLastToken(node) ? sourceCode.getTokenAfter(node) : sourceCode.getLastToken(node), nextLineNum = lastToken.loc.end.line + 1;
				if (!nextToken || isForTypeSpecifier(node.parent.type) || isExportSpecifier(node.parent.type) || nextToken.type === "Keyword" && isVar(nextToken.value) || isLastNode(node)) return;
				let noNextLineToken = nextToken.loc.start.line > nextLineNum, hasNextLineComment = commentEndLine[nextLineNum] !== void 0;
				mode === "never" && noNextLineToken && !hasNextLineComment && context.report({
					node,
					messageId: "unexpected",
					fix(fixer) {
						let linesBetween = sourceCode.getText().slice(lastToken.range[1], nextToken.range[0]).split(astUtils.LINEBREAK_MATCHER);
						return fixer.replaceTextRange([lastToken.range[1], nextToken.range[0]], `${linesBetween.slice(0, -1).join("")}\n${linesBetween.at(-1)}`);
					}
				}), mode === "always" && (!noNextLineToken || hasNextLineComment && !hasBlankLineAfterComment(nextToken, nextLineNum)) && context.report({
					node,
					messageId: "expected",
					fix(fixer) {
						return (noNextLineToken ? getLastCommentLineOfBlock(nextLineNum) : lastToken.loc.end.line) === nextToken.loc.start.line ? fixer.insertTextBefore(nextToken, "\n\n") : fixer.insertTextBeforeRange([nextToken.range[0] - nextToken.loc.start.column, nextToken.range[1]], "\n");
					}
				});
			}
			return { VariableDeclaration: checkForBlankLine };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/newline-after-var.cjs
module.exports = require_newline_after_var().create;
//#endregion
