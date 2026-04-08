//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-undefined.js
/**
* @fileoverview Rule to flag references to the undefined variable.
* @author Michael Ficarra
*/
var require_no_undefined = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow the use of `undefined` as an identifier",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-undefined"
			},
			schema: [],
			messages: { unexpectedUndefined: "Unexpected use of undefined." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Report an invalid "undefined" identifier node.
			* @param {ASTNode} node The node to report.
			* @returns {void}
			*/
			function report(node) {
				context.report({
					node,
					messageId: "unexpectedUndefined"
				});
			}
			/**
			* Checks the given scope for references to `undefined` and reports
			* all references found.
			* @param {eslint-scope.Scope} scope The scope to check.
			* @returns {void}
			*/
			function checkScope(scope) {
				let undefinedVar = scope.set.get("undefined");
				if (!undefinedVar) return;
				let references = undefinedVar.references, defs = undefinedVar.defs;
				references.filter((ref) => !ref.init).forEach((ref) => report(ref.identifier)), defs.forEach((def) => report(def.name));
			}
			return { "Program:exit"(node) {
				let stack = [sourceCode.getScope(node)];
				for (; stack.length;) {
					let scope = stack.pop();
					stack.push(...scope.childScopes), checkScope(scope);
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-undefined.cjs
module.exports = require_no_undefined().create;
//#endregion
