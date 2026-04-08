const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/newline-per-chained-call.js
/**
* @fileoverview Rule to ensure newline per method call when chaining calls
* @author Rajendra Patil
* @author Burak Yigit Kaya
* @deprecated in ESLint v8.53.0
*/
var require_newline_per_chained_call = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
						name: "newline-per-chained-call",
						url: "https://eslint.style/rules/newline-per-chained-call"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require a newline after each call in a method chain",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/newline-per-chained-call"
			},
			fixable: "whitespace",
			schema: [{
				type: "object",
				properties: { ignoreChainWithDepth: {
					type: "integer",
					minimum: 1,
					maximum: 10,
					default: 2
				} },
				additionalProperties: !1
			}],
			messages: { expected: "Expected line break before `{{callee}}`." }
		},
		create(context) {
			let ignoreChainWithDepth = (context.options[0] || {}).ignoreChainWithDepth || 2, sourceCode = context.sourceCode;
			/**
			* Get the prefix of a given MemberExpression node.
			* If the MemberExpression node is a computed value it returns a
			* left bracket. If not it returns a period.
			* @param {ASTNode} node A MemberExpression node to get
			* @returns {string} The prefix of the node.
			*/
			function getPrefix(node) {
				return node.computed ? node.optional ? "?.[" : "[" : node.optional ? "?." : ".";
			}
			/**
			* Gets the property text of a given MemberExpression node.
			* If the text is multiline, this returns only the first line.
			* @param {ASTNode} node A MemberExpression node to get.
			* @returns {string} The property text of the node.
			*/
			function getPropertyText(node) {
				let prefix = getPrefix(node), lines = sourceCode.getText(node.property).split(astUtils.LINEBREAK_MATCHER), suffix = node.computed && lines.length === 1 ? "]" : "";
				return prefix + lines[0] + suffix;
			}
			return { "CallExpression:exit"(node) {
				let callee = astUtils.skipChainExpression(node.callee);
				if (callee.type !== "MemberExpression") return;
				let parent = astUtils.skipChainExpression(callee.object), depth = 1;
				for (; parent && parent.callee;) depth += 1, parent = astUtils.skipChainExpression(astUtils.skipChainExpression(parent.callee).object);
				if (depth > ignoreChainWithDepth && astUtils.isTokenOnSameLine(callee.object, callee.property)) {
					let firstTokenAfterObject = sourceCode.getTokenAfter(callee.object, astUtils.isNotClosingParenToken);
					context.report({
						node: callee.property,
						loc: {
							start: firstTokenAfterObject.loc.start,
							end: callee.loc.end
						},
						messageId: "expected",
						data: { callee: getPropertyText(callee) },
						fix(fixer) {
							return fixer.insertTextBefore(firstTokenAfterObject, "\n");
						}
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/newline-per-chained-call.cjs
module.exports = require_newline_per_chained_call().create;
//#endregion
