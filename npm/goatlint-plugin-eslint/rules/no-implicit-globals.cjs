//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-implicit-globals.js
/**
* @fileoverview Rule to check for implicit global variables, functions and classes.
* @author Joshua Peek
*/
var require_no_implicit_globals = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let ASSIGNMENT_NODES = new Set([
		"AssignmentExpression",
		"ForInStatement",
		"ForOfStatement"
	]);
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{ lexicalBindings: !1 }],
			docs: {
				description: "Disallow declarations in the global scope",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-implicit-globals"
			},
			schema: [{
				type: "object",
				properties: { lexicalBindings: { type: "boolean" } },
				additionalProperties: !1
			}],
			messages: {
				globalNonLexicalBinding: "Unexpected {{kind}} declaration in the global scope, wrap in an IIFE for a local variable, assign as global property for a global variable.",
				globalLexicalBinding: "Unexpected {{kind}} declaration in the global scope, wrap in a block or in an IIFE.",
				globalVariableLeak: "Global variable leak, declare the variable if it is intended to be local.",
				assignmentToReadonlyGlobal: "Unexpected assignment to read-only global variable.",
				redeclarationOfReadonlyGlobal: "Unexpected redeclaration of read-only global variable."
			}
		},
		create(context) {
			let [{ lexicalBindings: checkLexicalBindings }] = context.options, sourceCode = context.sourceCode;
			/**
			* Reports the node.
			* @param {ASTNode} node Node to report.
			* @param {string} messageId Id of the message to report.
			* @param {string|undefined} kind Declaration kind, can be 'var', 'const', 'let', function or class.
			* @returns {void}
			*/
			function report(node, messageId, kind) {
				context.report({
					node,
					messageId,
					data: { kind }
				});
			}
			return { Program(node) {
				let scope = sourceCode.getScope(node);
				scope.variables.forEach((variable) => {
					let isReadonlyEslintGlobalVariable = variable.writeable === !1;
					variable.writeable !== !0 && (variable.eslintExported || (variable.defs.forEach((def) => {
						let defNode = def.node;
						(def.type === "FunctionName" || def.type === "Variable" && def.parent.kind === "var") && (isReadonlyEslintGlobalVariable ? report(defNode, "redeclarationOfReadonlyGlobal") : report(defNode, "globalNonLexicalBinding", def.type === "FunctionName" ? "function" : `'${def.parent.kind}'`)), checkLexicalBindings && (def.type === "ClassName" || def.type === "Variable" && (def.parent.kind === "let" || def.parent.kind === "const")) && (isReadonlyEslintGlobalVariable ? report(defNode, "redeclarationOfReadonlyGlobal") : report(defNode, "globalLexicalBinding", def.type === "ClassName" ? "class" : `'${def.parent.kind}'`));
					}), isReadonlyEslintGlobalVariable && variable.defs.length === 0 && variable.references.forEach((reference) => {
						if (reference.isWrite() && !reference.isRead()) {
							let assignmentParent = reference.identifier.parent;
							for (; assignmentParent && !ASSIGNMENT_NODES.has(assignmentParent.type);) assignmentParent = assignmentParent.parent;
							report(assignmentParent ?? reference.identifier, "assignmentToReadonlyGlobal");
						}
					})));
				}), scope.implicit.variables.forEach((variable) => {
					variable.defs.forEach((def) => {
						report(def.node, "globalVariableLeak");
					});
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-implicit-globals.cjs
module.exports = require_no_implicit_globals().create;
//#endregion
