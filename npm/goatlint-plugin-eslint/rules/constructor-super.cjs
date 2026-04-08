//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/constructor-super.js
/**
* @fileoverview A rule to verify `super()` callings in constructor.
* @author Toru Nagashima
*/
var require_constructor_super = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
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
	* Checks whether a given node can be a constructor or not.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node can be a constructor.
	*/
	function isPossibleConstructor(node) {
		if (!node) return !1;
		switch (node.type) {
			case "ClassExpression":
			case "FunctionExpression":
			case "ThisExpression":
			case "MemberExpression":
			case "CallExpression":
			case "NewExpression":
			case "ChainExpression":
			case "YieldExpression":
			case "TaggedTemplateExpression":
			case "MetaProperty": return !0;
			case "Identifier": return node.name !== "undefined";
			case "AssignmentExpression":
 /**
			* All other assignment operators are mathematical assignment operators (arithmetic or bitwise).
			* An assignment expression with a mathematical operator can either evaluate to a primitive value,
			* or throw, depending on the operands. Thus, it cannot evaluate to a constructor function.
			*/
			return ["=", "&&="].includes(node.operator) ? isPossibleConstructor(node.right) : ["||=", "??="].includes(node.operator) ? isPossibleConstructor(node.left) || isPossibleConstructor(node.right) : !1;
			case "LogicalExpression": return node.operator === "&&" ? isPossibleConstructor(node.right) : isPossibleConstructor(node.left) || isPossibleConstructor(node.right);
			case "ConditionalExpression": return isPossibleConstructor(node.alternate) || isPossibleConstructor(node.consequent);
			case "SequenceExpression": return isPossibleConstructor(node.expressions.at(-1));
			default: return !1;
		}
	}
	/**
	* A class to store information about a code path segment.
	*/
	var SegmentInfo = class {
		/**
		* Indicates if super() is called in all code paths.
		* @type {boolean}
		*/
		calledInEveryPaths = !1;
		/**
		* Indicates if super() is called in any code paths.
		* @type {boolean}
		*/
		calledInSomePaths = !1;
		/**
		* The nodes which have been validated and don't need to be reconsidered.
		* @type {ASTNode[]}
		*/
		validNodes = [];
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Require `super()` calls in constructors",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/constructor-super"
			},
			schema: [],
			messages: {
				missingSome: "Lacked a call of 'super()' in some code paths.",
				missingAll: "Expected to call 'super()'.",
				duplicate: "Unexpected duplicate 'super()'.",
				badSuper: "Unexpected 'super()' because 'super' is not a constructor."
			}
		},
		create(context) {
			let funcInfo = null, segInfoMap = Object.create(null);
			/**
			* Gets the flag which shows `super()` is called in some paths.
			* @param {CodePathSegment} segment A code path segment to get.
			* @returns {boolean} The flag which shows `super()` is called in some paths
			*/
			function isCalledInSomePath(segment) {
				return segment.reachable && segInfoMap[segment.id].calledInSomePaths;
			}
			/**
			* Determines if a segment has been seen in the traversal.
			* @param {CodePathSegment} segment A code path segment to check.
			* @returns {boolean} `true` if the segment has been seen.
			*/
			function hasSegmentBeenSeen(segment) {
				return !!segInfoMap[segment.id];
			}
			/**
			* Gets the flag which shows `super()` is called in all paths.
			* @param {CodePathSegment} segment A code path segment to get.
			* @returns {boolean} The flag which shows `super()` is called in all paths.
			*/
			function isCalledInEveryPath(segment) {
				return segment.reachable && segInfoMap[segment.id].calledInEveryPaths;
			}
			return {
				onCodePathStart(codePath, node) {
					if (isConstructorFunction(node)) {
						let superClass = node.parent.parent.parent.superClass;
						funcInfo = {
							upper: funcInfo,
							isConstructor: !0,
							hasExtends: !!superClass,
							superIsConstructor: isPossibleConstructor(superClass),
							codePath,
							currentSegments: /* @__PURE__ */ new Set()
						};
					} else funcInfo = {
						upper: funcInfo,
						isConstructor: !1,
						hasExtends: !1,
						superIsConstructor: !1,
						codePath,
						currentSegments: /* @__PURE__ */ new Set()
					};
				},
				onCodePathEnd(codePath, node) {
					let hasExtends = funcInfo.hasExtends;
					if (funcInfo = funcInfo.upper, !hasExtends) return;
					let returnedSegments = codePath.returnedSegments, calledInEveryPaths = returnedSegments.every(isCalledInEveryPath), calledInSomePaths = returnedSegments.some(isCalledInSomePath);
					calledInEveryPaths || context.report({
						messageId: calledInSomePaths ? "missingSome" : "missingAll",
						node: node.parent
					});
				},
				onCodePathSegmentStart(segment, node) {
					if (funcInfo.currentSegments.add(segment), !(funcInfo.isConstructor && funcInfo.hasExtends)) return;
					let info = segInfoMap[segment.id] = new SegmentInfo(), seenPrevSegments = segment.prevSegments.filter(hasSegmentBeenSeen);
					seenPrevSegments.length > 0 && (info.calledInSomePaths = seenPrevSegments.some(isCalledInSomePath), info.calledInEveryPaths = seenPrevSegments.every(isCalledInEveryPath)), node.parent && node.parent.type === "ForStatement" && node.parent.update === node && (info.calledInEveryPaths = !0);
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
					funcInfo.isConstructor && funcInfo.hasExtends && funcInfo.codePath.traverseSegments({
						first: toSegment,
						last: fromSegment
					}, (segment, controller) => {
						let info = segInfoMap[segment.id];
						if (!info) {
							controller.skip();
							return;
						}
						let seenPrevSegments = segment.prevSegments.filter(hasSegmentBeenSeen), calledInSomePreviousPaths = seenPrevSegments.some(isCalledInSomePath), calledInEveryPreviousPaths = seenPrevSegments.every(isCalledInEveryPath);
						if (info.calledInSomePaths ||= calledInSomePreviousPaths, info.calledInEveryPaths ||= calledInEveryPreviousPaths, calledInSomePreviousPaths) {
							let nodes = info.validNodes;
							info.validNodes = [];
							for (let i = 0; i < nodes.length; ++i) {
								let node = nodes[i];
								context.report({
									messageId: "duplicate",
									node
								});
							}
						}
					});
				},
				"CallExpression:exit"(node) {
					if (!(funcInfo.isConstructor && funcInfo.hasExtends) || node.callee.type !== "Super") return;
					let segments = funcInfo.currentSegments, duplicate = !1, info = null;
					for (let segment of segments) segment.reachable && (info = segInfoMap[segment.id], duplicate ||= info.calledInSomePaths, info.calledInSomePaths = info.calledInEveryPaths = !0);
					info && (duplicate ? context.report({
						messageId: "duplicate",
						node
					}) : funcInfo.superIsConstructor ? info.validNodes.push(node) : context.report({
						messageId: "badSuper",
						node
					}));
				},
				ReturnStatement(node) {
					if (!(funcInfo.isConstructor && funcInfo.hasExtends) || !node.argument) return;
					let segments = funcInfo.currentSegments;
					for (let segment of segments) if (segment.reachable) {
						let info = segInfoMap[segment.id];
						info.calledInSomePaths = info.calledInEveryPaths = !0;
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/constructor-super.cjs
module.exports = require_constructor_super().create;
//#endregion
