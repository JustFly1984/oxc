//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-process-env.js
/**
* @fileoverview Disallow the use of process.env()
* @author Vignesh Anand
* @deprecated in ESLint v7.0.0
*/
var require_no_process_env = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
						name: "no-process-env",
						url: "https://github.com/eslint-community/eslint-plugin-n/tree/master/docs/rules/no-process-env.md"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Disallow the use of `process.env`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-process-env"
			},
			schema: [],
			messages: { unexpectedProcessEnv: "Unexpected use of process.env." }
		},
		create(context) {
			return { MemberExpression(node) {
				let objectName = node.object.name, propertyName = node.property.name;
				objectName === "process" && !node.computed && propertyName && propertyName === "env" && context.report({
					node,
					messageId: "unexpectedProcessEnv"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-process-env.cjs
module.exports = require_no_process_env().create;
//#endregion
