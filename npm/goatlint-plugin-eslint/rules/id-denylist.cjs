const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/id-denylist.js
/**
* @fileoverview Rule that warns when identifier names that are
* specified in the configuration are used.
* @author Keith Cirkel (http://keithcirkel.co.uk)
*/
var require_id_denylist = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether the given node represents assignment target in a normal assignment or destructuring.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is assignment target.
	*/
	function isAssignmentTarget(node) {
		let parent = node.parent;
		return parent.type === "AssignmentExpression" && parent.left === node || parent.type === "ArrayPattern" || parent.type === "RestElement" || parent.type === "Property" && parent.value === node && parent.parent.type === "ObjectPattern" || parent.type === "AssignmentPattern" && parent.left === node;
	}
	/**
	* Checks whether the given node represents an imported name that is renamed in the same import/export specifier.
	*
	* Examples:
	* import { a as b } from 'mod'; // node `a` is renamed import
	* export { a as b } from 'mod'; // node `a` is renamed import
	* @param {ASTNode} node `Identifier` node to check.
	* @returns {boolean} `true` if the node is a renamed import.
	*/
	function isRenamedImport(node) {
		let parent = node.parent;
		return parent.type === "ImportSpecifier" && parent.imported !== parent.local && parent.imported === node || parent.type === "ExportSpecifier" && parent.parent.source && parent.local !== parent.exported && parent.local === node;
	}
	/**
	* Checks whether the given node is an ObjectPattern destructuring.
	*
	* Examples:
	* const { a : b } = foo;
	* @param {ASTNode} node `Identifier` node to check.
	* @returns {boolean} `true` if the node is in an ObjectPattern destructuring.
	*/
	function isPropertyNameInDestructuring(node) {
		let parent = node.parent;
		return !parent.computed && parent.type === "Property" && parent.parent.type === "ObjectPattern" && parent.key === node;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [],
			docs: {
				description: "Disallow specified identifiers",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/id-denylist"
			},
			schema: {
				type: "array",
				items: { type: "string" },
				uniqueItems: !0
			},
			messages: {
				restricted: "Identifier '{{name}}' is restricted.",
				restrictedPrivate: "Identifier '#{{name}}' is restricted."
			}
		},
		create(context) {
			let denyList = new Set(context.options), reportedNodes = /* @__PURE__ */ new Set(), sourceCode = context.sourceCode, globalScope;
			/**
			* Checks whether the given name is restricted.
			* @param {string} name The name to check.
			* @returns {boolean} `true` if the name is restricted.
			* @private
			*/
			function isRestricted(name) {
				return denyList.has(name);
			}
			/**
			* Checks whether the given node represents a reference to a global variable that is not declared in the source code.
			* These identifiers will be allowed, as it is assumed that user has no control over the names of external global variables.
			* @param {ASTNode} node `Identifier` node to check.
			* @returns {boolean} `true` if the node is a reference to a global variable.
			*/
			function isReferenceToGlobalVariable(node) {
				let variable = globalScope.set.get(node.name);
				return variable && variable.defs.length === 0 && variable.references.some((ref) => ref.identifier === node);
			}
			/**
			* Determines whether the given node should be checked.
			* @param {ASTNode} node `Identifier` node.
			* @returns {boolean} `true` if the node should be checked.
			*/
			function shouldCheck(node) {
				if (astUtils.isImportAttributeKey(node)) return !1;
				let parent = node.parent;
				return parent.type === "MemberExpression" && parent.property === node && !parent.computed ? isAssignmentTarget(parent) : parent.type !== "CallExpression" && parent.type !== "NewExpression" && !isRenamedImport(node) && !isPropertyNameInDestructuring(node) && !isReferenceToGlobalVariable(node);
			}
			/**
			* Reports an AST node as a rule violation.
			* @param {ASTNode} node The node to report.
			* @returns {void}
			* @private
			*/
			function report(node) {
				if (!reportedNodes.has(node.range.toString())) {
					let isPrivate = node.type === "PrivateIdentifier";
					context.report({
						node,
						messageId: isPrivate ? "restrictedPrivate" : "restricted",
						data: { name: node.name }
					}), reportedNodes.add(node.range.toString());
				}
			}
			return {
				Program(node) {
					globalScope = sourceCode.getScope(node);
				},
				[["Identifier", "PrivateIdentifier"]](node) {
					isRestricted(node.name) && shouldCheck(node) && report(node);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/id-denylist.cjs
module.exports = require_id_denylist().create;
//#endregion
