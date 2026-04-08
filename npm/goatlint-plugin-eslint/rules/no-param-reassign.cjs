//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-param-reassign.js
/**
* @fileoverview Disallow reassigning function parameters.
* @author Nat Burns
*/
var require_no_param_reassign = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let stopNodePattern = /(?:Statement|Declaration|Function(?:Expression)?|Program)$/u;
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow reassigning function parameters",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-param-reassign"
			},
			schema: [{ oneOf: [{
				type: "object",
				properties: { props: { enum: [!1] } },
				additionalProperties: !1
			}, {
				type: "object",
				properties: {
					props: { enum: [!0] },
					ignorePropertyModificationsFor: {
						type: "array",
						items: { type: "string" },
						uniqueItems: !0
					},
					ignorePropertyModificationsForRegex: {
						type: "array",
						items: { type: "string" },
						uniqueItems: !0
					}
				},
				additionalProperties: !1
			}] }],
			messages: {
				assignmentToFunctionParam: "Assignment to function parameter '{{name}}'.",
				assignmentToFunctionParamProp: "Assignment to property of function parameter '{{name}}'."
			}
		},
		create(context) {
			let props = context.options[0] && context.options[0].props, ignoredPropertyAssignmentsFor = context.options[0] && context.options[0].ignorePropertyModificationsFor || [], ignoredPropertyAssignmentsForRegex = context.options[0] && context.options[0].ignorePropertyModificationsForRegex || [], sourceCode = context.sourceCode;
			/**
			* Checks whether or not the reference modifies properties of its variable.
			* @param {Reference} reference A reference to check.
			* @returns {boolean} Whether or not the reference modifies properties of its variable.
			*/
			function isModifyingProp(reference) {
				let node = reference.identifier, parent = node.parent;
				for (; parent && (!stopNodePattern.test(parent.type) || parent.type === "ForInStatement" || parent.type === "ForOfStatement");) {
					switch (parent.type) {
						case "AssignmentExpression": return parent.left === node;
						case "UpdateExpression": return !0;
						case "UnaryExpression":
							if (parent.operator === "delete") return !0;
							break;
						case "ForInStatement":
						case "ForOfStatement": return parent.left === node;
						case "CallExpression":
							if (parent.callee !== node) return !1;
							break;
						case "MemberExpression":
							if (parent.property === node) return !1;
							break;
						case "Property":
							if (parent.key === node) return !1;
							break;
						case "ConditionalExpression":
							if (parent.test === node) return !1;
							break;
					}
					node = parent, parent = node.parent;
				}
				return !1;
			}
			/**
			* Tests that an identifier name matches any of the ignored property assignments.
			* First we test strings in ignoredPropertyAssignmentsFor.
			* Then we instantiate and test RegExp objects from ignoredPropertyAssignmentsForRegex strings.
			* @param {string} identifierName A string that describes the name of an identifier to
			* ignore property assignments for.
			* @returns {boolean} Whether the string matches an ignored property assignment regular expression or not.
			*/
			function isIgnoredPropertyAssignment(identifierName) {
				return ignoredPropertyAssignmentsFor.includes(identifierName) || ignoredPropertyAssignmentsForRegex.some((ignored) => new RegExp(ignored, "u").test(identifierName));
			}
			/**
			* Reports a reference if is non initializer and writable.
			* @param {Reference} reference A reference to check.
			* @param {number} index The index of the reference in the references.
			* @param {Reference[]} references The array that the reference belongs to.
			* @returns {void}
			*/
			function checkReference(reference, index, references) {
				let identifier = reference.identifier;
				identifier && !reference.init && (index === 0 || references[index - 1].identifier !== identifier) && (reference.isWrite() ? context.report({
					node: identifier,
					messageId: "assignmentToFunctionParam",
					data: { name: identifier.name }
				}) : props && isModifyingProp(reference) && !isIgnoredPropertyAssignment(identifier.name) && context.report({
					node: identifier,
					messageId: "assignmentToFunctionParamProp",
					data: { name: identifier.name }
				}));
			}
			/**
			* Finds and reports references that are non initializer and writable.
			* @param {Variable} variable A variable to check.
			* @returns {void}
			*/
			function checkVariable(variable) {
				variable.defs[0].type === "Parameter" && variable.references.forEach(checkReference);
			}
			/**
			* Checks parameters of a given function node.
			* @param {ASTNode} node A function node to check.
			* @returns {void}
			*/
			function checkForFunction(node) {
				sourceCode.getDeclaredVariables(node).forEach(checkVariable);
			}
			return {
				"FunctionDeclaration:exit": checkForFunction,
				"FunctionExpression:exit": checkForFunction,
				"ArrowFunctionExpression:exit": checkForFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-param-reassign.cjs
module.exports = require_no_param_reassign().create;
//#endregion
