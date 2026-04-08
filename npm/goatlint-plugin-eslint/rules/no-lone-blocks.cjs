//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-lone-blocks.js
/**
* @fileoverview Rule to flag blocks with no reason to exist
* @author Brandon Mills
*/
var require_no_lone_blocks = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow unnecessary nested blocks",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-lone-blocks"
			},
			schema: [],
			messages: {
				redundantBlock: "Block is redundant.",
				redundantNestedBlock: "Nested block is redundant."
			}
		},
		create(context) {
			let loneBlocks = [], ruleDef, sourceCode = context.sourceCode;
			/**
			* Reports a node as invalid.
			* @param {ASTNode} node The node to be reported.
			* @returns {void}
			*/
			function report(node) {
				let messageId = node.parent.type === "BlockStatement" || node.parent.type === "StaticBlock" ? "redundantNestedBlock" : "redundantBlock";
				context.report({
					node,
					messageId
				});
			}
			/**
			* Checks for any occurrence of a BlockStatement in a place where lists of statements can appear
			* @param {ASTNode} node The node to check
			* @returns {boolean} True if the node is a lone block.
			*/
			function isLoneBlock(node) {
				return node.parent.type === "BlockStatement" || node.parent.type === "StaticBlock" || node.parent.type === "Program" || node.parent.type === "SwitchCase" && !(node.parent.consequent[0] === node && node.parent.consequent.length === 1);
			}
			/**
			* Checks the enclosing block of the current node for block-level bindings,
			* and "marks it" as valid if any.
			* @param {ASTNode} node The current node to check.
			* @returns {void}
			*/
			function markLoneBlock(node) {
				if (loneBlocks.length === 0) return;
				let block = node.parent;
				loneBlocks.at(-1) === block && loneBlocks.pop();
			}
			return ruleDef = { BlockStatement(node) {
				isLoneBlock(node) && report(node);
			} }, context.languageOptions.ecmaVersion >= 2015 && (ruleDef = {
				BlockStatement(node) {
					isLoneBlock(node) && loneBlocks.push(node);
				},
				"BlockStatement:exit"(node) {
					loneBlocks.length > 0 && loneBlocks.at(-1) === node ? (loneBlocks.pop(), report(node)) : (node.parent.type === "BlockStatement" || node.parent.type === "StaticBlock") && node.parent.body.length === 1 && report(node);
				}
			}, ruleDef.VariableDeclaration = function(node) {
				node.kind !== "var" && markLoneBlock(node);
			}, ruleDef.FunctionDeclaration = function(node) {
				sourceCode.getScope(node).isStrict && markLoneBlock(node);
			}, ruleDef.ClassDeclaration = markLoneBlock), ruleDef;
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-lone-blocks.cjs
module.exports = require_no_lone_blocks().create;
//#endregion
