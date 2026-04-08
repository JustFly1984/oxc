const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-object-spread.js
/**
* @fileoverview Rule to disallow using `Object.assign` with an object literal as the first argument and prefer the use of object spread instead
* @author Sharmila Jesupaul
*/
var require_prefer_object_spread = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { CALL, ReferenceTracker } = require_eslint_utils$1.t(), { isCommaToken, isOpeningParenToken, isClosingParenToken, isParenthesised } = require_ast_utils$1.t(), ANY_SPACE = /\s/u;
	/**
	* Helper that checks if the Object.assign call has array spread
	* @param {ASTNode} node The node that the rule warns on
	* @returns {boolean} - Returns true if the Object.assign call has array spread
	*/
	function hasArraySpread(node) {
		return node.arguments.some((arg) => arg.type === "SpreadElement");
	}
	/**
	* Determines whether the given node is an accessor property (getter/setter).
	* @param {ASTNode} node Node to check.
	* @returns {boolean} `true` if the node is a getter or a setter.
	*/
	function isAccessorProperty(node) {
		return node.type === "Property" && (node.kind === "get" || node.kind === "set");
	}
	/**
	* Determines whether the given object expression node has accessor properties (getters/setters).
	* @param {ASTNode} node `ObjectExpression` node to check.
	* @returns {boolean} `true` if the node has at least one getter/setter.
	*/
	function hasAccessors(node) {
		return node.properties.some(isAccessorProperty);
	}
	/**
	* Determines whether the given call expression node has object expression arguments with accessor properties (getters/setters).
	* @param {ASTNode} node `CallExpression` node to check.
	* @returns {boolean} `true` if the node has at least one argument that is an object expression with at least one getter/setter.
	*/
	function hasArgumentsWithAccessors(node) {
		return node.arguments.filter((arg) => arg.type === "ObjectExpression").some(hasAccessors);
	}
	/**
	* Helper that checks if the node needs parentheses to be valid JS.
	* The default is to wrap the node in parentheses to avoid parsing errors.
	* @param {ASTNode} node The node that the rule warns on
	* @param {Object} sourceCode in context sourcecode object
	* @returns {boolean} - Returns true if the node needs parentheses
	*/
	function needsParens(node, sourceCode) {
		let parent = node.parent;
		switch (parent.type) {
			case "VariableDeclarator":
			case "ArrayExpression":
			case "ReturnStatement":
			case "CallExpression":
			case "Property": return !1;
			case "AssignmentExpression": return parent.left === node && !isParenthesised(sourceCode, node);
			default: return !isParenthesised(sourceCode, node);
		}
	}
	/**
	* Determines if an argument needs parentheses. The default is to not add parens.
	* @param {ASTNode} node The node to be checked.
	* @param {Object} sourceCode in context sourcecode object
	* @returns {boolean} True if the node needs parentheses
	*/
	function argNeedsParens(node, sourceCode) {
		switch (node.type) {
			case "AssignmentExpression":
			case "ArrowFunctionExpression":
			case "ConditionalExpression": return !isParenthesised(sourceCode, node);
			default: return !1;
		}
	}
	/**
	* Get the parenthesis tokens of a given ObjectExpression node.
	* This includes the braces of the object literal and enclosing parentheses.
	* @param {ASTNode} node The node to get.
	* @param {Token} leftArgumentListParen The opening paren token of the argument list.
	* @param {SourceCode} sourceCode The source code object to get tokens.
	* @returns {Token[]} The parenthesis tokens of the node. This is sorted by the location.
	*/
	function getParenTokens(node, leftArgumentListParen, sourceCode) {
		let parens = [sourceCode.getFirstToken(node), sourceCode.getLastToken(node)], leftNext = sourceCode.getTokenBefore(node), rightNext = sourceCode.getTokenAfter(node);
		for (; leftNext && rightNext && leftNext.range[0] > leftArgumentListParen.range[0] && isOpeningParenToken(leftNext) && isClosingParenToken(rightNext);) parens.push(leftNext, rightNext), leftNext = sourceCode.getTokenBefore(leftNext), rightNext = sourceCode.getTokenAfter(rightNext);
		return parens.sort((a, b) => a.range[0] - b.range[0]);
	}
	/**
	* Get the range of a given token and around whitespaces.
	* @param {Token} token The token to get range.
	* @param {SourceCode} sourceCode The source code object to get tokens.
	* @returns {number} The end of the range of the token and around whitespaces.
	*/
	function getStartWithSpaces(token, sourceCode) {
		let text = sourceCode.text, start = token.range[0];
		{
			let prevToken = sourceCode.getTokenBefore(token, { includeComments: !0 });
			if (prevToken && prevToken.type === "Line") return start;
		}
		for (; ANY_SPACE.test(text[start - 1] || "");) --start;
		return start;
	}
	/**
	* Get the range of a given token and around whitespaces.
	* @param {Token} token The token to get range.
	* @param {SourceCode} sourceCode The source code object to get tokens.
	* @returns {number} The start of the range of the token and around whitespaces.
	*/
	function getEndWithSpaces(token, sourceCode) {
		let text = sourceCode.text, end = token.range[1];
		for (; ANY_SPACE.test(text[end] || "");) end += 1;
		return end;
	}
	/**
	* Autofixes the Object.assign call to use an object spread instead.
	* @param {ASTNode|null} node The node that the rule warns on, i.e. the Object.assign call
	* @param {string} sourceCode sourceCode of the Object.assign call
	* @returns {Function} autofixer - replaces the Object.assign with a spread object.
	*/
	function defineFixer(node, sourceCode) {
		return function* (fixer) {
			let leftParen = sourceCode.getTokenAfter(node.callee, isOpeningParenToken), rightParen = sourceCode.getLastToken(node);
			yield fixer.removeRange([node.range[0], leftParen.range[0]]), needsParens(node, sourceCode) ? (yield fixer.replaceText(leftParen, "({"), yield fixer.replaceText(rightParen, "})")) : (yield fixer.replaceText(leftParen, "{"), yield fixer.replaceText(rightParen, "}"));
			for (let argNode of node.arguments) {
				let innerParens = getParenTokens(argNode, leftParen, sourceCode), left = innerParens.shift(), right = innerParens.pop();
				if (argNode.type === "ObjectExpression") {
					let maybeTrailingComma = sourceCode.getLastToken(argNode, 1), maybeArgumentComma = sourceCode.getTokenAfter(right);
					for (let innerParen of innerParens) yield fixer.remove(innerParen);
					let leftRange = [left.range[0], getEndWithSpaces(left, sourceCode)], rightRange = [Math.max(getStartWithSpaces(right, sourceCode), leftRange[1]), right.range[1]];
					yield fixer.removeRange(leftRange), yield fixer.removeRange(rightRange), (argNode.properties.length === 0 || isCommaToken(maybeTrailingComma)) && isCommaToken(maybeArgumentComma) && (yield fixer.remove(maybeArgumentComma));
				} else argNeedsParens(argNode, sourceCode) ? (yield fixer.insertTextBefore(left, "...("), yield fixer.insertTextAfter(right, ")")) : yield fixer.insertTextBefore(left, "...");
			}
		};
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow using `Object.assign` with an object literal as the first argument and prefer the use of object spread instead",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/prefer-object-spread"
			},
			schema: [],
			fixable: "code",
			messages: {
				useSpreadMessage: "Use an object spread instead of `Object.assign` eg: `{ ...foo }`.",
				useLiteralMessage: "Use an object literal instead of `Object.assign`. eg: `{ foo: bar }`."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { Program(node) {
				let tracker = new ReferenceTracker(sourceCode.getScope(node)), trackMap = { Object: { assign: { [CALL]: !0 } } };
				for (let { node: refNode } of tracker.iterateGlobalReferences(trackMap)) if (refNode.arguments.length >= 1 && refNode.arguments[0].type === "ObjectExpression" && !hasArraySpread(refNode) && !(refNode.arguments.length > 1 && hasArgumentsWithAccessors(refNode))) {
					let messageId = refNode.arguments.length === 1 ? "useLiteralMessage" : "useSpreadMessage", fix = defineFixer(refNode, sourceCode);
					context.report({
						node: refNode,
						messageId,
						fix
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-object-spread.cjs
module.exports = require_prefer_object_spread().create;
//#endregion
