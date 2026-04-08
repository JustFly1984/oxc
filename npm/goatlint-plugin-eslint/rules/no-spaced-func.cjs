//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-spaced-func.js
/**
* @fileoverview Rule to check that spaced function application
* @author Matt DuVall <http://www.mattduvall.com>
* @deprecated in ESLint v3.3.0
*/
var require_no_spaced_func = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "layout",
			docs: {
				description: "Disallow spacing between function identifiers and their applications (deprecated)",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-spaced-func"
			},
			deprecated: {
				message: "Formatting rules are being moved out of ESLint core.",
				url: "https://eslint.org/blog/2016/08/eslint-v3.3.0-released/#deprecated-rules",
				deprecatedSince: "3.3.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "ESLint Stylistic now maintains deprecated stylistic core rules.",
					url: "https://eslint.style/guide/migration",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "function-call-spacing",
						url: "https://eslint.style/rules/function-call-spacing"
					}
				}]
			},
			fixable: "whitespace",
			schema: [],
			messages: { noSpacedFunction: "Unexpected space between function name and paren." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Check if open space is present in a function name
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function detectOpenSpaces(node) {
				let lastCalleeToken = sourceCode.getLastToken(node.callee), prevToken = lastCalleeToken, parenToken = sourceCode.getTokenAfter(lastCalleeToken);
				for (; parenToken && parenToken.range[1] < node.range[1] && parenToken.value !== "(";) prevToken = parenToken, parenToken = sourceCode.getTokenAfter(parenToken);
				parenToken && parenToken.range[1] < node.range[1] && sourceCode.isSpaceBetweenTokens(prevToken, parenToken) && context.report({
					node,
					loc: lastCalleeToken.loc.start,
					messageId: "noSpacedFunction",
					fix(fixer) {
						return fixer.removeRange([prevToken.range[1], parenToken.range[0]]);
					}
				});
			}
			return {
				CallExpression: detectOpenSpaces,
				NewExpression: detectOpenSpaces
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-spaced-func.cjs
module.exports = require_no_spaced_func().create;
//#endregion
