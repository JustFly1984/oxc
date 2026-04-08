/**
 * ESLint's rules code copied from https://github.com/eslint/eslint
 *
 * License: MIT
 * https://github.com/eslint/eslint/blob/a0d1a3772679d3d74bb860fc65b5b58678acd452/LICENSE
 */
import { createRequire } from "node:module";
//#region src-js/generated/plugin-eslint/index.ts
var require = createRequire(import.meta.url), create0 = null, create1 = null, create2 = null, create3 = null, create4 = null, create5 = null, create6 = null, create7 = null, create8 = null, create9 = null, create10 = null, create11 = null, create12 = null, create13 = null, create14 = null, create15 = null, create16 = null, create17 = null, create18 = null, create19 = null, create20 = null, create21 = null, create22 = null, create23 = null, create24 = null, create25 = null, create26 = null, create27 = null, create28 = null, create29 = null, create30 = null, create31 = null, create32 = null, create33 = null, create34 = null, create35 = null, create36 = null, create37 = null, create38 = null, create39 = null, create40 = null, create41 = null, create42 = null, create43 = null, create44 = null, create45 = null, create46 = null, create47 = null, create48 = null, create49 = null, create50 = null, create51 = null, create52 = null, create53 = null, create54 = null, create55 = null, create56 = null, create57 = null, create58 = null, create59 = null, create60 = null, create61 = null, create62 = null, create63 = null, create64 = null, create65 = null, create66 = null, create67 = null, create68 = null, create69 = null, create70 = null, create71 = null, create72 = null, create73 = null, create74 = null, create75 = null, create76 = null, create77 = null, create78 = null, create79 = null, create80 = null, create81 = null, create82 = null, create83 = null, create84 = null, create85 = null, create86 = null, create87 = null, create88 = null, create89 = null, create90 = null, create91 = null, create92 = null, create93 = null, create94 = null, create95 = null, create96 = null, create97 = null, create98 = null, create99 = null, create100 = null, create101 = null, create102 = null, create103 = null, create104 = null, create105 = null, create106 = null, create107 = null, create108 = null, create109 = null, create110 = null, create111 = null, create112 = null, create113 = null, create114 = null, create115 = null, create116 = null, create117 = null, create118 = null, create119 = null, create120 = null, create121 = null, create122 = null, create123 = null, create124 = null, create125 = null, create126 = null, create127 = null, create128 = null, create129 = null, create130 = null, create131 = null, create132 = null, create133 = null, create134 = null, create135 = null, create136 = null, create137 = null, create138 = null, create139 = null, create140 = null, create141 = null, create142 = null, create143 = null, create144 = null, create145 = null, create146 = null, create147 = null, create148 = null, create149 = null, create150 = null, create151 = null, create152 = null, create153 = null, create154 = null, create155 = null, create156 = null, create157 = null, create158 = null, create159 = null, create160 = null, create161 = null, create162 = null, create163 = null, create164 = null, create165 = null, create166 = null, create167 = null, create168 = null, create169 = null, create170 = null, create171 = null, create172 = null, create173 = null, create174 = null, create175 = null, create176 = null, create177 = null, create178 = null, create179 = null, create180 = null, create181 = null, create182 = null, create183 = null, create184 = null, create185 = null, create186 = null, create187 = null, create188 = null, create189 = null, create190 = null, create191 = null, create192 = null, create193 = null, create194 = null, create195 = null, create196 = null, create197 = null, create198 = null, create199 = null, create200 = null, create201 = null, create202 = null, create203 = null, create204 = null, create205 = null, create206 = null, create207 = null, create208 = null, create209 = null, create210 = null, create211 = null, create212 = null, create213 = null, create214 = null, create215 = null, create216 = null, create217 = null, create218 = null, create219 = null, create220 = null, create221 = null, create222 = null, create223 = null, create224 = null, create225 = null, create226 = null, create227 = null, create228 = null, create229 = null, create230 = null, create231 = null, create232 = null, create233 = null, create234 = null, create235 = null, create236 = null, create237 = null, create238 = null, create239 = null, create240 = null, create241 = null, create242 = null, create243 = null, create244 = null, create245 = null, create246 = null, create247 = null, create248 = null, create249 = null, create250 = null, create251 = null, create252 = null, create253 = null, create254 = null, create255 = null, create256 = null, create257 = null, create258 = null, create259 = null, create260 = null, create261 = null, create262 = null, create263 = null, create264 = null, create265 = null, create266 = null, create267 = null, create268 = null, create269 = null, create270 = null, create271 = null, create272 = null, create273 = null, create274 = null, create275 = null, create276 = null, create277 = null, create278 = null, create279 = null, create280 = null, create281 = null, create282 = null, create283 = null, create284 = null, create285 = null, create286 = null, create287 = null, create288 = null, create289 = null, create290 = null, create291 = null, plugin_eslint_default = {
	meta: { name: "eslint-js" },
	rules: {
		"accessor-pairs": {
			meta: {
				messages: {
					missingGetterInPropertyDescriptor: "Getter is not present in property descriptor.",
					missingSetterInPropertyDescriptor: "Setter is not present in property descriptor.",
					missingGetterInObjectLiteral: "Getter is not present for {{ name }}.",
					missingSetterInObjectLiteral: "Setter is not present for {{ name }}.",
					missingGetterInClass: "Getter is not present for class {{ name }}.",
					missingSetterInClass: "Setter is not present for class {{ name }}.",
					missingGetterInType: "Getter is not present for type {{ name }}.",
					missingSetterInType: "Setter is not present for type {{ name }}."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						getWithoutSet: { type: "boolean" },
						setWithoutGet: { type: "boolean" },
						enforceForClassMembers: { type: "boolean" },
						enforceForTSTypes: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					enforceForTSTypes: !1,
					enforceForClassMembers: !0,
					getWithoutSet: !1,
					setWithoutGet: !0
				}]
			},
			create(context) {
				return create0 === null && (create0 = require("./rules/accessor-pairs.cjs")), create0(context);
			}
		},
		"array-bracket-newline": {
			meta: {
				messages: {
					unexpectedOpeningLinebreak: "There should be no linebreak after '['.",
					unexpectedClosingLinebreak: "There should be no linebreak before ']'.",
					missingOpeningLinebreak: "A linebreak is required after '['.",
					missingClosingLinebreak: "A linebreak is required before ']'."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: [
					"always",
					"never",
					"consistent"
				] }, {
					type: "object",
					properties: {
						multiline: { type: "boolean" },
						minItems: {
							type: ["integer", "null"],
							minimum: 0
						}
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create1 === null && (create1 = require("./rules/array-bracket-newline.cjs")), create1(context);
			}
		},
		"array-bracket-spacing": {
			meta: {
				messages: {
					unexpectedSpaceAfter: "There should be no space after '{{tokenValue}}'.",
					unexpectedSpaceBefore: "There should be no space before '{{tokenValue}}'.",
					missingSpaceAfter: "A space is required after '{{tokenValue}}'.",
					missingSpaceBefore: "A space is required before '{{tokenValue}}'."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: {
						singleValue: { type: "boolean" },
						objectsInArrays: { type: "boolean" },
						arraysInArrays: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create2 === null && (create2 = require("./rules/array-bracket-spacing.cjs")), create2(context);
			}
		},
		"array-callback-return": {
			meta: {
				messages: {
					expectedAtEnd: "{{arrayMethodName}}() expects a value to be returned at the end of {{name}}.",
					expectedInside: "{{arrayMethodName}}() expects a return value from {{name}}.",
					expectedReturnValue: "{{arrayMethodName}}() expects a return value from {{name}}.",
					expectedNoReturnValue: "{{arrayMethodName}}() expects no useless return value from {{name}}.",
					wrapBraces: "Wrap the expression in `{}`.",
					prependVoid: "Prepend `void` to the expression."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: {
						allowImplicit: { type: "boolean" },
						checkForEach: { type: "boolean" },
						allowVoid: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allowImplicit: !1,
					checkForEach: !1,
					allowVoid: !1
				}]
			},
			create(context) {
				return create3 === null && (create3 = require("./rules/array-callback-return.cjs")), create3(context);
			}
		},
		"array-element-newline": {
			meta: {
				messages: {
					unexpectedLineBreak: "There should be no linebreak here.",
					missingLineBreak: "There should be a linebreak after this element."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: {
					definitions: { basicConfig: { oneOf: [{ enum: [
						"always",
						"never",
						"consistent"
					] }, {
						type: "object",
						properties: {
							multiline: { type: "boolean" },
							minItems: {
								type: ["integer", "null"],
								minimum: 0
							}
						},
						additionalProperties: !1
					}] } },
					type: "array",
					items: [{ oneOf: [{ $ref: "#/definitions/basicConfig" }, {
						type: "object",
						properties: {
							ArrayExpression: { $ref: "#/definitions/basicConfig" },
							ArrayPattern: { $ref: "#/definitions/basicConfig" }
						},
						additionalProperties: !1,
						minProperties: 1
					}] }]
				},
				defaultOptions: void 0
			},
			create(context) {
				return create4 === null && (create4 = require("./rules/array-element-newline.cjs")), create4(context);
			}
		},
		"arrow-body-style": {
			meta: {
				messages: {
					unexpectedOtherBlock: "Unexpected block statement surrounding arrow body.",
					unexpectedEmptyBlock: "Unexpected block statement surrounding arrow body; put a value of `undefined` immediately after the `=>`.",
					unexpectedObjectBlock: "Unexpected block statement surrounding arrow body; parenthesize the returned value and move it immediately after the `=>`.",
					unexpectedSingleBlock: "Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`.",
					expectedBlock: "Expected block statement surrounding arrow body."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: [{ enum: ["always", "never"] }],
					minItems: 0,
					maxItems: 1
				}, {
					type: "array",
					items: [{ enum: ["as-needed"] }, {
						type: "object",
						properties: { requireReturnForObjectLiteral: { type: "boolean" } },
						additionalProperties: !1
					}],
					minItems: 0,
					maxItems: 2
				}] },
				defaultOptions: ["as-needed"]
			},
			create(context) {
				return create5 === null && (create5 = require("./rules/arrow-body-style.cjs")), create5(context);
			}
		},
		"arrow-parens": {
			meta: {
				messages: {
					unexpectedParens: "Unexpected parentheses around single function argument.",
					expectedParens: "Expected parentheses around arrow function argument.",
					unexpectedParensInline: "Unexpected parentheses around single function argument having a body with no curly braces.",
					expectedParensBlock: "Expected parentheses around arrow function argument having a body with curly braces."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "as-needed"] }, {
					type: "object",
					properties: { requireForBlockBody: {
						type: "boolean",
						default: !1
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create6 === null && (create6 = require("./rules/arrow-parens.cjs")), create6(context);
			}
		},
		"arrow-spacing": {
			meta: {
				messages: {
					expectedBefore: "Missing space before =>.",
					unexpectedBefore: "Unexpected space before =>.",
					expectedAfter: "Missing space after =>.",
					unexpectedAfter: "Unexpected space after =>."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						before: {
							type: "boolean",
							default: !0
						},
						after: {
							type: "boolean",
							default: !0
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create7 === null && (create7 = require("./rules/arrow-spacing.cjs")), create7(context);
			}
		},
		"block-scoped-var": {
			meta: {
				messages: { outOfScope: "'{{name}}' declared on line {{definitionLine}} column {{definitionColumn}} is used outside of binding context." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create8 === null && (create8 = require("./rules/block-scoped-var.cjs")), create8(context);
			}
		},
		"block-spacing": {
			meta: {
				messages: {
					missing: "Requires a space {{location}} '{{token}}'.",
					extra: "Unexpected space(s) {{location}} '{{token}}'."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create9 === null && (create9 = require("./rules/block-spacing.cjs")), create9(context);
			}
		},
		"brace-style": {
			meta: {
				messages: {
					nextLineOpen: "Opening curly brace does not appear on the same line as controlling statement.",
					sameLineOpen: "Opening curly brace appears on the same line as controlling statement.",
					blockSameLine: "Statement inside of curly braces should be on next line.",
					nextLineClose: "Closing curly brace does not appear on the same line as the subsequent block.",
					singleLineClose: "Closing curly brace should be on the same line as opening curly brace or on the line after the previous block.",
					sameLineClose: "Closing curly brace appears on the same line as the subsequent block."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: [
					"1tbs",
					"stroustrup",
					"allman"
				] }, {
					type: "object",
					properties: { allowSingleLine: {
						type: "boolean",
						default: !1
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create10 === null && (create10 = require("./rules/brace-style.cjs")), create10(context);
			}
		},
		"callback-return": {
			meta: {
				messages: { missingReturn: "Expected return with your callback function." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "array",
					items: { type: "string" }
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create11 === null && (create11 = require("./rules/callback-return.cjs")), create11(context);
			}
		},
		camelcase: {
			meta: {
				messages: {
					notCamelCase: "Identifier '{{name}}' is not in camel case.",
					notCamelCasePrivate: "#{{name}} is not in camel case."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						ignoreDestructuring: { type: "boolean" },
						ignoreImports: { type: "boolean" },
						ignoreGlobals: { type: "boolean" },
						properties: { enum: ["always", "never"] },
						allow: {
							type: "array",
							items: { type: "string" },
							minItems: 0,
							uniqueItems: !0
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allow: [],
					ignoreDestructuring: !1,
					ignoreGlobals: !1,
					ignoreImports: !1,
					properties: "always"
				}]
			},
			create(context) {
				return create12 === null && (create12 = require("./rules/camelcase.cjs")), create12(context);
			}
		},
		"capitalized-comments": {
			meta: {
				messages: {
					unexpectedLowercaseComment: "Comments should not begin with a lowercase character.",
					unexpectedUppercaseComment: "Comments should not begin with an uppercase character."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }, { oneOf: [{
					type: "object",
					properties: {
						ignorePattern: { type: "string" },
						ignoreInlineComments: { type: "boolean" },
						ignoreConsecutiveComments: { type: "boolean" }
					},
					additionalProperties: !1
				}, {
					type: "object",
					properties: {
						line: {
							type: "object",
							properties: {
								ignorePattern: { type: "string" },
								ignoreInlineComments: { type: "boolean" },
								ignoreConsecutiveComments: { type: "boolean" }
							},
							additionalProperties: !1
						},
						block: {
							type: "object",
							properties: {
								ignorePattern: { type: "string" },
								ignoreInlineComments: { type: "boolean" },
								ignoreConsecutiveComments: { type: "boolean" }
							},
							additionalProperties: !1
						}
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create13 === null && (create13 = require("./rules/capitalized-comments.cjs")), create13(context);
			}
		},
		"class-methods-use-this": {
			meta: {
				messages: { missingThis: "Expected 'this' to be used by class {{name}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						exceptMethods: {
							type: "array",
							items: { type: "string" }
						},
						enforceForClassFields: { type: "boolean" },
						ignoreOverrideMethods: { type: "boolean" },
						ignoreClassesWithImplements: { enum: ["all", "public-fields"] }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					enforceForClassFields: !0,
					exceptMethods: [],
					ignoreOverrideMethods: !1
				}]
			},
			create(context) {
				return create14 === null && (create14 = require("./rules/class-methods-use-this.cjs")), create14(context);
			}
		},
		"comma-dangle": {
			meta: {
				messages: {
					unexpected: "Unexpected trailing comma.",
					missing: "Missing trailing comma."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: {
					definitions: {
						value: { enum: [
							"always-multiline",
							"always",
							"never",
							"only-multiline"
						] },
						valueWithIgnore: { enum: [
							"always-multiline",
							"always",
							"ignore",
							"never",
							"only-multiline"
						] }
					},
					type: "array",
					items: [{ oneOf: [{ $ref: "#/definitions/value" }, {
						type: "object",
						properties: {
							arrays: { $ref: "#/definitions/valueWithIgnore" },
							objects: { $ref: "#/definitions/valueWithIgnore" },
							imports: { $ref: "#/definitions/valueWithIgnore" },
							exports: { $ref: "#/definitions/valueWithIgnore" },
							functions: { $ref: "#/definitions/valueWithIgnore" }
						},
						additionalProperties: !1
					}] }],
					additionalItems: !1
				},
				defaultOptions: void 0
			},
			create(context) {
				return create15 === null && (create15 = require("./rules/comma-dangle.cjs")), create15(context);
			}
		},
		"comma-spacing": {
			meta: {
				messages: {
					missing: "A space is required {{loc}} ','.",
					unexpected: "There should be no space {{loc}} ','."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						before: {
							type: "boolean",
							default: !1
						},
						after: {
							type: "boolean",
							default: !0
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create16 === null && (create16 = require("./rules/comma-spacing.cjs")), create16(context);
			}
		},
		"comma-style": {
			meta: {
				messages: {
					unexpectedLineBeforeAndAfterComma: "Bad line breaking before and after ','.",
					expectedCommaFirst: "',' should be placed first.",
					expectedCommaLast: "',' should be placed last."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: ["first", "last"] }, {
					type: "object",
					properties: { exceptions: {
						type: "object",
						additionalProperties: { type: "boolean" }
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create17 === null && (create17 = require("./rules/comma-style.cjs")), create17(context);
			}
		},
		complexity: {
			meta: {
				messages: { complex: "{{name}} has a complexity of {{complexity}}. Maximum allowed is {{max}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "integer",
					minimum: 0
				}, {
					type: "object",
					properties: {
						maximum: {
							type: "integer",
							minimum: 0
						},
						max: {
							type: "integer",
							minimum: 0
						},
						variant: { enum: ["classic", "modified"] }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: [20]
			},
			create(context) {
				return create18 === null && (create18 = require("./rules/complexity.cjs")), create18(context);
			}
		},
		"computed-property-spacing": {
			meta: {
				messages: {
					unexpectedSpaceBefore: "There should be no space before '{{tokenValue}}'.",
					unexpectedSpaceAfter: "There should be no space after '{{tokenValue}}'.",
					missingSpaceBefore: "A space is required before '{{tokenValue}}'.",
					missingSpaceAfter: "A space is required after '{{tokenValue}}'."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: { enforceForClassMembers: {
						type: "boolean",
						default: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create19 === null && (create19 = require("./rules/computed-property-spacing.cjs")), create19(context);
			}
		},
		"consistent-return": {
			meta: {
				messages: {
					missingReturn: "Expected to return a value at the end of {{name}}.",
					missingReturnValue: "{{name}} expected a return value.",
					unexpectedReturnValue: "{{name}} expected no return value."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { treatUndefinedAsUnspecified: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ treatUndefinedAsUnspecified: !1 }]
			},
			create(context) {
				return create20 === null && (create20 = require("./rules/consistent-return.cjs")), create20(context);
			}
		},
		"consistent-this": {
			meta: {
				messages: {
					aliasNotAssignedToThis: "Designated alias '{{name}}' is not assigned to 'this'.",
					unexpectedAlias: "Unexpected alias '{{name}}' for 'this'."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: {
					type: "array",
					items: {
						type: "string",
						minLength: 1
					},
					uniqueItems: !0
				},
				defaultOptions: ["that"]
			},
			create(context) {
				return create21 === null && (create21 = require("./rules/consistent-this.cjs")), create21(context);
			}
		},
		"constructor-super": {
			meta: {
				messages: {
					missingSome: "Lacked a call of 'super()' in some code paths.",
					missingAll: "Expected to call 'super()'.",
					duplicate: "Unexpected duplicate 'super()'.",
					badSuper: "Unexpected 'super()' because 'super' is not a constructor."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create22 === null && (create22 = require("./rules/constructor-super.cjs")), create22(context);
			}
		},
		curly: {
			meta: {
				messages: {
					missingCurlyAfter: "Expected { after '{{name}}'.",
					missingCurlyAfterCondition: "Expected { after '{{name}}' condition.",
					unexpectedCurlyAfter: "Unnecessary { after '{{name}}'.",
					unexpectedCurlyAfterCondition: "Unnecessary { after '{{name}}' condition."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: [{ enum: ["all"] }],
					minItems: 0,
					maxItems: 1
				}, {
					type: "array",
					items: [{ enum: [
						"multi",
						"multi-line",
						"multi-or-nest"
					] }, { enum: ["consistent"] }],
					minItems: 0,
					maxItems: 2
				}] },
				defaultOptions: ["all"]
			},
			create(context) {
				return create23 === null && (create23 = require("./rules/curly.cjs")), create23(context);
			}
		},
		"default-case": {
			meta: {
				messages: { missingDefaultCase: "Expected a default case." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { commentPattern: { type: "string" } },
					additionalProperties: !1
				}],
				defaultOptions: [{}]
			},
			create(context) {
				return create24 === null && (create24 = require("./rules/default-case.cjs")), create24(context);
			}
		},
		"default-case-last": {
			meta: {
				messages: { notLast: "Default clause should be the last clause." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create25 === null && (create25 = require("./rules/default-case-last.cjs")), create25(context);
			}
		},
		"default-param-last": {
			meta: {
				messages: { shouldBeLast: "Default parameters should be last." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create26 === null && (create26 = require("./rules/default-param-last.cjs")), create26(context);
			}
		},
		"dot-location": {
			meta: {
				messages: {
					expectedDotAfterObject: "Expected dot to be on same line as object.",
					expectedDotBeforeProperty: "Expected dot to be on same line as property."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: ["object", "property"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create27 === null && (create27 = require("./rules/dot-location.cjs")), create27(context);
			}
		},
		"dot-notation": {
			meta: {
				messages: {
					useDot: "[{{key}}] is better written in dot notation.",
					useBrackets: ".{{key}} is a syntax error."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						allowKeywords: { type: "boolean" },
						allowPattern: { type: "string" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allowKeywords: !0,
					allowPattern: ""
				}]
			},
			create(context) {
				return create28 === null && (create28 = require("./rules/dot-notation.cjs")), create28(context);
			}
		},
		"eol-last": {
			meta: {
				messages: {
					missing: "Newline required at end of file but not found.",
					unexpected: "Newline not allowed at end of file."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: [
					"always",
					"never",
					"unix",
					"windows"
				] }],
				defaultOptions: void 0
			},
			create(context) {
				return create29 === null && (create29 = require("./rules/eol-last.cjs")), create29(context);
			}
		},
		eqeqeq: {
			meta: {
				messages: {
					unexpected: "Expected '{{expectedOperator}}' and instead saw '{{actualOperator}}'.",
					replaceOperator: "Use '{{expectedOperator}}' instead of '{{actualOperator}}'."
				},
				fixable: "code",
				hasSuggestions: !0,
				schema: { anyOf: [{
					type: "array",
					items: [{ enum: ["always"] }, {
						type: "object",
						properties: { null: { enum: [
							"always",
							"never",
							"ignore"
						] } },
						additionalProperties: !1
					}],
					additionalItems: !1
				}, {
					type: "array",
					items: [{ enum: ["smart", "allow-null"] }],
					additionalItems: !1
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create30 === null && (create30 = require("./rules/eqeqeq.cjs")), create30(context);
			}
		},
		"for-direction": {
			meta: {
				messages: { incorrectDirection: "The update clause in this loop moves the variable in the wrong direction." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create31 === null && (create31 = require("./rules/for-direction.cjs")), create31(context);
			}
		},
		"func-call-spacing": {
			meta: {
				messages: {
					unexpectedWhitespace: "Unexpected whitespace between function name and paren.",
					unexpectedNewline: "Unexpected newline between function name and paren.",
					missing: "Missing space between function name and paren."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: [{ enum: ["never"] }],
					minItems: 0,
					maxItems: 1
				}, {
					type: "array",
					items: [{ enum: ["always"] }, {
						type: "object",
						properties: { allowNewlines: { type: "boolean" } },
						additionalProperties: !1
					}],
					minItems: 0,
					maxItems: 2
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create32 === null && (create32 = require("./rules/func-call-spacing.cjs")), create32(context);
			}
		},
		"func-name-matching": {
			meta: {
				messages: {
					matchProperty: "Function name `{{funcName}}` should match property name `{{name}}`.",
					matchVariable: "Function name `{{funcName}}` should match variable name `{{name}}`.",
					notMatchProperty: "Function name `{{funcName}}` should not match property name `{{name}}`.",
					notMatchVariable: "Function name `{{funcName}}` should not match variable name `{{name}}`."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					additionalItems: !1,
					items: [{ enum: ["always", "never"] }, {
						type: "object",
						properties: {
							considerPropertyDescriptor: { type: "boolean" },
							includeCommonJSModuleExports: { type: "boolean" }
						},
						additionalProperties: !1
					}]
				}, {
					type: "array",
					additionalItems: !1,
					items: [{
						type: "object",
						properties: {
							considerPropertyDescriptor: { type: "boolean" },
							includeCommonJSModuleExports: { type: "boolean" }
						},
						additionalProperties: !1
					}]
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create33 === null && (create33 = require("./rules/func-name-matching.cjs")), create33(context);
			}
		},
		"func-names": {
			meta: {
				messages: {
					unnamed: "Unexpected unnamed {{name}}.",
					named: "Unexpected named {{name}}."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: {
					definitions: { value: { enum: [
						"always",
						"as-needed",
						"never"
					] } },
					items: [{ $ref: "#/definitions/value" }, {
						type: "object",
						properties: { generators: { $ref: "#/definitions/value" } },
						additionalProperties: !1
					}]
				},
				defaultOptions: ["always", {}]
			},
			create(context) {
				return create34 === null && (create34 = require("./rules/func-names.cjs")), create34(context);
			}
		},
		"func-style": {
			meta: {
				messages: {
					expression: "Expected a function expression.",
					declaration: "Expected a function declaration."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{ enum: ["declaration", "expression"] }, {
					type: "object",
					properties: {
						allowArrowFunctions: { type: "boolean" },
						allowTypeAnnotation: { type: "boolean" },
						overrides: {
							type: "object",
							properties: { namedExports: { enum: [
								"declaration",
								"expression",
								"ignore"
							] } },
							additionalProperties: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: ["expression", {
					allowArrowFunctions: !1,
					allowTypeAnnotation: !1,
					overrides: {}
				}]
			},
			create(context) {
				return create35 === null && (create35 = require("./rules/func-style.cjs")), create35(context);
			}
		},
		"function-call-argument-newline": {
			meta: {
				messages: {
					unexpectedLineBreak: "There should be no line break here.",
					missingLineBreak: "There should be a line break after this argument."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: [
					"always",
					"never",
					"consistent"
				] }],
				defaultOptions: void 0
			},
			create(context) {
				return create36 === null && (create36 = require("./rules/function-call-argument-newline.cjs")), create36(context);
			}
		},
		"function-paren-newline": {
			meta: {
				messages: {
					expectedBefore: "Expected newline before ')'.",
					expectedAfter: "Expected newline after '('.",
					expectedBetween: "Expected newline between arguments/params.",
					unexpectedBefore: "Unexpected newline before ')'.",
					unexpectedAfter: "Unexpected newline after '('."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: [
					"always",
					"never",
					"consistent",
					"multiline",
					"multiline-arguments"
				] }, {
					type: "object",
					properties: { minItems: {
						type: "integer",
						minimum: 0
					} },
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create37 === null && (create37 = require("./rules/function-paren-newline.cjs")), create37(context);
			}
		},
		"generator-star-spacing": {
			meta: {
				messages: {
					missingBefore: "Missing space before *.",
					missingAfter: "Missing space after *.",
					unexpectedBefore: "Unexpected space before *.",
					unexpectedAfter: "Unexpected space after *."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: [
					"before",
					"after",
					"both",
					"neither"
				] }, {
					type: "object",
					properties: {
						before: { type: "boolean" },
						after: { type: "boolean" },
						named: { oneOf: [{ enum: [
							"before",
							"after",
							"both",
							"neither"
						] }, {
							type: "object",
							properties: {
								before: { type: "boolean" },
								after: { type: "boolean" }
							},
							additionalProperties: !1
						}] },
						anonymous: { oneOf: [{ enum: [
							"before",
							"after",
							"both",
							"neither"
						] }, {
							type: "object",
							properties: {
								before: { type: "boolean" },
								after: { type: "boolean" }
							},
							additionalProperties: !1
						}] },
						method: { oneOf: [{ enum: [
							"before",
							"after",
							"both",
							"neither"
						] }, {
							type: "object",
							properties: {
								before: { type: "boolean" },
								after: { type: "boolean" }
							},
							additionalProperties: !1
						}] }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create38 === null && (create38 = require("./rules/generator-star-spacing.cjs")), create38(context);
			}
		},
		"getter-return": {
			meta: {
				messages: {
					expected: "Expected to return a value in {{name}}.",
					expectedAlways: "Expected {{name}} to always return a value."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowImplicit: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowImplicit: !1 }]
			},
			create(context) {
				return create39 === null && (create39 = require("./rules/getter-return.cjs")), create39(context);
			}
		},
		"global-require": {
			meta: {
				messages: { unexpected: "Unexpected require()." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create40 === null && (create40 = require("./rules/global-require.cjs")), create40(context);
			}
		},
		"grouped-accessor-pairs": {
			meta: {
				messages: {
					notGrouped: "Accessor pair {{ formerName }} and {{ latterName }} should be grouped.",
					invalidOrder: "Expected {{ latterName }} to be before {{ formerName }}."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{ enum: [
					"anyOrder",
					"getBeforeSet",
					"setBeforeGet"
				] }, {
					type: "object",
					properties: { enforceForTSTypes: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: ["anyOrder", { enforceForTSTypes: !1 }]
			},
			create(context) {
				return create41 === null && (create41 = require("./rules/grouped-accessor-pairs.cjs")), create41(context);
			}
		},
		"guard-for-in": {
			meta: {
				messages: { wrap: "The body of a for-in should be wrapped in an if statement to filter unwanted properties from the prototype." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create42 === null && (create42 = require("./rules/guard-for-in.cjs")), create42(context);
			}
		},
		"handle-callback-err": {
			meta: {
				messages: { expected: "Expected error to be handled." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ type: "string" }],
				defaultOptions: void 0
			},
			create(context) {
				return create43 === null && (create43 = require("./rules/handle-callback-err.cjs")), create43(context);
			}
		},
		"id-blacklist": {
			meta: {
				messages: { restricted: "Identifier '{{name}}' is restricted." },
				fixable: null,
				hasSuggestions: !1,
				schema: {
					type: "array",
					items: { type: "string" },
					uniqueItems: !0
				},
				defaultOptions: void 0
			},
			create(context) {
				return create44 === null && (create44 = require("./rules/id-blacklist.cjs")), create44(context);
			}
		},
		"id-denylist": {
			meta: {
				messages: {
					restricted: "Identifier '{{name}}' is restricted.",
					restrictedPrivate: "Identifier '#{{name}}' is restricted."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: {
					type: "array",
					items: { type: "string" },
					uniqueItems: !0
				},
				defaultOptions: []
			},
			create(context) {
				return create45 === null && (create45 = require("./rules/id-denylist.cjs")), create45(context);
			}
		},
		"id-length": {
			meta: {
				messages: {
					tooShort: "Identifier name '{{name}}' is too short (< {{min}}).",
					tooShortPrivate: "Identifier name '#{{name}}' is too short (< {{min}}).",
					tooLong: "Identifier name '{{name}}' is too long (> {{max}}).",
					tooLongPrivate: "Identifier name #'{{name}}' is too long (> {{max}})."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						min: { type: "integer" },
						max: { type: "integer" },
						exceptions: {
							type: "array",
							uniqueItems: !0,
							items: { type: "string" }
						},
						exceptionPatterns: {
							type: "array",
							uniqueItems: !0,
							items: { type: "string" }
						},
						properties: { enum: ["always", "never"] }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					exceptionPatterns: [],
					exceptions: [],
					min: 2,
					properties: "always"
				}]
			},
			create(context) {
				return create46 === null && (create46 = require("./rules/id-length.cjs")), create46(context);
			}
		},
		"id-match": {
			meta: {
				messages: {
					notMatch: "Identifier '{{name}}' does not match the pattern '{{pattern}}'.",
					notMatchPrivate: "Identifier '#{{name}}' does not match the pattern '{{pattern}}'."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{ type: "string" }, {
					type: "object",
					properties: {
						properties: { type: "boolean" },
						classFields: { type: "boolean" },
						onlyDeclarations: { type: "boolean" },
						ignoreDestructuring: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: ["^.+$", {
					classFields: !1,
					ignoreDestructuring: !1,
					onlyDeclarations: !1,
					properties: !1
				}]
			},
			create(context) {
				return create47 === null && (create47 = require("./rules/id-match.cjs")), create47(context);
			}
		},
		"implicit-arrow-linebreak": {
			meta: {
				messages: {
					expected: "Expected a linebreak before this expression.",
					unexpected: "Expected no linebreak before this expression."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["beside", "below"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create48 === null && (create48 = require("./rules/implicit-arrow-linebreak.cjs")), create48(context);
			}
		},
		indent: {
			meta: {
				messages: { wrongIndentation: "Expected indentation of {{expected}} but found {{actual}}." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: ["tab"] }, {
					type: "integer",
					minimum: 0
				}] }, {
					type: "object",
					properties: {
						SwitchCase: {
							type: "integer",
							minimum: 0,
							default: 0
						},
						VariableDeclarator: { oneOf: [{ oneOf: [{
							type: "integer",
							minimum: 0
						}, { enum: ["first", "off"] }] }, {
							type: "object",
							properties: {
								var: { oneOf: [{
									type: "integer",
									minimum: 0
								}, { enum: ["first", "off"] }] },
								let: { oneOf: [{
									type: "integer",
									minimum: 0
								}, { enum: ["first", "off"] }] },
								const: { oneOf: [{
									type: "integer",
									minimum: 0
								}, { enum: ["first", "off"] }] }
							},
							additionalProperties: !1
						}] },
						outerIIFEBody: { oneOf: [{
							type: "integer",
							minimum: 0
						}, { enum: ["off"] }] },
						MemberExpression: { oneOf: [{
							type: "integer",
							minimum: 0
						}, { enum: ["off"] }] },
						FunctionDeclaration: {
							type: "object",
							properties: {
								parameters: { oneOf: [{
									type: "integer",
									minimum: 0
								}, { enum: ["first", "off"] }] },
								body: {
									type: "integer",
									minimum: 0
								}
							},
							additionalProperties: !1
						},
						FunctionExpression: {
							type: "object",
							properties: {
								parameters: { oneOf: [{
									type: "integer",
									minimum: 0
								}, { enum: ["first", "off"] }] },
								body: {
									type: "integer",
									minimum: 0
								}
							},
							additionalProperties: !1
						},
						StaticBlock: {
							type: "object",
							properties: { body: {
								type: "integer",
								minimum: 0
							} },
							additionalProperties: !1
						},
						CallExpression: {
							type: "object",
							properties: { arguments: { oneOf: [{
								type: "integer",
								minimum: 0
							}, { enum: ["first", "off"] }] } },
							additionalProperties: !1
						},
						ArrayExpression: { oneOf: [{
							type: "integer",
							minimum: 0
						}, { enum: ["first", "off"] }] },
						ObjectExpression: { oneOf: [{
							type: "integer",
							minimum: 0
						}, { enum: ["first", "off"] }] },
						ImportDeclaration: { oneOf: [{
							type: "integer",
							minimum: 0
						}, { enum: ["first", "off"] }] },
						flatTernaryExpressions: {
							type: "boolean",
							default: !1
						},
						offsetTernaryExpressions: {
							type: "boolean",
							default: !1
						},
						ignoredNodes: {
							type: "array",
							items: {
								type: "string",
								not: { pattern: ":exit$" }
							}
						},
						ignoreComments: {
							type: "boolean",
							default: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create49 === null && (create49 = require("./rules/indent.cjs")), create49(context);
			}
		},
		"indent-legacy": {
			meta: {
				messages: { expected: "Expected indentation of {{expected}} but found {{actual}}." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: ["tab"] }, {
					type: "integer",
					minimum: 0
				}] }, {
					type: "object",
					properties: {
						SwitchCase: {
							type: "integer",
							minimum: 0
						},
						VariableDeclarator: { oneOf: [{
							type: "integer",
							minimum: 0
						}, {
							type: "object",
							properties: {
								var: {
									type: "integer",
									minimum: 0
								},
								let: {
									type: "integer",
									minimum: 0
								},
								const: {
									type: "integer",
									minimum: 0
								}
							}
						}] },
						outerIIFEBody: {
							type: "integer",
							minimum: 0
						},
						MemberExpression: {
							type: "integer",
							minimum: 0
						},
						FunctionDeclaration: {
							type: "object",
							properties: {
								parameters: { oneOf: [{
									type: "integer",
									minimum: 0
								}, { enum: ["first"] }] },
								body: {
									type: "integer",
									minimum: 0
								}
							}
						},
						FunctionExpression: {
							type: "object",
							properties: {
								parameters: { oneOf: [{
									type: "integer",
									minimum: 0
								}, { enum: ["first"] }] },
								body: {
									type: "integer",
									minimum: 0
								}
							}
						},
						CallExpression: {
							type: "object",
							properties: { parameters: { oneOf: [{
								type: "integer",
								minimum: 0
							}, { enum: ["first"] }] } }
						},
						ArrayExpression: { oneOf: [{
							type: "integer",
							minimum: 0
						}, { enum: ["first"] }] },
						ObjectExpression: { oneOf: [{
							type: "integer",
							minimum: 0
						}, { enum: ["first"] }] }
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create50 === null && (create50 = require("./rules/indent-legacy.cjs")), create50(context);
			}
		},
		"init-declarations": {
			meta: {
				messages: {
					initialized: "Variable '{{idName}}' should be initialized on declaration.",
					notInitialized: "Variable '{{idName}}' should not be initialized on declaration."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: [{ enum: ["always"] }],
					minItems: 0,
					maxItems: 1
				}, {
					type: "array",
					items: [{ enum: ["never"] }, {
						type: "object",
						properties: { ignoreForLoopInit: { type: "boolean" } },
						additionalProperties: !1
					}],
					minItems: 0,
					maxItems: 2
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create51 === null && (create51 = require("./rules/init-declarations.cjs")), create51(context);
			}
		},
		"jsx-quotes": {
			meta: {
				messages: { unexpected: "Unexpected usage of {{description}}." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["prefer-single", "prefer-double"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create52 === null && (create52 = require("./rules/jsx-quotes.cjs")), create52(context);
			}
		},
		"key-spacing": {
			meta: {
				messages: {
					extraKey: "Extra space after {{computed}}key '{{key}}'.",
					extraValue: "Extra space before value for {{computed}}key '{{key}}'.",
					missingKey: "Missing space after {{computed}}key '{{key}}'.",
					missingValue: "Missing space before value for {{computed}}key '{{key}}'."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ anyOf: [
					{
						type: "object",
						properties: {
							align: { anyOf: [{ enum: ["colon", "value"] }, {
								type: "object",
								properties: {
									mode: { enum: ["strict", "minimum"] },
									on: { enum: ["colon", "value"] },
									beforeColon: { type: "boolean" },
									afterColon: { type: "boolean" }
								},
								additionalProperties: !1
							}] },
							mode: { enum: ["strict", "minimum"] },
							beforeColon: { type: "boolean" },
							afterColon: { type: "boolean" }
						},
						additionalProperties: !1
					},
					{
						type: "object",
						properties: {
							singleLine: {
								type: "object",
								properties: {
									mode: { enum: ["strict", "minimum"] },
									beforeColon: { type: "boolean" },
									afterColon: { type: "boolean" }
								},
								additionalProperties: !1
							},
							multiLine: {
								type: "object",
								properties: {
									align: { anyOf: [{ enum: ["colon", "value"] }, {
										type: "object",
										properties: {
											mode: { enum: ["strict", "minimum"] },
											on: { enum: ["colon", "value"] },
											beforeColon: { type: "boolean" },
											afterColon: { type: "boolean" }
										},
										additionalProperties: !1
									}] },
									mode: { enum: ["strict", "minimum"] },
									beforeColon: { type: "boolean" },
									afterColon: { type: "boolean" }
								},
								additionalProperties: !1
							}
						},
						additionalProperties: !1
					},
					{
						type: "object",
						properties: {
							singleLine: {
								type: "object",
								properties: {
									mode: { enum: ["strict", "minimum"] },
									beforeColon: { type: "boolean" },
									afterColon: { type: "boolean" }
								},
								additionalProperties: !1
							},
							multiLine: {
								type: "object",
								properties: {
									mode: { enum: ["strict", "minimum"] },
									beforeColon: { type: "boolean" },
									afterColon: { type: "boolean" }
								},
								additionalProperties: !1
							},
							align: {
								type: "object",
								properties: {
									mode: { enum: ["strict", "minimum"] },
									on: { enum: ["colon", "value"] },
									beforeColon: { type: "boolean" },
									afterColon: { type: "boolean" }
								},
								additionalProperties: !1
							}
						},
						additionalProperties: !1
					}
				] }],
				defaultOptions: void 0
			},
			create(context) {
				return create53 === null && (create53 = require("./rules/key-spacing.cjs")), create53(context);
			}
		},
		"keyword-spacing": {
			meta: {
				messages: {
					expectedBefore: "Expected space(s) before \"{{value}}\".",
					expectedAfter: "Expected space(s) after \"{{value}}\".",
					unexpectedBefore: "Unexpected space(s) before \"{{value}}\".",
					unexpectedAfter: "Unexpected space(s) after \"{{value}}\"."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						before: {
							type: "boolean",
							default: !0
						},
						after: {
							type: "boolean",
							default: !0
						},
						overrides: {
							type: "object",
							properties: {
								abstract: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								as: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								async: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								await: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								boolean: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								break: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								byte: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								case: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								catch: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								char: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								class: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								const: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								continue: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								debugger: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								default: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								delete: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								do: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								double: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								else: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								enum: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								export: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								extends: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								false: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								final: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								finally: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								float: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								for: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								from: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								function: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								get: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								goto: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								if: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								implements: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								import: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								in: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								instanceof: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								int: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								interface: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								let: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								long: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								native: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								new: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								null: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								of: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								package: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								private: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								protected: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								public: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								return: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								set: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								short: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								static: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								super: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								switch: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								synchronized: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								this: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								throw: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								throws: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								transient: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								true: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								try: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								typeof: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								var: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								void: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								volatile: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								while: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								with: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								},
								yield: {
									type: "object",
									properties: {
										before: { type: "boolean" },
										after: { type: "boolean" }
									},
									additionalProperties: !1
								}
							},
							additionalProperties: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create54 === null && (create54 = require("./rules/keyword-spacing.cjs")), create54(context);
			}
		},
		"line-comment-position": {
			meta: {
				messages: {
					above: "Expected comment to be above code.",
					beside: "Expected comment to be beside code."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: ["above", "beside"] }, {
					type: "object",
					properties: {
						position: { enum: ["above", "beside"] },
						ignorePattern: { type: "string" },
						applyDefaultPatterns: { type: "boolean" },
						applyDefaultIgnorePatterns: { type: "boolean" }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create55 === null && (create55 = require("./rules/line-comment-position.cjs")), create55(context);
			}
		},
		"linebreak-style": {
			meta: {
				messages: {
					expectedLF: "Expected linebreaks to be 'LF' but found 'CRLF'.",
					expectedCRLF: "Expected linebreaks to be 'CRLF' but found 'LF'."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["unix", "windows"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create56 === null && (create56 = require("./rules/linebreak-style.cjs")), create56(context);
			}
		},
		"lines-around-comment": {
			meta: {
				messages: {
					after: "Expected line after comment.",
					before: "Expected line before comment."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						beforeBlockComment: {
							type: "boolean",
							default: !0
						},
						afterBlockComment: {
							type: "boolean",
							default: !1
						},
						beforeLineComment: {
							type: "boolean",
							default: !1
						},
						afterLineComment: {
							type: "boolean",
							default: !1
						},
						allowBlockStart: {
							type: "boolean",
							default: !1
						},
						allowBlockEnd: {
							type: "boolean",
							default: !1
						},
						allowClassStart: { type: "boolean" },
						allowClassEnd: { type: "boolean" },
						allowObjectStart: { type: "boolean" },
						allowObjectEnd: { type: "boolean" },
						allowArrayStart: { type: "boolean" },
						allowArrayEnd: { type: "boolean" },
						ignorePattern: { type: "string" },
						applyDefaultIgnorePatterns: { type: "boolean" },
						afterHashbangComment: {
							type: "boolean",
							default: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create57 === null && (create57 = require("./rules/lines-around-comment.cjs")), create57(context);
			}
		},
		"lines-around-directive": {
			meta: {
				messages: {
					expected: "Expected newline {{location}} \"{{value}}\" directive.",
					unexpected: "Unexpected newline {{location}} \"{{value}}\" directive."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: {
						before: { enum: ["always", "never"] },
						after: { enum: ["always", "never"] }
					},
					additionalProperties: !1,
					minProperties: 2
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create58 === null && (create58 = require("./rules/lines-around-directive.cjs")), create58(context);
			}
		},
		"lines-between-class-members": {
			meta: {
				messages: {
					never: "Unexpected blank line between class members.",
					always: "Expected blank line between class members."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ anyOf: [{
					type: "object",
					properties: { enforce: {
						type: "array",
						items: {
							type: "object",
							properties: {
								blankLine: { enum: ["always", "never"] },
								prev: { enum: [
									"method",
									"field",
									"*"
								] },
								next: { enum: [
									"method",
									"field",
									"*"
								] }
							},
							additionalProperties: !1,
							required: [
								"blankLine",
								"prev",
								"next"
							]
						},
						minItems: 1
					} },
					additionalProperties: !1,
					required: ["enforce"]
				}, { enum: ["always", "never"] }] }, {
					type: "object",
					properties: { exceptAfterSingleLine: {
						type: "boolean",
						default: !1
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create59 === null && (create59 = require("./rules/lines-between-class-members.cjs")), create59(context);
			}
		},
		"logical-assignment-operators": {
			meta: {
				messages: {
					assignment: "Assignment (=) can be replaced with operator assignment ({{operator}}).",
					useLogicalOperator: "Convert this assignment to use the operator {{ operator }}.",
					logical: "Logical expression can be replaced with an assignment ({{ operator }}).",
					convertLogical: "Replace this logical expression with an assignment with the operator {{ operator }}.",
					if: "'if' statement can be replaced with a logical operator assignment with operator {{ operator }}.",
					convertIf: "Replace this 'if' statement with a logical assignment with operator {{ operator }}.",
					unexpected: "Unexpected logical operator assignment ({{operator}}) shorthand.",
					separate: "Separate the logical assignment into an assignment with a logical operator."
				},
				fixable: "code",
				hasSuggestions: !0,
				schema: {
					type: "array",
					oneOf: [{
						items: [{ const: "always" }, {
							type: "object",
							properties: { enforceForIfStatements: { type: "boolean" } },
							additionalProperties: !1
						}],
						minItems: 0,
						maxItems: 2
					}, {
						items: [{ const: "never" }],
						minItems: 1,
						maxItems: 1
					}]
				},
				defaultOptions: void 0
			},
			create(context) {
				return create60 === null && (create60 = require("./rules/logical-assignment-operators.cjs")), create60(context);
			}
		},
		"max-classes-per-file": {
			meta: {
				messages: { maximumExceeded: "File has too many classes ({{ classCount }}). Maximum allowed is {{ max }}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "integer",
					minimum: 1
				}, {
					type: "object",
					properties: {
						ignoreExpressions: { type: "boolean" },
						max: {
							type: "integer",
							minimum: 1
						}
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create61 === null && (create61 = require("./rules/max-classes-per-file.cjs")), create61(context);
			}
		},
		"max-depth": {
			meta: {
				messages: { tooDeeply: "Blocks are nested too deeply ({{depth}}). Maximum allowed is {{maxDepth}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "integer",
					minimum: 0
				}, {
					type: "object",
					properties: {
						maximum: {
							type: "integer",
							minimum: 0
						},
						max: {
							type: "integer",
							minimum: 0
						}
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create62 === null && (create62 = require("./rules/max-depth.cjs")), create62(context);
			}
		},
		"max-len": {
			meta: {
				messages: {
					max: "This line has a length of {{lineLength}}. Maximum allowed is {{maxLength}}.",
					maxComment: "This line has a comment length of {{lineLength}}. Maximum allowed is {{maxCommentLength}}."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [
					{ anyOf: [{
						type: "object",
						properties: {
							code: {
								type: "integer",
								minimum: 0
							},
							comments: {
								type: "integer",
								minimum: 0
							},
							tabWidth: {
								type: "integer",
								minimum: 0
							},
							ignorePattern: { type: "string" },
							ignoreComments: { type: "boolean" },
							ignoreStrings: { type: "boolean" },
							ignoreUrls: { type: "boolean" },
							ignoreTemplateLiterals: { type: "boolean" },
							ignoreRegExpLiterals: { type: "boolean" },
							ignoreTrailingComments: { type: "boolean" }
						},
						additionalProperties: !1
					}, {
						type: "integer",
						minimum: 0
					}] },
					{ anyOf: [{
						type: "object",
						properties: {
							code: {
								type: "integer",
								minimum: 0
							},
							comments: {
								type: "integer",
								minimum: 0
							},
							tabWidth: {
								type: "integer",
								minimum: 0
							},
							ignorePattern: { type: "string" },
							ignoreComments: { type: "boolean" },
							ignoreStrings: { type: "boolean" },
							ignoreUrls: { type: "boolean" },
							ignoreTemplateLiterals: { type: "boolean" },
							ignoreRegExpLiterals: { type: "boolean" },
							ignoreTrailingComments: { type: "boolean" }
						},
						additionalProperties: !1
					}, {
						type: "integer",
						minimum: 0
					}] },
					{
						type: "object",
						properties: {
							code: {
								type: "integer",
								minimum: 0
							},
							comments: {
								type: "integer",
								minimum: 0
							},
							tabWidth: {
								type: "integer",
								minimum: 0
							},
							ignorePattern: { type: "string" },
							ignoreComments: { type: "boolean" },
							ignoreStrings: { type: "boolean" },
							ignoreUrls: { type: "boolean" },
							ignoreTemplateLiterals: { type: "boolean" },
							ignoreRegExpLiterals: { type: "boolean" },
							ignoreTrailingComments: { type: "boolean" }
						},
						additionalProperties: !1
					}
				],
				defaultOptions: void 0
			},
			create(context) {
				return create63 === null && (create63 = require("./rules/max-len.cjs")), create63(context);
			}
		},
		"max-lines": {
			meta: {
				messages: { exceed: "File has too many lines ({{actual}}). Maximum allowed is {{max}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "integer",
					minimum: 0
				}, {
					type: "object",
					properties: {
						max: {
							type: "integer",
							minimum: 0
						},
						skipComments: { type: "boolean" },
						skipBlankLines: { type: "boolean" }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create64 === null && (create64 = require("./rules/max-lines.cjs")), create64(context);
			}
		},
		"max-lines-per-function": {
			meta: {
				messages: { exceed: "{{name}} has too many lines ({{lineCount}}). Maximum allowed is {{maxLines}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "object",
					properties: {
						max: {
							type: "integer",
							minimum: 0
						},
						skipComments: { type: "boolean" },
						skipBlankLines: { type: "boolean" },
						IIFEs: { type: "boolean" }
					},
					additionalProperties: !1
				}, {
					type: "integer",
					minimum: 1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create65 === null && (create65 = require("./rules/max-lines-per-function.cjs")), create65(context);
			}
		},
		"max-nested-callbacks": {
			meta: {
				messages: { exceed: "Too many nested callbacks ({{num}}). Maximum allowed is {{max}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "integer",
					minimum: 0
				}, {
					type: "object",
					properties: {
						maximum: {
							type: "integer",
							minimum: 0
						},
						max: {
							type: "integer",
							minimum: 0
						}
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create66 === null && (create66 = require("./rules/max-nested-callbacks.cjs")), create66(context);
			}
		},
		"max-params": {
			meta: {
				messages: { exceed: "{{name}} has too many parameters ({{count}}). Maximum allowed is {{max}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "integer",
					minimum: 0
				}, {
					type: "object",
					properties: {
						maximum: {
							type: "integer",
							minimum: 0
						},
						max: {
							type: "integer",
							minimum: 0
						},
						countVoidThis: {
							type: "boolean",
							description: "Whether to count a `this` declaration when the type is `void`."
						}
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create67 === null && (create67 = require("./rules/max-params.cjs")), create67(context);
			}
		},
		"max-statements": {
			meta: {
				messages: { exceed: "{{name}} has too many statements ({{count}}). Maximum allowed is {{max}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "integer",
					minimum: 0
				}, {
					type: "object",
					properties: {
						maximum: {
							type: "integer",
							minimum: 0
						},
						max: {
							type: "integer",
							minimum: 0
						}
					},
					additionalProperties: !1
				}] }, {
					type: "object",
					properties: { ignoreTopLevelFunctions: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create68 === null && (create68 = require("./rules/max-statements.cjs")), create68(context);
			}
		},
		"max-statements-per-line": {
			meta: {
				messages: { exceed: "This line has {{numberOfStatementsOnThisLine}} {{statements}}. Maximum allowed is {{maxStatementsPerLine}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { max: {
						type: "integer",
						minimum: 1,
						default: 1
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create69 === null && (create69 = require("./rules/max-statements-per-line.cjs")), create69(context);
			}
		},
		"multiline-comment-style": {
			meta: {
				messages: {
					expectedBlock: "Expected a block comment instead of consecutive line comments.",
					expectedBareBlock: "Expected a block comment without padding stars.",
					startNewline: "Expected a linebreak after '/*'.",
					endNewline: "Expected a linebreak before '*/'.",
					missingStar: "Expected a '*' at the start of this line.",
					alignment: "Expected this line to be aligned with the start of the comment.",
					expectedLines: "Expected multiple line comments instead of a block comment."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: [{ enum: ["starred-block", "bare-block"] }],
					additionalItems: !1
				}, {
					type: "array",
					items: [{ enum: ["separate-lines"] }, {
						type: "object",
						properties: { checkJSDoc: { type: "boolean" } },
						additionalProperties: !1
					}],
					additionalItems: !1
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create70 === null && (create70 = require("./rules/multiline-comment-style.cjs")), create70(context);
			}
		},
		"multiline-ternary": {
			meta: {
				messages: {
					expectedTestCons: "Expected newline between test and consequent of ternary expression.",
					expectedConsAlt: "Expected newline between consequent and alternate of ternary expression.",
					unexpectedTestCons: "Unexpected newline between test and consequent of ternary expression.",
					unexpectedConsAlt: "Unexpected newline between consequent and alternate of ternary expression."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: [
					"always",
					"always-multiline",
					"never"
				] }],
				defaultOptions: void 0
			},
			create(context) {
				return create71 === null && (create71 = require("./rules/multiline-ternary.cjs")), create71(context);
			}
		},
		"new-cap": {
			meta: {
				messages: {
					upper: "A function with a name starting with an uppercase letter should only be used as a constructor.",
					lower: "A constructor name should not start with a lowercase letter."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						newIsCap: { type: "boolean" },
						capIsNew: { type: "boolean" },
						newIsCapExceptions: {
							type: "array",
							items: { type: "string" }
						},
						newIsCapExceptionPattern: { type: "string" },
						capIsNewExceptions: {
							type: "array",
							items: { type: "string" }
						},
						capIsNewExceptionPattern: { type: "string" },
						properties: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					capIsNew: !0,
					capIsNewExceptions: [
						"Array",
						"Boolean",
						"Date",
						"Error",
						"Function",
						"Number",
						"Object",
						"RegExp",
						"String",
						"Symbol",
						"BigInt"
					],
					newIsCap: !0,
					newIsCapExceptions: [],
					properties: !0
				}]
			},
			create(context) {
				return create72 === null && (create72 = require("./rules/new-cap.cjs")), create72(context);
			}
		},
		"new-parens": {
			meta: {
				messages: {
					missing: "Missing '()' invoking a constructor.",
					unnecessary: "Unnecessary '()' invoking a constructor with no arguments."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create73 === null && (create73 = require("./rules/new-parens.cjs")), create73(context);
			}
		},
		"newline-after-var": {
			meta: {
				messages: {
					expected: "Expected blank line after variable declarations.",
					unexpected: "Unexpected blank line after variable declarations."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["never", "always"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create74 === null && (create74 = require("./rules/newline-after-var.cjs")), create74(context);
			}
		},
		"newline-before-return": {
			meta: {
				messages: { expected: "Expected newline before return statement." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create75 === null && (create75 = require("./rules/newline-before-return.cjs")), create75(context);
			}
		},
		"newline-per-chained-call": {
			meta: {
				messages: { expected: "Expected line break before `{{callee}}`." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { ignoreChainWithDepth: {
						type: "integer",
						minimum: 1,
						maximum: 10,
						default: 2
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create76 === null && (create76 = require("./rules/newline-per-chained-call.cjs")), create76(context);
			}
		},
		"no-alert": {
			meta: {
				messages: { unexpected: "Unexpected {{name}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create77 === null && (create77 = require("./rules/no-alert.cjs")), create77(context);
			}
		},
		"no-array-constructor": {
			meta: {
				messages: {
					preferLiteral: "The array literal notation [] is preferable.",
					useLiteral: "Replace with an array literal.",
					useLiteralAfterSemicolon: "Replace with an array literal, add preceding semicolon."
				},
				fixable: "code",
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create78 === null && (create78 = require("./rules/no-array-constructor.cjs")), create78(context);
			}
		},
		"no-async-promise-executor": {
			meta: {
				messages: { async: "Promise executor functions should not be async." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create79 === null && (create79 = require("./rules/no-async-promise-executor.cjs")), create79(context);
			}
		},
		"no-await-in-loop": {
			meta: {
				messages: { unexpectedAwait: "Unexpected `await` inside a loop." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create80 === null && (create80 = require("./rules/no-await-in-loop.cjs")), create80(context);
			}
		},
		"no-bitwise": {
			meta: {
				messages: { unexpected: "Unexpected use of '{{operator}}'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						allow: {
							type: "array",
							items: { enum: [
								"^",
								"|",
								"&",
								"<<",
								">>",
								">>>",
								"^=",
								"|=",
								"&=",
								"<<=",
								">>=",
								">>>=",
								"~"
							] },
							uniqueItems: !0
						},
						int32Hint: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allow: [],
					int32Hint: !1
				}]
			},
			create(context) {
				return create81 === null && (create81 = require("./rules/no-bitwise.cjs")), create81(context);
			}
		},
		"no-buffer-constructor": {
			meta: {
				messages: { deprecated: "{{expr}} is deprecated. Use Buffer.from(), Buffer.alloc(), or Buffer.allocUnsafe() instead." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create82 === null && (create82 = require("./rules/no-buffer-constructor.cjs")), create82(context);
			}
		},
		"no-caller": {
			meta: {
				messages: { unexpected: "Avoid arguments.{{prop}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create83 === null && (create83 = require("./rules/no-caller.cjs")), create83(context);
			}
		},
		"no-case-declarations": {
			meta: {
				messages: {
					addBrackets: "Add {} brackets around the case block.",
					unexpected: "Unexpected lexical declaration in case block."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create84 === null && (create84 = require("./rules/no-case-declarations.cjs")), create84(context);
			}
		},
		"no-catch-shadow": {
			meta: {
				messages: { mutable: "Value of '{{name}}' may be overwritten in IE 8 and earlier." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create85 === null && (create85 = require("./rules/no-catch-shadow.cjs")), create85(context);
			}
		},
		"no-class-assign": {
			meta: {
				messages: { class: "'{{name}}' is a class." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create86 === null && (create86 = require("./rules/no-class-assign.cjs")), create86(context);
			}
		},
		"no-compare-neg-zero": {
			meta: {
				messages: { unexpected: "Do not use the '{{operator}}' operator to compare against -0." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create87 === null && (create87 = require("./rules/no-compare-neg-zero.cjs")), create87(context);
			}
		},
		"no-cond-assign": {
			meta: {
				messages: {
					unexpected: "Unexpected assignment within {{type}}.",
					missing: "Expected a conditional expression and instead saw an assignment."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{ enum: ["except-parens", "always"] }],
				defaultOptions: ["except-parens"]
			},
			create(context) {
				return create88 === null && (create88 = require("./rules/no-cond-assign.cjs")), create88(context);
			}
		},
		"no-confusing-arrow": {
			meta: {
				messages: { confusing: "Arrow function used ambiguously with a conditional expression." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						allowParens: {
							type: "boolean",
							default: !0
						},
						onlyOneSimpleParam: {
							type: "boolean",
							default: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create89 === null && (create89 = require("./rules/no-confusing-arrow.cjs")), create89(context);
			}
		},
		"no-console": {
			meta: {
				messages: {
					unexpected: "Unexpected console statement.",
					limited: "Unexpected console statement. Only these console methods are allowed: {{ allowed }}.",
					removeConsole: "Remove the console.{{ propertyName }}().",
					removeMethodCall: "Remove the console method call."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { allow: {
						type: "array",
						items: { type: "string" },
						minItems: 1,
						uniqueItems: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: [{}]
			},
			create(context) {
				return create90 === null && (create90 = require("./rules/no-console.cjs")), create90(context);
			}
		},
		"no-const-assign": {
			meta: {
				messages: { const: "'{{name}}' is constant." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create91 === null && (create91 = require("./rules/no-const-assign.cjs")), create91(context);
			}
		},
		"no-constant-binary-expression": {
			meta: {
				messages: {
					constantBinaryOperand: "Unexpected constant binary expression. Compares constantly with the {{otherSide}}-hand side of the `{{operator}}`.",
					constantShortCircuit: "Unexpected constant {{property}} on the left-hand side of a `{{operator}}` expression.",
					alwaysNew: "Unexpected comparison to newly constructed object. These two values can never be equal.",
					bothAlwaysNew: "Unexpected comparison of two newly constructed objects. These two values can never be equal."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create92 === null && (create92 = require("./rules/no-constant-binary-expression.cjs")), create92(context);
			}
		},
		"no-constant-condition": {
			meta: {
				messages: { unexpected: "Unexpected constant condition." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { checkLoops: { enum: [
						"all",
						"allExceptWhileTrue",
						"none",
						!0,
						!1
					] } },
					additionalProperties: !1
				}],
				defaultOptions: [{ checkLoops: "allExceptWhileTrue" }]
			},
			create(context) {
				return create93 === null && (create93 = require("./rules/no-constant-condition.cjs")), create93(context);
			}
		},
		"no-constructor-return": {
			meta: {
				messages: { unexpected: "Unexpected return statement in constructor." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create94 === null && (create94 = require("./rules/no-constructor-return.cjs")), create94(context);
			}
		},
		"no-continue": {
			meta: {
				messages: { unexpected: "Unexpected use of continue statement." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create95 === null && (create95 = require("./rules/no-continue.cjs")), create95(context);
			}
		},
		"no-control-regex": {
			meta: {
				messages: { unexpected: "Unexpected control character(s) in regular expression: {{controlChars}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create96 === null && (create96 = require("./rules/no-control-regex.cjs")), create96(context);
			}
		},
		"no-debugger": {
			meta: {
				messages: { unexpected: "Unexpected 'debugger' statement." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create97 === null && (create97 = require("./rules/no-debugger.cjs")), create97(context);
			}
		},
		"no-delete-var": {
			meta: {
				messages: { unexpected: "Variables should not be deleted." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create98 === null && (create98 = require("./rules/no-delete-var.cjs")), create98(context);
			}
		},
		"no-div-regex": {
			meta: {
				messages: { unexpected: "A regular expression literal can be confused with '/='." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create99 === null && (create99 = require("./rules/no-div-regex.cjs")), create99(context);
			}
		},
		"no-dupe-args": {
			meta: {
				messages: { unexpected: "Duplicate param '{{name}}'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create100 === null && (create100 = require("./rules/no-dupe-args.cjs")), create100(context);
			}
		},
		"no-dupe-class-members": {
			meta: {
				messages: { unexpected: "Duplicate name '{{name}}'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create101 === null && (create101 = require("./rules/no-dupe-class-members.cjs")), create101(context);
			}
		},
		"no-dupe-else-if": {
			meta: {
				messages: { unexpected: "This branch can never execute. Its condition is a duplicate or covered by previous conditions in the if-else-if chain." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create102 === null && (create102 = require("./rules/no-dupe-else-if.cjs")), create102(context);
			}
		},
		"no-dupe-keys": {
			meta: {
				messages: { unexpected: "Duplicate key '{{name}}'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create103 === null && (create103 = require("./rules/no-dupe-keys.cjs")), create103(context);
			}
		},
		"no-duplicate-case": {
			meta: {
				messages: { unexpected: "Duplicate case label." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create104 === null && (create104 = require("./rules/no-duplicate-case.cjs")), create104(context);
			}
		},
		"no-duplicate-imports": {
			meta: {
				messages: {
					import: "'{{module}}' import is duplicated.",
					importAs: "'{{module}}' import is duplicated as export.",
					export: "'{{module}}' export is duplicated.",
					exportAs: "'{{module}}' export is duplicated as import."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						includeExports: { type: "boolean" },
						allowSeparateTypeImports: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					includeExports: !1,
					allowSeparateTypeImports: !1
				}]
			},
			create(context) {
				return create105 === null && (create105 = require("./rules/no-duplicate-imports.cjs")), create105(context);
			}
		},
		"no-else-return": {
			meta: {
				messages: { unexpected: "Unnecessary 'else' after 'return'." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowElseIf: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowElseIf: !0 }]
			},
			create(context) {
				return create106 === null && (create106 = require("./rules/no-else-return.cjs")), create106(context);
			}
		},
		"no-empty": {
			meta: {
				messages: {
					unexpected: "Empty {{type}} statement.",
					suggestComment: "Add comment inside empty {{type}} statement."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { allowEmptyCatch: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowEmptyCatch: !1 }]
			},
			create(context) {
				return create107 === null && (create107 = require("./rules/no-empty.cjs")), create107(context);
			}
		},
		"no-empty-character-class": {
			meta: {
				messages: { unexpected: "Empty class." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create108 === null && (create108 = require("./rules/no-empty-character-class.cjs")), create108(context);
			}
		},
		"no-empty-function": {
			meta: {
				messages: {
					unexpected: "Unexpected empty {{name}}.",
					suggestComment: "Add comment inside empty {{name}}."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { allow: {
						type: "array",
						items: { enum: [
							"functions",
							"arrowFunctions",
							"generatorFunctions",
							"methods",
							"generatorMethods",
							"getters",
							"setters",
							"constructors",
							"asyncFunctions",
							"asyncMethods",
							"privateConstructors",
							"protectedConstructors",
							"decoratedFunctions",
							"overrideMethods"
						] },
						uniqueItems: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: [{ allow: [] }]
			},
			create(context) {
				return create109 === null && (create109 = require("./rules/no-empty-function.cjs")), create109(context);
			}
		},
		"no-empty-pattern": {
			meta: {
				messages: { unexpected: "Unexpected empty {{type}} pattern." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowObjectPatternsAsParameters: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowObjectPatternsAsParameters: !1 }]
			},
			create(context) {
				return create110 === null && (create110 = require("./rules/no-empty-pattern.cjs")), create110(context);
			}
		},
		"no-empty-static-block": {
			meta: {
				messages: {
					unexpected: "Unexpected empty static block.",
					suggestComment: "Add comment inside empty static block."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create111 === null && (create111 = require("./rules/no-empty-static-block.cjs")), create111(context);
			}
		},
		"no-eq-null": {
			meta: {
				messages: { unexpected: "Use '===' to compare with null." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create112 === null && (create112 = require("./rules/no-eq-null.cjs")), create112(context);
			}
		},
		"no-eval": {
			meta: {
				messages: { unexpected: "eval can be harmful." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowIndirect: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowIndirect: !1 }]
			},
			create(context) {
				return create113 === null && (create113 = require("./rules/no-eval.cjs")), create113(context);
			}
		},
		"no-ex-assign": {
			meta: {
				messages: { unexpected: "Do not assign to the exception parameter." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create114 === null && (create114 = require("./rules/no-ex-assign.cjs")), create114(context);
			}
		},
		"no-extend-native": {
			meta: {
				messages: { unexpected: "{{builtin}} prototype is read only, properties should not be added." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { exceptions: {
						type: "array",
						items: { type: "string" },
						uniqueItems: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: [{ exceptions: [] }]
			},
			create(context) {
				return create115 === null && (create115 = require("./rules/no-extend-native.cjs")), create115(context);
			}
		},
		"no-extra-bind": {
			meta: {
				messages: { unexpected: "The function binding is unnecessary." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create116 === null && (create116 = require("./rules/no-extra-bind.cjs")), create116(context);
			}
		},
		"no-extra-boolean-cast": {
			meta: {
				messages: {
					unexpectedCall: "Redundant Boolean call.",
					unexpectedNegation: "Redundant double negation."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ anyOf: [{
					type: "object",
					properties: { enforceForInnerExpressions: { type: "boolean" } },
					additionalProperties: !1
				}, {
					type: "object",
					properties: { enforceForLogicalOperands: { type: "boolean" } },
					additionalProperties: !1
				}] }],
				defaultOptions: [{}]
			},
			create(context) {
				return create117 === null && (create117 = require("./rules/no-extra-boolean-cast.cjs")), create117(context);
			}
		},
		"no-extra-label": {
			meta: {
				messages: { unexpected: "This label '{{name}}' is unnecessary." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create118 === null && (create118 = require("./rules/no-extra-label.cjs")), create118(context);
			}
		},
		"no-extra-parens": {
			meta: {
				messages: { unexpected: "Unnecessary parentheses around expression." },
				fixable: "code",
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: [{ enum: ["functions"] }],
					minItems: 0,
					maxItems: 1
				}, {
					type: "array",
					items: [{ enum: ["all"] }, {
						type: "object",
						properties: {
							conditionalAssign: { type: "boolean" },
							ternaryOperandBinaryExpressions: { type: "boolean" },
							nestedBinaryExpressions: { type: "boolean" },
							returnAssign: { type: "boolean" },
							ignoreJSX: { enum: [
								"none",
								"all",
								"single-line",
								"multi-line"
							] },
							enforceForArrowConditionals: { type: "boolean" },
							enforceForSequenceExpressions: { type: "boolean" },
							enforceForNewInMemberExpressions: { type: "boolean" },
							enforceForFunctionPrototypeMethods: { type: "boolean" },
							allowParensAfterCommentPattern: { type: "string" }
						},
						additionalProperties: !1
					}],
					minItems: 0,
					maxItems: 2
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create119 === null && (create119 = require("./rules/no-extra-parens.cjs")), create119(context);
			}
		},
		"no-extra-semi": {
			meta: {
				messages: { unexpected: "Unnecessary semicolon." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create120 === null && (create120 = require("./rules/no-extra-semi.cjs")), create120(context);
			}
		},
		"no-fallthrough": {
			meta: {
				messages: {
					unusedFallthroughComment: "Found a comment that would permit fallthrough, but case cannot fall through.",
					case: "Expected a 'break' statement before 'case'.",
					default: "Expected a 'break' statement before 'default'."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						commentPattern: { type: "string" },
						allowEmptyCase: { type: "boolean" },
						reportUnusedFallthroughComment: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allowEmptyCase: !1,
					reportUnusedFallthroughComment: !1
				}]
			},
			create(context) {
				return create121 === null && (create121 = require("./rules/no-fallthrough.cjs")), create121(context);
			}
		},
		"no-floating-decimal": {
			meta: {
				messages: {
					leading: "A leading decimal point can be confused with a dot.",
					trailing: "A trailing decimal point can be confused with a dot."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create122 === null && (create122 = require("./rules/no-floating-decimal.cjs")), create122(context);
			}
		},
		"no-func-assign": {
			meta: {
				messages: { isAFunction: "'{{name}}' is a function." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create123 === null && (create123 = require("./rules/no-func-assign.cjs")), create123(context);
			}
		},
		"no-global-assign": {
			meta: {
				messages: { globalShouldNotBeModified: "Read-only global '{{name}}' should not be modified." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { exceptions: {
						type: "array",
						items: { type: "string" },
						uniqueItems: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: [{ exceptions: [] }]
			},
			create(context) {
				return create124 === null && (create124 = require("./rules/no-global-assign.cjs")), create124(context);
			}
		},
		"no-implicit-coercion": {
			meta: {
				messages: {
					implicitCoercion: "Unexpected implicit coercion encountered. Use `{{recommendation}}` instead.",
					useRecommendation: "Use `{{recommendation}}` instead."
				},
				fixable: "code",
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: {
						boolean: { type: "boolean" },
						number: { type: "boolean" },
						string: { type: "boolean" },
						disallowTemplateShorthand: { type: "boolean" },
						allow: {
							type: "array",
							items: { enum: [
								"~",
								"!!",
								"+",
								"- -",
								"-",
								"*"
							] },
							uniqueItems: !0
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allow: [],
					boolean: !0,
					disallowTemplateShorthand: !1,
					number: !0,
					string: !0
				}]
			},
			create(context) {
				return create125 === null && (create125 = require("./rules/no-implicit-coercion.cjs")), create125(context);
			}
		},
		"no-implicit-globals": {
			meta: {
				messages: {
					globalNonLexicalBinding: "Unexpected {{kind}} declaration in the global scope, wrap in an IIFE for a local variable, assign as global property for a global variable.",
					globalLexicalBinding: "Unexpected {{kind}} declaration in the global scope, wrap in a block or in an IIFE.",
					globalVariableLeak: "Global variable leak, declare the variable if it is intended to be local.",
					assignmentToReadonlyGlobal: "Unexpected assignment to read-only global variable.",
					redeclarationOfReadonlyGlobal: "Unexpected redeclaration of read-only global variable."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { lexicalBindings: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ lexicalBindings: !1 }]
			},
			create(context) {
				return create126 === null && (create126 = require("./rules/no-implicit-globals.cjs")), create126(context);
			}
		},
		"no-implied-eval": {
			meta: {
				messages: {
					impliedEval: "Implied eval. Consider passing a function instead of a string.",
					execScript: "Implied eval. Do not use execScript()."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create127 === null && (create127 = require("./rules/no-implied-eval.cjs")), create127(context);
			}
		},
		"no-import-assign": {
			meta: {
				messages: {
					readonly: "'{{name}}' is read-only.",
					readonlyMember: "The members of '{{name}}' are read-only."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create128 === null && (create128 = require("./rules/no-import-assign.cjs")), create128(context);
			}
		},
		"no-inline-comments": {
			meta: {
				messages: { unexpectedInlineComment: "Unexpected comment inline with code." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { ignorePattern: { type: "string" } },
					additionalProperties: !1
				}],
				defaultOptions: [{}]
			},
			create(context) {
				return create129 === null && (create129 = require("./rules/no-inline-comments.cjs")), create129(context);
			}
		},
		"no-inner-declarations": {
			meta: {
				messages: { moveDeclToRoot: "Move {{type}} declaration to {{body}} root." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ enum: ["functions", "both"] }, {
					type: "object",
					properties: { blockScopedFunctions: { enum: ["allow", "disallow"] } },
					additionalProperties: !1
				}],
				defaultOptions: ["functions", { blockScopedFunctions: "allow" }]
			},
			create(context) {
				return create130 === null && (create130 = require("./rules/no-inner-declarations.cjs")), create130(context);
			}
		},
		"no-invalid-regexp": {
			meta: {
				messages: { regexMessage: "{{message}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowConstructorFlags: {
						type: "array",
						items: { type: "string" }
					} },
					additionalProperties: !1
				}],
				defaultOptions: [{}]
			},
			create(context) {
				return create131 === null && (create131 = require("./rules/no-invalid-regexp.cjs")), create131(context);
			}
		},
		"no-invalid-this": {
			meta: {
				messages: { unexpectedThis: "Unexpected 'this'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { capIsConstructor: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ capIsConstructor: !0 }]
			},
			create(context) {
				return create132 === null && (create132 = require("./rules/no-invalid-this.cjs")), create132(context);
			}
		},
		"no-irregular-whitespace": {
			meta: {
				messages: { noIrregularWhitespace: "Irregular whitespace not allowed." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						skipComments: { type: "boolean" },
						skipStrings: { type: "boolean" },
						skipTemplates: { type: "boolean" },
						skipRegExps: { type: "boolean" },
						skipJSXText: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					skipComments: !1,
					skipJSXText: !1,
					skipRegExps: !1,
					skipStrings: !0,
					skipTemplates: !1
				}]
			},
			create(context) {
				return create133 === null && (create133 = require("./rules/no-irregular-whitespace.cjs")), create133(context);
			}
		},
		"no-iterator": {
			meta: {
				messages: { noIterator: "Reserved name '__iterator__'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create134 === null && (create134 = require("./rules/no-iterator.cjs")), create134(context);
			}
		},
		"no-label-var": {
			meta: {
				messages: { identifierClashWithLabel: "Found identifier with same name as label." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create135 === null && (create135 = require("./rules/no-label-var.cjs")), create135(context);
			}
		},
		"no-labels": {
			meta: {
				messages: {
					unexpectedLabel: "Unexpected labeled statement.",
					unexpectedLabelInBreak: "Unexpected label in break statement.",
					unexpectedLabelInContinue: "Unexpected label in continue statement."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						allowLoop: { type: "boolean" },
						allowSwitch: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allowLoop: !1,
					allowSwitch: !1
				}]
			},
			create(context) {
				return create136 === null && (create136 = require("./rules/no-labels.cjs")), create136(context);
			}
		},
		"no-lone-blocks": {
			meta: {
				messages: {
					redundantBlock: "Block is redundant.",
					redundantNestedBlock: "Nested block is redundant."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create137 === null && (create137 = require("./rules/no-lone-blocks.cjs")), create137(context);
			}
		},
		"no-lonely-if": {
			meta: {
				messages: { unexpectedLonelyIf: "Unexpected if as the only statement in an else block." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create138 === null && (create138 = require("./rules/no-lonely-if.cjs")), create138(context);
			}
		},
		"no-loop-func": {
			meta: {
				messages: { unsafeRefs: "Function declared in a loop contains unsafe references to variable(s) {{ varNames }}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create139 === null && (create139 = require("./rules/no-loop-func.cjs")), create139(context);
			}
		},
		"no-loss-of-precision": {
			meta: {
				messages: { noLossOfPrecision: "This number literal will lose precision at runtime." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create140 === null && (create140 = require("./rules/no-loss-of-precision.cjs")), create140(context);
			}
		},
		"no-magic-numbers": {
			meta: {
				messages: {
					useConst: "Number constants declarations must use 'const'.",
					noMagic: "No magic number: {{raw}}."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						detectObjects: {
							type: "boolean",
							default: !1
						},
						enforceConst: {
							type: "boolean",
							default: !1
						},
						ignore: {
							type: "array",
							items: { anyOf: [{ type: "number" }, {
								type: "string",
								pattern: "^[+-]?(?:0|[1-9][0-9]*)n$"
							}] },
							uniqueItems: !0
						},
						ignoreArrayIndexes: {
							type: "boolean",
							default: !1
						},
						ignoreDefaultValues: {
							type: "boolean",
							default: !1
						},
						ignoreClassFieldInitialValues: {
							type: "boolean",
							default: !1
						},
						ignoreEnums: {
							type: "boolean",
							default: !1
						},
						ignoreNumericLiteralTypes: {
							type: "boolean",
							default: !1
						},
						ignoreReadonlyClassProperties: {
							type: "boolean",
							default: !1
						},
						ignoreTypeIndexes: {
							type: "boolean",
							default: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create141 === null && (create141 = require("./rules/no-magic-numbers.cjs")), create141(context);
			}
		},
		"no-misleading-character-class": {
			meta: {
				messages: {
					surrogatePairWithoutUFlag: "Unexpected surrogate pair in character class. Use 'u' flag.",
					surrogatePair: "Unexpected surrogate pair in character class.",
					combiningClass: "Unexpected combined character in character class.",
					emojiModifier: "Unexpected modified Emoji in character class.",
					regionalIndicatorSymbol: "Unexpected national flag in character class.",
					zwj: "Unexpected joined character sequence in character class.",
					suggestUnicodeFlag: "Add unicode 'u' flag to regex."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { allowEscape: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowEscape: !1 }]
			},
			create(context) {
				return create142 === null && (create142 = require("./rules/no-misleading-character-class.cjs")), create142(context);
			}
		},
		"no-mixed-operators": {
			meta: {
				messages: { unexpectedMixedOperator: "Unexpected mix of '{{leftOperator}}' and '{{rightOperator}}'. Use parentheses to clarify the intended order of operations." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						groups: {
							type: "array",
							items: {
								type: "array",
								items: { enum: /* @__PURE__ */ "+.-.*./.%.**.&.|.^.~.<<.>>.>>>.==.!=.===.!==.>.>=.<.<=.&&.||.in.instanceof.?:.??".split(".") },
								minItems: 2,
								uniqueItems: !0
							},
							uniqueItems: !0
						},
						allowSamePrecedence: {
							type: "boolean",
							default: !0
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create143 === null && (create143 = require("./rules/no-mixed-operators.cjs")), create143(context);
			}
		},
		"no-mixed-requires": {
			meta: {
				messages: {
					noMixRequire: "Do not mix 'require' and other declarations.",
					noMixCoreModuleFileComputed: "Do not mix core, module, file and computed requires."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{ type: "boolean" }, {
					type: "object",
					properties: {
						grouping: { type: "boolean" },
						allowCall: { type: "boolean" }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create144 === null && (create144 = require("./rules/no-mixed-requires.cjs")), create144(context);
			}
		},
		"no-mixed-spaces-and-tabs": {
			meta: {
				messages: { mixedSpacesAndTabs: "Mixed spaces and tabs." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ enum: [
					"smart-tabs",
					!0,
					!1
				] }],
				defaultOptions: void 0
			},
			create(context) {
				return create145 === null && (create145 = require("./rules/no-mixed-spaces-and-tabs.cjs")), create145(context);
			}
		},
		"no-multi-assign": {
			meta: {
				messages: { unexpectedChain: "Unexpected chained assignment." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { ignoreNonDeclaration: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ ignoreNonDeclaration: !1 }]
			},
			create(context) {
				return create146 === null && (create146 = require("./rules/no-multi-assign.cjs")), create146(context);
			}
		},
		"no-multi-spaces": {
			meta: {
				messages: { multipleSpaces: "Multiple spaces found before '{{displayValue}}'." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						exceptions: {
							type: "object",
							patternProperties: { "^([A-Z][a-z]*)+$": { type: "boolean" } },
							additionalProperties: !1
						},
						ignoreEOLComments: {
							type: "boolean",
							default: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create147 === null && (create147 = require("./rules/no-multi-spaces.cjs")), create147(context);
			}
		},
		"no-multi-str": {
			meta: {
				messages: { multilineString: "Multiline support is limited to browsers supporting ES5 only." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create148 === null && (create148 = require("./rules/no-multi-str.cjs")), create148(context);
			}
		},
		"no-multiple-empty-lines": {
			meta: {
				messages: {
					blankBeginningOfFile: "Too many blank lines at the beginning of file. Max of {{max}} allowed.",
					blankEndOfFile: "Too many blank lines at the end of file. Max of {{max}} allowed.",
					consecutiveBlank: "More than {{max}} blank {{pluralizedLines}} not allowed."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						max: {
							type: "integer",
							minimum: 0
						},
						maxEOF: {
							type: "integer",
							minimum: 0
						},
						maxBOF: {
							type: "integer",
							minimum: 0
						}
					},
					required: ["max"],
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create149 === null && (create149 = require("./rules/no-multiple-empty-lines.cjs")), create149(context);
			}
		},
		"no-native-reassign": {
			meta: {
				messages: { nativeReassign: "Read-only global '{{name}}' should not be modified." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { exceptions: {
						type: "array",
						items: { type: "string" },
						uniqueItems: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create150 === null && (create150 = require("./rules/no-native-reassign.cjs")), create150(context);
			}
		},
		"no-negated-condition": {
			meta: {
				messages: { unexpectedNegated: "Unexpected negated condition." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create151 === null && (create151 = require("./rules/no-negated-condition.cjs")), create151(context);
			}
		},
		"no-negated-in-lhs": {
			meta: {
				messages: { negatedLHS: "The 'in' expression's left operand is negated." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create152 === null && (create152 = require("./rules/no-negated-in-lhs.cjs")), create152(context);
			}
		},
		"no-nested-ternary": {
			meta: {
				messages: { noNestedTernary: "Do not nest ternary expressions." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create153 === null && (create153 = require("./rules/no-nested-ternary.cjs")), create153(context);
			}
		},
		"no-new": {
			meta: {
				messages: { noNewStatement: "Do not use 'new' for side effects." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create154 === null && (create154 = require("./rules/no-new.cjs")), create154(context);
			}
		},
		"no-new-func": {
			meta: {
				messages: { noFunctionConstructor: "The Function constructor is eval." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create155 === null && (create155 = require("./rules/no-new-func.cjs")), create155(context);
			}
		},
		"no-new-native-nonconstructor": {
			meta: {
				messages: { noNewNonconstructor: "`{{name}}` cannot be called as a constructor." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create156 === null && (create156 = require("./rules/no-new-native-nonconstructor.cjs")), create156(context);
			}
		},
		"no-new-object": {
			meta: {
				messages: { preferLiteral: "The object literal notation {} is preferable." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create157 === null && (create157 = require("./rules/no-new-object.cjs")), create157(context);
			}
		},
		"no-new-require": {
			meta: {
				messages: { noNewRequire: "Unexpected use of new with require." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create158 === null && (create158 = require("./rules/no-new-require.cjs")), create158(context);
			}
		},
		"no-new-symbol": {
			meta: {
				messages: { noNewSymbol: "`Symbol` cannot be called as a constructor." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create159 === null && (create159 = require("./rules/no-new-symbol.cjs")), create159(context);
			}
		},
		"no-new-wrappers": {
			meta: {
				messages: { noConstructor: "Do not use {{fn}} as a constructor." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create160 === null && (create160 = require("./rules/no-new-wrappers.cjs")), create160(context);
			}
		},
		"no-nonoctal-decimal-escape": {
			meta: {
				messages: {
					decimalEscape: "Don't use '{{decimalEscape}}' escape sequence.",
					refactor: "Replace '{{original}}' with '{{replacement}}'. This maintains the current functionality.",
					escapeBackslash: "Replace '{{original}}' with '{{replacement}}' to include the actual backslash character."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create161 === null && (create161 = require("./rules/no-nonoctal-decimal-escape.cjs")), create161(context);
			}
		},
		"no-obj-calls": {
			meta: {
				messages: {
					unexpectedCall: "'{{name}}' is not a function.",
					unexpectedRefCall: "'{{name}}' is reference to '{{ref}}', which is not a function."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create162 === null && (create162 = require("./rules/no-obj-calls.cjs")), create162(context);
			}
		},
		"no-object-constructor": {
			meta: {
				messages: {
					preferLiteral: "The object literal notation {} is preferable.",
					useLiteral: "Replace with '{{replacement}}'.",
					useLiteralAfterSemicolon: "Replace with '{{replacement}}', add preceding semicolon."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create163 === null && (create163 = require("./rules/no-object-constructor.cjs")), create163(context);
			}
		},
		"no-octal": {
			meta: {
				messages: { noOctal: "Octal literals should not be used." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create164 === null && (create164 = require("./rules/no-octal.cjs")), create164(context);
			}
		},
		"no-octal-escape": {
			meta: {
				messages: { octalEscapeSequence: "Don't use octal: '\\{{sequence}}'. Use '\\u....' instead." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create165 === null && (create165 = require("./rules/no-octal-escape.cjs")), create165(context);
			}
		},
		"no-param-reassign": {
			meta: {
				messages: {
					assignmentToFunctionParam: "Assignment to function parameter '{{name}}'.",
					assignmentToFunctionParamProp: "Assignment to property of function parameter '{{name}}'."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "object",
					properties: { props: { enum: [!1] } },
					additionalProperties: !1
				}, {
					type: "object",
					properties: {
						props: { enum: [!0] },
						ignorePropertyModificationsFor: {
							type: "array",
							items: { type: "string" },
							uniqueItems: !0
						},
						ignorePropertyModificationsForRegex: {
							type: "array",
							items: { type: "string" },
							uniqueItems: !0
						}
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create166 === null && (create166 = require("./rules/no-param-reassign.cjs")), create166(context);
			}
		},
		"no-path-concat": {
			meta: {
				messages: { usePathFunctions: "Use path.join() or path.resolve() instead of + to create paths." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create167 === null && (create167 = require("./rules/no-path-concat.cjs")), create167(context);
			}
		},
		"no-plusplus": {
			meta: {
				messages: { unexpectedUnaryOp: "Unary operator '{{operator}}' used." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowForLoopAfterthoughts: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowForLoopAfterthoughts: !1 }]
			},
			create(context) {
				return create168 === null && (create168 = require("./rules/no-plusplus.cjs")), create168(context);
			}
		},
		"no-process-env": {
			meta: {
				messages: { unexpectedProcessEnv: "Unexpected use of process.env." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create169 === null && (create169 = require("./rules/no-process-env.cjs")), create169(context);
			}
		},
		"no-process-exit": {
			meta: {
				messages: { noProcessExit: "Don't use process.exit(); throw an error instead." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create170 === null && (create170 = require("./rules/no-process-exit.cjs")), create170(context);
			}
		},
		"no-promise-executor-return": {
			meta: {
				messages: {
					returnsValue: "Return values from promise executor functions cannot be read.",
					prependVoid: "Prepend `void` to the expression.",
					wrapBraces: "Wrap the expression in `{}`."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { allowVoid: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowVoid: !1 }]
			},
			create(context) {
				return create171 === null && (create171 = require("./rules/no-promise-executor-return.cjs")), create171(context);
			}
		},
		"no-proto": {
			meta: {
				messages: { unexpectedProto: "The '__proto__' property is deprecated." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create172 === null && (create172 = require("./rules/no-proto.cjs")), create172(context);
			}
		},
		"no-prototype-builtins": {
			meta: {
				messages: {
					prototypeBuildIn: "Do not access Object.prototype method '{{prop}}' from target object.",
					callObjectPrototype: "Call Object.prototype.{{prop}} explicitly."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create173 === null && (create173 = require("./rules/no-prototype-builtins.cjs")), create173(context);
			}
		},
		"no-redeclare": {
			meta: {
				messages: {
					redeclared: "'{{id}}' is already defined.",
					redeclaredAsBuiltin: "'{{id}}' is already defined as a built-in global variable.",
					redeclaredBySyntax: "'{{id}}' is already defined by a variable declaration."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { builtinGlobals: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ builtinGlobals: !0 }]
			},
			create(context) {
				return create174 === null && (create174 = require("./rules/no-redeclare.cjs")), create174(context);
			}
		},
		"no-regex-spaces": {
			meta: {
				messages: { multipleSpaces: "Spaces are hard to count. Use {{{length}}}." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create175 === null && (create175 = require("./rules/no-regex-spaces.cjs")), create175(context);
			}
		},
		"no-restricted-exports": {
			meta: {
				messages: {
					restrictedNamed: "'{{name}}' is restricted from being used as an exported name.",
					restrictedDefault: "Exporting 'default' is restricted."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{ anyOf: [{
					type: "object",
					properties: {
						restrictedNamedExports: {
							type: "array",
							items: { type: "string" },
							uniqueItems: !0
						},
						restrictedNamedExportsPattern: { type: "string" }
					},
					additionalProperties: !1
				}, {
					type: "object",
					properties: {
						restrictedNamedExports: {
							type: "array",
							items: {
								type: "string",
								pattern: "^(?!default$)"
							},
							uniqueItems: !0
						},
						restrictedNamedExportsPattern: { type: "string" },
						restrictDefaultExports: {
							type: "object",
							properties: {
								direct: { type: "boolean" },
								named: { type: "boolean" },
								defaultFrom: { type: "boolean" },
								namedFrom: { type: "boolean" },
								namespaceFrom: { type: "boolean" }
							},
							additionalProperties: !1
						}
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create176 === null && (create176 = require("./rules/no-restricted-exports.cjs")), create176(context);
			}
		},
		"no-restricted-globals": {
			meta: {
				messages: {
					defaultMessage: "Unexpected use of '{{name}}'.",
					customMessage: "Unexpected use of '{{name}}'. {{customMessage}}"
				},
				fixable: null,
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: { oneOf: [{ type: "string" }, {
						type: "object",
						properties: {
							name: { type: "string" },
							message: { type: "string" }
						},
						required: ["name"],
						additionalProperties: !1
					}] },
					uniqueItems: !0,
					minItems: 0
				}, {
					type: "array",
					items: [{
						type: "object",
						properties: {
							globals: {
								type: "array",
								items: { oneOf: [{ type: "string" }, {
									type: "object",
									properties: {
										name: { type: "string" },
										message: { type: "string" }
									},
									required: ["name"],
									additionalProperties: !1
								}] },
								uniqueItems: !0,
								minItems: 0
							},
							checkGlobalObject: { type: "boolean" },
							globalObjects: {
								type: "array",
								items: { type: "string" },
								uniqueItems: !0
							}
						},
						required: ["globals"],
						additionalProperties: !1
					}],
					additionalItems: !1
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create177 === null && (create177 = require("./rules/no-restricted-globals.cjs")), create177(context);
			}
		},
		"no-restricted-imports": {
			meta: {
				messages: {
					path: "'{{importSource}}' import is restricted from being used.",
					pathWithCustomMessage: "'{{importSource}}' import is restricted from being used. {{customMessage}}",
					patterns: "'{{importSource}}' import is restricted from being used by a pattern.",
					patternWithCustomMessage: "'{{importSource}}' import is restricted from being used by a pattern. {{customMessage}}",
					patternAndImportName: "'{{importName}}' import from '{{importSource}}' is restricted from being used by a pattern.",
					patternAndImportNameWithCustomMessage: "'{{importName}}' import from '{{importSource}}' is restricted from being used by a pattern. {{customMessage}}",
					patternAndEverything: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted from being used by a pattern.",
					patternAndEverythingWithRegexImportName: "* import is invalid because import name matching '{{importNames}}' pattern from '{{importSource}}' is restricted from being used.",
					patternAndEverythingWithCustomMessage: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted from being used by a pattern. {{customMessage}}",
					patternAndEverythingWithRegexImportNameAndCustomMessage: "* import is invalid because import name matching '{{importNames}}' pattern from '{{importSource}}' is restricted from being used. {{customMessage}}",
					everything: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted.",
					everythingWithCustomMessage: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted. {{customMessage}}",
					importName: "'{{importName}}' import from '{{importSource}}' is restricted.",
					importNameWithCustomMessage: "'{{importName}}' import from '{{importSource}}' is restricted. {{customMessage}}",
					allowedImportName: "'{{importName}}' import from '{{importSource}}' is restricted because only '{{allowedImportNames}}' import(s) is/are allowed.",
					allowedImportNameWithCustomMessage: "'{{importName}}' import from '{{importSource}}' is restricted because only '{{allowedImportNames}}' import(s) is/are allowed. {{customMessage}}",
					everythingWithAllowImportNames: "* import is invalid because only '{{allowedImportNames}}' from '{{importSource}}' is/are allowed.",
					everythingWithAllowImportNamesAndCustomMessage: "* import is invalid because only '{{allowedImportNames}}' from '{{importSource}}' is/are allowed. {{customMessage}}",
					allowedImportNamePattern: "'{{importName}}' import from '{{importSource}}' is restricted because only imports that match the pattern '{{allowedImportNamePattern}}' are allowed from '{{importSource}}'.",
					allowedImportNamePatternWithCustomMessage: "'{{importName}}' import from '{{importSource}}' is restricted because only imports that match the pattern '{{allowedImportNamePattern}}' are allowed from '{{importSource}}'. {{customMessage}}",
					everythingWithAllowedImportNamePattern: "* import is invalid because only imports that match the pattern '{{allowedImportNamePattern}}' from '{{importSource}}' are allowed.",
					everythingWithAllowedImportNamePatternWithCustomMessage: "* import is invalid because only imports that match the pattern '{{allowedImportNamePattern}}' from '{{importSource}}' are allowed. {{customMessage}}"
				},
				fixable: null,
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: { anyOf: [{ type: "string" }, {
						type: "object",
						properties: {
							name: { type: "string" },
							message: {
								type: "string",
								minLength: 1
							},
							importNames: {
								type: "array",
								items: { type: "string" }
							},
							allowImportNames: {
								type: "array",
								items: { type: "string" }
							},
							allowTypeImports: {
								type: "boolean",
								description: "Whether to allow type-only imports for a path."
							}
						},
						additionalProperties: !1,
						required: ["name"],
						not: { required: ["importNames", "allowImportNames"] }
					}] },
					uniqueItems: !0
				}, {
					type: "array",
					items: [{
						type: "object",
						properties: {
							paths: {
								type: "array",
								items: { anyOf: [{ type: "string" }, {
									type: "object",
									properties: {
										name: { type: "string" },
										message: {
											type: "string",
											minLength: 1
										},
										importNames: {
											type: "array",
											items: { type: "string" }
										},
										allowImportNames: {
											type: "array",
											items: { type: "string" }
										},
										allowTypeImports: {
											type: "boolean",
											description: "Whether to allow type-only imports for a path."
										}
									},
									additionalProperties: !1,
									required: ["name"],
									not: { required: ["importNames", "allowImportNames"] }
								}] },
								uniqueItems: !0
							},
							patterns: { anyOf: [{
								type: "array",
								items: { type: "string" },
								uniqueItems: !0
							}, {
								type: "array",
								items: {
									type: "object",
									properties: {
										importNames: {
											type: "array",
											items: { type: "string" },
											minItems: 1,
											uniqueItems: !0
										},
										allowImportNames: {
											type: "array",
											items: { type: "string" },
											minItems: 1,
											uniqueItems: !0
										},
										group: {
											type: "array",
											items: { type: "string" },
											minItems: 1,
											uniqueItems: !0
										},
										regex: { type: "string" },
										importNamePattern: { type: "string" },
										allowImportNamePattern: { type: "string" },
										message: {
											type: "string",
											minLength: 1
										},
										caseSensitive: { type: "boolean" },
										allowTypeImports: {
											type: "boolean",
											description: "Whether to allow type-only imports for a pattern."
										}
									},
									additionalProperties: !1,
									not: { anyOf: [
										{ required: ["importNames", "allowImportNames"] },
										{ required: ["importNamePattern", "allowImportNamePattern"] },
										{ required: ["importNames", "allowImportNamePattern"] },
										{ required: ["importNamePattern", "allowImportNames"] },
										{ required: ["allowImportNames", "allowImportNamePattern"] }
									] },
									oneOf: [{ required: ["group"] }, { required: ["regex"] }]
								},
								uniqueItems: !0
							}] }
						},
						additionalProperties: !1
					}],
					additionalItems: !1
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create178 === null && (create178 = require("./rules/no-restricted-imports.cjs")), create178(context);
			}
		},
		"no-restricted-modules": {
			meta: {
				messages: {
					defaultMessage: "'{{name}}' module is restricted from being used.",
					customMessage: "'{{name}}' module is restricted from being used. {{customMessage}}",
					patternMessage: "'{{name}}' module is restricted from being used by a pattern."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: { anyOf: [{ type: "string" }, {
						type: "object",
						properties: {
							name: { type: "string" },
							message: {
								type: "string",
								minLength: 1
							}
						},
						additionalProperties: !1,
						required: ["name"]
					}] },
					uniqueItems: !0
				}, {
					type: "array",
					items: {
						type: "object",
						properties: {
							paths: {
								type: "array",
								items: { anyOf: [{ type: "string" }, {
									type: "object",
									properties: {
										name: { type: "string" },
										message: {
											type: "string",
											minLength: 1
										}
									},
									additionalProperties: !1,
									required: ["name"]
								}] },
								uniqueItems: !0
							},
							patterns: {
								type: "array",
								items: { type: "string" },
								uniqueItems: !0
							}
						},
						additionalProperties: !1
					},
					additionalItems: !1
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create179 === null && (create179 = require("./rules/no-restricted-modules.cjs")), create179(context);
			}
		},
		"no-restricted-properties": {
			meta: {
				messages: {
					restrictedObjectProperty: "'{{objectName}}.{{propertyName}}' is restricted from being used.{{allowedPropertiesMessage}}{{message}}",
					restrictedProperty: "'{{propertyName}}' is restricted from being used.{{allowedObjectsMessage}}{{message}}"
				},
				fixable: null,
				hasSuggestions: !1,
				schema: {
					type: "array",
					items: {
						type: "object",
						properties: {
							object: { type: "string" },
							property: { type: "string" },
							allowObjects: {
								type: "array",
								items: { type: "string" },
								uniqueItems: !0
							},
							allowProperties: {
								type: "array",
								items: { type: "string" },
								uniqueItems: !0
							},
							message: { type: "string" }
						},
						anyOf: [{ required: ["object"] }, { required: ["property"] }],
						not: { anyOf: [{ required: ["allowObjects", "object"] }, { required: ["allowProperties", "property"] }] },
						additionalProperties: !1
					},
					uniqueItems: !0
				},
				defaultOptions: void 0
			},
			create(context) {
				return create180 === null && (create180 = require("./rules/no-restricted-properties.cjs")), create180(context);
			}
		},
		"no-restricted-syntax": {
			meta: {
				messages: { restrictedSyntax: "{{message}}" },
				fixable: null,
				hasSuggestions: !1,
				schema: {
					type: "array",
					items: { oneOf: [{ type: "string" }, {
						type: "object",
						properties: {
							selector: { type: "string" },
							message: { type: "string" }
						},
						required: ["selector"],
						additionalProperties: !1
					}] },
					uniqueItems: !0,
					minItems: 0
				},
				defaultOptions: void 0
			},
			create(context) {
				return create181 === null && (create181 = require("./rules/no-restricted-syntax.cjs")), create181(context);
			}
		},
		"no-return-assign": {
			meta: {
				messages: {
					returnAssignment: "Return statement should not contain assignment.",
					arrowAssignment: "Arrow function should not return assignment."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{ enum: ["except-parens", "always"] }],
				defaultOptions: ["except-parens"]
			},
			create(context) {
				return create182 === null && (create182 = require("./rules/no-return-assign.cjs")), create182(context);
			}
		},
		"no-return-await": {
			meta: {
				messages: {
					removeAwait: "Remove redundant `await`.",
					redundantUseOfAwait: "Redundant use of `await` on a return value."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create183 === null && (create183 = require("./rules/no-return-await.cjs")), create183(context);
			}
		},
		"no-script-url": {
			meta: {
				messages: { unexpectedScriptURL: "Script URL is a form of eval." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create184 === null && (create184 = require("./rules/no-script-url.cjs")), create184(context);
			}
		},
		"no-self-assign": {
			meta: {
				messages: { selfAssignment: "'{{name}}' is assigned to itself." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { props: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ props: !0 }]
			},
			create(context) {
				return create185 === null && (create185 = require("./rules/no-self-assign.cjs")), create185(context);
			}
		},
		"no-self-compare": {
			meta: {
				messages: { comparingToSelf: "Comparing to itself is potentially pointless." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create186 === null && (create186 = require("./rules/no-self-compare.cjs")), create186(context);
			}
		},
		"no-sequences": {
			meta: {
				messages: { unexpectedCommaExpression: "Unexpected use of comma operator." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowInParentheses: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowInParentheses: !0 }]
			},
			create(context) {
				return create187 === null && (create187 = require("./rules/no-sequences.cjs")), create187(context);
			}
		},
		"no-setter-return": {
			meta: {
				messages: { returnsValue: "Setter cannot return a value." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create188 === null && (create188 = require("./rules/no-setter-return.cjs")), create188(context);
			}
		},
		"no-shadow": {
			meta: {
				messages: {
					noShadow: "'{{name}}' is already declared in the upper scope on line {{shadowedLine}} column {{shadowedColumn}}.",
					noShadowGlobal: "'{{name}}' is already a global variable."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						builtinGlobals: { type: "boolean" },
						hoist: { enum: [
							"all",
							"functions",
							"never",
							"types",
							"functions-and-types"
						] },
						allow: {
							type: "array",
							items: { type: "string" }
						},
						ignoreOnInitialization: { type: "boolean" },
						ignoreTypeValueShadow: { type: "boolean" },
						ignoreFunctionTypeParameterNameValueShadow: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allow: [],
					builtinGlobals: !1,
					hoist: "functions",
					ignoreOnInitialization: !1,
					ignoreTypeValueShadow: !0,
					ignoreFunctionTypeParameterNameValueShadow: !0
				}]
			},
			create(context) {
				return create189 === null && (create189 = require("./rules/no-shadow.cjs")), create189(context);
			}
		},
		"no-shadow-restricted-names": {
			meta: {
				messages: { shadowingRestrictedName: "Shadowing of global property '{{name}}'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { reportGlobalThis: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ reportGlobalThis: !1 }]
			},
			create(context) {
				return create190 === null && (create190 = require("./rules/no-shadow-restricted-names.cjs")), create190(context);
			}
		},
		"no-spaced-func": {
			meta: {
				messages: { noSpacedFunction: "Unexpected space between function name and paren." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create191 === null && (create191 = require("./rules/no-spaced-func.cjs")), create191(context);
			}
		},
		"no-sparse-arrays": {
			meta: {
				messages: { unexpectedSparseArray: "Unexpected comma in middle of array." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create192 === null && (create192 = require("./rules/no-sparse-arrays.cjs")), create192(context);
			}
		},
		"no-sync": {
			meta: {
				messages: { noSync: "Unexpected sync method: '{{propertyName}}'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowAtRootLevel: {
						type: "boolean",
						default: !1
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create193 === null && (create193 = require("./rules/no-sync.cjs")), create193(context);
			}
		},
		"no-tabs": {
			meta: {
				messages: { unexpectedTab: "Unexpected tab character." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowIndentationTabs: {
						type: "boolean",
						default: !1
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create194 === null && (create194 = require("./rules/no-tabs.cjs")), create194(context);
			}
		},
		"no-template-curly-in-string": {
			meta: {
				messages: { unexpectedTemplateExpression: "Unexpected template string expression." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create195 === null && (create195 = require("./rules/no-template-curly-in-string.cjs")), create195(context);
			}
		},
		"no-ternary": {
			meta: {
				messages: { noTernaryOperator: "Ternary operator used." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create196 === null && (create196 = require("./rules/no-ternary.cjs")), create196(context);
			}
		},
		"no-this-before-super": {
			meta: {
				messages: { noBeforeSuper: "'{{kind}}' is not allowed before 'super()'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create197 === null && (create197 = require("./rules/no-this-before-super.cjs")), create197(context);
			}
		},
		"no-throw-literal": {
			meta: {
				messages: {
					object: "Expected an error object to be thrown.",
					undef: "Do not throw undefined."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create198 === null && (create198 = require("./rules/no-throw-literal.cjs")), create198(context);
			}
		},
		"no-trailing-spaces": {
			meta: {
				messages: { trailingSpace: "Trailing spaces not allowed." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						skipBlankLines: {
							type: "boolean",
							default: !1
						},
						ignoreComments: {
							type: "boolean",
							default: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create199 === null && (create199 = require("./rules/no-trailing-spaces.cjs")), create199(context);
			}
		},
		"no-unassigned-vars": {
			meta: {
				messages: { unassigned: "'{{name}}' is always 'undefined' because it's never assigned." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create200 === null && (create200 = require("./rules/no-unassigned-vars.cjs")), create200(context);
			}
		},
		"no-undef": {
			meta: {
				messages: { undef: "'{{name}}' is not defined." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { typeof: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ typeof: !1 }]
			},
			create(context) {
				return create201 === null && (create201 = require("./rules/no-undef.cjs")), create201(context);
			}
		},
		"no-undef-init": {
			meta: {
				messages: { unnecessaryUndefinedInit: "It's not necessary to initialize '{{name}}' to undefined." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create202 === null && (create202 = require("./rules/no-undef-init.cjs")), create202(context);
			}
		},
		"no-undefined": {
			meta: {
				messages: { unexpectedUndefined: "Unexpected use of undefined." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create203 === null && (create203 = require("./rules/no-undefined.cjs")), create203(context);
			}
		},
		"no-underscore-dangle": {
			meta: {
				messages: { unexpectedUnderscore: "Unexpected dangling '_' in '{{identifier}}'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						allow: {
							type: "array",
							items: { type: "string" }
						},
						allowAfterThis: { type: "boolean" },
						allowAfterSuper: { type: "boolean" },
						allowAfterThisConstructor: { type: "boolean" },
						enforceInMethodNames: { type: "boolean" },
						allowFunctionParams: { type: "boolean" },
						enforceInClassFields: { type: "boolean" },
						allowInArrayDestructuring: { type: "boolean" },
						allowInObjectDestructuring: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allow: [],
					allowAfterSuper: !1,
					allowAfterThis: !1,
					allowAfterThisConstructor: !1,
					allowFunctionParams: !0,
					allowInArrayDestructuring: !0,
					allowInObjectDestructuring: !0,
					enforceInClassFields: !1,
					enforceInMethodNames: !1
				}]
			},
			create(context) {
				return create204 === null && (create204 = require("./rules/no-underscore-dangle.cjs")), create204(context);
			}
		},
		"no-unexpected-multiline": {
			meta: {
				messages: {
					function: "Unexpected newline between function and ( of function call.",
					property: "Unexpected newline between object and [ of property access.",
					taggedTemplate: "Unexpected newline between template tag and template literal.",
					division: "Unexpected newline between numerator and division operator."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create205 === null && (create205 = require("./rules/no-unexpected-multiline.cjs")), create205(context);
			}
		},
		"no-unmodified-loop-condition": {
			meta: {
				messages: { loopConditionNotModified: "'{{name}}' is not modified in this loop." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create206 === null && (create206 = require("./rules/no-unmodified-loop-condition.cjs")), create206(context);
			}
		},
		"no-unneeded-ternary": {
			meta: {
				messages: {
					unnecessaryConditionalExpression: "Unnecessary use of boolean literals in conditional expression.",
					unnecessaryConditionalAssignment: "Unnecessary use of conditional expression for default assignment."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { defaultAssignment: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ defaultAssignment: !0 }]
			},
			create(context) {
				return create207 === null && (create207 = require("./rules/no-unneeded-ternary.cjs")), create207(context);
			}
		},
		"no-unreachable": {
			meta: {
				messages: { unreachableCode: "Unreachable code." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create208 === null && (create208 = require("./rules/no-unreachable.cjs")), create208(context);
			}
		},
		"no-unreachable-loop": {
			meta: {
				messages: { invalid: "Invalid loop. Its body allows only one iteration." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { ignore: {
						type: "array",
						items: { enum: [
							"WhileStatement",
							"DoWhileStatement",
							"ForStatement",
							"ForInStatement",
							"ForOfStatement"
						] },
						uniqueItems: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: [{ ignore: [] }]
			},
			create(context) {
				return create209 === null && (create209 = require("./rules/no-unreachable-loop.cjs")), create209(context);
			}
		},
		"no-unsafe-finally": {
			meta: {
				messages: { unsafeUsage: "Unsafe usage of {{nodeType}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create210 === null && (create210 = require("./rules/no-unsafe-finally.cjs")), create210(context);
			}
		},
		"no-unsafe-negation": {
			meta: {
				messages: {
					unexpected: "Unexpected negating the left operand of '{{operator}}' operator.",
					suggestNegatedExpression: "Negate '{{operator}}' expression instead of its left operand. This changes the current behavior.",
					suggestParenthesisedNegation: "Wrap negation in '()' to make the intention explicit. This preserves the current behavior."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { enforceForOrderingRelations: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ enforceForOrderingRelations: !1 }]
			},
			create(context) {
				return create211 === null && (create211 = require("./rules/no-unsafe-negation.cjs")), create211(context);
			}
		},
		"no-unsafe-optional-chaining": {
			meta: {
				messages: {
					unsafeOptionalChain: "Unsafe usage of optional chaining. If it short-circuits with 'undefined' the evaluation will throw TypeError.",
					unsafeArithmetic: "Unsafe arithmetic operation on optional chaining. It can result in NaN."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { disallowArithmeticOperators: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ disallowArithmeticOperators: !1 }]
			},
			create(context) {
				return create212 === null && (create212 = require("./rules/no-unsafe-optional-chaining.cjs")), create212(context);
			}
		},
		"no-unused-expressions": {
			meta: {
				messages: { unusedExpression: "Expected an assignment or function call and instead saw an expression." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						allowShortCircuit: { type: "boolean" },
						allowTernary: { type: "boolean" },
						allowTaggedTemplates: { type: "boolean" },
						enforceForJSX: { type: "boolean" },
						ignoreDirectives: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allowShortCircuit: !1,
					allowTernary: !1,
					allowTaggedTemplates: !1,
					enforceForJSX: !1,
					ignoreDirectives: !1
				}]
			},
			create(context) {
				return create213 === null && (create213 = require("./rules/no-unused-expressions.cjs")), create213(context);
			}
		},
		"no-unused-labels": {
			meta: {
				messages: { unused: "'{{name}}:' is defined but never used." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create214 === null && (create214 = require("./rules/no-unused-labels.cjs")), create214(context);
			}
		},
		"no-unused-private-class-members": {
			meta: {
				messages: { unusedPrivateClassMember: "'{{classMemberName}}' is defined but never used." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create215 === null && (create215 = require("./rules/no-unused-private-class-members.cjs")), create215(context);
			}
		},
		"no-unused-vars": {
			meta: {
				messages: {
					unusedVar: "'{{varName}}' is {{action}} but never used{{additional}}.",
					usedIgnoredVar: "'{{varName}}' is marked as ignored but is used{{additional}}.",
					removeVar: "Remove unused variable '{{varName}}'."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{ oneOf: [{ enum: ["all", "local"] }, {
					type: "object",
					properties: {
						vars: { enum: ["all", "local"] },
						varsIgnorePattern: { type: "string" },
						args: { enum: [
							"all",
							"after-used",
							"none"
						] },
						ignoreRestSiblings: { type: "boolean" },
						argsIgnorePattern: { type: "string" },
						caughtErrors: { enum: ["all", "none"] },
						caughtErrorsIgnorePattern: { type: "string" },
						destructuredArrayIgnorePattern: { type: "string" },
						ignoreClassWithStaticInitBlock: { type: "boolean" },
						ignoreUsingDeclarations: { type: "boolean" },
						reportUsedIgnorePattern: { type: "boolean" }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create216 === null && (create216 = require("./rules/no-unused-vars.cjs")), create216(context);
			}
		},
		"no-use-before-define": {
			meta: {
				messages: { usedBeforeDefined: "'{{name}}' was used before it was defined." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: ["nofunc"] }, {
					type: "object",
					properties: {
						functions: { type: "boolean" },
						classes: { type: "boolean" },
						variables: { type: "boolean" },
						allowNamedExports: { type: "boolean" },
						enums: { type: "boolean" },
						typedefs: { type: "boolean" },
						ignoreTypeReferences: { type: "boolean" }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: [{
					classes: !0,
					functions: !0,
					variables: !0,
					allowNamedExports: !1,
					enums: !0,
					typedefs: !0,
					ignoreTypeReferences: !0
				}]
			},
			create(context) {
				return create217 === null && (create217 = require("./rules/no-use-before-define.cjs")), create217(context);
			}
		},
		"no-useless-assignment": {
			meta: {
				messages: { unnecessaryAssignment: "This assigned value is not used in subsequent statements." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create218 === null && (create218 = require("./rules/no-useless-assignment.cjs")), create218(context);
			}
		},
		"no-useless-backreference": {
			meta: {
				messages: {
					nested: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} from within that group.",
					forward: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which appears later in the pattern.",
					backward: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which appears before in the same lookbehind.",
					disjunctive: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which is in another alternative.",
					intoNegativeLookaround: "Backreference '{{ bref }}' will be ignored. It references group '{{ group }}'{{ otherGroups }} which is in a negative lookaround."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create219 === null && (create219 = require("./rules/no-useless-backreference.cjs")), create219(context);
			}
		},
		"no-useless-call": {
			meta: {
				messages: { unnecessaryCall: "Unnecessary '.{{name}}()'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create220 === null && (create220 = require("./rules/no-useless-call.cjs")), create220(context);
			}
		},
		"no-useless-catch": {
			meta: {
				messages: {
					unnecessaryCatchClause: "Unnecessary catch clause.",
					unnecessaryCatch: "Unnecessary try/catch wrapper."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create221 === null && (create221 = require("./rules/no-useless-catch.cjs")), create221(context);
			}
		},
		"no-useless-computed-key": {
			meta: {
				messages: { unnecessarilyComputedProperty: "Unnecessarily computed property [{{property}}] found." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { enforceForClassMembers: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ enforceForClassMembers: !0 }]
			},
			create(context) {
				return create222 === null && (create222 = require("./rules/no-useless-computed-key.cjs")), create222(context);
			}
		},
		"no-useless-concat": {
			meta: {
				messages: { unexpectedConcat: "Unexpected string concatenation of literals." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create223 === null && (create223 = require("./rules/no-useless-concat.cjs")), create223(context);
			}
		},
		"no-useless-constructor": {
			meta: {
				messages: {
					noUselessConstructor: "Useless constructor.",
					removeConstructor: "Remove the constructor."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create224 === null && (create224 = require("./rules/no-useless-constructor.cjs")), create224(context);
			}
		},
		"no-useless-escape": {
			meta: {
				messages: {
					unnecessaryEscape: "Unnecessary escape character: \\{{character}}.",
					removeEscape: "Remove the `\\`. This maintains the current functionality.",
					removeEscapeDoNotKeepSemantics: "Remove the `\\` if it was inserted by mistake.",
					escapeBackslash: "Replace the `\\` with `\\\\` to include the actual backslash character."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { allowRegexCharacters: {
						type: "array",
						items: { type: "string" },
						uniqueItems: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowRegexCharacters: [] }]
			},
			create(context) {
				return create225 === null && (create225 = require("./rules/no-useless-escape.cjs")), create225(context);
			}
		},
		"no-useless-rename": {
			meta: {
				messages: { unnecessarilyRenamed: "{{type}} {{name}} unnecessarily renamed." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						ignoreDestructuring: { type: "boolean" },
						ignoreImport: { type: "boolean" },
						ignoreExport: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					ignoreDestructuring: !1,
					ignoreImport: !1,
					ignoreExport: !1
				}]
			},
			create(context) {
				return create226 === null && (create226 = require("./rules/no-useless-rename.cjs")), create226(context);
			}
		},
		"no-useless-return": {
			meta: {
				messages: { unnecessaryReturn: "Unnecessary return statement." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create227 === null && (create227 = require("./rules/no-useless-return.cjs")), create227(context);
			}
		},
		"no-var": {
			meta: {
				messages: { unexpectedVar: "Unexpected var, use let or const instead." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create228 === null && (create228 = require("./rules/no-var.cjs")), create228(context);
			}
		},
		"no-void": {
			meta: {
				messages: { noVoid: "Expected 'undefined' and instead saw 'void'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowAsStatement: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowAsStatement: !1 }]
			},
			create(context) {
				return create229 === null && (create229 = require("./rules/no-void.cjs")), create229(context);
			}
		},
		"no-warning-comments": {
			meta: {
				messages: { unexpectedComment: "Unexpected '{{matchedTerm}}' comment: '{{comment}}'." },
				fixable: null,
				hasSuggestions: !1,
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
				defaultOptions: [{
					location: "start",
					terms: [
						"todo",
						"fixme",
						"xxx"
					]
				}]
			},
			create(context) {
				return create230 === null && (create230 = require("./rules/no-warning-comments.cjs")), create230(context);
			}
		},
		"no-whitespace-before-property": {
			meta: {
				messages: { unexpectedWhitespace: "Unexpected whitespace before property {{propName}}." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create231 === null && (create231 = require("./rules/no-whitespace-before-property.cjs")), create231(context);
			}
		},
		"no-with": {
			meta: {
				messages: { unexpectedWith: "Unexpected use of 'with' statement." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create232 === null && (create232 = require("./rules/no-with.cjs")), create232(context);
			}
		},
		"nonblock-statement-body-position": {
			meta: {
				messages: {
					expectNoLinebreak: "Expected no linebreak before this statement.",
					expectLinebreak: "Expected a linebreak before this statement."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: [
					"beside",
					"below",
					"any"
				] }, {
					properties: { overrides: {
						properties: {
							if: { enum: [
								"beside",
								"below",
								"any"
							] },
							else: { enum: [
								"beside",
								"below",
								"any"
							] },
							while: { enum: [
								"beside",
								"below",
								"any"
							] },
							do: { enum: [
								"beside",
								"below",
								"any"
							] },
							for: { enum: [
								"beside",
								"below",
								"any"
							] }
						},
						additionalProperties: !1
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create233 === null && (create233 = require("./rules/nonblock-statement-body-position.cjs")), create233(context);
			}
		},
		"object-curly-newline": {
			meta: {
				messages: {
					unexpectedLinebreakBeforeClosingBrace: "Unexpected line break before this closing brace.",
					unexpectedLinebreakAfterOpeningBrace: "Unexpected line break after this opening brace.",
					expectedLinebreakBeforeClosingBrace: "Expected a line break before this closing brace.",
					expectedLinebreakAfterOpeningBrace: "Expected a line break after this opening brace."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ oneOf: [{ enum: ["always", "never"] }, {
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
				}] }, {
					type: "object",
					properties: {
						ObjectExpression: { oneOf: [{ enum: ["always", "never"] }, {
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
						}] },
						ObjectPattern: { oneOf: [{ enum: ["always", "never"] }, {
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
						}] },
						ImportDeclaration: { oneOf: [{ enum: ["always", "never"] }, {
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
						}] },
						ExportDeclaration: { oneOf: [{ enum: ["always", "never"] }, {
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
						}] }
					},
					additionalProperties: !1,
					minProperties: 1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create234 === null && (create234 = require("./rules/object-curly-newline.cjs")), create234(context);
			}
		},
		"object-curly-spacing": {
			meta: {
				messages: {
					requireSpaceBefore: "A space is required before '{{token}}'.",
					requireSpaceAfter: "A space is required after '{{token}}'.",
					unexpectedSpaceBefore: "There should be no space before '{{token}}'.",
					unexpectedSpaceAfter: "There should be no space after '{{token}}'."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: {
						arraysInObjects: { type: "boolean" },
						objectsInObjects: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create235 === null && (create235 = require("./rules/object-curly-spacing.cjs")), create235(context);
			}
		},
		"object-property-newline": {
			meta: {
				messages: {
					propertiesOnNewlineAll: "Object properties must go on a new line if they aren't all on the same line.",
					propertiesOnNewline: "Object properties must go on a new line."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						allowAllPropertiesOnSameLine: {
							type: "boolean",
							default: !1
						},
						allowMultiplePropertiesPerLine: {
							type: "boolean",
							default: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create236 === null && (create236 = require("./rules/object-property-newline.cjs")), create236(context);
			}
		},
		"object-shorthand": {
			meta: {
				messages: {
					expectedAllPropertiesShorthanded: "Expected shorthand for all properties.",
					expectedLiteralMethodLongform: "Expected longform method syntax for string literal keys.",
					expectedPropertyShorthand: "Expected property shorthand.",
					expectedPropertyLongform: "Expected longform property syntax.",
					expectedMethodShorthand: "Expected method shorthand.",
					expectedMethodLongform: "Expected longform method syntax.",
					unexpectedMix: "Unexpected mix of shorthand and non-shorthand properties."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: { anyOf: [
					{
						type: "array",
						items: [{ enum: [
							"always",
							"methods",
							"properties",
							"never",
							"consistent",
							"consistent-as-needed"
						] }],
						minItems: 0,
						maxItems: 1
					},
					{
						type: "array",
						items: [{ enum: [
							"always",
							"methods",
							"properties"
						] }, {
							type: "object",
							properties: { avoidQuotes: { type: "boolean" } },
							additionalProperties: !1
						}],
						minItems: 0,
						maxItems: 2
					},
					{
						type: "array",
						items: [{ enum: ["always", "methods"] }, {
							type: "object",
							properties: {
								ignoreConstructors: { type: "boolean" },
								methodsIgnorePattern: { type: "string" },
								avoidQuotes: { type: "boolean" },
								avoidExplicitReturnArrows: { type: "boolean" }
							},
							additionalProperties: !1
						}],
						minItems: 0,
						maxItems: 2
					}
				] },
				defaultOptions: void 0
			},
			create(context) {
				return create237 === null && (create237 = require("./rules/object-shorthand.cjs")), create237(context);
			}
		},
		"one-var": {
			meta: {
				messages: {
					combineUninitialized: "Combine this with the previous '{{type}}' statement with uninitialized variables.",
					combineInitialized: "Combine this with the previous '{{type}}' statement with initialized variables.",
					splitUninitialized: "Split uninitialized '{{type}}' declarations into multiple statements.",
					splitInitialized: "Split initialized '{{type}}' declarations into multiple statements.",
					splitRequires: "Split requires to be separated into a single block.",
					combine: "Combine this with the previous '{{type}}' statement.",
					split: "Split '{{type}}' declarations into multiple statements."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ oneOf: [
					{ enum: [
						"always",
						"never",
						"consecutive"
					] },
					{
						type: "object",
						properties: {
							separateRequires: { type: "boolean" },
							var: { enum: [
								"always",
								"never",
								"consecutive"
							] },
							let: { enum: [
								"always",
								"never",
								"consecutive"
							] },
							const: { enum: [
								"always",
								"never",
								"consecutive"
							] },
							using: { enum: [
								"always",
								"never",
								"consecutive"
							] },
							awaitUsing: { enum: [
								"always",
								"never",
								"consecutive"
							] }
						},
						additionalProperties: !1
					},
					{
						type: "object",
						properties: {
							initialized: { enum: [
								"always",
								"never",
								"consecutive"
							] },
							uninitialized: { enum: [
								"always",
								"never",
								"consecutive"
							] }
						},
						additionalProperties: !1
					}
				] }],
				defaultOptions: void 0
			},
			create(context) {
				return create238 === null && (create238 = require("./rules/one-var.cjs")), create238(context);
			}
		},
		"one-var-declaration-per-line": {
			meta: {
				messages: { expectVarOnNewline: "Expected variable declaration to be on a new line." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "initializations"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create239 === null && (create239 = require("./rules/one-var-declaration-per-line.cjs")), create239(context);
			}
		},
		"operator-assignment": {
			meta: {
				messages: {
					replaced: "Assignment (=) can be replaced with operator assignment ({{operator}}).",
					unexpected: "Unexpected operator assignment ({{operator}}) shorthand."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }],
				defaultOptions: ["always"]
			},
			create(context) {
				return create240 === null && (create240 = require("./rules/operator-assignment.cjs")), create240(context);
			}
		},
		"operator-linebreak": {
			meta: {
				messages: {
					operatorAtBeginning: "'{{operator}}' should be placed at the beginning of the line.",
					operatorAtEnd: "'{{operator}}' should be placed at the end of the line.",
					badLinebreak: "Bad line breaking before and after '{{operator}}'.",
					noLinebreak: "There should be no line break before or after '{{operator}}'."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: [
					"after",
					"before",
					"none",
					null
				] }, {
					type: "object",
					properties: { overrides: {
						type: "object",
						additionalProperties: { enum: [
							"after",
							"before",
							"none",
							"ignore"
						] }
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create241 === null && (create241 = require("./rules/operator-linebreak.cjs")), create241(context);
			}
		},
		"padded-blocks": {
			meta: {
				messages: {
					alwaysPadBlock: "Block must be padded by blank lines.",
					neverPadBlock: "Block must not be padded by blank lines."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: {
						blocks: { enum: ["always", "never"] },
						switches: { enum: ["always", "never"] },
						classes: { enum: ["always", "never"] }
					},
					additionalProperties: !1,
					minProperties: 1
				}] }, {
					type: "object",
					properties: { allowSingleLineBlocks: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create242 === null && (create242 = require("./rules/padded-blocks.cjs")), create242(context);
			}
		},
		"padding-line-between-statements": {
			meta: {
				messages: {
					unexpectedBlankLine: "Unexpected blank line before this statement.",
					expectedBlankLine: "Expected blank line before this statement."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: {
					definitions: {
						paddingType: { enum: [
							"any",
							"never",
							"always"
						] },
						statementType: { anyOf: [{ enum: /* @__PURE__ */ "*.block-like.cjs-export.cjs-import.directive.expression.iife.multiline-block-like.multiline-expression.multiline-const.multiline-let.multiline-var.singleline-const.singleline-let.singleline-var.block.empty.function.break.case.class.const.continue.debugger.default.do.export.for.if.import.let.return.switch.throw.try.var.while.with".split(".") }, {
							type: "array",
							items: { enum: /* @__PURE__ */ "*.block-like.cjs-export.cjs-import.directive.expression.iife.multiline-block-like.multiline-expression.multiline-const.multiline-let.multiline-var.singleline-const.singleline-let.singleline-var.block.empty.function.break.case.class.const.continue.debugger.default.do.export.for.if.import.let.return.switch.throw.try.var.while.with".split(".") },
							minItems: 1,
							uniqueItems: !0
						}] }
					},
					type: "array",
					items: {
						type: "object",
						properties: {
							blankLine: { $ref: "#/definitions/paddingType" },
							prev: { $ref: "#/definitions/statementType" },
							next: { $ref: "#/definitions/statementType" }
						},
						additionalProperties: !1,
						required: [
							"blankLine",
							"prev",
							"next"
						]
					}
				},
				defaultOptions: void 0
			},
			create(context) {
				return create243 === null && (create243 = require("./rules/padding-line-between-statements.cjs")), create243(context);
			}
		},
		"prefer-arrow-callback": {
			meta: {
				messages: { preferArrowCallback: "Unexpected function expression." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						allowNamedFunctions: { type: "boolean" },
						allowUnboundThis: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allowNamedFunctions: !1,
					allowUnboundThis: !0
				}]
			},
			create(context) {
				return create244 === null && (create244 = require("./rules/prefer-arrow-callback.cjs")), create244(context);
			}
		},
		"prefer-const": {
			meta: {
				messages: { useConst: "'{{name}}' is never reassigned. Use 'const' instead." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						destructuring: { enum: ["any", "all"] },
						ignoreReadBeforeAssign: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					destructuring: "any",
					ignoreReadBeforeAssign: !1
				}]
			},
			create(context) {
				return create245 === null && (create245 = require("./rules/prefer-const.cjs")), create245(context);
			}
		},
		"prefer-destructuring": {
			meta: {
				messages: { preferDestructuring: "Use {{type}} destructuring." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ oneOf: [{
					type: "object",
					properties: {
						VariableDeclarator: {
							type: "object",
							properties: {
								array: { type: "boolean" },
								object: { type: "boolean" }
							},
							additionalProperties: !1
						},
						AssignmentExpression: {
							type: "object",
							properties: {
								array: { type: "boolean" },
								object: { type: "boolean" }
							},
							additionalProperties: !1
						}
					},
					additionalProperties: !1
				}, {
					type: "object",
					properties: {
						array: { type: "boolean" },
						object: { type: "boolean" }
					},
					additionalProperties: !1
				}] }, {
					type: "object",
					properties: { enforceForRenamedProperties: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create246 === null && (create246 = require("./rules/prefer-destructuring.cjs")), create246(context);
			}
		},
		"prefer-exponentiation-operator": {
			meta: {
				messages: { useExponentiation: "Use the '**' operator instead of 'Math.pow'." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create247 === null && (create247 = require("./rules/prefer-exponentiation-operator.cjs")), create247(context);
			}
		},
		"prefer-named-capture-group": {
			meta: {
				messages: {
					addGroupName: "Add name to capture group.",
					addNonCapture: "Convert group to non-capturing.",
					required: "Capture group '{{group}}' should be converted to a named or non-capturing group."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create248 === null && (create248 = require("./rules/prefer-named-capture-group.cjs")), create248(context);
			}
		},
		"prefer-numeric-literals": {
			meta: {
				messages: { useLiteral: "Use {{system}} literals instead of {{functionName}}()." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create249 === null && (create249 = require("./rules/prefer-numeric-literals.cjs")), create249(context);
			}
		},
		"prefer-object-has-own": {
			meta: {
				messages: { useHasOwn: "Use 'Object.hasOwn()' instead of 'Object.prototype.hasOwnProperty.call()'." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create250 === null && (create250 = require("./rules/prefer-object-has-own.cjs")), create250(context);
			}
		},
		"prefer-object-spread": {
			meta: {
				messages: {
					useSpreadMessage: "Use an object spread instead of `Object.assign` eg: `{ ...foo }`.",
					useLiteralMessage: "Use an object literal instead of `Object.assign`. eg: `{ foo: bar }`."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create251 === null && (create251 = require("./rules/prefer-object-spread.cjs")), create251(context);
			}
		},
		"prefer-promise-reject-errors": {
			meta: {
				messages: { rejectAnError: "Expected the Promise rejection reason to be an Error." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowEmptyReject: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowEmptyReject: !1 }]
			},
			create(context) {
				return create252 === null && (create252 = require("./rules/prefer-promise-reject-errors.cjs")), create252(context);
			}
		},
		"prefer-reflect": {
			meta: {
				messages: { preferReflect: "Avoid using {{existing}}, instead use {{substitute}}." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { exceptions: {
						type: "array",
						items: { enum: [
							"apply",
							"call",
							"delete",
							"defineProperty",
							"getOwnPropertyDescriptor",
							"getPrototypeOf",
							"setPrototypeOf",
							"isExtensible",
							"getOwnPropertyNames",
							"preventExtensions"
						] },
						uniqueItems: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create253 === null && (create253 = require("./rules/prefer-reflect.cjs")), create253(context);
			}
		},
		"prefer-regex-literals": {
			meta: {
				messages: {
					unexpectedRegExp: "Use a regular expression literal instead of the 'RegExp' constructor.",
					replaceWithLiteral: "Replace with an equivalent regular expression literal.",
					replaceWithLiteralAndFlags: "Replace with an equivalent regular expression literal with flags '{{ flags }}'.",
					replaceWithIntendedLiteralAndFlags: "Replace with a regular expression literal with flags '{{ flags }}'.",
					unexpectedRedundantRegExp: "Regular expression literal is unnecessarily wrapped within a 'RegExp' constructor.",
					unexpectedRedundantRegExpWithFlags: "Use regular expression literal with flags instead of the 'RegExp' constructor."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { disallowRedundantWrapping: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ disallowRedundantWrapping: !1 }]
			},
			create(context) {
				return create254 === null && (create254 = require("./rules/prefer-regex-literals.cjs")), create254(context);
			}
		},
		"prefer-rest-params": {
			meta: {
				messages: { preferRestParams: "Use the rest parameters instead of 'arguments'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create255 === null && (create255 = require("./rules/prefer-rest-params.cjs")), create255(context);
			}
		},
		"prefer-spread": {
			meta: {
				messages: { preferSpread: "Use the spread operator instead of '.apply()'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create256 === null && (create256 = require("./rules/prefer-spread.cjs")), create256(context);
			}
		},
		"prefer-template": {
			meta: {
				messages: { unexpectedStringConcatenation: "Unexpected string concatenation." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create257 === null && (create257 = require("./rules/prefer-template.cjs")), create257(context);
			}
		},
		"preserve-caught-error": {
			meta: {
				messages: {
					missingCause: "There is no `cause` attached to the symptom error being thrown.",
					incorrectCause: "The symptom error is being thrown with an incorrect `cause`.",
					includeCause: "Include the original caught error as the `cause` of the symptom error.",
					missingCatchErrorParam: "The caught error is not accessible because the catch clause lacks the error parameter. Start referencing the caught error using the catch parameter.",
					partiallyLostError: "Re-throws cannot preserve the caught error as a part of it is being lost due to destructuring.",
					caughtErrorShadowed: "The caught error is being attached as `cause`, but is shadowed by a closer scoped redeclaration."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { requireCatchParameter: {
						type: "boolean",
						description: "Requires the catch blocks to always have the caught error parameter so it is not discarded."
					} },
					additionalProperties: !1
				}],
				defaultOptions: [{ requireCatchParameter: !1 }]
			},
			create(context) {
				return create258 === null && (create258 = require("./rules/preserve-caught-error.cjs")), create258(context);
			}
		},
		"quote-props": {
			meta: {
				messages: {
					requireQuotesDueToReservedWord: "Properties should be quoted as '{{property}}' is a reserved word.",
					inconsistentlyQuotedProperty: "Inconsistently quoted property '{{key}}' found.",
					unnecessarilyQuotedProperty: "Unnecessarily quoted property '{{property}}' found.",
					unquotedReservedProperty: "Unquoted reserved word '{{property}}' used as key.",
					unquotedNumericProperty: "Unquoted number literal '{{property}}' used as key.",
					unquotedPropertyFound: "Unquoted property '{{property}}' found.",
					redundantQuoting: "Properties shouldn't be quoted as all quotes are redundant."
				},
				fixable: "code",
				hasSuggestions: !1,
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
				defaultOptions: void 0
			},
			create(context) {
				return create259 === null && (create259 = require("./rules/quote-props.cjs")), create259(context);
			}
		},
		quotes: {
			meta: {
				messages: { wrongQuotes: "Strings must use {{description}}." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: [
					"single",
					"double",
					"backtick"
				] }, { anyOf: [{ enum: ["avoid-escape"] }, {
					type: "object",
					properties: {
						avoidEscape: { type: "boolean" },
						allowTemplateLiterals: { type: "boolean" }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create260 === null && (create260 = require("./rules/quotes.cjs")), create260(context);
			}
		},
		radix: {
			meta: {
				messages: {
					missingParameters: "Missing parameters.",
					redundantRadix: "Redundant radix parameter.",
					missingRadix: "Missing radix parameter.",
					invalidRadix: "Invalid radix parameter, must be an integer between 2 and 36.",
					addRadixParameter10: "Add radix parameter `10` for parsing decimal numbers."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{ enum: ["always", "as-needed"] }],
				defaultOptions: ["always"]
			},
			create(context) {
				return create261 === null && (create261 = require("./rules/radix.cjs")), create261(context);
			}
		},
		"require-atomic-updates": {
			meta: {
				messages: {
					nonAtomicUpdate: "Possible race condition: `{{value}}` might be reassigned based on an outdated value of `{{value}}`.",
					nonAtomicObjectUpdate: "Possible race condition: `{{value}}` might be assigned based on an outdated state of `{{object}}`."
				},
				fixable: null,
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { allowProperties: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ allowProperties: !1 }]
			},
			create(context) {
				return create262 === null && (create262 = require("./rules/require-atomic-updates.cjs")), create262(context);
			}
		},
		"require-await": {
			meta: {
				messages: {
					missingAwait: "{{name}} has no 'await' expression.",
					removeAsync: "Remove 'async'."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create263 === null && (create263 = require("./rules/require-await.cjs")), create263(context);
			}
		},
		"require-unicode-regexp": {
			meta: {
				messages: {
					addUFlag: "Add the 'u' flag.",
					addVFlag: "Add the 'v' flag.",
					requireUFlag: "Use the 'u' flag.",
					requireVFlag: "Use the 'v' flag."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { requireFlag: { enum: ["u", "v"] } },
					additionalProperties: !1
				}],
				defaultOptions: [{}]
			},
			create(context) {
				return create264 === null && (create264 = require("./rules/require-unicode-regexp.cjs")), create264(context);
			}
		},
		"require-yield": {
			meta: {
				messages: { missingYield: "This generator function does not have 'yield'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create265 === null && (create265 = require("./rules/require-yield.cjs")), create265(context);
			}
		},
		"rest-spread-spacing": {
			meta: {
				messages: {
					unexpectedWhitespace: "Unexpected whitespace after {{type}} operator.",
					expectedWhitespace: "Expected whitespace after {{type}} operator."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create266 === null && (create266 = require("./rules/rest-spread-spacing.cjs")), create266(context);
			}
		},
		semi: {
			meta: {
				messages: {
					missingSemi: "Missing semicolon.",
					extraSemi: "Extra semicolon."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: { anyOf: [{
					type: "array",
					items: [{ enum: ["never"] }, {
						type: "object",
						properties: { beforeStatementContinuationChars: { enum: [
							"always",
							"any",
							"never"
						] } },
						additionalProperties: !1
					}],
					minItems: 0,
					maxItems: 2
				}, {
					type: "array",
					items: [{ enum: ["always"] }, {
						type: "object",
						properties: {
							omitLastInOneLineBlock: { type: "boolean" },
							omitLastInOneLineClassBody: { type: "boolean" }
						},
						additionalProperties: !1
					}],
					minItems: 0,
					maxItems: 2
				}] },
				defaultOptions: void 0
			},
			create(context) {
				return create267 === null && (create267 = require("./rules/semi.cjs")), create267(context);
			}
		},
		"semi-spacing": {
			meta: {
				messages: {
					unexpectedWhitespaceBefore: "Unexpected whitespace before semicolon.",
					unexpectedWhitespaceAfter: "Unexpected whitespace after semicolon.",
					missingWhitespaceBefore: "Missing whitespace before semicolon.",
					missingWhitespaceAfter: "Missing whitespace after semicolon."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						before: {
							type: "boolean",
							default: !1
						},
						after: {
							type: "boolean",
							default: !0
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create268 === null && (create268 = require("./rules/semi-spacing.cjs")), create268(context);
			}
		},
		"semi-style": {
			meta: {
				messages: { expectedSemiColon: "Expected this semicolon to be at {{pos}}." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["last", "first"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create269 === null && (create269 = require("./rules/semi-style.cjs")), create269(context);
			}
		},
		"sort-imports": {
			meta: {
				messages: {
					sortImportsAlphabetically: "Imports should be sorted alphabetically.",
					sortMembersAlphabetically: "Member '{{memberName}}' of the import declaration should be sorted alphabetically.",
					unexpectedSyntaxOrder: "Expected '{{syntaxA}}' syntax before '{{syntaxB}}' syntax."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						ignoreCase: { type: "boolean" },
						memberSyntaxSortOrder: {
							type: "array",
							items: { enum: [
								"none",
								"all",
								"multiple",
								"single"
							] },
							uniqueItems: !0,
							minItems: 4,
							maxItems: 4
						},
						ignoreDeclarationSort: { type: "boolean" },
						ignoreMemberSort: { type: "boolean" },
						allowSeparatedGroups: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					allowSeparatedGroups: !1,
					ignoreCase: !1,
					ignoreDeclarationSort: !1,
					ignoreMemberSort: !1,
					memberSyntaxSortOrder: [
						"none",
						"all",
						"multiple",
						"single"
					]
				}]
			},
			create(context) {
				return create270 === null && (create270 = require("./rules/sort-imports.cjs")), create270(context);
			}
		},
		"sort-keys": {
			meta: {
				messages: { sortKeys: "Expected object keys to be in {{natural}}{{insensitive}}{{order}}ending order. '{{thisName}}' should be before '{{prevName}}'." },
				fixable: null,
				hasSuggestions: !1,
				schema: [{ enum: ["asc", "desc"] }, {
					type: "object",
					properties: {
						caseSensitive: { type: "boolean" },
						natural: { type: "boolean" },
						minKeys: {
							type: "integer",
							minimum: 2
						},
						allowLineSeparatedGroups: { type: "boolean" },
						ignoreComputedKeys: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: ["asc", {
					allowLineSeparatedGroups: !1,
					caseSensitive: !0,
					ignoreComputedKeys: !1,
					minKeys: 2,
					natural: !1
				}]
			},
			create(context) {
				return create271 === null && (create271 = require("./rules/sort-keys.cjs")), create271(context);
			}
		},
		"sort-vars": {
			meta: {
				messages: { sortVars: "Variables within the same declaration block should be sorted alphabetically." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { ignoreCase: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ ignoreCase: !1 }]
			},
			create(context) {
				return create272 === null && (create272 = require("./rules/sort-vars.cjs")), create272(context);
			}
		},
		"space-before-blocks": {
			meta: {
				messages: {
					unexpectedSpace: "Unexpected space before opening brace.",
					missingSpace: "Missing space before opening brace."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: {
						keywords: { enum: [
							"always",
							"never",
							"off"
						] },
						functions: { enum: [
							"always",
							"never",
							"off"
						] },
						classes: { enum: [
							"always",
							"never",
							"off"
						] }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create273 === null && (create273 = require("./rules/space-before-blocks.cjs")), create273(context);
			}
		},
		"space-before-function-paren": {
			meta: {
				messages: {
					unexpectedSpace: "Unexpected space before function parentheses.",
					missingSpace: "Missing space before function parentheses."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: {
						anonymous: { enum: [
							"always",
							"never",
							"ignore"
						] },
						named: { enum: [
							"always",
							"never",
							"ignore"
						] },
						asyncArrow: { enum: [
							"always",
							"never",
							"ignore"
						] }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create274 === null && (create274 = require("./rules/space-before-function-paren.cjs")), create274(context);
			}
		},
		"space-in-parens": {
			meta: {
				messages: {
					missingOpeningSpace: "There must be a space after this paren.",
					missingClosingSpace: "There must be a space before this paren.",
					rejectedOpeningSpace: "There should be no space after this paren.",
					rejectedClosingSpace: "There should be no space before this paren."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: { exceptions: {
						type: "array",
						items: { enum: [
							"{}",
							"[]",
							"()",
							"empty"
						] },
						uniqueItems: !0
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create275 === null && (create275 = require("./rules/space-in-parens.cjs")), create275(context);
			}
		},
		"space-infix-ops": {
			meta: {
				messages: { missingSpace: "Operator '{{operator}}' must be spaced." },
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: { int32Hint: {
						type: "boolean",
						default: !1
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create276 === null && (create276 = require("./rules/space-infix-ops.cjs")), create276(context);
			}
		},
		"space-unary-ops": {
			meta: {
				messages: {
					unexpectedBefore: "Unexpected space before unary operator '{{operator}}'.",
					unexpectedAfter: "Unexpected space after unary operator '{{operator}}'.",
					unexpectedAfterWord: "Unexpected space after unary word operator '{{word}}'.",
					wordOperator: "Unary word operator '{{word}}' must be followed by whitespace.",
					operator: "Unary operator '{{operator}}' must be followed by whitespace.",
					beforeUnaryExpressions: "Space is required before unary expressions '{{token}}'."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						words: {
							type: "boolean",
							default: !0
						},
						nonwords: {
							type: "boolean",
							default: !1
						},
						overrides: {
							type: "object",
							additionalProperties: { type: "boolean" }
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create277 === null && (create277 = require("./rules/space-unary-ops.cjs")), create277(context);
			}
		},
		"spaced-comment": {
			meta: {
				messages: {
					unexpectedSpaceAfterMarker: "Unexpected space or tab after marker ({{refChar}}) in comment.",
					expectedExceptionAfter: "Expected exception block, space or tab after '{{refChar}}' in comment.",
					unexpectedSpaceBefore: "Unexpected space or tab before '*/' in comment.",
					unexpectedSpaceAfter: "Unexpected space or tab after '{{refChar}}' in comment.",
					expectedSpaceBefore: "Expected space or tab before '*/' in comment.",
					expectedSpaceAfter: "Expected space or tab after '{{refChar}}' in comment."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: {
						exceptions: {
							type: "array",
							items: { type: "string" }
						},
						markers: {
							type: "array",
							items: { type: "string" }
						},
						line: {
							type: "object",
							properties: {
								exceptions: {
									type: "array",
									items: { type: "string" }
								},
								markers: {
									type: "array",
									items: { type: "string" }
								}
							},
							additionalProperties: !1
						},
						block: {
							type: "object",
							properties: {
								exceptions: {
									type: "array",
									items: { type: "string" }
								},
								markers: {
									type: "array",
									items: { type: "string" }
								},
								balanced: {
									type: "boolean",
									default: !1
								}
							},
							additionalProperties: !1
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create278 === null && (create278 = require("./rules/spaced-comment.cjs")), create278(context);
			}
		},
		strict: {
			meta: {
				messages: {
					function: "Use the function form of 'use strict'.",
					global: "Use the global form of 'use strict'.",
					multiple: "Multiple 'use strict' directives.",
					never: "Strict mode is not permitted.",
					unnecessary: "Unnecessary 'use strict' directive.",
					module: "'use strict' is unnecessary inside of modules.",
					implied: "'use strict' is unnecessary when implied strict mode is enabled.",
					unnecessaryInClasses: "'use strict' is unnecessary inside of classes.",
					nonSimpleParameterList: "'use strict' directive inside a function with non-simple parameter list throws a syntax error since ES2016.",
					wrap: "Wrap {{name}} in a function with 'use strict' directive."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: [
					"never",
					"global",
					"function",
					"safe"
				] }],
				defaultOptions: ["safe"]
			},
			create(context) {
				return create279 === null && (create279 = require("./rules/strict.cjs")), create279(context);
			}
		},
		"switch-colon-spacing": {
			meta: {
				messages: {
					expectedBefore: "Expected space(s) before this colon.",
					expectedAfter: "Expected space(s) after this colon.",
					unexpectedBefore: "Unexpected space(s) before this colon.",
					unexpectedAfter: "Unexpected space(s) after this colon."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{
					type: "object",
					properties: {
						before: {
							type: "boolean",
							default: !1
						},
						after: {
							type: "boolean",
							default: !0
						}
					},
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create280 === null && (create280 = require("./rules/switch-colon-spacing.cjs")), create280(context);
			}
		},
		"symbol-description": {
			meta: {
				messages: { expected: "Expected Symbol to have a description." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create281 === null && (create281 = require("./rules/symbol-description.cjs")), create281(context);
			}
		},
		"template-curly-spacing": {
			meta: {
				messages: {
					expectedBefore: "Expected space(s) before '}'.",
					expectedAfter: "Expected space(s) after '${'.",
					unexpectedBefore: "Unexpected space(s) before '}'.",
					unexpectedAfter: "Unexpected space(s) after '${'."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create282 === null && (create282 = require("./rules/template-curly-spacing.cjs")), create282(context);
			}
		},
		"template-tag-spacing": {
			meta: {
				messages: {
					unexpected: "Unexpected space between template tag and template literal.",
					missing: "Missing space between template tag and template literal."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }],
				defaultOptions: void 0
			},
			create(context) {
				return create283 === null && (create283 = require("./rules/template-tag-spacing.cjs")), create283(context);
			}
		},
		"unicode-bom": {
			meta: {
				messages: {
					expected: "Expected Unicode BOM (Byte Order Mark).",
					unexpected: "Unexpected Unicode BOM (Byte Order Mark)."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }],
				defaultOptions: ["never"]
			},
			create(context) {
				return create284 === null && (create284 = require("./rules/unicode-bom.cjs")), create284(context);
			}
		},
		"use-isnan": {
			meta: {
				messages: {
					comparisonWithNaN: "Use the isNaN function to compare with NaN.",
					switchNaN: "'switch(NaN)' can never match a case clause. Use Number.isNaN instead of the switch.",
					caseNaN: "'case NaN' can never match. Use Number.isNaN before the switch.",
					indexOfNaN: "Array prototype method '{{ methodName }}' cannot find NaN.",
					replaceWithIsNaN: "Replace with Number.isNaN.",
					replaceWithCastingAndIsNaN: "Replace with Number.isNaN and cast to a Number.",
					replaceWithFindIndex: "Replace with Array.prototype.{{ methodName }}."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: {
						enforceForSwitchCase: { type: "boolean" },
						enforceForIndexOf: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: [{
					enforceForIndexOf: !1,
					enforceForSwitchCase: !0
				}]
			},
			create(context) {
				return create285 === null && (create285 = require("./rules/use-isnan.cjs")), create285(context);
			}
		},
		"valid-typeof": {
			meta: {
				messages: {
					invalidValue: "Invalid typeof comparison value.",
					notString: "Typeof comparisons should be to string literals.",
					suggestString: "Use `\"{{type}}\"` instead of `{{type}}`."
				},
				fixable: null,
				hasSuggestions: !0,
				schema: [{
					type: "object",
					properties: { requireStringLiterals: { type: "boolean" } },
					additionalProperties: !1
				}],
				defaultOptions: [{ requireStringLiterals: !1 }]
			},
			create(context) {
				return create286 === null && (create286 = require("./rules/valid-typeof.cjs")), create286(context);
			}
		},
		"vars-on-top": {
			meta: {
				messages: { top: "All 'var' declarations must be at the top of the function scope." },
				fixable: null,
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create287 === null && (create287 = require("./rules/vars-on-top.cjs")), create287(context);
			}
		},
		"wrap-iife": {
			meta: {
				messages: {
					wrapInvocation: "Wrap an immediate function invocation in parentheses.",
					wrapExpression: "Wrap only the function expression in parens.",
					moveInvocation: "Move the invocation into the parens that contain the function."
				},
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: [
					"outside",
					"inside",
					"any"
				] }, {
					type: "object",
					properties: { functionPrototypeMethods: {
						type: "boolean",
						default: !1
					} },
					additionalProperties: !1
				}],
				defaultOptions: void 0
			},
			create(context) {
				return create288 === null && (create288 = require("./rules/wrap-iife.cjs")), create288(context);
			}
		},
		"wrap-regex": {
			meta: {
				messages: { requireParens: "Wrap the regexp literal in parens to disambiguate the slash." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [],
				defaultOptions: void 0
			},
			create(context) {
				return create289 === null && (create289 = require("./rules/wrap-regex.cjs")), create289(context);
			}
		},
		"yield-star-spacing": {
			meta: {
				messages: {
					missingBefore: "Missing space before *.",
					missingAfter: "Missing space after *.",
					unexpectedBefore: "Unexpected space before *.",
					unexpectedAfter: "Unexpected space after *."
				},
				fixable: "whitespace",
				hasSuggestions: !1,
				schema: [{ oneOf: [{ enum: [
					"before",
					"after",
					"both",
					"neither"
				] }, {
					type: "object",
					properties: {
						before: { type: "boolean" },
						after: { type: "boolean" }
					},
					additionalProperties: !1
				}] }],
				defaultOptions: void 0
			},
			create(context) {
				return create290 === null && (create290 = require("./rules/yield-star-spacing.cjs")), create290(context);
			}
		},
		yoda: {
			meta: {
				messages: { expected: "Expected literal to be on the {{expectedSide}} side of {{operator}}." },
				fixable: "code",
				hasSuggestions: !1,
				schema: [{ enum: ["always", "never"] }, {
					type: "object",
					properties: {
						exceptRange: { type: "boolean" },
						onlyEquality: { type: "boolean" }
					},
					additionalProperties: !1
				}],
				defaultOptions: ["never", {
					exceptRange: !1,
					onlyEquality: !1
				}]
			},
			create(context) {
				return create291 === null && (create291 = require("./rules/yoda.cjs")), create291(context);
			}
		}
	}
};
//#endregion
export { plugin_eslint_default as default };
