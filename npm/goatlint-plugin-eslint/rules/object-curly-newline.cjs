const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/object-curly-newline.js
/**
* @fileoverview Rule to require or disallow line breaks inside braces.
* @author Toru Nagashima
* @deprecated in ESLint v8.53.0
*/
var require_object_curly_newline = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), OPTION_VALUE = { oneOf: [{ enum: ["always", "never"] }, {
		type: "object",
		properties: {
			multiline: { type: "boolean" },
			minProperties: {
				type: "integer",
				minimum: 0
			},
			consistent: { type: "boolean" }
		},
		additionalProperties: !1,
		minProperties: 1
	}] };
	/**
	* Normalizes a given option value.
	* @param {string|Object|undefined} value An option value to parse.
	* @returns {{multiline: boolean, minProperties: number, consistent: boolean}} Normalized option object.
	*/
	function normalizeOptionValue(value) {
		let multiline = !1, minProperties = Infinity, consistent = !1;
		return value ? value === "always" ? minProperties = 0 : value === "never" ? minProperties = Infinity : (multiline = !!value.multiline, minProperties = value.minProperties || Infinity, consistent = !!value.consistent) : consistent = !0, {
			multiline,
			minProperties,
			consistent
		};
	}
	/**
	* Checks if a value is an object.
	* @param {any} value The value to check
	* @returns {boolean} `true` if the value is an object, otherwise `false`
	*/
	function isObject(value) {
		return typeof value == "object" && !!value;
	}
	/**
	* Checks if an option is a node-specific option
	* @param {any} option The option to check
	* @returns {boolean} `true` if the option is node-specific, otherwise `false`
	*/
	function isNodeSpecificOption(option) {
		return isObject(option) || typeof option == "string";
	}
	/**
	* Normalizes a given option value.
	* @param {string|Object|undefined} options An option value to parse.
	* @returns {{
	*   ObjectExpression: {multiline: boolean, minProperties: number, consistent: boolean},
	*   ObjectPattern: {multiline: boolean, minProperties: number, consistent: boolean},
	*   ImportDeclaration: {multiline: boolean, minProperties: number, consistent: boolean},
	*   ExportNamedDeclaration : {multiline: boolean, minProperties: number, consistent: boolean}
	* }} Normalized option object.
	*/
	function normalizeOptions(options) {
		if (isObject(options) && Object.values(options).some(isNodeSpecificOption)) return {
			ObjectExpression: normalizeOptionValue(options.ObjectExpression),
			ObjectPattern: normalizeOptionValue(options.ObjectPattern),
			ImportDeclaration: normalizeOptionValue(options.ImportDeclaration),
			ExportNamedDeclaration: normalizeOptionValue(options.ExportDeclaration)
		};
		let value = normalizeOptionValue(options);
		return {
			ObjectExpression: value,
			ObjectPattern: value,
			ImportDeclaration: value,
			ExportNamedDeclaration: value
		};
	}
	/**
	* Determines if ObjectExpression, ObjectPattern, ImportDeclaration or ExportNamedDeclaration
	* node needs to be checked for missing line breaks
	* @param {ASTNode} node Node under inspection
	* @param {Object} options option specific to node type
	* @param {Token} first First object property
	* @param {Token} last Last object property
	* @returns {boolean} `true` if node needs to be checked for missing line breaks
	*/
	function areLineBreaksRequired(node, options, first, last) {
		let objectProperties;
		return objectProperties = node.type === "ObjectExpression" || node.type === "ObjectPattern" ? node.properties : node.specifiers.filter((s) => s.type === "ImportSpecifier" || s.type === "ExportSpecifier"), objectProperties.length >= options.minProperties || options.multiline && objectProperties.length > 0 && first.loc.start.line !== last.loc.end.line;
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
						name: "object-curly-newline",
						url: "https://eslint.style/rules/object-curly-newline"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce consistent line breaks after opening and before closing braces",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/object-curly-newline"
			},
			fixable: "whitespace",
			schema: [{ oneOf: [OPTION_VALUE, {
				type: "object",
				properties: {
					ObjectExpression: OPTION_VALUE,
					ObjectPattern: OPTION_VALUE,
					ImportDeclaration: OPTION_VALUE,
					ExportDeclaration: OPTION_VALUE
				},
				additionalProperties: !1,
				minProperties: 1
			}] }],
			messages: {
				unexpectedLinebreakBeforeClosingBrace: "Unexpected line break before this closing brace.",
				unexpectedLinebreakAfterOpeningBrace: "Unexpected line break after this opening brace.",
				expectedLinebreakBeforeClosingBrace: "Expected a line break before this closing brace.",
				expectedLinebreakAfterOpeningBrace: "Expected a line break after this opening brace."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, normalizedOptions = normalizeOptions(context.options[0]);
			/**
			* Reports a given node if it violated this rule.
			* @param {ASTNode} node A node to check. This is an ObjectExpression, ObjectPattern, ImportDeclaration or ExportNamedDeclaration node.
			* @returns {void}
			*/
			function check(node) {
				let options = normalizedOptions[node.type];
				if (node.type === "ImportDeclaration" && !node.specifiers.some((specifier) => specifier.type === "ImportSpecifier") || node.type === "ExportNamedDeclaration" && !node.specifiers.some((specifier) => specifier.type === "ExportSpecifier")) return;
				let openBrace = sourceCode.getFirstToken(node, (token) => token.value === "{"), closeBrace;
				closeBrace = node.typeAnnotation ? sourceCode.getTokenBefore(node.typeAnnotation) : sourceCode.getLastToken(node, (token) => token.value === "}");
				let first = sourceCode.getTokenAfter(openBrace, { includeComments: !0 }), last = sourceCode.getTokenBefore(closeBrace, { includeComments: !0 }), needsLineBreaks = areLineBreaksRequired(node, options, first, last), hasCommentsFirstToken = astUtils.isCommentToken(first), hasCommentsLastToken = astUtils.isCommentToken(last);
				if (first = sourceCode.getTokenAfter(openBrace), last = sourceCode.getTokenBefore(closeBrace), needsLineBreaks) astUtils.isTokenOnSameLine(openBrace, first) && context.report({
					messageId: "expectedLinebreakAfterOpeningBrace",
					node,
					loc: openBrace.loc,
					fix(fixer) {
						return hasCommentsFirstToken ? null : fixer.insertTextAfter(openBrace, "\n");
					}
				}), astUtils.isTokenOnSameLine(last, closeBrace) && context.report({
					messageId: "expectedLinebreakBeforeClosingBrace",
					node,
					loc: closeBrace.loc,
					fix(fixer) {
						return hasCommentsLastToken ? null : fixer.insertTextBefore(closeBrace, "\n");
					}
				});
				else {
					let consistent = options.consistent, hasLineBreakBetweenOpenBraceAndFirst = !astUtils.isTokenOnSameLine(openBrace, first), hasLineBreakBetweenCloseBraceAndLast = !astUtils.isTokenOnSameLine(last, closeBrace);
					(!consistent && hasLineBreakBetweenOpenBraceAndFirst || consistent && hasLineBreakBetweenOpenBraceAndFirst && !hasLineBreakBetweenCloseBraceAndLast) && context.report({
						messageId: "unexpectedLinebreakAfterOpeningBrace",
						node,
						loc: openBrace.loc,
						fix(fixer) {
							return hasCommentsFirstToken ? null : fixer.removeRange([openBrace.range[1], first.range[0]]);
						}
					}), (!consistent && hasLineBreakBetweenCloseBraceAndLast || consistent && !hasLineBreakBetweenOpenBraceAndFirst && hasLineBreakBetweenCloseBraceAndLast) && context.report({
						messageId: "unexpectedLinebreakBeforeClosingBrace",
						node,
						loc: closeBrace.loc,
						fix(fixer) {
							return hasCommentsLastToken ? null : fixer.removeRange([last.range[1], closeBrace.range[0]]);
						}
					});
				}
			}
			return {
				ObjectExpression: check,
				ObjectPattern: check,
				ImportDeclaration: check,
				ExportNamedDeclaration: check
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/object-curly-newline.cjs
module.exports = require_object_curly_newline().create;
//#endregion
