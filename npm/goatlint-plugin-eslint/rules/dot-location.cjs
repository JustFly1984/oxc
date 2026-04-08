const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/dot-location.js
/**
* @fileoverview Validates newlines before and after dots
* @author Greg Cochard
* @deprecated in ESLint v8.53.0
*/
var require_dot_location = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
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
						name: "dot-location",
						url: "https://eslint.style/rules/dot-location"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent newlines before and after dots",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/dot-location"
			},
			schema: [{ enum: ["object", "property"] }],
			fixable: "code",
			messages: {
				expectedDotAfterObject: "Expected dot to be on same line as object.",
				expectedDotBeforeProperty: "Expected dot to be on same line as property."
			}
		},
		create(context) {
			let config = context.options[0], onObject = config === "object" || !config, sourceCode = context.sourceCode;
			/**
			* Reports if the dot between object and property is on the correct location.
			* @param {ASTNode} node The `MemberExpression` node.
			* @returns {void}
			*/
			function checkDotLocation(node) {
				let property = node.property, dotToken = sourceCode.getTokenBefore(property);
				if (onObject) {
					let tokenBeforeDot = sourceCode.getTokenBefore(dotToken);
					astUtils.isTokenOnSameLine(tokenBeforeDot, dotToken) || context.report({
						node,
						loc: dotToken.loc,
						messageId: "expectedDotAfterObject",
						*fix(fixer) {
							dotToken.value.startsWith(".") && astUtils.isDecimalIntegerNumericToken(tokenBeforeDot) ? yield fixer.insertTextAfter(tokenBeforeDot, ` ${dotToken.value}`) : yield fixer.insertTextAfter(tokenBeforeDot, dotToken.value), yield fixer.remove(dotToken);
						}
					});
				} else astUtils.isTokenOnSameLine(dotToken, property) || context.report({
					node,
					loc: dotToken.loc,
					messageId: "expectedDotBeforeProperty",
					*fix(fixer) {
						yield fixer.remove(dotToken), yield fixer.insertTextBefore(property, dotToken.value);
					}
				});
			}
			/**
			* Checks the spacing of the dot within a member expression.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			*/
			function checkNode(node) {
				node.computed || checkDotLocation(node);
			}
			return { MemberExpression: checkNode };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/dot-location.cjs
module.exports = require_dot_location().create;
//#endregion
