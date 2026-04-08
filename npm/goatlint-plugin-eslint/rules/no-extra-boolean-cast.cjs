const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-extra-boolean-cast.js
/**
* @fileoverview Rule to flag unnecessary double negation in Boolean contexts
* @author Brandon Mills
*/
var require_no_extra_boolean_cast = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), eslintUtils = require_eslint_utils$1.t(), precedence = astUtils.getPrecedence;
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{}],
			docs: {
				description: "Disallow unnecessary boolean casts",
				recommended: !0,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-extra-boolean-cast"
			},
			schema: [{ anyOf: [{
				type: "object",
				properties: { enforceForInnerExpressions: { type: "boolean" } },
				additionalProperties: !1
			}, {
				type: "object",
				properties: { enforceForLogicalOperands: { type: "boolean" } },
				additionalProperties: !1
			}] }],
			fixable: "code",
			messages: {
				unexpectedCall: "Redundant Boolean call.",
				unexpectedNegation: "Redundant double negation."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ enforceForLogicalOperands, enforceForInnerExpressions }] = context.options, BOOLEAN_NODE_TYPES = new Set([
				"IfStatement",
				"DoWhileStatement",
				"WhileStatement",
				"ConditionalExpression",
				"ForStatement"
			]);
			/**
			* Check if a node is a Boolean function or constructor.
			* @param {ASTNode} node the node
			* @returns {boolean} If the node is Boolean function or constructor
			*/
			function isBooleanFunctionOrConstructorCall(node) {
				return (node.type === "CallExpression" || node.type === "NewExpression") && node.callee.type === "Identifier" && node.callee.name === "Boolean";
			}
			/**
			* Check if a node is in a context where its value would be coerced to a boolean at runtime.
			* @param {ASTNode} node The node
			* @returns {boolean} If it is in a boolean context
			*/
			function isInBooleanContext(node) {
				return isBooleanFunctionOrConstructorCall(node.parent) && node === node.parent.arguments[0] || BOOLEAN_NODE_TYPES.has(node.parent.type) && node === node.parent.test || node.parent.type === "UnaryExpression" && node.parent.operator === "!";
			}
			/**
			* Checks whether the node is a context that should report an error
			* Acts recursively if it is in a logical context
			* @param {ASTNode} node the node
			* @returns {boolean} If the node is in one of the flagged contexts
			*/
			function isInFlaggedContext(node) {
				return node.parent.type === "ChainExpression" || (enforceForLogicalOperands || enforceForInnerExpressions) && node.parent.type === "LogicalExpression" && (node.parent.operator === "||" || node.parent.operator === "&&" || enforceForInnerExpressions && node.parent.operator === "??" && node.parent.right === node) || enforceForInnerExpressions && (node.parent.type === "ConditionalExpression" && (node.parent.consequent === node || node.parent.alternate === node) || node.parent.type === "SequenceExpression" && node.parent.expressions.at(-1) === node) ? isInFlaggedContext(node.parent) : isInBooleanContext(node);
			}
			/**
			* Check if a node has comments inside.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} `true` if it has comments inside.
			*/
			function hasCommentsInside(node) {
				return !!sourceCode.getCommentsInside(node).length;
			}
			/**
			* Checks if the given node is wrapped in grouping parentheses. Parentheses for constructs such as if() don't count.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} `true` if the node is parenthesized.
			* @private
			*/
			function isParenthesized(node) {
				return eslintUtils.isParenthesized(1, node, sourceCode);
			}
			/**
			* Determines whether the given node needs to be parenthesized when replacing the previous node.
			* It assumes that `previousNode` is the node to be reported by this rule, so it has a limited list
			* of possible parent node types. By the same assumption, the node's role in a particular parent is already known.
			* @param {ASTNode} previousNode Previous node.
			* @param {ASTNode} node The node to check.
			* @throws {Error} (Unreachable.)
			* @returns {boolean} `true` if the node needs to be parenthesized.
			*/
			function needsParens(previousNode, node) {
				if (previousNode.parent.type === "ChainExpression") return needsParens(previousNode.parent, node);
				if (isParenthesized(previousNode)) return !1;
				let parent = previousNode.parent;
				switch (parent.type) {
					case "CallExpression":
					case "NewExpression": return node.type === "SequenceExpression";
					case "IfStatement":
					case "DoWhileStatement":
					case "WhileStatement":
					case "ForStatement":
					case "SequenceExpression": return !1;
					case "ConditionalExpression":
						if (previousNode === parent.test) return precedence(node) <= precedence(parent);
						if (previousNode === parent.consequent || previousNode === parent.alternate) return precedence(node) < precedence({ type: "AssignmentExpression" });
						/* c8 ignore next */
						throw Error("Ternary child must be test, consequent, or alternate.");
					case "UnaryExpression": return precedence(node) < precedence(parent);
					case "LogicalExpression": return astUtils.isMixedLogicalAndCoalesceExpressions(node, parent) ? !0 : previousNode === parent.left ? precedence(node) < precedence(parent) : precedence(node) <= precedence(parent);
					default: throw Error(`Unexpected parent type: ${parent.type}`);
				}
			}
			return {
				UnaryExpression(node) {
					let parent = node.parent;
					node.operator !== "!" || parent.type !== "UnaryExpression" || parent.operator !== "!" || isInFlaggedContext(parent) && context.report({
						node: parent,
						messageId: "unexpectedNegation",
						fix(fixer) {
							if (hasCommentsInside(parent)) return null;
							if (needsParens(parent, node.argument)) return fixer.replaceText(parent, `(${sourceCode.getText(node.argument)})`);
							let prefix = "", tokenBefore = sourceCode.getTokenBefore(parent), firstReplacementToken = sourceCode.getFirstToken(node.argument);
							return tokenBefore && tokenBefore.range[1] === parent.range[0] && !astUtils.canTokensBeAdjacent(tokenBefore, firstReplacementToken) && (prefix = " "), fixer.replaceText(parent, prefix + sourceCode.getText(node.argument));
						}
					});
				},
				CallExpression(node) {
					node.callee.type !== "Identifier" || node.callee.name !== "Boolean" || isInFlaggedContext(node) && context.report({
						node,
						messageId: "unexpectedCall",
						fix(fixer) {
							let parent = node.parent;
							if (node.arguments.length === 0) {
								if (parent.type === "UnaryExpression" && parent.operator === "!") {
									if (hasCommentsInside(parent)) return null;
									let replacement = "true", prefix = "", tokenBefore = sourceCode.getTokenBefore(parent);
									return tokenBefore && tokenBefore.range[1] === parent.range[0] && !astUtils.canTokensBeAdjacent(tokenBefore, replacement) && (prefix = " "), fixer.replaceText(parent, prefix + replacement);
								}
								return hasCommentsInside(node) ? null : fixer.replaceText(node, "false");
							}
							if (node.arguments.length === 1) {
								let argument = node.arguments[0];
								return argument.type === "SpreadElement" || hasCommentsInside(node) ? null : needsParens(node, argument) ? fixer.replaceText(node, `(${sourceCode.getText(argument)})`) : fixer.replaceText(node, sourceCode.getText(argument));
							}
							return null;
						}
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-extra-boolean-cast.cjs
module.exports = require_no_extra_boolean_cast().create;
//#endregion
