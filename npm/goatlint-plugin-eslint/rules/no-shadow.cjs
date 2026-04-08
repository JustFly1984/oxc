const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-shadow.js
/**
* @fileoverview Rule to flag on declaring variables already declared in the outer scope
* @author Ilya Volodin
*/
var require_no_shadow = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), FUNC_EXPR_NODE_TYPES = new Set(["ArrowFunctionExpression", "FunctionExpression"]), CALL_EXPR_NODE_TYPE = new Set(["CallExpression"]), FOR_IN_OF_TYPE = /^For(?:In|Of)Statement$/u, SENTINEL_TYPE = /^(?:(?:Function|Class)(?:Declaration|Expression)|ArrowFunctionExpression|CatchClause|ImportDeclaration|ExportNamedDeclaration)$/u, TYPES_HOISTED_NODES = new Set(["TSInterfaceDeclaration", "TSTypeAliasDeclaration"]), ALLOWED_FUNCTION_VARIABLE_DEF_TYPES = new Set([
		"TSCallSignatureDeclaration",
		"TSFunctionType",
		"TSMethodSignature",
		"TSEmptyBodyFunctionExpression",
		"TSDeclareFunction",
		"TSConstructSignatureDeclaration",
		"TSConstructorType"
	]);
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			dialects: ["typescript", "javascript"],
			language: "javascript",
			defaultOptions: [{
				allow: [],
				builtinGlobals: !1,
				hoist: "functions",
				ignoreOnInitialization: !1,
				ignoreTypeValueShadow: !0,
				ignoreFunctionTypeParameterNameValueShadow: !0
			}],
			docs: {
				description: "Disallow variable declarations from shadowing variables declared in the outer scope",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-shadow"
			},
			schema: [{
				type: "object",
				properties: {
					builtinGlobals: { type: "boolean" },
					hoist: { enum: [
						"all",
						"functions",
						"never",
						"types",
						"functions-and-types"
					] },
					allow: {
						type: "array",
						items: { type: "string" }
					},
					ignoreOnInitialization: { type: "boolean" },
					ignoreTypeValueShadow: { type: "boolean" },
					ignoreFunctionTypeParameterNameValueShadow: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: {
				noShadow: "'{{name}}' is already declared in the upper scope on line {{shadowedLine}} column {{shadowedColumn}}.",
				noShadowGlobal: "'{{name}}' is already a global variable."
			}
		},
		create(context) {
			let [{ builtinGlobals, hoist, allow, ignoreOnInitialization, ignoreTypeValueShadow, ignoreFunctionTypeParameterNameValueShadow }] = context.options, sourceCode = context.sourceCode;
			/**
			* Check if a scope is a TypeScript module augmenting the global namespace.
			* @param {Scope} scope The scope to check
			* @returns {boolean} Whether the scope is a global augmentation
			*/
			function isGlobalAugmentation(scope) {
				return scope.block.kind === "global" || !!scope.upper && isGlobalAugmentation(scope.upper);
			}
			/**
			* Check if variable is a `this` parameter.
			* @param {Object} variable The variable to check
			* @returns {boolean} Whether the variable is a this parameter
			*/
			function isThisParam(variable) {
				return variable.name === "this";
			}
			/**
			* Checks if type and value shadows each other
			* @param {Object} variable The variable to check
			* @param {Object} shadowedVariable The shadowed variable
			* @returns {boolean} Whether it's a type/value shadow case to ignore
			*/
			function isTypeValueShadow(variable, shadowedVariable) {
				if (ignoreTypeValueShadow !== !0 || !("isValueVariable" in variable)) return !1;
				let firstDefinition = shadowedVariable.defs[0], isTypeImport = firstDefinition && firstDefinition.parent?.type === "ImportDeclaration" && (firstDefinition.parent.importKind === "type" || firstDefinition.parent.specifiers.some((s) => s.importKind === "type")), isShadowedValue = !firstDefinition || (isTypeImport ? !1 : shadowedVariable.isValueVariable);
				return variable.isValueVariable !== isShadowedValue;
			}
			/**
			* Checks if it's a function type parameter shadow
			* @param {Object} variable The variable to check
			* @returns {boolean} Whether it's a function type parameter shadow case to ignore
			*/
			function isFunctionTypeParameterNameValueShadow(variable) {
				return ignoreFunctionTypeParameterNameValueShadow === !0 ? variable.defs.some((def) => ALLOWED_FUNCTION_VARIABLE_DEF_TYPES.has(def.node.type)) : !1;
			}
			/**
			* Checks if the variable is a generic of a static method
			* @param {Object} variable The variable to check
			* @returns {boolean} Whether the variable is a generic of a static method
			*/
			function isTypeParameterOfStaticMethod(variable) {
				let typeParameterDecl = variable.identifiers[0].parent.parent;
				return typeParameterDecl.type === "TSTypeParameterDeclaration" ? typeParameterDecl.parent.parent.static : !1;
			}
			/**
			* Checks for static method generic shadowing class generic
			* @param {Object} variable The variable to check
			* @returns {boolean} Whether it's a static method generic shadowing class generic
			*/
			function isGenericOfAStaticMethodShadow(variable) {
				return isTypeParameterOfStaticMethod(variable);
			}
			/**
			* Checks whether or not a given location is inside of the range of a given node.
			* @param {ASTNode} node An node to check.
			* @param {number} location A location to check.
			* @returns {boolean} `true` if the location is inside of the range of the node.
			*/
			function isInRange(node, location) {
				return node && node.range[0] <= location && location <= node.range[1];
			}
			/**
			* Searches from the current node through its ancestry to find a matching node.
			* @param {ASTNode} node a node to get.
			* @param {(node: ASTNode) => boolean} match a callback that checks whether or not the node verifies its condition or not.
			* @returns {ASTNode|null} the matching node.
			*/
			function findSelfOrAncestor(node, match) {
				let currentNode = node;
				for (; currentNode && !match(currentNode);) currentNode = currentNode.parent;
				return currentNode;
			}
			/**
			* Finds function's outer scope.
			* @param {Scope} scope Function's own scope.
			* @returns {Scope} Function's outer scope.
			*/
			function getOuterScope(scope) {
				let upper = scope.upper;
				return upper && upper.type === "function-expression-name" ? upper.upper : upper;
			}
			/**
			* Checks if a variable and a shadowedVariable have the same init pattern ancestor.
			* @param {Object} variable a variable to check.
			* @param {Object} shadowedVariable a shadowedVariable to check.
			* @returns {boolean} Whether or not the variable and the shadowedVariable have the same init pattern ancestor.
			*/
			function isInitPatternNode(variable, shadowedVariable) {
				let outerDef = shadowedVariable.defs[0];
				if (!outerDef) return !1;
				let { variableScope } = variable.scope;
				if (!(FUNC_EXPR_NODE_TYPES.has(variableScope.block.type) && getOuterScope(variableScope) === shadowedVariable.scope)) return !1;
				let { parent } = variableScope.block, callExpression = findSelfOrAncestor(parent, (node) => CALL_EXPR_NODE_TYPE.has(node.type));
				if (!callExpression) return !1;
				let node = outerDef.name, location = callExpression.range[1];
				for (; node;) {
					if (node.type === "VariableDeclarator") {
						if (isInRange(node.init, location) || FOR_IN_OF_TYPE.test(node.parent.parent.type) && isInRange(node.parent.parent.right, location)) return !0;
						break;
					} else if (node.type === "AssignmentPattern") {
						if (isInRange(node.right, location)) return !0;
					} else if (SENTINEL_TYPE.test(node.type)) break;
					node = node.parent;
				}
				return !1;
			}
			/**
			* Check if variable name is allowed.
			* @param {ASTNode} variable The variable to check.
			* @returns {boolean} Whether or not the variable name is allowed.
			*/
			function isAllowed(variable) {
				return allow.includes(variable.name);
			}
			/**
			* Checks if a variable of the class name in the class scope of ClassDeclaration.
			*
			* ClassDeclaration creates two variables of its name into its outer scope and its class scope.
			* So we should ignore the variable in the class scope.
			* @param {Object} variable The variable to check.
			* @returns {boolean} Whether or not the variable of the class name in the class scope of ClassDeclaration.
			*/
			function isDuplicatedClassNameVariable(variable) {
				let block = variable.scope.block;
				return block.type === "ClassDeclaration" && block.id === variable.identifiers[0];
			}
			/**
			* Checks if a variable is inside the initializer of scopeVar.
			*
			* To avoid reporting at declarations such as `var a = function a() {};`.
			* But it should report `var a = function(a) {};` or `var a = function() { function a() {} };`.
			* @param {Object} variable The variable to check.
			* @param {Object} scopeVar The scope variable to look for.
			* @returns {boolean} Whether or not the variable is inside initializer of scopeVar.
			*/
			function isOnInitializer(variable, scopeVar) {
				let outerScope = scopeVar.scope, outerDef = scopeVar.defs[0], outer = outerDef && outerDef.parent && outerDef.parent.range, innerScope = variable.scope, innerDef = variable.defs[0], inner = innerDef && innerDef.name.range;
				return outer && inner && outer[0] < inner[0] && inner[1] < outer[1] && (innerDef.type === "FunctionName" && innerDef.node.type === "FunctionExpression" || innerDef.node.type === "ClassExpression") && outerScope === innerScope.upper;
			}
			/**
			* Get a range of a variable's identifier node.
			* @param {Object} variable The variable to get.
			* @returns {Array|undefined} The range of the variable's identifier node.
			*/
			function getNameRange(variable) {
				let def = variable.defs[0];
				return def && def.name.range;
			}
			/**
			* Get declared line and column of a variable.
			* @param {eslint-scope.Variable} variable The variable to get.
			* @returns {Object} The declared line and column of the variable.
			*/
			function getDeclaredLocation(variable) {
				let identifier = variable.identifiers[0], obj;
				return obj = identifier ? {
					global: !1,
					line: identifier.loc.start.line,
					column: identifier.loc.start.column + 1
				} : { global: !0 }, obj;
			}
			/**
			* Checks if a variable is in TDZ of scopeVar.
			* @param {Object} variable The variable to check.
			* @param {Object} scopeVar The variable of TDZ.
			* @returns {boolean} Whether or not the variable is in TDZ of scopeVar.
			*/
			function isInTdz(variable, scopeVar) {
				let outerDef = scopeVar.defs[0], inner = getNameRange(variable), outer = getNameRange(scopeVar);
				return !outer || inner[1] >= outer[0] ? !1 : hoist === "types" ? !TYPES_HOISTED_NODES.has(outerDef.node.type) : hoist === "functions-and-types" ? outerDef.node.type !== "FunctionDeclaration" && !TYPES_HOISTED_NODES.has(outerDef.node.type) : inner && outer && inner[1] < outer[0] && (hoist !== "functions" || !outerDef || outerDef.node.type !== "FunctionDeclaration");
			}
			/**
			* Checks if the initialization of a variable has the declare modifier in a
			* definition file.
			* @param {Object} variable The variable to check
			* @returns {boolean} Whether the variable is declared in a definition file
			*/
			function isDeclareInDTSFile(variable) {
				let fileName = context.filename;
				return !fileName.endsWith(".d.ts") && !fileName.endsWith(".d.cts") && !fileName.endsWith(".d.mts") ? !1 : variable.defs.some((def) => def.type === "Variable" && def.parent.declare || def.type === "ClassName" && def.node.declare || def.type === "TSEnumName" && def.node.declare || def.type === "TSModuleName" && def.node.declare);
			}
			/**
			* Checks if a variable is a duplicate of an enum name in the enum scope
			* @param {Object} variable The variable to check
			* @returns {boolean} Whether it's a duplicate enum name variable
			*/
			function isDuplicatedEnumNameVariable(variable) {
				let block = variable.scope.block;
				return block.type === "TSEnumDeclaration" && block.id === variable.identifiers[0];
			}
			/**
			* Check if this is an external module declaration merging with a type import
			* @param {Scope} scope Current scope
			* @param {Object} variable Current variable
			* @param {Object} shadowedVariable Shadowed variable
			* @returns {boolean} Whether it's an external declaration merging
			*/
			function isExternalDeclarationMerging(scope, variable, shadowedVariable) {
				let firstDefinition = shadowedVariable.defs[0];
				if (!firstDefinition || !firstDefinition.parent || !(firstDefinition.parent.type === "ImportDeclaration" && (firstDefinition.parent.importKind === "type" || firstDefinition.parent.specifiers?.some((s) => s.type === "ImportSpecifier" && s.importKind === "type" && s.local.name === shadowedVariable.name)))) return !1;
				let moduleDecl = findSelfOrAncestor(variable.identifiers[0]?.parent, (node) => node.type === "TSModuleDeclaration");
				return moduleDecl ? firstDefinition.parent.source.value === (moduleDecl.id.type === "Literal" ? moduleDecl.id.value : moduleDecl.id.name) : !1;
			}
			/**
			* Checks the current context for shadowed variables.
			* @param {Scope} scope Fixme
			* @returns {void}
			*/
			function checkForShadows(scope) {
				if (isGlobalAugmentation(scope)) return;
				let variables = scope.variables;
				for (let i = 0; i < variables.length; ++i) {
					let variable = variables[i];
					if (variable.identifiers.length === 0 || isDuplicatedClassNameVariable(variable) || isDuplicatedEnumNameVariable(variable) || isAllowed(variable) || isDeclareInDTSFile(variable) || isThisParam(variable)) continue;
					let shadowed = astUtils.getVariableByName(scope.upper, variable.name);
					if (shadowed && (shadowed.identifiers.length > 0 || builtinGlobals && "writeable" in shadowed) && !isOnInitializer(variable, shadowed) && !(ignoreOnInitialization && isInitPatternNode(variable, shadowed)) && !(hoist !== "all" && isInTdz(variable, shadowed)) && !isTypeValueShadow(variable, shadowed) && !isFunctionTypeParameterNameValueShadow(variable) && !isGenericOfAStaticMethodShadow(variable, shadowed) && !isExternalDeclarationMerging(scope, variable, shadowed)) {
						let location = getDeclaredLocation(shadowed), messageId = location.global ? "noShadowGlobal" : "noShadow", data = { name: variable.name };
						location.global || (data.shadowedLine = location.line, data.shadowedColumn = location.column), context.report({
							node: variable.identifiers[0],
							messageId,
							data
						});
					}
				}
			}
			return { "Program:exit"(node) {
				let stack = sourceCode.getScope(node).childScopes.slice();
				for (; stack.length;) {
					let scope = stack.pop();
					stack.push(...scope.childScopes), checkForShadows(scope);
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-shadow.cjs
module.exports = require_no_shadow().create;
//#endregion
