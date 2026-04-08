const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-labels.js
/**
* @fileoverview Disallow Labeled Statements
* @author Nicholas C. Zakas
*/
var require_no_labels = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			defaultOptions: [{
				allowLoop: !1,
				allowSwitch: !1
			}],
			docs: {
				description: "Disallow labeled statements",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/no-labels"
			},
			schema: [{
				type: "object",
				properties: {
					allowLoop: { type: "boolean" },
					allowSwitch: { type: "boolean" }
				},
				additionalProperties: !1
			}],
			messages: {
				unexpectedLabel: "Unexpected labeled statement.",
				unexpectedLabelInBreak: "Unexpected label in break statement.",
				unexpectedLabelInContinue: "Unexpected label in continue statement."
			}
		},
		create(context) {
			let [{ allowLoop, allowSwitch }] = context.options, scopeInfo = null;
			/**
			* Gets the kind of a given node.
			* @param {ASTNode} node A node to get.
			* @returns {string} The kind of the node.
			*/
			function getBodyKind(node) {
				return astUtils.isLoop(node) ? "loop" : node.type === "SwitchStatement" ? "switch" : "other";
			}
			/**
			* Checks whether the label of a given kind is allowed or not.
			* @param {string} kind A kind to check.
			* @returns {boolean} `true` if the kind is allowed.
			*/
			function isAllowed(kind) {
				switch (kind) {
					case "loop": return allowLoop;
					case "switch": return allowSwitch;
					default: return !1;
				}
			}
			/**
			* Checks whether a given name is a label of a loop or not.
			* @param {string} label A name of a label to check.
			* @returns {boolean} `true` if the name is a label of a loop.
			*/
			function getKind(label) {
				let info = scopeInfo;
				for (; info;) {
					if (info.label === label) return info.kind;
					info = info.upper;
				}
				/* c8 ignore next */
				return "other";
			}
			return {
				LabeledStatement(node) {
					scopeInfo = {
						label: node.label.name,
						kind: getBodyKind(node.body),
						upper: scopeInfo
					};
				},
				"LabeledStatement:exit"(node) {
					isAllowed(scopeInfo.kind) || context.report({
						node,
						messageId: "unexpectedLabel"
					}), scopeInfo = scopeInfo.upper;
				},
				BreakStatement(node) {
					node.label && !isAllowed(getKind(node.label.name)) && context.report({
						node,
						messageId: "unexpectedLabelInBreak"
					});
				},
				ContinueStatement(node) {
					node.label && !isAllowed(getKind(node.label.name)) && context.report({
						node,
						messageId: "unexpectedLabelInContinue"
					});
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-labels.cjs
module.exports = require_no_labels().create;
//#endregion
