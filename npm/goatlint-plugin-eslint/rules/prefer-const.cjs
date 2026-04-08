const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_fix_tracker$1 = require("../common/fix-tracker.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/prefer-const.js
/**
* @fileoverview A rule to suggest using of const declaration for variables that are never reassigned after declared.
* @author Toru Nagashima
*/
var require_prefer_const = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let FixTracker = require_fix_tracker$1.t(), astUtils = require_ast_utils$1.t(), PATTERN_TYPE = /^(?:.+?Pattern|RestElement|SpreadProperty|ExperimentalRestProperty|Property)$/u, DECLARATION_HOST_TYPE = /^(?:Program|BlockStatement|StaticBlock|SwitchCase)$/u, DESTRUCTURING_HOST_TYPE = /^(?:VariableDeclarator|AssignmentExpression)$/u;
	/**
	* Checks whether a given node is located at `ForStatement.init` or not.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} `true` if the node is located at `ForStatement.init`.
	*/
	function isInitOfForStatement(node) {
		return node.parent.type === "ForStatement" && node.parent.init === node;
	}
	/**
	* Checks whether a given Identifier node becomes a VariableDeclaration or not.
	* @param {ASTNode} identifier An Identifier node to check.
	* @returns {boolean} `true` if the node can become a VariableDeclaration.
	*/
	function canBecomeVariableDeclaration(identifier) {
		let node = identifier.parent;
		for (; PATTERN_TYPE.test(node.type);) node = node.parent;
		return node.type === "VariableDeclarator" || node.type === "AssignmentExpression" && node.parent.type === "ExpressionStatement" && DECLARATION_HOST_TYPE.test(node.parent.parent.type);
	}
	/**
	* Checks if an property or element is from outer scope or function parameters
	* in destructing pattern.
	* @param {string} name A variable name to be checked.
	* @param {eslint-scope.Scope} initScope A scope to start find.
	* @returns {boolean} Indicates if the variable is from outer scope or function parameters.
	*/
	function isOuterVariableInDestructing(name, initScope) {
		if (initScope.through.some((ref) => ref.resolved && ref.resolved.name === name)) return !0;
		let variable = astUtils.getVariableByName(initScope, name);
		return variable === null ? !1 : variable.defs.some((def) => def.type === "Parameter");
	}
	/**
	* Gets the VariableDeclarator/AssignmentExpression node that a given reference
	* belongs to.
	* This is used to detect a mix of reassigned and never reassigned in a
	* destructuring.
	* @param {eslint-scope.Reference} reference A reference to get.
	* @returns {ASTNode|null} A VariableDeclarator/AssignmentExpression node or
	*      null.
	*/
	function getDestructuringHost(reference) {
		if (!reference.isWrite()) return null;
		let node = reference.identifier.parent;
		for (; PATTERN_TYPE.test(node.type);) node = node.parent;
		return DESTRUCTURING_HOST_TYPE.test(node.type) ? node : null;
	}
	/**
	* Determines if a destructuring assignment node contains
	* any MemberExpression nodes. This is used to determine if a
	* variable that is only written once using destructuring can be
	* safely converted into a const declaration.
	* @param {ASTNode} node The ObjectPattern or ArrayPattern node to check.
	* @returns {boolean} True if the destructuring pattern contains
	*      a MemberExpression, false if not.
	*/
	function hasMemberExpressionAssignment(node) {
		switch (node.type) {
			case "ObjectPattern": return node.properties.some((prop) => prop ? hasMemberExpressionAssignment(prop.argument || prop.value) : !1);
			case "ArrayPattern": return node.elements.some((element) => element ? hasMemberExpressionAssignment(element) : !1);
			case "AssignmentPattern": return hasMemberExpressionAssignment(node.left);
			case "MemberExpression": return !0;
		}
		return !1;
	}
	/**
	* Gets an identifier node of a given variable.
	*
	* If the initialization exists or one or more reading references exist before
	* the first assignment, the identifier node is the node of the declaration.
	* Otherwise, the identifier node is the node of the first assignment.
	*
	* If the variable should not change to const, this function returns null.
	* - If the variable is reassigned.
	* - If the variable is never initialized nor assigned.
	* - If the variable is initialized in a different scope from the declaration.
	* - If the unique assignment of the variable cannot change to a declaration.
	*   e.g. `if (a) b = 1` / `return (b = 1)`
	* - If the variable is declared in the global scope and `eslintUsed` is `true`.
	*   `/*exported foo` directive comment makes such variables. This rule does not
	*   warn such variables because this rule cannot distinguish whether the
	*   exported variables are reassigned or not.
	* @param {eslint-scope.Variable} variable A variable to get.
	* @param {boolean} ignoreReadBeforeAssign
	*      The value of `ignoreReadBeforeAssign` option.
	* @returns {ASTNode|null}
	*      An Identifier node if the variable should change to const.
	*      Otherwise, null.
	*/
	function getIdentifierIfShouldBeConst(variable, ignoreReadBeforeAssign) {
		if (variable.eslintUsed && variable.scope.type === "global") return null;
		let writer = null, isReadBeforeInit = !1, references = variable.references;
		for (let i = 0; i < references.length; ++i) {
			let reference = references[i];
			if (reference.isWrite()) {
				if (writer !== null && writer.identifier !== reference.identifier) return null;
				let destructuringHost = getDestructuringHost(reference);
				if (destructuringHost !== null && destructuringHost.left !== void 0) {
					let leftNode = destructuringHost.left, hasOuterVariables = !1, hasNonIdentifiers = !1;
					if (leftNode.type === "ObjectPattern" ? (hasOuterVariables = leftNode.properties.filter((prop) => prop.value).map((prop) => prop.value.name).some((name) => isOuterVariableInDestructing(name, variable.scope)), hasNonIdentifiers = hasMemberExpressionAssignment(leftNode)) : leftNode.type === "ArrayPattern" && (hasOuterVariables = leftNode.elements.map((element) => element && element.name).some((name) => isOuterVariableInDestructing(name, variable.scope)), hasNonIdentifiers = hasMemberExpressionAssignment(leftNode)), hasOuterVariables || hasNonIdentifiers) return null;
				}
				writer = reference;
			} else if (reference.isRead() && writer === null) {
				if (ignoreReadBeforeAssign) return null;
				isReadBeforeInit = !0;
			}
		}
		return writer !== null && writer.from === variable.scope && canBecomeVariableDeclaration(writer.identifier) ? isReadBeforeInit ? variable.defs[0].name : writer.identifier : null;
	}
	/**
	* Groups by the VariableDeclarator/AssignmentExpression node that each
	* reference of given variables belongs to.
	* This is used to detect a mix of reassigned and never reassigned in a
	* destructuring.
	* @param {eslint-scope.Variable[]} variables Variables to group by destructuring.
	* @param {boolean} ignoreReadBeforeAssign
	*      The value of `ignoreReadBeforeAssign` option.
	* @returns {Map<ASTNode, ASTNode[]>} Grouped identifier nodes.
	*/
	function groupByDestructuring(variables, ignoreReadBeforeAssign) {
		let identifierMap = /* @__PURE__ */ new Map();
		for (let i = 0; i < variables.length; ++i) {
			let variable = variables[i], references = variable.references, identifier = getIdentifierIfShouldBeConst(variable, ignoreReadBeforeAssign), prevId = null;
			for (let j = 0; j < references.length; ++j) {
				let reference = references[j], id = reference.identifier;
				if (id === prevId) continue;
				prevId = id;
				let group = getDestructuringHost(reference);
				group && (identifierMap.has(group) ? identifierMap.get(group).push(identifier) : identifierMap.set(group, [identifier]));
			}
		}
		return identifierMap;
	}
	/**
	* Finds the nearest parent of node with a given type.
	* @param {ASTNode} node The node to search from.
	* @param {string} type The type field of the parent node.
	* @param {Function} shouldStop A predicate that returns true if the traversal should stop, and false otherwise.
	* @returns {ASTNode} The closest ancestor with the specified type; null if no such ancestor exists.
	*/
	function findUp(node, type, shouldStop) {
		return !node || shouldStop(node) ? null : node.type === type ? node : findUp(node.parent, type, shouldStop);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				destructuring: "any",
				ignoreReadBeforeAssign: !1
			}],
			docs: {
				description: "Require `const` declarations for variables that are never reassigned after declared",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/prefer-const"
			},
			fixable: "code",
			schema: [{
				type: "object",
				properties: {
					destructuring: { enum: ["any", "all"] },
					ignoreReadBeforeAssign: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: { useConst: "'{{name}}' is never reassigned. Use 'const' instead." }
		},
		create(context) {
			let [{ destructuring, ignoreReadBeforeAssign }] = context.options, shouldMatchAnyDestructuredVariable = destructuring !== "all", sourceCode = context.sourceCode, variables = [], reportCount = 0, checkedId = null, checkedName = "";
			/**
			* Reports given identifier nodes if all of the nodes should be declared
			* as const.
			*
			* The argument 'nodes' is an array of Identifier nodes.
			* This node is the result of 'getIdentifierIfShouldBeConst()', so it's
			* nullable. In simple declaration or assignment cases, the length of
			* the array is 1. In destructuring cases, the length of the array can
			* be 2 or more.
			* @param {(eslint-scope.Reference|null)[]} nodes
			*      References which are grouped by destructuring to report.
			* @returns {void}
			*/
			function checkGroup(nodes) {
				let nodesToReport = nodes.filter(Boolean);
				if (nodes.length && (shouldMatchAnyDestructuredVariable || nodesToReport.length === nodes.length)) {
					let varDeclParent = findUp(nodes[0], "VariableDeclaration", (parentNode) => parentNode.type.endsWith("Statement")), isVarDecParentNull = varDeclParent === null;
					if (!isVarDecParentNull && varDeclParent.declarations.length > 0) {
						let firstDeclaration = varDeclParent.declarations[0];
						if (firstDeclaration.init) {
							let firstDecParent = firstDeclaration.init.parent;
							firstDecParent.type === "VariableDeclarator" && (firstDecParent.id.name !== checkedName && (checkedName = firstDecParent.id.name, reportCount = 0), firstDecParent.id.type === "ObjectPattern" && firstDecParent.init.name !== checkedName && (checkedName = firstDecParent.init.name, reportCount = 0), firstDecParent.id !== checkedId && (checkedId = firstDecParent.id, reportCount = 0));
						}
					}
					let shouldFix = varDeclParent && (varDeclParent.parent.type === "ForInStatement" || varDeclParent.parent.type === "ForOfStatement" || varDeclParent.declarations.every((declaration) => declaration.init)) && nodesToReport.length === nodes.length;
					if (!isVarDecParentNull && varDeclParent.declarations && varDeclParent.declarations.length !== 1 && varDeclParent && varDeclParent.declarations && varDeclParent.declarations.length >= 1) {
						reportCount += nodesToReport.length;
						let totalDeclarationsCount = 0;
						varDeclParent.declarations.forEach((declaration) => {
							declaration.id.type === "ObjectPattern" ? totalDeclarationsCount += declaration.id.properties.length : declaration.id.type === "ArrayPattern" ? totalDeclarationsCount += declaration.id.elements.length : totalDeclarationsCount += 1;
						}), shouldFix &&= reportCount === totalDeclarationsCount;
					}
					nodesToReport.forEach((node) => {
						context.report({
							node,
							messageId: "useConst",
							data: node,
							fix: shouldFix ? (fixer) => {
								let letKeywordToken = sourceCode.getFirstToken(varDeclParent, (t) => t.value === varDeclParent.kind);
								/**
								* Extend the replacement range to the whole declaration,
								* in order to prevent other fixes in the same pass
								* https://github.com/eslint/eslint/issues/13899
								*/
								return new FixTracker(fixer, sourceCode).retainRange(varDeclParent.range).replaceTextRange(letKeywordToken.range, "const");
							} : null
						});
					});
				}
			}
			return {
				"Program:exit"() {
					groupByDestructuring(variables, ignoreReadBeforeAssign).forEach(checkGroup);
				},
				VariableDeclaration(node) {
					node.kind === "let" && !isInitOfForStatement(node) && variables.push(...sourceCode.getDeclaredVariables(node));
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/prefer-const.cjs
module.exports = require_prefer_const().create;
//#endregion
