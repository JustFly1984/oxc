const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs"), require_regular_expressions$1 = require("../common/regular-expressions.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/require-unicode-regexp.js
/**
* @fileoverview Rule to enforce the use of `u` or `v` flag on regular expressions.
* @author Toru Nagashima
*/
var require_require_unicode_regexp = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { CALL, CONSTRUCT, ReferenceTracker, getStringIfConstant } = require_eslint_utils$1.t(), astUtils = require_ast_utils$1.t(), { isValidWithUnicodeFlag } = require_regular_expressions$1.t();
	/**
	* Checks whether the flag configuration should be treated as a missing flag.
	* @param {"u"|"v"|undefined} requireFlag A particular flag to require
	* @param {string} flags The regex flags
	* @returns {boolean} Whether the flag configuration results in a missing flag.
	*/
	function checkFlags(requireFlag, flags) {
		let missingFlag;
		return missingFlag = requireFlag === "v" ? !flags.includes("v") : requireFlag === "u" ? !flags.includes("u") : !flags.includes("u") && !flags.includes("v"), missingFlag;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{}],
			docs: {
				description: "Enforce the use of `u` or `v` flag on regular expressions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/require-unicode-regexp"
			},
			hasSuggestions: !0,
			messages: {
				addUFlag: "Add the 'u' flag.",
				addVFlag: "Add the 'v' flag.",
				requireUFlag: "Use the 'u' flag.",
				requireVFlag: "Use the 'v' flag."
			},
			schema: [{
				type: "object",
				properties: { requireFlag: { enum: ["u", "v"] } },
				additionalProperties: !1
			}]
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ requireFlag }] = context.options;
			return {
				"Literal[regex]"(node) {
					checkFlags(requireFlag, node.regex.flags || "") && context.report({
						messageId: requireFlag === "v" ? "requireVFlag" : "requireUFlag",
						node,
						suggest: isValidWithUnicodeFlag(context.languageOptions.ecmaVersion, node.regex.pattern, requireFlag) ? [{
							fix(fixer) {
								let replaceFlag = requireFlag ?? "u", regex = sourceCode.getText(node), slashPos = regex.lastIndexOf("/");
								if (requireFlag) {
									let flag = requireFlag === "u" ? "v" : "u";
									if (regex.includes(flag, slashPos)) return fixer.replaceText(node, regex.slice(0, slashPos) + regex.slice(slashPos).replace(flag, requireFlag));
								}
								return fixer.insertTextAfter(node, replaceFlag);
							},
							messageId: requireFlag === "v" ? "addVFlag" : "addUFlag"
						}] : null
					});
				},
				Program(node) {
					let scope = sourceCode.getScope(node), tracker = new ReferenceTracker(scope), trackMap = { RegExp: {
						[CALL]: !0,
						[CONSTRUCT]: !0
					} };
					for (let { node: refNode } of tracker.iterateGlobalReferences(trackMap)) {
						let [patternNode, flagsNode] = refNode.arguments;
						if (patternNode && patternNode.type === "SpreadElement") continue;
						let pattern = getStringIfConstant(patternNode, scope), flags = getStringIfConstant(flagsNode, scope), missingFlag = !flagsNode;
						typeof flags == "string" && (missingFlag = checkFlags(requireFlag, flags)), missingFlag && context.report({
							messageId: requireFlag === "v" ? "requireVFlag" : "requireUFlag",
							node: refNode,
							suggest: typeof pattern == "string" && isValidWithUnicodeFlag(context.languageOptions.ecmaVersion, pattern, requireFlag) ? [{
								fix(fixer) {
									let replaceFlag = requireFlag ?? "u";
									if (flagsNode) {
										if (flagsNode.type === "Literal" && typeof flagsNode.value == "string" || flagsNode.type === "TemplateLiteral") {
											let flagsNodeText = sourceCode.getText(flagsNode), flag = requireFlag === "u" ? "v" : "u";
											return flags.includes(flag) ? flagsNode.type === "Literal" && flagsNode.raw.includes("\\") || flagsNode.type === "TemplateLiteral" && (flagsNode.expressions.length || flagsNode.quasis.some(({ value: { raw } }) => raw.includes("\\"))) ? null : fixer.replaceText(flagsNode, flagsNodeText.replace(flag, replaceFlag)) : fixer.replaceText(flagsNode, [flagsNodeText.slice(0, flagsNodeText.length - 1), flagsNodeText.slice(flagsNodeText.length - 1)].join(replaceFlag));
										}
										return null;
									}
									let penultimateToken = sourceCode.getLastToken(refNode, { skip: 1 });
									return fixer.insertTextAfter(penultimateToken, astUtils.isCommaToken(penultimateToken) ? ` "${replaceFlag}",` : `, "${replaceFlag}"`);
								},
								messageId: requireFlag === "v" ? "addVFlag" : "addUFlag"
							}] : null
						});
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/require-unicode-regexp.cjs
module.exports = require_require_unicode_regexp().create;
//#endregion
