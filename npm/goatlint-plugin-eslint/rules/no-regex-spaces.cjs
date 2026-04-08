const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_regexpp$1 = require("../common/regexpp.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-regex-spaces.js
/**
* @fileoverview Rule to count multiple spaces in regular expressions
* @author Matt DuVall <http://www.mattduvall.com/>
*/
var require_no_regex_spaces = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), regexpp = require_regexpp$1.t(), regExpParser = new regexpp.RegExpParser(), DOUBLE_SPACE = / {2}/u;
	/**
	* Check if node is a string
	* @param {ASTNode} node node to evaluate
	* @returns {boolean} True if its a string
	* @private
	*/
	function isString(node) {
		return node && node.type === "Literal" && typeof node.value == "string";
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow multiple spaces in regular expressions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-regex-spaces"
			},
			schema: [],
			fixable: "code",
			messages: { multipleSpaces: "Spaces are hard to count. Use {{{length}}}." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			/**
			* Validate regular expression
			* @param {ASTNode} nodeToReport Node to report.
			* @param {string} pattern Regular expression pattern to validate.
			* @param {string} rawPattern Raw representation of the pattern in the source code.
			* @param {number} rawPatternStartRange Start range of the pattern in the source code.
			* @param {string} flags Regular expression flags.
			* @returns {void}
			* @private
			*/
			function checkRegex(nodeToReport, pattern, rawPattern, rawPatternStartRange, flags) {
				if (!DOUBLE_SPACE.test(rawPattern)) return;
				let characterClassNodes = [], regExpAST;
				try {
					regExpAST = regExpParser.parsePattern(pattern, 0, pattern.length, {
						unicode: flags.includes("u"),
						unicodeSets: flags.includes("v")
					});
				} catch {
					return;
				}
				regexpp.visitRegExpAST(regExpAST, { onCharacterClassEnter(ccNode) {
					characterClassNodes.push(ccNode);
				} });
				let spacesPattern = /( {2,})(?: [+*{?]|[^+*{?]|$)/gu, match;
				for (; match = spacesPattern.exec(pattern);) {
					let { 1: { length }, index } = match;
					if (characterClassNodes.every(({ start, end }) => index < start || end <= index)) {
						context.report({
							node: nodeToReport,
							messageId: "multipleSpaces",
							data: { length },
							fix(fixer) {
								return pattern === rawPattern ? fixer.replaceTextRange([rawPatternStartRange + index, rawPatternStartRange + index + length], ` {${length}}`) : null;
							}
						});
						return;
					}
				}
			}
			/**
			* Validate regular expression literals
			* @param {ASTNode} node node to validate
			* @returns {void}
			* @private
			*/
			function checkLiteral(node) {
				if (node.regex) {
					let pattern = node.regex.pattern, rawPattern = node.raw.slice(1, node.raw.lastIndexOf("/")), rawPatternStartRange = node.range[0] + 1, flags = node.regex.flags;
					checkRegex(node, pattern, rawPattern, rawPatternStartRange, flags);
				}
			}
			/**
			* Validate strings passed to the RegExp constructor
			* @param {ASTNode} node node to validate
			* @returns {void}
			* @private
			*/
			function checkFunction(node) {
				let scope = sourceCode.getScope(node), regExpVar = astUtils.getVariableByName(scope, "RegExp"), shadowed = regExpVar && regExpVar.defs.length > 0, patternNode = node.arguments[0];
				if (node.callee.type === "Identifier" && node.callee.name === "RegExp" && isString(patternNode) && !shadowed) {
					let pattern = patternNode.value, rawPattern = patternNode.raw.slice(1, -1), rawPatternStartRange = patternNode.range[0] + 1, flags;
					if (node.arguments.length < 2) flags = "";
					else {
						let flagsNode = node.arguments[1];
						if (isString(flagsNode)) flags = flagsNode.value;
						else return;
					}
					checkRegex(node, pattern, rawPattern, rawPatternStartRange, flags);
				}
			}
			return {
				Literal: checkLiteral,
				CallExpression: checkFunction,
				NewExpression: checkFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-regex-spaces.cjs
module.exports = require_no_regex_spaces().create;
//#endregion
