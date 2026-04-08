const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-useless-rename.js
/**
* @fileoverview Disallow renaming import, export, and destructured assignments to the same name.
* @author Kai Cataldo
*/
var require_no_useless_rename = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				ignoreDestructuring: !1,
				ignoreImport: !1,
				ignoreExport: !1
			}],
			docs: {
				description: "Disallow renaming import, export, and destructured assignments to the same name",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-useless-rename"
			},
			fixable: "code",
			schema: [{
				type: "object",
				properties: {
					ignoreDestructuring: { type: "boolean" },
					ignoreImport: { type: "boolean" },
					ignoreExport: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: { unnecessarilyRenamed: "{{type}} {{name}} unnecessarily renamed." }
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ ignoreDestructuring, ignoreImport, ignoreExport }] = context.options;
			/**
			* Reports error for unnecessarily renamed assignments
			* @param {ASTNode} node node to report
			* @param {ASTNode} initial node with initial name value
			* @param {string} type the type of the offending node
			* @returns {void}
			*/
			function reportError(node, initial, type) {
				let name = initial.type === "Identifier" ? initial.name : initial.value;
				return context.report({
					node,
					messageId: "unnecessarilyRenamed",
					data: {
						name,
						type
					},
					fix(fixer) {
						let replacementNode = node.type === "Property" ? node.value : node.local;
						return sourceCode.getCommentsInside(node).length > sourceCode.getCommentsInside(replacementNode).length || replacementNode.type === "AssignmentPattern" && astUtils.isParenthesised(sourceCode, replacementNode.left) ? null : fixer.replaceText(node, sourceCode.getText(replacementNode));
					}
				});
			}
			/**
			* Checks whether a destructured assignment is unnecessarily renamed
			* @param {ASTNode} node node to check
			* @returns {void}
			*/
			function checkDestructured(node) {
				if (!ignoreDestructuring) for (let property of node.properties) property.type !== "Property" || property.shorthand || property.computed || (property.key.type === "Identifier" && property.key.name || property.key.type === "Literal" && property.key.value) === (property.value.type === "AssignmentPattern" ? property.value.left.name : property.value.name) && reportError(property, property.key, "Destructuring assignment");
			}
			/**
			* Checks whether an import is unnecessarily renamed
			* @param {ASTNode} node node to check
			* @returns {void}
			*/
			function checkImport(node) {
				ignoreImport || node.imported.range[0] !== node.local.range[0] && astUtils.getModuleExportName(node.imported) === node.local.name && reportError(node, node.imported, "Import");
			}
			/**
			* Checks whether an export is unnecessarily renamed
			* @param {ASTNode} node node to check
			* @returns {void}
			*/
			function checkExport(node) {
				ignoreExport || node.local.range[0] !== node.exported.range[0] && astUtils.getModuleExportName(node.local) === astUtils.getModuleExportName(node.exported) && reportError(node, node.local, "Export");
			}
			return {
				ObjectPattern: checkDestructured,
				ImportSpecifier: checkImport,
				ExportSpecifier: checkExport
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-useless-rename.cjs
module.exports = require_no_useless_rename().create;
//#endregion
