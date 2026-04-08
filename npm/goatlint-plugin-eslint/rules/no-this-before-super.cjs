const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-this-before-super.js
/**
* @fileoverview A rule to disallow using `this`/`super` before `super()`.
* @author Toru Nagashima
*/
var require_no_this_before_super = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Checks whether or not a given node is a constructor.
	* @param {ASTNode} node A node to check. This node type is one of
	*   `Program`, `FunctionDeclaration`, `FunctionExpression`, and
	*   `ArrowFunctionExpression`.
	* @returns {boolean} `true` if the node is a constructor.
	*/
	function isConstructorFunction(node) {
		return node.type === "FunctionExpression" && node.parent.type === "MethodDefinition" && node.parent.kind === "constructor";
	}
	/**
	*
	*/
	var SegmentInfo = class {
		/**
		* Indicates whether `super()` is called in all code paths.
		* @type {boolean}
		*/
		superCalled = !1;
		/**
		* The array of invalid ThisExpression and Super nodes.
		* @type {ASTNode[]}
		*/
		invalidNodes = [];
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow `this`/`super` before calling `super()` in constructors",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-this-before-super"
			},
			schema: [],
			messages: { noBeforeSuper: "'{{kind}}' is not allowed before 'super()'." }
		},
		create(context) {
			let funcInfo = null, segInfoMap = Object.create(null);
			/**
			* Gets whether or not `super()` is called in a given code path segment.
			* @param {CodePathSegment} segment A code path segment to get.
			* @returns {boolean} `true` if `super()` is called.
			*/
			function isCalled(segment) {
				return !segment.reachable || segInfoMap[segment.id]?.superCalled;
			}
			/**
			* Checks whether or not this is in a constructor.
			* @returns {boolean} `true` if this is in a constructor.
			*/
			function isInConstructorOfDerivedClass() {
				return !!(funcInfo && funcInfo.isConstructor && funcInfo.hasExtends);
			}
			/**
			* Determines if every segment in a set has been called.
			* @param {Set<CodePathSegment>} segments The segments to search.
			* @returns {boolean} True if every segment has been called; false otherwise.
			*/
			function isEverySegmentCalled(segments) {
				for (let segment of segments) if (!isCalled(segment)) return !1;
				return !0;
			}
			/**
			* Checks whether or not this is before `super()` is called.
			* @returns {boolean} `true` if this is before `super()` is called.
			*/
			function isBeforeCallOfSuper() {
				return isInConstructorOfDerivedClass() && !isEverySegmentCalled(funcInfo.currentSegments);
			}
			/**
			* Sets a given node as invalid.
			* @param {ASTNode} node A node to set as invalid. This is one of
			*      a ThisExpression and a Super.
			* @returns {void}
			*/
			function setInvalid(node) {
				let segments = funcInfo.currentSegments;
				for (let segment of segments) segment.reachable && segInfoMap[segment.id].invalidNodes.push(node);
			}
			/**
			* Sets the current segment as `super` was called.
			* @returns {void}
			*/
			function setSuperCalled() {
				let segments = funcInfo.currentSegments;
				for (let segment of segments) segment.reachable && (segInfoMap[segment.id].superCalled = !0);
			}
			return {
				onCodePathStart(codePath, node) {
					if (isConstructorFunction(node)) {
						let classNode = node.parent.parent.parent;
						funcInfo = {
							upper: funcInfo,
							isConstructor: !0,
							hasExtends: !!(classNode.superClass && !astUtils.isNullOrUndefined(classNode.superClass)),
							codePath,
							currentSegments: /* @__PURE__ */ new Set()
						};
					} else funcInfo = {
						upper: funcInfo,
						isConstructor: !1,
						hasExtends: !1,
						codePath,
						currentSegments: /* @__PURE__ */ new Set()
					};
				},
				onCodePathEnd(codePath) {
					let isDerivedClass = funcInfo.hasExtends;
					if (funcInfo = funcInfo.upper, !isDerivedClass) return;
					/**
					* A collection of nodes to avoid duplicate reports.
					* @type {Set<ASTNode>}
					*/
					let reported = /* @__PURE__ */ new Set();
					codePath.traverseSegments((segment, controller) => {
						let info = segInfoMap[segment.id], invalidNodes = info.invalidNodes.filter((node) => !reported.has(node));
						for (let invalidNode of invalidNodes) reported.add(invalidNode), context.report({
							messageId: "noBeforeSuper",
							node: invalidNode,
							data: { kind: invalidNode.type === "Super" ? "super" : "this" }
						});
						info.superCalled && controller.skip();
					});
				},
				onCodePathSegmentStart(segment) {
					funcInfo.currentSegments.add(segment), isInConstructorOfDerivedClass() && (segInfoMap[segment.id] = {
						superCalled: segment.prevSegments.length > 0 && segment.prevSegments.every(isCalled),
						invalidNodes: []
					});
				},
				onUnreachableCodePathSegmentStart(segment) {
					funcInfo.currentSegments.add(segment);
				},
				onUnreachableCodePathSegmentEnd(segment) {
					funcInfo.currentSegments.delete(segment);
				},
				onCodePathSegmentEnd(segment) {
					funcInfo.currentSegments.delete(segment);
				},
				onCodePathSegmentLoop(fromSegment, toSegment) {
					isInConstructorOfDerivedClass() && funcInfo.codePath.traverseSegments({
						first: toSegment,
						last: fromSegment
					}, (segment, controller) => {
						let info = segInfoMap[segment.id] ?? new SegmentInfo();
						info.superCalled ? controller.skip() : segment.prevSegments.length > 0 && segment.prevSegments.every(isCalled) && (info.superCalled = !0), segInfoMap[segment.id] = info;
					});
				},
				ThisExpression(node) {
					isBeforeCallOfSuper() && setInvalid(node);
				},
				Super(node) {
					!astUtils.isCallee(node) && isBeforeCallOfSuper() && setInvalid(node);
				},
				"CallExpression:exit"(node) {
					node.callee.type === "Super" && isBeforeCallOfSuper() && setSuperCalled();
				},
				"Program:exit"() {
					segInfoMap = Object.create(null);
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-this-before-super.cjs
module.exports = require_no_this_before_super().create;
//#endregion
