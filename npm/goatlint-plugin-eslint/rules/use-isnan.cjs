const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/use-isnan.js
/**
* @fileoverview Rule to flag comparisons to the value NaN
* @author James Allardice
*/
var require_use_isnan = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Determines if the given node is a NaN `Identifier` node.
	* @param {ASTNode|null} node The node to check.
	* @returns {boolean} `true` if the node is 'NaN' identifier.
	*/
	function isNaNIdentifier(node) {
		if (!node) return !1;
		let nodeToCheck = node.type === "SequenceExpression" ? node.expressions.at(-1) : node;
		return astUtils.isSpecificId(nodeToCheck, "NaN") || astUtils.isSpecificMemberAccess(nodeToCheck, "Number", "NaN");
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			hasSuggestions: !0,
			type: "problem",
			docs: {
				description: "Require calls to `isNaN()` when checking for `NaN`",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/use-isnan"
			},
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
			}],
			messages: {
				comparisonWithNaN: "Use the isNaN function to compare with NaN.",
				switchNaN: "'switch(NaN)' can never match a case clause. Use Number.isNaN instead of the switch.",
				caseNaN: "'case NaN' can never match. Use Number.isNaN before the switch.",
				indexOfNaN: "Array prototype method '{{ methodName }}' cannot find NaN.",
				replaceWithIsNaN: "Replace with Number.isNaN.",
				replaceWithCastingAndIsNaN: "Replace with Number.isNaN and cast to a Number.",
				replaceWithFindIndex: "Replace with Array.prototype.{{ methodName }}."
			}
		},
		create(context) {
			let [{ enforceForIndexOf, enforceForSwitchCase }] = context.options, sourceCode = context.sourceCode, fixableOperators = new Set([
				"==",
				"===",
				"!=",
				"!=="
			]), castableOperators = new Set(["==", "!="]);
			/**
			* Get a fixer for a binary expression that compares to NaN.
			* @param  {ASTNode} node The node to fix.
			* @param {function(string): string} wrapValue A function that wraps the compared value with a fix.
			* @returns {function(Fixer): Fix} The fixer function.
			*/
			function getBinaryExpressionFixer(node, wrapValue) {
				return (fixer) => {
					let comparedValue = isNaNIdentifier(node.left) ? node.right : node.left, shouldWrap = comparedValue.type === "SequenceExpression", negation = node.operator[0] === "!" ? "!" : "", comparedValueText = sourceCode.getText(comparedValue);
					shouldWrap && (comparedValueText = `(${comparedValueText})`);
					let fixedValue = wrapValue(comparedValueText);
					return fixer.replaceText(node, `${negation}${fixedValue}`);
				};
			}
			/**
			* Checks the given `BinaryExpression` node for `foo === NaN` and other comparisons.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			*/
			function checkBinaryExpression(node) {
				if (/^(?:[<>]|[!=]=)=?$/u.test(node.operator) && (isNaNIdentifier(node.left) || isNaNIdentifier(node.right))) {
					let suggestedFixes = [], isSequenceExpression = (isNaNIdentifier(node.left) ? node.left : node.right).type === "SequenceExpression", isSuggestable = fixableOperators.has(node.operator) && !isSequenceExpression, isCastable = castableOperators.has(node.operator);
					isSuggestable && (suggestedFixes.push({
						messageId: "replaceWithIsNaN",
						fix: getBinaryExpressionFixer(node, (value) => `Number.isNaN(${value})`)
					}), isCastable && suggestedFixes.push({
						messageId: "replaceWithCastingAndIsNaN",
						fix: getBinaryExpressionFixer(node, (value) => `Number.isNaN(Number(${value}))`)
					})), context.report({
						node,
						messageId: "comparisonWithNaN",
						suggest: suggestedFixes
					});
				}
			}
			/**
			* Checks the discriminant and all case clauses of the given `SwitchStatement` node for `switch(NaN)` and `case NaN:`
			* @param {ASTNode} node The node to check.
			* @returns {void}
			*/
			function checkSwitchStatement(node) {
				isNaNIdentifier(node.discriminant) && context.report({
					node,
					messageId: "switchNaN"
				});
				for (let switchCase of node.cases) isNaNIdentifier(switchCase.test) && context.report({
					node: switchCase,
					messageId: "caseNaN"
				});
			}
			/**
			* Checks the given `CallExpression` node for `.indexOf(NaN)` and `.lastIndexOf(NaN)`.
			* @param {ASTNode} node The node to check.
			* @returns {void}
			*/
			function checkCallExpression(node) {
				let callee = astUtils.skipChainExpression(node.callee);
				if (callee.type === "MemberExpression") {
					let methodName = astUtils.getStaticPropertyName(callee);
					if ((methodName === "indexOf" || methodName === "lastIndexOf") && node.arguments.length <= 2 && isNaNIdentifier(node.arguments[0])) {
						let isSuggestable = node.arguments[0].type !== "SequenceExpression" && !node.arguments[1], suggestedFixes = [];
						if (isSuggestable) {
							let shouldWrap = callee.computed, findIndexMethod = methodName === "indexOf" ? "findIndex" : "findLastIndex", propertyName = shouldWrap ? `"${findIndexMethod}"` : findIndexMethod;
							suggestedFixes.push({
								messageId: "replaceWithFindIndex",
								data: { methodName: findIndexMethod },
								fix: (fixer) => [fixer.replaceText(callee.property, propertyName), fixer.replaceText(node.arguments[0], "Number.isNaN")]
							});
						}
						context.report({
							node,
							messageId: "indexOfNaN",
							data: { methodName },
							suggest: suggestedFixes
						});
					}
				}
			}
			let listeners = { BinaryExpression: checkBinaryExpression };
			return enforceForSwitchCase && (listeners.SwitchStatement = checkSwitchStatement), enforceForIndexOf && (listeners.CallExpression = checkCallExpression), listeners;
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/use-isnan.cjs
module.exports = require_use_isnan().create;
//#endregion
