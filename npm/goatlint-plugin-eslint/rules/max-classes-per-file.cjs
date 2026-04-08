//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/max-classes-per-file.js
/**
* @fileoverview Enforce a maximum number of classes per file
* @author James Garbutt <https://github.com/43081j>
*/
var require_max_classes_per_file = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce a maximum number of classes per file",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/max-classes-per-file"
			},
			schema: [{ oneOf: [{
				type: "integer",
				minimum: 1
			}, {
				type: "object",
				properties: {
					ignoreExpressions: { type: "boolean" },
					max: {
						type: "integer",
						minimum: 1
					}
				},
				additionalProperties: !1
			}] }],
			messages: { maximumExceeded: "File has too many classes ({{ classCount }}). Maximum allowed is {{ max }}." }
		},
		create(context) {
			let [option = {}] = context.options, [ignoreExpressions, max] = typeof option == "number" ? [!1, option || 1] : [option.ignoreExpressions, option.max || 1], classCount = 0;
			return {
				Program() {
					classCount = 0;
				},
				"Program:exit"(node) {
					classCount > max && context.report({
						node,
						messageId: "maximumExceeded",
						data: {
							classCount,
							max
						}
					});
				},
				ClassDeclaration() {
					classCount++;
				},
				ClassExpression() {
					ignoreExpressions || classCount++;
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/max-classes-per-file.cjs
module.exports = require_max_classes_per_file().create;
//#endregion
