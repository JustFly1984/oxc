//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/guard-for-in.js
/**
* @fileoverview Rule to flag for-in loops without if statements inside
* @author Nicholas C. Zakas
*/
var require_guard_for_in = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require `for-in` loops to include an `if` statement",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/guard-for-in"
			},
			schema: [],
			messages: { wrap: "The body of a for-in should be wrapped in an if statement to filter unwanted properties from the prototype." }
		},
		create(context) {
			return { ForInStatement(node) {
				let body = node.body;
				if (body.type !== "EmptyStatement" && body.type !== "IfStatement" && !(body.type === "BlockStatement" && body.body.length === 0) && !(body.type === "BlockStatement" && body.body.length === 1 && body.body[0].type === "IfStatement")) {
					if (body.type === "BlockStatement" && body.body.length >= 1 && body.body[0].type === "IfStatement") {
						let i = body.body[0];
						if (i.consequent.type === "ContinueStatement" || i.consequent.type === "BlockStatement" && i.consequent.body.length === 1 && i.consequent.body[0].type === "ContinueStatement") return;
					}
					context.report({
						node,
						messageId: "wrap"
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/guard-for-in.cjs
module.exports = require_guard_for_in().create;
//#endregion
