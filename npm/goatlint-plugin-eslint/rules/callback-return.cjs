//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/callback-return.js
/**
* @fileoverview Enforce return after a callback.
* @author Jamund Ferguson
* @deprecated in ESLint v7.0.0
*/
var require_callback_return = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
						name: "callback-return",
						url: "https://github.com/eslint-community/eslint-plugin-n/tree/master/docs/rules/callback-return.md"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Require `return` statements after callbacks",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/callback-return"
			},
			schema: [{
				type: "array",
				items: { type: "string" }
			}],
			messages: { missingReturn: "Expected return with your callback function." }
		},
		create(context) {
			let callbacks = context.options[0] || [
				"callback",
				"cb",
				"next"
			], sourceCode = context.sourceCode;
			/**
			* Find the closest parent matching a list of types.
			* @param {ASTNode} node The node whose parents we are searching
			* @param {Array} types The node types to match
			* @returns {ASTNode} The matched node or undefined.
			*/
			function findClosestParentOfType(node, types) {
				return node.parent ? types.includes(node.parent.type) ? node.parent : findClosestParentOfType(node.parent, types) : null;
			}
			/**
			* Check to see if a node contains only identifiers
			* @param {ASTNode} node The node to check
			* @returns {boolean} Whether or not the node contains only identifiers
			*/
			function containsOnlyIdentifiers(node) {
				if (node.type === "Identifier") return !0;
				if (node.type === "MemberExpression") {
					if (node.object.type === "Identifier") return !0;
					if (node.object.type === "MemberExpression") return containsOnlyIdentifiers(node.object);
				}
				return !1;
			}
			/**
			* Check to see if a CallExpression is in our callback list.
			* @param {ASTNode} node The node to check against our callback names list.
			* @returns {boolean} Whether or not this function matches our callback name.
			*/
			function isCallback(node) {
				return containsOnlyIdentifiers(node.callee) && callbacks.includes(sourceCode.getText(node.callee));
			}
			/**
			* Determines whether or not the callback is part of a callback expression.
			* @param {ASTNode} node The callback node
			* @param {ASTNode} parentNode The expression node
			* @returns {boolean} Whether or not this is part of a callback expression
			*/
			function isCallbackExpression(node, parentNode) {
				return !parentNode || parentNode.type !== "ExpressionStatement" ? !1 : parentNode.expression === node || (parentNode.expression.type === "BinaryExpression" || parentNode.expression.type === "LogicalExpression") && parentNode.expression.right === node;
			}
			return { CallExpression(node) {
				if (!isCallback(node)) return;
				let closestBlock = findClosestParentOfType(node, [
					"BlockStatement",
					"ReturnStatement",
					"ArrowFunctionExpression"
				]) || {};
				if (closestBlock.type !== "ReturnStatement" && closestBlock.type !== "ArrowFunctionExpression") {
					if (closestBlock.type === "BlockStatement") {
						let lastItem = closestBlock.body.at(-1);
						if (isCallbackExpression(node, lastItem)) {
							let parentType = closestBlock.parent.type;
							if (parentType === "FunctionExpression" || parentType === "FunctionDeclaration" || parentType === "ArrowFunctionExpression") return;
						}
						if (lastItem.type === "ReturnStatement" && isCallbackExpression(node, closestBlock.body.at(-2))) return;
					}
					findClosestParentOfType(node, [
						"FunctionDeclaration",
						"FunctionExpression",
						"ArrowFunctionExpression"
					]) && context.report({
						node,
						messageId: "missingReturn"
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/callback-return.cjs
module.exports = require_callback_return().create;
//#endregion
