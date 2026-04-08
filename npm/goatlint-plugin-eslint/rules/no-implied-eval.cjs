const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-implied-eval.js
/**
* @fileoverview Rule to flag use of implied eval via setTimeout and setInterval
* @author James Allardice
*/
var require_no_implied_eval = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), { getStaticValue } = require_eslint_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow the use of `eval()`-like methods",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-implied-eval"
			},
			schema: [],
			messages: {
				impliedEval: "Implied eval. Consider passing a function instead of a string.",
				execScript: "Implied eval. Do not use execScript()."
			}
		},
		create(context) {
			let GLOBAL_CANDIDATES = Object.freeze([
				"global",
				"window",
				"globalThis"
			]), EVAL_LIKE_FUNC_PATTERN = /^(?:set(?:Interval|Timeout)|execScript)$/u, sourceCode = context.sourceCode;
			/**
			* Checks whether a node is evaluated as a string or not.
			* @param {ASTNode} node A node to check.
			* @returns {boolean} True if the node is evaluated as a string.
			*/
			function isEvaluatedString(node) {
				return node.type === "Literal" && typeof node.value == "string" || node.type === "TemplateLiteral" ? !0 : node.type === "BinaryExpression" && node.operator === "+" ? isEvaluatedString(node.left) || isEvaluatedString(node.right) : !1;
			}
			/**
			* Reports if the `CallExpression` node has evaluated argument.
			* @param {ASTNode} node A CallExpression to check.
			* @returns {void}
			*/
			function reportImpliedEvalCallExpression(node) {
				let [firstArgument] = node.arguments;
				if (firstArgument) {
					let staticValue = getStaticValue(firstArgument, sourceCode.getScope(node));
					if (staticValue && typeof staticValue.value == "string" || isEvaluatedString(firstArgument)) {
						let isExecScript = (node.callee.type === "Identifier" ? node.callee.name : astUtils.getStaticPropertyName(node.callee)) === "execScript";
						context.report({
							node,
							messageId: isExecScript ? "execScript" : "impliedEval"
						});
					}
				}
			}
			/**
			* Reports calls of `implied eval` via the global references.
			* @param {Variable} globalVar A global variable to check.
			* @returns {void}
			*/
			function reportImpliedEvalViaGlobal(globalVar) {
				let { references, name } = globalVar;
				references.forEach((ref) => {
					let node = ref.identifier.parent;
					for (; astUtils.isSpecificMemberAccess(node, null, name);) node = node.parent;
					if (astUtils.isSpecificMemberAccess(node, null, EVAL_LIKE_FUNC_PATTERN)) {
						let calleeNode = node.parent.type === "ChainExpression" ? node.parent : node, parent = calleeNode.parent;
						parent.type === "CallExpression" && parent.callee === calleeNode && reportImpliedEvalCallExpression(parent);
					}
				});
			}
			return {
				CallExpression(node) {
					astUtils.isSpecificId(node.callee, EVAL_LIKE_FUNC_PATTERN) && sourceCode.isGlobalReference(node.callee) && reportImpliedEvalCallExpression(node);
				},
				"Program:exit"(node) {
					let globalScope = sourceCode.getScope(node);
					GLOBAL_CANDIDATES.map((candidate) => astUtils.getVariableByName(globalScope, candidate)).filter((globalVar) => !!globalVar && globalVar.defs.length === 0).forEach(reportImpliedEvalViaGlobal);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-implied-eval.cjs
module.exports = require_no_implied_eval().create;
//#endregion
