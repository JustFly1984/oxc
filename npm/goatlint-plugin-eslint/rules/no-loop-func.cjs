//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-loop-func.js
/**
* @fileoverview Rule to flag creation of function inside a loop
* @author Ilya Volodin
*/
var require_no_loop_func = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let CONSTANT_BINDINGS = new Set([
		"const",
		"using",
		"await using"
	]);
	/**
	* Identifies is a node is a FunctionExpression which is part of an IIFE
	* @param {ASTNode} node Node to test
	* @returns {boolean} True if it's an IIFE
	*/
	function isIIFE(node) {
		return (node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression") && node.parent && node.parent.type === "CallExpression" && node.parent.callee === node;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			dialects: ["typescript", "javascript"],
			language: "javascript",
			docs: {
				description: "Disallow function declarations that contain unsafe references inside loop statements",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-loop-func"
			},
			schema: [],
			messages: { unsafeRefs: "Function declared in a loop contains unsafe references to variable(s) {{ varNames }}." }
		},
		create(context) {
			let SKIPPED_IIFE_NODES = /* @__PURE__ */ new Set(), sourceCode = context.sourceCode;
			/**
			* Gets the containing loop node of a specified node.
			*
			* We don't need to check nested functions, so this ignores those, with the exception of IIFE.
			* `Scope.through` contains references of nested functions.
			* @param {ASTNode} node An AST node to get.
			* @returns {ASTNode|null} The containing loop node of the specified node, or
			*      `null`.
			*/
			function getContainingLoopNode(node) {
				for (let currentNode = node; currentNode.parent; currentNode = currentNode.parent) {
					let parent = currentNode.parent;
					switch (parent.type) {
						case "WhileStatement":
						case "DoWhileStatement": return parent;
						case "ForStatement":
							if (parent.init !== currentNode) return parent;
							break;
						case "ForInStatement":
						case "ForOfStatement":
							if (parent.right !== currentNode) return parent;
							break;
						case "ArrowFunctionExpression":
						case "FunctionExpression":
						case "FunctionDeclaration":
							if (SKIPPED_IIFE_NODES.has(parent)) break;
							return null;
						default: break;
					}
				}
				return null;
			}
			/**
			* Gets the containing loop node of a given node.
			* If the loop was nested, this returns the most outer loop.
			* @param {ASTNode} node A node to get. This is a loop node.
			* @param {ASTNode|null} excludedNode A node that the result node should not
			*      include.
			* @returns {ASTNode} The most outer loop node.
			*/
			function getTopLoopNode(node, excludedNode) {
				let border = excludedNode ? excludedNode.range[1] : 0, retv = node, containingLoopNode = node;
				for (; containingLoopNode && containingLoopNode.range[0] >= border;) retv = containingLoopNode, containingLoopNode = getContainingLoopNode(containingLoopNode);
				return retv;
			}
			/**
			* Checks whether a given reference which refers to an upper scope's variable is
			* safe or not.
			* @param {ASTNode} loopNode A containing loop node.
			* @param {eslint-scope.Reference} reference A reference to check.
			* @returns {boolean} `true` if the reference is safe or not.
			*/
			function isSafe(loopNode, reference) {
				let variable = reference.resolved, definition = variable && variable.defs[0], declaration = definition && definition.parent, kind = declaration && declaration.type === "VariableDeclaration" ? declaration.kind : "";
				if (CONSTANT_BINDINGS.has(kind) || kind === "let" && declaration.range[0] > loopNode.range[0] && declaration.range[1] < loopNode.range[1]) return !0;
				let border = getTopLoopNode(loopNode, kind === "let" ? declaration : null).range[0];
				/**
				* Checks whether a given reference is safe or not.
				* The reference is every reference of the upper scope's variable we are
				* looking now.
				*
				* It's safe if the reference matches one of the following condition.
				* - is readonly.
				* - doesn't exist inside a local function and after the border.
				* @param {eslint-scope.Reference} upperRef A reference to check.
				* @returns {boolean} `true` if the reference is safe.
				*/
				function isSafeReference(upperRef) {
					let id = upperRef.identifier;
					return !upperRef.isWrite() || variable.scope.variableScope === upperRef.from.variableScope && id.range[0] < border;
				}
				return !!variable && variable.references.every(isSafeReference);
			}
			/**
			* Reports functions which match the following condition:
			*
			* - has a loop node in ancestors.
			* - has any references which refers to an unsafe variable.
			* @param {ASTNode} node The AST node to check.
			* @returns {void}
			*/
			function checkForLoops(node) {
				let loopNode = getContainingLoopNode(node);
				if (!loopNode) return;
				let references = sourceCode.getScope(node).through;
				if (!(node.async || node.generator) && isIIFE(node) && !(node.type === "FunctionExpression" && node.id && references.some((r) => r.identifier.name === node.id.name))) {
					SKIPPED_IIFE_NODES.add(node);
					return;
				}
				let unsafeRefs = [...new Set(references.filter((r) => r.resolved && !isSafe(loopNode, r)).map((r) => r.identifier.name))];
				unsafeRefs.length > 0 && context.report({
					node,
					messageId: "unsafeRefs",
					data: { varNames: `'${unsafeRefs.join("', '")}'` }
				});
			}
			return {
				ArrowFunctionExpression: checkForLoops,
				FunctionExpression: checkForLoops,
				FunctionDeclaration: checkForLoops
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-loop-func.cjs
module.exports = require_no_loop_func().create;
//#endregion
