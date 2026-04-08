const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_string_utils$1 = require("../common/string-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/consistent-return.js
/**
* @fileoverview Rule to flag consistent return values
* @author Nicholas C. Zakas
*/
var require_consistent_return = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), { upperCaseFirst } = require_string_utils$1.t();
	/**
	* Checks all segments in a set and returns true if all are unreachable.
	* @param {Set<CodePathSegment>} segments The segments to check.
	* @returns {boolean} True if all segments are unreachable; false otherwise.
	*/
	function areAllSegmentsUnreachable(segments) {
		for (let segment of segments) if (segment.reachable) return !1;
		return !0;
	}
	/**
	* Checks whether a given node is a `constructor` method in an ES6 class
	* @param {ASTNode} node A node to check
	* @returns {boolean} `true` if the node is a `constructor` method
	*/
	function isClassConstructor(node) {
		return node.type === "FunctionExpression" && node.parent && node.parent.type === "MethodDefinition" && node.parent.kind === "constructor";
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require `return` statements to either always or never specify values",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/consistent-return"
			},
			schema: [{
				type: "object",
				properties: { treatUndefinedAsUnspecified: { type: "boolean" } },
				additionalProperties: !1
			}],
			defaultOptions: [{ treatUndefinedAsUnspecified: !1 }],
			messages: {
				missingReturn: "Expected to return a value at the end of {{name}}.",
				missingReturnValue: "{{name}} expected a return value.",
				unexpectedReturnValue: "{{name}} expected no return value."
			}
		},
		create(context) {
			let [{ treatUndefinedAsUnspecified }] = context.options, funcInfo = null;
			/**
			* Checks whether of not the implicit returning is consistent if the last
			* code path segment is reachable.
			* @param {ASTNode} node A program/function node to check.
			* @returns {void}
			*/
			function checkLastSegment(node) {
				let loc, name;
				!funcInfo.hasReturnValue || areAllSegmentsUnreachable(funcInfo.currentSegments) || astUtils.isES5Constructor(node) || isClassConstructor(node) || (node.type === "Program" ? (loc = {
					line: 1,
					column: 0
				}, name = "program") : loc = node.type === "ArrowFunctionExpression" ? context.sourceCode.getTokenBefore(node.body, astUtils.isArrowToken).loc : node.parent.type === "MethodDefinition" || node.parent.type === "Property" && node.parent.method ? node.parent.key.loc : (node.id || context.sourceCode.getFirstToken(node)).loc, name ||= astUtils.getFunctionNameWithKind(node), context.report({
					node,
					loc,
					messageId: "missingReturn",
					data: { name }
				}));
			}
			return {
				onCodePathStart(codePath, node) {
					funcInfo = {
						upper: funcInfo,
						codePath,
						hasReturn: !1,
						hasReturnValue: !1,
						messageId: "",
						node,
						currentSegments: /* @__PURE__ */ new Set()
					};
				},
				onCodePathEnd() {
					funcInfo = funcInfo.upper;
				},
				onUnreachableCodePathSegmentStart(segment) {
					funcInfo.currentSegments.add(segment);
				},
				onUnreachableCodePathSegmentEnd(segment) {
					funcInfo.currentSegments.delete(segment);
				},
				onCodePathSegmentStart(segment) {
					funcInfo.currentSegments.add(segment);
				},
				onCodePathSegmentEnd(segment) {
					funcInfo.currentSegments.delete(segment);
				},
				ReturnStatement(node) {
					let argument = node.argument, hasReturnValue = !!argument;
					treatUndefinedAsUnspecified && hasReturnValue && (hasReturnValue = !astUtils.isSpecificId(argument, "undefined") && argument.operator !== "void"), funcInfo.hasReturn ? funcInfo.hasReturnValue !== hasReturnValue && context.report({
						node,
						messageId: funcInfo.messageId,
						data: funcInfo.data
					}) : (funcInfo.hasReturn = !0, funcInfo.hasReturnValue = hasReturnValue, funcInfo.messageId = hasReturnValue ? "missingReturnValue" : "unexpectedReturnValue", funcInfo.data = { name: funcInfo.node.type === "Program" ? "Program" : upperCaseFirst(astUtils.getFunctionNameWithKind(funcInfo.node)) });
				},
				"Program:exit": checkLastSegment,
				"FunctionDeclaration:exit": checkLastSegment,
				"FunctionExpression:exit": checkLastSegment,
				"ArrowFunctionExpression:exit": checkLastSegment
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/consistent-return.cjs
module.exports = require_consistent_return().create;
//#endregion
