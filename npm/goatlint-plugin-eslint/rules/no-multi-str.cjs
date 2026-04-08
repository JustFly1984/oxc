const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-multi-str.js
/**
* @fileoverview Rule to flag when using multiline strings
* @author Ilya Volodin
*/
var require_no_multi_str = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow multiline strings",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-multi-str"
			},
			schema: [],
			messages: { multilineString: "Multiline support is limited to browsers supporting ES5 only." }
		},
		create(context) {
			/**
			* Determines if a given node is part of JSX syntax.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} True if the node is a JSX node, false if not.
			* @private
			*/
			function isJSXElement(node) {
				return node.type.indexOf("JSX") === 0;
			}
			return { Literal(node) {
				astUtils.LINEBREAK_MATCHER.test(node.raw) && !isJSXElement(node.parent) && context.report({
					node,
					messageId: "multilineString"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-multi-str.cjs
module.exports = require_no_multi_str().create;
//#endregion
