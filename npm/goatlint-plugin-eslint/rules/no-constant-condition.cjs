const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-constant-condition.js
/**
* @fileoverview Rule to flag use constant conditions
* @author Christian Schulz <http://rndm.de>
*/
var require_no_constant_condition = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { isConstant } = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{ checkLoops: "allExceptWhileTrue" }],
			docs: {
				description: "Disallow constant expressions in conditions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-constant-condition"
			},
			schema: [{
				type: "object",
				properties: { checkLoops: { enum: [
					"all",
					"allExceptWhileTrue",
					"none",
					!0,
					!1
				] } },
				additionalProperties: !1
			}],
			messages: { unexpected: "Unexpected constant condition." }
		},
		create(context) {
			let loopSetStack = [], sourceCode = context.sourceCode, [{ checkLoops }] = context.options;
			checkLoops === !0 ? checkLoops = "all" : checkLoops === !1 && (checkLoops = "none");
			let loopsInCurrentScope = /* @__PURE__ */ new Set();
			/**
			* Tracks when the given node contains a constant condition.
			* @param {ASTNode} node The AST node to check.
			* @returns {void}
			* @private
			*/
			function trackConstantConditionLoop(node) {
				node.test && isConstant(sourceCode.getScope(node), node.test, !0) && loopsInCurrentScope.add(node);
			}
			/**
			* Reports when the set contains the given constant condition node
			* @param {ASTNode} node The AST node to check.
			* @returns {void}
			* @private
			*/
			function checkConstantConditionLoopInSet(node) {
				loopsInCurrentScope.has(node) && (loopsInCurrentScope.delete(node), context.report({
					node: node.test,
					messageId: "unexpected"
				}));
			}
			/**
			* Reports when the given node contains a constant condition.
			* @param {ASTNode} node The AST node to check.
			* @returns {void}
			* @private
			*/
			function reportIfConstant(node) {
				node.test && isConstant(sourceCode.getScope(node), node.test, !0) && context.report({
					node: node.test,
					messageId: "unexpected"
				});
			}
			/**
			* Stores current set of constant loops in loopSetStack temporarily
			* and uses a new set to track constant loops
			* @returns {void}
			* @private
			*/
			function enterFunction() {
				loopSetStack.push(loopsInCurrentScope), loopsInCurrentScope = /* @__PURE__ */ new Set();
			}
			/**
			* Reports when the set still contains stored constant conditions
			* @returns {void}
			* @private
			*/
			function exitFunction() {
				loopsInCurrentScope = loopSetStack.pop();
			}
			/**
			* Checks node when checkLoops option is enabled
			* @param {ASTNode} node The AST node to check.
			* @returns {void}
			* @private
			*/
			function checkLoop(node) {
				(checkLoops === "all" || checkLoops === "allExceptWhileTrue") && trackConstantConditionLoop(node);
			}
			return {
				ConditionalExpression: reportIfConstant,
				IfStatement: reportIfConstant,
				WhileStatement(node) {
					node.test.type === "Literal" && node.test.value === !0 && checkLoops === "allExceptWhileTrue" || checkLoop(node);
				},
				"WhileStatement:exit": checkConstantConditionLoopInSet,
				DoWhileStatement: checkLoop,
				"DoWhileStatement:exit": checkConstantConditionLoopInSet,
				ForStatement: checkLoop,
				"ForStatement > .test": (node) => checkLoop(node.parent),
				"ForStatement:exit": checkConstantConditionLoopInSet,
				FunctionDeclaration: enterFunction,
				"FunctionDeclaration:exit": exitFunction,
				FunctionExpression: enterFunction,
				"FunctionExpression:exit": exitFunction,
				YieldExpression: () => loopsInCurrentScope.clear()
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-constant-condition.cjs
module.exports = require_no_constant_condition().create;
//#endregion
