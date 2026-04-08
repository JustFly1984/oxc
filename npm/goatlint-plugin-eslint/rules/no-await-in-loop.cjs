//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-await-in-loop.js
/**
* @fileoverview Rule to disallow uses of await inside of loops.
* @author Nat Mote (nmote)
*/
var require_no_await_in_loop = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/**
	* Check whether it should stop traversing ancestors at the given node.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if it should stop traversing.
	*/
	function isBoundary(node) {
		let t = node.type;
		return t === "FunctionDeclaration" || t === "FunctionExpression" || t === "ArrowFunctionExpression" || t === "ForOfStatement" && node.await === !0;
	}
	/**
	* Check whether the given node is in loop.
	* @param {ASTNode} node A node to check.
	* @param {ASTNode} parent A parent node to check.
	* @returns {boolean} `true` if the node is in loop.
	*/
	function isLooped(node, parent) {
		switch (parent.type) {
			case "ForStatement": return node === parent.test || node === parent.update || node === parent.body;
			case "ForOfStatement":
			case "ForInStatement": return node === parent.body || node === parent.left && node.kind === "await using";
			case "WhileStatement":
			case "DoWhileStatement": return node === parent.test || node === parent.body;
			default: return !1;
		}
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow `await` inside of loops",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-await-in-loop"
			},
			schema: [],
			messages: { unexpectedAwait: "Unexpected `await` inside a loop." }
		},
		create(context) {
			/**
			* Validate an await expression.
			* @param {ASTNode} awaitNode An AwaitExpression or ForOfStatement node to validate.
			* @returns {void}
			*/
			function validate(awaitNode) {
				if (awaitNode.type === "VariableDeclaration" && awaitNode.kind !== "await using" || awaitNode.type === "ForOfStatement" && !awaitNode.await) return;
				let node = awaitNode, parent = node.parent;
				for (; parent && !isBoundary(parent);) {
					if (isLooped(node, parent)) {
						context.report({
							node: awaitNode,
							messageId: "unexpectedAwait"
						});
						return;
					}
					node = parent, parent = parent.parent;
				}
			}
			return {
				AwaitExpression: validate,
				ForOfStatement: validate,
				VariableDeclaration: validate
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-await-in-loop.cjs
module.exports = require_no_await_in_loop().create;
//#endregion
