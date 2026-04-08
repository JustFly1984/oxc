const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/function-paren-newline.js
/**
* @fileoverview enforce consistent line breaks inside function parentheses
* @author Teddy Katz
* @deprecated in ESLint v8.53.0
*/
var require_function_paren_newline = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "function-paren-newline",
						url: "https://eslint.style/rules/function-paren-newline"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent line breaks inside function parentheses",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/function-paren-newline"
			},
			fixable: "whitespace",
			schema: [{ oneOf: [{ enum: [
				"always",
				"never",
				"consistent",
				"multiline",
				"multiline-arguments"
			] }, {
				type: "object",
				properties: { minItems: {
					type: "integer",
					minimum: 0
				} },
				additionalProperties: !1
			}] }],
			messages: {
				expectedBefore: "Expected newline before ')'.",
				expectedAfter: "Expected newline after '('.",
				expectedBetween: "Expected newline between arguments/params.",
				unexpectedBefore: "Unexpected newline before ')'.",
				unexpectedAfter: "Unexpected newline after '('."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, rawOption = context.options[0] || "multiline", multilineOption = rawOption === "multiline", multilineArgumentsOption = rawOption === "multiline-arguments", consistentOption = rawOption === "consistent", minItems;
			minItems = typeof rawOption == "object" ? rawOption.minItems : rawOption === "always" ? 0 : rawOption === "never" ? Infinity : null;
			/**
			* Determines whether there should be newlines inside function parens
			* @param {ASTNode[]} elements The arguments or parameters in the list
			* @param {boolean} hasLeftNewline `true` if the left paren has a newline in the current code.
			* @returns {boolean} `true` if there should be newlines inside the function parens
			*/
			function shouldHaveNewlines(elements, hasLeftNewline) {
				return multilineArgumentsOption && elements.length === 1 ? hasLeftNewline : multilineOption || multilineArgumentsOption ? elements.some((element, index) => index !== elements.length - 1 && element.loc.end.line !== elements[index + 1].loc.start.line) : consistentOption ? hasLeftNewline : elements.length >= minItems;
			}
			/**
			* Validates parens
			* @param {Object} parens An object with keys `leftParen` for the left paren token, and `rightParen` for the right paren token
			* @param {ASTNode[]} elements The arguments or parameters in the list
			* @returns {void}
			*/
			function validateParens(parens, elements) {
				let leftParen = parens.leftParen, rightParen = parens.rightParen, tokenAfterLeftParen = sourceCode.getTokenAfter(leftParen), tokenBeforeRightParen = sourceCode.getTokenBefore(rightParen), hasLeftNewline = !astUtils.isTokenOnSameLine(leftParen, tokenAfterLeftParen), hasRightNewline = !astUtils.isTokenOnSameLine(tokenBeforeRightParen, rightParen), needsNewlines = shouldHaveNewlines(elements, hasLeftNewline);
				hasLeftNewline && !needsNewlines ? context.report({
					node: leftParen,
					messageId: "unexpectedAfter",
					fix(fixer) {
						return sourceCode.getText().slice(leftParen.range[1], tokenAfterLeftParen.range[0]).trim() ? null : fixer.removeRange([leftParen.range[1], tokenAfterLeftParen.range[0]]);
					}
				}) : !hasLeftNewline && needsNewlines && context.report({
					node: leftParen,
					messageId: "expectedAfter",
					fix: (fixer) => fixer.insertTextAfter(leftParen, "\n")
				}), hasRightNewline && !needsNewlines ? context.report({
					node: rightParen,
					messageId: "unexpectedBefore",
					fix(fixer) {
						return sourceCode.getText().slice(tokenBeforeRightParen.range[1], rightParen.range[0]).trim() ? null : fixer.removeRange([tokenBeforeRightParen.range[1], rightParen.range[0]]);
					}
				}) : !hasRightNewline && needsNewlines && context.report({
					node: rightParen,
					messageId: "expectedBefore",
					fix: (fixer) => fixer.insertTextBefore(rightParen, "\n")
				});
			}
			/**
			* Validates a list of arguments or parameters
			* @param {Object} parens An object with keys `leftParen` for the left paren token, and `rightParen` for the right paren token
			* @param {ASTNode[]} elements The arguments or parameters in the list
			* @returns {void}
			*/
			function validateArguments(parens, elements) {
				let leftParen = parens.leftParen, tokenAfterLeftParen = sourceCode.getTokenAfter(leftParen), needsNewlines = shouldHaveNewlines(elements, !astUtils.isTokenOnSameLine(leftParen, tokenAfterLeftParen));
				for (let i = 0; i <= elements.length - 2; i++) {
					let currentElement = elements[i], nextElement = elements[i + 1];
					currentElement.loc.end.line === nextElement.loc.start.line && needsNewlines && context.report({
						node: currentElement,
						messageId: "expectedBetween",
						fix: (fixer) => fixer.insertTextBefore(nextElement, "\n")
					});
				}
			}
			/**
			* Gets the left paren and right paren tokens of a node.
			* @param {ASTNode} node The node with parens
			* @throws {TypeError} Unexpected node type.
			* @returns {Object} An object with keys `leftParen` for the left paren token, and `rightParen` for the right paren token.
			* Can also return `null` if an expression has no parens (e.g. a NewExpression with no arguments, or an ArrowFunctionExpression
			* with a single parameter)
			*/
			function getParenTokens(node) {
				switch (node.type) {
					case "NewExpression": if (!node.arguments.length && !(astUtils.isOpeningParenToken(sourceCode.getLastToken(node, { skip: 1 })) && astUtils.isClosingParenToken(sourceCode.getLastToken(node)) && node.callee.range[1] < node.range[1])) return null;
					case "CallExpression": return {
						leftParen: sourceCode.getTokenAfter(node.callee, astUtils.isOpeningParenToken),
						rightParen: sourceCode.getLastToken(node)
					};
					case "FunctionDeclaration":
					case "FunctionExpression": {
						let leftParen = sourceCode.getFirstToken(node, astUtils.isOpeningParenToken);
						return {
							leftParen,
							rightParen: node.params.length ? sourceCode.getTokenAfter(node.params.at(-1), astUtils.isClosingParenToken) : sourceCode.getTokenAfter(leftParen)
						};
					}
					case "ArrowFunctionExpression": {
						let firstToken = sourceCode.getFirstToken(node, { skip: node.async ? 1 : 0 });
						return astUtils.isOpeningParenToken(firstToken) ? {
							leftParen: firstToken,
							rightParen: node.params.length ? sourceCode.getTokenAfter(node.params.at(-1), astUtils.isClosingParenToken) : sourceCode.getTokenAfter(firstToken)
						} : null;
					}
					case "ImportExpression": return {
						leftParen: sourceCode.getFirstToken(node, 1),
						rightParen: sourceCode.getLastToken(node)
					};
					default: throw TypeError(`unexpected node with type ${node.type}`);
				}
			}
			return { [[
				"ArrowFunctionExpression",
				"CallExpression",
				"FunctionDeclaration",
				"FunctionExpression",
				"ImportExpression",
				"NewExpression"
			]](node) {
				let parens = getParenTokens(node), params;
				params = node.type === "ImportExpression" ? [node.source] : astUtils.isFunction(node) ? node.params : node.arguments, parens && (validateParens(parens, params), multilineArgumentsOption && validateArguments(parens, params));
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/function-paren-newline.cjs
module.exports = require_function_paren_newline().create;
//#endregion
