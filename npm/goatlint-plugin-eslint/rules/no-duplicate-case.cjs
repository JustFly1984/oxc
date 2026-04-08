const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-duplicate-case.js
/**
* @fileoverview Rule to disallow a duplicate case label.
* @author Dieter Oberkofler
* @author Burak Yigit Kaya
*/
var require_no_duplicate_case = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow duplicate case labels",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-duplicate-case"
			},
			schema: [],
			messages: { unexpected: "Duplicate case label." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Determines whether the two given nodes are considered to be equal.
			* @param {ASTNode} a First node.
			* @param {ASTNode} b Second node.
			* @returns {boolean} `true` if the nodes are considered to be equal.
			*/
			function equal(a, b) {
				return a.type === b.type ? astUtils.equalTokens(a, b, sourceCode) : !1;
			}
			return { SwitchStatement(node) {
				let previousTests = [];
				for (let switchCase of node.cases) if (switchCase.test) {
					let test = switchCase.test;
					previousTests.some((previousTest) => equal(previousTest, test)) ? context.report({
						node: switchCase,
						messageId: "unexpected"
					}) : previousTests.push(test);
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-duplicate-case.cjs
module.exports = require_no_duplicate_case().create;
//#endregion
