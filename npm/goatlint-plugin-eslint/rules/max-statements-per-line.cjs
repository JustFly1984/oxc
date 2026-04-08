const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/max-statements-per-line.js
/**
* @fileoverview Specify the maximum number of statements allowed per line.
* @author Kenneth Williams
* @deprecated in ESLint v8.53.0
*/
var require_max_statements_per_line = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Formatting rules are being moved out of ESLint core.",
				url: "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
				deprecatedSince: "8.53.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "ESLint Stylistic now maintains deprecated stylistic core rules.",
					url: "https://eslint.style/guide/migration",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "max-statements-per-line",
						url: "https://eslint.style/rules/max-statements-per-line"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce a maximum number of statements allowed per line",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/max-statements-per-line"
			},
			schema: [{
				type: "object",
				properties: { max: {
					type: "integer",
					minimum: 1,
					default: 1
				} },
				additionalProperties: !1
			}],
			messages: { exceed: "This line has {{numberOfStatementsOnThisLine}} {{statements}}. Maximum allowed is {{maxStatementsPerLine}}." }
		},
		create(context) {
			let sourceCode = context.sourceCode, options = context.options[0] || {}, maxStatementsPerLine = options.max === void 0 ? 1 : options.max, lastStatementLine = 0, numberOfStatementsOnThisLine = 0, firstExtraStatement, SINGLE_CHILD_ALLOWED = /^(?:(?:DoWhile|For|ForIn|ForOf|If|Labeled|While)Statement|Export(?:Default|Named)Declaration)$/u;
			/**
			* Reports with the first extra statement, and clears it.
			* @returns {void}
			*/
			function reportFirstExtraStatementAndClear() {
				firstExtraStatement && context.report({
					node: firstExtraStatement,
					messageId: "exceed",
					data: {
						numberOfStatementsOnThisLine,
						maxStatementsPerLine,
						statements: numberOfStatementsOnThisLine === 1 ? "statement" : "statements"
					}
				}), firstExtraStatement = null;
			}
			/**
			* Gets the actual last token of a given node.
			* @param {ASTNode} node A node to get. This is a node except EmptyStatement.
			* @returns {Token} The actual last token.
			*/
			function getActualLastToken(node) {
				return sourceCode.getLastToken(node, astUtils.isNotSemicolonToken);
			}
			/**
			* Addresses a given node.
			* It updates the state of this rule, then reports the node if the node violated this rule.
			* @param {ASTNode} node A node to check.
			* @returns {void}
			*/
			function enterStatement(node) {
				let line = node.loc.start.line;
				SINGLE_CHILD_ALLOWED.test(node.parent.type) && node.parent.alternate !== node || (line === lastStatementLine ? numberOfStatementsOnThisLine += 1 : (reportFirstExtraStatementAndClear(), numberOfStatementsOnThisLine = 1, lastStatementLine = line), numberOfStatementsOnThisLine === maxStatementsPerLine + 1 && (firstExtraStatement ||= node));
			}
			/**
			* Updates the state of this rule with the end line of leaving node to check with the next statement.
			* @param {ASTNode} node A node to check.
			* @returns {void}
			*/
			function leaveStatement(node) {
				let line = getActualLastToken(node).loc.end.line;
				line !== lastStatementLine && (reportFirstExtraStatementAndClear(), numberOfStatementsOnThisLine = 1, lastStatementLine = line);
			}
			return {
				BreakStatement: enterStatement,
				ClassDeclaration: enterStatement,
				ContinueStatement: enterStatement,
				DebuggerStatement: enterStatement,
				DoWhileStatement: enterStatement,
				ExpressionStatement: enterStatement,
				ForInStatement: enterStatement,
				ForOfStatement: enterStatement,
				ForStatement: enterStatement,
				FunctionDeclaration: enterStatement,
				IfStatement: enterStatement,
				ImportDeclaration: enterStatement,
				LabeledStatement: enterStatement,
				ReturnStatement: enterStatement,
				SwitchStatement: enterStatement,
				ThrowStatement: enterStatement,
				TryStatement: enterStatement,
				VariableDeclaration: enterStatement,
				WhileStatement: enterStatement,
				WithStatement: enterStatement,
				ExportNamedDeclaration: enterStatement,
				ExportDefaultDeclaration: enterStatement,
				ExportAllDeclaration: enterStatement,
				"BreakStatement:exit": leaveStatement,
				"ClassDeclaration:exit": leaveStatement,
				"ContinueStatement:exit": leaveStatement,
				"DebuggerStatement:exit": leaveStatement,
				"DoWhileStatement:exit": leaveStatement,
				"ExpressionStatement:exit": leaveStatement,
				"ForInStatement:exit": leaveStatement,
				"ForOfStatement:exit": leaveStatement,
				"ForStatement:exit": leaveStatement,
				"FunctionDeclaration:exit": leaveStatement,
				"IfStatement:exit": leaveStatement,
				"ImportDeclaration:exit": leaveStatement,
				"LabeledStatement:exit": leaveStatement,
				"ReturnStatement:exit": leaveStatement,
				"SwitchStatement:exit": leaveStatement,
				"ThrowStatement:exit": leaveStatement,
				"TryStatement:exit": leaveStatement,
				"VariableDeclaration:exit": leaveStatement,
				"WhileStatement:exit": leaveStatement,
				"WithStatement:exit": leaveStatement,
				"ExportNamedDeclaration:exit": leaveStatement,
				"ExportDefaultDeclaration:exit": leaveStatement,
				"ExportAllDeclaration:exit": leaveStatement,
				"Program:exit": reportFirstExtraStatementAndClear
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/max-statements-per-line.cjs
module.exports = require_max_statements_per_line().create;
//#endregion
