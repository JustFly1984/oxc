const require_chunk = require("../common/chunk.cjs"), require_eslint_utils$1 = require("../common/eslint-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/for-direction.js
/**
* @fileoverview enforce `for` loop update clause moving the counter in the right direction.(for-direction)
* @author Aladdin-ADD<hh_2013@foxmail.com>
*/
var require_for_direction = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { getStaticValue } = require_eslint_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Enforce `for` loop update clause moving the counter in the right direction",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/for-direction"
			},
			fixable: null,
			schema: [],
			messages: { incorrectDirection: "The update clause in this loop moves the variable in the wrong direction." }
		},
		create(context) {
			let { sourceCode } = context;
			/**
			* report an error.
			* @param {ASTNode} node the node to report.
			* @returns {void}
			*/
			function report(node) {
				context.report({
					loc: {
						start: node.loc.start,
						end: sourceCode.getTokenBefore(node.body).loc.end
					},
					messageId: "incorrectDirection"
				});
			}
			/**
			* check the right side of the assignment
			* @param {ASTNode} update UpdateExpression to check
			* @param {number} dir expected direction that could either be turned around or invalidated
			* @returns {number} return dir, the negated dir, or zero if the counter does not change or the direction is not clear
			*/
			function getRightDirection(update, dir) {
				let staticValue = getStaticValue(update.right, sourceCode.getScope(update));
				return staticValue && [
					"bigint",
					"boolean",
					"number"
				].includes(typeof staticValue.value) ? dir * (Math.sign(Number(staticValue.value)) || 0) : 0;
			}
			/**
			* check UpdateExpression add/sub the counter
			* @param {ASTNode} update UpdateExpression to check
			* @param {string} counter variable name to check
			* @returns {number} if add return 1, if sub return -1, if nochange, return 0
			*/
			function getUpdateDirection(update, counter) {
				if (update.argument.type === "Identifier" && update.argument.name === counter) {
					if (update.operator === "++") return 1;
					if (update.operator === "--") return -1;
				}
				return 0;
			}
			/**
			* check AssignmentExpression add/sub the counter
			* @param {ASTNode} update AssignmentExpression to check
			* @param {string} counter variable name to check
			* @returns {number} if add return 1, if sub return -1, if nochange, return 0
			*/
			function getAssignmentDirection(update, counter) {
				if (update.left.name === counter) {
					if (update.operator === "+=") return getRightDirection(update, 1);
					if (update.operator === "-=") return getRightDirection(update, -1);
				}
				return 0;
			}
			return { ForStatement(node) {
				if (node.test && node.test.type === "BinaryExpression" && node.update) for (let counterPosition of ["left", "right"]) {
					if (node.test[counterPosition].type !== "Identifier") continue;
					let counter = node.test[counterPosition].name, operator = node.test.operator, update = node.update, wrongDirection;
					if (operator === "<" || operator === "<=") wrongDirection = counterPosition === "left" ? -1 : 1;
					else if (operator === ">" || operator === ">=") wrongDirection = counterPosition === "left" ? 1 : -1;
					else return;
					update.type === "UpdateExpression" ? getUpdateDirection(update, counter) === wrongDirection && report(node) : update.type === "AssignmentExpression" && getAssignmentDirection(update, counter) === wrongDirection && report(node);
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/for-direction.cjs
module.exports = require_for_direction().create;
//#endregion
