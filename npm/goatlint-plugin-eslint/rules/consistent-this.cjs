//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/consistent-this.js
/**
* @fileoverview Rule to enforce consistent naming of "this" context variables
* @author Raphael Pigulla
*/
var require_consistent_this = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce consistent naming when capturing the current execution context",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/consistent-this"
			},
			schema: {
				type: "array",
				items: {
					type: "string",
					minLength: 1
				},
				uniqueItems: !0
			},
			defaultOptions: ["that"],
			messages: {
				aliasNotAssignedToThis: "Designated alias '{{name}}' is not assigned to 'this'.",
				unexpectedAlias: "Unexpected alias '{{name}}' for 'this'."
			}
		},
		create(context) {
			let aliases = context.options, sourceCode = context.sourceCode;
			/**
			* Reports that a variable declarator or assignment expression is assigning
			* a non-'this' value to the specified alias.
			* @param {ASTNode} node The assigning node.
			* @param {string} name the name of the alias that was incorrectly used.
			* @returns {void}
			*/
			function reportBadAssignment(node, name) {
				context.report({
					node,
					messageId: "aliasNotAssignedToThis",
					data: { name }
				});
			}
			/**
			* Checks that an assignment to an identifier only assigns 'this' to the
			* appropriate alias, and the alias is only assigned to 'this'.
			* @param {ASTNode} node The assigning node.
			* @param {Identifier} name The name of the variable assigned to.
			* @param {Expression} value The value of the assignment.
			* @returns {void}
			*/
			function checkAssignment(node, name, value) {
				let isThis = value.type === "ThisExpression";
				aliases.includes(name) ? (!isThis || node.operator && node.operator !== "=") && reportBadAssignment(node, name) : isThis && context.report({
					node,
					messageId: "unexpectedAlias",
					data: { name }
				});
			}
			/**
			* Ensures that a variable declaration of the alias in a program or function
			* is assigned to the correct value.
			* @param {string} alias alias the check the assignment of.
			* @param {Object} scope scope of the current code we are checking.
			* @private
			* @returns {void}
			*/
			function checkWasAssigned(alias, scope) {
				let variable = scope.set.get(alias);
				variable && (variable.defs.some((def) => def.node.type === "VariableDeclarator" && def.node.init !== null) || variable.references.some((reference) => {
					let write = reference.writeExpr;
					return reference.from === scope && write && write.type === "ThisExpression" && write.parent.operator === "=";
				}) || variable.defs.map((def) => def.node).forEach((node) => {
					reportBadAssignment(node, alias);
				}));
			}
			/**
			* Check each alias to ensure that is was assigned to the correct value.
			* @param {ASTNode} node The node that represents the scope to check.
			* @returns {void}
			*/
			function ensureWasAssigned(node) {
				let scope = sourceCode.getScope(node), extraScope = node.type === "Program" && node.sourceType === "module" ? scope.childScopes[0] : null;
				aliases.forEach((alias) => {
					checkWasAssigned(alias, scope), extraScope && checkWasAssigned(alias, extraScope);
				});
			}
			return {
				"Program:exit": ensureWasAssigned,
				"FunctionExpression:exit": ensureWasAssigned,
				"FunctionDeclaration:exit": ensureWasAssigned,
				VariableDeclarator(node) {
					let id = node.id, isDestructuring = id.type === "ArrayPattern" || id.type === "ObjectPattern";
					node.init !== null && !isDestructuring && checkAssignment(node, id.name, node.init);
				},
				AssignmentExpression(node) {
					node.left.type === "Identifier" && checkAssignment(node, node.left.name, node.right);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/consistent-this.cjs
module.exports = require_consistent_this().create;
//#endregion
