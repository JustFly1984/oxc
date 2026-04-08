const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-dupe-keys.js
/**
* @fileoverview Rule to flag use of duplicate keys in an object.
* @author Ian Christian Myers
*/
var require_no_dupe_keys = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), GET_KIND = /^(?:init|get)$/u, SET_KIND = /^(?:init|set)$/u;
	/**
	* The class which stores properties' information of an object.
	*/
	var ObjectInfo = class {
		/**
		* @param {ObjectInfo|null} upper The information of the outer object.
		* @param {ASTNode} node The ObjectExpression node of this information.
		*/
		constructor(upper, node) {
			this.upper = upper, this.node = node, this.properties = /* @__PURE__ */ new Map();
		}
		/**
		* Gets the information of the given Property node.
		* @param {ASTNode} node The Property node to get.
		* @returns {{get: boolean, set: boolean}} The information of the property.
		*/
		getPropertyInfo(node) {
			let name = astUtils.getStaticPropertyName(node);
			return this.properties.has(name) || this.properties.set(name, {
				get: !1,
				set: !1
			}), this.properties.get(name);
		}
		/**
		* Checks whether the given property has been defined already or not.
		* @param {ASTNode} node The Property node to check.
		* @returns {boolean} `true` if the property has been defined.
		*/
		isPropertyDefined(node) {
			let entry = this.getPropertyInfo(node);
			return GET_KIND.test(node.kind) && entry.get || SET_KIND.test(node.kind) && entry.set;
		}
		/**
		* Defines the given property.
		* @param {ASTNode} node The Property node to define.
		* @returns {void}
		*/
		defineProperty(node) {
			let entry = this.getPropertyInfo(node);
			GET_KIND.test(node.kind) && (entry.get = !0), SET_KIND.test(node.kind) && (entry.set = !0);
		}
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow duplicate keys in object literals",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-dupe-keys"
			},
			schema: [],
			messages: { unexpected: "Duplicate key '{{name}}'." }
		},
		create(context) {
			let info = null;
			return {
				ObjectExpression(node) {
					info = new ObjectInfo(info, node);
				},
				"ObjectExpression:exit"() {
					info = info.upper;
				},
				Property(node) {
					let name = astUtils.getStaticPropertyName(node);
					node.parent.type === "ObjectExpression" && name !== null && (name === "__proto__" && node.kind === "init" && !node.computed && !node.shorthand && !node.method || (info.isPropertyDefined(node) && context.report({
						node: info.node,
						loc: node.key.loc,
						messageId: "unexpected",
						data: { name }
					}), info.defineProperty(node)));
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-dupe-keys.cjs
module.exports = require_no_dupe_keys().create;
//#endregion
