//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-loss-of-precision.js
/**
* @fileoverview Rule to flag numbers that will lose significant figure precision at runtime
* @author Jacob Moore
*/
var require_no_loss_of_precision = /* @__PURE__ */ require("../common/chunk.cjs").t(((exports, module) => {
	/** Class representing a number in scientific notation. */
	var ScientificNotation = class {
		/** @type {string} The digits of the coefficient. A decimal point is implied after the first digit. */
		coefficient;
		/** @type {number} The order of magnitude. */
		magnitude;
		constructor(coefficient, magnitude) {
			this.coefficient = coefficient, this.magnitude = magnitude;
		}
		/* c8 ignore start -- debug only */
		toString() {
			return `${this.coefficient[0]}${this.coefficient.length > 1 ? `.${this.coefficient.slice(1)}` : ""}e${this.magnitude}`;
		}
	};
	/**
	* Returns whether the node is number literal
	* @param {Node} node the node literal being evaluated
	* @returns {boolean} true if the node is a number literal
	*/
	function isNumber(node) {
		return typeof node.value == "number";
	}
	/**
	* Gets the source code of the given number literal. Removes `_` numeric separators from the result.
	* @param {Node} node the number `Literal` node
	* @returns {string} raw source code of the literal, without numeric separators
	*/
	function getRaw(node) {
		return node.raw.replace(/_/gu, "");
	}
	/**
	* Checks whether the number is base ten
	* @param {ASTNode} node the node being evaluated
	* @returns {boolean} true if the node is in base ten
	*/
	function isBaseTen(node) {
		return [
			"0x",
			"0X",
			"0b",
			"0B",
			"0o",
			"0O"
		].every((prefix) => !node.raw.startsWith(prefix)) && !/^0[0-7]+$/u.test(node.raw);
	}
	/**
	* Checks that the user-intended non-base ten number equals the actual number after is has been converted to the Number type
	* @param {Node} node the node being evaluated
	* @returns {boolean} true if they do not match
	*/
	function notBaseTenLosesPrecision(node) {
		let rawString = getRaw(node).toUpperCase(), base;
		return base = rawString.startsWith("0B") ? 2 : rawString.startsWith("0X") ? 16 : 8, !rawString.endsWith(node.value.toString(base).toUpperCase());
	}
	/**
	* Returns the number stripped of leading zeros
	* @param {string} numberAsString the string representation of the number
	* @returns {string} the stripped string
	*/
	function removeLeadingZeros(numberAsString) {
		for (let i = 0; i < numberAsString.length; i++) if (numberAsString[i] !== "0") return numberAsString.slice(i);
		return numberAsString;
	}
	/**
	* Returns the number stripped of trailing zeros
	* @param {string} numberAsString the string representation of the number
	* @returns {string} the stripped string
	*/
	function removeTrailingZeros(numberAsString) {
		for (let i = numberAsString.length - 1; i >= 0; i--) if (numberAsString[i] !== "0") return numberAsString.slice(0, i + 1);
		return numberAsString;
	}
	/**
	* Converts an integer to an object containing the integer's coefficient and order of magnitude
	* @param {string} stringInteger the string representation of the integer being converted
	* @returns {ScientificNotation} the object containing the integer's coefficient and order of magnitude
	*/
	function normalizeInteger(stringInteger) {
		let trimmedInteger = removeLeadingZeros(stringInteger);
		return new ScientificNotation(removeTrailingZeros(trimmedInteger), trimmedInteger.length - 1);
	}
	/**
	* Converts a float to an object containing the float's coefficient and order of magnitude
	* @param {string} stringFloat the string representation of the float being converted
	* @returns {ScientificNotation} the object containing the float's coefficient and order of magnitude
	*/
	function normalizeFloat(stringFloat) {
		let trimmedFloat = removeLeadingZeros(stringFloat), indexOfDecimalPoint = trimmedFloat.indexOf(".");
		switch (indexOfDecimalPoint) {
			case 0: {
				let significantDigits = removeLeadingZeros(trimmedFloat.slice(1));
				return new ScientificNotation(significantDigits, significantDigits.length - trimmedFloat.length);
			}
			case -1: return new ScientificNotation(trimmedFloat, trimmedFloat.length - 1);
			default: return new ScientificNotation(trimmedFloat.replace(".", ""), indexOfDecimalPoint - 1);
		}
	}
	/**
	* Converts a base ten number to proper scientific notation
	* @param {string} stringNumber the string representation of the base ten number to be converted
	* @param {boolean} parseAsFloat if true, the coefficient will be always parsed as a float, regardless of whether a decimal point is present
	* @returns {ScientificNotation} the object containing the number's coefficient and order of magnitude
	*/
	function convertNumberToScientificNotation(stringNumber, parseAsFloat) {
		let splitNumber = stringNumber.split("e"), originalCoefficient = splitNumber[0], normalizedNumber = parseAsFloat || stringNumber.includes(".") ? normalizeFloat(originalCoefficient) : normalizeInteger(originalCoefficient);
		return splitNumber.length > 1 && (normalizedNumber.magnitude += parseInt(splitNumber[1], 10)), normalizedNumber;
	}
	/**
	* Checks that the user-intended base ten number equals the actual number after is has been converted to the Number type
	* @param {Node} node the node being evaluated
	* @returns {boolean} true if they do not match
	*/
	function baseTenLosesPrecision(node) {
		let normalizedRawNumber = convertNumberToScientificNotation(getRaw(node).toLowerCase(), !1), requestedPrecision = normalizedRawNumber.coefficient.length;
		if (requestedPrecision > 100) return !0;
		let normalizedStoredNumber = convertNumberToScientificNotation(node.value.toPrecision(requestedPrecision), !0);
		return normalizedRawNumber.magnitude !== normalizedStoredNumber.magnitude || normalizedRawNumber.coefficient !== normalizedStoredNumber.coefficient;
	}
	/**
	* Checks that the user-intended number equals the actual number after is has been converted to the Number type
	* @param {Node} node the node being evaluated
	* @returns {boolean} true if they do not match
	*/
	function losesPrecision(node) {
		return isBaseTen(node) ? baseTenLosesPrecision(node) : notBaseTenLosesPrecision(node);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			dialects: ["typescript", "javascript"],
			language: "javascript",
			docs: {
				description: "Disallow literal numbers that lose precision",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-loss-of-precision"
			},
			schema: [],
			messages: { noLossOfPrecision: "This number literal will lose precision at runtime." }
		},
		create(context) {
			return { Literal(node) {
				node.value && isNumber(node) && losesPrecision(node) && context.report({
					messageId: "noLossOfPrecision",
					node
				});
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-loss-of-precision.cjs
module.exports = require_no_loss_of_precision().create;
//#endregion
