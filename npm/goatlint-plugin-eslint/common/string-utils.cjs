//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/shared/string-utils.js
/**
* @fileoverview Utilities to operate on strings.
* @author Stephen Wade
*/
var require_string_utils = /* @__PURE__ */ require("./chunk.cjs").t(((exports, module) => {
	let ASCII_REGEX = /^[\u0000-\u007f]*$/u, segmenter;
	/**
	* Converts the first letter of a string to uppercase.
	* @param {string} string The string to operate on
	* @returns {string} The converted string
	*/
	function upperCaseFirst(string) {
		return string.length <= 1 ? string.toUpperCase() : string[0].toUpperCase() + string.slice(1);
	}
	/**
	* Counts graphemes in a given string.
	* @param {string} value A string to count graphemes.
	* @returns {number} The number of graphemes in `value`.
	*/
	function getGraphemeCount(value) {
		if (ASCII_REGEX.test(value)) return value.length;
		segmenter ??= new Intl.Segmenter("en-US");
		let graphemeCount = 0;
		for (let unused of segmenter.segment(value)) graphemeCount++;
		return graphemeCount;
	}
	module.exports = {
		upperCaseFirst,
		getGraphemeCount
	};
}));
//#endregion
Object.defineProperty(exports, "t", {
	enumerable: !0,
	get: function() {
		return require_string_utils;
	}
});
