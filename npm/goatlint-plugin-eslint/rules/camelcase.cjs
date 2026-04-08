const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/camelcase.js
/**
* @fileoverview Rule to flag non-camelcased identifiers
* @author Nicholas C. Zakas
*/
var require_camelcase = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				allow: [],
				ignoreDestructuring: !1,
				ignoreGlobals: !1,
				ignoreImports: !1,
				properties: "always"
			}],
			docs: {
				description: "Enforce camelcase naming convention",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/camelcase"
			},
			schema: [{
				type: "object",
				properties: {
					ignoreDestructuring: { type: "boolean" },
					ignoreImports: { type: "boolean" },
					ignoreGlobals: { type: "boolean" },
					properties: { enum: ["always", "never"] },
					allow: {
						type: "array",
						items: { type: "string" },
						minItems: 0,
						uniqueItems: !0
					}
				},
				additionalProperties: !1
			}],
			messages: {
				notCamelCase: "Identifier '{{name}}' is not in camel case.",
				notCamelCasePrivate: "#{{name}} is not in camel case."
			}
		},
		create(context) {
			let [{ allow, ignoreDestructuring, ignoreGlobals, ignoreImports, properties }] = context.options, sourceCode = context.sourceCode, reported = /* @__PURE__ */ new Set();
			/**
			* Checks if a string contains an underscore and isn't all upper-case
			* @param {string} name The string to check.
			* @returns {boolean} if the string is underscored
			* @private
			*/
			function isUnderscored(name) {
				let nameBody = name.replace(/^_+|_+$/gu, "");
				return nameBody.includes("_") && nameBody !== nameBody.toUpperCase();
			}
			/**
			* Checks if a string match the ignore list
			* @param {string} name The string to check.
			* @returns {boolean} if the string is ignored
			* @private
			*/
			function isAllowed(name) {
				return allow.some((entry) => name === entry || name.match(new RegExp(entry, "u")));
			}
			/**
			* Checks if a given name is good or not.
			* @param {string} name The name to check.
			* @returns {boolean} `true` if the name is good.
			* @private
			*/
			function isGoodName(name) {
				return !isUnderscored(name) || isAllowed(name);
			}
			/**
			* Checks if a given identifier reference or member expression is an assignment
			* target.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} `true` if the node is an assignment target.
			*/
			function isAssignmentTarget(node) {
				let parent = node.parent;
				switch (parent.type) {
					case "AssignmentExpression":
					case "AssignmentPattern": return parent.left === node;
					case "Property": return parent.parent.type === "ObjectPattern" && parent.value === node;
					case "ArrayPattern":
					case "RestElement": return !0;
					default: return !1;
				}
			}
			/**
			* Checks if a given binding identifier uses the original name as-is.
			* - If it's in object destructuring or object expression, the original name is its property name.
			* - If it's in import declaration, the original name is its exported name.
			* @param {ASTNode} node The `Identifier` node to check.
			* @returns {boolean} `true` if the identifier uses the original name as-is.
			*/
			function equalsToOriginalName(node) {
				let localName = node.name, valueNode = node.parent.type === "AssignmentPattern" ? node.parent : node, parent = valueNode.parent;
				switch (parent.type) {
					case "Property": return (parent.parent.type === "ObjectPattern" || parent.parent.type === "ObjectExpression") && parent.value === valueNode && !parent.computed && parent.key.type === "Identifier" && parent.key.name === localName;
					case "ImportSpecifier": return parent.local === node && astUtils.getModuleExportName(parent.imported) === localName;
					default: return !1;
				}
			}
			/**
			* Reports an AST node as a rule violation.
			* @param {ASTNode} node The node to report.
			* @returns {void}
			* @private
			*/
			function report(node) {
				reported.has(node.range[0]) || (reported.add(node.range[0]), context.report({
					node,
					messageId: node.type === "PrivateIdentifier" ? "notCamelCasePrivate" : "notCamelCase",
					data: { name: node.name }
				}));
			}
			/**
			* Reports an identifier reference or a binding identifier.
			* @param {ASTNode} node The `Identifier` node to report.
			* @returns {void}
			*/
			function reportReferenceId(node) {
				node.parent.type === "CallExpression" || node.parent.type === "NewExpression" || node.parent.type === "AssignmentPattern" && node.parent.right === node || ignoreDestructuring && equalsToOriginalName(node) || astUtils.isImportAttributeKey(node) || report(node);
			}
			return {
				Program(node) {
					let scope = sourceCode.getScope(node);
					if (!ignoreGlobals) {
						for (let variable of scope.variables) if (!(variable.identifiers.length > 0 || isGoodName(variable.name))) for (let reference of variable.references) reportReferenceId(reference.identifier);
					}
					for (let reference of scope.through) {
						let id = reference.identifier;
						isGoodName(id.name) || astUtils.isImportAttributeKey(id) || reportReferenceId(id);
					}
				},
				[[
					"VariableDeclaration",
					"FunctionDeclaration",
					"FunctionExpression",
					"ArrowFunctionExpression",
					"ClassDeclaration",
					"ClassExpression",
					"CatchClause"
				]](node) {
					for (let variable of sourceCode.getDeclaredVariables(node)) {
						if (isGoodName(variable.name)) continue;
						let id = variable.identifiers[0];
						ignoreDestructuring && equalsToOriginalName(id) || report(id);
						for (let reference of variable.references) reference.init || reportReferenceId(reference.identifier);
					}
				},
				[[
					"ObjectExpression > Property[computed!=true] > Identifier.key",
					"MethodDefinition[computed!=true] > Identifier.key",
					"PropertyDefinition[computed!=true] > Identifier.key",
					"MethodDefinition > PrivateIdentifier.key",
					"PropertyDefinition > PrivateIdentifier.key"
				]](node) {
					properties === "never" || astUtils.isImportAttributeKey(node) || isGoodName(node.name) || report(node);
				},
				"MemberExpression[computed!=true] > Identifier.property"(node) {
					properties === "never" || !isAssignmentTarget(node.parent) || isGoodName(node.name) || report(node);
				},
				ImportDeclaration(node) {
					for (let variable of sourceCode.getDeclaredVariables(node)) {
						if (isGoodName(variable.name)) continue;
						let id = variable.identifiers[0];
						ignoreImports && equalsToOriginalName(id) || report(id);
						for (let reference of variable.references) reportReferenceId(reference.identifier);
					}
				},
				[["ExportAllDeclaration > Identifier.exported", "ExportSpecifier > Identifier.exported"]](node) {
					isGoodName(node.name) || report(node);
				},
				[[
					"LabeledStatement > Identifier.label",
					"BreakStatement > Identifier.label",
					"ContinueStatement > Identifier.label"
				]](node) {
					isGoodName(node.name) || report(node);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/camelcase.cjs
module.exports = require_camelcase().create;
//#endregion
