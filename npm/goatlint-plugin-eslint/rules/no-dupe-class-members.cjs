const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-dupe-class-members.js
/**
* @fileoverview A rule to disallow duplicate name in class members.
* @author Toru Nagashima
*/
var require_no_dupe_class_members = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			dialects: ["javascript", "typescript"],
			language: "javascript",
			docs: {
				description: "Disallow duplicate class members",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-dupe-class-members"
			},
			schema: [],
			messages: { unexpected: "Duplicate name '{{name}}'." }
		},
		create(context) {
			let stack = [];
			/**
			* Gets state of a given member name.
			* @param {string} name A name of a member.
			* @param {boolean} isStatic A flag which specifies that is a static member.
			* @returns {Object} A state of a given member name.
			*   - retv.init {boolean} A flag which shows the name is declared as normal member.
			*   - retv.get {boolean} A flag which shows the name is declared as getter.
			*   - retv.set {boolean} A flag which shows the name is declared as setter.
			*/
			function getState(name, isStatic) {
				let stateMap = stack.at(-1), key = `$${name}`;
				return stateMap[key] || (stateMap[key] = {
					nonStatic: {
						init: !1,
						get: !1,
						set: !1
					},
					static: {
						init: !1,
						get: !1,
						set: !1
					}
				}), stateMap[key][isStatic ? "static" : "nonStatic"];
			}
			return {
				Program() {
					stack = [];
				},
				ClassBody() {
					stack.push(Object.create(null));
				},
				"ClassBody:exit"() {
					stack.pop();
				},
				"MethodDefinition, PropertyDefinition"(node) {
					if (node.value && node.value.type === "TSEmptyBodyFunctionExpression") return;
					let name = astUtils.getStaticPropertyName(node), kind = node.type === "MethodDefinition" ? node.kind : "field";
					if (name === null || kind === "constructor") return;
					let state = getState(name, node.static), isDuplicate;
					kind === "get" ? (isDuplicate = state.init || state.get, state.get = !0) : kind === "set" ? (isDuplicate = state.init || state.set, state.set = !0) : (isDuplicate = state.init || state.get || state.set, state.init = !0), isDuplicate && context.report({
						loc: node.key.loc,
						messageId: "unexpected",
						data: { name }
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-dupe-class-members.cjs
module.exports = require_no_dupe_class_members().create;
//#endregion
