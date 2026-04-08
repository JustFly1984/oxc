//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/require-atomic-updates.js
/**
* @fileoverview disallow assignments that can lead to race conditions due to usage of `await` or `yield`
* @author Teddy Katz
* @author Toru Nagashima
*/
var require_require_atomic_updates = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/**
	* Make the map from identifiers to each reference.
	* @param {escope.Scope} scope The scope to get references.
	* @param {Map<Identifier, escope.Reference>} [outReferenceMap] The map from identifier nodes to each reference object.
	* @returns {Map<Identifier, escope.Reference>} `referenceMap`.
	*/
	function createReferenceMap(scope, outReferenceMap = /* @__PURE__ */ new Map()) {
		for (let reference of scope.references) reference.resolved !== null && outReferenceMap.set(reference.identifier, reference);
		for (let childScope of scope.childScopes) childScope.type !== "function" && createReferenceMap(childScope, outReferenceMap);
		return outReferenceMap;
	}
	/**
	* Get `reference.writeExpr` of a given reference.
	* If it's the read reference of MemberExpression in LHS, returns RHS in order to address `a.b = await a`
	* @param {escope.Reference} reference The reference to get.
	* @returns {Expression|null} The `reference.writeExpr`.
	*/
	function getWriteExpr(reference) {
		if (reference.writeExpr) return reference.writeExpr;
		let node = reference.identifier;
		for (; node;) {
			let t = node.parent.type;
			if (t === "AssignmentExpression" && node.parent.left === node) return node.parent.right;
			if (t === "MemberExpression" && node.parent.object === node) {
				node = node.parent;
				continue;
			}
			break;
		}
		return null;
	}
	/**
	* Checks if an expression is a variable that can only be observed within the given function.
	* @param {Variable|null} variable The variable to check
	* @param {boolean} isMemberAccess If `true` then this is a member access.
	* @returns {boolean} `true` if the variable is local to the given function, and is never referenced in a closure.
	*/
	function isLocalVariableWithoutEscape(variable, isMemberAccess) {
		if (!variable || isMemberAccess && variable.defs.some((d) => d.type === "Parameter")) return !1;
		let functionScope = variable.scope.variableScope;
		return variable.references.every((reference) => reference.from.variableScope === functionScope);
	}
	/**
	* Represents segment information.
	*/
	var SegmentInfo = class {
		constructor() {
			this.info = /* @__PURE__ */ new WeakMap();
		}
		/**
		* Initialize the segment information.
		* @param {PathSegment} segment The segment to initialize.
		* @returns {void}
		*/
		initialize(segment) {
			let outdatedReadVariables = /* @__PURE__ */ new Set(), freshReadVariables = /* @__PURE__ */ new Set();
			for (let prevSegment of segment.prevSegments) {
				let info = this.info.get(prevSegment);
				info && (info.outdatedReadVariables.forEach(Set.prototype.add, outdatedReadVariables), info.freshReadVariables.forEach(Set.prototype.add, freshReadVariables));
			}
			this.info.set(segment, {
				outdatedReadVariables,
				freshReadVariables
			});
		}
		/**
		* Mark a given variable as read on given segments.
		* @param {PathSegment[]} segments The segments that it read the variable on.
		* @param {Variable} variable The variable to be read.
		* @returns {void}
		*/
		markAsRead(segments, variable) {
			for (let segment of segments) {
				let info = this.info.get(segment);
				info && (info.freshReadVariables.add(variable), info.outdatedReadVariables.delete(variable));
			}
		}
		/**
		* Move `freshReadVariables` to `outdatedReadVariables`.
		* @param {PathSegment[]} segments The segments to process.
		* @returns {void}
		*/
		makeOutdated(segments) {
			for (let segment of segments) {
				let info = this.info.get(segment);
				info && (info.freshReadVariables.forEach(Set.prototype.add, info.outdatedReadVariables), info.freshReadVariables.clear());
			}
		}
		/**
		* Check if a given variable is outdated on the current segments.
		* @param {PathSegment[]} segments The current segments.
		* @param {Variable} variable The variable to check.
		* @returns {boolean} `true` if the variable is outdated on the segments.
		*/
		isOutdated(segments, variable) {
			for (let segment of segments) {
				let info = this.info.get(segment);
				if (info && info.outdatedReadVariables.has(variable)) return !0;
			}
			return !1;
		}
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{ allowProperties: !1 }],
			docs: {
				description: "Disallow assignments that can lead to race conditions due to usage of `await` or `yield`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/require-atomic-updates"
			},
			fixable: null,
			schema: [{
				type: "object",
				properties: { allowProperties: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: {
				nonAtomicUpdate: "Possible race condition: `{{value}}` might be reassigned based on an outdated value of `{{value}}`.",
				nonAtomicObjectUpdate: "Possible race condition: `{{value}}` might be assigned based on an outdated state of `{{object}}`."
			}
		},
		create(context) {
			let [{ allowProperties }] = context.options, sourceCode = context.sourceCode, assignmentReferences = /* @__PURE__ */ new Map(), segmentInfo = new SegmentInfo(), stack = null;
			return {
				onCodePathStart(codePath, node) {
					let scope = sourceCode.getScope(node), shouldVerify = scope.type === "function" && (scope.block.async || scope.block.generator);
					stack = {
						upper: stack,
						codePath,
						referenceMap: shouldVerify ? createReferenceMap(scope) : null,
						currentSegments: /* @__PURE__ */ new Set()
					};
				},
				onCodePathEnd() {
					stack = stack.upper;
				},
				onCodePathSegmentStart(segment) {
					segmentInfo.initialize(segment), stack.currentSegments.add(segment);
				},
				onUnreachableCodePathSegmentStart(segment) {
					stack.currentSegments.add(segment);
				},
				onUnreachableCodePathSegmentEnd(segment) {
					stack.currentSegments.delete(segment);
				},
				onCodePathSegmentEnd(segment) {
					stack.currentSegments.delete(segment);
				},
				Identifier(node) {
					let { referenceMap } = stack, reference = referenceMap && referenceMap.get(node);
					if (!reference) return;
					let variable = reference.resolved, writeExpr = getWriteExpr(reference), isMemberAccess = reference.identifier.parent.type === "MemberExpression";
					if (reference.isRead() && !(writeExpr && writeExpr.parent.operator === "=") && segmentInfo.markAsRead(stack.currentSegments, variable), writeExpr && writeExpr.parent.right === writeExpr && !isLocalVariableWithoutEscape(variable, isMemberAccess)) {
						let refs = assignmentReferences.get(writeExpr);
						refs || (refs = [], assignmentReferences.set(writeExpr, refs)), refs.push(reference);
					}
				},
				":expression:exit"(node) {
					if (!stack.referenceMap) return;
					(node.type === "AwaitExpression" || node.type === "YieldExpression") && segmentInfo.makeOutdated(stack.currentSegments);
					let references = assignmentReferences.get(node);
					if (references) {
						assignmentReferences.delete(node);
						for (let reference of references) {
							let variable = reference.resolved;
							segmentInfo.isOutdated(stack.currentSegments, variable) && (node.parent.left === reference.identifier ? context.report({
								node: node.parent,
								messageId: "nonAtomicUpdate",
								data: { value: variable.name }
							}) : allowProperties || context.report({
								node: node.parent,
								messageId: "nonAtomicObjectUpdate",
								data: {
									value: sourceCode.getText(node.parent.left),
									object: variable.name
								}
							}));
						}
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/require-atomic-updates.cjs
module.exports = require_require_atomic_updates().create;
//#endregion
