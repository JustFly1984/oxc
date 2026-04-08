const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-inner-declarations.js
/**
* @fileoverview Rule to enforce declarations in program or function body root.
* @author Brandon Mills
*/
var require_no_inner_declarations = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), validParent = new Set([
		"Program",
		"StaticBlock",
		"ExportNamedDeclaration",
		"ExportDefaultDeclaration"
	]), validBlockStatementParent = new Set([
		"FunctionDeclaration",
		"FunctionExpression",
		"ArrowFunctionExpression"
	]);
	/**
	* Finds the nearest enclosing context where this rule allows declarations and returns its description.
	* @param {ASTNode} node Node to search from.
	* @returns {string} Description. One of "program", "function body", "class static block body".
	*/
	function getAllowedBodyDescription(node) {
		let { parent } = node;
		for (; parent;) {
			if (parent.type === "StaticBlock") return "class static block body";
			if (astUtils.isFunction(parent)) return "function body";
			({parent} = parent);
		}
		return "program";
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: ["functions", { blockScopedFunctions: "allow" }],
			docs: {
				description: "Disallow variable or `function` declarations in nested blocks",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-inner-declarations"
			},
			schema: [{ enum: ["functions", "both"] }, {
				type: "object",
				properties: { blockScopedFunctions: { enum: ["allow", "disallow"] } },
				additionalProperties: !1
			}],
			messages: { moveDeclToRoot: "Move {{type}} declaration to {{body}} root." }
		},
		create(context) {
			let both = context.options[0] === "both", { blockScopedFunctions } = context.options[1], sourceCode = context.sourceCode, ecmaVersion = context.languageOptions.ecmaVersion;
			/**
			* Ensure that a given node is at a program or function body's root.
			* @param {ASTNode} node Declaration node to check.
			* @returns {void}
			*/
			function check(node) {
				let parent = node.parent;
				parent.type === "BlockStatement" && validBlockStatementParent.has(parent.parent.type) || validParent.has(parent.type) || context.report({
					node,
					messageId: "moveDeclToRoot",
					data: {
						type: node.type === "FunctionDeclaration" ? "function" : "variable",
						body: getAllowedBodyDescription(node)
					}
				});
			}
			return {
				FunctionDeclaration(node) {
					let isInStrictCode = sourceCode.getScope(node).upper.isStrict;
					blockScopedFunctions === "allow" && ecmaVersion >= 2015 && isInStrictCode || check(node);
				},
				VariableDeclaration(node) {
					both && node.kind === "var" && check(node);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-inner-declarations.cjs
module.exports = require_no_inner_declarations().create;
//#endregion
