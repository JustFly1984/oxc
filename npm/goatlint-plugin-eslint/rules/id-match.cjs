const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/id-match.js
/**
* @fileoverview Rule to flag non-matching identifiers
* @author Matthieu Larcher
*/
var require_id_match = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: ["^.+$", {
				classFields: !1,
				ignoreDestructuring: !1,
				onlyDeclarations: !1,
				properties: !1
			}],
			docs: {
				description: "Require identifiers to match a specified regular expression",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/id-match"
			},
			schema: [{ type: "string" }, {
				type: "object",
				properties: {
					properties: { type: "boolean" },
					classFields: { type: "boolean" },
					onlyDeclarations: { type: "boolean" },
					ignoreDestructuring: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: {
				notMatch: "Identifier '{{name}}' does not match the pattern '{{pattern}}'.",
				notMatchPrivate: "Identifier '#{{name}}' does not match the pattern '{{pattern}}'."
			}
		},
		create(context) {
			let [pattern, { classFields: checkClassFields, ignoreDestructuring, onlyDeclarations, properties: checkProperties }] = context.options, regexp = new RegExp(pattern, "u"), sourceCode = context.sourceCode, globalScope, reportedNodes = /* @__PURE__ */ new Set(), ALLOWED_PARENT_TYPES = new Set(["CallExpression", "NewExpression"]), DECLARATION_TYPES = new Set(["FunctionDeclaration", "VariableDeclarator"]), IMPORT_TYPES = new Set([
				"ImportSpecifier",
				"ImportNamespaceSpecifier",
				"ImportDefaultSpecifier"
			]);
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
			* Checks if a string matches the provided pattern
			* @param {string} name The string to check.
			* @returns {boolean} if the string is a match
			* @private
			*/
			function isInvalid(name) {
				return !regexp.test(name);
			}
			/**
			* Checks if a parent of a node is an ObjectPattern.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} if the node is inside an ObjectPattern
			* @private
			*/
			function isInsideObjectPattern(node) {
				let { parent } = node;
				for (; parent;) {
					if (parent.type === "ObjectPattern") return !0;
					parent = parent.parent;
				}
				return !1;
			}
			/**
			* Verifies if we should report an error or not based on the effective
			* parent node and the identifier name.
			* @param {ASTNode} effectiveParent The effective parent node of the node to be reported
			* @param {string} name The identifier name of the identifier node
			* @returns {boolean} whether an error should be reported or not
			*/
			function shouldReport(effectiveParent, name) {
				return (!onlyDeclarations || DECLARATION_TYPES.has(effectiveParent.type)) && !ALLOWED_PARENT_TYPES.has(effectiveParent.type) && isInvalid(name);
			}
			/**
			* Reports an AST node as a rule violation.
			* @param {ASTNode} node The node to report.
			* @returns {void}
			* @private
			*/
			function report(node) {
				if (!reportedNodes.has(node.range.toString())) {
					let messageId = node.type === "PrivateIdentifier" ? "notMatchPrivate" : "notMatch";
					context.report({
						node,
						messageId,
						data: {
							name: node.name,
							pattern
						}
					}), reportedNodes.add(node.range.toString());
				}
			}
			return {
				Program(node) {
					globalScope = sourceCode.getScope(node);
				},
				Identifier(node) {
					let name = node.name, parent = node.parent, effectiveParent = parent.type === "MemberExpression" ? parent.parent : parent;
					if (!(isReferenceToGlobalVariable(node) || astUtils.isImportAttributeKey(node))) if (parent.type === "MemberExpression") {
						if (!checkProperties) return;
						parent.object.type === "Identifier" && parent.object.name === name || effectiveParent.type === "AssignmentExpression" && effectiveParent.left.type === "MemberExpression" && effectiveParent.left.property.name === node.name ? isInvalid(name) && report(node) : effectiveParent.type === "AssignmentExpression" && effectiveParent.right.type !== "MemberExpression" && isInvalid(name) && report(node);
					} else if (parent.type === "Property" && parent.parent.type === "ObjectExpression" && parent.key === node && !parent.computed) checkProperties && isInvalid(name) && report(node);
					else if (parent.type === "Property" || parent.type === "AssignmentPattern") {
						if (parent.parent && parent.parent.type === "ObjectPattern") {
							!ignoreDestructuring && parent.shorthand && parent.value.left && isInvalid(name) && report(node);
							let assignmentKeyEqualsValue = parent.key.name === parent.value.name;
							if (!assignmentKeyEqualsValue && parent.key === node) return;
							parent.value.name && isInvalid(name) && !(assignmentKeyEqualsValue && ignoreDestructuring) && report(node);
						}
						if (!checkProperties && !parent.computed || ignoreDestructuring && isInsideObjectPattern(node)) return;
						parent.right !== node && shouldReport(effectiveParent, name) && report(node);
					} else IMPORT_TYPES.has(parent.type) ? parent.local && parent.local.name === node.name && isInvalid(name) && report(node) : parent.type === "PropertyDefinition" ? checkClassFields && isInvalid(name) && report(node) : shouldReport(effectiveParent, name) && report(node);
				},
				PrivateIdentifier(node) {
					node.parent.type === "PropertyDefinition" && !checkClassFields || isInvalid(node.name) && report(node);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/id-match.cjs
module.exports = require_id_match().create;
//#endregion
