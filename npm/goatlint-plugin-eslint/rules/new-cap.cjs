const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/new-cap.js
/**
* @fileoverview Rule to flag use of constructors without capital letters
* @author Nicholas C. Zakas
*/
var require_new_cap = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), CAPS_ALLOWED = [
		"Array",
		"Boolean",
		"Date",
		"Error",
		"Function",
		"Number",
		"Object",
		"RegExp",
		"String",
		"Symbol",
		"BigInt"
	];
	/**
	* A reducer function to invert an array to an Object mapping the string form of the key, to `true`.
	* @param {Object} map Accumulator object for the reduce.
	* @param {string} key Object key to set to `true`.
	* @returns {Object} Returns the updated Object for further reduction.
	*/
	function invert(map, key) {
		return map[key] = !0, map;
	}
	/**
	* Creates an object with the cap is new exceptions as its keys and true as their values.
	* @param {Object} config Rule configuration
	* @returns {Object} Object with cap is new exceptions.
	*/
	function calculateCapIsNewExceptions(config) {
		return Array.from(new Set([...config.capIsNewExceptions, ...CAPS_ALLOWED])).reduce(invert, {});
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Require constructor names to begin with a capital letter",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/new-cap"
			},
			schema: [{
				type: "object",
				properties: {
					newIsCap: { type: "boolean" },
					capIsNew: { type: "boolean" },
					newIsCapExceptions: {
						type: "array",
						items: { type: "string" }
					},
					newIsCapExceptionPattern: { type: "string" },
					capIsNewExceptions: {
						type: "array",
						items: { type: "string" }
					},
					capIsNewExceptionPattern: { type: "string" },
					properties: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			defaultOptions: [{
				capIsNew: !0,
				capIsNewExceptions: CAPS_ALLOWED,
				newIsCap: !0,
				newIsCapExceptions: [],
				properties: !0
			}],
			messages: {
				upper: "A function with a name starting with an uppercase letter should only be used as a constructor.",
				lower: "A constructor name should not start with a lowercase letter."
			}
		},
		create(context) {
			let [config] = context.options, skipProperties = !config.properties, newIsCapExceptions = config.newIsCapExceptions.reduce(invert, {}), newIsCapExceptionPattern = config.newIsCapExceptionPattern ? new RegExp(config.newIsCapExceptionPattern, "u") : null, capIsNewExceptions = calculateCapIsNewExceptions(config), capIsNewExceptionPattern = config.capIsNewExceptionPattern ? new RegExp(config.capIsNewExceptionPattern, "u") : null, listeners = {}, sourceCode = context.sourceCode;
			/**
			* Get exact callee name from expression
			* @param {ASTNode} node CallExpression or NewExpression node
			* @returns {string} name
			*/
			function extractNameFromExpression(node) {
				return node.callee.type === "Identifier" ? node.callee.name : astUtils.getStaticPropertyName(node.callee) || "";
			}
			/**
			* Returns the capitalization state of the string -
			* Whether the first character is uppercase, lowercase, or non-alphabetic
			* @param {string} str String
			* @returns {string} capitalization state: "non-alpha", "lower", or "upper"
			*/
			function getCap(str) {
				let firstChar = str.charAt(0), firstCharLower = firstChar.toLowerCase();
				return firstCharLower === firstChar.toUpperCase() ? "non-alpha" : firstChar === firstCharLower ? "lower" : "upper";
			}
			/**
			* Check if capitalization is allowed for a CallExpression
			* @param {Object} allowedMap Object mapping calleeName to a Boolean
			* @param {ASTNode} node CallExpression node
			* @param {string} calleeName Capitalized callee name from a CallExpression
			* @param {Object} pattern RegExp object from options pattern
			* @returns {boolean} Returns true if the callee may be capitalized
			*/
			function isCapAllowed(allowedMap, node, calleeName, pattern) {
				let sourceText = sourceCode.getText(node.callee);
				if (allowedMap[calleeName] || allowedMap[sourceText] || pattern && pattern.test(sourceText)) return !0;
				let callee = astUtils.skipChainExpression(node.callee);
				return calleeName === "UTC" && callee.type === "MemberExpression" ? callee.object.type === "Identifier" && callee.object.name === "Date" : skipProperties && callee.type === "MemberExpression";
			}
			/**
			* Reports the given messageId for the given node. The location will be the start of the property or the callee.
			* @param {ASTNode} node CallExpression or NewExpression node.
			* @param {string} messageId The messageId to report.
			* @returns {void}
			*/
			function report(node, messageId) {
				let callee = astUtils.skipChainExpression(node.callee);
				callee.type === "MemberExpression" && (callee = callee.property), context.report({
					node,
					loc: callee.loc,
					messageId
				});
			}
			return config.newIsCap && (listeners.NewExpression = function(node) {
				let constructorName = extractNameFromExpression(node);
				constructorName && (getCap(constructorName) !== "lower" || isCapAllowed(newIsCapExceptions, node, constructorName, newIsCapExceptionPattern) || report(node, "lower"));
			}), config.capIsNew && (listeners.CallExpression = function(node) {
				let calleeName = extractNameFromExpression(node);
				calleeName && (getCap(calleeName) !== "upper" || isCapAllowed(capIsNewExceptions, node, calleeName, capIsNewExceptionPattern) || report(node, "upper"));
			}), listeners;
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/new-cap.cjs
module.exports = require_new_cap().create;
//#endregion
