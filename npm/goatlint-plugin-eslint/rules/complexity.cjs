const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_string_utils$1 = require("../common/string-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/complexity.js
/**
* @fileoverview Counts the cyclomatic complexity of each function of the script. See http://en.wikipedia.org/wiki/Cyclomatic_complexity.
* Counts the number of if, conditional, for, while, try, switch/case,
* @author Patrick Brosset
*/
var require_complexity = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), { upperCaseFirst } = require_string_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [20],
			docs: {
				description: "Enforce a maximum cyclomatic complexity allowed in a program",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/complexity"
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
					},
					variant: { enum: ["classic", "modified"] }
				},
				additionalProperties: !1
			}] }],
			messages: { complex: "{{name}} has a complexity of {{complexity}}. Maximum allowed is {{max}}." }
		},
		create(context) {
			let sourceCode = context.sourceCode, option = context.options[0], threshold = 20, VARIANT = "classic";
			typeof option == "object" ? ((Object.hasOwn(option, "maximum") || Object.hasOwn(option, "max")) && (threshold = option.maximum || option.max), Object.hasOwn(option, "variant") && (VARIANT = option.variant)) : typeof option == "number" && (threshold = option);
			let IS_MODIFIED_COMPLEXITY = VARIANT === "modified", complexities = [];
			/**
			* Increase the complexity of the code path in context
			* @returns {void}
			* @private
			*/
			function increaseComplexity() {
				complexities[complexities.length - 1]++;
			}
			return {
				onCodePathStart() {
					complexities.push(1);
				},
				CatchClause: increaseComplexity,
				ConditionalExpression: increaseComplexity,
				LogicalExpression: increaseComplexity,
				ForStatement: increaseComplexity,
				ForInStatement: increaseComplexity,
				ForOfStatement: increaseComplexity,
				IfStatement: increaseComplexity,
				WhileStatement: increaseComplexity,
				DoWhileStatement: increaseComplexity,
				AssignmentPattern: increaseComplexity,
				"SwitchCase[test]": () => IS_MODIFIED_COMPLEXITY || increaseComplexity(),
				SwitchStatement: () => IS_MODIFIED_COMPLEXITY && increaseComplexity(),
				AssignmentExpression(node) {
					astUtils.isLogicalAssignmentOperator(node.operator) && increaseComplexity();
				},
				MemberExpression(node) {
					node.optional === !0 && increaseComplexity();
				},
				CallExpression(node) {
					node.optional === !0 && increaseComplexity();
				},
				onCodePathEnd(codePath, node) {
					let complexity = complexities.pop();
					if (!(codePath.origin !== "function" && codePath.origin !== "class-field-initializer" && codePath.origin !== "class-static-block") && complexity > threshold) {
						let name, loc = node.loc;
						codePath.origin === "class-field-initializer" ? name = "class field initializer" : codePath.origin === "class-static-block" ? (name = "class static block", loc = sourceCode.getFirstToken(node).loc) : (name = astUtils.getFunctionNameWithKind(node), loc = astUtils.getFunctionHeadLoc(node, sourceCode)), context.report({
							node,
							loc,
							messageId: "complex",
							data: {
								name: upperCaseFirst(name),
								complexity,
								max: threshold
							}
						});
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/complexity.cjs
module.exports = require_complexity().create;
//#endregion
