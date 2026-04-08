const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-setter-return.js
/**
* @fileoverview Rule to disallow returning values from setters
* @author Milos Djermanovic
*/
var require_no_setter_return = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Determines whether the given node is an argument of the specified global method call, at the given `index` position.
	* E.g., for given `index === 1`, this function checks for `objectName.methodName(foo, node)`, where objectName is a global variable.
	* @param {ASTNode} node The node to check.
	* @param {SourceCode} sourceCode Source code to which the node belongs.
	* @param {string} objectName Name of the global object.
	* @param {string} methodName Name of the method.
	* @param {number} index The given position.
	* @returns {boolean} `true` if the node is argument at the given position.
	*/
	function isArgumentOfGlobalMethodCall(node, sourceCode, objectName, methodName, index) {
		let callNode = node.parent;
		return callNode.type === "CallExpression" && callNode.arguments[index] === node && astUtils.isSpecificMemberAccess(callNode.callee, objectName, methodName) && sourceCode.isGlobalReference(astUtils.skipChainExpression(callNode.callee).object);
	}
	/**
	* Determines whether the given node is used as a property descriptor.
	* @param {ASTNode} node The node to check.
	* @param {SourceCode} sourceCode Source code to which the node belongs.
	* @returns {boolean} `true` if the node is a property descriptor.
	*/
	function isPropertyDescriptor(node, sourceCode) {
		if (isArgumentOfGlobalMethodCall(node, sourceCode, "Object", "defineProperty", 2) || isArgumentOfGlobalMethodCall(node, sourceCode, "Reflect", "defineProperty", 2)) return !0;
		let parent = node.parent;
		if (parent.type === "Property" && parent.value === node) {
			let grandparent = parent.parent;
			if (grandparent.type === "ObjectExpression" && (isArgumentOfGlobalMethodCall(grandparent, sourceCode, "Object", "create", 1) || isArgumentOfGlobalMethodCall(grandparent, sourceCode, "Object", "defineProperties", 1))) return !0;
		}
		return !1;
	}
	/**
	* Determines whether the given function node is used as a setter function.
	* @param {ASTNode} node The node to check.
	* @param {SourceCode} sourceCode Source code to which the node belongs.
	* @returns {boolean} `true` if the node is a setter.
	*/
	function isSetter(node, sourceCode) {
		let parent = node.parent;
		return !!((parent.type === "Property" || parent.type === "MethodDefinition") && parent.kind === "set" && parent.value === node || parent.type === "Property" && parent.value === node && astUtils.getStaticPropertyName(parent) === "set" && parent.parent.type === "ObjectExpression" && isPropertyDescriptor(parent.parent, sourceCode));
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow returning values from setters",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-setter-return"
			},
			schema: [],
			messages: { returnsValue: "Setter cannot return a value." }
		},
		create(context) {
			let funcInfo = null, sourceCode = context.sourceCode;
			/**
			* Creates and pushes to the stack a function info object for the given function node.
			* @param {ASTNode} node The function node.
			* @returns {void}
			*/
			function enterFunction(node) {
				funcInfo = {
					upper: funcInfo,
					isSetter: isSetter(node, sourceCode)
				};
			}
			/**
			* Pops the current function info object from the stack.
			* @returns {void}
			*/
			function exitFunction() {
				funcInfo = funcInfo.upper;
			}
			/**
			* Reports the given node.
			* @param {ASTNode} node Node to report.
			* @returns {void}
			*/
			function report(node) {
				context.report({
					node,
					messageId: "returnsValue"
				});
			}
			return {
				FunctionDeclaration: enterFunction,
				FunctionExpression: enterFunction,
				ArrowFunctionExpression(node) {
					enterFunction(node), funcInfo.isSetter && node.expression && report(node.body);
				},
				"FunctionDeclaration:exit": exitFunction,
				"FunctionExpression:exit": exitFunction,
				"ArrowFunctionExpression:exit": exitFunction,
				ReturnStatement(node) {
					funcInfo && funcInfo.isSetter && node.argument && report(node);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-setter-return.cjs
module.exports = require_no_setter_return().create;
//#endregion
