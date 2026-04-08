const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/array-element-newline.js
/**
* @fileoverview Rule to enforce line breaks after each array element
* @author Jan Peer Stöcklmair <https://github.com/JPeer264>
* @deprecated in ESLint v8.53.0
*/
var require_array_element_newline = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "array-element-newline",
						url: "https://eslint.style/rules/array-element-newline"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce line breaks after each array element",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/array-element-newline"
			},
			fixable: "whitespace",
			schema: {
				definitions: { basicConfig: { oneOf: [{ enum: [
					"always",
					"never",
					"consistent"
				] }, {
					type: "object",
					properties: {
						multiline: { type: "boolean" },
						minItems: {
							type: ["integer", "null"],
							minimum: 0
						}
					},
					additionalProperties: !1
				}] } },
				type: "array",
				items: [{ oneOf: [{ $ref: "#/definitions/basicConfig" }, {
					type: "object",
					properties: {
						ArrayExpression: { $ref: "#/definitions/basicConfig" },
						ArrayPattern: { $ref: "#/definitions/basicConfig" }
					},
					additionalProperties: !1,
					minProperties: 1
				}] }]
			},
			messages: {
				unexpectedLineBreak: "There should be no linebreak here.",
				missingLineBreak: "There should be a linebreak after this element."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Normalizes a given option value.
			* @param {string|Object|undefined} providedOption An option value to parse.
			* @returns {{multiline: boolean, minItems: number}} Normalized option object.
			*/
			function normalizeOptionValue(providedOption) {
				let consistent = !1, multiline = !1, minItems, option = providedOption || "always";
				return !option || option === "always" || option.minItems === 0 ? minItems = 0 : option === "never" ? minItems = Infinity : option === "consistent" ? (consistent = !0, minItems = Infinity) : (multiline = !!option.multiline, minItems = option.minItems || Infinity), {
					consistent,
					multiline,
					minItems
				};
			}
			/**
			* Normalizes a given option value.
			* @param {string|Object|undefined} options An option value to parse.
			* @returns {{ArrayExpression: {multiline: boolean, minItems: number}, ArrayPattern: {multiline: boolean, minItems: number}}} Normalized option object.
			*/
			function normalizeOptions(options) {
				if (options && (options.ArrayExpression || options.ArrayPattern)) {
					let expressionOptions, patternOptions;
					return options.ArrayExpression && (expressionOptions = normalizeOptionValue(options.ArrayExpression)), options.ArrayPattern && (patternOptions = normalizeOptionValue(options.ArrayPattern)), {
						ArrayExpression: expressionOptions,
						ArrayPattern: patternOptions
					};
				}
				let value = normalizeOptionValue(options);
				return {
					ArrayExpression: value,
					ArrayPattern: value
				};
			}
			/**
			* Reports that there shouldn't be a line break after the first token
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportNoLineBreak(token) {
				let tokenBefore = sourceCode.getTokenBefore(token, { includeComments: !0 });
				context.report({
					loc: {
						start: tokenBefore.loc.end,
						end: token.loc.start
					},
					messageId: "unexpectedLineBreak",
					fix(fixer) {
						if (astUtils.isCommentToken(tokenBefore)) return null;
						if (!astUtils.isTokenOnSameLine(tokenBefore, token)) return fixer.replaceTextRange([tokenBefore.range[1], token.range[0]], " ");
						let twoTokensBefore = sourceCode.getTokenBefore(tokenBefore, { includeComments: !0 });
						return astUtils.isCommentToken(twoTokensBefore) ? null : fixer.replaceTextRange([twoTokensBefore.range[1], tokenBefore.range[0]], "");
					}
				});
			}
			/**
			* Reports that there should be a line break after the first token
			* @param {Token} token The token to use for the report.
			* @returns {void}
			*/
			function reportRequiredLineBreak(token) {
				let tokenBefore = sourceCode.getTokenBefore(token, { includeComments: !0 });
				context.report({
					loc: {
						start: tokenBefore.loc.end,
						end: token.loc.start
					},
					messageId: "missingLineBreak",
					fix(fixer) {
						return fixer.replaceTextRange([tokenBefore.range[1], token.range[0]], "\n");
					}
				});
			}
			/**
			* Reports a given node if it violated this rule.
			* @param {ASTNode} node A node to check. This is an ObjectExpression node or an ObjectPattern node.
			* @returns {void}
			*/
			function check(node) {
				let elements = node.elements, options = normalizeOptions(context.options[0])[node.type];
				if (!options) return;
				let elementBreak = !1;
				options.multiline && (elementBreak = elements.filter((element) => element !== null).some((element) => element.loc.start.line !== element.loc.end.line));
				let linebreaksCount = 0;
				for (let i = 0; i < node.elements.length; i++) {
					let element = node.elements[i], previousElement = elements[i - 1];
					if (i === 0 || element === null || previousElement === null) continue;
					let commaToken = sourceCode.getFirstTokenBetween(previousElement, element, astUtils.isCommaToken), lastTokenOfPreviousElement = sourceCode.getTokenBefore(commaToken), firstTokenOfCurrentElement = sourceCode.getTokenAfter(commaToken);
					astUtils.isTokenOnSameLine(lastTokenOfPreviousElement, firstTokenOfCurrentElement) || linebreaksCount++;
				}
				let needsLinebreaks = elements.length >= options.minItems || options.multiline && elementBreak || options.consistent && linebreaksCount > 0 && linebreaksCount < node.elements.length;
				elements.forEach((element, i) => {
					let previousElement = elements[i - 1];
					if (i === 0 || element === null || previousElement === null) return;
					let commaToken = sourceCode.getFirstTokenBetween(previousElement, element, astUtils.isCommaToken), lastTokenOfPreviousElement = sourceCode.getTokenBefore(commaToken), firstTokenOfCurrentElement = sourceCode.getTokenAfter(commaToken);
					needsLinebreaks ? astUtils.isTokenOnSameLine(lastTokenOfPreviousElement, firstTokenOfCurrentElement) && reportRequiredLineBreak(firstTokenOfCurrentElement) : astUtils.isTokenOnSameLine(lastTokenOfPreviousElement, firstTokenOfCurrentElement) || reportNoLineBreak(firstTokenOfCurrentElement);
				});
			}
			return {
				ArrayPattern: check,
				ArrayExpression: check
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/array-element-newline.cjs
module.exports = require_array_element_newline().create;
//#endregion
