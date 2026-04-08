const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/object-curly-spacing.js
/**
* @fileoverview Disallows or enforces spaces inside of object literals.
* @author Jamund Ferguson
* @deprecated in ESLint v8.53.0
*/
var require_object_curly_spacing = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "object-curly-spacing",
						url: "https://eslint.style/rules/object-curly-spacing"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent spacing inside braces",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/object-curly-spacing"
			},
			fixable: "whitespace",
			schema: [{ enum: ["always", "never"] }, {
				type: "object",
				properties: {
					arraysInObjects: { type: "boolean" },
					objectsInObjects: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: {
				requireSpaceBefore: "A space is required before '{{token}}'.",
				requireSpaceAfter: "A space is required after '{{token}}'.",
				unexpectedSpaceBefore: "There should be no space before '{{token}}'.",
				unexpectedSpaceAfter: "There should be no space after '{{token}}'."
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
				arraysInObjectsException: isOptionSet("arraysInObjects"),
				objectsInObjectsException: isOptionSet("objectsInObjects")
			};
			/**
			* Reports that there shouldn't be a space after the first token
			* @param {ASTNode} node The node to report in the event of an error.
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportNoBeginningSpace(node, token) {
				let nextToken = context.sourceCode.getTokenAfter(token, { includeComments: !0 });
				context.report({
					node,
					loc: {
						start: token.loc.end,
						end: nextToken.loc.start
					},
					messageId: "unexpectedSpaceAfter",
					data: { token: token.value },
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
				let previousToken = context.sourceCode.getTokenBefore(token, { includeComments: !0 });
				context.report({
					node,
					loc: {
						start: previousToken.loc.end,
						end: token.loc.start
					},
					messageId: "unexpectedSpaceBefore",
					data: { token: token.value },
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
					messageId: "requireSpaceAfter",
					data: { token: token.value },
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
					messageId: "requireSpaceBefore",
					data: { token: token.value },
					fix(fixer) {
						return fixer.insertTextBefore(token, " ");
					}
				});
			}
			/**
			* Determines if spacing in curly braces is valid.
			* @param {ASTNode} node The AST node to check.
			* @param {Token} first The first token to check (should be the opening brace)
			* @param {Token} second The second token to check (should be first after the opening brace)
			* @param {Token} penultimate The penultimate token to check (should be last before closing brace)
			* @param {Token} last The last token to check (should be closing brace)
			* @returns {void}
			*/
			function validateBraceSpacing(node, first, second, penultimate, last) {
				if (astUtils.isTokenOnSameLine(first, second)) {
					let firstSpaced = sourceCode.isSpaceBetweenTokens(first, second);
					options.spaced && !firstSpaced && reportRequiredBeginningSpace(node, first), !options.spaced && firstSpaced && second.type !== "Line" && reportNoBeginningSpace(node, first);
				}
				if (astUtils.isTokenOnSameLine(penultimate, last)) {
					let penultimateType = (options.arraysInObjectsException && astUtils.isClosingBracketToken(penultimate) || options.objectsInObjectsException && astUtils.isClosingBraceToken(penultimate)) && sourceCode.getNodeByRangeIndex(penultimate.range[0]).type, closingCurlyBraceMustBeSpaced = options.arraysInObjectsException && penultimateType === "ArrayExpression" || options.objectsInObjectsException && (penultimateType === "ObjectExpression" || penultimateType === "ObjectPattern") ? !options.spaced : options.spaced, lastSpaced = sourceCode.isSpaceBetweenTokens(penultimate, last);
					closingCurlyBraceMustBeSpaced && !lastSpaced && reportRequiredEndingSpace(node, last), !closingCurlyBraceMustBeSpaced && lastSpaced && reportNoEndingSpace(node, last);
				}
			}
			/**
			* Gets '}' token of an object node.
			*
			* Because the last token of object patterns might be a type annotation,
			* this traverses tokens preceded by the last property, then returns the
			* first '}' token.
			* @param {ASTNode} node The node to get. This node is an
			*      ObjectExpression or an ObjectPattern. And this node has one or
			*      more properties.
			* @returns {Token} '}' token.
			*/
			function getClosingBraceOfObject(node) {
				let lastProperty = node.properties.at(-1);
				return sourceCode.getTokenAfter(lastProperty, astUtils.isClosingBraceToken);
			}
			/**
			* Reports a given object node if spacing in curly braces is invalid.
			* @param {ASTNode} node An ObjectExpression or ObjectPattern node to check.
			* @returns {void}
			*/
			function checkForObject(node) {
				if (node.properties.length === 0) return;
				let first = sourceCode.getFirstToken(node), last = getClosingBraceOfObject(node);
				validateBraceSpacing(node, first, sourceCode.getTokenAfter(first, { includeComments: !0 }), sourceCode.getTokenBefore(last, { includeComments: !0 }), last);
			}
			/**
			* Reports a given import node if spacing in curly braces is invalid.
			* @param {ASTNode} node An ImportDeclaration node to check.
			* @returns {void}
			*/
			function checkForImport(node) {
				if (node.specifiers.length === 0) return;
				let firstSpecifier = node.specifiers[0], lastSpecifier = node.specifiers.at(-1);
				if (lastSpecifier.type !== "ImportSpecifier") return;
				firstSpecifier.type !== "ImportSpecifier" && (firstSpecifier = node.specifiers[1]);
				let first = sourceCode.getTokenBefore(firstSpecifier), last = sourceCode.getTokenAfter(lastSpecifier, astUtils.isNotCommaToken);
				validateBraceSpacing(node, first, sourceCode.getTokenAfter(first, { includeComments: !0 }), sourceCode.getTokenBefore(last, { includeComments: !0 }), last);
			}
			/**
			* Reports a given export node if spacing in curly braces is invalid.
			* @param {ASTNode} node An ExportNamedDeclaration node to check.
			* @returns {void}
			*/
			function checkForExport(node) {
				if (node.specifiers.length === 0) return;
				let firstSpecifier = node.specifiers[0], lastSpecifier = node.specifiers.at(-1), first = sourceCode.getTokenBefore(firstSpecifier), last = sourceCode.getTokenAfter(lastSpecifier, astUtils.isNotCommaToken);
				validateBraceSpacing(node, first, sourceCode.getTokenAfter(first, { includeComments: !0 }), sourceCode.getTokenBefore(last, { includeComments: !0 }), last);
			}
			return {
				ObjectPattern: checkForObject,
				ObjectExpression: checkForObject,
				ImportDeclaration: checkForImport,
				ExportNamedDeclaration: checkForExport
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/object-curly-spacing.cjs
module.exports = require_object_curly_spacing().create;
//#endregion
