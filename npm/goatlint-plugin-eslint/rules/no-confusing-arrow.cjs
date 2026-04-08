const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-confusing-arrow.js
/**
* @fileoverview A rule to warn against using arrow functions when they could be
* confused with comparisons
* @author Jxck <https://github.com/Jxck>
* @deprecated in ESLint v8.53.0
*/
var require_no_confusing_arrow = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether or not a node is a conditional expression.
	* @param {ASTNode} node node to test
	* @returns {boolean} `true` if the node is a conditional expression.
	*/
	function isConditional(node) {
		return node && node.type === "ConditionalExpression";
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
						name: "no-confusing-arrow",
						url: "https://eslint.style/rules/no-confusing-arrow"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Disallow arrow functions where they could be confused with comparisons",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-confusing-arrow"
			},
			fixable: "code",
			schema: [{
				type: "object",
				properties: {
					allowParens: {
						type: "boolean",
						default: !0
					},
					onlyOneSimpleParam: {
						type: "boolean",
						default: !1
					}
				},
				additionalProperties: !1
			}],
			messages: { confusing: "Arrow function used ambiguously with a conditional expression." }
		},
		create(context) {
			let config = context.options[0] || {}, allowParens = config.allowParens || config.allowParens === void 0, onlyOneSimpleParam = config.onlyOneSimpleParam, sourceCode = context.sourceCode;
			/**
			* Reports if an arrow function contains an ambiguous conditional.
			* @param {ASTNode} node A node to check and report.
			* @returns {void}
			*/
			function checkArrowFunc(node) {
				let body = node.body;
				isConditional(body) && !(allowParens && astUtils.isParenthesised(sourceCode, body)) && !(onlyOneSimpleParam && !(node.params.length === 1 && node.params[0].type === "Identifier")) && context.report({
					node,
					messageId: "confusing",
					fix(fixer) {
						return allowParens && fixer.replaceText(node.body, `(${sourceCode.getText(node.body)})`);
					}
				});
			}
			return { ArrowFunctionExpression: checkArrowFunc };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-confusing-arrow.cjs
module.exports = require_no_confusing_arrow().create;
//#endregion
