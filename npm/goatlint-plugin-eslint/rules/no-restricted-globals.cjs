const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-restricted-globals.js
/**
* @fileoverview Restrict usage of specified globals.
* @author Benoît Zugmeyer
*/
var require_no_restricted_globals = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), TYPE_NODES = new Set([
		"TSTypeReference",
		"TSInterfaceHeritage",
		"TSClassImplements",
		"TSTypeQuery",
		"TSQualifiedName"
	]), GLOBAL_OBJECTS = new Set([
		"globalThis",
		"self",
		"window"
	]), arrayOfGlobals = {
		type: "array",
		items: { oneOf: [{ type: "string" }, {
			type: "object",
			properties: {
				name: { type: "string" },
				message: { type: "string" }
			},
			required: ["name"],
			additionalProperties: !1
		}] },
		uniqueItems: !0,
		minItems: 0
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			dialects: ["javascript", "typescript"],
			language: "javascript",
			type: "suggestion",
			docs: {
				description: "Disallow specified global variables",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-restricted-globals"
			},
			schema: { anyOf: [arrayOfGlobals, {
				type: "array",
				items: [{
					type: "object",
					properties: {
						globals: arrayOfGlobals,
						checkGlobalObject: { type: "boolean" },
						globalObjects: {
							type: "array",
							items: { type: "string" },
							uniqueItems: !0
						}
					},
					required: ["globals"],
					additionalProperties: !1
				}],
				additionalItems: !1
			}] },
			messages: {
				defaultMessage: "Unexpected use of '{{name}}'.",
				customMessage: "Unexpected use of '{{name}}'. {{customMessage}}"
			}
		},
		create(context) {
			let { sourceCode, options } = context, isGlobalsObject = typeof options[0] == "object" && Object.hasOwn(options[0], "globals"), restrictedGlobals = isGlobalsObject ? options[0].globals : options, checkGlobalObject = isGlobalsObject ? options[0].checkGlobalObject : !1, userGlobalObjects = isGlobalsObject && options[0].globalObjects || [], globalObjects = new Set([...GLOBAL_OBJECTS, ...userGlobalObjects]);
			if (restrictedGlobals.length === 0) return {};
			let restrictedGlobalMessages = restrictedGlobals.reduce((memo, option) => (typeof option == "string" ? memo[option] = null : memo[option.name] = option.message, memo), {});
			/**
			* Report a variable to be used as a restricted global.
			* @param {Reference} reference the variable reference
			* @returns {void}
			* @private
			*/
			function reportReference(reference) {
				let name = reference.identifier.name, customMessage = restrictedGlobalMessages[name], messageId = customMessage ? "customMessage" : "defaultMessage";
				context.report({
					node: reference.identifier,
					messageId,
					data: {
						name,
						customMessage
					}
				});
			}
			/**
			* Check if the given name is a restricted global name.
			* @param {string} name name of a variable
			* @returns {boolean} whether the variable is a restricted global or not
			* @private
			*/
			function isRestricted(name) {
				return Object.hasOwn(restrictedGlobalMessages, name);
			}
			/**
			* Check if the given reference occurs within a TypeScript type context.
			* @param {Reference} reference The variable reference to check.
			* @returns {boolean} Whether the reference is in a type context.
			* @private
			*/
			function isInTypeContext(reference) {
				let parent = reference.identifier.parent;
				return TYPE_NODES.has(parent.type);
			}
			return {
				Program(node) {
					let scope = sourceCode.getScope(node);
					scope.variables.forEach((variable) => {
						!variable.defs.length && isRestricted(variable.name) && variable.references.forEach((reference) => {
							isInTypeContext(reference) || reportReference(reference);
						});
					}), scope.through.forEach((reference) => {
						isRestricted(reference.identifier.name) && !isInTypeContext(reference) && reportReference(reference);
					});
				},
				"Program:exit"(node) {
					if (!checkGlobalObject) return;
					let globalScope = sourceCode.getScope(node);
					globalObjects.forEach((globalObjectName) => {
						let variable = astUtils.getVariableByName(globalScope, globalObjectName);
						variable && variable.references.forEach((reference) => {
							let parent = reference.identifier.parent;
							for (; astUtils.isSpecificMemberAccess(parent, null, globalObjectName);) parent = parent.parent;
							let propertyName = astUtils.getStaticPropertyName(parent);
							if (propertyName && isRestricted(propertyName)) {
								let customMessage = restrictedGlobalMessages[propertyName], messageId = customMessage ? "customMessage" : "defaultMessage";
								context.report({
									node: parent.property,
									messageId,
									data: {
										name: propertyName,
										customMessage
									}
								});
							}
						});
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-restricted-globals.cjs
module.exports = require_no_restricted_globals().create;
//#endregion
