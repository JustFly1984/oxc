const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/computed-property-spacing.js
/**
* @fileoverview Disallows or enforces spaces inside computed properties.
* @author Jamund Ferguson
* @deprecated in ESLint v8.53.0
*/
var require_computed_property_spacing = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "computed-property-spacing",
						url: "https://eslint.style/rules/computed-property-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent spacing inside computed property brackets",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/computed-property-spacing"
			},
			fixable: "whitespace",
			schema: [{ enum: ["always", "never"] }, {
				type: "object",
				properties: { enforceForClassMembers: {
					type: "boolean",
					default: !0
				} },
				additionalProperties: !1
			}],
			messages: {
				unexpectedSpaceBefore: "There should be no space before '{{tokenValue}}'.",
				unexpectedSpaceAfter: "There should be no space after '{{tokenValue}}'.",
				missingSpaceBefore: "A space is required before '{{tokenValue}}'.",
				missingSpaceAfter: "A space is required after '{{tokenValue}}'."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, propertyNameMustBeSpaced = context.options[0] === "always", enforceForClassMembers = !context.options[1] || context.options[1].enforceForClassMembers;
			/**
			* Reports that there shouldn't be a space after the first token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @param {Token} tokenAfter The token after `token`.
			* @returns {void}
			*/
			function reportNoBeginningSpace(node, token, tokenAfter) {
				context.report({
					node,
					loc: {
						start: token.loc.end,
						end: tokenAfter.loc.start
					},
					messageId: "unexpectedSpaceAfter",
					data: { tokenValue: token.value },
					fix(fixer) {
						return fixer.removeRange([token.range[1], tokenAfter.range[0]]);
					}
				});
			}
			/**
			* Reports that there shouldn't be a space before the last token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @param {Token} tokenBefore The token before `token`.
			* @returns {void}
			*/
			function reportNoEndingSpace(node, token, tokenBefore) {
				context.report({
					node,
					loc: {
						start: tokenBefore.loc.end,
						end: token.loc.start
					},
					messageId: "unexpectedSpaceBefore",
					data: { tokenValue: token.value },
					fix(fixer) {
						return fixer.removeRange([tokenBefore.range[1], token.range[0]]);
					}
				});
			}
			/**
			* Reports that there should be a space after the first token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportRequiredBeginningSpace(node, token) {
				context.report({
					node,
					loc: token.loc,
					messageId: "missingSpaceAfter",
					data: { tokenValue: token.value },
					fix(fixer) {
						return fixer.insertTextAfter(token, " ");
					}
				});
			}
			/**
			* Reports that there should be a space before the last token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportRequiredEndingSpace(node, token) {
				context.report({
					node,
					loc: token.loc,
					messageId: "missingSpaceBefore",
					data: { tokenValue: token.value },
					fix(fixer) {
						return fixer.insertTextBefore(token, " ");
					}
				});
			}
			/**
			* Returns a function that checks the spacing of a node on the property name
			* that was passed in.
			* @param {string} propertyName The property on the node to check for spacing
			* @returns {Function} A function that will check spacing on a node
			*/
			function checkSpacing(propertyName) {
				return function(node) {
					if (!node.computed) return;
					let property = node[propertyName], before = sourceCode.getTokenBefore(property, astUtils.isOpeningBracketToken), first = sourceCode.getTokenAfter(before, { includeComments: !0 }), after = sourceCode.getTokenAfter(property, astUtils.isClosingBracketToken), last = sourceCode.getTokenBefore(after, { includeComments: !0 });
					astUtils.isTokenOnSameLine(before, first) && (propertyNameMustBeSpaced ? !sourceCode.isSpaceBetweenTokens(before, first) && astUtils.isTokenOnSameLine(before, first) && reportRequiredBeginningSpace(node, before) : sourceCode.isSpaceBetweenTokens(before, first) && reportNoBeginningSpace(node, before, first)), astUtils.isTokenOnSameLine(last, after) && (propertyNameMustBeSpaced ? !sourceCode.isSpaceBetweenTokens(last, after) && astUtils.isTokenOnSameLine(last, after) && reportRequiredEndingSpace(node, after) : sourceCode.isSpaceBetweenTokens(last, after) && reportNoEndingSpace(node, after, last));
				};
			}
			let listeners = {
				Property: checkSpacing("key"),
				MemberExpression: checkSpacing("property")
			};
			return enforceForClassMembers && (listeners.MethodDefinition = listeners.PropertyDefinition = listeners.Property), listeners;
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/computed-property-spacing.cjs
module.exports = require_computed_property_spacing().create;
//#endregion
