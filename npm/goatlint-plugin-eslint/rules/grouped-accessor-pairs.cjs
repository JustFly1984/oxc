const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/grouped-accessor-pairs.js
/**
* @fileoverview Rule to require grouped accessor pairs in object literals and classes
* @author Milos Djermanovic
*/
var require_grouped_accessor_pairs = /* @__PURE__ */ require_chunk.t(((exports, module) => {
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
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: ["anyOrder", { enforceForTSTypes: !1 }],
			docs: {
				description: "Require grouped accessor pairs in object literals and classes",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/grouped-accessor-pairs"
			},
			schema: [{ enum: [
				"anyOrder",
				"getBeforeSet",
				"setBeforeGet"
			] }, {
				type: "object",
				properties: { enforceForTSTypes: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: {
				notGrouped: "Accessor pair {{ formerName }} and {{ latterName }} should be grouped.",
				invalidOrder: "Expected {{ latterName }} to be before {{ formerName }}."
			}
		},
		create(context) {
			let [order, { enforceForTSTypes }] = context.options, { sourceCode } = context;
			/**
			* Reports the given accessor pair.
			* @param {string} messageId messageId to report.
			* @param {ASTNode} formerNode getter/setter node that is defined before `latterNode`.
			* @param {ASTNode} latterNode getter/setter node that is defined after `formerNode`.
			* @returns {void}
			* @private
			*/
			function report(messageId, formerNode, latterNode) {
				context.report({
					node: latterNode,
					messageId,
					loc: astUtils.getFunctionHeadLoc(latterNode.type === "TSMethodSignature" ? latterNode : latterNode.value, sourceCode),
					data: {
						formerName: astUtils.getFunctionNameWithKind(formerNode.type === "TSMethodSignature" ? formerNode : formerNode.value),
						latterName: astUtils.getFunctionNameWithKind(latterNode.type === "TSMethodSignature" ? latterNode : latterNode.value)
					}
				});
			}
			/**
			* Checks accessor pairs in the given list of nodes.
			* @param {ASTNode[]} nodes The list to check.
			* @param {Function} shouldCheck – Predicate that returns `true` if the node should be checked.
			* @returns {void}
			* @private
			*/
			function checkList(nodes, shouldCheck) {
				let accessors = [], found = !1;
				for (let i = 0; i < nodes.length; i++) {
					let node = nodes[i];
					if (shouldCheck(node) && isAccessorKind(node)) {
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
				for (let { getters, setters } of accessors) if (getters.length === 1 && setters.length === 1) {
					let [getter] = getters, [setter] = setters, getterIndex = nodes.indexOf(getter), setterIndex = nodes.indexOf(setter), formerNode = getterIndex < setterIndex ? getter : setter, latterNode = getterIndex < setterIndex ? setter : getter;
					Math.abs(getterIndex - setterIndex) > 1 ? report("notGrouped", formerNode, latterNode) : (order === "getBeforeSet" && getterIndex > setterIndex || order === "setBeforeGet" && getterIndex < setterIndex) && report("invalidOrder", formerNode, latterNode);
				}
			}
			return {
				ObjectExpression(node) {
					checkList(node.properties, (n) => n.type === "Property");
				},
				ClassBody(node) {
					checkList(node.body, (n) => n.type === "MethodDefinition" && !n.static), checkList(node.body, (n) => n.type === "MethodDefinition" && n.static);
				},
				"TSTypeLiteral, TSInterfaceBody"(node) {
					enforceForTSTypes && checkList(node.type === "TSTypeLiteral" ? node.members : node.body, (n) => n.type === "TSMethodSignature");
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/grouped-accessor-pairs.cjs
module.exports = require_grouped_accessor_pairs().create;
//#endregion
