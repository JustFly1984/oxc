const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_fix_tracker$1 = require("../common/fix-tracker.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-else-return.js
/**
* @fileoverview Rule to flag `else` after a `return` in `if`
* @author Ian Christian Myers
*/
var require_no_else_return = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), FixTracker = require_fix_tracker$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ allowElseIf: !0 }],
			docs: {
				description: "Disallow `else` blocks after `return` statements in `if` statements",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-else-return"
			},
			schema: [{
				type: "object",
				properties: { allowElseIf: { type: "boolean" } },
				additionalProperties: !1
			}],
			fixable: "code",
			messages: { unexpected: "Unnecessary 'else' after 'return'." }
		},
		create(context) {
			let [{ allowElseIf }] = context.options, sourceCode = context.sourceCode;
			/**
			* Checks whether the given names can be safely used to declare block-scoped variables
			* in the given scope. Name collisions can produce redeclaration syntax errors,
			* or silently change references and modify behavior of the original code.
			*
			* This is not a generic function. In particular, it is assumed that the scope is a function scope or
			* a function's inner scope, and that the names can be valid identifiers in the given scope.
			* @param {string[]} names Array of variable names.
			* @param {eslint-scope.Scope} scope Function scope or a function's inner scope.
			* @returns {boolean} True if all names can be safely declared, false otherwise.
			*/
			function isSafeToDeclare(names, scope) {
				if (names.length === 0) return !0;
				let functionScope = scope.variableScope;
				if (scope.variables.filter(({ defs }) => defs.length > 0).some(({ name }) => names.includes(name)) || scope !== functionScope && scope.upper.type === "catch" && scope.upper.variables.some(({ name }) => names.includes(name)) || scope.variables.filter(({ defs, references }) => defs.length === 0 && references.length > 0).some(({ name }) => names.includes(name)) || scope.through.some((t) => names.includes(t.identifier.name))) return !1;
				if (scope !== functionScope) {
					let scopeNodeRange = scope.block.range;
					if (functionScope.variables.filter(({ name }) => names.includes(name)).some((v) => v.defs.some(({ node: { range } }) => scopeNodeRange[0] <= range[0] && range[1] <= scopeNodeRange[1]))) return !1;
				}
				return !0;
			}
			/**
			* Checks whether the removal of `else` and its braces is safe from variable name collisions.
			* @param {Node} node The 'else' node.
			* @param {eslint-scope.Scope} scope The scope in which the node and the whole 'if' statement is.
			* @returns {boolean} True if it is safe, false otherwise.
			*/
			function isSafeFromNameCollisions(node, scope) {
				if (node.type === "FunctionDeclaration") return !1;
				if (node.type !== "BlockStatement") return !0;
				let elseBlockScope = scope.childScopes.find(({ block }) => block === node);
				return elseBlockScope ? isSafeToDeclare(elseBlockScope.variables.map(({ name }) => name), scope) : !0;
			}
			/**
			* Display the context report if rule is violated
			* @param {Node} elseNode The 'else' node
			* @returns {void}
			*/
			function displayReport(elseNode) {
				let currentScope = sourceCode.getScope(elseNode.parent);
				context.report({
					node: elseNode,
					messageId: "unexpected",
					fix(fixer) {
						if (!isSafeFromNameCollisions(elseNode, currentScope)) return null;
						let startToken = sourceCode.getFirstToken(elseNode), elseToken = sourceCode.getTokenBefore(startToken), source = sourceCode.getText(elseNode), lastIfToken = sourceCode.getTokenBefore(elseToken), fixedSource, firstTokenOfElseBlock;
						firstTokenOfElseBlock = startToken.type === "Punctuator" && startToken.value === "{" ? sourceCode.getTokenAfter(startToken) : startToken;
						let ifBlockMaybeUnsafe = elseNode.parent.consequent.type !== "BlockStatement" && lastIfToken.value !== ";", elseBlockUnsafe = /^[([/+`-]/u.test(firstTokenOfElseBlock.value);
						if (ifBlockMaybeUnsafe && elseBlockUnsafe) return null;
						let endToken = sourceCode.getLastToken(elseNode), lastTokenOfElseBlock = sourceCode.getTokenBefore(endToken);
						if (lastTokenOfElseBlock.value !== ";") {
							let nextToken = sourceCode.getTokenAfter(endToken), nextTokenUnsafe = nextToken && /^[([/+`-]/u.test(nextToken.value), nextTokenOnSameLine = nextToken && nextToken.loc.start.line === lastTokenOfElseBlock.loc.start.line;
							if (nextTokenUnsafe || nextTokenOnSameLine && nextToken.value !== "}") return null;
						}
						return fixedSource = startToken.type === "Punctuator" && startToken.value === "{" ? source.slice(1, -1) : source, new FixTracker(fixer, sourceCode).retainEnclosingFunction(elseNode).replaceTextRange([elseToken.range[0], elseNode.range[1]], fixedSource);
					}
				});
			}
			/**
			* Check to see if the node is a ReturnStatement
			* @param {Node} node The node being evaluated
			* @returns {boolean} True if node is a return
			*/
			function checkForReturn(node) {
				return node.type === "ReturnStatement";
			}
			/**
			* Naive return checking, does not iterate through the whole
			* BlockStatement because we make the assumption that the ReturnStatement
			* will be the last node in the body of the BlockStatement.
			* @param {Node} node The consequent/alternate node
			* @returns {boolean} True if it has a return
			*/
			function naiveHasReturn(node) {
				if (node.type === "BlockStatement") {
					let lastChildNode = node.body.at(-1);
					return lastChildNode && checkForReturn(lastChildNode);
				}
				return checkForReturn(node);
			}
			/**
			* Check to see if the node is valid for evaluation,
			* meaning it has an else.
			* @param {Node} node The node being evaluated
			* @returns {boolean} True if the node is valid
			*/
			function hasElse(node) {
				return node.alternate && node.consequent;
			}
			/**
			* If the consequent is an IfStatement, check to see if it has an else
			* and both its consequent and alternate path return, meaning this is
			* a nested case of rule violation.  If-Else not considered currently.
			* @param {Node} node The consequent node
			* @returns {boolean} True if this is a nested rule violation
			*/
			function checkForIf(node) {
				return node.type === "IfStatement" && hasElse(node) && naiveHasReturn(node.alternate) && naiveHasReturn(node.consequent);
			}
			/**
			* Check the consequent/body node to make sure it is not
			* a ReturnStatement or an IfStatement that returns on both
			* code paths.
			* @param {Node} node The consequent or body node
			* @returns {boolean} `true` if it is a Return/If node that always returns.
			*/
			function checkForReturnOrIf(node) {
				return checkForReturn(node) || checkForIf(node);
			}
			/**
			* Check whether a node returns in every codepath.
			* @param {Node} node The node to be checked
			* @returns {boolean} `true` if it returns on every codepath.
			*/
			function alwaysReturns(node) {
				return node.type === "BlockStatement" ? node.body.some(checkForReturnOrIf) : checkForReturnOrIf(node);
			}
			/**
			* Check the if statement, but don't catch else-if blocks.
			* @returns {void}
			* @param {Node} node The node for the if statement to check
			* @private
			*/
			function checkIfWithoutElse(node) {
				let parent = node.parent;
				if (!astUtils.STATEMENT_LIST_PARENTS.has(parent.type)) return;
				let consequents = [], alternate;
				for (let currentNode = node; currentNode.type === "IfStatement"; currentNode = currentNode.alternate) {
					if (!currentNode.alternate) return;
					consequents.push(currentNode.consequent), alternate = currentNode.alternate;
				}
				consequents.every(alwaysReturns) && displayReport(alternate);
			}
			/**
			* Check the if statement
			* @returns {void}
			* @param {Node} node The node for the if statement to check
			* @private
			*/
			function checkIfWithElse(node) {
				let parent = node.parent;
				if (!astUtils.STATEMENT_LIST_PARENTS.has(parent.type)) return;
				let alternate = node.alternate;
				alternate && alwaysReturns(node.consequent) && displayReport(alternate);
			}
			return { "IfStatement:exit": allowElseIf ? checkIfWithoutElse : checkIfWithElse };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-else-return.cjs
module.exports = require_no_else_return().create;
//#endregion
