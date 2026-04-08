const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/indent.js
/**
* @fileoverview This rule sets a specific indentation style and width for your code
*
* @author Teddy Katz
* @author Vitaly Puzrin
* @author Gyandeep Singh
* @deprecated in ESLint v8.53.0
*/
var require_indent = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), KNOWN_NODES = new Set(/* @__PURE__ */ "AssignmentExpression.AssignmentPattern.ArrayExpression.ArrayPattern.ArrowFunctionExpression.AwaitExpression.BlockStatement.BinaryExpression.BreakStatement.CallExpression.CatchClause.ChainExpression.ClassBody.ClassDeclaration.ClassExpression.ConditionalExpression.ContinueStatement.DoWhileStatement.DebuggerStatement.EmptyStatement.ExperimentalRestProperty.ExperimentalSpreadProperty.ExpressionStatement.ForStatement.ForInStatement.ForOfStatement.FunctionDeclaration.FunctionExpression.Identifier.IfStatement.Literal.LabeledStatement.LogicalExpression.MemberExpression.MetaProperty.MethodDefinition.NewExpression.ObjectExpression.ObjectPattern.PrivateIdentifier.Program.Property.PropertyDefinition.RestElement.ReturnStatement.SequenceExpression.SpreadElement.StaticBlock.Super.SwitchCase.SwitchStatement.TaggedTemplateExpression.TemplateElement.TemplateLiteral.ThisExpression.ThrowStatement.TryStatement.UnaryExpression.UpdateExpression.VariableDeclaration.VariableDeclarator.WhileStatement.WithStatement.YieldExpression.JSXFragment.JSXOpeningFragment.JSXClosingFragment.JSXIdentifier.JSXNamespacedName.JSXMemberExpression.JSXEmptyExpression.JSXExpressionContainer.JSXElement.JSXClosingElement.JSXOpeningElement.JSXAttribute.JSXSpreadAttribute.JSXText.ExportDefaultDeclaration.ExportNamedDeclaration.ExportAllDeclaration.ExportSpecifier.ImportDeclaration.ImportSpecifier.ImportDefaultSpecifier.ImportNamespaceSpecifier.ImportExpression".split("."));
	/**
	* A mutable map that stores (key, value) pairs. The keys are numeric indices, and must be unique.
	* This is intended to be a generic wrapper around a map with non-negative integer keys, so that the underlying implementation
	* can easily be swapped out.
	*/
	var IndexMap = class {
		/**
		* Creates an empty map
		* @param {number} maxKey The maximum key
		*/
		constructor(maxKey) {
			this._values = Array(maxKey + 1);
		}
		/**
		* Inserts an entry into the map.
		* @param {number} key The entry's key
		* @param {any} value The entry's value
		* @returns {void}
		*/
		insert(key, value) {
			this._values[key] = value;
		}
		/**
		* Finds the value of the entry with the largest key less than or equal to the provided key
		* @param {number} key The provided key
		* @returns {*|undefined} The value of the found entry, or undefined if no such entry exists.
		*/
		findLastNotAfter(key) {
			let values = this._values;
			for (let index = key; index >= 0; index--) {
				let value = values[index];
				if (value) return value;
			}
		}
		/**
		* Deletes all of the keys in the interval [start, end)
		* @param {number} start The start of the range
		* @param {number} end The end of the range
		* @returns {void}
		*/
		deleteRange(start, end) {
			this._values.fill(void 0, start, end);
		}
	}, TokenInfo = class {
		/**
		* @param {SourceCode} sourceCode A SourceCode object
		*/
		constructor(sourceCode) {
			this.sourceCode = sourceCode, this.firstTokensByLineNumber = /* @__PURE__ */ new Map();
			let tokens = sourceCode.tokensAndComments;
			for (let i = 0; i < tokens.length; i++) {
				let token = tokens[i];
				this.firstTokensByLineNumber.has(token.loc.start.line) || this.firstTokensByLineNumber.set(token.loc.start.line, token), !this.firstTokensByLineNumber.has(token.loc.end.line) && sourceCode.text.slice(token.range[1] - token.loc.end.column, token.range[1]).trim() && this.firstTokensByLineNumber.set(token.loc.end.line, token);
			}
		}
		/**
		* Gets the first token on a given token's line
		* @param {Token|ASTNode} token a node or token
		* @returns {Token} The first token on the given line
		*/
		getFirstTokenOfLine(token) {
			return this.firstTokensByLineNumber.get(token.loc.start.line);
		}
		/**
		* Determines whether a token is the first token in its line
		* @param {Token} token The token
		* @returns {boolean} `true` if the token is the first on its line
		*/
		isFirstTokenOfLine(token) {
			return this.getFirstTokenOfLine(token) === token;
		}
		/**
		* Get the actual indent of a token
		* @param {Token} token Token to examine. This should be the first token on its line.
		* @returns {string} The indentation characters that precede the token
		*/
		getTokenIndent(token) {
			return this.sourceCode.text.slice(token.range[0] - token.loc.start.column, token.range[0]);
		}
	}, OffsetStorage = class {
		/**
		* @param {TokenInfo} tokenInfo a TokenInfo instance
		* @param {number} indentSize The desired size of each indentation level
		* @param {string} indentType The indentation character
		* @param {number} maxIndex The maximum end index of any token
		*/
		constructor(tokenInfo, indentSize, indentType, maxIndex) {
			this._tokenInfo = tokenInfo, this._indentSize = indentSize, this._indentType = indentType, this._indexMap = new IndexMap(maxIndex), this._indexMap.insert(0, {
				offset: 0,
				from: null,
				force: !1
			}), this._lockedFirstTokens = /* @__PURE__ */ new WeakMap(), this._desiredIndentCache = /* @__PURE__ */ new WeakMap(), this._ignoredTokens = /* @__PURE__ */ new WeakSet();
		}
		_getOffsetDescriptor(token) {
			return this._indexMap.findLastNotAfter(token.range[0]);
		}
		/**
		* Sets the offset column of token B to match the offset column of token A.
		* - **WARNING**: This matches a *column*, even if baseToken is not the first token on its line. In
		* most cases, `setDesiredOffset` should be used instead.
		* @param {Token} baseToken The first token
		* @param {Token} offsetToken The second token, whose offset should be matched to the first token
		* @returns {void}
		*/
		matchOffsetOf(baseToken, offsetToken) {
			this._lockedFirstTokens.set(offsetToken, baseToken);
		}
		/**
		* Sets the desired offset of a token.
		*
		* This uses a line-based offset collapsing behavior to handle tokens on the same line.
		* For example, consider the following two cases:
		*
		* (
		*     [
		*         bar
		*     ]
		* )
		*
		* ([
		*     bar
		* ])
		*
		* Based on the first case, it's clear that the `bar` token needs to have an offset of 1 indent level (4 spaces) from
		* the `[` token, and the `[` token has to have an offset of 1 indent level from the `(` token. Since the `(` token is
		* the first on its line (with an indent of 0 spaces), the `bar` token needs to be offset by 2 indent levels (8 spaces)
		* from the start of its line.
		*
		* However, in the second case `bar` should only be indented by 4 spaces. This is because the offset of 1 indent level
		* between the `(` and the `[` tokens gets "collapsed" because the two tokens are on the same line. As a result, the
		* `(` token is mapped to the `[` token with an offset of 0, and the rule correctly decides that `bar` should be indented
		* by 1 indent level from the start of the line.
		*
		* This is useful because rule listeners can usually just call `setDesiredOffset` for all the tokens in the node,
		* without needing to check which lines those tokens are on.
		*
		* Note that since collapsing only occurs when two tokens are on the same line, there are a few cases where non-intuitive
		* behavior can occur. For example, consider the following cases:
		*
		* foo(
		* ).
		*     bar(
		*         baz
		*     )
		*
		* foo(
		* ).bar(
		*     baz
		* )
		*
		* Based on the first example, it would seem that `bar` should be offset by 1 indent level from `foo`, and `baz`
		* should be offset by 1 indent level from `bar`. However, this is not correct, because it would result in `baz`
		* being indented by 2 indent levels in the second case (since `foo`, `bar`, and `baz` are all on separate lines, no
		* collapsing would occur).
		*
		* Instead, the correct way would be to offset `baz` by 1 level from `bar`, offset `bar` by 1 level from the `)`, and
		* offset the `)` by 0 levels from `foo`. This ensures that the offset between `bar` and the `)` are correctly collapsed
		* in the second case.
		* @param {Token} token The token
		* @param {Token} fromToken The token that `token` should be offset from
		* @param {number} offset The desired indent level
		* @returns {void}
		*/
		setDesiredOffset(token, fromToken, offset) {
			return this.setDesiredOffsets(token.range, fromToken, offset);
		}
		/**
		* Sets the desired offset of all tokens in a range
		* It's common for node listeners in this file to need to apply the same offset to a large, contiguous range of tokens.
		* Moreover, the offset of any given token is usually updated multiple times (roughly once for each node that contains
		* it). This means that the offset of each token is updated O(AST depth) times.
		* It would not be performant to store and update the offsets for each token independently, because the rule would end
		* up having a time complexity of O(number of tokens * AST depth), which is quite slow for large files.
		*
		* Instead, the offset tree is represented as a collection of contiguous offset ranges in a file. For example, the following
		* list could represent the state of the offset tree at a given point:
		*
		* - Tokens starting in the interval [0, 15) are aligned with the beginning of the file
		* - Tokens starting in the interval [15, 30) are offset by 1 indent level from the `bar` token
		* - Tokens starting in the interval [30, 43) are offset by 1 indent level from the `foo` token
		* - Tokens starting in the interval [43, 820) are offset by 2 indent levels from the `bar` token
		* - Tokens starting in the interval [820, ∞) are offset by 1 indent level from the `baz` token
		*
		* The `setDesiredOffsets` methods inserts ranges like the ones above. The third line above would be inserted by using:
		* `setDesiredOffsets([30, 43], fooToken, 1);`
		* @param {[number, number]} range A [start, end] pair. All tokens with range[0] <= token.start < range[1] will have the offset applied.
		* @param {Token} fromToken The token that this is offset from
		* @param {number} offset The desired indent level
		* @param {boolean} force `true` if this offset should not use the normal collapsing behavior. This should almost always be false.
		* @returns {void}
		*/
		setDesiredOffsets(range, fromToken, offset, force) {
			let descriptorToInsert = {
				offset,
				from: fromToken,
				force
			}, descriptorAfterRange = this._indexMap.findLastNotAfter(range[1]), fromTokenIsInRange = fromToken && fromToken.range[0] >= range[0] && fromToken.range[1] <= range[1], fromTokenDescriptor = fromTokenIsInRange && this._getOffsetDescriptor(fromToken);
			this._indexMap.deleteRange(range[0] + 1, range[1]), this._indexMap.insert(range[0], descriptorToInsert), fromTokenIsInRange && (this._indexMap.insert(fromToken.range[0], fromTokenDescriptor), this._indexMap.insert(fromToken.range[1], descriptorToInsert)), this._indexMap.insert(range[1], descriptorAfterRange);
		}
		/**
		* Gets the desired indent of a token
		* @param {Token} token The token
		* @returns {string} The desired indent of the token
		*/
		getDesiredIndent(token) {
			if (!this._desiredIndentCache.has(token)) if (this._ignoredTokens.has(token)) this._desiredIndentCache.set(token, this._tokenInfo.getTokenIndent(token));
			else if (this._lockedFirstTokens.has(token)) {
				let firstToken = this._lockedFirstTokens.get(token);
				this._desiredIndentCache.set(token, this.getDesiredIndent(this._tokenInfo.getFirstTokenOfLine(firstToken)) + this._indentType.repeat(firstToken.loc.start.column - this._tokenInfo.getFirstTokenOfLine(firstToken).loc.start.column));
			} else {
				let offsetInfo = this._getOffsetDescriptor(token), offset = offsetInfo.from && offsetInfo.from.loc.start.line === token.loc.start.line && !/^\s*?\n/u.test(token.value) && !offsetInfo.force ? 0 : offsetInfo.offset * this._indentSize;
				this._desiredIndentCache.set(token, (offsetInfo.from ? this.getDesiredIndent(offsetInfo.from) : "") + this._indentType.repeat(offset));
			}
			return this._desiredIndentCache.get(token);
		}
		/**
		* Ignores a token, preventing it from being reported.
		* @param {Token} token The token
		* @returns {void}
		*/
		ignoreToken(token) {
			this._tokenInfo.isFirstTokenOfLine(token) && this._ignoredTokens.add(token);
		}
		/**
		* Gets the first token that the given token's indentation is dependent on
		* @param {Token} token The token
		* @returns {Token} The token that the given token depends on, or `null` if the given token is at the top level
		*/
		getFirstDependency(token) {
			return this._getOffsetDescriptor(token).from;
		}
	};
	let ELEMENT_LIST_SCHEMA = { oneOf: [{
		type: "integer",
		minimum: 0
	}, { enum: ["first", "off"] }] };
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
						name: "indent",
						url: "https://eslint.style/rules/indent"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent indentation",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/indent"
			},
			fixable: "whitespace",
			schema: [{ oneOf: [{ enum: ["tab"] }, {
				type: "integer",
				minimum: 0
			}] }, {
				type: "object",
				properties: {
					SwitchCase: {
						type: "integer",
						minimum: 0,
						default: 0
					},
					VariableDeclarator: { oneOf: [ELEMENT_LIST_SCHEMA, {
						type: "object",
						properties: {
							var: ELEMENT_LIST_SCHEMA,
							let: ELEMENT_LIST_SCHEMA,
							const: ELEMENT_LIST_SCHEMA
						},
						additionalProperties: !1
					}] },
					outerIIFEBody: { oneOf: [{
						type: "integer",
						minimum: 0
					}, { enum: ["off"] }] },
					MemberExpression: { oneOf: [{
						type: "integer",
						minimum: 0
					}, { enum: ["off"] }] },
					FunctionDeclaration: {
						type: "object",
						properties: {
							parameters: ELEMENT_LIST_SCHEMA,
							body: {
								type: "integer",
								minimum: 0
							}
						},
						additionalProperties: !1
					},
					FunctionExpression: {
						type: "object",
						properties: {
							parameters: ELEMENT_LIST_SCHEMA,
							body: {
								type: "integer",
								minimum: 0
							}
						},
						additionalProperties: !1
					},
					StaticBlock: {
						type: "object",
						properties: { body: {
							type: "integer",
							minimum: 0
						} },
						additionalProperties: !1
					},
					CallExpression: {
						type: "object",
						properties: { arguments: ELEMENT_LIST_SCHEMA },
						additionalProperties: !1
					},
					ArrayExpression: ELEMENT_LIST_SCHEMA,
					ObjectExpression: ELEMENT_LIST_SCHEMA,
					ImportDeclaration: ELEMENT_LIST_SCHEMA,
					flatTernaryExpressions: {
						type: "boolean",
						default: !1
					},
					offsetTernaryExpressions: {
						type: "boolean",
						default: !1
					},
					ignoredNodes: {
						type: "array",
						items: {
							type: "string",
							not: { pattern: ":exit$" }
						}
					},
					ignoreComments: {
						type: "boolean",
						default: !1
					}
				},
				additionalProperties: !1
			}],
			messages: { wrongIndentation: "Expected indentation of {{expected}} but found {{actual}}." }
		},
		create(context) {
			let indentType = "space", indentSize = 4, options = {
				SwitchCase: 0,
				VariableDeclarator: {
					var: 1,
					let: 1,
					const: 1
				},
				outerIIFEBody: 1,
				FunctionDeclaration: {
					parameters: 1,
					body: 1
				},
				FunctionExpression: {
					parameters: 1,
					body: 1
				},
				StaticBlock: { body: 1 },
				CallExpression: { arguments: 1 },
				MemberExpression: 1,
				ArrayExpression: 1,
				ObjectExpression: 1,
				ImportDeclaration: 1,
				flatTernaryExpressions: !1,
				ignoredNodes: [],
				ignoreComments: !1
			};
			context.options.length && (context.options[0] === "tab" ? (indentSize = 1, indentType = "tab") : (indentSize = context.options[0], indentType = "space"), context.options[1] && (Object.assign(options, context.options[1]), (typeof options.VariableDeclarator == "number" || options.VariableDeclarator === "first") && (options.VariableDeclarator = {
				var: options.VariableDeclarator,
				let: options.VariableDeclarator,
				const: options.VariableDeclarator
			})));
			let sourceCode = context.sourceCode, tokenInfo = new TokenInfo(sourceCode), offsets = new OffsetStorage(tokenInfo, indentSize, indentType === "space" ? " " : "	", sourceCode.text.length), parameterParens = /* @__PURE__ */ new WeakSet();
			/**
			* Creates an error message for a line, given the expected/actual indentation.
			* @param {number} expectedAmount The expected amount of indentation characters for this line
			* @param {number} actualSpaces The actual number of indentation spaces that were found on this line
			* @param {number} actualTabs The actual number of indentation tabs that were found on this line
			* @returns {string} An error message for this line
			*/
			function createErrorMessageData(expectedAmount, actualSpaces, actualTabs) {
				let expectedStatement = `${expectedAmount} ${indentType}${expectedAmount === 1 ? "" : "s"}`, foundSpacesWord = `space${actualSpaces === 1 ? "" : "s"}`, foundTabsWord = `tab${actualTabs === 1 ? "" : "s"}`, foundStatement;
				return foundStatement = actualSpaces > 0 ? indentType === "space" ? actualSpaces : `${actualSpaces} ${foundSpacesWord}` : actualTabs > 0 ? indentType === "tab" ? actualTabs : `${actualTabs} ${foundTabsWord}` : "0", {
					expected: expectedStatement,
					actual: foundStatement
				};
			}
			/**
			* Reports a given indent violation
			* @param {Token} token Token violating the indent rule
			* @param {string} neededIndent Expected indentation string
			* @returns {void}
			*/
			function report(token, neededIndent) {
				let actualIndent = Array.from(tokenInfo.getTokenIndent(token)), numSpaces = actualIndent.filter((char) => char === " ").length, numTabs = actualIndent.filter((char) => char === "	").length;
				context.report({
					node: token,
					messageId: "wrongIndentation",
					data: createErrorMessageData(neededIndent.length, numSpaces, numTabs),
					loc: {
						start: {
							line: token.loc.start.line,
							column: 0
						},
						end: {
							line: token.loc.start.line,
							column: token.loc.start.column
						}
					},
					fix(fixer) {
						let range = [token.range[0] - token.loc.start.column, token.range[0]], newText = neededIndent;
						return fixer.replaceTextRange(range, newText);
					}
				});
			}
			/**
			* Checks if a token's indentation is correct
			* @param {Token} token Token to examine
			* @param {string} desiredIndent Desired indentation of the string
			* @returns {boolean} `true` if the token's indentation is correct
			*/
			function validateTokenIndent(token, desiredIndent) {
				let indentation = tokenInfo.getTokenIndent(token);
				return indentation === desiredIndent || indentation.includes(" ") && indentation.includes("	");
			}
			/**
			* Check to see if the node is a file level IIFE
			* @param {ASTNode} node The function node to check.
			* @returns {boolean} True if the node is the outer IIFE
			*/
			function isOuterIIFE(node) {
				if (!node.parent || node.parent.type !== "CallExpression" || node.parent.callee !== node) return !1;
				let statement = node.parent && node.parent.parent;
				for (; statement.type === "UnaryExpression" && [
					"!",
					"~",
					"+",
					"-"
				].includes(statement.operator) || statement.type === "AssignmentExpression" || statement.type === "LogicalExpression" || statement.type === "SequenceExpression" || statement.type === "VariableDeclarator";) statement = statement.parent;
				return (statement.type === "ExpressionStatement" || statement.type === "VariableDeclaration") && statement.parent.type === "Program";
			}
			/**
			* Counts the number of linebreaks that follow the last non-whitespace character in a string
			* @param {string} string The string to check
			* @returns {number} The number of JavaScript linebreaks that follow the last non-whitespace character,
			* or the total number of linebreaks if the string is all whitespace.
			*/
			function countTrailingLinebreaks(string) {
				let linebreakMatches = string.match(/\s*$/u)[0].match(astUtils.createGlobalLinebreakMatcher());
				return linebreakMatches === null ? 0 : linebreakMatches.length;
			}
			/**
			* Check indentation for lists of elements (arrays, objects, function params)
			* @param {ASTNode[]} elements List of elements that should be offset
			* @param {Token} startToken The start token of the list that element should be aligned against, e.g. '['
			* @param {Token} endToken The end token of the list, e.g. ']'
			* @param {number|string} offset The amount that the elements should be offset
			* @returns {void}
			*/
			function addElementListIndent(elements, startToken, endToken, offset) {
				/**
				* Gets the first token of a given element, including surrounding parentheses.
				* @param {ASTNode} element A node in the `elements` list
				* @returns {Token} The first token of this element
				*/
				function getFirstToken(element) {
					let token = sourceCode.getTokenBefore(element);
					for (; astUtils.isOpeningParenToken(token) && token !== startToken;) token = sourceCode.getTokenBefore(token);
					return sourceCode.getTokenAfter(token);
				}
				offsets.setDesiredOffsets([startToken.range[1], endToken.range[0]], startToken, typeof offset == "number" ? offset : 1), offsets.setDesiredOffset(endToken, startToken, 0), !(offset === "first" && elements.length && !elements[0]) && elements.forEach((element, index) => {
					if (element && (offset === "off" && offsets.ignoreToken(getFirstToken(element)), index !== 0)) if (offset === "first" && tokenInfo.isFirstTokenOfLine(getFirstToken(element))) offsets.matchOffsetOf(getFirstToken(elements[0]), getFirstToken(element));
					else {
						let previousElement = elements[index - 1], firstTokenOfPreviousElement = previousElement && getFirstToken(previousElement), previousElementLastToken = previousElement && sourceCode.getLastToken(previousElement);
						previousElement && previousElementLastToken.loc.end.line - countTrailingLinebreaks(previousElementLastToken.value) > startToken.loc.end.line && offsets.setDesiredOffsets([previousElement.range[1], element.range[1]], firstTokenOfPreviousElement, 0);
					}
				});
			}
			/**
			* Check and decide whether to check for indentation for blockless nodes
			* Scenarios are for or while statements without braces around them
			* @param {ASTNode} node node to examine
			* @returns {void}
			*/
			function addBlocklessNodeIndent(node) {
				if (node.type !== "BlockStatement") {
					let lastParentToken = sourceCode.getTokenBefore(node, astUtils.isNotOpeningParenToken), firstBodyToken = sourceCode.getFirstToken(node), lastBodyToken = sourceCode.getLastToken(node);
					for (; astUtils.isOpeningParenToken(sourceCode.getTokenBefore(firstBodyToken)) && astUtils.isClosingParenToken(sourceCode.getTokenAfter(lastBodyToken));) firstBodyToken = sourceCode.getTokenBefore(firstBodyToken), lastBodyToken = sourceCode.getTokenAfter(lastBodyToken);
					offsets.setDesiredOffsets([firstBodyToken.range[0], lastBodyToken.range[1]], lastParentToken, 1);
				}
			}
			/**
			* Checks the indentation for nodes that are like function calls (`CallExpression` and `NewExpression`)
			* @param {ASTNode} node A CallExpression or NewExpression node
			* @returns {void}
			*/
			function addFunctionCallIndent(node) {
				let openingParen;
				openingParen = node.arguments.length ? sourceCode.getFirstTokenBetween(node.callee, node.arguments[0], astUtils.isOpeningParenToken) : sourceCode.getLastToken(node, 1);
				let closingParen = sourceCode.getLastToken(node);
				if (parameterParens.add(openingParen), parameterParens.add(closingParen), node.optional) {
					let dotToken = sourceCode.getTokenAfter(node.callee, astUtils.isQuestionDotToken), calleeParenCount = sourceCode.getTokensBetween(node.callee, dotToken, { filter: astUtils.isClosingParenToken }).length, firstTokenOfCallee = calleeParenCount ? sourceCode.getTokenBefore(node.callee, { skip: calleeParenCount - 1 }) : sourceCode.getFirstToken(node.callee), lastTokenOfCallee = sourceCode.getTokenBefore(dotToken), offsetBase = lastTokenOfCallee.loc.end.line === openingParen.loc.start.line ? lastTokenOfCallee : firstTokenOfCallee;
					offsets.setDesiredOffset(dotToken, offsetBase, 1);
				}
				let offsetAfterToken = node.callee.type === "TaggedTemplateExpression" ? sourceCode.getFirstToken(node.callee.quasi) : openingParen, offsetToken = sourceCode.getTokenBefore(offsetAfterToken);
				offsets.setDesiredOffset(openingParen, offsetToken, 0), addElementListIndent(node.arguments, openingParen, closingParen, options.CallExpression.arguments);
			}
			/**
			* Checks the indentation of parenthesized values, given a list of tokens in a program
			* @param {Token[]} tokens A list of tokens
			* @returns {void}
			*/
			function addParensIndent(tokens) {
				let parenStack = [], parenPairs = [];
				for (let i = 0; i < tokens.length; i++) {
					let nextToken = tokens[i];
					astUtils.isOpeningParenToken(nextToken) ? parenStack.push(nextToken) : astUtils.isClosingParenToken(nextToken) && parenPairs.push({
						left: parenStack.pop(),
						right: nextToken
					});
				}
				for (let i = parenPairs.length - 1; i >= 0; i--) {
					let leftParen = parenPairs[i].left, rightParen = parenPairs[i].right;
					if (!parameterParens.has(leftParen) && !parameterParens.has(rightParen)) {
						let parenthesizedTokens = new Set(sourceCode.getTokensBetween(leftParen, rightParen));
						parenthesizedTokens.forEach((token) => {
							parenthesizedTokens.has(offsets.getFirstDependency(token)) || offsets.setDesiredOffset(token, leftParen, 1);
						});
					}
					offsets.setDesiredOffset(rightParen, leftParen, 0);
				}
			}
			/**
			* Ignore all tokens within an unknown node whose offset do not depend
			* on another token's offset within the unknown node
			* @param {ASTNode} node Unknown Node
			* @returns {void}
			*/
			function ignoreNode(node) {
				let unknownNodeTokens = new Set(sourceCode.getTokens(node, { includeComments: !0 }));
				unknownNodeTokens.forEach((token) => {
					if (!unknownNodeTokens.has(offsets.getFirstDependency(token))) {
						let firstTokenOfLine = tokenInfo.getFirstTokenOfLine(token);
						token === firstTokenOfLine ? offsets.ignoreToken(token) : offsets.setDesiredOffset(token, firstTokenOfLine, 0);
					}
				});
			}
			/**
			* Check whether the given token is on the first line of a statement.
			* @param {Token} token The token to check.
			* @param {ASTNode} leafNode The expression node that the token belongs directly.
			* @returns {boolean} `true` if the token is on the first line of a statement.
			*/
			function isOnFirstLineOfStatement(token, leafNode) {
				let node = leafNode;
				for (; node.parent && !node.parent.type.endsWith("Statement") && !node.parent.type.endsWith("Declaration");) node = node.parent;
				return node = node.parent, !node || node.loc.start.line === token.loc.start.line;
			}
			/**
			* Check whether there are any blank (whitespace-only) lines between
			* two tokens on separate lines.
			* @param {Token} firstToken The first token.
			* @param {Token} secondToken The second token.
			* @returns {boolean} `true` if the tokens are on separate lines and
			*   there exists a blank line between them, `false` otherwise.
			*/
			function hasBlankLinesBetween(firstToken, secondToken) {
				let firstTokenLine = firstToken.loc.end.line, secondTokenLine = secondToken.loc.start.line;
				if (firstTokenLine === secondTokenLine || firstTokenLine === secondTokenLine - 1) return !1;
				for (let line = firstTokenLine + 1; line < secondTokenLine; ++line) if (!tokenInfo.firstTokensByLineNumber.has(line)) return !0;
				return !1;
			}
			let ignoredNodeFirstTokens = /* @__PURE__ */ new Set(), baseOffsetListeners = {
				"ArrayExpression, ArrayPattern"(node) {
					let openingBracket = sourceCode.getFirstToken(node), closingBracket = sourceCode.getTokenAfter([...node.elements].reverse().find((_) => _) || openingBracket, astUtils.isClosingBracketToken);
					addElementListIndent(node.elements, openingBracket, closingBracket, options.ArrayExpression);
				},
				"ObjectExpression, ObjectPattern"(node) {
					let openingCurly = sourceCode.getFirstToken(node), closingCurly = sourceCode.getTokenAfter(node.properties.length ? node.properties.at(-1) : openingCurly, astUtils.isClosingBraceToken);
					addElementListIndent(node.properties, openingCurly, closingCurly, options.ObjectExpression);
				},
				ArrowFunctionExpression(node) {
					let maybeOpeningParen = sourceCode.getFirstToken(node, { skip: node.async ? 1 : 0 });
					if (astUtils.isOpeningParenToken(maybeOpeningParen)) {
						let openingParen = maybeOpeningParen, closingParen = sourceCode.getTokenBefore(node.body, astUtils.isClosingParenToken);
						parameterParens.add(openingParen), parameterParens.add(closingParen), addElementListIndent(node.params, openingParen, closingParen, options.FunctionExpression.parameters);
					}
					addBlocklessNodeIndent(node.body);
				},
				AssignmentExpression(node) {
					let operator = sourceCode.getFirstTokenBetween(node.left, node.right, (token) => token.value === node.operator);
					offsets.setDesiredOffsets([operator.range[0], node.range[1]], sourceCode.getLastToken(node.left), 1), offsets.ignoreToken(operator), offsets.ignoreToken(sourceCode.getTokenAfter(operator));
				},
				"BinaryExpression, LogicalExpression"(node) {
					let operator = sourceCode.getFirstTokenBetween(node.left, node.right, (token) => token.value === node.operator), tokenAfterOperator = sourceCode.getTokenAfter(operator);
					offsets.ignoreToken(operator), offsets.ignoreToken(tokenAfterOperator), offsets.setDesiredOffset(tokenAfterOperator, operator, 0);
				},
				"BlockStatement, ClassBody"(node) {
					let blockIndentLevel;
					blockIndentLevel = node.parent && isOuterIIFE(node.parent) ? options.outerIIFEBody : node.parent && (node.parent.type === "FunctionExpression" || node.parent.type === "ArrowFunctionExpression") ? options.FunctionExpression.body : node.parent && node.parent.type === "FunctionDeclaration" ? options.FunctionDeclaration.body : 1, astUtils.STATEMENT_LIST_PARENTS.has(node.parent.type) || offsets.setDesiredOffset(sourceCode.getFirstToken(node), sourceCode.getFirstToken(node.parent), 0), addElementListIndent(node.body, sourceCode.getFirstToken(node), sourceCode.getLastToken(node), blockIndentLevel);
				},
				CallExpression: addFunctionCallIndent,
				"ClassDeclaration[superClass], ClassExpression[superClass]"(node) {
					let classToken = sourceCode.getFirstToken(node), extendsToken = sourceCode.getTokenBefore(node.superClass, astUtils.isNotOpeningParenToken);
					offsets.setDesiredOffsets([extendsToken.range[0], node.body.range[0]], classToken, 1);
				},
				ConditionalExpression(node) {
					let firstToken = sourceCode.getFirstToken(node);
					if (!options.flatTernaryExpressions || !astUtils.isTokenOnSameLine(node.test, node.consequent) || isOnFirstLineOfStatement(firstToken, node)) {
						let questionMarkToken = sourceCode.getFirstTokenBetween(node.test, node.consequent, (token) => token.type === "Punctuator" && token.value === "?"), colonToken = sourceCode.getFirstTokenBetween(node.consequent, node.alternate, (token) => token.type === "Punctuator" && token.value === ":"), firstConsequentToken = sourceCode.getTokenAfter(questionMarkToken), lastConsequentToken = sourceCode.getTokenBefore(colonToken), firstAlternateToken = sourceCode.getTokenAfter(colonToken);
						offsets.setDesiredOffset(questionMarkToken, firstToken, 1), offsets.setDesiredOffset(colonToken, firstToken, 1), offsets.setDesiredOffset(firstConsequentToken, firstToken, firstConsequentToken.type === "Punctuator" && options.offsetTernaryExpressions ? 2 : 1), lastConsequentToken.loc.end.line === firstAlternateToken.loc.start.line ? offsets.setDesiredOffset(firstAlternateToken, firstConsequentToken, 0) : offsets.setDesiredOffset(firstAlternateToken, firstToken, firstAlternateToken.type === "Punctuator" && options.offsetTernaryExpressions ? 2 : 1);
					}
				},
				"DoWhileStatement, WhileStatement, ForInStatement, ForOfStatement, WithStatement": (node) => addBlocklessNodeIndent(node.body),
				ExportNamedDeclaration(node) {
					if (node.declaration === null) {
						let closingCurly = sourceCode.getLastToken(node, astUtils.isClosingBraceToken);
						addElementListIndent(node.specifiers, sourceCode.getFirstToken(node, { skip: 1 }), closingCurly, 1), node.source && offsets.setDesiredOffsets([closingCurly.range[1], node.range[1]], sourceCode.getFirstToken(node), 1);
					}
				},
				ForStatement(node) {
					let forOpeningParen = sourceCode.getFirstToken(node, 1);
					node.init && offsets.setDesiredOffsets(node.init.range, forOpeningParen, 1), node.test && offsets.setDesiredOffsets(node.test.range, forOpeningParen, 1), node.update && offsets.setDesiredOffsets(node.update.range, forOpeningParen, 1), addBlocklessNodeIndent(node.body);
				},
				"FunctionDeclaration, FunctionExpression"(node) {
					let closingParen = sourceCode.getTokenBefore(node.body), openingParen = sourceCode.getTokenBefore(node.params.length ? node.params[0] : closingParen);
					parameterParens.add(openingParen), parameterParens.add(closingParen), addElementListIndent(node.params, openingParen, closingParen, options[node.type].parameters);
				},
				IfStatement(node) {
					addBlocklessNodeIndent(node.consequent), node.alternate && addBlocklessNodeIndent(node.alternate);
				},
				":matches(DoWhileStatement, ForStatement, ForInStatement, ForOfStatement, IfStatement, WhileStatement, WithStatement):exit"(node) {
					let nodesToCheck;
					node.type === "IfStatement" ? (nodesToCheck = [node.consequent], node.alternate && nodesToCheck.push(node.alternate)) : nodesToCheck = [node.body];
					for (let nodeToCheck of nodesToCheck) {
						let lastToken = sourceCode.getLastToken(nodeToCheck);
						if (astUtils.isSemicolonToken(lastToken)) {
							let tokenBeforeLast = sourceCode.getTokenBefore(lastToken), tokenAfterLast = sourceCode.getTokenAfter(lastToken);
							!astUtils.isTokenOnSameLine(tokenBeforeLast, lastToken) && tokenAfterLast && astUtils.isTokenOnSameLine(lastToken, tokenAfterLast) && offsets.setDesiredOffset(lastToken, sourceCode.getFirstToken(node), 0);
						}
					}
				},
				ImportDeclaration(node) {
					if (node.specifiers.some((specifier) => specifier.type === "ImportSpecifier")) {
						let openingCurly = sourceCode.getFirstToken(node, astUtils.isOpeningBraceToken), closingCurly = sourceCode.getLastToken(node, astUtils.isClosingBraceToken);
						addElementListIndent(node.specifiers.filter((specifier) => specifier.type === "ImportSpecifier"), openingCurly, closingCurly, options.ImportDeclaration);
					}
					let fromToken = sourceCode.getLastToken(node, (token) => token.type === "Identifier" && token.value === "from"), sourceToken = sourceCode.getLastToken(node, (token) => token.type === "String"), semiToken = sourceCode.getLastToken(node, (token) => token.type === "Punctuator" && token.value === ";");
					if (fromToken) {
						let end = semiToken && semiToken.range[1] === sourceToken.range[1] ? node.range[1] : sourceToken.range[1];
						offsets.setDesiredOffsets([fromToken.range[0], end], sourceCode.getFirstToken(node), 1);
					}
				},
				ImportExpression(node) {
					let openingParen = sourceCode.getFirstToken(node, 1), closingParen = sourceCode.getLastToken(node);
					parameterParens.add(openingParen), parameterParens.add(closingParen), offsets.setDesiredOffset(openingParen, sourceCode.getTokenBefore(openingParen), 0), addElementListIndent([node.source], openingParen, closingParen, options.CallExpression.arguments);
				},
				"MemberExpression, JSXMemberExpression, MetaProperty"(node) {
					let object = node.type === "MetaProperty" ? node.meta : node.object, firstNonObjectToken = sourceCode.getFirstTokenBetween(object, node.property, astUtils.isNotClosingParenToken), secondNonObjectToken = sourceCode.getTokenAfter(firstNonObjectToken), objectParenCount = sourceCode.getTokensBetween(object, node.property, { filter: astUtils.isClosingParenToken }).length, firstObjectToken = objectParenCount ? sourceCode.getTokenBefore(object, { skip: objectParenCount - 1 }) : sourceCode.getFirstToken(object), lastObjectToken = sourceCode.getTokenBefore(firstNonObjectToken), firstPropertyToken = node.computed ? firstNonObjectToken : secondNonObjectToken;
					node.computed && (offsets.setDesiredOffset(sourceCode.getLastToken(node), firstNonObjectToken, 0), offsets.setDesiredOffsets(node.property.range, firstNonObjectToken, 1));
					let offsetBase = lastObjectToken.loc.end.line === firstPropertyToken.loc.start.line ? lastObjectToken : firstObjectToken;
					typeof options.MemberExpression == "number" ? (offsets.setDesiredOffset(firstNonObjectToken, offsetBase, options.MemberExpression), offsets.setDesiredOffset(secondNonObjectToken, node.computed ? firstNonObjectToken : offsetBase, options.MemberExpression)) : (offsets.ignoreToken(firstNonObjectToken), offsets.ignoreToken(secondNonObjectToken), offsets.setDesiredOffset(firstNonObjectToken, offsetBase, 0), offsets.setDesiredOffset(secondNonObjectToken, firstNonObjectToken, 0));
				},
				NewExpression(node) {
					(node.arguments.length > 0 || astUtils.isClosingParenToken(sourceCode.getLastToken(node)) && astUtils.isOpeningParenToken(sourceCode.getLastToken(node, 1))) && addFunctionCallIndent(node);
				},
				Property(node) {
					if (!node.shorthand && !node.method && node.kind === "init") {
						let colon = sourceCode.getFirstTokenBetween(node.key, node.value, astUtils.isColonToken);
						offsets.ignoreToken(sourceCode.getTokenAfter(colon));
					}
				},
				PropertyDefinition(node) {
					let firstToken = sourceCode.getFirstToken(node), maybeSemicolonToken = sourceCode.getLastToken(node), keyLastToken;
					if (node.computed) {
						let bracketTokenL = sourceCode.getTokenBefore(node.key, astUtils.isOpeningBracketToken), bracketTokenR = keyLastToken = sourceCode.getTokenAfter(node.key, astUtils.isClosingBracketToken), keyRange = [bracketTokenL.range[1], bracketTokenR.range[0]];
						bracketTokenL !== firstToken && offsets.setDesiredOffset(bracketTokenL, firstToken, 0), offsets.setDesiredOffsets(keyRange, bracketTokenL, 1), offsets.setDesiredOffset(bracketTokenR, bracketTokenL, 0);
					} else {
						let idToken = keyLastToken = sourceCode.getFirstToken(node.key);
						idToken !== firstToken && offsets.setDesiredOffset(idToken, firstToken, 1);
					}
					if (node.value) {
						let eqToken = sourceCode.getTokenBefore(node.value, astUtils.isEqToken), valueToken = sourceCode.getTokenAfter(eqToken);
						offsets.setDesiredOffset(eqToken, keyLastToken, 1), offsets.setDesiredOffset(valueToken, eqToken, 1), astUtils.isSemicolonToken(maybeSemicolonToken) && offsets.setDesiredOffset(maybeSemicolonToken, eqToken, 1);
					} else astUtils.isSemicolonToken(maybeSemicolonToken) && offsets.setDesiredOffset(maybeSemicolonToken, keyLastToken, 1);
				},
				StaticBlock(node) {
					let openingCurly = sourceCode.getFirstToken(node, { skip: 1 }), closingCurly = sourceCode.getLastToken(node);
					addElementListIndent(node.body, openingCurly, closingCurly, options.StaticBlock.body);
				},
				SwitchStatement(node) {
					let openingCurly = sourceCode.getTokenAfter(node.discriminant, astUtils.isOpeningBraceToken), closingCurly = sourceCode.getLastToken(node);
					offsets.setDesiredOffsets([openingCurly.range[1], closingCurly.range[0]], openingCurly, options.SwitchCase), node.cases.length && sourceCode.getTokensBetween(node.cases.at(-1), closingCurly, {
						includeComments: !0,
						filter: astUtils.isCommentToken
					}).forEach((token) => offsets.ignoreToken(token));
				},
				SwitchCase(node) {
					if (!(node.consequent.length === 1 && node.consequent[0].type === "BlockStatement")) {
						let caseKeyword = sourceCode.getFirstToken(node), tokenAfterCurrentCase = sourceCode.getTokenAfter(node);
						offsets.setDesiredOffsets([caseKeyword.range[1], tokenAfterCurrentCase.range[0]], caseKeyword, 1);
					}
				},
				TemplateLiteral(node) {
					node.expressions.forEach((expression, index) => {
						let previousQuasi = node.quasis[index], nextQuasi = node.quasis[index + 1], tokenToAlignFrom = previousQuasi.loc.start.line === previousQuasi.loc.end.line ? sourceCode.getFirstToken(previousQuasi) : null;
						offsets.setDesiredOffsets([previousQuasi.range[1], nextQuasi.range[0]], tokenToAlignFrom, 1), offsets.setDesiredOffset(sourceCode.getFirstToken(nextQuasi), tokenToAlignFrom, 0);
					});
				},
				VariableDeclaration(node) {
					let variableIndent = Object.hasOwn(options.VariableDeclarator, node.kind) ? options.VariableDeclarator[node.kind] : 1, firstToken = sourceCode.getFirstToken(node), lastToken = sourceCode.getLastToken(node);
					if (options.VariableDeclarator[node.kind] === "first") {
						if (node.declarations.length > 1) {
							addElementListIndent(node.declarations, firstToken, lastToken, "first");
							return;
						}
						variableIndent = 1;
					}
					node.declarations.at(-1).loc.start.line > node.loc.start.line ? offsets.setDesiredOffsets(node.range, firstToken, variableIndent, !0) : offsets.setDesiredOffsets(node.range, firstToken, variableIndent), astUtils.isSemicolonToken(lastToken) && offsets.ignoreToken(lastToken);
				},
				VariableDeclarator(node) {
					if (node.init) {
						let equalOperator = sourceCode.getTokenBefore(node.init, astUtils.isNotOpeningParenToken), tokenAfterOperator = sourceCode.getTokenAfter(equalOperator);
						offsets.ignoreToken(equalOperator), offsets.ignoreToken(tokenAfterOperator), offsets.setDesiredOffsets([tokenAfterOperator.range[0], node.range[1]], equalOperator, 1), offsets.setDesiredOffset(equalOperator, sourceCode.getLastToken(node.id), 0);
					}
				},
				"JSXAttribute[value]"(node) {
					let equalsToken = sourceCode.getFirstTokenBetween(node.name, node.value, (token) => token.type === "Punctuator" && token.value === "=");
					offsets.setDesiredOffsets([equalsToken.range[0], node.value.range[1]], sourceCode.getFirstToken(node.name), 1);
				},
				JSXElement(node) {
					node.closingElement && addElementListIndent(node.children, sourceCode.getFirstToken(node.openingElement), sourceCode.getFirstToken(node.closingElement), 1);
				},
				JSXOpeningElement(node) {
					let firstToken = sourceCode.getFirstToken(node), closingToken;
					node.selfClosing ? (closingToken = sourceCode.getLastToken(node, { skip: 1 }), offsets.setDesiredOffset(sourceCode.getLastToken(node), closingToken, 0)) : closingToken = sourceCode.getLastToken(node), offsets.setDesiredOffsets(node.name.range, sourceCode.getFirstToken(node)), addElementListIndent(node.attributes, firstToken, closingToken, 1);
				},
				JSXClosingElement(node) {
					let firstToken = sourceCode.getFirstToken(node);
					offsets.setDesiredOffsets(node.name.range, firstToken, 1);
				},
				JSXFragment(node) {
					let firstOpeningToken = sourceCode.getFirstToken(node.openingFragment), firstClosingToken = sourceCode.getFirstToken(node.closingFragment);
					addElementListIndent(node.children, firstOpeningToken, firstClosingToken, 1);
				},
				JSXOpeningFragment(node) {
					let firstToken = sourceCode.getFirstToken(node), closingToken = sourceCode.getLastToken(node);
					offsets.setDesiredOffsets(node.range, firstToken, 1), offsets.matchOffsetOf(firstToken, closingToken);
				},
				JSXClosingFragment(node) {
					let firstToken = sourceCode.getFirstToken(node), slashToken = sourceCode.getLastToken(node, { skip: 1 }), closingToken = sourceCode.getLastToken(node), tokenToMatch = astUtils.isTokenOnSameLine(slashToken, closingToken) ? slashToken : closingToken;
					offsets.setDesiredOffsets(node.range, firstToken, 1), offsets.matchOffsetOf(firstToken, tokenToMatch);
				},
				JSXExpressionContainer(node) {
					let openingCurly = sourceCode.getFirstToken(node), closingCurly = sourceCode.getLastToken(node);
					offsets.setDesiredOffsets([openingCurly.range[1], closingCurly.range[0]], openingCurly, 1);
				},
				JSXSpreadAttribute(node) {
					let openingCurly = sourceCode.getFirstToken(node), closingCurly = sourceCode.getLastToken(node);
					offsets.setDesiredOffsets([openingCurly.range[1], closingCurly.range[0]], openingCurly, 1);
				},
				"*"(node) {
					let firstToken = sourceCode.getFirstToken(node);
					firstToken && !ignoredNodeFirstTokens.has(firstToken) && offsets.setDesiredOffsets(node.range, firstToken, 0);
				}
			}, listenerCallQueue = [], offsetListeners = {};
			for (let [selector, listener] of Object.entries(baseOffsetListeners)) offsetListeners[selector] = (node) => listenerCallQueue.push({
				listener,
				node
			});
			let ignoredNodes = /* @__PURE__ */ new Set();
			/**
			* Ignores a node
			* @param {ASTNode} node The node to ignore
			* @returns {void}
			*/
			function addToIgnoredNodes(node) {
				ignoredNodes.add(node), ignoredNodeFirstTokens.add(sourceCode.getFirstToken(node));
			}
			let ignoredNodeListeners = options.ignoredNodes.reduce((listeners, ignoredSelector) => Object.assign(listeners, { [ignoredSelector]: addToIgnoredNodes }), {});
			return Object.assign(offsetListeners, ignoredNodeListeners, {
				"*:exit"(node) {
					KNOWN_NODES.has(node.type) || addToIgnoredNodes(node);
				},
				"Program:exit"() {
					options.ignoreComments && sourceCode.getAllComments().forEach((comment) => offsets.ignoreToken(comment));
					for (let i = 0; i < listenerCallQueue.length; i++) {
						let nodeInfo = listenerCallQueue[i];
						ignoredNodes.has(nodeInfo.node) || nodeInfo.listener(nodeInfo.node);
					}
					ignoredNodes.forEach(ignoreNode), addParensIndent(sourceCode.ast.tokens);
					let precedingTokens = /* @__PURE__ */ new WeakMap();
					for (let i = 0; i < sourceCode.ast.comments.length; i++) {
						let comment = sourceCode.ast.comments[i], tokenOrCommentBefore = sourceCode.getTokenBefore(comment, { includeComments: !0 }), hasToken = precedingTokens.has(tokenOrCommentBefore) ? precedingTokens.get(tokenOrCommentBefore) : tokenOrCommentBefore;
						precedingTokens.set(comment, hasToken);
					}
					for (let i = 1; i < sourceCode.lines.length + 1; i++) {
						if (!tokenInfo.firstTokensByLineNumber.has(i)) continue;
						let firstTokenOfLine = tokenInfo.firstTokensByLineNumber.get(i);
						if (firstTokenOfLine.loc.start.line === i) {
							if (astUtils.isCommentToken(firstTokenOfLine)) {
								let tokenBefore = precedingTokens.get(firstTokenOfLine), tokenAfter = tokenBefore ? sourceCode.getTokenAfter(tokenBefore) : sourceCode.ast.tokens[0], mayAlignWithBefore = tokenBefore && !hasBlankLinesBetween(tokenBefore, firstTokenOfLine), mayAlignWithAfter = tokenAfter && !hasBlankLinesBetween(firstTokenOfLine, tokenAfter);
								if (tokenAfter && astUtils.isSemicolonToken(tokenAfter) && !astUtils.isTokenOnSameLine(firstTokenOfLine, tokenAfter) && offsets.setDesiredOffset(firstTokenOfLine, tokenAfter, 0), mayAlignWithBefore && validateTokenIndent(firstTokenOfLine, offsets.getDesiredIndent(tokenBefore)) || mayAlignWithAfter && validateTokenIndent(firstTokenOfLine, offsets.getDesiredIndent(tokenAfter))) continue;
							}
							validateTokenIndent(firstTokenOfLine, offsets.getDesiredIndent(firstTokenOfLine)) || report(firstTokenOfLine, offsets.getDesiredIndent(firstTokenOfLine));
						}
					}
				}
			});
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/indent.cjs
module.exports = require_indent().create;
//#endregion
