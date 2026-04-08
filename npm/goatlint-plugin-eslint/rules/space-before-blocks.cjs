const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/space-before-blocks.js
/**
* @fileoverview A rule to ensure whitespace before blocks.
* @author Mathias Schreck <https://github.com/lo1tuma>
* @deprecated in ESLint v8.53.0
*/
var require_space_before_blocks = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether the given node represents the body of a function.
	* @param {ASTNode} node the node to check.
	* @returns {boolean} `true` if the node is function body.
	*/
	function isFunctionBody(node) {
		let parent = node.parent;
		return node.type === "BlockStatement" && astUtils.isFunction(parent) && parent.body === node;
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
						name: "space-before-blocks",
						url: "https://eslint.style/rules/space-before-blocks"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent spacing before blocks",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/space-before-blocks"
			},
			fixable: "whitespace",
			schema: [{ oneOf: [{ enum: ["always", "never"] }, {
				type: "object",
				properties: {
					keywords: { enum: [
						"always",
						"never",
						"off"
					] },
					functions: { enum: [
						"always",
						"never",
						"off"
					] },
					classes: { enum: [
						"always",
						"never",
						"off"
					] }
				},
				additionalProperties: !1
			}] }],
			messages: {
				unexpectedSpace: "Unexpected space before opening brace.",
				missingSpace: "Missing space before opening brace."
			}
		},
		create(context) {
			let config = context.options[0], sourceCode = context.sourceCode, alwaysFunctions = !0, alwaysKeywords = !0, alwaysClasses = !0, neverFunctions = !1, neverKeywords = !1, neverClasses = !1;
			typeof config == "object" ? (alwaysFunctions = config.functions === "always", alwaysKeywords = config.keywords === "always", alwaysClasses = config.classes === "always", neverFunctions = config.functions === "never", neverKeywords = config.keywords === "never", neverClasses = config.classes === "never") : config === "never" && (alwaysFunctions = !1, alwaysKeywords = !1, alwaysClasses = !1, neverFunctions = !0, neverKeywords = !0, neverClasses = !0);
			/**
			* Checks whether the spacing before the given block is already controlled by another rule:
			* - `arrow-spacing` checks spaces after `=>`.
			* - `keyword-spacing` checks spaces after keywords in certain contexts.
			* - `switch-colon-spacing` checks spaces after `:` of switch cases.
			* @param {Token} precedingToken first token before the block.
			* @param {ASTNode|Token} node `BlockStatement` node or `{` token of a `SwitchStatement` node.
			* @returns {boolean} `true` if requiring or disallowing spaces before the given block could produce conflicts with other rules.
			*/
			function isConflicted(precedingToken, node) {
				return astUtils.isArrowToken(precedingToken) || astUtils.isKeywordToken(precedingToken) && !isFunctionBody(node) || astUtils.isColonToken(precedingToken) && node.parent && node.parent.type === "SwitchCase" && precedingToken === astUtils.getSwitchCaseColonToken(node.parent, sourceCode);
			}
			/**
			* Checks the given BlockStatement node has a preceding space if it doesn’t start on a new line.
			* @param {ASTNode|Token} node The AST node of a BlockStatement.
			* @returns {void} undefined.
			*/
			function checkPrecedingSpace(node) {
				let precedingToken = sourceCode.getTokenBefore(node);
				if (precedingToken && !isConflicted(precedingToken, node) && astUtils.isTokenOnSameLine(precedingToken, node)) {
					let hasSpace = sourceCode.isSpaceBetweenTokens(precedingToken, node), requireSpace, requireNoSpace;
					isFunctionBody(node) ? (requireSpace = alwaysFunctions, requireNoSpace = neverFunctions) : node.type === "ClassBody" ? (requireSpace = alwaysClasses, requireNoSpace = neverClasses) : (requireSpace = alwaysKeywords, requireNoSpace = neverKeywords), requireSpace && !hasSpace ? context.report({
						node,
						messageId: "missingSpace",
						fix(fixer) {
							return fixer.insertTextBefore(node, " ");
						}
					}) : requireNoSpace && hasSpace && context.report({
						node,
						messageId: "unexpectedSpace",
						fix(fixer) {
							return fixer.removeRange([precedingToken.range[1], node.range[0]]);
						}
					});
				}
			}
			/**
			* Checks if the CaseBlock of an given SwitchStatement node has a preceding space.
			* @param {ASTNode} node The node of a SwitchStatement.
			* @returns {void} undefined.
			*/
			function checkSpaceBeforeCaseBlock(node) {
				let cases = node.cases, openingBrace;
				openingBrace = cases.length > 0 ? sourceCode.getTokenBefore(cases[0]) : sourceCode.getLastToken(node, 1), checkPrecedingSpace(openingBrace);
			}
			return {
				BlockStatement: checkPrecedingSpace,
				ClassBody: checkPrecedingSpace,
				SwitchStatement: checkSpaceBeforeCaseBlock
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/space-before-blocks.cjs
module.exports = require_space_before_blocks().create;
//#endregion
