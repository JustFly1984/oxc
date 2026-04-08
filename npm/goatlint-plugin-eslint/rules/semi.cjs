const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_fix_tracker$1 = require("../common/fix-tracker.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/semi.js
/**
* @fileoverview Rule to flag missing semicolons.
* @author Nicholas C. Zakas
* @deprecated in ESLint v8.53.0
*/
var require_semi = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let FixTracker = require_fix_tracker$1.t(), astUtils = require_ast_utils$1.t();
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
						name: "semi",
						url: "https://eslint.style/rules/semi"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Require or disallow semicolons instead of ASI",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/semi"
			},
			fixable: "code",
			schema: { anyOf: [{
				type: "array",
				items: [{ enum: ["never"] }, {
					type: "object",
					properties: { beforeStatementContinuationChars: { enum: [
						"always",
						"any",
						"never"
					] } },
					additionalProperties: !1
				}],
				minItems: 0,
				maxItems: 2
			}, {
				type: "array",
				items: [{ enum: ["always"] }, {
					type: "object",
					properties: {
						omitLastInOneLineBlock: { type: "boolean" },
						omitLastInOneLineClassBody: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				minItems: 0,
				maxItems: 2
			}] },
			messages: {
				missingSemi: "Missing semicolon.",
				extraSemi: "Extra semicolon."
			}
		},
		create(context) {
			let OPT_OUT_PATTERN = /^[-[(/+`]/u, unsafeClassFieldNames = new Set([
				"get",
				"set",
				"static"
			]), unsafeClassFieldFollowers = new Set([
				"*",
				"in",
				"instanceof"
			]), options = context.options[1], never = context.options[0] === "never", exceptOneLine = !!(options && options.omitLastInOneLineBlock), exceptOneLineClassBody = !!(options && options.omitLastInOneLineClassBody), beforeStatementContinuationChars = options && options.beforeStatementContinuationChars || "any", sourceCode = context.sourceCode;
			/**
			* Reports a semicolon error with appropriate location and message.
			* @param {ASTNode} node The node with an extra or missing semicolon.
			* @param {boolean} missing True if the semicolon is missing.
			* @returns {void}
			*/
			function report(node, missing) {
				let lastToken = sourceCode.getLastToken(node), messageId, fix, loc;
				missing ? (messageId = "extraSemi", loc = lastToken.loc, fix = function(fixer) {
					return new FixTracker(fixer, sourceCode).retainSurroundingTokens(lastToken).remove(lastToken);
				}) : (messageId = "missingSemi", loc = {
					start: lastToken.loc.end,
					end: astUtils.getNextLocation(sourceCode, lastToken.loc.end)
				}, fix = function(fixer) {
					return fixer.insertTextAfter(lastToken, ";");
				}), context.report({
					node,
					loc,
					messageId,
					fix
				});
			}
			/**
			* Check whether a given semicolon token is redundant.
			* @param {Token} semiToken A semicolon token to check.
			* @returns {boolean} `true` if the next token is `;` or `}`.
			*/
			function isRedundantSemi(semiToken) {
				let nextToken = sourceCode.getTokenAfter(semiToken);
				return !nextToken || astUtils.isClosingBraceToken(nextToken) || astUtils.isSemicolonToken(nextToken);
			}
			/**
			* Check whether a given token is the closing brace of an arrow function.
			* @param {Token} lastToken A token to check.
			* @returns {boolean} `true` if the token is the closing brace of an arrow function.
			*/
			function isEndOfArrowBlock(lastToken) {
				if (!astUtils.isClosingBraceToken(lastToken)) return !1;
				let node = sourceCode.getNodeByRangeIndex(lastToken.range[0]);
				return node.type === "BlockStatement" && node.parent.type === "ArrowFunctionExpression";
			}
			/**
			* Checks if a given PropertyDefinition node followed by a semicolon
			* can safely remove that semicolon. It is not to safe to remove if
			* the class field name is "get", "set", or "static", or if
			* followed by a generator method.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} `true` if the node cannot have the semicolon
			*      removed.
			*/
			function maybeClassFieldAsiHazard(node) {
				if (node.type !== "PropertyDefinition") return !1;
				if (!node.computed && node.key.type === "Identifier" && unsafeClassFieldNames.has(node.key.name) && !(node.static && node.key.name === "static") && !node.value) return !0;
				let followingToken = sourceCode.getTokenAfter(node);
				return unsafeClassFieldFollowers.has(followingToken.value);
			}
			/**
			* Check whether a given node is on the same line with the next token.
			* @param {Node} node A statement node to check.
			* @returns {boolean} `true` if the node is on the same line with the next token.
			*/
			function isOnSameLineWithNextToken(node) {
				let prevToken = sourceCode.getLastToken(node, 1), nextToken = sourceCode.getTokenAfter(node);
				return !!nextToken && astUtils.isTokenOnSameLine(prevToken, nextToken);
			}
			/**
			* Check whether a given node can connect the next line if the next line is unreliable.
			* @param {Node} node A statement node to check.
			* @returns {boolean} `true` if the node can connect the next line.
			*/
			function maybeAsiHazardAfter(node) {
				let t = node.type;
				return t === "DoWhileStatement" || t === "BreakStatement" || t === "ContinueStatement" || t === "DebuggerStatement" || t === "ImportDeclaration" || t === "ExportAllDeclaration" ? !1 : t === "ReturnStatement" ? !!node.argument : t === "ExportNamedDeclaration" ? !!node.declaration : !isEndOfArrowBlock(sourceCode.getLastToken(node, 1));
			}
			/**
			* Check whether a given token can connect the previous statement.
			* @param {Token} token A token to check.
			* @returns {boolean} `true` if the token is one of `[`, `(`, `/`, `+`, `-`, ```, `++`, and `--`.
			*/
			function maybeAsiHazardBefore(token) {
				return !!token && OPT_OUT_PATTERN.test(token.value) && token.value !== "++" && token.value !== "--";
			}
			/**
			* Check if the semicolon of a given node is unnecessary, only true if:
			*   - next token is a valid statement divider (`;` or `}`).
			*   - next token is on a new line and the node is not connectable to the new line.
			* @param {Node} node A statement node to check.
			* @returns {boolean} whether the semicolon is unnecessary.
			*/
			function canRemoveSemicolon(node) {
				return isRedundantSemi(sourceCode.getLastToken(node)) ? !0 : maybeClassFieldAsiHazard(node) || isOnSameLineWithNextToken(node) ? !1 : node.type !== "PropertyDefinition" && beforeStatementContinuationChars === "never" && !maybeAsiHazardAfter(node) || !maybeAsiHazardBefore(sourceCode.getTokenAfter(node));
			}
			/**
			* Checks a node to see if it's the last item in a one-liner block.
			* Block is any `BlockStatement` or `StaticBlock` node. Block is a one-liner if its
			* braces (and consequently everything between them) are on the same line.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} whether the node is the last item in a one-liner block.
			*/
			function isLastInOneLinerBlock(node) {
				let parent = node.parent, nextToken = sourceCode.getTokenAfter(node);
				return !nextToken || nextToken.value !== "}" ? !1 : parent.type === "BlockStatement" ? parent.loc.start.line === parent.loc.end.line : parent.type === "StaticBlock" ? sourceCode.getFirstToken(parent, { skip: 1 }).loc.start.line === parent.loc.end.line : !1;
			}
			/**
			* Checks a node to see if it's the last item in a one-liner `ClassBody` node.
			* ClassBody is a one-liner if its braces (and consequently everything between them) are on the same line.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} whether the node is the last item in a one-liner ClassBody.
			*/
			function isLastInOneLinerClassBody(node) {
				let parent = node.parent, nextToken = sourceCode.getTokenAfter(node);
				return !nextToken || nextToken.value !== "}" ? !1 : parent.type === "ClassBody" ? parent.loc.start.line === parent.loc.end.line : !1;
			}
			/**
			* Checks a node to see if it's followed by a semicolon.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			*/
			function checkForSemicolon(node) {
				let isSemi = astUtils.isSemicolonToken(sourceCode.getLastToken(node));
				if (never) isSemi && canRemoveSemicolon(node) ? report(node, !0) : !isSemi && beforeStatementContinuationChars === "always" && node.type !== "PropertyDefinition" && maybeAsiHazardBefore(sourceCode.getTokenAfter(node)) && report(node);
				else {
					let oneLinerBlock = exceptOneLine && isLastInOneLinerBlock(node), oneLinerClassBody = exceptOneLineClassBody && isLastInOneLinerClassBody(node), oneLinerBlockOrClassBody = oneLinerBlock || oneLinerClassBody;
					isSemi && oneLinerBlockOrClassBody ? report(node, !0) : !isSemi && !oneLinerBlockOrClassBody && report(node);
				}
			}
			/**
			* Checks to see if there's a semicolon after a variable declaration.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			*/
			function checkForSemicolonForVariableDeclaration(node) {
				let parent = node.parent;
				(parent.type !== "ForStatement" || parent.init !== node) && (!/^For(?:In|Of)Statement/u.test(parent.type) || parent.left !== node) && checkForSemicolon(node);
			}
			return {
				VariableDeclaration: checkForSemicolonForVariableDeclaration,
				ExpressionStatement: checkForSemicolon,
				ReturnStatement: checkForSemicolon,
				ThrowStatement: checkForSemicolon,
				DoWhileStatement: checkForSemicolon,
				DebuggerStatement: checkForSemicolon,
				BreakStatement: checkForSemicolon,
				ContinueStatement: checkForSemicolon,
				ImportDeclaration: checkForSemicolon,
				ExportAllDeclaration: checkForSemicolon,
				ExportNamedDeclaration(node) {
					node.declaration || checkForSemicolon(node);
				},
				ExportDefaultDeclaration(node) {
					/(?:Class|Function)Declaration/u.test(node.declaration.type) || checkForSemicolon(node);
				},
				PropertyDefinition: checkForSemicolon
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/semi.cjs
module.exports = require_semi().create;
//#endregion
