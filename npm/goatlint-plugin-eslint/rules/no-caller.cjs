//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-caller.js
/**
* @fileoverview Rule to flag use of arguments.callee and arguments.caller.
* @author Nicholas C. Zakas
*/
var require_no_caller = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow the use of `arguments.caller` or `arguments.callee`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-caller"
			},
			schema: [],
			messages: { unexpected: "Avoid arguments.{{prop}}." }
		},
		create(context) {
			return { MemberExpression(node) {
				let objectName = node.object.name, propertyName = node.property.name;
				objectName === "arguments" && !node.computed && propertyName && propertyName.match(/^calle[er]$/u) && context.report({
					node,
					messageId: "unexpected",
					data: { prop: propertyName }
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-caller.cjs
module.exports = require_no_caller().create;
//#endregion
