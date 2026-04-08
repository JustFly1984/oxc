const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-warning-comments.js
/**
* @fileoverview Rule that warns about used warning comments
* @author Alexander Schmidt <https://github.com/lxanders>
*/
var require_no_warning_comments = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let escapeRegExp = require_ast_utils$1.n(), astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				location: "start",
				terms: [
					"todo",
					"fixme",
					"xxx"
				]
			}],
			docs: {
				description: "Disallow specified warning terms in comments",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-warning-comments"
			},
			schema: [{
				type: "object",
				properties: {
					terms: {
						type: "array",
						items: { type: "string" }
					},
					location: { enum: ["start", "anywhere"] },
					decoration: {
						type: "array",
						items: {
							type: "string",
							pattern: "^\\S$"
						},
						minItems: 1,
						uniqueItems: !0
					}
				},
				additionalProperties: !1
			}],
			messages: { unexpectedComment: "Unexpected '{{matchedTerm}}' comment: '{{comment}}'." }
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ decoration, location, terms: warningTerms }] = context.options, escapedDecoration = escapeRegExp(decoration ? decoration.join("") : ""), selfConfigRegEx = /\bno-warning-comments\b/u;
			/**
			* Convert a warning term into a RegExp which will match a comment containing that whole word in the specified
			* location ("start" or "anywhere"). If the term starts or ends with non word characters, then the match will not
			* require word boundaries on that side.
			* @param {string} term A term to convert to a RegExp
			* @returns {RegExp} The term converted to a RegExp
			*/
			function convertToRegExp(term) {
				let escaped = escapeRegExp(term), prefix = "";
				location === "start" ? prefix = `^[\\s${escapedDecoration}]*` : /^\w/u.test(term) && (prefix = "\\b");
				let suffix = /\w$/u.test(term) ? "\\b" : "";
				return RegExp(`${prefix}${escaped}${suffix}`, "iu");
			}
			let warningRegExps = warningTerms.map(convertToRegExp);
			/**
			* Checks the specified comment for matches of the configured warning terms and returns the matches.
			* @param {string} comment The comment which is checked.
			* @returns {Array} All matched warning terms for this comment.
			*/
			function commentContainsWarningTerm(comment) {
				let matches = [];
				return warningRegExps.forEach((regex, index) => {
					regex.test(comment) && matches.push(warningTerms[index]);
				}), matches;
			}
			/**
			* Checks the specified node for matching warning comments and reports them.
			* @param {ASTNode} node The AST node being checked.
			* @returns {void} undefined.
			*/
			function checkComment(node) {
				let comment = node.value;
				astUtils.isDirectiveComment(node) && selfConfigRegEx.test(comment) || commentContainsWarningTerm(comment).forEach((matchedTerm) => {
					let commentToDisplay = "", truncated = !1;
					for (let c of comment.trim().split(/\s+/u)) {
						let tmp = commentToDisplay ? `${commentToDisplay} ${c}` : c;
						if (tmp.length <= 40) commentToDisplay = tmp;
						else {
							truncated = !0;
							break;
						}
					}
					context.report({
						node,
						messageId: "unexpectedComment",
						data: {
							matchedTerm,
							comment: `${commentToDisplay}${truncated ? "..." : ""}`
						}
					});
				});
			}
			return { Program() {
				sourceCode.getAllComments().filter((token) => token.type !== "Shebang").forEach(checkComment);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-warning-comments.cjs
module.exports = require_no_warning_comments().create;
//#endregion
