const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-invalid-this.js
/**
* @fileoverview A rule to disallow `this` keywords in contexts where the value of `this` is `undefined`.
* @author Toru Nagashima
*/
var require_no_invalid_this = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Determines if the given code path is a code path with lexical `this` binding.
	* That is, if `this` within the code path refers to `this` of surrounding code path.
	* @param {CodePath} codePath Code path.
	* @param {ASTNode} node Node that started the code path.
	* @returns {boolean} `true` if it is a code path with lexical `this` binding.
	*/
	function isCodePathWithLexicalThis(codePath, node) {
		return codePath.origin === "function" && node.type === "ArrowFunctionExpression";
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			dialects: ["javascript", "typescript"],
			language: "javascript",
			type: "suggestion",
			defaultOptions: [{ capIsConstructor: !0 }],
			docs: {
				description: "Disallow use of `this` in contexts where the value of `this` is `undefined`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-invalid-this"
			},
			schema: [{
				type: "object",
				properties: { capIsConstructor: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { unexpectedThis: "Unexpected 'this'." }
		},
		create(context) {
			let [{ capIsConstructor }] = context.options, stack = [], sourceCode = context.sourceCode;
			return stack.getCurrent = function() {
				let current = this.at(-1);
				return current.init || (current.init = !0, current.valid = !astUtils.isDefaultThisBinding(current.node, sourceCode, { capIsConstructor })), current;
			}, {
				onCodePathStart(codePath, node) {
					if (!isCodePathWithLexicalThis(codePath, node)) {
						if (codePath.origin === "program") {
							let scope = sourceCode.getScope(node), features = context.languageOptions.parserOptions.ecmaFeatures || {};
							stack.push({
								init: !0,
								node,
								valid: !(node.sourceType === "module" || features.globalReturn && scope.childScopes[0].isStrict)
							});
							return;
						}
						stack.push({
							init: !sourceCode.getScope(node).isStrict,
							node,
							valid: !0
						});
					}
				},
				onCodePathEnd(codePath, node) {
					isCodePathWithLexicalThis(codePath, node) || stack.pop();
				},
				"AccessorProperty > *.value"(node) {
					stack.push({
						init: !0,
						node,
						valid: !0
					});
				},
				"AccessorProperty:exit"() {
					stack.pop();
				},
				ThisExpression(node) {
					if (node.parent.type === "AccessorProperty" && node.parent.value === node) return;
					let current = stack.getCurrent();
					current && !current.valid && context.report({
						node,
						messageId: "unexpectedThis"
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-invalid-this.cjs
module.exports = require_no_invalid_this().create;
//#endregion
