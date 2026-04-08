const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-implicit-coercion.js
/**
* @fileoverview A rule to disallow the type conversions with shorter notations.
* @author Toru Nagashima
*/
var require_no_implicit_coercion = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), INDEX_OF_PATTERN = /^(?:i|lastI)ndexOf$/u, ALLOWABLE_OPERATORS = [
		"~",
		"!!",
		"+",
		"- -",
		"-",
		"*"
	];
	/**
	* Checks whether or not a node is a double logical negating.
	* @param {ASTNode} node An UnaryExpression node to check.
	* @returns {boolean} Whether or not the node is a double logical negating.
	*/
	function isDoubleLogicalNegating(node) {
		return node.operator === "!" && node.argument.type === "UnaryExpression" && node.argument.operator === "!";
	}
	/**
	* Checks whether or not a node is a binary negating of `.indexOf()` method calling.
	* @param {ASTNode} node An UnaryExpression node to check.
	* @returns {boolean} Whether or not the node is a binary negating of `.indexOf()` method calling.
	*/
	function isBinaryNegatingOfIndexOf(node) {
		if (node.operator !== "~") return !1;
		let callNode = astUtils.skipChainExpression(node.argument);
		return callNode.type === "CallExpression" && astUtils.isSpecificMemberAccess(callNode.callee, null, INDEX_OF_PATTERN);
	}
	/**
	* Checks whether or not a node is a multiplying by one.
	* @param {BinaryExpression} node A BinaryExpression node to check.
	* @returns {boolean} Whether or not the node is a multiplying by one.
	*/
	function isMultiplyByOne(node) {
		return node.operator === "*" && (node.left.type === "Literal" && node.left.value === 1 || node.right.type === "Literal" && node.right.value === 1);
	}
	/**
	* Checks whether the given node logically represents multiplication by a fraction of `1`.
	* For example, `a * 1` in `a * 1 / b` is technically multiplication by `1`, but the
	* whole expression can be logically interpreted as `a * (1 / b)` rather than `(a * 1) / b`.
	* @param {BinaryExpression} node A BinaryExpression node to check.
	* @param {SourceCode} sourceCode The source code object.
	* @returns {boolean} Whether or not the node is a multiplying by a fraction of `1`.
	*/
	function isMultiplyByFractionOfOne(node, sourceCode) {
		return node.type === "BinaryExpression" && node.operator === "*" && node.right.type === "Literal" && node.right.value === 1 && node.parent.type === "BinaryExpression" && node.parent.operator === "/" && node.parent.left === node && !astUtils.isParenthesised(sourceCode, node);
	}
	/**
	* Checks whether the result of a node is numeric or not
	* @param {ASTNode} node The node to test
	* @returns {boolean} true if the node is a number literal or a `Number()`, `parseInt` or `parseFloat` call
	*/
	function isNumeric(node) {
		return node.type === "Literal" && typeof node.value == "number" || node.type === "CallExpression" && (node.callee.name === "Number" || node.callee.name === "parseInt" || node.callee.name === "parseFloat");
	}
	/**
	* Returns the first non-numeric operand in a BinaryExpression. Designed to be
	* used from bottom to up since it walks up the BinaryExpression trees using
	* node.parent to find the result.
	* @param {BinaryExpression} node The BinaryExpression node to be walked up on
	* @returns {ASTNode|null} The first non-numeric item in the BinaryExpression tree or null
	*/
	function getNonNumericOperand(node) {
		let left = node.left, right = node.right;
		return right.type !== "BinaryExpression" && !isNumeric(right) ? right : left.type !== "BinaryExpression" && !isNumeric(left) ? left : null;
	}
	/**
	* Checks whether an expression evaluates to a string.
	* @param {ASTNode} node node that represents the expression to check.
	* @returns {boolean} Whether or not the expression evaluates to a string.
	*/
	function isStringType(node) {
		return astUtils.isStringLiteral(node) || node.type === "CallExpression" && node.callee.type === "Identifier" && node.callee.name === "String";
	}
	/**
	* Checks whether a node is an empty string literal or not.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} Whether or not the passed in node is an
	* empty string literal or not.
	*/
	function isEmptyString(node) {
		return astUtils.isStringLiteral(node) && (node.value === "" || node.type === "TemplateLiteral" && node.quasis.length === 1 && node.quasis[0].value.cooked === "");
	}
	/**
	* Checks whether or not a node is a concatenating with an empty string.
	* @param {ASTNode} node A BinaryExpression node to check.
	* @returns {boolean} Whether or not the node is a concatenating with an empty string.
	*/
	function isConcatWithEmptyString(node) {
		return node.operator === "+" && (isEmptyString(node.left) && !isStringType(node.right) || isEmptyString(node.right) && !isStringType(node.left));
	}
	/**
	* Checks whether or not a node is appended with an empty string.
	* @param {ASTNode} node An AssignmentExpression node to check.
	* @returns {boolean} Whether or not the node is appended with an empty string.
	*/
	function isAppendEmptyString(node) {
		return node.operator === "+=" && isEmptyString(node.right);
	}
	/**
	* Returns the operand that is not an empty string from a flagged BinaryExpression.
	* @param {ASTNode} node The flagged BinaryExpression node to check.
	* @returns {ASTNode} The operand that is not an empty string from a flagged BinaryExpression.
	*/
	function getNonEmptyOperand(node) {
		return isEmptyString(node.left) ? node.right : node.left;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			hasSuggestions: !0,
			type: "suggestion",
			docs: {
				description: "Disallow shorthand type conversions",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-implicit-coercion"
			},
			fixable: "code",
			schema: [{
				type: "object",
				properties: {
					boolean: { type: "boolean" },
					number: { type: "boolean" },
					string: { type: "boolean" },
					disallowTemplateShorthand: { type: "boolean" },
					allow: {
						type: "array",
						items: { enum: ALLOWABLE_OPERATORS },
						uniqueItems: !0
					}
				},
				additionalProperties: !1
			}],
			defaultOptions: [{
				allow: [],
				boolean: !0,
				disallowTemplateShorthand: !1,
				number: !0,
				string: !0
			}],
			messages: {
				implicitCoercion: "Unexpected implicit coercion encountered. Use `{{recommendation}}` instead.",
				useRecommendation: "Use `{{recommendation}}` instead."
			}
		},
		create(context) {
			let [options] = context.options, sourceCode = context.sourceCode;
			/**
			* Reports an error and autofixes the node
			* @param {ASTNode} node An ast node to report the error on.
			* @param {string} recommendation The recommended code for the issue
			* @param {bool} shouldSuggest Whether this report should offer a suggestion
			* @param {bool} shouldFix Whether this report should fix the node
			* @returns {void}
			*/
			function report(node, recommendation, shouldSuggest, shouldFix) {
				/**
				* Fix function
				* @param {RuleFixer} fixer The fixer to fix.
				* @returns {Fix} The fix object.
				*/
				function fix(fixer) {
					let tokenBefore = sourceCode.getTokenBefore(node);
					return tokenBefore?.range[1] === node.range[0] && !astUtils.canTokensBeAdjacent(tokenBefore, recommendation) ? fixer.replaceText(node, ` ${recommendation}`) : fixer.replaceText(node, recommendation);
				}
				context.report({
					node,
					messageId: "implicitCoercion",
					data: { recommendation },
					fix(fixer) {
						return shouldFix ? fix(fixer) : null;
					},
					suggest: [{
						messageId: "useRecommendation",
						data: { recommendation },
						fix(fixer) {
							return shouldFix || !shouldSuggest ? null : fix(fixer);
						}
					}]
				});
			}
			return {
				UnaryExpression(node) {
					let operatorAllowed;
					if (operatorAllowed = options.allow.includes("!!"), !operatorAllowed && options.boolean && isDoubleLogicalNegating(node) && report(node, `Boolean(${sourceCode.getText(node.argument.argument)})`, !0, astUtils.getVariableByName(sourceCode.getScope(node), "Boolean")?.identifiers.length === 0), operatorAllowed = options.allow.includes("~"), !operatorAllowed && options.boolean && isBinaryNegatingOfIndexOf(node)) {
						let comparison = node.argument.type === "ChainExpression" ? ">= 0" : "!== -1";
						report(node, `${sourceCode.getText(node.argument)} ${comparison}`, !1, !1);
					}
					operatorAllowed = options.allow.includes("+"), !operatorAllowed && options.number && node.operator === "+" && !isNumeric(node.argument) && report(node, `Number(${sourceCode.getText(node.argument)})`, !0, !1), operatorAllowed = options.allow.includes("- -"), !operatorAllowed && options.number && node.operator === "-" && node.argument.type === "UnaryExpression" && node.argument.operator === "-" && !isNumeric(node.argument.argument) && report(node, `Number(${sourceCode.getText(node.argument.argument)})`, !0, !1);
				},
				"BinaryExpression:exit"(node) {
					let operatorAllowed;
					operatorAllowed = options.allow.includes("*");
					let nonNumericOperand = !operatorAllowed && options.number && isMultiplyByOne(node) && !isMultiplyByFractionOfOne(node, sourceCode) && getNonNumericOperand(node);
					nonNumericOperand && report(node, `Number(${sourceCode.getText(nonNumericOperand)})`, !0, !1), operatorAllowed = options.allow.includes("-"), !operatorAllowed && options.number && node.operator === "-" && node.right.type === "Literal" && node.right.value === 0 && !isNumeric(node.left) && report(node, `Number(${sourceCode.getText(node.left)})`, !0, !1), operatorAllowed = options.allow.includes("+"), !operatorAllowed && options.string && isConcatWithEmptyString(node) && report(node, `String(${sourceCode.getText(getNonEmptyOperand(node))})`, !0, !1);
				},
				AssignmentExpression(node) {
					if (!options.allow.includes("+") && options.string && isAppendEmptyString(node)) {
						let code = sourceCode.getText(getNonEmptyOperand(node));
						report(node, `${code} = String(${code})`, !0, !1);
					}
				},
				TemplateLiteral(node) {
					options.disallowTemplateShorthand && node.parent.type !== "TaggedTemplateExpression" && node.expressions.length === 1 && node.quasis[0].value.cooked === "" && node.quasis[1].value.cooked === "" && (isStringType(node.expressions[0]) || report(node, `String(${sourceCode.getText(node.expressions[0])})`, !0, !1));
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-implicit-coercion.cjs
module.exports = require_no_implicit_coercion().create;
//#endregion
