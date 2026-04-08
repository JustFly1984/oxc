//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-reflect.js
/**
* @fileoverview Rule to suggest using "Reflect" api over Function/Object methods
* @author Keith Cirkel <http://keithcirkel.co.uk>
* @deprecated in ESLint v3.9.0
*/
var require_prefer_reflect = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require `Reflect` methods where applicable",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/prefer-reflect"
			},
			deprecated: {
				message: "The original intention of this rule was misguided.",
				deprecatedSince: "3.9.0",
				availableUntil: null,
				replacedBy: []
			},
			schema: [{
				type: "object",
				properties: { exceptions: {
					type: "array",
					items: { enum: [
						"apply",
						"call",
						"delete",
						"defineProperty",
						"getOwnPropertyDescriptor",
						"getPrototypeOf",
						"setPrototypeOf",
						"isExtensible",
						"getOwnPropertyNames",
						"preventExtensions"
					] },
					uniqueItems: !0
				} },
				additionalProperties: !1
			}],
			messages: { preferReflect: "Avoid using {{existing}}, instead use {{substitute}}." }
		},
		create(context) {
			let existingNames = {
				apply: "Function.prototype.apply",
				call: "Function.prototype.call",
				defineProperty: "Object.defineProperty",
				getOwnPropertyDescriptor: "Object.getOwnPropertyDescriptor",
				getPrototypeOf: "Object.getPrototypeOf",
				setPrototypeOf: "Object.setPrototypeOf",
				isExtensible: "Object.isExtensible",
				getOwnPropertyNames: "Object.getOwnPropertyNames",
				preventExtensions: "Object.preventExtensions"
			}, reflectSubstitutes = {
				apply: "Reflect.apply",
				call: "Reflect.apply",
				defineProperty: "Reflect.defineProperty",
				getOwnPropertyDescriptor: "Reflect.getOwnPropertyDescriptor",
				getPrototypeOf: "Reflect.getPrototypeOf",
				setPrototypeOf: "Reflect.setPrototypeOf",
				isExtensible: "Reflect.isExtensible",
				getOwnPropertyNames: "Reflect.getOwnPropertyNames",
				preventExtensions: "Reflect.preventExtensions"
			}, exceptions = (context.options[0] || {}).exceptions || [];
			/**
			* Reports the Reflect violation based on the `existing` and `substitute`
			* @param {Object} node The node that violates the rule.
			* @param {string} existing The existing method name that has been used.
			* @param {string} substitute The Reflect substitute that should be used.
			* @returns {void}
			*/
			function report(node, existing, substitute) {
				context.report({
					node,
					messageId: "preferReflect",
					data: {
						existing,
						substitute
					}
				});
			}
			return {
				CallExpression(node) {
					let methodName = (node.callee.property || {}).name, isReflectCall = (node.callee.object || {}).name === "Reflect", hasReflectSubstitute = Object.hasOwn(reflectSubstitutes, methodName), userConfiguredException = exceptions.includes(methodName);
					hasReflectSubstitute && !isReflectCall && !userConfiguredException && report(node, existingNames[methodName], reflectSubstitutes[methodName]);
				},
				UnaryExpression(node) {
					let isDeleteOperator = node.operator === "delete", targetsIdentifier = node.argument.type === "Identifier", userConfiguredException = exceptions.includes("delete");
					isDeleteOperator && !targetsIdentifier && !userConfiguredException && report(node, "the delete keyword", "Reflect.deleteProperty");
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-reflect.cjs
module.exports = require_prefer_reflect().create;
//#endregion
