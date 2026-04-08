//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/unicode-bom.js
/**
* @fileoverview Require or disallow Unicode BOM
* @author Andrew Johnston <https://github.com/ehjay>
*/
var require_unicode_bom = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "layout",
			defaultOptions: ["never"],
			docs: {
				description: "Require or disallow Unicode byte order mark (BOM)",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/unicode-bom"
			},
			fixable: "whitespace",
			schema: [{ enum: ["always", "never"] }],
			messages: {
				expected: "Expected Unicode BOM (Byte Order Mark).",
				unexpected: "Unexpected Unicode BOM (Byte Order Mark)."
			}
		},
		create(context) {
			return { Program: function checkUnicodeBOM(node) {
				let sourceCode = context.sourceCode, location = {
					column: 0,
					line: 1
				}, [requireBOM] = context.options;
				!sourceCode.hasBOM && requireBOM === "always" ? context.report({
					node,
					loc: location,
					messageId: "expected",
					fix(fixer) {
						return fixer.insertTextBeforeRange([0, 1], "﻿");
					}
				}) : sourceCode.hasBOM && requireBOM === "never" && context.report({
					node,
					loc: location,
					messageId: "unexpected",
					fix(fixer) {
						return fixer.removeRange([-1, 0]);
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/unicode-bom.cjs
module.exports = require_unicode_bom().create;
//#endregion
