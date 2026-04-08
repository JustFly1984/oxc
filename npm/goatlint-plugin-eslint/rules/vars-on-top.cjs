//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/vars-on-top.js
/**
* @fileoverview Rule to enforce var declarations are only at the top of a function.
* @author Danny Fritz
* @author Gyandeep Singh
*/
var require_vars_on_top = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require `var` declarations be placed at the top of their containing scope",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/vars-on-top"
			},
			schema: [],
			messages: { top: "All 'var' declarations must be at the top of the function scope." }
		},
		create(context) {
			/**
			* Has AST suggesting a directive.
			* @param {ASTNode} node any node
			* @returns {boolean} whether the given node structurally represents a directive
			*/
			function looksLikeDirective(node) {
				return node.type === "ExpressionStatement" && node.expression.type === "Literal" && typeof node.expression.value == "string";
			}
			/**
			* Check to see if its a ES6 import declaration
			* @param {ASTNode} node any node
			* @returns {boolean} whether the given node represents a import declaration
			*/
			function looksLikeImport(node) {
				return node.type === "ImportDeclaration" || node.type === "ImportSpecifier" || node.type === "ImportDefaultSpecifier" || node.type === "ImportNamespaceSpecifier";
			}
			/**
			* Checks whether a given node is a variable declaration or not.
			* @param {ASTNode} node any node
			* @returns {boolean} `true` if the node is a variable declaration.
			*/
			function isVariableDeclaration(node) {
				return node.type === "VariableDeclaration" || node.type === "ExportNamedDeclaration" && node.declaration && node.declaration.type === "VariableDeclaration";
			}
			/**
			* Checks whether this variable is on top of the block body
			* @param {ASTNode} node The node to check
			* @param {ASTNode[]} statements collection of ASTNodes for the parent node block
			* @returns {boolean} True if var is on top otherwise false
			*/
			function isVarOnTop(node, statements) {
				let l = statements.length, i = 0;
				if (node.parent.type !== "StaticBlock") for (; i < l && !(!looksLikeDirective(statements[i]) && !looksLikeImport(statements[i])); ++i);
				for (; i < l; ++i) {
					if (!isVariableDeclaration(statements[i])) return !1;
					if (statements[i] === node) return !0;
				}
				return !1;
			}
			/**
			* Checks whether variable is on top at the global level
			* @param {ASTNode} node The node to check
			* @param {ASTNode} parent Parent of the node
			* @returns {void}
			*/
			function globalVarCheck(node, parent) {
				isVarOnTop(node, parent.body) || context.report({
					node,
					messageId: "top"
				});
			}
			/**
			* Checks whether variable is on top at functional block scope level
			* @param {ASTNode} node The node to check
			* @returns {void}
			*/
			function blockScopeVarCheck(node) {
				let { parent } = node;
				parent.type === "BlockStatement" && /Function/u.test(parent.parent.type) && isVarOnTop(node, parent.body) || parent.type === "StaticBlock" && isVarOnTop(node, parent.body) || context.report({
					node,
					messageId: "top"
				});
			}
			return { "VariableDeclaration[kind='var']"(node) {
				node.parent.type === "ExportNamedDeclaration" ? globalVarCheck(node.parent, node.parent.parent) : node.parent.type === "Program" ? globalVarCheck(node, node.parent) : blockScopeVarCheck(node);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/vars-on-top.cjs
module.exports = require_vars_on_top().create;
//#endregion
