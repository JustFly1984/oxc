const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs"), require_regexpp$1 = require("../common/regexpp.cjs"), require_regular_expressions$1 = require("../common/regular-expressions.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-regex-literals.js
/**
* @fileoverview Rule to disallow use of the `RegExp` constructor in favor of regular expression literals
* @author Milos Djermanovic
*/
var require_prefer_regex_literals = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), { CALL, CONSTRUCT, ReferenceTracker } = require_eslint_utils$1.t(), { RegExpValidator, visitRegExpAST, RegExpParser } = require_regexpp$1.t(), { canTokensBeAdjacent } = require_ast_utils$1.t(), { REGEXPP_LATEST_ECMA_VERSION } = require_regular_expressions$1.t();
	/**
	* Determines whether the given node is a string literal.
	* @param {ASTNode} node Node to check.
	* @returns {boolean} True if the node is a string literal.
	*/
	function isStringLiteral(node) {
		return node.type === "Literal" && typeof node.value == "string";
	}
	/**
	* Determines whether the given node is a regex literal.
	* @param {ASTNode} node Node to check.
	* @returns {boolean} True if the node is a regex literal.
	*/
	function isRegexLiteral(node) {
		return node.type === "Literal" && Object.hasOwn(node, "regex");
	}
	let validPrecedingTokens = new Set(/* @__PURE__ */ "();)[),)=)+)*)-)?)~)%)**)!)typeof)instanceof)&&)||)??)return)...)delete)void)in)<)>)<=)>=)==)===)!=)!==)<<)>>)>>>)&)|)^):){)=>)*=)<<=)>>=)>>>=)^=)|=)&=)??=)||=)&&=)**=)+=)-=)/=)%=)/)do)break)continue)debugger)case)throw".split(")"));
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ disallowRedundantWrapping: !1 }],
			docs: {
				description: "Disallow use of the `RegExp` constructor in favor of regular expression literals",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/prefer-regex-literals"
			},
			hasSuggestions: !0,
			schema: [{
				type: "object",
				properties: { disallowRedundantWrapping: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: {
				unexpectedRegExp: "Use a regular expression literal instead of the 'RegExp' constructor.",
				replaceWithLiteral: "Replace with an equivalent regular expression literal.",
				replaceWithLiteralAndFlags: "Replace with an equivalent regular expression literal with flags '{{ flags }}'.",
				replaceWithIntendedLiteralAndFlags: "Replace with a regular expression literal with flags '{{ flags }}'.",
				unexpectedRedundantRegExp: "Regular expression literal is unnecessarily wrapped within a 'RegExp' constructor.",
				unexpectedRedundantRegExpWithFlags: "Use regular expression literal with flags instead of the 'RegExp' constructor."
			}
		},
		create(context) {
			let [{ disallowRedundantWrapping }] = context.options, sourceCode = context.sourceCode;
			/**
			* Determines whether the given node is a String.raw`` tagged template expression
			* with a static template literal.
			* @param {ASTNode} node Node to check.
			* @returns {boolean} True if the node is String.raw`` with a static template.
			*/
			function isStringRawTaggedStaticTemplateLiteral(node) {
				return node.type === "TaggedTemplateExpression" && astUtils.isSpecificMemberAccess(node.tag, "String", "raw") && sourceCode.isGlobalReference(astUtils.skipChainExpression(node.tag).object) && astUtils.isStaticTemplateLiteral(node.quasi);
			}
			/**
			* Gets the value of a string
			* @param {ASTNode} node The node to get the string of.
			* @returns {string|null} The value of the node.
			*/
			function getStringValue(node) {
				return isStringLiteral(node) ? node.value : astUtils.isStaticTemplateLiteral(node) ? node.quasis[0].value.cooked : isStringRawTaggedStaticTemplateLiteral(node) ? node.quasi.quasis[0].value.raw : null;
			}
			/**
			* Determines whether the given node is considered to be a static string by the logic of this rule.
			* @param {ASTNode} node Node to check.
			* @returns {boolean} True if the node is a static string.
			*/
			function isStaticString(node) {
				return isStringLiteral(node) || astUtils.isStaticTemplateLiteral(node) || isStringRawTaggedStaticTemplateLiteral(node);
			}
			/**
			* Determines whether the relevant arguments of the given are all static string literals.
			* @param {ASTNode} node Node to check.
			* @returns {boolean} True if all arguments are static strings.
			*/
			function hasOnlyStaticStringArguments(node) {
				let args = node.arguments;
				return !!((args.length === 1 || args.length === 2) && args.every(isStaticString));
			}
			/**
			* Determines whether the arguments of the given node indicate that a regex literal is unnecessarily wrapped.
			* @param {ASTNode} node Node to check.
			* @returns {boolean} True if the node already contains a regex literal argument.
			*/
			function isUnnecessarilyWrappedRegexLiteral(node) {
				let args = node.arguments;
				return !!(args.length === 1 && isRegexLiteral(args[0]) || args.length === 2 && isRegexLiteral(args[0]) && isStaticString(args[1]));
			}
			/**
			* Returns a ecmaVersion compatible for regexpp.
			* @param {number} ecmaVersion The ecmaVersion to convert.
			* @returns {import("@eslint-community/regexpp/ecma-versions").EcmaVersion} The resulting ecmaVersion compatible for regexpp.
			*/
			function getRegexppEcmaVersion(ecmaVersion) {
				return ecmaVersion <= 5 ? 5 : Math.min(ecmaVersion, REGEXPP_LATEST_ECMA_VERSION);
			}
			let regexppEcmaVersion = getRegexppEcmaVersion(context.languageOptions.ecmaVersion);
			/**
			* Makes a character escaped or else returns null.
			* @param {string} character The character to escape.
			* @returns {string} The resulting escaped character.
			*/
			function resolveEscapes(character) {
				switch (character) {
					case "\n":
					case "\\\n": return "\\n";
					case "\r":
					case "\\\r": return "\\r";
					case "	":
					case "\\	": return "\\t";
					case "\v":
					case "\\\v": return "\\v";
					case "\f":
					case "\\\f": return "\\f";
					case "/": return "\\/";
					default: return null;
				}
			}
			/**
			* Checks whether the given regex and flags are valid for the ecma version or not.
			* @param {string} pattern The regex pattern to check.
			* @param {string | undefined} flags The regex flags to check.
			* @returns {boolean} True if the given regex pattern and flags are valid for the ecma version.
			*/
			function isValidRegexForEcmaVersion(pattern, flags) {
				let validator = new RegExpValidator({ ecmaVersion: regexppEcmaVersion });
				try {
					return validator.validatePattern(pattern, 0, pattern.length, {
						unicode: flags ? flags.includes("u") : !1,
						unicodeSets: flags ? flags.includes("v") : !1
					}), flags && validator.validateFlags(flags), !0;
				} catch {
					return !1;
				}
			}
			/**
			* Checks whether two given regex flags contain the same flags or not.
			* @param {string} flagsA The regex flags.
			* @param {string} flagsB The regex flags.
			* @returns {boolean} True if two regex flags contain same flags.
			*/
			function areFlagsEqual(flagsA, flagsB) {
				return [...flagsA].sort().join("") === [...flagsB].sort().join("");
			}
			/**
			* Merges two regex flags.
			* @param {string} flagsA The regex flags.
			* @param {string} flagsB The regex flags.
			* @returns {string} The merged regex flags.
			*/
			function mergeRegexFlags(flagsA, flagsB) {
				return [...new Set([...flagsA, ...flagsB])].join("");
			}
			/**
			* Checks whether a give node can be fixed to the given regex pattern and flags.
			* @param {ASTNode} node The node to check.
			* @param {string} pattern The regex pattern to check.
			* @param {string} flags The regex flags
			* @returns {boolean} True if a node can be fixed to the given regex pattern and flags.
			*/
			function canFixTo(node, pattern, flags) {
				let tokenBefore = sourceCode.getTokenBefore(node);
				return sourceCode.getCommentsInside(node).length === 0 && (!tokenBefore || validPrecedingTokens.has(tokenBefore.value)) && isValidRegexForEcmaVersion(pattern, flags);
			}
			/**
			* Returns a safe output code considering the before and after tokens.
			* @param {ASTNode} node The regex node.
			* @param {string} newRegExpValue The new regex expression value.
			* @returns {string} The output code.
			*/
			function getSafeOutput(node, newRegExpValue) {
				let tokenBefore = sourceCode.getTokenBefore(node), tokenAfter = sourceCode.getTokenAfter(node);
				return (tokenBefore && !canTokensBeAdjacent(tokenBefore, newRegExpValue) && tokenBefore.range[1] === node.range[0] ? " " : "") + newRegExpValue + (tokenAfter && !canTokensBeAdjacent(newRegExpValue, tokenAfter) && node.range[1] === tokenAfter.range[0] ? " " : "");
			}
			return { Program(node) {
				let tracker = new ReferenceTracker(sourceCode.getScope(node)), traceMap = { RegExp: {
					[CALL]: !0,
					[CONSTRUCT]: !0
				} };
				for (let { node: refNode } of tracker.iterateGlobalReferences(traceMap)) if (disallowRedundantWrapping && isUnnecessarilyWrappedRegexLiteral(refNode)) {
					let regexNode = refNode.arguments[0];
					if (refNode.arguments.length === 2) {
						let suggests = [], argFlags = getStringValue(refNode.arguments[1]) || "";
						canFixTo(refNode, regexNode.regex.pattern, argFlags) && suggests.push({
							messageId: "replaceWithLiteralAndFlags",
							pattern: regexNode.regex.pattern,
							flags: argFlags
						});
						let mergedFlags = mergeRegexFlags(regexNode.regex.flags || "", argFlags);
						!areFlagsEqual(mergedFlags, argFlags) && canFixTo(refNode, regexNode.regex.pattern, mergedFlags) && suggests.push({
							messageId: "replaceWithIntendedLiteralAndFlags",
							pattern: regexNode.regex.pattern,
							flags: mergedFlags
						}), context.report({
							node: refNode,
							messageId: "unexpectedRedundantRegExpWithFlags",
							suggest: suggests.map(({ flags, pattern, messageId }) => ({
								messageId,
								data: { flags },
								fix(fixer) {
									return fixer.replaceText(refNode, getSafeOutput(refNode, `/${pattern}/${flags}`));
								}
							}))
						});
					} else {
						let outputs = [];
						canFixTo(refNode, regexNode.regex.pattern, regexNode.regex.flags) && outputs.push(sourceCode.getText(regexNode)), context.report({
							node: refNode,
							messageId: "unexpectedRedundantRegExp",
							suggest: outputs.map((output) => ({
								messageId: "replaceWithLiteral",
								fix(fixer) {
									return fixer.replaceText(refNode, getSafeOutput(refNode, output));
								}
							}))
						});
					}
				} else if (hasOnlyStaticStringArguments(refNode)) {
					let regexContent = getStringValue(refNode.arguments[0]), noFix = !1, flags;
					if (refNode.arguments[1] && (flags = getStringValue(refNode.arguments[1])), canFixTo(refNode, regexContent, flags) || (noFix = !0), /^[-\w\\[\](){} \t\r\n\v\f!@#$%^&*+=/~`.><?,'"|:;]*$/u.test(regexContent) || (noFix = !0), regexContent && !noFix) {
						let charIncrease = 0;
						visitRegExpAST(new RegExpParser({ ecmaVersion: regexppEcmaVersion }).parsePattern(regexContent, 0, regexContent.length, {
							unicode: flags ? flags.includes("u") : !1,
							unicodeSets: flags ? flags.includes("v") : !1
						}), { onCharacterEnter(characterNode) {
							let escaped = resolveEscapes(characterNode.raw);
							escaped && (regexContent = regexContent.slice(0, characterNode.start + charIncrease) + escaped + regexContent.slice(characterNode.end + charIncrease), characterNode.raw.length === 1 && (charIncrease += 1));
						} });
					}
					let newRegExpValue = `/${regexContent || "(?:)"}/${flags || ""}`;
					context.report({
						node: refNode,
						messageId: "unexpectedRegExp",
						suggest: noFix ? [] : [{
							messageId: "replaceWithLiteral",
							fix(fixer) {
								return fixer.replaceText(refNode, getSafeOutput(refNode, newRegExpValue));
							}
						}]
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-regex-literals.cjs
module.exports = require_prefer_regex_literals().create;
//#endregion
