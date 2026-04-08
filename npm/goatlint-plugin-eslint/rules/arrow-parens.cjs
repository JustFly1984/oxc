const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/arrow-parens.js
/**
* @fileoverview Rule to require parens in arrow function arguments.
* @author Jxck
* @deprecated in ESLint v8.53.0
*/
var require_arrow_parens = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Determines if the given arrow function has block body.
	* @param {ASTNode} node `ArrowFunctionExpression` node.
	* @returns {boolean} `true` if the function has block body.
	*/
	function hasBlockBody(node) {
		return node.body.type === "BlockStatement";
	}
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
						name: "arrow-parens",
						url: "https://eslint.style/rules/arrow-parens"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require parentheses around arrow function arguments",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/arrow-parens"
			},
			fixable: "code",
			schema: [{ enum: ["always", "as-needed"] }, {
				type: "object",
				properties: { requireForBlockBody: {
					type: "boolean",
					default: !1
				} },
				additionalProperties: !1
			}],
			messages: {
				unexpectedParens: "Unexpected parentheses around single function argument.",
				expectedParens: "Expected parentheses around arrow function argument.",
				unexpectedParensInline: "Unexpected parentheses around single function argument having a body with no curly braces.",
				expectedParensBlock: "Expected parentheses around arrow function argument having a body with curly braces."
			}
		},
		create(context) {
			let asNeeded = context.options[0] === "as-needed", requireForBlockBody = asNeeded && context.options[1] && context.options[1].requireForBlockBody === !0, sourceCode = context.sourceCode;
			/**
			* Finds opening paren of parameters for the given arrow function, if it exists.
			* It is assumed that the given arrow function has exactly one parameter.
			* @param {ASTNode} node `ArrowFunctionExpression` node.
			* @returns {Token|null} the opening paren, or `null` if the given arrow function doesn't have parens of parameters.
			*/
			function findOpeningParenOfParams(node) {
				let tokenBeforeParams = sourceCode.getTokenBefore(node.params[0]);
				return tokenBeforeParams && astUtils.isOpeningParenToken(tokenBeforeParams) && node.range[0] <= tokenBeforeParams.range[0] ? tokenBeforeParams : null;
			}
			/**
			* Finds closing paren of parameters for the given arrow function.
			* It is assumed that the given arrow function has parens of parameters and that it has exactly one parameter.
			* @param {ASTNode} node `ArrowFunctionExpression` node.
			* @returns {Token} the closing paren of parameters.
			*/
			function getClosingParenOfParams(node) {
				return sourceCode.getTokenAfter(node.params[0], astUtils.isClosingParenToken);
			}
			/**
			* Determines whether the given arrow function has comments inside parens of parameters.
			* It is assumed that the given arrow function has parens of parameters.
			* @param {ASTNode} node `ArrowFunctionExpression` node.
			* @param {Token} openingParen Opening paren of parameters.
			* @returns {boolean} `true` if the function has at least one comment inside of parens of parameters.
			*/
			function hasCommentsInParensOfParams(node, openingParen) {
				return sourceCode.commentsExistBetween(openingParen, getClosingParenOfParams(node));
			}
			/**
			* Determines whether the given arrow function has unexpected tokens before opening paren of parameters,
			* in which case it will be assumed that the existing parens of parameters are necessary.
			* Only tokens within the range of the arrow function (tokens that are part of the arrow function) are taken into account.
			* Example: <T>(a) => b
			* @param {ASTNode} node `ArrowFunctionExpression` node.
			* @param {Token} openingParen Opening paren of parameters.
			* @returns {boolean} `true` if the function has at least one unexpected token.
			*/
			function hasUnexpectedTokensBeforeOpeningParen(node, openingParen) {
				let expectedCount = node.async ? 1 : 0;
				return sourceCode.getFirstToken(node, { skip: expectedCount }) !== openingParen;
			}
			return { "ArrowFunctionExpression[params.length=1]"(node) {
				let shouldHaveParens = !asNeeded || requireForBlockBody && hasBlockBody(node), openingParen = findOpeningParenOfParams(node), hasParens = openingParen !== null, [param] = node.params;
				shouldHaveParens && !hasParens && context.report({
					node,
					messageId: requireForBlockBody ? "expectedParensBlock" : "expectedParens",
					loc: param.loc,
					*fix(fixer) {
						yield fixer.insertTextBefore(param, "("), yield fixer.insertTextAfter(param, ")");
					}
				}), !shouldHaveParens && hasParens && param.type === "Identifier" && !param.typeAnnotation && !node.returnType && !hasCommentsInParensOfParams(node, openingParen) && !hasUnexpectedTokensBeforeOpeningParen(node, openingParen) && context.report({
					node,
					messageId: requireForBlockBody ? "unexpectedParensInline" : "unexpectedParens",
					loc: param.loc,
					*fix(fixer) {
						let tokenBeforeOpeningParen = sourceCode.getTokenBefore(openingParen), closingParen = getClosingParenOfParams(node);
						tokenBeforeOpeningParen && tokenBeforeOpeningParen.range[1] === openingParen.range[0] && !astUtils.canTokensBeAdjacent(tokenBeforeOpeningParen, sourceCode.getFirstToken(param)) && (yield fixer.insertTextBefore(openingParen, " ")), yield fixer.removeRange([openingParen.range[0], param.range[0]]), yield fixer.removeRange([param.range[1], closingParen.range[1]]);
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/arrow-parens.cjs
module.exports = require_arrow_parens().create;
//#endregion
