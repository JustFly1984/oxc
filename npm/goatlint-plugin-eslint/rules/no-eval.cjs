const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-eval.js
/**
* @fileoverview Rule to flag use of eval() statement
* @author Nicholas C. Zakas
*/
var require_no_eval = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), candidatesOfGlobalObject = Object.freeze([
		"global",
		"window",
		"globalThis"
	]);
	/**
	* Checks a given node is a MemberExpression node which has the specified name's
	* property.
	* @param {ASTNode} node A node to check.
	* @param {string} name A name to check.
	* @returns {boolean} `true` if the node is a MemberExpression node which has
	*      the specified name's property
	*/
	function isMember(node, name) {
		return astUtils.isSpecificMemberAccess(node, null, name);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ allowIndirect: !1 }],
			docs: {
				description: "Disallow the use of `eval()`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-eval"
			},
			schema: [{
				type: "object",
				properties: { allowIndirect: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: { unexpected: "eval can be harmful." }
		},
		create(context) {
			let [{ allowIndirect }] = context.options, sourceCode = context.sourceCode, funcInfo = null;
			/**
			* Pushes a `this` scope (non-arrow function, class static block, or class field initializer) information to the stack.
			* Top-level scopes are handled separately.
			*
			* This is used in order to check whether or not `this` binding is a
			* reference to the global object.
			* @param {ASTNode} node A node of the scope.
			*      For functions, this is one of FunctionDeclaration, FunctionExpression.
			*      For class static blocks, this is StaticBlock.
			*      For class field initializers, this can be any node that is PropertyDefinition#value.
			* @returns {void}
			*/
			function enterThisScope(node) {
				let strict = sourceCode.getScope(node).isStrict;
				funcInfo = {
					upper: funcInfo,
					node,
					strict,
					isTopLevelOfScript: !1,
					defaultThis: !1,
					initialized: strict
				};
			}
			/**
			* Pops a variable scope from the stack.
			* @returns {void}
			*/
			function exitThisScope() {
				funcInfo = funcInfo.upper;
			}
			/**
			* Reports a given node.
			*
			* `node` is `Identifier` or `MemberExpression`.
			* The parent of `node` might be `CallExpression`.
			*
			* The location of the report is always `eval` `Identifier` (or possibly
			* `Literal`). The type of the report is `CallExpression` if the parent is
			* `CallExpression`. Otherwise, it's the given node type.
			* @param {ASTNode} node A node to report.
			* @returns {void}
			*/
			function report(node) {
				let parent = node.parent, locationNode = node.type === "MemberExpression" ? node.property : node, reportNode = parent.type === "CallExpression" && parent.callee === node ? parent : node;
				context.report({
					node: reportNode,
					loc: locationNode.loc,
					messageId: "unexpected"
				});
			}
			/**
			* Reports accesses of `eval` via the global object.
			* @param {eslint-scope.Scope} globalScope The global scope.
			* @returns {void}
			*/
			function reportAccessingEvalViaGlobalObject(globalScope) {
				for (let i = 0; i < candidatesOfGlobalObject.length; ++i) {
					let name = candidatesOfGlobalObject[i], variable = astUtils.getVariableByName(globalScope, name);
					if (!variable) continue;
					let references = variable.references;
					for (let j = 0; j < references.length; ++j) {
						let node = references[j].identifier.parent;
						for (; isMember(node, name);) node = node.parent;
						isMember(node, "eval") && report(node);
					}
				}
			}
			/**
			* Reports all accesses of `eval` (excludes direct calls to eval).
			* @param {eslint-scope.Scope} globalScope The global scope.
			* @returns {void}
			*/
			function reportAccessingEval(globalScope) {
				let variable = astUtils.getVariableByName(globalScope, "eval");
				if (!variable) return;
				let references = variable.references;
				for (let i = 0; i < references.length; ++i) {
					let id = references[i].identifier;
					id.name === "eval" && !astUtils.isCallee(id) && report(id);
				}
			}
			return allowIndirect ? { "CallExpression:exit"(node) {
				let callee = node.callee;
				!node.optional && astUtils.isSpecificId(callee, "eval") && report(callee);
			} } : {
				"CallExpression:exit"(node) {
					let callee = node.callee;
					astUtils.isSpecificId(callee, "eval") && report(callee);
				},
				Program(node) {
					let scope = sourceCode.getScope(node), features = context.languageOptions.parserOptions.ecmaFeatures || {};
					funcInfo = {
						upper: null,
						node,
						strict: scope.isStrict || node.sourceType === "module" || features.globalReturn && scope.childScopes[0].isStrict,
						isTopLevelOfScript: node.sourceType !== "module" && !features.globalReturn,
						defaultThis: !0,
						initialized: !0
					};
				},
				"Program:exit"(node) {
					let globalScope = sourceCode.getScope(node);
					exitThisScope(), reportAccessingEval(globalScope), reportAccessingEvalViaGlobalObject(globalScope);
				},
				FunctionDeclaration: enterThisScope,
				"FunctionDeclaration:exit": exitThisScope,
				FunctionExpression: enterThisScope,
				"FunctionExpression:exit": exitThisScope,
				"PropertyDefinition > *.value": enterThisScope,
				"PropertyDefinition > *.value:exit": exitThisScope,
				StaticBlock: enterThisScope,
				"StaticBlock:exit": exitThisScope,
				ThisExpression(node) {
					isMember(node.parent, "eval") && (funcInfo.initialized || (funcInfo.initialized = !0, funcInfo.defaultThis = astUtils.isDefaultThisBinding(funcInfo.node, sourceCode)), (funcInfo.isTopLevelOfScript || !funcInfo.strict && funcInfo.defaultThis) && report(node.parent));
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-eval.cjs
module.exports = require_no_eval().create;
//#endregion
