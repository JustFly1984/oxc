const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_string_utils$1 = require("../common/string-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/max-statements.js
/**
* @fileoverview A rule to set the maximum number of statements in a function.
* @author Ian Christian Myers
*/
var require_max_statements = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), { upperCaseFirst } = require_string_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce a maximum number of statements allowed in function blocks",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/max-statements"
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
					}
				},
				additionalProperties: !1
			}] }, {
				type: "object",
				properties: { ignoreTopLevelFunctions: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { exceed: "{{name}} has too many statements ({{count}}). Maximum allowed is {{max}}." }
		},
		create(context) {
			let functionStack = [], option = context.options[0], ignoreTopLevelFunctions = context.options[1] && context.options[1].ignoreTopLevelFunctions || !1, topLevelFunctions = [], maxStatements = 10;
			typeof option == "object" && (Object.hasOwn(option, "maximum") || Object.hasOwn(option, "max")) ? maxStatements = option.maximum || option.max : typeof option == "number" && (maxStatements = option);
			/**
			* Reports a node if it has too many statements
			* @param {ASTNode} node node to evaluate
			* @param {number} count Number of statements in node
			* @param {number} max Maximum number of statements allowed
			* @returns {void}
			* @private
			*/
			function reportIfTooManyStatements(node, count, max) {
				if (count > max) {
					let name = upperCaseFirst(astUtils.getFunctionNameWithKind(node));
					context.report({
						node,
						messageId: "exceed",
						data: {
							name,
							count,
							max
						}
					});
				}
			}
			/**
			* When parsing a new function, store it in our function stack
			* @returns {void}
			* @private
			*/
			function startFunction() {
				functionStack.push(0);
			}
			/**
			* Evaluate the node at the end of function
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function endFunction(node) {
				let count = functionStack.pop();
				node.type !== "StaticBlock" && (ignoreTopLevelFunctions && functionStack.length === 0 ? topLevelFunctions.push({
					node,
					count
				}) : reportIfTooManyStatements(node, count, maxStatements));
			}
			/**
			* Increment the count of the functions
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function countStatements(node) {
				functionStack[functionStack.length - 1] += node.body.length;
			}
			return {
				FunctionDeclaration: startFunction,
				FunctionExpression: startFunction,
				ArrowFunctionExpression: startFunction,
				StaticBlock: startFunction,
				BlockStatement: countStatements,
				"FunctionDeclaration:exit": endFunction,
				"FunctionExpression:exit": endFunction,
				"ArrowFunctionExpression:exit": endFunction,
				"StaticBlock:exit": endFunction,
				"Program:exit"() {
					topLevelFunctions.length !== 1 && topLevelFunctions.forEach((element) => {
						let count = element.count, node = element.node;
						reportIfTooManyStatements(node, count, maxStatements);
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/max-statements.cjs
module.exports = require_max_statements().create;
//#endregion
