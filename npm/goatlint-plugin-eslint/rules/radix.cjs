const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/radix.js
/**
* @fileoverview Rule to flag use of parseInt without a radix argument
* @author James Allardice
*/
var require_radix = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), MODE_ALWAYS = "always", validRadixValues = new Set(Array.from({ length: 35 }, (_, index) => index + 2));
	/**
	* Checks whether a given variable is shadowed or not.
	* @param {eslint-scope.Variable} variable A variable to check.
	* @returns {boolean} `true` if the variable is shadowed.
	*/
	function isShadowed(variable) {
		return variable.defs.length >= 1;
	}
	/**
	* Checks whether a given node is a MemberExpression of `parseInt` method or not.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node is a MemberExpression of `parseInt`
	*      method.
	*/
	function isParseIntMethod(node) {
		return node.type === "MemberExpression" && !node.computed && node.property.type === "Identifier" && node.property.name === "parseInt";
	}
	/**
	* Checks whether a given node is a valid value of radix or not.
	*
	* The following values are invalid.
	*
	* - A literal except integers between 2 and 36.
	* - undefined.
	* @param {ASTNode} radix A node of radix to check.
	* @returns {boolean} `true` if the node is valid.
	*/
	function isValidRadix(radix) {
		return !(radix.type === "Literal" && !validRadixValues.has(radix.value) || radix.type === "Identifier" && radix.name === "undefined");
	}
	/**
	* Checks whether a given node is a default value of radix or not.
	* @param {ASTNode} radix A node of radix to check.
	* @returns {boolean} `true` if the node is the literal node of `10`.
	*/
	function isDefaultRadix(radix) {
		return radix.type === "Literal" && radix.value === 10;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [MODE_ALWAYS],
			docs: {
				description: "Enforce the consistent use of the radix argument when using `parseInt()`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/radix"
			},
			hasSuggestions: !0,
			schema: [{ enum: ["always", "as-needed"] }],
			messages: {
				missingParameters: "Missing parameters.",
				redundantRadix: "Redundant radix parameter.",
				missingRadix: "Missing radix parameter.",
				invalidRadix: "Invalid radix parameter, must be an integer between 2 and 36.",
				addRadixParameter10: "Add radix parameter `10` for parsing decimal numbers."
			}
		},
		create(context) {
			let [mode] = context.options, sourceCode = context.sourceCode;
			/**
			* Checks the arguments of a given CallExpression node and reports it if it
			* offends this rule.
			* @param {ASTNode} node A CallExpression node to check.
			* @returns {void}
			*/
			function checkArguments(node) {
				let args = node.arguments;
				switch (args.length) {
					case 0:
						context.report({
							node,
							messageId: "missingParameters"
						});
						break;
					case 1:
						mode === MODE_ALWAYS && context.report({
							node,
							messageId: "missingRadix",
							suggest: [{
								messageId: "addRadixParameter10",
								fix(fixer) {
									let tokens = sourceCode.getTokens(node), lastToken = tokens.at(-1), secondToLastToken = tokens.at(-2), hasTrailingComma = secondToLastToken.type === "Punctuator" && secondToLastToken.value === ",";
									return fixer.insertTextBefore(lastToken, hasTrailingComma ? " 10," : ", 10");
								}
							}]
						});
						break;
					default:
						mode === "as-needed" && isDefaultRadix(args[1]) ? context.report({
							node,
							messageId: "redundantRadix"
						}) : isValidRadix(args[1]) || context.report({
							node,
							messageId: "invalidRadix"
						});
						break;
				}
			}
			return { "Program:exit"(node) {
				let scope = sourceCode.getScope(node), variable;
				variable = astUtils.getVariableByName(scope, "parseInt"), variable && !isShadowed(variable) && variable.references.forEach((reference) => {
					let idNode = reference.identifier;
					astUtils.isCallee(idNode) && checkArguments(idNode.parent);
				}), variable = astUtils.getVariableByName(scope, "Number"), variable && !isShadowed(variable) && variable.references.forEach((reference) => {
					let parentNode = reference.identifier.parent, maybeCallee = parentNode.parent.type === "ChainExpression" ? parentNode.parent : parentNode;
					isParseIntMethod(parentNode) && astUtils.isCallee(maybeCallee) && checkArguments(maybeCallee.parent);
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/radix.cjs
module.exports = require_radix().create;
//#endregion
