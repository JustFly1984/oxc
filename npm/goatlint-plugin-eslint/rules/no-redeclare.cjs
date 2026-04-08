const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-redeclare.js
/**
* @fileoverview Rule to flag when the same variable is declared more then once.
* @author Ilya Volodin
*/
var require_no_redeclare = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ builtinGlobals: !0 }],
			docs: {
				description: "Disallow variable redeclaration",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-redeclare"
			},
			messages: {
				redeclared: "'{{id}}' is already defined.",
				redeclaredAsBuiltin: "'{{id}}' is already defined as a built-in global variable.",
				redeclaredBySyntax: "'{{id}}' is already defined by a variable declaration."
			},
			schema: [{
				type: "object",
				properties: { builtinGlobals: { type: "boolean" } },
				additionalProperties: !1
			}]
		},
		create(context) {
			let [{ builtinGlobals }] = context.options, sourceCode = context.sourceCode;
			/**
			* Iterate declarations of a given variable.
			* @param {escope.variable} variable The variable object to iterate declarations.
			* @returns {IterableIterator<{type:string,node:ASTNode,loc:SourceLocation}>} The declarations.
			*/
			function* iterateDeclarations(variable) {
				builtinGlobals && (variable.eslintImplicitGlobalSetting === "readonly" || variable.eslintImplicitGlobalSetting === "writable") && (yield { type: "builtin" });
				for (let id of variable.identifiers) yield {
					type: "syntax",
					node: id,
					loc: id.loc
				};
				if (variable.eslintExplicitGlobalComments) for (let comment of variable.eslintExplicitGlobalComments) yield {
					type: "comment",
					node: comment,
					loc: astUtils.getNameLocationInGlobalDirectiveComment(sourceCode, comment, variable.name)
				};
			}
			/**
			* Find variables in a given scope and flag redeclared ones.
			* @param {Scope} scope An eslint-scope scope object.
			* @returns {void}
			* @private
			*/
			function findVariablesInScope(scope) {
				for (let variable of scope.variables) {
					let [declaration, ...extraDeclarations] = iterateDeclarations(variable);
					if (extraDeclarations.length === 0) continue;
					let detailMessageId = declaration.type === "builtin" ? "redeclaredAsBuiltin" : "redeclaredBySyntax", data = { id: variable.name };
					for (let { type, node, loc } of extraDeclarations) {
						let messageId = type === declaration.type ? "redeclared" : detailMessageId;
						context.report({
							node,
							loc,
							messageId,
							data
						});
					}
				}
			}
			/**
			* Find variables in the current scope.
			* @param {ASTNode} node The node of the current scope.
			* @returns {void}
			* @private
			*/
			function checkForBlock(node) {
				let scope = sourceCode.getScope(node);
				scope.block === node && findVariablesInScope(scope);
			}
			return {
				Program(node) {
					let scope = sourceCode.getScope(node);
					findVariablesInScope(scope), scope.type === "global" && scope.childScopes[0] && scope.block === scope.childScopes[0].block && findVariablesInScope(scope.childScopes[0]);
				},
				FunctionDeclaration: checkForBlock,
				FunctionExpression: checkForBlock,
				ArrowFunctionExpression: checkForBlock,
				StaticBlock: checkForBlock,
				BlockStatement: checkForBlock,
				ForStatement: checkForBlock,
				ForInStatement: checkForBlock,
				ForOfStatement: checkForBlock,
				SwitchStatement: checkForBlock
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-redeclare.cjs
module.exports = require_no_redeclare().create;
//#endregion
