const require_chunk = require("../common/chunk.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-useless-assignment.js
/**
* @fileoverview A rule to disallow unnecessary assignments`.
* @author Yosuke Ota
*/
var require_no_useless_assignment = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { findVariable } = require_eslint_utils$1.t();
	/** @typedef {import("estree").Node} ASTNode */
	/** @typedef {import("estree").Pattern} Pattern */
	/** @typedef {import("estree").Identifier} Identifier */
	/** @typedef {import("estree").VariableDeclarator} VariableDeclarator */
	/** @typedef {import("estree").AssignmentExpression} AssignmentExpression */
	/** @typedef {import("estree").UpdateExpression} UpdateExpression */
	/** @typedef {import("estree").Expression} Expression */
	/** @typedef {import("eslint-scope").Scope} Scope */
	/** @typedef {import("eslint-scope").Variable} Variable */
	/** @typedef {import("../linter/code-path-analysis/code-path")} CodePath */
	/** @typedef {import("../linter/code-path-analysis/code-path-segment")} CodePathSegment */
	/**
	* Extract identifier from the given pattern node used on the left-hand side of the assignment.
	* @param {Pattern} pattern The pattern node to extract identifier
	* @returns {Iterable<Identifier>} The extracted identifier
	*/
	function* extractIdentifiersFromPattern(pattern) {
		switch (pattern.type) {
			case "Identifier":
				yield pattern;
				return;
			case "ObjectPattern":
				for (let property of pattern.properties) yield* extractIdentifiersFromPattern(property.type === "Property" ? property.value : property);
				return;
			case "ArrayPattern":
				for (let element of pattern.elements) element && (yield* extractIdentifiersFromPattern(element));
				return;
			case "RestElement":
				yield* extractIdentifiersFromPattern(pattern.argument);
				return;
			case "AssignmentPattern": yield* extractIdentifiersFromPattern(pattern.left);
		}
	}
	/**
	* Checks whether the given identifier node is evaluated after the assignment identifier.
	* @param {AssignmentInfo} assignment The assignment info.
	* @param {Identifier} identifier The identifier to check.
	* @returns {boolean} `true` if the given identifier node is evaluated after the assignment identifier.
	*/
	function isIdentifierEvaluatedAfterAssignment(assignment, identifier) {
		return !(identifier.range[0] < assignment.identifier.range[1] || assignment.expression && assignment.expression.range[0] <= identifier.range[0] && identifier.range[1] <= assignment.expression.range[1]);
	}
	/**
	* Checks whether the given identifier node is used between the assigned identifier and the equal sign.
	*
	* e.g. let { x, y = x } = obj;
	*                   ^   identifier to check
	*            ^          assigned identifier
	* @param {AssignmentInfo} assignment The assignment info.
	* @param {Identifier} identifier The identifier to check.
	* @returns {boolean} `true` if the given identifier node is used between the assigned identifier and the equal sign.
	*/
	function isIdentifierUsedBetweenAssignedAndEqualSign(assignment, identifier) {
		return assignment.expression ? assignment.identifier.range[1] <= identifier.range[0] && identifier.range[1] <= assignment.expression.range[0] : !1;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow variable assignments when the value is not used",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-useless-assignment"
			},
			schema: [],
			messages: { unnecessaryAssignment: "This assigned value is not used in subsequent statements." }
		},
		create(context) {
			let sourceCode = context.sourceCode, scopeStack = null, codePathStartScopes = /* @__PURE__ */ new Set();
			/**
			* Gets the scope of code path start from given scope
			* @param {Scope} scope The initial scope
			* @returns {Scope} The scope of code path start
			* @throws {Error} Unexpected error
			*/
			function getCodePathStartScope(scope) {
				let target = scope;
				for (; target;) {
					if (codePathStartScopes.has(target)) return target;
					target = target.upper;
				}
				return null;
			}
			/**
			* Verify the given scope stack.
			* @param {ScopeStack} target The scope stack to verify.
			* @returns {void}
			*/
			function verify(target) {
				/**
				* Checks whether the given identifier is used in the segment.
				* @param {CodePathSegment} segment The code path segment.
				* @param {Identifier} identifier The identifier to check.
				* @returns {boolean} `true` if the identifier is used in the segment.
				*/
				function isIdentifierUsedInSegment(segment, identifier) {
					let segmentInfo = target.segments[segment.id];
					return segmentInfo.first && segmentInfo.last && segmentInfo.first.range[0] <= identifier.range[0] && identifier.range[1] <= segmentInfo.last.range[1];
				}
				/**
				* Verifies whether the given assignment info is an used assignment.
				* Report if it is an unused assignment.
				* @param {AssignmentInfo} targetAssignment The assignment info to verify.
				* @param {AssignmentInfo[]} allAssignments The list of all assignment info for variables.
				* @returns {void}
				*/
				function verifyAssignmentIsUsed(targetAssignment, allAssignments) {
					if (target.tryStatementBlocks.some((tryBlock) => tryBlock.range[0] <= targetAssignment.identifier.range[0] && targetAssignment.identifier.range[1] <= tryBlock.range[1])) return;
					/**
					* @typedef {Object} SubsequentSegmentData
					* @property {CodePathSegment} segment The code path segment
					* @property {AssignmentInfo} [assignment] The first occurrence of the assignment within the segment.
					* There is no need to check if the variable is used after this assignment,
					* as the value it was assigned will be used.
					*/
					/**
					* Information used in `getSubsequentSegments()`.
					* To avoid unnecessary iterations, cache information that has already been iterated over,
					* and if additional iterations are needed, start iterating from the retained position.
					*/
					let subsequentSegmentData = {
						results: [],
						subsequentSegments: /* @__PURE__ */ new Set(),
						queueSegments: targetAssignment.segments.flatMap((segment) => segment.nextSegments)
					};
					/**
					* Gets the subsequent segments from the segment of
					* the assignment currently being validated (targetAssignment).
					* @returns {Iterable<SubsequentSegmentData>} the subsequent segments
					*/
					function* getSubsequentSegments() {
						for (yield* subsequentSegmentData.results; subsequentSegmentData.queueSegments.length > 0;) {
							let nextSegment = subsequentSegmentData.queueSegments.shift();
							if (subsequentSegmentData.subsequentSegments.has(nextSegment)) continue;
							subsequentSegmentData.subsequentSegments.add(nextSegment);
							let assignmentInSegment = allAssignments.find((otherAssignment) => otherAssignment.segments.includes(nextSegment) && !isIdentifierUsedBetweenAssignedAndEqualSign(otherAssignment, targetAssignment.identifier));
							assignmentInSegment || subsequentSegmentData.queueSegments.push(...nextSegment.nextSegments);
							/** @type {SubsequentSegmentData} */
							let result = {
								segment: nextSegment,
								assignment: assignmentInSegment
							};
							subsequentSegmentData.results.push(result), yield result;
						}
					}
					if (targetAssignment.variable.references.some((ref) => ref.identifier.type !== "Identifier"))
 /**
					* Skip checking for a variable that has at least one non-identifier reference.
					* It's generated by plugins and cannot be handled reliably in the core rule.
					*/
					return;
					let readReferences = targetAssignment.variable.references.filter((reference) => reference.isRead());
					if (!readReferences.length) return;
					/**
					* Other assignment on the current segment and after current assignment.
					*/
					let otherAssignmentAfterTargetAssignment = allAssignments.find((assignment) => assignment === targetAssignment || assignment.segments.length && assignment.segments.every((segment) => !targetAssignment.segments.includes(segment)) ? !1 : !!(isIdentifierEvaluatedAfterAssignment(targetAssignment, assignment.identifier) || assignment.expression && assignment.expression.range[0] <= targetAssignment.identifier.range[0] && targetAssignment.identifier.range[1] <= assignment.expression.range[1]));
					for (let reference of readReferences) {
						if (target.scope !== getCodePathStartScope(reference.from)) return;
						if (isIdentifierEvaluatedAfterAssignment(targetAssignment, reference.identifier) && (isIdentifierUsedBetweenAssignedAndEqualSign(targetAssignment, reference.identifier) || targetAssignment.segments.some((segment) => isIdentifierUsedInSegment(segment, reference.identifier)))) {
							if (otherAssignmentAfterTargetAssignment && isIdentifierEvaluatedAfterAssignment(otherAssignmentAfterTargetAssignment, reference.identifier)) continue;
							return;
						}
						if (!otherAssignmentAfterTargetAssignment) {
							for (let subsequentSegment of getSubsequentSegments()) if (isIdentifierUsedInSegment(subsequentSegment.segment, reference.identifier)) {
								if (subsequentSegment.assignment && isIdentifierEvaluatedAfterAssignment(subsequentSegment.assignment, reference.identifier)) continue;
								return;
							}
						}
					}
					context.report({
						node: targetAssignment.identifier,
						messageId: "unnecessaryAssignment"
					});
				}
				for (let assignments of target.assignments.values()) {
					assignments.sort((a, b) => a.identifier.range[0] - b.identifier.range[0]);
					for (let assignment of assignments) verifyAssignmentIsUsed(assignment, assignments);
				}
			}
			return {
				onCodePathStart(codePath, node) {
					let scope = sourceCode.getScope(node);
					scopeStack = {
						upper: scopeStack,
						codePath,
						scope,
						segments: Object.create(null),
						currentSegments: /* @__PURE__ */ new Set(),
						assignments: /* @__PURE__ */ new Map(),
						tryStatementBlocks: []
					}, codePathStartScopes.add(scopeStack.scope);
				},
				onCodePathEnd() {
					verify(scopeStack), scopeStack = scopeStack.upper;
				},
				onCodePathSegmentStart(segment) {
					let segmentInfo = {
						segment,
						first: null,
						last: null
					};
					scopeStack.segments[segment.id] = segmentInfo, scopeStack.currentSegments.add(segment);
				},
				onCodePathSegmentEnd(segment) {
					scopeStack.currentSegments.delete(segment);
				},
				TryStatement(node) {
					scopeStack.tryStatementBlocks.push(node.block);
				},
				Identifier(node) {
					for (let segment of scopeStack.currentSegments) {
						let segmentInfo = scopeStack.segments[segment.id];
						segmentInfo.first ||= node, segmentInfo.last = node;
					}
				},
				":matches(VariableDeclarator[init!=null], AssignmentExpression, UpdateExpression):exit"(node) {
					if (scopeStack.currentSegments.size === 0) return;
					let assignments = scopeStack.assignments, pattern, expression = null;
					node.type === "VariableDeclarator" ? (pattern = node.id, expression = node.init) : node.type === "AssignmentExpression" ? (pattern = node.left, expression = node.right) : pattern = node.argument;
					for (let identifier of extractIdentifiersFromPattern(pattern)) {
						/** @type {Variable} */
						let variable = findVariable(sourceCode.getScope(identifier), identifier);
						if (!variable || variable.scope.type === "global" && variable.defs.length === 0 || scopeStack.scope !== getCodePathStartScope(variable.scope) || variable.eslintUsed || variable.scope.type === "module" && (variable.defs.some((def) => def.type === "Variable" && def.parent.parent.type === "ExportNamedDeclaration" || def.type === "FunctionName" && (def.node.parent.type === "ExportNamedDeclaration" || def.node.parent.type === "ExportDefaultDeclaration") || def.type === "ClassName" && (def.node.parent.type === "ExportNamedDeclaration" || def.node.parent.type === "ExportDefaultDeclaration")) || variable.references.some((reference) => reference.identifier.parent.type === "ExportSpecifier"))) continue;
						let list = assignments.get(variable);
						list || (list = [], assignments.set(variable, list)), list.push({
							variable,
							identifier,
							node,
							expression,
							segments: [...scopeStack.currentSegments]
						});
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-useless-assignment.cjs
module.exports = require_no_useless_assignment().create;
//#endregion
