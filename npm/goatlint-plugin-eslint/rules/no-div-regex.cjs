//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-div-regex.js
/**
* @fileoverview Rule to check for ambiguous div operator in regexes
* @author Matt DuVall <http://www.mattduvall.com>
*/
var require_no_div_regex = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow equal signs explicitly at the beginning of regular expressions",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-div-regex"
			},
			fixable: "code",
			schema: [],
			messages: { unexpected: "A regular expression literal can be confused with '/='." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { Literal(node) {
				let token = sourceCode.getFirstToken(node);
				token.type === "RegularExpression" && token.value[1] === "=" && context.report({
					node,
					messageId: "unexpected",
					fix(fixer) {
						return fixer.replaceTextRange([token.range[0] + 1, token.range[0] + 2], "[=]");
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-div-regex.cjs
module.exports = require_no_div_regex().create;
//#endregion
