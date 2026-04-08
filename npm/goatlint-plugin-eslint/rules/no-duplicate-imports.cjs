//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-duplicate-imports.js
/**
* @fileoverview Restrict usage of duplicate imports.
* @author Simen Bekkhus
*/
var require_no_duplicate_imports = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let NAMED_TYPES = ["ImportSpecifier", "ExportSpecifier"], NAMESPACE_TYPES = ["ImportNamespaceSpecifier", "ExportNamespaceSpecifier"];
	/**
	* Check if an import/export type belongs to (ImportSpecifier|ExportSpecifier) or (ImportNamespaceSpecifier|ExportNamespaceSpecifier).
	* @param {string} importExportType An import/export type to check.
	* @param {string} type Can be "named" or "namespace"
	* @returns {boolean} True if import/export type belongs to (ImportSpecifier|ExportSpecifier) or (ImportNamespaceSpecifier|ExportNamespaceSpecifier) and false if it doesn't.
	*/
	function isImportExportSpecifier(importExportType, type) {
		return (type === "named" ? NAMED_TYPES : NAMESPACE_TYPES).includes(importExportType);
	}
	/**
	* Return the type of (import|export).
	* @param {ASTNode} node A node to get.
	* @returns {string} The type of the (import|export).
	*/
	function getImportExportType(node) {
		if (node.specifiers && node.specifiers.length > 0) {
			let nodeSpecifiers = node.specifiers, index = nodeSpecifiers.findIndex(({ type }) => isImportExportSpecifier(type, "named") || isImportExportSpecifier(type, "namespace"));
			return nodeSpecifiers[index > -1 ? index : 0].type;
		}
		return node.type === "ExportAllDeclaration" ? node.exported ? "ExportNamespaceSpecifier" : "ExportAll" : "SideEffectImport";
	}
	/**
	* Returns a boolean indicates if two (import|export) can be merged
	* @param {ASTNode} node1 A node to check.
	* @param {ASTNode} node2 A node to check.
	* @returns {boolean} True if two (import|export) can be merged, false if they can't.
	*/
	function isImportExportCanBeMerged(node1, node2) {
		let importExportType1 = getImportExportType(node1), importExportType2 = getImportExportType(node2);
		if ((node1.importKind === "type" || node1.exportKind === "type") && (node2.importKind === "type" || node2.exportKind === "type")) {
			let isDefault1 = importExportType1 === "ImportDefaultSpecifier", isDefault2 = importExportType2 === "ImportDefaultSpecifier", isNamed1 = isImportExportSpecifier(importExportType1, "named"), isNamed2 = isImportExportSpecifier(importExportType2, "named");
			if (isDefault1 && isNamed2 || isDefault2 && isNamed1) return !1;
		}
		return !(importExportType1 === "ExportAll" && importExportType2 !== "ExportAll" && importExportType2 !== "SideEffectImport" || importExportType1 !== "ExportAll" && importExportType1 !== "SideEffectImport" && importExportType2 === "ExportAll" || isImportExportSpecifier(importExportType1, "namespace") && isImportExportSpecifier(importExportType2, "named") || isImportExportSpecifier(importExportType2, "namespace") && isImportExportSpecifier(importExportType1, "named"));
	}
	/**
	* Returns a boolean if we should report (import|export).
	* @param {ASTNode} node A node to be reported or not.
	* @param {[ASTNode]} previousNodes An array contains previous nodes of the module imported or exported.
	* @param {boolean} allowSeparateTypeImports Whether to allow separate type and value imports.
	* @returns {boolean} True if the (import|export) should be reported.
	*/
	function shouldReportImportExport(node, previousNodes, allowSeparateTypeImports) {
		let i = 0;
		for (; i < previousNodes.length;) {
			let previousNode = previousNodes[i];
			if (allowSeparateTypeImports && (node.importKind === "type" || node.exportKind === "type") != (previousNode.importKind === "type" || previousNode.exportKind === "type")) {
				i++;
				continue;
			}
			if (isImportExportCanBeMerged(node, previousNode)) return !0;
			i++;
		}
		return !1;
	}
	/**
	* Returns array contains only nodes with declarations types equal to type.
	* @param {[{node: ASTNode, declarationType: string}]} nodes An array contains objects, each object contains a node and a declaration type.
	* @param {string} type Declaration type.
	* @returns {[ASTNode]} An array contains only nodes with declarations types equal to type.
	*/
	function getNodesByDeclarationType(nodes, type) {
		return nodes.filter(({ declarationType }) => declarationType === type).map(({ node }) => node);
	}
	/**
	* Returns the name of the module imported or re-exported.
	* @param {ASTNode} node A node to get.
	* @returns {string} The name of the module, or empty string if no name.
	*/
	function getModule(node) {
		return node && node.source && node.source.value ? node.source.value.trim() : "";
	}
	/**
	* Checks if the (import|export) can be merged with at least one import or one export, and reports if so.
	* @param {RuleContext} context The ESLint rule context object.
	* @param {ASTNode} node A node to get.
	* @param {Map} modules A Map object contains as a key a module name and as value an array contains objects, each object contains a node and a declaration type.
	* @param {string} declarationType A declaration type can be an import or export.
	* @param {boolean} includeExports Whether or not to check for exports in addition to imports.
	* @param {boolean} allowSeparateTypeImports Whether to allow separate type and value imports.
	* @returns {void} No return value.
	*/
	function checkAndReport(context, node, modules, declarationType, includeExports, allowSeparateTypeImports) {
		let module$1 = getModule(node);
		if (modules.has(module$1)) {
			let previousNodes = modules.get(module$1), messagesIds = [], importNodes = getNodesByDeclarationType(previousNodes, "import"), exportNodes;
			includeExports && (exportNodes = getNodesByDeclarationType(previousNodes, "export")), declarationType === "import" ? (shouldReportImportExport(node, importNodes, allowSeparateTypeImports) && messagesIds.push("import"), includeExports && shouldReportImportExport(node, exportNodes, allowSeparateTypeImports) && messagesIds.push("importAs")) : declarationType === "export" && (shouldReportImportExport(node, exportNodes, allowSeparateTypeImports) && messagesIds.push("export"), shouldReportImportExport(node, importNodes, allowSeparateTypeImports) && messagesIds.push("exportAs")), messagesIds.forEach((messageId) => context.report({
				node,
				messageId,
				data: { module: module$1 }
			}));
		}
	}
	/**
	* @callback nodeCallback
	* @param {ASTNode} node A node to handle.
	*/
	/**
	* Returns a function handling the (imports|exports) of a given file
	* @param {RuleContext} context The ESLint rule context object.
	* @param {Map} modules A Map object contains as a key a module name and as value an array contains objects, each object contains a node and a declaration type.
	* @param {string} declarationType A declaration type can be an import or export.
	* @param {boolean} includeExports Whether or not to check for exports in addition to imports.
	* @param {boolean} allowSeparateTypeImports Whether to allow separate type and value imports.
	* @returns {nodeCallback} A function passed to ESLint to handle the statement.
	*/
	function handleImportsExports(context, modules, declarationType, includeExports, allowSeparateTypeImports) {
		return function(node) {
			let module$2 = getModule(node);
			if (module$2) {
				checkAndReport(context, node, modules, declarationType, includeExports, allowSeparateTypeImports);
				let currentNode = {
					node,
					declarationType
				}, nodes = [currentNode];
				modules.has(module$2) && (nodes = [...modules.get(module$2), currentNode]), modules.set(module$2, nodes);
			}
		};
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			dialects: ["javascript", "typescript"],
			language: "javascript",
			type: "problem",
			defaultOptions: [{
				includeExports: !1,
				allowSeparateTypeImports: !1
			}],
			docs: {
				description: "Disallow duplicate module imports",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-duplicate-imports"
			},
			schema: [{
				type: "object",
				properties: {
					includeExports: { type: "boolean" },
					allowSeparateTypeImports: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: {
				import: "'{{module}}' import is duplicated.",
				importAs: "'{{module}}' import is duplicated as export.",
				export: "'{{module}}' export is duplicated.",
				exportAs: "'{{module}}' export is duplicated as import."
			}
		},
		create(context) {
			let [{ includeExports, allowSeparateTypeImports }] = context.options, modules = /* @__PURE__ */ new Map(), handlers = { ImportDeclaration: handleImportsExports(context, modules, "import", includeExports, allowSeparateTypeImports) };
			return includeExports && (handlers.ExportNamedDeclaration = handleImportsExports(context, modules, "export", includeExports, allowSeparateTypeImports), handlers.ExportAllDeclaration = handleImportsExports(context, modules, "export", includeExports, allowSeparateTypeImports)), handlers;
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-duplicate-imports.cjs
module.exports = require_no_duplicate_imports().create;
//#endregion
