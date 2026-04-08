const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/space-infix-ops.js
/**
* @fileoverview Require spaces around infix operators
* @author Michael Ficarra
* @deprecated in ESLint v8.53.0
*/
var require_space_infix_ops = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { isEqToken } = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Formatting rules are being moved out of ESLint core.",
				url: "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
				deprecatedSince: "8.53.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "ESLint Stylistic now maintains deprecated stylistic core rules.",
					url: "https://eslint.style/guide/migration",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "space-infix-ops",
						url: "https://eslint.style/rules/space-infix-ops"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require spacing around infix operators",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/space-infix-ops"
			},
			fixable: "whitespace",
			schema: [{
				type: "object",
				properties: { int32Hint: {
					type: "boolean",
					default: !1
				} },
				additionalProperties: !1
			}],
			messages: { missingSpace: "Operator '{{operator}}' must be spaced." }
		},
		create(context) {
			let int32Hint = context.options[0] ? context.options[0].int32Hint === !0 : !1, sourceCode = context.sourceCode;
			/**
			* Returns the first token which violates the rule
			* @param {ASTNode} left The left node of the main node
			* @param {ASTNode} right The right node of the main node
			* @param {string} op The operator of the main node
			* @returns {Object} The violator token or null
			* @private
			*/
			function getFirstNonSpacedToken(left, right, op) {
				let operator = sourceCode.getFirstTokenBetween(left, right, (token) => token.value === op), prev = sourceCode.getTokenBefore(operator), next = sourceCode.getTokenAfter(operator);
				return !sourceCode.isSpaceBetweenTokens(prev, operator) || !sourceCode.isSpaceBetweenTokens(operator, next) ? operator : null;
			}
			/**
			* Reports an AST node as a rule violation
			* @param {ASTNode} mainNode The node to report
			* @param {Object} culpritToken The token which has a problem
			* @returns {void}
			* @private
			*/
			function report(mainNode, culpritToken) {
				context.report({
					node: mainNode,
					loc: culpritToken.loc,
					messageId: "missingSpace",
					data: { operator: culpritToken.value },
					fix(fixer) {
						let previousToken = sourceCode.getTokenBefore(culpritToken), afterToken = sourceCode.getTokenAfter(culpritToken), fixString = "";
						return culpritToken.range[0] - previousToken.range[1] === 0 && (fixString = " "), fixString += culpritToken.value, afterToken.range[0] - culpritToken.range[1] === 0 && (fixString += " "), fixer.replaceText(culpritToken, fixString);
					}
				});
			}
			/**
			* Check if the node is binary then report
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function checkBinary(node) {
				let leftNode = node.left.typeAnnotation ? node.left.typeAnnotation : node.left, rightNode = node.right, nonSpacedNode = getFirstNonSpacedToken(leftNode, rightNode, node.operator || "=");
				nonSpacedNode && (int32Hint && sourceCode.getText(node).endsWith("|0") || report(node, nonSpacedNode));
			}
			/**
			* Check if the node is conditional
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function checkConditional(node) {
				let nonSpacedConsequentNode = getFirstNonSpacedToken(node.test, node.consequent, "?"), nonSpacedAlternateNode = getFirstNonSpacedToken(node.consequent, node.alternate, ":");
				nonSpacedConsequentNode && report(node, nonSpacedConsequentNode), nonSpacedAlternateNode && report(node, nonSpacedAlternateNode);
			}
			/**
			* Check if the node is a variable
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function checkVar(node) {
				let leftNode = node.id.typeAnnotation ? node.id.typeAnnotation : node.id, rightNode = node.init;
				if (rightNode) {
					let nonSpacedNode = getFirstNonSpacedToken(leftNode, rightNode, "=");
					nonSpacedNode && report(node, nonSpacedNode);
				}
			}
			return {
				AssignmentExpression: checkBinary,
				AssignmentPattern: checkBinary,
				BinaryExpression: checkBinary,
				LogicalExpression: checkBinary,
				ConditionalExpression: checkConditional,
				VariableDeclarator: checkVar,
				PropertyDefinition(node) {
					if (!node.value) return;
					let operatorToken = sourceCode.getTokenBefore(node.value, isEqToken), leftToken = sourceCode.getTokenBefore(operatorToken), rightToken = sourceCode.getTokenAfter(operatorToken);
					(!sourceCode.isSpaceBetweenTokens(leftToken, operatorToken) || !sourceCode.isSpaceBetweenTokens(operatorToken, rightToken)) && report(node, operatorToken);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/space-infix-ops.cjs
module.exports = require_space_infix_ops().create;
//#endregion
