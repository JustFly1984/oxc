const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/array-callback-return.js
/**
* @fileoverview Rule to enforce return statements in callbacks of array's methods
* @author Toru Nagashima
*/
var require_array_callback_return = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), TARGET_NODE_TYPE = /^(?:Arrow)?FunctionExpression$/u, TARGET_METHODS = /^(?:every|filter|find(?:Last)?(?:Index)?|flatMap|forEach|map|reduce(?:Right)?|some|sort|toSorted)$/u;
	/**
	* Checks a given node is a member access which has the specified name's
	* property.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node is a member access which has
	*      the specified name's property. The node may be a `(Chain|Member)Expression` node.
	*/
	function isTargetMethod(node) {
		return astUtils.isSpecificMemberAccess(node, null, TARGET_METHODS);
	}
	/**
	* Checks all segments in a set and returns true if any are reachable.
	* @param {Set<CodePathSegment>} segments The segments to check.
	* @returns {boolean} True if any segment is reachable; false otherwise.
	*/
	function isAnySegmentReachable(segments) {
		for (let segment of segments) if (segment.reachable) return !0;
		return !1;
	}
	/**
	* Returns a human-legible description of an array method
	* @param {string} arrayMethodName A method name to fully qualify
	* @returns {string} the method name prefixed with `Array.` if it is a class method,
	*      or else `Array.prototype.` if it is an instance method.
	*/
	function fullMethodName(arrayMethodName) {
		return [
			"from",
			"of",
			"isArray"
		].includes(arrayMethodName) ? `Array.${arrayMethodName}` : `Array.prototype.${arrayMethodName}`;
	}
	/**
	* Checks whether or not a given node is a function expression which is the
	* callback of an array method, returning the method name.
	* @param {ASTNode} node A node to check. This is one of
	*      FunctionExpression or ArrowFunctionExpression.
	* @returns {string} The method name if the node is a callback method,
	*      null otherwise.
	*/
	function getArrayMethodName(node) {
		let currentNode = node;
		for (; currentNode;) {
			let parent = currentNode.parent;
			switch (parent.type) {
				case "LogicalExpression":
				case "ConditionalExpression":
				case "ChainExpression":
					currentNode = parent;
					break;
				case "ReturnStatement": {
					let func = astUtils.getUpperFunction(parent);
					if (func === null || !astUtils.isCallee(func)) return null;
					currentNode = func.parent;
					break;
				}
				case "CallExpression": return astUtils.isArrayFromMethod(parent.callee) && parent.arguments.length >= 2 && parent.arguments[1] === currentNode ? "from" : isTargetMethod(parent.callee) && parent.arguments.length >= 1 && parent.arguments[0] === currentNode ? astUtils.getStaticPropertyName(parent.callee) : null;
				default: return null;
			}
		}
		/* c8 ignore next */
		return null;
	}
	/**
	* Checks if the given node is a void expression.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} - `true` if the node is a void expression
	*/
	function isExpressionVoid(node) {
		return node.type === "UnaryExpression" && node.operator === "void";
	}
	/**
	* Fixes the linting error by prepending "void " to the given node
	* @param {Object} sourceCode context given by context.sourceCode
	* @param {ASTNode} node The node to fix.
	* @param {Object} fixer The fixer object provided by ESLint.
	* @returns {Array<Object>} - An array of fix objects to apply to the node.
	*/
	function voidPrependFixer(sourceCode, node, fixer) {
		let requiresParens = astUtils.getPrecedence(node) < astUtils.getPrecedence({
			type: "UnaryExpression",
			operator: "void"
		}) && !astUtils.isParenthesised(sourceCode, node), returnOrArrowToken = sourceCode.getTokenBefore(node, node.parent.type === "ArrowFunctionExpression" ? astUtils.isArrowToken : (token) => token.type === "Keyword" && token.value === "return"), firstToken = sourceCode.getTokenAfter(returnOrArrowToken), prependSpace = returnOrArrowToken.value === "return" && returnOrArrowToken.range[1] === firstToken.range[0];
		return [fixer.insertTextBefore(firstToken, `${prependSpace ? " " : ""}void ${requiresParens ? "(" : ""}`), fixer.insertTextAfter(node, requiresParens ? ")" : "")];
	}
	/**
	* Fixes the linting error by `wrapping {}` around the given node's body.
	* @param {Object} sourceCode context given by context.sourceCode
	* @param {ASTNode} node The node to fix.
	* @param {Object} fixer The fixer object provided by ESLint.
	* @returns {Array<Object>} - An array of fix objects to apply to the node.
	*/
	function curlyWrapFixer(sourceCode, node, fixer) {
		let arrowToken = sourceCode.getTokenBefore(node.body, astUtils.isArrowToken), firstToken = sourceCode.getTokenAfter(arrowToken), lastToken = sourceCode.getLastToken(node);
		return [fixer.insertTextBefore(firstToken, "{"), fixer.insertTextAfter(lastToken, "}")];
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{
				allowImplicit: !1,
				checkForEach: !1,
				allowVoid: !1
			}],
			docs: {
				description: "Enforce `return` statements in callbacks of array methods",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/array-callback-return"
			},
			hasSuggestions: !0,
			schema: [{
				type: "object",
				properties: {
					allowImplicit: { type: "boolean" },
					checkForEach: { type: "boolean" },
					allowVoid: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: {
				expectedAtEnd: "{{arrayMethodName}}() expects a value to be returned at the end of {{name}}.",
				expectedInside: "{{arrayMethodName}}() expects a return value from {{name}}.",
				expectedReturnValue: "{{arrayMethodName}}() expects a return value from {{name}}.",
				expectedNoReturnValue: "{{arrayMethodName}}() expects no useless return value from {{name}}.",
				wrapBraces: "Wrap the expression in `{}`.",
				prependVoid: "Prepend `void` to the expression."
			}
		},
		create(context) {
			let [options] = context.options, sourceCode = context.sourceCode, funcInfo = {
				arrayMethodName: null,
				upper: null,
				codePath: null,
				hasReturn: !1,
				shouldCheck: !1,
				node: null
			};
			/**
			* Checks whether or not the last code path segment is reachable.
			* Then reports this function if the segment is reachable.
			*
			* If the last code path segment is reachable, there are paths which are not
			* returned or thrown.
			* @param {ASTNode} node A node to check.
			* @returns {void}
			*/
			function checkLastSegment(node) {
				if (!funcInfo.shouldCheck) return;
				let messageAndSuggestions = {
					messageId: "",
					suggest: []
				};
				if (funcInfo.arrayMethodName === "forEach") {
					if (options.checkForEach && node.type === "ArrowFunctionExpression" && node.expression) if (options.allowVoid) {
						if (isExpressionVoid(node.body)) return;
						messageAndSuggestions.messageId = "expectedNoReturnValue", messageAndSuggestions.suggest = [{
							messageId: "wrapBraces",
							fix(fixer) {
								return curlyWrapFixer(sourceCode, node, fixer);
							}
						}, {
							messageId: "prependVoid",
							fix(fixer) {
								return voidPrependFixer(sourceCode, node.body, fixer);
							}
						}];
					} else messageAndSuggestions.messageId = "expectedNoReturnValue", messageAndSuggestions.suggest = [{
						messageId: "wrapBraces",
						fix(fixer) {
							return curlyWrapFixer(sourceCode, node, fixer);
						}
					}];
				} else node.body.type === "BlockStatement" && isAnySegmentReachable(funcInfo.currentSegments) && (messageAndSuggestions.messageId = funcInfo.hasReturn ? "expectedAtEnd" : "expectedInside");
				if (messageAndSuggestions.messageId) {
					let name = astUtils.getFunctionNameWithKind(node);
					context.report({
						node,
						loc: astUtils.getFunctionHeadLoc(node, sourceCode),
						messageId: messageAndSuggestions.messageId,
						data: {
							name,
							arrayMethodName: fullMethodName(funcInfo.arrayMethodName)
						},
						suggest: messageAndSuggestions.suggest.length === 0 ? null : messageAndSuggestions.suggest
					});
				}
			}
			return {
				onCodePathStart(codePath, node) {
					let methodName = null;
					TARGET_NODE_TYPE.test(node.type) && (methodName = getArrayMethodName(node)), funcInfo = {
						arrayMethodName: methodName,
						upper: funcInfo,
						codePath,
						hasReturn: !1,
						shouldCheck: methodName && !node.async && !node.generator,
						node,
						currentSegments: /* @__PURE__ */ new Set()
					};
				},
				onCodePathEnd() {
					funcInfo = funcInfo.upper;
				},
				onUnreachableCodePathSegmentStart(segment) {
					funcInfo.currentSegments.add(segment);
				},
				onUnreachableCodePathSegmentEnd(segment) {
					funcInfo.currentSegments.delete(segment);
				},
				onCodePathSegmentStart(segment) {
					funcInfo.currentSegments.add(segment);
				},
				onCodePathSegmentEnd(segment) {
					funcInfo.currentSegments.delete(segment);
				},
				ReturnStatement(node) {
					if (!funcInfo.shouldCheck) return;
					funcInfo.hasReturn = !0;
					let messageAndSuggestions = {
						messageId: "",
						suggest: []
					};
					if (funcInfo.arrayMethodName === "forEach") {
						if (options.checkForEach && node.argument) if (options.allowVoid) {
							if (isExpressionVoid(node.argument)) return;
							messageAndSuggestions.messageId = "expectedNoReturnValue", messageAndSuggestions.suggest = [{
								messageId: "prependVoid",
								fix(fixer) {
									return voidPrependFixer(sourceCode, node.argument, fixer);
								}
							}];
						} else messageAndSuggestions.messageId = "expectedNoReturnValue";
					} else !options.allowImplicit && !node.argument && (messageAndSuggestions.messageId = "expectedReturnValue");
					messageAndSuggestions.messageId && context.report({
						node,
						messageId: messageAndSuggestions.messageId,
						data: {
							name: astUtils.getFunctionNameWithKind(funcInfo.node),
							arrayMethodName: fullMethodName(funcInfo.arrayMethodName)
						},
						suggest: messageAndSuggestions.suggest.length === 0 ? null : messageAndSuggestions.suggest
					});
				},
				"FunctionExpression:exit": checkLastSegment,
				"ArrowFunctionExpression:exit": checkLastSegment
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/array-callback-return.cjs
module.exports = require_array_callback_return().create;
//#endregion
