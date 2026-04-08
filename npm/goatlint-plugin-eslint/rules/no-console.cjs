const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-console.js
/**
* @fileoverview Rule to flag use of console object
* @author Nicholas C. Zakas
*/
var require_no_console = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{}],
			docs: {
				description: "Disallow the use of `console`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-console"
			},
			schema: [{
				type: "object",
				properties: { allow: {
					type: "array",
					items: { type: "string" },
					minItems: 1,
					uniqueItems: !0
				} },
				additionalProperties: !1
			}],
			hasSuggestions: !0,
			messages: {
				unexpected: "Unexpected console statement.",
				limited: "Unexpected console statement. Only these console methods are allowed: {{ allowed }}.",
				removeConsole: "Remove the console.{{ propertyName }}().",
				removeMethodCall: "Remove the console method call."
			}
		},
		create(context) {
			let [{ allow: allowed = [] }] = context.options, sourceCode = context.sourceCode;
			/**
			* Checks whether the given reference is 'console' or not.
			* @param {eslint-scope.Reference} reference The reference to check.
			* @returns {boolean} `true` if the reference is 'console'.
			*/
			function isConsole(reference) {
				let id = reference.identifier;
				return id && id.name === "console";
			}
			/**
			* Checks whether the property name of the given MemberExpression node
			* is allowed by options or not.
			* @param {ASTNode} node The MemberExpression node to check.
			* @returns {boolean} `true` if the property name of the node is allowed.
			*/
			function isAllowed(node) {
				let propertyName = astUtils.getStaticPropertyName(node);
				return propertyName && allowed.includes(propertyName);
			}
			/**
			* Checks whether the given reference is a member access which is not
			* allowed by options or not.
			* @param {eslint-scope.Reference} reference The reference to check.
			* @returns {boolean} `true` if the reference is a member access which
			*      is not allowed by options.
			*/
			function isMemberAccessExceptAllowed(reference) {
				let node = reference.identifier, parent = node.parent;
				return parent.type === "MemberExpression" && parent.object === node && !isAllowed(parent);
			}
			/**
			* Checks if removing the ExpressionStatement node will cause ASI to
			* break.
			* eg.
			* foo()
			* console.log();
			* [1, 2, 3].forEach(a => doSomething(a))
			*
			* Removing the console.log(); statement should leave two statements, but
			* here the two statements will become one because [ causes continuation after
			* foo().
			* @param {ASTNode} node The ExpressionStatement node to check.
			* @returns {boolean} `true` if ASI will break after removing the ExpressionStatement
			*      node.
			*/
			function maybeAsiHazard(node) {
				let SAFE_TOKENS_BEFORE = /^[:;{]$/u, UNSAFE_CHARS_AFTER = /^[-[(/+`]/u, tokenBefore = sourceCode.getTokenBefore(node), tokenAfter = sourceCode.getTokenAfter(node);
				return !!tokenAfter && UNSAFE_CHARS_AFTER.test(tokenAfter.value) && tokenAfter.value !== "++" && tokenAfter.value !== "--" && !!tokenBefore && !SAFE_TOKENS_BEFORE.test(tokenBefore.value);
			}
			/**
			* Checks if the MemberExpression node's parent.parent.parent is a
			* Program, BlockStatement, StaticBlock, or SwitchCase node. This check
			* is necessary to avoid providing a suggestion that might cause a syntax error.
			*
			* eg. if (a) console.log(b), removing console.log() here will lead to a
			*     syntax error.
			*     if (a) { console.log(b) }, removing console.log() here is acceptable.
			*
			* Additionally, it checks if the callee of the CallExpression node is
			* the node itself.
			*
			* eg. foo(console.log), cannot provide a suggestion here.
			* @param {ASTNode} node The MemberExpression node to check.
			* @returns {boolean} `true` if a suggestion can be provided for a node.
			*/
			function canProvideSuggestions(node) {
				return node.parent.type === "CallExpression" && node.parent.callee === node && node.parent.parent.type === "ExpressionStatement" && astUtils.STATEMENT_LIST_PARENTS.has(node.parent.parent.parent.type) && !maybeAsiHazard(node.parent.parent);
			}
			/**
			* Reports the given reference as a violation.
			* @param {eslint-scope.Reference} reference The reference to report.
			* @returns {void}
			*/
			function report(reference) {
				let node = reference.identifier.parent, suggest = [];
				if (canProvideSuggestions(node)) {
					let suggestion = { fix(fixer) {
						return fixer.remove(node.parent.parent);
					} };
					node.computed ? suggestion.messageId = "removeMethodCall" : (suggestion.messageId = "removeConsole", suggestion.data = { propertyName: node.property.name }), suggest.push(suggestion);
				}
				context.report({
					node,
					loc: node.loc,
					messageId: allowed.length ? "limited" : "unexpected",
					data: { allowed: allowed.join(", ") },
					suggest
				});
			}
			return { "Program:exit"(node) {
				let scope = sourceCode.getScope(node), consoleVar = astUtils.getVariableByName(scope, "console"), shadowed = consoleVar && consoleVar.defs.length > 0, references = consoleVar ? consoleVar.references : scope.through.filter(isConsole);
				shadowed || references.filter(isMemberAccessExceptAllowed).forEach(report);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-console.cjs
module.exports = require_no_console().create;
//#endregion
