const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/class-methods-use-this.js
/**
* @fileoverview Rule to enforce that all class methods use 'this'.
* @author Patrick Williams
*/
var require_class_methods_use_this = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			dialects: ["javascript", "typescript"],
			language: "javascript",
			type: "suggestion",
			defaultOptions: [{
				enforceForClassFields: !0,
				exceptMethods: [],
				ignoreOverrideMethods: !1
			}],
			docs: {
				description: "Enforce that class methods utilize `this`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/class-methods-use-this"
			},
			schema: [{
				type: "object",
				properties: {
					exceptMethods: {
						type: "array",
						items: { type: "string" }
					},
					enforceForClassFields: { type: "boolean" },
					ignoreOverrideMethods: { type: "boolean" },
					ignoreClassesWithImplements: { enum: ["all", "public-fields"] }
				},
				additionalProperties: !1
			}],
			messages: { missingThis: "Expected 'this' to be used by class {{name}}." }
		},
		create(context) {
			let [options] = context.options, { enforceForClassFields, ignoreOverrideMethods, ignoreClassesWithImplements } = options, exceptMethods = new Set(options.exceptMethods), stack = [];
			/**
			* Push `this` used flag initialized with `false` onto the stack.
			* @returns {void}
			*/
			function pushContext() {
				stack.push(!1);
			}
			/**
			* Pop `this` used flag from the stack.
			* @returns {boolean | undefined} `this` used flag
			*/
			function popContext() {
				return stack.pop();
			}
			/**
			* Initializes the current context to false and pushes it onto the stack.
			* These booleans represent whether 'this' has been used in the context.
			* @returns {void}
			* @private
			*/
			function enterFunction() {
				pushContext();
			}
			/**
			* Check if the node is an instance method
			* @param {ASTNode} node node to check
			* @returns {boolean} True if its an instance method
			* @private
			*/
			function isInstanceMethod(node) {
				switch (node.type) {
					case "MethodDefinition": return !node.static && node.kind !== "constructor";
					case "AccessorProperty":
					case "PropertyDefinition": return !node.static && enforceForClassFields;
					default: return !1;
				}
			}
			/**
			* Check if the node's parent class implements any interfaces
			* @param {ASTNode} node node to check
			* @returns {boolean} True if parent class implements interfaces
			* @private
			*/
			function hasImplements(node) {
				let classNode = node.parent.parent;
				return classNode?.type === "ClassDeclaration" && classNode.implements?.length > 0;
			}
			/**
			* Check if the node is an instance method not excluded by config
			* @param {ASTNode} node node to check
			* @returns {boolean} True if it is an instance method, and not excluded by config
			* @private
			*/
			function isIncludedInstanceMethod(node) {
				if (isInstanceMethod(node)) {
					if (node.computed) return !0;
					if (ignoreOverrideMethods && node.override || ignoreClassesWithImplements && hasImplements(node) && (ignoreClassesWithImplements === "all" || ignoreClassesWithImplements === "public-fields" && node.key.type !== "PrivateIdentifier" && (!node.accessibility || node.accessibility === "public"))) return !1;
					let hashIfNeeded = node.key.type === "PrivateIdentifier" ? "#" : "", name = node.key.type === "Literal" ? astUtils.getStaticStringValue(node.key) : node.key.name || "";
					return !exceptMethods.has(hashIfNeeded + name);
				}
				return !1;
			}
			/**
			* Checks if we are leaving a function that is a method, and reports if 'this' has not been used.
			* Static methods and the constructor are exempt.
			* Then pops the context off the stack.
			* @param {ASTNode} node A function node that was entered.
			* @returns {void}
			* @private
			*/
			function exitFunction(node) {
				let methodUsesThis = popContext();
				isIncludedInstanceMethod(node.parent) && !methodUsesThis && context.report({
					node,
					loc: astUtils.getFunctionHeadLoc(node, context.sourceCode),
					messageId: "missingThis",
					data: { name: astUtils.getFunctionNameWithKind(node) }
				});
			}
			/**
			* Mark the current context as having used 'this'.
			* @returns {void}
			* @private
			*/
			function markThisUsed() {
				stack.length && (stack[stack.length - 1] = !0);
			}
			return {
				FunctionDeclaration: enterFunction,
				"FunctionDeclaration:exit": exitFunction,
				FunctionExpression: enterFunction,
				"FunctionExpression:exit": exitFunction,
				"AccessorProperty > *.key:exit": pushContext,
				"AccessorProperty:exit": popContext,
				"PropertyDefinition > *.key:exit": pushContext,
				"PropertyDefinition:exit": popContext,
				StaticBlock: pushContext,
				"StaticBlock:exit": popContext,
				ThisExpression: markThisUsed,
				Super: markThisUsed,
				...enforceForClassFields && {
					"AccessorProperty > ArrowFunctionExpression.value": enterFunction,
					"AccessorProperty > ArrowFunctionExpression.value:exit": exitFunction,
					"PropertyDefinition > ArrowFunctionExpression.value": enterFunction,
					"PropertyDefinition > ArrowFunctionExpression.value:exit": exitFunction
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/class-methods-use-this.cjs
module.exports = require_class_methods_use_this().create;
//#endregion
