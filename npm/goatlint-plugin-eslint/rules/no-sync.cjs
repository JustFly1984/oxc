//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-sync.js
/**
* @fileoverview Rule to check for properties whose identifier ends with the string Sync
* @author Matt DuVall<http://mattduvall.com/>
* @deprecated in ESLint v7.0.0
*/
var require_no_sync = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Node.js rules were moved out of ESLint core.",
				url: "https://eslint.org/docs/latest/use/migrating-to-7.0.0#deprecate-node-rules",
				deprecatedSince: "7.0.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "eslint-plugin-n now maintains deprecated Node.js-related rules.",
					plugin: {
						name: "eslint-plugin-n",
						url: "https://github.com/eslint-community/eslint-plugin-n"
					},
					rule: {
						name: "no-sync",
						url: "https://github.com/eslint-community/eslint-plugin-n/tree/master/docs/rules/no-sync.md"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Disallow synchronous methods",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-sync"
			},
			schema: [{
				type: "object",
				properties: { allowAtRootLevel: {
					type: "boolean",
					default: !1
				} },
				additionalProperties: !1
			}],
			messages: { noSync: "Unexpected sync method: '{{propertyName}}'." }
		},
		create(context) {
			return { [context.options[0] && context.options[0].allowAtRootLevel ? ":function MemberExpression[property.name=/.*Sync$/]" : "MemberExpression[property.name=/.*Sync$/]"](node) {
				context.report({
					node,
					messageId: "noSync",
					data: { propertyName: node.property.name }
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-sync.cjs
module.exports = require_no_sync().create;
//#endregion
