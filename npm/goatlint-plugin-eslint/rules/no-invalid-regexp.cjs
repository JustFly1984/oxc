const require_chunk = require("../common/chunk.cjs"), require_regexpp$1 = require("../common/regexpp.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-invalid-regexp.js
/**
* @fileoverview Validate strings passed to the RegExp constructor
* @author Michael Ficarra
*/
var require_no_invalid_regexp = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let RegExpValidator = require_regexpp$1.t().RegExpValidator, validator = new RegExpValidator(), validFlags = "dgimsuvy";
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			defaultOptions: [{}],
			docs: {
				description: "Disallow invalid regular expression strings in `RegExp` constructors",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-invalid-regexp"
			},
			schema: [{
				type: "object",
				properties: { allowConstructorFlags: {
					type: "array",
					items: { type: "string" }
				} },
				additionalProperties: !1
			}],
			messages: { regexMessage: "{{message}}." }
		},
		create(context) {
			let [{ allowConstructorFlags }] = context.options, allowedFlags = [];
			if (allowConstructorFlags) {
				let temp = allowConstructorFlags.join("").replace(RegExp(`[${validFlags}]`, "gu"), "");
				temp && (allowedFlags = [...new Set(temp)]);
			}
			/**
			* Reports error with the provided message.
			* @param {ASTNode} node The node holding the invalid RegExp
			* @param {string} message The message to report.
			* @returns {void}
			*/
			function report(node, message) {
				context.report({
					node,
					messageId: "regexMessage",
					data: { message }
				});
			}
			/**
			* Check if node is a string
			* @param {ASTNode} node node to evaluate
			* @returns {boolean} True if its a string
			* @private
			*/
			function isString(node) {
				return node && node.type === "Literal" && typeof node.value == "string";
			}
			/**
			* Gets flags of a regular expression created by the given `RegExp()` or `new RegExp()` call
			* Examples:
			*     new RegExp(".")         // => ""
			*     new RegExp(".", "gu")   // => "gu"
			*     new RegExp(".", flags)  // => null
			* @param {ASTNode} node `CallExpression` or `NewExpression` node
			* @returns {string|null} flags if they can be determined, `null` otherwise
			* @private
			*/
			function getFlags(node) {
				return node.arguments.length < 2 ? "" : isString(node.arguments[1]) ? node.arguments[1].value : null;
			}
			/**
			* Check syntax error in a given pattern.
			* @param {string} pattern The RegExp pattern to validate.
			* @param {Object} flags The RegExp flags to validate.
			* @param {boolean} [flags.unicode] The Unicode flag.
			* @param {boolean} [flags.unicodeSets] The UnicodeSets flag.
			* @returns {string|null} The syntax error.
			*/
			function validateRegExpPattern(pattern, flags) {
				try {
					return validator.validatePattern(pattern, void 0, void 0, flags), null;
				} catch (err) {
					return err.message;
				}
			}
			/**
			* Check syntax error in a given flags.
			* @param {string|null} flags The RegExp flags to validate.
			* @param {string|null} flagsToCheck The RegExp invalid flags.
			* @param {string} allFlags all valid and allowed flags.
			* @returns {string|null} The syntax error.
			*/
			function validateRegExpFlags(flags, flagsToCheck, allFlags) {
				let duplicateFlags = [];
				if (typeof flagsToCheck == "string") for (let flag of flagsToCheck) allFlags.includes(flag) && duplicateFlags.push(flag);
				return flags && flags.includes("u") && flags.includes("v") ? "Regex 'u' and 'v' flags cannot be used together" : duplicateFlags.length > 0 ? `Duplicate flags ('${duplicateFlags.join("")}') supplied to RegExp constructor` : flagsToCheck ? `Invalid flags supplied to RegExp constructor '${flagsToCheck}'` : null;
			}
			return { "CallExpression, NewExpression"(node) {
				if (node.callee.type !== "Identifier" || node.callee.name !== "RegExp") return;
				let flags = getFlags(node), flagsToCheck = flags, allFlags = allowedFlags.length > 0 ? validFlags.split("").concat(allowedFlags) : validFlags.split("");
				flags && allFlags.forEach((flag) => {
					flagsToCheck = flagsToCheck.replace(flag, "");
				});
				let message = validateRegExpFlags(flags, flagsToCheck, allFlags);
				if (message) {
					report(node, message);
					return;
				}
				if (!isString(node.arguments[0])) return;
				let pattern = node.arguments[0].value;
				message = flags === null ? validateRegExpPattern(pattern, {
					unicode: !0,
					unicodeSets: !1
				}) && validateRegExpPattern(pattern, {
					unicode: !1,
					unicodeSets: !0
				}) && validateRegExpPattern(pattern, {
					unicode: !1,
					unicodeSets: !1
				}) : validateRegExpPattern(pattern, {
					unicode: flags.includes("u"),
					unicodeSets: flags.includes("v")
				}), message && report(node, message);
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-invalid-regexp.cjs
module.exports = require_no_invalid_regexp().create;
//#endregion
