const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_string_utils$1 = require("../common/string-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/max-lines-per-function.js
/**
* @fileoverview A rule to set the maximum number of line of code in a function.
* @author Pete Ward <peteward44@gmail.com>
*/
var require_max_lines_per_function = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), { upperCaseFirst } = require_string_utils$1.t(), OPTIONS_OR_INTEGER_SCHEMA = { oneOf: [{
		type: "object",
		properties: {
			max: {
				type: "integer",
				minimum: 0
			},
			skipComments: { type: "boolean" },
			skipBlankLines: { type: "boolean" },
			IIFEs: { type: "boolean" }
		},
		additionalProperties: !1
	}, {
		type: "integer",
		minimum: 1
	}] };
	/**
	* Given a list of comment nodes, return a map with numeric keys (source code line numbers) and comment token values.
	* @param {Array} comments An array of comment nodes.
	* @returns {Map<string, Node>} A map with numeric keys (source code line numbers) and comment token values.
	*/
	function getCommentLineNumbers(comments) {
		let map = /* @__PURE__ */ new Map();
		return comments.forEach((comment) => {
			for (let i = comment.loc.start.line; i <= comment.loc.end.line; i++) map.set(i, comment);
		}), map;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce a maximum number of lines of code in a function",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/max-lines-per-function"
			},
			schema: [OPTIONS_OR_INTEGER_SCHEMA],
			messages: { exceed: "{{name}} has too many lines ({{lineCount}}). Maximum allowed is {{maxLines}}." }
		},
		create(context) {
			let sourceCode = context.sourceCode, lines = sourceCode.lines, option = context.options[0], maxLines = 50, skipComments = !1, skipBlankLines = !1, IIFEs = !1;
			typeof option == "object" ? (maxLines = typeof option.max == "number" ? option.max : 50, skipComments = !!option.skipComments, skipBlankLines = !!option.skipBlankLines, IIFEs = !!option.IIFEs) : typeof option == "number" && (maxLines = option);
			let commentLineNumbers = getCommentLineNumbers(sourceCode.getAllComments());
			/**
			* Tells if a comment encompasses the entire line.
			* @param {string} line The source line with a trailing comment
			* @param {number} lineNumber The one-indexed line number this is on
			* @param {ASTNode} comment The comment to remove
			* @returns {boolean} If the comment covers the entire line
			*/
			function isFullLineComment(line, lineNumber, comment) {
				let start = comment.loc.start, end = comment.loc.end, isFirstTokenOnLine = start.line === lineNumber && !line.slice(0, start.column).trim(), isLastTokenOnLine = end.line === lineNumber && !line.slice(end.column).trim();
				return comment && (start.line < lineNumber || isFirstTokenOnLine) && (end.line > lineNumber || isLastTokenOnLine);
			}
			/**
			* Identifies is a node is a FunctionExpression which is part of an IIFE
			* @param {ASTNode} node Node to test
			* @returns {boolean} True if it's an IIFE
			*/
			function isIIFE(node) {
				return (node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression") && node.parent && node.parent.type === "CallExpression" && node.parent.callee === node;
			}
			/**
			* Identifies is a node is a FunctionExpression which is embedded within a MethodDefinition or Property
			* @param {ASTNode} node Node to test
			* @returns {boolean} True if it's a FunctionExpression embedded within a MethodDefinition or Property
			*/
			function isEmbedded(node) {
				return !node.parent || node !== node.parent.value ? !1 : node.parent.type === "MethodDefinition" ? !0 : node.parent.type === "Property" ? node.parent.method === !0 || node.parent.kind === "get" || node.parent.kind === "set" : !1;
			}
			/**
			* Count the lines in the function
			* @param {ASTNode} funcNode Function AST node
			* @returns {void}
			* @private
			*/
			function processFunction(funcNode) {
				let node = isEmbedded(funcNode) ? funcNode.parent : funcNode;
				if (!IIFEs && isIIFE(node)) return;
				let lineCount = 0;
				for (let i = node.loc.start.line - 1; i < node.loc.end.line; ++i) {
					let line = lines[i];
					skipComments && commentLineNumbers.has(i + 1) && isFullLineComment(line, i + 1, commentLineNumbers.get(i + 1)) || skipBlankLines && line.match(/^\s*$/u) || lineCount++;
				}
				if (lineCount > maxLines) {
					let name = upperCaseFirst(astUtils.getFunctionNameWithKind(funcNode));
					context.report({
						node,
						messageId: "exceed",
						data: {
							name,
							lineCount,
							maxLines
						}
					});
				}
			}
			return {
				FunctionDeclaration: processFunction,
				FunctionExpression: processFunction,
				ArrowFunctionExpression: processFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/max-lines-per-function.cjs
module.exports = require_max_lines_per_function().create;
//#endregion
