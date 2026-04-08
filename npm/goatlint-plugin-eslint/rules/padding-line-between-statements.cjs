const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/padding-line-between-statements.js
/**
* @fileoverview Rule to require or disallow newlines between statements
* @author Toru Nagashima
* @deprecated in ESLint v8.53.0
*/
var require_padding_line_between_statements = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), LT = `[${Array.from(astUtils.LINEBREAKS).join("")}]`, PADDING_LINE_SEQUENCE = new RegExp(String.raw`^(\s*?${LT})\s*${LT}(\s*;?)$`, "u"), CJS_EXPORT = /^(?:module\s*\.\s*)?exports(?:\s*\.|\s*\[|$)/u, CJS_IMPORT = /^require\(/u;
	/**
	* Creates tester which check if a node starts with specific keyword.
	* @param {string} keyword The keyword to test.
	* @returns {Object} the created tester.
	* @private
	*/
	function newKeywordTester(keyword) {
		return { test: (node, sourceCode) => sourceCode.getFirstToken(node).value === keyword };
	}
	/**
	* Creates tester which check if a node starts with specific keyword and spans a single line.
	* @param {string} keyword The keyword to test.
	* @returns {Object} the created tester.
	* @private
	*/
	function newSinglelineKeywordTester(keyword) {
		return { test: (node, sourceCode) => node.loc.start.line === node.loc.end.line && sourceCode.getFirstToken(node).value === keyword };
	}
	/**
	* Creates tester which check if a node starts with specific keyword and spans multiple lines.
	* @param {string} keyword The keyword to test.
	* @returns {Object} the created tester.
	* @private
	*/
	function newMultilineKeywordTester(keyword) {
		return { test: (node, sourceCode) => node.loc.start.line !== node.loc.end.line && sourceCode.getFirstToken(node).value === keyword };
	}
	/**
	* Creates tester which check if a node is specific type.
	* @param {string} type The node type to test.
	* @returns {Object} the created tester.
	* @private
	*/
	function newNodeTypeTester(type) {
		return { test: (node) => node.type === type };
	}
	/**
	* Checks the given node is an expression statement of IIFE.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is an expression statement of IIFE.
	* @private
	*/
	function isIIFEStatement(node) {
		if (node.type === "ExpressionStatement") {
			let call = astUtils.skipChainExpression(node.expression);
			return call.type === "UnaryExpression" && (call = astUtils.skipChainExpression(call.argument)), call.type === "CallExpression" && astUtils.isFunction(call.callee);
		}
		return !1;
	}
	/**
	* Checks whether the given node is a block-like statement.
	* This checks the last token of the node is the closing brace of a block.
	* @param {SourceCode} sourceCode The source code to get tokens.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is a block-like statement.
	* @private
	*/
	function isBlockLikeStatement(sourceCode, node) {
		if (node.type === "DoWhileStatement" && node.body.type === "BlockStatement" || isIIFEStatement(node)) return !0;
		let lastToken = sourceCode.getLastToken(node, astUtils.isNotSemicolonToken), belongingNode = lastToken && astUtils.isClosingBraceToken(lastToken) ? sourceCode.getNodeByRangeIndex(lastToken.range[0]) : null;
		return !!belongingNode && (belongingNode.type === "BlockStatement" || belongingNode.type === "SwitchStatement");
	}
	/**
	* Gets the actual last token.
	*
	* If a semicolon is semicolon-less style's semicolon, this ignores it.
	* For example:
	*
	*     foo()
	*     ;[1, 2, 3].forEach(bar)
	* @param {SourceCode} sourceCode The source code to get tokens.
	* @param {ASTNode} node The node to get.
	* @returns {Token} The actual last token.
	* @private
	*/
	function getActualLastToken(sourceCode, node) {
		let semiToken = sourceCode.getLastToken(node), prevToken = sourceCode.getTokenBefore(semiToken), nextToken = sourceCode.getTokenAfter(semiToken);
		return prevToken && nextToken && prevToken.range[0] >= node.range[0] && astUtils.isSemicolonToken(semiToken) && semiToken.loc.start.line !== prevToken.loc.end.line && semiToken.loc.end.line === nextToken.loc.start.line ? prevToken : semiToken;
	}
	/**
	* This returns the concatenation of the first 2 captured strings.
	* @param {string} _ Unused. Whole matched string.
	* @param {string} trailingSpaces The trailing spaces of the first line.
	* @param {string} indentSpaces The indentation spaces of the last line.
	* @returns {string} The concatenation of trailingSpaces and indentSpaces.
	* @private
	*/
	function replacerToRemovePaddingLines(_, trailingSpaces, indentSpaces) {
		return trailingSpaces + indentSpaces;
	}
	/**
	* Check and report statements for `any` configuration.
	* It does nothing.
	* @returns {void}
	* @private
	*/
	function verifyForAny() {}
	/**
	* Check and report statements for `never` configuration.
	* This autofix removes blank lines between the given 2 statements.
	* However, if comments exist between 2 blank lines, it does not remove those
	* blank lines automatically.
	* @param {RuleContext} context The rule context to report.
	* @param {ASTNode} _ Unused. The previous node to check.
	* @param {ASTNode} nextNode The next node to check.
	* @param {Array<Token[]>} paddingLines The array of token pairs that blank
	* lines exist between the pair.
	* @returns {void}
	* @private
	*/
	function verifyForNever(context, _, nextNode, paddingLines) {
		paddingLines.length !== 0 && context.report({
			node: nextNode,
			messageId: "unexpectedBlankLine",
			fix(fixer) {
				if (paddingLines.length >= 2) return null;
				let prevToken = paddingLines[0][0], nextToken = paddingLines[0][1], start = prevToken.range[1], end = nextToken.range[0], text = context.sourceCode.text.slice(start, end).replace(PADDING_LINE_SEQUENCE, replacerToRemovePaddingLines);
				return fixer.replaceTextRange([start, end], text);
			}
		});
	}
	/**
	* Check and report statements for `always` configuration.
	* This autofix inserts a blank line between the given 2 statements.
	* If the `prevNode` has trailing comments, it inserts a blank line after the
	* trailing comments.
	* @param {RuleContext} context The rule context to report.
	* @param {ASTNode} prevNode The previous node to check.
	* @param {ASTNode} nextNode The next node to check.
	* @param {Array<Token[]>} paddingLines The array of token pairs that blank
	* lines exist between the pair.
	* @returns {void}
	* @private
	*/
	function verifyForAlways(context, prevNode, nextNode, paddingLines) {
		paddingLines.length > 0 || context.report({
			node: nextNode,
			messageId: "expectedBlankLine",
			fix(fixer) {
				let sourceCode = context.sourceCode, prevToken = getActualLastToken(sourceCode, prevNode), nextToken = sourceCode.getFirstTokenBetween(prevToken, nextNode, {
					includeComments: !0,
					filter(token) {
						return astUtils.isTokenOnSameLine(prevToken, token) ? (prevToken = token, !1) : !0;
					}
				}) || nextNode, insertText = astUtils.isTokenOnSameLine(prevToken, nextToken) ? "\n\n" : "\n";
				return fixer.insertTextAfter(prevToken, insertText);
			}
		});
	}
	/**
	* Types of blank lines.
	* `any`, `never`, and `always` are defined.
	* Those have `verify` method to check and report statements.
	* @private
	*/
	let PaddingTypes = {
		any: { verify: verifyForAny },
		never: { verify: verifyForNever },
		always: { verify: verifyForAlways }
	}, StatementTypes = {
		"*": { test: () => !0 },
		"block-like": { test: (node, sourceCode) => isBlockLikeStatement(sourceCode, node) },
		"cjs-export": { test: (node, sourceCode) => node.type === "ExpressionStatement" && node.expression.type === "AssignmentExpression" && CJS_EXPORT.test(sourceCode.getText(node.expression.left)) },
		"cjs-import": { test: (node, sourceCode) => node.type === "VariableDeclaration" && node.declarations.length > 0 && !!node.declarations[0].init && CJS_IMPORT.test(sourceCode.getText(node.declarations[0].init)) },
		directive: { test: astUtils.isDirective },
		expression: { test: (node) => node.type === "ExpressionStatement" && !astUtils.isDirective(node) },
		iife: { test: isIIFEStatement },
		"multiline-block-like": { test: (node, sourceCode) => node.loc.start.line !== node.loc.end.line && isBlockLikeStatement(sourceCode, node) },
		"multiline-expression": { test: (node) => node.loc.start.line !== node.loc.end.line && node.type === "ExpressionStatement" && !astUtils.isDirective(node) },
		"multiline-const": newMultilineKeywordTester("const"),
		"multiline-let": newMultilineKeywordTester("let"),
		"multiline-var": newMultilineKeywordTester("var"),
		"singleline-const": newSinglelineKeywordTester("const"),
		"singleline-let": newSinglelineKeywordTester("let"),
		"singleline-var": newSinglelineKeywordTester("var"),
		block: newNodeTypeTester("BlockStatement"),
		empty: newNodeTypeTester("EmptyStatement"),
		function: newNodeTypeTester("FunctionDeclaration"),
		break: newKeywordTester("break"),
		case: newKeywordTester("case"),
		class: newKeywordTester("class"),
		const: newKeywordTester("const"),
		continue: newKeywordTester("continue"),
		debugger: newKeywordTester("debugger"),
		default: newKeywordTester("default"),
		do: newKeywordTester("do"),
		export: newKeywordTester("export"),
		for: newKeywordTester("for"),
		if: newKeywordTester("if"),
		import: newKeywordTester("import"),
		let: newKeywordTester("let"),
		return: newKeywordTester("return"),
		switch: newKeywordTester("switch"),
		throw: newKeywordTester("throw"),
		try: newKeywordTester("try"),
		var: newKeywordTester("var"),
		while: newKeywordTester("while"),
		with: newKeywordTester("with")
	};
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
						name: "padding-line-between-statements",
						url: "https://eslint.style/rules/padding-line-between-statements"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require or disallow padding lines between statements",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/padding-line-between-statements"
			},
			fixable: "whitespace",
			schema: {
				definitions: {
					paddingType: { enum: Object.keys(PaddingTypes) },
					statementType: { anyOf: [{ enum: Object.keys(StatementTypes) }, {
						type: "array",
						items: { enum: Object.keys(StatementTypes) },
						minItems: 1,
						uniqueItems: !0
					}] }
				},
				type: "array",
				items: {
					type: "object",
					properties: {
						blankLine: { $ref: "#/definitions/paddingType" },
						prev: { $ref: "#/definitions/statementType" },
						next: { $ref: "#/definitions/statementType" }
					},
					additionalProperties: !1,
					required: [
						"blankLine",
						"prev",
						"next"
					]
				}
			},
			messages: {
				unexpectedBlankLine: "Unexpected blank line before this statement.",
				expectedBlankLine: "Expected blank line before this statement."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, configureList = context.options || [], scopeInfo = null;
			/**
			* Processes to enter to new scope.
			* This manages the current previous statement.
			* @returns {void}
			* @private
			*/
			function enterScope() {
				scopeInfo = {
					upper: scopeInfo,
					prevNode: null
				};
			}
			/**
			* Processes to exit from the current scope.
			* @returns {void}
			* @private
			*/
			function exitScope() {
				scopeInfo = scopeInfo.upper;
			}
			/**
			* Checks whether the given node matches the given type.
			* @param {ASTNode} node The statement node to check.
			* @param {string|string[]} type The statement type to check.
			* @returns {boolean} `true` if the statement node matched the type.
			* @private
			*/
			function match(node, type) {
				let innerStatementNode = node;
				for (; innerStatementNode.type === "LabeledStatement";) innerStatementNode = innerStatementNode.body;
				return Array.isArray(type) ? type.some(match.bind(null, innerStatementNode)) : StatementTypes[type].test(innerStatementNode, sourceCode);
			}
			/**
			* Finds the last matched configure from configureList.
			* @param {ASTNode} prevNode The previous statement to match.
			* @param {ASTNode} nextNode The current statement to match.
			* @returns {Object} The tester of the last matched configure.
			* @private
			*/
			function getPaddingType(prevNode, nextNode) {
				for (let i = configureList.length - 1; i >= 0; --i) {
					let configure = configureList[i];
					if (match(prevNode, configure.prev) && match(nextNode, configure.next)) return PaddingTypes[configure.blankLine];
				}
				return PaddingTypes.any;
			}
			/**
			* Gets padding line sequences between the given 2 statements.
			* Comments are separators of the padding line sequences.
			* @param {ASTNode} prevNode The previous statement to count.
			* @param {ASTNode} nextNode The current statement to count.
			* @returns {Array<Token[]>} The array of token pairs.
			* @private
			*/
			function getPaddingLineSequences(prevNode, nextNode) {
				let pairs = [], prevToken = getActualLastToken(sourceCode, prevNode);
				if (nextNode.loc.start.line - prevToken.loc.end.line >= 2) do {
					let token = sourceCode.getTokenAfter(prevToken, { includeComments: !0 });
					token.loc.start.line - prevToken.loc.end.line >= 2 && pairs.push([prevToken, token]), prevToken = token;
				} while (prevToken.range[0] < nextNode.range[0]);
				return pairs;
			}
			/**
			* Verify padding lines between the given node and the previous node.
			* @param {ASTNode} node The node to verify.
			* @returns {void}
			* @private
			*/
			function verify(node) {
				let parentType = node.parent.type;
				if (!(astUtils.STATEMENT_LIST_PARENTS.has(parentType) || parentType === "SwitchStatement")) return;
				let prevNode = scopeInfo.prevNode;
				if (prevNode) {
					let type = getPaddingType(prevNode, node), paddingLines = getPaddingLineSequences(prevNode, node);
					type.verify(context, prevNode, node, paddingLines);
				}
				scopeInfo.prevNode = node;
			}
			/**
			* Verify padding lines between the given node and the previous node.
			* Then process to enter to new scope.
			* @param {ASTNode} node The node to verify.
			* @returns {void}
			* @private
			*/
			function verifyThenEnterScope(node) {
				verify(node), enterScope();
			}
			return {
				Program: enterScope,
				BlockStatement: enterScope,
				SwitchStatement: enterScope,
				StaticBlock: enterScope,
				"Program:exit": exitScope,
				"BlockStatement:exit": exitScope,
				"SwitchStatement:exit": exitScope,
				"StaticBlock:exit": exitScope,
				":statement": verify,
				SwitchCase: verifyThenEnterScope,
				"SwitchCase:exit": exitScope
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/padding-line-between-statements.cjs
module.exports = require_padding_line_between_statements().create;
//#endregion
