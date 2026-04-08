const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/valid-typeof.js
/**
* @fileoverview Ensures that the results of typeof are compared against a valid string
* @author Ian Christian Myers
*/
var require_valid_typeof = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{ requireStringLiterals: !1 }],
			docs: {
				description: "Enforce comparing `typeof` expressions against valid strings",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/valid-typeof"
			},
			hasSuggestions: !0,
			schema: [{
				type: "object",
				properties: { requireStringLiterals: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: {
				invalidValue: "Invalid typeof comparison value.",
				notString: "Typeof comparisons should be to string literals.",
				suggestString: "Use `\"{{type}}\"` instead of `{{type}}`."
			}
		},
		create(context) {
			let VALID_TYPES = new Set([
				"symbol",
				"undefined",
				"object",
				"boolean",
				"number",
				"string",
				"function",
				"bigint"
			]), OPERATORS = new Set([
				"==",
				"===",
				"!=",
				"!=="
			]), sourceCode = context.sourceCode, [{ requireStringLiterals }] = context.options, globalScope;
			/**
			* Checks whether the given node represents a reference to a global variable that is not declared in the source code.
			* These identifiers will be allowed, as it is assumed that user has no control over the names of external global variables.
			* @param {ASTNode} node `Identifier` node to check.
			* @returns {boolean} `true` if the node is a reference to a global variable.
			*/
			function isReferenceToGlobalVariable(node) {
				let variable = globalScope.set.get(node.name);
				return variable && variable.defs.length === 0 && variable.references.some((ref) => ref.identifier === node);
			}
			/**
			* Determines whether a node is a typeof expression.
			* @param {ASTNode} node The node
			* @returns {boolean} `true` if the node is a typeof expression
			*/
			function isTypeofExpression(node) {
				return node.type === "UnaryExpression" && node.operator === "typeof";
			}
			return {
				Program(node) {
					globalScope = sourceCode.getScope(node);
				},
				UnaryExpression(node) {
					if (isTypeofExpression(node)) {
						let { parent } = node;
						if (parent.type === "BinaryExpression" && OPERATORS.has(parent.operator)) {
							let sibling = parent.left === node ? parent.right : parent.left;
							if (sibling.type === "Literal" || astUtils.isStaticTemplateLiteral(sibling)) {
								let value = sibling.type === "Literal" ? sibling.value : sibling.quasis[0].value.cooked;
								VALID_TYPES.has(value) || context.report({
									node: sibling,
									messageId: "invalidValue"
								});
							} else sibling.type === "Identifier" && sibling.name === "undefined" && isReferenceToGlobalVariable(sibling) ? context.report({
								node: sibling,
								messageId: requireStringLiterals ? "notString" : "invalidValue",
								suggest: [{
									messageId: "suggestString",
									data: { type: "undefined" },
									fix(fixer) {
										return fixer.replaceText(sibling, "\"undefined\"");
									}
								}]
							}) : requireStringLiterals && !isTypeofExpression(sibling) && context.report({
								node: sibling,
								messageId: "notString"
							});
						}
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/valid-typeof.cjs
module.exports = require_valid_typeof().create;
//#endregion
