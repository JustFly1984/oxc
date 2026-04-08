const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-constant-binary-expression.js
/**
* @fileoverview Rule to flag constant comparisons and logical expressions that always/never short circuit
* @author Jordan Eldredge <https://jordaneldredge.com>
*/
var require_no_constant_binary_expression = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { isNullLiteral, isConstant, isReferenceToGlobalVariable, isLogicalAssignmentOperator, ECMASCRIPT_GLOBALS } = require_ast_utils$1.t(), NUMERIC_OR_STRING_BINARY_OPERATORS = new Set([
		"+",
		"-",
		"*",
		"/",
		"%",
		"|",
		"^",
		"&",
		"**",
		"<<",
		">>",
		">>>"
	]);
	/**
	* Checks whether or not a node is `null` or `undefined`. Similar to the one
	* found in ast-utils.js, but this one correctly handles the edge case that
	* `undefined` has been redefined.
	* @param {Scope} scope Scope in which the expression was found.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} Whether or not the node is a `null` or `undefined`.
	* @public
	*/
	function isNullOrUndefined(scope, node) {
		return isNullLiteral(node) || node.type === "Identifier" && node.name === "undefined" && isReferenceToGlobalVariable(scope, node) || node.type === "UnaryExpression" && node.operator === "void";
	}
	/**
	* Test if an AST node has a statically knowable constant nullishness. Meaning,
	* it will always resolve to a constant value of either: `null`, `undefined`
	* or not `null` _or_ `undefined`. An expression that can vary between those
	* three states at runtime would return `false`.
	* @param {Scope} scope The scope in which the node was found.
	* @param {ASTNode} node The AST node being tested.
	* @param {boolean} nonNullish if `true` then nullish values are not considered constant.
	* @returns {boolean} Does `node` have constant nullishness?
	*/
	function hasConstantNullishness(scope, node, nonNullish) {
		if (nonNullish && isNullOrUndefined(scope, node)) return !1;
		switch (node.type) {
			case "ObjectExpression":
			case "ArrayExpression":
			case "ArrowFunctionExpression":
			case "FunctionExpression":
			case "ClassExpression":
			case "NewExpression":
			case "Literal":
			case "TemplateLiteral":
			case "UpdateExpression":
			case "BinaryExpression": return !0;
			case "CallExpression": {
				if (node.callee.type !== "Identifier") return !1;
				let functionName = node.callee.name;
				return (functionName === "Boolean" || functionName === "String" || functionName === "Number") && isReferenceToGlobalVariable(scope, node.callee);
			}
			case "LogicalExpression": return node.operator === "??" && hasConstantNullishness(scope, node.right, !0);
			case "AssignmentExpression": return node.operator === "=" ? hasConstantNullishness(scope, node.right, nonNullish) : !isLogicalAssignmentOperator(node.operator);
			case "UnaryExpression": return !0;
			case "SequenceExpression": return hasConstantNullishness(scope, node.expressions.at(-1), nonNullish);
			case "Identifier": return node.name === "undefined" && isReferenceToGlobalVariable(scope, node);
			case "JSXElement":
			case "JSXFragment": return !1;
			default: return !1;
		}
	}
	/**
	* Test if an AST node is a boolean value that never changes. Specifically we
	* test for:
	* 1. Literal booleans (`true` or `false`)
	* 2. Unary `!` expressions with a constant value
	* 3. Constant booleans created via the `Boolean` global function
	* @param {Scope} scope The scope in which the node was found.
	* @param {ASTNode} node The node to test
	* @returns {boolean} Is `node` guaranteed to be a boolean?
	*/
	function isStaticBoolean(scope, node) {
		switch (node.type) {
			case "Literal": return typeof node.value == "boolean";
			case "CallExpression": return node.callee.type === "Identifier" && node.callee.name === "Boolean" && isReferenceToGlobalVariable(scope, node.callee) && (node.arguments.length === 0 || isConstant(scope, node.arguments[0], !0));
			case "UnaryExpression": return node.operator === "!" && isConstant(scope, node.argument, !0);
			default: return !1;
		}
	}
	/**
	* Test if an AST node will always give the same result when compared to a
	* boolean value. Note that comparison to boolean values is different than
	* truthiness.
	* https://262.ecma-international.org/5.1/#sec-11.9.3
	*
	* JavaScript `==` operator works by converting the boolean to `1` (true) or
	* `+0` (false) and then checks the values `==` equality to that number.
	* @param {Scope} scope The scope in which node was found.
	* @param {ASTNode} node The node to test.
	* @returns {boolean} Will `node` always coerce to the same boolean value?
	*/
	function hasConstantLooseBooleanComparison(scope, node) {
		switch (node.type) {
			case "ObjectExpression":
			case "ClassExpression":
 /**
			* In theory objects like:
			*
			* `{toString: () => a}`
			* `{valueOf: () => a}`
			*
			* Or a classes like:
			*
			* `class { static toString() { return a } }`
			* `class { static valueOf() { return a } }`
			*
			* Are not constant verifiably when `inBooleanPosition` is
			* false, but it's an edge case we've opted not to handle.
			*/
			return !0;
			case "ArrayExpression": {
				let nonSpreadElements = node.elements.filter((e) => e !== null && e.type !== "SpreadElement");
				return node.elements.length === 0 || nonSpreadElements.length > 1;
			}
			case "ArrowFunctionExpression":
			case "FunctionExpression": return !0;
			case "UnaryExpression": return node.operator === "void" || node.operator === "typeof" ? !0 : node.operator === "!" ? isConstant(scope, node.argument, !0) : !1;
			case "NewExpression": return !1;
			case "CallExpression": return node.callee.type === "Identifier" && node.callee.name === "Boolean" && isReferenceToGlobalVariable(scope, node.callee) ? node.arguments.length === 0 || isConstant(scope, node.arguments[0], !0) : !1;
			case "Literal": return !0;
			case "Identifier": return node.name === "undefined" && isReferenceToGlobalVariable(scope, node);
			case "TemplateLiteral": return node.expressions.length === 0;
			case "AssignmentExpression": return node.operator === "=" ? hasConstantLooseBooleanComparison(scope, node.right) : !1;
			case "SequenceExpression": return hasConstantLooseBooleanComparison(scope, node.expressions.at(-1));
			case "JSXElement":
			case "JSXFragment": return !1;
			default: return !1;
		}
	}
	/**
	* Test if an AST node will always give the same result when _strictly_ compared
	* to a boolean value. This can happen if the expression can never be boolean, or
	* if it is always the same boolean value.
	* @param {Scope} scope The scope in which the node was found.
	* @param {ASTNode} node The node to test
	* @returns {boolean} Will `node` always give the same result when compared to a
	* static boolean value?
	*/
	function hasConstantStrictBooleanComparison(scope, node) {
		switch (node.type) {
			case "ObjectExpression":
			case "ArrayExpression":
			case "ArrowFunctionExpression":
			case "FunctionExpression":
			case "ClassExpression":
			case "NewExpression":
			case "TemplateLiteral":
			case "Literal":
			case "UpdateExpression": return !0;
			case "BinaryExpression": return NUMERIC_OR_STRING_BINARY_OPERATORS.has(node.operator);
			case "UnaryExpression": return node.operator === "delete" ? !1 : node.operator === "!" ? isConstant(scope, node.argument, !0) : !0;
			case "SequenceExpression": return hasConstantStrictBooleanComparison(scope, node.expressions.at(-1));
			case "Identifier": return node.name === "undefined" && isReferenceToGlobalVariable(scope, node);
			case "AssignmentExpression": return node.operator === "=" ? hasConstantStrictBooleanComparison(scope, node.right) : !isLogicalAssignmentOperator(node.operator);
			case "CallExpression": {
				if (node.callee.type !== "Identifier") return !1;
				let functionName = node.callee.name;
				return (functionName === "String" || functionName === "Number") && isReferenceToGlobalVariable(scope, node.callee) ? !0 : functionName === "Boolean" && isReferenceToGlobalVariable(scope, node.callee) ? node.arguments.length === 0 || isConstant(scope, node.arguments[0], !0) : !1;
			}
			case "JSXElement":
			case "JSXFragment": return !1;
			default: return !1;
		}
	}
	/**
	* Test if an AST node will always result in a newly constructed object
	* @param {Scope} scope The scope in which the node was found.
	* @param {ASTNode} node The node to test
	* @returns {boolean} Will `node` always be new?
	*/
	function isAlwaysNew(scope, node) {
		switch (node.type) {
			case "ObjectExpression":
			case "ArrayExpression":
			case "ArrowFunctionExpression":
			case "FunctionExpression":
			case "ClassExpression": return !0;
			case "NewExpression": return node.callee.type === "Identifier" ? Object.hasOwn(ECMASCRIPT_GLOBALS, node.callee.name) && isReferenceToGlobalVariable(scope, node.callee) : !1;
			case "Literal": return typeof node.regex == "object";
			case "SequenceExpression": return isAlwaysNew(scope, node.expressions.at(-1));
			case "AssignmentExpression": return node.operator === "=" ? isAlwaysNew(scope, node.right) : !1;
			case "ConditionalExpression": return isAlwaysNew(scope, node.consequent) && isAlwaysNew(scope, node.alternate);
			case "JSXElement":
			case "JSXFragment": return !1;
			default: return !1;
		}
	}
	/**
	* Checks if one operand will cause the result to be constant.
	* @param {Scope} scope Scope in which the expression was found.
	* @param {ASTNode} a One side of the expression
	* @param {ASTNode} b The other side of the expression
	* @param {string} operator The binary expression operator
	* @returns {ASTNode | null} The node which will cause the expression to have a constant result.
	*/
	function findBinaryExpressionConstantOperand(scope, a, b, operator) {
		if (operator === "==" || operator === "!=") {
			if (isNullOrUndefined(scope, a) && hasConstantNullishness(scope, b, !1) || isStaticBoolean(scope, a) && hasConstantLooseBooleanComparison(scope, b)) return b;
		} else if ((operator === "===" || operator === "!==") && (isNullOrUndefined(scope, a) && hasConstantNullishness(scope, b, !1) || isStaticBoolean(scope, a) && hasConstantStrictBooleanComparison(scope, b))) return b;
		return null;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow expressions where the operation doesn't affect the value",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-constant-binary-expression"
			},
			schema: [],
			messages: {
				constantBinaryOperand: "Unexpected constant binary expression. Compares constantly with the {{otherSide}}-hand side of the `{{operator}}`.",
				constantShortCircuit: "Unexpected constant {{property}} on the left-hand side of a `{{operator}}` expression.",
				alwaysNew: "Unexpected comparison to newly constructed object. These two values can never be equal.",
				bothAlwaysNew: "Unexpected comparison of two newly constructed objects. These two values can never be equal."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return {
				LogicalExpression(node) {
					let { operator, left } = node, scope = sourceCode.getScope(node);
					(operator === "&&" || operator === "||") && isConstant(scope, left, !0) ? context.report({
						node: left,
						messageId: "constantShortCircuit",
						data: {
							property: "truthiness",
							operator
						}
					}) : operator === "??" && hasConstantNullishness(scope, left, !1) && context.report({
						node: left,
						messageId: "constantShortCircuit",
						data: {
							property: "nullishness",
							operator
						}
					});
				},
				BinaryExpression(node) {
					let scope = sourceCode.getScope(node), { right, left, operator } = node, rightConstantOperand = findBinaryExpressionConstantOperand(scope, left, right, operator), leftConstantOperand = findBinaryExpressionConstantOperand(scope, right, left, operator);
					rightConstantOperand ? context.report({
						node: rightConstantOperand,
						messageId: "constantBinaryOperand",
						data: {
							operator,
							otherSide: "left"
						}
					}) : leftConstantOperand ? context.report({
						node: leftConstantOperand,
						messageId: "constantBinaryOperand",
						data: {
							operator,
							otherSide: "right"
						}
					}) : operator === "===" || operator === "!==" ? isAlwaysNew(scope, left) ? context.report({
						node: left,
						messageId: "alwaysNew"
					}) : isAlwaysNew(scope, right) && context.report({
						node: right,
						messageId: "alwaysNew"
					}) : (operator === "==" || operator === "!=") && isAlwaysNew(scope, left) && isAlwaysNew(scope, right) && context.report({
						node: left,
						messageId: "bothAlwaysNew"
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-constant-binary-expression.cjs
module.exports = require_no_constant_binary_expression().create;
//#endregion
