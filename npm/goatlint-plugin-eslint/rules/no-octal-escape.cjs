//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-octal-escape.js
/**
* @fileoverview Rule to flag octal escape sequences in string literals.
* @author Ian Christian Myers
*/
var require_no_octal_escape = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow octal escape sequences in string literals",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-octal-escape"
			},
			schema: [],
			messages: { octalEscapeSequence: "Don't use octal: '\\{{sequence}}'. Use '\\u....' instead." }
		},
		create(context) {
			return { Literal(node) {
				if (typeof node.value != "string") return;
				let match = node.raw.match(/^(?:[^\\]|\\.)*?\\([0-3][0-7]{1,2}|[4-7][0-7]|0(?=[89])|[1-7])/su);
				match && context.report({
					node,
					messageId: "octalEscapeSequence",
					data: { sequence: match[1] }
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-octal-escape.cjs
module.exports = require_no_octal_escape().create;
//#endregion
