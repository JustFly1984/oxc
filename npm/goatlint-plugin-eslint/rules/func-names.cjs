const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/func-names.js
/**
* @fileoverview Rule to warn when a function expression does not have a name.
* @author Kyle T. Nunery
*/
var require_func_names = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether or not a given variable is a function name.
	* @param {eslint-scope.Variable} variable A variable to check.
	* @returns {boolean} `true` if the variable is a function name.
	*/
	function isFunctionName(variable) {
		return variable && variable.defs[0].type === "FunctionName";
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: ["always", {}],
			docs: {
				description: "Require or disallow named `function` expressions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/func-names"
			},
			schema: {
				definitions: { value: { enum: [
					"always",
					"as-needed",
					"never"
				] } },
				items: [{ $ref: "#/definitions/value" }, {
					type: "object",
					properties: { generators: { $ref: "#/definitions/value" } },
					additionalProperties: !1
				}]
			},
			messages: {
				unnamed: "Unexpected unnamed {{name}}.",
				named: "Unexpected named {{name}}."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Returns the config option for the given node.
			* @param {ASTNode} node A node to get the config for.
			* @returns {string} The config option.
			*/
			function getConfigForNode(node) {
				return node.generator && context.options[1].generators ? context.options[1].generators : context.options[0];
			}
			/**
			* Determines whether the current FunctionExpression node is a get, set, or
			* shorthand method in an object literal or a class.
			* @param {ASTNode} node A node to check.
			* @returns {boolean} True if the node is a get, set, or shorthand method.
			*/
			function isObjectOrClassMethod(node) {
				let parent = node.parent;
				return parent.type === "MethodDefinition" || parent.type === "Property" && (parent.method || parent.kind === "get" || parent.kind === "set");
			}
			/**
			* Determines whether the current FunctionExpression node has a name that would be
			* inferred from context in a conforming ES6 environment.
			* @param {ASTNode} node A node to check.
			* @returns {boolean} True if the node would have a name assigned automatically.
			*/
			function hasInferredName(node) {
				let parent = node.parent;
				return isObjectOrClassMethod(node) || parent.type === "VariableDeclarator" && parent.id.type === "Identifier" && parent.init === node || parent.type === "Property" && parent.value === node || parent.type === "PropertyDefinition" && parent.value === node || parent.type === "AssignmentExpression" && parent.left.type === "Identifier" && parent.right === node || parent.type === "AssignmentPattern" && parent.left.type === "Identifier" && parent.right === node;
			}
			/**
			* Reports that an unnamed function should be named
			* @param {ASTNode} node The node to report in the event of an error.
			* @returns {void}
			*/
			function reportUnexpectedUnnamedFunction(node) {
				context.report({
					node,
					messageId: "unnamed",
					loc: astUtils.getFunctionHeadLoc(node, sourceCode),
					data: { name: astUtils.getFunctionNameWithKind(node) }
				});
			}
			/**
			* Reports that a named function should be unnamed
			* @param {ASTNode} node The node to report in the event of an error.
			* @returns {void}
			*/
			function reportUnexpectedNamedFunction(node) {
				context.report({
					node,
					messageId: "named",
					loc: astUtils.getFunctionHeadLoc(node, sourceCode),
					data: { name: astUtils.getFunctionNameWithKind(node) }
				});
			}
			/**
			* The listener for function nodes.
			* @param {ASTNode} node function node
			* @returns {void}
			*/
			function handleFunction(node) {
				let nameVar = sourceCode.getDeclaredVariables(node)[0];
				if (isFunctionName(nameVar) && nameVar.references.length > 0) return;
				let hasName = !!(node.id && node.id.name), config = getConfigForNode(node);
				config === "never" ? hasName && node.type !== "FunctionDeclaration" && reportUnexpectedNamedFunction(node) : config === "as-needed" ? !hasName && !hasInferredName(node) && reportUnexpectedUnnamedFunction(node) : !hasName && !isObjectOrClassMethod(node) && reportUnexpectedUnnamedFunction(node);
			}
			return {
				"FunctionExpression:exit": handleFunction,
				"ExportDefaultDeclaration > FunctionDeclaration": handleFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/func-names.cjs
module.exports = require_func_names().create;
//#endregion
