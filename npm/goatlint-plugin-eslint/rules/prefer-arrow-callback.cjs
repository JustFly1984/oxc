const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-arrow-callback.js
/**
* @fileoverview A rule to suggest using arrow functions as callbacks.
* @author Toru Nagashima
*/
var require_prefer_arrow_callback = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether or not a given variable is a function name.
	* @param {eslint-scope.Variable} variable A variable to check.
	* @returns {boolean} `true` if the variable is a function name.
	*/
	function isFunctionName(variable) {
		return variable && variable.defs[0].type === "FunctionName";
	}
	/**
	* Checks whether or not a given MetaProperty node equals to a given value.
	* @param {ASTNode} node A MetaProperty node to check.
	* @param {string} metaName The name of `MetaProperty.meta`.
	* @param {string} propertyName The name of `MetaProperty.property`.
	* @returns {boolean} `true` if the node is the specific value.
	*/
	function checkMetaProperty(node, metaName, propertyName) {
		return node.meta.name === metaName && node.property.name === propertyName;
	}
	/**
	* Gets the variable object of `arguments` which is defined implicitly.
	* @param {eslint-scope.Scope} scope A scope to get.
	* @returns {eslint-scope.Variable} The found variable object.
	*/
	function getVariableOfArguments(scope) {
		let variables = scope.variables;
		for (let i = 0; i < variables.length; ++i) {
			let variable = variables[i];
			if (variable.name === "arguments") return variable.identifiers.length === 0 ? variable : null;
		}
		/* c8 ignore next */
		return null;
	}
	/**
	* Checks whether or not a given node is a callback.
	* @param {ASTNode} node A node to check.
	* @throws {Error} (Unreachable.)
	* @returns {Object}
	*   {boolean} retv.isCallback - `true` if the node is a callback.
	*   {boolean} retv.isLexicalThis - `true` if the node is with `.bind(this)`.
	*/
	function getCallbackInfo(node) {
		let retv = {
			isCallback: !1,
			isLexicalThis: !1
		}, currentNode = node, parent = node.parent, bound = !1;
		for (; currentNode;) {
			switch (parent.type) {
				case "LogicalExpression":
				case "ChainExpression":
				case "ConditionalExpression": break;
				case "MemberExpression":
					if (parent.object === currentNode && !parent.property.computed && parent.property.type === "Identifier" && parent.property.name === "bind") {
						let maybeCallee = parent.parent.type === "ChainExpression" ? parent.parent : parent;
						if (astUtils.isCallee(maybeCallee)) bound || (bound = !0, retv.isLexicalThis = maybeCallee.parent.arguments.length === 1 && maybeCallee.parent.arguments[0].type === "ThisExpression"), parent = maybeCallee.parent;
						else return retv;
					} else return retv;
					break;
				case "CallExpression":
				case "NewExpression": return parent.callee !== currentNode && (retv.isCallback = !0), retv;
				default: return retv;
			}
			currentNode = parent, parent = parent.parent;
		}
		/* c8 ignore next */
		throw Error("unreachable");
	}
	/**
	* Checks whether a simple list of parameters contains any duplicates. This does not handle complex
	* parameter lists (e.g. with destructuring), since complex parameter lists are a SyntaxError with duplicate
	* parameter names anyway. Instead, it always returns `false` for complex parameter lists.
	* @param {ASTNode[]} paramsList The list of parameters for a function
	* @returns {boolean} `true` if the list of parameters contains any duplicates
	*/
	function hasDuplicateParams(paramsList) {
		return paramsList.every((param) => param.type === "Identifier") && paramsList.length !== new Set(paramsList.map((param) => param.name)).size;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			dialects: ["javascript", "typescript"],
			language: "javascript",
			defaultOptions: [{
				allowNamedFunctions: !1,
				allowUnboundThis: !0
			}],
			docs: {
				description: "Require using arrow functions for callbacks",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/prefer-arrow-callback"
			},
			schema: [{
				type: "object",
				properties: {
					allowNamedFunctions: { type: "boolean" },
					allowUnboundThis: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			fixable: "code",
			messages: { preferArrowCallback: "Unexpected function expression." }
		},
		create(context) {
			let [{ allowNamedFunctions, allowUnboundThis }] = context.options, sourceCode = context.sourceCode, stack = [];
			/**
			* Pushes new function scope with all `false` flags.
			* @returns {void}
			*/
			function enterScope() {
				stack.push({
					this: !1,
					super: !1,
					meta: !1
				});
			}
			/**
			* Pops a function scope from the stack.
			* @returns {{this: boolean, super: boolean, meta: boolean}} The information of the last scope.
			*/
			function exitScope() {
				return stack.pop();
			}
			return {
				Program() {
					stack = [];
				},
				ThisExpression() {
					let info = stack.at(-1);
					info && (info.this = !0);
				},
				Super() {
					let info = stack.at(-1);
					info && (info.super = !0);
				},
				MetaProperty(node) {
					let info = stack.at(-1);
					info && checkMetaProperty(node, "new", "target") && (info.meta = !0);
				},
				FunctionDeclaration: enterScope,
				"FunctionDeclaration:exit": exitScope,
				FunctionExpression: enterScope,
				"FunctionExpression:exit"(node) {
					let scopeInfo = exitScope();
					if (allowNamedFunctions && node.id && node.id.name || node.generator) return;
					let nameVar = sourceCode.getDeclaredVariables(node)[0];
					if (isFunctionName(nameVar) && nameVar.references.length > 0) return;
					let variable = getVariableOfArguments(sourceCode.getScope(node));
					if (variable && variable.references.length > 0) return;
					let callbackInfo = getCallbackInfo(node);
					callbackInfo.isCallback && (!allowUnboundThis || !scopeInfo.this || callbackInfo.isLexicalThis) && !scopeInfo.super && !scopeInfo.meta && context.report({
						node,
						messageId: "preferArrowCallback",
						*fix(fixer) {
							if (!callbackInfo.isLexicalThis && scopeInfo.this || hasDuplicateParams(node.params) || node.params.length && node.params[0].name === "this") return;
							if (callbackInfo.isLexicalThis) {
								let memberNode = node.parent;
								if (memberNode.type !== "MemberExpression") return;
								let callNode = memberNode.parent, firstTokenToRemove = sourceCode.getTokenAfter(memberNode.object, astUtils.isNotClosingParenToken), lastTokenToRemove = sourceCode.getLastToken(callNode);
								if (astUtils.isParenthesised(sourceCode, memberNode) || sourceCode.commentsExistBetween(firstTokenToRemove, lastTokenToRemove)) return;
								yield fixer.removeRange([firstTokenToRemove.range[0], lastTokenToRemove.range[1]]);
							}
							let functionToken = sourceCode.getFirstToken(node, node.async ? 1 : 0), leftParenToken = sourceCode.getTokenAfter(functionToken, astUtils.isOpeningParenToken), tokenBeforeBody = sourceCode.getTokenBefore(node.body);
							sourceCode.commentsExistBetween(functionToken, leftParenToken) ? (yield fixer.remove(functionToken), node.id && (yield fixer.remove(node.id))) : yield fixer.removeRange([functionToken.range[0], leftParenToken.range[0]]), yield fixer.insertTextAfter(tokenBeforeBody, " =>");
							let replacedNode = callbackInfo.isLexicalThis ? node.parent.parent : node;
							replacedNode.type === "ChainExpression" && (replacedNode = replacedNode.parent), replacedNode.parent.type !== "CallExpression" && replacedNode.parent.type !== "ConditionalExpression" && !astUtils.isParenthesised(sourceCode, replacedNode) && !astUtils.isParenthesised(sourceCode, node) && (yield fixer.insertTextBefore(replacedNode, "("), yield fixer.insertTextAfter(replacedNode, ")"));
						}
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-arrow-callback.cjs
module.exports = require_prefer_arrow_callback().create;
//#endregion
