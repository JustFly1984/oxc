const require_chunk = require("../common/chunk.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs"), require_regexpp$1 = require("../common/regexpp.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-useless-backreference.js
/**
* @fileoverview Rule to disallow useless backreferences in regular expressions
* @author Milos Djermanovic
*/
var require_no_useless_backreference = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { CALL, CONSTRUCT, ReferenceTracker, getStringIfConstant } = require_eslint_utils$1.t(), { RegExpParser, visitRegExpAST } = require_regexpp$1.t(), parser = new RegExpParser();
	/**
	* Finds the path from the given `regexpp` AST node to the root node.
	* @param {regexpp.Node} node Node.
	* @returns {regexpp.Node[]} Array that starts with the given node and ends with the root node.
	*/
	function getPathToRoot(node) {
		let path = [], current = node;
		do
			path.push(current), current = current.parent;
		while (current);
		return path;
	}
	/**
	* Determines whether the given `regexpp` AST node is a lookaround node.
	* @param {regexpp.Node} node Node.
	* @returns {boolean} `true` if it is a lookaround node.
	*/
	function isLookaround(node) {
		return node.type === "Assertion" && (node.kind === "lookahead" || node.kind === "lookbehind");
	}
	/**
	* Determines whether the given `regexpp` AST node is a negative lookaround node.
	* @param {regexpp.Node} node Node.
	* @returns {boolean} `true` if it is a negative lookaround node.
	*/
	function isNegativeLookaround(node) {
		return isLookaround(node) && node.negate;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow useless backreferences in regular expressions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-useless-backreference"
			},
			schema: [],
			messages: {
				nested: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} from within that group.",
				forward: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which appears later in the pattern.",
				backward: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which appears before in the same lookbehind.",
				disjunctive: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which is in another alternative.",
				intoNegativeLookaround: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which is in a negative lookaround."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Checks and reports useless backreferences in the given regular expression.
			* @param {ASTNode} node Node that represents regular expression. A regex literal or RegExp constructor call.
			* @param {string} pattern Regular expression pattern.
			* @param {string} flags Regular expression flags.
			* @returns {void}
			*/
			function checkRegex(node, pattern, flags) {
				let regExpAST;
				try {
					regExpAST = parser.parsePattern(pattern, 0, pattern.length, {
						unicode: flags.includes("u"),
						unicodeSets: flags.includes("v")
					});
				} catch {
					return;
				}
				visitRegExpAST(regExpAST, { onBackreferenceEnter(bref) {
					let groups = [bref.resolved].flat(), brefPath = getPathToRoot(bref), problems = groups.map((group) => {
						let groupPath = getPathToRoot(group);
						if (brefPath.includes(group)) return {
							messageId: "nested",
							group
						};
						let i = brefPath.length - 1, j = groupPath.length - 1;
						do
							i--, j--;
						while (brefPath[i] === groupPath[j]);
						let indexOfLowestCommonAncestor = j + 1, groupCut = groupPath.slice(0, indexOfLowestCommonAncestor), lowestCommonLookaround = groupPath.slice(indexOfLowestCommonAncestor).find(isLookaround), isMatchingBackward = lowestCommonLookaround && lowestCommonLookaround.kind === "lookbehind";
						return groupCut.at(-1).type === "Alternative" ? {
							messageId: "disjunctive",
							group
						} : !isMatchingBackward && bref.end <= group.start ? {
							messageId: "forward",
							group
						} : isMatchingBackward && group.end <= bref.start ? {
							messageId: "backward",
							group
						} : groupCut.some(isNegativeLookaround) ? {
							messageId: "intoNegativeLookaround",
							group
						} : null;
					});
					if (problems.length === 0 || problems.some((problem) => !problem)) return;
					let problemsToReport, problemsInSameDisjunction = problems.filter((problem) => problem.messageId !== "disjunctive");
					problemsToReport = problemsInSameDisjunction.length ? problemsInSameDisjunction : problems;
					let [{ messageId, group }, ...other] = problemsToReport, otherGroups = "";
					other.length === 1 ? otherGroups = " and another group" : other.length > 1 && (otherGroups = ` and other ${other.length} groups`), context.report({
						node,
						messageId,
						data: {
							bref: bref.raw,
							group: group.raw,
							otherGroups
						}
					});
				} });
			}
			return {
				"Literal[regex]"(node) {
					let { pattern, flags } = node.regex;
					checkRegex(node, pattern, flags);
				},
				Program(node) {
					let scope = sourceCode.getScope(node), tracker = new ReferenceTracker(scope), traceMap = { RegExp: {
						[CALL]: !0,
						[CONSTRUCT]: !0
					} };
					for (let { node: refNode } of tracker.iterateGlobalReferences(traceMap)) {
						let [patternNode, flagsNode] = refNode.arguments, pattern = getStringIfConstant(patternNode, scope), flags = getStringIfConstant(flagsNode, scope);
						typeof pattern == "string" && checkRegex(refNode, pattern, flags || "");
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-useless-backreference.cjs
module.exports = require_no_useless_backreference().create;
//#endregion
