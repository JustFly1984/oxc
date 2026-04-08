//#region ../../node_modules/.pnpm/ignore@5.3.2/node_modules/ignore/index.js
var require_ignore = /* @__PURE__ */ require("./chunk.cjs").t(((exports, module) => {
	function makeArray(subject) {
		return Array.isArray(subject) ? subject : [subject];
	}
	let REGEX_TEST_BLANK_LINE = /^\s+$/, REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/, REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/, REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/, REGEX_SPLITALL_CRLF = /\r?\n/g, REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/, TMP_KEY_IGNORE = "node-ignore";
	/* istanbul ignore else */
	typeof Symbol < "u" && (TMP_KEY_IGNORE = Symbol.for("node-ignore"));
	let KEY_IGNORE = TMP_KEY_IGNORE, define = (object, key, value) => Object.defineProperty(object, key, { value }), REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g, RETURN_FALSE = () => !1, sanitizeRange = (range) => range.replace(REGEX_REGEXP_RANGE, (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : ""), cleanRangeBackSlash = (slashes) => {
		let { length } = slashes;
		return slashes.slice(0, length - length % 2);
	}, REPLACERS = [
		[/^\uFEFF/, () => ""],
		[/((?:\\\\)*?)(\\?\s+)$/, (_, m1, m2) => m1 + (m2.indexOf("\\") === 0 ? " " : "")],
		[/(\\+?)\s/g, (_, m1) => {
			let { length } = m1;
			return m1.slice(0, length - length % 2) + " ";
		}],
		[/[\\$.|*+(){^]/g, (match) => `\\${match}`],
		[/(?!\\)\?/g, () => "[^/]"],
		[/^\//, () => "^"],
		[/\//g, () => "\\/"],
		[/^\^*\\\*\\\*\\\//, () => "^(?:.*\\/)?"],
		[/^(?=[^^])/, function startingReplacer() {
			return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
		}],
		[/\\\/\\\*\\\*(?=\\\/|$)/g, (_, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"],
		[/(^|[^\\]+)(\\\*)+(?=.+)/g, (_, p1, p2) => p1 + p2.replace(/\\\*/g, "[^\\/]*")],
		[/\\\\\\(?=[$.|*+(){^])/g, () => "\\"],
		[/\\\\/g, () => "\\"],
		[/(\\)?\[([^\]/]*?)(\\*)($|\])/g, (match, leadEscape, range, endEscape, close) => leadEscape === "\\" ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" && endEscape.length % 2 == 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]"],
		[/(?:[^*])$/, (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`],
		[/(\^|\\\/)?\\\*$/, (_, p1) => `${p1 ? `${p1}[^/]+` : "[^/]*"}(?=$|\\/$)`]
	], regexCache = Object.create(null), makeRegex = (pattern, ignoreCase) => {
		let source = regexCache[pattern];
		return source || (source = REPLACERS.reduce((prev, [matcher, replacer]) => prev.replace(matcher, replacer.bind(pattern)), pattern), regexCache[pattern] = source), ignoreCase ? new RegExp(source, "i") : new RegExp(source);
	}, isString = (subject) => typeof subject == "string", checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0, splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF);
	var IgnoreRule = class {
		constructor(origin, pattern, negative, regex) {
			this.origin = origin, this.pattern = pattern, this.negative = negative, this.regex = regex;
		}
	};
	let createRule = (pattern, ignoreCase) => {
		let origin = pattern, negative = !1;
		pattern.indexOf("!") === 0 && (negative = !0, pattern = pattern.substr(1)), pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
		let regex = makeRegex(pattern, ignoreCase);
		return new IgnoreRule(origin, pattern, negative, regex);
	}, throwError = (message, Ctor) => {
		throw new Ctor(message);
	}, checkPath = (path, originalPath, doThrow) => isString(path) ? path ? checkPath.isNotRelative(path) ? doThrow(`path should be a \`path.relative()\`d string, but got "${originalPath}"`, RangeError) : !0 : doThrow("path must not be empty", TypeError) : doThrow(`path must be a string, but got \`${originalPath}\``, TypeError), isNotRelative = (path) => REGEX_TEST_INVALID_PATH.test(path);
	checkPath.isNotRelative = isNotRelative, checkPath.convert = (p) => p;
	var Ignore = class {
		constructor({ ignorecase = !0, ignoreCase = ignorecase, allowRelativePaths = !1 } = {}) {
			define(this, KEY_IGNORE, !0), this._rules = [], this._ignoreCase = ignoreCase, this._allowRelativePaths = allowRelativePaths, this._initCache();
		}
		_initCache() {
			this._ignoreCache = Object.create(null), this._testCache = Object.create(null);
		}
		_addPattern(pattern) {
			if (pattern && pattern[KEY_IGNORE]) {
				this._rules = this._rules.concat(pattern._rules), this._added = !0;
				return;
			}
			if (checkPattern(pattern)) {
				let rule = createRule(pattern, this._ignoreCase);
				this._added = !0, this._rules.push(rule);
			}
		}
		add(pattern) {
			return this._added = !1, makeArray(isString(pattern) ? splitPattern(pattern) : pattern).forEach(this._addPattern, this), this._added && this._initCache(), this;
		}
		addPattern(pattern) {
			return this.add(pattern);
		}
		_testOne(path, checkUnignored) {
			let ignored = !1, unignored = !1;
			return this._rules.forEach((rule) => {
				let { negative } = rule;
				unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored || rule.regex.test(path) && (ignored = !negative, unignored = negative);
			}), {
				ignored,
				unignored
			};
		}
		_test(originalPath, cache, checkUnignored, slices) {
			let path = originalPath && checkPath.convert(originalPath);
			return checkPath(path, originalPath, this._allowRelativePaths ? RETURN_FALSE : throwError), this._t(path, cache, checkUnignored, slices);
		}
		_t(path, cache, checkUnignored, slices) {
			if (path in cache) return cache[path];
			if (slices ||= path.split("/"), slices.pop(), !slices.length) return cache[path] = this._testOne(path, checkUnignored);
			let parent = this._t(slices.join("/") + "/", cache, checkUnignored, slices);
			return cache[path] = parent.ignored ? parent : this._testOne(path, checkUnignored);
		}
		ignores(path) {
			return this._test(path, this._ignoreCache, !1).ignored;
		}
		createFilter() {
			return (path) => !this.ignores(path);
		}
		filter(paths) {
			return makeArray(paths).filter(this.createFilter());
		}
		test(path) {
			return this._test(path, this._testCache, !0);
		}
	};
	let factory = (options) => new Ignore(options), isPathValid = (path) => checkPath(path && checkPath.convert(path), path, RETURN_FALSE);
	/* istanbul ignore if */
	if (factory.isPathValid = isPathValid, factory.default = factory, module.exports = factory, typeof process < "u" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")) {
		let makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
		checkPath.convert = makePosix;
		let REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
		checkPath.isNotRelative = (path) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path) || isNotRelative(path);
	}
}));
//#endregion
Object.defineProperty(exports, "t", {
	enumerable: !0,
	get: function() {
		return require_ignore;
	}
});
