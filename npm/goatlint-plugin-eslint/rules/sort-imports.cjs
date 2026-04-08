//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/sort-imports.js
/**
* @fileoverview Rule to enforce sorted `import` declarations within modules
* @author Christian Schuller
*/
var require_sort_imports = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				allowSeparatedGroups: !1,
				ignoreCase: !1,
				ignoreDeclarationSort: !1,
				ignoreMemberSort: !1,
				memberSyntaxSortOrder: [
					"none",
					"all",
					"multiple",
					"single"
				]
			}],
			docs: {
				description: "Enforce sorted `import` declarations within modules",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/sort-imports"
			},
			schema: [{
				type: "object",
				properties: {
					ignoreCase: { type: "boolean" },
					memberSyntaxSortOrder: {
						type: "array",
						items: { enum: [
							"none",
							"all",
							"multiple",
							"single"
						] },
						uniqueItems: !0,
						minItems: 4,
						maxItems: 4
					},
					ignoreDeclarationSort: { type: "boolean" },
					ignoreMemberSort: { type: "boolean" },
					allowSeparatedGroups: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			fixable: "code",
			messages: {
				sortImportsAlphabetically: "Imports should be sorted alphabetically.",
				sortMembersAlphabetically: "Member '{{memberName}}' of the import declaration should be sorted alphabetically.",
				unexpectedSyntaxOrder: "Expected '{{syntaxA}}' syntax before '{{syntaxB}}' syntax."
			}
		},
		create(context) {
			let [{ ignoreCase, ignoreDeclarationSort, ignoreMemberSort, memberSyntaxSortOrder, allowSeparatedGroups }] = context.options, sourceCode = context.sourceCode, previousDeclaration = null;
			/**
			* Gets the used member syntax style.
			*
			* import "my-module.js" --> none
			* import * as myModule from "my-module.js" --> all
			* import {myMember} from "my-module.js" --> single
			* import {foo, bar} from  "my-module.js" --> multiple
			* @param {ASTNode} node the ImportDeclaration node.
			* @returns {string} used member parameter style, ["all", "multiple", "single"]
			*/
			function usedMemberSyntax(node) {
				return node.specifiers.length === 0 ? "none" : node.specifiers[0].type === "ImportNamespaceSpecifier" ? "all" : node.specifiers.length === 1 ? "single" : "multiple";
			}
			/**
			* Gets the group by member parameter index for given declaration.
			* @param {ASTNode} node the ImportDeclaration node.
			* @returns {number} the declaration group by member index.
			*/
			function getMemberParameterGroupIndex(node) {
				return memberSyntaxSortOrder.indexOf(usedMemberSyntax(node));
			}
			/**
			* Gets the local name of the first imported module.
			* @param {ASTNode} node the ImportDeclaration node.
			* @returns {?string} the local name of the first imported module.
			*/
			function getFirstLocalMemberName(node) {
				return node.specifiers[0] ? node.specifiers[0].local.name : null;
			}
			/**
			* Calculates number of lines between two nodes. It is assumed that the given `left` node appears before
			* the given `right` node in the source code. Lines are counted from the end of the `left` node till the
			* start of the `right` node. If the given nodes are on the same line, it returns `0`, same as if they were
			* on two consecutive lines.
			* @param {ASTNode} left node that appears before the given `right` node.
			* @param {ASTNode} right node that appears after the given `left` node.
			* @returns {number} number of lines between nodes.
			*/
			function getNumberOfLinesBetween(left, right) {
				return Math.max(right.loc.start.line - left.loc.end.line - 1, 0);
			}
			return { ImportDeclaration(node) {
				if (!ignoreDeclarationSort) {
					if (previousDeclaration && allowSeparatedGroups && getNumberOfLinesBetween(previousDeclaration, node) > 0 && (previousDeclaration = null), previousDeclaration) {
						let currentMemberSyntaxGroupIndex = getMemberParameterGroupIndex(node), previousMemberSyntaxGroupIndex = getMemberParameterGroupIndex(previousDeclaration), currentLocalMemberName = getFirstLocalMemberName(node), previousLocalMemberName = getFirstLocalMemberName(previousDeclaration);
						ignoreCase && (previousLocalMemberName &&= previousLocalMemberName.toLowerCase(), currentLocalMemberName &&= currentLocalMemberName.toLowerCase()), currentMemberSyntaxGroupIndex === previousMemberSyntaxGroupIndex ? previousLocalMemberName && currentLocalMemberName && currentLocalMemberName < previousLocalMemberName && context.report({
							node,
							messageId: "sortImportsAlphabetically"
						}) : currentMemberSyntaxGroupIndex < previousMemberSyntaxGroupIndex && context.report({
							node,
							messageId: "unexpectedSyntaxOrder",
							data: {
								syntaxA: memberSyntaxSortOrder[currentMemberSyntaxGroupIndex],
								syntaxB: memberSyntaxSortOrder[previousMemberSyntaxGroupIndex]
							}
						});
					}
					previousDeclaration = node;
				}
				if (!ignoreMemberSort) {
					let importSpecifiers = node.specifiers.filter((specifier) => specifier.type === "ImportSpecifier"), getSortableName = ignoreCase ? (specifier) => specifier.local.name.toLowerCase() : (specifier) => specifier.local.name, firstUnsortedIndex = importSpecifiers.map(getSortableName).findIndex((name, index, array) => array[index - 1] > name);
					firstUnsortedIndex !== -1 && context.report({
						node: importSpecifiers[firstUnsortedIndex],
						messageId: "sortMembersAlphabetically",
						data: { memberName: importSpecifiers[firstUnsortedIndex].local.name },
						fix(fixer) {
							return importSpecifiers.some((specifier) => sourceCode.getCommentsBefore(specifier).length || sourceCode.getCommentsAfter(specifier).length) ? null : fixer.replaceTextRange([importSpecifiers[0].range[0], importSpecifiers.at(-1).range[1]], importSpecifiers.slice().sort((specifierA, specifierB) => getSortableName(specifierA) > getSortableName(specifierB) ? 1 : -1).reduce((sourceText, specifier, index) => {
								let textAfterSpecifier = index === importSpecifiers.length - 1 ? "" : sourceCode.getText().slice(importSpecifiers[index].range[1], importSpecifiers[index + 1].range[0]);
								return sourceText + sourceCode.getText(specifier) + textAfterSpecifier;
							}, ""));
						}
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/sort-imports.cjs
module.exports = require_sort_imports().create;
//#endregion
