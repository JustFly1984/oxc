const require_chunk = require("./chunk.cjs");
//#region ../../node_modules/.pnpm/eslint-visitor-keys@4.2.1/node_modules/eslint-visitor-keys/dist/eslint-visitor-keys.cjs
var require_eslint_visitor_keys = /* @__PURE__ */ require_chunk.t(((exports) => {
	/**
	* @typedef {{ readonly [type: string]: ReadonlyArray<string> }} VisitorKeys
	*/
	/**
	* @type {VisitorKeys}
	*/
	let KEYS = {
		ArrayExpression: ["elements"],
		ArrayPattern: ["elements"],
		ArrowFunctionExpression: ["params", "body"],
		AssignmentExpression: ["left", "right"],
		AssignmentPattern: ["left", "right"],
		AwaitExpression: ["argument"],
		BinaryExpression: ["left", "right"],
		BlockStatement: ["body"],
		BreakStatement: ["label"],
		CallExpression: ["callee", "arguments"],
		CatchClause: ["param", "body"],
		ChainExpression: ["expression"],
		ClassBody: ["body"],
		ClassDeclaration: [
			"id",
			"superClass",
			"body"
		],
		ClassExpression: [
			"id",
			"superClass",
			"body"
		],
		ConditionalExpression: [
			"test",
			"consequent",
			"alternate"
		],
		ContinueStatement: ["label"],
		DebuggerStatement: [],
		DoWhileStatement: ["body", "test"],
		EmptyStatement: [],
		ExperimentalRestProperty: ["argument"],
		ExperimentalSpreadProperty: ["argument"],
		ExportAllDeclaration: [
			"exported",
			"source",
			"attributes"
		],
		ExportDefaultDeclaration: ["declaration"],
		ExportNamedDeclaration: [
			"declaration",
			"specifiers",
			"source",
			"attributes"
		],
		ExportSpecifier: ["local", "exported"],
		ExpressionStatement: ["expression"],
		ForInStatement: [
			"left",
			"right",
			"body"
		],
		ForOfStatement: [
			"left",
			"right",
			"body"
		],
		ForStatement: [
			"init",
			"test",
			"update",
			"body"
		],
		FunctionDeclaration: [
			"id",
			"params",
			"body"
		],
		FunctionExpression: [
			"id",
			"params",
			"body"
		],
		Identifier: [],
		IfStatement: [
			"test",
			"consequent",
			"alternate"
		],
		ImportAttribute: ["key", "value"],
		ImportDeclaration: [
			"specifiers",
			"source",
			"attributes"
		],
		ImportDefaultSpecifier: ["local"],
		ImportExpression: ["source", "options"],
		ImportNamespaceSpecifier: ["local"],
		ImportSpecifier: ["imported", "local"],
		JSXAttribute: ["name", "value"],
		JSXClosingElement: ["name"],
		JSXClosingFragment: [],
		JSXElement: [
			"openingElement",
			"children",
			"closingElement"
		],
		JSXEmptyExpression: [],
		JSXExpressionContainer: ["expression"],
		JSXFragment: [
			"openingFragment",
			"children",
			"closingFragment"
		],
		JSXIdentifier: [],
		JSXMemberExpression: ["object", "property"],
		JSXNamespacedName: ["namespace", "name"],
		JSXOpeningElement: ["name", "attributes"],
		JSXOpeningFragment: [],
		JSXSpreadAttribute: ["argument"],
		JSXSpreadChild: ["expression"],
		JSXText: [],
		LabeledStatement: ["label", "body"],
		Literal: [],
		LogicalExpression: ["left", "right"],
		MemberExpression: ["object", "property"],
		MetaProperty: ["meta", "property"],
		MethodDefinition: ["key", "value"],
		NewExpression: ["callee", "arguments"],
		ObjectExpression: ["properties"],
		ObjectPattern: ["properties"],
		PrivateIdentifier: [],
		Program: ["body"],
		Property: ["key", "value"],
		PropertyDefinition: ["key", "value"],
		RestElement: ["argument"],
		ReturnStatement: ["argument"],
		SequenceExpression: ["expressions"],
		SpreadElement: ["argument"],
		StaticBlock: ["body"],
		Super: [],
		SwitchCase: ["test", "consequent"],
		SwitchStatement: ["discriminant", "cases"],
		TaggedTemplateExpression: ["tag", "quasi"],
		TemplateElement: [],
		TemplateLiteral: ["quasis", "expressions"],
		ThisExpression: [],
		ThrowStatement: ["argument"],
		TryStatement: [
			"block",
			"handler",
			"finalizer"
		],
		UnaryExpression: ["argument"],
		UpdateExpression: ["argument"],
		VariableDeclaration: ["declarations"],
		VariableDeclarator: ["id", "init"],
		WhileStatement: ["test", "body"],
		WithStatement: ["object", "body"],
		YieldExpression: ["argument"]
	}, NODE_TYPES = Object.keys(KEYS);
	for (let type of NODE_TYPES) Object.freeze(KEYS[type]);
	Object.freeze(KEYS);
	/**
	* @author Toru Nagashima <https://github.com/mysticatea>
	* See LICENSE file in root directory for full license.
	*/
	/**
	* @typedef {import('./visitor-keys.js').VisitorKeys} VisitorKeys
	*/
	let KEY_BLACKLIST = new Set([
		"parent",
		"leadingComments",
		"trailingComments"
	]);
	/**
	* Check whether a given key should be used or not.
	* @param {string} key The key to check.
	* @returns {boolean} `true` if the key should be used.
	*/
	function filterKey(key) {
		return !KEY_BLACKLIST.has(key) && key[0] !== "_";
	}
	/**
	* Get visitor keys of a given node.
	* @param {Object} node The AST node to get keys.
	* @returns {readonly string[]} Visitor keys of the node.
	*/
	function getKeys(node) {
		return Object.keys(node).filter(filterKey);
	}
	/**
	* Make the union set with `KEYS` and given keys.
	* @param {VisitorKeys} additionalKeys The additional keys.
	* @returns {VisitorKeys} The union set.
	*/
	function unionWith(additionalKeys) {
		let retv = Object.assign({}, KEYS);
		for (let type of Object.keys(additionalKeys)) if (Object.hasOwn(retv, type)) {
			let keys = new Set(additionalKeys[type]);
			for (let key of retv[type]) keys.add(key);
			retv[type] = Object.freeze(Array.from(keys));
		} else retv[type] = Object.freeze(Array.from(additionalKeys[type]));
		return Object.freeze(retv);
	}
	exports.KEYS = KEYS, exports.getKeys = getKeys, exports.unionWith = unionWith;
})), require_ast = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	(function() {
		"use strict";
		function isExpression(node) {
			if (node == null) return !1;
			switch (node.type) {
				case "ArrayExpression":
				case "AssignmentExpression":
				case "BinaryExpression":
				case "CallExpression":
				case "ConditionalExpression":
				case "FunctionExpression":
				case "Identifier":
				case "Literal":
				case "LogicalExpression":
				case "MemberExpression":
				case "NewExpression":
				case "ObjectExpression":
				case "SequenceExpression":
				case "ThisExpression":
				case "UnaryExpression":
				case "UpdateExpression": return !0;
			}
			return !1;
		}
		function isIterationStatement(node) {
			if (node == null) return !1;
			switch (node.type) {
				case "DoWhileStatement":
				case "ForInStatement":
				case "ForStatement":
				case "WhileStatement": return !0;
			}
			return !1;
		}
		function isStatement(node) {
			if (node == null) return !1;
			switch (node.type) {
				case "BlockStatement":
				case "BreakStatement":
				case "ContinueStatement":
				case "DebuggerStatement":
				case "DoWhileStatement":
				case "EmptyStatement":
				case "ExpressionStatement":
				case "ForInStatement":
				case "ForStatement":
				case "IfStatement":
				case "LabeledStatement":
				case "ReturnStatement":
				case "SwitchStatement":
				case "ThrowStatement":
				case "TryStatement":
				case "VariableDeclaration":
				case "WhileStatement":
				case "WithStatement": return !0;
			}
			return !1;
		}
		function isSourceElement(node) {
			return isStatement(node) || node != null && node.type === "FunctionDeclaration";
		}
		function trailingStatement(node) {
			switch (node.type) {
				case "IfStatement": return node.alternate == null ? node.consequent : node.alternate;
				case "LabeledStatement":
				case "ForStatement":
				case "ForInStatement":
				case "WhileStatement":
				case "WithStatement": return node.body;
			}
			return null;
		}
		function isProblematicIfStatement(node) {
			var current;
			if (node.type !== "IfStatement" || node.alternate == null) return !1;
			current = node.consequent;
			do {
				if (current.type === "IfStatement" && current.alternate == null) return !0;
				current = trailingStatement(current);
			} while (current);
			return !1;
		}
		module.exports = {
			isExpression,
			isStatement,
			isIterationStatement,
			isSourceElement,
			isProblematicIfStatement,
			trailingStatement
		};
	})();
})), require_code = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	(function() {
		"use strict";
		var ES6Regex, ES5Regex = {
			NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
			NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
		}, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;
		ES6Regex = {
			NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
			NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
		};
		function isDecimalDigit(ch) {
			return 48 <= ch && ch <= 57;
		}
		function isHexDigit(ch) {
			return 48 <= ch && ch <= 57 || 97 <= ch && ch <= 102 || 65 <= ch && ch <= 70;
		}
		function isOctalDigit(ch) {
			return ch >= 48 && ch <= 55;
		}
		NON_ASCII_WHITESPACES = [
			5760,
			8192,
			8193,
			8194,
			8195,
			8196,
			8197,
			8198,
			8199,
			8200,
			8201,
			8202,
			8239,
			8287,
			12288,
			65279
		];
		function isWhiteSpace(ch) {
			return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
		}
		function isLineTerminator(ch) {
			return ch === 10 || ch === 13 || ch === 8232 || ch === 8233;
		}
		function fromCodePoint(cp) {
			return cp <= 65535 ? String.fromCharCode(cp) : String.fromCharCode(Math.floor((cp - 65536) / 1024) + 55296) + String.fromCharCode((cp - 65536) % 1024 + 56320);
		}
		for (IDENTIFIER_START = Array(128), ch = 0; ch < 128; ++ch) IDENTIFIER_START[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch === 36 || ch === 95;
		for (IDENTIFIER_PART = Array(128), ch = 0; ch < 128; ++ch) IDENTIFIER_PART[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch >= 48 && ch <= 57 || ch === 36 || ch === 95;
		function isIdentifierStartES5(ch) {
			return ch < 128 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
		}
		function isIdentifierPartES5(ch) {
			return ch < 128 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
		}
		function isIdentifierStartES6(ch) {
			return ch < 128 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
		}
		function isIdentifierPartES6(ch) {
			return ch < 128 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
		}
		module.exports = {
			isDecimalDigit,
			isHexDigit,
			isOctalDigit,
			isWhiteSpace,
			isLineTerminator,
			isIdentifierStartES5,
			isIdentifierPartES5,
			isIdentifierStartES6,
			isIdentifierPartES6
		};
	})();
})), require_keyword = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	(function() {
		"use strict";
		var code = require_code();
		function isStrictModeReservedWordES6(id) {
			switch (id) {
				case "implements":
				case "interface":
				case "package":
				case "private":
				case "protected":
				case "public":
				case "static":
				case "let": return !0;
				default: return !1;
			}
		}
		function isKeywordES5(id, strict) {
			return !strict && id === "yield" ? !1 : isKeywordES6(id, strict);
		}
		function isKeywordES6(id, strict) {
			if (strict && isStrictModeReservedWordES6(id)) return !0;
			switch (id.length) {
				case 2: return id === "if" || id === "in" || id === "do";
				case 3: return id === "var" || id === "for" || id === "new" || id === "try";
				case 4: return id === "this" || id === "else" || id === "case" || id === "void" || id === "with" || id === "enum";
				case 5: return id === "while" || id === "break" || id === "catch" || id === "throw" || id === "const" || id === "yield" || id === "class" || id === "super";
				case 6: return id === "return" || id === "typeof" || id === "delete" || id === "switch" || id === "export" || id === "import";
				case 7: return id === "default" || id === "finally" || id === "extends";
				case 8: return id === "function" || id === "continue" || id === "debugger";
				case 10: return id === "instanceof";
				default: return !1;
			}
		}
		function isReservedWordES5(id, strict) {
			return id === "null" || id === "true" || id === "false" || isKeywordES5(id, strict);
		}
		function isReservedWordES6(id, strict) {
			return id === "null" || id === "true" || id === "false" || isKeywordES6(id, strict);
		}
		function isRestrictedWord(id) {
			return id === "eval" || id === "arguments";
		}
		function isIdentifierNameES5(id) {
			var i, iz, ch;
			if (id.length === 0 || (ch = id.charCodeAt(0), !code.isIdentifierStartES5(ch))) return !1;
			for (i = 1, iz = id.length; i < iz; ++i) if (ch = id.charCodeAt(i), !code.isIdentifierPartES5(ch)) return !1;
			return !0;
		}
		function decodeUtf16(lead, trail) {
			return (lead - 55296) * 1024 + (trail - 56320) + 65536;
		}
		function isIdentifierNameES6(id) {
			var i, iz, ch, lowCh, check;
			if (id.length === 0) return !1;
			for (check = code.isIdentifierStartES6, i = 0, iz = id.length; i < iz; ++i) {
				if (ch = id.charCodeAt(i), 55296 <= ch && ch <= 56319) {
					if (++i, i >= iz || (lowCh = id.charCodeAt(i), !(56320 <= lowCh && lowCh <= 57343))) return !1;
					ch = decodeUtf16(ch, lowCh);
				}
				if (!check(ch)) return !1;
				check = code.isIdentifierPartES6;
			}
			return !0;
		}
		function isIdentifierES5(id, strict) {
			return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
		}
		function isIdentifierES6(id, strict) {
			return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
		}
		module.exports = {
			isKeywordES5,
			isKeywordES6,
			isReservedWordES5,
			isReservedWordES6,
			isRestrictedWord,
			isIdentifierNameES5,
			isIdentifierNameES6,
			isIdentifierES5,
			isIdentifierES6
		};
	})();
})), require_utils = /* @__PURE__ */ require_chunk.t(((exports) => {
	(function() {
		"use strict";
		exports.ast = require_ast(), exports.code = require_code(), exports.keyword = require_keyword();
	})();
})), require_acorn = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	(function(global, factory) {
		typeof exports == "object" && module !== void 0 ? factory(exports) : typeof define == "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis < "u" ? globalThis : global || self, factory(global.acorn = {}));
	})(exports, (function(exports$1) {
		"use strict";
		var astralIdentifierCodes = [
			509,
			0,
			227,
			0,
			150,
			4,
			294,
			9,
			1368,
			2,
			2,
			1,
			6,
			3,
			41,
			2,
			5,
			0,
			166,
			1,
			574,
			3,
			9,
			9,
			7,
			9,
			32,
			4,
			318,
			1,
			80,
			3,
			71,
			10,
			50,
			3,
			123,
			2,
			54,
			14,
			32,
			10,
			3,
			1,
			11,
			3,
			46,
			10,
			8,
			0,
			46,
			9,
			7,
			2,
			37,
			13,
			2,
			9,
			6,
			1,
			45,
			0,
			13,
			2,
			49,
			13,
			9,
			3,
			2,
			11,
			83,
			11,
			7,
			0,
			3,
			0,
			158,
			11,
			6,
			9,
			7,
			3,
			56,
			1,
			2,
			6,
			3,
			1,
			3,
			2,
			10,
			0,
			11,
			1,
			3,
			6,
			4,
			4,
			68,
			8,
			2,
			0,
			3,
			0,
			2,
			3,
			2,
			4,
			2,
			0,
			15,
			1,
			83,
			17,
			10,
			9,
			5,
			0,
			82,
			19,
			13,
			9,
			214,
			6,
			3,
			8,
			28,
			1,
			83,
			16,
			16,
			9,
			82,
			12,
			9,
			9,
			7,
			19,
			58,
			14,
			5,
			9,
			243,
			14,
			166,
			9,
			71,
			5,
			2,
			1,
			3,
			3,
			2,
			0,
			2,
			1,
			13,
			9,
			120,
			6,
			3,
			6,
			4,
			0,
			29,
			9,
			41,
			6,
			2,
			3,
			9,
			0,
			10,
			10,
			47,
			15,
			343,
			9,
			54,
			7,
			2,
			7,
			17,
			9,
			57,
			21,
			2,
			13,
			123,
			5,
			4,
			0,
			2,
			1,
			2,
			6,
			2,
			0,
			9,
			9,
			49,
			4,
			2,
			1,
			2,
			4,
			9,
			9,
			330,
			3,
			10,
			1,
			2,
			0,
			49,
			6,
			4,
			4,
			14,
			10,
			5350,
			0,
			7,
			14,
			11465,
			27,
			2343,
			9,
			87,
			9,
			39,
			4,
			60,
			6,
			26,
			9,
			535,
			9,
			470,
			0,
			2,
			54,
			8,
			3,
			82,
			0,
			12,
			1,
			19628,
			1,
			4178,
			9,
			519,
			45,
			3,
			22,
			543,
			4,
			4,
			5,
			9,
			7,
			3,
			6,
			31,
			3,
			149,
			2,
			1418,
			49,
			513,
			54,
			5,
			49,
			9,
			0,
			15,
			0,
			23,
			4,
			2,
			14,
			1361,
			6,
			2,
			16,
			3,
			6,
			2,
			1,
			2,
			4,
			101,
			0,
			161,
			6,
			10,
			9,
			357,
			0,
			62,
			13,
			499,
			13,
			245,
			1,
			2,
			9,
			726,
			6,
			110,
			6,
			6,
			9,
			4759,
			9,
			787719,
			239
		], astralIdentifierStartCodes = [
			0,
			11,
			2,
			25,
			2,
			18,
			2,
			1,
			2,
			14,
			3,
			13,
			35,
			122,
			70,
			52,
			268,
			28,
			4,
			48,
			48,
			31,
			14,
			29,
			6,
			37,
			11,
			29,
			3,
			35,
			5,
			7,
			2,
			4,
			43,
			157,
			19,
			35,
			5,
			35,
			5,
			39,
			9,
			51,
			13,
			10,
			2,
			14,
			2,
			6,
			2,
			1,
			2,
			10,
			2,
			14,
			2,
			6,
			2,
			1,
			4,
			51,
			13,
			310,
			10,
			21,
			11,
			7,
			25,
			5,
			2,
			41,
			2,
			8,
			70,
			5,
			3,
			0,
			2,
			43,
			2,
			1,
			4,
			0,
			3,
			22,
			11,
			22,
			10,
			30,
			66,
			18,
			2,
			1,
			11,
			21,
			11,
			25,
			71,
			55,
			7,
			1,
			65,
			0,
			16,
			3,
			2,
			2,
			2,
			28,
			43,
			28,
			4,
			28,
			36,
			7,
			2,
			27,
			28,
			53,
			11,
			21,
			11,
			18,
			14,
			17,
			111,
			72,
			56,
			50,
			14,
			50,
			14,
			35,
			39,
			27,
			10,
			22,
			251,
			41,
			7,
			1,
			17,
			2,
			60,
			28,
			11,
			0,
			9,
			21,
			43,
			17,
			47,
			20,
			28,
			22,
			13,
			52,
			58,
			1,
			3,
			0,
			14,
			44,
			33,
			24,
			27,
			35,
			30,
			0,
			3,
			0,
			9,
			34,
			4,
			0,
			13,
			47,
			15,
			3,
			22,
			0,
			2,
			0,
			36,
			17,
			2,
			24,
			20,
			1,
			64,
			6,
			2,
			0,
			2,
			3,
			2,
			14,
			2,
			9,
			8,
			46,
			39,
			7,
			3,
			1,
			3,
			21,
			2,
			6,
			2,
			1,
			2,
			4,
			4,
			0,
			19,
			0,
			13,
			4,
			31,
			9,
			2,
			0,
			3,
			0,
			2,
			37,
			2,
			0,
			26,
			0,
			2,
			0,
			45,
			52,
			19,
			3,
			21,
			2,
			31,
			47,
			21,
			1,
			2,
			0,
			185,
			46,
			42,
			3,
			37,
			47,
			21,
			0,
			60,
			42,
			14,
			0,
			72,
			26,
			38,
			6,
			186,
			43,
			117,
			63,
			32,
			7,
			3,
			0,
			3,
			7,
			2,
			1,
			2,
			23,
			16,
			0,
			2,
			0,
			95,
			7,
			3,
			38,
			17,
			0,
			2,
			0,
			29,
			0,
			11,
			39,
			8,
			0,
			22,
			0,
			12,
			45,
			20,
			0,
			19,
			72,
			200,
			32,
			32,
			8,
			2,
			36,
			18,
			0,
			50,
			29,
			113,
			6,
			2,
			1,
			2,
			37,
			22,
			0,
			26,
			5,
			2,
			1,
			2,
			31,
			15,
			0,
			328,
			18,
			16,
			0,
			2,
			12,
			2,
			33,
			125,
			0,
			80,
			921,
			103,
			110,
			18,
			195,
			2637,
			96,
			16,
			1071,
			18,
			5,
			26,
			3994,
			6,
			582,
			6842,
			29,
			1763,
			568,
			8,
			30,
			18,
			78,
			18,
			29,
			19,
			47,
			17,
			3,
			32,
			20,
			6,
			18,
			433,
			44,
			212,
			63,
			129,
			74,
			6,
			0,
			67,
			12,
			65,
			1,
			2,
			0,
			29,
			6135,
			9,
			1237,
			42,
			9,
			8936,
			3,
			2,
			6,
			2,
			1,
			2,
			290,
			16,
			0,
			30,
			2,
			3,
			0,
			15,
			3,
			9,
			395,
			2309,
			106,
			6,
			12,
			4,
			8,
			8,
			9,
			5991,
			84,
			2,
			70,
			2,
			1,
			3,
			0,
			3,
			1,
			3,
			3,
			2,
			11,
			2,
			0,
			2,
			6,
			2,
			64,
			2,
			3,
			3,
			7,
			2,
			6,
			2,
			27,
			2,
			3,
			2,
			4,
			2,
			0,
			4,
			6,
			2,
			339,
			3,
			24,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			30,
			2,
			24,
			2,
			7,
			1845,
			30,
			7,
			5,
			262,
			61,
			147,
			44,
			11,
			6,
			17,
			0,
			322,
			29,
			19,
			43,
			485,
			27,
			229,
			29,
			3,
			0,
			496,
			6,
			2,
			3,
			2,
			1,
			2,
			14,
			2,
			196,
			60,
			67,
			8,
			0,
			1205,
			3,
			2,
			26,
			2,
			1,
			2,
			0,
			3,
			0,
			2,
			9,
			2,
			3,
			2,
			0,
			2,
			0,
			7,
			0,
			5,
			0,
			2,
			0,
			2,
			0,
			2,
			2,
			2,
			1,
			2,
			0,
			3,
			0,
			2,
			0,
			2,
			0,
			2,
			0,
			2,
			0,
			2,
			1,
			2,
			0,
			3,
			3,
			2,
			6,
			2,
			3,
			2,
			3,
			2,
			0,
			2,
			9,
			2,
			16,
			6,
			2,
			2,
			4,
			2,
			16,
			4421,
			42719,
			33,
			4153,
			7,
			221,
			3,
			5761,
			15,
			7472,
			16,
			621,
			2467,
			541,
			1507,
			4938,
			6,
			4191
		], nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟍꟐꟑꟓꟕ-Ƛꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", reservedWords = {
			3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
			5: "class enum extends super const export import",
			6: "enum",
			strict: "implements interface let package private protected public static yield",
			strictBind: "eval arguments"
		}, ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", keywords$1 = {
			5: ecma5AndLessKeywords,
			"5module": ecma5AndLessKeywords + " export import",
			6: ecma5AndLessKeywords + " const class extends export import super"
		}, keywordRelationalOperator = /^in(stanceof)?$/, nonASCIIidentifierStart = RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
		function isInAstralSet(code, set) {
			for (var pos = 65536, i = 0; i < set.length; i += 2) {
				if (pos += set[i], pos > code) return !1;
				if (pos += set[i + 1], pos >= code) return !0;
			}
			return !1;
		}
		function isIdentifierStart(code, astral) {
			return code < 65 ? code === 36 : code < 91 ? !0 : code < 97 ? code === 95 : code < 123 ? !0 : code <= 65535 ? code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code)) : astral === !1 ? !1 : isInAstralSet(code, astralIdentifierStartCodes);
		}
		function isIdentifierChar(code, astral) {
			return code < 48 ? code === 36 : code < 58 ? !0 : code < 65 ? !1 : code < 91 ? !0 : code < 97 ? code === 95 : code < 123 ? !0 : code <= 65535 ? code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code)) : astral === !1 ? !1 : isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
		}
		var TokenType = function TokenType(label, conf) {
			conf === void 0 && (conf = {}), this.label = label, this.keyword = conf.keyword, this.beforeExpr = !!conf.beforeExpr, this.startsExpr = !!conf.startsExpr, this.isLoop = !!conf.isLoop, this.isAssign = !!conf.isAssign, this.prefix = !!conf.prefix, this.postfix = !!conf.postfix, this.binop = conf.binop || null, this.updateContext = null;
		};
		function binop(name, prec) {
			return new TokenType(name, {
				beforeExpr: !0,
				binop: prec
			});
		}
		var beforeExpr = { beforeExpr: !0 }, startsExpr = { startsExpr: !0 }, keywords = {};
		function kw(name, options) {
			return options === void 0 && (options = {}), options.keyword = name, keywords[name] = new TokenType(name, options);
		}
		var types$1 = {
			num: new TokenType("num", startsExpr),
			regexp: new TokenType("regexp", startsExpr),
			string: new TokenType("string", startsExpr),
			name: new TokenType("name", startsExpr),
			privateId: new TokenType("privateId", startsExpr),
			eof: new TokenType("eof"),
			bracketL: new TokenType("[", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			bracketR: new TokenType("]"),
			braceL: new TokenType("{", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			braceR: new TokenType("}"),
			parenL: new TokenType("(", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			parenR: new TokenType(")"),
			comma: new TokenType(",", beforeExpr),
			semi: new TokenType(";", beforeExpr),
			colon: new TokenType(":", beforeExpr),
			dot: new TokenType("."),
			question: new TokenType("?", beforeExpr),
			questionDot: new TokenType("?."),
			arrow: new TokenType("=>", beforeExpr),
			template: new TokenType("template"),
			invalidTemplate: new TokenType("invalidTemplate"),
			ellipsis: new TokenType("...", beforeExpr),
			backQuote: new TokenType("`", startsExpr),
			dollarBraceL: new TokenType("${", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			eq: new TokenType("=", {
				beforeExpr: !0,
				isAssign: !0
			}),
			assign: new TokenType("_=", {
				beforeExpr: !0,
				isAssign: !0
			}),
			incDec: new TokenType("++/--", {
				prefix: !0,
				postfix: !0,
				startsExpr: !0
			}),
			prefix: new TokenType("!/~", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			}),
			logicalOR: binop("||", 1),
			logicalAND: binop("&&", 2),
			bitwiseOR: binop("|", 3),
			bitwiseXOR: binop("^", 4),
			bitwiseAND: binop("&", 5),
			equality: binop("==/!=/===/!==", 6),
			relational: binop("</>/<=/>=", 7),
			bitShift: binop("<</>>/>>>", 8),
			plusMin: new TokenType("+/-", {
				beforeExpr: !0,
				binop: 9,
				prefix: !0,
				startsExpr: !0
			}),
			modulo: binop("%", 10),
			star: binop("*", 10),
			slash: binop("/", 10),
			starstar: new TokenType("**", { beforeExpr: !0 }),
			coalesce: binop("??", 1),
			_break: kw("break"),
			_case: kw("case", beforeExpr),
			_catch: kw("catch"),
			_continue: kw("continue"),
			_debugger: kw("debugger"),
			_default: kw("default", beforeExpr),
			_do: kw("do", {
				isLoop: !0,
				beforeExpr: !0
			}),
			_else: kw("else", beforeExpr),
			_finally: kw("finally"),
			_for: kw("for", { isLoop: !0 }),
			_function: kw("function", startsExpr),
			_if: kw("if"),
			_return: kw("return", beforeExpr),
			_switch: kw("switch"),
			_throw: kw("throw", beforeExpr),
			_try: kw("try"),
			_var: kw("var"),
			_const: kw("const"),
			_while: kw("while", { isLoop: !0 }),
			_with: kw("with"),
			_new: kw("new", {
				beforeExpr: !0,
				startsExpr: !0
			}),
			_this: kw("this", startsExpr),
			_super: kw("super", startsExpr),
			_class: kw("class", startsExpr),
			_extends: kw("extends", beforeExpr),
			_export: kw("export"),
			_import: kw("import", startsExpr),
			_null: kw("null", startsExpr),
			_true: kw("true", startsExpr),
			_false: kw("false", startsExpr),
			_in: kw("in", {
				beforeExpr: !0,
				binop: 7
			}),
			_instanceof: kw("instanceof", {
				beforeExpr: !0,
				binop: 7
			}),
			_typeof: kw("typeof", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			}),
			_void: kw("void", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			}),
			_delete: kw("delete", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0
			})
		}, lineBreak = /\r\n?|\n|\u2028|\u2029/, lineBreakG = new RegExp(lineBreak.source, "g");
		function isNewLine(code) {
			return code === 10 || code === 13 || code === 8232 || code === 8233;
		}
		function nextLineBreak(code, from, end) {
			end === void 0 && (end = code.length);
			for (var i = from; i < end; i++) {
				var next = code.charCodeAt(i);
				if (isNewLine(next)) return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
			}
			return -1;
		}
		var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, ref = Object.prototype, hasOwnProperty = ref.hasOwnProperty, toString = ref.toString, hasOwn = Object.hasOwn || (function(obj, propName) {
			return hasOwnProperty.call(obj, propName);
		}), isArray = Array.isArray || (function(obj) {
			return toString.call(obj) === "[object Array]";
		}), regexpCache = Object.create(null);
		function wordsRegexp(words) {
			return regexpCache[words] || (regexpCache[words] = RegExp("^(?:" + words.replace(/ /g, "|") + ")$"));
		}
		function codePointToString(code) {
			return code <= 65535 ? String.fromCharCode(code) : (code -= 65536, String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320));
		}
		var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, Position = function Position(line, col) {
			this.line = line, this.column = col;
		};
		Position.prototype.offset = function offset(n) {
			return new Position(this.line, this.column + n);
		};
		var SourceLocation = function SourceLocation(p, start, end) {
			this.start = start, this.end = end, p.sourceFile !== null && (this.source = p.sourceFile);
		};
		function getLineInfo(input, offset) {
			for (var line = 1, cur = 0;;) {
				var nextBreak = nextLineBreak(input, cur, offset);
				if (nextBreak < 0) return new Position(line, offset - cur);
				++line, cur = nextBreak;
			}
		}
		var defaultOptions = {
			ecmaVersion: null,
			sourceType: "script",
			onInsertedSemicolon: null,
			onTrailingComma: null,
			allowReserved: null,
			allowReturnOutsideFunction: !1,
			allowImportExportEverywhere: !1,
			allowAwaitOutsideFunction: null,
			allowSuperOutsideMethod: null,
			allowHashBang: !1,
			checkPrivateFields: !0,
			locations: !1,
			onToken: null,
			onComment: null,
			ranges: !1,
			program: null,
			sourceFile: null,
			directSourceFile: null,
			preserveParens: !1
		}, warnedAboutEcmaVersion = !1;
		function getOptions(opts) {
			var options = {};
			for (var opt in defaultOptions) options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
			if (options.ecmaVersion === "latest" ? options.ecmaVersion = 1e8 : options.ecmaVersion == null ? (!warnedAboutEcmaVersion && typeof console == "object" && console.warn && (warnedAboutEcmaVersion = !0, console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")), options.ecmaVersion = 11) : options.ecmaVersion >= 2015 && (options.ecmaVersion -= 2009), options.allowReserved ??= options.ecmaVersion < 5, (!opts || opts.allowHashBang == null) && (options.allowHashBang = options.ecmaVersion >= 14), isArray(options.onToken)) {
				var tokens = options.onToken;
				options.onToken = function(token) {
					return tokens.push(token);
				};
			}
			return isArray(options.onComment) && (options.onComment = pushComment(options, options.onComment)), options;
		}
		function pushComment(options, array) {
			return function(block, text, start, end, startLoc, endLoc) {
				var comment = {
					type: block ? "Block" : "Line",
					value: text,
					start,
					end
				};
				options.locations && (comment.loc = new SourceLocation(this, startLoc, endLoc)), options.ranges && (comment.range = [start, end]), array.push(comment);
			};
		}
		var SCOPE_TOP = 1, SCOPE_FUNCTION = 2, SCOPE_ASYNC = 4, SCOPE_GENERATOR = 8, SCOPE_ARROW = 16, SCOPE_SIMPLE_CATCH = 32, SCOPE_SUPER = 64, SCOPE_DIRECT_SUPER = 128, SCOPE_CLASS_STATIC_BLOCK = 256, SCOPE_CLASS_FIELD_INIT = 512, SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
		function functionFlags(async, generator) {
			return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
		}
		var BIND_NONE = 0, BIND_VAR = 1, BIND_LEXICAL = 2, BIND_FUNCTION = 3, BIND_SIMPLE_CATCH = 4, BIND_OUTSIDE = 5, Parser = function Parser(options, input, startPos) {
			this.options = options = getOptions(options), this.sourceFile = options.sourceFile, this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
			var reserved = "";
			options.allowReserved !== !0 && (reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3], options.sourceType === "module" && (reserved += " await")), this.reservedWords = wordsRegexp(reserved);
			var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
			this.reservedWordsStrict = wordsRegexp(reservedStrict), this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind), this.input = String(input), this.containsEsc = !1, startPos ? (this.pos = startPos, this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = types$1.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = options.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = Object.create(null), this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(SCOPE_TOP), this.regexpState = null, this.privateNameStack = [];
		}, prototypeAccessors = {
			inFunction: { configurable: !0 },
			inGenerator: { configurable: !0 },
			inAsync: { configurable: !0 },
			canAwait: { configurable: !0 },
			allowSuper: { configurable: !0 },
			allowDirectSuper: { configurable: !0 },
			treatFunctionsAsVar: { configurable: !0 },
			allowNewDotTarget: { configurable: !0 },
			inClassStaticBlock: { configurable: !0 }
		};
		Parser.prototype.parse = function parse() {
			var node = this.options.program || this.startNode();
			return this.nextToken(), this.parseTopLevel(node);
		}, prototypeAccessors.inFunction.get = function() {
			return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
		}, prototypeAccessors.inGenerator.get = function() {
			return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
		}, prototypeAccessors.inAsync.get = function() {
			return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
		}, prototypeAccessors.canAwait.get = function() {
			for (var i = this.scopeStack.length - 1; i >= 0; i--) {
				var flags = this.scopeStack[i].flags;
				if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT)) return !1;
				if (flags & SCOPE_FUNCTION) return (flags & SCOPE_ASYNC) > 0;
			}
			return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
		}, prototypeAccessors.allowSuper.get = function() {
			return (this.currentThisScope().flags & SCOPE_SUPER) > 0 || this.options.allowSuperOutsideMethod;
		}, prototypeAccessors.allowDirectSuper.get = function() {
			return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
		}, prototypeAccessors.treatFunctionsAsVar.get = function() {
			return this.treatFunctionsAsVarInScope(this.currentScope());
		}, prototypeAccessors.allowNewDotTarget.get = function() {
			for (var i = this.scopeStack.length - 1; i >= 0; i--) {
				var flags = this.scopeStack[i].flags;
				if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT) || flags & SCOPE_FUNCTION && !(flags & SCOPE_ARROW)) return !0;
			}
			return !1;
		}, prototypeAccessors.inClassStaticBlock.get = function() {
			return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
		}, Parser.extend = function extend() {
			for (var plugins = [], len = arguments.length; len--;) plugins[len] = arguments[len];
			for (var cls = this, i = 0; i < plugins.length; i++) cls = plugins[i](cls);
			return cls;
		}, Parser.parse = function parse(input, options) {
			return new this(options, input).parse();
		}, Parser.parseExpressionAt = function parseExpressionAt(input, pos, options) {
			var parser = new this(options, input, pos);
			return parser.nextToken(), parser.parseExpression();
		}, Parser.tokenizer = function tokenizer(input, options) {
			return new this(options, input);
		}, Object.defineProperties(Parser.prototype, prototypeAccessors);
		var pp$9 = Parser.prototype, literal = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
		pp$9.strictDirective = function(start) {
			if (this.options.ecmaVersion < 5) return !1;
			for (;;) {
				skipWhiteSpace.lastIndex = start, start += skipWhiteSpace.exec(this.input)[0].length;
				var match = literal.exec(this.input.slice(start));
				if (!match) return !1;
				if ((match[1] || match[2]) === "use strict") {
					skipWhiteSpace.lastIndex = start + match[0].length;
					var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length, next = this.input.charAt(end);
					return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
				}
				start += match[0].length, skipWhiteSpace.lastIndex = start, start += skipWhiteSpace.exec(this.input)[0].length, this.input[start] === ";" && start++;
			}
		}, pp$9.eat = function(type) {
			return this.type === type ? (this.next(), !0) : !1;
		}, pp$9.isContextual = function(name) {
			return this.type === types$1.name && this.value === name && !this.containsEsc;
		}, pp$9.eatContextual = function(name) {
			return this.isContextual(name) ? (this.next(), !0) : !1;
		}, pp$9.expectContextual = function(name) {
			this.eatContextual(name) || this.unexpected();
		}, pp$9.canInsertSemicolon = function() {
			return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
		}, pp$9.insertSemicolon = function() {
			if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
		}, pp$9.semicolon = function() {
			!this.eat(types$1.semi) && !this.insertSemicolon() && this.unexpected();
		}, pp$9.afterTrailingComma = function(tokType, notNext) {
			if (this.type === tokType) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), notNext || this.next(), !0;
		}, pp$9.expect = function(type) {
			this.eat(type) || this.unexpected();
		}, pp$9.unexpected = function(pos) {
			this.raise(pos ?? this.start, "Unexpected token");
		};
		var DestructuringErrors = function DestructuringErrors() {
			this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
		};
		pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
			if (refDestructuringErrors) {
				refDestructuringErrors.trailingComma > -1 && this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
				var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
				parens > -1 && this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
			}
		}, pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
			if (!refDestructuringErrors) return !1;
			var shorthandAssign = refDestructuringErrors.shorthandAssign, doubleProto = refDestructuringErrors.doubleProto;
			if (!andThrow) return shorthandAssign >= 0 || doubleProto >= 0;
			shorthandAssign >= 0 && this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"), doubleProto >= 0 && this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
		}, pp$9.checkYieldAwaitInDefaultParams = function() {
			this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
		}, pp$9.isSimpleAssignTarget = function(expr) {
			return expr.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(expr.expression) : expr.type === "Identifier" || expr.type === "MemberExpression";
		};
		var pp$8 = Parser.prototype;
		pp$8.parseTopLevel = function(node) {
			var exports$2 = Object.create(null);
			for (node.body ||= []; this.type !== types$1.eof;) {
				var stmt = this.parseStatement(null, !0, exports$2);
				node.body.push(stmt);
			}
			if (this.inModule) for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1) {
				var name = list[i];
				this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
			}
			return this.adaptDirectivePrologue(node.body), this.next(), node.sourceType = this.options.sourceType, this.finishNode(node, "Program");
		};
		var loopLabel = { kind: "loop" }, switchLabel = { kind: "switch" };
		pp$8.isLet = function(context) {
			if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
			skipWhiteSpace.lastIndex = this.pos;
			var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
			if (nextCh === 91 || nextCh === 92) return !0;
			if (context) return !1;
			if (nextCh === 123 || nextCh > 55295 && nextCh < 56320) return !0;
			if (isIdentifierStart(nextCh, !0)) {
				for (var pos = next + 1; isIdentifierChar(nextCh = this.input.charCodeAt(pos), !0);) ++pos;
				if (nextCh === 92 || nextCh > 55295 && nextCh < 56320) return !0;
				var ident = this.input.slice(next, pos);
				if (!keywordRelationalOperator.test(ident)) return !0;
			}
			return !1;
		}, pp$8.isAsyncFunction = function() {
			if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return !1;
			skipWhiteSpace.lastIndex = this.pos;
			var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length, after;
			return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 55295 && after < 56320));
		}, pp$8.isUsingKeyword = function(isAwaitUsing, isFor) {
			if (this.options.ecmaVersion < 17 || !this.isContextual(isAwaitUsing ? "await" : "using")) return !1;
			skipWhiteSpace.lastIndex = this.pos;
			var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length;
			if (lineBreak.test(this.input.slice(this.pos, next))) return !1;
			if (isAwaitUsing) {
				var awaitEndPos = next + 5, after;
				if (this.input.slice(next, awaitEndPos) !== "using" || awaitEndPos === this.input.length || isIdentifierChar(after = this.input.charCodeAt(awaitEndPos)) || after > 55295 && after < 56320) return !1;
				skipWhiteSpace.lastIndex = awaitEndPos;
				var skipAfterUsing = skipWhiteSpace.exec(this.input);
				if (skipAfterUsing && lineBreak.test(this.input.slice(awaitEndPos, awaitEndPos + skipAfterUsing[0].length))) return !1;
			}
			if (isFor) {
				var ofEndPos = next + 2, after$1;
				if (this.input.slice(next, ofEndPos) === "of" && (ofEndPos === this.input.length || !isIdentifierChar(after$1 = this.input.charCodeAt(ofEndPos)) && !(after$1 > 55295 && after$1 < 56320))) return !1;
			}
			var ch = this.input.charCodeAt(next);
			return isIdentifierStart(ch, !0) || ch === 92;
		}, pp$8.isAwaitUsing = function(isFor) {
			return this.isUsingKeyword(!0, isFor);
		}, pp$8.isUsing = function(isFor) {
			return this.isUsingKeyword(!1, isFor);
		}, pp$8.parseStatement = function(context, topLevel, exports$3) {
			var starttype = this.type, node = this.startNode(), kind;
			switch (this.isLet(context) && (starttype = types$1._var, kind = "let"), starttype) {
				case types$1._break:
				case types$1._continue: return this.parseBreakContinueStatement(node, starttype.keyword);
				case types$1._debugger: return this.parseDebuggerStatement(node);
				case types$1._do: return this.parseDoStatement(node);
				case types$1._for: return this.parseForStatement(node);
				case types$1._function: return context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(node, !1, !context);
				case types$1._class: return context && this.unexpected(), this.parseClass(node, !0);
				case types$1._if: return this.parseIfStatement(node);
				case types$1._return: return this.parseReturnStatement(node);
				case types$1._switch: return this.parseSwitchStatement(node);
				case types$1._throw: return this.parseThrowStatement(node);
				case types$1._try: return this.parseTryStatement(node);
				case types$1._const:
				case types$1._var: return kind ||= this.value, context && kind !== "var" && this.unexpected(), this.parseVarStatement(node, kind);
				case types$1._while: return this.parseWhileStatement(node);
				case types$1._with: return this.parseWithStatement(node);
				case types$1.braceL: return this.parseBlock(!0, node);
				case types$1.semi: return this.parseEmptyStatement(node);
				case types$1._export:
				case types$1._import:
					if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
						skipWhiteSpace.lastIndex = this.pos;
						var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
						if (nextCh === 40 || nextCh === 46) return this.parseExpressionStatement(node, this.parseExpression());
					}
					return this.options.allowImportExportEverywhere || (topLevel || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports$3);
				default:
					if (this.isAsyncFunction()) return context && this.unexpected(), this.next(), this.parseFunctionStatement(node, !0, !context);
					var usingKind = this.isAwaitUsing(!1) ? "await using" : this.isUsing(!1) ? "using" : null;
					if (usingKind) return topLevel && this.options.sourceType === "script" && this.raise(this.start, "Using declaration cannot appear in the top level when source type is `script`"), usingKind === "await using" && (this.canAwait || this.raise(this.start, "Await using cannot appear outside of async function"), this.next()), this.next(), this.parseVar(node, !1, usingKind), this.semicolon(), this.finishNode(node, "VariableDeclaration");
					var maybeName = this.value, expr = this.parseExpression();
					return starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon) ? this.parseLabeledStatement(node, maybeName, expr, context) : this.parseExpressionStatement(node, expr);
			}
		}, pp$8.parseBreakContinueStatement = function(node, keyword) {
			var isBreak = keyword === "break";
			this.next(), this.eat(types$1.semi) || this.insertSemicolon() ? node.label = null : this.type === types$1.name ? (node.label = this.parseIdent(), this.semicolon()) : this.unexpected();
			for (var i = 0; i < this.labels.length; ++i) {
				var lab = this.labels[i];
				if ((node.label == null || lab.name === node.label.name) && (lab.kind != null && (isBreak || lab.kind === "loop") || node.label && isBreak)) break;
			}
			return i === this.labels.length && this.raise(node.start, "Unsyntactic " + keyword), this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
		}, pp$8.parseDebuggerStatement = function(node) {
			return this.next(), this.semicolon(), this.finishNode(node, "DebuggerStatement");
		}, pp$8.parseDoStatement = function(node) {
			return this.next(), this.labels.push(loopLabel), node.body = this.parseStatement("do"), this.labels.pop(), this.expect(types$1._while), node.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(types$1.semi) : this.semicolon(), this.finishNode(node, "DoWhileStatement");
		}, pp$8.parseForStatement = function(node) {
			this.next();
			var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
			if (this.labels.push(loopLabel), this.enterScope(0), this.expect(types$1.parenL), this.type === types$1.semi) return awaitAt > -1 && this.unexpected(awaitAt), this.parseFor(node, null);
			var isLet = this.isLet();
			if (this.type === types$1._var || this.type === types$1._const || isLet) {
				var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
				return this.next(), this.parseVar(init$1, !0, kind), this.finishNode(init$1, "VariableDeclaration"), this.parseForAfterInit(node, init$1, awaitAt);
			}
			var startsWithLet = this.isContextual("let"), isForOf = !1, usingKind = this.isUsing(!0) ? "using" : this.isAwaitUsing(!0) ? "await using" : null;
			if (usingKind) {
				var init$2 = this.startNode();
				return this.next(), usingKind === "await using" && this.next(), this.parseVar(init$2, !0, usingKind), this.finishNode(init$2, "VariableDeclaration"), this.parseForAfterInit(node, init$2, awaitAt);
			}
			var containsEsc = this.containsEsc, refDestructuringErrors = new DestructuringErrors(), initPos = this.start, init = awaitAt > -1 ? this.parseExprSubscripts(refDestructuringErrors, "await") : this.parseExpression(!0, refDestructuringErrors);
			return this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (awaitAt > -1 ? (this.type === types$1._in && this.unexpected(awaitAt), node.await = !0) : isForOf && this.options.ecmaVersion >= 8 && (init.start === initPos && !containsEsc && init.type === "Identifier" && init.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (node.await = !1)), startsWithLet && isForOf && this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(init, !1, refDestructuringErrors), this.checkLValPattern(init), this.parseForIn(node, init)) : (this.checkExpressionErrors(refDestructuringErrors, !0), awaitAt > -1 && this.unexpected(awaitAt), this.parseFor(node, init));
		}, pp$8.parseForAfterInit = function(node, init, awaitAt) {
			return (this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === types$1._in ? awaitAt > -1 && this.unexpected(awaitAt) : node.await = awaitAt > -1), this.parseForIn(node, init)) : (awaitAt > -1 && this.unexpected(awaitAt), this.parseFor(node, init));
		}, pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
			return this.next(), this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), !1, isAsync);
		}, pp$8.parseIfStatement = function(node) {
			return this.next(), node.test = this.parseParenExpression(), node.consequent = this.parseStatement("if"), node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null, this.finishNode(node, "IfStatement");
		}, pp$8.parseReturnStatement = function(node) {
			return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(types$1.semi) || this.insertSemicolon() ? node.argument = null : (node.argument = this.parseExpression(), this.semicolon()), this.finishNode(node, "ReturnStatement");
		}, pp$8.parseSwitchStatement = function(node) {
			this.next(), node.discriminant = this.parseParenExpression(), node.cases = [], this.expect(types$1.braceL), this.labels.push(switchLabel), this.enterScope(0);
			for (var cur, sawDefault = !1; this.type !== types$1.braceR;) if (this.type === types$1._case || this.type === types$1._default) {
				var isCase = this.type === types$1._case;
				cur && this.finishNode(cur, "SwitchCase"), node.cases.push(cur = this.startNode()), cur.consequent = [], this.next(), isCase ? cur.test = this.parseExpression() : (sawDefault && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), sawDefault = !0, cur.test = null), this.expect(types$1.colon);
			} else cur || this.unexpected(), cur.consequent.push(this.parseStatement(null));
			return this.exitScope(), cur && this.finishNode(cur, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(node, "SwitchStatement");
		}, pp$8.parseThrowStatement = function(node) {
			return this.next(), lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), node.argument = this.parseExpression(), this.semicolon(), this.finishNode(node, "ThrowStatement");
		};
		var empty$1 = [];
		pp$8.parseCatchClauseParam = function() {
			var param = this.parseBindingAtom(), simple = param.type === "Identifier";
			return this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0), this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL), this.expect(types$1.parenR), param;
		}, pp$8.parseTryStatement = function(node) {
			if (this.next(), node.block = this.parseBlock(), node.handler = null, this.type === types$1._catch) {
				var clause = this.startNode();
				this.next(), this.eat(types$1.parenL) ? clause.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), clause.param = null, this.enterScope(0)), clause.body = this.parseBlock(!1), this.exitScope(), node.handler = this.finishNode(clause, "CatchClause");
			}
			return node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null, !node.handler && !node.finalizer && this.raise(node.start, "Missing catch or finally clause"), this.finishNode(node, "TryStatement");
		}, pp$8.parseVarStatement = function(node, kind, allowMissingInitializer) {
			return this.next(), this.parseVar(node, !1, kind, allowMissingInitializer), this.semicolon(), this.finishNode(node, "VariableDeclaration");
		}, pp$8.parseWhileStatement = function(node) {
			return this.next(), node.test = this.parseParenExpression(), this.labels.push(loopLabel), node.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(node, "WhileStatement");
		}, pp$8.parseWithStatement = function(node) {
			return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), node.object = this.parseParenExpression(), node.body = this.parseStatement("with"), this.finishNode(node, "WithStatement");
		}, pp$8.parseEmptyStatement = function(node) {
			return this.next(), this.finishNode(node, "EmptyStatement");
		}, pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
			for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1) list[i$1].name === maybeName && this.raise(expr.start, "Label '" + maybeName + "' is already declared");
			for (var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null, i = this.labels.length - 1; i >= 0; i--) {
				var label$1 = this.labels[i];
				if (label$1.statementStart === node.start) label$1.statementStart = this.start, label$1.kind = kind;
				else break;
			}
			return this.labels.push({
				name: maybeName,
				kind,
				statementStart: this.start
			}), node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label"), this.labels.pop(), node.label = expr, this.finishNode(node, "LabeledStatement");
		}, pp$8.parseExpressionStatement = function(node, expr) {
			return node.expression = expr, this.semicolon(), this.finishNode(node, "ExpressionStatement");
		}, pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
			for (createNewLexicalScope === void 0 && (createNewLexicalScope = !0), node === void 0 && (node = this.startNode()), node.body = [], this.expect(types$1.braceL), createNewLexicalScope && this.enterScope(0); this.type !== types$1.braceR;) {
				var stmt = this.parseStatement(null);
				node.body.push(stmt);
			}
			return exitStrict && (this.strict = !1), this.next(), createNewLexicalScope && this.exitScope(), this.finishNode(node, "BlockStatement");
		}, pp$8.parseFor = function(node, init) {
			return node.init = init, this.expect(types$1.semi), node.test = this.type === types$1.semi ? null : this.parseExpression(), this.expect(types$1.semi), node.update = this.type === types$1.parenR ? null : this.parseExpression(), this.expect(types$1.parenR), node.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(node, "ForStatement");
		}, pp$8.parseForIn = function(node, init) {
			var isForIn = this.type === types$1._in;
			return this.next(), init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier") && this.raise(init.start, (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"), node.left = init, node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign(), this.expect(types$1.parenR), node.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
		}, pp$8.parseVar = function(node, isFor, kind, allowMissingInitializer) {
			for (node.declarations = [], node.kind = kind;;) {
				var decl = this.startNode();
				if (this.parseVarId(decl, kind), this.eat(types$1.eq) ? decl.init = this.parseMaybeAssign(isFor) : !allowMissingInitializer && kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !allowMissingInitializer && (kind === "using" || kind === "await using") && this.options.ecmaVersion >= 17 && this.type !== types$1._in && !this.isContextual("of") ? this.raise(this.lastTokEnd, "Missing initializer in " + kind + " declaration") : !allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : decl.init = null, node.declarations.push(this.finishNode(decl, "VariableDeclarator")), !this.eat(types$1.comma)) break;
			}
			return node;
		}, pp$8.parseVarId = function(decl, kind) {
			decl.id = kind === "using" || kind === "await using" ? this.parseIdent() : this.parseBindingAtom(), this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, !1);
		};
		var FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;
		pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
			this.initFunction(node), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) && (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT && this.unexpected(), node.generator = this.eat(types$1.star)), this.options.ecmaVersion >= 8 && (node.async = !!isAsync), statement & FUNC_STATEMENT && (node.id = statement & FUNC_NULLABLE_ID && this.type !== types$1.name ? null : this.parseIdent(), node.id && !(statement & FUNC_HANGING_STATEMENT) && this.checkLValSimple(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION));
			var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
			return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(functionFlags(node.async, node.generator)), statement & FUNC_STATEMENT || (node.id = this.type === types$1.name ? this.parseIdent() : null), this.parseFunctionParams(node), this.parseFunctionBody(node, allowExpressionBody, !1, forInit), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
		}, pp$8.parseFunctionParams = function(node) {
			this.expect(types$1.parenL), node.params = this.parseBindingList(types$1.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
		}, pp$8.parseClass = function(node, isStatement) {
			this.next();
			var oldStrict = this.strict;
			this.strict = !0, this.parseClassId(node, isStatement), this.parseClassSuper(node);
			var privateNameMap = this.enterClassBody(), classBody = this.startNode(), hadConstructor = !1;
			for (classBody.body = [], this.expect(types$1.braceL); this.type !== types$1.braceR;) {
				var element = this.parseClassElement(node.superClass !== null);
				element && (classBody.body.push(element), element.type === "MethodDefinition" && element.kind === "constructor" ? (hadConstructor && this.raiseRecoverable(element.start, "Duplicate constructor in the same class"), hadConstructor = !0) : element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element) && this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared"));
			}
			return this.strict = oldStrict, this.next(), node.body = this.finishNode(classBody, "ClassBody"), this.exitClassBody(), this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
		}, pp$8.parseClassElement = function(constructorAllowsSuper) {
			if (this.eat(types$1.semi)) return null;
			var ecmaVersion = this.options.ecmaVersion, node = this.startNode(), keyName = "", isGenerator = !1, isAsync = !1, kind = "method", isStatic = !1;
			if (this.eatContextual("static")) {
				if (ecmaVersion >= 13 && this.eat(types$1.braceL)) return this.parseClassStaticBlock(node), node;
				this.isClassElementNameStart() || this.type === types$1.star ? isStatic = !0 : keyName = "static";
			}
			if (node.static = isStatic, !keyName && ecmaVersion >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon() ? isAsync = !0 : keyName = "async"), !keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star) && (isGenerator = !0), !keyName && !isAsync && !isGenerator) {
				var lastValue = this.value;
				(this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? kind = lastValue : keyName = lastValue);
			}
			if (keyName ? (node.computed = !1, node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), node.key.name = keyName, this.finishNode(node.key, "Identifier")) : this.parseClassElementName(node), ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
				var isConstructor = !node.static && checkKeyName(node, "constructor"), allowsDirectSuper = isConstructor && constructorAllowsSuper;
				isConstructor && kind !== "method" && this.raise(node.key.start, "Constructor can't have get/set modifier"), node.kind = isConstructor ? "constructor" : kind, this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
			} else this.parseClassField(node);
			return node;
		}, pp$8.isClassElementNameStart = function() {
			return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
		}, pp$8.parseClassElementName = function(element) {
			this.type === types$1.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), element.computed = !1, element.key = this.parsePrivateIdent()) : this.parsePropertyName(element);
		}, pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
			var key = method.key;
			method.kind === "constructor" ? (isGenerator && this.raise(key.start, "Constructor can't be a generator"), isAsync && this.raise(key.start, "Constructor can't be an async method")) : method.static && checkKeyName(method, "prototype") && this.raise(key.start, "Classes may not have a static property named prototype");
			var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
			return method.kind === "get" && value.params.length !== 0 && this.raiseRecoverable(value.start, "getter should have no params"), method.kind === "set" && value.params.length !== 1 && this.raiseRecoverable(value.start, "setter should have exactly one param"), method.kind === "set" && value.params[0].type === "RestElement" && this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params"), this.finishNode(method, "MethodDefinition");
		}, pp$8.parseClassField = function(field) {
			return checkKeyName(field, "constructor") ? this.raise(field.key.start, "Classes can't have a field named 'constructor'") : field.static && checkKeyName(field, "prototype") && this.raise(field.key.start, "Classes can't have a static field named 'prototype'"), this.eat(types$1.eq) ? (this.enterScope(SCOPE_CLASS_FIELD_INIT | SCOPE_SUPER), field.value = this.parseMaybeAssign(), this.exitScope()) : field.value = null, this.semicolon(), this.finishNode(field, "PropertyDefinition");
		}, pp$8.parseClassStaticBlock = function(node) {
			node.body = [];
			var oldLabels = this.labels;
			for (this.labels = [], this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER); this.type !== types$1.braceR;) {
				var stmt = this.parseStatement(null);
				node.body.push(stmt);
			}
			return this.next(), this.exitScope(), this.labels = oldLabels, this.finishNode(node, "StaticBlock");
		}, pp$8.parseClassId = function(node, isStatement) {
			this.type === types$1.name ? (node.id = this.parseIdent(), isStatement && this.checkLValSimple(node.id, BIND_LEXICAL, !1)) : (isStatement === !0 && this.unexpected(), node.id = null);
		}, pp$8.parseClassSuper = function(node) {
			node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, !1) : null;
		}, pp$8.enterClassBody = function() {
			var element = {
				declared: Object.create(null),
				used: []
			};
			return this.privateNameStack.push(element), element.declared;
		}, pp$8.exitClassBody = function() {
			var ref = this.privateNameStack.pop(), declared = ref.declared, used = ref.used;
			if (this.options.checkPrivateFields) for (var len = this.privateNameStack.length, parent = len === 0 ? null : this.privateNameStack[len - 1], i = 0; i < used.length; ++i) {
				var id = used[i];
				hasOwn(declared, id.name) || (parent ? parent.used.push(id) : this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class"));
			}
		};
		function isPrivateNameConflicted(privateNameMap, element) {
			var name = element.key.name, curr = privateNameMap[name], next = "true";
			return element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set") && (next = (element.static ? "s" : "i") + element.kind), curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget" ? (privateNameMap[name] = "true", !1) : curr ? !0 : (privateNameMap[name] = next, !1);
		}
		function checkKeyName(node, name) {
			var computed = node.computed, key = node.key;
			return !computed && (key.type === "Identifier" && key.name === name || key.type === "Literal" && key.value === name);
		}
		pp$8.parseExportAllDeclaration = function(node, exports$4) {
			return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (node.exported = this.parseModuleExportName(), this.checkExport(exports$4, node.exported, this.lastTokStart)) : node.exported = null), this.expectContextual("from"), this.type !== types$1.string && this.unexpected(), node.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (node.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(node, "ExportAllDeclaration");
		}, pp$8.parseExport = function(node, exports$5) {
			if (this.next(), this.eat(types$1.star)) return this.parseExportAllDeclaration(node, exports$5);
			if (this.eat(types$1._default)) return this.checkExport(exports$5, "default", this.lastTokStart), node.declaration = this.parseExportDefaultDeclaration(), this.finishNode(node, "ExportDefaultDeclaration");
			if (this.shouldParseExportStatement()) node.declaration = this.parseExportDeclaration(node), node.declaration.type === "VariableDeclaration" ? this.checkVariableExport(exports$5, node.declaration.declarations) : this.checkExport(exports$5, node.declaration.id, node.declaration.id.start), node.specifiers = [], node.source = null, this.options.ecmaVersion >= 16 && (node.attributes = []);
			else {
				if (node.declaration = null, node.specifiers = this.parseExportSpecifiers(exports$5), this.eatContextual("from")) this.type !== types$1.string && this.unexpected(), node.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (node.attributes = this.parseWithClause());
				else {
					for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
						var spec = list[i];
						this.checkUnreserved(spec.local), this.checkLocalExport(spec.local), spec.local.type === "Literal" && this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
					}
					node.source = null, this.options.ecmaVersion >= 16 && (node.attributes = []);
				}
				this.semicolon();
			}
			return this.finishNode(node, "ExportNamedDeclaration");
		}, pp$8.parseExportDeclaration = function(node) {
			return this.parseStatement(null);
		}, pp$8.parseExportDefaultDeclaration = function() {
			var isAsync;
			if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
				var fNode = this.startNode();
				return this.next(), isAsync && this.next(), this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, !1, isAsync);
			} else if (this.type === types$1._class) {
				var cNode = this.startNode();
				return this.parseClass(cNode, "nullableID");
			} else {
				var declaration = this.parseMaybeAssign();
				return this.semicolon(), declaration;
			}
		}, pp$8.checkExport = function(exports$6, name, pos) {
			exports$6 && (typeof name != "string" && (name = name.type === "Identifier" ? name.name : name.value), hasOwn(exports$6, name) && this.raiseRecoverable(pos, "Duplicate export '" + name + "'"), exports$6[name] = !0);
		}, pp$8.checkPatternExport = function(exports$7, pat) {
			var type = pat.type;
			if (type === "Identifier") this.checkExport(exports$7, pat, pat.start);
			else if (type === "ObjectPattern") for (var i = 0, list = pat.properties; i < list.length; i += 1) {
				var prop = list[i];
				this.checkPatternExport(exports$7, prop);
			}
			else if (type === "ArrayPattern") for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
				var elt = list$1[i$1];
				elt && this.checkPatternExport(exports$7, elt);
			}
			else type === "Property" ? this.checkPatternExport(exports$7, pat.value) : type === "AssignmentPattern" ? this.checkPatternExport(exports$7, pat.left) : type === "RestElement" && this.checkPatternExport(exports$7, pat.argument);
		}, pp$8.checkVariableExport = function(exports$8, decls) {
			if (exports$8) for (var i = 0, list = decls; i < list.length; i += 1) {
				var decl = list[i];
				this.checkPatternExport(exports$8, decl.id);
			}
		}, pp$8.shouldParseExportStatement = function() {
			return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
		}, pp$8.parseExportSpecifier = function(exports$9) {
			var node = this.startNode();
			return node.local = this.parseModuleExportName(), node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local, this.checkExport(exports$9, node.exported, node.exported.start), this.finishNode(node, "ExportSpecifier");
		}, pp$8.parseExportSpecifiers = function(exports$10) {
			var nodes = [], first = !0;
			for (this.expect(types$1.braceL); !this.eat(types$1.braceR);) {
				if (first) first = !1;
				else if (this.expect(types$1.comma), this.afterTrailingComma(types$1.braceR)) break;
				nodes.push(this.parseExportSpecifier(exports$10));
			}
			return nodes;
		}, pp$8.parseImport = function(node) {
			return this.next(), this.type === types$1.string ? (node.specifiers = empty$1, node.source = this.parseExprAtom()) : (node.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (node.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(node, "ImportDeclaration");
		}, pp$8.parseImportSpecifier = function() {
			var node = this.startNode();
			return node.imported = this.parseModuleExportName(), this.eatContextual("as") ? node.local = this.parseIdent() : (this.checkUnreserved(node.imported), node.local = node.imported), this.checkLValSimple(node.local, BIND_LEXICAL), this.finishNode(node, "ImportSpecifier");
		}, pp$8.parseImportDefaultSpecifier = function() {
			var node = this.startNode();
			return node.local = this.parseIdent(), this.checkLValSimple(node.local, BIND_LEXICAL), this.finishNode(node, "ImportDefaultSpecifier");
		}, pp$8.parseImportNamespaceSpecifier = function() {
			var node = this.startNode();
			return this.next(), this.expectContextual("as"), node.local = this.parseIdent(), this.checkLValSimple(node.local, BIND_LEXICAL), this.finishNode(node, "ImportNamespaceSpecifier");
		}, pp$8.parseImportSpecifiers = function() {
			var nodes = [], first = !0;
			if (this.type === types$1.name && (nodes.push(this.parseImportDefaultSpecifier()), !this.eat(types$1.comma))) return nodes;
			if (this.type === types$1.star) return nodes.push(this.parseImportNamespaceSpecifier()), nodes;
			for (this.expect(types$1.braceL); !this.eat(types$1.braceR);) {
				if (first) first = !1;
				else if (this.expect(types$1.comma), this.afterTrailingComma(types$1.braceR)) break;
				nodes.push(this.parseImportSpecifier());
			}
			return nodes;
		}, pp$8.parseWithClause = function() {
			var nodes = [];
			if (!this.eat(types$1._with)) return nodes;
			this.expect(types$1.braceL);
			for (var attributeKeys = {}, first = !0; !this.eat(types$1.braceR);) {
				if (first) first = !1;
				else if (this.expect(types$1.comma), this.afterTrailingComma(types$1.braceR)) break;
				var attr = this.parseImportAttribute(), keyName = attr.key.type === "Identifier" ? attr.key.name : attr.key.value;
				hasOwn(attributeKeys, keyName) && this.raiseRecoverable(attr.key.start, "Duplicate attribute key '" + keyName + "'"), attributeKeys[keyName] = !0, nodes.push(attr);
			}
			return nodes;
		}, pp$8.parseImportAttribute = function() {
			var node = this.startNode();
			return node.key = this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(types$1.colon), this.type !== types$1.string && this.unexpected(), node.value = this.parseExprAtom(), this.finishNode(node, "ImportAttribute");
		}, pp$8.parseModuleExportName = function() {
			if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
				var stringLiteral = this.parseLiteral(this.value);
				return loneSurrogate.test(stringLiteral.value) && this.raise(stringLiteral.start, "An export name cannot include a lone surrogate."), stringLiteral;
			}
			return this.parseIdent(!0);
		}, pp$8.adaptDirectivePrologue = function(statements) {
			for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) statements[i].directive = statements[i].expression.raw.slice(1, -1);
		}, pp$8.isDirectiveCandidate = function(statement) {
			return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value == "string" && (this.input[statement.start] === "\"" || this.input[statement.start] === "'");
		};
		var pp$7 = Parser.prototype;
		pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
			if (this.options.ecmaVersion >= 6 && node) switch (node.type) {
				case "Identifier":
					this.inAsync && node.name === "await" && this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
					break;
				case "ObjectPattern":
				case "ArrayPattern":
				case "AssignmentPattern":
				case "RestElement": break;
				case "ObjectExpression":
					node.type = "ObjectPattern", refDestructuringErrors && this.checkPatternErrors(refDestructuringErrors, !0);
					for (var i = 0, list = node.properties; i < list.length; i += 1) {
						var prop = list[i];
						this.toAssignable(prop, isBinding), prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern") && this.raise(prop.argument.start, "Unexpected token");
					}
					break;
				case "Property":
					node.kind !== "init" && this.raise(node.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(node.value, isBinding);
					break;
				case "ArrayExpression":
					node.type = "ArrayPattern", refDestructuringErrors && this.checkPatternErrors(refDestructuringErrors, !0), this.toAssignableList(node.elements, isBinding);
					break;
				case "SpreadElement":
					node.type = "RestElement", this.toAssignable(node.argument, isBinding), node.argument.type === "AssignmentPattern" && this.raise(node.argument.start, "Rest elements cannot have a default value");
					break;
				case "AssignmentExpression":
					node.operator !== "=" && this.raise(node.left.end, "Only '=' operator can be used for specifying default value."), node.type = "AssignmentPattern", delete node.operator, this.toAssignable(node.left, isBinding);
					break;
				case "ParenthesizedExpression":
					this.toAssignable(node.expression, isBinding, refDestructuringErrors);
					break;
				case "ChainExpression":
					this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
					break;
				case "MemberExpression": if (!isBinding) break;
				default: this.raise(node.start, "Assigning to rvalue");
			}
			else refDestructuringErrors && this.checkPatternErrors(refDestructuringErrors, !0);
			return node;
		}, pp$7.toAssignableList = function(exprList, isBinding) {
			for (var end = exprList.length, i = 0; i < end; i++) {
				var elt = exprList[i];
				elt && this.toAssignable(elt, isBinding);
			}
			if (end) {
				var last = exprList[end - 1];
				this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier" && this.unexpected(last.argument.start);
			}
			return exprList;
		}, pp$7.parseSpread = function(refDestructuringErrors) {
			var node = this.startNode();
			return this.next(), node.argument = this.parseMaybeAssign(!1, refDestructuringErrors), this.finishNode(node, "SpreadElement");
		}, pp$7.parseRestBinding = function() {
			var node = this.startNode();
			return this.next(), this.options.ecmaVersion === 6 && this.type !== types$1.name && this.unexpected(), node.argument = this.parseBindingAtom(), this.finishNode(node, "RestElement");
		}, pp$7.parseBindingAtom = function() {
			if (this.options.ecmaVersion >= 6) switch (this.type) {
				case types$1.bracketL:
					var node = this.startNode();
					return this.next(), node.elements = this.parseBindingList(types$1.bracketR, !0, !0), this.finishNode(node, "ArrayPattern");
				case types$1.braceL: return this.parseObj(!0);
			}
			return this.parseIdent();
		}, pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma, allowModifiers) {
			for (var elts = [], first = !0; !this.eat(close);) if (first ? first = !1 : this.expect(types$1.comma), allowEmpty && this.type === types$1.comma) elts.push(null);
			else if (allowTrailingComma && this.afterTrailingComma(close)) break;
			else if (this.type === types$1.ellipsis) {
				var rest = this.parseRestBinding();
				this.parseBindingListItem(rest), elts.push(rest), this.type === types$1.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(close);
				break;
			} else elts.push(this.parseAssignableListItem(allowModifiers));
			return elts;
		}, pp$7.parseAssignableListItem = function(allowModifiers) {
			var elem = this.parseMaybeDefault(this.start, this.startLoc);
			return this.parseBindingListItem(elem), elem;
		}, pp$7.parseBindingListItem = function(param) {
			return param;
		}, pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
			if (left ||= this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) return left;
			var node = this.startNodeAt(startPos, startLoc);
			return node.left = left, node.right = this.parseMaybeAssign(), this.finishNode(node, "AssignmentPattern");
		}, pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
			bindingType === void 0 && (bindingType = BIND_NONE);
			var isBind = bindingType !== BIND_NONE;
			switch (expr.type) {
				case "Identifier":
					this.strict && this.reservedWordsStrictBind.test(expr.name) && this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode"), isBind && (bindingType === BIND_LEXICAL && expr.name === "let" && this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name"), checkClashes && (hasOwn(checkClashes, expr.name) && this.raiseRecoverable(expr.start, "Argument name clash"), checkClashes[expr.name] = !0), bindingType !== BIND_OUTSIDE && this.declareName(expr.name, bindingType, expr.start));
					break;
				case "ChainExpression":
					this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
					break;
				case "MemberExpression":
					isBind && this.raiseRecoverable(expr.start, "Binding member expression");
					break;
				case "ParenthesizedExpression": return isBind && this.raiseRecoverable(expr.start, "Binding parenthesized expression"), this.checkLValSimple(expr.expression, bindingType, checkClashes);
				default: this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
			}
		}, pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
			switch (bindingType === void 0 && (bindingType = BIND_NONE), expr.type) {
				case "ObjectPattern":
					for (var i = 0, list = expr.properties; i < list.length; i += 1) {
						var prop = list[i];
						this.checkLValInnerPattern(prop, bindingType, checkClashes);
					}
					break;
				case "ArrayPattern":
					for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
						var elem = list$1[i$1];
						elem && this.checkLValInnerPattern(elem, bindingType, checkClashes);
					}
					break;
				default: this.checkLValSimple(expr, bindingType, checkClashes);
			}
		}, pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
			switch (bindingType === void 0 && (bindingType = BIND_NONE), expr.type) {
				case "Property":
					this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
					break;
				case "AssignmentPattern":
					this.checkLValPattern(expr.left, bindingType, checkClashes);
					break;
				case "RestElement":
					this.checkLValPattern(expr.argument, bindingType, checkClashes);
					break;
				default: this.checkLValPattern(expr, bindingType, checkClashes);
			}
		};
		var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
			this.token = token, this.isExpr = !!isExpr, this.preserveSpace = !!preserveSpace, this.override = override, this.generator = !!generator;
		}, types = {
			b_stat: new TokContext("{", !1),
			b_expr: new TokContext("{", !0),
			b_tmpl: new TokContext("${", !1),
			p_stat: new TokContext("(", !1),
			p_expr: new TokContext("(", !0),
			q_tmpl: new TokContext("`", !0, !0, function(p) {
				return p.tryReadTemplateToken();
			}),
			f_stat: new TokContext("function", !1),
			f_expr: new TokContext("function", !0),
			f_expr_gen: new TokContext("function", !0, !1, null, !0),
			f_gen: new TokContext("function", !1, !1, null, !0)
		}, pp$6 = Parser.prototype;
		pp$6.initialContext = function() {
			return [types.b_stat];
		}, pp$6.curContext = function() {
			return this.context[this.context.length - 1];
		}, pp$6.braceIsBlock = function(prevType) {
			var parent = this.curContext();
			return parent === types.f_expr || parent === types.f_stat ? !0 : prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr) ? !parent.isExpr : prevType === types$1._return || prevType === types$1.name && this.exprAllowed ? lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) : prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow ? !0 : prevType === types$1.braceL ? parent === types.b_stat : prevType === types$1._var || prevType === types$1._const || prevType === types$1.name ? !1 : !this.exprAllowed;
		}, pp$6.inGeneratorContext = function() {
			for (var i = this.context.length - 1; i >= 1; i--) {
				var context = this.context[i];
				if (context.token === "function") return context.generator;
			}
			return !1;
		}, pp$6.updateContext = function(prevType) {
			var update, type = this.type;
			type.keyword && prevType === types$1.dot ? this.exprAllowed = !1 : (update = type.updateContext) ? update.call(this, prevType) : this.exprAllowed = type.beforeExpr;
		}, pp$6.overrideContext = function(tokenCtx) {
			this.curContext() !== tokenCtx && (this.context[this.context.length - 1] = tokenCtx);
		}, types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
			if (this.context.length === 1) {
				this.exprAllowed = !0;
				return;
			}
			var out = this.context.pop();
			out === types.b_stat && this.curContext().token === "function" && (out = this.context.pop()), this.exprAllowed = !out.isExpr;
		}, types$1.braceL.updateContext = function(prevType) {
			this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr), this.exprAllowed = !0;
		}, types$1.dollarBraceL.updateContext = function() {
			this.context.push(types.b_tmpl), this.exprAllowed = !0;
		}, types$1.parenL.updateContext = function(prevType) {
			var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
			this.context.push(statementParens ? types.p_stat : types.p_expr), this.exprAllowed = !0;
		}, types$1.incDec.updateContext = function() {}, types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
			prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat) ? this.context.push(types.f_expr) : this.context.push(types.f_stat), this.exprAllowed = !1;
		}, types$1.colon.updateContext = function() {
			this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
		}, types$1.backQuote.updateContext = function() {
			this.curContext() === types.q_tmpl ? this.context.pop() : this.context.push(types.q_tmpl), this.exprAllowed = !1;
		}, types$1.star.updateContext = function(prevType) {
			if (prevType === types$1._function) {
				var index = this.context.length - 1;
				this.context[index] === types.f_expr ? this.context[index] = types.f_expr_gen : this.context[index] = types.f_gen;
			}
			this.exprAllowed = !0;
		}, types$1.name.updateContext = function(prevType) {
			var allowed = !1;
			this.options.ecmaVersion >= 6 && prevType !== types$1.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (allowed = !0), this.exprAllowed = allowed;
		};
		var pp$5 = Parser.prototype;
		pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
			if (!(this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))) {
				var key = prop.key, name;
				switch (key.type) {
					case "Identifier":
						name = key.name;
						break;
					case "Literal":
						name = String(key.value);
						break;
					default: return;
				}
				var kind = prop.kind;
				if (this.options.ecmaVersion >= 6) {
					name === "__proto__" && kind === "init" && (propHash.proto && (refDestructuringErrors ? refDestructuringErrors.doubleProto < 0 && (refDestructuringErrors.doubleProto = key.start) : this.raiseRecoverable(key.start, "Redefinition of __proto__ property")), propHash.proto = !0);
					return;
				}
				name = "$" + name;
				var other = propHash[name];
				other ? (kind === "init" ? this.strict && other.init || other.get || other.set : other.init || other[kind]) && this.raiseRecoverable(key.start, "Redefinition of property") : other = propHash[name] = {
					init: !1,
					get: !1,
					set: !1
				}, other[kind] = !0;
			}
		}, pp$5.parseExpression = function(forInit, refDestructuringErrors) {
			var startPos = this.start, startLoc = this.startLoc, expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
			if (this.type === types$1.comma) {
				var node = this.startNodeAt(startPos, startLoc);
				for (node.expressions = [expr]; this.eat(types$1.comma);) node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
				return this.finishNode(node, "SequenceExpression");
			}
			return expr;
		}, pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
			if (this.isContextual("yield")) {
				if (this.inGenerator) return this.parseYield(forInit);
				this.exprAllowed = !1;
			}
			var ownDestructuringErrors = !1, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
			refDestructuringErrors ? (oldParenAssign = refDestructuringErrors.parenthesizedAssign, oldTrailingComma = refDestructuringErrors.trailingComma, oldDoubleProto = refDestructuringErrors.doubleProto, refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1) : (refDestructuringErrors = new DestructuringErrors(), ownDestructuringErrors = !0);
			var startPos = this.start, startLoc = this.startLoc;
			(this.type === types$1.parenL || this.type === types$1.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = forInit === "await");
			var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
			if (afterLeftParse && (left = afterLeftParse.call(this, left, startPos, startLoc)), this.type.isAssign) {
				var node = this.startNodeAt(startPos, startLoc);
				return node.operator = this.value, this.type === types$1.eq && (left = this.toAssignable(left, !1, refDestructuringErrors)), ownDestructuringErrors || (refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1), refDestructuringErrors.shorthandAssign >= left.start && (refDestructuringErrors.shorthandAssign = -1), this.type === types$1.eq ? this.checkLValPattern(left) : this.checkLValSimple(left), node.left = left, this.next(), node.right = this.parseMaybeAssign(forInit), oldDoubleProto > -1 && (refDestructuringErrors.doubleProto = oldDoubleProto), this.finishNode(node, "AssignmentExpression");
			} else ownDestructuringErrors && this.checkExpressionErrors(refDestructuringErrors, !0);
			return oldParenAssign > -1 && (refDestructuringErrors.parenthesizedAssign = oldParenAssign), oldTrailingComma > -1 && (refDestructuringErrors.trailingComma = oldTrailingComma), left;
		}, pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
			var startPos = this.start, startLoc = this.startLoc, expr = this.parseExprOps(forInit, refDestructuringErrors);
			if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
			if (this.eat(types$1.question)) {
				var node = this.startNodeAt(startPos, startLoc);
				return node.test = expr, node.consequent = this.parseMaybeAssign(), this.expect(types$1.colon), node.alternate = this.parseMaybeAssign(forInit), this.finishNode(node, "ConditionalExpression");
			}
			return expr;
		}, pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
			var startPos = this.start, startLoc = this.startLoc, expr = this.parseMaybeUnary(refDestructuringErrors, !1, !1, forInit);
			return this.checkExpressionErrors(refDestructuringErrors) || expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
		}, pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
			var prec = this.type.binop;
			if (prec != null && (!forInit || this.type !== types$1._in) && prec > minPrec) {
				var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND, coalesce = this.type === types$1.coalesce;
				coalesce && (prec = types$1.logicalAND.binop);
				var op = this.value;
				this.next();
				var startPos = this.start, startLoc = this.startLoc, right = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, forInit), startPos, startLoc, prec, forInit), node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
				return (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit);
			}
			return left;
		}, pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
			right.type === "PrivateIdentifier" && this.raise(right.start, "Private identifier can only be left side of binary expression");
			var node = this.startNodeAt(startPos, startLoc);
			return node.left = left, node.operator = op, node.right = right, this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
		}, pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
			var startPos = this.start, startLoc = this.startLoc, expr;
			if (this.isContextual("await") && this.canAwait) expr = this.parseAwait(forInit), sawUnary = !0;
			else if (this.type.prefix) {
				var node = this.startNode(), update = this.type === types$1.incDec;
				node.operator = this.value, node.prefix = !0, this.next(), node.argument = this.parseMaybeUnary(null, !0, update, forInit), this.checkExpressionErrors(refDestructuringErrors, !0), update ? this.checkLValSimple(node.argument) : this.strict && node.operator === "delete" && isLocalVariableAccess(node.argument) ? this.raiseRecoverable(node.start, "Deleting local variable in strict mode") : node.operator === "delete" && isPrivateFieldAccess(node.argument) ? this.raiseRecoverable(node.start, "Private fields can not be deleted") : sawUnary = !0, expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
			} else if (!sawUnary && this.type === types$1.privateId) (forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), expr = this.parsePrivateIdent(), this.type !== types$1._in && this.unexpected();
			else {
				if (expr = this.parseExprSubscripts(refDestructuringErrors, forInit), this.checkExpressionErrors(refDestructuringErrors)) return expr;
				for (; this.type.postfix && !this.canInsertSemicolon();) {
					var node$1 = this.startNodeAt(startPos, startLoc);
					node$1.operator = this.value, node$1.prefix = !1, node$1.argument = expr, this.checkLValSimple(expr), this.next(), expr = this.finishNode(node$1, "UpdateExpression");
				}
			}
			if (!incDec && this.eat(types$1.starstar)) if (sawUnary) this.unexpected(this.lastTokStart);
			else return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, !1, !1, forInit), "**", !1);
			else return expr;
		};
		function isLocalVariableAccess(node) {
			return node.type === "Identifier" || node.type === "ParenthesizedExpression" && isLocalVariableAccess(node.expression);
		}
		function isPrivateFieldAccess(node) {
			return node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" || node.type === "ChainExpression" && isPrivateFieldAccess(node.expression) || node.type === "ParenthesizedExpression" && isPrivateFieldAccess(node.expression);
		}
		pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
			var startPos = this.start, startLoc = this.startLoc, expr = this.parseExprAtom(refDestructuringErrors, forInit);
			if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") return expr;
			var result = this.parseSubscripts(expr, startPos, startLoc, !1, forInit);
			return refDestructuringErrors && result.type === "MemberExpression" && (refDestructuringErrors.parenthesizedAssign >= result.start && (refDestructuringErrors.parenthesizedAssign = -1), refDestructuringErrors.parenthesizedBind >= result.start && (refDestructuringErrors.parenthesizedBind = -1), refDestructuringErrors.trailingComma >= result.start && (refDestructuringErrors.trailingComma = -1)), result;
		}, pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
			for (var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start, optionalChained = !1;;) {
				var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
				if (element.optional && (optionalChained = !0), element === base || element.type === "ArrowFunctionExpression") {
					if (optionalChained) {
						var chainNode = this.startNodeAt(startPos, startLoc);
						chainNode.expression = element, element = this.finishNode(chainNode, "ChainExpression");
					}
					return element;
				}
				base = element;
			}
		}, pp$5.shouldParseAsyncArrow = function() {
			return !this.canInsertSemicolon() && this.eat(types$1.arrow);
		}, pp$5.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
			return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, !0, forInit);
		}, pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
			var optionalSupported = this.options.ecmaVersion >= 11, optional = optionalSupported && this.eat(types$1.questionDot);
			noCalls && optional && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
			var computed = this.eat(types$1.bracketL);
			if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
				var node = this.startNodeAt(startPos, startLoc);
				node.object = base, computed ? (node.property = this.parseExpression(), this.expect(types$1.bracketR)) : this.type === types$1.privateId && base.type !== "Super" ? node.property = this.parsePrivateIdent() : node.property = this.parseIdent(this.options.allowReserved !== "never"), node.computed = !!computed, optionalSupported && (node.optional = optional), base = this.finishNode(node, "MemberExpression");
			} else if (!noCalls && this.eat(types$1.parenL)) {
				var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
				this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
				var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, !1, refDestructuringErrors);
				if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) return this.checkPatternErrors(refDestructuringErrors, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit);
				this.checkExpressionErrors(refDestructuringErrors, !0), this.yieldPos = oldYieldPos || this.yieldPos, this.awaitPos = oldAwaitPos || this.awaitPos, this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
				var node$1 = this.startNodeAt(startPos, startLoc);
				node$1.callee = base, node$1.arguments = exprList, optionalSupported && (node$1.optional = optional), base = this.finishNode(node$1, "CallExpression");
			} else if (this.type === types$1.backQuote) {
				(optional || optionalChained) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
				var node$2 = this.startNodeAt(startPos, startLoc);
				node$2.tag = base, node$2.quasi = this.parseTemplate({ isTagged: !0 }), base = this.finishNode(node$2, "TaggedTemplateExpression");
			}
			return base;
		}, pp$5.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
			this.type === types$1.slash && this.readRegexp();
			var node, canBeArrow = this.potentialArrowAt === this.start;
			switch (this.type) {
				case types$1._super: return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), node = this.startNode(), this.next(), this.type === types$1.parenL && !this.allowDirectSuper && this.raise(node.start, "super() call outside constructor of a subclass"), this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL && this.unexpected(), this.finishNode(node, "Super");
				case types$1._this: return node = this.startNode(), this.next(), this.finishNode(node, "ThisExpression");
				case types$1.name:
					var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc, id = this.parseIdent(!1);
					if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) return this.overrideContext(types.f_expr), this.parseFunction(this.startNodeAt(startPos, startLoc), 0, !1, !0, forInit);
					if (canBeArrow && !this.canInsertSemicolon()) {
						if (this.eat(types$1.arrow)) return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], !1, forInit);
						if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) return id = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(types$1.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], !0, forInit);
					}
					return id;
				case types$1.regexp:
					var value = this.value;
					return node = this.parseLiteral(value.value), node.regex = {
						pattern: value.pattern,
						flags: value.flags
					}, node;
				case types$1.num:
				case types$1.string: return this.parseLiteral(this.value);
				case types$1._null:
				case types$1._true:
				case types$1._false: return node = this.startNode(), node.value = this.type === types$1._null ? null : this.type === types$1._true, node.raw = this.type.keyword, this.next(), this.finishNode(node, "Literal");
				case types$1.parenL:
					var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
					return refDestructuringErrors && (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr) && (refDestructuringErrors.parenthesizedAssign = start), refDestructuringErrors.parenthesizedBind < 0 && (refDestructuringErrors.parenthesizedBind = start)), expr;
				case types$1.bracketL: return node = this.startNode(), this.next(), node.elements = this.parseExprList(types$1.bracketR, !0, !0, refDestructuringErrors), this.finishNode(node, "ArrayExpression");
				case types$1.braceL: return this.overrideContext(types.b_expr), this.parseObj(!1, refDestructuringErrors);
				case types$1._function: return node = this.startNode(), this.next(), this.parseFunction(node, 0);
				case types$1._class: return this.parseClass(this.startNode(), !1);
				case types$1._new: return this.parseNew();
				case types$1.backQuote: return this.parseTemplate();
				case types$1._import: return this.options.ecmaVersion >= 11 ? this.parseExprImport(forNew) : this.unexpected();
				default: return this.parseExprAtomDefault();
			}
		}, pp$5.parseExprAtomDefault = function() {
			this.unexpected();
		}, pp$5.parseExprImport = function(forNew) {
			var node = this.startNode();
			if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === types$1.parenL && !forNew) return this.parseDynamicImport(node);
			if (this.type === types$1.dot) {
				var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
				return meta.name = "import", node.meta = this.finishNode(meta, "Identifier"), this.parseImportMeta(node);
			} else this.unexpected();
		}, pp$5.parseDynamicImport = function(node) {
			if (this.next(), node.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16) this.eat(types$1.parenR) ? node.options = null : (this.expect(types$1.comma), this.afterTrailingComma(types$1.parenR) ? node.options = null : (node.options = this.parseMaybeAssign(), this.eat(types$1.parenR) || (this.expect(types$1.comma), this.afterTrailingComma(types$1.parenR) || this.unexpected())));
			else if (!this.eat(types$1.parenR)) {
				var errorPos = this.start;
				this.eat(types$1.comma) && this.eat(types$1.parenR) ? this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()") : this.unexpected(errorPos);
			}
			return this.finishNode(node, "ImportExpression");
		}, pp$5.parseImportMeta = function(node) {
			this.next();
			var containsEsc = this.containsEsc;
			return node.property = this.parseIdent(!0), node.property.name !== "meta" && this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'"), containsEsc && this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module"), this.finishNode(node, "MetaProperty");
		}, pp$5.parseLiteral = function(value) {
			var node = this.startNode();
			return node.value = value, node.raw = this.input.slice(this.start, this.end), node.raw.charCodeAt(node.raw.length - 1) === 110 && (node.bigint = node.value == null ? node.raw.slice(0, -1).replace(/_/g, "") : node.value.toString()), this.next(), this.finishNode(node, "Literal");
		}, pp$5.parseParenExpression = function() {
			this.expect(types$1.parenL);
			var val = this.parseExpression();
			return this.expect(types$1.parenR), val;
		}, pp$5.shouldParseArrow = function(exprList) {
			return !this.canInsertSemicolon();
		}, pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
			var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
			if (this.options.ecmaVersion >= 6) {
				this.next();
				var innerStartPos = this.start, innerStartLoc = this.startLoc, exprList = [], first = !0, lastIsComma = !1, refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
				for (this.yieldPos = 0, this.awaitPos = 0; this.type !== types$1.parenR;) if (first ? first = !1 : this.expect(types$1.comma), allowTrailingComma && this.afterTrailingComma(types$1.parenR, !0)) {
					lastIsComma = !0;
					break;
				} else if (this.type === types$1.ellipsis) {
					spreadStart = this.start, exprList.push(this.parseParenItem(this.parseRestBinding())), this.type === types$1.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
					break;
				} else exprList.push(this.parseMaybeAssign(!1, refDestructuringErrors, this.parseParenItem));
				var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
				if (this.expect(types$1.parenR), canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$1.arrow)) return this.checkPatternErrors(refDestructuringErrors, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.parseParenArrowList(startPos, startLoc, exprList, forInit);
				(!exprList.length || lastIsComma) && this.unexpected(this.lastTokStart), spreadStart && this.unexpected(spreadStart), this.checkExpressionErrors(refDestructuringErrors, !0), this.yieldPos = oldYieldPos || this.yieldPos, this.awaitPos = oldAwaitPos || this.awaitPos, exprList.length > 1 ? (val = this.startNodeAt(innerStartPos, innerStartLoc), val.expressions = exprList, this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc)) : val = exprList[0];
			} else val = this.parseParenExpression();
			if (this.options.preserveParens) {
				var par = this.startNodeAt(startPos, startLoc);
				return par.expression = val, this.finishNode(par, "ParenthesizedExpression");
			} else return val;
		}, pp$5.parseParenItem = function(item) {
			return item;
		}, pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
			return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, !1, forInit);
		};
		var empty = [];
		pp$5.parseNew = function() {
			this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
			var node = this.startNode();
			if (this.next(), this.options.ecmaVersion >= 6 && this.type === types$1.dot) {
				var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
				meta.name = "new", node.meta = this.finishNode(meta, "Identifier"), this.next();
				var containsEsc = this.containsEsc;
				return node.property = this.parseIdent(!0), node.property.name !== "target" && this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'"), containsEsc && this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block"), this.finishNode(node, "MetaProperty");
			}
			var startPos = this.start, startLoc = this.startLoc;
			return node.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), startPos, startLoc, !0, !1), this.eat(types$1.parenL) ? node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, !1) : node.arguments = empty, this.finishNode(node, "NewExpression");
		}, pp$5.parseTemplateElement = function(ref) {
			var isTagged = ref.isTagged, elem = this.startNode();
			return this.type === types$1.invalidTemplate ? (isTagged || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), elem.value = {
				raw: this.value.replace(/\r\n?/g, "\n"),
				cooked: null
			}) : elem.value = {
				raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
				cooked: this.value
			}, this.next(), elem.tail = this.type === types$1.backQuote, this.finishNode(elem, "TemplateElement");
		}, pp$5.parseTemplate = function(ref) {
			ref === void 0 && (ref = {});
			var isTagged = ref.isTagged;
			isTagged === void 0 && (isTagged = !1);
			var node = this.startNode();
			this.next(), node.expressions = [];
			var curElt = this.parseTemplateElement({ isTagged });
			for (node.quasis = [curElt]; !curElt.tail;) this.type === types$1.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(types$1.dollarBraceL), node.expressions.push(this.parseExpression()), this.expect(types$1.braceR), node.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
			return this.next(), this.finishNode(node, "TemplateLiteral");
		}, pp$5.isAsyncProp = function(prop) {
			return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
		}, pp$5.parseObj = function(isPattern, refDestructuringErrors) {
			var node = this.startNode(), first = !0, propHash = {};
			for (node.properties = [], this.next(); !this.eat(types$1.braceR);) {
				if (first) first = !1;
				else if (this.expect(types$1.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) break;
				var prop = this.parseProperty(isPattern, refDestructuringErrors);
				isPattern || this.checkPropClash(prop, propHash, refDestructuringErrors), node.properties.push(prop);
			}
			return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
		}, pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
			var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
			if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) return isPattern ? (prop.argument = this.parseIdent(!1), this.type === types$1.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(prop, "RestElement")) : (prop.argument = this.parseMaybeAssign(!1, refDestructuringErrors), this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0 && (refDestructuringErrors.trailingComma = this.start), this.finishNode(prop, "SpreadElement"));
			this.options.ecmaVersion >= 6 && (prop.method = !1, prop.shorthand = !1, (isPattern || refDestructuringErrors) && (startPos = this.start, startLoc = this.startLoc), isPattern || (isGenerator = this.eat(types$1.star)));
			var containsEsc = this.containsEsc;
			return this.parsePropertyName(prop), !isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop) ? (isAsync = !0, isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star), this.parsePropertyName(prop)) : isAsync = !1, this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc), this.finishNode(prop, "Property");
		}, pp$5.parseGetterSetter = function(prop) {
			var kind = prop.key.name;
			this.parsePropertyName(prop), prop.value = this.parseMethod(!1), prop.kind = kind;
			var paramCount = prop.kind === "get" ? 0 : 1;
			if (prop.value.params.length !== paramCount) {
				var start = prop.value.start;
				prop.kind === "get" ? this.raiseRecoverable(start, "getter should have no params") : this.raiseRecoverable(start, "setter should have exactly one param");
			} else prop.kind === "set" && prop.value.params[0].type === "RestElement" && this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
		}, pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
			(isGenerator || isAsync) && this.type === types$1.colon && this.unexpected(), this.eat(types$1.colon) ? (prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, refDestructuringErrors), prop.kind = "init") : this.options.ecmaVersion >= 6 && this.type === types$1.parenL ? (isPattern && this.unexpected(), prop.method = !0, prop.value = this.parseMethod(isGenerator, isAsync), prop.kind = "init") : !isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq ? ((isGenerator || isAsync) && this.unexpected(), this.parseGetterSetter(prop)) : this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier" ? ((isGenerator || isAsync) && this.unexpected(), this.checkUnreserved(prop.key), prop.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = startPos), isPattern ? prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key)) : this.type === types$1.eq && refDestructuringErrors ? (refDestructuringErrors.shorthandAssign < 0 && (refDestructuringErrors.shorthandAssign = this.start), prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key))) : prop.value = this.copyNode(prop.key), prop.kind = "init", prop.shorthand = !0) : this.unexpected();
		}, pp$5.parsePropertyName = function(prop) {
			if (this.options.ecmaVersion >= 6) {
				if (this.eat(types$1.bracketL)) return prop.computed = !0, prop.key = this.parseMaybeAssign(), this.expect(types$1.bracketR), prop.key;
				prop.computed = !1;
			}
			return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
		}, pp$5.initFunction = function(node) {
			node.id = null, this.options.ecmaVersion >= 6 && (node.generator = node.expression = !1), this.options.ecmaVersion >= 8 && (node.async = !1);
		}, pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
			var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
			return this.initFunction(node), this.options.ecmaVersion >= 6 && (node.generator = isGenerator), this.options.ecmaVersion >= 8 && (node.async = !!isAsync), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0)), this.expect(types$1.parenL), node.params = this.parseBindingList(types$1.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(node, !1, !0, !1), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.finishNode(node, "FunctionExpression");
		}, pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
			var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
			return this.enterScope(functionFlags(isAsync, !1) | SCOPE_ARROW), this.initFunction(node), this.options.ecmaVersion >= 8 && (node.async = !!isAsync), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, node.params = this.toAssignableList(params, !0), this.parseFunctionBody(node, !0, !1, forInit), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.finishNode(node, "ArrowFunctionExpression");
		}, pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
			var isExpression = isArrowFunction && this.type !== types$1.braceL, oldStrict = this.strict, useStrict = !1;
			if (isExpression) node.body = this.parseMaybeAssign(forInit), node.expression = !0, this.checkParams(node, !1);
			else {
				var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
				(!oldStrict || nonSimple) && (useStrict = this.strictDirective(this.end), useStrict && nonSimple && this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
				var oldLabels = this.labels;
				this.labels = [], useStrict && (this.strict = !0), this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params)), this.strict && node.id && this.checkLValSimple(node.id, BIND_OUTSIDE), node.body = this.parseBlock(!1, void 0, useStrict && !oldStrict), node.expression = !1, this.adaptDirectivePrologue(node.body.body), this.labels = oldLabels;
			}
			this.exitScope();
		}, pp$5.isSimpleParamList = function(params) {
			for (var i = 0, list = params; i < list.length; i += 1) if (list[i].type !== "Identifier") return !1;
			return !0;
		}, pp$5.checkParams = function(node, allowDuplicates) {
			for (var nameHash = Object.create(null), i = 0, list = node.params; i < list.length; i += 1) {
				var param = list[i];
				this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
			}
		}, pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
			for (var elts = [], first = !0; !this.eat(close);) {
				if (first) first = !1;
				else if (this.expect(types$1.comma), allowTrailingComma && this.afterTrailingComma(close)) break;
				var elt = void 0;
				allowEmpty && this.type === types$1.comma ? elt = null : this.type === types$1.ellipsis ? (elt = this.parseSpread(refDestructuringErrors), refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0 && (refDestructuringErrors.trailingComma = this.start)) : elt = this.parseMaybeAssign(!1, refDestructuringErrors), elts.push(elt);
			}
			return elts;
		}, pp$5.checkUnreserved = function(ref) {
			var start = ref.start, end = ref.end, name = ref.name;
			this.inGenerator && name === "yield" && this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && name === "await" && this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function"), !(this.currentThisScope().flags & SCOPE_VAR) && name === "arguments" && this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (name === "arguments" || name === "await") && this.raise(start, "Cannot use " + name + " in class static initialization block"), this.keywords.test(name) && this.raise(start, "Unexpected keyword '" + name + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(name) && (!this.inAsync && name === "await" && this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(start, "The keyword '" + name + "' is reserved"));
		}, pp$5.parseIdent = function(liberal) {
			var node = this.parseIdentNode();
			return this.next(!!liberal), this.finishNode(node, "Identifier"), liberal || (this.checkUnreserved(node), node.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = node.start)), node;
		}, pp$5.parseIdentNode = function() {
			var node = this.startNode();
			return this.type === types$1.name ? node.name = this.value : this.type.keyword ? (node.name = this.type.keyword, (node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = types$1.name) : this.unexpected(), node;
		}, pp$5.parsePrivateIdent = function() {
			var node = this.startNode();
			return this.type === types$1.privateId ? node.name = this.value : this.unexpected(), this.next(), this.finishNode(node, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(node.start, "Private field '#" + node.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(node)), node;
		}, pp$5.parseYield = function(forInit) {
			this.yieldPos ||= this.start;
			var node = this.startNode();
			return this.next(), this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr ? (node.delegate = !1, node.argument = null) : (node.delegate = this.eat(types$1.star), node.argument = this.parseMaybeAssign(forInit)), this.finishNode(node, "YieldExpression");
		}, pp$5.parseAwait = function(forInit) {
			this.awaitPos ||= this.start;
			var node = this.startNode();
			return this.next(), node.argument = this.parseMaybeUnary(null, !0, !1, forInit), this.finishNode(node, "AwaitExpression");
		};
		var pp$4 = Parser.prototype;
		pp$4.raise = function(pos, message) {
			var loc = getLineInfo(this.input, pos);
			message += " (" + loc.line + ":" + loc.column + ")", this.sourceFile && (message += " in " + this.sourceFile);
			var err = SyntaxError(message);
			throw err.pos = pos, err.loc = loc, err.raisedAt = this.pos, err;
		}, pp$4.raiseRecoverable = pp$4.raise, pp$4.curPosition = function() {
			if (this.options.locations) return new Position(this.curLine, this.pos - this.lineStart);
		};
		var pp$3 = Parser.prototype, Scope = function Scope(flags) {
			this.flags = flags, this.var = [], this.lexical = [], this.functions = [];
		};
		pp$3.enterScope = function(flags) {
			this.scopeStack.push(new Scope(flags));
		}, pp$3.exitScope = function() {
			this.scopeStack.pop();
		}, pp$3.treatFunctionsAsVarInScope = function(scope) {
			return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
		}, pp$3.declareName = function(name, bindingType, pos) {
			var redeclared = !1;
			if (bindingType === BIND_LEXICAL) {
				var scope = this.currentScope();
				redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1, scope.lexical.push(name), this.inModule && scope.flags & SCOPE_TOP && delete this.undefinedExports[name];
			} else if (bindingType === BIND_SIMPLE_CATCH) this.currentScope().lexical.push(name);
			else if (bindingType === BIND_FUNCTION) {
				var scope$2 = this.currentScope();
				redeclared = this.treatFunctionsAsVar ? scope$2.lexical.indexOf(name) > -1 : scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1, scope$2.functions.push(name);
			} else for (var i = this.scopeStack.length - 1; i >= 0; --i) {
				var scope$3 = this.scopeStack[i];
				if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
					redeclared = !0;
					break;
				}
				if (scope$3.var.push(name), this.inModule && scope$3.flags & SCOPE_TOP && delete this.undefinedExports[name], scope$3.flags & SCOPE_VAR) break;
			}
			redeclared && this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
		}, pp$3.checkLocalExport = function(id) {
			this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1 && (this.undefinedExports[id.name] = id);
		}, pp$3.currentScope = function() {
			return this.scopeStack[this.scopeStack.length - 1];
		}, pp$3.currentVarScope = function() {
			for (var i = this.scopeStack.length - 1;; i--) {
				var scope = this.scopeStack[i];
				if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK)) return scope;
			}
		}, pp$3.currentThisScope = function() {
			for (var i = this.scopeStack.length - 1;; i--) {
				var scope = this.scopeStack[i];
				if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK) && !(scope.flags & SCOPE_ARROW)) return scope;
			}
		};
		var Node = function Node(parser, pos, loc) {
			this.type = "", this.start = pos, this.end = 0, parser.options.locations && (this.loc = new SourceLocation(parser, loc)), parser.options.directSourceFile && (this.sourceFile = parser.options.directSourceFile), parser.options.ranges && (this.range = [pos, 0]);
		}, pp$2 = Parser.prototype;
		pp$2.startNode = function() {
			return new Node(this, this.start, this.startLoc);
		}, pp$2.startNodeAt = function(pos, loc) {
			return new Node(this, pos, loc);
		};
		function finishNodeAt(node, type, pos, loc) {
			return node.type = type, node.end = pos, this.options.locations && (node.loc.end = loc), this.options.ranges && (node.range[1] = pos), node;
		}
		pp$2.finishNode = function(node, type) {
			return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
		}, pp$2.finishNodeAt = function(node, type, pos, loc) {
			return finishNodeAt.call(this, node, type, pos, loc);
		}, pp$2.copyNode = function(node) {
			var newNode = new Node(this, node.start, this.startLoc);
			for (var prop in node) newNode[prop] = node[prop];
			return newNode;
		};
		var scriptValuesAddedInUnicode = "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz", ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic", ecma11BinaryProperties = ecma10BinaryProperties, ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict", ecma13BinaryProperties = ecma12BinaryProperties, ecma14BinaryProperties = ecma13BinaryProperties, unicodeBinaryProperties = {
			9: ecma9BinaryProperties,
			10: ecma10BinaryProperties,
			11: ecma11BinaryProperties,
			12: ecma12BinaryProperties,
			13: ecma13BinaryProperties,
			14: ecma14BinaryProperties
		}, ecma14BinaryPropertiesOfStrings = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji", unicodeBinaryPropertiesOfStrings = {
			9: "",
			10: "",
			11: "",
			12: "",
			13: "",
			14: ecma14BinaryPropertiesOfStrings
		}, unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", ecma14ScriptValues = ecma13ScriptValues + " " + scriptValuesAddedInUnicode, unicodeScriptValues = {
			9: ecma9ScriptValues,
			10: ecma10ScriptValues,
			11: ecma11ScriptValues,
			12: ecma12ScriptValues,
			13: ecma13ScriptValues,
			14: ecma14ScriptValues
		}, data = {};
		function buildUnicodeData(ecmaVersion) {
			var d = data[ecmaVersion] = {
				binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
				binaryOfStrings: wordsRegexp(unicodeBinaryPropertiesOfStrings[ecmaVersion]),
				nonBinary: {
					General_Category: wordsRegexp(unicodeGeneralCategoryValues),
					Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
				}
			};
			d.nonBinary.Script_Extensions = d.nonBinary.Script, d.nonBinary.gc = d.nonBinary.General_Category, d.nonBinary.sc = d.nonBinary.Script, d.nonBinary.scx = d.nonBinary.Script_Extensions;
		}
		for (var i = 0, list = [
			9,
			10,
			11,
			12,
			13,
			14
		]; i < list.length; i += 1) {
			var ecmaVersion = list[i];
			buildUnicodeData(ecmaVersion);
		}
		var pp$1 = Parser.prototype, BranchID = function BranchID(parent, base) {
			this.parent = parent, this.base = base || this;
		};
		BranchID.prototype.separatedFrom = function separatedFrom(alt) {
			for (var self = this; self; self = self.parent) for (var other = alt; other; other = other.parent) if (self.base === other.base && self !== other) return !0;
			return !1;
		}, BranchID.prototype.sibling = function sibling() {
			return new BranchID(this.parent, this.base);
		};
		var RegExpValidationState = function RegExpValidationState(parser) {
			this.parser = parser, this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = Object.create(null), this.backReferenceNames = [], this.branchID = null;
		};
		/**
		* Validate the flags part of a given RegExpLiteral.
		*
		* @param {RegExpValidationState} state The state to validate RegExp.
		* @returns {void}
		*/
		RegExpValidationState.prototype.reset = function reset(start, pattern, flags) {
			var unicodeSets = flags.indexOf("v") !== -1, unicode = flags.indexOf("u") !== -1;
			this.start = start | 0, this.source = pattern + "", this.flags = flags, unicodeSets && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = unicode && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = unicode && this.parser.options.ecmaVersion >= 9);
		}, RegExpValidationState.prototype.raise = function raise(message) {
			this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
		}, RegExpValidationState.prototype.at = function at(i, forceU) {
			forceU === void 0 && (forceU = !1);
			var s = this.source, l = s.length;
			if (i >= l) return -1;
			var c = s.charCodeAt(i);
			if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l) return c;
			var next = s.charCodeAt(i + 1);
			return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
		}, RegExpValidationState.prototype.nextIndex = function nextIndex(i, forceU) {
			forceU === void 0 && (forceU = !1);
			var s = this.source, l = s.length;
			if (i >= l) return l;
			var c = s.charCodeAt(i), next;
			return !(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l || (next = s.charCodeAt(i + 1)) < 56320 || next > 57343 ? i + 1 : i + 2;
		}, RegExpValidationState.prototype.current = function current(forceU) {
			return forceU === void 0 && (forceU = !1), this.at(this.pos, forceU);
		}, RegExpValidationState.prototype.lookahead = function lookahead(forceU) {
			return forceU === void 0 && (forceU = !1), this.at(this.nextIndex(this.pos, forceU), forceU);
		}, RegExpValidationState.prototype.advance = function advance(forceU) {
			forceU === void 0 && (forceU = !1), this.pos = this.nextIndex(this.pos, forceU);
		}, RegExpValidationState.prototype.eat = function eat(ch, forceU) {
			return forceU === void 0 && (forceU = !1), this.current(forceU) === ch ? (this.advance(forceU), !0) : !1;
		}, RegExpValidationState.prototype.eatChars = function eatChars(chs, forceU) {
			forceU === void 0 && (forceU = !1);
			for (var pos = this.pos, i = 0, list = chs; i < list.length; i += 1) {
				var ch = list[i], current = this.at(pos, forceU);
				if (current === -1 || current !== ch) return !1;
				pos = this.nextIndex(pos, forceU);
			}
			return this.pos = pos, !0;
		}, pp$1.validateRegExpFlags = function(state) {
			for (var validFlags = state.validFlags, flags = state.flags, u = !1, v = !1, i = 0; i < flags.length; i++) {
				var flag = flags.charAt(i);
				validFlags.indexOf(flag) === -1 && this.raise(state.start, "Invalid regular expression flag"), flags.indexOf(flag, i + 1) > -1 && this.raise(state.start, "Duplicate regular expression flag"), flag === "u" && (u = !0), flag === "v" && (v = !0);
			}
			this.options.ecmaVersion >= 15 && u && v && this.raise(state.start, "Invalid regular expression flag");
		};
		function hasProp(obj) {
			for (var _ in obj) return !0;
			return !1;
		}
		pp$1.validateRegExpPattern = function(state) {
			this.regexp_pattern(state), !state.switchN && this.options.ecmaVersion >= 9 && hasProp(state.groupNames) && (state.switchN = !0, this.regexp_pattern(state));
		}, pp$1.regexp_pattern = function(state) {
			state.pos = 0, state.lastIntValue = 0, state.lastStringValue = "", state.lastAssertionIsQuantifiable = !1, state.numCapturingParens = 0, state.maxBackReference = 0, state.groupNames = Object.create(null), state.backReferenceNames.length = 0, state.branchID = null, this.regexp_disjunction(state), state.pos !== state.source.length && (state.eat(41) && state.raise("Unmatched ')'"), (state.eat(93) || state.eat(125)) && state.raise("Lone quantifier brackets")), state.maxBackReference > state.numCapturingParens && state.raise("Invalid escape");
			for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
				var name = list[i];
				state.groupNames[name] || state.raise("Invalid named capture referenced");
			}
		}, pp$1.regexp_disjunction = function(state) {
			var trackDisjunction = this.options.ecmaVersion >= 16;
			for (trackDisjunction && (state.branchID = new BranchID(state.branchID, null)), this.regexp_alternative(state); state.eat(124);) trackDisjunction && (state.branchID = state.branchID.sibling()), this.regexp_alternative(state);
			trackDisjunction && (state.branchID = state.branchID.parent), this.regexp_eatQuantifier(state, !0) && state.raise("Nothing to repeat"), state.eat(123) && state.raise("Lone quantifier brackets");
		}, pp$1.regexp_alternative = function(state) {
			for (; state.pos < state.source.length && this.regexp_eatTerm(state););
		}, pp$1.regexp_eatTerm = function(state) {
			return this.regexp_eatAssertion(state) ? (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state) && state.switchU && state.raise("Invalid quantifier"), !0) : (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) ? (this.regexp_eatQuantifier(state), !0) : !1;
		}, pp$1.regexp_eatAssertion = function(state) {
			var start = state.pos;
			if (state.lastAssertionIsQuantifiable = !1, state.eat(94) || state.eat(36)) return !0;
			if (state.eat(92)) {
				if (state.eat(66) || state.eat(98)) return !0;
				state.pos = start;
			}
			if (state.eat(40) && state.eat(63)) {
				var lookbehind = !1;
				if (this.options.ecmaVersion >= 9 && (lookbehind = state.eat(60)), state.eat(61) || state.eat(33)) return this.regexp_disjunction(state), state.eat(41) || state.raise("Unterminated group"), state.lastAssertionIsQuantifiable = !lookbehind, !0;
			}
			return state.pos = start, !1;
		}, pp$1.regexp_eatQuantifier = function(state, noError) {
			return noError === void 0 && (noError = !1), this.regexp_eatQuantifierPrefix(state, noError) ? (state.eat(63), !0) : !1;
		}, pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
			return state.eat(42) || state.eat(43) || state.eat(63) || this.regexp_eatBracedQuantifier(state, noError);
		}, pp$1.regexp_eatBracedQuantifier = function(state, noError) {
			var start = state.pos;
			if (state.eat(123)) {
				var min = 0, max = -1;
				if (this.regexp_eatDecimalDigits(state) && (min = state.lastIntValue, state.eat(44) && this.regexp_eatDecimalDigits(state) && (max = state.lastIntValue), state.eat(125))) return max !== -1 && max < min && !noError && state.raise("numbers out of order in {} quantifier"), !0;
				state.switchU && !noError && state.raise("Incomplete quantifier"), state.pos = start;
			}
			return !1;
		}, pp$1.regexp_eatAtom = function(state) {
			return this.regexp_eatPatternCharacters(state) || state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
		}, pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
			var start = state.pos;
			if (state.eat(92)) {
				if (this.regexp_eatAtomEscape(state)) return !0;
				state.pos = start;
			}
			return !1;
		}, pp$1.regexp_eatUncapturingGroup = function(state) {
			var start = state.pos;
			if (state.eat(40)) {
				if (state.eat(63)) {
					if (this.options.ecmaVersion >= 16) {
						var addModifiers = this.regexp_eatModifiers(state), hasHyphen = state.eat(45);
						if (addModifiers || hasHyphen) {
							for (var i = 0; i < addModifiers.length; i++) {
								var modifier = addModifiers.charAt(i);
								addModifiers.indexOf(modifier, i + 1) > -1 && state.raise("Duplicate regular expression modifiers");
							}
							if (hasHyphen) {
								var removeModifiers = this.regexp_eatModifiers(state);
								!addModifiers && !removeModifiers && state.current() === 58 && state.raise("Invalid regular expression modifiers");
								for (var i$1 = 0; i$1 < removeModifiers.length; i$1++) {
									var modifier$1 = removeModifiers.charAt(i$1);
									(removeModifiers.indexOf(modifier$1, i$1 + 1) > -1 || addModifiers.indexOf(modifier$1) > -1) && state.raise("Duplicate regular expression modifiers");
								}
							}
						}
					}
					if (state.eat(58)) {
						if (this.regexp_disjunction(state), state.eat(41)) return !0;
						state.raise("Unterminated group");
					}
				}
				state.pos = start;
			}
			return !1;
		}, pp$1.regexp_eatCapturingGroup = function(state) {
			if (state.eat(40)) {
				if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(state) : state.current() === 63 && state.raise("Invalid group"), this.regexp_disjunction(state), state.eat(41)) return state.numCapturingParens += 1, !0;
				state.raise("Unterminated group");
			}
			return !1;
		}, pp$1.regexp_eatModifiers = function(state) {
			for (var modifiers = "", ch = 0; (ch = state.current()) !== -1 && isRegularExpressionModifier(ch);) modifiers += codePointToString(ch), state.advance();
			return modifiers;
		};
		function isRegularExpressionModifier(ch) {
			return ch === 105 || ch === 109 || ch === 115;
		}
		pp$1.regexp_eatExtendedAtom = function(state) {
			return state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
		}, pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
			return this.regexp_eatBracedQuantifier(state, !0) && state.raise("Nothing to repeat"), !1;
		}, pp$1.regexp_eatSyntaxCharacter = function(state) {
			var ch = state.current();
			return isSyntaxCharacter(ch) ? (state.lastIntValue = ch, state.advance(), !0) : !1;
		};
		function isSyntaxCharacter(ch) {
			return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
		}
		pp$1.regexp_eatPatternCharacters = function(state) {
			for (var start = state.pos, ch = 0; (ch = state.current()) !== -1 && !isSyntaxCharacter(ch);) state.advance();
			return state.pos !== start;
		}, pp$1.regexp_eatExtendedPatternCharacter = function(state) {
			var ch = state.current();
			return ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124 ? (state.advance(), !0) : !1;
		}, pp$1.regexp_groupSpecifier = function(state) {
			if (state.eat(63)) {
				this.regexp_eatGroupName(state) || state.raise("Invalid group");
				var trackDisjunction = this.options.ecmaVersion >= 16, known = state.groupNames[state.lastStringValue];
				if (known) if (trackDisjunction) for (var i = 0, list = known; i < list.length; i += 1) list[i].separatedFrom(state.branchID) || state.raise("Duplicate capture group name");
				else state.raise("Duplicate capture group name");
				trackDisjunction ? (known || (state.groupNames[state.lastStringValue] = [])).push(state.branchID) : state.groupNames[state.lastStringValue] = !0;
			}
		}, pp$1.regexp_eatGroupName = function(state) {
			if (state.lastStringValue = "", state.eat(60)) {
				if (this.regexp_eatRegExpIdentifierName(state) && state.eat(62)) return !0;
				state.raise("Invalid capture group name");
			}
			return !1;
		}, pp$1.regexp_eatRegExpIdentifierName = function(state) {
			if (state.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(state)) {
				for (state.lastStringValue += codePointToString(state.lastIntValue); this.regexp_eatRegExpIdentifierPart(state);) state.lastStringValue += codePointToString(state.lastIntValue);
				return !0;
			}
			return !1;
		}, pp$1.regexp_eatRegExpIdentifierStart = function(state) {
			var start = state.pos, forceU = this.options.ecmaVersion >= 11, ch = state.current(forceU);
			return state.advance(forceU), ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU) && (ch = state.lastIntValue), isRegExpIdentifierStart(ch) ? (state.lastIntValue = ch, !0) : (state.pos = start, !1);
		};
		function isRegExpIdentifierStart(ch) {
			return isIdentifierStart(ch, !0) || ch === 36 || ch === 95;
		}
		pp$1.regexp_eatRegExpIdentifierPart = function(state) {
			var start = state.pos, forceU = this.options.ecmaVersion >= 11, ch = state.current(forceU);
			return state.advance(forceU), ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU) && (ch = state.lastIntValue), isRegExpIdentifierPart(ch) ? (state.lastIntValue = ch, !0) : (state.pos = start, !1);
		};
		function isRegExpIdentifierPart(ch) {
			return isIdentifierChar(ch, !0) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
		}
		pp$1.regexp_eatAtomEscape = function(state) {
			return this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state) ? !0 : (state.switchU && (state.current() === 99 && state.raise("Invalid unicode escape"), state.raise("Invalid escape")), !1);
		}, pp$1.regexp_eatBackReference = function(state) {
			var start = state.pos;
			if (this.regexp_eatDecimalEscape(state)) {
				var n = state.lastIntValue;
				if (state.switchU) return n > state.maxBackReference && (state.maxBackReference = n), !0;
				if (n <= state.numCapturingParens) return !0;
				state.pos = start;
			}
			return !1;
		}, pp$1.regexp_eatKGroupName = function(state) {
			if (state.eat(107)) {
				if (this.regexp_eatGroupName(state)) return state.backReferenceNames.push(state.lastStringValue), !0;
				state.raise("Invalid named reference");
			}
			return !1;
		}, pp$1.regexp_eatCharacterEscape = function(state) {
			return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, !1) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
		}, pp$1.regexp_eatCControlLetter = function(state) {
			var start = state.pos;
			if (state.eat(99)) {
				if (this.regexp_eatControlLetter(state)) return !0;
				state.pos = start;
			}
			return !1;
		}, pp$1.regexp_eatZero = function(state) {
			return state.current() === 48 && !isDecimalDigit(state.lookahead()) ? (state.lastIntValue = 0, state.advance(), !0) : !1;
		}, pp$1.regexp_eatControlEscape = function(state) {
			var ch = state.current();
			return ch === 116 ? (state.lastIntValue = 9, state.advance(), !0) : ch === 110 ? (state.lastIntValue = 10, state.advance(), !0) : ch === 118 ? (state.lastIntValue = 11, state.advance(), !0) : ch === 102 ? (state.lastIntValue = 12, state.advance(), !0) : ch === 114 ? (state.lastIntValue = 13, state.advance(), !0) : !1;
		}, pp$1.regexp_eatControlLetter = function(state) {
			var ch = state.current();
			return isControlLetter(ch) ? (state.lastIntValue = ch % 32, state.advance(), !0) : !1;
		};
		function isControlLetter(ch) {
			return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
		}
		pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
			forceU === void 0 && (forceU = !1);
			var start = state.pos, switchU = forceU || state.switchU;
			if (state.eat(117)) {
				if (this.regexp_eatFixedHexDigits(state, 4)) {
					var lead = state.lastIntValue;
					if (switchU && lead >= 55296 && lead <= 56319) {
						var leadSurrogateEnd = state.pos;
						if (state.eat(92) && state.eat(117) && this.regexp_eatFixedHexDigits(state, 4)) {
							var trail = state.lastIntValue;
							if (trail >= 56320 && trail <= 57343) return state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536, !0;
						}
						state.pos = leadSurrogateEnd, state.lastIntValue = lead;
					}
					return !0;
				}
				if (switchU && state.eat(123) && this.regexp_eatHexDigits(state) && state.eat(125) && isValidUnicode(state.lastIntValue)) return !0;
				switchU && state.raise("Invalid unicode escape"), state.pos = start;
			}
			return !1;
		};
		function isValidUnicode(ch) {
			return ch >= 0 && ch <= 1114111;
		}
		pp$1.regexp_eatIdentityEscape = function(state) {
			if (state.switchU) return this.regexp_eatSyntaxCharacter(state) ? !0 : state.eat(47) ? (state.lastIntValue = 47, !0) : !1;
			var ch = state.current();
			return ch !== 99 && (!state.switchN || ch !== 107) ? (state.lastIntValue = ch, state.advance(), !0) : !1;
		}, pp$1.regexp_eatDecimalEscape = function(state) {
			state.lastIntValue = 0;
			var ch = state.current();
			if (ch >= 49 && ch <= 57) {
				do
					state.lastIntValue = 10 * state.lastIntValue + (ch - 48), state.advance();
				while ((ch = state.current()) >= 48 && ch <= 57);
				return !0;
			}
			return !1;
		};
		var CharSetNone = 0, CharSetOk = 1, CharSetString = 2;
		pp$1.regexp_eatCharacterClassEscape = function(state) {
			var ch = state.current();
			if (isCharacterClassEscape(ch)) return state.lastIntValue = -1, state.advance(), CharSetOk;
			var negate = !1;
			if (state.switchU && this.options.ecmaVersion >= 9 && ((negate = ch === 80) || ch === 112)) {
				state.lastIntValue = -1, state.advance();
				var result;
				if (state.eat(123) && (result = this.regexp_eatUnicodePropertyValueExpression(state)) && state.eat(125)) return negate && result === CharSetString && state.raise("Invalid property name"), result;
				state.raise("Invalid property name");
			}
			return CharSetNone;
		};
		function isCharacterClassEscape(ch) {
			return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
		}
		pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
			var start = state.pos;
			if (this.regexp_eatUnicodePropertyName(state) && state.eat(61)) {
				var name = state.lastStringValue;
				if (this.regexp_eatUnicodePropertyValue(state)) {
					var value = state.lastStringValue;
					return this.regexp_validateUnicodePropertyNameAndValue(state, name, value), CharSetOk;
				}
			}
			if (state.pos = start, this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
				var nameOrValue = state.lastStringValue;
				return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
			}
			return CharSetNone;
		}, pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
			hasOwn(state.unicodeProperties.nonBinary, name) || state.raise("Invalid property name"), state.unicodeProperties.nonBinary[name].test(value) || state.raise("Invalid property value");
		}, pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
			if (state.unicodeProperties.binary.test(nameOrValue)) return CharSetOk;
			if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue)) return CharSetString;
			state.raise("Invalid property name");
		}, pp$1.regexp_eatUnicodePropertyName = function(state) {
			var ch = 0;
			for (state.lastStringValue = ""; isUnicodePropertyNameCharacter(ch = state.current());) state.lastStringValue += codePointToString(ch), state.advance();
			return state.lastStringValue !== "";
		};
		function isUnicodePropertyNameCharacter(ch) {
			return isControlLetter(ch) || ch === 95;
		}
		pp$1.regexp_eatUnicodePropertyValue = function(state) {
			var ch = 0;
			for (state.lastStringValue = ""; isUnicodePropertyValueCharacter(ch = state.current());) state.lastStringValue += codePointToString(ch), state.advance();
			return state.lastStringValue !== "";
		};
		function isUnicodePropertyValueCharacter(ch) {
			return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
		}
		pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
			return this.regexp_eatUnicodePropertyValue(state);
		}, pp$1.regexp_eatCharacterClass = function(state) {
			if (state.eat(91)) {
				var negate = state.eat(94), result = this.regexp_classContents(state);
				return state.eat(93) || state.raise("Unterminated character class"), negate && result === CharSetString && state.raise("Negated character class may contain strings"), !0;
			}
			return !1;
		}, pp$1.regexp_classContents = function(state) {
			return state.current() === 93 ? CharSetOk : state.switchV ? this.regexp_classSetExpression(state) : (this.regexp_nonEmptyClassRanges(state), CharSetOk);
		}, pp$1.regexp_nonEmptyClassRanges = function(state) {
			for (; this.regexp_eatClassAtom(state);) {
				var left = state.lastIntValue;
				if (state.eat(45) && this.regexp_eatClassAtom(state)) {
					var right = state.lastIntValue;
					state.switchU && (left === -1 || right === -1) && state.raise("Invalid character class"), left !== -1 && right !== -1 && left > right && state.raise("Range out of order in character class");
				}
			}
		}, pp$1.regexp_eatClassAtom = function(state) {
			var start = state.pos;
			if (state.eat(92)) {
				if (this.regexp_eatClassEscape(state)) return !0;
				if (state.switchU) {
					var ch$1 = state.current();
					(ch$1 === 99 || isOctalDigit(ch$1)) && state.raise("Invalid class escape"), state.raise("Invalid escape");
				}
				state.pos = start;
			}
			var ch = state.current();
			return ch === 93 ? !1 : (state.lastIntValue = ch, state.advance(), !0);
		}, pp$1.regexp_eatClassEscape = function(state) {
			var start = state.pos;
			if (state.eat(98)) return state.lastIntValue = 8, !0;
			if (state.switchU && state.eat(45)) return state.lastIntValue = 45, !0;
			if (!state.switchU && state.eat(99)) {
				if (this.regexp_eatClassControlLetter(state)) return !0;
				state.pos = start;
			}
			return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
		}, pp$1.regexp_classSetExpression = function(state) {
			var result = CharSetOk, subResult;
			if (!this.regexp_eatClassSetRange(state)) if (subResult = this.regexp_eatClassSetOperand(state)) {
				subResult === CharSetString && (result = CharSetString);
				for (var start = state.pos; state.eatChars([38, 38]);) {
					if (state.current() !== 38 && (subResult = this.regexp_eatClassSetOperand(state))) {
						subResult !== CharSetString && (result = CharSetOk);
						continue;
					}
					state.raise("Invalid character in character class");
				}
				if (start !== state.pos) return result;
				for (; state.eatChars([45, 45]);) this.regexp_eatClassSetOperand(state) || state.raise("Invalid character in character class");
				if (start !== state.pos) return result;
			} else state.raise("Invalid character in character class");
			for (;;) if (!this.regexp_eatClassSetRange(state)) {
				if (subResult = this.regexp_eatClassSetOperand(state), !subResult) return result;
				subResult === CharSetString && (result = CharSetString);
			}
		}, pp$1.regexp_eatClassSetRange = function(state) {
			var start = state.pos;
			if (this.regexp_eatClassSetCharacter(state)) {
				var left = state.lastIntValue;
				if (state.eat(45) && this.regexp_eatClassSetCharacter(state)) {
					var right = state.lastIntValue;
					return left !== -1 && right !== -1 && left > right && state.raise("Range out of order in character class"), !0;
				}
				state.pos = start;
			}
			return !1;
		}, pp$1.regexp_eatClassSetOperand = function(state) {
			return this.regexp_eatClassSetCharacter(state) ? CharSetOk : this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state);
		}, pp$1.regexp_eatNestedClass = function(state) {
			var start = state.pos;
			if (state.eat(91)) {
				var negate = state.eat(94), result = this.regexp_classContents(state);
				if (state.eat(93)) return negate && result === CharSetString && state.raise("Negated character class may contain strings"), result;
				state.pos = start;
			}
			if (state.eat(92)) {
				var result$1 = this.regexp_eatCharacterClassEscape(state);
				if (result$1) return result$1;
				state.pos = start;
			}
			return null;
		}, pp$1.regexp_eatClassStringDisjunction = function(state) {
			var start = state.pos;
			if (state.eatChars([92, 113])) {
				if (state.eat(123)) {
					var result = this.regexp_classStringDisjunctionContents(state);
					if (state.eat(125)) return result;
				} else state.raise("Invalid escape");
				state.pos = start;
			}
			return null;
		}, pp$1.regexp_classStringDisjunctionContents = function(state) {
			for (var result = this.regexp_classString(state); state.eat(124);) this.regexp_classString(state) === CharSetString && (result = CharSetString);
			return result;
		}, pp$1.regexp_classString = function(state) {
			for (var count = 0; this.regexp_eatClassSetCharacter(state);) count++;
			return count === 1 ? CharSetOk : CharSetString;
		}, pp$1.regexp_eatClassSetCharacter = function(state) {
			var start = state.pos;
			if (state.eat(92)) return this.regexp_eatCharacterEscape(state) || this.regexp_eatClassSetReservedPunctuator(state) ? !0 : state.eat(98) ? (state.lastIntValue = 8, !0) : (state.pos = start, !1);
			var ch = state.current();
			return ch < 0 || ch === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter(ch) || isClassSetSyntaxCharacter(ch) ? !1 : (state.advance(), state.lastIntValue = ch, !0);
		};
		function isClassSetReservedDoublePunctuatorCharacter(ch) {
			return ch === 33 || ch >= 35 && ch <= 38 || ch >= 42 && ch <= 44 || ch === 46 || ch >= 58 && ch <= 64 || ch === 94 || ch === 96 || ch === 126;
		}
		function isClassSetSyntaxCharacter(ch) {
			return ch === 40 || ch === 41 || ch === 45 || ch === 47 || ch >= 91 && ch <= 93 || ch >= 123 && ch <= 125;
		}
		pp$1.regexp_eatClassSetReservedPunctuator = function(state) {
			var ch = state.current();
			return isClassSetReservedPunctuator(ch) ? (state.lastIntValue = ch, state.advance(), !0) : !1;
		};
		function isClassSetReservedPunctuator(ch) {
			return ch === 33 || ch === 35 || ch === 37 || ch === 38 || ch === 44 || ch === 45 || ch >= 58 && ch <= 62 || ch === 64 || ch === 96 || ch === 126;
		}
		pp$1.regexp_eatClassControlLetter = function(state) {
			var ch = state.current();
			return isDecimalDigit(ch) || ch === 95 ? (state.lastIntValue = ch % 32, state.advance(), !0) : !1;
		}, pp$1.regexp_eatHexEscapeSequence = function(state) {
			var start = state.pos;
			if (state.eat(120)) {
				if (this.regexp_eatFixedHexDigits(state, 2)) return !0;
				state.switchU && state.raise("Invalid escape"), state.pos = start;
			}
			return !1;
		}, pp$1.regexp_eatDecimalDigits = function(state) {
			var start = state.pos, ch = 0;
			for (state.lastIntValue = 0; isDecimalDigit(ch = state.current());) state.lastIntValue = 10 * state.lastIntValue + (ch - 48), state.advance();
			return state.pos !== start;
		};
		function isDecimalDigit(ch) {
			return ch >= 48 && ch <= 57;
		}
		pp$1.regexp_eatHexDigits = function(state) {
			var start = state.pos, ch = 0;
			for (state.lastIntValue = 0; isHexDigit(ch = state.current());) state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch), state.advance();
			return state.pos !== start;
		};
		function isHexDigit(ch) {
			return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
		}
		function hexToInt(ch) {
			return ch >= 65 && ch <= 70 ? 10 + (ch - 65) : ch >= 97 && ch <= 102 ? 10 + (ch - 97) : ch - 48;
		}
		pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
			if (this.regexp_eatOctalDigit(state)) {
				var n1 = state.lastIntValue;
				if (this.regexp_eatOctalDigit(state)) {
					var n2 = state.lastIntValue;
					n1 <= 3 && this.regexp_eatOctalDigit(state) ? state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue : state.lastIntValue = n1 * 8 + n2;
				} else state.lastIntValue = n1;
				return !0;
			}
			return !1;
		}, pp$1.regexp_eatOctalDigit = function(state) {
			var ch = state.current();
			return isOctalDigit(ch) ? (state.lastIntValue = ch - 48, state.advance(), !0) : (state.lastIntValue = 0, !1);
		};
		function isOctalDigit(ch) {
			return ch >= 48 && ch <= 55;
		}
		pp$1.regexp_eatFixedHexDigits = function(state, length) {
			var start = state.pos;
			state.lastIntValue = 0;
			for (var i = 0; i < length; ++i) {
				var ch = state.current();
				if (!isHexDigit(ch)) return state.pos = start, !1;
				state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch), state.advance();
			}
			return !0;
		};
		var Token = function Token(p) {
			this.type = p.type, this.value = p.value, this.start = p.start, this.end = p.end, p.options.locations && (this.loc = new SourceLocation(p, p.startLoc, p.endLoc)), p.options.ranges && (this.range = [p.start, p.end]);
		}, pp = Parser.prototype;
		pp.next = function(ignoreEscapeSequenceInKeyword) {
			!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Token(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
		}, pp.getToken = function() {
			return this.next(), new Token(this);
		}, typeof Symbol < "u" && (pp[Symbol.iterator] = function() {
			var this$1$1 = this;
			return { next: function() {
				var token = this$1$1.getToken();
				return {
					done: token.type === types$1.eof,
					value: token
				};
			} };
		}), pp.nextToken = function() {
			var curContext = this.curContext();
			if ((!curContext || !curContext.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length) return this.finishToken(types$1.eof);
			if (curContext.override) return curContext.override(this);
			this.readToken(this.fullCharCodeAtPos());
		}, pp.readToken = function(code) {
			return isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 ? this.readWord() : this.getTokenFromCode(code);
		}, pp.fullCharCodeAtPos = function() {
			var code = this.input.charCodeAt(this.pos);
			if (code <= 55295 || code >= 56320) return code;
			var next = this.input.charCodeAt(this.pos + 1);
			return next <= 56319 || next >= 57344 ? code : (code << 10) + next - 56613888;
		}, pp.skipBlockComment = function() {
			var startLoc = this.options.onComment && this.curPosition(), start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
			if (end === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = end + 2, this.options.locations) for (var nextBreak = void 0, pos = start; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1;) ++this.curLine, pos = this.lineStart = nextBreak;
			this.options.onComment && this.options.onComment(!0, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
		}, pp.skipLineComment = function(startSkip) {
			for (var start = this.pos, startLoc = this.options.onComment && this.curPosition(), ch = this.input.charCodeAt(this.pos += startSkip); this.pos < this.input.length && !isNewLine(ch);) ch = this.input.charCodeAt(++this.pos);
			this.options.onComment && this.options.onComment(!1, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
		}, pp.skipSpace = function() {
			loop: for (; this.pos < this.input.length;) {
				var ch = this.input.charCodeAt(this.pos);
				switch (ch) {
					case 32:
					case 160:
						++this.pos;
						break;
					case 13: this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
					case 10:
					case 8232:
					case 8233:
						++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
						break;
					case 47:
						switch (this.input.charCodeAt(this.pos + 1)) {
							case 42:
								this.skipBlockComment();
								break;
							case 47:
								this.skipLineComment(2);
								break;
							default: break loop;
						}
						break;
					default: if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) ++this.pos;
					else break loop;
				}
			}
		}, pp.finishToken = function(type, val) {
			this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
			var prevType = this.type;
			this.type = type, this.value = val, this.updateContext(prevType);
		}, pp.readToken_dot = function() {
			var next = this.input.charCodeAt(this.pos + 1);
			if (next >= 48 && next <= 57) return this.readNumber(!0);
			var next2 = this.input.charCodeAt(this.pos + 2);
			return this.options.ecmaVersion >= 6 && next === 46 && next2 === 46 ? (this.pos += 3, this.finishToken(types$1.ellipsis)) : (++this.pos, this.finishToken(types$1.dot));
		}, pp.readToken_slash = function() {
			var next = this.input.charCodeAt(this.pos + 1);
			return this.exprAllowed ? (++this.pos, this.readRegexp()) : next === 61 ? this.finishOp(types$1.assign, 2) : this.finishOp(types$1.slash, 1);
		}, pp.readToken_mult_modulo_exp = function(code) {
			var next = this.input.charCodeAt(this.pos + 1), size = 1, tokentype = code === 42 ? types$1.star : types$1.modulo;
			return this.options.ecmaVersion >= 7 && code === 42 && next === 42 && (++size, tokentype = types$1.starstar, next = this.input.charCodeAt(this.pos + 2)), next === 61 ? this.finishOp(types$1.assign, size + 1) : this.finishOp(tokentype, size);
		}, pp.readToken_pipe_amp = function(code) {
			var next = this.input.charCodeAt(this.pos + 1);
			return next === code ? this.options.ecmaVersion >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(types$1.assign, 3) : this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2) : next === 61 ? this.finishOp(types$1.assign, 2) : this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
		}, pp.readToken_caret = function() {
			return this.input.charCodeAt(this.pos + 1) === 61 ? this.finishOp(types$1.assign, 2) : this.finishOp(types$1.bitwiseXOR, 1);
		}, pp.readToken_plus_min = function(code) {
			var next = this.input.charCodeAt(this.pos + 1);
			return next === code ? next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(types$1.incDec, 2) : next === 61 ? this.finishOp(types$1.assign, 2) : this.finishOp(types$1.plusMin, 1);
		}, pp.readToken_lt_gt = function(code) {
			var next = this.input.charCodeAt(this.pos + 1), size = 1;
			return next === code ? (size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + size) === 61 ? this.finishOp(types$1.assign, size + 1) : this.finishOp(types$1.bitShift, size)) : next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (next === 61 && (size = 2), this.finishOp(types$1.relational, size));
		}, pp.readToken_eq_excl = function(code) {
			var next = this.input.charCodeAt(this.pos + 1);
			return next === 61 ? this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : code === 61 && next === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(types$1.arrow)) : this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1);
		}, pp.readToken_question = function() {
			var ecmaVersion = this.options.ecmaVersion;
			if (ecmaVersion >= 11) {
				var next = this.input.charCodeAt(this.pos + 1);
				if (next === 46) {
					var next2 = this.input.charCodeAt(this.pos + 2);
					if (next2 < 48 || next2 > 57) return this.finishOp(types$1.questionDot, 2);
				}
				if (next === 63) return ecmaVersion >= 12 && this.input.charCodeAt(this.pos + 2) === 61 ? this.finishOp(types$1.assign, 3) : this.finishOp(types$1.coalesce, 2);
			}
			return this.finishOp(types$1.question, 1);
		}, pp.readToken_numberSign = function() {
			var ecmaVersion = this.options.ecmaVersion, code = 35;
			if (ecmaVersion >= 13 && (++this.pos, code = this.fullCharCodeAtPos(), isIdentifierStart(code, !0) || code === 92)) return this.finishToken(types$1.privateId, this.readWord1());
			this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
		}, pp.getTokenFromCode = function(code) {
			switch (code) {
				case 46: return this.readToken_dot();
				case 40: return ++this.pos, this.finishToken(types$1.parenL);
				case 41: return ++this.pos, this.finishToken(types$1.parenR);
				case 59: return ++this.pos, this.finishToken(types$1.semi);
				case 44: return ++this.pos, this.finishToken(types$1.comma);
				case 91: return ++this.pos, this.finishToken(types$1.bracketL);
				case 93: return ++this.pos, this.finishToken(types$1.bracketR);
				case 123: return ++this.pos, this.finishToken(types$1.braceL);
				case 125: return ++this.pos, this.finishToken(types$1.braceR);
				case 58: return ++this.pos, this.finishToken(types$1.colon);
				case 96:
					if (this.options.ecmaVersion < 6) break;
					return ++this.pos, this.finishToken(types$1.backQuote);
				case 48:
					var next = this.input.charCodeAt(this.pos + 1);
					if (next === 120 || next === 88) return this.readRadixNumber(16);
					if (this.options.ecmaVersion >= 6) {
						if (next === 111 || next === 79) return this.readRadixNumber(8);
						if (next === 98 || next === 66) return this.readRadixNumber(2);
					}
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57: return this.readNumber(!1);
				case 34:
				case 39: return this.readString(code);
				case 47: return this.readToken_slash();
				case 37:
				case 42: return this.readToken_mult_modulo_exp(code);
				case 124:
				case 38: return this.readToken_pipe_amp(code);
				case 94: return this.readToken_caret();
				case 43:
				case 45: return this.readToken_plus_min(code);
				case 60:
				case 62: return this.readToken_lt_gt(code);
				case 61:
				case 33: return this.readToken_eq_excl(code);
				case 63: return this.readToken_question();
				case 126: return this.finishOp(types$1.prefix, 1);
				case 35: return this.readToken_numberSign();
			}
			this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
		}, pp.finishOp = function(type, size) {
			var str = this.input.slice(this.pos, this.pos + size);
			return this.pos += size, this.finishToken(type, str);
		}, pp.readRegexp = function() {
			for (var escaped, inClass, start = this.pos;;) {
				this.pos >= this.input.length && this.raise(start, "Unterminated regular expression");
				var ch = this.input.charAt(this.pos);
				if (lineBreak.test(ch) && this.raise(start, "Unterminated regular expression"), escaped) escaped = !1;
				else {
					if (ch === "[") inClass = !0;
					else if (ch === "]" && inClass) inClass = !1;
					else if (ch === "/" && !inClass) break;
					escaped = ch === "\\";
				}
				++this.pos;
			}
			var pattern = this.input.slice(start, this.pos);
			++this.pos;
			var flagsStart = this.pos, flags = this.readWord1();
			this.containsEsc && this.unexpected(flagsStart);
			var state = this.regexpState ||= new RegExpValidationState(this);
			state.reset(start, pattern, flags), this.validateRegExpFlags(state), this.validateRegExpPattern(state);
			var value = null;
			try {
				value = new RegExp(pattern, flags);
			} catch {}
			return this.finishToken(types$1.regexp, {
				pattern,
				flags,
				value
			});
		}, pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
			for (var allowSeparators = this.options.ecmaVersion >= 12 && len === void 0, isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48, start = this.pos, total = 0, lastCode = 0, i = 0, e = len ?? Infinity; i < e; ++i, ++this.pos) {
				var code = this.input.charCodeAt(this.pos), val = void 0;
				if (allowSeparators && code === 95) {
					isLegacyOctalNumericLiteral && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), lastCode === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), i === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), lastCode = code;
					continue;
				}
				if (val = code >= 97 ? code - 97 + 10 : code >= 65 ? code - 65 + 10 : code >= 48 && code <= 57 ? code - 48 : Infinity, val >= radix) break;
				lastCode = code, total = total * radix + val;
			}
			return allowSeparators && lastCode === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === start || len != null && this.pos - start !== len ? null : total;
		};
		function stringToNumber(str, isLegacyOctalNumericLiteral) {
			return isLegacyOctalNumericLiteral ? parseInt(str, 8) : parseFloat(str.replace(/_/g, ""));
		}
		function stringToBigInt(str) {
			return typeof BigInt == "function" ? BigInt(str.replace(/_/g, "")) : null;
		}
		pp.readRadixNumber = function(radix) {
			var start = this.pos;
			this.pos += 2;
			var val = this.readInt(radix);
			return val ?? this.raise(this.start + 2, "Expected number in radix " + radix), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (val = stringToBigInt(this.input.slice(start, this.pos)), ++this.pos) : isIdentifierStart(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(types$1.num, val);
		}, pp.readNumber = function(startsWithDot) {
			var start = this.pos;
			!startsWithDot && this.readInt(10, void 0, !0) === null && this.raise(start, "Invalid number");
			var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
			octal && this.strict && this.raise(start, "Invalid number");
			var next = this.input.charCodeAt(this.pos);
			if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
				var val$1 = stringToBigInt(this.input.slice(start, this.pos));
				return ++this.pos, isIdentifierStart(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(types$1.num, val$1);
			}
			octal && /[89]/.test(this.input.slice(start, this.pos)) && (octal = !1), next === 46 && !octal && (++this.pos, this.readInt(10), next = this.input.charCodeAt(this.pos)), (next === 69 || next === 101) && !octal && (next = this.input.charCodeAt(++this.pos), (next === 43 || next === 45) && ++this.pos, this.readInt(10) === null && this.raise(start, "Invalid number")), isIdentifierStart(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
			var val = stringToNumber(this.input.slice(start, this.pos), octal);
			return this.finishToken(types$1.num, val);
		}, pp.readCodePoint = function() {
			var ch = this.input.charCodeAt(this.pos), code;
			if (ch === 123) {
				this.options.ecmaVersion < 6 && this.unexpected();
				var codePos = ++this.pos;
				code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, code > 1114111 && this.invalidStringToken(codePos, "Code point out of bounds");
			} else code = this.readHexChar(4);
			return code;
		}, pp.readString = function(quote) {
			for (var out = "", chunkStart = ++this.pos;;) {
				this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
				var ch = this.input.charCodeAt(this.pos);
				if (ch === quote) break;
				ch === 92 ? (out += this.input.slice(chunkStart, this.pos), out += this.readEscapedChar(!1), chunkStart = this.pos) : ch === 8232 || ch === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (isNewLine(ch) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
			}
			return out += this.input.slice(chunkStart, this.pos++), this.finishToken(types$1.string, out);
		};
		var INVALID_TEMPLATE_ESCAPE_ERROR = {};
		pp.tryReadTemplateToken = function() {
			this.inTemplateElement = !0;
			try {
				this.readTmplToken();
			} catch (err) {
				if (err === INVALID_TEMPLATE_ESCAPE_ERROR) this.readInvalidTemplateToken();
				else throw err;
			}
			this.inTemplateElement = !1;
		}, pp.invalidStringToken = function(position, message) {
			if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw INVALID_TEMPLATE_ESCAPE_ERROR;
			this.raise(position, message);
		}, pp.readTmplToken = function() {
			for (var out = "", chunkStart = this.pos;;) {
				this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
				var ch = this.input.charCodeAt(this.pos);
				if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) return this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate) ? ch === 36 ? (this.pos += 2, this.finishToken(types$1.dollarBraceL)) : (++this.pos, this.finishToken(types$1.backQuote)) : (out += this.input.slice(chunkStart, this.pos), this.finishToken(types$1.template, out));
				if (ch === 92) out += this.input.slice(chunkStart, this.pos), out += this.readEscapedChar(!0), chunkStart = this.pos;
				else if (isNewLine(ch)) {
					switch (out += this.input.slice(chunkStart, this.pos), ++this.pos, ch) {
						case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
						case 10:
							out += "\n";
							break;
						default:
							out += String.fromCharCode(ch);
							break;
					}
					this.options.locations && (++this.curLine, this.lineStart = this.pos), chunkStart = this.pos;
				} else ++this.pos;
			}
		}, pp.readInvalidTemplateToken = function() {
			for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
				case "\\":
					++this.pos;
					break;
				case "$": if (this.input[this.pos + 1] !== "{") break;
				case "`": return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
				case "\r": this.input[this.pos + 1] === "\n" && ++this.pos;
				case "\n":
				case "\u2028":
				case "\u2029":
					++this.curLine, this.lineStart = this.pos + 1;
					break;
			}
			this.raise(this.start, "Unterminated template");
		}, pp.readEscapedChar = function(inTemplate) {
			var ch = this.input.charCodeAt(++this.pos);
			switch (++this.pos, ch) {
				case 110: return "\n";
				case 114: return "\r";
				case 120: return String.fromCharCode(this.readHexChar(2));
				case 117: return codePointToString(this.readCodePoint());
				case 116: return "	";
				case 98: return "\b";
				case 118: return "\v";
				case 102: return "\f";
				case 13: this.input.charCodeAt(this.pos) === 10 && ++this.pos;
				case 10: return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
				case 56:
				case 57: if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"), inTemplate) {
					var codePos = this.pos - 1;
					this.invalidStringToken(codePos, "Invalid escape sequence in template string");
				}
				default:
					if (ch >= 48 && ch <= 55) {
						var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], octal = parseInt(octalStr, 8);
						return octal > 255 && (octalStr = octalStr.slice(0, -1), octal = parseInt(octalStr, 8)), this.pos += octalStr.length - 1, ch = this.input.charCodeAt(this.pos), (octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate) && this.invalidStringToken(this.pos - 1 - octalStr.length, inTemplate ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(octal);
					}
					return isNewLine(ch) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(ch);
			}
		}, pp.readHexChar = function(len) {
			var codePos = this.pos, n = this.readInt(16, len);
			return n === null && this.invalidStringToken(codePos, "Bad character escape sequence"), n;
		}, pp.readWord1 = function() {
			this.containsEsc = !1;
			for (var word = "", first = !0, chunkStart = this.pos, astral = this.options.ecmaVersion >= 6; this.pos < this.input.length;) {
				var ch = this.fullCharCodeAtPos();
				if (isIdentifierChar(ch, astral)) this.pos += ch <= 65535 ? 1 : 2;
				else if (ch === 92) {
					this.containsEsc = !0, word += this.input.slice(chunkStart, this.pos);
					var escStart = this.pos;
					this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
					var esc = this.readCodePoint();
					(first ? isIdentifierStart : isIdentifierChar)(esc, astral) || this.invalidStringToken(escStart, "Invalid Unicode escape"), word += codePointToString(esc), chunkStart = this.pos;
				} else break;
				first = !1;
			}
			return word + this.input.slice(chunkStart, this.pos);
		}, pp.readWord = function() {
			var word = this.readWord1(), type = types$1.name;
			return this.keywords.test(word) && (type = keywords[word]), this.finishToken(type, word);
		};
		var version = "8.15.0";
		Parser.acorn = {
			Parser,
			version,
			defaultOptions,
			Position,
			SourceLocation,
			getLineInfo,
			Node,
			TokenType,
			tokTypes: types$1,
			keywordTypes: keywords,
			TokContext,
			tokContexts: types,
			isIdentifierChar,
			isIdentifierStart,
			Token,
			isNewLine,
			lineBreak,
			lineBreakG,
			nonASCIIwhitespace
		};
		function parse(input, options) {
			return Parser.parse(input, options);
		}
		function parseExpressionAt(input, pos, options) {
			return Parser.parseExpressionAt(input, pos, options);
		}
		function tokenizer(input, options) {
			return Parser.tokenizer(input, options);
		}
		exports$1.Node = Node, exports$1.Parser = Parser, exports$1.Position = Position, exports$1.SourceLocation = SourceLocation, exports$1.TokContext = TokContext, exports$1.Token = Token, exports$1.TokenType = TokenType, exports$1.defaultOptions = defaultOptions, exports$1.getLineInfo = getLineInfo, exports$1.isIdentifierChar = isIdentifierChar, exports$1.isIdentifierStart = isIdentifierStart, exports$1.isNewLine = isNewLine, exports$1.keywordTypes = keywords, exports$1.lineBreak = lineBreak, exports$1.lineBreakG = lineBreakG, exports$1.nonASCIIwhitespace = nonASCIIwhitespace, exports$1.parse = parse, exports$1.parseExpressionAt = parseExpressionAt, exports$1.tokContexts = types, exports$1.tokTypes = types$1, exports$1.tokenizer = tokenizer, exports$1.version = version;
	}));
})), require_xhtml = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	module.exports = {
		quot: "\"",
		amp: "&",
		apos: "'",
		lt: "<",
		gt: ">",
		nbsp: "\xA0",
		iexcl: "¡",
		cent: "¢",
		pound: "£",
		curren: "¤",
		yen: "¥",
		brvbar: "¦",
		sect: "§",
		uml: "¨",
		copy: "©",
		ordf: "ª",
		laquo: "«",
		not: "¬",
		shy: "­",
		reg: "®",
		macr: "¯",
		deg: "°",
		plusmn: "±",
		sup2: "²",
		sup3: "³",
		acute: "´",
		micro: "µ",
		para: "¶",
		middot: "·",
		cedil: "¸",
		sup1: "¹",
		ordm: "º",
		raquo: "»",
		frac14: "¼",
		frac12: "½",
		frac34: "¾",
		iquest: "¿",
		Agrave: "À",
		Aacute: "Á",
		Acirc: "Â",
		Atilde: "Ã",
		Auml: "Ä",
		Aring: "Å",
		AElig: "Æ",
		Ccedil: "Ç",
		Egrave: "È",
		Eacute: "É",
		Ecirc: "Ê",
		Euml: "Ë",
		Igrave: "Ì",
		Iacute: "Í",
		Icirc: "Î",
		Iuml: "Ï",
		ETH: "Ð",
		Ntilde: "Ñ",
		Ograve: "Ò",
		Oacute: "Ó",
		Ocirc: "Ô",
		Otilde: "Õ",
		Ouml: "Ö",
		times: "×",
		Oslash: "Ø",
		Ugrave: "Ù",
		Uacute: "Ú",
		Ucirc: "Û",
		Uuml: "Ü",
		Yacute: "Ý",
		THORN: "Þ",
		szlig: "ß",
		agrave: "à",
		aacute: "á",
		acirc: "â",
		atilde: "ã",
		auml: "ä",
		aring: "å",
		aelig: "æ",
		ccedil: "ç",
		egrave: "è",
		eacute: "é",
		ecirc: "ê",
		euml: "ë",
		igrave: "ì",
		iacute: "í",
		icirc: "î",
		iuml: "ï",
		eth: "ð",
		ntilde: "ñ",
		ograve: "ò",
		oacute: "ó",
		ocirc: "ô",
		otilde: "õ",
		ouml: "ö",
		divide: "÷",
		oslash: "ø",
		ugrave: "ù",
		uacute: "ú",
		ucirc: "û",
		uuml: "ü",
		yacute: "ý",
		thorn: "þ",
		yuml: "ÿ",
		OElig: "Œ",
		oelig: "œ",
		Scaron: "Š",
		scaron: "š",
		Yuml: "Ÿ",
		fnof: "ƒ",
		circ: "ˆ",
		tilde: "˜",
		Alpha: "Α",
		Beta: "Β",
		Gamma: "Γ",
		Delta: "Δ",
		Epsilon: "Ε",
		Zeta: "Ζ",
		Eta: "Η",
		Theta: "Θ",
		Iota: "Ι",
		Kappa: "Κ",
		Lambda: "Λ",
		Mu: "Μ",
		Nu: "Ν",
		Xi: "Ξ",
		Omicron: "Ο",
		Pi: "Π",
		Rho: "Ρ",
		Sigma: "Σ",
		Tau: "Τ",
		Upsilon: "Υ",
		Phi: "Φ",
		Chi: "Χ",
		Psi: "Ψ",
		Omega: "Ω",
		alpha: "α",
		beta: "β",
		gamma: "γ",
		delta: "δ",
		epsilon: "ε",
		zeta: "ζ",
		eta: "η",
		theta: "θ",
		iota: "ι",
		kappa: "κ",
		lambda: "λ",
		mu: "μ",
		nu: "ν",
		xi: "ξ",
		omicron: "ο",
		pi: "π",
		rho: "ρ",
		sigmaf: "ς",
		sigma: "σ",
		tau: "τ",
		upsilon: "υ",
		phi: "φ",
		chi: "χ",
		psi: "ψ",
		omega: "ω",
		thetasym: "ϑ",
		upsih: "ϒ",
		piv: "ϖ",
		ensp: " ",
		emsp: " ",
		thinsp: " ",
		zwnj: "‌",
		zwj: "‍",
		lrm: "‎",
		rlm: "‏",
		ndash: "–",
		mdash: "—",
		lsquo: "‘",
		rsquo: "’",
		sbquo: "‚",
		ldquo: "“",
		rdquo: "”",
		bdquo: "„",
		dagger: "†",
		Dagger: "‡",
		bull: "•",
		hellip: "…",
		permil: "‰",
		prime: "′",
		Prime: "″",
		lsaquo: "‹",
		rsaquo: "›",
		oline: "‾",
		frasl: "⁄",
		euro: "€",
		image: "ℑ",
		weierp: "℘",
		real: "ℜ",
		trade: "™",
		alefsym: "ℵ",
		larr: "←",
		uarr: "↑",
		rarr: "→",
		darr: "↓",
		harr: "↔",
		crarr: "↵",
		lArr: "⇐",
		uArr: "⇑",
		rArr: "⇒",
		dArr: "⇓",
		hArr: "⇔",
		forall: "∀",
		part: "∂",
		exist: "∃",
		empty: "∅",
		nabla: "∇",
		isin: "∈",
		notin: "∉",
		ni: "∋",
		prod: "∏",
		sum: "∑",
		minus: "−",
		lowast: "∗",
		radic: "√",
		prop: "∝",
		infin: "∞",
		ang: "∠",
		and: "∧",
		or: "∨",
		cap: "∩",
		cup: "∪",
		int: "∫",
		there4: "∴",
		sim: "∼",
		cong: "≅",
		asymp: "≈",
		ne: "≠",
		equiv: "≡",
		le: "≤",
		ge: "≥",
		sub: "⊂",
		sup: "⊃",
		nsub: "⊄",
		sube: "⊆",
		supe: "⊇",
		oplus: "⊕",
		otimes: "⊗",
		perp: "⊥",
		sdot: "⋅",
		lceil: "⌈",
		rceil: "⌉",
		lfloor: "⌊",
		rfloor: "⌋",
		lang: "〈",
		rang: "〉",
		loz: "◊",
		spades: "♠",
		clubs: "♣",
		hearts: "♥",
		diams: "♦"
	};
})), require_acorn_jsx = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let XHTMLEntities = require_xhtml(), hexNumber = /^[\da-fA-F]+$/, decimalNumber = /^\d+$/, acornJsxMap = /* @__PURE__ */ new WeakMap();
	function getJsxTokens(acorn) {
		acorn = acorn.Parser.acorn || acorn;
		let acornJsx = acornJsxMap.get(acorn);
		if (!acornJsx) {
			let tt = acorn.tokTypes, TokContext = acorn.TokContext, TokenType = acorn.TokenType, tc_oTag = new TokContext("<tag", !1), tc_cTag = new TokContext("</tag", !1), tc_expr = new TokContext("<tag>...</tag>", !0, !0), tokContexts = {
				tc_oTag,
				tc_cTag,
				tc_expr
			}, tokTypes = {
				jsxName: new TokenType("jsxName"),
				jsxText: new TokenType("jsxText", { beforeExpr: !0 }),
				jsxTagStart: new TokenType("jsxTagStart", { startsExpr: !0 }),
				jsxTagEnd: new TokenType("jsxTagEnd")
			};
			tokTypes.jsxTagStart.updateContext = function() {
				this.context.push(tc_expr), this.context.push(tc_oTag), this.exprAllowed = !1;
			}, tokTypes.jsxTagEnd.updateContext = function(prevType) {
				let out = this.context.pop();
				out === tc_oTag && prevType === tt.slash || out === tc_cTag ? (this.context.pop(), this.exprAllowed = this.curContext() === tc_expr) : this.exprAllowed = !0;
			}, acornJsx = {
				tokContexts,
				tokTypes
			}, acornJsxMap.set(acorn, acornJsx);
		}
		return acornJsx;
	}
	function getQualifiedJSXName(object) {
		if (!object) return object;
		if (object.type === "JSXIdentifier") return object.name;
		if (object.type === "JSXNamespacedName") return object.namespace.name + ":" + object.name.name;
		if (object.type === "JSXMemberExpression") return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
	}
	module.exports = function(options) {
		return options ||= {}, function(Parser) {
			return plugin({
				allowNamespaces: options.allowNamespaces !== !1,
				allowNamespacedObjects: !!options.allowNamespacedObjects
			}, Parser);
		};
	}, Object.defineProperty(module.exports, "tokTypes", {
		get: function get_tokTypes() {
			return getJsxTokens(require_acorn()).tokTypes;
		},
		configurable: !0,
		enumerable: !0
	});
	function plugin(options, Parser) {
		let acorn = Parser.acorn || require_acorn(), acornJsx = getJsxTokens(acorn), tt = acorn.tokTypes, tok = acornJsx.tokTypes, tokContexts = acorn.tokContexts, tc_oTag = acornJsx.tokContexts.tc_oTag, tc_cTag = acornJsx.tokContexts.tc_cTag, tc_expr = acornJsx.tokContexts.tc_expr, isNewLine = acorn.isNewLine, isIdentifierStart = acorn.isIdentifierStart, isIdentifierChar = acorn.isIdentifierChar;
		return class extends Parser {
			static get acornJsx() {
				return acornJsx;
			}
			jsx_readToken() {
				let out = "", chunkStart = this.pos;
				for (;;) {
					this.pos >= this.input.length && this.raise(this.start, "Unterminated JSX contents");
					let ch = this.input.charCodeAt(this.pos);
					switch (ch) {
						case 60:
						case 123: return this.pos === this.start ? ch === 60 && this.exprAllowed ? (++this.pos, this.finishToken(tok.jsxTagStart)) : this.getTokenFromCode(ch) : (out += this.input.slice(chunkStart, this.pos), this.finishToken(tok.jsxText, out));
						case 38:
							out += this.input.slice(chunkStart, this.pos), out += this.jsx_readEntity(), chunkStart = this.pos;
							break;
						case 62:
						case 125: this.raise(this.pos, "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (ch === 62 ? "&gt;" : "&rbrace;") + "` or `{\"" + this.input[this.pos] + "\"}`?");
						default: isNewLine(ch) ? (out += this.input.slice(chunkStart, this.pos), out += this.jsx_readNewLine(!0), chunkStart = this.pos) : ++this.pos;
					}
				}
			}
			jsx_readNewLine(normalizeCRLF) {
				let ch = this.input.charCodeAt(this.pos), out;
				return ++this.pos, ch === 13 && this.input.charCodeAt(this.pos) === 10 ? (++this.pos, out = normalizeCRLF ? "\n" : "\r\n") : out = String.fromCharCode(ch), this.options.locations && (++this.curLine, this.lineStart = this.pos), out;
			}
			jsx_readString(quote) {
				let out = "", chunkStart = ++this.pos;
				for (;;) {
					this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
					let ch = this.input.charCodeAt(this.pos);
					if (ch === quote) break;
					ch === 38 ? (out += this.input.slice(chunkStart, this.pos), out += this.jsx_readEntity(), chunkStart = this.pos) : isNewLine(ch) ? (out += this.input.slice(chunkStart, this.pos), out += this.jsx_readNewLine(!1), chunkStart = this.pos) : ++this.pos;
				}
				return out += this.input.slice(chunkStart, this.pos++), this.finishToken(tt.string, out);
			}
			jsx_readEntity() {
				let str = "", count = 0, entity, ch = this.input[this.pos];
				ch !== "&" && this.raise(this.pos, "Entity must start with an ampersand");
				let startPos = ++this.pos;
				for (; this.pos < this.input.length && count++ < 10;) {
					if (ch = this.input[this.pos++], ch === ";") {
						str[0] === "#" ? str[1] === "x" ? (str = str.substr(2), hexNumber.test(str) && (entity = String.fromCharCode(parseInt(str, 16)))) : (str = str.substr(1), decimalNumber.test(str) && (entity = String.fromCharCode(parseInt(str, 10)))) : entity = XHTMLEntities[str];
						break;
					}
					str += ch;
				}
				return entity || (this.pos = startPos, "&");
			}
			jsx_readWord() {
				let ch, start = this.pos;
				do
					ch = this.input.charCodeAt(++this.pos);
				while (isIdentifierChar(ch) || ch === 45);
				return this.finishToken(tok.jsxName, this.input.slice(start, this.pos));
			}
			jsx_parseIdentifier() {
				let node = this.startNode();
				return this.type === tok.jsxName ? node.name = this.value : this.type.keyword ? node.name = this.type.keyword : this.unexpected(), this.next(), this.finishNode(node, "JSXIdentifier");
			}
			jsx_parseNamespacedName() {
				let startPos = this.start, startLoc = this.startLoc, name = this.jsx_parseIdentifier();
				if (!options.allowNamespaces || !this.eat(tt.colon)) return name;
				var node = this.startNodeAt(startPos, startLoc);
				return node.namespace = name, node.name = this.jsx_parseIdentifier(), this.finishNode(node, "JSXNamespacedName");
			}
			jsx_parseElementName() {
				if (this.type === tok.jsxTagEnd) return "";
				let startPos = this.start, startLoc = this.startLoc, node = this.jsx_parseNamespacedName();
				for (this.type === tt.dot && node.type === "JSXNamespacedName" && !options.allowNamespacedObjects && this.unexpected(); this.eat(tt.dot);) {
					let newNode = this.startNodeAt(startPos, startLoc);
					newNode.object = node, newNode.property = this.jsx_parseIdentifier(), node = this.finishNode(newNode, "JSXMemberExpression");
				}
				return node;
			}
			jsx_parseAttributeValue() {
				switch (this.type) {
					case tt.braceL:
						let node = this.jsx_parseExpressionContainer();
						return node.expression.type === "JSXEmptyExpression" && this.raise(node.start, "JSX attributes must only be assigned a non-empty expression"), node;
					case tok.jsxTagStart:
					case tt.string: return this.parseExprAtom();
					default: this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
				}
			}
			jsx_parseEmptyExpression() {
				let node = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
				return this.finishNodeAt(node, "JSXEmptyExpression", this.start, this.startLoc);
			}
			jsx_parseExpressionContainer() {
				let node = this.startNode();
				return this.next(), node.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression(), this.expect(tt.braceR), this.finishNode(node, "JSXExpressionContainer");
			}
			jsx_parseAttribute() {
				let node = this.startNode();
				return this.eat(tt.braceL) ? (this.expect(tt.ellipsis), node.argument = this.parseMaybeAssign(), this.expect(tt.braceR), this.finishNode(node, "JSXSpreadAttribute")) : (node.name = this.jsx_parseNamespacedName(), node.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null, this.finishNode(node, "JSXAttribute"));
			}
			jsx_parseOpeningElementAt(startPos, startLoc) {
				let node = this.startNodeAt(startPos, startLoc);
				node.attributes = [];
				let nodeName = this.jsx_parseElementName();
				for (nodeName && (node.name = nodeName); this.type !== tt.slash && this.type !== tok.jsxTagEnd;) node.attributes.push(this.jsx_parseAttribute());
				return node.selfClosing = this.eat(tt.slash), this.expect(tok.jsxTagEnd), this.finishNode(node, nodeName ? "JSXOpeningElement" : "JSXOpeningFragment");
			}
			jsx_parseClosingElementAt(startPos, startLoc) {
				let node = this.startNodeAt(startPos, startLoc), nodeName = this.jsx_parseElementName();
				return nodeName && (node.name = nodeName), this.expect(tok.jsxTagEnd), this.finishNode(node, nodeName ? "JSXClosingElement" : "JSXClosingFragment");
			}
			jsx_parseElementAt(startPos, startLoc) {
				let node = this.startNodeAt(startPos, startLoc), children = [], openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc), closingElement = null;
				if (!openingElement.selfClosing) {
					contents: for (;;) switch (this.type) {
						case tok.jsxTagStart:
							if (startPos = this.start, startLoc = this.startLoc, this.next(), this.eat(tt.slash)) {
								closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
								break contents;
							}
							children.push(this.jsx_parseElementAt(startPos, startLoc));
							break;
						case tok.jsxText:
							children.push(this.parseExprAtom());
							break;
						case tt.braceL:
							children.push(this.jsx_parseExpressionContainer());
							break;
						default: this.unexpected();
					}
					getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name) && this.raise(closingElement.start, "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">");
				}
				let fragmentOrElement = openingElement.name ? "Element" : "Fragment";
				return node["opening" + fragmentOrElement] = openingElement, node["closing" + fragmentOrElement] = closingElement, node.children = children, this.type === tt.relational && this.value === "<" && this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag"), this.finishNode(node, "JSX" + fragmentOrElement);
			}
			jsx_parseText() {
				let node = this.parseLiteral(this.value);
				return node.type = "JSXText", node;
			}
			jsx_parseElement() {
				let startPos = this.start, startLoc = this.startLoc;
				return this.next(), this.jsx_parseElementAt(startPos, startLoc);
			}
			parseExprAtom(refShortHandDefaultPos) {
				return this.type === tok.jsxText ? this.jsx_parseText() : this.type === tok.jsxTagStart ? this.jsx_parseElement() : super.parseExprAtom(refShortHandDefaultPos);
			}
			readToken(code) {
				let context = this.curContext();
				if (context === tc_expr) return this.jsx_readToken();
				if (context === tc_oTag || context === tc_cTag) {
					if (isIdentifierStart(code)) return this.jsx_readWord();
					if (code == 62) return ++this.pos, this.finishToken(tok.jsxTagEnd);
					if ((code === 34 || code === 39) && context == tc_oTag) return this.jsx_readString(code);
				}
				return code === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33 ? (++this.pos, this.finishToken(tok.jsxTagStart)) : super.readToken(code);
			}
			updateContext(prevType) {
				if (this.type == tt.braceL) {
					var curContext = this.curContext();
					curContext == tc_oTag ? this.context.push(tokContexts.b_expr) : curContext == tc_expr ? this.context.push(tokContexts.b_tmpl) : super.updateContext(prevType), this.exprAllowed = !0;
				} else if (this.type === tt.slash && prevType === tok.jsxTagStart) this.context.length -= 2, this.context.push(tc_cTag), this.exprAllowed = !1;
				else return super.updateContext(prevType);
			}
		};
	}
})), require_espree = /* @__PURE__ */ require_chunk.t(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	var acorn = require_acorn(), jsx = require_acorn_jsx(), visitorKeys = require_eslint_visitor_keys();
	function _interopDefaultLegacy(e) {
		return e && typeof e == "object" && "default" in e ? e : { default: e };
	}
	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		return e && Object.keys(e).forEach(function(k) {
			if (k !== "default") {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: !0,
					get: function() {
						return e[k];
					}
				});
			}
		}), n.default = e, Object.freeze(n);
	}
	var acorn__namespace = /* @__PURE__ */ _interopNamespace(acorn), jsx__default = /* @__PURE__ */ _interopDefaultLegacy(jsx), visitorKeys__namespace = /* @__PURE__ */ _interopNamespace(visitorKeys);
	/**
	* @fileoverview Translates tokens between Acorn format and Esprima format.
	* @author Nicholas C. Zakas
	*/
	let Token = {
		Boolean: "Boolean",
		EOF: "<end>",
		Identifier: "Identifier",
		PrivateIdentifier: "PrivateIdentifier",
		Keyword: "Keyword",
		Null: "Null",
		Numeric: "Numeric",
		Punctuator: "Punctuator",
		String: "String",
		RegularExpression: "RegularExpression",
		Template: "Template",
		JSXIdentifier: "JSXIdentifier",
		JSXText: "JSXText"
	};
	/**
	* Converts part of a template into an Esprima token.
	* @param {AcornToken[]} tokens The Acorn tokens representing the template.
	* @param {string} code The source code.
	* @returns {EsprimaToken} The Esprima equivalent of the template token.
	* @private
	*/
	function convertTemplatePart(tokens, code) {
		let firstToken = tokens[0], lastTemplateToken = tokens.at(-1), token = {
			type: Token.Template,
			value: code.slice(firstToken.start, lastTemplateToken.end)
		};
		return firstToken.loc && (token.loc = {
			start: firstToken.loc.start,
			end: lastTemplateToken.loc.end
		}), firstToken.range && (token.start = firstToken.range[0], token.end = lastTemplateToken.range[1], token.range = [token.start, token.end]), token;
	}
	/**
	* Contains logic to translate Acorn tokens into Esprima tokens.
	* @param {Object} acornTokTypes The Acorn token types.
	* @param {string} code The source code Acorn is parsing. This is necessary
	*      to correct the "value" property of some tokens.
	* @constructor
	*/
	function TokenTranslator(acornTokTypes, code) {
		this._acornTokTypes = acornTokTypes, this._tokens = [], this._curlyBrace = null, this._code = code;
	}
	TokenTranslator.prototype = {
		constructor: TokenTranslator,
		translate(token, extra) {
			let type = token.type, tt = this._acornTokTypes;
			if (type === tt.name) token.type = Token.Identifier, token.value === "static" && (token.type = Token.Keyword), extra.ecmaVersion > 5 && (token.value === "yield" || token.value === "let") && (token.type = Token.Keyword);
			else if (type === tt.privateId) token.type = Token.PrivateIdentifier;
			else if (type === tt.semi || type === tt.comma || type === tt.parenL || type === tt.parenR || type === tt.braceL || type === tt.braceR || type === tt.dot || type === tt.bracketL || type === tt.colon || type === tt.question || type === tt.bracketR || type === tt.ellipsis || type === tt.arrow || type === tt.jsxTagStart || type === tt.incDec || type === tt.starstar || type === tt.jsxTagEnd || type === tt.prefix || type === tt.questionDot || type.binop && !type.keyword || type.isAssign) token.type = Token.Punctuator, token.value = this._code.slice(token.start, token.end);
			else if (type === tt.jsxName) token.type = Token.JSXIdentifier;
			else if (type.label === "jsxText" || type === tt.jsxAttrValueToken) token.type = Token.JSXText;
			else if (type.keyword) type.keyword === "true" || type.keyword === "false" ? token.type = Token.Boolean : type.keyword === "null" ? token.type = Token.Null : token.type = Token.Keyword;
			else if (type === tt.num) token.type = Token.Numeric, token.value = this._code.slice(token.start, token.end);
			else if (type === tt.string) extra.jsxAttrValueToken ? (extra.jsxAttrValueToken = !1, token.type = Token.JSXText) : token.type = Token.String, token.value = this._code.slice(token.start, token.end);
			else if (type === tt.regexp) {
				token.type = Token.RegularExpression;
				let value = token.value;
				token.regex = {
					flags: value.flags,
					pattern: value.pattern
				}, token.value = `/${value.pattern}/${value.flags}`;
			}
			return token;
		},
		onToken(token, extra) {
			let tt = this._acornTokTypes, tokens = extra.tokens, templateTokens = this._tokens, translateTemplateTokens = () => {
				tokens.push(convertTemplatePart(this._tokens, this._code)), this._tokens = [];
			};
			if (token.type === tt.eof) {
				this._curlyBrace && tokens.push(this.translate(this._curlyBrace, extra));
				return;
			}
			if (token.type === tt.backQuote) {
				this._curlyBrace &&= (tokens.push(this.translate(this._curlyBrace, extra)), null), templateTokens.push(token), templateTokens.length > 1 && translateTemplateTokens();
				return;
			}
			if (token.type === tt.dollarBraceL) {
				templateTokens.push(token), translateTemplateTokens();
				return;
			}
			if (token.type === tt.braceR) {
				this._curlyBrace && tokens.push(this.translate(this._curlyBrace, extra)), this._curlyBrace = token;
				return;
			}
			if (token.type === tt.template || token.type === tt.invalidTemplate) {
				this._curlyBrace &&= (templateTokens.push(this._curlyBrace), null), templateTokens.push(token);
				return;
			}
			this._curlyBrace &&= (tokens.push(this.translate(this._curlyBrace, extra)), null), tokens.push(this.translate(token, extra));
		}
	};
	/**
	* @fileoverview A collection of methods for processing Espree's options.
	* @author Kai Cataldo
	*/
	let SUPPORTED_VERSIONS = [
		3,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17
	];
	/**
	* Get the latest ECMAScript version supported by Espree.
	* @returns {number} The latest ECMAScript version.
	*/
	function getLatestEcmaVersion() {
		return SUPPORTED_VERSIONS.at(-1);
	}
	/**
	* Get the list of ECMAScript versions supported by Espree.
	* @returns {number[]} An array containing the supported ECMAScript versions.
	*/
	function getSupportedEcmaVersions() {
		return [...SUPPORTED_VERSIONS];
	}
	/**
	* Normalize ECMAScript version from the initial config
	* @param {(number|"latest")} ecmaVersion ECMAScript version from the initial config
	* @throws {Error} throws an error if the ecmaVersion is invalid.
	* @returns {number} normalized ECMAScript version
	*/
	function normalizeEcmaVersion(ecmaVersion = 5) {
		let version = ecmaVersion === "latest" ? getLatestEcmaVersion() : ecmaVersion;
		if (typeof version != "number") throw Error(`ecmaVersion must be a number or "latest". Received value of type ${typeof ecmaVersion} instead.`);
		if (version >= 2015 && (version -= 2009), !SUPPORTED_VERSIONS.includes(version)) throw Error("Invalid ecmaVersion.");
		return version;
	}
	/**
	* Normalize sourceType from the initial config
	* @param {string} sourceType to normalize
	* @throws {Error} throw an error if sourceType is invalid
	* @returns {string} normalized sourceType
	*/
	function normalizeSourceType(sourceType = "script") {
		if (sourceType === "script" || sourceType === "module") return sourceType;
		if (sourceType === "commonjs") return "script";
		throw Error("Invalid sourceType.");
	}
	/**
	* Normalize parserOptions
	* @param {Object} options the parser options to normalize
	* @throws {Error} throw an error if found invalid option.
	* @returns {Object} normalized options
	*/
	function normalizeOptions(options) {
		let ecmaVersion = normalizeEcmaVersion(options.ecmaVersion), sourceType = normalizeSourceType(options.sourceType), ranges = options.range === !0, locations = options.loc === !0;
		if (ecmaVersion !== 3 && options.allowReserved) throw Error("`allowReserved` is only supported when ecmaVersion is 3");
		if (options.allowReserved !== void 0 && typeof options.allowReserved != "boolean") throw Error("`allowReserved`, when present, must be `true` or `false`");
		let allowReserved = ecmaVersion === 3 ? options.allowReserved || "never" : !1, ecmaFeatures = options.ecmaFeatures || {}, allowReturnOutsideFunction = options.sourceType === "commonjs" || !!ecmaFeatures.globalReturn;
		if (sourceType === "module" && ecmaVersion < 6) throw Error("sourceType 'module' is not supported when ecmaVersion < 2015. Consider adding `{ ecmaVersion: 2015 }` to the parser options.");
		return Object.assign({}, options, {
			ecmaVersion,
			sourceType,
			ranges,
			locations,
			allowReserved,
			allowReturnOutsideFunction
		});
	}
	let STATE = Symbol("espree's internal state"), ESPRIMA_FINISH_NODE = Symbol("espree's esprimaFinishNode");
	/**
	* Converts an Acorn comment to a Esprima comment.
	* @param {boolean} block True if it's a block comment, false if not.
	* @param {string} text The text of the comment.
	* @param {int} start The index at which the comment starts.
	* @param {int} end The index at which the comment ends.
	* @param {Location} startLoc The location at which the comment starts.
	* @param {Location} endLoc The location at which the comment ends.
	* @param {string} code The source code being parsed.
	* @returns {Object} The comment object.
	* @private
	*/
	function convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc, code) {
		let type;
		type = block ? "Block" : code.slice(start, start + 2) === "#!" ? "Hashbang" : "Line";
		let comment = {
			type,
			value: text
		};
		return typeof start == "number" && (comment.start = start, comment.end = end, comment.range = [start, end]), typeof startLoc == "object" && (comment.loc = {
			start: startLoc,
			end: endLoc
		}), comment;
	}
	var espree = () => (Parser) => {
		let tokTypes = Object.assign({}, Parser.acorn.tokTypes);
		return Parser.acornJsx && Object.assign(tokTypes, Parser.acornJsx.tokTypes), class Espree extends Parser {
			constructor(opts, code) {
				(typeof opts != "object" || !opts) && (opts = {}), typeof code != "string" && !(code instanceof String) && (code = String(code));
				let originalSourceType = opts.sourceType, options = normalizeOptions(opts), ecmaFeatures = options.ecmaFeatures || {}, tokenTranslator = options.tokens === !0 ? new TokenTranslator(tokTypes, code) : null, state = {
					originalSourceType: originalSourceType || options.sourceType,
					tokens: tokenTranslator ? [] : null,
					comments: options.comment === !0 ? [] : null,
					impliedStrict: ecmaFeatures.impliedStrict === !0 && options.ecmaVersion >= 5,
					ecmaVersion: options.ecmaVersion,
					jsxAttrValueToken: !1,
					lastToken: null,
					templateElements: []
				};
				super({
					ecmaVersion: options.ecmaVersion,
					sourceType: options.sourceType,
					ranges: options.ranges,
					locations: options.locations,
					allowReserved: options.allowReserved,
					allowReturnOutsideFunction: options.allowReturnOutsideFunction,
					onToken(token) {
						tokenTranslator && tokenTranslator.onToken(token, state), token.type !== tokTypes.eof && (state.lastToken = token);
					},
					onComment(block, text, start, end, startLoc, endLoc) {
						if (state.comments) {
							let comment = convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc, code);
							state.comments.push(comment);
						}
					}
				}, code), this[STATE] = state;
			}
			tokenize() {
				do
					this.next();
				while (this.type !== tokTypes.eof);
				this.next();
				let extra = this[STATE], tokens = extra.tokens;
				return extra.comments && (tokens.comments = extra.comments), tokens;
			}
			finishNode(...args) {
				let result = super.finishNode(...args);
				return this[ESPRIMA_FINISH_NODE](result);
			}
			finishNodeAt(...args) {
				let result = super.finishNodeAt(...args);
				return this[ESPRIMA_FINISH_NODE](result);
			}
			parse() {
				let extra = this[STATE], program = super.parse();
				if (program.sourceType = extra.originalSourceType, extra.comments && (program.comments = extra.comments), extra.tokens && (program.tokens = extra.tokens), program.body.length) {
					let [firstNode] = program.body;
					program.range && (program.range[0] = firstNode.range[0]), program.loc && (program.loc.start = firstNode.loc.start), program.start = firstNode.start;
				}
				return extra.lastToken && (program.range && (program.range[1] = extra.lastToken.range[1]), program.loc && (program.loc.end = extra.lastToken.loc.end), program.end = extra.lastToken.end), this[STATE].templateElements.forEach((templateElement) => {
					let endOffset = templateElement.tail ? 1 : 2;
					templateElement.start += -1, templateElement.end += endOffset, templateElement.range && (templateElement.range[0] += -1, templateElement.range[1] += endOffset), templateElement.loc && (templateElement.loc.start.column += -1, templateElement.loc.end.column += endOffset);
				}), program;
			}
			parseTopLevel(node) {
				return this[STATE].impliedStrict && (this.strict = !0), super.parseTopLevel(node);
			}
			/**
			* Overwrites the default raise method to throw Esprima-style errors.
			* @param {int} pos The position of the error.
			* @param {string} message The error message.
			* @throws {SyntaxError} A syntax error.
			* @returns {void}
			*/
			raise(pos, message) {
				let loc = Parser.acorn.getLineInfo(this.input, pos), err = SyntaxError(message);
				throw err.index = pos, err.lineNumber = loc.line, err.column = loc.column + 1, err;
			}
			/**
			* Overwrites the default raise method to throw Esprima-style errors.
			* @param {int} pos The position of the error.
			* @param {string} message The error message.
			* @throws {SyntaxError} A syntax error.
			* @returns {void}
			*/
			raiseRecoverable(pos, message) {
				this.raise(pos, message);
			}
			/**
			* Overwrites the default unexpected method to throw Esprima-style errors.
			* @param {int} pos The position of the error.
			* @throws {SyntaxError} A syntax error.
			* @returns {void}
			*/
			unexpected(pos) {
				let message = "Unexpected token";
				if (pos != null) {
					if (this.pos = pos, this.options.locations) for (; this.pos < this.lineStart;) this.lineStart = this.input.lastIndexOf("\n", this.lineStart - 2) + 1, --this.curLine;
					this.nextToken();
				}
				this.end > this.start && (message += ` ${this.input.slice(this.start, this.end)}`), this.raise(this.start, message);
			}
			jsx_readString(quote) {
				let result = super.jsx_readString(quote);
				return this.type === tokTypes.string && (this[STATE].jsxAttrValueToken = !0), result;
			}
			/**
			* Performs last-minute Esprima-specific compatibility checks and fixes.
			* @param {ASTNode} result The node to check.
			* @returns {ASTNode} The finished node.
			*/
			[ESPRIMA_FINISH_NODE](result) {
				return result.type === "TemplateElement" && this[STATE].templateElements.push(result), result.type.includes("Function") && !result.generator && (result.generator = !1), result;
			}
		};
	};
	let parsers = {
		_regular: null,
		_jsx: null,
		get regular() {
			return this._regular === null && (this._regular = acorn__namespace.Parser.extend(espree())), this._regular;
		},
		get jsx() {
			return this._jsx === null && (this._jsx = acorn__namespace.Parser.extend(jsx__default.default(), espree())), this._jsx;
		},
		get(options) {
			return options && options.ecmaFeatures && options.ecmaFeatures.jsx ? this.jsx : this.regular;
		}
	};
	/**
	* Tokenizes the given code.
	* @param {string} code The code to tokenize.
	* @param {Object} options Options defining how to tokenize.
	* @returns {Token[]} An array of tokens.
	* @throws {SyntaxError} If the input code is invalid.
	* @private
	*/
	function tokenize(code, options) {
		let Parser = parsers.get(options);
		return (!options || options.tokens !== !0) && (options = Object.assign({}, options, { tokens: !0 })), new Parser(options, code).tokenize();
	}
	/**
	* Parses the given code.
	* @param {string} code The code to tokenize.
	* @param {Object} options Options defining how to tokenize.
	* @returns {ASTNode} The "Program" AST node.
	* @throws {SyntaxError} If the input code is invalid.
	*/
	function parse(code, options) {
		return new (parsers.get(options))(options, code).parse();
	}
	let VisitorKeys = function() {
		return visitorKeys__namespace.KEYS;
	}(), Syntax = function() {
		let key, types = {};
		for (key in typeof Object.create == "function" && (types = Object.create(null)), VisitorKeys) Object.hasOwn(VisitorKeys, key) && (types[key] = key);
		return typeof Object.freeze == "function" && Object.freeze(types), types;
	}(), latestEcmaVersion = getLatestEcmaVersion(), supportedEcmaVersions = getSupportedEcmaVersions();
	exports.Syntax = Syntax, exports.VisitorKeys = VisitorKeys, exports.latestEcmaVersion = latestEcmaVersion, exports.name = "espree", exports.parse = parse, exports.supportedEcmaVersions = supportedEcmaVersions, exports.tokenize = tokenize, exports.version = "10.4.0";
})), require_escape_string_regexp = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	module.exports = (string) => {
		if (typeof string != "string") throw TypeError("Expected a string");
		return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
	};
})), require_ast_utils$1 = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let breakableTypePattern = /^(?:(?:Do)?While|For(?:In|Of)?|Switch)Statement$/u, lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u, shebangPattern = /^#!([^\r\n]+)/u;
	/**
	* Creates a version of the `lineBreakPattern` regex with the global flag.
	* Global regexes are mutable, so this needs to be a function instead of a constant.
	* @returns {RegExp} A global regular expression that matches line terminators
	*/
	function createGlobalLinebreakMatcher() {
		return new RegExp(lineBreakPattern.source, "gu");
	}
	module.exports = {
		breakableTypePattern,
		lineBreakPattern,
		createGlobalLinebreakMatcher,
		shebangPattern
	};
})), require_globals = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let commonjs = {
		exports: !0,
		global: !1,
		module: !1,
		require: !1
	}, es3 = {
		Array: !1,
		Boolean: !1,
		constructor: !1,
		Date: !1,
		decodeURI: !1,
		decodeURIComponent: !1,
		encodeURI: !1,
		encodeURIComponent: !1,
		Error: !1,
		escape: !1,
		eval: !1,
		EvalError: !1,
		Function: !1,
		hasOwnProperty: !1,
		Infinity: !1,
		isFinite: !1,
		isNaN: !1,
		isPrototypeOf: !1,
		Math: !1,
		NaN: !1,
		Number: !1,
		Object: !1,
		parseFloat: !1,
		parseInt: !1,
		propertyIsEnumerable: !1,
		RangeError: !1,
		ReferenceError: !1,
		RegExp: !1,
		String: !1,
		SyntaxError: !1,
		toLocaleString: !1,
		toString: !1,
		TypeError: !1,
		undefined: !1,
		unescape: !1,
		URIError: !1,
		valueOf: !1
	}, es5 = {
		...es3,
		JSON: !1
	}, es2015 = {
		...es5,
		ArrayBuffer: !1,
		DataView: !1,
		Float32Array: !1,
		Float64Array: !1,
		Int16Array: !1,
		Int32Array: !1,
		Int8Array: !1,
		Intl: !1,
		Map: !1,
		Promise: !1,
		Proxy: !1,
		Reflect: !1,
		Set: !1,
		Symbol: !1,
		Uint16Array: !1,
		Uint32Array: !1,
		Uint8Array: !1,
		Uint8ClampedArray: !1,
		WeakMap: !1,
		WeakSet: !1
	}, es2016 = { ...es2015 }, es2017 = {
		...es2016,
		Atomics: !1,
		SharedArrayBuffer: !1
	}, es2018 = { ...es2017 }, es2019 = { ...es2018 }, es2020 = {
		...es2019,
		BigInt: !1,
		BigInt64Array: !1,
		BigUint64Array: !1,
		globalThis: !1
	}, es2021 = {
		...es2020,
		AggregateError: !1,
		FinalizationRegistry: !1,
		WeakRef: !1
	}, es2022 = { ...es2021 }, es2023 = { ...es2022 }, es2024 = { ...es2023 }, es2025 = {
		...es2024,
		Float16Array: !1,
		Iterator: !1
	};
	module.exports = {
		commonjs,
		es3,
		es5,
		es2015,
		es2016,
		es2017,
		es2018,
		es2019,
		es2020,
		es2021,
		es2022,
		es2023,
		es2024,
		es2025,
		es2026: {
			...es2025,
			AsyncDisposableStack: !1,
			DisposableStack: !1,
			SuppressedError: !1
		}
	};
})), require_ecma_version = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	module.exports = { LATEST_ECMA_VERSION: 2026 };
})), require_ast_utils = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let { KEYS: eslintVisitorKeys } = require_eslint_visitor_keys(), esutils = require_utils(), espree = require_espree(), escapeRegExp = require_escape_string_regexp(), { breakableTypePattern, createGlobalLinebreakMatcher, lineBreakPattern, shebangPattern } = require_ast_utils$1(), globals = require_globals(), { LATEST_ECMA_VERSION } = require_ecma_version(), anyFunctionPattern = /^(?:Function(?:Declaration|Expression)|ArrowFunctionExpression)$/u, anyLoopPattern = /^(?:DoWhile|For|ForIn|ForOf|While)Statement$/u, arrayMethodWithThisArgPattern = /^(?:every|filter|find(?:Last)?(?:Index)?|flatMap|forEach|map|some)$/u, arrayOrTypedArrayPattern = /Array$/u, bindOrCallOrApplyPattern = /^(?:bind|call|apply)$/u, thisTagPattern = /^[\s*]*@this/mu, COMMENTS_IGNORE_PATTERN = /^\s*(?:eslint|jshint\s+|jslint\s+|istanbul\s+|globals?\s+|exported\s+|jscs)/u, ESLINT_DIRECTIVE_PATTERN = /^(?:eslint[- ]|(?:globals?|exported) )/u, LINEBREAKS = new Set([
		"\r\n",
		"\r",
		"\n",
		"\u2028",
		"\u2029"
	]), STATEMENT_LIST_PARENTS = new Set([
		"Program",
		"BlockStatement",
		"StaticBlock",
		"SwitchCase"
	]), LEXICAL_DECLARATION_KINDS = new Set([
		"let",
		"const",
		"using",
		"await using"
	]), DECIMAL_INTEGER_PATTERN = /^(?:0|0[0-7]*[89]\d*|[1-9](?:_?\d)*)$/u, OCTAL_OR_NON_OCTAL_DECIMAL_ESCAPE_PATTERN = /^(?:[^\\]|\\.)*\\(?:[1-9]|0\d)/su, LOGICAL_ASSIGNMENT_OPERATORS = new Set([
		"&&=",
		"||=",
		"??="
	]), ECMASCRIPT_GLOBALS = globals[`es${LATEST_ECMA_VERSION}`];
	/**
	* Checks reference if is non initializer and writable.
	* @param {Reference} reference A reference to check.
	* @param {number} index The index of the reference in the references.
	* @param {Reference[]} references The array that the reference belongs to.
	* @returns {boolean} Success/Failure
	* @private
	*/
	function isModifyingReference(reference, index, references) {
		let identifier = reference.identifier, modifyingDifferentIdentifier = index === 0 || references[index - 1].identifier !== identifier;
		return identifier && reference.init === !1 && reference.isWrite() && modifyingDifferentIdentifier;
	}
	/**
	* Checks whether the given string starts with uppercase or not.
	* @param {string} s The string to check.
	* @returns {boolean} `true` if the string starts with uppercase.
	*/
	function startsWithUpperCase(s) {
		return s[0] !== s[0].toLocaleLowerCase();
	}
	/**
	* Checks whether or not a node is a constructor.
	* @param {ASTNode} node A function node to check.
	* @returns {boolean} Whether or not a node is a constructor.
	*/
	function isES5Constructor(node) {
		return node.id && startsWithUpperCase(node.id.name);
	}
	/**
	* Finds a function node from ancestors of a node.
	* @param {ASTNode} node A start node to find.
	* @returns {Node|null} A found function node.
	*/
	function getUpperFunction(node) {
		for (let currentNode = node; currentNode; currentNode = currentNode.parent) if (anyFunctionPattern.test(currentNode.type)) return currentNode;
		return null;
	}
	/**
	* Checks whether a given node is a function node or not.
	* The following types are function nodes:
	*
	* - ArrowFunctionExpression
	* - FunctionDeclaration
	* - FunctionExpression
	* @param {ASTNode|null} node A node to check.
	* @returns {boolean} `true` if the node is a function node.
	*/
	function isFunction(node) {
		return !!(node && anyFunctionPattern.test(node.type));
	}
	/**
	* Checks whether a given node is a loop node or not.
	* The following types are loop nodes:
	*
	* - DoWhileStatement
	* - ForInStatement
	* - ForOfStatement
	* - ForStatement
	* - WhileStatement
	* @param {ASTNode|null} node A node to check.
	* @returns {boolean} `true` if the node is a loop node.
	*/
	function isLoop(node) {
		return !!(node && anyLoopPattern.test(node.type));
	}
	/**
	* Checks whether the given node is in a loop or not.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is in a loop.
	*/
	function isInLoop(node) {
		for (let currentNode = node; currentNode && !isFunction(currentNode); currentNode = currentNode.parent) if (isLoop(currentNode)) return !0;
		return !1;
	}
	/**
	* Determines whether the given node is a `null` literal.
	* @param {ASTNode} node The node to check
	* @returns {boolean} `true` if the node is a `null` literal
	*/
	function isNullLiteral(node) {
		return node.type === "Literal" && node.value === null && !node.regex && !node.bigint;
	}
	/**
	* Checks whether or not a node is `null` or `undefined`.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} Whether or not the node is a `null` or `undefined`.
	* @public
	*/
	function isNullOrUndefined(node) {
		return isNullLiteral(node) || node.type === "Identifier" && node.name === "undefined" || node.type === "UnaryExpression" && node.operator === "void";
	}
	/**
	* Checks whether or not a node is callee.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} Whether or not the node is callee.
	*/
	function isCallee(node) {
		return node.parent.type === "CallExpression" && node.parent.callee === node;
	}
	/**
	* Returns the result of the string conversion applied to the evaluated value of the given expression node,
	* if it can be determined statically.
	*
	* This function returns a `string` value for all `Literal` nodes and simple `TemplateLiteral` nodes only.
	* In all other cases, this function returns `null`.
	* @param {ASTNode} node Expression node.
	* @returns {string|null} String value if it can be determined. Otherwise, `null`.
	*/
	function getStaticStringValue(node) {
		switch (node.type) {
			case "Literal":
				if (node.value === null) {
					if (isNullLiteral(node)) return String(node.value);
					if (node.regex) return `/${node.regex.pattern}/${node.regex.flags}`;
					if (node.bigint) return node.bigint;
				} else return String(node.value);
				break;
			case "TemplateLiteral":
				if (node.expressions.length === 0 && node.quasis.length === 1) return node.quasis[0].value.cooked;
				break;
		}
		return null;
	}
	/**
	* Gets the property name of a given node.
	* The node can be a MemberExpression, a Property, or a MethodDefinition.
	*
	* If the name is dynamic, this returns `null`.
	*
	* For examples:
	*
	*     a.b           // => "b"
	*     a["b"]        // => "b"
	*     a['b']        // => "b"
	*     a[`b`]        // => "b"
	*     a[100]        // => "100"
	*     a[b]          // => null
	*     a["a" + "b"]  // => null
	*     a[tag`b`]     // => null
	*     a[`${b}`]     // => null
	*
	*     let a = {b: 1}            // => "b"
	*     let a = {["b"]: 1}        // => "b"
	*     let a = {['b']: 1}        // => "b"
	*     let a = {[`b`]: 1}        // => "b"
	*     let a = {[100]: 1}        // => "100"
	*     let a = {[b]: 1}          // => null
	*     let a = {["a" + "b"]: 1}  // => null
	*     let a = {[tag`b`]: 1}     // => null
	*     let a = {[`${b}`]: 1}     // => null
	* @param {ASTNode} node The node to get.
	* @returns {string|null} The property name if static. Otherwise, null.
	*/
	function getStaticPropertyName(node) {
		let prop;
		switch (node && node.type) {
			case "ChainExpression": return getStaticPropertyName(node.expression);
			case "Property":
			case "PropertyDefinition":
			case "MethodDefinition":
			case "TSPropertySignature":
			case "TSMethodSignature":
				prop = node.key;
				break;
			case "MemberExpression":
				prop = node.property;
				break;
		}
		return prop ? prop.type === "Identifier" && !node.computed ? prop.name : getStaticStringValue(prop) : null;
	}
	/**
	* Retrieve `ChainExpression#expression` value if the given node a `ChainExpression` node. Otherwise, pass through it.
	* @param {ASTNode} node The node to address.
	* @returns {ASTNode} The `ChainExpression#expression` value if the node is a `ChainExpression` node. Otherwise, the node.
	*/
	function skipChainExpression(node) {
		return node && node.type === "ChainExpression" ? node.expression : node;
	}
	/**
	* Check if the `actual` is an expected value.
	* @param {string} actual The string value to check.
	* @param {string | RegExp} expected The expected string value or pattern.
	* @returns {boolean} `true` if the `actual` is an expected value.
	*/
	function checkText(actual, expected) {
		return typeof expected == "string" ? actual === expected : expected.test(actual);
	}
	/**
	* Check if a given node is an Identifier node with a given name.
	* @param {ASTNode} node The node to check.
	* @param {string | RegExp} name The expected name or the expected pattern of the object name.
	* @returns {boolean} `true` if the node is an Identifier node with the name.
	*/
	function isSpecificId(node, name) {
		return node.type === "Identifier" && checkText(node.name, name);
	}
	/**
	* Check if a given node is member access with a given object name and property name pair.
	* This is regardless of optional or not.
	* @param {ASTNode} node The node to check.
	* @param {string | RegExp | null} objectName The expected name or the expected pattern of the object name. If this is nullish, this method doesn't check object.
	* @param {string | RegExp | null} propertyName The expected name or the expected pattern of the property name. If this is nullish, this method doesn't check property.
	* @returns {boolean} `true` if the node is member access with the object name and property name pair.
	* The node is a `MemberExpression` or `ChainExpression`.
	*/
	function isSpecificMemberAccess(node, objectName, propertyName) {
		let checkNode = skipChainExpression(node);
		if (checkNode.type !== "MemberExpression" || objectName && !isSpecificId(checkNode.object, objectName)) return !1;
		if (propertyName) {
			let actualPropertyName = getStaticPropertyName(checkNode);
			if (typeof actualPropertyName != "string" || !checkText(actualPropertyName, propertyName)) return !1;
		}
		return !0;
	}
	/**
	* Check if two literal nodes are the same value.
	* @param {ASTNode} left The Literal node to compare.
	* @param {ASTNode} right The other Literal node to compare.
	* @returns {boolean} `true` if the two literal nodes are the same value.
	*/
	function equalLiteralValue(left, right) {
		return left.regex || right.regex ? !!(left.regex && right.regex && left.regex.pattern === right.regex.pattern && left.regex.flags === right.regex.flags) : left.bigint || right.bigint ? left.bigint === right.bigint : left.value === right.value;
	}
	/**
	* Check if two expressions reference the same value. For example:
	*     a = a
	*     a.b = a.b
	*     a[0] = a[0]
	*     a['b'] = a['b']
	* @param {ASTNode} left The left side of the comparison.
	* @param {ASTNode} right The right side of the comparison.
	* @param {boolean} [disableStaticComputedKey] Don't address `a.b` and `a["b"]` are the same if `true`. For backward compatibility.
	* @returns {boolean} `true` if both sides match and reference the same value.
	*/
	function isSameReference(left, right, disableStaticComputedKey = !1) {
		if (left.type !== right.type) return left.type === "ChainExpression" ? isSameReference(left.expression, right, disableStaticComputedKey) : right.type === "ChainExpression" ? isSameReference(left, right.expression, disableStaticComputedKey) : !1;
		switch (left.type) {
			case "Super":
			case "ThisExpression": return !0;
			case "Identifier":
			case "PrivateIdentifier": return left.name === right.name;
			case "Literal": return equalLiteralValue(left, right);
			case "ChainExpression": return isSameReference(left.expression, right.expression, disableStaticComputedKey);
			case "MemberExpression":
				if (!disableStaticComputedKey) {
					let nameA = getStaticPropertyName(left);
					if (nameA !== null) return isSameReference(left.object, right.object, disableStaticComputedKey) && nameA === getStaticPropertyName(right);
				}
				return left.computed === right.computed && isSameReference(left.object, right.object, disableStaticComputedKey) && isSameReference(left.property, right.property, disableStaticComputedKey);
			default: return !1;
		}
	}
	/**
	* Checks whether or not a node is `Reflect.apply`.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} Whether or not the node is a `Reflect.apply`.
	*/
	function isReflectApply(node) {
		return isSpecificMemberAccess(node, "Reflect", "apply");
	}
	/**
	* Checks whether or not a node is `Array.from`.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} Whether or not the node is a `Array.from`.
	*/
	function isArrayFromMethod(node) {
		return isSpecificMemberAccess(node, arrayOrTypedArrayPattern, "from");
	}
	/**
	* Checks whether or not a node is a method which expects a function as a first argument, and `thisArg` as a second argument.
	* @param {ASTNode} node A node to check.
	* @returns {boolean} Whether or not the node is a method which expects a function as a first argument, and `thisArg` as a second argument.
	*/
	function isMethodWhichHasThisArg(node) {
		return isSpecificMemberAccess(node, null, arrayMethodWithThisArgPattern);
	}
	/**
	* Creates the negate function of the given function.
	* @param {Function} f The function to negate.
	* @returns {Function} Negated function.
	*/
	function negate(f) {
		return (token) => !f(token);
	}
	/**
	* Checks whether or not a node has a `@this` tag in its comments.
	* @param {ASTNode} node A node to check.
	* @param {SourceCode} sourceCode A SourceCode instance to get comments.
	* @returns {boolean} Whether or not the node has a `@this` tag in its comments.
	*/
	function hasJSDocThisTag(node, sourceCode) {
		let jsdocComment = sourceCode.getJSDocComment(node);
		return jsdocComment && thisTagPattern.test(jsdocComment.value) ? !0 : sourceCode.getCommentsBefore(node).some((comment) => thisTagPattern.test(comment.value));
	}
	/**
	* Determines if a node is surrounded by parentheses.
	* @param {SourceCode} sourceCode The ESLint source code object
	* @param {ASTNode} node The node to be checked.
	* @returns {boolean} True if the node is parenthesised.
	* @private
	*/
	function isParenthesised(sourceCode, node) {
		let previousToken = sourceCode.getTokenBefore(node), nextToken = sourceCode.getTokenAfter(node);
		return !!(previousToken && nextToken) && previousToken.value === "(" && previousToken.range[1] <= node.range[0] && nextToken.value === ")" && nextToken.range[0] >= node.range[1];
	}
	/**
	* Checks if the given token is a `=` token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a `=` token.
	*/
	function isEqToken(token) {
		return token.value === "=" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is an arrow token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is an arrow token.
	*/
	function isArrowToken(token) {
		return token.value === "=>" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is a comma token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a comma token.
	*/
	function isCommaToken(token) {
		return token.value === "," && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is a dot token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a dot token.
	*/
	function isDotToken(token) {
		return token.value === "." && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is a `?.` token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a `?.` token.
	*/
	function isQuestionDotToken(token) {
		return token.value === "?." && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is a semicolon token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a semicolon token.
	*/
	function isSemicolonToken(token) {
		return token.value === ";" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is a colon token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a colon token.
	*/
	function isColonToken(token) {
		return token.value === ":" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is an opening parenthesis token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is an opening parenthesis token.
	*/
	function isOpeningParenToken(token) {
		return token.value === "(" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is a closing parenthesis token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a closing parenthesis token.
	*/
	function isClosingParenToken(token) {
		return token.value === ")" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is an opening square bracket token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is an opening square bracket token.
	*/
	function isOpeningBracketToken(token) {
		return token.value === "[" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is a closing square bracket token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a closing square bracket token.
	*/
	function isClosingBracketToken(token) {
		return token.value === "]" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is an opening brace token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is an opening brace token.
	*/
	function isOpeningBraceToken(token) {
		return token.value === "{" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is a closing brace token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a closing brace token.
	*/
	function isClosingBraceToken(token) {
		return token.value === "}" && token.type === "Punctuator";
	}
	/**
	* Checks if the given token is a comment token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a comment token.
	*/
	function isCommentToken(token) {
		return token.type === "Line" || token.type === "Block" || token.type === "Shebang";
	}
	/**
	* Checks if the given token is a keyword token or not.
	* @param {Token} token The token to check.
	* @returns {boolean} `true` if the token is a keyword token.
	*/
	function isKeywordToken(token) {
		return token.type === "Keyword";
	}
	/**
	* Gets the `(` token of the given function node.
	* @param {ASTNode} node The function node to get.
	* @param {SourceCode} sourceCode The source code object to get tokens.
	* @returns {Token} `(` token.
	*/
	function getOpeningParenOfParams(node, sourceCode) {
		if (node.type === "ArrowFunctionExpression" && node.params.length === 1) {
			let argToken = sourceCode.getFirstToken(node.params[0]), maybeParenToken = sourceCode.getTokenBefore(argToken);
			return isOpeningParenToken(maybeParenToken) ? maybeParenToken : argToken;
		}
		return node.id ? sourceCode.getTokenAfter(node.id, isOpeningParenToken) : sourceCode.getFirstToken(node, isOpeningParenToken);
	}
	/**
	* Checks whether or not the tokens of two given nodes are same.
	* @param {ASTNode} left A node 1 to compare.
	* @param {ASTNode} right A node 2 to compare.
	* @param {SourceCode} sourceCode The ESLint source code object.
	* @returns {boolean} the source code for the given node.
	*/
	function equalTokens(left, right, sourceCode) {
		let tokensL = sourceCode.getTokens(left), tokensR = sourceCode.getTokens(right);
		if (tokensL.length !== tokensR.length) return !1;
		for (let i = 0; i < tokensL.length; ++i) if (tokensL[i].type !== tokensR[i].type || tokensL[i].value !== tokensR[i].value) return !1;
		return !0;
	}
	/**
	* Check if the given node is a true logical expression or not.
	*
	* The three binary expressions logical-or (`||`), logical-and (`&&`), and
	* coalesce (`??`) are known as `ShortCircuitExpression`.
	* But ESTree represents those by `LogicalExpression` node.
	*
	* This function rejects coalesce expressions of `LogicalExpression` node.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is `&&` or `||`.
	* @see https://tc39.es/ecma262/#prod-ShortCircuitExpression
	*/
	function isLogicalExpression(node) {
		return node.type === "LogicalExpression" && (node.operator === "&&" || node.operator === "||");
	}
	/**
	* Check if the given node is a nullish coalescing expression or not.
	*
	* The three binary expressions logical-or (`||`), logical-and (`&&`), and
	* coalesce (`??`) are known as `ShortCircuitExpression`.
	* But ESTree represents those by `LogicalExpression` node.
	*
	* This function finds only coalesce expressions of `LogicalExpression` node.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is `??`.
	*/
	function isCoalesceExpression(node) {
		return node.type === "LogicalExpression" && node.operator === "??";
	}
	/**
	* Check if given two nodes are the pair of a logical expression and a coalesce expression.
	* @param {ASTNode} left A node to check.
	* @param {ASTNode} right Another node to check.
	* @returns {boolean} `true` if the two nodes are the pair of a logical expression and a coalesce expression.
	*/
	function isMixedLogicalAndCoalesceExpressions(left, right) {
		return isLogicalExpression(left) && isCoalesceExpression(right) || isCoalesceExpression(left) && isLogicalExpression(right);
	}
	/**
	* Checks if the given operator is a logical assignment operator.
	* @param {string} operator The operator to check.
	* @returns {boolean} `true` if the operator is a logical assignment operator.
	*/
	function isLogicalAssignmentOperator(operator) {
		return LOGICAL_ASSIGNMENT_OPERATORS.has(operator);
	}
	/**
	* Get the colon token of the given SwitchCase node.
	* @param {ASTNode} node The SwitchCase node to get.
	* @param {SourceCode} sourceCode The source code object to get tokens.
	* @returns {Token} The colon token of the node.
	*/
	function getSwitchCaseColonToken(node, sourceCode) {
		return node.test ? sourceCode.getTokenAfter(node.test, isColonToken) : sourceCode.getFirstToken(node, 1);
	}
	/**
	* Gets ESM module export name represented by the given node.
	* @param {ASTNode} node `Identifier` or string `Literal` node in a position
	* that represents a module export name:
	*   - `ImportSpecifier#imported`
	*   - `ExportSpecifier#local` (if it is a re-export from another module)
	*   - `ExportSpecifier#exported`
	*   - `ExportAllDeclaration#exported`
	* @returns {string} The module export name.
	*/
	function getModuleExportName(node) {
		return node.type === "Identifier" ? node.name : node.value;
	}
	/**
	* Returns literal's value converted to the Boolean type
	* @param {ASTNode} node any `Literal` node
	* @returns {boolean | null} `true` when node is truthy, `false` when node is falsy,
	*  `null` when it cannot be determined.
	*/
	function getBooleanValue(node) {
		return node.value === null ? node.raw === "null" ? !1 : typeof node.regex == "object" ? !0 : null : !!node.value;
	}
	/**
	* Checks if a branch node of LogicalExpression short circuits the whole condition
	* @param {ASTNode} node The branch of main condition which needs to be checked
	* @param {string} operator The operator of the main LogicalExpression.
	* @returns {boolean} true when condition short circuits whole condition
	*/
	function isLogicalIdentity(node, operator) {
		switch (node.type) {
			case "Literal": return operator === "||" && getBooleanValue(node) === !0 || operator === "&&" && getBooleanValue(node) === !1;
			case "UnaryExpression": return operator === "&&" && node.operator === "void";
			case "LogicalExpression": return operator === node.operator && (isLogicalIdentity(node.left, operator) || isLogicalIdentity(node.right, operator));
			case "AssignmentExpression": return ["||=", "&&="].includes(node.operator) && operator === node.operator.slice(0, -1) && isLogicalIdentity(node.right, operator);
		}
		return !1;
	}
	/**
	* Checks if an identifier is a reference to a global variable.
	* @param {Scope} scope The scope in which the identifier is referenced.
	* @param {ASTNode} node An identifier node to check.
	* @returns {boolean} `true` if the identifier is a reference to a global variable.
	*/
	function isReferenceToGlobalVariable(scope, node) {
		let reference = scope.references.find((ref) => ref.identifier === node);
		return !!(reference && reference.resolved && reference.resolved.scope.type === "global" && reference.resolved.defs.length === 0);
	}
	/**
	* Checks if a  node has a constant truthiness value.
	* @param {Scope} scope Scope in which the node appears.
	* @param {ASTNode} node The AST node to check.
	* @param {boolean} inBooleanPosition `true` if checking the test of a
	* condition. `false` in all other cases. When `false`, checks if -- for
	* both string and number -- if coerced to that type, the value will
	* be constant.
	* @returns {boolean} true when node's truthiness is constant
	* @private
	*/
	function isConstant(scope, node, inBooleanPosition) {
		if (!node) return !0;
		switch (node.type) {
			case "Literal":
			case "ArrowFunctionExpression":
			case "FunctionExpression": return !0;
			case "ClassExpression":
			case "ObjectExpression":
 /**
			* In theory objects like:
			*
			* `{toString: () => a}`
			* `{valueOf: () => a}`
			*
			* Or a classes like:
			*
			* `class { static toString() { return a } }`
			* `class { static valueOf() { return a } }`
			*
			* Are not constant verifiably when `inBooleanPosition` is
			* false, but it's an edge case we've opted not to handle.
			*/
			return !0;
			case "TemplateLiteral": return inBooleanPosition && node.quasis.some((quasi) => quasi.value.cooked.length) || node.expressions.every((exp) => isConstant(scope, exp, !1));
			case "ArrayExpression": return inBooleanPosition ? !0 : node.elements.every((element) => isConstant(scope, element, !1));
			case "UnaryExpression": return node.operator === "void" || node.operator === "typeof" && inBooleanPosition ? !0 : node.operator === "!" ? isConstant(scope, node.argument, !0) : isConstant(scope, node.argument, !1);
			case "BinaryExpression": return isConstant(scope, node.left, !1) && isConstant(scope, node.right, !1) && node.operator !== "in";
			case "LogicalExpression": {
				let isLeftConstant = isConstant(scope, node.left, inBooleanPosition), isRightConstant = isConstant(scope, node.right, inBooleanPosition), isLeftShortCircuit = isLeftConstant && isLogicalIdentity(node.left, node.operator), isRightShortCircuit = inBooleanPosition && isRightConstant && isLogicalIdentity(node.right, node.operator);
				return isLeftConstant && isRightConstant || isLeftShortCircuit || isRightShortCircuit;
			}
			case "NewExpression": return inBooleanPosition;
			case "AssignmentExpression": return node.operator === "=" ? isConstant(scope, node.right, inBooleanPosition) : ["||=", "&&="].includes(node.operator) && inBooleanPosition ? isLogicalIdentity(node.right, node.operator.slice(0, -1)) : !1;
			case "SequenceExpression": return isConstant(scope, node.expressions.at(-1), inBooleanPosition);
			case "SpreadElement": return isConstant(scope, node.argument, inBooleanPosition);
			case "CallExpression": return node.callee.type === "Identifier" && node.callee.name === "Boolean" && (node.arguments.length === 0 || isConstant(scope, node.arguments[0], !0)) ? isReferenceToGlobalVariable(scope, node.callee) : !1;
			case "Identifier": return node.name === "undefined" && isReferenceToGlobalVariable(scope, node);
		}
		return !1;
	}
	/**
	* Checks whether a node is an ExpressionStatement at the top level of a file, function body, or TypeScript module block.
	* A top-level ExpressionStatement node is a directive if it contains a single unparenthesized
	* string literal and if it occurs either as the first sibling or immediately after another
	* directive.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} Whether or not the node is an ExpressionStatement at the top level of a
	* file, function body, or TypeScript module block.
	*/
	function isTopLevelExpressionStatement(node) {
		if (node.type !== "ExpressionStatement") return !1;
		let parent = node.parent;
		return parent.type === "Program" || parent.type === "TSModuleBlock" || parent.type === "BlockStatement" && isFunction(parent.parent);
	}
	/**
	* Check whether the given node is a part of a directive prologue or not.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} `true` if the node is a part of directive prologue.
	*/
	function isDirective(node) {
		return node.type === "ExpressionStatement" && typeof node.directive == "string";
	}
	/**
	* Tests if a node appears at the beginning of an ancestor ExpressionStatement node.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} Whether the node appears at the beginning of an ancestor ExpressionStatement node.
	*/
	function isStartOfExpressionStatement(node) {
		let start = node.range[0], ancestor = node;
		for (; (ancestor = ancestor.parent) && ancestor.range[0] === start;) if (ancestor.type === "ExpressionStatement") return !0;
		return !1;
	}
	/**
	* Determines whether an opening parenthesis `(`, bracket `[` or backtick ``` ` ``` needs to be preceded by a semicolon.
	* This opening parenthesis or bracket should be at the start of an `ExpressionStatement`, a `MethodDefinition` or at
	* the start of the body of an `ArrowFunctionExpression`.
	* @type {(sourceCode: SourceCode, node: ASTNode) => boolean}
	* @param {SourceCode} sourceCode The source code object.
	* @param {ASTNode} node A node at the position where an opening parenthesis or bracket will be inserted.
	* @returns {boolean} Whether a semicolon is required before the opening parenthesis or bracket.
	*/
	let needsPrecedingSemicolon;
	{
		let BREAK_OR_CONTINUE = new Set(["BreakStatement", "ContinueStatement"]), DECLARATIONS = new Set([
			"ExportAllDeclaration",
			"ExportNamedDeclaration",
			"ImportDeclaration"
		]), IDENTIFIER_OR_KEYWORD = new Set(["Identifier", "Keyword"]), NODE_TYPES_BY_KEYWORD = {
			__proto__: null,
			break: "BreakStatement",
			continue: "ContinueStatement",
			debugger: "DebuggerStatement",
			do: "DoWhileStatement",
			else: "IfStatement",
			return: "ReturnStatement",
			yield: "YieldExpression"
		}, PUNCTUATORS = new Set([
			":",
			";",
			"{",
			"=>",
			"++",
			"--"
		]), STATEMENTS = new Set([
			"DoWhileStatement",
			"ForInStatement",
			"ForOfStatement",
			"ForStatement",
			"IfStatement",
			"WhileStatement",
			"WithStatement"
		]), TS_TYPE_NODE_TYPES = new Set([
			"TSAsExpression",
			"TSSatisfiesExpression",
			"TSTypeAliasDeclaration",
			"TSTypeAnnotation"
		]);
		/**
		* Determines whether a specified node is inside a TypeScript type context.
		* @param {ASTNode} node The node to check.
		* @returns {boolean} Whether the node is inside a TypeScript type context.
		*/
		function isInType(node) {
			for (let currNode = node;;) {
				let { parent } = currNode;
				if (!parent) break;
				if (TS_TYPE_NODE_TYPES.has(parent.type) && currNode === parent.typeAnnotation) return !0;
				currNode = parent;
			}
			return !1;
		}
		needsPrecedingSemicolon = function(sourceCode, node) {
			let prevToken = sourceCode.getTokenBefore(node);
			if (!prevToken || prevToken.type === "Punctuator" && PUNCTUATORS.has(prevToken.value)) return !1;
			let prevNode = sourceCode.getNodeByRangeIndex(prevToken.range[0]);
			if (prevNode.type === "TSDeclareFunction" || prevNode.parent.type === "TSImportEqualsDeclaration" || prevNode.parent.parent?.type === "TSImportEqualsDeclaration" || TS_TYPE_NODE_TYPES.has(prevNode.type) || isInType(prevNode)) return !1;
			if (isClosingParenToken(prevToken)) return !STATEMENTS.has(prevNode.type);
			if (isClosingBraceToken(prevToken)) return prevNode.type === "BlockStatement" && prevNode.parent.type === "FunctionExpression" && prevNode.parent.parent.type !== "MethodDefinition" || prevNode.type === "ClassBody" && prevNode.parent.type === "ClassExpression" || prevNode.type === "ObjectExpression";
			if (IDENTIFIER_OR_KEYWORD.has(prevToken.type)) {
				if (prevNode.parent.type === "VariableDeclarator" && !prevNode.parent.init || BREAK_OR_CONTINUE.has(prevNode.parent.type)) return !1;
				let nodeType = NODE_TYPES_BY_KEYWORD[prevToken.value];
				return prevNode.type !== nodeType;
			}
			return prevToken.type === "String" ? !DECLARATIONS.has(prevNode.parent.type) : !0;
		};
	}
	/**
	* Checks if a node is used as an import attribute key, either in a static or dynamic import.
	* @param {ASTNode} node The node to check.
	* @returns {boolean} Whether the node is used as an import attribute key.
	*/
	function isImportAttributeKey(node) {
		let { parent } = node;
		if (parent.type === "ImportAttribute" && parent.key === node) return !0;
		if (parent.type === "Property" && !parent.computed && (parent.key === node || parent.value === node && parent.shorthand && !parent.method) && parent.parent.type === "ObjectExpression") {
			let objectExpression = parent.parent, objectExpressionParent = objectExpression.parent;
			if (objectExpressionParent.type === "ImportExpression" && objectExpressionParent.options === objectExpression) return !0;
			if (objectExpressionParent.type === "Property" && objectExpressionParent.value === objectExpression) return isImportAttributeKey(objectExpressionParent.key);
		}
		return !1;
	}
	module.exports = {
		COMMENTS_IGNORE_PATTERN,
		LINEBREAKS,
		LINEBREAK_MATCHER: lineBreakPattern,
		SHEBANG_MATCHER: shebangPattern,
		STATEMENT_LIST_PARENTS,
		ECMASCRIPT_GLOBALS,
		isTokenOnSameLine(left, right) {
			return left.loc.end.line === right.loc.start.line;
		},
		isNullOrUndefined,
		isCallee,
		isES5Constructor,
		getUpperFunction,
		isFunction,
		isLoop,
		isInLoop,
		isArrayFromMethod,
		isParenthesised,
		createGlobalLinebreakMatcher,
		equalTokens,
		isArrowToken,
		isClosingBraceToken,
		isClosingBracketToken,
		isClosingParenToken,
		isColonToken,
		isCommaToken,
		isCommentToken,
		isDotToken,
		isQuestionDotToken,
		isKeywordToken,
		isNotClosingBraceToken: negate(isClosingBraceToken),
		isNotClosingBracketToken: negate(isClosingBracketToken),
		isNotClosingParenToken: negate(isClosingParenToken),
		isNotColonToken: negate(isColonToken),
		isNotCommaToken: negate(isCommaToken),
		isNotDotToken: negate(isDotToken),
		isNotQuestionDotToken: negate(isQuestionDotToken),
		isNotOpeningBraceToken: negate(isOpeningBraceToken),
		isNotOpeningBracketToken: negate(isOpeningBracketToken),
		isNotOpeningParenToken: negate(isOpeningParenToken),
		isNotSemicolonToken: negate(isSemicolonToken),
		isOpeningBraceToken,
		isOpeningBracketToken,
		isOpeningParenToken,
		isSemicolonToken,
		isEqToken,
		isStringLiteral(node) {
			return node.type === "Literal" && typeof node.value == "string" || node.type === "TemplateLiteral";
		},
		isBreakableStatement(node) {
			return breakableTypePattern.test(node.type);
		},
		getModifyingReferences(references) {
			return references.filter(isModifyingReference);
		},
		isSurroundedBy(val, character) {
			return val[0] === character && val.at(-1) === character;
		},
		isDirectiveComment(node) {
			let comment = node.value.trim();
			return node.type === "Line" && comment.startsWith("eslint-") || node.type === "Block" && ESLINT_DIRECTIVE_PATTERN.test(comment);
		},
		getTrailingStatement: esutils.ast.trailingStatement,
		getVariableByName(initScope, name) {
			let scope = initScope;
			for (; scope;) {
				let variable = scope.set.get(name);
				if (variable) return variable;
				scope = scope.upper;
			}
			return null;
		},
		isDefaultThisBinding(node, sourceCode, { capIsConstructor = !0 } = {}) {
			if (node.parent.type === "PropertyDefinition" && node.parent.value === node || node.type === "StaticBlock" || (node.type === "FunctionDeclaration" || node.type === "FunctionExpression") && node.params.some((param) => param.type === "Identifier" && param.name === "this") || capIsConstructor && isES5Constructor(node) || hasJSDocThisTag(node, sourceCode)) return !1;
			let isAnonymous = node.id === null, currentNode = node;
			for (; currentNode;) {
				let parent = currentNode.parent;
				switch (parent.type) {
					case "LogicalExpression":
					case "ConditionalExpression":
					case "ChainExpression":
						currentNode = parent;
						break;
					case "ReturnStatement": {
						let func = getUpperFunction(parent);
						if (func === null || !isCallee(func)) return !0;
						currentNode = func.parent;
						break;
					}
					case "ArrowFunctionExpression":
						if (currentNode !== parent.body || !isCallee(parent)) return !0;
						currentNode = parent.parent;
						break;
					case "Property":
					case "PropertyDefinition":
					case "MethodDefinition": return parent.value !== currentNode;
					case "AssignmentExpression":
					case "AssignmentPattern": return !(parent.left.type === "MemberExpression" || capIsConstructor && isAnonymous && parent.left.type === "Identifier" && startsWithUpperCase(parent.left.name));
					case "VariableDeclarator": return !(capIsConstructor && isAnonymous && parent.init === currentNode && parent.id.type === "Identifier" && startsWithUpperCase(parent.id.name));
					case "MemberExpression":
						if (parent.object === currentNode && isSpecificMemberAccess(parent, null, bindOrCallOrApplyPattern)) {
							let maybeCalleeNode = parent.parent.type === "ChainExpression" ? parent.parent : parent;
							return !(isCallee(maybeCalleeNode) && maybeCalleeNode.parent.arguments.length >= 1 && !isNullOrUndefined(maybeCalleeNode.parent.arguments[0]));
						}
						return !0;
					case "CallExpression": return isReflectApply(parent.callee) ? parent.arguments.length !== 3 || parent.arguments[0] !== currentNode || isNullOrUndefined(parent.arguments[1]) : isArrayFromMethod(parent.callee) ? parent.arguments.length !== 3 || parent.arguments[1] !== currentNode || isNullOrUndefined(parent.arguments[2]) : isMethodWhichHasThisArg(parent.callee) ? parent.arguments.length !== 2 || parent.arguments[0] !== currentNode || isNullOrUndefined(parent.arguments[1]) : !0;
					default: return !0;
				}
			}
			/* c8 ignore next */
			return !0;
		},
		getPrecedence(node) {
			switch (node.type) {
				case "SequenceExpression": return 0;
				case "AssignmentExpression":
				case "ArrowFunctionExpression":
				case "YieldExpression": return 1;
				case "ConditionalExpression": return 3;
				case "LogicalExpression": switch (node.operator) {
					case "||":
					case "??": return 4;
					case "&&": return 5;
				}
				case "BinaryExpression": switch (node.operator) {
					case "|": return 6;
					case "^": return 7;
					case "&": return 8;
					case "==":
					case "!=":
					case "===":
					case "!==": return 9;
					case "<":
					case "<=":
					case ">":
					case ">=":
					case "in":
					case "instanceof": return 10;
					case "<<":
					case ">>":
					case ">>>": return 11;
					case "+":
					case "-": return 12;
					case "*":
					case "/":
					case "%": return 13;
					case "**": return 15;
				}
				case "UnaryExpression":
				case "AwaitExpression": return 16;
				case "UpdateExpression": return 17;
				case "CallExpression":
				case "ChainExpression":
				case "ImportExpression": return 18;
				case "NewExpression": return 19;
				default: return node.type in eslintVisitorKeys ? 20 : -1;
			}
		},
		isEmptyBlock(node) {
			return !!(node && node.type === "BlockStatement" && node.body.length === 0);
		},
		isEmptyFunction(node) {
			return isFunction(node) && module.exports.isEmptyBlock(node.body);
		},
		getDirectivePrologue(node) {
			let directives = [];
			if (node.type === "Program" || node.type === "FunctionDeclaration" || node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression" && node.body.type === "BlockStatement") {
				let statements = node.type === "Program" ? node.body : node.body.body;
				for (let statement of statements) if (statement.type === "ExpressionStatement" && statement.expression.type === "Literal") directives.push(statement);
				else break;
			}
			return directives;
		},
		isDecimalInteger(node) {
			return node.type === "Literal" && typeof node.value == "number" && DECIMAL_INTEGER_PATTERN.test(node.raw);
		},
		isDecimalIntegerNumericToken(token) {
			return token.type === "Numeric" && DECIMAL_INTEGER_PATTERN.test(token.value);
		},
		getFunctionNameWithKind(node) {
			let parent = node.parent, tokens = [];
			if ((parent.type === "MethodDefinition" || parent.type === "PropertyDefinition" || node.type === "TSPropertySignature" || node.type === "TSMethodSignature") && (parent.static && tokens.push("static"), !parent.computed && parent.key?.type === "PrivateIdentifier" && tokens.push("private")), node.async && tokens.push("async"), node.generator && tokens.push("generator"), parent.type === "Property" || parent.type === "MethodDefinition") {
				if (parent.kind === "constructor") return "constructor";
				parent.kind === "get" ? tokens.push("getter") : parent.kind === "set" ? tokens.push("setter") : tokens.push("method");
			} else node.type === "TSMethodSignature" ? node.kind === "get" ? tokens.push("getter") : node.kind === "set" ? tokens.push("setter") : tokens.push("method") : parent.type === "PropertyDefinition" ? tokens.push("method") : (node.type === "ArrowFunctionExpression" && tokens.push("arrow"), tokens.push("function"));
			if (parent.type === "Property" || parent.type === "MethodDefinition" || parent.type === "PropertyDefinition") if (!parent.computed && parent.key.type === "PrivateIdentifier") tokens.push(`#${parent.key.name}`);
			else {
				let name = getStaticPropertyName(parent);
				name === null ? node.id && tokens.push(`'${node.id.name}'`) : tokens.push(`'${name}'`);
			}
			else node.type === "TSMethodSignature" ? tokens.push(`'${getStaticPropertyName(node)}'`) : node.id && tokens.push(`'${node.id.name}'`);
			return tokens.join(" ");
		},
		getFunctionHeadLoc(node, sourceCode) {
			let parent = node.parent, start, end;
			if (parent.type === "Property" || parent.type === "MethodDefinition" || parent.type === "PropertyDefinition" || parent.type === "TSPropertySignature" || parent.type === "TSMethodSignature") start = parent.loc.start, end = getOpeningParenOfParams(node, sourceCode).loc.start;
			else if (node.type === "ArrowFunctionExpression") {
				let arrowToken = sourceCode.getTokenBefore(node.body, isArrowToken);
				start = arrowToken.loc.start, end = arrowToken.loc.end;
			} else start = node.loc.start, end = getOpeningParenOfParams(node, sourceCode).loc.start;
			return {
				start: Object.assign({}, start),
				end: Object.assign({}, end)
			};
		},
		getNextLocation(sourceCode, { line, column }) {
			return column < sourceCode.lines[line - 1].length ? {
				line,
				column: column + 1
			} : line < sourceCode.lines.length ? {
				line: line + 1,
				column: 0
			} : null;
		},
		getParenthesisedText(sourceCode, node) {
			let leftToken = sourceCode.getFirstToken(node), rightToken = sourceCode.getLastToken(node);
			for (; sourceCode.getTokenBefore(leftToken) && sourceCode.getTokenBefore(leftToken).type === "Punctuator" && sourceCode.getTokenBefore(leftToken).value === "(" && sourceCode.getTokenAfter(rightToken) && sourceCode.getTokenAfter(rightToken).type === "Punctuator" && sourceCode.getTokenAfter(rightToken).value === ")";) leftToken = sourceCode.getTokenBefore(leftToken), rightToken = sourceCode.getTokenAfter(rightToken);
			return sourceCode.getText().slice(leftToken.range[0], rightToken.range[1]);
		},
		couldBeError(node) {
			switch (node.type) {
				case "Identifier":
				case "CallExpression":
				case "NewExpression":
				case "MemberExpression":
				case "TaggedTemplateExpression":
				case "YieldExpression":
				case "AwaitExpression":
				case "ChainExpression": return !0;
				case "AssignmentExpression":
 /**
				* All other assignment operators are mathematical assignment operators (arithmetic or bitwise).
				* An assignment expression with a mathematical operator can either evaluate to a primitive value,
				* or throw, depending on the operands. Thus, it cannot evaluate to an `Error` object.
				*/
				return ["=", "&&="].includes(node.operator) ? module.exports.couldBeError(node.right) : ["||=", "??="].includes(node.operator) ? module.exports.couldBeError(node.left) || module.exports.couldBeError(node.right) : !1;
				case "SequenceExpression": {
					let exprs = node.expressions;
					return exprs.length !== 0 && module.exports.couldBeError(exprs.at(-1));
				}
				case "LogicalExpression": return node.operator === "&&" ? module.exports.couldBeError(node.right) : module.exports.couldBeError(node.left) || module.exports.couldBeError(node.right);
				case "ConditionalExpression": return module.exports.couldBeError(node.consequent) || module.exports.couldBeError(node.alternate);
				default: return !1;
			}
		},
		isNumericLiteral(node) {
			return node.type === "Literal" && (typeof node.value == "number" || !!node.bigint);
		},
		canTokensBeAdjacent(leftValue, rightValue) {
			let espreeOptions = {
				ecmaVersion: espree.latestEcmaVersion,
				comment: !0,
				range: !0
			}, leftToken;
			if (typeof leftValue == "string") {
				let tokens;
				try {
					tokens = espree.tokenize(leftValue, espreeOptions);
				} catch {
					return !1;
				}
				let comments = tokens.comments;
				if (leftToken = tokens.at(-1), comments.length) {
					let lastComment = comments.at(-1);
					(!leftToken || lastComment.range[0] > leftToken.range[0]) && (leftToken = lastComment);
				}
			} else leftToken = leftValue;
			if (leftToken.type === "Shebang" || leftToken.type === "Hashbang") return !1;
			let rightToken;
			if (typeof rightValue == "string") {
				let tokens;
				try {
					tokens = espree.tokenize(rightValue, espreeOptions);
				} catch {
					return !1;
				}
				let comments = tokens.comments;
				if (rightToken = tokens[0], comments.length) {
					let firstComment = comments[0];
					(!rightToken || firstComment.range[0] < rightToken.range[0]) && (rightToken = firstComment);
				}
			} else rightToken = rightValue;
			if (leftToken.type === "Punctuator" || rightToken.type === "Punctuator") {
				if (leftToken.type === "Punctuator" && rightToken.type === "Punctuator") {
					let PLUS_TOKENS = new Set(["+", "++"]), MINUS_TOKENS = new Set(["-", "--"]);
					return !(PLUS_TOKENS.has(leftToken.value) && PLUS_TOKENS.has(rightToken.value) || MINUS_TOKENS.has(leftToken.value) && MINUS_TOKENS.has(rightToken.value));
				}
				return leftToken.type === "Punctuator" && leftToken.value === "/" ? ![
					"Block",
					"Line",
					"RegularExpression"
				].includes(rightToken.type) : !0;
			}
			return !!(leftToken.type === "String" || rightToken.type === "String" || leftToken.type === "Template" || rightToken.type === "Template" || leftToken.type !== "Numeric" && rightToken.type === "Numeric" && rightToken.value.startsWith(".") || leftToken.type === "Block" || rightToken.type === "Block" || rightToken.type === "Line" || rightToken.type === "PrivateIdentifier");
		},
		getNameLocationInGlobalDirectiveComment(sourceCode, comment, name) {
			let namePattern = RegExp(`[\\s,]${escapeRegExp(name)}(?:$|[\\s,:])`, "gu");
			namePattern.lastIndex = comment.value.indexOf("global") + 6;
			let match = namePattern.exec(comment.value), start = sourceCode.getLocFromIndex(comment.range[0] + 2 + (match ? match.index + 1 : 0));
			return {
				start,
				end: {
					line: start.line,
					column: start.column + (match ? name.length : 1)
				}
			};
		},
		hasOctalOrNonOctalDecimalEscapeSequence(rawString) {
			return OCTAL_OR_NON_OCTAL_DECIMAL_ESCAPE_PATTERN.test(rawString);
		},
		isStaticTemplateLiteral(node) {
			return node.type === "TemplateLiteral" && node.expressions.length === 0;
		},
		areBracesNecessary(node, sourceCode) {
			/**
			* Determines if the given node is a lexical declaration (let, const, using, await using, function, or class)
			* @param {ASTNode} nodeToCheck The node to check
			* @returns {boolean} True if the node is a lexical declaration
			* @private
			*/
			function isLexicalDeclaration(nodeToCheck) {
				return nodeToCheck.type === "VariableDeclaration" ? LEXICAL_DECLARATION_KINDS.has(nodeToCheck.kind) : nodeToCheck.type === "FunctionDeclaration" || nodeToCheck.type === "ClassDeclaration";
			}
			/**
			* Checks if the given token is an `else` token or not.
			* @param {Token} token The token to check.
			* @returns {boolean} `true` if the token is an `else` token.
			*/
			function isElseKeywordToken(token) {
				return token.value === "else" && token.type === "Keyword";
			}
			/**
			* Determines whether the given node has an `else` keyword token as the first token after.
			* @param {ASTNode} nodeToCheck The node to check.
			* @returns {boolean} `true` if the node is followed by an `else` keyword token.
			*/
			function isFollowedByElseKeyword(nodeToCheck) {
				let nextToken = sourceCode.getTokenAfter(nodeToCheck);
				return !!nextToken && isElseKeywordToken(nextToken);
			}
			/**
			* Determines whether the code represented by the given node contains an `if` statement
			* that would become associated with an `else` keyword directly appended to that code.
			*
			* Examples where it returns `true`:
			*
			*    if (a)
			*        foo();
			*
			*    if (a) {
			*        foo();
			*    }
			*
			*    if (a)
			*        foo();
			*    else if (b)
			*        bar();
			*
			*    while (a)
			*        if (b)
			*            if(c)
			*                foo();
			*            else
			*                bar();
			*
			* Examples where it returns `false`:
			*
			*    if (a)
			*        foo();
			*    else
			*        bar();
			*
			*    while (a) {
			*        if (b)
			*            if(c)
			*                foo();
			*            else
			*                bar();
			*    }
			*
			*    while (a)
			*        if (b) {
			*            if(c)
			*                foo();
			*        }
			*        else
			*            bar();
			* @param {ASTNode} nodeToCheck Node representing the code to check.
			* @returns {boolean} `true` if an `if` statement within the code would become associated with an `else` appended to that code.
			*/
			function hasUnsafeIf(nodeToCheck) {
				switch (nodeToCheck.type) {
					case "IfStatement": return nodeToCheck.alternate ? hasUnsafeIf(nodeToCheck.alternate) : !0;
					case "ForStatement":
					case "ForInStatement":
					case "ForOfStatement":
					case "LabeledStatement":
					case "WithStatement":
					case "WhileStatement": return hasUnsafeIf(nodeToCheck.body);
					default: return !1;
				}
			}
			let statement = node.body[0];
			return isLexicalDeclaration(statement) || hasUnsafeIf(statement) && isFollowedByElseKeyword(node);
		},
		isReferenceToGlobalVariable,
		isLogicalExpression,
		isCoalesceExpression,
		isMixedLogicalAndCoalesceExpressions,
		isNullLiteral,
		getStaticStringValue,
		getStaticPropertyName,
		skipChainExpression,
		isSpecificId,
		isSpecificMemberAccess,
		equalLiteralValue,
		isSameReference,
		isLogicalAssignmentOperator,
		getSwitchCaseColonToken,
		getModuleExportName,
		isConstant,
		isTopLevelExpressionStatement,
		isDirective,
		isStartOfExpressionStatement,
		needsPrecedingSemicolon,
		isImportAttributeKey,
		getOpeningParenOfParams
	};
}));
Object.defineProperty(exports, "a", {
	enumerable: !0,
	get: function() {
		return require_eslint_visitor_keys;
	}
}), Object.defineProperty(exports, "i", {
	enumerable: !0,
	get: function() {
		return require_utils;
	}
}), Object.defineProperty(exports, "n", {
	enumerable: !0,
	get: function() {
		return require_escape_string_regexp;
	}
}), Object.defineProperty(exports, "r", {
	enumerable: !0,
	get: function() {
		return require_espree;
	}
}), Object.defineProperty(exports, "t", {
	enumerable: !0,
	get: function() {
		return require_ast_utils;
	}
});
