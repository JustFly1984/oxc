//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/func-style.js
/**
* @fileoverview Rule to enforce a particular function style
* @author Nicholas C. Zakas
*/
var require_func_style = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			dialects: ["javascript", "typescript"],
			language: "javascript",
			type: "suggestion",
			defaultOptions: ["expression", {
				allowArrowFunctions: !1,
				allowTypeAnnotation: !1,
				overrides: {}
			}],
			docs: {
				description: "Enforce the consistent use of either `function` declarations or expressions assigned to variables",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/func-style"
			},
			schema: [{ enum: ["declaration", "expression"] }, {
				type: "object",
				properties: {
					allowArrowFunctions: { type: "boolean" },
					allowTypeAnnotation: { type: "boolean" },
					overrides: {
						type: "object",
						properties: { namedExports: { enum: [
							"declaration",
							"expression",
							"ignore"
						] } },
						additionalProperties: !1
					}
				},
				additionalProperties: !1
			}],
			messages: {
				expression: "Expected a function expression.",
				declaration: "Expected a function declaration."
			}
		},
		create(context) {
			let [style, { allowArrowFunctions, allowTypeAnnotation, overrides }] = context.options, enforceDeclarations = style === "declaration", { namedExports: exportFunctionStyle } = overrides, stack = [];
			/**
			* Checks if a function declaration is part of an overloaded function
			* @param {ASTNode} node The function declaration node to check
			* @returns {boolean} True if the function is overloaded
			*/
			function isOverloadedFunction(node) {
				let functionName = node.id.name;
				return node.parent.type === "ExportNamedDeclaration" ? node.parent.parent.body.some((member) => member.type === "ExportNamedDeclaration" && member.declaration?.type === "TSDeclareFunction" && member.declaration.id.name === functionName) : node.parent.type === "SwitchCase" ? node.parent.parent.cases.some((switchCase) => switchCase.consequent.some((member) => member.type === "TSDeclareFunction" && member.id.name === functionName)) : Array.isArray(node.parent.body) && node.parent.body.some((member) => member.type === "TSDeclareFunction" && member.id.name === functionName);
			}
			let nodesToCheck = {
				FunctionDeclaration(node) {
					stack.push(!1), !enforceDeclarations && node.parent.type !== "ExportDefaultDeclaration" && (exportFunctionStyle === void 0 || node.parent.type !== "ExportNamedDeclaration") && !isOverloadedFunction(node) && context.report({
						node,
						messageId: "expression"
					}), node.parent.type === "ExportNamedDeclaration" && exportFunctionStyle === "expression" && !isOverloadedFunction(node) && context.report({
						node,
						messageId: "expression"
					});
				},
				"FunctionDeclaration:exit"() {
					stack.pop();
				},
				FunctionExpression(node) {
					stack.push(!1), enforceDeclarations && node.parent.type === "VariableDeclarator" && (exportFunctionStyle === void 0 || node.parent.parent.parent.type !== "ExportNamedDeclaration") && !(allowTypeAnnotation && node.parent.id.typeAnnotation) && context.report({
						node: node.parent,
						messageId: "declaration"
					}), node.parent.type === "VariableDeclarator" && node.parent.parent.parent.type === "ExportNamedDeclaration" && exportFunctionStyle === "declaration" && !(allowTypeAnnotation && node.parent.id.typeAnnotation) && context.report({
						node: node.parent,
						messageId: "declaration"
					});
				},
				"FunctionExpression:exit"() {
					stack.pop();
				},
				"ThisExpression, Super"() {
					stack.length > 0 && (stack[stack.length - 1] = !0);
				}
			};
			return allowArrowFunctions || (nodesToCheck.ArrowFunctionExpression = function() {
				stack.push(!1);
			}, nodesToCheck["ArrowFunctionExpression:exit"] = function(node) {
				!stack.pop() && node.parent.type === "VariableDeclarator" && (enforceDeclarations && (exportFunctionStyle === void 0 || node.parent.parent.parent.type !== "ExportNamedDeclaration") && !(allowTypeAnnotation && node.parent.id.typeAnnotation) && context.report({
					node: node.parent,
					messageId: "declaration"
				}), node.parent.parent.parent.type === "ExportNamedDeclaration" && exportFunctionStyle === "declaration" && !(allowTypeAnnotation && node.parent.id.typeAnnotation) && context.report({
					node: node.parent,
					messageId: "declaration"
				}));
			}), nodesToCheck;
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/func-style.cjs
module.exports = require_func_style().create;
//#endregion
