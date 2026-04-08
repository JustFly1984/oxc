const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-import-assign.js
/**
* @fileoverview Rule to flag updates of imported bindings.
* @author Toru Nagashima <https://github.com/mysticatea>
*/
var require_no_import_assign = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { findVariable } = require_eslint_utils$1.t(), astUtils = require_ast_utils$1.t(), WellKnownMutationFunctions = {
		Object: /^(?:assign|definePropert(?:y|ies)|freeze|setPrototypeOf)$/u,
		Reflect: /^(?:(?:define|delete)Property|set(?:PrototypeOf)?)$/u
	};
	/**
	* Check if a given node is LHS of an assignment node.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is LHS.
	*/
	function isAssignmentLeft(node) {
		let { parent } = node;
		return parent.type === "AssignmentExpression" && parent.left === node || parent.type === "ArrayPattern" || parent.type === "Property" && parent.value === node && parent.parent.type === "ObjectPattern" || parent.type === "RestElement" || parent.type === "AssignmentPattern" && parent.left === node;
	}
	/**
	* Check if a given node is the operand of mutation unary operator.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is the operand of mutation unary operator.
	*/
	function isOperandOfMutationUnaryOperator(node) {
		let argumentNode = node.parent.type === "ChainExpression" ? node.parent : node, { parent } = argumentNode;
		return parent.type === "UpdateExpression" && parent.argument === argumentNode || parent.type === "UnaryExpression" && parent.operator === "delete" && parent.argument === argumentNode;
	}
	/**
	* Check if a given node is the iteration variable of `for-in`/`for-of` syntax.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is the iteration variable.
	*/
	function isIterationVariable(node) {
		let { parent } = node;
		return parent.type === "ForInStatement" && parent.left === node || parent.type === "ForOfStatement" && parent.left === node;
	}
	/**
	* Check if a given node is at the first argument of a well-known mutation function.
	* - `Object.assign`
	* - `Object.defineProperty`
	* - `Object.defineProperties`
	* - `Object.freeze`
	* - `Object.setPrototypeOf`
	* - `Reflect.defineProperty`
	* - `Reflect.deleteProperty`
	* - `Reflect.set`
	* - `Reflect.setPrototypeOf`
	* @param {ASTNode} node The node to check.
	* @param {Scope} scope A `escope.Scope` object to find variable (whichever).
	* @returns {boolean} `true` if the node is at the first argument of a well-known mutation function.
	*/
	function isArgumentOfWellKnownMutationFunction(node, scope) {
		let { parent } = node;
		if (parent.type !== "CallExpression" || parent.arguments[0] !== node) return !1;
		let callee = astUtils.skipChainExpression(parent.callee);
		if (!astUtils.isSpecificMemberAccess(callee, "Object", WellKnownMutationFunctions.Object) && !astUtils.isSpecificMemberAccess(callee, "Reflect", WellKnownMutationFunctions.Reflect)) return !1;
		let variable = findVariable(scope, callee.object);
		return variable !== null && variable.scope.type === "global";
	}
	/**
	* Check if the identifier node is placed at to update members.
	* @param {ASTNode} id The Identifier node to check.
	* @param {Scope} scope A `escope.Scope` object to find variable (whichever).
	* @returns {boolean} `true` if the member of `id` was updated.
	*/
	function isMemberWrite(id, scope) {
		let { parent } = id;
		return parent.type === "MemberExpression" && parent.object === id && (isAssignmentLeft(parent) || isOperandOfMutationUnaryOperator(parent) || isIterationVariable(parent)) || isArgumentOfWellKnownMutationFunction(id, scope);
	}
	/**
	* Get the mutation node.
	* @param {ASTNode} id The Identifier node to get.
	* @returns {ASTNode} The mutation node.
	*/
	function getWriteNode(id) {
		let node = id.parent;
		for (; node && node.type !== "AssignmentExpression" && node.type !== "UpdateExpression" && node.type !== "UnaryExpression" && node.type !== "CallExpression" && node.type !== "ForInStatement" && node.type !== "ForOfStatement";) node = node.parent;
		return node || id;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow assigning to imported bindings",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-import-assign"
			},
			schema: [],
			messages: {
				readonly: "'{{name}}' is read-only.",
				readonlyMember: "The members of '{{name}}' are read-only."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { ImportDeclaration(node) {
				let scope = sourceCode.getScope(node);
				for (let variable of sourceCode.getDeclaredVariables(node)) {
					let shouldCheckMembers = variable.defs.some((d) => d.node.type === "ImportNamespaceSpecifier"), prevIdNode = null;
					for (let reference of variable.references) {
						let idNode = reference.identifier;
						idNode !== prevIdNode && (prevIdNode = idNode, reference.isWrite() ? context.report({
							node: getWriteNode(idNode),
							messageId: "readonly",
							data: { name: idNode.name }
						}) : shouldCheckMembers && isMemberWrite(idNode, scope) && context.report({
							node: getWriteNode(idNode),
							messageId: "readonlyMember",
							data: { name: idNode.name }
						}));
					}
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-import-assign.cjs
module.exports = require_no_import_assign().create;
//#endregion
