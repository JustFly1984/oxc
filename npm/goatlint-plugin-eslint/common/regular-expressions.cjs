const require_chunk = require("./chunk.cjs"), require_regexpp$1 = require("./regexpp.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/utils/regular-expressions.js
/**
* @fileoverview Common utils for regular expressions.
* @author Josh Goldberg
* @author Toru Nagashima
*/
var require_regular_expressions = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { RegExpValidator } = require_regexpp$1.t(), REGEXPP_LATEST_ECMA_VERSION = 2025;
	/**
	* Checks if the given regular expression pattern would be valid with the `u` flag.
	* @param {number} ecmaVersion ECMAScript version to parse in.
	* @param {string} pattern The regular expression pattern to verify.
	* @param {"u"|"v"} flag The type of Unicode flag
	* @returns {boolean} `true` if the pattern would be valid with the `u` flag.
	* `false` if the pattern would be invalid with the `u` flag or the configured
	* ecmaVersion doesn't support the `u` flag.
	*/
	function isValidWithUnicodeFlag(ecmaVersion, pattern, flag = "u") {
		if (flag === "u" && ecmaVersion <= 5 || flag === "v" && ecmaVersion <= 2023) return !1;
		let validator = new RegExpValidator({ ecmaVersion: Math.min(ecmaVersion, REGEXPP_LATEST_ECMA_VERSION) });
		try {
			validator.validatePattern(pattern, void 0, void 0, flag === "u" ? { unicode: !0 } : { unicodeSets: !0 });
		} catch {
			return !1;
		}
		return !0;
	}
	module.exports = {
		isValidWithUnicodeFlag,
		REGEXPP_LATEST_ECMA_VERSION
	};
}));
//#endregion
Object.defineProperty(exports, "t", {
	enumerable: !0,
	get: function() {
		return require_regular_expressions;
	}
});
