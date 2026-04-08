const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/array-bracket-spacing.js
/**
* @fileoverview Disallows or enforces spaces inside of array brackets.
* @author Jamund Ferguson
* @deprecated in ESLint v8.53.0
*/
var require_array_bracket_spacing = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "array-bracket-spacing",
						url: "https://eslint.style/rules/array-bracket-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent spacing inside array brackets",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/array-bracket-spacing"
			},
			fixable: "whitespace",
			schema: [{ enum: ["always", "never"] }, {
				type: "object",
				properties: {
					singleValue: { type: "boolean" },
					objectsInArrays: { type: "boolean" },
					arraysInArrays: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: {
				unexpectedSpaceAfter: "There should be no space after '{{tokenValue}}'.",
				unexpectedSpaceBefore: "There should be no space before '{{tokenValue}}'.",
				missingSpaceAfter: "A space is required after '{{tokenValue}}'.",
				missingSpaceBefore: "A space is required before '{{tokenValue}}'."
			}
		},
		create(context) {
			let spaced = context.options[0] === "always", sourceCode = context.sourceCode;
			/**
			* Determines whether an option is set, relative to the spacing option.
			* If spaced is "always", then check whether option is set to false.
			* If spaced is "never", then check whether option is set to true.
			* @param {Object} option The option to exclude.
			* @returns {boolean} Whether or not the property is excluded.
			*/
			function isOptionSet(option) {
				return context.options[1] ? context.options[1][option] === !spaced : !1;
			}
			let options = {
				spaced,
				singleElementException: isOptionSet("singleValue"),
				objectsInArraysException: isOptionSet("objectsInArrays"),
				arraysInArraysException: isOptionSet("arraysInArrays")
			};
			/**
			* Reports that there shouldn't be a space after the first token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportNoBeginningSpace(node, token) {
				let nextToken = sourceCode.getTokenAfter(token);
				context.report({
					node,
					loc: {
						start: token.loc.end,
						end: nextToken.loc.start
					},
					messageId: "unexpectedSpaceAfter",
					data: { tokenValue: token.value },
					fix(fixer) {
						return fixer.removeRange([token.range[1], nextToken.range[0]]);
					}
				});
			}
			/**
			* Reports that there shouldn't be a space before the last token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportNoEndingSpace(node, token) {
				let previousToken = sourceCode.getTokenBefore(token);
				context.report({
					node,
					loc: {
						start: previousToken.loc.end,
						end: token.loc.start
					},
					messageId: "unexpectedSpaceBefore",
					data: { tokenValue: token.value },
					fix(fixer) {
						return fixer.removeRange([previousToken.range[1], token.range[0]]);
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
			* Determines if a node is an object type
			* @param {ASTNode} node The node to check.
			* @returns {boolean} Whether or not the node is an object type.
			*/
			function isObjectType(node) {
				return node && (node.type === "ObjectExpression" || node.type === "ObjectPattern");
			}
			/**
			* Determines if a node is an array type
			* @param {ASTNode} node The node to check.
			* @returns {boolean} Whether or not the node is an array type.
			*/
			function isArrayType(node) {
				return node && (node.type === "ArrayExpression" || node.type === "ArrayPattern");
			}
			/**
			* Validates the spacing around array brackets
			* @param {ASTNode} node The node we're checking for spacing
			* @returns {void}
			*/
			function validateArraySpacing(node) {
				if (options.spaced && node.elements.length === 0) return;
				let first = sourceCode.getFirstToken(node), second = sourceCode.getFirstToken(node, 1), last = node.typeAnnotation ? sourceCode.getTokenBefore(node.typeAnnotation) : sourceCode.getLastToken(node), penultimate = sourceCode.getTokenBefore(last), firstElement = node.elements[0], lastElement = node.elements.at(-1), openingBracketMustBeSpaced = options.objectsInArraysException && isObjectType(firstElement) || options.arraysInArraysException && isArrayType(firstElement) || options.singleElementException && node.elements.length === 1 ? !options.spaced : options.spaced, closingBracketMustBeSpaced = options.objectsInArraysException && isObjectType(lastElement) || options.arraysInArraysException && isArrayType(lastElement) || options.singleElementException && node.elements.length === 1 ? !options.spaced : options.spaced;
				astUtils.isTokenOnSameLine(first, second) && (openingBracketMustBeSpaced && !sourceCode.isSpaceBetweenTokens(first, second) && reportRequiredBeginningSpace(node, first), !openingBracketMustBeSpaced && sourceCode.isSpaceBetweenTokens(first, second) && reportNoBeginningSpace(node, first)), first !== penultimate && astUtils.isTokenOnSameLine(penultimate, last) && (closingBracketMustBeSpaced && !sourceCode.isSpaceBetweenTokens(penultimate, last) && reportRequiredEndingSpace(node, last), !closingBracketMustBeSpaced && sourceCode.isSpaceBetweenTokens(penultimate, last) && reportNoEndingSpace(node, last));
			}
			return {
				ArrayPattern: validateArraySpacing,
				ArrayExpression: validateArraySpacing
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/array-bracket-spacing.cjs
module.exports = require_array_bracket_spacing().create;
//#endregion
