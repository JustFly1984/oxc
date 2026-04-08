const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-self-assign.js
/**
* @fileoverview Rule to disallow assignments where both sides are exactly the same
* @author Toru Nagashima
*/
var require_no_self_assign = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), SPACES = /\s+/gu;
	/**
	* Traverses 2 Pattern nodes in parallel, then reports self-assignments.
	* @param {ASTNode|null} left A left node to traverse. This is a Pattern or
	*      a Property.
	* @param {ASTNode|null} right A right node to traverse. This is a Pattern or
	*      a Property.
	* @param {boolean} props The flag to check member expressions as well.
	* @param {Function} report A callback function to report.
	* @returns {void}
	*/
	function eachSelfAssignment(left, right, props, report) {
		if (!(!left || !right)) if (left.type === "Identifier" && right.type === "Identifier" && left.name === right.name) report(right);
		else if (left.type === "ArrayPattern" && right.type === "ArrayExpression") {
			let end = Math.min(left.elements.length, right.elements.length);
			for (let i = 0; i < end; ++i) {
				let leftElement = left.elements[i], rightElement = right.elements[i];
				if (leftElement && leftElement.type === "RestElement" && i < right.elements.length - 1 || (eachSelfAssignment(leftElement, rightElement, props, report), rightElement && rightElement.type === "SpreadElement")) break;
			}
		} else if (left.type === "RestElement" && right.type === "SpreadElement") eachSelfAssignment(left.argument, right.argument, props, report);
		else if (left.type === "ObjectPattern" && right.type === "ObjectExpression" && right.properties.length >= 1) {
			let startJ = 0;
			for (let i = right.properties.length - 1; i >= 0; --i) {
				let propType = right.properties[i].type;
				if (propType === "SpreadElement" || propType === "ExperimentalSpreadProperty") {
					startJ = i + 1;
					break;
				}
			}
			for (let i = 0; i < left.properties.length; ++i) for (let j = startJ; j < right.properties.length; ++j) eachSelfAssignment(left.properties[i], right.properties[j], props, report);
		} else if (left.type === "Property" && right.type === "Property" && right.kind === "init" && !right.method) {
			let leftName = astUtils.getStaticPropertyName(left);
			leftName !== null && leftName === astUtils.getStaticPropertyName(right) && eachSelfAssignment(left.value, right.value, props, report);
		} else props && astUtils.skipChainExpression(left).type === "MemberExpression" && astUtils.skipChainExpression(right).type === "MemberExpression" && astUtils.isSameReference(left, right) && report(right);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{ props: !0 }],
			docs: {
				description: "Disallow assignments where both sides are exactly the same",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-self-assign"
			},
			schema: [{
				type: "object",
				properties: { props: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { selfAssignment: "'{{name}}' is assigned to itself." }
		},
		create(context) {
			let sourceCode = context.sourceCode, [{ props }] = context.options;
			/**
			* Reports a given node as self assignments.
			* @param {ASTNode} node A node to report. This is an Identifier node.
			* @returns {void}
			*/
			function report(node) {
				context.report({
					node,
					messageId: "selfAssignment",
					data: { name: sourceCode.getText(node).replace(SPACES, "") }
				});
			}
			return { AssignmentExpression(node) {
				[
					"=",
					"&&=",
					"||=",
					"??="
				].includes(node.operator) && eachSelfAssignment(node.left, node.right, props, report);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-self-assign.cjs
module.exports = require_no_self_assign().create;
//#endregion
