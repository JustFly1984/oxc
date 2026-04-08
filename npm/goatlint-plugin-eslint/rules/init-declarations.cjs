//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/init-declarations.js
/**
* @fileoverview A rule to control the style of variable initializations.
* @author Colin Ihrig
*/
var require_init_declarations = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	let CONSTANT_BINDINGS = new Set([
		"const",
		"using",
		"await using"
	]);
	/**
	* Checks whether or not a given node is a for loop.
	* @param {ASTNode} block A node to check.
	* @returns {boolean} `true` when the node is a for loop.
	*/
	function isForLoop(block) {
		return block.type === "ForInStatement" || block.type === "ForOfStatement" || block.type === "ForStatement";
	}
	/**
	* Checks whether or not a given declarator node has its initializer.
	* @param {ASTNode} node A declarator node to check.
	* @returns {boolean} `true` when the node has its initializer.
	*/
	function isInitialized(node) {
		let declaration = node.parent, block = declaration.parent;
		return isForLoop(block) ? block.type === "ForStatement" ? block.init === declaration : block.left === declaration : !!node.init;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			dialects: ["typescript", "javascript"],
			language: "javascript",
			docs: {
				description: "Require or disallow initialization in variable declarations",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/init-declarations"
			},
			schema: { anyOf: [{
				type: "array",
				items: [{ enum: ["always"] }],
				minItems: 0,
				maxItems: 1
			}, {
				type: "array",
				items: [{ enum: ["never"] }, {
					type: "object",
					properties: { ignoreForLoopInit: { type: "boolean" } },
					additionalProperties: !1
				}],
				minItems: 0,
				maxItems: 2
			}] },
			messages: {
				initialized: "Variable '{{idName}}' should be initialized on declaration.",
				notInitialized: "Variable '{{idName}}' should not be initialized on declaration."
			}
		},
		create(context) {
			let MODE_ALWAYS = "always", mode = context.options[0] || MODE_ALWAYS, params = context.options[1] || {}, insideDeclaredNamespace = !1;
			return {
				TSModuleDeclaration(node) {
					node.declare && (insideDeclaredNamespace = !0);
				},
				"TSModuleDeclaration:exit"(node) {
					node.declare && (insideDeclaredNamespace = !1);
				},
				"VariableDeclaration:exit"(node) {
					let kind = node.kind, declarations = node.declarations;
					if (!(node.declare || insideDeclaredNamespace)) for (let i = 0; i < declarations.length; ++i) {
						let declaration = declarations[i], id = declaration.id, initialized = isInitialized(declaration), isIgnoredForLoop = params.ignoreForLoopInit && isForLoop(node.parent), messageId = "";
						mode === MODE_ALWAYS && !initialized ? messageId = "initialized" : mode === "never" && !CONSTANT_BINDINGS.has(kind) && initialized && !isIgnoredForLoop && (messageId = "notInitialized"), id.type === "Identifier" && messageId && context.report({
							node: declaration,
							messageId,
							data: { idName: id.name }
						});
					}
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/init-declarations.cjs
module.exports = require_init_declarations().create;
//#endregion
