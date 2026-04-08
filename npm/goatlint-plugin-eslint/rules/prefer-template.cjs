const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-template.js
/**
* @fileoverview A rule to suggest using template literals instead of string concatenation.
* @author Toru Nagashima
*/
var require_prefer_template = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether or not a given node is a concatenation.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node is a concatenation.
	*/
	function isConcatenation(node) {
		return node.type === "BinaryExpression" && node.operator === "+";
	}
	/**
	* Gets the top binary expression node for concatenation in parents of a given node.
	* @param {ASTNode} node A node to get.
	* @returns {ASTNode} the top binary expression node in parents of a given node.
	*/
	function getTopConcatBinaryExpression(node) {
		let currentNode = node;
		for (; isConcatenation(currentNode.parent);) currentNode = currentNode.parent;
		return currentNode;
	}
	/**
	* Checks whether or not a node contains a string literal with an octal or non-octal decimal escape sequence
	* @param {ASTNode} node A node to check
	* @returns {boolean} `true` if at least one string literal within the node contains
	* an octal or non-octal decimal escape sequence
	*/
	function hasOctalOrNonOctalDecimalEscapeSequence(node) {
		return isConcatenation(node) ? hasOctalOrNonOctalDecimalEscapeSequence(node.left) || hasOctalOrNonOctalDecimalEscapeSequence(node.right) : node.type === "Literal" && typeof node.value == "string" ? astUtils.hasOctalOrNonOctalDecimalEscapeSequence(node.raw) : !1;
	}
	/**
	* Checks whether or not a given binary expression has string literals.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node has string literals.
	*/
	function hasStringLiteral(node) {
		return isConcatenation(node) ? hasStringLiteral(node.right) || hasStringLiteral(node.left) : astUtils.isStringLiteral(node);
	}
	/**
	* Checks whether or not a given binary expression has non string literals.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node has non string literals.
	*/
	function hasNonStringLiteral(node) {
		return isConcatenation(node) ? hasNonStringLiteral(node.right) || hasNonStringLiteral(node.left) : !astUtils.isStringLiteral(node);
	}
	/**
	* Determines whether a given node will start with a template curly expression (`${}`) when being converted to a template literal.
	* @param {ASTNode} node The node that will be fixed to a template literal
	* @returns {boolean} `true` if the node will start with a template curly.
	*/
	function startsWithTemplateCurly(node) {
		return node.type === "BinaryExpression" ? startsWithTemplateCurly(node.left) : node.type === "TemplateLiteral" ? node.expressions.length && node.quasis.length && node.quasis[0].range[0] === node.quasis[0].range[1] : node.type !== "Literal" || typeof node.value != "string";
	}
	/**
	* Determines whether a given node end with a template curly expression (`${}`) when being converted to a template literal.
	* @param {ASTNode} node The node that will be fixed to a template literal
	* @returns {boolean} `true` if the node will end with a template curly.
	*/
	function endsWithTemplateCurly(node) {
		return node.type === "BinaryExpression" ? startsWithTemplateCurly(node.right) : node.type === "TemplateLiteral" ? node.expressions.length && node.quasis.length && node.quasis.at(-1).range[0] === node.quasis.at(-1).range[1] : node.type !== "Literal" || typeof node.value != "string";
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require template literals instead of string concatenation",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/prefer-template"
			},
			schema: [],
			fixable: "code",
			messages: { unexpectedStringConcatenation: "Unexpected string concatenation." }
		},
		create(context) {
			let sourceCode = context.sourceCode, done = Object.create(null);
			/**
			* Gets the non-token text between two nodes, ignoring any other tokens that appear between the two tokens.
			* @param {ASTNode} node1 The first node
			* @param {ASTNode} node2 The second node
			* @returns {string} The text between the nodes, excluding other tokens
			*/
			function getTextBetween(node1, node2) {
				let allTokens = [node1].concat(sourceCode.getTokensBetween(node1, node2), node2), sourceText = sourceCode.getText();
				return allTokens.slice(0, -1).reduce((accumulator, token, index) => accumulator + sourceText.slice(token.range[1], allTokens[index + 1].range[0]), "");
			}
			/**
			* Returns a template literal form of the given node.
			* @param {ASTNode} currentNode A node that should be converted to a template literal
			* @param {string} textBeforeNode Text that should appear before the node
			* @param {string} textAfterNode Text that should appear after the node
			* @returns {string} A string form of this node, represented as a template literal
			*/
			function getTemplateLiteral(currentNode, textBeforeNode, textAfterNode) {
				if (currentNode.type === "Literal" && typeof currentNode.value == "string") return `\`${currentNode.raw.slice(1, -1).replace(/\\*(\$\{|`)/gu, (matched) => matched.lastIndexOf("\\") % 2 ? `\\${matched}` : matched).replace(RegExp(`\\\\${currentNode.raw[0]}`, "gu"), currentNode.raw[0])}\``;
				if (currentNode.type === "TemplateLiteral") return sourceCode.getText(currentNode);
				if (isConcatenation(currentNode) && hasStringLiteral(currentNode)) {
					let plusSign = sourceCode.getFirstTokenBetween(currentNode.left, currentNode.right, (token) => token.value === "+"), textBeforePlus = getTextBetween(currentNode.left, plusSign), textAfterPlus = getTextBetween(plusSign, currentNode.right), leftEndsWithCurly = endsWithTemplateCurly(currentNode.left), rightStartsWithCurly = startsWithTemplateCurly(currentNode.right);
					return leftEndsWithCurly ? getTemplateLiteral(currentNode.left, textBeforeNode, textBeforePlus + textAfterPlus).slice(0, -1) + getTemplateLiteral(currentNode.right, null, textAfterNode).slice(1) : rightStartsWithCurly ? getTemplateLiteral(currentNode.left, textBeforeNode, null).slice(0, -1) + getTemplateLiteral(currentNode.right, textBeforePlus + textAfterPlus, textAfterNode).slice(1) : `${getTemplateLiteral(currentNode.left, textBeforeNode, null)}${textBeforePlus}+${textAfterPlus}${getTemplateLiteral(currentNode.right, textAfterNode, null)}`;
				}
				return `\`\${${textBeforeNode || ""}${sourceCode.getText(currentNode)}${textAfterNode || ""}}\``;
			}
			/**
			* Returns a fixer object that converts a non-string binary expression to a template literal
			* @param {SourceCodeFixer} fixer The fixer object
			* @param {ASTNode} node A node that should be converted to a template literal
			* @returns {Object} A fix for this binary expression
			*/
			function fixNonStringBinaryExpression(fixer, node) {
				let topBinaryExpr = getTopConcatBinaryExpression(node.parent);
				return hasOctalOrNonOctalDecimalEscapeSequence(topBinaryExpr) ? null : fixer.replaceText(topBinaryExpr, getTemplateLiteral(topBinaryExpr, null, null));
			}
			/**
			* Reports if a given node is string concatenation with non string literals.
			* @param {ASTNode} node A node to check.
			* @returns {void}
			*/
			function checkForStringConcat(node) {
				if (!astUtils.isStringLiteral(node) || !isConcatenation(node.parent)) return;
				let topBinaryExpr = getTopConcatBinaryExpression(node.parent);
				done[topBinaryExpr.range[0]] || (done[topBinaryExpr.range[0]] = !0, hasNonStringLiteral(topBinaryExpr) && context.report({
					node: topBinaryExpr,
					messageId: "unexpectedStringConcatenation",
					fix: (fixer) => fixNonStringBinaryExpression(fixer, node)
				}));
			}
			return {
				Program() {
					done = Object.create(null);
				},
				Literal: checkForStringConcat,
				TemplateLiteral: checkForStringConcat
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-template.cjs
module.exports = require_prefer_template().create;
//#endregion
