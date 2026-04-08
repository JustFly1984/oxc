const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/comma-style.js
/**
* @fileoverview Comma style - enforces comma styles of two types: last and first
* @author Vignesh Anand aka vegetableman
* @deprecated in ESLint v8.53.0
*/
var require_comma_style = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "comma-style",
						url: "https://eslint.style/rules/comma-style"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent comma style",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/comma-style"
			},
			fixable: "code",
			schema: [{ enum: ["first", "last"] }, {
				type: "object",
				properties: { exceptions: {
					type: "object",
					additionalProperties: { type: "boolean" }
				} },
				additionalProperties: !1
			}],
			messages: {
				unexpectedLineBeforeAndAfterComma: "Bad line breaking before and after ','.",
				expectedCommaFirst: "',' should be placed first.",
				expectedCommaLast: "',' should be placed last."
			}
		},
		create(context) {
			let style = context.options[0] || "last", sourceCode = context.sourceCode, exceptions = {
				ArrayPattern: !0,
				ArrowFunctionExpression: !0,
				CallExpression: !0,
				FunctionDeclaration: !0,
				FunctionExpression: !0,
				ImportDeclaration: !0,
				ObjectPattern: !0,
				NewExpression: !0
			};
			if (context.options.length === 2 && Object.hasOwn(context.options[1], "exceptions")) {
				let keys = Object.keys(context.options[1].exceptions);
				for (let i = 0; i < keys.length; i++) exceptions[keys[i]] = context.options[1].exceptions[keys[i]];
			}
			/**
			* Modified text based on the style
			* @param {string} styleType Style type
			* @param {string} text Source code text
			* @returns {string} modified text
			* @private
			*/
			function getReplacedText(styleType, text) {
				switch (styleType) {
					case "between": return `,${text.replace(astUtils.LINEBREAK_MATCHER, "")}`;
					case "first": return `${text},`;
					case "last": return `,${text}`;
					default: return "";
				}
			}
			/**
			* Determines the fixer function for a given style.
			* @param {string} styleType comma style
			* @param {ASTNode} previousItemToken The token to check.
			* @param {ASTNode} commaToken The token to check.
			* @param {ASTNode} currentItemToken The token to check.
			* @returns {Function} Fixer function
			* @private
			*/
			function getFixerFunction(styleType, previousItemToken, commaToken, currentItemToken) {
				let text = sourceCode.text.slice(previousItemToken.range[1], commaToken.range[0]) + sourceCode.text.slice(commaToken.range[1], currentItemToken.range[0]), range = [previousItemToken.range[1], currentItemToken.range[0]];
				return function(fixer) {
					return fixer.replaceTextRange(range, getReplacedText(styleType, text));
				};
			}
			/**
			* Validates the spacing around single items in lists.
			* @param {Token} previousItemToken The last token from the previous item.
			* @param {Token} commaToken The token representing the comma.
			* @param {Token} currentItemToken The first token of the current item.
			* @param {Token} reportItem The item to use when reporting an error.
			* @returns {void}
			* @private
			*/
			function validateCommaItemSpacing(previousItemToken, commaToken, currentItemToken, reportItem) {
				if (!(astUtils.isTokenOnSameLine(commaToken, currentItemToken) && astUtils.isTokenOnSameLine(previousItemToken, commaToken))) if (!astUtils.isTokenOnSameLine(commaToken, currentItemToken) && !astUtils.isTokenOnSameLine(previousItemToken, commaToken)) {
					let comment = sourceCode.getCommentsAfter(commaToken)[0], styleType = comment && comment.type === "Block" && astUtils.isTokenOnSameLine(commaToken, comment) ? style : "between";
					context.report({
						node: reportItem,
						loc: commaToken.loc,
						messageId: "unexpectedLineBeforeAndAfterComma",
						fix: getFixerFunction(styleType, previousItemToken, commaToken, currentItemToken)
					});
				} else style === "first" && !astUtils.isTokenOnSameLine(commaToken, currentItemToken) ? context.report({
					node: reportItem,
					loc: commaToken.loc,
					messageId: "expectedCommaFirst",
					fix: getFixerFunction(style, previousItemToken, commaToken, currentItemToken)
				}) : style === "last" && astUtils.isTokenOnSameLine(commaToken, currentItemToken) && context.report({
					node: reportItem,
					loc: commaToken.loc,
					messageId: "expectedCommaLast",
					fix: getFixerFunction(style, previousItemToken, commaToken, currentItemToken)
				});
			}
			/**
			* Checks the comma placement with regards to a declaration/property/element
			* @param {ASTNode} node The binary expression node to check
			* @param {string} property The property of the node containing child nodes.
			* @private
			* @returns {void}
			*/
			function validateComma(node, property) {
				let items = node[property], arrayLiteral = node.type === "ArrayExpression" || node.type === "ArrayPattern";
				if (items.length > 1 || arrayLiteral) {
					let previousItemToken = sourceCode.getFirstToken(node);
					if (items.forEach((item) => {
						let commaToken = item ? sourceCode.getTokenBefore(item) : previousItemToken, currentItemToken = item ? sourceCode.getFirstToken(item) : sourceCode.getTokenAfter(commaToken), reportItem = item || currentItemToken;
						if (astUtils.isCommaToken(commaToken) && validateCommaItemSpacing(previousItemToken, commaToken, currentItemToken, reportItem), item) {
							let tokenAfterItem = sourceCode.getTokenAfter(item, astUtils.isNotClosingParenToken);
							previousItemToken = tokenAfterItem ? sourceCode.getTokenBefore(tokenAfterItem) : sourceCode.ast.tokens.at(-1);
						} else previousItemToken = currentItemToken;
					}), arrayLiteral) {
						let lastToken = sourceCode.getLastToken(node), nextToLastToken = sourceCode.getTokenBefore(lastToken);
						astUtils.isCommaToken(nextToLastToken) && validateCommaItemSpacing(sourceCode.getTokenBefore(nextToLastToken), nextToLastToken, lastToken, lastToken);
					}
				}
			}
			let nodes = {};
			return exceptions.VariableDeclaration || (nodes.VariableDeclaration = function(node) {
				validateComma(node, "declarations");
			}), exceptions.ObjectExpression || (nodes.ObjectExpression = function(node) {
				validateComma(node, "properties");
			}), exceptions.ObjectPattern || (nodes.ObjectPattern = function(node) {
				validateComma(node, "properties");
			}), exceptions.ArrayExpression || (nodes.ArrayExpression = function(node) {
				validateComma(node, "elements");
			}), exceptions.ArrayPattern || (nodes.ArrayPattern = function(node) {
				validateComma(node, "elements");
			}), exceptions.FunctionDeclaration || (nodes.FunctionDeclaration = function(node) {
				validateComma(node, "params");
			}), exceptions.FunctionExpression || (nodes.FunctionExpression = function(node) {
				validateComma(node, "params");
			}), exceptions.ArrowFunctionExpression || (nodes.ArrowFunctionExpression = function(node) {
				validateComma(node, "params");
			}), exceptions.CallExpression || (nodes.CallExpression = function(node) {
				validateComma(node, "arguments");
			}), exceptions.ImportDeclaration || (nodes.ImportDeclaration = function(node) {
				validateComma(node, "specifiers");
			}), exceptions.NewExpression || (nodes.NewExpression = function(node) {
				validateComma(node, "arguments");
			}), nodes;
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/comma-style.cjs
module.exports = require_comma_style().create;
//#endregion
