const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/preserve-caught-error.js
/**
* @fileoverview Rule to preserve caught errors when re-throwing exceptions
* @author Amnish Singh Arora
*/
var require_preserve_caught_error = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), UNKNOWN_CAUSE = Symbol("unknown_cause"), BUILT_IN_ERROR_TYPES = new Set([
		"Error",
		"EvalError",
		"RangeError",
		"ReferenceError",
		"SyntaxError",
		"TypeError",
		"URIError",
		"AggregateError"
	]);
	/**
	* Finds and returns information about the `cause` property of an error being thrown.
	* @param {ASTNode} throwStatement `ThrowStatement` to be checked.
	* @returns {{ value: ASTNode; multipleDefinitions: boolean; } | UNKNOWN_CAUSE | null}
	* Information about the `cause` of the error being thrown, such as the value node and
	* whether there are multiple definitions of `cause`. `null` if there is no `cause`.
	*/
	function getErrorCause(throwStatement) {
		let throwExpression = throwStatement.argument, optionsIndex = throwExpression.callee.name === "AggregateError" ? 2 : 1, spreadExpressionIndex = throwExpression.arguments.findIndex((arg) => arg.type === "SpreadElement");
		if (spreadExpressionIndex >= 0 && spreadExpressionIndex <= optionsIndex) return UNKNOWN_CAUSE;
		let errorOptions = throwExpression.arguments[optionsIndex];
		if (errorOptions) {
			if (errorOptions.type === "ObjectExpression") {
				if (errorOptions.properties.some((prop) => prop.type === "SpreadElement")) return UNKNOWN_CAUSE;
				let causeProperties = errorOptions.properties.filter((prop) => astUtils.getStaticPropertyName(prop) === "cause"), causeProperty = causeProperties.at(-1);
				return causeProperty ? {
					value: causeProperty.value,
					multipleDefinitions: causeProperties.length > 1
				} : null;
			}
			return UNKNOWN_CAUSE;
		}
		return null;
	}
	/**
	* Finds and returns the `CatchClause` node, that the `node` is part of.
	* @param {ASTNode} node The AST node to be evaluated.
	* @returns {ASTNode | null } The closest parent `CatchClause` node, `null` if the `node` is not in a catch block.
	*/
	function findParentCatch(node) {
		let currentNode = node;
		for (; currentNode && currentNode.type !== "CatchClause";) {
			if ([
				"FunctionDeclaration",
				"FunctionExpression",
				"ArrowFunctionExpression",
				"StaticBlock"
			].includes(currentNode.type)) return null;
			currentNode = currentNode.parent;
		}
		return currentNode;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ requireCatchParameter: !1 }],
			docs: {
				description: "Disallow losing originally caught error when re-throwing custom errors",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/preserve-caught-error"
			},
			schema: [{
				type: "object",
				properties: { requireCatchParameter: {
					type: "boolean",
					description: "Requires the catch blocks to always have the caught error parameter so it is not discarded."
				} },
				additionalProperties: !1
			}],
			messages: {
				missingCause: "There is no `cause` attached to the symptom error being thrown.",
				incorrectCause: "The symptom error is being thrown with an incorrect `cause`.",
				includeCause: "Include the original caught error as the `cause` of the symptom error.",
				missingCatchErrorParam: "The caught error is not accessible because the catch clause lacks the error parameter. Start referencing the caught error using the catch parameter.",
				partiallyLostError: "Re-throws cannot preserve the caught error as a part of it is being lost due to destructuring.",
				caughtErrorShadowed: "The caught error is being attached as `cause`, but is shadowed by a closer scoped redeclaration."
			},
			hasSuggestions: !0
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ requireCatchParameter }] = context.options;
			/**
			* Checks if a `ThrowStatement` is constructing and throwing a new `Error` object.
			*
			* Covers all the error types on `globalThis` that support `cause` property:
			* https://github.com/microsoft/TypeScript/blob/main/src/lib/es2022.error.d.ts
			* @param {ASTNode} throwStatement The `ThrowStatement` that needs to be checked.
			* @returns {boolean} `true` if a new "Error" is being thrown, else `false`.
			*/
			function isThrowingNewError(throwStatement) {
				return (throwStatement.argument.type === "NewExpression" || throwStatement.argument.type === "CallExpression") && throwStatement.argument.callee.type === "Identifier" && BUILT_IN_ERROR_TYPES.has(throwStatement.argument.callee.name) && sourceCode.isGlobalReference(throwStatement.argument.callee);
			}
			/**
			* Inserts `cause: <caughtErrorName>` into an inline options object expression.
			* @param {RuleFixer} fixer The fixer object.
			* @param {ASTNode} optionsNode The options object node.
			* @param {string} caughtErrorName The name of the caught error (e.g., "err").
			* @returns {Fix} The fix object.
			*/
			function insertCauseIntoOptions(fixer, optionsNode, caughtErrorName) {
				let properties = optionsNode.properties;
				if (properties.length === 0) return fixer.insertTextAfter(sourceCode.getFirstToken(optionsNode), `cause: ${caughtErrorName}`);
				let lastProp = properties.at(-1);
				return fixer.insertTextAfter(lastProp, `, cause: ${caughtErrorName}`);
			}
			return { ThrowStatement(node) {
				let parentCatch = findParentCatch(node), throwStatement = node;
				if (parentCatch && isThrowingNewError(throwStatement)) {
					if (parentCatch.param && parentCatch.param.type !== "Identifier") {
						context.report({
							messageId: "partiallyLostError",
							node: parentCatch
						});
						return;
					}
					let caughtError = parentCatch.param?.type === "Identifier" ? parentCatch.param : null;
					if (!caughtError) {
						if (requireCatchParameter) {
							context.report({
								node: throwStatement,
								messageId: "missingCatchErrorParam"
							});
							return;
						}
						return;
					}
					let errorCauseInfo = getErrorCause(throwStatement);
					if (errorCauseInfo === UNKNOWN_CAUSE) return;
					if (errorCauseInfo === null) {
						context.report({
							messageId: "missingCause",
							node: throwStatement,
							suggest: [{
								messageId: "includeCause",
								fix(fixer) {
									let throwExpression = throwStatement.argument, args = throwExpression.arguments;
									if (throwExpression.callee.name === "AggregateError") {
										let errorsArg = args[0], messageArg = args[1], optionsArg = args[2];
										if (!errorsArg) {
											let lastToken = sourceCode.getLastToken(throwExpression), lastCalleeToken = sourceCode.getLastToken(throwExpression.callee), parenToken = sourceCode.getFirstTokenBetween(lastCalleeToken, lastToken, astUtils.isOpeningParenToken);
											return parenToken ? fixer.insertTextAfter(parenToken, `[], "", { cause: ${caughtError.name} }`) : fixer.insertTextAfter(throwExpression.callee, `([], "", { cause: ${caughtError.name} })`);
										}
										return messageArg ? optionsArg ? optionsArg.type === "ObjectExpression" ? insertCauseIntoOptions(fixer, optionsArg, caughtError.name) : null : fixer.insertTextAfter(messageArg, `, { cause: ${caughtError.name} }`) : fixer.insertTextAfter(errorsArg, `, "", { cause: ${caughtError.name} }`);
									}
									let messageArg = args[0], optionsArg = args[1];
									if (!messageArg) {
										let lastToken = sourceCode.getLastToken(throwExpression), lastCalleeToken = sourceCode.getLastToken(throwExpression.callee), parenToken = sourceCode.getFirstTokenBetween(lastCalleeToken, lastToken, astUtils.isOpeningParenToken);
										return parenToken ? fixer.insertTextAfter(parenToken, `"", { cause: ${caughtError.name} }`) : fixer.insertTextAfter(throwExpression.callee, `("", { cause: ${caughtError.name} })`);
									}
									return optionsArg ? optionsArg.type === "ObjectExpression" ? insertCauseIntoOptions(fixer, optionsArg, caughtError.name) : null : fixer.insertTextAfter(messageArg, `, { cause: ${caughtError.name} }`);
								}
							}]
						});
						return;
					}
					let { value: thrownErrorCause } = errorCauseInfo;
					if (!(thrownErrorCause.type === "Identifier" && thrownErrorCause.name === caughtError.name)) {
						let suggest = errorCauseInfo.multipleDefinitions ? null : [{
							messageId: "includeCause",
							fix(fixer) {
								return thrownErrorCause.parent.method || thrownErrorCause.parent.shorthand || thrownErrorCause.parent.kind !== "init" ? fixer.replaceText(thrownErrorCause.parent, `cause: ${caughtError.name}`) : fixer.replaceText(thrownErrorCause, caughtError.name);
							}
						}];
						context.report({
							messageId: "incorrectCause",
							node: thrownErrorCause,
							suggest
						});
						return;
					}
					let scope = sourceCode.getScope(throwStatement);
					do {
						if (scope.set.get(caughtError.name)) break;
						scope = scope.upper;
					} while (scope);
					scope?.block !== parentCatch && context.report({
						messageId: "caughtErrorShadowed",
						node: throwStatement
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/preserve-caught-error.cjs
module.exports = require_preserve_caught_error().create;
//#endregion
