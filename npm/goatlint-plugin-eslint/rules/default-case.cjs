//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/default-case.js
/**
* @fileoverview require default case in switch statements
* @author Aliaksei Shytkin
*/
var require_default_case = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let DEFAULT_COMMENT_PATTERN = /^no default$/iu;
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{}],
			docs: {
				description: "Require `default` cases in `switch` statements",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/default-case"
			},
			schema: [{
				type: "object",
				properties: { commentPattern: { type: "string" } },
				additionalProperties: !1
			}],
			messages: { missingDefaultCase: "Expected a default case." }
		},
		create(context) {
			let [options] = context.options, commentPattern = options.commentPattern ? new RegExp(options.commentPattern, "u") : DEFAULT_COMMENT_PATTERN, sourceCode = context.sourceCode;
			/**
			* Shortcut to get last element of array
			* @param {*[]} collection Array
			* @returns {any} Last element
			*/
			function last(collection) {
				return collection.at(-1);
			}
			return { SwitchStatement(node) {
				if (node.cases.length && !node.cases.some((v) => v.test === null)) {
					let comment, lastCase = last(node.cases), comments = sourceCode.getCommentsAfter(lastCase);
					comments.length && (comment = last(comments)), (!comment || !commentPattern.test(comment.value.trim())) && context.report({
						node,
						messageId: "missingDefaultCase"
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/default-case.cjs
module.exports = require_default_case().create;
//#endregion
