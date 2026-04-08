const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-promise-executor-return.js
/**
* @fileoverview Rule to disallow returning values from Promise executor functions
* @author Milos Djermanovic
*/
var require_no_promise_executor_return = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), functionTypesToCheck = new Set(["ArrowFunctionExpression", "FunctionExpression"]);
	/**
	* Determines whether the given function node is used as a Promise executor.
	* @param {ASTNode} node The node to check.
	* @param {SourceCode} sourceCode Source code to which the node belongs.
	* @returns {boolean} `true` if the node is a Promise executor.
	*/
	function isPromiseExecutor(node, sourceCode) {
		let parent = node.parent;
		return parent.type === "NewExpression" && parent.arguments[0] === node && parent.callee.type === "Identifier" && parent.callee.name === "Promise" && sourceCode.isGlobalReference(parent.callee);
	}
	/**
	* Checks if the given node is a void expression.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} - `true` if the node is a void expression
	*/
	function expressionIsVoid(node) {
		return node.type === "UnaryExpression" && node.operator === "void";
	}
	/**
	* Fixes the linting error by prepending "void " to the given node
	* @param {Object} sourceCode context given by context.sourceCode
	* @param {ASTNode} node The node to fix.
	* @param {Object} fixer The fixer object provided by ESLint.
	* @returns {Array<Object>} - An array of fix objects to apply to the node.
	*/
	function voidPrependFixer(sourceCode, node, fixer) {
		let requiresParens = astUtils.getPrecedence(node) < astUtils.getPrecedence({
			type: "UnaryExpression",
			operator: "void"
		}) && !astUtils.isParenthesised(sourceCode, node), returnOrArrowToken = sourceCode.getTokenBefore(node, node.parent.type === "ArrowFunctionExpression" ? astUtils.isArrowToken : (token) => token.type === "Keyword" && token.value === "return"), firstToken = sourceCode.getTokenAfter(returnOrArrowToken), prependSpace = returnOrArrowToken.value === "return" && returnOrArrowToken.range[1] === firstToken.range[0];
		return [fixer.insertTextBefore(firstToken, `${prependSpace ? " " : ""}void ${requiresParens ? "(" : ""}`), fixer.insertTextAfter(node, requiresParens ? ")" : "")];
	}
	/**
	* Fixes the linting error by `wrapping {}` around the given node's body.
	* @param {Object} sourceCode context given by context.sourceCode
	* @param {ASTNode} node The node to fix.
	* @param {Object} fixer The fixer object provided by ESLint.
	* @returns {Array<Object>} - An array of fix objects to apply to the node.
	*/
	function curlyWrapFixer(sourceCode, node, fixer) {
		let arrowToken = sourceCode.getTokenBefore(node.body, astUtils.isArrowToken), firstToken = sourceCode.getTokenAfter(arrowToken), lastToken = sourceCode.getLastToken(node);
		return [fixer.insertTextBefore(firstToken, "{"), fixer.insertTextAfter(lastToken, "}")];
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{ allowVoid: !1 }],
			docs: {
				description: "Disallow returning values from Promise executor functions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-promise-executor-return"
			},
			hasSuggestions: !0,
			schema: [{
				type: "object",
				properties: { allowVoid: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: {
				returnsValue: "Return values from promise executor functions cannot be read.",
				prependVoid: "Prepend `void` to the expression.",
				wrapBraces: "Wrap the expression in `{}`."
			}
		},
		create(context) {
			let funcInfo = null, sourceCode = context.sourceCode, [{ allowVoid }] = context.options;
			return {
				onCodePathStart(_, node) {
					if (funcInfo = {
						upper: funcInfo,
						shouldCheck: functionTypesToCheck.has(node.type) && isPromiseExecutor(node, sourceCode)
					}, funcInfo.shouldCheck && node.type === "ArrowFunctionExpression" && node.expression && !(allowVoid && expressionIsVoid(node.body))) {
						let suggest = [];
						allowVoid && suggest.push({
							messageId: "prependVoid",
							fix(fixer) {
								return voidPrependFixer(sourceCode, node.body, fixer);
							}
						}), node.body.type === "FunctionExpression" && !node.body.id || suggest.push({
							messageId: "wrapBraces",
							fix(fixer) {
								return curlyWrapFixer(sourceCode, node, fixer);
							}
						}), context.report({
							node: node.body,
							messageId: "returnsValue",
							suggest
						});
					}
				},
				onCodePathEnd() {
					funcInfo = funcInfo.upper;
				},
				ReturnStatement(node) {
					if (funcInfo.shouldCheck && node.argument) {
						if (!allowVoid) {
							context.report({
								node,
								messageId: "returnsValue"
							});
							return;
						}
						expressionIsVoid(node.argument) || context.report({
							node,
							messageId: "returnsValue",
							suggest: [{
								messageId: "prependVoid",
								fix(fixer) {
									return voidPrependFixer(sourceCode, node.argument, fixer);
								}
							}]
						});
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-promise-executor-return.cjs
module.exports = require_no_promise_executor_return().create;
//#endregion
