const require_chunk = require("../common/chunk.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/shared/directives.js
/**
* @fileoverview Common utils for directives.
*
* This file contains only shared items for directives.
* If you make a utility for rules, please see `../rules/utils/ast-utils.js`.
*
* @author gfyoung <https://github.com/gfyoung>
*/
var require_directives = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	module.exports = { directivesPattern: /^(eslint(?:-env|-enable|-disable(?:(?:-next)?-line)?)?|exported|globals?)(?:\s|$)/u };
})), require_no_fallthrough = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { directivesPattern } = require_directives(), DEFAULT_FALLTHROUGH_COMMENT = /falls?\s?through/iu;
	/**
	* Checks all segments in a set and returns true if any are reachable.
	* @param {Set<CodePathSegment>} segments The segments to check.
	* @returns {boolean} True if any segment is reachable; false otherwise.
	*/
	function isAnySegmentReachable(segments) {
		for (let segment of segments) if (segment.reachable) return !0;
		return !1;
	}
	/**
	* Checks whether or not a given comment string is really a fallthrough comment and not an ESLint directive.
	* @param {string} comment The comment string to check.
	* @param {RegExp} fallthroughCommentPattern The regular expression used for checking for fallthrough comments.
	* @returns {boolean} `true` if the comment string is truly a fallthrough comment.
	*/
	function isFallThroughComment(comment, fallthroughCommentPattern) {
		return fallthroughCommentPattern.test(comment) && !directivesPattern.test(comment.trim());
	}
	/**
	* Checks whether or not a given case has a fallthrough comment.
	* @param {ASTNode} caseWhichFallsThrough SwitchCase node which falls through.
	* @param {ASTNode} subsequentCase The case after caseWhichFallsThrough.
	* @param {RuleContext} context A rule context which stores comments.
	* @param {RegExp} fallthroughCommentPattern A pattern to match comment to.
	* @returns {null | object} the comment if the case has a valid fallthrough comment, otherwise null
	*/
	function getFallthroughComment(caseWhichFallsThrough, subsequentCase, context, fallthroughCommentPattern) {
		let sourceCode = context.sourceCode;
		if (caseWhichFallsThrough.consequent.length === 1 && caseWhichFallsThrough.consequent[0].type === "BlockStatement") {
			let trailingCloseBrace = sourceCode.getLastToken(caseWhichFallsThrough.consequent[0]), commentInBlock = sourceCode.getCommentsBefore(trailingCloseBrace).pop();
			if (commentInBlock && isFallThroughComment(commentInBlock.value, fallthroughCommentPattern)) return commentInBlock;
		}
		let comment = sourceCode.getCommentsBefore(subsequentCase).pop();
		return comment && isFallThroughComment(comment.value, fallthroughCommentPattern) ? comment : null;
	}
	/**
	* Checks whether a node and a token are separated by blank lines
	* @param {ASTNode} node The node to check
	* @param {Token} token The token to compare against
	* @returns {boolean} `true` if there are blank lines between node and token
	*/
	function hasBlankLinesBetween(node, token) {
		return token.loc.start.line > node.loc.end.line + 1;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{
				allowEmptyCase: !1,
				reportUnusedFallthroughComment: !1
			}],
			docs: {
				description: "Disallow fallthrough of `case` statements",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-fallthrough"
			},
			schema: [{
				type: "object",
				properties: {
					commentPattern: { type: "string" },
					allowEmptyCase: { type: "boolean" },
					reportUnusedFallthroughComment: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: {
				unusedFallthroughComment: "Found a comment that would permit fallthrough, but case cannot fall through.",
				case: "Expected a 'break' statement before 'case'.",
				default: "Expected a 'break' statement before 'default'."
			}
		},
		create(context) {
			let codePathSegments = [], currentCodePathSegments = /* @__PURE__ */ new Set(), sourceCode = context.sourceCode, [{ allowEmptyCase, commentPattern, reportUnusedFallthroughComment }] = context.options, fallthroughCommentPattern = commentPattern ? new RegExp(commentPattern, "u") : DEFAULT_FALLTHROUGH_COMMENT, previousCase = null;
			return {
				onCodePathStart() {
					codePathSegments.push(currentCodePathSegments), currentCodePathSegments = /* @__PURE__ */ new Set();
				},
				onCodePathEnd() {
					currentCodePathSegments = codePathSegments.pop();
				},
				onUnreachableCodePathSegmentStart(segment) {
					currentCodePathSegments.add(segment);
				},
				onUnreachableCodePathSegmentEnd(segment) {
					currentCodePathSegments.delete(segment);
				},
				onCodePathSegmentStart(segment) {
					currentCodePathSegments.add(segment);
				},
				onCodePathSegmentEnd(segment) {
					currentCodePathSegments.delete(segment);
				},
				SwitchCase(node) {
					if (previousCase && previousCase.node.parent === node.parent) {
						let previousCaseFallthroughComment = getFallthroughComment(previousCase.node, node, context, fallthroughCommentPattern);
						previousCase.isFallthrough && !previousCaseFallthroughComment ? context.report({
							messageId: node.test ? "case" : "default",
							node
						}) : reportUnusedFallthroughComment && !previousCase.isSwitchExitReachable && previousCaseFallthroughComment && context.report({
							messageId: "unusedFallthroughComment",
							node: previousCaseFallthroughComment
						});
					}
					previousCase = null;
				},
				"SwitchCase:exit"(node) {
					let nextToken = sourceCode.getTokenAfter(node), isSwitchExitReachable = isAnySegmentReachable(currentCodePathSegments);
					previousCase = {
						node,
						isSwitchExitReachable,
						isFallthrough: isSwitchExitReachable && (node.consequent.length > 0 || !allowEmptyCase && hasBlankLinesBetween(node, nextToken)) && node.parent.cases.at(-1) !== node
					};
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-fallthrough.cjs
module.exports = require_no_fallthrough().create;
//#endregion
