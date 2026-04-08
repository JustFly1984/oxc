const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/object-shorthand.js
/**
* @fileoverview Rule to enforce concise object methods and properties.
* @author Jamund Ferguson
*/
var require_object_shorthand = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let OPTIONS = {
		always: "always",
		never: "never",
		methods: "methods",
		properties: "properties",
		consistent: "consistent",
		consistentAsNeeded: "consistent-as-needed"
	}, astUtils = require_ast_utils$1.t(), CTOR_PREFIX_REGEX = /[^_$0-9]/u, JSDOC_COMMENT_REGEX = /^\s*\*/u;
	/**
	* Determines if the first character of the name is a capital letter.
	* @param {string} name The name of the node to evaluate.
	* @returns {boolean} True if the first character of the property name is a capital letter, false if not.
	* @private
	*/
	function isConstructor(name) {
		let match = CTOR_PREFIX_REGEX.exec(name);
		if (!match) return !1;
		let firstChar = name.charAt(match.index);
		return firstChar === firstChar.toUpperCase();
	}
	/**
	* Determines if the property can have a shorthand form.
	* @param {ASTNode} property Property AST node
	* @returns {boolean} True if the property can have a shorthand form
	* @private
	*/
	function canHaveShorthand(property) {
		return property.kind !== "set" && property.kind !== "get" && property.type !== "SpreadElement" && property.type !== "SpreadProperty" && property.type !== "ExperimentalSpreadProperty";
	}
	/**
	* Checks whether a node is a string literal.
	* @param {ASTNode} node Any AST node.
	* @returns {boolean} `true` if it is a string literal.
	*/
	function isStringLiteral(node) {
		return node.type === "Literal" && typeof node.value == "string";
	}
	/**
	* Determines if the property is a shorthand or not.
	* @param {ASTNode} property Property AST node
	* @returns {boolean} True if the property is considered shorthand, false if not.
	* @private
	*/
	function isShorthand(property) {
		return property.shorthand || property.method;
	}
	/**
	* Determines if the property's key and method or value are named equally.
	* @param {ASTNode} property Property AST node
	* @returns {boolean} True if the key and value are named equally, false if not.
	* @private
	*/
	function isRedundant(property) {
		let value = property.value;
		return value.type === "FunctionExpression" ? !value.id : value.type === "Identifier" ? astUtils.getStaticPropertyName(property) === value.name : !1;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require or disallow method and property shorthand syntax for object literals",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/object-shorthand"
			},
			fixable: "code",
			schema: { anyOf: [
				{
					type: "array",
					items: [{ enum: [
						"always",
						"methods",
						"properties",
						"never",
						"consistent",
						"consistent-as-needed"
					] }],
					minItems: 0,
					maxItems: 1
				},
				{
					type: "array",
					items: [{ enum: [
						"always",
						"methods",
						"properties"
					] }, {
						type: "object",
						properties: { avoidQuotes: { type: "boolean" } },
						additionalProperties: !1
					}],
					minItems: 0,
					maxItems: 2
				},
				{
					type: "array",
					items: [{ enum: ["always", "methods"] }, {
						type: "object",
						properties: {
							ignoreConstructors: { type: "boolean" },
							methodsIgnorePattern: { type: "string" },
							avoidQuotes: { type: "boolean" },
							avoidExplicitReturnArrows: { type: "boolean" }
						},
						additionalProperties: !1
					}],
					minItems: 0,
					maxItems: 2
				}
			] },
			messages: {
				expectedAllPropertiesShorthanded: "Expected shorthand for all properties.",
				expectedLiteralMethodLongform: "Expected longform method syntax for string literal keys.",
				expectedPropertyShorthand: "Expected property shorthand.",
				expectedPropertyLongform: "Expected longform property syntax.",
				expectedMethodShorthand: "Expected method shorthand.",
				expectedMethodLongform: "Expected longform method syntax.",
				unexpectedMix: "Unexpected mix of shorthand and non-shorthand properties."
			}
		},
		create(context) {
			let APPLY = context.options[0] || OPTIONS.always, APPLY_TO_METHODS = APPLY === OPTIONS.methods || APPLY === OPTIONS.always, APPLY_TO_PROPS = APPLY === OPTIONS.properties || APPLY === OPTIONS.always, APPLY_NEVER = APPLY === OPTIONS.never, APPLY_CONSISTENT = APPLY === OPTIONS.consistent, APPLY_CONSISTENT_AS_NEEDED = APPLY === OPTIONS.consistentAsNeeded, PARAMS = context.options[1] || {}, IGNORE_CONSTRUCTORS = PARAMS.ignoreConstructors, METHODS_IGNORE_PATTERN = PARAMS.methodsIgnorePattern ? new RegExp(PARAMS.methodsIgnorePattern, "u") : null, AVOID_QUOTES = PARAMS.avoidQuotes, AVOID_EXPLICIT_RETURN_ARROWS = !!PARAMS.avoidExplicitReturnArrows, sourceCode = context.sourceCode;
			/**
			* Ensures that an object's properties are consistently shorthand, or not shorthand at all.
			* @param {ASTNode} node Property AST node
			* @param {boolean} checkRedundancy Whether to check longform redundancy
			* @returns {void}
			*/
			function checkConsistency(node, checkRedundancy) {
				let properties = node.properties.filter(canHaveShorthand);
				if (properties.length > 0) {
					let shorthandProperties = properties.filter(isShorthand);
					shorthandProperties.length !== properties.length && (shorthandProperties.length > 0 ? context.report({
						node,
						messageId: "unexpectedMix"
					}) : checkRedundancy && properties.every(isRedundant) && context.report({
						node,
						messageId: "expectedAllPropertiesShorthanded"
					}));
				}
			}
			/**
			* Fixes a FunctionExpression node by making it into a shorthand property.
			* @param {SourceCodeFixer} fixer The fixer object
			* @param {ASTNode} node A `Property` node that has a `FunctionExpression` or `ArrowFunctionExpression` as its value
			* @returns {Object} A fix for this node
			*/
			function makeFunctionShorthand(fixer, node) {
				let firstKeyToken = node.computed ? sourceCode.getFirstToken(node, astUtils.isOpeningBracketToken) : sourceCode.getFirstToken(node.key), lastKeyToken = node.computed ? sourceCode.getFirstTokenBetween(node.key, node.value, astUtils.isClosingBracketToken) : sourceCode.getLastToken(node.key), keyText = sourceCode.text.slice(firstKeyToken.range[0], lastKeyToken.range[1]), keyPrefix = "";
				if (sourceCode.commentsExistBetween(lastKeyToken, node.value)) return null;
				node.value.async && (keyPrefix += "async "), node.value.generator && (keyPrefix += "*");
				let fixRange = [firstKeyToken.range[0], node.range[1]], methodPrefix = keyPrefix + keyText;
				if (node.value.type === "FunctionExpression") {
					let functionToken = sourceCode.getTokens(node.value).find((token) => token.type === "Keyword" && token.value === "function"), tokenBeforeParams = node.value.generator ? sourceCode.getTokenAfter(functionToken) : functionToken;
					return fixer.replaceTextRange(fixRange, methodPrefix + sourceCode.text.slice(tokenBeforeParams.range[1], node.value.range[1]));
				}
				let arrowToken = sourceCode.getTokenBefore(node.value.body, astUtils.isArrowToken), fnBody = sourceCode.text.slice(arrowToken.range[1], node.value.range[1]), sliceStart = sourceCode.getFirstToken(node.value, { skip: node.value.async ? 1 : 0 }).range[0], sliceEnd = sourceCode.getTokenBefore(arrowToken).range[1], shouldAddParens = node.value.params.length === 1 && node.value.params[0].range[0] === sliceStart, oldParamText = sourceCode.text.slice(sliceStart, sliceEnd), newParamText = shouldAddParens ? `(${oldParamText})` : oldParamText;
				return fixer.replaceTextRange(fixRange, methodPrefix + newParamText + fnBody);
			}
			/**
			* Fixes a FunctionExpression node by making it into a longform property.
			* @param {SourceCodeFixer} fixer The fixer object
			* @param {ASTNode} node A `Property` node that has a `FunctionExpression` as its value
			* @returns {Object} A fix for this node
			*/
			function makeFunctionLongform(fixer, node) {
				let firstKeyToken = node.computed ? sourceCode.getTokens(node).find((token) => token.value === "[") : sourceCode.getFirstToken(node.key), lastKeyToken = node.computed ? sourceCode.getTokensBetween(node.key, node.value).find((token) => token.value === "]") : sourceCode.getLastToken(node.key), keyText = sourceCode.text.slice(firstKeyToken.range[0], lastKeyToken.range[1]), functionHeader = "function";
				return node.value.async && (functionHeader = `async ${functionHeader}`), node.value.generator && (functionHeader = `${functionHeader}*`), fixer.replaceTextRange([node.range[0], lastKeyToken.range[1]], `${keyText}: ${functionHeader}`);
			}
			let lexicalScopeStack = [], arrowsWithLexicalIdentifiers = /* @__PURE__ */ new WeakSet(), argumentsIdentifiers = /* @__PURE__ */ new WeakSet();
			/**
			* Enters a function. This creates a new lexical identifier scope, so a new Set of arrow functions is pushed onto the stack.
			* Also, this marks all `arguments` identifiers so that they can be detected later.
			* @param {ASTNode} node The node representing the function.
			* @returns {void}
			*/
			function enterFunction(node) {
				lexicalScopeStack.unshift(/* @__PURE__ */ new Set()), sourceCode.getScope(node).variables.filter((variable) => variable.name === "arguments").forEach((variable) => {
					variable.references.map((ref) => ref.identifier).forEach((identifier) => argumentsIdentifiers.add(identifier));
				});
			}
			/**
			* Exits a function. This pops the current set of arrow functions off the lexical scope stack.
			* @returns {void}
			*/
			function exitFunction() {
				lexicalScopeStack.shift();
			}
			/**
			* Marks the current function as having a lexical keyword. This implies that all arrow functions
			* in the current lexical scope contain a reference to this lexical keyword.
			* @returns {void}
			*/
			function reportLexicalIdentifier() {
				lexicalScopeStack[0].forEach((arrowFunction) => arrowsWithLexicalIdentifiers.add(arrowFunction));
			}
			return {
				Program: enterFunction,
				FunctionDeclaration: enterFunction,
				FunctionExpression: enterFunction,
				"Program:exit": exitFunction,
				"FunctionDeclaration:exit": exitFunction,
				"FunctionExpression:exit": exitFunction,
				ArrowFunctionExpression(node) {
					lexicalScopeStack[0].add(node);
				},
				"ArrowFunctionExpression:exit"(node) {
					lexicalScopeStack[0].delete(node);
				},
				ThisExpression: reportLexicalIdentifier,
				Super: reportLexicalIdentifier,
				MetaProperty(node) {
					node.meta.name === "new" && node.property.name === "target" && reportLexicalIdentifier();
				},
				Identifier(node) {
					argumentsIdentifiers.has(node) && reportLexicalIdentifier();
				},
				ObjectExpression(node) {
					APPLY_CONSISTENT ? checkConsistency(node, !1) : APPLY_CONSISTENT_AS_NEEDED && checkConsistency(node, !0);
				},
				"Property:exit"(node) {
					let isConciseProperty = node.method || node.shorthand;
					if (node.parent.type !== "ObjectPattern" && !(node.kind === "get" || node.kind === "set") && !(node.computed && node.value.type !== "FunctionExpression" && node.value.type !== "ArrowFunctionExpression")) {
						if (isConciseProperty) if (node.method && (APPLY_NEVER || AVOID_QUOTES && isStringLiteral(node.key))) {
							let messageId = APPLY_NEVER ? "expectedMethodLongform" : "expectedLiteralMethodLongform";
							context.report({
								node,
								messageId,
								fix: (fixer) => makeFunctionLongform(fixer, node)
							});
						} else APPLY_NEVER && context.report({
							node,
							messageId: "expectedPropertyLongform",
							fix: (fixer) => fixer.insertTextAfter(node.key, `: ${node.key.name}`)
						});
						else if (APPLY_TO_METHODS && !node.value.id && (node.value.type === "FunctionExpression" || node.value.type === "ArrowFunctionExpression")) {
							if (IGNORE_CONSTRUCTORS && node.key.type === "Identifier" && isConstructor(node.key.name)) return;
							if (METHODS_IGNORE_PATTERN) {
								let propertyName = astUtils.getStaticPropertyName(node);
								if (propertyName !== null && METHODS_IGNORE_PATTERN.test(propertyName)) return;
							}
							if (AVOID_QUOTES && isStringLiteral(node.key)) return;
							(node.value.type === "FunctionExpression" || node.value.type === "ArrowFunctionExpression" && node.value.body.type === "BlockStatement" && AVOID_EXPLICIT_RETURN_ARROWS && !arrowsWithLexicalIdentifiers.has(node.value)) && context.report({
								node,
								messageId: "expectedMethodShorthand",
								fix: (fixer) => makeFunctionShorthand(fixer, node)
							});
						} else if (node.value.type === "Identifier" && node.key.name === node.value.name && APPLY_TO_PROPS) {
							if (sourceCode.getCommentsInside(node).some((comment) => comment.type === "Block" && JSDOC_COMMENT_REGEX.test(comment.value) && comment.value.includes("@type"))) return;
							context.report({
								node,
								messageId: "expectedPropertyShorthand",
								fix(fixer) {
									return sourceCode.getCommentsInside(node).length > 0 ? null : fixer.replaceText(node, node.value.name);
								}
							});
						} else if (node.value.type === "Identifier" && node.key.type === "Literal" && node.key.value === node.value.name && APPLY_TO_PROPS) {
							if (AVOID_QUOTES || sourceCode.getCommentsInside(node).some((comment) => comment.type === "Block" && comment.value.startsWith("*") && comment.value.includes("@type"))) return;
							context.report({
								node,
								messageId: "expectedPropertyShorthand",
								fix(fixer) {
									return sourceCode.getCommentsInside(node).length > 0 ? null : fixer.replaceText(node, node.value.name);
								}
							});
						}
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/object-shorthand.cjs
module.exports = require_object_shorthand().create;
//#endregion
