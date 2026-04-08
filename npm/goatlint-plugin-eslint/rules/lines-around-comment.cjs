const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/lines-around-comment.js
/**
* @fileoverview Enforces empty lines around comments.
* @author Jamund Ferguson
* @deprecated in ESLint v8.53.0
*/
var require_lines_around_comment = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Return an array with any line numbers that are empty.
	* @param {Array} lines An array of each line of the file.
	* @returns {Array} An array of line numbers.
	*/
	function getEmptyLineNums(lines) {
		return lines.map((line, i) => ({
			code: line.trim(),
			num: i + 1
		})).filter((line) => !line.code).map((line) => line.num);
	}
	/**
	* Return an array with any line numbers that contain comments.
	* @param {Array} comments An array of comment tokens.
	* @returns {Array} An array of line numbers.
	*/
	function getCommentLineNums(comments) {
		let lines = [];
		return comments.forEach((token) => {
			let start = token.loc.start.line, end = token.loc.end.line;
			lines.push(start, end);
		}), lines;
	}
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
						name: "lines-around-comment",
						url: "https://eslint.style/rules/lines-around-comment"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require empty lines around comments",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/lines-around-comment"
			},
			fixable: "whitespace",
			schema: [{
				type: "object",
				properties: {
					beforeBlockComment: {
						type: "boolean",
						default: !0
					},
					afterBlockComment: {
						type: "boolean",
						default: !1
					},
					beforeLineComment: {
						type: "boolean",
						default: !1
					},
					afterLineComment: {
						type: "boolean",
						default: !1
					},
					allowBlockStart: {
						type: "boolean",
						default: !1
					},
					allowBlockEnd: {
						type: "boolean",
						default: !1
					},
					allowClassStart: { type: "boolean" },
					allowClassEnd: { type: "boolean" },
					allowObjectStart: { type: "boolean" },
					allowObjectEnd: { type: "boolean" },
					allowArrayStart: { type: "boolean" },
					allowArrayEnd: { type: "boolean" },
					ignorePattern: { type: "string" },
					applyDefaultIgnorePatterns: { type: "boolean" },
					afterHashbangComment: {
						type: "boolean",
						default: !1
					}
				},
				additionalProperties: !1
			}],
			messages: {
				after: "Expected line after comment.",
				before: "Expected line before comment."
			}
		},
		create(context) {
			let options = Object.assign({}, context.options[0]), ignorePattern = options.ignorePattern, defaultIgnoreRegExp = astUtils.COMMENTS_IGNORE_PATTERN, customIgnoreRegExp = new RegExp(ignorePattern, "u"), applyDefaultIgnorePatterns = options.applyDefaultIgnorePatterns !== !1;
			options.beforeBlockComment = options.beforeBlockComment === void 0 ? !0 : options.beforeBlockComment;
			let sourceCode = context.sourceCode, lines = sourceCode.lines, numLines = lines.length + 1, comments = sourceCode.getAllComments(), commentLines = getCommentLineNums(comments), emptyLines = getEmptyLineNums(lines), commentAndEmptyLines = new Set(commentLines.concat(emptyLines));
			/**
			* Returns whether or not comments are on lines starting with or ending with code
			* @param {token} token The comment token to check.
			* @returns {boolean} True if the comment is not alone.
			*/
			function codeAroundComment(token) {
				let currentToken = token;
				do
					currentToken = sourceCode.getTokenBefore(currentToken, { includeComments: !0 });
				while (currentToken && astUtils.isCommentToken(currentToken));
				if (currentToken && astUtils.isTokenOnSameLine(currentToken, token)) return !0;
				currentToken = token;
				do
					currentToken = sourceCode.getTokenAfter(currentToken, { includeComments: !0 });
				while (currentToken && astUtils.isCommentToken(currentToken));
				return !!(currentToken && astUtils.isTokenOnSameLine(token, currentToken));
			}
			/**
			* Returns whether or not comments are inside a node type or not.
			* @param {ASTNode} parent The Comment parent node.
			* @param {string} nodeType The parent type to check against.
			* @returns {boolean} True if the comment is inside nodeType.
			*/
			function isParentNodeType(parent, nodeType) {
				return parent.type === nodeType || parent.body && parent.body.type === nodeType || parent.consequent && parent.consequent.type === nodeType;
			}
			/**
			* Returns the parent node that contains the given token.
			* @param {token} token The token to check.
			* @returns {ASTNode|null} The parent node that contains the given token.
			*/
			function getParentNodeOfToken(token) {
				let node = sourceCode.getNodeByRangeIndex(token.range[0]);
				if (node && node.type === "StaticBlock") {
					let openingBrace = sourceCode.getFirstToken(node, { skip: 1 });
					return token.range[0] >= openingBrace.range[0] ? node : null;
				}
				return node;
			}
			/**
			* Returns whether or not comments are at the parent start or not.
			* @param {token} token The Comment token.
			* @param {string} nodeType The parent type to check against.
			* @returns {boolean} True if the comment is at parent start.
			*/
			function isCommentAtParentStart(token, nodeType) {
				let parent = getParentNodeOfToken(token);
				if (parent && isParentNodeType(parent, nodeType)) {
					let parentStartNodeOrToken = parent;
					return parent.type === "StaticBlock" ? parentStartNodeOrToken = sourceCode.getFirstToken(parent, { skip: 1 }) : parent.type === "SwitchStatement" && (parentStartNodeOrToken = sourceCode.getTokenAfter(parent.discriminant, { filter: astUtils.isOpeningBraceToken })), token.loc.start.line - parentStartNodeOrToken.loc.start.line === 1;
				}
				return !1;
			}
			/**
			* Returns whether or not comments are at the parent end or not.
			* @param {token} token The Comment token.
			* @param {string} nodeType The parent type to check against.
			* @returns {boolean} True if the comment is at parent end.
			*/
			function isCommentAtParentEnd(token, nodeType) {
				let parent = getParentNodeOfToken(token);
				return !!parent && isParentNodeType(parent, nodeType) && parent.loc.end.line - token.loc.end.line === 1;
			}
			/**
			* Returns whether or not comments are at the block start or not.
			* @param {token} token The Comment token.
			* @returns {boolean} True if the comment is at block start.
			*/
			function isCommentAtBlockStart(token) {
				return isCommentAtParentStart(token, "ClassBody") || isCommentAtParentStart(token, "BlockStatement") || isCommentAtParentStart(token, "StaticBlock") || isCommentAtParentStart(token, "SwitchCase") || isCommentAtParentStart(token, "SwitchStatement");
			}
			/**
			* Returns whether or not comments are at the block end or not.
			* @param {token} token The Comment token.
			* @returns {boolean} True if the comment is at block end.
			*/
			function isCommentAtBlockEnd(token) {
				return isCommentAtParentEnd(token, "ClassBody") || isCommentAtParentEnd(token, "BlockStatement") || isCommentAtParentEnd(token, "StaticBlock") || isCommentAtParentEnd(token, "SwitchCase") || isCommentAtParentEnd(token, "SwitchStatement");
			}
			/**
			* Returns whether or not comments are at the class start or not.
			* @param {token} token The Comment token.
			* @returns {boolean} True if the comment is at class start.
			*/
			function isCommentAtClassStart(token) {
				return isCommentAtParentStart(token, "ClassBody");
			}
			/**
			* Returns whether or not comments are at the class end or not.
			* @param {token} token The Comment token.
			* @returns {boolean} True if the comment is at class end.
			*/
			function isCommentAtClassEnd(token) {
				return isCommentAtParentEnd(token, "ClassBody");
			}
			/**
			* Returns whether or not comments are at the object start or not.
			* @param {token} token The Comment token.
			* @returns {boolean} True if the comment is at object start.
			*/
			function isCommentAtObjectStart(token) {
				return isCommentAtParentStart(token, "ObjectExpression") || isCommentAtParentStart(token, "ObjectPattern");
			}
			/**
			* Returns whether or not comments are at the object end or not.
			* @param {token} token The Comment token.
			* @returns {boolean} True if the comment is at object end.
			*/
			function isCommentAtObjectEnd(token) {
				return isCommentAtParentEnd(token, "ObjectExpression") || isCommentAtParentEnd(token, "ObjectPattern");
			}
			/**
			* Returns whether or not comments are at the array start or not.
			* @param {token} token The Comment token.
			* @returns {boolean} True if the comment is at array start.
			*/
			function isCommentAtArrayStart(token) {
				return isCommentAtParentStart(token, "ArrayExpression") || isCommentAtParentStart(token, "ArrayPattern");
			}
			/**
			* Returns whether or not comments are at the array end or not.
			* @param {token} token The Comment token.
			* @returns {boolean} True if the comment is at array end.
			*/
			function isCommentAtArrayEnd(token) {
				return isCommentAtParentEnd(token, "ArrayExpression") || isCommentAtParentEnd(token, "ArrayPattern");
			}
			/**
			* Checks if a comment token has lines around it (ignores inline comments)
			* @param {token} token The Comment token.
			* @param {Object} opts Options to determine the newline.
			* @param {boolean} opts.after Should have a newline after this line.
			* @param {boolean} opts.before Should have a newline before this line.
			* @returns {void}
			*/
			function checkForEmptyLine(token, opts) {
				if (applyDefaultIgnorePatterns && defaultIgnoreRegExp.test(token.value) || ignorePattern && customIgnoreRegExp.test(token.value)) return;
				let after = opts.after, before = opts.before, prevLineNum = token.loc.start.line - 1, nextLineNum = token.loc.end.line + 1, commentIsNotAlone = codeAroundComment(token), blockStartAllowed = options.allowBlockStart && isCommentAtBlockStart(token) && !(options.allowClassStart === !1 && isCommentAtClassStart(token)), blockEndAllowed = options.allowBlockEnd && isCommentAtBlockEnd(token) && !(options.allowClassEnd === !1 && isCommentAtClassEnd(token)), classStartAllowed = options.allowClassStart && isCommentAtClassStart(token), classEndAllowed = options.allowClassEnd && isCommentAtClassEnd(token), objectStartAllowed = options.allowObjectStart && isCommentAtObjectStart(token), objectEndAllowed = options.allowObjectEnd && isCommentAtObjectEnd(token), arrayStartAllowed = options.allowArrayStart && isCommentAtArrayStart(token), arrayEndAllowed = options.allowArrayEnd && isCommentAtArrayEnd(token), exceptionStartAllowed = blockStartAllowed || classStartAllowed || objectStartAllowed || arrayStartAllowed, exceptionEndAllowed = blockEndAllowed || classEndAllowed || objectEndAllowed || arrayEndAllowed;
				if (prevLineNum < 1 && (before = !1), nextLineNum >= numLines && (after = !1), commentIsNotAlone) return;
				let previousTokenOrComment = sourceCode.getTokenBefore(token, { includeComments: !0 }), nextTokenOrComment = sourceCode.getTokenAfter(token, { includeComments: !0 });
				if (!exceptionStartAllowed && before && !commentAndEmptyLines.has(prevLineNum) && !(astUtils.isCommentToken(previousTokenOrComment) && astUtils.isTokenOnSameLine(previousTokenOrComment, token))) {
					let lineStart = token.range[0] - token.loc.start.column, range = [lineStart, lineStart];
					context.report({
						node: token,
						messageId: "before",
						fix(fixer) {
							return fixer.insertTextBeforeRange(range, "\n");
						}
					});
				}
				!exceptionEndAllowed && after && !commentAndEmptyLines.has(nextLineNum) && !(astUtils.isCommentToken(nextTokenOrComment) && astUtils.isTokenOnSameLine(token, nextTokenOrComment)) && context.report({
					node: token,
					messageId: "after",
					fix(fixer) {
						return fixer.insertTextAfter(token, "\n");
					}
				});
			}
			return { Program() {
				comments.forEach((token) => {
					token.type === "Line" ? (options.beforeLineComment || options.afterLineComment) && checkForEmptyLine(token, {
						after: options.afterLineComment,
						before: options.beforeLineComment
					}) : token.type === "Block" ? (options.beforeBlockComment || options.afterBlockComment) && checkForEmptyLine(token, {
						after: options.afterBlockComment,
						before: options.beforeBlockComment
					}) : token.type === "Shebang" && options.afterHashbangComment && checkForEmptyLine(token, {
						after: options.afterHashbangComment,
						before: !1
					});
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/lines-around-comment.cjs
module.exports = require_lines_around_comment().create;
//#endregion
