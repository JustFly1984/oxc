const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/wrap-iife.js
/**
* @fileoverview Rule to flag when IIFE is not wrapped in parens
* @author Ilya Volodin
* @deprecated in ESLint v8.53.0
*/
var require_wrap_iife = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), eslintUtils = require_eslint_utils$1.t();
	/**
	* Check if the given node is callee of a `NewExpression` node
	* @param {ASTNode} node node to check
	* @returns {boolean} True if the node is callee of a `NewExpression` node
	* @private
	*/
	function isCalleeOfNewExpression(node) {
		let maybeCallee = node.parent.type === "ChainExpression" ? node.parent : node;
		return maybeCallee.parent.type === "NewExpression" && maybeCallee.parent.callee === maybeCallee;
	}
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
						name: "wrap-iife",
						url: "https://eslint.style/rules/wrap-iife"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require parentheses around immediate `function` invocations",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/wrap-iife"
			},
			schema: [{ enum: [
				"outside",
				"inside",
				"any"
			] }, {
				type: "object",
				properties: { functionPrototypeMethods: {
					type: "boolean",
					default: !1
				} },
				additionalProperties: !1
			}],
			fixable: "code",
			messages: {
				wrapInvocation: "Wrap an immediate function invocation in parentheses.",
				wrapExpression: "Wrap only the function expression in parens.",
				moveInvocation: "Move the invocation into the parens that contain the function."
			}
		},
		create(context) {
			let style = context.options[0] || "outside", includeFunctionPrototypeMethods = context.options[1] && context.options[1].functionPrototypeMethods, sourceCode = context.sourceCode;
			/**
			* Check if the node is wrapped in any (). All parens count: grouping parens and parens for constructs such as if()
			* @param {ASTNode} node node to evaluate
			* @returns {boolean} True if it is wrapped in any parens
			* @private
			*/
			function isWrappedInAnyParens(node) {
				return astUtils.isParenthesised(sourceCode, node);
			}
			/**
			* Check if the node is wrapped in grouping (). Parens for constructs such as if() don't count
			* @param {ASTNode} node node to evaluate
			* @returns {boolean} True if it is wrapped in grouping parens
			* @private
			*/
			function isWrappedInGroupingParens(node) {
				return eslintUtils.isParenthesized(1, node, sourceCode);
			}
			/**
			* Get the function node from an IIFE
			* @param {ASTNode} node node to evaluate
			* @returns {ASTNode} node that is the function expression of the given IIFE, or null if none exist
			*/
			function getFunctionNodeFromIIFE(node) {
				let callee = astUtils.skipChainExpression(node.callee);
				return callee.type === "FunctionExpression" ? callee : includeFunctionPrototypeMethods && callee.type === "MemberExpression" && callee.object.type === "FunctionExpression" && (astUtils.getStaticPropertyName(callee) === "call" || astUtils.getStaticPropertyName(callee) === "apply") ? callee.object : null;
			}
			return { CallExpression(node) {
				let innerNode = getFunctionNodeFromIIFE(node);
				if (!innerNode) return;
				let isCallExpressionWrapped = isWrappedInAnyParens(node), isFunctionExpressionWrapped = isWrappedInAnyParens(innerNode);
				!isCallExpressionWrapped && !isFunctionExpressionWrapped ? context.report({
					node,
					messageId: "wrapInvocation",
					fix(fixer) {
						let nodeToSurround = style === "inside" ? innerNode : node;
						return fixer.replaceText(nodeToSurround, `(${sourceCode.getText(nodeToSurround)})`);
					}
				}) : style === "inside" && !isFunctionExpressionWrapped ? context.report({
					node,
					messageId: "wrapExpression",
					fix(fixer) {
						if (isWrappedInGroupingParens(node) && !isCalleeOfNewExpression(node)) {
							let parenAfter = sourceCode.getTokenAfter(node);
							return fixer.replaceTextRange([innerNode.range[1], parenAfter.range[1]], `)${sourceCode.getText().slice(innerNode.range[1], parenAfter.range[0])}`);
						}
						return fixer.replaceText(innerNode, `(${sourceCode.getText(innerNode)})`);
					}
				}) : style === "outside" && !isCallExpressionWrapped && context.report({
					node,
					messageId: "moveInvocation",
					fix(fixer) {
						let parenAfter = sourceCode.getTokenAfter(innerNode);
						return fixer.replaceTextRange([parenAfter.range[0], node.range[1]], `${sourceCode.getText().slice(parenAfter.range[1], node.range[1])})`);
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/wrap-iife.cjs
module.exports = require_wrap_iife().create;
//#endregion
