const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_keywords$1 = require("../common/keywords.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/quote-props.js
/**
* @fileoverview Rule to flag non-quoted property names in object literals.
* @author Mathias Bynens <http://mathiasbynens.be/>
* @deprecated in ESLint v8.53.0
*/
var require_quote_props = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let espree = require_ast_utils$1.r(), astUtils = require_ast_utils$1.t(), keywords = require_keywords$1.t();
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
						name: "quote-props",
						url: "https://eslint.style/rules/quote-props"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Require quotes around object literal property names",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/quote-props"
			},
			schema: { anyOf: [{
				type: "array",
				items: [{ enum: [
					"always",
					"as-needed",
					"consistent",
					"consistent-as-needed"
				] }],
				minItems: 0,
				maxItems: 1
			}, {
				type: "array",
				items: [{ enum: [
					"always",
					"as-needed",
					"consistent",
					"consistent-as-needed"
				] }, {
					type: "object",
					properties: {
						keywords: { type: "boolean" },
						unnecessary: { type: "boolean" },
						numbers: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				minItems: 0,
				maxItems: 2
			}] },
			fixable: "code",
			messages: {
				requireQuotesDueToReservedWord: "Properties should be quoted as '{{property}}' is a reserved word.",
				inconsistentlyQuotedProperty: "Inconsistently quoted property '{{key}}' found.",
				unnecessarilyQuotedProperty: "Unnecessarily quoted property '{{property}}' found.",
				unquotedReservedProperty: "Unquoted reserved word '{{property}}' used as key.",
				unquotedNumericProperty: "Unquoted number literal '{{property}}' used as key.",
				unquotedPropertyFound: "Unquoted property '{{property}}' found.",
				redundantQuoting: "Properties shouldn't be quoted as all quotes are redundant."
			}
		},
		create(context) {
			let MODE = context.options[0], KEYWORDS = context.options[1] && context.options[1].keywords, CHECK_UNNECESSARY = !context.options[1] || context.options[1].unnecessary !== !1, NUMBERS = context.options[1] && context.options[1].numbers, sourceCode = context.sourceCode;
			/**
			* Checks whether a certain string constitutes an ES3 token
			* @param {string} tokenStr The string to be checked.
			* @returns {boolean} `true` if it is an ES3 token.
			*/
			function isKeyword(tokenStr) {
				return keywords.includes(tokenStr);
			}
			/**
			* Checks if an espree-tokenized key has redundant quotes (i.e. whether quotes are unnecessary)
			* @param {string} rawKey The raw key value from the source
			* @param {espreeTokens} tokens The espree-tokenized node key
			* @param {boolean} [skipNumberLiterals=false] Indicates whether number literals should be checked
			* @returns {boolean} Whether or not a key has redundant quotes.
			* @private
			*/
			function areQuotesRedundant(rawKey, tokens, skipNumberLiterals) {
				return tokens.length === 1 && tokens[0].start === 0 && tokens[0].end === rawKey.length && ([
					"Identifier",
					"Keyword",
					"Null",
					"Boolean"
				].includes(tokens[0].type) || tokens[0].type === "Numeric" && !skipNumberLiterals && String(+tokens[0].value) === tokens[0].value);
			}
			/**
			* Returns a string representation of a property node with quotes removed
			* @param {ASTNode} key Key AST Node, which may or may not be quoted
			* @returns {string} A replacement string for this property
			*/
			function getUnquotedKey(key) {
				return key.type === "Identifier" ? key.name : key.value;
			}
			/**
			* Returns a string representation of a property node with quotes added
			* @param {ASTNode} key Key AST Node, which may or may not be quoted
			* @returns {string} A replacement string for this property
			*/
			function getQuotedKey(key) {
				return key.type === "Literal" && typeof key.value == "string" ? sourceCode.getText(key) : `"${key.type === "Identifier" ? key.name : key.value}"`;
			}
			/**
			* Ensures that a property's key is quoted only when necessary
			* @param {ASTNode} node Property AST node
			* @returns {void}
			*/
			function checkUnnecessaryQuotes(node) {
				let key = node.key;
				if (!(node.method || node.computed || node.shorthand)) if (key.type === "Literal" && typeof key.value == "string") {
					let tokens;
					try {
						tokens = espree.tokenize(key.value);
					} catch {
						return;
					}
					if (tokens.length !== 1 || isKeyword(tokens[0].value) && KEYWORDS) return;
					CHECK_UNNECESSARY && areQuotesRedundant(key.value, tokens, NUMBERS) && context.report({
						node,
						messageId: "unnecessarilyQuotedProperty",
						data: { property: key.value },
						fix: (fixer) => fixer.replaceText(key, getUnquotedKey(key))
					});
				} else KEYWORDS && key.type === "Identifier" && isKeyword(key.name) ? context.report({
					node,
					messageId: "unquotedReservedProperty",
					data: { property: key.name },
					fix: (fixer) => fixer.replaceText(key, getQuotedKey(key))
				}) : NUMBERS && key.type === "Literal" && astUtils.isNumericLiteral(key) && context.report({
					node,
					messageId: "unquotedNumericProperty",
					data: { property: key.value },
					fix: (fixer) => fixer.replaceText(key, getQuotedKey(key))
				});
			}
			/**
			* Ensures that a property's key is quoted
			* @param {ASTNode} node Property AST node
			* @returns {void}
			*/
			function checkOmittedQuotes(node) {
				let key = node.key;
				!node.method && !node.computed && !node.shorthand && !(key.type === "Literal" && typeof key.value == "string") && context.report({
					node,
					messageId: "unquotedPropertyFound",
					data: { property: key.name || key.value },
					fix: (fixer) => fixer.replaceText(key, getQuotedKey(key))
				});
			}
			/**
			* Ensures that an object's keys are consistently quoted, optionally checks for redundancy of quotes
			* @param {ASTNode} node Property AST node
			* @param {boolean} checkQuotesRedundancy Whether to check quotes' redundancy
			* @returns {void}
			*/
			function checkConsistency(node, checkQuotesRedundancy) {
				let quotedProps = [], unquotedProps = [], keywordKeyName = null, necessaryQuotes = !1;
				node.properties.forEach((property) => {
					let key = property.key;
					if (!(!key || property.method || property.computed || property.shorthand)) if (key.type === "Literal" && typeof key.value == "string") {
						if (quotedProps.push(property), checkQuotesRedundancy) {
							let tokens;
							try {
								tokens = espree.tokenize(key.value);
							} catch {
								necessaryQuotes = !0;
								return;
							}
							necessaryQuotes = necessaryQuotes || !areQuotesRedundant(key.value, tokens) || KEYWORDS && isKeyword(tokens[0].value);
						}
					} else KEYWORDS && checkQuotesRedundancy && key.type === "Identifier" && isKeyword(key.name) ? (unquotedProps.push(property), necessaryQuotes = !0, keywordKeyName = key.name) : unquotedProps.push(property);
				}), checkQuotesRedundancy && quotedProps.length && !necessaryQuotes ? quotedProps.forEach((property) => {
					context.report({
						node: property,
						messageId: "redundantQuoting",
						fix: (fixer) => fixer.replaceText(property.key, getUnquotedKey(property.key))
					});
				}) : unquotedProps.length && keywordKeyName ? unquotedProps.forEach((property) => {
					context.report({
						node: property,
						messageId: "requireQuotesDueToReservedWord",
						data: { property: keywordKeyName },
						fix: (fixer) => fixer.replaceText(property.key, getQuotedKey(property.key))
					});
				}) : quotedProps.length && unquotedProps.length && unquotedProps.forEach((property) => {
					context.report({
						node: property,
						messageId: "inconsistentlyQuotedProperty",
						data: { key: property.key.name || property.key.value },
						fix: (fixer) => fixer.replaceText(property.key, getQuotedKey(property.key))
					});
				});
			}
			return {
				Property(node) {
					(MODE === "always" || !MODE) && checkOmittedQuotes(node), MODE === "as-needed" && checkUnnecessaryQuotes(node);
				},
				ObjectExpression(node) {
					MODE === "consistent" && checkConsistency(node, !1), MODE === "consistent-as-needed" && checkConsistency(node, !0);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/quote-props.cjs
module.exports = require_quote_props().create;
//#endregion
