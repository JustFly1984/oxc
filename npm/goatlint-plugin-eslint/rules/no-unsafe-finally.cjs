//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unsafe-finally.js
/**
* @fileoverview Rule to flag unsafe statements in finally block
* @author Onur Temizkan
*/
var require_no_unsafe_finally = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let SENTINEL_NODE_TYPE_RETURN_THROW = /^(?:Program|(?:Function|Class)(?:Declaration|Expression)|ArrowFunctionExpression)$/u, SENTINEL_NODE_TYPE_BREAK = /^(?:Program|(?:Function|Class)(?:Declaration|Expression)|ArrowFunctionExpression|DoWhileStatement|WhileStatement|ForOfStatement|ForInStatement|ForStatement|SwitchStatement)$/u, SENTINEL_NODE_TYPE_CONTINUE = /^(?:Program|(?:Function|Class)(?:Declaration|Expression)|ArrowFunctionExpression|DoWhileStatement|WhileStatement|ForOfStatement|ForInStatement|ForStatement)$/u;
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow control flow statements in `finally` blocks",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-unsafe-finally"
			},
			schema: [],
			messages: { unsafeUsage: "Unsafe usage of {{nodeType}}." }
		},
		create(context) {
			/**
			* Checks if the node is the finalizer of a TryStatement
			* @param {ASTNode} node node to check.
			* @returns {boolean} - true if the node is the finalizer of a TryStatement
			*/
			function isFinallyBlock(node) {
				return node.parent.type === "TryStatement" && node.parent.finalizer === node;
			}
			/**
			* Climbs up the tree if the node is not a sentinel node
			* @param {ASTNode} node node to check.
			* @param {string} label label of the break or continue statement
			* @returns {boolean} - return whether the node is a finally block or a sentinel node
			*/
			function isInFinallyBlock(node, label) {
				let labelInside = !1, sentinelNodeType;
				sentinelNodeType = node.type === "BreakStatement" && !node.label ? SENTINEL_NODE_TYPE_BREAK : node.type === "ContinueStatement" ? SENTINEL_NODE_TYPE_CONTINUE : SENTINEL_NODE_TYPE_RETURN_THROW;
				for (let currentNode = node; currentNode && !sentinelNodeType.test(currentNode.type); currentNode = currentNode.parent) if (currentNode.parent.label && label && currentNode.parent.label.name === label.name && (labelInside = !0), isFinallyBlock(currentNode)) return !(label && labelInside);
				return !1;
			}
			/**
			* Checks whether the possibly-unsafe statement is inside a finally block.
			* @param {ASTNode} node node to check.
			* @returns {void}
			*/
			function check(node) {
				isInFinallyBlock(node, node.label) && context.report({
					messageId: "unsafeUsage",
					data: { nodeType: node.type },
					node,
					line: node.loc.line,
					column: node.loc.column
				});
			}
			return {
				ReturnStatement: check,
				ThrowStatement: check,
				BreakStatement: check,
				ContinueStatement: check
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unsafe-finally.cjs
module.exports = require_no_unsafe_finally().create;
//#endregion
