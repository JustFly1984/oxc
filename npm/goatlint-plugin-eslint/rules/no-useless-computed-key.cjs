const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-useless-computed-key.js
/**
* @fileoverview Rule to disallow unnecessary computed property keys in object literals
* @author Burak Yigit Kaya
*/
var require_no_useless_computed_key = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Determines whether the computed key syntax is unnecessarily used for the given node.
	* In particular, it determines whether removing the square brackets and using the content between them
	* directly as the key (e.g. ['foo'] -> 'foo') would produce valid syntax and preserve the same behavior.
	* Valid non-computed keys are only: identifiers, number literals and string literals.
	* Only literals can preserve the same behavior, with a few exceptions for specific node types:
	* Property
	*   - { ["__proto__"]: foo } defines a property named "__proto__"
	*     { "__proto__": foo } defines object's prototype
	* PropertyDefinition
	*   - class C { ["constructor"]; } defines an instance field named "constructor"
	*     class C { "constructor"; } produces a parsing error
	*   - class C { static ["constructor"]; } defines a static field named "constructor"
	*     class C { static "constructor"; } produces a parsing error
	*   - class C { static ["prototype"]; } produces a runtime error (doesn't break the whole script)
	*     class C { static "prototype"; } produces a parsing error (breaks the whole script)
	* MethodDefinition
	*   - class C { ["constructor"]() {} } defines a prototype method named "constructor"
	*     class C { "constructor"() {} } defines the constructor
	*   - class C { static ["prototype"]() {} } produces a runtime error (doesn't break the whole script)
	*     class C { static "prototype"() {} } produces a parsing error (breaks the whole script)
	* @param {ASTNode} node The node to check. It can be `Property`, `PropertyDefinition` or `MethodDefinition`.
	* @throws {Error} (Unreachable.)
	* @returns {void} `true` if the node has useless computed key.
	*/
	function hasUselessComputedKey(node) {
		if (!node.computed) return !1;
		let { key } = node;
		if (key.type !== "Literal") return !1;
		let { value } = key;
		if (typeof value != "number" && typeof value != "string") return !1;
		switch (node.type) {
			case "Property": return node.parent.type === "ObjectExpression" ? value !== "__proto__" : !0;
			case "PropertyDefinition": return node.static ? value !== "constructor" && value !== "prototype" : value !== "constructor";
			case "MethodDefinition": return node.static ? value !== "prototype" : value !== "constructor";
			default: throw Error(`Unexpected node type: ${node.type}`);
		}
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ enforceForClassMembers: !0 }],
			docs: {
				description: "Disallow unnecessary computed property keys in objects and classes",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-useless-computed-key"
			},
			schema: [{
				type: "object",
				properties: { enforceForClassMembers: { type: "boolean" } },
				additionalProperties: !1
			}],
			fixable: "code",
			messages: { unnecessarilyComputedProperty: "Unnecessarily computed property [{{property}}] found." }
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ enforceForClassMembers }] = context.options;
			/**
			* Reports a given node if it violated this rule.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			*/
			function check(node) {
				if (hasUselessComputedKey(node)) {
					let { key } = node;
					context.report({
						node,
						messageId: "unnecessarilyComputedProperty",
						data: { property: sourceCode.getText(key) },
						fix(fixer) {
							let leftSquareBracket = sourceCode.getTokenBefore(key, astUtils.isOpeningBracketToken), rightSquareBracket = sourceCode.getTokenAfter(key, astUtils.isClosingBracketToken);
							if (sourceCode.commentsExistBetween(leftSquareBracket, rightSquareBracket)) return null;
							let tokenBeforeLeftBracket = sourceCode.getTokenBefore(leftSquareBracket), replacementKey = (tokenBeforeLeftBracket.range[1] === leftSquareBracket.range[0] && !astUtils.canTokensBeAdjacent(tokenBeforeLeftBracket, sourceCode.getFirstToken(key)) ? " " : "") + key.raw;
							return fixer.replaceTextRange([leftSquareBracket.range[0], rightSquareBracket.range[1]], replacementKey);
						}
					});
				}
			}
			/**
			* A no-op function to act as placeholder for checking a node when the `enforceForClassMembers` option is `false`.
			* @returns {void}
			* @private
			*/
			function noop() {}
			return {
				Property: check,
				MethodDefinition: enforceForClassMembers ? check : noop,
				PropertyDefinition: enforceForClassMembers ? check : noop
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-useless-computed-key.cjs
module.exports = require_no_useless_computed_key().create;
//#endregion
