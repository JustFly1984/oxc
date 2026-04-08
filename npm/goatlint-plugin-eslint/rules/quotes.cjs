const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/quotes.js
/**
* @fileoverview A rule to choose between single and double quote marks
* @author Matt DuVall <http://www.mattduvall.com/>, Brandon Payton
* @deprecated in ESLint v8.53.0
*/
var require_quotes = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), QUOTE_SETTINGS = {
		double: {
			quote: "\"",
			alternateQuote: "'",
			description: "doublequote"
		},
		single: {
			quote: "'",
			alternateQuote: "\"",
			description: "singlequote"
		},
		backtick: {
			quote: "`",
			alternateQuote: "\"",
			description: "backtick"
		}
	}, UNESCAPED_LINEBREAK_PATTERN = new RegExp(String.raw`(^|[^\\])(\\\\)*[${Array.from(astUtils.LINEBREAKS).join("")}]`, "u");
	/** @type {import('../types').Rule.RuleModule} */
	QUOTE_SETTINGS.double.convert = QUOTE_SETTINGS.single.convert = QUOTE_SETTINGS.backtick.convert = function(str) {
		let newQuote = this.quote, oldQuote = str[0];
		return newQuote === oldQuote ? str : newQuote + str.slice(1, -1).replace(/\\(\$\{|\r\n?|\n|.)|["'`]|\$\{|(\r\n?|\n)/gu, (match, escaped, newline) => escaped === oldQuote || oldQuote === "`" && escaped === "${" ? escaped : match === newQuote || newQuote === "`" && match === "${" ? `\\${match}` : newline && oldQuote === "`" ? "\\n" : match) + newQuote;
	}, module.exports = {
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
						name: "quotes",
						url: "https://eslint.style/rules/quotes"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce the consistent use of either backticks, double, or single quotes",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/quotes"
			},
			fixable: "code",
			schema: [{ enum: [
				"single",
				"double",
				"backtick"
			] }, { anyOf: [{ enum: ["avoid-escape"] }, {
				type: "object",
				properties: {
					avoidEscape: { type: "boolean" },
					allowTemplateLiterals: { type: "boolean" }
				},
				additionalProperties: !1
			}] }],
			messages: { wrongQuotes: "Strings must use {{description}}." }
		},
		create(context) {
			let quoteOption = context.options[0], settings = QUOTE_SETTINGS[quoteOption || "double"], options = context.options[1], allowTemplateLiterals = options && options.allowTemplateLiterals === !0, sourceCode = context.sourceCode, avoidEscape = options && options.avoidEscape === !0;
			options === "avoid-escape" && (avoidEscape = !0);
			/**
			* Determines if a given node is part of JSX syntax.
			*
			* This function returns `true` in the following cases:
			*
			* - `<div className="foo"></div>` ... If the literal is an attribute value, the parent of the literal is `JSXAttribute`.
			* - `<div>foo</div>` ... If the literal is a text content, the parent of the literal is `JSXElement`.
			* - `<>foo</>` ... If the literal is a text content, the parent of the literal is `JSXFragment`.
			*
			* In particular, this function returns `false` in the following cases:
			*
			* - `<div className={"foo"}></div>`
			* - `<div>{"foo"}</div>`
			*
			* In both cases, inside of the braces is handled as normal JavaScript.
			* The braces are `JSXExpressionContainer` nodes.
			* @param {ASTNode} node The Literal node to check.
			* @returns {boolean} True if the node is a part of JSX, false if not.
			* @private
			*/
			function isJSXLiteral(node) {
				return node.parent.type === "JSXAttribute" || node.parent.type === "JSXElement" || node.parent.type === "JSXFragment";
			}
			/**
			* Checks whether or not a given node is a directive.
			* The directive is a `ExpressionStatement` which has only a string literal not surrounded by
			* parentheses.
			* @param {ASTNode} node A node to check.
			* @returns {boolean} Whether or not the node is a directive.
			* @private
			*/
			function isDirective(node) {
				return node.type === "ExpressionStatement" && node.expression.type === "Literal" && typeof node.expression.value == "string" && !astUtils.isParenthesised(sourceCode, node.expression);
			}
			/**
			* Checks whether a specified node is either part of, or immediately follows a (possibly empty) directive prologue.
			* @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-directive-prologues-and-the-use-strict-directive}
			* @param {ASTNode} node A node to check.
			* @returns {boolean} Whether a specified node is either part of, or immediately follows a (possibly empty) directive prologue.
			* @private
			*/
			function isExpressionInOrJustAfterDirectivePrologue(node) {
				if (!astUtils.isTopLevelExpressionStatement(node.parent)) return !1;
				let block = node.parent.parent;
				for (let i = 0; i < block.body.length; ++i) {
					let statement = block.body[i];
					if (statement === node.parent) return !0;
					if (!isDirective(statement)) break;
				}
				return !1;
			}
			/**
			* Checks whether or not a given node is allowed as non backtick.
			* @param {ASTNode} node A node to check.
			* @returns {boolean} Whether or not the node is allowed as non backtick.
			* @private
			*/
			function isAllowedAsNonBacktick(node) {
				let parent = node.parent;
				switch (parent.type) {
					case "ExpressionStatement": return !astUtils.isParenthesised(sourceCode, node) && isExpressionInOrJustAfterDirectivePrologue(node);
					case "Property":
					case "PropertyDefinition":
					case "MethodDefinition": return parent.key === node && !parent.computed;
					case "ImportDeclaration":
					case "ExportNamedDeclaration": return parent.source === node;
					case "ExportAllDeclaration": return parent.exported === node || parent.source === node;
					case "ImportSpecifier": return parent.imported === node;
					case "ExportSpecifier": return parent.local === node || parent.exported === node;
					default: return !1;
				}
			}
			/**
			* Checks whether or not a given TemplateLiteral node is actually using any of the special features provided by template literal strings.
			* @param {ASTNode} node A TemplateLiteral node to check.
			* @returns {boolean} Whether or not the TemplateLiteral node is using any of the special features provided by template literal strings.
			* @private
			*/
			function isUsingFeatureOfTemplateLiteral(node) {
				return !!(node.parent.type === "TaggedTemplateExpression" && node === node.parent.quasi || node.expressions.length > 0 || node.quasis.length >= 1 && UNESCAPED_LINEBREAK_PATTERN.test(node.quasis[0].value.raw));
			}
			return {
				Literal(node) {
					let val = node.value, rawVal = node.raw;
					if (settings && typeof val == "string") {
						let isValid = quoteOption === "backtick" && isAllowedAsNonBacktick(node) || isJSXLiteral(node) || astUtils.isSurroundedBy(rawVal, settings.quote);
						!isValid && avoidEscape && (isValid = astUtils.isSurroundedBy(rawVal, settings.alternateQuote) && rawVal.includes(settings.quote)), isValid || context.report({
							node,
							messageId: "wrongQuotes",
							data: { description: settings.description },
							fix(fixer) {
								return quoteOption === "backtick" && astUtils.hasOctalOrNonOctalDecimalEscapeSequence(rawVal) ? null : fixer.replaceText(node, settings.convert(node.raw));
							}
						});
					}
				},
				TemplateLiteral(node) {
					allowTemplateLiterals || quoteOption === "backtick" || isUsingFeatureOfTemplateLiteral(node) || context.report({
						node,
						messageId: "wrongQuotes",
						data: { description: settings.description },
						fix(fixer) {
							return astUtils.isTopLevelExpressionStatement(node.parent) && !astUtils.isParenthesised(sourceCode, node) ? null : fixer.replaceText(node, settings.convert(sourceCode.getText(node)));
						}
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/quotes.cjs
module.exports = require_quotes().create;
//#endregion
