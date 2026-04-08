const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-extra-label.js
/**
* @fileoverview Rule to disallow unnecessary labels
* @author Toru Nagashima
*/
var require_no_extra_label = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow unnecessary labels",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-extra-label"
			},
			schema: [],
			fixable: "code",
			messages: { unexpected: "This label '{{name}}' is unnecessary." }
		},
		create(context) {
			let sourceCode = context.sourceCode, scopeInfo = null;
			/**
			* Creates a new scope with a breakable statement.
			* @param {ASTNode} node A node to create. This is a BreakableStatement.
			* @returns {void}
			*/
			function enterBreakableStatement(node) {
				scopeInfo = {
					label: node.parent.type === "LabeledStatement" ? node.parent.label : null,
					breakable: !0,
					upper: scopeInfo
				};
			}
			/**
			* Removes the top scope of the stack.
			* @returns {void}
			*/
			function exitBreakableStatement() {
				scopeInfo = scopeInfo.upper;
			}
			/**
			* Creates a new scope with a labeled statement.
			*
			* This ignores it if the body is a breakable statement.
			* In this case it's handled in the `enterBreakableStatement` function.
			* @param {ASTNode} node A node to create. This is a LabeledStatement.
			* @returns {void}
			*/
			function enterLabeledStatement(node) {
				astUtils.isBreakableStatement(node.body) || (scopeInfo = {
					label: node.label,
					breakable: !1,
					upper: scopeInfo
				});
			}
			/**
			* Removes the top scope of the stack.
			*
			* This ignores it if the body is a breakable statement.
			* In this case it's handled in the `exitBreakableStatement` function.
			* @param {ASTNode} node A node. This is a LabeledStatement.
			* @returns {void}
			*/
			function exitLabeledStatement(node) {
				astUtils.isBreakableStatement(node.body) || (scopeInfo = scopeInfo.upper);
			}
			/**
			* Reports a given control node if it's unnecessary.
			* @param {ASTNode} node A node. This is a BreakStatement or a
			*      ContinueStatement.
			* @returns {void}
			*/
			function reportIfUnnecessary(node) {
				if (!node.label) return;
				let labelNode = node.label;
				for (let info = scopeInfo; info !== null; info = info.upper) if (info.breakable || info.label && info.label.name === labelNode.name) {
					info.breakable && info.label && info.label.name === labelNode.name && context.report({
						node: labelNode,
						messageId: "unexpected",
						data: labelNode,
						fix(fixer) {
							let breakOrContinueToken = sourceCode.getFirstToken(node);
							return sourceCode.commentsExistBetween(breakOrContinueToken, labelNode) ? null : fixer.removeRange([breakOrContinueToken.range[1], labelNode.range[1]]);
						}
					});
					return;
				}
			}
			return {
				WhileStatement: enterBreakableStatement,
				"WhileStatement:exit": exitBreakableStatement,
				DoWhileStatement: enterBreakableStatement,
				"DoWhileStatement:exit": exitBreakableStatement,
				ForStatement: enterBreakableStatement,
				"ForStatement:exit": exitBreakableStatement,
				ForInStatement: enterBreakableStatement,
				"ForInStatement:exit": exitBreakableStatement,
				ForOfStatement: enterBreakableStatement,
				"ForOfStatement:exit": exitBreakableStatement,
				SwitchStatement: enterBreakableStatement,
				"SwitchStatement:exit": exitBreakableStatement,
				LabeledStatement: enterLabeledStatement,
				"LabeledStatement:exit": exitLabeledStatement,
				BreakStatement: reportIfUnnecessary,
				ContinueStatement: reportIfUnnecessary
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-extra-label.cjs
module.exports = require_no_extra_label().create;
//#endregion
