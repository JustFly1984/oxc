//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-rest-params.js
/**
* @fileoverview Rule to
* @author Toru Nagashima
*/
var require_prefer_rest_params = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/**
	* Gets the variable object of `arguments` which is defined implicitly.
	* @param {eslint-scope.Scope} scope A scope to get.
	* @returns {eslint-scope.Variable} The found variable object.
	*/
	function getVariableOfArguments(scope) {
		let variables = scope.variables;
		for (let i = 0; i < variables.length; ++i) {
			let variable = variables[i];
			if (variable.name === "arguments") return variable.identifiers.length === 0 ? variable : null;
		}
		/* c8 ignore next */
		return null;
	}
	/**
	* Checks if the given reference is not normal member access.
	*
	* - arguments         .... true    // not member access
	* - arguments[i]      .... true    // computed member access
	* - arguments[0]      .... true    // computed member access
	* - arguments.length  .... false   // normal member access
	* @param {eslint-scope.Reference} reference The reference to check.
	* @returns {boolean} `true` if the reference is not normal member access.
	*/
	function isNotNormalMemberAccess(reference) {
		let id = reference.identifier, parent = id.parent;
		return !(parent.type === "MemberExpression" && parent.object === id && !parent.computed);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require rest parameters instead of `arguments`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/prefer-rest-params"
			},
			schema: [],
			messages: { preferRestParams: "Use the rest parameters instead of 'arguments'." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Reports a given reference.
			* @param {eslint-scope.Reference} reference A reference to report.
			* @returns {void}
			*/
			function report(reference) {
				context.report({
					node: reference.identifier,
					loc: reference.identifier.loc,
					messageId: "preferRestParams"
				});
			}
			/**
			* Reports references of the implicit `arguments` variable if exist.
			* @param {ASTNode} node The node representing the function.
			* @returns {void}
			*/
			function checkForArguments(node) {
				let argumentsVar = getVariableOfArguments(sourceCode.getScope(node));
				argumentsVar && argumentsVar.references.filter(isNotNormalMemberAccess).forEach(report);
			}
			return {
				"FunctionDeclaration:exit": checkForArguments,
				"FunctionExpression:exit": checkForArguments
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-rest-params.cjs
module.exports = require_prefer_rest_params().create;
//#endregion
