const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/yoda.js
/**
* @fileoverview Rule to require or disallow yoda comparisons
* @author Nicholas C. Zakas
*/
var require_yoda = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Determines whether an operator is a comparison operator.
	* @param {string} operator The operator to check.
	* @returns {boolean} Whether or not it is a comparison operator.
	*/
	function isComparisonOperator(operator) {
		return /^(?:==|===|!=|!==|<|>|<=|>=)$/u.test(operator);
	}
	/**
	* Determines whether an operator is an equality operator.
	* @param {string} operator The operator to check.
	* @returns {boolean} Whether or not it is an equality operator.
	*/
	function isEqualityOperator(operator) {
		return /^(?:==|===)$/u.test(operator);
	}
	/**
	* Determines whether an operator is one used in a range test.
	* Allowed operators are `<` and `<=`.
	* @param {string} operator The operator to check.
	* @returns {boolean} Whether the operator is used in range tests.
	*/
	function isRangeTestOperator(operator) {
		return ["<", "<="].includes(operator);
	}
	/**
	* Determines whether a non-Literal node is a negative number that should be
	* treated as if it were a single Literal node.
	* @param {ASTNode} node Node to test.
	* @returns {boolean} True if the node is a negative number that looks like a
	*                    real literal and should be treated as such.
	*/
	function isNegativeNumericLiteral(node) {
		return node.type === "UnaryExpression" && node.operator === "-" && node.prefix && astUtils.isNumericLiteral(node.argument);
	}
	/**
	* Determines whether a non-Literal node should be treated as a single Literal node.
	* @param {ASTNode} node Node to test
	* @returns {boolean} True if the node should be treated as a single Literal node.
	*/
	function looksLikeLiteral(node) {
		return isNegativeNumericLiteral(node) || astUtils.isStaticTemplateLiteral(node);
	}
	/**
	* Attempts to derive a Literal node from nodes that are treated like literals.
	* @param {ASTNode} node Node to normalize.
	* @returns {ASTNode} One of the following options.
	*  1. The original node if the node is already a Literal
	*  2. A normalized Literal node with the negative number as the value if the
	*     node represents a negative number literal.
	*  3. A normalized Literal node with the string as the value if the node is
	*     a Template Literal without expression.
	*  4. Otherwise `null`.
	*/
	function getNormalizedLiteral(node) {
		return node.type === "Literal" ? node : isNegativeNumericLiteral(node) ? {
			type: "Literal",
			value: -node.argument.value,
			raw: `-${node.argument.value}`
		} : astUtils.isStaticTemplateLiteral(node) ? {
			type: "Literal",
			value: node.quasis[0].value.cooked,
			raw: node.quasis[0].value.raw
		} : null;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: ["never", {
				exceptRange: !1,
				onlyEquality: !1
			}],
			docs: {
				description: "Require or disallow \"Yoda\" conditions",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/yoda"
			},
			schema: [{ enum: ["always", "never"] }, {
				type: "object",
				properties: {
					exceptRange: { type: "boolean" },
					onlyEquality: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			fixable: "code",
			messages: { expected: "Expected literal to be on the {{expectedSide}} side of {{operator}}." }
		},
		create(context) {
			let [when, { exceptRange, onlyEquality }] = context.options, always = when === "always", sourceCode = context.sourceCode;
			/**
			* Determines whether node represents a range test.
			* A range test is a "between" test like `(0 <= x && x < 1)` or an "outside"
			* test like `(x < 0 || 1 <= x)`. It must be wrapped in parentheses, and
			* both operators must be `<` or `<=`. Finally, the literal on the left side
			* must be less than or equal to the literal on the right side so that the
			* test makes any sense.
			* @param {ASTNode} node LogicalExpression node to test.
			* @returns {boolean} Whether node is a range test.
			*/
			function isRangeTest(node) {
				let left = node.left, right = node.right;
				/**
				* Determines whether node is of the form `0 <= x && x < 1`.
				* @returns {boolean} Whether node is a "between" range test.
				*/
				function isBetweenTest() {
					if (node.operator === "&&" && astUtils.isSameReference(left.right, right.left)) {
						let leftLiteral = getNormalizedLiteral(left.left), rightLiteral = getNormalizedLiteral(right.right);
						if (leftLiteral === null && rightLiteral === null) return !1;
						if (rightLiteral === null || leftLiteral === null || leftLiteral.value <= rightLiteral.value) return !0;
					}
					return !1;
				}
				/**
				* Determines whether node is of the form `x < 0 || 1 <= x`.
				* @returns {boolean} Whether node is an "outside" range test.
				*/
				function isOutsideTest() {
					if (node.operator === "||" && astUtils.isSameReference(left.left, right.right)) {
						let leftLiteral = getNormalizedLiteral(left.right), rightLiteral = getNormalizedLiteral(right.left);
						if (leftLiteral === null && rightLiteral === null) return !1;
						if (rightLiteral === null || leftLiteral === null || leftLiteral.value <= rightLiteral.value) return !0;
					}
					return !1;
				}
				/**
				* Determines whether node is wrapped in parentheses.
				* @returns {boolean} Whether node is preceded immediately by an open
				*                    paren token and followed immediately by a close
				*                    paren token.
				*/
				function isParenWrapped() {
					return astUtils.isParenthesised(sourceCode, node);
				}
				return node.type === "LogicalExpression" && left.type === "BinaryExpression" && right.type === "BinaryExpression" && isRangeTestOperator(left.operator) && isRangeTestOperator(right.operator) && (isBetweenTest() || isOutsideTest()) && isParenWrapped();
			}
			let OPERATOR_FLIP_MAP = {
				"===": "===",
				"!==": "!==",
				"==": "==",
				"!=": "!=",
				"<": ">",
				">": "<",
				"<=": ">=",
				">=": "<="
			};
			/**
			* Returns a string representation of a BinaryExpression node with its sides/operator flipped around.
			* @param {ASTNode} node The BinaryExpression node
			* @returns {string} A string representation of the node with the sides and operator flipped
			*/
			function getFlippedString(node) {
				let operatorToken = sourceCode.getFirstTokenBetween(node.left, node.right, (token) => token.value === node.operator), lastLeftToken = sourceCode.getTokenBefore(operatorToken), firstRightToken = sourceCode.getTokenAfter(operatorToken), source = sourceCode.getText(), leftText = source.slice(node.range[0], lastLeftToken.range[1]), textBeforeOperator = source.slice(lastLeftToken.range[1], operatorToken.range[0]), textAfterOperator = source.slice(operatorToken.range[1], firstRightToken.range[0]), rightText = source.slice(firstRightToken.range[0], node.range[1]), tokenBefore = sourceCode.getTokenBefore(node), tokenAfter = sourceCode.getTokenAfter(node), prefix = "", suffix = "";
				return tokenBefore && tokenBefore.range[1] === node.range[0] && !astUtils.canTokensBeAdjacent(tokenBefore, firstRightToken) && (prefix = " "), tokenAfter && node.range[1] === tokenAfter.range[0] && !astUtils.canTokensBeAdjacent(lastLeftToken, tokenAfter) && (suffix = " "), prefix + rightText + textBeforeOperator + OPERATOR_FLIP_MAP[operatorToken.value] + textAfterOperator + leftText + suffix;
			}
			return { BinaryExpression(node) {
				let expectedLiteral = always ? node.left : node.right, expectedNonLiteral = always ? node.right : node.left;
				(expectedNonLiteral.type === "Literal" || looksLikeLiteral(expectedNonLiteral)) && !(expectedLiteral.type === "Literal" || looksLikeLiteral(expectedLiteral)) && !(!isEqualityOperator(node.operator) && onlyEquality) && isComparisonOperator(node.operator) && !(exceptRange && isRangeTest(node.parent)) && context.report({
					node,
					messageId: "expected",
					data: {
						operator: node.operator,
						expectedSide: always ? "left" : "right"
					},
					fix: (fixer) => fixer.replaceText(node, getFlippedString(node))
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/yoda.cjs
module.exports = require_yoda().create;
//#endregion
