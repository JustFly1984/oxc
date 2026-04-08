const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_ignore$1 = require("../common/ignore.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-restricted-imports.js
/**
* @fileoverview Restrict usage of specified node imports.
* @author Guy Ellis
*/
var require_no_restricted_imports = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), ignore = require_ignore$1.t(), arrayOfStringsOrObjects = {
		type: "array",
		items: { anyOf: [{ type: "string" }, {
			type: "object",
			properties: {
				name: { type: "string" },
				message: {
					type: "string",
					minLength: 1
				},
				importNames: {
					type: "array",
					items: { type: "string" }
				},
				allowImportNames: {
					type: "array",
					items: { type: "string" }
				},
				allowTypeImports: {
					type: "boolean",
					description: "Whether to allow type-only imports for a path."
				}
			},
			additionalProperties: !1,
			required: ["name"],
			not: { required: ["importNames", "allowImportNames"] }
		}] },
		uniqueItems: !0
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			dialects: ["typescript", "javascript"],
			language: "javascript",
			docs: {
				description: "Disallow specified modules when loaded by `import`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-restricted-imports"
			},
			messages: {
				path: "'{{importSource}}' import is restricted from being used.",
				pathWithCustomMessage: "'{{importSource}}' import is restricted from being used. {{customMessage}}",
				patterns: "'{{importSource}}' import is restricted from being used by a pattern.",
				patternWithCustomMessage: "'{{importSource}}' import is restricted from being used by a pattern. {{customMessage}}",
				patternAndImportName: "'{{importName}}' import from '{{importSource}}' is restricted from being used by a pattern.",
				patternAndImportNameWithCustomMessage: "'{{importName}}' import from '{{importSource}}' is restricted from being used by a pattern. {{customMessage}}",
				patternAndEverything: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted from being used by a pattern.",
				patternAndEverythingWithRegexImportName: "* import is invalid because import name matching '{{importNames}}' pattern from '{{importSource}}' is restricted from being used.",
				patternAndEverythingWithCustomMessage: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted from being used by a pattern. {{customMessage}}",
				patternAndEverythingWithRegexImportNameAndCustomMessage: "* import is invalid because import name matching '{{importNames}}' pattern from '{{importSource}}' is restricted from being used. {{customMessage}}",
				everything: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted.",
				everythingWithCustomMessage: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted. {{customMessage}}",
				importName: "'{{importName}}' import from '{{importSource}}' is restricted.",
				importNameWithCustomMessage: "'{{importName}}' import from '{{importSource}}' is restricted. {{customMessage}}",
				allowedImportName: "'{{importName}}' import from '{{importSource}}' is restricted because only '{{allowedImportNames}}' import(s) is/are allowed.",
				allowedImportNameWithCustomMessage: "'{{importName}}' import from '{{importSource}}' is restricted because only '{{allowedImportNames}}' import(s) is/are allowed. {{customMessage}}",
				everythingWithAllowImportNames: "* import is invalid because only '{{allowedImportNames}}' from '{{importSource}}' is/are allowed.",
				everythingWithAllowImportNamesAndCustomMessage: "* import is invalid because only '{{allowedImportNames}}' from '{{importSource}}' is/are allowed. {{customMessage}}",
				allowedImportNamePattern: "'{{importName}}' import from '{{importSource}}' is restricted because only imports that match the pattern '{{allowedImportNamePattern}}' are allowed from '{{importSource}}'.",
				allowedImportNamePatternWithCustomMessage: "'{{importName}}' import from '{{importSource}}' is restricted because only imports that match the pattern '{{allowedImportNamePattern}}' are allowed from '{{importSource}}'. {{customMessage}}",
				everythingWithAllowedImportNamePattern: "* import is invalid because only imports that match the pattern '{{allowedImportNamePattern}}' from '{{importSource}}' are allowed.",
				everythingWithAllowedImportNamePatternWithCustomMessage: "* import is invalid because only imports that match the pattern '{{allowedImportNamePattern}}' from '{{importSource}}' are allowed. {{customMessage}}"
			},
			schema: { anyOf: [arrayOfStringsOrObjects, {
				type: "array",
				items: [{
					type: "object",
					properties: {
						paths: arrayOfStringsOrObjects,
						patterns: { anyOf: [{
							type: "array",
							items: { type: "string" },
							uniqueItems: !0
						}, {
							type: "array",
							items: {
								type: "object",
								properties: {
									importNames: {
										type: "array",
										items: { type: "string" },
										minItems: 1,
										uniqueItems: !0
									},
									allowImportNames: {
										type: "array",
										items: { type: "string" },
										minItems: 1,
										uniqueItems: !0
									},
									group: {
										type: "array",
										items: { type: "string" },
										minItems: 1,
										uniqueItems: !0
									},
									regex: { type: "string" },
									importNamePattern: { type: "string" },
									allowImportNamePattern: { type: "string" },
									message: {
										type: "string",
										minLength: 1
									},
									caseSensitive: { type: "boolean" },
									allowTypeImports: {
										type: "boolean",
										description: "Whether to allow type-only imports for a pattern."
									}
								},
								additionalProperties: !1,
								not: { anyOf: [
									{ required: ["importNames", "allowImportNames"] },
									{ required: ["importNamePattern", "allowImportNamePattern"] },
									{ required: ["importNames", "allowImportNamePattern"] },
									{ required: ["importNamePattern", "allowImportNames"] },
									{ required: ["allowImportNames", "allowImportNamePattern"] }
								] },
								oneOf: [{ required: ["group"] }, { required: ["regex"] }]
							},
							uniqueItems: !0
						}] }
					},
					additionalProperties: !1
				}],
				additionalItems: !1
			}] }
		},
		create(context) {
			let sourceCode = context.sourceCode, options = Array.isArray(context.options) ? context.options : [], isPathAndPatternsObject = typeof options[0] == "object" && (Object.hasOwn(options[0], "paths") || Object.hasOwn(options[0], "patterns")), restrictedPaths = (isPathAndPatternsObject ? options[0].paths : context.options) || [], groupedRestrictedPaths = restrictedPaths.reduce((memo, importSource) => {
				let path = typeof importSource == "string" ? importSource : importSource.name;
				return memo[path] || (memo[path] = []), typeof importSource == "string" ? memo[path].push({}) : memo[path].push({
					message: importSource.message,
					importNames: importSource.importNames,
					allowImportNames: importSource.allowImportNames,
					allowTypeImports: importSource.allowTypeImports
				}), memo;
			}, Object.create(null)), restrictedPatterns = (isPathAndPatternsObject ? options[0].patterns : []) || [];
			restrictedPatterns.length > 0 && typeof restrictedPatterns[0] == "string" && (restrictedPatterns = [{ group: restrictedPatterns }]);
			let restrictedPatternGroups = restrictedPatterns.map(({ group, regex, message, caseSensitive, importNames, importNamePattern, allowImportNames, allowImportNamePattern, allowTypeImports }) => ({
				...group ? { matcher: ignore({
					allowRelativePaths: !0,
					ignorecase: !caseSensitive
				}).add(group) } : {},
				...typeof regex == "string" ? { regexMatcher: new RegExp(regex, caseSensitive ? "u" : "iu") } : {},
				customMessage: message,
				importNames,
				importNamePattern,
				allowImportNames,
				allowImportNamePattern,
				allowTypeImports
			}));
			if (Object.keys(restrictedPaths).length === 0 && restrictedPatternGroups.length === 0) return {};
			/**
			* Check if the node is a type-only import
			* @param {ASTNode} node The node to check
			* @returns {boolean} Whether the node is a type-only import
			*/
			function isTypeOnlyImport(node) {
				return node.importKind === "type" || node.specifiers?.length > 0 && node.specifiers.every((specifier) => specifier.importKind === "type");
			}
			/**
			* Check if a specifier is type-only
			* @param {ASTNode} specifier The specifier to check
			* @returns {boolean} Whether the specifier is type-only
			*/
			function isTypeOnlySpecifier(specifier) {
				return specifier.importKind === "type" || specifier.exportKind === "type";
			}
			/**
			* Check if the node is a type-only export
			* @param {ASTNode} node The node to check
			* @returns {boolean} Whether the node is a type-only export
			*/
			function isTypeOnlyExport(node) {
				return node.exportKind === "type" || node.specifiers?.length > 0 && node.specifiers.every((specifier) => specifier.exportKind === "type");
			}
			/**
			* Report a restricted path.
			* @param {string} importSource path of the import
			* @param {Map<string,Object[]>} importNames Map of import names that are being imported
			* @param {node} node representing the restricted path reference
			* @returns {void}
			* @private
			*/
			function checkRestrictedPathAndReport(importSource, importNames, node) {
				Object.hasOwn(groupedRestrictedPaths, importSource) && groupedRestrictedPaths[importSource].forEach((restrictedPathEntry) => {
					let customMessage = restrictedPathEntry.message, restrictedImportNames = restrictedPathEntry.importNames, allowedImportNames = restrictedPathEntry.allowImportNames, allowTypeImports = restrictedPathEntry.allowTypeImports;
					if (!(allowTypeImports && (node.type === "ImportDeclaration" || node.type === "TSImportEqualsDeclaration") && isTypeOnlyImport(node)) && !(allowTypeImports && (node.type === "ExportNamedDeclaration" || node.type === "ExportAllDeclaration") && isTypeOnlyExport(node))) {
						if (!restrictedImportNames && !allowedImportNames) {
							context.report({
								node,
								messageId: customMessage ? "pathWithCustomMessage" : "path",
								data: {
									importSource,
									customMessage
								}
							});
							return;
						}
						importNames.forEach((specifiers, importName) => {
							if (importName === "*") {
								let [specifier] = specifiers;
								restrictedImportNames ? context.report({
									node,
									messageId: customMessage ? "everythingWithCustomMessage" : "everything",
									loc: specifier.loc,
									data: {
										importSource,
										importNames: restrictedImportNames,
										customMessage
									}
								}) : allowedImportNames && context.report({
									node,
									messageId: customMessage ? "everythingWithAllowImportNamesAndCustomMessage" : "everythingWithAllowImportNames",
									loc: specifier.loc,
									data: {
										importSource,
										allowedImportNames,
										customMessage
									}
								});
								return;
							}
							restrictedImportNames && restrictedImportNames.includes(importName) && specifiers.forEach((specifier) => {
								allowTypeImports && isTypeOnlySpecifier(specifier.specifier) || context.report({
									node,
									messageId: customMessage ? "importNameWithCustomMessage" : "importName",
									loc: specifier.loc,
									data: {
										importSource,
										customMessage,
										importName
									}
								});
							}), allowedImportNames && !allowedImportNames.includes(importName) && specifiers.forEach((specifier) => {
								allowTypeImports && isTypeOnlySpecifier(specifier.specifier) || context.report({
									node,
									loc: specifier.loc,
									messageId: customMessage ? "allowedImportNameWithCustomMessage" : "allowedImportName",
									data: {
										importSource,
										customMessage,
										importName,
										allowedImportNames
									}
								});
							});
						});
					}
				});
			}
			/**
			* Report a restricted path specifically for patterns.
			* @param {node} node representing the restricted path reference
			* @param {Object} group contains an Ignore instance for paths, the customMessage to show on failure,
			* and any restricted import names that have been specified in the config
			* @param {Map<string,Object[]>} importNames Map of import names that are being imported
			* @param {string} importSource the import source string
			* @returns {void}
			* @private
			*/
			function reportPathForPatterns(node, group, importNames, importSource) {
				if (group.allowTypeImports && (node.type === "ImportDeclaration" || node.type === "TSImportEqualsDeclaration") && isTypeOnlyImport(node) || group.allowTypeImports && (node.type === "ExportNamedDeclaration" || node.type === "ExportAllDeclaration") && isTypeOnlyExport(node)) return;
				let customMessage = group.customMessage, restrictedImportNames = group.importNames, restrictedImportNamePattern = group.importNamePattern ? new RegExp(group.importNamePattern, "u") : null, allowedImportNames = group.allowImportNames, allowedImportNamePattern = group.allowImportNamePattern ? new RegExp(group.allowImportNamePattern, "u") : null;
				/**
				* If we are not restricting to any specific import names and just the pattern itself,
				* report the error and move on
				*/
				if (!restrictedImportNames && !allowedImportNames && !restrictedImportNamePattern && !allowedImportNamePattern) {
					context.report({
						node,
						messageId: customMessage ? "patternWithCustomMessage" : "patterns",
						data: {
							importSource,
							customMessage
						}
					});
					return;
				}
				importNames.forEach((specifiers, importName) => {
					if (importName === "*") {
						let [specifier] = specifiers;
						restrictedImportNames ? context.report({
							node,
							messageId: customMessage ? "patternAndEverythingWithCustomMessage" : "patternAndEverything",
							loc: specifier.loc,
							data: {
								importSource,
								importNames: restrictedImportNames,
								customMessage
							}
						}) : allowedImportNames ? context.report({
							node,
							messageId: customMessage ? "everythingWithAllowImportNamesAndCustomMessage" : "everythingWithAllowImportNames",
							loc: specifier.loc,
							data: {
								importSource,
								allowedImportNames,
								customMessage
							}
						}) : allowedImportNamePattern ? context.report({
							node,
							messageId: customMessage ? "everythingWithAllowedImportNamePatternWithCustomMessage" : "everythingWithAllowedImportNamePattern",
							loc: specifier.loc,
							data: {
								importSource,
								allowedImportNamePattern,
								customMessage
							}
						}) : context.report({
							node,
							messageId: customMessage ? "patternAndEverythingWithRegexImportNameAndCustomMessage" : "patternAndEverythingWithRegexImportName",
							loc: specifier.loc,
							data: {
								importSource,
								importNames: restrictedImportNamePattern,
								customMessage
							}
						});
						return;
					}
					(restrictedImportNames && restrictedImportNames.includes(importName) || restrictedImportNamePattern && restrictedImportNamePattern.test(importName)) && specifiers.forEach((specifier) => {
						group.allowTypeImports && isTypeOnlySpecifier(specifier.specifier) || context.report({
							node,
							messageId: customMessage ? "patternAndImportNameWithCustomMessage" : "patternAndImportName",
							loc: specifier.loc,
							data: {
								importSource,
								customMessage,
								importName
							}
						});
					}), allowedImportNames && !allowedImportNames.includes(importName) ? specifiers.forEach((specifier) => {
						group.allowTypeImports && isTypeOnlySpecifier(specifier.specifier) || context.report({
							node,
							messageId: customMessage ? "allowedImportNameWithCustomMessage" : "allowedImportName",
							loc: specifier.loc,
							data: {
								importSource,
								customMessage,
								importName,
								allowedImportNames
							}
						});
					}) : allowedImportNamePattern && !allowedImportNamePattern.test(importName) && specifiers.forEach((specifier) => {
						group.allowTypeImports && isTypeOnlySpecifier(specifier.specifier) || context.report({
							node,
							messageId: customMessage ? "allowedImportNamePatternWithCustomMessage" : "allowedImportNamePattern",
							loc: specifier.loc,
							data: {
								importSource,
								customMessage,
								importName,
								allowedImportNamePattern
							}
						});
					});
				});
			}
			/**
			* Check if the given importSource is restricted by a pattern.
			* @param {string} importSource path of the import
			* @param {Object} group contains a Ignore instance for paths, and the customMessage to show if it fails
			* @returns {boolean} whether the variable is a restricted pattern or not
			* @private
			*/
			function isRestrictedPattern(importSource, group) {
				return group.regexMatcher ? group.regexMatcher.test(importSource) : group.matcher.ignores(importSource);
			}
			/**
			* Checks a node to see if any problems should be reported.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			* @private
			*/
			function checkNode(node) {
				let importSource = node.source.value.trim(), importNames = /* @__PURE__ */ new Map();
				if (node.type === "ExportAllDeclaration") {
					let starToken = sourceCode.getFirstToken(node, 1);
					importNames.set("*", [{ loc: starToken.loc }]);
				} else if (node.specifiers) for (let specifier of node.specifiers) {
					let name, specifierData = {
						loc: specifier.loc,
						specifier
					};
					specifier.type === "ImportDefaultSpecifier" ? name = "default" : specifier.type === "ImportNamespaceSpecifier" ? name = "*" : specifier.imported ? name = astUtils.getModuleExportName(specifier.imported) : specifier.local && (name = astUtils.getModuleExportName(specifier.local)), typeof name == "string" && (importNames.has(name) ? importNames.get(name).push(specifierData) : importNames.set(name, [specifierData]));
				}
				checkRestrictedPathAndReport(importSource, importNames, node), restrictedPatternGroups.forEach((group) => {
					isRestrictedPattern(importSource, group) && reportPathForPatterns(node, group, importNames, importSource);
				});
			}
			return {
				ImportDeclaration: checkNode,
				ExportNamedDeclaration(node) {
					node.source && checkNode(node);
				},
				ExportAllDeclaration: checkNode,
				TSImportEqualsDeclaration(node) {
					if (node.moduleReference.type === "TSExternalModuleReference") {
						let importSource = node.moduleReference.expression.value, importNames = /* @__PURE__ */ new Map();
						checkRestrictedPathAndReport(importSource, importNames, node), restrictedPatternGroups.forEach((group) => {
							isRestrictedPattern(importSource, group) && reportPathForPatterns(node, group, importNames, importSource);
						});
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-restricted-imports.cjs
module.exports = require_no_restricted_imports().create;
//#endregion
