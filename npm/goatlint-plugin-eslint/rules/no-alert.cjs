const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-alert.js
/**
* @fileoverview Rule to flag use of alert, confirm, prompt
* @author Nicholas C. Zakas
*/
var require_no_alert = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { getStaticPropertyName: getPropertyName, getVariableByName, skipChainExpression } = require_ast_utils$1.t();
	/**
	* Checks if the given name is a prohibited identifier.
	* @param {string} name The name to check
	* @returns {boolean} Whether or not the name is prohibited.
	*/
	function isProhibitedIdentifier(name) {
		return /^(?:alert|confirm|prompt)$/u.test(name);
	}
	/**
	* Finds the eslint-scope reference in the given scope.
	* @param {Object} scope The scope to search.
	* @param {ASTNode} node The identifier node.
	* @returns {Reference|null} Returns the found reference or null if none were found.
	*/
	function findReference(scope, node) {
		let references = scope.references.filter((reference) => reference.identifier.range[0] === node.range[0] && reference.identifier.range[1] === node.range[1]);
		return references.length === 1 ? references[0] : null;
	}
	/**
	* Checks if the given identifier node is shadowed in the given scope.
	* @param {Object} scope The current scope.
	* @param {string} node The identifier node to check
	* @returns {boolean} Whether or not the name is shadowed.
	*/
	function isShadowed(scope, node) {
		let reference = findReference(scope, node);
		return reference && reference.resolved && reference.resolved.defs.length > 0;
	}
	/**
	* Checks if the given identifier node is a ThisExpression in the global scope or the global window property.
	* @param {Object} scope The current scope.
	* @param {string} node The identifier node to check
	* @returns {boolean} Whether or not the node is a reference to the global object.
	*/
	function isGlobalThisReferenceOrGlobalWindow(scope, node) {
		return scope.type === "global" && node.type === "ThisExpression" ? !0 : node.type === "Identifier" && (node.name === "window" || node.name === "globalThis" && getVariableByName(scope, "globalThis")) ? !isShadowed(scope, node) : !1;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow the use of `alert`, `confirm`, and `prompt`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-alert"
			},
			schema: [],
			messages: { unexpected: "Unexpected {{name}}." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { CallExpression(node) {
				let callee = skipChainExpression(node.callee), currentScope = sourceCode.getScope(node);
				if (callee.type === "Identifier") {
					let name = callee.name;
					!isShadowed(currentScope, callee) && isProhibitedIdentifier(callee.name) && context.report({
						node,
						messageId: "unexpected",
						data: { name }
					});
				} else if (callee.type === "MemberExpression" && isGlobalThisReferenceOrGlobalWindow(currentScope, callee.object)) {
					let name = getPropertyName(callee);
					isProhibitedIdentifier(name) && context.report({
						node,
						messageId: "unexpected",
						data: { name }
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-alert.cjs
module.exports = require_no_alert().create;
//#endregion
