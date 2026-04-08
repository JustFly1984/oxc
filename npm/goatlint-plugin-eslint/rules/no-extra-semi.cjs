const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_fix_tracker$1 = require("../common/fix-tracker.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-extra-semi.js
/**
* @fileoverview Rule to flag use of unnecessary semicolons
* @author Nicholas C. Zakas
* @deprecated in ESLint v8.53.0
*/
var require_no_extra_semi = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let FixTracker = require_fix_tracker$1.t(), astUtils = require_ast_utils$1.t();
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
						name: "no-extra-semi",
						url: "https://eslint.style/rules/no-extra-semi"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Disallow unnecessary semicolons",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-extra-semi"
			},
			fixable: "code",
			schema: [],
			messages: { unexpected: "Unnecessary semicolon." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Checks if a node or token is fixable.
			* A node is fixable if it can be removed without turning a subsequent statement into a directive after fixing other nodes.
			* @param {Token} nodeOrToken The node or token to check.
			* @returns {boolean} Whether or not the node is fixable.
			*/
			function isFixable(nodeOrToken) {
				let nextToken = sourceCode.getTokenAfter(nodeOrToken);
				if (!nextToken || nextToken.type !== "String") return !0;
				let stringNode = sourceCode.getNodeByRangeIndex(nextToken.range[0]);
				return !astUtils.isTopLevelExpressionStatement(stringNode.parent);
			}
			/**
			* Reports an unnecessary semicolon error.
			* @param {Node|Token} nodeOrToken A node or a token to be reported.
			* @returns {void}
			*/
			function report(nodeOrToken) {
				context.report({
					node: nodeOrToken,
					messageId: "unexpected",
					fix: isFixable(nodeOrToken) ? (fixer) => new FixTracker(fixer, context.sourceCode).retainSurroundingTokens(nodeOrToken).remove(nodeOrToken) : null
				});
			}
			/**
			* Checks for a part of a class body.
			* This checks tokens from a specified token to a next MethodDefinition or the end of class body.
			* @param {Token} firstToken The first token to check.
			* @returns {void}
			*/
			function checkForPartOfClassBody(firstToken) {
				for (let token = firstToken; token.type === "Punctuator" && !astUtils.isClosingBraceToken(token); token = sourceCode.getTokenAfter(token)) astUtils.isSemicolonToken(token) && report(token);
			}
			return {
				EmptyStatement(node) {
					let parent = node.parent;
					[
						"ForStatement",
						"ForInStatement",
						"ForOfStatement",
						"WhileStatement",
						"DoWhileStatement",
						"IfStatement",
						"LabeledStatement",
						"WithStatement"
					].includes(parent.type) || report(node);
				},
				ClassBody(node) {
					checkForPartOfClassBody(sourceCode.getFirstToken(node, 1));
				},
				"MethodDefinition, PropertyDefinition, StaticBlock"(node) {
					checkForPartOfClassBody(sourceCode.getTokenAfter(node));
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-extra-semi.cjs
module.exports = require_no_extra_semi().create;
//#endregion
