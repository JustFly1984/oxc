//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-constructor-return.js
/**
* @fileoverview Rule to disallow returning value from constructor.
* @author Pig Fang <https://github.com/g-plane>
*/
var require_no_constructor_return = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow returning value from constructor",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-constructor-return"
			},
			schema: [],
			fixable: null,
			messages: { unexpected: "Unexpected return statement in constructor." }
		},
		create(context) {
			let stack = [];
			return {
				onCodePathStart(_, node) {
					stack.push(node);
				},
				onCodePathEnd() {
					stack.pop();
				},
				ReturnStatement(node) {
					let last = stack.at(-1);
					last.parent && last.parent.type === "MethodDefinition" && last.parent.kind === "constructor" && node.argument && context.report({
						node,
						messageId: "unexpected"
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-constructor-return.cjs
module.exports = require_no_constructor_return().create;
//#endregion
