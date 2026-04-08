//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/global-require.js
/**
* @fileoverview Rule for disallowing require() outside of the top-level module context
* @author Jamund Ferguson
* @deprecated in ESLint v7.0.0
*/
var require_global_require = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let ACCEPTABLE_PARENTS = new Set([
		"AssignmentExpression",
		"VariableDeclarator",
		"MemberExpression",
		"ExpressionStatement",
		"CallExpression",
		"ConditionalExpression",
		"Program",
		"VariableDeclaration",
		"ChainExpression"
	]);
	/**
	* Finds the eslint-scope reference in the given scope.
	* @param {Object} scope The scope to search.
	* @param {ASTNode} node The identifier node.
	* @returns {Reference|null} Returns the found reference or null if none were found.
	*/
	function findReference(scope, node) {
		let references = scope.references.filter((reference) => reference.identifier.range[0] === node.range[0] && reference.identifier.range[1] === node.range[1]);
		/* c8 ignore next */
		return references.length === 1 ? references[0] : null;
	}
	/**
	* Checks if the given identifier node is shadowed in the given scope.
	* @param {Object} scope The current scope.
	* @param {ASTNode} node The identifier node to check.
	* @returns {boolean} Whether or not the name is shadowed.
	*/
	function isShadowed(scope, node) {
		let reference = findReference(scope, node);
		return reference && reference.resolved && reference.resolved.defs.length > 0;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Node.js rules were moved out of ESLint core.",
				url: "https://eslint.org/docs/latest/use/migrating-to-7.0.0#deprecate-node-rules",
				deprecatedSince: "7.0.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "eslint-plugin-n now maintains deprecated Node.js-related rules.",
					plugin: {
						name: "eslint-plugin-n",
						url: "https://github.com/eslint-community/eslint-plugin-n"
					},
					rule: {
						name: "global-require",
						url: "https://github.com/eslint-community/eslint-plugin-n/tree/master/docs/rules/global-require.md"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Require `require()` calls to be placed at top-level module scope",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/global-require"
			},
			schema: [],
			messages: { unexpected: "Unexpected require()." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { CallExpression(node) {
				let currentScope = sourceCode.getScope(node);
				node.callee.name === "require" && !isShadowed(currentScope, node.callee) && (sourceCode.getAncestors(node).every((parent) => ACCEPTABLE_PARENTS.has(parent.type)) || context.report({
					node,
					messageId: "unexpected"
				}));
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/global-require.cjs
module.exports = require_global_require().create;
//#endregion
