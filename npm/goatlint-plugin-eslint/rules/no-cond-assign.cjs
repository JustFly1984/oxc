const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-cond-assign.js
/**
* @fileoverview Rule to flag assignment in a conditional statement's test expression
* @author Stephen Murray <spmurrayzzz>
*/
var require_no_cond_assign = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), TEST_CONDITION_PARENT_TYPES = new Set([
		"IfStatement",
		"WhileStatement",
		"DoWhileStatement",
		"ForStatement",
		"ConditionalExpression"
	]), NODE_DESCRIPTIONS = {
		DoWhileStatement: "a 'do...while' statement",
		ForStatement: "a 'for' statement",
		IfStatement: "an 'if' statement",
		WhileStatement: "a 'while' statement"
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: ["except-parens"],
			docs: {
				description: "Disallow assignment operators in conditional expressions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-cond-assign"
			},
			schema: [{ enum: ["except-parens", "always"] }],
			messages: {
				unexpected: "Unexpected assignment within {{type}}.",
				missing: "Expected a conditional expression and instead saw an assignment."
			}
		},
		create(context) {
			let [prohibitAssign] = context.options, sourceCode = context.sourceCode;
			/**
			* Check whether an AST node is the test expression for a conditional statement.
			* @param {!Object} node The node to test.
			* @returns {boolean} `true` if the node is the text expression for a conditional statement; otherwise, `false`.
			*/
			function isConditionalTestExpression(node) {
				return node.parent && TEST_CONDITION_PARENT_TYPES.has(node.parent.type) && node === node.parent.test;
			}
			/**
			* Given an AST node, perform a bottom-up search for the first ancestor that represents a conditional statement.
			* @param {!Object} node The node to use at the start of the search.
			* @returns {?Object} The closest ancestor node that represents a conditional statement.
			*/
			function findConditionalAncestor(node) {
				let currentAncestor = node;
				do
					if (isConditionalTestExpression(currentAncestor)) return currentAncestor.parent;
				while ((currentAncestor = currentAncestor.parent) && !astUtils.isFunction(currentAncestor));
				return null;
			}
			/**
			* Check whether the code represented by an AST node is enclosed in two sets of parentheses.
			* @param {!Object} node The node to test.
			* @returns {boolean} `true` if the code is enclosed in two sets of parentheses; otherwise, `false`.
			*/
			function isParenthesisedTwice(node) {
				let previousToken = sourceCode.getTokenBefore(node, 1), nextToken = sourceCode.getTokenAfter(node, 1);
				return astUtils.isParenthesised(sourceCode, node) && previousToken && astUtils.isOpeningParenToken(previousToken) && previousToken.range[1] <= node.range[0] && astUtils.isClosingParenToken(nextToken) && nextToken.range[0] >= node.range[1];
			}
			/**
			* Check a conditional statement's test expression for top-level assignments that are not enclosed in parentheses.
			* @param {!Object} node The node for the conditional statement.
			* @returns {void}
			*/
			function testForAssign(node) {
				node.test && node.test.type === "AssignmentExpression" && (node.type === "ForStatement" ? !astUtils.isParenthesised(sourceCode, node.test) : !isParenthesisedTwice(node.test)) && context.report({
					node: node.test,
					messageId: "missing"
				});
			}
			/**
			* Check whether an assignment expression is descended from a conditional statement's test expression.
			* @param {!Object} node The node for the assignment expression.
			* @returns {void}
			*/
			function testForConditionalAncestor(node) {
				let ancestor = findConditionalAncestor(node);
				ancestor && context.report({
					node,
					messageId: "unexpected",
					data: { type: NODE_DESCRIPTIONS[ancestor.type] || ancestor.type }
				});
			}
			return prohibitAssign === "always" ? { AssignmentExpression: testForConditionalAncestor } : {
				DoWhileStatement: testForAssign,
				ForStatement: testForAssign,
				IfStatement: testForAssign,
				WhileStatement: testForAssign,
				ConditionalExpression: testForAssign
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-cond-assign.cjs
module.exports = require_no_cond_assign().create;
//#endregion
