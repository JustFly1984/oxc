const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_string_utils$1 = require("../common/string-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/max-params.js
/**
* @fileoverview Rule to flag when a function has too many parameters
* @author Ilya Volodin
*/
var require_max_params = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), { upperCaseFirst } = require_string_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			dialects: ["typescript", "javascript"],
			language: "javascript",
			docs: {
				description: "Enforce a maximum number of parameters in function definitions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/max-params"
			},
			schema: [{ oneOf: [{
				type: "integer",
				minimum: 0
			}, {
				type: "object",
				properties: {
					maximum: {
						type: "integer",
						minimum: 0
					},
					max: {
						type: "integer",
						minimum: 0
					},
					countVoidThis: {
						type: "boolean",
						description: "Whether to count a `this` declaration when the type is `void`."
					}
				},
				additionalProperties: !1
			}] }],
			messages: { exceed: "{{name}} has too many parameters ({{count}}). Maximum allowed is {{max}}." }
		},
		create(context) {
			let sourceCode = context.sourceCode, option = context.options[0], numParams = 3, countVoidThis = !1;
			typeof option == "object" && ((Object.hasOwn(option, "maximum") || Object.hasOwn(option, "max")) && (numParams = option.maximum || option.max), countVoidThis = option.countVoidThis), typeof option == "number" && (numParams = option);
			/**
			* Checks a function to see if it has too many parameters.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			* @private
			*/
			function checkFunction(node) {
				let effectiveParamCount = node.params.length > 0 && node.params[0].type === "Identifier" && node.params[0].name === "this" && node.params[0].typeAnnotation?.typeAnnotation.type === "TSVoidKeyword" && !countVoidThis ? node.params.length - 1 : node.params.length;
				effectiveParamCount > numParams && context.report({
					loc: astUtils.getFunctionHeadLoc(node, sourceCode),
					node,
					messageId: "exceed",
					data: {
						name: upperCaseFirst(astUtils.getFunctionNameWithKind(node)),
						count: effectiveParamCount,
						max: numParams
					}
				});
			}
			return {
				FunctionDeclaration: checkFunction,
				ArrowFunctionExpression: checkFunction,
				FunctionExpression: checkFunction,
				TSDeclareFunction: checkFunction,
				TSFunctionType: checkFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/max-params.cjs
module.exports = require_max_params().create;
//#endregion
