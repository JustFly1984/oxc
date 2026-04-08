const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/capitalized-comments.js
/**
* @fileoverview enforce or disallow capitalization of the first letter of a comment
* @author Kevin Partington
*/
var require_capitalized_comments = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let DEFAULT_IGNORE_PATTERN = require_ast_utils$1.t().COMMENTS_IGNORE_PATTERN, WHITESPACE = /\s/gu, MAYBE_URL = /^\s*[^:/?#\s]+:\/\/[^?#]/u, LETTER_PATTERN = /\p{L}/u, SCHEMA_BODY = {
		type: "object",
		properties: {
			ignorePattern: { type: "string" },
			ignoreInlineComments: { type: "boolean" },
			ignoreConsecutiveComments: { type: "boolean" }
		},
		additionalProperties: !1
	}, DEFAULTS = {
		ignorePattern: "",
		ignoreInlineComments: !1,
		ignoreConsecutiveComments: !1
	};
	/**
	* Get normalized options for either block or line comments from the given
	* user-provided options.
	* - If the user-provided options is just a string, returns a normalized
	*   set of options using default values for all other options.
	* - If the user-provided options is an object, then a normalized option
	*   set is returned. Options specified in overrides will take priority
	*   over options specified in the main options object, which will in
	*   turn take priority over the rule's defaults.
	* @param {Object|string} rawOptions The user-provided options.
	* @param {string} which Either "line" or "block".
	* @returns {Object} The normalized options.
	*/
	function getNormalizedOptions(rawOptions, which) {
		return Object.assign({}, DEFAULTS, rawOptions[which] || rawOptions);
	}
	/**
	* Get normalized options for block and line comments.
	* @param {Object|string} rawOptions The user-provided options.
	* @returns {Object} An object with "Line" and "Block" keys and corresponding
	* normalized options objects.
	*/
	function getAllNormalizedOptions(rawOptions = {}) {
		return {
			Line: getNormalizedOptions(rawOptions, "line"),
			Block: getNormalizedOptions(rawOptions, "block")
		};
	}
	/**
	* Creates a regular expression for each ignorePattern defined in the rule
	* options.
	*
	* This is done in order to avoid invoking the RegExp constructor repeatedly.
	* @param {Object} normalizedOptions The normalized rule options.
	* @returns {void}
	*/
	function createRegExpForIgnorePatterns(normalizedOptions) {
		Object.keys(normalizedOptions).forEach((key) => {
			let ignorePatternStr = normalizedOptions[key].ignorePattern;
			if (ignorePatternStr) {
				let regExp = RegExp(`^\\s*(?:${ignorePatternStr})`, "u");
				normalizedOptions[key].ignorePatternRegExp = regExp;
			}
		});
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce or disallow capitalization of the first letter of a comment",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/capitalized-comments"
			},
			fixable: "code",
			schema: [{ enum: ["always", "never"] }, { oneOf: [SCHEMA_BODY, {
				type: "object",
				properties: {
					line: SCHEMA_BODY,
					block: SCHEMA_BODY
				},
				additionalProperties: !1
			}] }],
			messages: {
				unexpectedLowercaseComment: "Comments should not begin with a lowercase character.",
				unexpectedUppercaseComment: "Comments should not begin with an uppercase character."
			}
		},
		create(context) {
			let capitalize = context.options[0] || "always", normalizedOptions = getAllNormalizedOptions(context.options[1]), sourceCode = context.sourceCode;
			createRegExpForIgnorePatterns(normalizedOptions);
			/**
			* Checks whether a comment is an inline comment.
			*
			* For the purpose of this rule, a comment is inline if:
			* 1. The comment is preceded by a token on the same line; and
			* 2. The command is followed by a token on the same line.
			*
			* Note that the comment itself need not be single-line!
			*
			* Also, it follows from this definition that only block comments can
			* be considered as possibly inline. This is because line comments
			* would consume any following tokens on the same line as the comment.
			* @param {ASTNode} comment The comment node to check.
			* @returns {boolean} True if the comment is an inline comment, false
			* otherwise.
			*/
			function isInlineComment(comment) {
				let previousToken = sourceCode.getTokenBefore(comment, { includeComments: !0 }), nextToken = sourceCode.getTokenAfter(comment, { includeComments: !0 });
				return !!(previousToken && nextToken && comment.loc.start.line === previousToken.loc.end.line && comment.loc.end.line === nextToken.loc.start.line);
			}
			/**
			* Determine if a comment follows another comment.
			* @param {ASTNode} comment The comment to check.
			* @returns {boolean} True if the comment follows a valid comment.
			*/
			function isConsecutiveComment(comment) {
				let previousTokenOrComment = sourceCode.getTokenBefore(comment, { includeComments: !0 });
				return !!(previousTokenOrComment && ["Block", "Line"].includes(previousTokenOrComment.type));
			}
			/**
			* Check a comment to determine if it is valid for this rule.
			* @param {ASTNode} comment The comment node to process.
			* @param {Object} options The options for checking this comment.
			* @returns {boolean} True if the comment is valid, false otherwise.
			*/
			function isCommentValid(comment, options) {
				if (DEFAULT_IGNORE_PATTERN.test(comment.value)) return !0;
				let commentWithoutAsterisks = comment.value.replace(/\*/gu, "");
				if (options.ignorePatternRegExp && options.ignorePatternRegExp.test(commentWithoutAsterisks) || options.ignoreInlineComments && isInlineComment(comment) || options.ignoreConsecutiveComments && isConsecutiveComment(comment) || MAYBE_URL.test(commentWithoutAsterisks)) return !0;
				let commentWordCharsOnly = commentWithoutAsterisks.replace(WHITESPACE, "");
				if (commentWordCharsOnly.length === 0) return !0;
				let [firstWordChar] = commentWordCharsOnly;
				if (!LETTER_PATTERN.test(firstWordChar)) return !0;
				let isUppercase = firstWordChar !== firstWordChar.toLocaleLowerCase(), isLowercase = firstWordChar !== firstWordChar.toLocaleUpperCase();
				return !(capitalize === "always" && isLowercase || capitalize === "never" && isUppercase);
			}
			/**
			* Process a comment to determine if it needs to be reported.
			* @param {ASTNode} comment The comment node to process.
			* @returns {void}
			*/
			function processComment(comment) {
				let options = normalizedOptions[comment.type];
				if (!isCommentValid(comment, options)) {
					let messageId = capitalize === "always" ? "unexpectedLowercaseComment" : "unexpectedUppercaseComment";
					context.report({
						node: null,
						loc: comment.loc,
						messageId,
						fix(fixer) {
							let match = comment.value.match(LETTER_PATTERN), char = match[0], charIndex = comment.range[0] + match.index + 2;
							return fixer.replaceTextRange([charIndex, charIndex + char.length], capitalize === "always" ? char.toLocaleUpperCase() : char.toLocaleLowerCase());
						}
					});
				}
			}
			return { Program() {
				sourceCode.getAllComments().filter((token) => token.type !== "Shebang").forEach(processComment);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/capitalized-comments.cjs
module.exports = require_capitalized_comments().create;
//#endregion
