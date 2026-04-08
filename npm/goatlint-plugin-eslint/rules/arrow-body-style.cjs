const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/arrow-body-style.js
/**
* @fileoverview Rule to require braces in arrow function body.
* @author Alberto Rodríguez
*/
var require_arrow_body_style = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: ["as-needed"],
			docs: {
				description: "Require braces around arrow function bodies",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/arrow-body-style"
			},
			schema: { anyOf: [{
				type: "array",
				items: [{ enum: ["always", "never"] }],
				minItems: 0,
				maxItems: 1
			}, {
				type: "array",
				items: [{ enum: ["as-needed"] }, {
					type: "object",
					properties: { requireReturnForObjectLiteral: { type: "boolean" } },
					additionalProperties: !1
				}],
				minItems: 0,
				maxItems: 2
			}] },
			fixable: "code",
			messages: {
				unexpectedOtherBlock: "Unexpected block statement surrounding arrow body.",
				unexpectedEmptyBlock: "Unexpected block statement surrounding arrow body; put a value of `undefined` immediately after the `=>`.",
				unexpectedObjectBlock: "Unexpected block statement surrounding arrow body; parenthesize the returned value and move it immediately after the `=>`.",
				unexpectedSingleBlock: "Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`.",
				expectedBlock: "Expected block statement surrounding arrow body."
			}
		},
		create(context) {
			let options = context.options, always = options[0] === "always", asNeeded = options[0] === "as-needed", never = options[0] === "never", requireReturnForObjectLiteral = options[1] && options[1].requireReturnForObjectLiteral, sourceCode = context.sourceCode, funcInfo = null;
			/**
			* Checks whether the given node has ASI problem or not.
			* @param {Token} token The token to check.
			* @returns {boolean} `true` if it changes semantics if `;` or `}` followed by the token are removed.
			*/
			function hasASIProblem(token) {
				return token && token.type === "Punctuator" && /^[([/`+-]/u.test(token.value);
			}
			/**
			* Gets the closing parenthesis by the given node.
			* @param {ASTNode} node first node after an opening parenthesis.
			* @returns {Token} The found closing parenthesis token.
			*/
			function findClosingParen(node) {
				let nodeToCheck = node;
				for (; !astUtils.isParenthesised(sourceCode, nodeToCheck);) nodeToCheck = nodeToCheck.parent;
				return sourceCode.getTokenAfter(nodeToCheck);
			}
			/**
			* Check whether the node is inside of a for loop's init
			* @param {ASTNode} node node is inside for loop
			* @returns {boolean} `true` if the node is inside of a for loop, else `false`
			*/
			function isInsideForLoopInitializer(node) {
				return node && node.parent ? node.parent.type === "ForStatement" && node.parent.init === node ? !0 : isInsideForLoopInitializer(node.parent) : !1;
			}
			/**
			* Determines whether a arrow function body needs braces
			* @param {ASTNode} node The arrow function node.
			* @returns {void}
			*/
			function validate(node) {
				let arrowBody = node.body;
				if (arrowBody.type === "BlockStatement") {
					let blockBody = arrowBody.body;
					if (blockBody.length !== 1 && !never || asNeeded && requireReturnForObjectLiteral && blockBody[0].type === "ReturnStatement" && blockBody[0].argument && blockBody[0].argument.type === "ObjectExpression") return;
					if (never || asNeeded && blockBody[0].type === "ReturnStatement") {
						let messageId;
						messageId = blockBody.length === 0 ? "unexpectedEmptyBlock" : blockBody.length > 1 || blockBody[0].type !== "ReturnStatement" ? "unexpectedOtherBlock" : blockBody[0].argument === null ? "unexpectedSingleBlock" : astUtils.isOpeningBraceToken(sourceCode.getFirstToken(blockBody[0], { skip: 1 })) ? "unexpectedObjectBlock" : "unexpectedSingleBlock", context.report({
							node,
							loc: arrowBody.loc,
							messageId,
							fix(fixer) {
								let fixes = [];
								if (blockBody.length !== 1 || blockBody[0].type !== "ReturnStatement" || !blockBody[0].argument || hasASIProblem(sourceCode.getTokenAfter(arrowBody))) return fixes;
								let openingBrace = sourceCode.getFirstToken(arrowBody), closingBrace = sourceCode.getLastToken(arrowBody), firstValueToken = sourceCode.getFirstToken(blockBody[0], 1), lastValueToken = sourceCode.getLastToken(blockBody[0]);
								return sourceCode.commentsExistBetween(openingBrace, firstValueToken) || sourceCode.commentsExistBetween(lastValueToken, closingBrace) ? fixes.push(fixer.remove(openingBrace), fixer.remove(closingBrace), fixer.remove(sourceCode.getTokenAfter(openingBrace))) : fixes.push(fixer.removeRange([openingBrace.range[0], firstValueToken.range[0]]), fixer.removeRange([lastValueToken.range[1], closingBrace.range[1]])), (astUtils.isOpeningBraceToken(firstValueToken) || blockBody[0].argument.type === "SequenceExpression" || funcInfo.hasInOperator && isInsideForLoopInitializer(node)) && (astUtils.isParenthesised(sourceCode, blockBody[0].argument) || fixes.push(fixer.insertTextBefore(firstValueToken, "("), fixer.insertTextAfter(lastValueToken, ")"))), astUtils.isSemicolonToken(lastValueToken) && fixes.push(fixer.remove(lastValueToken)), fixes;
							}
						});
					}
				} else (always || asNeeded && requireReturnForObjectLiteral && arrowBody.type === "ObjectExpression") && context.report({
					node,
					loc: arrowBody.loc,
					messageId: "expectedBlock",
					fix(fixer) {
						let fixes = [], arrowToken = sourceCode.getTokenBefore(arrowBody, astUtils.isArrowToken), [firstTokenAfterArrow, secondTokenAfterArrow] = sourceCode.getTokensAfter(arrowToken, { count: 2 }), lastToken = sourceCode.getLastToken(node), parenthesisedObjectLiteral = null;
						if (astUtils.isOpeningParenToken(firstTokenAfterArrow) && astUtils.isOpeningBraceToken(secondTokenAfterArrow)) {
							let braceNode = sourceCode.getNodeByRangeIndex(secondTokenAfterArrow.range[0]);
							braceNode.type === "ObjectExpression" && (parenthesisedObjectLiteral = braceNode);
						}
						if (parenthesisedObjectLiteral) {
							let openingParenToken = firstTokenAfterArrow, openingBraceToken = secondTokenAfterArrow;
							astUtils.isTokenOnSameLine(openingParenToken, openingBraceToken) ? fixes.push(fixer.replaceText(openingParenToken, "{return ")) : fixes.push(fixer.replaceText(openingParenToken, "{"), fixer.insertTextBefore(openingBraceToken, "return ")), fixes.push(fixer.remove(findClosingParen(parenthesisedObjectLiteral))), fixes.push(fixer.insertTextAfter(lastToken, "}"));
						} else fixes.push(fixer.insertTextBefore(firstTokenAfterArrow, "{return ")), fixes.push(fixer.insertTextAfter(lastToken, "}"));
						return fixes;
					}
				});
			}
			return {
				"BinaryExpression[operator='in']"() {
					let info = funcInfo;
					for (; info;) info.hasInOperator = !0, info = info.upper;
				},
				ArrowFunctionExpression() {
					funcInfo = {
						upper: funcInfo,
						hasInOperator: !1
					};
				},
				"ArrowFunctionExpression:exit"(node) {
					validate(node), funcInfo = funcInfo.upper;
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/arrow-body-style.cjs
module.exports = require_arrow_body_style().create;
//#endregion
