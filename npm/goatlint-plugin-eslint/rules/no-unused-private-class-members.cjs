//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-unused-private-class-members.js
/**
* @fileoverview Rule to flag declared but unused private class members
* @author Tim van der Lippe
*/
var require_no_unused_private_class_members = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow unused private class members",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-unused-private-class-members"
			},
			schema: [],
			messages: { unusedPrivateClassMember: "'{{classMemberName}}' is defined but never used." }
		},
		create(context) {
			let trackedClasses = [];
			/**
			* Check whether the current node is in a write only assignment.
			* @param {ASTNode} privateIdentifierNode Node referring to a private identifier
			* @returns {boolean} Whether the node is in a write only assignment
			* @private
			*/
			function isWriteOnlyAssignment(privateIdentifierNode) {
				let parentStatement = privateIdentifierNode.parent.parent, isAssignmentExpression = parentStatement.type === "AssignmentExpression";
				return !isAssignmentExpression && parentStatement.type !== "ForInStatement" && parentStatement.type !== "ForOfStatement" && parentStatement.type !== "AssignmentPattern" || parentStatement.left !== privateIdentifierNode.parent ? !1 : isAssignmentExpression && parentStatement.operator !== "=" ? parentStatement.parent.type === "ExpressionStatement" : !0;
			}
			return {
				ClassBody(classBodyNode) {
					let privateMembers = /* @__PURE__ */ new Map();
					trackedClasses.unshift(privateMembers);
					for (let bodyMember of classBodyNode.body) (bodyMember.type === "PropertyDefinition" || bodyMember.type === "MethodDefinition") && bodyMember.key.type === "PrivateIdentifier" && privateMembers.set(bodyMember.key.name, {
						declaredNode: bodyMember,
						isAccessor: bodyMember.type === "MethodDefinition" && (bodyMember.kind === "set" || bodyMember.kind === "get")
					});
				},
				PrivateIdentifier(privateIdentifierNode) {
					let classBody = trackedClasses.find((classProperties) => classProperties.has(privateIdentifierNode.name));
					if (!classBody) return;
					let memberDefinition = classBody.get(privateIdentifierNode.name);
					if (memberDefinition.isUsed || privateIdentifierNode.parent.type === "PropertyDefinition" || privateIdentifierNode.parent.type === "MethodDefinition") return;
					if (memberDefinition.isAccessor) {
						memberDefinition.isUsed = !0;
						return;
					}
					if (isWriteOnlyAssignment(privateIdentifierNode)) return;
					let wrappingExpressionType = privateIdentifierNode.parent.parent.type, parentOfWrappingExpressionType = privateIdentifierNode.parent.parent.parent.type;
					wrappingExpressionType === "UpdateExpression" && parentOfWrappingExpressionType === "ExpressionStatement" || wrappingExpressionType === "Property" && parentOfWrappingExpressionType === "ObjectPattern" && privateIdentifierNode.parent.parent.value === privateIdentifierNode.parent || wrappingExpressionType !== "RestElement" && wrappingExpressionType !== "ArrayPattern" && (memberDefinition.isUsed = !0);
				},
				"ClassBody:exit"() {
					let unusedPrivateMembers = trackedClasses.shift();
					for (let [classMemberName, { declaredNode, isUsed }] of unusedPrivateMembers.entries()) isUsed || context.report({
						node: declaredNode,
						loc: declaredNode.key.loc,
						messageId: "unusedPrivateClassMember",
						data: { classMemberName: `#${classMemberName}` }
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unused-private-class-members.cjs
module.exports = require_no_unused_private_class_members().create;
//#endregion
