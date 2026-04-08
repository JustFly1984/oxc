const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/semi-style.js
/**
* @fileoverview Rule to enforce location of semicolons.
* @author Toru Nagashima
* @deprecated in ESLint v8.53.0
*/
var require_semi_style = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t(), SELECTOR = [
		"BreakStatement",
		"ContinueStatement",
		"DebuggerStatement",
		"DoWhileStatement",
		"ExportAllDeclaration",
		"ExportDefaultDeclaration",
		"ExportNamedDeclaration",
		"ExpressionStatement",
		"ImportDeclaration",
		"ReturnStatement",
		"ThrowStatement",
		"VariableDeclaration",
		"PropertyDefinition"
	].join(",");
	/**
	* Get the child node list of a given node.
	* This returns `BlockStatement#body`, `StaticBlock#body`, `Program#body`,
	* `ClassBody#body`, or `SwitchCase#consequent`.
	* This is used to check whether a node is the first/last child.
	* @param {Node} node A node to get child node list.
	* @returns {Node[]|null} The child node list.
	*/
	function getChildren(node) {
		let t = node.type;
		return t === "BlockStatement" || t === "StaticBlock" || t === "Program" || t === "ClassBody" ? node.body : t === "SwitchCase" ? node.consequent : null;
	}
	/**
	* Check whether a given node is the last statement in the parent block.
	* @param {Node} node A node to check.
	* @returns {boolean} `true` if the node is the last statement in the parent block.
	*/
	function isLastChild(node) {
		let t = node.parent.type;
		if (t === "IfStatement" && node.parent.consequent === node && node.parent.alternate || t === "DoWhileStatement") return !0;
		let nodeList = getChildren(node.parent);
		return nodeList !== null && nodeList.at(-1) === node;
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			deprecated: {
				message: "Formatting rules are being moved out of ESLint core.",
				url: "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
				deprecatedSince: "8.53.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "ESLint Stylistic now maintains deprecated stylistic core rules.",
					url: "https://eslint.style/guide/migration",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "semi-style",
						url: "https://eslint.style/rules/semi-style"
					}
				}]
			},
			type: "layout",
			docs: {
				description: "Enforce location of semicolons",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/semi-style"
			},
			schema: [{ enum: ["last", "first"] }],
			fixable: "whitespace",
			messages: { expectedSemiColon: "Expected this semicolon to be at {{pos}}." }
		},
		create(context) {
			let sourceCode = context.sourceCode, option = context.options[0] || "last";
			/**
			* Check the given semicolon token.
			* @param {Token} semiToken The semicolon token to check.
			* @param {"first"|"last"} expected The expected location to check.
			* @returns {void}
			*/
			function check(semiToken, expected) {
				let prevToken = sourceCode.getTokenBefore(semiToken), nextToken = sourceCode.getTokenAfter(semiToken), prevIsSameLine = !prevToken || astUtils.isTokenOnSameLine(prevToken, semiToken), nextIsSameLine = !nextToken || astUtils.isTokenOnSameLine(semiToken, nextToken);
				(expected === "last" && !prevIsSameLine || expected === "first" && !nextIsSameLine) && context.report({
					loc: semiToken.loc,
					messageId: "expectedSemiColon",
					data: { pos: expected === "last" ? "the end of the previous line" : "the beginning of the next line" },
					fix(fixer) {
						if (prevToken && nextToken && sourceCode.commentsExistBetween(prevToken, nextToken)) return null;
						let start = prevToken ? prevToken.range[1] : semiToken.range[0], end = nextToken ? nextToken.range[0] : semiToken.range[1], text = expected === "last" ? ";\n" : "\n;";
						return fixer.replaceTextRange([start, end], text);
					}
				});
			}
			return {
				[SELECTOR](node) {
					if (option === "first" && isLastChild(node)) return;
					let lastToken = sourceCode.getLastToken(node);
					astUtils.isSemicolonToken(lastToken) && check(lastToken, option);
				},
				ForStatement(node) {
					let firstSemi = node.init && sourceCode.getTokenAfter(node.init, astUtils.isSemicolonToken), secondSemi = node.test && sourceCode.getTokenAfter(node.test, astUtils.isSemicolonToken);
					firstSemi && check(firstSemi, "last"), secondSemi && check(secondSemi, "last");
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/semi-style.cjs
module.exports = require_semi_style().create;
//#endregion
