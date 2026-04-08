const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-proto.js
/**
* @fileoverview Rule to flag usage of __proto__ property
* @author Ilya Volodin
*/
var require_no_proto = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { getStaticPropertyName } = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow the use of the `__proto__` property",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-proto"
			},
			schema: [],
			messages: { unexpectedProto: "The '__proto__' property is deprecated." }
		},
		create(context) {
			return { MemberExpression(node) {
				getStaticPropertyName(node) === "__proto__" && context.report({
					node,
					messageId: "unexpectedProto"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-proto.cjs
module.exports = require_no_proto().create;
//#endregion
