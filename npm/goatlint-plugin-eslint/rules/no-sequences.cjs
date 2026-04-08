const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-sequences.js
/**
* @fileoverview Rule to flag use of comma operator
* @author Brandon Mills
*/
var require_no_sequences = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow comma operators",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-sequences"
			},
			schema: [{
				type: "object",
				properties: { allowInParentheses: { type: "boolean" } },
				additionalProperties: !1
			}],
			defaultOptions: [{ allowInParentheses: !0 }],
			messages: { unexpectedCommaExpression: "Unexpected use of comma operator." }
		},
		create(context) {
			let [{ allowInParentheses }] = context.options, sourceCode = context.sourceCode, parenthesized = {
				DoWhileStatement: "test",
				IfStatement: "test",
				SwitchStatement: "discriminant",
				WhileStatement: "test",
				WithStatement: "object",
				ArrowFunctionExpression: "body"
			};
			/**
			* Determines whether a node is required by the grammar to be wrapped in
			* parens, e.g. the test of an if statement.
			* @param {ASTNode} node The AST node
			* @returns {boolean} True if parens around node belong to parent node.
			*/
			function requiresExtraParens(node) {
				return node.parent && parenthesized[node.parent.type] && node === node.parent[parenthesized[node.parent.type]];
			}
			/**
			* Check if a node is wrapped in parens.
			* @param {ASTNode} node The AST node
			* @returns {boolean} True if the node has a paren on each side.
			*/
			function isParenthesised(node) {
				return astUtils.isParenthesised(sourceCode, node);
			}
			/**
			* Check if a node is wrapped in two levels of parens.
			* @param {ASTNode} node The AST node
			* @returns {boolean} True if two parens surround the node on each side.
			*/
			function isParenthesisedTwice(node) {
				let previousToken = sourceCode.getTokenBefore(node, 1), nextToken = sourceCode.getTokenAfter(node, 1);
				return isParenthesised(node) && previousToken && nextToken && astUtils.isOpeningParenToken(previousToken) && previousToken.range[1] <= node.range[0] && astUtils.isClosingParenToken(nextToken) && nextToken.range[0] >= node.range[1];
			}
			return { SequenceExpression(node) {
				if (node.parent.type === "ForStatement" && (node === node.parent.init || node === node.parent.update)) return;
				if (allowInParentheses) {
					if (requiresExtraParens(node)) {
						if (isParenthesisedTwice(node)) return;
					} else if (isParenthesised(node)) return;
				}
				let firstCommaToken = sourceCode.getTokenAfter(node.expressions[0], astUtils.isCommaToken);
				context.report({
					node,
					loc: firstCommaToken.loc,
					messageId: "unexpectedCommaExpression"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-sequences.cjs
module.exports = require_no_sequences().create;
//#endregion
