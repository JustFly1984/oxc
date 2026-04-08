const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_ignore$1 = require("../common/ignore.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-restricted-modules.js
/**
* @fileoverview Restrict usage of specified node modules.
* @author Christian Schulz
* @deprecated in ESLint v7.0.0
*/
var require_no_restricted_modules = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), ignore = require_ignore$1.t(), arrayOfStrings = {
		type: "array",
		items: { type: "string" },
		uniqueItems: !0
	}, arrayOfStringsOrObjects = {
		type: "array",
		items: { anyOf: [{ type: "string" }, {
			type: "object",
			properties: {
				name: { type: "string" },
				message: {
					type: "string",
					minLength: 1
				}
			},
			additionalProperties: !1,
			required: ["name"]
		}] },
		uniqueItems: !0
	};
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
						name: "no-restricted-require",
						url: "https://github.com/eslint-community/eslint-plugin-n/tree/master/docs/rules/no-restricted-require.md"
					}
				}]
			},
			type: "suggestion",
			docs: {
				description: "Disallow specified modules when loaded by `require`",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-restricted-modules"
			},
			schema: { anyOf: [arrayOfStringsOrObjects, {
				type: "array",
				items: {
					type: "object",
					properties: {
						paths: arrayOfStringsOrObjects,
						patterns: arrayOfStrings
					},
					additionalProperties: !1
				},
				additionalItems: !1
			}] },
			messages: {
				defaultMessage: "'{{name}}' module is restricted from being used.",
				customMessage: "'{{name}}' module is restricted from being used. {{customMessage}}",
				patternMessage: "'{{name}}' module is restricted from being used by a pattern."
			}
		},
		create(context) {
			let options = Array.isArray(context.options) ? context.options : [], isPathAndPatternsObject = typeof options[0] == "object" && (Object.hasOwn(options[0], "paths") || Object.hasOwn(options[0], "patterns")), restrictedPaths = (isPathAndPatternsObject ? options[0].paths : context.options) || [], restrictedPatterns = (isPathAndPatternsObject ? options[0].patterns : []) || [], restrictedPathMessages = restrictedPaths.reduce((memo, importName) => (typeof importName == "string" ? memo[importName] = null : memo[importName.name] = importName.message, memo), {});
			if (Object.keys(restrictedPaths).length === 0 && restrictedPatterns.length === 0) return {};
			let ig = ignore({ allowRelativePaths: !0 }).add(restrictedPatterns);
			/**
			* Function to check if a node is a string literal.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} If the node is a string literal.
			*/
			function isStringLiteral(node) {
				return node && node.type === "Literal" && typeof node.value == "string";
			}
			/**
			* Function to check if a node is a require call.
			* @param {ASTNode} node The node to check.
			* @returns {boolean} If the node is a require call.
			*/
			function isRequireCall(node) {
				return node.callee.type === "Identifier" && node.callee.name === "require";
			}
			/**
			* Extract string from Literal or TemplateLiteral node
			* @param {ASTNode} node The node to extract from
			* @returns {string|null} Extracted string or null if node doesn't represent a string
			*/
			function getFirstArgumentString(node) {
				return isStringLiteral(node) ? node.value.trim() : astUtils.isStaticTemplateLiteral(node) ? node.quasis[0].value.cooked.trim() : null;
			}
			/**
			* Report a restricted path.
			* @param {node} node representing the restricted path reference
			* @param {string} name restricted path
			* @returns {void}
			* @private
			*/
			function reportPath(node, name) {
				let customMessage = restrictedPathMessages[name], messageId = customMessage ? "customMessage" : "defaultMessage";
				context.report({
					node,
					messageId,
					data: {
						name,
						customMessage
					}
				});
			}
			/**
			* Check if the given name is a restricted path name
			* @param {string} name name of a variable
			* @returns {boolean} whether the variable is a restricted path or not
			* @private
			*/
			function isRestrictedPath(name) {
				return Object.hasOwn(restrictedPathMessages, name);
			}
			return { CallExpression(node) {
				if (isRequireCall(node) && node.arguments.length) {
					let name = getFirstArgumentString(node.arguments[0]);
					name && (isRestrictedPath(name) && reportPath(node, name), restrictedPatterns.length > 0 && ig.ignores(name) && context.report({
						node,
						messageId: "patternMessage",
						data: { name }
					}));
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-restricted-modules.cjs
module.exports = require_no_restricted_modules().create;
//#endregion
