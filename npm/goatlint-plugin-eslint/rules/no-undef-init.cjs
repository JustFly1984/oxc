const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-undef-init.js
/**
* @fileoverview Rule to flag when initializing to undefined
* @author Ilya Volodin
*/
var require_no_undef_init = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), CONSTANT_BINDINGS = new Set([
		"const",
		"using",
		"await using"
	]);
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Disallow initializing variables to `undefined`",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-undef-init"
			},
			schema: [],
			fixable: "code",
			messages: { unnecessaryUndefinedInit: "It's not necessary to initialize '{{name}}' to undefined." }
		},
		create(context) {
			let sourceCode = context.sourceCode;
			return { VariableDeclarator(node) {
				let name = sourceCode.getText(node.id), init = node.init && node.init.name, scope = sourceCode.getScope(node), undefinedVar = astUtils.getVariableByName(scope, "undefined"), shadowed = undefinedVar && undefinedVar.defs.length > 0, lastToken = sourceCode.getLastToken(node);
				init === "undefined" && !CONSTANT_BINDINGS.has(node.parent.kind) && !shadowed && context.report({
					node,
					messageId: "unnecessaryUndefinedInit",
					data: { name },
					fix(fixer) {
						return node.parent.kind === "var" || node.id.type === "ArrayPattern" || node.id.type === "ObjectPattern" || sourceCode.commentsExistBetween(node.id, lastToken) ? null : fixer.removeRange([node.id.range[1], node.range[1]]);
					}
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-undef-init.cjs
module.exports = require_no_undef_init().create;
//#endregion
