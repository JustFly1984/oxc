//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/object-property-newline.js
/**
* @fileoverview Rule to enforce placing object properties on separate lines.
* @author Vitor Balocco
* @deprecated in ESLint v8.53.0
*/
var require_object_property_newline = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
						name: "object-property-newline",
						url: "https://eslint.style/rules/object-property-newline"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce placing object properties on separate lines",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/object-property-newline"
			},
			schema: [{
				type: "object",
				properties: {
					allowAllPropertiesOnSameLine: {
						type: "boolean",
						default: !1
					},
					allowMultiplePropertiesPerLine: {
						type: "boolean",
						default: !1
					}
				},
				additionalProperties: !1
			}],
			fixable: "whitespace",
			messages: {
				propertiesOnNewlineAll: "Object properties must go on a new line if they aren't all on the same line.",
				propertiesOnNewline: "Object properties must go on a new line."
			}
		},
		create(context) {
			let allowSameLine = context.options[0] && (context.options[0].allowAllPropertiesOnSameLine || context.options[0].allowMultiplePropertiesPerLine), messageId = allowSameLine ? "propertiesOnNewlineAll" : "propertiesOnNewline", sourceCode = context.sourceCode;
			return { ObjectExpression(node) {
				if (allowSameLine && node.properties.length > 1) {
					let firstTokenOfFirstProperty = sourceCode.getFirstToken(node.properties[0]), lastTokenOfLastProperty = sourceCode.getLastToken(node.properties.at(-1));
					if (firstTokenOfFirstProperty.loc.end.line === lastTokenOfLastProperty.loc.start.line) return;
				}
				for (let i = 1; i < node.properties.length; i++) {
					let lastTokenOfPreviousProperty = sourceCode.getLastToken(node.properties[i - 1]), firstTokenOfCurrentProperty = sourceCode.getFirstToken(node.properties[i]);
					lastTokenOfPreviousProperty.loc.end.line === firstTokenOfCurrentProperty.loc.start.line && context.report({
						node,
						loc: firstTokenOfCurrentProperty.loc,
						messageId,
						fix(fixer) {
							let rangeAfterComma = [sourceCode.getTokenBefore(firstTokenOfCurrentProperty).range[1], firstTokenOfCurrentProperty.range[0]];
							return sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim() ? null : fixer.replaceTextRange(rangeAfterComma, "\n");
						}
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/object-property-newline.cjs
module.exports = require_object_property_newline().create;
//#endregion
