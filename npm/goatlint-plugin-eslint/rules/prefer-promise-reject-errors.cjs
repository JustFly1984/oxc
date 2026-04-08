const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-promise-reject-errors.js
/**
* @fileoverview restrict values that can be used as Promise rejection reasons
* @author Teddy Katz
*/
var require_prefer_promise_reject_errors = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ allowEmptyReject: !1 }],
			docs: {
				description: "Require using Error objects as Promise rejection reasons",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/prefer-promise-reject-errors"
			},
			fixable: null,
			schema: [{
				type: "object",
				properties: { allowEmptyReject: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { rejectAnError: "Expected the Promise rejection reason to be an Error." }
		},
		create(context) {
			let [{ allowEmptyReject }] = context.options, sourceCode = context.sourceCode;
			/**
			* Checks the argument of a reject() or Promise.reject() CallExpression, and reports it if it can't be an Error
			* @param {ASTNode} callExpression A CallExpression node which is used to reject a Promise
			* @returns {void}
			*/
			function checkRejectCall(callExpression) {
				!callExpression.arguments.length && allowEmptyReject || (!callExpression.arguments.length || !astUtils.couldBeError(callExpression.arguments[0]) || callExpression.arguments[0].type === "Identifier" && callExpression.arguments[0].name === "undefined") && context.report({
					node: callExpression,
					messageId: "rejectAnError"
				});
			}
			/**
			* Determines whether a function call is a Promise.reject() call
			* @param {ASTNode} node A CallExpression node
			* @returns {boolean} `true` if the call is a Promise.reject() call
			*/
			function isPromiseRejectCall(node) {
				return astUtils.isSpecificMemberAccess(node.callee, "Promise", "reject");
			}
			return {
				CallExpression(node) {
					isPromiseRejectCall(node) && checkRejectCall(node);
				},
				"NewExpression:exit"(node) {
					node.callee.type === "Identifier" && node.callee.name === "Promise" && node.arguments.length && astUtils.isFunction(node.arguments[0]) && node.arguments[0].params.length > 1 && node.arguments[0].params[1].type === "Identifier" && sourceCode.getDeclaredVariables(node.arguments[0]).find((variable) => variable.name === node.arguments[0].params[1].name).references.filter((ref) => ref.isRead()).filter((ref) => ref.identifier.parent.type === "CallExpression" && ref.identifier === ref.identifier.parent.callee).forEach((ref) => checkRejectCall(ref.identifier.parent));
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-promise-reject-errors.cjs
module.exports = require_prefer_promise_reject_errors().create;
//#endregion
