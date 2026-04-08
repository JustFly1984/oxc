const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/spaced-comment.js
/**
* @fileoverview Source code for spaced-comments rule
* @author Gyandeep Singh
* @deprecated in ESLint v8.53.0
*/
var require_spaced_comment = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let escapeRegExp = require_ast_utils$1.n(), astUtils = require_ast_utils$1.t();
	/**
	* Escapes the control characters of a given string.
	* @param {string} s A string to escape.
	* @returns {string} An escaped string.
	*/
	function escape(s) {
		return `(?:${escapeRegExp(s)})`;
	}
	/**
	* Escapes the control characters of a given string.
	* And adds a repeat flag.
	* @param {string} s A string to escape.
	* @returns {string} An escaped string.
	*/
	function escapeAndRepeat(s) {
		return `${escape(s)}+`;
	}
	/**
	* Parses `markers` option.
	* If markers don't include `"*"`, this adds `"*"` to allow JSDoc comments.
	* @param {string[]} [markers] A marker list.
	* @returns {string[]} A marker list.
	*/
	function parseMarkersOption(markers) {
		return markers.includes("*") ? markers : markers.concat("*");
	}
	/**
	* Creates string pattern for exceptions.
	* Generated pattern:
	*
	* 1. A space or an exception pattern sequence.
	* @param {string[]} exceptions An exception pattern list.
	* @returns {string} A regular expression string for exceptions.
	*/
	function createExceptionsPattern(exceptions) {
		let pattern = "";
		return exceptions.length === 0 ? pattern += "\\s" : (pattern += "(?:\\s|", exceptions.length === 1 ? pattern += escapeAndRepeat(exceptions[0]) : (pattern += "(?:", pattern += exceptions.map(escapeAndRepeat).join("|"), pattern += ")"), pattern += `(?:$|[${Array.from(astUtils.LINEBREAKS).join("")}]))`), pattern;
	}
	/**
	* Creates RegExp object for `always` mode.
	* Generated pattern for beginning of comment:
	*
	* 1. First, a marker or nothing.
	* 2. Next, a space or an exception pattern sequence.
	* @param {string[]} markers A marker list.
	* @param {string[]} exceptions An exception pattern list.
	* @returns {RegExp} A RegExp object for the beginning of a comment in `always` mode.
	*/
	function createAlwaysStylePattern(markers, exceptions) {
		let pattern = "^";
		return markers.length === 1 ? pattern += escape(markers[0]) : (pattern += "(?:", pattern += markers.map(escape).join("|"), pattern += ")"), pattern += "?", pattern += createExceptionsPattern(exceptions), new RegExp(pattern, "u");
	}
	/**
	* Creates RegExp object for `never` mode.
	* Generated pattern for beginning of comment:
	*
	* 1. First, a marker or nothing (captured).
	* 2. Next, a space or a tab.
	* @param {string[]} markers A marker list.
	* @returns {RegExp} A RegExp object for `never` mode.
	*/
	function createNeverStylePattern(markers) {
		let pattern = `^(${markers.map(escape).join("|")})?[ \t]+`;
		return new RegExp(pattern, "u");
	}
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
						name: "spaced-comment",
						url: "https://eslint.style/rules/spaced-comment"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Enforce consistent spacing after the `//` or `/*` in a comment",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/spaced-comment"
			},
			fixable: "whitespace",
			schema: [{ enum: ["always", "never"] }, {
				type: "object",
				properties: {
					exceptions: {
						type: "array",
						items: { type: "string" }
					},
					markers: {
						type: "array",
						items: { type: "string" }
					},
					line: {
						type: "object",
						properties: {
							exceptions: {
								type: "array",
								items: { type: "string" }
							},
							markers: {
								type: "array",
								items: { type: "string" }
							}
						},
						additionalProperties: !1
					},
					block: {
						type: "object",
						properties: {
							exceptions: {
								type: "array",
								items: { type: "string" }
							},
							markers: {
								type: "array",
								items: { type: "string" }
							},
							balanced: {
								type: "boolean",
								default: !1
							}
						},
						additionalProperties: !1
					}
				},
				additionalProperties: !1
			}],
			messages: {
				unexpectedSpaceAfterMarker: "Unexpected space or tab after marker ({{refChar}}) in comment.",
				expectedExceptionAfter: "Expected exception block, space or tab after '{{refChar}}' in comment.",
				unexpectedSpaceBefore: "Unexpected space or tab before '*/' in comment.",
				unexpectedSpaceAfter: "Unexpected space or tab after '{{refChar}}' in comment.",
				expectedSpaceBefore: "Expected space or tab before '*/' in comment.",
				expectedSpaceAfter: "Expected space or tab after '{{refChar}}' in comment."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, requireSpace = context.options[0] !== "never", config = context.options[1] || {}, balanced = config.block && config.block.balanced, styleRules = ["block", "line"].reduce((rule, type) => {
				let markers = parseMarkersOption(config[type] && config[type].markers || config.markers || []), exceptions = config[type] && config[type].exceptions || config.exceptions || [];
				return rule[type] = {
					beginRegex: requireSpace ? createAlwaysStylePattern(markers, exceptions) : createNeverStylePattern(markers),
					endRegex: RegExp(balanced && requireSpace ? `${createExceptionsPattern(exceptions)}$` : "[ 	]+$", "u"),
					hasExceptions: exceptions.length > 0,
					captureMarker: RegExp(`^(${markers.map(escape).join("|")})`, "u"),
					markers: new Set(markers)
				}, rule;
			}, {});
			/**
			* Reports a beginning spacing error with an appropriate message.
			* @param {ASTNode} node A comment node to check.
			* @param {string} messageId An error message to report.
			* @param {Array} match An array of match results for markers.
			* @param {string} refChar Character used for reference in the error message.
			* @returns {void}
			*/
			function reportBegin(node, messageId, match, refChar) {
				let commentIdentifier = node.type.toLowerCase() === "block" ? "/*" : "//";
				context.report({
					node,
					fix(fixer) {
						let start = node.range[0], end = start + 2;
						return requireSpace ? (match && (end += match[0].length), fixer.insertTextAfterRange([start, end], " ")) : (end += match[0].length, fixer.replaceTextRange([start, end], commentIdentifier + (match[1] ? match[1] : "")));
					},
					messageId,
					data: { refChar }
				});
			}
			/**
			* Reports an ending spacing error with an appropriate message.
			* @param {ASTNode} node A comment node to check.
			* @param {string} messageId An error message to report.
			* @param {string} match An array of the matched whitespace characters.
			* @returns {void}
			*/
			function reportEnd(node, messageId, match) {
				context.report({
					node,
					fix(fixer) {
						if (requireSpace) return fixer.insertTextAfterRange([node.range[0], node.range[1] - 2], " ");
						let end = node.range[1] - 2, start = end - match[0].length;
						return fixer.replaceTextRange([start, end], "");
					},
					messageId
				});
			}
			/**
			* Reports a given comment if it's invalid.
			* @param {ASTNode} node a comment node to check.
			* @returns {void}
			*/
			function checkCommentForSpace(node) {
				let type = node.type.toLowerCase(), rule = styleRules[type], commentIdentifier = type === "block" ? "/*" : "//";
				if (node.value.length === 0 || rule.markers.has(node.value)) return;
				let beginMatch = rule.beginRegex.exec(node.value), endMatch = rule.endRegex.exec(node.value);
				if (requireSpace) {
					if (!beginMatch) {
						let hasMarker = rule.captureMarker.exec(node.value), marker = hasMarker ? commentIdentifier + hasMarker[0] : commentIdentifier;
						rule.hasExceptions ? reportBegin(node, "expectedExceptionAfter", hasMarker, marker) : reportBegin(node, "expectedSpaceAfter", hasMarker, marker);
					}
					balanced && type === "block" && !endMatch && reportEnd(node, "expectedSpaceBefore");
				} else beginMatch && (beginMatch[1] ? reportBegin(node, "unexpectedSpaceAfterMarker", beginMatch, beginMatch[1]) : reportBegin(node, "unexpectedSpaceAfter", beginMatch, commentIdentifier)), balanced && type === "block" && endMatch && reportEnd(node, "unexpectedSpaceBefore", endMatch);
			}
			return { Program() {
				sourceCode.getAllComments().filter((token) => token.type !== "Shebang").forEach(checkCommentForSpace);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/spaced-comment.cjs
module.exports = require_spaced_comment().create;
//#endregion
