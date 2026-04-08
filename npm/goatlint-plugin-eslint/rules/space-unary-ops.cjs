const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/space-unary-ops.js
/**
* @fileoverview This rule should require or disallow spaces before or after unary operations.
* @author Marcin Kumorek
* @deprecated in ESLint v8.53.0
*/
var require_space_unary_ops = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
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
						name: "space-unary-ops",
						url: "https://eslint.style/rules/space-unary-ops"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent spacing before or after unary operators",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/space-unary-ops"
			},
			fixable: "whitespace",
			schema: [{
				type: "object",
				properties: {
					words: {
						type: "boolean",
						default: !0
					},
					nonwords: {
						type: "boolean",
						default: !1
					},
					overrides: {
						type: "object",
						additionalProperties: { type: "boolean" }
					}
				},
				additionalProperties: !1
			}],
			messages: {
				unexpectedBefore: "Unexpected space before unary operator '{{operator}}'.",
				unexpectedAfter: "Unexpected space after unary operator '{{operator}}'.",
				unexpectedAfterWord: "Unexpected space after unary word operator '{{word}}'.",
				wordOperator: "Unary word operator '{{word}}' must be followed by whitespace.",
				operator: "Unary operator '{{operator}}' must be followed by whitespace.",
				beforeUnaryExpressions: "Space is required before unary expressions '{{token}}'."
			}
		},
		create(context) {
			let options = context.options[0] || {
				words: !0,
				nonwords: !1
			}, sourceCode = context.sourceCode;
			/**
			* Check if the node is the first "!" in a "!!" convert to Boolean expression
			* @param {ASTnode} node AST node
			* @returns {boolean} Whether or not the node is first "!" in "!!"
			*/
			function isFirstBangInBangBangExpression(node) {
				return node && node.type === "UnaryExpression" && node.argument.operator === "!" && node.argument && node.argument.type === "UnaryExpression" && node.argument.operator === "!";
			}
			/**
			* Checks if an override exists for a given operator.
			* @param {string} operator Operator
			* @returns {boolean} Whether or not an override has been provided for the operator
			*/
			function overrideExistsForOperator(operator) {
				return options.overrides && Object.hasOwn(options.overrides, operator);
			}
			/**
			* Gets the value that the override was set to for this operator
			* @param {string} operator Operator
			* @returns {boolean} Whether or not an override enforces a space with this operator
			*/
			function overrideEnforcesSpaces(operator) {
				return options.overrides[operator];
			}
			/**
			* Verify Unary Word Operator has spaces after the word operator
			* @param {ASTnode} node AST node
			* @param {Object} firstToken first token from the AST node
			* @param {Object} secondToken second token from the AST node
			* @param {string} word The word to be used for reporting
			* @returns {void}
			*/
			function verifyWordHasSpaces(node, firstToken, secondToken, word) {
				secondToken.range[0] === firstToken.range[1] && context.report({
					node,
					messageId: "wordOperator",
					data: { word },
					fix(fixer) {
						return fixer.insertTextAfter(firstToken, " ");
					}
				});
			}
			/**
			* Verify Unary Word Operator doesn't have spaces after the word operator
			* @param {ASTnode} node AST node
			* @param {Object} firstToken first token from the AST node
			* @param {Object} secondToken second token from the AST node
			* @param {string} word The word to be used for reporting
			* @returns {void}
			*/
			function verifyWordDoesntHaveSpaces(node, firstToken, secondToken, word) {
				astUtils.canTokensBeAdjacent(firstToken, secondToken) && secondToken.range[0] > firstToken.range[1] && context.report({
					node,
					messageId: "unexpectedAfterWord",
					data: { word },
					fix(fixer) {
						return fixer.removeRange([firstToken.range[1], secondToken.range[0]]);
					}
				});
			}
			/**
			* Check Unary Word Operators for spaces after the word operator
			* @param {ASTnode} node AST node
			* @param {Object} firstToken first token from the AST node
			* @param {Object} secondToken second token from the AST node
			* @param {string} word The word to be used for reporting
			* @returns {void}
			*/
			function checkUnaryWordOperatorForSpaces(node, firstToken, secondToken, word) {
				overrideExistsForOperator(word) ? overrideEnforcesSpaces(word) ? verifyWordHasSpaces(node, firstToken, secondToken, word) : verifyWordDoesntHaveSpaces(node, firstToken, secondToken, word) : options.words ? verifyWordHasSpaces(node, firstToken, secondToken, word) : verifyWordDoesntHaveSpaces(node, firstToken, secondToken, word);
			}
			/**
			* Verifies YieldExpressions satisfy spacing requirements
			* @param {ASTnode} node AST node
			* @returns {void}
			*/
			function checkForSpacesAfterYield(node) {
				let tokens = sourceCode.getFirstTokens(node, 3);
				!node.argument || node.delegate || checkUnaryWordOperatorForSpaces(node, tokens[0], tokens[1], "yield");
			}
			/**
			* Verifies AwaitExpressions satisfy spacing requirements
			* @param {ASTNode} node AwaitExpression AST node
			* @returns {void}
			*/
			function checkForSpacesAfterAwait(node) {
				let tokens = sourceCode.getFirstTokens(node, 3);
				checkUnaryWordOperatorForSpaces(node, tokens[0], tokens[1], "await");
			}
			/**
			* Verifies UnaryExpression, UpdateExpression and NewExpression have spaces before or after the operator
			* @param {ASTnode} node AST node
			* @param {Object} firstToken First token in the expression
			* @param {Object} secondToken Second token in the expression
			* @returns {void}
			*/
			function verifyNonWordsHaveSpaces(node, firstToken, secondToken) {
				if (node.prefix) {
					if (isFirstBangInBangBangExpression(node)) return;
					firstToken.range[1] === secondToken.range[0] && context.report({
						node,
						messageId: "operator",
						data: { operator: firstToken.value },
						fix(fixer) {
							return fixer.insertTextAfter(firstToken, " ");
						}
					});
				} else firstToken.range[1] === secondToken.range[0] && context.report({
					node,
					messageId: "beforeUnaryExpressions",
					data: { token: secondToken.value },
					fix(fixer) {
						return fixer.insertTextBefore(secondToken, " ");
					}
				});
			}
			/**
			* Verifies UnaryExpression, UpdateExpression and NewExpression don't have spaces before or after the operator
			* @param {ASTnode} node AST node
			* @param {Object} firstToken First token in the expression
			* @param {Object} secondToken Second token in the expression
			* @returns {void}
			*/
			function verifyNonWordsDontHaveSpaces(node, firstToken, secondToken) {
				node.prefix ? secondToken.range[0] > firstToken.range[1] && context.report({
					node,
					messageId: "unexpectedAfter",
					data: { operator: firstToken.value },
					fix(fixer) {
						return astUtils.canTokensBeAdjacent(firstToken, secondToken) ? fixer.removeRange([firstToken.range[1], secondToken.range[0]]) : null;
					}
				}) : secondToken.range[0] > firstToken.range[1] && context.report({
					node,
					messageId: "unexpectedBefore",
					data: { operator: secondToken.value },
					fix(fixer) {
						return fixer.removeRange([firstToken.range[1], secondToken.range[0]]);
					}
				});
			}
			/**
			* Verifies UnaryExpression, UpdateExpression and NewExpression satisfy spacing requirements
			* @param {ASTnode} node AST node
			* @returns {void}
			*/
			function checkForSpaces(node) {
				let tokens = node.type === "UpdateExpression" && !node.prefix ? sourceCode.getLastTokens(node, 2) : sourceCode.getFirstTokens(node, 2), firstToken = tokens[0], secondToken = tokens[1];
				if ((node.type === "NewExpression" || node.prefix) && firstToken.type === "Keyword") {
					checkUnaryWordOperatorForSpaces(node, firstToken, secondToken, firstToken.value);
					return;
				}
				let operator = node.prefix ? tokens[0].value : tokens[1].value;
				overrideExistsForOperator(operator) ? overrideEnforcesSpaces(operator) ? verifyNonWordsHaveSpaces(node, firstToken, secondToken) : verifyNonWordsDontHaveSpaces(node, firstToken, secondToken) : options.nonwords ? verifyNonWordsHaveSpaces(node, firstToken, secondToken) : verifyNonWordsDontHaveSpaces(node, firstToken, secondToken);
			}
			return {
				UnaryExpression: checkForSpaces,
				UpdateExpression: checkForSpaces,
				NewExpression: checkForSpaces,
				YieldExpression: checkForSpacesAfterYield,
				AwaitExpression: checkForSpacesAfterAwait
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/space-unary-ops.cjs
module.exports = require_space_unary_ops().create;
//#endregion
