const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-extend-native.js
/**
* @fileoverview Rule to flag adding properties to native object's prototypes.
* @author David Nelson
*/
var require_no_extend_native = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ exceptions: [] }],
			docs: {
				description: "Disallow extending native types",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-extend-native"
			},
			schema: [{
				type: "object",
				properties: { exceptions: {
					type: "array",
					items: { type: "string" },
					uniqueItems: !0
				} },
				additionalProperties: !1
			}],
			messages: { unexpected: "{{builtin}} prototype is read only, properties should not be added." }
		},
		create(context) {
			let sourceCode = context.sourceCode, exceptions = new Set(context.options[0].exceptions), modifiedBuiltins = new Set(Object.keys(astUtils.ECMASCRIPT_GLOBALS).filter((builtin) => builtin[0].toUpperCase() === builtin[0]).filter((builtin) => !exceptions.has(builtin)));
			/**
			* Reports a lint error for the given node.
			* @param {ASTNode} node The node to report.
			* @param {string} builtin The name of the native builtin being extended.
			* @returns {void}
			*/
			function reportNode(node, builtin) {
				context.report({
					node,
					messageId: "unexpected",
					data: { builtin }
				});
			}
			/**
			* Check to see if the `prototype` property of the given object
			* identifier node is being accessed.
			* @param {ASTNode} identifierNode The Identifier representing the object
			* to check.
			* @returns {boolean} True if the identifier is the object of a
			* MemberExpression and its `prototype` property is being accessed,
			* false otherwise.
			*/
			function isPrototypePropertyAccessed(identifierNode) {
				return !!(identifierNode && identifierNode.parent && identifierNode.parent.type === "MemberExpression" && identifierNode.parent.object === identifierNode && astUtils.getStaticPropertyName(identifierNode.parent) === "prototype");
			}
			/**
			* Check if it's an assignment to the property of the given node.
			* Example: `*.prop = 0` // the `*` is the given node.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} True if an assignment to the property of the node.
			*/
			function isAssigningToPropertyOf(node) {
				return node.parent.type === "MemberExpression" && node.parent.object === node && node.parent.parent.type === "AssignmentExpression" && node.parent.parent.left === node.parent;
			}
			/**
			* Checks if the given node is at the first argument of the method call of `Object.defineProperty()` or `Object.defineProperties()`.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} True if the node is at the first argument of the method call of `Object.defineProperty()` or `Object.defineProperties()`.
			*/
			function isInDefinePropertyCall(node) {
				return node.parent.type === "CallExpression" && node.parent.arguments[0] === node && astUtils.isSpecificMemberAccess(node.parent.callee, "Object", /^definePropert(?:y|ies)$/u);
			}
			/**
			* Check to see if object prototype access is part of a prototype
			* extension. There are three ways a prototype can be extended:
			* 1. Assignment to prototype property (Object.prototype.foo = 1)
			* 2. Object.defineProperty()/Object.defineProperties() on a prototype
			* If prototype extension is detected, report the AssignmentExpression
			* or CallExpression node.
			* @param {ASTNode} identifierNode The Identifier representing the object
			* which prototype is being accessed and possibly extended.
			* @returns {void}
			*/
			function checkAndReportPrototypeExtension(identifierNode) {
				if (!isPrototypePropertyAccessed(identifierNode)) return;
				let prototypeNode = identifierNode.parent.parent.type === "ChainExpression" ? identifierNode.parent.parent : identifierNode.parent;
				isAssigningToPropertyOf(prototypeNode) ? reportNode(prototypeNode.parent.parent, identifierNode.name) : isInDefinePropertyCall(prototypeNode) && reportNode(prototypeNode.parent, identifierNode.name);
			}
			return { "Program:exit"(node) {
				let globalScope = sourceCode.getScope(node);
				modifiedBuiltins.forEach((builtin) => {
					let builtinVar = globalScope.set.get(builtin);
					builtinVar && builtinVar.references && builtinVar.references.map((ref) => ref.identifier).forEach(checkAndReportPrototypeExtension);
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-extend-native.cjs
module.exports = require_no_extend_native().create;
//#endregion
