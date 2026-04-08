const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/logical-assignment-operators.js
/**
* @fileoverview Rule to replace assignment expressions with logical operator assignment
* @author Daniel Martens
*/
var require_logical_assignment_operators = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), baseTypes = new Set([
		"Identifier",
		"Super",
		"ThisExpression"
	]);
	/**
	* Returns true iff either "undefined" or a void expression (eg. "void 0")
	* @param {ASTNode} expression Expression to check
	* @param {import('eslint-scope').Scope} scope Scope of the expression
	* @returns {boolean} True iff "undefined" or "void ..."
	*/
	function isUndefined(expression, scope) {
		return expression.type === "Identifier" && expression.name === "undefined" ? astUtils.isReferenceToGlobalVariable(scope, expression) : expression.type === "UnaryExpression" && expression.operator === "void" && expression.argument.type === "Literal" && expression.argument.value === 0;
	}
	/**
	* Returns true iff the reference is either an identifier or member expression
	* @param {ASTNode} expression Expression to check
	* @returns {boolean} True for identifiers and member expressions
	*/
	function isReference(expression) {
		return expression.type === "Identifier" && expression.name !== "undefined" || expression.type === "MemberExpression";
	}
	/**
	* Returns true iff the expression checks for nullish with loose equals.
	* Examples: value == null, value == void 0
	* @param {ASTNode} expression Test condition
	* @param {import('eslint-scope').Scope} scope Scope of the expression
	* @returns {boolean} True iff implicit nullish comparison
	*/
	function isImplicitNullishComparison(expression, scope) {
		if (expression.type !== "BinaryExpression" || expression.operator !== "==") return !1;
		let reference = isReference(expression.left) ? "left" : "right", nullish = reference === "left" ? "right" : "left";
		return isReference(expression[reference]) && (astUtils.isNullLiteral(expression[nullish]) || isUndefined(expression[nullish], scope));
	}
	/**
	* Condition with two equal comparisons.
	* @param {ASTNode} expression Condition
	* @returns {boolean} True iff matches ? === ? || ? === ?
	*/
	function isDoubleComparison(expression) {
		return expression.type === "LogicalExpression" && expression.operator === "||" && expression.left.type === "BinaryExpression" && expression.left.operator === "===" && expression.right.type === "BinaryExpression" && expression.right.operator === "===";
	}
	/**
	* Returns true iff the expression checks for undefined and null.
	* Example: value === null || value === undefined
	* @param {ASTNode} expression Test condition
	* @param {import('eslint-scope').Scope} scope Scope of the expression
	* @returns {boolean} True iff explicit nullish comparison
	*/
	function isExplicitNullishComparison(expression, scope) {
		if (!isDoubleComparison(expression)) return !1;
		let leftReference = isReference(expression.left.left) ? "left" : "right", leftNullish = leftReference === "left" ? "right" : "left", rightReference = isReference(expression.right.left) ? "left" : "right", rightNullish = rightReference === "left" ? "right" : "left";
		return astUtils.isSameReference(expression.left[leftReference], expression.right[rightReference]) && (astUtils.isNullLiteral(expression.left[leftNullish]) && isUndefined(expression.right[rightNullish], scope) || isUndefined(expression.left[leftNullish], scope) && astUtils.isNullLiteral(expression.right[rightNullish]));
	}
	/**
	* Returns true for Boolean(arg) calls
	* @param {ASTNode} expression Test condition
	* @param {import('eslint-scope').Scope} scope Scope of the expression
	* @returns {boolean} Whether the expression is a boolean cast
	*/
	function isBooleanCast(expression, scope) {
		return expression.type === "CallExpression" && expression.callee.name === "Boolean" && expression.arguments.length === 1 && astUtils.isReferenceToGlobalVariable(scope, expression.callee);
	}
	/**
	* Returns true for:
	* truthiness checks:  value, Boolean(value), !!value
	* falsiness checks:   !value, !Boolean(value)
	* nullish checks:     value == null, value === undefined || value === null
	* @param {ASTNode} expression Test condition
	* @param {import('eslint-scope').Scope} scope Scope of the expression
	* @returns {?{ reference: ASTNode, operator: '??'|'||'|'&&'}} Null if not a known existence
	*/
	function getExistence(expression, scope) {
		let isNegated = expression.type === "UnaryExpression" && expression.operator === "!", base = isNegated ? expression.argument : expression;
		switch (!0) {
			case isReference(base): return {
				reference: base,
				operator: isNegated ? "||" : "&&"
			};
			case base.type === "UnaryExpression" && base.operator === "!" && isReference(base.argument): return {
				reference: base.argument,
				operator: "&&"
			};
			case isBooleanCast(base, scope) && isReference(base.arguments[0]): return {
				reference: base.arguments[0],
				operator: isNegated ? "||" : "&&"
			};
			case isImplicitNullishComparison(expression, scope): return {
				reference: isReference(expression.left) ? expression.left : expression.right,
				operator: "??"
			};
			case isExplicitNullishComparison(expression, scope): return {
				reference: isReference(expression.left.left) ? expression.left.left : expression.left.right,
				operator: "??"
			};
			default: return null;
		}
	}
	/**
	* Returns true iff the node is inside a with block
	* @param {ASTNode} node Node to check
	* @returns {boolean} True iff passed node is inside a with block
	*/
	function isInsideWithBlock(node) {
		return node.type === "Program" ? !1 : node.parent.type === "WithStatement" && node.parent.body === node ? !0 : isInsideWithBlock(node.parent);
	}
	/**
	* Gets the leftmost operand of a consecutive logical expression.
	* @param {SourceCode} sourceCode The ESLint source code object
	* @param {LogicalExpression} node LogicalExpression
	* @returns {Expression} Leftmost operand
	*/
	function getLeftmostOperand(sourceCode, node) {
		let left = node.left;
		for (; left.type === "LogicalExpression" && left.operator === node.operator;) {
			if (astUtils.isParenthesised(sourceCode, left)) return left;
			left = left.left;
		}
		return left;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require or disallow logical assignment operator shorthand",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/logical-assignment-operators"
			},
			schema: {
				type: "array",
				oneOf: [{
					items: [{ const: "always" }, {
						type: "object",
						properties: { enforceForIfStatements: { type: "boolean" } },
						additionalProperties: !1
					}],
					minItems: 0,
					maxItems: 2
				}, {
					items: [{ const: "never" }],
					minItems: 1,
					maxItems: 1
				}]
			},
			fixable: "code",
			hasSuggestions: !0,
			messages: {
				assignment: "Assignment (=) can be replaced with operator assignment ({{operator}}).",
				useLogicalOperator: "Convert this assignment to use the operator {{ operator }}.",
				logical: "Logical expression can be replaced with an assignment ({{ operator }}).",
				convertLogical: "Replace this logical expression with an assignment with the operator {{ operator }}.",
				if: "'if' statement can be replaced with a logical operator assignment with operator {{ operator }}.",
				convertIf: "Replace this 'if' statement with a logical assignment with operator {{ operator }}.",
				unexpected: "Unexpected logical operator assignment ({{operator}}) shorthand.",
				separate: "Separate the logical assignment into an assignment with a logical operator."
			}
		},
		create(context) {
			let mode = context.options[0] === "never" ? "never" : "always", checkIf = mode === "always" && context.options.length > 1 && context.options[1].enforceForIfStatements, sourceCode = context.sourceCode, isStrict = sourceCode.getScope(sourceCode.ast).isStrict;
			/**
			* Returns false if the access could be a getter
			* @param {ASTNode} node Assignment expression
			* @returns {boolean} True iff the fix is safe
			*/
			function cannotBeGetter(node) {
				return node.type === "Identifier" && (isStrict || !isInsideWithBlock(node));
			}
			/**
			* Check whether only a single property is accessed
			* @param {ASTNode} node reference
			* @returns {boolean} True iff a single property is accessed
			*/
			function accessesSingleProperty(node) {
				return !isStrict && isInsideWithBlock(node) ? node.type === "Identifier" : node.type === "MemberExpression" && baseTypes.has(node.object.type) && (!node.computed || node.property.type !== "MemberExpression" && node.property.type !== "ChainExpression");
			}
			/**
			* Adds a fixer or suggestion whether on the fix is safe.
			* @param {{ messageId: string, node: ASTNode }} descriptor Report descriptor without fix or suggest
			* @param {{ messageId: string, fix: Function }} suggestion Adds the fix or the whole suggestion as only element in "suggest" to suggestion
			* @param {boolean} shouldBeFixed Fix iff the condition is true
			* @returns {Object} Descriptor with either an added fix or suggestion
			*/
			function createConditionalFixer(descriptor, suggestion, shouldBeFixed) {
				return shouldBeFixed ? {
					...descriptor,
					fix: suggestion.fix
				} : {
					...descriptor,
					suggest: [suggestion]
				};
			}
			/**
			* Returns the operator token for assignments and binary expressions
			* @param {ASTNode} node AssignmentExpression or BinaryExpression
			* @returns {import('eslint').AST.Token} Operator token between the left and right expression
			*/
			function getOperatorToken(node) {
				return sourceCode.getFirstTokenBetween(node.left, node.right, (token) => token.value === node.operator);
			}
			return mode === "never" ? { AssignmentExpression(assignment) {
				if (!astUtils.isLogicalAssignmentOperator(assignment.operator)) return;
				let descriptor = {
					messageId: "unexpected",
					node: assignment,
					data: { operator: assignment.operator }
				};
				context.report(createConditionalFixer(descriptor, {
					messageId: "separate",
					*fix(ruleFixer) {
						if (sourceCode.getCommentsInside(assignment).length > 0) return;
						let operatorToken = getOperatorToken(assignment);
						yield ruleFixer.replaceText(operatorToken, "=");
						let assignmentText = sourceCode.getText(assignment.left), operator = assignment.operator.slice(0, -1);
						yield ruleFixer.insertTextAfter(operatorToken, ` ${assignmentText} ${operator}`);
						let precedence = astUtils.getPrecedence(assignment.right) <= astUtils.getPrecedence({
							type: "LogicalExpression",
							operator
						}), mixed = assignment.operator === "??=" && astUtils.isLogicalExpression(assignment.right);
						!astUtils.isParenthesised(sourceCode, assignment.right) && (precedence || mixed) && (yield ruleFixer.insertTextBefore(assignment.right, "("), yield ruleFixer.insertTextAfter(assignment.right, ")"));
					}
				}, cannotBeGetter(assignment.left)));
			} } : {
				"AssignmentExpression[operator='='][right.type='LogicalExpression']"(assignment) {
					let leftOperand = getLeftmostOperand(sourceCode, assignment.right);
					if (!astUtils.isSameReference(assignment.left, leftOperand)) return;
					let descriptor = {
						messageId: "assignment",
						node: assignment,
						data: { operator: `${assignment.right.operator}=` }
					}, suggestion = {
						messageId: "useLogicalOperator",
						data: { operator: `${assignment.right.operator}=` },
						*fix(ruleFixer) {
							if (sourceCode.getCommentsInside(assignment).length > 0) return;
							let assignmentOperatorToken = getOperatorToken(assignment);
							yield ruleFixer.insertTextBefore(assignmentOperatorToken, assignment.right.operator);
							let logicalOperatorToken = getOperatorToken(leftOperand.parent), firstRightOperandToken = sourceCode.getTokenAfter(logicalOperatorToken);
							yield ruleFixer.removeRange([leftOperand.parent.range[0], firstRightOperandToken.range[0]]);
						}
					};
					context.report(createConditionalFixer(descriptor, suggestion, cannotBeGetter(assignment.left)));
				},
				"LogicalExpression[right.type=\"AssignmentExpression\"][right.operator=\"=\"]"(logical) {
					if (isReference(logical.left) && astUtils.isSameReference(logical.left, logical.right.left)) {
						let descriptor = {
							messageId: "logical",
							node: logical,
							data: { operator: `${logical.operator}=` }
						}, suggestion = {
							messageId: "convertLogical",
							data: { operator: `${logical.operator}=` },
							*fix(ruleFixer) {
								if (sourceCode.getCommentsInside(logical).length > 0) return;
								let parentPrecedence = astUtils.getPrecedence(logical.parent), requiresOuterParenthesis = logical.parent.type !== "ExpressionStatement" && (parentPrecedence === -1 || astUtils.getPrecedence({ type: "AssignmentExpression" }) < parentPrecedence);
								!astUtils.isParenthesised(sourceCode, logical) && requiresOuterParenthesis && (yield ruleFixer.insertTextBefore(logical, "("), yield ruleFixer.insertTextAfter(logical, ")")), yield ruleFixer.removeRange([logical.range[0], logical.right.range[0]]), yield ruleFixer.removeRange([logical.right.range[1], logical.range[1]]);
								let operatorToken = getOperatorToken(logical.right);
								yield ruleFixer.insertTextBefore(operatorToken, logical.operator);
							}
						}, fix = cannotBeGetter(logical.left) || accessesSingleProperty(logical.left);
						context.report(createConditionalFixer(descriptor, suggestion, fix));
					}
				},
				"IfStatement[alternate=null]"(ifNode) {
					if (!checkIf) return;
					let hasBody = ifNode.consequent.type === "BlockStatement";
					if (hasBody && ifNode.consequent.body.length !== 1) return;
					let body = hasBody ? ifNode.consequent.body[0] : ifNode.consequent, scope = sourceCode.getScope(ifNode), existence = getExistence(ifNode.test, scope);
					if (body.type === "ExpressionStatement" && body.expression.type === "AssignmentExpression" && body.expression.operator === "=" && existence !== null && astUtils.isSameReference(existence.reference, body.expression.left)) {
						let descriptor = {
							messageId: "if",
							node: ifNode,
							data: { operator: `${existence.operator}=` }
						}, suggestion = {
							messageId: "convertIf",
							data: { operator: `${existence.operator}=` },
							*fix(ruleFixer) {
								if (sourceCode.getCommentsInside(ifNode).length > 0) return;
								let firstBodyToken = sourceCode.getFirstToken(body), prevToken = sourceCode.getTokenBefore(ifNode);
								if (prevToken !== null && prevToken.value !== ";" && prevToken.value !== "{" && firstBodyToken.type !== "Identifier" && firstBodyToken.type !== "Keyword") return;
								let operatorToken = getOperatorToken(body.expression);
								yield ruleFixer.insertTextBefore(operatorToken, existence.operator), yield ruleFixer.removeRange([ifNode.range[0], body.range[0]]), yield ruleFixer.removeRange([body.range[1], ifNode.range[1]]);
								let nextToken = sourceCode.getTokenAfter(body.expression);
								hasBody && nextToken !== null && nextToken.value !== ";" && (yield ruleFixer.insertTextAfter(ifNode, ";"));
							}
						}, shouldBeFixed = cannotBeGetter(existence.reference) || ifNode.test.type !== "LogicalExpression" && accessesSingleProperty(existence.reference);
						context.report(createConditionalFixer(descriptor, suggestion, shouldBeFixed));
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/logical-assignment-operators.cjs
module.exports = require_logical_assignment_operators().create;
//#endregion
