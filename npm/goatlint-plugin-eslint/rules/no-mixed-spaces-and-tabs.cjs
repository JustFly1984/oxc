//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-mixed-spaces-and-tabs.js
/**
* @fileoverview Disallow mixed spaces and tabs for indentation
* @author Jary Niebur
* @deprecated in ESLint v8.53.0
*/
var require_no_mixed_spaces_and_tabs = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
						name: "no-mixed-spaces-and-tabs",
						url: "https://eslint.style/rules/no-mixed-spaces-and-tabs"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Disallow mixed spaces and tabs for indentation",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-mixed-spaces-and-tabs"
			},
			schema: [{ enum: [
				"smart-tabs",
				!0,
				!1
			] }],
			messages: { mixedSpacesAndTabs: "Mixed spaces and tabs." }
		},
		create(context) {
			let sourceCode = context.sourceCode, smartTabs;
			switch (context.options[0]) {
				case !0:
				case "smart-tabs":
					smartTabs = !0;
					break;
				default: smartTabs = !1;
			}
			return { "Program:exit"(node) {
				let lines = sourceCode.lines, comments = sourceCode.getAllComments(), ignoredCommentLines = /* @__PURE__ */ new Set();
				comments.forEach((comment) => {
					for (let i = comment.loc.start.line + 1; i <= comment.loc.end.line; i++) ignoredCommentLines.add(i);
				});
				let regex = /^(?=( +|\t+))\1(?:\t| )/u;
				smartTabs && (regex = /^(?=(\t*))\1(?=( +))\2\t/u), lines.forEach((line, i) => {
					let match = regex.exec(line);
					if (match) {
						let lineNumber = i + 1, loc = {
							start: {
								line: lineNumber,
								column: match[0].length - 2
							},
							end: {
								line: lineNumber,
								column: match[0].length
							}
						};
						if (!ignoredCommentLines.has(lineNumber)) {
							let containingNode = sourceCode.getNodeByRangeIndex(sourceCode.getIndexFromLoc(loc.start));
							containingNode && ["Literal", "TemplateElement"].includes(containingNode.type) || context.report({
								node,
								loc,
								messageId: "mixedSpacesAndTabs"
							});
						}
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-mixed-spaces-and-tabs.cjs
module.exports = require_no_mixed_spaces_and_tabs().create;
//#endregion
