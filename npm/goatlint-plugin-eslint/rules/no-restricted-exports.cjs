const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-restricted-exports.js
/**
* @fileoverview Rule to disallow specified names in exports
* @author Milos Djermanovic
*/
var require_no_restricted_exports = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow specified names in exports",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-restricted-exports"
			},
			schema: [{ anyOf: [{
				type: "object",
				properties: {
					restrictedNamedExports: {
						type: "array",
						items: { type: "string" },
						uniqueItems: !0
					},
					restrictedNamedExportsPattern: { type: "string" }
				},
				additionalProperties: !1
			}, {
				type: "object",
				properties: {
					restrictedNamedExports: {
						type: "array",
						items: {
							type: "string",
							pattern: "^(?!default$)"
						},
						uniqueItems: !0
					},
					restrictedNamedExportsPattern: { type: "string" },
					restrictDefaultExports: {
						type: "object",
						properties: {
							direct: { type: "boolean" },
							named: { type: "boolean" },
							defaultFrom: { type: "boolean" },
							namedFrom: { type: "boolean" },
							namespaceFrom: { type: "boolean" }
						},
						additionalProperties: !1
					}
				},
				additionalProperties: !1
			}] }],
			messages: {
				restrictedNamed: "'{{name}}' is restricted from being used as an exported name.",
				restrictedDefault: "Exporting 'default' is restricted."
			}
		},
		create(context) {
			let restrictedNames = new Set(context.options[0] && context.options[0].restrictedNamedExports), restrictedNamePattern = context.options[0] && context.options[0].restrictedNamedExportsPattern, restrictDefaultExports = context.options[0] && context.options[0].restrictDefaultExports, sourceCode = context.sourceCode;
			/**
			* Checks and reports given exported name.
			* @param {ASTNode} node exported `Identifier` or string `Literal` node to check.
			* @returns {void}
			*/
			function checkExportedName(node) {
				let name = astUtils.getModuleExportName(node), matchesRestrictedNamePattern = !1;
				if (restrictedNamePattern && name !== "default" && (matchesRestrictedNamePattern = new RegExp(restrictedNamePattern, "u").test(name)), matchesRestrictedNamePattern || restrictedNames.has(name)) {
					context.report({
						node,
						messageId: "restrictedNamed",
						data: { name }
					});
					return;
				}
				if (name === "default") if (node.parent.type === "ExportAllDeclaration") restrictDefaultExports && restrictDefaultExports.namespaceFrom && context.report({
					node,
					messageId: "restrictedDefault"
				});
				else {
					let isSourceSpecified = !!node.parent.parent.source, specifierLocalName = astUtils.getModuleExportName(node.parent.local);
					if (!isSourceSpecified && restrictDefaultExports && restrictDefaultExports.named) {
						context.report({
							node,
							messageId: "restrictedDefault"
						});
						return;
					}
					isSourceSpecified && restrictDefaultExports && (specifierLocalName === "default" && restrictDefaultExports.defaultFrom || specifierLocalName !== "default" && restrictDefaultExports.namedFrom) && context.report({
						node,
						messageId: "restrictedDefault"
					});
				}
			}
			return {
				ExportAllDeclaration(node) {
					node.exported && checkExportedName(node.exported);
				},
				ExportDefaultDeclaration(node) {
					restrictDefaultExports && restrictDefaultExports.direct && context.report({
						node,
						messageId: "restrictedDefault"
					});
				},
				ExportNamedDeclaration(node) {
					let declaration = node.declaration;
					declaration ? declaration.type === "FunctionDeclaration" || declaration.type === "ClassDeclaration" ? checkExportedName(declaration.id) : declaration.type === "VariableDeclaration" && sourceCode.getDeclaredVariables(declaration).map((v) => v.defs.find((d) => d.parent === declaration)).map((d) => d.name).forEach(checkExportedName) : node.specifiers.map((s) => s.exported).forEach(checkExportedName);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-restricted-exports.cjs
module.exports = require_no_restricted_exports().create;
//#endregion
