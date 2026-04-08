//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/handle-callback-err.js
/**
* @fileoverview Ensure handling of errors when we know they exist.
* @author Jamund Ferguson
* @deprecated in ESLint v7.0.0
*/
var require_handle_callback_err = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
						name: "handle-callback-err",
						url: "https://github.com/eslint-community/eslint-plugin-n/tree/master/docs/rules/handle-callback-err.md"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Require error handling in callbacks",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/handle-callback-err"
			},
			schema: [{ type: "string" }],
			messages: { expected: "Expected error to be handled." }
		},
		create(context) {
			let errorArgument = context.options[0] || "err", sourceCode = context.sourceCode;
			/**
			* Checks if the given argument should be interpreted as a regexp pattern.
			* @param {string} stringToCheck The string which should be checked.
			* @returns {boolean} Whether or not the string should be interpreted as a pattern.
			*/
			function isPattern(stringToCheck) {
				return stringToCheck[0] === "^";
			}
			/**
			* Checks if the given name matches the configured error argument.
			* @param {string} name The name which should be compared.
			* @returns {boolean} Whether or not the given name matches the configured error variable name.
			*/
			function matchesConfiguredErrorName(name) {
				return isPattern(errorArgument) ? new RegExp(errorArgument, "u").test(name) : name === errorArgument;
			}
			/**
			* Get the parameters of a given function scope.
			* @param {Object} scope The function scope.
			* @returns {Array} All parameters of the given scope.
			*/
			function getParameters(scope) {
				return scope.variables.filter((variable) => variable.defs[0] && variable.defs[0].type === "Parameter");
			}
			/**
			* Check to see if we're handling the error object properly.
			* @param {ASTNode} node The AST node to check.
			* @returns {void}
			*/
			function checkForError(node) {
				let firstParameter = getParameters(sourceCode.getScope(node))[0];
				firstParameter && matchesConfiguredErrorName(firstParameter.name) && firstParameter.references.length === 0 && context.report({
					node,
					messageId: "expected"
				});
			}
			return {
				FunctionDeclaration: checkForError,
				FunctionExpression: checkForError,
				ArrowFunctionExpression: checkForError
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/handle-callback-err.cjs
module.exports = require_handle_callback_err().create;
//#endregion
