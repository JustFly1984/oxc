const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/accessor-pairs.js
/**
* @fileoverview Rule to enforce getter and setter pairs in objects and classes.
* @author Gyandeep Singh
*/
var require_accessor_pairs = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Property name if it can be computed statically, otherwise the list of the tokens of the key node.
	* @typedef {string|Token[]} Key
	*/
	/**
	* Accessor nodes with the same key.
	* @typedef {Object} AccessorData
	* @property {Key} key Accessor's key
	* @property {ASTNode[]} getters List of getter nodes.
	* @property {ASTNode[]} setters List of setter nodes.
	*/
	/**
	* Checks whether or not the given lists represent the equal tokens in the same order.
	* Tokens are compared by their properties, not by instance.
	* @param {Token[]} left First list of tokens.
	* @param {Token[]} right Second list of tokens.
	* @returns {boolean} `true` if the lists have same tokens.
	*/
	function areEqualTokenLists(left, right) {
		if (left.length !== right.length) return !1;
		for (let i = 0; i < left.length; i++) {
			let leftToken = left[i], rightToken = right[i];
			if (leftToken.type !== rightToken.type || leftToken.value !== rightToken.value) return !1;
		}
		return !0;
	}
	/**
	* Checks whether or not the given keys are equal.
	* @param {Key} left First key.
	* @param {Key} right Second key.
	* @returns {boolean} `true` if the keys are equal.
	*/
	function areEqualKeys(left, right) {
		return typeof left == "string" && typeof right == "string" ? left === right : Array.isArray(left) && Array.isArray(right) ? areEqualTokenLists(left, right) : !1;
	}
	/**
	* Checks whether or not a given node is of an accessor kind ('get' or 'set').
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node is of an accessor kind.
	*/
	function isAccessorKind(node) {
		return node.kind === "get" || node.kind === "set";
	}
	/**
	* Checks whether or not a given node is an argument of a specified method call.
	* @param {ASTNode} node A node to check.
	* @param {number} index An expected index of the node in arguments.
	* @param {string} object An expected name of the object of the method.
	* @param {string} property An expected name of the method.
	* @returns {boolean} `true` if the node is an argument of the specified method call.
	*/
	function isArgumentOfMethodCall(node, index, object, property) {
		let parent = node.parent;
		return parent.type === "CallExpression" && astUtils.isSpecificMemberAccess(parent.callee, object, property) && parent.arguments[index] === node;
	}
	/**
	* Checks whether or not a given node is a property descriptor.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node is a property descriptor.
	*/
	function isPropertyDescriptor(node) {
		if (isArgumentOfMethodCall(node, 2, "Object", "defineProperty") || isArgumentOfMethodCall(node, 2, "Reflect", "defineProperty")) return !0;
		let grandparent = node.parent.parent;
		return grandparent.type === "ObjectExpression" && (isArgumentOfMethodCall(grandparent, 1, "Object", "create") || isArgumentOfMethodCall(grandparent, 1, "Object", "defineProperties"));
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				enforceForTSTypes: !1,
				enforceForClassMembers: !0,
				getWithoutSet: !1,
				setWithoutGet: !0
			}],
			docs: {
				description: "Enforce getter and setter pairs in objects and classes",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/accessor-pairs"
			},
			schema: [{
				type: "object",
				properties: {
					getWithoutSet: { type: "boolean" },
					setWithoutGet: { type: "boolean" },
					enforceForClassMembers: { type: "boolean" },
					enforceForTSTypes: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: {
				missingGetterInPropertyDescriptor: "Getter is not present in property descriptor.",
				missingSetterInPropertyDescriptor: "Setter is not present in property descriptor.",
				missingGetterInObjectLiteral: "Getter is not present for {{ name }}.",
				missingSetterInObjectLiteral: "Setter is not present for {{ name }}.",
				missingGetterInClass: "Getter is not present for class {{ name }}.",
				missingSetterInClass: "Setter is not present for class {{ name }}.",
				missingGetterInType: "Getter is not present for type {{ name }}.",
				missingSetterInType: "Setter is not present for type {{ name }}."
			}
		},
		create(context) {
			let [{ getWithoutSet: checkGetWithoutSet, setWithoutGet: checkSetWithoutGet, enforceForClassMembers, enforceForTSTypes }] = context.options, sourceCode = context.sourceCode;
			/**
			* Reports the given node.
			* @param {ASTNode} node The node to report.
			* @param {string} messageKind "missingGetter" or "missingSetter".
			* @returns {void}
			* @private
			*/
			function report(node, messageKind) {
				node.type === "Property" ? context.report({
					node,
					messageId: `${messageKind}InObjectLiteral`,
					loc: astUtils.getFunctionHeadLoc(node.value, sourceCode),
					data: { name: astUtils.getFunctionNameWithKind(node.value) }
				}) : node.type === "MethodDefinition" ? context.report({
					node,
					messageId: `${messageKind}InClass`,
					loc: astUtils.getFunctionHeadLoc(node.value, sourceCode),
					data: { name: astUtils.getFunctionNameWithKind(node.value) }
				}) : node.type === "TSMethodSignature" ? context.report({
					node,
					messageId: `${messageKind}InType`,
					loc: astUtils.getFunctionHeadLoc(node, sourceCode),
					data: { name: astUtils.getFunctionNameWithKind(node) }
				}) : context.report({
					node,
					messageId: `${messageKind}InPropertyDescriptor`
				});
			}
			/**
			* Reports each of the nodes in the given list using the same messageId.
			* @param {ASTNode[]} nodes Nodes to report.
			* @param {string} messageKind "missingGetter" or "missingSetter".
			* @returns {void}
			* @private
			*/
			function reportList(nodes, messageKind) {
				for (let node of nodes) report(node, messageKind);
			}
			/**
			* Checks accessor pairs in the given list of nodes.
			* @param {ASTNode[]} nodes The list to check.
			* @returns {void}
			* @private
			*/
			function checkList(nodes) {
				let accessors = [], found = !1;
				for (let i = 0; i < nodes.length; i++) {
					let node = nodes[i];
					if (isAccessorKind(node)) {
						let name = astUtils.getStaticPropertyName(node), key = name === null ? sourceCode.getTokens(node.key) : name;
						for (let j = 0; j < accessors.length; j++) {
							let accessor = accessors[j];
							if (areEqualKeys(accessor.key, key)) {
								accessor.getters.push(...node.kind === "get" ? [node] : []), accessor.setters.push(...node.kind === "set" ? [node] : []), found = !0;
								break;
							}
						}
						found || accessors.push({
							key,
							getters: node.kind === "get" ? [node] : [],
							setters: node.kind === "set" ? [node] : []
						}), found = !1;
					}
				}
				for (let { getters, setters } of accessors) checkSetWithoutGet && setters.length && !getters.length && reportList(setters, "missingGetter"), checkGetWithoutSet && getters.length && !setters.length && reportList(getters, "missingSetter");
			}
			/**
			* Checks accessor pairs in an object literal.
			* @param {ASTNode} node `ObjectExpression` node to check.
			* @returns {void}
			* @private
			*/
			function checkObjectLiteral(node) {
				checkList(node.properties.filter((p) => p.type === "Property"));
			}
			/**
			* Checks accessor pairs in a property descriptor.
			* @param {ASTNode} node Property descriptor `ObjectExpression` node to check.
			* @returns {void}
			* @private
			*/
			function checkPropertyDescriptor(node) {
				let namesToCheck = new Set(node.properties.filter((p) => p.type === "Property" && p.kind === "init" && !p.computed).map(({ key }) => key.name)), hasGetter = namesToCheck.has("get"), hasSetter = namesToCheck.has("set");
				checkSetWithoutGet && hasSetter && !hasGetter && report(node, "missingGetter"), checkGetWithoutSet && hasGetter && !hasSetter && report(node, "missingSetter");
			}
			/**
			* Checks the given object expression as an object literal and as a possible property descriptor.
			* @param {ASTNode} node `ObjectExpression` node to check.
			* @returns {void}
			* @private
			*/
			function checkObjectExpression(node) {
				checkObjectLiteral(node), isPropertyDescriptor(node) && checkPropertyDescriptor(node);
			}
			/**
			* Checks the given class body.
			* @param {ASTNode} node `ClassBody` node to check.
			* @returns {void}
			* @private
			*/
			function checkClassBody(node) {
				let methodDefinitions = node.body.filter((m) => m.type === "MethodDefinition");
				checkList(methodDefinitions.filter((m) => m.static)), checkList(methodDefinitions.filter((m) => !m.static));
			}
			/**
			* Checks the given type.
			* @param {ASTNode} node `TSTypeLiteral` or `TSInterfaceBody` node to check.
			* @returns {void}
			* @private
			*/
			function checkType(node) {
				checkList((node.type === "TSTypeLiteral" ? node.members : node.body).filter((m) => m.type === "TSMethodSignature"));
			}
			let listeners = {};
			return (checkSetWithoutGet || checkGetWithoutSet) && (listeners.ObjectExpression = checkObjectExpression, enforceForClassMembers && (listeners.ClassBody = checkClassBody), enforceForTSTypes && (listeners["TSTypeLiteral, TSInterfaceBody"] = checkType)), listeners;
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/accessor-pairs.cjs
module.exports = require_accessor_pairs().create;
//#endregion
