const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/eqeqeq.js
/**
* @fileoverview Rule to flag statements that use != and == instead of !== and ===
* @author Nicholas C. Zakas
*/
var require_eqeqeq = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			hasSuggestions: !0,
			docs: {
				description: "Require the use of `===` and `!==`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/eqeqeq"
			},
			schema: { anyOf: [{
				type: "array",
				items: [{ enum: ["always"] }, {
					type: "object",
					properties: { null: { enum: [
						"always",
						"never",
						"ignore"
					] } },
					additionalProperties: !1
				}],
				additionalItems: !1
			}, {
				type: "array",
				items: [{ enum: ["smart", "allow-null"] }],
				additionalItems: !1
			}] },
			fixable: "code",
			messages: {
				unexpected: "Expected '{{expectedOperator}}' and instead saw '{{actualOperator}}'.",
				replaceOperator: "Use '{{expectedOperator}}' instead of '{{actualOperator}}'."
			}
		},
		create(context) {
			let config = context.options[0] || "always", options = context.options[1] || {}, sourceCode = context.sourceCode, nullOption = config === "always" ? options.null || "always" : "ignore", enforceRuleForNull = nullOption === "always", enforceInverseRuleForNull = nullOption === "never";
			/**
			* Checks if an expression is a typeof expression
			* @param {ASTNode} node The node to check
			* @returns {boolean} if the node is a typeof expression
			*/
			function isTypeOf(node) {
				return node.type === "UnaryExpression" && node.operator === "typeof";
			}
			/**
			* Checks if either operand of a binary expression is a typeof operation
			* @param {ASTNode} node The node to check
			* @returns {boolean} if one of the operands is typeof
			* @private
			*/
			function isTypeOfBinary(node) {
				return isTypeOf(node.left) || isTypeOf(node.right);
			}
			/**
			* Checks if operands are literals of the same type (via typeof)
			* @param {ASTNode} node The node to check
			* @returns {boolean} if operands are of same type
			* @private
			*/
			function areLiteralsAndSameType(node) {
				return node.left.type === "Literal" && node.right.type === "Literal" && typeof node.left.value == typeof node.right.value;
			}
			/**
			* Checks if one of the operands is a literal null
			* @param {ASTNode} node The node to check
			* @returns {boolean} if operands are null
			* @private
			*/
			function isNullCheck(node) {
				return astUtils.isNullLiteral(node.right) || astUtils.isNullLiteral(node.left);
			}
			/**
			* Reports a message for this rule.
			* @param {ASTNode} node The binary expression node that was checked
			* @param {string} expectedOperator The operator that was expected (either '==', '!=', '===', or '!==')
			* @returns {void}
			* @private
			*/
			function report(node, expectedOperator) {
				let operatorToken = sourceCode.getFirstTokenBetween(node.left, node.right, (token) => token.value === node.operator), commonReportParams = {
					node,
					loc: operatorToken.loc,
					messageId: "unexpected",
					data: {
						expectedOperator,
						actualOperator: node.operator
					}
				};
				isTypeOfBinary(node) || areLiteralsAndSameType(node) ? context.report({
					...commonReportParams,
					fix(fixer) {
						return fixer.replaceText(operatorToken, expectedOperator);
					}
				}) : context.report({
					...commonReportParams,
					suggest: [{
						messageId: "replaceOperator",
						data: {
							expectedOperator,
							actualOperator: node.operator
						},
						fix: (fixer) => fixer.replaceText(operatorToken, expectedOperator)
					}]
				});
			}
			return { BinaryExpression(node) {
				let isNull = isNullCheck(node);
				if (node.operator !== "==" && node.operator !== "!=") {
					enforceInverseRuleForNull && isNull && report(node, node.operator.slice(0, -1));
					return;
				}
				config === "smart" && (isTypeOfBinary(node) || areLiteralsAndSameType(node) || isNull) || !enforceRuleForNull && isNull || report(node, `${node.operator}=`);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/eqeqeq.cjs
module.exports = require_eqeqeq().create;
//#endregion
