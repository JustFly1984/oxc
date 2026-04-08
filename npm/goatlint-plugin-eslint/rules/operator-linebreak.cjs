const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/operator-linebreak.js
/**
* @fileoverview Operator linebreak - enforces operator linebreak style of two types: after and before
* @author Benoît Zugmeyer
* @deprecated in ESLint v8.53.0
*/
var require_operator_linebreak = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
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
						name: "operator-linebreak",
						url: "https://eslint.style/rules/operator-linebreak"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent linebreak style for operators",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/operator-linebreak"
			},
			schema: [{ enum: [
				"after",
				"before",
				"none",
				null
			] }, {
				type: "object",
				properties: { overrides: {
					type: "object",
					additionalProperties: { enum: [
						"after",
						"before",
						"none",
						"ignore"
					] }
				} },
				additionalProperties: !1
			}],
			fixable: "code",
			messages: {
				operatorAtBeginning: "'{{operator}}' should be placed at the beginning of the line.",
				operatorAtEnd: "'{{operator}}' should be placed at the end of the line.",
				badLinebreak: "Bad line breaking before and after '{{operator}}'.",
				noLinebreak: "There should be no line break before or after '{{operator}}'."
			}
		},
		create(context) {
			let usedDefaultGlobal = !context.options[0], globalStyle = context.options[0] || "after", options = context.options[1] || {}, styleOverrides = options.overrides ? Object.assign({}, options.overrides) : {};
			usedDefaultGlobal && !styleOverrides["?"] && (styleOverrides["?"] = "before"), usedDefaultGlobal && !styleOverrides[":"] && (styleOverrides[":"] = "before");
			let sourceCode = context.sourceCode;
			/**
			* Gets a fixer function to fix rule issues
			* @param {Token} operatorToken The operator token of an expression
			* @param {string} desiredStyle The style for the rule. One of 'before', 'after', 'none'
			* @returns {Function} A fixer function
			*/
			function getFixer(operatorToken, desiredStyle) {
				return (fixer) => {
					let tokenBefore = sourceCode.getTokenBefore(operatorToken), tokenAfter = sourceCode.getTokenAfter(operatorToken), textBefore = sourceCode.text.slice(tokenBefore.range[1], operatorToken.range[0]), textAfter = sourceCode.text.slice(operatorToken.range[1], tokenAfter.range[0]), hasLinebreakBefore = !astUtils.isTokenOnSameLine(tokenBefore, operatorToken), hasLinebreakAfter = !astUtils.isTokenOnSameLine(operatorToken, tokenAfter), newTextBefore, newTextAfter;
					if (hasLinebreakBefore !== hasLinebreakAfter && desiredStyle !== "none") {
						if (sourceCode.getTokenBefore(operatorToken, { includeComments: !0 }) !== tokenBefore && sourceCode.getTokenAfter(operatorToken, { includeComments: !0 }) !== tokenAfter) return null;
						newTextBefore = textAfter, newTextAfter = textBefore;
					} else {
						let LINEBREAK_REGEX = astUtils.createGlobalLinebreakMatcher();
						if (newTextBefore = desiredStyle === "before" || textBefore.trim() ? textBefore : textBefore.replace(LINEBREAK_REGEX, ""), newTextAfter = desiredStyle === "after" || textAfter.trim() ? textAfter : textAfter.replace(LINEBREAK_REGEX, ""), newTextBefore === textBefore && newTextAfter === textAfter) return null;
					}
					return newTextAfter === "" && tokenAfter.type === "Punctuator" && "+-".includes(operatorToken.value) && tokenAfter.value === operatorToken.value && (newTextAfter += " "), fixer.replaceTextRange([tokenBefore.range[1], tokenAfter.range[0]], newTextBefore + operatorToken.value + newTextAfter);
				};
			}
			/**
			* Checks the operator placement
			* @param {ASTNode} node The node to check
			* @param {ASTNode} rightSide The node that comes after the operator in `node`
			* @param {string} operator The operator
			* @private
			* @returns {void}
			*/
			function validateNode(node, rightSide, operator) {
				let operatorToken = sourceCode.getTokenBefore(rightSide, (token) => token.value === operator), leftToken = sourceCode.getTokenBefore(operatorToken), rightToken = sourceCode.getTokenAfter(operatorToken), operatorStyleOverride = styleOverrides[operator], style = operatorStyleOverride || globalStyle, fix = getFixer(operatorToken, style);
				astUtils.isTokenOnSameLine(leftToken, operatorToken) && astUtils.isTokenOnSameLine(operatorToken, rightToken) || (operatorStyleOverride !== "ignore" && !astUtils.isTokenOnSameLine(leftToken, operatorToken) && !astUtils.isTokenOnSameLine(operatorToken, rightToken) ? context.report({
					node,
					loc: operatorToken.loc,
					messageId: "badLinebreak",
					data: { operator },
					fix
				}) : style === "before" && astUtils.isTokenOnSameLine(leftToken, operatorToken) ? context.report({
					node,
					loc: operatorToken.loc,
					messageId: "operatorAtBeginning",
					data: { operator },
					fix
				}) : style === "after" && astUtils.isTokenOnSameLine(operatorToken, rightToken) ? context.report({
					node,
					loc: operatorToken.loc,
					messageId: "operatorAtEnd",
					data: { operator },
					fix
				}) : style === "none" && context.report({
					node,
					loc: operatorToken.loc,
					messageId: "noLinebreak",
					data: { operator },
					fix
				}));
			}
			/**
			* Validates a binary expression using `validateNode`
			* @param {BinaryExpression|LogicalExpression|AssignmentExpression} node node to be validated
			* @returns {void}
			*/
			function validateBinaryExpression(node) {
				validateNode(node, node.right, node.operator);
			}
			return {
				BinaryExpression: validateBinaryExpression,
				LogicalExpression: validateBinaryExpression,
				AssignmentExpression: validateBinaryExpression,
				VariableDeclarator(node) {
					node.init && validateNode(node, node.init, "=");
				},
				PropertyDefinition(node) {
					node.value && validateNode(node, node.value, "=");
				},
				ConditionalExpression(node) {
					validateNode(node, node.consequent, "?"), validateNode(node, node.alternate, ":");
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/operator-linebreak.cjs
module.exports = require_operator_linebreak().create;
//#endregion
