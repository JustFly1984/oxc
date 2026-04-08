const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-obj-calls.js
/**
* @fileoverview Rule to flag use of an object property of the global object (Math and JSON) as a function
* @author James Allardice
*/
var require_no_obj_calls = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { CALL, CONSTRUCT, ReferenceTracker } = require_eslint_utils$1.t(), getPropertyName = require_ast_utils$1.t().getStaticPropertyName, nonCallableGlobals = [
		"Atomics",
		"JSON",
		"Math",
		"Reflect",
		"Intl"
	];
	/**
	* Returns the name of the node to report
	* @param {ASTNode} node A node to report
	* @returns {string} name to report
	*/
	function getReportNodeName(node) {
		return node.type === "ChainExpression" ? getReportNodeName(node.expression) : node.type === "MemberExpression" ? getPropertyName(node) : node.name;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow calling global object properties as functions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-obj-calls"
			},
			schema: [],
			messages: {
				unexpectedCall: "'{{name}}' is not a function.",
				unexpectedRefCall: "'{{name}}' is reference to '{{ref}}', which is not a function."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { Program(node) {
				let tracker = new ReferenceTracker(sourceCode.getScope(node)), traceMap = {};
				for (let g of nonCallableGlobals) traceMap[g] = {
					[CALL]: !0,
					[CONSTRUCT]: !0
				};
				for (let { node: refNode, path } of tracker.iterateGlobalReferences(traceMap)) {
					let name = getReportNodeName(refNode.callee), ref = path[0], messageId = name === ref ? "unexpectedCall" : "unexpectedRefCall";
					context.report({
						node: refNode,
						messageId,
						data: {
							name,
							ref
						}
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-obj-calls.cjs
module.exports = require_no_obj_calls().create;
//#endregion
