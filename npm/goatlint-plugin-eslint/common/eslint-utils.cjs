const require_chunk = require("./chunk.cjs");
//#region ../../node_modules/.pnpm/eslint-visitor-keys@3.4.3/node_modules/eslint-visitor-keys/dist/eslint-visitor-keys.cjs
var require_eslint_visitor_keys = /* @__PURE__ */ require_chunk.t(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
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
		ExportAllDeclaration: ["exported", "source"],
		ExportDefaultDeclaration: ["declaration"],
		ExportNamedDeclaration: [
			"declaration",
			"specifiers",
			"source"
		],
		ExportSpecifier: ["exported", "local"],
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
		ImportDeclaration: ["specifiers", "source"],
		ImportDefaultSpecifier: ["local"],
		ImportExpression: ["source"],
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
	* @param {object} node The AST node to get keys.
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
		for (let type of Object.keys(additionalKeys)) if (Object.prototype.hasOwnProperty.call(retv, type)) {
			let keys = new Set(additionalKeys[type]);
			for (let key of retv[type]) keys.add(key);
			retv[type] = Object.freeze(Array.from(keys));
		} else retv[type] = Object.freeze(Array.from(additionalKeys[type]));
		return Object.freeze(retv);
	}
	exports.KEYS = KEYS, exports.getKeys = getKeys, exports.unionWith = unionWith;
})), require_eslint_utils = /* @__PURE__ */ require_chunk.t(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	var eslintVisitorKeys = require_eslint_visitor_keys();
	/** @typedef {import("eslint").Scope.Scope} Scope */
	/** @typedef {import("estree").Node} Node */
	/**
	* Get the innermost scope which contains a given location.
	* @param {Scope} initialScope The initial scope to search.
	* @param {Node} node The location to search.
	* @returns {Scope} The innermost scope.
	*/
	function getInnermostScope(initialScope, node) {
		let location = node.range[0], scope = initialScope, found = !1;
		do {
			found = !1;
			for (let childScope of scope.childScopes) {
				let range = childScope.block.range;
				if (range[0] <= location && location < range[1]) {
					scope = childScope, found = !0;
					break;
				}
			}
		} while (found);
		return scope;
	}
	/** @typedef {import("eslint").Scope.Scope} Scope */
	/** @typedef {import("eslint").Scope.Variable} Variable */
	/** @typedef {import("estree").Identifier} Identifier */
	/**
	* Find the variable of a given name.
	* @param {Scope} initialScope The scope to start finding.
	* @param {string|Identifier} nameOrNode The variable name to find. If this is a Node object then it should be an Identifier node.
	* @returns {Variable|null} The found variable or null.
	*/
	function findVariable(initialScope, nameOrNode) {
		let name = "", scope = initialScope;
		for (typeof nameOrNode == "string" ? name = nameOrNode : (name = nameOrNode.name, scope = getInnermostScope(scope, nameOrNode)); scope != null;) {
			let variable = scope.set.get(name);
			if (variable != null) return variable;
			scope = scope.upper;
		}
		return null;
	}
	/** @typedef {import("eslint").AST.Token} Token */
	/** @typedef {import("estree").Comment} Comment */
	/** @typedef {import("./types.mjs").ArrowToken} ArrowToken */
	/** @typedef {import("./types.mjs").CommaToken} CommaToken */
	/** @typedef {import("./types.mjs").SemicolonToken} SemicolonToken */
	/** @typedef {import("./types.mjs").ColonToken} ColonToken */
	/** @typedef {import("./types.mjs").OpeningParenToken} OpeningParenToken */
	/** @typedef {import("./types.mjs").ClosingParenToken} ClosingParenToken */
	/** @typedef {import("./types.mjs").OpeningBracketToken} OpeningBracketToken */
	/** @typedef {import("./types.mjs").ClosingBracketToken} ClosingBracketToken */
	/** @typedef {import("./types.mjs").OpeningBraceToken} OpeningBraceToken */
	/** @typedef {import("./types.mjs").ClosingBraceToken} ClosingBraceToken */
	/**
	* @template {string} Value
	* @typedef {import("./types.mjs").PunctuatorToken<Value>} PunctuatorToken
	*/
	/** @typedef {Comment | Token} CommentOrToken */
	/**
	* Creates the negate function of the given function.
	* @param {function(CommentOrToken):boolean} f - The function to negate.
	* @returns {function(CommentOrToken):boolean} Negated function.
	*/
	function negate(f) {
		return (token) => !f(token);
	}
	/**
	* Checks if the given token is a PunctuatorToken with the given value
	* @template {string} Value
	* @param {CommentOrToken} token - The token to check.
	* @param {Value} value - The value to check.
	* @returns {token is PunctuatorToken<Value>} `true` if the token is a PunctuatorToken with the given value.
	*/
	function isPunctuatorTokenWithValue(token, value) {
		return token.type === "Punctuator" && token.value === value;
	}
	/**
	* Checks if the given token is an arrow token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is ArrowToken} `true` if the token is an arrow token.
	*/
	function isArrowToken(token) {
		return isPunctuatorTokenWithValue(token, "=>");
	}
	/**
	* Checks if the given token is a comma token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is CommaToken} `true` if the token is a comma token.
	*/
	function isCommaToken(token) {
		return isPunctuatorTokenWithValue(token, ",");
	}
	/**
	* Checks if the given token is a semicolon token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is SemicolonToken} `true` if the token is a semicolon token.
	*/
	function isSemicolonToken(token) {
		return isPunctuatorTokenWithValue(token, ";");
	}
	/**
	* Checks if the given token is a colon token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is ColonToken} `true` if the token is a colon token.
	*/
	function isColonToken(token) {
		return isPunctuatorTokenWithValue(token, ":");
	}
	/**
	* Checks if the given token is an opening parenthesis token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is OpeningParenToken} `true` if the token is an opening parenthesis token.
	*/
	function isOpeningParenToken(token) {
		return isPunctuatorTokenWithValue(token, "(");
	}
	/**
	* Checks if the given token is a closing parenthesis token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is ClosingParenToken} `true` if the token is a closing parenthesis token.
	*/
	function isClosingParenToken(token) {
		return isPunctuatorTokenWithValue(token, ")");
	}
	/**
	* Checks if the given token is an opening square bracket token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is OpeningBracketToken} `true` if the token is an opening square bracket token.
	*/
	function isOpeningBracketToken(token) {
		return isPunctuatorTokenWithValue(token, "[");
	}
	/**
	* Checks if the given token is a closing square bracket token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is ClosingBracketToken} `true` if the token is a closing square bracket token.
	*/
	function isClosingBracketToken(token) {
		return isPunctuatorTokenWithValue(token, "]");
	}
	/**
	* Checks if the given token is an opening brace token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is OpeningBraceToken} `true` if the token is an opening brace token.
	*/
	function isOpeningBraceToken(token) {
		return isPunctuatorTokenWithValue(token, "{");
	}
	/**
	* Checks if the given token is a closing brace token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is ClosingBraceToken} `true` if the token is a closing brace token.
	*/
	function isClosingBraceToken(token) {
		return isPunctuatorTokenWithValue(token, "}");
	}
	/**
	* Checks if the given token is a comment token or not.
	* @param {CommentOrToken} token - The token to check.
	* @returns {token is Comment} `true` if the token is a comment token.
	*/
	function isCommentToken(token) {
		return [
			"Block",
			"Line",
			"Shebang"
		].includes(token.type);
	}
	let isNotArrowToken = negate(isArrowToken), isNotCommaToken = negate(isCommaToken), isNotSemicolonToken = negate(isSemicolonToken), isNotColonToken = negate(isColonToken), isNotOpeningParenToken = negate(isOpeningParenToken), isNotClosingParenToken = negate(isClosingParenToken), isNotOpeningBracketToken = negate(isOpeningBracketToken), isNotClosingBracketToken = negate(isClosingBracketToken), isNotOpeningBraceToken = negate(isOpeningBraceToken), isNotClosingBraceToken = negate(isClosingBraceToken), isNotCommentToken = negate(isCommentToken);
	/** @typedef {import("eslint").Rule.Node} RuleNode */
	/** @typedef {import("eslint").SourceCode} SourceCode */
	/** @typedef {import("eslint").AST.Token} Token */
	/** @typedef {import("estree").Function} FunctionNode */
	/** @typedef {import("estree").FunctionDeclaration} FunctionDeclaration */
	/** @typedef {import("estree").FunctionExpression} FunctionExpression */
	/** @typedef {import("estree").SourceLocation} SourceLocation */
	/** @typedef {import("estree").Position} Position */
	/**
	* Get the `(` token of the given function node.
	* @param {FunctionExpression | FunctionDeclaration} node - The function node to get.
	* @param {SourceCode} sourceCode - The source code object to get tokens.
	* @returns {Token} `(` token.
	*/
	function getOpeningParenOfParams(node, sourceCode) {
		return node.id ? sourceCode.getTokenAfter(node.id, isOpeningParenToken) : sourceCode.getFirstToken(node, isOpeningParenToken);
	}
	/**
	* Get the location of the given function node for reporting.
	* @param {FunctionNode} node - The function node to get.
	* @param {SourceCode} sourceCode - The source code object to get tokens.
	* @returns {SourceLocation|null} The location of the function node for reporting.
	*/
	function getFunctionHeadLocation(node, sourceCode) {
		let parent = node.parent, start = null, end = null;
		if (node.type === "ArrowFunctionExpression") {
			let arrowToken = sourceCode.getTokenBefore(node.body, isArrowToken);
			start = arrowToken.loc.start, end = arrowToken.loc.end;
		} else parent && (parent.type === "Property" || parent.type === "MethodDefinition" || parent.type === "PropertyDefinition") ? (start = parent.loc.start, end = getOpeningParenOfParams(node, sourceCode).loc.start) : (start = node.loc.start, end = getOpeningParenOfParams(node, sourceCode).loc.start);
		return {
			start: { ...start },
			end: { ...end }
		};
	}
	/** @typedef {import("./types.mjs").StaticValue} StaticValue */
	/** @typedef {import("eslint").Scope.Scope} Scope */
	/** @typedef {import("eslint").Scope.Variable} Variable */
	/** @typedef {import("estree").Node} Node */
	/** @typedef {import("@typescript-eslint/types").TSESTree.Node} TSESTreeNode */
	/** @typedef {import("@typescript-eslint/types").TSESTree.AST_NODE_TYPES} TSESTreeNodeTypes */
	/** @typedef {import("@typescript-eslint/types").TSESTree.MemberExpression} MemberExpression */
	/** @typedef {import("@typescript-eslint/types").TSESTree.Property} Property */
	/** @typedef {import("@typescript-eslint/types").TSESTree.RegExpLiteral} RegExpLiteral */
	/** @typedef {import("@typescript-eslint/types").TSESTree.BigIntLiteral} BigIntLiteral */
	/** @typedef {import("@typescript-eslint/types").TSESTree.Literal} Literal */
	let globalObject = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}, builtinNames = Object.freeze(new Set(/* @__PURE__ */ "Array.ArrayBuffer.BigInt.BigInt64Array.BigUint64Array.Boolean.DataView.Date.decodeURI.decodeURIComponent.encodeURI.encodeURIComponent.escape.Float32Array.Float64Array.Function.Infinity.Int16Array.Int32Array.Int8Array.isFinite.isNaN.isPrototypeOf.JSON.Map.Math.NaN.Number.Object.parseFloat.parseInt.Promise.Proxy.Reflect.RegExp.Set.String.Symbol.Uint16Array.Uint32Array.Uint8Array.Uint8ClampedArray.undefined.unescape.WeakMap.WeakSet".split("."))), callAllowed = new Set([
		Array.isArray,
		Array.of,
		Array.prototype.at,
		Array.prototype.concat,
		Array.prototype.entries,
		Array.prototype.every,
		Array.prototype.filter,
		Array.prototype.find,
		Array.prototype.findIndex,
		Array.prototype.flat,
		Array.prototype.includes,
		Array.prototype.indexOf,
		Array.prototype.join,
		Array.prototype.keys,
		Array.prototype.lastIndexOf,
		Array.prototype.slice,
		Array.prototype.some,
		Array.prototype.toString,
		Array.prototype.values,
		typeof BigInt == "function" ? BigInt : void 0,
		Boolean,
		Date,
		Date.parse,
		decodeURI,
		decodeURIComponent,
		encodeURI,
		encodeURIComponent,
		escape,
		isFinite,
		isNaN,
		isPrototypeOf,
		Map,
		Map.prototype.entries,
		Map.prototype.get,
		Map.prototype.has,
		Map.prototype.keys,
		Map.prototype.values,
		...Object.getOwnPropertyNames(Math).filter((k) => k !== "random").map((k) => Math[k]).filter((f) => typeof f == "function"),
		Number,
		Number.isFinite,
		Number.isNaN,
		Number.parseFloat,
		Number.parseInt,
		Number.prototype.toExponential,
		Number.prototype.toFixed,
		Number.prototype.toPrecision,
		Number.prototype.toString,
		Object,
		Object.entries,
		Object.is,
		Object.isExtensible,
		Object.isFrozen,
		Object.isSealed,
		Object.keys,
		Object.values,
		parseFloat,
		parseInt,
		RegExp,
		Set,
		Set.prototype.entries,
		Set.prototype.has,
		Set.prototype.keys,
		Set.prototype.values,
		String,
		String.fromCharCode,
		String.fromCodePoint,
		String.raw,
		String.prototype.at,
		String.prototype.charAt,
		String.prototype.charCodeAt,
		String.prototype.codePointAt,
		String.prototype.concat,
		String.prototype.endsWith,
		String.prototype.includes,
		String.prototype.indexOf,
		String.prototype.lastIndexOf,
		String.prototype.normalize,
		String.prototype.padEnd,
		String.prototype.padStart,
		String.prototype.slice,
		String.prototype.startsWith,
		String.prototype.substr,
		String.prototype.substring,
		String.prototype.toLowerCase,
		String.prototype.toString,
		String.prototype.toUpperCase,
		String.prototype.trim,
		String.prototype.trimEnd,
		String.prototype.trimLeft,
		String.prototype.trimRight,
		String.prototype.trimStart,
		Symbol.for,
		Symbol.keyFor,
		unescape
	].filter((f) => typeof f == "function")), callPassThrough = new Set([
		Object.freeze,
		Object.preventExtensions,
		Object.seal
	]), getterAllowed = [
		[Map, new Set(["size"])],
		[RegExp, new Set([
			"dotAll",
			"flags",
			"global",
			"hasIndices",
			"ignoreCase",
			"multiline",
			"source",
			"sticky",
			"unicode"
		])],
		[Set, new Set(["size"])]
	];
	/**
	* Get the property descriptor.
	* @param {object} object The object to get.
	* @param {string|number|symbol} name The property name to get.
	*/
	function getPropertyDescriptor(object, name) {
		let x = object;
		for (; (typeof x == "object" || typeof x == "function") && x !== null;) {
			let d = Object.getOwnPropertyDescriptor(x, name);
			if (d) return d;
			x = Object.getPrototypeOf(x);
		}
		return null;
	}
	/**
	* Check if a property is getter or not.
	* @param {object} object The object to check.
	* @param {string|number|symbol} name The property name to check.
	*/
	function isGetter(object, name) {
		let d = getPropertyDescriptor(object, name);
		return d != null && d.get != null;
	}
	/**
	* Get the element values of a given node list.
	* @param {(Node|TSESTreeNode|null)[]} nodeList The node list to get values.
	* @param {Scope|undefined|null} initialScope The initial scope to find variables.
	* @returns {any[]|null} The value list if all nodes are constant. Otherwise, null.
	*/
	function getElementValues(nodeList, initialScope) {
		let valueList = [];
		for (let i = 0; i < nodeList.length; ++i) {
			let elementNode = nodeList[i];
			if (elementNode == null) valueList.length = i + 1;
			else if (elementNode.type === "SpreadElement") {
				let argument = getStaticValueR(elementNode.argument, initialScope);
				if (argument == null) return null;
				valueList.push(...argument.value);
			} else {
				let element = getStaticValueR(elementNode, initialScope);
				if (element == null) return null;
				valueList.push(element.value);
			}
		}
		return valueList;
	}
	/**
	* Checks if a variable is a built-in global.
	* @param {Variable|null} variable The variable to check.
	* @returns {variable is Variable & {defs:[]}}
	*/
	function isBuiltinGlobal(variable) {
		return variable != null && variable.defs.length === 0 && builtinNames.has(variable.name) && variable.name in globalObject;
	}
	/**
	* Checks if a variable can be considered as a constant.
	* @param {Variable} variable
	* @returns {variable is Variable & {defs: [import("eslint").Scope.Definition & { type: "Variable" }]}} True if the variable can be considered as a constant.
	*/
	function canBeConsideredConst(variable) {
		if (variable.defs.length !== 1) return !1;
		let def = variable.defs[0];
		return !!(def.parent && def.type === "Variable" && (def.parent.kind === "const" || isEffectivelyConst(variable)));
	}
	/**
	* Returns whether the given variable is never written to after initialization.
	* @param {Variable} variable
	* @returns {boolean}
	*/
	function isEffectivelyConst(variable) {
		let refs = variable.references, inits = refs.filter((r) => r.init).length, reads = refs.filter((r) => r.isReadOnly()).length;
		return inits === 1 && reads + inits === refs.length;
	}
	/**
	* Checks if a variable has mutation in its property.
	* @param {Variable} variable The variable to check.
	* @param {Scope|null} initialScope The scope to start finding variable. Optional. If the node is a computed property node and this scope was given, this checks the computed property name by the `getStringIfConstant` function with the scope, and returns the value of it.
	* @returns {boolean} True if the variable has mutation in its property.
	*/
	function hasMutationInProperty(variable, initialScope) {
		for (let ref of variable.references) {
			let node = ref.identifier;
			for (; node && node.parent && node.parent.type === "MemberExpression";) node = node.parent;
			if (!(!node || !node.parent) && (node.parent.type === "AssignmentExpression" && node.parent.left === node || node.parent.type === "UpdateExpression" && node.parent.argument === node || node.parent.type === "CallExpression" && node.parent.callee === node && node.type === "MemberExpression" && isNameOfMutationArrayMethod(getStaticPropertyNameValue(node, initialScope)))) return !0;
		}
		return !1;
		/**
		* Checks if a method name is one of the mutation array methods.
		* @param {StaticValue|null} methodName The method name to check.
		* @returns {boolean} True if the method name is a mutation array method.
		*/
		function isNameOfMutationArrayMethod(methodName) {
			if (methodName == null || methodName.value == null) return !1;
			let name = methodName.value;
			return name === "copyWithin" || name === "fill" || name === "pop" || name === "push" || name === "reverse" || name === "shift" || name === "sort" || name === "splice" || name === "unshift";
		}
	}
	/**
	* @template {TSESTreeNodeTypes} T
	* @callback VisitorCallback
	* @param {TSESTreeNode & { type: T }} node
	* @param {Scope|undefined|null} initialScope
	* @returns {StaticValue | null}
	*/
	/**
	* @typedef { { [K in TSESTreeNodeTypes]?: VisitorCallback<K> } } Operations
	*/
	/**
	* @type {Operations}
	*/
	let operations = Object.freeze({
		ArrayExpression(node, initialScope) {
			let elements = getElementValues(node.elements, initialScope);
			return elements == null ? null : { value: elements };
		},
		AssignmentExpression(node, initialScope) {
			return node.operator === "=" ? getStaticValueR(node.right, initialScope) : null;
		},
		BinaryExpression(node, initialScope) {
			if (node.operator === "in" || node.operator === "instanceof") return null;
			let left = getStaticValueR(node.left, initialScope), right = getStaticValueR(node.right, initialScope);
			if (left != null && right != null) switch (node.operator) {
				case "==": return { value: left.value == right.value };
				case "!=": return { value: left.value != right.value };
				case "===": return { value: left.value === right.value };
				case "!==": return { value: left.value !== right.value };
				case "<": return { value: left.value < right.value };
				case "<=": return { value: left.value <= right.value };
				case ">": return { value: left.value > right.value };
				case ">=": return { value: left.value >= right.value };
				case "<<": return { value: left.value << right.value };
				case ">>": return { value: left.value >> right.value };
				case ">>>": return { value: left.value >>> right.value };
				case "+": return { value: left.value + right.value };
				case "-": return { value: left.value - right.value };
				case "*": return { value: left.value * right.value };
				case "/": return { value: left.value / right.value };
				case "%": return { value: left.value % right.value };
				case "**": return { value: left.value ** right.value };
				case "|": return { value: left.value | right.value };
				case "^": return { value: left.value ^ right.value };
				case "&": return { value: left.value & right.value };
			}
			return null;
		},
		CallExpression(node, initialScope) {
			let calleeNode = node.callee, args = getElementValues(node.arguments, initialScope);
			if (args != null) if (calleeNode.type === "MemberExpression") {
				if (calleeNode.property.type === "PrivateIdentifier") return null;
				let object = getStaticValueR(calleeNode.object, initialScope);
				if (object != null) {
					if (object.value == null && (object.optional || node.optional)) return {
						value: void 0,
						optional: !0
					};
					let property = getStaticPropertyNameValue(calleeNode, initialScope);
					if (property != null) {
						let receiver = object.value, methodName = property.value;
						if (callAllowed.has(receiver[methodName])) return { value: receiver[methodName](...args) };
						if (callPassThrough.has(receiver[methodName])) return { value: args[0] };
					}
				}
			} else {
				let callee = getStaticValueR(calleeNode, initialScope);
				if (callee != null) {
					if (callee.value == null && node.optional) return {
						value: void 0,
						optional: !0
					};
					let func = callee.value;
					if (callAllowed.has(func)) return { value: func(...args) };
					if (callPassThrough.has(func)) return { value: args[0] };
				}
			}
			return null;
		},
		ConditionalExpression(node, initialScope) {
			let test = getStaticValueR(node.test, initialScope);
			return test == null ? null : test.value ? getStaticValueR(node.consequent, initialScope) : getStaticValueR(node.alternate, initialScope);
		},
		ExpressionStatement(node, initialScope) {
			return getStaticValueR(node.expression, initialScope);
		},
		Identifier(node, initialScope) {
			if (initialScope != null) {
				let variable = findVariable(initialScope, node);
				if (variable != null) {
					if (isBuiltinGlobal(variable)) return { value: globalObject[variable.name] };
					if (canBeConsideredConst(variable)) {
						let def = variable.defs[0];
						if (def.node.id.type === "Identifier") {
							let init = getStaticValueR(def.node.init, initialScope);
							return init && typeof init.value == "object" && init.value !== null && hasMutationInProperty(variable, initialScope) ? null : init;
						}
					}
				}
			}
			return null;
		},
		Literal(node) {
			let literal = node;
			return (literal.regex != null || literal.bigint != null) && literal.value == null ? null : { value: literal.value };
		},
		LogicalExpression(node, initialScope) {
			let left = getStaticValueR(node.left, initialScope);
			if (left != null) {
				if (node.operator === "||" && left.value || node.operator === "&&" && !left.value || node.operator === "??" && left.value != null) return left;
				let right = getStaticValueR(node.right, initialScope);
				if (right != null) return right;
			}
			return null;
		},
		MemberExpression(node, initialScope) {
			if (node.property.type === "PrivateIdentifier") return null;
			let object = getStaticValueR(node.object, initialScope);
			if (object != null) {
				if (object.value == null && (object.optional || node.optional)) return {
					value: void 0,
					optional: !0
				};
				let property = getStaticPropertyNameValue(node, initialScope);
				if (property != null) {
					if (!isGetter(object.value, property.value)) return { value: object.value[property.value] };
					for (let [classFn, allowed] of getterAllowed) if (object.value instanceof classFn && allowed.has(property.value)) return { value: object.value[property.value] };
				}
			}
			return null;
		},
		ChainExpression(node, initialScope) {
			let expression = getStaticValueR(node.expression, initialScope);
			return expression == null ? null : { value: expression.value };
		},
		NewExpression(node, initialScope) {
			let callee = getStaticValueR(node.callee, initialScope), args = getElementValues(node.arguments, initialScope);
			if (callee != null && args != null) {
				let Func = callee.value;
				if (callAllowed.has(Func)) return { value: new Func(...args) };
			}
			return null;
		},
		ObjectExpression(node, initialScope) {
			/** @type {Record<PropertyKey, unknown>} */
			let object = {};
			for (let propertyNode of node.properties) if (propertyNode.type === "Property") {
				if (propertyNode.kind !== "init") return null;
				let key = getStaticPropertyNameValue(propertyNode, initialScope), value = getStaticValueR(propertyNode.value, initialScope);
				if (key == null || value == null) return null;
				object[key.value] = value.value;
			} else if (propertyNode.type === "SpreadElement" || propertyNode.type === "ExperimentalSpreadProperty") {
				let argument = getStaticValueR(propertyNode.argument, initialScope);
				if (argument == null) return null;
				Object.assign(object, argument.value);
			} else return null;
			return { value: object };
		},
		SequenceExpression(node, initialScope) {
			let last = node.expressions[node.expressions.length - 1];
			return getStaticValueR(last, initialScope);
		},
		TaggedTemplateExpression(node, initialScope) {
			let tag = getStaticValueR(node.tag, initialScope), expressions = getElementValues(node.quasi.expressions, initialScope);
			if (tag != null && expressions != null) {
				let func = tag.value, strings = node.quasi.quasis.map((q) => q.value.cooked);
				if (strings.raw = node.quasi.quasis.map((q) => q.value.raw), func === String.raw) return { value: func(strings, ...expressions) };
			}
			return null;
		},
		TemplateLiteral(node, initialScope) {
			let expressions = getElementValues(node.expressions, initialScope);
			if (expressions != null) {
				let value = node.quasis[0].value.cooked;
				for (let i = 0; i < expressions.length; ++i) value += expressions[i], value += node.quasis[i + 1].value.cooked;
				return { value };
			}
			return null;
		},
		UnaryExpression(node, initialScope) {
			if (node.operator === "delete") return null;
			if (node.operator === "void") return { value: void 0 };
			let arg = getStaticValueR(node.argument, initialScope);
			if (arg != null) switch (node.operator) {
				case "-": return { value: -arg.value };
				case "+": return { value: +arg.value };
				case "!": return { value: !arg.value };
				case "~": return { value: ~arg.value };
				case "typeof": return { value: typeof arg.value };
			}
			return null;
		},
		TSAsExpression(node, initialScope) {
			return getStaticValueR(node.expression, initialScope);
		},
		TSSatisfiesExpression(node, initialScope) {
			return getStaticValueR(node.expression, initialScope);
		},
		TSTypeAssertion(node, initialScope) {
			return getStaticValueR(node.expression, initialScope);
		},
		TSNonNullExpression(node, initialScope) {
			return getStaticValueR(node.expression, initialScope);
		},
		TSInstantiationExpression(node, initialScope) {
			return getStaticValueR(node.expression, initialScope);
		}
	});
	/**
	* Get the value of a given node if it's a static value.
	* @param {Node|TSESTreeNode|null|undefined} node The node to get.
	* @param {Scope|undefined|null} initialScope The scope to start finding variable.
	* @returns {StaticValue|null} The static value of the node, or `null`.
	*/
	function getStaticValueR(node, initialScope) {
		return node != null && Object.hasOwnProperty.call(operations, node.type) ? operations[node.type](node, initialScope) : null;
	}
	/**
	* Get the static value of property name from a MemberExpression node or a Property node.
	* @param {MemberExpression|Property} node The node to get.
	* @param {Scope|null} [initialScope] The scope to start finding variable. Optional. If the node is a computed property node and this scope was given, this checks the computed property name by the `getStringIfConstant` function with the scope, and returns the value of it.
	* @returns {StaticValue|null} The static value of the property name of the node, or `null`.
	*/
	function getStaticPropertyNameValue(node, initialScope) {
		let nameNode = node.type === "Property" ? node.key : node.property;
		return node.computed ? getStaticValueR(nameNode, initialScope) : nameNode.type === "Identifier" ? { value: nameNode.name } : nameNode.type === "Literal" ? nameNode.bigint ? { value: nameNode.bigint } : { value: String(nameNode.value) } : null;
	}
	/**
	* Get the value of a given node if it's a static value.
	* @param {Node} node The node to get.
	* @param {Scope|null} [initialScope] The scope to start finding variable. Optional. If this scope was given, this tries to resolve identifier references which are in the given node as much as possible.
	* @returns {StaticValue | null} The static value of the node, or `null`.
	*/
	function getStaticValue(node, initialScope = null) {
		try {
			return getStaticValueR(node, initialScope);
		} catch {
			return null;
		}
	}
	/** @typedef {import("eslint").Scope.Scope} Scope */
	/** @typedef {import("estree").Node} Node */
	/** @typedef {import("estree").RegExpLiteral} RegExpLiteral */
	/** @typedef {import("estree").BigIntLiteral} BigIntLiteral */
	/** @typedef {import("estree").SimpleLiteral} SimpleLiteral */
	/**
	* Get the value of a given node if it's a literal or a template literal.
	* @param {Node} node The node to get.
	* @param {Scope|null} [initialScope] The scope to start finding variable. Optional. If the node is an Identifier node and this scope was given, this checks the variable of the identifier, and returns the value of it if the variable is a constant.
	* @returns {string|null} The value of the node, or `null`.
	*/
	function getStringIfConstant(node, initialScope = null) {
		if (node && node.type === "Literal" && node.value === null) {
			let literal = node;
			if (literal.regex) return `/${literal.regex.pattern}/${literal.regex.flags}`;
			if (literal.bigint) return literal.bigint;
		}
		let evaluated = getStaticValue(node, initialScope);
		if (evaluated) try {
			return String(evaluated.value);
		} catch {}
		return null;
	}
	/** @typedef {import("eslint").Scope.Scope} Scope */
	/** @typedef {import("estree").MemberExpression} MemberExpression */
	/** @typedef {import("estree").MethodDefinition} MethodDefinition */
	/** @typedef {import("estree").Property} Property */
	/** @typedef {import("estree").PropertyDefinition} PropertyDefinition */
	/** @typedef {import("estree").Identifier} Identifier */
	/**
	* Get the property name from a MemberExpression node or a Property node.
	* @param {MemberExpression | MethodDefinition | Property | PropertyDefinition} node The node to get.
	* @param {Scope} [initialScope] The scope to start finding variable. Optional. If the node is a computed property node and this scope was given, this checks the computed property name by the `getStringIfConstant` function with the scope, and returns the value of it.
	* @returns {string|null|undefined} The property name of the node.
	*/
	function getPropertyName(node, initialScope) {
		switch (node.type) {
			case "MemberExpression": return node.computed ? getStringIfConstant(node.property, initialScope) : node.property.type === "PrivateIdentifier" ? null : node.property.name;
			case "Property":
			case "MethodDefinition":
			case "PropertyDefinition": return node.computed ? getStringIfConstant(node.key, initialScope) : node.key.type === "Literal" ? String(node.key.value) : node.key.type === "PrivateIdentifier" ? null : node.key.name;
		}
		return null;
	}
	/** @typedef {import("eslint").Rule.Node} RuleNode */
	/** @typedef {import("eslint").SourceCode} SourceCode */
	/** @typedef {import("estree").Function} FunctionNode */
	/** @typedef {import("estree").FunctionDeclaration} FunctionDeclaration */
	/** @typedef {import("estree").FunctionExpression} FunctionExpression */
	/** @typedef {import("estree").Identifier} Identifier */
	/**
	* Get the name and kind of the given function node.
	* @param {FunctionNode} node - The function node to get.
	* @param {SourceCode} [sourceCode] The source code object to get the code of computed property keys.
	* @returns {string} The name and kind of the function node.
	*/
	function getFunctionNameWithKind(node, sourceCode) {
		let parent = node.parent;
		if (!parent) return "";
		let tokens = [], isObjectMethod = parent.type === "Property" && parent.value === node, isClassMethod = parent.type === "MethodDefinition" && parent.value === node, isClassFieldMethod = parent.type === "PropertyDefinition" && parent.value === node;
		if ((isClassMethod || isClassFieldMethod) && (parent.static && tokens.push("static"), parent.key.type === "PrivateIdentifier" && tokens.push("private")), node.async && tokens.push("async"), node.generator && tokens.push("generator"), isObjectMethod || isClassMethod) {
			if (parent.kind === "constructor") return "constructor";
			parent.kind === "get" ? tokens.push("getter") : parent.kind === "set" ? tokens.push("setter") : tokens.push("method");
		} else isClassFieldMethod ? tokens.push("method") : (node.type === "ArrowFunctionExpression" && tokens.push("arrow"), tokens.push("function"));
		if (isObjectMethod || isClassMethod || isClassFieldMethod) if (parent.key.type === "PrivateIdentifier") tokens.push(`#${parent.key.name}`);
		else {
			let name = getPropertyName(parent);
			if (name) tokens.push(`'${name}'`);
			else if (sourceCode) {
				let keyText = sourceCode.getText(parent.key);
				keyText.includes("\n") || tokens.push(`[${keyText}]`);
			}
		}
		else hasId(node) ? tokens.push(`'${node.id.name}'`) : parent.type === "VariableDeclarator" && parent.id && parent.id.type === "Identifier" ? tokens.push(`'${parent.id.name}'`) : (parent.type === "AssignmentExpression" || parent.type === "AssignmentPattern") && parent.left && parent.left.type === "Identifier" ? tokens.push(`'${parent.left.name}'`) : parent.type === "ExportDefaultDeclaration" && parent.declaration === node && tokens.push("'default'");
		return tokens.join(" ");
	}
	/**
	* @param {FunctionNode} node
	* @returns {node is FunctionDeclaration | FunctionExpression & { id: Identifier }}
	*/
	function hasId(node) {
		return !!node.id;
	}
	/** @typedef {import("estree").Node} Node */
	/** @typedef {import("eslint").SourceCode} SourceCode */
	/** @typedef {import("./types.mjs").HasSideEffectOptions} HasSideEffectOptions */
	/** @typedef {import("estree").BinaryExpression} BinaryExpression */
	/** @typedef {import("estree").MemberExpression} MemberExpression */
	/** @typedef {import("estree").MethodDefinition} MethodDefinition */
	/** @typedef {import("estree").Property} Property */
	/** @typedef {import("estree").PropertyDefinition} PropertyDefinition */
	/** @typedef {import("estree").UnaryExpression} UnaryExpression */
	let typeConversionBinaryOps = Object.freeze(new Set([
		"==",
		"!=",
		"<",
		"<=",
		">",
		">=",
		"<<",
		">>",
		">>>",
		"+",
		"-",
		"*",
		"/",
		"%",
		"|",
		"^",
		"&",
		"in"
	])), typeConversionUnaryOps = Object.freeze(new Set([
		"-",
		"+",
		"!",
		"~"
	]));
	/**
	* Check whether the given value is an ASTNode or not.
	* @param {any} x The value to check.
	* @returns {x is Node} `true` if the value is an ASTNode.
	*/
	function isNode(x) {
		return typeof x == "object" && !!x && typeof x.type == "string";
	}
	let visitor = Object.freeze(Object.assign(Object.create(null), {
		$visit(node, options, visitorKeys) {
			let { type } = node;
			return typeof this[type] == "function" ? this[type](node, options, visitorKeys) : this.$visitChildren(node, options, visitorKeys);
		},
		$visitChildren(node, options, visitorKeys) {
			let { type } = node;
			for (let key of visitorKeys[type] || eslintVisitorKeys.getKeys(node)) {
				let value = node[key];
				if (Array.isArray(value)) {
					for (let element of value) if (isNode(element) && this.$visit(element, options, visitorKeys)) return !0;
				} else if (isNode(value) && this.$visit(value, options, visitorKeys)) return !0;
			}
			return !1;
		},
		ArrowFunctionExpression() {
			return !1;
		},
		AssignmentExpression() {
			return !0;
		},
		AwaitExpression() {
			return !0;
		},
		BinaryExpression(node, options, visitorKeys) {
			return options.considerImplicitTypeConversion && typeConversionBinaryOps.has(node.operator) && (node.left.type !== "Literal" || node.right.type !== "Literal") ? !0 : this.$visitChildren(node, options, visitorKeys);
		},
		CallExpression() {
			return !0;
		},
		FunctionExpression() {
			return !1;
		},
		ImportExpression() {
			return !0;
		},
		MemberExpression(node, options, visitorKeys) {
			return options.considerGetters || options.considerImplicitTypeConversion && node.computed && node.property.type !== "Literal" ? !0 : this.$visitChildren(node, options, visitorKeys);
		},
		MethodDefinition(node, options, visitorKeys) {
			return options.considerImplicitTypeConversion && node.computed && node.key.type !== "Literal" ? !0 : this.$visitChildren(node, options, visitorKeys);
		},
		NewExpression() {
			return !0;
		},
		Property(node, options, visitorKeys) {
			return options.considerImplicitTypeConversion && node.computed && node.key.type !== "Literal" ? !0 : this.$visitChildren(node, options, visitorKeys);
		},
		PropertyDefinition(node, options, visitorKeys) {
			return options.considerImplicitTypeConversion && node.computed && node.key.type !== "Literal" ? !0 : this.$visitChildren(node, options, visitorKeys);
		},
		UnaryExpression(node, options, visitorKeys) {
			return node.operator === "delete" || options.considerImplicitTypeConversion && typeConversionUnaryOps.has(node.operator) && node.argument.type !== "Literal" ? !0 : this.$visitChildren(node, options, visitorKeys);
		},
		UpdateExpression() {
			return !0;
		},
		YieldExpression() {
			return !0;
		}
	}));
	/**
	* Check whether a given node has any side effect or not.
	* @param {Node} node The node to get.
	* @param {SourceCode} sourceCode The source code object.
	* @param {HasSideEffectOptions} [options] The option object.
	* @returns {boolean} `true` if the node has a certain side effect.
	*/
	function hasSideEffect(node, sourceCode, options = {}) {
		let { considerGetters = !1, considerImplicitTypeConversion = !1 } = options;
		return visitor.$visit(node, {
			considerGetters,
			considerImplicitTypeConversion
		}, sourceCode.visitorKeys || eslintVisitorKeys.KEYS);
	}
	/** @typedef {import("estree").Node} Node */
	/** @typedef {import("@typescript-eslint/types").TSESTree.NewExpression} TSNewExpression */
	/** @typedef {import("@typescript-eslint/types").TSESTree.CallExpression} TSCallExpression */
	/** @typedef {import("eslint").SourceCode} SourceCode */
	/** @typedef {import("eslint").AST.Token} Token */
	/** @typedef {import("eslint").Rule.Node} RuleNode */
	/**
	* Get the left parenthesis of the parent node syntax if it exists.
	* E.g., `if (a) {}` then the `(`.
	* @param {Node} node The AST node to check.
	* @param {SourceCode} sourceCode The source code object to get tokens.
	* @returns {Token|null} The left parenthesis of the parent node syntax
	*/
	function getParentSyntaxParen(node, sourceCode) {
		let parent = node.parent;
		if (!parent) return null;
		switch (parent.type) {
			case "CallExpression":
			case "NewExpression": return parent.arguments.length === 1 && parent.arguments[0] === node ? sourceCode.getTokenAfter(parent.typeArguments || parent.typeParameters || parent.callee, isOpeningParenToken) : null;
			case "DoWhileStatement": return parent.test === node ? sourceCode.getTokenAfter(parent.body, isOpeningParenToken) : null;
			case "IfStatement":
			case "WhileStatement": return parent.test === node ? sourceCode.getFirstToken(parent, 1) : null;
			case "ImportExpression": return parent.source === node ? sourceCode.getFirstToken(parent, 1) : null;
			case "SwitchStatement": return parent.discriminant === node ? sourceCode.getFirstToken(parent, 1) : null;
			case "WithStatement": return parent.object === node ? sourceCode.getFirstToken(parent, 1) : null;
			default: return null;
		}
	}
	/**
	* Check whether a given node is parenthesized or not.
	* @param {number} times The number of parantheses.
	* @param {Node} node The AST node to check.
	* @param {SourceCode} sourceCode The source code object to get tokens.
	* @returns {boolean} `true` if the node is parenthesized the given times.
	*/
	/**
	* Check whether a given node is parenthesized or not.
	* @param {Node} node The AST node to check.
	* @param {SourceCode} sourceCode The source code object to get tokens.
	* @returns {boolean} `true` if the node is parenthesized.
	*/
	/**
	* Check whether a given node is parenthesized or not.
	* @param {Node|number} timesOrNode The first parameter.
	* @param {Node|SourceCode} nodeOrSourceCode The second parameter.
	* @param {SourceCode} [optionalSourceCode] The third parameter.
	* @returns {boolean} `true` if the node is parenthesized.
	*/
	function isParenthesized(timesOrNode, nodeOrSourceCode, optionalSourceCode) {
		/** @type {number} */
		let times, node, sourceCode, maybeLeftParen, maybeRightParen;
		if (typeof timesOrNode == "number") {
			if (times = timesOrNode | 0, node = nodeOrSourceCode, sourceCode = optionalSourceCode, !(times >= 1)) throw TypeError("'times' should be a positive integer.");
		} else times = 1, node = timesOrNode, sourceCode = nodeOrSourceCode;
		if (node == null || node.parent == null || node.parent.type === "CatchClause" && node.parent.param === node) return !1;
		maybeLeftParen = maybeRightParen = node;
		do
			maybeLeftParen = sourceCode.getTokenBefore(maybeLeftParen), maybeRightParen = sourceCode.getTokenAfter(maybeRightParen);
		while (maybeLeftParen != null && maybeRightParen != null && isOpeningParenToken(maybeLeftParen) && isClosingParenToken(maybeRightParen) && maybeLeftParen !== getParentSyntaxParen(node, sourceCode) && --times > 0);
		return times === 0;
	}
	/**
	* @author Toru Nagashima <https://github.com/mysticatea>
	* See LICENSE file in root directory for full license.
	*/
	let placeholder = /\$(?:[$&`']|[1-9][0-9]?)/gu, internal = /* @__PURE__ */ new WeakMap();
	/**
	* Check whether a given character is escaped or not.
	* @param {string} str The string to check.
	* @param {number} index The location of the character to check.
	* @returns {boolean} `true` if the character is escaped.
	*/
	function isEscaped(str, index) {
		let escaped = !1;
		for (let i = index - 1; i >= 0 && str.charCodeAt(i) === 92; --i) escaped = !escaped;
		return escaped;
	}
	/**
	* Replace a given string by a given matcher.
	* @param {PatternMatcher} matcher The pattern matcher.
	* @param {string} str The string to be replaced.
	* @param {string} replacement The new substring to replace each matched part.
	* @returns {string} The replaced string.
	*/
	function replaceS(matcher, str, replacement) {
		let chunks = [], index = 0;
		/**
		* @param {string} key The placeholder.
		* @param {RegExpExecArray} match The matched information.
		* @returns {string} The replaced string.
		*/
		function replacer(key, match) {
			switch (key) {
				case "$$": return "$";
				case "$&": return match[0];
				case "$`": return str.slice(0, match.index);
				case "$'": return str.slice(match.index + match[0].length);
				default: {
					let i = key.slice(1);
					return i in match ? match[i] : key;
				}
			}
		}
		for (let match of matcher.execAll(str)) chunks.push(str.slice(index, match.index)), chunks.push(replacement.replace(placeholder, (key) => replacer(key, match))), index = match.index + match[0].length;
		return chunks.push(str.slice(index)), chunks.join("");
	}
	/**
	* Replace a given string by a given matcher.
	* @param {PatternMatcher} matcher The pattern matcher.
	* @param {string} str The string to be replaced.
	* @param {(substring: string, ...args: any[]) => string} replace The function to replace each matched part.
	* @returns {string} The replaced string.
	*/
	function replaceF(matcher, str, replace) {
		let chunks = [], index = 0;
		for (let match of matcher.execAll(str)) chunks.push(str.slice(index, match.index)), chunks.push(String(replace(...match, match.index, match.input))), index = match.index + match[0].length;
		return chunks.push(str.slice(index)), chunks.join("");
	}
	/**
	* The class to find patterns as considering escape sequences.
	*/
	var PatternMatcher = class {
		/**
		* Initialize this matcher.
		* @param {RegExp} pattern The pattern to match.
		* @param {{escaped?:boolean}} [options] The options.
		*/
		constructor(pattern, options = {}) {
			let { escaped = !1 } = options;
			if (!(pattern instanceof RegExp)) throw TypeError("'pattern' should be a RegExp instance.");
			if (!pattern.flags.includes("g")) throw Error("'pattern' should contains 'g' flag.");
			internal.set(this, {
				pattern: new RegExp(pattern.source, pattern.flags),
				escaped: !!escaped
			});
		}
		/**
		* Find the pattern in a given string.
		* @param {string} str The string to find.
		* @returns {IterableIterator<RegExpExecArray>} The iterator which iterate the matched information.
		*/
		*execAll(str) {
			let { pattern, escaped } = internal.get(this), match = null, lastIndex = 0;
			for (pattern.lastIndex = 0; (match = pattern.exec(str)) != null;) (escaped || !isEscaped(str, match.index)) && (lastIndex = pattern.lastIndex, yield match, pattern.lastIndex = lastIndex);
		}
		/**
		* Check whether the pattern is found in a given string.
		* @param {string} str The string to check.
		* @returns {boolean} `true` if the pattern was found in the string.
		*/
		test(str) {
			return !this.execAll(str).next().done;
		}
		/**
		* Replace a given string.
		* @param {string} str The string to be replaced.
		* @param {(string|((...strs:string[])=>string))} replacer The string or function to replace. This is the same as the 2nd argument of `String.prototype.replace`.
		* @returns {string} The replaced string.
		*/
		[Symbol.replace](str, replacer) {
			return typeof replacer == "function" ? replaceF(this, String(str), replacer) : replaceS(this, String(str), String(replacer));
		}
	};
	/** @typedef {import("eslint").Scope.Scope} Scope */
	/** @typedef {import("eslint").Scope.Variable} Variable */
	/** @typedef {import("eslint").Rule.Node} RuleNode */
	/** @typedef {import("estree").Node} Node */
	/** @typedef {import("estree").Expression} Expression */
	/** @typedef {import("estree").Pattern} Pattern */
	/** @typedef {import("estree").Identifier} Identifier */
	/** @typedef {import("estree").SimpleCallExpression} CallExpression */
	/** @typedef {import("estree").Program} Program */
	/** @typedef {import("estree").ImportDeclaration} ImportDeclaration */
	/** @typedef {import("estree").ExportAllDeclaration} ExportAllDeclaration */
	/** @typedef {import("estree").ExportDefaultDeclaration} ExportDefaultDeclaration */
	/** @typedef {import("estree").ExportNamedDeclaration} ExportNamedDeclaration */
	/** @typedef {import("estree").ImportSpecifier} ImportSpecifier */
	/** @typedef {import("estree").ImportDefaultSpecifier} ImportDefaultSpecifier */
	/** @typedef {import("estree").ImportNamespaceSpecifier} ImportNamespaceSpecifier */
	/** @typedef {import("estree").ExportSpecifier} ExportSpecifier */
	/** @typedef {import("estree").Property} Property */
	/** @typedef {import("estree").AssignmentProperty} AssignmentProperty */
	/** @typedef {import("estree").Literal} Literal */
	/** @typedef {import("@typescript-eslint/types").TSESTree.Node} TSESTreeNode */
	/** @typedef {import("./types.mjs").ReferenceTrackerOptions} ReferenceTrackerOptions */
	/**
	* @template T
	* @typedef {import("./types.mjs").TraceMap<T>} TraceMap
	*/
	/**
	* @template T
	* @typedef {import("./types.mjs").TraceMapObject<T>} TraceMapObject
	*/
	/**
	* @template T
	* @typedef {import("./types.mjs").TrackedReferences<T>} TrackedReferences
	*/
	let IMPORT_TYPE = /^(?:Import|Export(?:All|Default|Named))Declaration$/u;
	/**
	* Check whether a given node is an import node or not.
	* @param {Node} node
	* @returns {node is ImportDeclaration|ExportAllDeclaration|ExportNamedDeclaration&{source: Literal}} `true` if the node is an import node.
	*/
	function isHasSource(node) {
		return IMPORT_TYPE.test(node.type) && node.source != null;
	}
	let has = Function.call.bind(Object.hasOwnProperty), READ = Symbol("read"), CALL = Symbol("call"), CONSTRUCT = Symbol("construct"), ESM = Symbol("esm"), requireCall = { require: { [CALL]: !0 } };
	/**
	* Check whether a given variable is modified or not.
	* @param {Variable|undefined} variable The variable to check.
	* @returns {boolean} `true` if the variable is modified.
	*/
	function isModifiedGlobal(variable) {
		return variable == null || variable.defs.length !== 0 || variable.references.some((r) => r.isWrite());
	}
	/**
	* Check if the value of a given node is passed through to the parent syntax as-is.
	* For example, `a` and `b` in (`a || b` and `c ? a : b`) are passed through.
	* @param {Node} node A node to check.
	* @returns {node is RuleNode & {parent: Expression}} `true` if the node is passed through.
	*/
	function isPassThrough(node) {
		let parent = node.parent;
		if (parent) switch (parent.type) {
			case "ConditionalExpression": return parent.consequent === node || parent.alternate === node;
			case "LogicalExpression": return !0;
			case "SequenceExpression": return parent.expressions[parent.expressions.length - 1] === node;
			case "ChainExpression": return !0;
			case "TSAsExpression":
			case "TSSatisfiesExpression":
			case "TSTypeAssertion":
			case "TSNonNullExpression":
			case "TSInstantiationExpression": return !0;
			default: return !1;
		}
		return !1;
	}
	/**
	* The reference tracker.
	*/
	var ReferenceTracker = class {
		/**
		* Initialize this tracker.
		* @param {Scope} globalScope The global scope.
		* @param {object} [options] The options.
		* @param {"legacy"|"strict"} [options.mode="strict"] The mode to determine the ImportDeclaration's behavior for CJS modules.
		* @param {string[]} [options.globalObjectNames=["global","globalThis","self","window"]] The variable names for Global Object.
		*/
		constructor(globalScope, options = {}) {
			let { mode = "strict", globalObjectNames = [
				"global",
				"globalThis",
				"self",
				"window"
			] } = options;
			/** @private */
			this.variableStack = [], this.globalScope = globalScope, this.mode = mode, this.globalObjectNames = globalObjectNames.slice(0);
		}
		/**
		* Iterate the references of global variables.
		* @template T
		* @param {TraceMap<T>} traceMap The trace map.
		* @returns {IterableIterator<TrackedReferences<T>>} The iterator to iterate references.
		*/
		*iterateGlobalReferences(traceMap) {
			for (let key of Object.keys(traceMap)) {
				let nextTraceMap = traceMap[key], path = [key], variable = this.globalScope.set.get(key);
				isModifiedGlobal(variable) || (yield* this._iterateVariableReferences(variable, path, nextTraceMap, !0));
			}
			for (let key of this.globalObjectNames) {
				/** @type {string[]} */
				let path = [], variable = this.globalScope.set.get(key);
				isModifiedGlobal(variable) || (yield* this._iterateVariableReferences(variable, path, traceMap, !1));
			}
		}
		/**
		* Iterate the references of CommonJS modules.
		* @template T
		* @param {TraceMap<T>} traceMap The trace map.
		* @returns {IterableIterator<TrackedReferences<T>>} The iterator to iterate references.
		*/
		*iterateCjsReferences(traceMap) {
			for (let { node } of this.iterateGlobalReferences(requireCall)) {
				let key = getStringIfConstant(
					/** @type {CallExpression} */
					node.arguments[0]
				);
				if (key == null || !has(traceMap, key)) continue;
				let nextTraceMap = traceMap[key], path = [key];
				nextTraceMap[READ] && (yield {
					node,
					path,
					type: READ,
					info: nextTraceMap[READ]
				}), yield* this._iteratePropertyReferences(node, path, nextTraceMap);
			}
		}
		/**
		* Iterate the references of ES modules.
		* @template T
		* @param {TraceMap<T>} traceMap The trace map.
		* @returns {IterableIterator<TrackedReferences<T>>} The iterator to iterate references.
		*/
		*iterateEsmReferences(traceMap) {
			let programNode = this.globalScope.block;
			for (let node of programNode.body) {
				if (!isHasSource(node)) continue;
				let moduleId = node.source.value;
				if (!has(traceMap, moduleId)) continue;
				let nextTraceMap = traceMap[moduleId], path = [moduleId];
				if (nextTraceMap[READ] && (yield {
					node,
					path,
					type: READ,
					info: nextTraceMap[READ]
				}), node.type === "ExportAllDeclaration") for (let key of Object.keys(nextTraceMap)) {
					let exportTraceMap = nextTraceMap[key];
					exportTraceMap[READ] && (yield {
						node,
						path: path.concat(key),
						type: READ,
						info: exportTraceMap[READ]
					});
				}
				else for (let specifier of node.specifiers) {
					let esm = has(nextTraceMap, ESM), it = this._iterateImportReferences(specifier, path, esm ? nextTraceMap : this.mode === "legacy" ? {
						default: nextTraceMap,
						...nextTraceMap
					} : { default: nextTraceMap });
					if (esm) yield* it;
					else for (let report of it) report.path = report.path.filter(exceptDefault), (report.path.length >= 2 || report.type !== READ) && (yield report);
				}
			}
		}
		/**
		* Iterate the property references for a given expression AST node.
		* @template T
		* @param {Expression} node The expression AST node to iterate property references.
		* @param {TraceMap<T>} traceMap The trace map.
		* @returns {IterableIterator<TrackedReferences<T>>} The iterator to iterate property references.
		*/
		*iteratePropertyReferences(node, traceMap) {
			yield* this._iteratePropertyReferences(node, [], traceMap);
		}
		/**
		* Iterate the references for a given variable.
		* @private
		* @template T
		* @param {Variable} variable The variable to iterate that references.
		* @param {string[]} path The current path.
		* @param {TraceMapObject<T>} traceMap The trace map.
		* @param {boolean} shouldReport = The flag to report those references.
		* @returns {IterableIterator<TrackedReferences<T>>} The iterator to iterate references.
		*/
		*_iterateVariableReferences(variable, path, traceMap, shouldReport) {
			if (!this.variableStack.includes(variable)) {
				this.variableStack.push(variable);
				try {
					for (let reference of variable.references) {
						if (!reference.isRead()) continue;
						let node = reference.identifier;
						shouldReport && traceMap[READ] && (yield {
							node,
							path,
							type: READ,
							info: traceMap[READ]
						}), yield* this._iteratePropertyReferences(node, path, traceMap);
					}
				} finally {
					this.variableStack.pop();
				}
			}
		}
		/**
		* Iterate the references for a given AST node.
		* @private
		* @template T
		* @param {Expression} rootNode The AST node to iterate references.
		* @param {string[]} path The current path.
		* @param {TraceMapObject<T>} traceMap The trace map.
		* @returns {IterableIterator<TrackedReferences<T>>} The iterator to iterate references.
		*/
		*_iteratePropertyReferences(rootNode, path, traceMap) {
			let node = rootNode;
			for (; isPassThrough(node);) node = node.parent;
			let parent = node.parent;
			if (parent) {
				if (parent.type === "MemberExpression") {
					if (parent.object === node) {
						let key = getPropertyName(parent);
						if (key == null || !has(traceMap, key)) return;
						path = path.concat(key);
						let nextTraceMap = traceMap[key];
						nextTraceMap[READ] && (yield {
							node: parent,
							path,
							type: READ,
							info: nextTraceMap[READ]
						}), yield* this._iteratePropertyReferences(parent, path, nextTraceMap);
					}
					return;
				}
				if (parent.type === "CallExpression") {
					parent.callee === node && traceMap[CALL] && (yield {
						node: parent,
						path,
						type: CALL,
						info: traceMap[CALL]
					});
					return;
				}
				if (parent.type === "NewExpression") {
					parent.callee === node && traceMap[CONSTRUCT] && (yield {
						node: parent,
						path,
						type: CONSTRUCT,
						info: traceMap[CONSTRUCT]
					});
					return;
				}
				if (parent.type === "AssignmentExpression") {
					parent.right === node && (yield* this._iterateLhsReferences(parent.left, path, traceMap), yield* this._iteratePropertyReferences(parent, path, traceMap));
					return;
				}
				if (parent.type === "AssignmentPattern") {
					parent.right === node && (yield* this._iterateLhsReferences(parent.left, path, traceMap));
					return;
				}
				parent.type === "VariableDeclarator" && parent.init === node && (yield* this._iterateLhsReferences(parent.id, path, traceMap));
			}
		}
		/**
		* Iterate the references for a given Pattern node.
		* @private
		* @template T
		* @param {Pattern} patternNode The Pattern node to iterate references.
		* @param {string[]} path The current path.
		* @param {TraceMapObject<T>} traceMap The trace map.
		* @returns {IterableIterator<TrackedReferences<T>>} The iterator to iterate references.
		*/
		*_iterateLhsReferences(patternNode, path, traceMap) {
			if (patternNode.type === "Identifier") {
				let variable = findVariable(this.globalScope, patternNode);
				variable != null && (yield* this._iterateVariableReferences(variable, path, traceMap, !1));
				return;
			}
			if (patternNode.type === "ObjectPattern") {
				for (let property of patternNode.properties) {
					let key = getPropertyName(property);
					if (key == null || !has(traceMap, key)) continue;
					let nextPath = path.concat(key), nextTraceMap = traceMap[key];
					nextTraceMap[READ] && (yield {
						node: property,
						path: nextPath,
						type: READ,
						info: nextTraceMap[READ]
					}), yield* this._iterateLhsReferences(
						/** @type {AssignmentProperty} */
						property.value,
						nextPath,
						nextTraceMap
					);
				}
				return;
			}
			patternNode.type === "AssignmentPattern" && (yield* this._iterateLhsReferences(patternNode.left, path, traceMap));
		}
		/**
		* Iterate the references for a given ModuleSpecifier node.
		* @private
		* @template T
		* @param {ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier | ExportSpecifier} specifierNode The ModuleSpecifier node to iterate references.
		* @param {string[]} path The current path.
		* @param {TraceMapObject<T>} traceMap The trace map.
		* @returns {IterableIterator<TrackedReferences<T>>} The iterator to iterate references.
		*/
		*_iterateImportReferences(specifierNode, path, traceMap) {
			let type = specifierNode.type;
			if (type === "ImportSpecifier" || type === "ImportDefaultSpecifier") {
				let key = type === "ImportDefaultSpecifier" ? "default" : specifierNode.imported.type === "Identifier" ? specifierNode.imported.name : specifierNode.imported.value;
				if (!has(traceMap, key)) return;
				path = path.concat(key);
				let nextTraceMap = traceMap[key];
				nextTraceMap[READ] && (yield {
					node: specifierNode,
					path,
					type: READ,
					info: nextTraceMap[READ]
				}), yield* this._iterateVariableReferences(findVariable(this.globalScope, specifierNode.local), path, nextTraceMap, !1);
				return;
			}
			if (type === "ImportNamespaceSpecifier") {
				yield* this._iterateVariableReferences(findVariable(this.globalScope, specifierNode.local), path, traceMap, !1);
				return;
			}
			if (type === "ExportSpecifier") {
				let key = specifierNode.local.type === "Identifier" ? specifierNode.local.name : specifierNode.local.value;
				if (!has(traceMap, key)) return;
				path = path.concat(key);
				let nextTraceMap = traceMap[key];
				nextTraceMap[READ] && (yield {
					node: specifierNode,
					path,
					type: READ,
					info: nextTraceMap[READ]
				});
			}
		}
	};
	ReferenceTracker.READ = READ, ReferenceTracker.CALL = CALL, ReferenceTracker.CONSTRUCT = CONSTRUCT, ReferenceTracker.ESM = ESM;
	/**
	* This is a predicate function for Array#filter.
	* @param {string} name A name part.
	* @param {number} index The index of the name.
	* @returns {boolean} `false` if it's default.
	*/
	function exceptDefault(name, index) {
		return !(index === 1 && name === "default");
	}
	/** @typedef {import("./types.mjs").StaticValue} StaticValue */
	var index = {
		CALL,
		CONSTRUCT,
		ESM,
		findVariable,
		getFunctionHeadLocation,
		getFunctionNameWithKind,
		getInnermostScope,
		getPropertyName,
		getStaticValue,
		getStringIfConstant,
		hasSideEffect,
		isArrowToken,
		isClosingBraceToken,
		isClosingBracketToken,
		isClosingParenToken,
		isColonToken,
		isCommaToken,
		isCommentToken,
		isNotArrowToken,
		isNotClosingBraceToken,
		isNotClosingBracketToken,
		isNotClosingParenToken,
		isNotColonToken,
		isNotCommaToken,
		isNotCommentToken,
		isNotOpeningBraceToken,
		isNotOpeningBracketToken,
		isNotOpeningParenToken,
		isNotSemicolonToken,
		isOpeningBraceToken,
		isOpeningBracketToken,
		isOpeningParenToken,
		isParenthesized,
		isSemicolonToken,
		PatternMatcher,
		READ,
		ReferenceTracker
	};
	exports.CALL = CALL, exports.CONSTRUCT = CONSTRUCT, exports.ESM = ESM, exports.PatternMatcher = PatternMatcher, exports.READ = READ, exports.ReferenceTracker = ReferenceTracker, exports.default = index, exports.findVariable = findVariable, exports.getFunctionHeadLocation = getFunctionHeadLocation, exports.getFunctionNameWithKind = getFunctionNameWithKind, exports.getInnermostScope = getInnermostScope, exports.getPropertyName = getPropertyName, exports.getStaticValue = getStaticValue, exports.getStringIfConstant = getStringIfConstant, exports.hasSideEffect = hasSideEffect, exports.isArrowToken = isArrowToken, exports.isClosingBraceToken = isClosingBraceToken, exports.isClosingBracketToken = isClosingBracketToken, exports.isClosingParenToken = isClosingParenToken, exports.isColonToken = isColonToken, exports.isCommaToken = isCommaToken, exports.isCommentToken = isCommentToken, exports.isNotArrowToken = isNotArrowToken, exports.isNotClosingBraceToken = isNotClosingBraceToken, exports.isNotClosingBracketToken = isNotClosingBracketToken, exports.isNotClosingParenToken = isNotClosingParenToken, exports.isNotColonToken = isNotColonToken, exports.isNotCommaToken = isNotCommaToken, exports.isNotCommentToken = isNotCommentToken, exports.isNotOpeningBraceToken = isNotOpeningBraceToken, exports.isNotOpeningBracketToken = isNotOpeningBracketToken, exports.isNotOpeningParenToken = isNotOpeningParenToken, exports.isNotSemicolonToken = isNotSemicolonToken, exports.isOpeningBraceToken = isOpeningBraceToken, exports.isOpeningBracketToken = isOpeningBracketToken, exports.isOpeningParenToken = isOpeningParenToken, exports.isParenthesized = isParenthesized, exports.isSemicolonToken = isSemicolonToken;
}));
//#endregion
Object.defineProperty(exports, "t", {
	enumerable: !0,
	get: function() {
		return require_eslint_utils;
	}
});
