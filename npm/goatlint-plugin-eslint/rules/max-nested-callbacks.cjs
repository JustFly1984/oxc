//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/max-nested-callbacks.js
/**
* @fileoverview Rule to enforce a maximum number of nested callbacks.
* @author Ian Christian Myers
*/
var require_max_nested_callbacks = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce a maximum depth that callbacks can be nested",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/max-nested-callbacks"
			},
			schema: [{ oneOf: [{
				type: "integer",
				minimum: 0
			}, {
				type: "object",
				properties: {
					maximum: {
						type: "integer",
						minimum: 0
					},
					max: {
						type: "integer",
						minimum: 0
					}
				},
				additionalProperties: !1
			}] }],
			messages: { exceed: "Too many nested callbacks ({{num}}). Maximum allowed is {{max}}." }
		},
		create(context) {
			let option = context.options[0], THRESHOLD = 10;
			typeof option == "object" && (Object.hasOwn(option, "maximum") || Object.hasOwn(option, "max")) ? THRESHOLD = option.maximum || option.max : typeof option == "number" && (THRESHOLD = option);
			let callbackStack = [];
			/**
			* Checks a given function node for too many callbacks.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			* @private
			*/
			function checkFunction(node) {
				if (node.parent.type === "CallExpression" && callbackStack.push(node), callbackStack.length > THRESHOLD) {
					let opts = {
						num: callbackStack.length,
						max: THRESHOLD
					};
					context.report({
						node,
						messageId: "exceed",
						data: opts
					});
				}
			}
			/**
			* Pops the call stack.
			* @returns {void}
			* @private
			*/
			function popStack() {
				callbackStack.pop();
			}
			return {
				ArrowFunctionExpression: checkFunction,
				"ArrowFunctionExpression:exit": popStack,
				FunctionExpression: checkFunction,
				"FunctionExpression:exit": popStack
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/max-nested-callbacks.cjs
module.exports = require_max_nested_callbacks().create;
//#endregion
