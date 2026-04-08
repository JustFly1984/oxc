const require_chunk = require("../common/chunk.cjs"), require_regexpp$1 = require("../common/regexpp.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-empty-character-class.js
/**
* @fileoverview Rule to flag the use of empty character classes in regular expressions
* @author Ian Christian Myers
*/
var require_no_empty_character_class = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { RegExpParser, visitRegExpAST } = require_regexpp$1.t(), parser = new RegExpParser(), QUICK_TEST_REGEX = /\[\]/u;
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow empty character classes in regular expressions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-empty-character-class"
			},
			schema: [],
			messages: { unexpected: "Empty class." }
		},
		create(context) {
			return { "Literal[regex]"(node) {
				let { pattern, flags } = node.regex;
				if (!QUICK_TEST_REGEX.test(pattern)) return;
				let regExpAST;
				try {
					regExpAST = parser.parsePattern(pattern, 0, pattern.length, {
						unicode: flags.includes("u"),
						unicodeSets: flags.includes("v")
					});
				} catch {
					return;
				}
				visitRegExpAST(regExpAST, { onCharacterClassEnter(characterClass) {
					!characterClass.negate && characterClass.elements.length === 0 && context.report({
						node,
						messageId: "unexpected"
					});
				} });
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-empty-character-class.cjs
module.exports = require_no_empty_character_class().create;
//#endregion
