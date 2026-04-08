const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-throw-literal.js
/**
* @fileoverview Rule to restrict what can be thrown as an exception.
* @author Dieter Oberkofler
*/
var require_no_throw_literal = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow throwing literals as exceptions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-throw-literal"
			},
			schema: [],
			messages: {
				object: "Expected an error object to be thrown.",
				undef: "Do not throw undefined."
			}
		},
		create(context) {
			return { ThrowStatement(node) {
				astUtils.couldBeError(node.argument) ? node.argument.type === "Identifier" && node.argument.name === "undefined" && context.report({
					node,
					messageId: "undef"
				}) : context.report({
					node,
					messageId: "object"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-throw-literal.cjs
module.exports = require_no_throw_literal().create;
//#endregion
