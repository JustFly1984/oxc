const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-exponentiation-operator.js
/**
* @fileoverview Rule to disallow Math.pow in favor of the ** operator
* @author Milos Djermanovic
*/
var require_prefer_exponentiation_operator = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), { CALL, ReferenceTracker } = require_eslint_utils$1.t(), PRECEDENCE_OF_EXPONENTIATION_EXPR = astUtils.getPrecedence({
		type: "BinaryExpression",
		operator: "**"
	});
	/**
	* Determines whether the given node needs parens if used as the base in an exponentiation binary expression.
	* @param {ASTNode} base The node to check.
	* @returns {boolean} `true` if the node needs to be parenthesised.
	*/
	function doesBaseNeedParens(base) {
		return astUtils.getPrecedence(base) <= PRECEDENCE_OF_EXPONENTIATION_EXPR || base.type === "AwaitExpression" || base.type === "UnaryExpression";
	}
	/**
	* Determines whether the given node needs parens if used as the exponent in an exponentiation binary expression.
	* @param {ASTNode} exponent The node to check.
	* @returns {boolean} `true` if the node needs to be parenthesised.
	*/
	function doesExponentNeedParens(exponent) {
		return astUtils.getPrecedence(exponent) < PRECEDENCE_OF_EXPONENTIATION_EXPR;
	}
	/**
	* Determines whether an exponentiation binary expression at the place of the given node would need parens.
	* @param {ASTNode} node A node that would be replaced by an exponentiation binary expression.
	* @param {SourceCode} sourceCode A SourceCode object.
	* @returns {boolean} `true` if the expression needs to be parenthesised.
	*/
	function doesExponentiationExpressionNeedParens(node, sourceCode) {
		let parent = node.parent.type === "ChainExpression" ? node.parent.parent : node.parent, parentPrecedence = astUtils.getPrecedence(parent);
		return (parent.type === "ClassDeclaration" || parent.type.endsWith("Expression") && (parentPrecedence === -1 || parentPrecedence >= PRECEDENCE_OF_EXPONENTIATION_EXPR) && !(parent.type === "BinaryExpression" && parent.operator === "**" && parent.right === node) && !((parent.type === "CallExpression" || parent.type === "NewExpression") && parent.arguments.includes(node)) && !(parent.type === "MemberExpression" && parent.computed && parent.property === node) && parent.type !== "ArrayExpression") && !astUtils.isParenthesised(sourceCode, node);
	}
	/**
	* Optionally parenthesizes given text.
	* @param {string} text The text to parenthesize.
	* @param {boolean} shouldParenthesize If `true`, the text will be parenthesised.
	* @returns {string} parenthesised or unchanged text.
	*/
	function parenthesizeIfShould(text, shouldParenthesize) {
		return shouldParenthesize ? `(${text})` : text;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow the use of `Math.pow` in favor of the `**` operator",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/prefer-exponentiation-operator"
			},
			schema: [],
			fixable: "code",
			messages: { useExponentiation: "Use the '**' operator instead of 'Math.pow'." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Reports the given node.
			* @param {ASTNode} node 'Math.pow()' node to report.
			* @returns {void}
			*/
			function report(node) {
				context.report({
					node,
					messageId: "useExponentiation",
					fix(fixer) {
						if (node.arguments.length !== 2 || node.arguments.some((arg) => arg.type === "SpreadElement") || sourceCode.getCommentsInside(node).length > 0) return null;
						let base = node.arguments[0], exponent = node.arguments[1], baseText = sourceCode.getText(base), exponentText = sourceCode.getText(exponent), shouldParenthesizeBase = doesBaseNeedParens(base), shouldParenthesizeExponent = doesExponentNeedParens(exponent), shouldParenthesizeAll = doesExponentiationExpressionNeedParens(node, sourceCode), prefix = "", suffix = "";
						if (!shouldParenthesizeAll) {
							if (!shouldParenthesizeBase) {
								let firstReplacementToken = sourceCode.getFirstToken(base), tokenBefore = sourceCode.getTokenBefore(node);
								tokenBefore && tokenBefore.range[1] === node.range[0] && !astUtils.canTokensBeAdjacent(tokenBefore, firstReplacementToken) && (prefix = " ");
							}
							if (!shouldParenthesizeExponent) {
								let lastReplacementToken = sourceCode.getLastToken(exponent), tokenAfter = sourceCode.getTokenAfter(node);
								tokenAfter && node.range[1] === tokenAfter.range[0] && !astUtils.canTokensBeAdjacent(lastReplacementToken, tokenAfter) && (suffix = " ");
							}
						}
						let replacement = parenthesizeIfShould(`${parenthesizeIfShould(baseText, shouldParenthesizeBase)}**${parenthesizeIfShould(exponentText, shouldParenthesizeExponent)}`, shouldParenthesizeAll);
						return fixer.replaceText(node, `${prefix}${replacement}${suffix}`);
					}
				});
			}
			return { Program(node) {
				let tracker = new ReferenceTracker(sourceCode.getScope(node)), trackMap = { Math: { pow: { [CALL]: !0 } } };
				for (let { node: refNode } of tracker.iterateGlobalReferences(trackMap)) report(refNode);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-exponentiation-operator.cjs
module.exports = require_prefer_exponentiation_operator().create;
//#endregion
