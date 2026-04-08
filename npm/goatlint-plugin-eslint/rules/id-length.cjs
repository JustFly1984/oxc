const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs"), require_string_utils$1 = require("../common/string-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/id-length.js
/**
* @fileoverview Rule that warns when identifier names are shorter or longer
* than the values provided in configuration.
* @author Burak Yigit Kaya aka BYK
*/
var require_id_length = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { getGraphemeCount } = require_string_utils$1.t(), { getModuleExportName, isImportAttributeKey } = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				exceptionPatterns: [],
				exceptions: [],
				min: 2,
				properties: "always"
			}],
			docs: {
				description: "Enforce minimum and maximum identifier lengths",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/id-length"
			},
			schema: [{
				type: "object",
				properties: {
					min: { type: "integer" },
					max: { type: "integer" },
					exceptions: {
						type: "array",
						uniqueItems: !0,
						items: { type: "string" }
					},
					exceptionPatterns: {
						type: "array",
						uniqueItems: !0,
						items: { type: "string" }
					},
					properties: { enum: ["always", "never"] }
				},
				additionalProperties: !1
			}],
			messages: {
				tooShort: "Identifier name '{{name}}' is too short (< {{min}}).",
				tooShortPrivate: "Identifier name '#{{name}}' is too short (< {{min}}).",
				tooLong: "Identifier name '{{name}}' is too long (> {{max}}).",
				tooLongPrivate: "Identifier name #'{{name}}' is too long (> {{max}})."
			}
		},
		create(context) {
			let [options] = context.options, { max: maxLength = Infinity, min: minLength } = options, properties = options.properties !== "never", exceptions = new Set(options.exceptions), exceptionPatterns = options.exceptionPatterns.map((pattern) => new RegExp(pattern, "u")), reportedNodes = /* @__PURE__ */ new Set();
			/**
			* Checks if a string matches the provided exception patterns
			* @param {string} name The string to check.
			* @returns {boolean} if the string is a match
			* @private
			*/
			function matchesExceptionPattern(name) {
				return exceptionPatterns.some((pattern) => pattern.test(name));
			}
			let SUPPORTED_EXPRESSIONS = {
				MemberExpression: properties && function(parent) {
					return !parent.computed && (parent.parent.left === parent && parent.parent.type === "AssignmentExpression" || parent.parent.type === "Property" && parent.parent.value === parent && parent.parent.parent.type === "ObjectPattern" && parent.parent.parent.parent.left === parent.parent.parent);
				},
				AssignmentPattern(parent, node) {
					return parent.left === node;
				},
				VariableDeclarator(parent, node) {
					return parent.id === node;
				},
				Property(parent, node) {
					if (parent.parent.type === "ObjectPattern") {
						let isKeyAndValueSame = parent.value.name === parent.key.name;
						return !isKeyAndValueSame && parent.value === node || isKeyAndValueSame && parent.key === node && properties;
					}
					return properties && !isImportAttributeKey(node) && !parent.computed && parent.key.name === node.name;
				},
				ImportSpecifier(parent, node) {
					return parent.local === node && getModuleExportName(parent.imported) !== getModuleExportName(parent.local);
				},
				ImportDefaultSpecifier: !0,
				ImportNamespaceSpecifier: !0,
				RestElement: !0,
				FunctionExpression: !0,
				ArrowFunctionExpression: !0,
				ClassDeclaration: !0,
				FunctionDeclaration: !0,
				MethodDefinition: !0,
				PropertyDefinition: !0,
				CatchClause: !0,
				ArrayPattern: !0
			};
			return { [["Identifier", "PrivateIdentifier"]](node) {
				let name = node.name, parent = node.parent, nameLength = getGraphemeCount(name), isShort = nameLength < minLength;
				if (!(isShort || nameLength > maxLength) || exceptions.has(name) || matchesExceptionPattern(name)) return;
				let isValidExpression = SUPPORTED_EXPRESSIONS[parent.type];
				if (isValidExpression && !reportedNodes.has(node.range.toString()) && (isValidExpression === !0 || isValidExpression(parent, node))) {
					reportedNodes.add(node.range.toString());
					let messageId = isShort ? "tooShort" : "tooLong";
					node.type === "PrivateIdentifier" && (messageId += "Private"), context.report({
						node,
						messageId,
						data: {
							name,
							min: minLength,
							max: maxLength
						}
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/id-length.cjs
module.exports = require_id_length().create;
//#endregion
