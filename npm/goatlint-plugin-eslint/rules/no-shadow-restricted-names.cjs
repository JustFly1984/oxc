//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-shadow-restricted-names.js
/**
* @fileoverview Disallow shadowing of globalThis, NaN, undefined, and Infinity (ES2020 section 18.1)
* @author Michael Ficarra
*/
var require_no_shadow_restricted_names = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/**
	* Determines if a variable safely shadows undefined.
	* This is the case when a variable named `undefined` is never assigned to a value (i.e. it always shares the same value
	* as the global).
	* @param {eslintScope.Variable} variable The variable to check
	* @returns {boolean} true if this variable safely shadows `undefined`
	*/
	function safelyShadowsUndefined(variable) {
		return variable.name === "undefined" && variable.references.every((ref) => !ref.isWrite()) && variable.defs.every((def) => def.node.type === "VariableDeclarator" && def.node.init === null);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ reportGlobalThis: !1 }],
			docs: {
				description: "Disallow identifiers from shadowing restricted names",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-shadow-restricted-names"
			},
			schema: [{
				type: "object",
				properties: { reportGlobalThis: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { shadowingRestrictedName: "Shadowing of global property '{{name}}'." }
		},
		create(context) {
			let [{ reportGlobalThis }] = context.options, RESTRICTED = new Set([
				"undefined",
				"NaN",
				"Infinity",
				"arguments",
				"eval"
			]);
			reportGlobalThis && RESTRICTED.add("globalThis");
			let sourceCode = context.sourceCode, reportedNodes = /* @__PURE__ */ new Set();
			return { "VariableDeclaration, :function, CatchClause, ImportDeclaration, ClassDeclaration, ClassExpression"(node) {
				for (let variable of sourceCode.getDeclaredVariables(node)) if (variable.defs.length > 0 && RESTRICTED.has(variable.name) && !safelyShadowsUndefined(variable)) for (let def of variable.defs) {
					let nodeToReport = def.name;
					reportedNodes.has(nodeToReport) || (reportedNodes.add(nodeToReport), context.report({
						node: nodeToReport,
						messageId: "shadowingRestrictedName",
						data: { name: variable.name }
					}));
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-shadow-restricted-names.cjs
module.exports = require_no_shadow_restricted_names().create;
//#endregion
