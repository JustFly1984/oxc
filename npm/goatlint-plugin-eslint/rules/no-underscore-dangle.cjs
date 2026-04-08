//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-underscore-dangle.js
/**
* @fileoverview Rule to flag dangling underscores in variable declarations.
* @author Matt DuVall <http://www.mattduvall.com>
*/
var require_no_underscore_dangle = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				allow: [],
				allowAfterSuper: !1,
				allowAfterThis: !1,
				allowAfterThisConstructor: !1,
				allowFunctionParams: !0,
				allowInArrayDestructuring: !0,
				allowInObjectDestructuring: !0,
				enforceInClassFields: !1,
				enforceInMethodNames: !1
			}],
			docs: {
				description: "Disallow dangling underscores in identifiers",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-underscore-dangle"
			},
			schema: [{
				type: "object",
				properties: {
					allow: {
						type: "array",
						items: { type: "string" }
					},
					allowAfterThis: { type: "boolean" },
					allowAfterSuper: { type: "boolean" },
					allowAfterThisConstructor: { type: "boolean" },
					enforceInMethodNames: { type: "boolean" },
					allowFunctionParams: { type: "boolean" },
					enforceInClassFields: { type: "boolean" },
					allowInArrayDestructuring: { type: "boolean" },
					allowInObjectDestructuring: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: { unexpectedUnderscore: "Unexpected dangling '_' in '{{identifier}}'." }
		},
		create(context) {
			let [{ allow, allowAfterSuper, allowAfterThis, allowAfterThisConstructor, allowFunctionParams, allowInArrayDestructuring, allowInObjectDestructuring, enforceInClassFields, enforceInMethodNames }] = context.options, sourceCode = context.sourceCode;
			/**
			* Check if identifier is present inside the allowed option
			* @param {string} identifier name of the node
			* @returns {boolean} true if its is present
			* @private
			*/
			function isAllowed(identifier) {
				return allow.includes(identifier);
			}
			/**
			* Check if identifier has a dangling underscore
			* @param {string} identifier name of the node
			* @returns {boolean} true if its is present
			* @private
			*/
			function hasDanglingUnderscore(identifier) {
				let len = identifier.length;
				return identifier !== "_" && (identifier[0] === "_" || identifier[len - 1] === "_");
			}
			/**
			* Check if identifier is a special case member expression
			* @param {string} identifier name of the node
			* @returns {boolean} true if its is a special case
			* @private
			*/
			function isSpecialCaseIdentifierForMemberExpression(identifier) {
				return identifier === "__proto__";
			}
			/**
			* Check if identifier is a special case variable expression
			* @param {string} identifier name of the node
			* @returns {boolean} true if its is a special case
			* @private
			*/
			function isSpecialCaseIdentifierInVariableExpression(identifier) {
				return identifier === "_";
			}
			/**
			* Check if a node is a member reference of this.constructor
			* @param {ASTNode} node node to evaluate
			* @returns {boolean} true if it is a reference on this.constructor
			* @private
			*/
			function isThisConstructorReference(node) {
				return node.object.type === "MemberExpression" && node.object.property.name === "constructor" && node.object.object.type === "ThisExpression";
			}
			/**
			* Check if function parameter has a dangling underscore.
			* @param {ASTNode} node function node to evaluate
			* @returns {void}
			* @private
			*/
			function checkForDanglingUnderscoreInFunctionParameters(node) {
				allowFunctionParams || node.params.forEach((param) => {
					let { type } = param, nodeToCheck;
					if (nodeToCheck = type === "RestElement" ? param.argument : type === "AssignmentPattern" ? param.left : param, nodeToCheck.type === "Identifier") {
						let identifier = nodeToCheck.name;
						hasDanglingUnderscore(identifier) && !isAllowed(identifier) && context.report({
							node: param,
							messageId: "unexpectedUnderscore",
							data: { identifier }
						});
					}
				});
			}
			/**
			* Check if function has a dangling underscore
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function checkForDanglingUnderscoreInFunction(node) {
				if (node.type === "FunctionDeclaration" && node.id) {
					let identifier = node.id.name;
					identifier !== void 0 && hasDanglingUnderscore(identifier) && !isAllowed(identifier) && context.report({
						node,
						messageId: "unexpectedUnderscore",
						data: { identifier }
					});
				}
				checkForDanglingUnderscoreInFunctionParameters(node);
			}
			/**
			* Check if variable expression has a dangling underscore
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function checkForDanglingUnderscoreInVariableExpression(node) {
				sourceCode.getDeclaredVariables(node).forEach((variable) => {
					let identifierNode = variable.defs.find((def) => def.node === node).name, identifier = identifierNode.name, parent = identifierNode.parent;
					for (; ![
						"VariableDeclarator",
						"ArrayPattern",
						"ObjectPattern"
					].includes(parent.type);) parent = parent.parent;
					hasDanglingUnderscore(identifier) && !isSpecialCaseIdentifierInVariableExpression(identifier) && !isAllowed(identifier) && !(allowInArrayDestructuring && parent.type === "ArrayPattern") && !(allowInObjectDestructuring && parent.type === "ObjectPattern") && context.report({
						node,
						messageId: "unexpectedUnderscore",
						data: { identifier }
					});
				});
			}
			/**
			* Check if member expression has a dangling underscore
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function checkForDanglingUnderscoreInMemberExpression(node) {
				let identifier = node.property.name, isMemberOfThis = node.object.type === "ThisExpression", isMemberOfSuper = node.object.type === "Super", isMemberOfThisConstructor = isThisConstructorReference(node);
				identifier !== void 0 && hasDanglingUnderscore(identifier) && !(isMemberOfThis && allowAfterThis) && !(isMemberOfSuper && allowAfterSuper) && !(isMemberOfThisConstructor && allowAfterThisConstructor) && !isSpecialCaseIdentifierForMemberExpression(identifier) && !isAllowed(identifier) && context.report({
					node,
					messageId: "unexpectedUnderscore",
					data: { identifier }
				});
			}
			/**
			* Check if method declaration or method property has a dangling underscore
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function checkForDanglingUnderscoreInMethod(node) {
				let identifier = node.key.name, isMethod = node.type === "MethodDefinition" || node.type === "Property" && node.method;
				identifier !== void 0 && enforceInMethodNames && isMethod && hasDanglingUnderscore(identifier) && !isAllowed(identifier) && context.report({
					node,
					messageId: "unexpectedUnderscore",
					data: { identifier: node.key.type === "PrivateIdentifier" ? `#${identifier}` : identifier }
				});
			}
			/**
			* Check if a class field has a dangling underscore
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function checkForDanglingUnderscoreInClassField(node) {
				let identifier = node.key.name;
				identifier !== void 0 && hasDanglingUnderscore(identifier) && enforceInClassFields && !isAllowed(identifier) && context.report({
					node,
					messageId: "unexpectedUnderscore",
					data: { identifier: node.key.type === "PrivateIdentifier" ? `#${identifier}` : identifier }
				});
			}
			return {
				FunctionDeclaration: checkForDanglingUnderscoreInFunction,
				VariableDeclarator: checkForDanglingUnderscoreInVariableExpression,
				MemberExpression: checkForDanglingUnderscoreInMemberExpression,
				MethodDefinition: checkForDanglingUnderscoreInMethod,
				PropertyDefinition: checkForDanglingUnderscoreInClassField,
				Property: checkForDanglingUnderscoreInMethod,
				FunctionExpression: checkForDanglingUnderscoreInFunction,
				ArrowFunctionExpression: checkForDanglingUnderscoreInFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-underscore-dangle.cjs
module.exports = require_no_underscore_dangle().create;
//#endregion
