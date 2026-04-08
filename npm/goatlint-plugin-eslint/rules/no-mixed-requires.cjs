//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-mixed-requires.js
/**
* @fileoverview Rule to enforce grouped require statements for Node.JS
* @author Raphael Pigulla
* @deprecated in ESLint v7.0.0
*/
var require_no_mixed_requires = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Node.js rules were moved out of ESLint core.",
				url: "https://eslint.org/docs/latest/use/migrating-to-7.0.0#deprecate-node-rules",
				deprecatedSince: "7.0.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "eslint-plugin-n now maintains deprecated Node.js-related rules.",
					plugin: {
						name: "eslint-plugin-n",
						url: "https://github.com/eslint-community/eslint-plugin-n"
					},
					rule: {
						name: "no-mixed-requires",
						url: "https://github.com/eslint-community/eslint-plugin-n/tree/master/docs/rules/no-mixed-requires.md"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Disallow `require` calls to be mixed with regular variable declarations",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-mixed-requires"
			},
			schema: [{ oneOf: [{ type: "boolean" }, {
				type: "object",
				properties: {
					grouping: { type: "boolean" },
					allowCall: { type: "boolean" }
				},
				additionalProperties: !1
			}] }],
			messages: {
				noMixRequire: "Do not mix 'require' and other declarations.",
				noMixCoreModuleFileComputed: "Do not mix core, module, file and computed requires."
			}
		},
		create(context) {
			let options = context.options[0], grouping = !1, allowCall = !1;
			typeof options == "object" ? (grouping = options.grouping, allowCall = options.allowCall) : grouping = !!options;
			/**
			* Returns the list of built-in modules.
			* @returns {string[]} An array of built-in Node.js modules.
			*/
			function getBuiltinModules() {
				return /* @__PURE__ */ "assert.buffer.child_process.cluster.crypto.dgram.dns.domain.events.fs.http.https.net.os.path.punycode.querystring.readline.repl.smalloc.stream.string_decoder.tls.tty.url.util.v8.vm.zlib".split(".");
			}
			let BUILTIN_MODULES = getBuiltinModules(), DECL_REQUIRE = "require", DECL_UNINITIALIZED = "uninitialized", DECL_OTHER = "other", REQ_COMPUTED = "computed";
			/**
			* Determines the type of a declaration statement.
			* @param {ASTNode} initExpression The init node of the VariableDeclarator.
			* @returns {string} The type of declaration represented by the expression.
			*/
			function getDeclarationType(initExpression) {
				return initExpression ? initExpression.type === "CallExpression" && initExpression.callee.type === "Identifier" && initExpression.callee.name === "require" ? DECL_REQUIRE : allowCall && initExpression.type === "CallExpression" && initExpression.callee.type === "CallExpression" ? getDeclarationType(initExpression.callee) : initExpression.type === "MemberExpression" ? getDeclarationType(initExpression.object) : DECL_OTHER : DECL_UNINITIALIZED;
			}
			/**
			* Determines the type of module that is loaded via require.
			* @param {ASTNode} initExpression The init node of the VariableDeclarator.
			* @returns {string} The module type.
			*/
			function inferModuleType(initExpression) {
				if (initExpression.type === "MemberExpression") return inferModuleType(initExpression.object);
				if (initExpression.arguments.length === 0) return REQ_COMPUTED;
				let arg = initExpression.arguments[0];
				return arg.type !== "Literal" || typeof arg.value != "string" ? REQ_COMPUTED : BUILTIN_MODULES.includes(arg.value) ? "core" : /^\.{0,2}\//u.test(arg.value) ? "file" : "module";
			}
			/**
			* Check if the list of variable declarations is mixed, i.e. whether it
			* contains both require and other declarations.
			* @param {ASTNode} declarations The list of VariableDeclarators.
			* @returns {boolean} True if the declarations are mixed, false if not.
			*/
			function isMixed(declarations) {
				let contains = {};
				return declarations.forEach((declaration) => {
					let type = getDeclarationType(declaration.init);
					contains[type] = !0;
				}), !!(contains[DECL_REQUIRE] && (contains[DECL_UNINITIALIZED] || contains[DECL_OTHER]));
			}
			/**
			* Check if all require declarations in the given list are of the same
			* type.
			* @param {ASTNode} declarations The list of VariableDeclarators.
			* @returns {boolean} True if the declarations are grouped, false if not.
			*/
			function isGrouped(declarations) {
				let found = {};
				return declarations.forEach((declaration) => {
					getDeclarationType(declaration.init) === DECL_REQUIRE && (found[inferModuleType(declaration.init)] = !0);
				}), Object.keys(found).length <= 1;
			}
			return { VariableDeclaration(node) {
				isMixed(node.declarations) ? context.report({
					node,
					messageId: "noMixRequire"
				}) : grouping && !isGrouped(node.declarations) && context.report({
					node,
					messageId: "noMixCoreModuleFileComputed"
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-mixed-requires.cjs
module.exports = require_no_mixed_requires().create;
//#endregion
