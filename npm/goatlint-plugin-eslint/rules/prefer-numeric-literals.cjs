const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-numeric-literals.js
/**
* @fileoverview Rule to disallow `parseInt()` in favor of binary, octal, and hexadecimal literals
* @author Annie Zhang, Henry Zhu
*/
var require_prefer_numeric_literals = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), radixMap = new Map([
		[2, {
			system: "binary",
			literalPrefix: "0b"
		}],
		[8, {
			system: "octal",
			literalPrefix: "0o"
		}],
		[16, {
			system: "hexadecimal",
			literalPrefix: "0x"
		}]
	]);
	/**
	* Checks to see if a CallExpression's callee node is `parseInt` or
	* `Number.parseInt`.
	* @param {ASTNode} calleeNode The callee node to evaluate.
	* @returns {boolean} True if the callee is `parseInt` or `Number.parseInt`,
	* false otherwise.
	*/
	function isParseInt(calleeNode) {
		return astUtils.isSpecificId(calleeNode, "parseInt") || astUtils.isSpecificMemberAccess(calleeNode, "Number", "parseInt");
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/prefer-numeric-literals"
			},
			schema: [],
			messages: { useLiteral: "Use {{system}} literals instead of {{functionName}}()." },
			fixable: "code"
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { "CallExpression[arguments.length=2]"(node) {
				let [strNode, radixNode] = node.arguments, str = astUtils.getStaticStringValue(strNode), radix = radixNode.value;
				if (str !== null && astUtils.isStringLiteral(strNode) && radixNode.type === "Literal" && typeof radix == "number" && radixMap.has(radix) && isParseInt(node.callee)) {
					let { system, literalPrefix } = radixMap.get(radix);
					context.report({
						node,
						messageId: "useLiteral",
						data: {
							system,
							functionName: sourceCode.getText(node.callee)
						},
						fix(fixer) {
							if (sourceCode.getCommentsInside(node).length) return null;
							let replacement = `${literalPrefix}${str}`;
							if (+replacement !== parseInt(str, radix)) return null;
							let tokenBefore = sourceCode.getTokenBefore(node), tokenAfter = sourceCode.getTokenAfter(node), prefix = "", suffix = "";
							return tokenBefore && tokenBefore.range[1] === node.range[0] && !astUtils.canTokensBeAdjacent(tokenBefore, replacement) && (prefix = " "), tokenAfter && node.range[1] === tokenAfter.range[0] && !astUtils.canTokensBeAdjacent(replacement, tokenAfter) && (suffix = " "), fixer.replaceText(node, `${prefix}${replacement}${suffix}`);
						}
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-numeric-literals.cjs
module.exports = require_prefer_numeric_literals().create;
//#endregion
