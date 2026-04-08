const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unused-labels.js
/**
* @fileoverview Rule to disallow unused labels.
* @author Toru Nagashima
*/
var require_no_unused_labels = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow unused labels",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-unused-labels"
			},
			schema: [],
			fixable: "code",
			messages: { unused: "'{{name}}:' is defined but never used." }
		},
		create(context) {
			let sourceCode = context.sourceCode, scopeInfo = null;
			/**
			* Adds a scope info to the stack.
			* @param {ASTNode} node A node to add. This is a LabeledStatement.
			* @returns {void}
			*/
			function enterLabeledScope(node) {
				scopeInfo = {
					label: node.label.name,
					used: !1,
					upper: scopeInfo
				};
			}
			/**
			* Checks if a `LabeledStatement` node is fixable.
			* For a node to be fixable, there must be no comments between the label and the body.
			* Furthermore, is must be possible to remove the label without turning the body statement into a
			* directive after other fixes are applied.
			* @param {ASTNode} node The node to evaluate.
			* @returns {boolean} Whether or not the node is fixable.
			*/
			function isFixable(node) {
				if (sourceCode.getTokenAfter(node.label, { includeComments: !0 }) !== sourceCode.getTokenBefore(node.body, { includeComments: !0 })) return !1;
				let ancestor = node.parent;
				for (; ancestor.type === "LabeledStatement";) ancestor = ancestor.parent;
				if (ancestor.type === "Program" || ancestor.type === "BlockStatement" && astUtils.isFunction(ancestor.parent)) {
					let { body } = node;
					if (body.type === "ExpressionStatement" && (body.expression.type === "Literal" && typeof body.expression.value == "string" || astUtils.isStaticTemplateLiteral(body.expression))) return !1;
				}
				return !0;
			}
			/**
			* Removes the top of the stack.
			* At the same time, this reports the label if it's never used.
			* @param {ASTNode} node A node to report. This is a LabeledStatement.
			* @returns {void}
			*/
			function exitLabeledScope(node) {
				scopeInfo.used || context.report({
					node: node.label,
					messageId: "unused",
					data: node.label,
					fix: isFixable(node) ? (fixer) => fixer.removeRange([node.range[0], node.body.range[0]]) : null
				}), scopeInfo = scopeInfo.upper;
			}
			/**
			* Marks the label of a given node as used.
			* @param {ASTNode} node A node to mark. This is a BreakStatement or
			*      ContinueStatement.
			* @returns {void}
			*/
			function markAsUsed(node) {
				if (!node.label) return;
				let label = node.label.name, info = scopeInfo;
				for (; info;) {
					if (info.label === label) {
						info.used = !0;
						break;
					}
					info = info.upper;
				}
			}
			return {
				LabeledStatement: enterLabeledScope,
				"LabeledStatement:exit": exitLabeledScope,
				BreakStatement: markAsUsed,
				ContinueStatement: markAsUsed
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unused-labels.cjs
module.exports = require_no_unused_labels().create;
//#endregion
