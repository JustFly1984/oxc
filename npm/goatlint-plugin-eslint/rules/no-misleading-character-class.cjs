const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs"), require_regexpp$1 = require("../common/regexpp.cjs"), require_regular_expressions$1 = require("../common/regular-expressions.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/utils/unicode/is-combining-character.js
/**
* @author Toru Nagashima <https://github.com/mysticatea>
*/
var require_is_combining_character = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* Check whether a given character is a combining mark or not.
	* @param {number} codePoint The character code to check.
	* @returns {boolean} `true` if the character belongs to the category, any of `Mc`, `Me`, and `Mn`.
	*/
	module.exports = function isCombiningCharacter(codePoint) {
		return /^[\p{Mc}\p{Me}\p{Mn}]$/u.test(String.fromCodePoint(codePoint));
	};
})), require_is_emoji_modifier = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* Check whether a given character is an emoji modifier.
	* @param {number} code The character code to check.
	* @returns {boolean} `true` if the character is an emoji modifier.
	*/
	module.exports = function isEmojiModifier(code) {
		return code >= 127995 && code <= 127999;
	};
})), require_is_regional_indicator_symbol = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* Check whether a given character is a regional indicator symbol.
	* @param {number} code The character code to check.
	* @returns {boolean} `true` if the character is a regional indicator symbol.
	*/
	module.exports = function isRegionalIndicatorSymbol(code) {
		return code >= 127462 && code <= 127487;
	};
})), require_is_surrogate_pair = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* Check whether given two characters are a surrogate pair.
	* @param {number} lead The code of the lead character.
	* @param {number} tail The code of the tail character.
	* @returns {boolean} `true` if the character pair is a surrogate pair.
	*/
	module.exports = function isSurrogatePair(lead, tail) {
		return lead >= 55296 && lead < 56320 && tail >= 56320 && tail < 57344;
	};
})), require_unicode = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	module.exports = {
		isCombiningCharacter: require_is_combining_character(),
		isEmojiModifier: require_is_emoji_modifier(),
		isRegionalIndicatorSymbol: require_is_regional_indicator_symbol(),
		isSurrogatePair: require_is_surrogate_pair()
	};
})), require_char_source = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* Represents a code unit produced by the evaluation of a JavaScript common token like a string
	* literal or template token.
	*/
	var CodeUnit = class {
		constructor(start, source) {
			this.start = start, this.source = source;
		}
		get end() {
			return this.start + this.length;
		}
		get length() {
			return this.source.length;
		}
	}, TextReader = class {
		constructor(source) {
			this.source = source, this.pos = 0;
		}
		/**
		* Advances the reading position of the specified number of characters.
		* @param {number} length Number of characters to advance.
		* @returns {void}
		*/
		advance(length) {
			this.pos += length;
		}
		/**
		* Reads characters from the source.
		* @param {number} [offset=0] The offset where reading starts, relative to the current position.
		* @param {number} [length=1] Number of characters to read.
		* @returns {string} A substring of source characters.
		*/
		read(offset = 0, length = 1) {
			let start = offset + this.pos;
			return this.source.slice(start, start + length);
		}
	};
	let SIMPLE_ESCAPE_SEQUENCES = {
		__proto__: null,
		b: "\b",
		f: "\f",
		n: "\n",
		r: "\r",
		t: "	",
		v: "\v"
	};
	/**
	* Reads a hex escape sequence.
	* @param {TextReader} reader The reader should be positioned on the first hexadecimal digit.
	* @param {number} length The number of hexadecimal digits.
	* @returns {string} A code unit.
	*/
	function readHexSequence(reader, length) {
		let str = reader.read(0, length), charCode = parseInt(str, 16);
		return reader.advance(length), String.fromCharCode(charCode);
	}
	/**
	* Reads a Unicode escape sequence.
	* @param {TextReader} reader The reader should be positioned after the "u".
	* @returns {string} A code unit.
	*/
	function readUnicodeSequence(reader) {
		let regExp = /\{(?<hexDigits>[\dA-F]+)\}/iuy;
		regExp.lastIndex = reader.pos;
		let match = regExp.exec(reader.source);
		if (match) {
			let codePoint = parseInt(match.groups.hexDigits, 16);
			return reader.pos = regExp.lastIndex, String.fromCodePoint(codePoint);
		}
		return readHexSequence(reader, 4);
	}
	/**
	* Reads an octal escape sequence.
	* @param {TextReader} reader The reader should be positioned after the first octal digit.
	* @param {number} maxLength The maximum number of octal digits.
	* @returns {string} A code unit.
	*/
	function readOctalSequence(reader, maxLength) {
		let [octalStr] = reader.read(-1, maxLength).match(/^[0-7]+/u);
		reader.advance(octalStr.length - 1);
		let octal = parseInt(octalStr, 8);
		return String.fromCharCode(octal);
	}
	/**
	* Reads an escape sequence or line continuation.
	* @param {TextReader} reader The reader should be positioned on the backslash.
	* @returns {string} A string of zero, one or two code units.
	*/
	function readEscapeSequenceOrLineContinuation(reader) {
		let char = reader.read(1);
		reader.advance(2);
		let unitChar = SIMPLE_ESCAPE_SEQUENCES[char];
		if (unitChar) return unitChar;
		switch (char) {
			case "x": return readHexSequence(reader, 2);
			case "u": return readUnicodeSequence(reader);
			case "\r": reader.read() === "\n" && reader.advance(1);
			case "\n":
			case "\u2028":
			case "\u2029": return "";
			case "0":
			case "1":
			case "2":
			case "3": return readOctalSequence(reader, 3);
			case "4":
			case "5":
			case "6":
			case "7": return readOctalSequence(reader, 2);
			default: return char;
		}
	}
	/**
	* Reads an escape sequence or line continuation and generates the respective `CodeUnit` elements.
	* @param {TextReader} reader The reader should be positioned on the backslash.
	* @returns {Generator<CodeUnit>} Zero, one or two `CodeUnit` elements.
	*/
	function* mapEscapeSequenceOrLineContinuation(reader) {
		let start = reader.pos, str = readEscapeSequenceOrLineContinuation(reader), end = reader.pos, source = reader.source.slice(start, end);
		switch (str.length) {
			case 0: break;
			case 1:
				yield new CodeUnit(start, source);
				break;
			default:
				yield new CodeUnit(start, source), yield new CodeUnit(start, source);
				break;
		}
	}
	/**
	* Parses a string literal.
	* @param {string} source The string literal to parse, including the delimiting quotes.
	* @returns {CodeUnit[]} A list of code units produced by the string literal.
	*/
	function parseStringLiteral(source) {
		let reader = new TextReader(source), quote = reader.read();
		reader.advance(1);
		let codeUnits = [];
		for (;;) {
			let char = reader.read();
			if (char === quote) break;
			char === "\\" ? codeUnits.push(...mapEscapeSequenceOrLineContinuation(reader)) : (codeUnits.push(new CodeUnit(reader.pos, char)), reader.advance(1));
		}
		return codeUnits;
	}
	/**
	* Parses a template token.
	* @param {string} source The template token to parse, including the delimiting sequences `` ` ``, `${` and `}`.
	* @returns {CodeUnit[]} A list of code units produced by the template token.
	*/
	function parseTemplateToken(source) {
		let reader = new TextReader(source);
		reader.advance(1);
		let codeUnits = [];
		for (;;) {
			let char = reader.read();
			if (char === "`" || char === "$" && reader.read(1) === "{") break;
			if (char === "\\") codeUnits.push(...mapEscapeSequenceOrLineContinuation(reader));
			else {
				let unitSource;
				unitSource = char === "\r" && reader.read(1) === "\n" ? "\r\n" : char, codeUnits.push(new CodeUnit(reader.pos, unitSource)), reader.advance(unitSource.length);
			}
		}
		return codeUnits;
	}
	module.exports = {
		parseStringLiteral,
		parseTemplateToken
	};
})), require_no_misleading_character_class = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { CALL, CONSTRUCT, ReferenceTracker, getStaticValue, getStringIfConstant } = require_eslint_utils$1.t(), { RegExpParser, visitRegExpAST } = require_regexpp$1.t(), { isCombiningCharacter, isEmojiModifier, isRegionalIndicatorSymbol, isSurrogatePair } = require_unicode(), astUtils = require_ast_utils$1.t(), { isValidWithUnicodeFlag } = require_regular_expressions$1.t(), { parseStringLiteral, parseTemplateToken } = require_char_source();
	/**
	* @typedef {import('@eslint-community/regexpp').AST.Character} Character
	* @typedef {import('@eslint-community/regexpp').AST.CharacterClassElement} CharacterClassElement
	*/
	/**
	* Iterate character sequences of a given nodes.
	*
	* CharacterClassRange syntax can steal a part of character sequence,
	* so this function reverts CharacterClassRange syntax and restore the sequence.
	* @param {CharacterClassElement[]} nodes The node list to iterate character sequences.
	* @returns {IterableIterator<Character[]>} The list of character sequences.
	*/
	function* iterateCharacterSequence(nodes) {
		/** @type {Character[]} */
		let seq = [];
		for (let node of nodes) switch (node.type) {
			case "Character":
				seq.push(node);
				break;
			case "CharacterClassRange":
				seq.push(node.min), yield seq, seq = [node.max];
				break;
			case "CharacterSet":
			case "CharacterClass":
			case "ClassStringDisjunction":
			case "ExpressionCharacterClass":
				seq.length > 0 && (yield seq, seq = []);
				break;
		}
		seq.length > 0 && (yield seq);
	}
	/**
	* Checks whether the given character node is a Unicode code point escape or not.
	* @param {Character} char the character node to check.
	* @returns {boolean} `true` if the character node is a Unicode code point escape.
	*/
	function isUnicodeCodePointEscape(char) {
		return /^\\u\{[\da-f]+\}$/iu.test(char.raw);
	}
	/**
	* Each function returns matched characters if it detects that kind of problem.
	* @type {Record<string, (chars: Character[]) => IterableIterator<Character[]>>}
	*/
	let findCharacterSequences = {
		*surrogatePairWithoutUFlag(chars) {
			for (let [index, char] of chars.entries()) {
				let previous = chars[index - 1];
				previous && char && isSurrogatePair(previous.value, char.value) && !isUnicodeCodePointEscape(previous) && !isUnicodeCodePointEscape(char) && (yield [previous, char]);
			}
		},
		*surrogatePair(chars) {
			for (let [index, char] of chars.entries()) {
				let previous = chars[index - 1];
				previous && char && isSurrogatePair(previous.value, char.value) && (isUnicodeCodePointEscape(previous) || isUnicodeCodePointEscape(char)) && (yield [previous, char]);
			}
		},
		*combiningClass(chars, unfilteredChars) {
			for (let [index, char] of chars.entries()) {
				let previous = unfilteredChars[index - 1];
				previous && char && isCombiningCharacter(char.value) && !isCombiningCharacter(previous.value) && (yield [previous, char]);
			}
		},
		*emojiModifier(chars) {
			for (let [index, char] of chars.entries()) {
				let previous = chars[index - 1];
				previous && char && isEmojiModifier(char.value) && !isEmojiModifier(previous.value) && (yield [previous, char]);
			}
		},
		*regionalIndicatorSymbol(chars) {
			for (let [index, char] of chars.entries()) {
				let previous = chars[index - 1];
				previous && char && isRegionalIndicatorSymbol(char.value) && isRegionalIndicatorSymbol(previous.value) && (yield [previous, char]);
			}
		},
		*zwj(chars) {
			let sequence = null;
			for (let [index, char] of chars.entries()) {
				let previous = chars[index - 1], next = chars[index + 1];
				previous && char && next && char.value === 8205 && previous.value !== 8205 && next.value !== 8205 && (sequence ? sequence.at(-1) === previous ? sequence.push(char, next) : (yield sequence, sequence = chars.slice(index - 1, index + 2)) : sequence = chars.slice(index - 1, index + 2));
			}
			sequence && (yield sequence);
		}
	}, kinds = Object.keys(findCharacterSequences);
	/**
	* Gets the value of the given node if it's a static value other than a regular expression object,
	* or the node's `regex` property.
	* The purpose of this method is to provide a replacement for `getStaticValue` in environments where certain regular expressions cannot be evaluated.
	* A known example is Node.js 18 which does not support the `v` flag.
	* Calling `getStaticValue` on a regular expression node with the `v` flag on Node.js 18 always returns `null`.
	* A limitation of this method is that it can only detect a regular expression if the specified node is itself a regular expression literal node.
	* @param {ASTNode | undefined} node The node to be inspected.
	* @param {Scope} initialScope Scope to start finding variables. This function tries to resolve identifier references which are in the given scope.
	* @returns {{ value: any } | { regex: { pattern: string, flags: string } } | null} The static value of the node, or `null`.
	*/
	function getStaticValueOrRegex(node, initialScope) {
		if (!node) return null;
		if (node.type === "Literal" && node.regex) return { regex: node.regex };
		let staticValue = getStaticValue(node, initialScope);
		return staticValue?.value instanceof RegExp ? null : staticValue;
	}
	/**
	* Checks whether a specified regexpp character is represented as an acceptable escape sequence.
	* This function requires the source text of the character to be known.
	* @param {Character} char Character to check.
	* @param {string} charSource Source text of the character to check.
	* @returns {boolean} Whether the specified regexpp character is represented as an acceptable escape sequence.
	*/
	function checkForAcceptableEscape(char, charSource) {
		return charSource.startsWith("\\") ? /(?<=^\\+).$/su.exec(charSource)?.[0] !== String.fromCodePoint(char.value) : !1;
	}
	/**
	* Checks whether a specified regexpp character is represented as an acceptable escape sequence.
	* This function works with characters that are produced by a string or template literal.
	* It requires the source text and the CodeUnit list of the literal to be known.
	* @param {Character} char Character to check.
	* @param {string} nodeSource Source text of the string or template literal that produces the character.
	* @param {CodeUnit[]} codeUnits List of CodeUnit objects of the literal that produces the character.
	* @returns {boolean} Whether the specified regexpp character is represented as an acceptable escape sequence.
	*/
	function checkForAcceptableEscapeInString(char, nodeSource, codeUnits) {
		let firstIndex = char.start, lastIndex = char.end - 1, start = codeUnits[firstIndex].start, end = codeUnits[lastIndex].end;
		return checkForAcceptableEscape(char, nodeSource.slice(start, end));
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{ allowEscape: !1 }],
			docs: {
				description: "Disallow characters which are made with multiple code points in character class syntax",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-misleading-character-class"
			},
			hasSuggestions: !0,
			schema: [{
				type: "object",
				properties: { allowEscape: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: {
				surrogatePairWithoutUFlag: "Unexpected surrogate pair in character class. Use 'u' flag.",
				surrogatePair: "Unexpected surrogate pair in character class.",
				combiningClass: "Unexpected combined character in character class.",
				emojiModifier: "Unexpected modified Emoji in character class.",
				regionalIndicatorSymbol: "Unexpected national flag in character class.",
				zwj: "Unexpected joined character sequence in character class.",
				suggestUnicodeFlag: "Add unicode 'u' flag to regex."
			}
		},
		create(context) {
			let [{ allowEscape }] = context.options, sourceCode = context.sourceCode, parser = new RegExpParser(), checkedPatternNodes = /* @__PURE__ */ new Set();
			/**
			* Verify a given regular expression.
			* @param {Node} node The node to report.
			* @param {string} pattern The regular expression pattern to verify.
			* @param {string} flags The flags of the regular expression.
			* @param {Function} unicodeFixer Fixer for missing "u" flag.
			* @returns {void}
			*/
			function verify(node, pattern, flags, unicodeFixer) {
				let patternNode;
				try {
					patternNode = parser.parsePattern(pattern, 0, pattern.length, {
						unicode: flags.includes("u"),
						unicodeSets: flags.includes("v")
					});
				} catch {
					return;
				}
				let codeUnits = null;
				/**
				* Checks whether a specified regexpp character is represented as an acceptable escape sequence.
				* For the purposes of this rule, an escape sequence is considered acceptable if it consists of one or more backslashes followed by the character being escaped.
				* @param {Character} char Character to check.
				* @returns {boolean} Whether the specified regexpp character is represented as an acceptable escape sequence.
				*/
				function isAcceptableEscapeSequence(char) {
					if (node.type === "Literal" && node.regex) return checkForAcceptableEscape(char, char.raw);
					if (node.type === "Literal" && typeof node.value == "string") {
						let nodeSource = node.raw;
						return codeUnits ??= parseStringLiteral(nodeSource), checkForAcceptableEscapeInString(char, nodeSource, codeUnits);
					}
					if (astUtils.isStaticTemplateLiteral(node)) {
						let nodeSource = sourceCode.getText(node);
						return codeUnits ??= parseTemplateToken(nodeSource), checkForAcceptableEscapeInString(char, nodeSource, codeUnits);
					}
					return !1;
				}
				let foundKindMatches = /* @__PURE__ */ new Map();
				visitRegExpAST(patternNode, { onCharacterClassEnter(ccNode) {
					for (let unfilteredChars of iterateCharacterSequence(ccNode.elements)) {
						let chars;
						chars = allowEscape ? unfilteredChars.map((char) => isAcceptableEscapeSequence(char) ? null : char) : unfilteredChars;
						for (let kind of kinds) {
							let matches = findCharacterSequences[kind](chars, unfilteredChars);
							foundKindMatches.has(kind) ? foundKindMatches.get(kind).push(...matches) : foundKindMatches.set(kind, [...matches]);
						}
					}
				} });
				/**
				* Finds the report loc(s) for a range of matches.
				* Only literals and expression-less templates generate granular errors.
				* @param {Character[][]} matches Lists of individual characters being reported on.
				* @returns {Location[]} locs for context.report.
				* @see https://github.com/eslint/eslint/pull/17515
				*/
				function getNodeReportLocations(matches) {
					return !astUtils.isStaticTemplateLiteral(node) && node.type !== "Literal" ? matches.length ? [node.loc] : [] : matches.map((chars) => {
						let firstIndex = chars[0].start, lastIndex = chars.at(-1).end - 1, start, end;
						if (node.type === "TemplateLiteral") {
							let source = sourceCode.getText(node), offset = node.range[0];
							codeUnits ??= parseTemplateToken(source), start = offset + codeUnits[firstIndex].start, end = offset + codeUnits[lastIndex].end;
						} else if (typeof node.value == "string") {
							let source = node.raw, offset = node.range[0];
							codeUnits ??= parseStringLiteral(source), start = offset + codeUnits[firstIndex].start, end = offset + codeUnits[lastIndex].end;
						} else {
							let offset = node.range[0] + 1;
							start = offset + firstIndex, end = offset + lastIndex + 1;
						}
						return {
							start: sourceCode.getLocFromIndex(start),
							end: sourceCode.getLocFromIndex(end)
						};
					});
				}
				for (let [kind, matches] of foundKindMatches) {
					let suggest;
					kind === "surrogatePairWithoutUFlag" && (suggest = [{
						messageId: "suggestUnicodeFlag",
						fix: unicodeFixer
					}]);
					let locs = getNodeReportLocations(matches);
					for (let loc of locs) context.report({
						node,
						loc,
						messageId: kind,
						suggest
					});
				}
			}
			return {
				"Literal[regex]"(node) {
					checkedPatternNodes.has(node) || verify(node, node.regex.pattern, node.regex.flags, (fixer) => isValidWithUnicodeFlag(context.languageOptions.ecmaVersion, node.regex.pattern) ? fixer.insertTextAfter(node, "u") : null);
				},
				Program(node) {
					let scope = sourceCode.getScope(node), tracker = new ReferenceTracker(scope);
					for (let { node: refNode } of tracker.iterateGlobalReferences({ RegExp: {
						[CALL]: !0,
						[CONSTRUCT]: !0
					} })) {
						let pattern, flags, [patternNode, flagsNode] = refNode.arguments, evaluatedPattern = getStaticValueOrRegex(patternNode, scope);
						if (evaluatedPattern) {
							if (flagsNode) evaluatedPattern.regex ? (pattern = evaluatedPattern.regex.pattern, checkedPatternNodes.add(patternNode)) : pattern = String(evaluatedPattern.value), flags = getStringIfConstant(flagsNode, scope);
							else {
								if (evaluatedPattern.regex) continue;
								pattern = String(evaluatedPattern.value), flags = "";
							}
							typeof flags == "string" && verify(patternNode, pattern, flags, (fixer) => {
								if (!isValidWithUnicodeFlag(context.languageOptions.ecmaVersion, pattern)) return null;
								if (refNode.arguments.length === 1) {
									let penultimateToken = sourceCode.getLastToken(refNode, { skip: 1 });
									return fixer.insertTextAfter(penultimateToken, astUtils.isCommaToken(penultimateToken) ? " \"u\"," : ", \"u\"");
								}
								if (flagsNode.type === "Literal" && typeof flagsNode.value == "string" || flagsNode.type === "TemplateLiteral") {
									let range = [flagsNode.range[0], flagsNode.range[1] - 1];
									return fixer.insertTextAfterRange(range, "u");
								}
								return null;
							});
						}
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-misleading-character-class.cjs
module.exports = require_no_misleading_character_class().create;
//#endregion
