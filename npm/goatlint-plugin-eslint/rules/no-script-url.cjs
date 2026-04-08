const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-script-url.js
/**
* @fileoverview Rule to disallow `javascript:` URLs
* @author Ilya Volodin
*/
var require_no_script_url = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow `javascript:` URLs",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-script-url"
			},
			schema: [],
			messages: { unexpectedScriptURL: "Script URL is a form of eval." }
		},
		create(context) {
			/**
			* Check whether a node's static value starts with `javascript:` or not.
			* And report an error for unexpected script URL.
			* @param {ASTNode} node node to check
			* @returns {void}
			*/
			function check(node) {
				let value = astUtils.getStaticStringValue(node);
				typeof value == "string" && value.toLowerCase().indexOf("javascript:") === 0 && context.report({
					node,
					messageId: "unexpectedScriptURL"
				});
			}
			return {
				Literal(node) {
					node.value && typeof node.value == "string" && check(node);
				},
				TemplateLiteral(node) {
					node.parent && node.parent.type === "TaggedTemplateExpression" || check(node);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-script-url.cjs
module.exports = require_no_script_url().create;
//#endregion
