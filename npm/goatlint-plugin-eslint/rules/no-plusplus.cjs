//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-plusplus.js
/**
* @fileoverview Rule to flag use of unary increment and decrement operators.
* @author Ian Christian Myers
* @author Brody McKee (github.com/mrmckeb)
*/
var require_no_plusplus = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/**
	* Determines whether the given node is the update node of a `ForStatement`.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is `ForStatement` update.
	*/
	function isForStatementUpdate(node) {
		let parent = node.parent;
		return parent.type === "ForStatement" && parent.update === node;
	}
	/**
	* Determines whether the given node is considered to be a for loop "afterthought" by the logic of this rule.
	* In particular, it returns `true` if the given node is either:
	*   - The update node of a `ForStatement`: for (;; i++) {}
	*   - An operand of a sequence expression that is the update node: for (;; foo(), i++) {}
	*   - An operand of a sequence expression that is child of another sequence expression, etc.,
	*     up to the sequence expression that is the update node: for (;; foo(), (bar(), (baz(), i++))) {}
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is a for loop afterthought.
	*/
	function isForLoopAfterthought(node) {
		let parent = node.parent;
		return parent.type === "SequenceExpression" ? isForLoopAfterthought(parent) : isForStatementUpdate(node);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ allowForLoopAfterthoughts: !1 }],
			docs: {
				description: "Disallow the unary operators `++` and `--`",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-plusplus"
			},
			schema: [{
				type: "object",
				properties: { allowForLoopAfterthoughts: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { unexpectedUnaryOp: "Unary operator '{{operator}}' used." }
		},
		create(context) {
			let [{ allowForLoopAfterthoughts }] = context.options;
			return { UpdateExpression(node) {
				allowForLoopAfterthoughts && isForLoopAfterthought(node) || context.report({
					node,
					messageId: "unexpectedUnaryOp",
					data: { operator: node.operator }
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-plusplus.cjs
module.exports = require_no_plusplus().create;
//#endregion
