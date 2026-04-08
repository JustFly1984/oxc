//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unreachable.js
/**
* @fileoverview Checks for unreachable code due to return, throws, break, and continue.
* @author Joel Feenstra
*/
var require_no_unreachable = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/**
	* @typedef {Object} ConstructorInfo
	* @property {ConstructorInfo | null} upper Info about the constructor that encloses this constructor.
	* @property {boolean} hasSuperCall The flag about having `super()` expressions.
	*/
	/**
	* Checks whether or not a given variable declarator has the initializer.
	* @param {ASTNode} node A VariableDeclarator node to check.
	* @returns {boolean} `true` if the node has the initializer.
	*/
	function isInitialized(node) {
		return !!node.init;
	}
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
	* The class to distinguish consecutive unreachable statements.
	*/
	var ConsecutiveRange = class {
		constructor(sourceCode) {
			this.sourceCode = sourceCode, this.startNode = null, this.endNode = null;
		}
		/**
		* The location object of this range.
		* @type {Object}
		*/
		get location() {
			return {
				start: this.startNode.loc.start,
				end: this.endNode.loc.end
			};
		}
		/**
		* `true` if this range is empty.
		* @type {boolean}
		*/
		get isEmpty() {
			return !(this.startNode && this.endNode);
		}
		/**
		* Checks whether the given node is inside of this range.
		* @param {ASTNode|Token} node The node to check.
		* @returns {boolean} `true` if the node is inside of this range.
		*/
		contains(node) {
			return node.range[0] >= this.startNode.range[0] && node.range[1] <= this.endNode.range[1];
		}
		/**
		* Checks whether the given node is consecutive to this range.
		* @param {ASTNode} node The node to check.
		* @returns {boolean} `true` if the node is consecutive to this range.
		*/
		isConsecutive(node) {
			return this.contains(this.sourceCode.getTokenBefore(node));
		}
		/**
		* Merges the given node to this range.
		* @param {ASTNode} node The node to merge.
		* @returns {void}
		*/
		merge(node) {
			this.endNode = node;
		}
		/**
		* Resets this range by the given node or null.
		* @param {ASTNode|null} node The node to reset, or null.
		* @returns {void}
		*/
		reset(node) {
			this.startNode = this.endNode = node;
		}
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-unreachable"
			},
			schema: [],
			messages: { unreachableCode: "Unreachable code." }
		},
		create(context) {
			/** @type {ConstructorInfo | null} */
			let constructorInfo = null, range = new ConsecutiveRange(context.sourceCode), codePathSegments = [], currentCodePathSegments = /* @__PURE__ */ new Set();
			/**
			* Reports a given node if it's unreachable.
			* @param {ASTNode} node A statement node to report.
			* @returns {void}
			*/
			function reportIfUnreachable(node) {
				let nextNode = null;
				if (node && (node.type === "PropertyDefinition" || areAllSegmentsUnreachable(currentCodePathSegments))) {
					if (range.isEmpty) {
						range.reset(node);
						return;
					}
					if (range.contains(node)) return;
					if (range.isConsecutive(node)) {
						range.merge(node);
						return;
					}
					nextNode = node;
				}
				range.isEmpty || context.report({
					messageId: "unreachableCode",
					loc: range.location,
					node: range.startNode
				}), range.reset(nextNode);
			}
			return {
				onCodePathStart() {
					codePathSegments.push(currentCodePathSegments), currentCodePathSegments = /* @__PURE__ */ new Set();
				},
				onCodePathEnd() {
					currentCodePathSegments = codePathSegments.pop();
				},
				onUnreachableCodePathSegmentStart(segment) {
					currentCodePathSegments.add(segment);
				},
				onUnreachableCodePathSegmentEnd(segment) {
					currentCodePathSegments.delete(segment);
				},
				onCodePathSegmentEnd(segment) {
					currentCodePathSegments.delete(segment);
				},
				onCodePathSegmentStart(segment) {
					currentCodePathSegments.add(segment);
				},
				BlockStatement: reportIfUnreachable,
				BreakStatement: reportIfUnreachable,
				ClassDeclaration: reportIfUnreachable,
				ContinueStatement: reportIfUnreachable,
				DebuggerStatement: reportIfUnreachable,
				DoWhileStatement: reportIfUnreachable,
				ExpressionStatement: reportIfUnreachable,
				ForInStatement: reportIfUnreachable,
				ForOfStatement: reportIfUnreachable,
				ForStatement: reportIfUnreachable,
				IfStatement: reportIfUnreachable,
				ImportDeclaration: reportIfUnreachable,
				LabeledStatement: reportIfUnreachable,
				ReturnStatement: reportIfUnreachable,
				SwitchStatement: reportIfUnreachable,
				ThrowStatement: reportIfUnreachable,
				TryStatement: reportIfUnreachable,
				VariableDeclaration(node) {
					(node.kind !== "var" || node.declarations.some(isInitialized)) && reportIfUnreachable(node);
				},
				WhileStatement: reportIfUnreachable,
				WithStatement: reportIfUnreachable,
				ExportNamedDeclaration: reportIfUnreachable,
				ExportDefaultDeclaration: reportIfUnreachable,
				ExportAllDeclaration: reportIfUnreachable,
				"Program:exit"() {
					reportIfUnreachable();
				},
				"MethodDefinition[kind='constructor']"() {
					constructorInfo = {
						upper: constructorInfo,
						hasSuperCall: !1
					};
				},
				"MethodDefinition[kind='constructor']:exit"(node) {
					let { hasSuperCall } = constructorInfo;
					if (constructorInfo = constructorInfo.upper, !node.value.body) return;
					let classDefinition = node.parent.parent;
					if (classDefinition.superClass && !hasSuperCall) for (let element of classDefinition.body.body) element.type === "PropertyDefinition" && !element.static && reportIfUnreachable(element);
				},
				"CallExpression > Super.callee"() {
					constructorInfo && (constructorInfo.hasSuperCall = !0);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unreachable.cjs
module.exports = require_no_unreachable().create;
//#endregion
