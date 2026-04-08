const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-extra-bind.js
/**
* @fileoverview Rule to flag unnecessary bind calls
* @author Bence Dányi <bence@danyi.me>
*/
var require_no_extra_bind = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), SIDE_EFFECT_FREE_NODE_TYPES = new Set([
		"Literal",
		"Identifier",
		"ThisExpression",
		"FunctionExpression"
	]);
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow unnecessary calls to `.bind()`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-extra-bind"
			},
			schema: [],
			fixable: "code",
			messages: { unexpected: "The function binding is unnecessary." }
		},
		create(context) {
			let sourceCode = context.sourceCode, scopeInfo = null;
			/**
			* Checks if a node is free of side effects.
			*
			* This check is stricter than it needs to be, in order to keep the implementation simple.
			* @param {ASTNode} node A node to check.
			* @returns {boolean} True if the node is known to be side-effect free, false otherwise.
			*/
			function isSideEffectFree(node) {
				return SIDE_EFFECT_FREE_NODE_TYPES.has(node.type);
			}
			/**
			* Reports a given function node.
			* @param {ASTNode} node A node to report. This is a FunctionExpression or
			*      an ArrowFunctionExpression.
			* @returns {void}
			*/
			function report(node) {
				let memberNode = node.parent, callNode = memberNode.parent.type === "ChainExpression" ? memberNode.parent.parent : memberNode.parent;
				context.report({
					node: callNode,
					messageId: "unexpected",
					loc: memberNode.property.loc,
					fix(fixer) {
						if (!isSideEffectFree(callNode.arguments[0])) return null;
						let tokenPairs = [[sourceCode.getTokenAfter(memberNode.object, astUtils.isNotClosingParenToken), sourceCode.getLastToken(memberNode)], [sourceCode.getTokenAfter(memberNode, astUtils.isNotClosingParenToken), sourceCode.getLastToken(callNode)]], firstTokenToRemove = tokenPairs[0][0], lastTokenToRemove = tokenPairs[1][1];
						return sourceCode.commentsExistBetween(firstTokenToRemove, lastTokenToRemove) ? null : tokenPairs.map(([start, end]) => fixer.removeRange([start.range[0], end.range[1]]));
					}
				});
			}
			/**
			* Checks whether or not a given function node is the callee of `.bind()`
			* method.
			*
			* e.g. `(function() {}.bind(foo))`
			* @param {ASTNode} node A node to report. This is a FunctionExpression or
			*      an ArrowFunctionExpression.
			* @returns {boolean} `true` if the node is the callee of `.bind()` method.
			*/
			function isCalleeOfBindMethod(node) {
				if (!astUtils.isSpecificMemberAccess(node.parent, null, "bind")) return !1;
				let bindNode = node.parent.parent.type === "ChainExpression" ? node.parent.parent : node.parent;
				return bindNode.parent.type === "CallExpression" && bindNode.parent.callee === bindNode && bindNode.parent.arguments.length === 1 && bindNode.parent.arguments[0].type !== "SpreadElement";
			}
			/**
			* Adds a scope information object to the stack.
			* @param {ASTNode} node A node to add. This node is a FunctionExpression
			*      or a FunctionDeclaration node.
			* @returns {void}
			*/
			function enterFunction(node) {
				scopeInfo = {
					isBound: isCalleeOfBindMethod(node),
					thisFound: !1,
					upper: scopeInfo
				};
			}
			/**
			* Removes the scope information object from the top of the stack.
			* At the same time, this reports the function node if the function has
			* `.bind()` and the `this` keywords found.
			* @param {ASTNode} node A node to remove. This node is a
			*      FunctionExpression or a FunctionDeclaration node.
			* @returns {void}
			*/
			function exitFunction(node) {
				scopeInfo.isBound && !scopeInfo.thisFound && report(node), scopeInfo = scopeInfo.upper;
			}
			/**
			* Reports a given arrow function if the function is callee of `.bind()`
			* method.
			* @param {ASTNode} node A node to report. This node is an
			*      ArrowFunctionExpression.
			* @returns {void}
			*/
			function exitArrowFunction(node) {
				isCalleeOfBindMethod(node) && report(node);
			}
			/**
			* Set the mark as the `this` keyword was found in this scope.
			* @returns {void}
			*/
			function markAsThisFound() {
				scopeInfo && (scopeInfo.thisFound = !0);
			}
			return {
				"ArrowFunctionExpression:exit": exitArrowFunction,
				FunctionDeclaration: enterFunction,
				"FunctionDeclaration:exit": exitFunction,
				FunctionExpression: enterFunction,
				"FunctionExpression:exit": exitFunction,
				ThisExpression: markAsThisFound
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-extra-bind.cjs
module.exports = require_no_extra_bind().create;
//#endregion
