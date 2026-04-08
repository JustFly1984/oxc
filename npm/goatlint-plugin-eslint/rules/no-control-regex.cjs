const require_chunk = require("../common/chunk.cjs"), require_regexpp$1 = require("../common/regexpp.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/no-control-regex.js
/**
* @fileoverview Rule to forbid control characters from regular expressions.
* @author Nicholas C. Zakas
*/
var require_no_control_regex = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let RegExpValidator = require_regexpp$1.t().RegExpValidator, collector = new class {
		constructor() {
			this._source = "", this._controlChars = [], this._validator = new RegExpValidator(this);
		}
		onPatternEnter() {
			this._controlChars = [];
		}
		onCharacter(start, end, cp) {
			cp >= 0 && cp <= 31 && (this._source.codePointAt(start) === cp || this._source.slice(start, end).startsWith("\\x") || this._source.slice(start, end).startsWith("\\u")) && this._controlChars.push(`\\x${`0${cp.toString(16)}`.slice(-2)}`);
		}
		collectControlChars(regexpStr, flags) {
			let uFlag = typeof flags == "string" && flags.includes("u"), vFlag = typeof flags == "string" && flags.includes("v");
			this._controlChars = [], this._source = regexpStr;
			try {
				this._validator.validatePattern(regexpStr, void 0, void 0, {
					unicode: uFlag,
					unicodeSets: vFlag
				});
			} catch {}
			return this._controlChars;
		}
	}();
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow control characters in regular expressions",
				recommended: !0,
				url: "https://eslint.org/docs/latest/rules/no-control-regex"
			},
			schema: [],
			messages: { unexpected: "Unexpected control character(s) in regular expression: {{controlChars}}." }
		},
		create(context) {
			/**
			* Get the regex expression
			* @param {ASTNode} node `Literal` node to evaluate
			* @returns {{ pattern: string, flags: string | null } | null} Regex if found (the given node is either a regex literal
			* or a string literal that is the pattern argument of a RegExp constructor call). Otherwise `null`. If flags cannot be determined,
			* the `flags` property will be `null`.
			* @private
			*/
			function getRegExp(node) {
				return node.regex ? node.regex : typeof node.value == "string" && (node.parent.type === "NewExpression" || node.parent.type === "CallExpression") && node.parent.callee.type === "Identifier" && node.parent.callee.name === "RegExp" && node.parent.arguments[0] === node ? {
					pattern: node.value,
					flags: node.parent.arguments.length > 1 && node.parent.arguments[1].type === "Literal" && typeof node.parent.arguments[1].value == "string" ? node.parent.arguments[1].value : null
				} : null;
			}
			return { Literal(node) {
				let regExp = getRegExp(node);
				if (regExp) {
					let { pattern, flags } = regExp, controlCharacters = collector.collectControlChars(pattern, flags);
					controlCharacters.length > 0 && context.report({
						node,
						messageId: "unexpected",
						data: { controlChars: controlCharacters.join(", ") }
					});
				}
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-control-regex.cjs
module.exports = require_no_control_regex().create;
//#endregion
