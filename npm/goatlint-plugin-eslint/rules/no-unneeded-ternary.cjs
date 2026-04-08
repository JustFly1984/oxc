const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unneeded-ternary.js
/**
* @fileoverview Rule to flag no-unneeded-ternary
* @author Gyandeep Singh
*/
var require_no_unneeded_ternary = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), BOOLEAN_OPERATORS = new Set([
		"==",
		"===",
		"!=",
		"!==",
		">",
		">=",
		"<",
		"<=",
		"in",
		"instanceof"
	]), OPERATOR_INVERSES = {
		"==": "!=",
		"!=": "==",
		"===": "!==",
		"!==": "==="
	}, OR_PRECEDENCE = astUtils.getPrecedence({
		type: "LogicalExpression",
		operator: "||"
	});
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ defaultAssignment: !0 }],
			docs: {
				description: "Disallow ternary operators when simpler alternatives exist",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-unneeded-ternary"
			},
			schema: [{
				type: "object",
				properties: { defaultAssignment: { type: "boolean" } },
				additionalProperties: !1
			}],
			fixable: "code",
			messages: {
				unnecessaryConditionalExpression: "Unnecessary use of boolean literals in conditional expression.",
				unnecessaryConditionalAssignment: "Unnecessary use of conditional expression for default assignment."
			}
		},
		create(context) {
			let [{ defaultAssignment }] = context.options, sourceCode = context.sourceCode;
			/**
			* Test if the node is a boolean literal
			* @param {ASTNode} node The node to report.
			* @returns {boolean} True if the its a boolean literal
			* @private
			*/
			function isBooleanLiteral(node) {
				return node.type === "Literal" && typeof node.value == "boolean";
			}
			/**
			* Creates an expression that represents the boolean inverse of the expression represented by the original node
			* @param {ASTNode} node A node representing an expression
			* @returns {string} A string representing an inverted expression
			*/
			function invertExpression(node) {
				if (node.type === "BinaryExpression" && Object.hasOwn(OPERATOR_INVERSES, node.operator)) {
					let operatorToken = sourceCode.getFirstTokenBetween(node.left, node.right, (token) => token.value === node.operator), text = sourceCode.getText();
					return text.slice(node.range[0], operatorToken.range[0]) + OPERATOR_INVERSES[node.operator] + text.slice(operatorToken.range[1], node.range[1]);
				}
				return astUtils.getPrecedence(node) < astUtils.getPrecedence({ type: "UnaryExpression" }) ? `!(${astUtils.getParenthesisedText(sourceCode, node)})` : `!${astUtils.getParenthesisedText(sourceCode, node)}`;
			}
			/**
			* Tests if a given node always evaluates to a boolean value
			* @param {ASTNode} node An expression node
			* @returns {boolean} True if it is determined that the node will always evaluate to a boolean value
			*/
			function isBooleanExpression(node) {
				return node.type === "BinaryExpression" && BOOLEAN_OPERATORS.has(node.operator) || node.type === "UnaryExpression" && node.operator === "!";
			}
			/**
			* Test if the node matches the pattern id ? id : expression
			* @param {ASTNode} node The ConditionalExpression to check.
			* @returns {boolean} True if the pattern is matched, and false otherwise
			* @private
			*/
			function matchesDefaultAssignment(node) {
				return node.test.type === "Identifier" && node.consequent.type === "Identifier" && node.test.name === node.consequent.name;
			}
			return { ConditionalExpression(node) {
				isBooleanLiteral(node.alternate) && isBooleanLiteral(node.consequent) ? context.report({
					node,
					messageId: "unnecessaryConditionalExpression",
					fix(fixer) {
						return node.consequent.value === node.alternate.value ? node.test.type === "Identifier" ? fixer.replaceText(node, node.consequent.value.toString()) : null : node.alternate.value ? fixer.replaceText(node, invertExpression(node.test)) : fixer.replaceText(node, isBooleanExpression(node.test) ? astUtils.getParenthesisedText(sourceCode, node.test) : `!${invertExpression(node.test)}`);
					}
				}) : !defaultAssignment && matchesDefaultAssignment(node) && context.report({
					node,
					messageId: "unnecessaryConditionalAssignment",
					fix(fixer) {
						let alternateText = (astUtils.getPrecedence(node.alternate) < OR_PRECEDENCE || astUtils.isCoalesceExpression(node.alternate)) && !astUtils.isParenthesised(sourceCode, node.alternate) ? `(${sourceCode.getText(node.alternate)})` : astUtils.getParenthesisedText(sourceCode, node.alternate), testText = astUtils.getParenthesisedText(sourceCode, node.test);
						return fixer.replaceText(node, `${testText} || ${alternateText}`);
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unneeded-ternary.cjs
module.exports = require_no_unneeded_ternary().create;
//#endregion
