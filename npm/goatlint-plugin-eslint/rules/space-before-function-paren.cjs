const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/space-before-function-paren.js
/**
* @fileoverview Rule to validate spacing before function paren.
* @author Mathias Schreck <https://github.com/lo1tuma>
* @deprecated in ESLint v8.53.0
*/
var require_space_before_function_paren = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "space-before-function-paren",
						url: "https://eslint.style/rules/space-before-function-paren"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent spacing before `function` definition opening parenthesis",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/space-before-function-paren"
			},
			fixable: "whitespace",
			schema: [{ oneOf: [{ enum: ["always", "never"] }, {
				type: "object",
				properties: {
					anonymous: { enum: [
						"always",
						"never",
						"ignore"
					] },
					named: { enum: [
						"always",
						"never",
						"ignore"
					] },
					asyncArrow: { enum: [
						"always",
						"never",
						"ignore"
					] }
				},
				additionalProperties: !1
			}] }],
			messages: {
				unexpectedSpace: "Unexpected space before function parentheses.",
				missingSpace: "Missing space before function parentheses."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, baseConfig = typeof context.options[0] == "string" ? context.options[0] : "always", overrideConfig = typeof context.options[0] == "object" ? context.options[0] : {};
			/**
			* Determines whether a function has a name.
			* @param {ASTNode} node The function node.
			* @returns {boolean} Whether the function has a name.
			*/
			function isNamedFunction(node) {
				if (node.id) return !0;
				let parent = node.parent;
				return parent.type === "MethodDefinition" || parent.type === "Property" && (parent.kind === "get" || parent.kind === "set" || parent.method);
			}
			/**
			* Gets the config for a given function
			* @param {ASTNode} node The function node
			* @returns {string} "always", "never", or "ignore"
			*/
			function getConfigForFunction(node) {
				if (node.type === "ArrowFunctionExpression") {
					if (node.async && astUtils.isOpeningParenToken(sourceCode.getFirstToken(node, { skip: 1 }))) return overrideConfig.asyncArrow || baseConfig;
				} else if (isNamedFunction(node)) return overrideConfig.named || baseConfig;
				else if (!node.generator) return overrideConfig.anonymous || baseConfig;
				return "ignore";
			}
			/**
			* Checks the parens of a function node
			* @param {ASTNode} node A function node
			* @returns {void}
			*/
			function checkFunction(node) {
				let functionConfig = getConfigForFunction(node);
				if (functionConfig === "ignore") return;
				let rightToken = sourceCode.getFirstToken(node, astUtils.isOpeningParenToken), leftToken = sourceCode.getTokenBefore(rightToken), hasSpacing = sourceCode.isSpaceBetweenTokens(leftToken, rightToken);
				hasSpacing && functionConfig === "never" ? context.report({
					node,
					loc: {
						start: leftToken.loc.end,
						end: rightToken.loc.start
					},
					messageId: "unexpectedSpace",
					fix(fixer) {
						let comments = sourceCode.getCommentsBefore(rightToken);
						return comments.some((comment) => comment.type === "Line") ? null : fixer.replaceTextRange([leftToken.range[1], rightToken.range[0]], comments.reduce((text, comment) => text + sourceCode.getText(comment), ""));
					}
				}) : !hasSpacing && functionConfig === "always" && context.report({
					node,
					loc: rightToken.loc,
					messageId: "missingSpace",
					fix: (fixer) => fixer.insertTextAfter(leftToken, " ")
				});
			}
			return {
				ArrowFunctionExpression: checkFunction,
				FunctionDeclaration: checkFunction,
				FunctionExpression: checkFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/space-before-function-paren.cjs
module.exports = require_space_before_function_paren().create;
//#endregion
