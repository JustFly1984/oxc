const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unused-vars.js
/**
* @fileoverview Rule to flag declared but unused variables
* @author Ilya Volodin
*/
var require_no_unused_vars = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* A simple name for the types of variables that this rule supports
	* @typedef {'array-destructure'|'catch-clause'|'parameter'|'variable'} VariableType
	*/
	/**
	* Bag of data used for formatting the `unusedVar` lint message.
	* @typedef {Object} UnusedVarMessageData
	* @property {string} varName The name of the unused var.
	* @property {'defined'|'assigned a value'} action Description of the vars state.
	* @property {string} additional Any additional info to be appended at the end.
	*/
	/**
	* Bag of data used for formatting the `usedIgnoredVar` lint message.
	* @typedef {Object} UsedIgnoredVarMessageData
	* @property {string} varName The name of the unused var.
	* @property {string} additional Any additional info to be appended at the end.
	*/
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow unused variables",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-unused-vars"
			},
			hasSuggestions: !0,
			schema: [{ oneOf: [{ enum: ["all", "local"] }, {
				type: "object",
				properties: {
					vars: { enum: ["all", "local"] },
					varsIgnorePattern: { type: "string" },
					args: { enum: [
						"all",
						"after-used",
						"none"
					] },
					ignoreRestSiblings: { type: "boolean" },
					argsIgnorePattern: { type: "string" },
					caughtErrors: { enum: ["all", "none"] },
					caughtErrorsIgnorePattern: { type: "string" },
					destructuredArrayIgnorePattern: { type: "string" },
					ignoreClassWithStaticInitBlock: { type: "boolean" },
					ignoreUsingDeclarations: { type: "boolean" },
					reportUsedIgnorePattern: { type: "boolean" }
				},
				additionalProperties: !1
			}] }],
			messages: {
				unusedVar: "'{{varName}}' is {{action}} but never used{{additional}}.",
				usedIgnoredVar: "'{{varName}}' is marked as ignored but is used{{additional}}.",
				removeVar: "Remove unused variable '{{varName}}'."
			}
		},
		create(context) {
			let sourceCode = context.sourceCode, REST_PROPERTY_TYPE = /^(?:RestElement|(?:Experimental)?RestProperty)$/u, config = {
				vars: "all",
				args: "after-used",
				ignoreRestSiblings: !1,
				caughtErrors: "all",
				ignoreClassWithStaticInitBlock: !1,
				ignoreUsingDeclarations: !1,
				reportUsedIgnorePattern: !1
			}, firstOption = context.options[0];
			firstOption && (typeof firstOption == "string" ? config.vars = firstOption : (config.vars = firstOption.vars || config.vars, config.args = firstOption.args || config.args, config.ignoreRestSiblings = firstOption.ignoreRestSiblings || config.ignoreRestSiblings, config.caughtErrors = firstOption.caughtErrors || config.caughtErrors, config.ignoreClassWithStaticInitBlock = firstOption.ignoreClassWithStaticInitBlock || config.ignoreClassWithStaticInitBlock, config.ignoreUsingDeclarations = firstOption.ignoreUsingDeclarations || config.ignoreUsingDeclarations, config.reportUsedIgnorePattern = firstOption.reportUsedIgnorePattern || config.reportUsedIgnorePattern, firstOption.varsIgnorePattern && (config.varsIgnorePattern = new RegExp(firstOption.varsIgnorePattern, "u")), firstOption.argsIgnorePattern && (config.argsIgnorePattern = new RegExp(firstOption.argsIgnorePattern, "u")), firstOption.caughtErrorsIgnorePattern && (config.caughtErrorsIgnorePattern = new RegExp(firstOption.caughtErrorsIgnorePattern, "u")), firstOption.destructuredArrayIgnorePattern && (config.destructuredArrayIgnorePattern = new RegExp(firstOption.destructuredArrayIgnorePattern, "u"))));
			/**
			* Determines what variable type a def is.
			* @param  {Object} def the declaration to check
			* @returns {VariableType} a simple name for the types of variables that this rule supports
			*/
			function defToVariableType(def) {
				if (config.destructuredArrayIgnorePattern && def.name.parent.type === "ArrayPattern") return "array-destructure";
				switch (def.type) {
					case "CatchClause": return "catch-clause";
					case "Parameter": return "parameter";
					default: return "variable";
				}
			}
			/**
			* Gets a given variable's description and configured ignore pattern
			* based on the provided variableType
			* @param {VariableType} variableType a simple name for the types of variables that this rule supports
			* @throws {Error} (Unreachable)
			* @returns {[string | undefined, string | undefined]} the given variable's description and
			* ignore pattern
			*/
			function getVariableDescription(variableType) {
				let pattern, variableDescription;
				switch (variableType) {
					case "array-destructure":
						pattern = config.destructuredArrayIgnorePattern, variableDescription = "elements of array destructuring";
						break;
					case "catch-clause":
						pattern = config.caughtErrorsIgnorePattern, variableDescription = "caught errors";
						break;
					case "parameter":
						pattern = config.argsIgnorePattern, variableDescription = "args";
						break;
					case "variable":
						pattern = config.varsIgnorePattern, variableDescription = "vars";
						break;
					default: throw Error(`Unexpected variable type: ${variableType}`);
				}
				return pattern &&= pattern.toString(), [variableDescription, pattern];
			}
			/**
			* Generates the message data about the variable being defined and unused,
			* including the ignore pattern if configured.
			* @param {Variable} unusedVar eslint-scope variable object.
			* @returns {UnusedVarMessageData} The message data to be used with this unused variable.
			*/
			function getDefinedMessageData(unusedVar) {
				let def = unusedVar.defs && unusedVar.defs[0], additionalMessageData = "";
				if (def) {
					let [variableDescription, pattern] = getVariableDescription(defToVariableType(def));
					pattern && variableDescription && (additionalMessageData = `. Allowed unused ${variableDescription} must match ${pattern}`);
				}
				return {
					varName: unusedVar.name,
					action: "defined",
					additional: additionalMessageData
				};
			}
			/**
			* Generate the warning message about the variable being
			* assigned and unused, including the ignore pattern if configured.
			* @param {Variable} unusedVar eslint-scope variable object.
			* @returns {UnusedVarMessageData} The message data to be used with this unused variable.
			*/
			function getAssignedMessageData(unusedVar) {
				let def = unusedVar.defs && unusedVar.defs[0], additionalMessageData = "";
				if (def) {
					let [variableDescription, pattern] = getVariableDescription(defToVariableType(def));
					pattern && variableDescription && (additionalMessageData = `. Allowed unused ${variableDescription} must match ${pattern}`);
				}
				return {
					varName: unusedVar.name,
					action: "assigned a value",
					additional: additionalMessageData
				};
			}
			/**
			* Generate the warning message about a variable being used even though
			* it is marked as being ignored.
			* @param {Variable} variable eslint-scope variable object
			* @param {VariableType} variableType a simple name for the types of variables that this rule supports
			* @returns {UsedIgnoredVarMessageData} The message data to be used with
			* this used ignored variable.
			*/
			function getUsedIgnoredMessageData(variable, variableType) {
				let [variableDescription, pattern] = getVariableDescription(variableType), additionalMessageData = "";
				return pattern && variableDescription && (additionalMessageData = `. Used ${variableDescription} must not match ${pattern}`), {
					varName: variable.name,
					additional: additionalMessageData
				};
			}
			let STATEMENT_TYPE = /(?:Statement|Declaration)$/u;
			/**
			* Determines if a given variable is being exported from a module.
			* @param {Variable} variable eslint-scope variable object.
			* @returns {boolean} True if the variable is exported, false if not.
			* @private
			*/
			function isExported(variable) {
				let definition = variable.defs[0];
				if (definition) {
					let node = definition.node;
					if (node.type === "VariableDeclarator") node = node.parent;
					else if (definition.type === "Parameter") return !1;
					return node.parent.type.indexOf("Export") === 0;
				}
				return !1;
			}
			/**
			* Determines if a given variable uses the explicit resource management protocol.
			* @param {Variable} variable eslint-scope variable object.
			* @returns {boolean} True if the variable is declared with "using" or "await using"
			* @private
			*/
			function usesExplicitResourceManagement(variable) {
				let [definition] = variable.defs;
				return definition?.type === "Variable" && (definition.parent.kind === "using" || definition.parent.kind === "await using");
			}
			/**
			* Checks whether a node is a sibling of the rest property or not.
			* @param {ASTNode} node a node to check
			* @returns {boolean} True if the node is a sibling of the rest property, otherwise false.
			*/
			function hasRestSibling(node) {
				return node.type === "Property" && node.parent.type === "ObjectPattern" && REST_PROPERTY_TYPE.test(node.parent.properties.at(-1).type);
			}
			/**
			* Determines if a variable has a sibling rest property
			* @param {Variable} variable eslint-scope variable object.
			* @returns {boolean} True if the variable has a sibling rest property, false if not.
			* @private
			*/
			function hasRestSpreadSibling(variable) {
				if (config.ignoreRestSiblings) {
					let hasRestSiblingDefinition = variable.defs.some((def) => hasRestSibling(def.name.parent)), hasRestSiblingReference = variable.references.some((ref) => hasRestSibling(ref.identifier.parent));
					return hasRestSiblingDefinition || hasRestSiblingReference;
				}
				return !1;
			}
			/**
			* Determines if a reference is a read operation.
			* @param {Reference} ref An eslint-scope Reference
			* @returns {boolean} whether the given reference represents a read operation
			* @private
			*/
			function isReadRef(ref) {
				return ref.isRead();
			}
			/**
			* Determine if an identifier is referencing an enclosing function name.
			* @param {Reference} ref The reference to check.
			* @param {ASTNode[]} nodes The candidate function nodes.
			* @returns {boolean} True if it's a self-reference, false if not.
			* @private
			*/
			function isSelfReference(ref, nodes) {
				let scope = ref.from;
				for (; scope;) {
					if (nodes.includes(scope.block)) return !0;
					scope = scope.upper;
				}
				return !1;
			}
			/**
			* Gets a list of function definitions for a specified variable.
			* @param {Variable} variable eslint-scope variable object.
			* @returns {ASTNode[]} Function nodes.
			* @private
			*/
			function getFunctionDefinitions(variable) {
				let functionDefinitions = [];
				return variable.defs.forEach((def) => {
					let { type, node } = def;
					type === "FunctionName" && functionDefinitions.push(node), type === "Variable" && node.init && (node.init.type === "FunctionExpression" || node.init.type === "ArrowFunctionExpression") && functionDefinitions.push(node.init);
				}), functionDefinitions;
			}
			/**
			* Checks the position of given nodes.
			* @param {ASTNode} inner A node which is expected as inside.
			* @param {ASTNode} outer A node which is expected as outside.
			* @returns {boolean} `true` if the `inner` node exists in the `outer` node.
			* @private
			*/
			function isInside(inner, outer) {
				return inner.range[0] >= outer.range[0] && inner.range[1] <= outer.range[1];
			}
			/**
			* Checks whether a given node is unused expression or not.
			* @param {ASTNode} node The node itself
			* @returns {boolean} The node is an unused expression.
			* @private
			*/
			function isUnusedExpression(node) {
				let parent = node.parent;
				return parent.type === "ExpressionStatement" ? !0 : parent.type === "SequenceExpression" ? parent.expressions.at(-1) === node ? isUnusedExpression(parent) : !0 : !1;
			}
			/**
			* If a given reference is left-hand side of an assignment, this gets
			* the right-hand side node of the assignment.
			*
			* In the following cases, this returns null.
			*
			* - The reference is not the LHS of an assignment expression.
			* - The reference is inside of a loop.
			* - The reference is inside of a function scope which is different from
			*   the declaration.
			* @param {eslint-scope.Reference} ref A reference to check.
			* @param {ASTNode} prevRhsNode The previous RHS node.
			* @returns {ASTNode|null} The RHS node or null.
			* @private
			*/
			function getRhsNode(ref, prevRhsNode) {
				let id = ref.identifier, parent = id.parent, canBeUsedLater = ref.from.variableScope !== ref.resolved.scope.variableScope || astUtils.isInLoop(id);
				return prevRhsNode && isInside(id, prevRhsNode) ? prevRhsNode : parent.type === "AssignmentExpression" && isUnusedExpression(parent) && id === parent.left && !canBeUsedLater ? parent.right : null;
			}
			/**
			* Checks whether a given function node is stored to somewhere or not.
			* If the function node is stored, the function can be used later.
			* @param {ASTNode} funcNode A function node to check.
			* @param {ASTNode} rhsNode The RHS node of the previous assignment.
			* @returns {boolean} `true` if under the following conditions:
			*      - the funcNode is assigned to a variable.
			*      - the funcNode is bound as an argument of a function call.
			*      - the function is bound to a property and the object satisfies above conditions.
			* @private
			*/
			function isStorableFunction(funcNode, rhsNode) {
				let node = funcNode, parent = funcNode.parent;
				for (; parent && isInside(parent, rhsNode);) {
					switch (parent.type) {
						case "SequenceExpression":
							if (parent.expressions.at(-1) !== node) return !1;
							break;
						case "CallExpression":
						case "NewExpression": return parent.callee !== node;
						case "AssignmentExpression":
						case "TaggedTemplateExpression":
						case "YieldExpression": return !0;
						default: if (STATEMENT_TYPE.test(parent.type)) return !0;
					}
					node = parent, parent = parent.parent;
				}
				return !1;
			}
			/**
			* Checks whether a given Identifier node exists inside of a function node which can be used later.
			*
			* "can be used later" means:
			* - the function is assigned to a variable.
			* - the function is bound to a property and the object can be used later.
			* - the function is bound as an argument of a function call.
			*
			* If a reference exists in a function which can be used later, the reference is read when the function is called.
			* @param {ASTNode} id An Identifier node to check.
			* @param {ASTNode} rhsNode The RHS node of the previous assignment.
			* @returns {boolean} `true` if the `id` node exists inside of a function node which can be used later.
			* @private
			*/
			function isInsideOfStorableFunction(id, rhsNode) {
				let funcNode = astUtils.getUpperFunction(id);
				return funcNode && isInside(funcNode, rhsNode) && isStorableFunction(funcNode, rhsNode);
			}
			/**
			* Checks whether a given reference is a read to update itself or not.
			* @param {eslint-scope.Reference} ref A reference to check.
			* @param {ASTNode} rhsNode The RHS node of the previous assignment.
			* @returns {boolean} The reference is a read to update itself.
			* @private
			*/
			function isReadForItself(ref, rhsNode) {
				let id = ref.identifier, parent = id.parent;
				return ref.isRead() && (parent.type === "AssignmentExpression" && parent.left === id && isUnusedExpression(parent) && !astUtils.isLogicalAssignmentOperator(parent.operator) || parent.type === "UpdateExpression" && isUnusedExpression(parent) || rhsNode && isInside(id, rhsNode) && !isInsideOfStorableFunction(id, rhsNode));
			}
			/**
			* Determine if an identifier is used either in for-in or for-of loops.
			* @param {Reference} ref The reference to check.
			* @returns {boolean} whether reference is used in the for-in loops
			* @private
			*/
			function isForInOfRef(ref) {
				let target = ref.identifier.parent;
				return target.type === "VariableDeclarator" && (target = target.parent.parent), target.type !== "ForInStatement" && target.type !== "ForOfStatement" || (target = target.body.type === "BlockStatement" ? target.body.body[0] : target.body, !target) ? !1 : target.type === "ReturnStatement";
			}
			/**
			* Determines if the variable is used.
			* @param {Variable} variable The variable to check.
			* @returns {boolean} True if the variable is used
			* @private
			*/
			function isUsedVariable(variable) {
				if (variable.eslintUsed) return !0;
				let functionNodes = getFunctionDefinitions(variable), isFunctionDefinition = functionNodes.length > 0, rhsNode = null;
				return variable.references.some((ref) => {
					if (isForInOfRef(ref)) return !0;
					let forItself = isReadForItself(ref, rhsNode);
					return rhsNode = getRhsNode(ref, rhsNode), isReadRef(ref) && !forItself && !(isFunctionDefinition && isSelfReference(ref, functionNodes));
				});
			}
			/**
			* Checks whether the given variable is after the last used parameter.
			* @param {eslint-scope.Variable} variable The variable to check.
			* @returns {boolean} `true` if the variable is defined after the last
			* used parameter.
			*/
			function isAfterLastUsedArg(variable) {
				let def = variable.defs[0], params = sourceCode.getDeclaredVariables(def.node);
				return !params.slice(params.indexOf(variable) + 1).some((v) => v.references.length > 0 || v.eslintUsed);
			}
			/**
			* Gets an array of variables without read references.
			* @param {Scope} scope an eslint-scope Scope object.
			* @param {Variable[]} unusedVars an array that saving result.
			* @returns {Variable[]} unused variables of the scope and descendant scopes.
			* @private
			*/
			function collectUnusedVariables(scope, unusedVars) {
				let variables = scope.variables, childScopes = scope.childScopes, i, l;
				if (scope.type !== "global" || config.vars === "all") for (i = 0, l = variables.length; i < l; ++i) {
					let variable = variables[i];
					if (scope.type === "class" && scope.block.id === variable.identifiers[0] || scope.functionExpressionScope || !config.reportUsedIgnorePattern && variable.eslintUsed || scope.type === "function" && variable.name === "arguments" && variable.identifiers.length === 0) continue;
					let def = variable.defs[0];
					if (def) {
						let type = def.type, refUsedInArrayPatterns = variable.references.some((ref) => ref.identifier.parent.type === "ArrayPattern");
						if ((def.name.parent.type === "ArrayPattern" || refUsedInArrayPatterns) && config.destructuredArrayIgnorePattern && config.destructuredArrayIgnorePattern.test(def.name.name)) {
							config.reportUsedIgnorePattern && isUsedVariable(variable) && context.report({
								node: def.name,
								messageId: "usedIgnoredVar",
								data: getUsedIgnoredMessageData(variable, "array-destructure")
							});
							continue;
						}
						if (type === "ClassName") {
							let hasStaticBlock = def.node.body.body.some((node) => node.type === "StaticBlock");
							if (config.ignoreClassWithStaticInitBlock && hasStaticBlock) continue;
						}
						if (type === "CatchClause") {
							if (config.caughtErrors === "none") continue;
							if (config.caughtErrorsIgnorePattern && config.caughtErrorsIgnorePattern.test(def.name.name)) {
								config.reportUsedIgnorePattern && isUsedVariable(variable) && context.report({
									node: def.name,
									messageId: "usedIgnoredVar",
									data: getUsedIgnoredMessageData(variable, "catch-clause")
								});
								continue;
							}
						} else if (type === "Parameter") {
							if ((def.node.parent.type === "Property" || def.node.parent.type === "MethodDefinition") && def.node.parent.kind === "set" || config.args === "none") continue;
							if (config.argsIgnorePattern && config.argsIgnorePattern.test(def.name.name)) {
								config.reportUsedIgnorePattern && isUsedVariable(variable) && context.report({
									node: def.name,
									messageId: "usedIgnoredVar",
									data: getUsedIgnoredMessageData(variable, "parameter")
								});
								continue;
							}
							if (config.args === "after-used" && astUtils.isFunction(def.name.parent) && !isAfterLastUsedArg(variable)) continue;
						} else if (config.varsIgnorePattern && config.varsIgnorePattern.test(def.name.name)) {
							config.reportUsedIgnorePattern && isUsedVariable(variable) && context.report({
								node: def.name,
								messageId: "usedIgnoredVar",
								data: getUsedIgnoredMessageData(variable, "variable")
							});
							continue;
						}
					}
					!isUsedVariable(variable) && !isExported(variable) && !(config.ignoreUsingDeclarations && usesExplicitResourceManagement(variable)) && !hasRestSpreadSibling(variable) && unusedVars.push(variable);
				}
				for (i = 0, l = childScopes.length; i < l; ++i) collectUnusedVariables(childScopes[i], unusedVars);
				return unusedVars;
			}
			/**
			* fixes unused variables
			* @param {Object} fixer fixer object
			* @param {Object} unusedVar unused variable to fix
			* @returns {Object} fixer object
			*/
			function handleFixes(fixer, unusedVar) {
				let id = unusedVar.identifiers[0], parent = id.parent, parentType = parent.type, tokenBefore = sourceCode.getTokenBefore(id), tokenAfter = sourceCode.getTokenAfter(id), isFunction = astUtils.isFunction, isLoop = astUtils.isLoop, allWriteReferences = unusedVar.references.filter((ref) => ref.isWrite());
				/**
				* get range from token before of a given node
				* @param {ASTNode} node node of identifier
				* @param {number} skips number of token to skip
				* @returns {number} start range of token before the identifier
				*/
				function getPreviousTokenStart(node, skips) {
					return sourceCode.getTokenBefore(node, skips).range[0];
				}
				/**
				* get range to token after of a given node
				* @param {ASTNode} node node of identifier
				* @param {number} skips number of token to skip
				* @returns {number} end range of token after the identifier
				*/
				function getNextTokenEnd(node, skips) {
					return sourceCode.getTokenAfter(node, skips).range[1];
				}
				/**
				* get the value of token before of a given node
				* @param {ASTNode} node node of identifier
				* @returns {string} value of token before the identifier
				*/
				function getTokenBeforeValue(node) {
					return sourceCode.getTokenBefore(node).value;
				}
				/**
				* get the value of token after of a given node
				* @param {ASTNode} node node of identifier
				* @returns {string} value of token after the identifier
				*/
				function getTokenAfterValue(node) {
					return sourceCode.getTokenAfter(node).value;
				}
				/**
				* Check if an array has a single element with null as other element.
				* @param {ASTNode} node ArrayPattern node
				* @returns {boolean} true if array has single element with other null elements
				*/
				function hasSingleElement(node) {
					return node.elements.filter((e) => e !== null).length === 1;
				}
				/**
				* check whether import specifier has an import of particular type
				* @param {ASTNode} node ImportDeclaration node
				* @param {string} type type of import to check
				* @returns {boolean} true if import specifier has import of specified type
				*/
				function hasImportOfCertainType(node, type) {
					return node.specifiers.some((e) => e.type === type);
				}
				/**
				* Check whether declaration is safe to remove or not
				* @param {ASTNode} nextToken next token of unused variable
				* @param {ASTNode} prevToken previous token of unused variable
				* @returns {boolean} true if declaration is not safe to remove
				*/
				function isDeclarationNotSafeToRemove(nextToken, prevToken) {
					return nextToken.type === "String" || prevToken && !astUtils.isSemicolonToken(prevToken) && !astUtils.isOpeningBraceToken(prevToken);
				}
				/**
				* give fixes for unused variables in function parameters
				* @param {ASTNode} node node to check
				* @returns {Object} fixer object
				*/
				function fixFunctionParameters(node) {
					let parentNode = node.parent;
					return isFunction(parentNode) ? parentNode.params.length === 1 ? fixer.removeRange(node.range) : getTokenBeforeValue(node) === "(" && getTokenAfterValue(node) === "," ? fixer.removeRange([node.range[0], getNextTokenEnd(node)]) : fixer.removeRange([getPreviousTokenStart(node), node.range[1]]) : null;
				}
				/**
				* fix unused variable declarations and function parameters
				* @param {ASTNode} node parent node to identifier
				* @returns {Object} fixer object
				*/
				function fixVariables(node) {
					let parentNode = node.parent;
					if (parentNode.type === "VariableDeclarator") {
						if (isLoop(parentNode.parent.parent)) return null;
						if (parentNode.parent.declarations.length === 1) {
							let nextToken = sourceCode.getTokenAfter(parentNode.parent), prevToken = sourceCode.getTokenBefore(parentNode.parent);
							return nextToken && isDeclarationNotSafeToRemove(nextToken, prevToken) ? null : fixer.removeRange(parentNode.parent.range);
						}
						return getTokenBeforeValue(parentNode) === "," ? fixer.removeRange([getPreviousTokenStart(parentNode), parentNode.range[1]]) : fixer.removeRange([parentNode.range[0], getNextTokenEnd(parentNode)]);
					}
					return getTokenBeforeValue(node) === ":" && parentNode.parent.type === "ObjectPattern" ? fixObjectWithValueSeparator(node) : fixFunctionParameters(node);
				}
				/**
				* fix nested object like { a: { b } }
				* @param {ASTNode} node parent node to check
				* @returns {Object} fixer object
				*/
				function fixNestedObjectVariable(node) {
					let parentNode = node.parent;
					return parentNode.parent.parent.parent.type === "ObjectPattern" && parentNode.parent.properties.length === 1 ? fixNestedObjectVariable(parentNode.parent) : parentNode.parent.type === "ObjectPattern" ? parentNode.parent.properties.length === 1 ? fixVariables(parentNode.parent) : getTokenBeforeValue(parentNode) === "{" ? fixer.removeRange([parentNode.range[0], getNextTokenEnd(parentNode)]) : fixer.removeRange([getPreviousTokenStart(parentNode), parentNode.range[1]]) : null;
				}
				/**
				* fix unused variables in array and nested array
				* @param {ASTNode} node parent node to check
				* @returns {Object} fixer object
				*/
				function fixNestedArrayVariable(node) {
					let parentNode = node.parent;
					return parentNode.parent.type === "ArrayPattern" && hasSingleElement(parentNode) ? fixNestedArrayVariable(parentNode) : hasSingleElement(parentNode) ? getTokenBeforeValue(parentNode) === ":" ? fixVariables(parentNode) : parentNode.parent.type === "RestElement" ? fixRestInPattern(parentNode.parent) : fixVariables(parentNode) : getTokenBeforeValue(node) === "," && getTokenAfterValue(node) === "]" ? fixer.removeRange([getPreviousTokenStart(node), node.range[1]]) : fixer.removeRange(node.range);
				}
				/**
				* fix cases like {a: {k}} or {a: [k]}
				* @param {ASTNode} node parent node to check
				* @returns {Object} fixer object
				*/
				function fixObjectWithValueSeparator(node) {
					let parentNode = node.parent.parent;
					return parentNode.parent.type === "ArrayPattern" && parentNode.properties.length === 1 ? fixNestedArrayVariable(parentNode) : fixNestedObjectVariable(node);
				}
				/**
				* fix ...[[a]] or ...[{a}] like patterns
				* @param {ASTNode} node parent node to check
				* @returns {Object} fixer object
				*/
				function fixRestInPattern(node) {
					let parentNode = node.parent;
					return isFunction(parentNode) ? parentNode.params.length === 1 ? fixer.removeRange(node.range) : fixer.removeRange([getPreviousTokenStart(node), node.range[1]]) : parentNode.type === "ArrayPattern" ? hasSingleElement(parentNode) ? parentNode.parent.type === "ArrayPattern" ? fixNestedArrayVariable(parentNode) : fixVariables(parentNode) : fixer.removeRange([getPreviousTokenStart(node), node.range[1]]) : null;
				}
				if (allWriteReferences.some((ref) => ref.identifier.range[0] !== id.range[0])) return null;
				if (parentType === "VariableDeclarator") {
					if (parent.parent.declarations.length === 1) {
						if (isLoop(parent.parent.parent) && parent.parent.parent.body !== parent.parent) return null;
						if (parent.parent.parent.type === "IfStatement" || isLoop(parent.parent.parent) || parent.parent.parent.type === "WithStatement" && parent.parent.parent.body === parent.parent) return fixer.replaceText(parent.parent, ";");
						let nextToken = sourceCode.getTokenAfter(parent.parent), prevToken = sourceCode.getTokenBefore(parent.parent);
						return nextToken && isDeclarationNotSafeToRemove(nextToken, prevToken) ? null : fixer.removeRange(parent.parent.range);
					}
					return tokenBefore.value === "," ? fixer.removeRange([tokenBefore.range[0], parent.range[1]]) : fixer.removeRange([parent.range[0], getNextTokenEnd(parent)]);
				}
				if (parent.parent.type === "ObjectPattern") {
					if (parent.parent.properties.length === 1) return parent.parent.parent.type === "RestElement" ? fixRestInPattern(parent.parent.parent) : parent.parent.parent.type === "ArrayPattern" ? fixNestedArrayVariable(parent.parent) : fixVariables(parent.parent);
					if (tokenBefore.value === ":") return getTokenBeforeValue(parent) === "{" && getTokenAfterValue(parent) === "," ? fixer.removeRange([parent.range[0], getNextTokenEnd(parent)]) : fixer.removeRange([getPreviousTokenStart(parent), id.range[1]]);
				}
				if (parentType === "ArrayPattern") {
					if (hasSingleElement(parent)) return parent.parent.type === "RestElement" ? fixRestInPattern(parent.parent) : parent.parent.type === "ArrayPattern" ? fixNestedArrayVariable(parent) : fixVariables(parent);
					if (tokenBefore.value === "," && tokenAfter.value === ",") return fixer.removeRange(id.range);
				}
				if (parentType === "RestElement") {
					if (parent.parent.type === "ArrayPattern") return hasSingleElement(parent.parent) ? parent.parent.parent.type === "ArrayPattern" ? fixNestedArrayVariable(parent.parent) : fixVariables(parent.parent) : fixer.removeRange([getPreviousTokenStart(id, 1), id.range[1]]);
					if (parent.parent.type === "ObjectPattern") return parent.parent.properties.length === 1 ? fixVariables(parent.parent) : fixer.removeRange([getPreviousTokenStart(id, 1), id.range[1]]);
					if (isFunction(parent.parent)) return parent.parent.params.length === 1 ? fixer.removeRange(parent.range) : fixer.removeRange([getPreviousTokenStart(parent), parent.range[1]]);
				}
				if (parentType === "AssignmentPattern") {
					if (parent.parent.type === "ArrayPattern") return fixNestedArrayVariable(parent);
					if (parent.parent.parent.type === "ObjectPattern") return parent.parent.parent.properties.length === 1 ? parent.parent.parent.parent.type === "ArrayPattern" ? fixNestedArrayVariable(parent.parent.parent) : fixVariables(parent.parent.parent) : getTokenBeforeValue(parent.parent) === "{" && getTokenAfterValue(parent.parent) === "," ? fixer.removeRange([parent.parent.range[0], getNextTokenEnd(parent.parent)]) : fixer.removeRange([getPreviousTokenStart(parent.parent), parent.parent.range[1]]);
					if (isFunction(parent.parent)) return fixFunctionParameters(parent);
				}
				return parentType === "FunctionDeclaration" && parent.id === id ? fixer.removeRange(parent.range) : parentType === "ImportDefaultSpecifier" ? !hasImportOfCertainType(parent.parent, "ImportSpecifier") && !hasImportOfCertainType(parent.parent, "ImportNamespaceSpecifier") ? fixer.removeRange([parent.range[0], parent.parent.source.range[0]]) : fixer.removeRange([id.range[0], tokenAfter.range[1]]) : parentType === "ImportSpecifier" ? parent.parent.specifiers.filter((e) => e.type === "ImportSpecifier").length === 1 ? hasImportOfCertainType(parent.parent, "ImportDefaultSpecifier") ? fixer.removeRange([getPreviousTokenStart(parent, 1), tokenAfter.range[1]]) : fixer.removeRange(parent.parent.range) : getTokenBeforeValue(parent) === "{" ? fixer.removeRange([parent.range[0], getNextTokenEnd(parent)]) : fixer.removeRange([getPreviousTokenStart(parent), parent.range[1]]) : parentType === "ImportNamespaceSpecifier" ? hasImportOfCertainType(parent.parent, "ImportDefaultSpecifier") ? fixer.removeRange([getPreviousTokenStart(parent), parent.range[1]]) : fixer.removeRange([parent.range[0], parent.parent.source.range[0]]) : parentType === "CatchClause" ? null : parentType === "ClassDeclaration" ? fixer.removeRange(parent.range) : tokenBefore?.value === "," ? fixer.removeRange([tokenBefore.range[0], id.range[1]]) : tokenAfter.value === "," && (tokenBefore.value === "(" || tokenBefore.value === "{") ? fixer.removeRange([id.range[0], tokenAfter.range[1]]) : parentType === "ArrowFunctionExpression" && parent.params.length === 1 && tokenAfter?.value !== ")" ? fixer.replaceText(id, "()") : fixer.removeRange(id.range);
			}
			return { "Program:exit"(programNode) {
				let unusedVars = collectUnusedVariables(sourceCode.getScope(programNode), []);
				for (let i = 0, l = unusedVars.length; i < l; ++i) {
					let unusedVar = unusedVars[i];
					if (unusedVar.defs.length > 0) {
						let writeReferences = unusedVar.references.filter((ref) => ref.isWrite() && ref.from.variableScope === unusedVar.scope.variableScope), referenceToReport;
						writeReferences.length > 0 && (referenceToReport = writeReferences.at(-1)), context.report({
							node: referenceToReport ? referenceToReport.identifier : unusedVar.identifiers[0],
							messageId: "unusedVar",
							data: unusedVar.references.some((ref) => ref.isWrite()) ? getAssignedMessageData(unusedVar) : getDefinedMessageData(unusedVar),
							suggest: [{
								messageId: "removeVar",
								data: { varName: unusedVar.name },
								fix(fixer) {
									return handleFixes(fixer, unusedVar);
								}
							}]
						});
					} else if (unusedVar.eslintExplicitGlobalComments) {
						let directiveComment = unusedVar.eslintExplicitGlobalComments[0];
						context.report({
							node: programNode,
							loc: astUtils.getNameLocationInGlobalDirectiveComment(sourceCode, directiveComment, unusedVar.name),
							messageId: "unusedVar",
							data: getDefinedMessageData(unusedVar)
						});
					}
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unused-vars.cjs
module.exports = require_no_unused_vars().create;
//#endregion
