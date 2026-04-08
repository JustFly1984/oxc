const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/curly.js
/**
* @fileoverview Rule to flag statements without curly braces
* @author Nicholas C. Zakas
*/
var require_curly = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce consistent brace style for all control statements",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/curly"
			},
			schema: { anyOf: [{
				type: "array",
				items: [{ enum: ["all"] }],
				minItems: 0,
				maxItems: 1
			}, {
				type: "array",
				items: [{ enum: [
					"multi",
					"multi-line",
					"multi-or-nest"
				] }, { enum: ["consistent"] }],
				minItems: 0,
				maxItems: 2
			}] },
			defaultOptions: ["all"],
			fixable: "code",
			messages: {
				missingCurlyAfter: "Expected { after '{{name}}'.",
				missingCurlyAfterCondition: "Expected { after '{{name}}' condition.",
				unexpectedCurlyAfter: "Unnecessary { after '{{name}}'.",
				unexpectedCurlyAfterCondition: "Unnecessary { after '{{name}}' condition."
			}
		},
		create(context) {
			let multiOnly = context.options[0] === "multi", multiLine = context.options[0] === "multi-line", multiOrNest = context.options[0] === "multi-or-nest", consistent = context.options[1] === "consistent", sourceCode = context.sourceCode;
			/**
			* Determines if a given node is a one-liner that's on the same line as it's preceding code.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} True if the node is a one-liner that's on the same line as it's preceding code.
			* @private
			*/
			function isCollapsedOneLiner(node) {
				let before = sourceCode.getTokenBefore(node), last = sourceCode.getLastToken(node), lastExcludingSemicolon = astUtils.isSemicolonToken(last) ? sourceCode.getTokenBefore(last) : last;
				return before.loc.start.line === lastExcludingSemicolon.loc.end.line;
			}
			/**
			* Determines if a given node is a one-liner.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} True if the node is a one-liner.
			* @private
			*/
			function isOneLiner(node) {
				if (node.type === "EmptyStatement") return !0;
				let first = sourceCode.getFirstToken(node), last = sourceCode.getLastToken(node), lastExcludingSemicolon = astUtils.isSemicolonToken(last) ? sourceCode.getTokenBefore(last) : last;
				return first.loc.start.line === lastExcludingSemicolon.loc.end.line;
			}
			/**
			* Determines if a semicolon needs to be inserted after removing a set of curly brackets, in order to avoid a SyntaxError.
			* @param {Token} closingBracket The } token
			* @returns {boolean} `true` if a semicolon needs to be inserted after the last statement in the block.
			*/
			function needsSemicolon(closingBracket) {
				let tokenBefore = sourceCode.getTokenBefore(closingBracket), tokenAfter = sourceCode.getTokenAfter(closingBracket), lastBlockNode = sourceCode.getNodeByRangeIndex(tokenBefore.range[0]);
				return astUtils.isSemicolonToken(tokenBefore) || !tokenAfter || lastBlockNode.type === "BlockStatement" && lastBlockNode.parent.type !== "FunctionExpression" && lastBlockNode.parent.type !== "ArrowFunctionExpression" ? !1 : !!(tokenBefore.loc.end.line === tokenAfter.loc.start.line || /^[([/`+-]/u.test(tokenAfter.value) || tokenBefore.type === "Punctuator" && (tokenBefore.value === "++" || tokenBefore.value === "--"));
			}
			/**
			* Prepares to check the body of a node to see if it's a block statement.
			* @param {ASTNode} node The node to report if there's a problem.
			* @param {ASTNode} body The body node to check for blocks.
			* @param {string} name The name to report if there's a problem.
			* @param {{ condition: boolean }} opts Options to pass to the report functions
			* @returns {Object} a prepared check object, with "actual", "expected", "check" properties.
			*   "actual" will be `true` or `false` whether the body is already a block statement.
			*   "expected" will be `true` or `false` if the body should be a block statement or not, or
			*   `null` if it doesn't matter, depending on the rule options. It can be modified to change
			*   the final behavior of "check".
			*   "check" will be a function reporting appropriate problems depending on the other
			*   properties.
			*/
			function prepareCheck(node, body, name, opts) {
				let hasBlock = body.type === "BlockStatement", expected = null;
				if (hasBlock && (body.body.length !== 1 || astUtils.areBracesNecessary(body, sourceCode))) expected = !0;
				else if (multiOnly) expected = !1;
				else if (multiLine) isCollapsedOneLiner(body) || (expected = !0);
				else if (multiOrNest) if (hasBlock) {
					let statement = body.body[0], leadingCommentsInBlock = sourceCode.getCommentsBefore(statement);
					expected = !isOneLiner(statement) || leadingCommentsInBlock.length > 0;
				} else expected = !isOneLiner(body);
				else expected = !0;
				return {
					actual: hasBlock,
					expected,
					check() {
						this.expected !== null && this.expected !== this.actual && (this.expected ? context.report({
							node,
							loc: body.loc,
							messageId: opts && opts.condition ? "missingCurlyAfterCondition" : "missingCurlyAfter",
							data: { name },
							fix: (fixer) => fixer.replaceText(body, `{${sourceCode.getText(body)}}`)
						}) : context.report({
							node,
							loc: body.loc,
							messageId: opts && opts.condition ? "unexpectedCurlyAfterCondition" : "unexpectedCurlyAfter",
							data: { name },
							fix(fixer) {
								let needsPrecedingSpace = node.type === "DoWhileStatement" && sourceCode.getTokenBefore(body).range[1] === body.range[0] && !astUtils.canTokensBeAdjacent("do", sourceCode.getFirstToken(body, { skip: 1 })), openingBracket = sourceCode.getFirstToken(body), closingBracket = sourceCode.getLastToken(body), lastTokenInBlock = sourceCode.getTokenBefore(closingBracket);
								if (needsSemicolon(closingBracket)) return null;
								let resultingBodyText = sourceCode.getText().slice(openingBracket.range[1], lastTokenInBlock.range[0]) + sourceCode.getText(lastTokenInBlock) + sourceCode.getText().slice(lastTokenInBlock.range[1], closingBracket.range[0]);
								return fixer.replaceText(body, (needsPrecedingSpace ? " " : "") + resultingBodyText);
							}
						}));
					}
				};
			}
			/**
			* Prepares to check the bodies of a "if", "else if" and "else" chain.
			* @param {ASTNode} node The first IfStatement node of the chain.
			* @returns {Object[]} prepared checks for each body of the chain. See `prepareCheck` for more
			*   information.
			*/
			function prepareIfChecks(node) {
				let preparedChecks = [];
				for (let currentNode = node; currentNode; currentNode = currentNode.alternate) if (preparedChecks.push(prepareCheck(currentNode, currentNode.consequent, "if", { condition: !0 })), currentNode.alternate && currentNode.alternate.type !== "IfStatement") {
					preparedChecks.push(prepareCheck(currentNode, currentNode.alternate, "else"));
					break;
				}
				if (consistent) {
					let expected = preparedChecks.some((preparedCheck) => preparedCheck.expected === null ? preparedCheck.actual : preparedCheck.expected);
					preparedChecks.forEach((preparedCheck) => {
						preparedCheck.expected = expected;
					});
				}
				return preparedChecks;
			}
			return {
				IfStatement(node) {
					let parent = node.parent;
					parent.type === "IfStatement" && parent.alternate === node || prepareIfChecks(node).forEach((preparedCheck) => {
						preparedCheck.check();
					});
				},
				WhileStatement(node) {
					prepareCheck(node, node.body, "while", { condition: !0 }).check();
				},
				DoWhileStatement(node) {
					prepareCheck(node, node.body, "do").check();
				},
				ForStatement(node) {
					prepareCheck(node, node.body, "for", { condition: !0 }).check();
				},
				ForInStatement(node) {
					prepareCheck(node, node.body, "for-in").check();
				},
				ForOfStatement(node) {
					prepareCheck(node, node.body, "for-of").check();
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/curly.cjs
module.exports = require_curly().create;
//#endregion
