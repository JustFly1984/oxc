const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-dupe-args.js
/**
* @fileoverview Rule to flag duplicate arguments
* @author Jamund Ferguson
*/
var require_no_dupe_args = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow duplicate arguments in `function` definitions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-dupe-args"
			},
			schema: [],
			messages: { unexpected: "Duplicate param '{{name}}'." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Checks whether or not a given definition is a parameter's.
			* @param {eslint-scope.DefEntry} def A definition to check.
			* @returns {boolean} `true` if the definition is a parameter's.
			*/
			function isParameter(def) {
				return def.type === "Parameter";
			}
			/**
			* Determines if a given node has duplicate parameters.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			* @private
			*/
			function checkParams(node) {
				let variables = sourceCode.getDeclaredVariables(node);
				for (let i = 0; i < variables.length; ++i) {
					let variable = variables[i], defs = variable.defs.filter(isParameter), loc = {
						start: astUtils.getOpeningParenOfParams(node, sourceCode).loc.start,
						end: sourceCode.getTokenBefore(node.body).loc.end
					};
					defs.length >= 2 && context.report({
						loc,
						messageId: "unexpected",
						data: { name: variable.name }
					});
				}
			}
			return {
				FunctionDeclaration: checkParams,
				FunctionExpression: checkParams
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-dupe-args.cjs
module.exports = require_no_dupe_args().create;
//#endregion
