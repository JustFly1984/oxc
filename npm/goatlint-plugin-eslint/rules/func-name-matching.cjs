const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/func-name-matching.js
/**
* @fileoverview Rule to require function names to match the name of the variable or property to which they are assigned.
* @author Annie Zhang, Pavel Strashkin
*/
var require_func_name_matching = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), esutils = require_ast_utils$1.i();
	/**
	* Determines if a pattern is `module.exports` or `module["exports"]`
	* @param {ASTNode} pattern The left side of the AssignmentExpression
	* @returns {boolean} True if the pattern is `module.exports` or `module["exports"]`
	*/
	function isModuleExports(pattern) {
		return pattern.type === "MemberExpression" && pattern.object.type === "Identifier" && pattern.object.name === "module" && (pattern.property.type === "Identifier" && pattern.property.name === "exports" || pattern.property.type === "Literal" && pattern.property.value === "exports");
	}
	/**
	* Determines if a string name is a valid identifier
	* @param {string} name The string to be checked
	* @param {number} ecmaVersion The ECMAScript version if specified in the parserOptions config
	* @returns {boolean} True if the string is a valid identifier
	*/
	function isIdentifier(name, ecmaVersion) {
		return ecmaVersion >= 2015 ? esutils.keyword.isIdentifierES6(name) : esutils.keyword.isIdentifierES5(name);
	}
	let alwaysOrNever = { enum: ["always", "never"] }, optionsObject = {
		type: "object",
		properties: {
			considerPropertyDescriptor: { type: "boolean" },
			includeCommonJSModuleExports: { type: "boolean" }
		},
		additionalProperties: !1
	};
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require function names to match the name of the variable or property to which they are assigned",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/func-name-matching"
			},
			schema: { anyOf: [{
				type: "array",
				additionalItems: !1,
				items: [alwaysOrNever, optionsObject]
			}, {
				type: "array",
				additionalItems: !1,
				items: [optionsObject]
			}] },
			messages: {
				matchProperty: "Function name `{{funcName}}` should match property name `{{name}}`.",
				matchVariable: "Function name `{{funcName}}` should match variable name `{{name}}`.",
				notMatchProperty: "Function name `{{funcName}}` should not match property name `{{name}}`.",
				notMatchVariable: "Function name `{{funcName}}` should not match variable name `{{name}}`."
			}
		},
		create(context) {
			let options = (typeof context.options[0] == "object" ? context.options[0] : context.options[1]) || {}, nameMatches = typeof context.options[0] == "string" ? context.options[0] : "always", considerPropertyDescriptor = options.considerPropertyDescriptor, includeModuleExports = options.includeCommonJSModuleExports, ecmaVersion = context.languageOptions.ecmaVersion;
			/**
			* Check whether node is a certain CallExpression.
			* @param {string} objName object name
			* @param {string} funcName function name
			* @param {ASTNode} node The node to check
			* @returns {boolean} `true` if node matches CallExpression
			*/
			function isPropertyCall(objName, funcName, node) {
				return node ? node.type === "CallExpression" && astUtils.isSpecificMemberAccess(node.callee, objName, funcName) : !1;
			}
			/**
			* Compares identifiers based on the nameMatches option
			* @param {string} x the first identifier
			* @param {string} y the second identifier
			* @returns {boolean} whether the two identifiers should warn.
			*/
			function shouldWarn(x, y) {
				return nameMatches === "always" && x !== y || nameMatches === "never" && x === y;
			}
			/**
			* Reports
			* @param {ASTNode} node The node to report
			* @param {string} name The variable or property name
			* @param {string} funcName The function name
			* @param {boolean} isProp True if the reported node is a property assignment
			* @returns {void}
			*/
			function report(node, name, funcName, isProp) {
				let messageId;
				messageId = nameMatches === "always" && isProp ? "matchProperty" : nameMatches === "always" ? "matchVariable" : isProp ? "notMatchProperty" : "notMatchVariable", context.report({
					node,
					messageId,
					data: {
						name,
						funcName
					}
				});
			}
			/**
			* Determines whether a given node is a string literal
			* @param {ASTNode} node The node to check
			* @returns {boolean} `true` if the node is a string literal
			*/
			function isStringLiteral(node) {
				return node.type === "Literal" && typeof node.value == "string";
			}
			return {
				VariableDeclarator(node) {
					!node.init || node.init.type !== "FunctionExpression" || node.id.type !== "Identifier" || node.init.id && shouldWarn(node.id.name, node.init.id.name) && report(node, node.id.name, node.init.id.name, !1);
				},
				AssignmentExpression(node) {
					if (node.right.type !== "FunctionExpression" || node.left.computed && node.left.property.type !== "Literal" || !includeModuleExports && isModuleExports(node.left) || node.left.type !== "Identifier" && node.left.type !== "MemberExpression") return;
					let isProp = node.left.type === "MemberExpression", name = isProp ? astUtils.getStaticPropertyName(node.left) : node.left.name;
					node.right.id && name && isIdentifier(name) && shouldWarn(name, node.right.id.name) && report(node, name, node.right.id.name, isProp);
				},
				"Property, PropertyDefinition[value]"(node) {
					if (node.value.type === "FunctionExpression" && node.value.id) {
						if (node.key.type === "Identifier" && !node.computed) {
							let functionName = node.value.id.name, propertyName = node.key.name;
							if (considerPropertyDescriptor && propertyName === "value" && node.parent.type === "ObjectExpression") if (isPropertyCall("Object", "defineProperty", node.parent.parent) || isPropertyCall("Reflect", "defineProperty", node.parent.parent)) {
								let property = node.parent.parent.arguments[1];
								isStringLiteral(property) && shouldWarn(property.value, functionName) && report(node, property.value, functionName, !0);
							} else isPropertyCall("Object", "defineProperties", node.parent.parent.parent.parent) || isPropertyCall("Object", "create", node.parent.parent.parent.parent) ? (propertyName = node.parent.parent.key.name, !node.parent.parent.computed && shouldWarn(propertyName, functionName) && report(node, propertyName, functionName, !0)) : shouldWarn(propertyName, functionName) && report(node, propertyName, functionName, !0);
							else shouldWarn(propertyName, functionName) && report(node, propertyName, functionName, !0);
							return;
						}
						isStringLiteral(node.key) && isIdentifier(node.key.value, ecmaVersion) && shouldWarn(node.key.value, node.value.id.name) && report(node, node.key.value, node.value.id.name, !0);
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/func-name-matching.cjs
module.exports = require_func_name_matching().create;
//#endregion
