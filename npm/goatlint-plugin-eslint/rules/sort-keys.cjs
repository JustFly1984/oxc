const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/natural-compare@1.4.0/node_modules/natural-compare/index.js
var require_natural_compare = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/*
	* @version    1.4.0
	* @date       2015-10-26
	* @stability  3 - Stable
	* @author     Lauri Rooden (https://github.com/litejs/natural-compare-lite)
	* @license    MIT License
	*/
	var naturalCompare = function(a, b) {
		var i, codeA, codeB = 1, posA = 0, posB = 0, alphabet = String.alphabet;
		function getCode(str, pos, code) {
			if (code) {
				for (i = pos; code = getCode(str, i), code < 76 && code > 65;) ++i;
				return +str.slice(pos - 1, i);
			}
			return code = alphabet && alphabet.indexOf(str.charAt(pos)), code > -1 ? code + 76 : (code = str.charCodeAt(pos) || 0, code < 45 || code > 127 ? code : code < 46 ? 65 : code < 48 ? code - 1 : code < 58 ? code + 18 : code < 65 ? code - 11 : code < 91 ? code + 11 : code < 97 ? code - 37 : code < 123 ? code + 5 : code - 63);
		}
		if ((a += "") != (b += "")) {
			for (; codeB;) if (codeA = getCode(a, posA++), codeB = getCode(b, posB++), codeA < 76 && codeB < 76 && codeA > 66 && codeB > 66 && (codeA = getCode(a, posA, posA), codeB = getCode(b, posB, posA = i), posB = i), codeA != codeB) return codeA < codeB ? -1 : 1;
		}
		return 0;
	};
	try {
		module.exports = naturalCompare;
	} catch {
		String.naturalCompare = naturalCompare;
	}
})), require_sort_keys = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), naturalCompare = require_natural_compare();
	/**
	* Gets the property name of the given `Property` node.
	*
	* - If the property's key is an `Identifier` node, this returns the key's name
	*   whether it's a computed property or not.
	* - If the property has a static name, this returns the static name.
	* - Otherwise, this returns null.
	* @param {ASTNode} node The `Property` node to get.
	* @returns {string|null} The property name or null.
	* @private
	*/
	function getPropertyName(node) {
		let staticName = astUtils.getStaticPropertyName(node);
		return staticName === null ? node.key.name || null : staticName;
	}
	/**
	* Functions which check that the given 2 names are in specific order.
	*
	* Postfix `I` is meant insensitive.
	* Postfix `N` is meant natural.
	* @private
	*/
	let isValidOrders = {
		asc(a, b) {
			return a <= b;
		},
		ascI(a, b) {
			return a.toLowerCase() <= b.toLowerCase();
		},
		ascN(a, b) {
			return naturalCompare(a, b) <= 0;
		},
		ascIN(a, b) {
			return naturalCompare(a.toLowerCase(), b.toLowerCase()) <= 0;
		},
		desc(a, b) {
			return isValidOrders.asc(b, a);
		},
		descI(a, b) {
			return isValidOrders.ascI(b, a);
		},
		descN(a, b) {
			return isValidOrders.ascN(b, a);
		},
		descIN(a, b) {
			return isValidOrders.ascIN(b, a);
		}
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: ["asc", {
				allowLineSeparatedGroups: !1,
				caseSensitive: !0,
				ignoreComputedKeys: !1,
				minKeys: 2,
				natural: !1
			}],
			docs: {
				description: "Require object keys to be sorted",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/sort-keys"
			},
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
			messages: { sortKeys: "Expected object keys to be in {{natural}}{{insensitive}}{{order}}ending order. '{{thisName}}' should be before '{{prevName}}'." }
		},
		create(context) {
			let [order, { caseSensitive, natural, minKeys, allowLineSeparatedGroups, ignoreComputedKeys }] = context.options, insensitive = !caseSensitive, isValidOrder = isValidOrders[order + (insensitive ? "I" : "") + (natural ? "N" : "")], stack = null, sourceCode = context.sourceCode;
			return {
				ObjectExpression(node) {
					stack = {
						upper: stack,
						prevNode: null,
						prevBlankLine: !1,
						prevName: null,
						numKeys: node.properties.length
					};
				},
				"ObjectExpression:exit"() {
					stack = stack.upper;
				},
				SpreadElement(node) {
					node.parent.type === "ObjectExpression" && (stack.prevName = null);
				},
				Property(node) {
					if (node.parent.type === "ObjectPattern") return;
					if (ignoreComputedKeys && node.computed) {
						stack.prevName = null;
						return;
					}
					let prevName = stack.prevName, numKeys = stack.numKeys, thisName = getPropertyName(node), tokens = stack.prevNode && sourceCode.getTokensBetween(stack.prevNode, node, { includeComments: !0 }), isBlankLineBetweenNodes = stack.prevBlankLine;
					if (tokens && (tokens.forEach((token, index) => {
						let previousToken = tokens[index - 1];
						previousToken && token.loc.start.line - previousToken.loc.end.line > 1 && (isBlankLineBetweenNodes = !0);
					}), !isBlankLineBetweenNodes && node.loc.start.line - tokens.at(-1).loc.end.line > 1 && (isBlankLineBetweenNodes = !0), !isBlankLineBetweenNodes && tokens[0].loc.start.line - stack.prevNode.loc.end.line > 1 && (isBlankLineBetweenNodes = !0)), stack.prevNode = node, thisName !== null && (stack.prevName = thisName), allowLineSeparatedGroups && isBlankLineBetweenNodes) {
						stack.prevBlankLine = thisName === null;
						return;
					}
					prevName === null || thisName === null || numKeys < minKeys || isValidOrder(prevName, thisName) || context.report({
						node,
						loc: node.key.loc,
						messageId: "sortKeys",
						data: {
							thisName,
							prevName,
							order,
							insensitive: insensitive ? "insensitive " : "",
							natural: natural ? "natural " : ""
						}
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/sort-keys.cjs
module.exports = require_sort_keys().create;
//#endregion
