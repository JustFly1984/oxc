//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/max-len.js
/**
* @fileoverview Rule to check for max length on a line.
* @author Matt DuVall <http://www.mattduvall.com>
* @deprecated in ESLint v8.53.0
*/
var require_max_len = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let OPTIONS_SCHEMA = {
		type: "object",
		properties: {
			code: {
				type: "integer",
				minimum: 0
			},
			comments: {
				type: "integer",
				minimum: 0
			},
			tabWidth: {
				type: "integer",
				minimum: 0
			},
			ignorePattern: { type: "string" },
			ignoreComments: { type: "boolean" },
			ignoreStrings: { type: "boolean" },
			ignoreUrls: { type: "boolean" },
			ignoreTemplateLiterals: { type: "boolean" },
			ignoreRegExpLiterals: { type: "boolean" },
			ignoreTrailingComments: { type: "boolean" }
		},
		additionalProperties: !1
	}, OPTIONS_OR_INTEGER_SCHEMA = { anyOf: [OPTIONS_SCHEMA, {
		type: "integer",
		minimum: 0
	}] };
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
						name: "max-len",
						url: "https://eslint.style/rules/max-len"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce a maximum line length",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/max-len"
			},
			schema: [
				OPTIONS_OR_INTEGER_SCHEMA,
				OPTIONS_OR_INTEGER_SCHEMA,
				OPTIONS_SCHEMA
			],
			messages: {
				max: "This line has a length of {{lineLength}}. Maximum allowed is {{maxLength}}.",
				maxComment: "This line has a comment length of {{lineLength}}. Maximum allowed is {{maxCommentLength}}."
			}
		},
		create(context) {
			let URL_REGEXP = /[^:/?#]:\/\/[^?#]/u, sourceCode = context.sourceCode;
			/**
			* Computes the length of a line that may contain tabs. The width of each
			* tab will be the number of spaces to the next tab stop.
			* @param {string} line The line.
			* @param {number} tabWidth The width of each tab stop in spaces.
			* @returns {number} The computed line length.
			* @private
			*/
			function computeLineLength(line, tabWidth) {
				let extraCharacterCount = 0;
				return line.replace(/\t/gu, (match, offset) => {
					let totalOffset = offset + extraCharacterCount, spaceCount = tabWidth - (tabWidth ? totalOffset % tabWidth : 0);
					extraCharacterCount += spaceCount - 1;
				}), Array.from(line).length + extraCharacterCount;
			}
			let options = Object.assign({}, context.options.at(-1));
			typeof context.options[0] == "number" && (options.code = context.options[0]), typeof context.options[1] == "number" && (options.tabWidth = context.options[1]);
			let maxLength = typeof options.code == "number" ? options.code : 80, tabWidth = typeof options.tabWidth == "number" ? options.tabWidth : 4, ignoreComments = !!options.ignoreComments, ignoreStrings = !!options.ignoreStrings, ignoreTemplateLiterals = !!options.ignoreTemplateLiterals, ignoreRegExpLiterals = !!options.ignoreRegExpLiterals, ignoreTrailingComments = !!options.ignoreTrailingComments || !!options.ignoreComments, ignoreUrls = !!options.ignoreUrls, maxCommentLength = options.comments, ignorePattern = options.ignorePattern || null;
			ignorePattern &&= new RegExp(ignorePattern, "u");
			/**
			* Tells if a given comment is trailing: it starts on the current line and
			* extends to or past the end of the current line.
			* @param {string} line The source line we want to check for a trailing comment on
			* @param {number} lineNumber The one-indexed line number for line
			* @param {ASTNode} comment The comment to inspect
			* @returns {boolean} If the comment is trailing on the given line
			*/
			function isTrailingComment(line, lineNumber, comment) {
				return comment && comment.loc.start.line === lineNumber && lineNumber <= comment.loc.end.line && (comment.loc.end.line > lineNumber || comment.loc.end.column === line.length);
			}
			/**
			* Tells if a comment encompasses the entire line.
			* @param {string} line The source line with a trailing comment
			* @param {number} lineNumber The one-indexed line number this is on
			* @param {ASTNode} comment The comment to remove
			* @returns {boolean} If the comment covers the entire line
			*/
			function isFullLineComment(line, lineNumber, comment) {
				let start = comment.loc.start, end = comment.loc.end, isFirstTokenOnLine = !line.slice(0, comment.loc.start.column).trim();
				return comment && (start.line < lineNumber || start.line === lineNumber && isFirstTokenOnLine) && (end.line > lineNumber || end.line === lineNumber && end.column === line.length);
			}
			/**
			* Check if a node is a JSXEmptyExpression contained in a single line JSXExpressionContainer.
			* @param {ASTNode} node A node to check.
			* @returns {boolean} True if the node is a JSXEmptyExpression contained in a single line JSXExpressionContainer.
			*/
			function isJSXEmptyExpressionInSingleLineContainer(node) {
				if (!node || !node.parent || node.type !== "JSXEmptyExpression" || node.parent.type !== "JSXExpressionContainer") return !1;
				let parent = node.parent;
				return parent.loc.start.line === parent.loc.end.line;
			}
			/**
			* Gets the line after the comment and any remaining trailing whitespace is
			* stripped.
			* @param {string} line The source line with a trailing comment
			* @param {ASTNode} comment The comment to remove
			* @returns {string} Line without comment and trailing whitespace
			*/
			function stripTrailingComment(line, comment) {
				return line.slice(0, comment.loc.start.column).replace(/\s+$/u, "");
			}
			/**
			* Ensure that an array exists at [key] on `object`, and add `value` to it.
			* @param {Object} object the object to mutate
			* @param {string} key the object's key
			* @param {any} value the value to add
			* @returns {void}
			* @private
			*/
			function ensureArrayAndPush(object, key, value) {
				Array.isArray(object[key]) || (object[key] = []), object[key].push(value);
			}
			/**
			* Retrieves an array containing all strings (" or ') in the source code.
			* @returns {ASTNode[]} An array of string nodes.
			*/
			function getAllStrings() {
				return sourceCode.ast.tokens.filter((token) => token.type === "String" || token.type === "JSXText" && sourceCode.getNodeByRangeIndex(token.range[0] - 1).type === "JSXAttribute");
			}
			/**
			* Retrieves an array containing all template literals in the source code.
			* @returns {ASTNode[]} An array of template literal nodes.
			*/
			function getAllTemplateLiterals() {
				return sourceCode.ast.tokens.filter((token) => token.type === "Template");
			}
			/**
			* Retrieves an array containing all RegExp literals in the source code.
			* @returns {ASTNode[]} An array of RegExp literal nodes.
			*/
			function getAllRegExpLiterals() {
				return sourceCode.ast.tokens.filter((token) => token.type === "RegularExpression");
			}
			/**
			*
			* reduce an array of AST nodes by line number, both start and end.
			* @param {ASTNode[]} arr array of AST nodes
			* @returns {Object} accululated AST nodes
			*/
			function groupArrayByLineNumber(arr) {
				let obj = {};
				for (let i = 0; i < arr.length; i++) {
					let node = arr[i];
					for (let j = node.loc.start.line; j <= node.loc.end.line; ++j) ensureArrayAndPush(obj, j, node);
				}
				return obj;
			}
			/**
			* Returns an array of all comments in the source code.
			* If the element in the array is a JSXEmptyExpression contained with a single line JSXExpressionContainer,
			* the element is changed with JSXExpressionContainer node.
			* @returns {ASTNode[]} An array of comment nodes
			*/
			function getAllComments() {
				let comments = [];
				return sourceCode.getAllComments().forEach((commentNode) => {
					let containingNode = sourceCode.getNodeByRangeIndex(commentNode.range[0]);
					isJSXEmptyExpressionInSingleLineContainer(containingNode) ? comments.at(-1) !== containingNode.parent && comments.push(containingNode.parent) : comments.push(commentNode);
				}), comments;
			}
			/**
			* Check the program for max length
			* @param {ASTNode} node Node to examine
			* @returns {void}
			* @private
			*/
			function checkProgramForMaxLength(node) {
				let lines = sourceCode.lines, comments = ignoreComments || maxCommentLength || ignoreTrailingComments ? getAllComments() : [], commentsIndex = 0, stringsByLine = groupArrayByLineNumber(getAllStrings()), templateLiteralsByLine = groupArrayByLineNumber(getAllTemplateLiterals()), regExpLiteralsByLine = groupArrayByLineNumber(getAllRegExpLiterals());
				lines.forEach((line, i) => {
					let lineNumber = i + 1, lineIsComment = !1, textToMeasure;
					if (commentsIndex < comments.length) {
						let comment;
						do
							comment = comments[++commentsIndex];
						while (comment && comment.loc.start.line <= lineNumber);
						if (comment = comments[--commentsIndex], isFullLineComment(line, lineNumber, comment)) lineIsComment = !0, textToMeasure = line;
						else if (ignoreTrailingComments && isTrailingComment(line, lineNumber, comment)) {
							textToMeasure = stripTrailingComment(line, comment);
							let lastIndex = commentsIndex;
							for (; isTrailingComment(textToMeasure, lineNumber, comments[--lastIndex]);) textToMeasure = stripTrailingComment(textToMeasure, comments[lastIndex]);
						} else textToMeasure = line;
					} else textToMeasure = line;
					if (ignorePattern && ignorePattern.test(textToMeasure) || ignoreUrls && URL_REGEXP.test(textToMeasure) || ignoreStrings && stringsByLine[lineNumber] || ignoreTemplateLiterals && templateLiteralsByLine[lineNumber] || ignoreRegExpLiterals && regExpLiteralsByLine[lineNumber]) return;
					let lineLength = computeLineLength(textToMeasure, tabWidth), commentLengthApplies = lineIsComment && maxCommentLength;
					if (lineIsComment && ignoreComments) return;
					let loc = {
						start: {
							line: lineNumber,
							column: 0
						},
						end: {
							line: lineNumber,
							column: textToMeasure.length
						}
					};
					commentLengthApplies ? lineLength > maxCommentLength && context.report({
						node,
						loc,
						messageId: "maxComment",
						data: {
							lineLength,
							maxCommentLength
						}
					}) : lineLength > maxLength && context.report({
						node,
						loc,
						messageId: "max",
						data: {
							lineLength,
							maxLength
						}
					});
				});
			}
			return { Program: checkProgramForMaxLength };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/max-len.cjs
module.exports = require_max_len().create;
//#endregion
