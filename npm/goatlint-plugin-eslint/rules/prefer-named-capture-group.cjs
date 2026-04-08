const require_chunk = require("../common/chunk.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs"), require_regexpp$1 = require("../common/regexpp.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-named-capture-group.js
/**
* @fileoverview Rule to enforce requiring named capture groups in regular expression.
* @author Pig Fang <https://github.com/g-plane>
*/
var require_prefer_named_capture_group = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { CALL, CONSTRUCT, ReferenceTracker, getStringIfConstant } = require_eslint_utils$1.t(), regexpp = require_regexpp$1.t(), parser = new regexpp.RegExpParser();
	/**
	* Creates fixer suggestions for the regex, if statically determinable.
	* @param {number} groupStart Starting index of the regex group.
	* @param {string} pattern The regular expression pattern to be checked.
	* @param {string} rawText Source text of the regexNode.
	* @param {ASTNode} regexNode AST node which contains the regular expression.
	* @returns {Array<SuggestedEdit>} Fixer suggestions for the regex, if statically determinable.
	*/
	function suggestIfPossible(groupStart, pattern, rawText, regexNode) {
		switch (regexNode.type) {
			case "Literal":
				if (typeof regexNode.value == "string" && rawText.includes("\\")) return null;
				break;
			case "TemplateLiteral":
				if (regexNode.expressions.length || rawText.slice(1, -1) !== pattern) return null;
				break;
			default: return null;
		}
		let start = regexNode.range[0] + groupStart + 2;
		return [{
			fix(fixer) {
				let highestTempCount = (pattern.match(/temp\d+/gu) || []).reduce((previous, next) => Math.max(previous, Number(next.slice(4))), 0);
				return fixer.insertTextBeforeRange([start, start], `?<temp${highestTempCount + 1}>`);
			},
			messageId: "addGroupName"
		}, {
			fix(fixer) {
				return fixer.insertTextBeforeRange([start, start], "?:");
			},
			messageId: "addNonCapture"
		}];
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce using named capture group in regular expression",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/prefer-named-capture-group"
			},
			hasSuggestions: !0,
			schema: [],
			messages: {
				addGroupName: "Add name to capture group.",
				addNonCapture: "Convert group to non-capturing.",
				required: "Capture group '{{group}}' should be converted to a named or non-capturing group."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Function to check regular expression.
			* @param {string} pattern The regular expression pattern to be checked.
			* @param {ASTNode} node AST node which contains the regular expression or a call/new expression.
			* @param {ASTNode} regexNode AST node which contains the regular expression.
			* @param {string|null} flags The regular expression flags to be checked.
			* @returns {void}
			*/
			function checkRegex(pattern, node, regexNode, flags) {
				let ast;
				try {
					ast = parser.parsePattern(pattern, 0, pattern.length, {
						unicode: !!(flags && flags.includes("u")),
						unicodeSets: !!(flags && flags.includes("v"))
					});
				} catch {
					return;
				}
				regexpp.visitRegExpAST(ast, { onCapturingGroupEnter(group) {
					if (!group.name) {
						let rawText = sourceCode.getText(regexNode), suggest = suggestIfPossible(group.start, pattern, rawText, regexNode);
						context.report({
							node,
							messageId: "required",
							data: { group: group.raw },
							suggest
						});
					}
				} });
			}
			return {
				Literal(node) {
					node.regex && checkRegex(node.regex.pattern, node, node, node.regex.flags);
				},
				Program(node) {
					let tracker = new ReferenceTracker(sourceCode.getScope(node)), traceMap = { RegExp: {
						[CALL]: !0,
						[CONSTRUCT]: !0
					} };
					for (let { node: refNode } of tracker.iterateGlobalReferences(traceMap)) {
						let regex = getStringIfConstant(refNode.arguments[0]), flags = getStringIfConstant(refNode.arguments[1]);
						regex && checkRegex(regex, refNode, refNode.arguments[0], flags);
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-named-capture-group.cjs
module.exports = require_prefer_named_capture_group().create;
//#endregion
