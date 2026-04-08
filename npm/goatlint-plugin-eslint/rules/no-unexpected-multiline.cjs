const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unexpected-multiline.js
/**
* @fileoverview Rule to spot scenarios where a newline looks like it is ending a statement, but is not.
* @author Glen Mailer
*/
var require_no_unexpected_multiline = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow confusing multiline expressions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-unexpected-multiline"
			},
			schema: [],
			messages: {
				function: "Unexpected newline between function and ( of function call.",
				property: "Unexpected newline between object and [ of property access.",
				taggedTemplate: "Unexpected newline between template tag and template literal.",
				division: "Unexpected newline between numerator and division operator."
			}
		},
		create(context) {
			let REGEX_FLAG_MATCHER = /^[gimsuy]+$/u, sourceCode = context.sourceCode;
			/**
			* Check to see if there is a newline between the node and the following open bracket
			* line's expression
			* @param {ASTNode} node The node to check.
			* @param {string} messageId The error messageId to use.
			* @returns {void}
			* @private
			*/
			function checkForBreakAfter(node, messageId) {
				let openParen = sourceCode.getTokenAfter(node, astUtils.isNotClosingParenToken), nodeExpressionEnd = sourceCode.getTokenBefore(openParen);
				openParen.loc.start.line !== nodeExpressionEnd.loc.end.line && context.report({
					node,
					loc: openParen.loc,
					messageId
				});
			}
			return {
				MemberExpression(node) {
					!node.computed || node.optional || checkForBreakAfter(node.object, "property");
				},
				TaggedTemplateExpression(node) {
					let { quasi } = node;
					sourceCode.getTokenBefore(quasi).loc.end.line !== quasi.loc.start.line && context.report({
						node,
						loc: {
							start: quasi.loc.start,
							end: {
								line: quasi.loc.start.line,
								column: quasi.loc.start.column + 1
							}
						},
						messageId: "taggedTemplate"
					});
				},
				CallExpression(node) {
					node.arguments.length === 0 || node.optional || checkForBreakAfter(node.callee, "function");
				},
				"BinaryExpression[operator='/'] > BinaryExpression[operator='/'].left"(node) {
					let secondSlash = sourceCode.getTokenAfter(node, (token) => token.value === "/"), tokenAfterOperator = sourceCode.getTokenAfter(secondSlash);
					tokenAfterOperator.type === "Identifier" && REGEX_FLAG_MATCHER.test(tokenAfterOperator.value) && secondSlash.range[1] === tokenAfterOperator.range[0] && checkForBreakAfter(node.left, "division");
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unexpected-multiline.cjs
module.exports = require_no_unexpected_multiline().create;
//#endregion
