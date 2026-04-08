//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/max-depth.js
/**
* @fileoverview A rule to set the maximum depth block can be nested in a function.
* @author Ian Christian Myers
*/
var require_max_depth = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce a maximum depth that blocks can be nested",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/max-depth"
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
			messages: { tooDeeply: "Blocks are nested too deeply ({{depth}}). Maximum allowed is {{maxDepth}}." }
		},
		create(context) {
			let functionStack = [], option = context.options[0], maxDepth = 4;
			typeof option == "object" && (Object.hasOwn(option, "maximum") || Object.hasOwn(option, "max")) && (maxDepth = option.maximum || option.max), typeof option == "number" && (maxDepth = option);
			/**
			* When parsing a new function, store it in our function stack
			* @returns {void}
			* @private
			*/
			function startFunction() {
				functionStack.push(0);
			}
			/**
			* When parsing is done then pop out the reference
			* @returns {void}
			* @private
			*/
			function endFunction() {
				functionStack.pop();
			}
			/**
			* Save the block and Evaluate the node
			* @param {ASTNode} node node to evaluate
			* @returns {void}
			* @private
			*/
			function pushBlock(node) {
				let len = ++functionStack[functionStack.length - 1];
				len > maxDepth && context.report({
					node,
					messageId: "tooDeeply",
					data: {
						depth: len,
						maxDepth
					}
				});
			}
			/**
			* Pop the saved block
			* @returns {void}
			* @private
			*/
			function popBlock() {
				functionStack[functionStack.length - 1]--;
			}
			return {
				Program: startFunction,
				FunctionDeclaration: startFunction,
				FunctionExpression: startFunction,
				ArrowFunctionExpression: startFunction,
				StaticBlock: startFunction,
				IfStatement(node) {
					node.parent.type !== "IfStatement" && pushBlock(node);
				},
				SwitchStatement: pushBlock,
				TryStatement: pushBlock,
				DoWhileStatement: pushBlock,
				WhileStatement: pushBlock,
				WithStatement: pushBlock,
				ForStatement: pushBlock,
				ForInStatement: pushBlock,
				ForOfStatement: pushBlock,
				"IfStatement:exit": popBlock,
				"SwitchStatement:exit": popBlock,
				"TryStatement:exit": popBlock,
				"DoWhileStatement:exit": popBlock,
				"WhileStatement:exit": popBlock,
				"WithStatement:exit": popBlock,
				"ForStatement:exit": popBlock,
				"ForInStatement:exit": popBlock,
				"ForOfStatement:exit": popBlock,
				"FunctionDeclaration:exit": endFunction,
				"FunctionExpression:exit": endFunction,
				"ArrowFunctionExpression:exit": endFunction,
				"StaticBlock:exit": endFunction,
				"Program:exit": endFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/max-depth.cjs
module.exports = require_max_depth().create;
//#endregion
