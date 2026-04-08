const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-return-await.js
/**
* @fileoverview Disallows unnecessary `return await`
* @author Jordan Harband
* @deprecated in ESLint v8.46.0
*/
var require_no_return_await = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			hasSuggestions: !0,
			type: "suggestion",
			docs: {
				description: "Disallow unnecessary `return await`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-return-await"
			},
			fixable: null,
			deprecated: {
				message: "The original assumption of the rule no longer holds true because of engine optimization.",
				deprecatedSince: "8.46.0",
				availableUntil: null,
				replacedBy: []
			},
			schema: [],
			messages: {
				removeAwait: "Remove redundant `await`.",
				redundantUseOfAwait: "Redundant use of `await` on a return value."
			}
		},
		create(context) {
			/**
			* Reports a found unnecessary `await` expression.
			* @param {ASTNode} node The node representing the `await` expression to report
			* @returns {void}
			*/
			function reportUnnecessaryAwait(node) {
				context.report({
					node: context.sourceCode.getFirstToken(node),
					loc: node.loc,
					messageId: "redundantUseOfAwait",
					suggest: [{
						messageId: "removeAwait",
						fix(fixer) {
							let sourceCode = context.sourceCode, [awaitToken, tokenAfterAwait] = sourceCode.getFirstTokens(node, 2);
							if (awaitToken.loc.start.line !== tokenAfterAwait.loc.start.line) return null;
							let [startOfAwait, endOfAwait] = awaitToken.range, range = [startOfAwait, endOfAwait + (sourceCode.text[endOfAwait] === " " ? 1 : 0)];
							return fixer.removeRange(range);
						}
					}]
				});
			}
			/**
			* Determines whether a thrown error from this node will be caught/handled within this function rather than immediately halting
			* this function. For example, a statement in a `try` block will always have an error handler. A statement in
			* a `catch` block will only have an error handler if there is also a `finally` block.
			* @param {ASTNode} node A node representing a location where an could be thrown
			* @returns {boolean} `true` if a thrown error will be caught/handled in this function
			*/
			function hasErrorHandler(node) {
				let ancestor = node;
				for (; !astUtils.isFunction(ancestor) && ancestor.type !== "Program";) {
					if (ancestor.parent.type === "TryStatement" && (ancestor === ancestor.parent.block || ancestor === ancestor.parent.handler && ancestor.parent.finalizer)) return !0;
					ancestor = ancestor.parent;
				}
				return !1;
			}
			/**
			* Checks if a node is placed in tail call position. Once `return` arguments (or arrow function expressions) can be a complex expression,
			* an `await` expression could or could not be unnecessary by the definition of this rule. So we're looking for `await` expressions that are in tail position.
			* @param {ASTNode} node A node representing the `await` expression to check
			* @returns {boolean} The checking result
			*/
			function isInTailCallPosition(node) {
				return node.parent.type === "ArrowFunctionExpression" ? !0 : node.parent.type === "ReturnStatement" ? !hasErrorHandler(node.parent) : node.parent.type === "ConditionalExpression" && (node === node.parent.consequent || node === node.parent.alternate) || node.parent.type === "LogicalExpression" && node === node.parent.right || node.parent.type === "SequenceExpression" && node === node.parent.expressions.at(-1) ? isInTailCallPosition(node.parent) : !1;
			}
			return { AwaitExpression(node) {
				isInTailCallPosition(node) && !hasErrorHandler(node) && reportUnnecessaryAwait(node);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-return-await.cjs
module.exports = require_no_return_await().create;
//#endregion
