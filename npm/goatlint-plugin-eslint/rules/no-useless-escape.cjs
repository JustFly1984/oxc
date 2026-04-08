const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_regexpp$1 = require("../common/regexpp.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-useless-escape.js
/**
* @fileoverview Look for useless escapes in strings and regexes
* @author Onur Temizkan
*/
var require_no_useless_escape = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), { RegExpParser, visitRegExpAST } = require_regexpp$1.t();
	/**
	* @typedef {import('@eslint-community/regexpp').AST.CharacterClass} CharacterClass
	* @typedef {import('@eslint-community/regexpp').AST.ExpressionCharacterClass} ExpressionCharacterClass
	*/
	/**
	* Returns the union of two sets.
	* @param {Set} setA The first set
	* @param {Set} setB The second set
	* @returns {Set} The union of the two sets
	*/
	function union(setA, setB) {
		return new Set((function* () {
			yield* setA, yield* setB;
		})());
	}
	let VALID_STRING_ESCAPES = union(/* @__PURE__ */ new Set("\\nrvtbfux"), astUtils.LINEBREAKS), REGEX_GENERAL_ESCAPES = /* @__PURE__ */ new Set("\\bcdDfnpPrsStvwWxu0123456789]"), REGEX_NON_CHARCLASS_ESCAPES = union(REGEX_GENERAL_ESCAPES, /* @__PURE__ */ new Set("^/.$*+?[{}|()Bk")), REGEX_CLASSSET_CHARACTER_ESCAPES = union(REGEX_GENERAL_ESCAPES, /* @__PURE__ */ new Set("q/[{}|()-")), REGEX_CLASS_SET_RESERVED_DOUBLE_PUNCTUATOR = /* @__PURE__ */ new Set("!#$%&*+,.:;<=>?@^`~");
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ allowRegexCharacters: [] }],
			docs: {
				description: "Disallow unnecessary escape characters",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-useless-escape"
			},
			hasSuggestions: !0,
			messages: {
				unnecessaryEscape: "Unnecessary escape character: \\{{character}}.",
				removeEscape: "Remove the `\\`. This maintains the current functionality.",
				removeEscapeDoNotKeepSemantics: "Remove the `\\` if it was inserted by mistake.",
				escapeBackslash: "Replace the `\\` with `\\\\` to include the actual backslash character."
			},
			schema: [{
				type: "object",
				properties: { allowRegexCharacters: {
					type: "array",
					items: { type: "string" },
					uniqueItems: !0
				} },
				additionalProperties: !1
			}]
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ allowRegexCharacters }] = context.options, parser = new RegExpParser();
			/**
			* Reports a node
			* @param {ASTNode} node The node to report
			* @param {number} startOffset The backslash's offset from the start of the node
			* @param {string} character The uselessly escaped character (not including the backslash)
			* @param {boolean} [disableEscapeBackslashSuggest] `true` if escapeBackslash suggestion should be turned off.
			* @returns {void}
			*/
			function report(node, startOffset, character, disableEscapeBackslashSuggest) {
				let rangeStart = node.range[0] + startOffset, range = [rangeStart, rangeStart + 1], start = sourceCode.getLocFromIndex(rangeStart);
				context.report({
					node,
					loc: {
						start,
						end: {
							line: start.line,
							column: start.column + 1
						}
					},
					messageId: "unnecessaryEscape",
					data: { character },
					suggest: [{
						messageId: astUtils.isDirective(node.parent) ? "removeEscapeDoNotKeepSemantics" : "removeEscape",
						fix(fixer) {
							return fixer.removeRange(range);
						}
					}, ...disableEscapeBackslashSuggest ? [] : [{
						messageId: "escapeBackslash",
						fix(fixer) {
							return fixer.insertTextBeforeRange(range, "\\");
						}
					}]]
				});
			}
			/**
			* Checks if the escape character in given string slice is unnecessary.
			* @private
			* @param {ASTNode} node node to validate.
			* @param {string} match string slice to validate.
			* @returns {void}
			*/
			function validateString(node, match) {
				let isTemplateElement = node.type === "TemplateElement", escapedChar = match[0][1], isUnnecessaryEscape = !VALID_STRING_ESCAPES.has(escapedChar), isQuoteEscape;
				isTemplateElement ? (isQuoteEscape = escapedChar === "`", escapedChar === "$" ? isUnnecessaryEscape = match.input[match.index + 2] !== "{" : escapedChar === "{" && (isUnnecessaryEscape = match.input[match.index - 1] !== "$")) : isQuoteEscape = escapedChar === node.raw[0], isUnnecessaryEscape && !isQuoteEscape && report(node, match.index, match[0].slice(1));
			}
			/**
			* Checks if the escape character in given regexp is unnecessary.
			* @private
			* @param {ASTNode} node node to validate.
			* @returns {void}
			*/
			function validateRegExp(node) {
				let { pattern, flags } = node.regex, patternNode, unicode = flags.includes("u"), unicodeSets = flags.includes("v");
				try {
					patternNode = parser.parsePattern(pattern, 0, pattern.length, {
						unicode,
						unicodeSets
					});
				} catch {
					return;
				}
				/** @type {(CharacterClass | ExpressionCharacterClass)[]} */
				let characterClassStack = [];
				visitRegExpAST(patternNode, {
					onCharacterClassEnter: (characterClassNode) => characterClassStack.unshift(characterClassNode),
					onCharacterClassLeave: () => characterClassStack.shift(),
					onExpressionCharacterClassEnter: (characterClassNode) => characterClassStack.unshift(characterClassNode),
					onExpressionCharacterClassLeave: () => characterClassStack.shift(),
					onCharacterEnter(characterNode) {
						if (!characterNode.raw.startsWith("\\")) return;
						let escapedChar = characterNode.raw.slice(1);
						if (escapedChar !== String.fromCodePoint(characterNode.value) || allowRegexCharacters.includes(escapedChar)) return;
						let allowedEscapes;
						if (allowedEscapes = characterClassStack.length ? unicodeSets ? REGEX_CLASSSET_CHARACTER_ESCAPES : REGEX_GENERAL_ESCAPES : REGEX_NON_CHARCLASS_ESCAPES, allowedEscapes.has(escapedChar)) return;
						let reportedIndex = characterNode.start + 1, disableEscapeBackslashSuggest = !1;
						if (characterClassStack.length) {
							let characterClassNode = characterClassStack[0];
							if (escapedChar === "^" && characterClassNode.start + 1 === characterNode.start) return;
							if (unicodeSets) {
								if (REGEX_CLASS_SET_RESERVED_DOUBLE_PUNCTUATOR.has(escapedChar) && (pattern[characterNode.end] === escapedChar || pattern[characterNode.start - 1] === escapedChar && (escapedChar !== "^" || !characterClassNode.negate || characterClassNode.start + 1 < characterNode.start - 1))) return;
								(characterNode.parent.type === "ClassIntersection" || characterNode.parent.type === "ClassSubtraction") && (disableEscapeBackslashSuggest = !0);
							} else if (escapedChar === "-" && characterClassNode.start + 1 !== characterNode.start && characterNode.end !== characterClassNode.end - 1) return;
						}
						report(node, reportedIndex, escapedChar, disableEscapeBackslashSuggest);
					}
				});
			}
			/**
			* Checks if a node has an escape.
			* @param {ASTNode} node node to check.
			* @returns {void}
			*/
			function check(node) {
				let isTemplateElement = node.type === "TemplateElement";
				if (!(isTemplateElement && node.parent && node.parent.parent && node.parent.parent.type === "TaggedTemplateExpression" && node.parent === node.parent.parent.quasi)) if (typeof node.value == "string" || isTemplateElement) {
					if (node.parent.type === "JSXAttribute" || node.parent.type === "JSXElement" || node.parent.type === "JSXFragment") return;
					let value = isTemplateElement ? sourceCode.getText(node) : node.raw, pattern = /\\\D/gu, match;
					for (; match = pattern.exec(value);) validateString(node, match);
				} else node.regex && validateRegExp(node);
			}
			return {
				Literal: check,
				TemplateElement: check
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-useless-escape.cjs
module.exports = require_no_useless_escape().create;
//#endregion
