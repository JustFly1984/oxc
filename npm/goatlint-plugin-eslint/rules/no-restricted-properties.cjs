const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-restricted-properties.js
/**
* @fileoverview Rule to disallow certain object properties
* @author Will Klein & Eli White
*/
var require_no_restricted_properties = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow certain properties on certain objects",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-restricted-properties"
			},
			schema: {
				type: "array",
				items: {
					type: "object",
					properties: {
						object: { type: "string" },
						property: { type: "string" },
						allowObjects: {
							type: "array",
							items: { type: "string" },
							uniqueItems: !0
						},
						allowProperties: {
							type: "array",
							items: { type: "string" },
							uniqueItems: !0
						},
						message: { type: "string" }
					},
					anyOf: [{ required: ["object"] }, { required: ["property"] }],
					not: { anyOf: [{ required: ["allowObjects", "object"] }, { required: ["allowProperties", "property"] }] },
					additionalProperties: !1
				},
				uniqueItems: !0
			},
			messages: {
				restrictedObjectProperty: "'{{objectName}}.{{propertyName}}' is restricted from being used.{{allowedPropertiesMessage}}{{message}}",
				restrictedProperty: "'{{propertyName}}' is restricted from being used.{{allowedObjectsMessage}}{{message}}"
			}
		},
		create(context) {
			let restrictedCalls = context.options;
			if (restrictedCalls.length === 0) return {};
			let restrictedProperties = /* @__PURE__ */ new Map(), globallyRestrictedObjects = /* @__PURE__ */ new Map(), globallyRestrictedProperties = /* @__PURE__ */ new Map();
			restrictedCalls.forEach((option) => {
				let objectName = option.object, propertyName = option.property;
				objectName === void 0 ? globallyRestrictedProperties.set(propertyName, {
					allowObjects: option.allowObjects,
					message: option.message
				}) : propertyName === void 0 ? globallyRestrictedObjects.set(objectName, {
					allowProperties: option.allowProperties,
					message: option.message
				}) : (restrictedProperties.has(objectName) || restrictedProperties.set(objectName, /* @__PURE__ */ new Map()), restrictedProperties.get(objectName).set(propertyName, { message: option.message }));
			});
			/**
			* Checks if a name is in the allowed list.
			* @param {string} name The name to check
			* @param {string[]} [allowedList] The list of allowed names
			* @returns {boolean} True if the name is allowed, false otherwise
			*/
			function isAllowed(name, allowedList) {
				return allowedList ? allowedList.includes(name) : !1;
			}
			/**
			* Checks to see whether a property access is restricted, and reports it if so.
			* @param {ASTNode} node The node to report
			* @param {string} objectName The name of the object
			* @param {string} propertyName The name of the property
			* @returns {undefined}
			*/
			function checkPropertyAccess(node, objectName, propertyName) {
				if (propertyName === null) return;
				let matchedObject = restrictedProperties.get(objectName), matchedObjectProperty = matchedObject ? matchedObject.get(propertyName) : globallyRestrictedObjects.get(objectName), globalMatchedProperty = globallyRestrictedProperties.get(propertyName);
				if (matchedObjectProperty && !isAllowed(propertyName, matchedObjectProperty.allowProperties)) {
					let message = matchedObjectProperty.message ? ` ${matchedObjectProperty.message}` : "", allowedPropertiesMessage = matchedObjectProperty.allowProperties ? ` Only these properties are allowed: ${matchedObjectProperty.allowProperties.join(", ")}.` : "";
					context.report({
						node,
						messageId: "restrictedObjectProperty",
						data: {
							objectName,
							propertyName,
							message,
							allowedPropertiesMessage
						}
					});
				} else if (globalMatchedProperty && !isAllowed(objectName, globalMatchedProperty.allowObjects)) {
					let message = globalMatchedProperty.message ? ` ${globalMatchedProperty.message}` : "", allowedObjectsMessage = globalMatchedProperty.allowObjects ? ` Property '${propertyName}' is only allowed on these objects: ${globalMatchedProperty.allowObjects.join(", ")}.` : "";
					context.report({
						node,
						messageId: "restrictedProperty",
						data: {
							propertyName,
							message,
							allowedObjectsMessage
						}
					});
				}
			}
			return {
				MemberExpression(node) {
					checkPropertyAccess(node, node.object && node.object.name, astUtils.getStaticPropertyName(node));
				},
				ObjectPattern(node) {
					let objectName = null;
					node.parent.type === "VariableDeclarator" ? node.parent.init && node.parent.init.type === "Identifier" && (objectName = node.parent.init.name) : (node.parent.type === "AssignmentExpression" || node.parent.type === "AssignmentPattern") && node.parent.right.type === "Identifier" && (objectName = node.parent.right.name), node.properties.forEach((property) => {
						checkPropertyAccess(node, objectName, astUtils.getStaticPropertyName(property));
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-restricted-properties.cjs
module.exports = require_no_restricted_properties().create;
//#endregion
