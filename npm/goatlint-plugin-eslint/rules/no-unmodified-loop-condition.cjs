const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* Helpers.
	*/
	var s = 1e3, m = s * 60, h = m * 60, d = h * 24, w = d * 7, y = d * 365.25;
	/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} [options]
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/
	module.exports = function(val, options) {
		options ||= {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
		throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/
	function parse(str) {
		if (str = String(str), !(str.length > 100)) {
			var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
			if (match) {
				var n = parseFloat(match[1]);
				switch ((match[2] || "ms").toLowerCase()) {
					case "years":
					case "year":
					case "yrs":
					case "yr":
					case "y": return n * y;
					case "weeks":
					case "week":
					case "w": return n * w;
					case "days":
					case "day":
					case "d": return n * d;
					case "hours":
					case "hour":
					case "hrs":
					case "hr":
					case "h": return n * h;
					case "minutes":
					case "minute":
					case "mins":
					case "min":
					case "m": return n * m;
					case "seconds":
					case "second":
					case "secs":
					case "sec":
					case "s": return n * s;
					case "milliseconds":
					case "millisecond":
					case "msecs":
					case "msec":
					case "ms": return n;
					default: return;
				}
			}
		}
	}
	/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtShort(ms) {
		var msAbs = Math.abs(ms);
		return msAbs >= d ? Math.round(ms / d) + "d" : msAbs >= h ? Math.round(ms / h) + "h" : msAbs >= m ? Math.round(ms / m) + "m" : msAbs >= s ? Math.round(ms / s) + "s" : ms + "ms";
	}
	/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtLong(ms) {
		var msAbs = Math.abs(ms);
		return msAbs >= d ? plural(ms, msAbs, d, "day") : msAbs >= h ? plural(ms, msAbs, h, "hour") : msAbs >= m ? plural(ms, msAbs, m, "minute") : msAbs >= s ? plural(ms, msAbs, s, "second") : ms + " ms";
	}
	/**
	* Pluralization helper.
	*/
	function plural(ms, msAbs, n, name) {
		var isPlural = msAbs >= n * 1.5;
		return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
	}
})), require_common = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*/
	function setup(env) {
		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.debug = createDebug, createDebug.default = createDebug, createDebug.coerce = coerce, createDebug.disable = disable, createDebug.enable = enable, createDebug.enabled = enabled, createDebug.humanize = require_ms(), createDebug.destroy = destroy, Object.keys(env).forEach((key) => {
			createDebug[key] = env[key];
		}), createDebug.names = [], createDebug.skips = [], createDebug.formatters = {};
		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;
			for (let i = 0; i < namespace.length; i++) hash = (hash << 5) - hash + namespace.charCodeAt(i), hash |= 0;
			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;
		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime, enableOverride = null, namespacesCache, enabledCache;
			function debug(...args) {
				if (!debug.enabled) return;
				let self = debug, curr = Number(/* @__PURE__ */ new Date());
				self.diff = curr - (prevTime || curr), self.prev = prevTime, self.curr = curr, prevTime = curr, args[0] = createDebug.coerce(args[0]), typeof args[0] != "string" && args.unshift("%O");
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					if (match === "%%") return "%";
					index++;
					let formatter = createDebug.formatters[format];
					if (typeof formatter == "function") {
						let val = args[index];
						match = formatter.call(self, val), args.splice(index, 1), index--;
					}
					return match;
				}), createDebug.formatArgs.call(self, args), (self.log || createDebug.log).apply(self, args);
			}
			return debug.namespace = namespace, debug.useColors = createDebug.useColors(), debug.color = createDebug.selectColor(namespace), debug.extend = extend, debug.destroy = createDebug.destroy, Object.defineProperty(debug, "enabled", {
				enumerable: !0,
				configurable: !1,
				get: () => enableOverride === null ? (namespacesCache !== createDebug.namespaces && (namespacesCache = createDebug.namespaces, enabledCache = createDebug.enabled(namespace)), enabledCache) : enableOverride,
				set: (v) => {
					enableOverride = v;
				}
			}), typeof createDebug.init == "function" && createDebug.init(debug), debug;
		}
		function extend(namespace, delimiter) {
			let newDebug = createDebug(this.namespace + (delimiter === void 0 ? ":" : delimiter) + namespace);
			return newDebug.log = this.log, newDebug;
		}
		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces), createDebug.namespaces = namespaces, createDebug.names = [], createDebug.skips = [];
			let split = (typeof namespaces == "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
			for (let ns of split) ns[0] === "-" ? createDebug.skips.push(ns.slice(1)) : createDebug.names.push(ns);
		}
		/**
		* Checks if the given string matches a namespace template, honoring
		* asterisks as wildcards.
		*
		* @param {String} search
		* @param {String} template
		* @return {Boolean}
		*/
		function matchesTemplate(search, template) {
			let searchIndex = 0, templateIndex = 0, starIndex = -1, matchIndex = 0;
			for (; searchIndex < search.length;) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) template[templateIndex] === "*" ? (starIndex = templateIndex, matchIndex = searchIndex, templateIndex++) : (searchIndex++, templateIndex++);
			else if (starIndex !== -1) templateIndex = starIndex + 1, matchIndex++, searchIndex = matchIndex;
			else return !1;
			for (; templateIndex < template.length && template[templateIndex] === "*";) templateIndex++;
			return templateIndex === template.length;
		}
		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			let namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => "-" + namespace)].join(",");
			return createDebug.enable(""), namespaces;
		}
		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (let skip of createDebug.skips) if (matchesTemplate(name, skip)) return !1;
			for (let ns of createDebug.names) if (matchesTemplate(name, ns)) return !0;
			return !1;
		}
		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			return val instanceof Error ? val.stack || val.message : val;
		}
		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
		return createDebug.enable(createDebug.load()), createDebug;
	}
	module.exports = setup;
})), require_browser = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* Colors.
	*/
	exports.formatArgs = formatArgs, exports.save = save, exports.load = load, exports.useColors = useColors, exports.storage = localstorage(), exports.destroy = (() => {
		let warned = !1;
		return () => {
			warned || (warned = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
		};
	})(), exports.colors = /* @__PURE__ */ "#0000CC.#0000FF.#0033CC.#0033FF.#0066CC.#0066FF.#0099CC.#0099FF.#00CC00.#00CC33.#00CC66.#00CC99.#00CCCC.#00CCFF.#3300CC.#3300FF.#3333CC.#3333FF.#3366CC.#3366FF.#3399CC.#3399FF.#33CC00.#33CC33.#33CC66.#33CC99.#33CCCC.#33CCFF.#6600CC.#6600FF.#6633CC.#6633FF.#66CC00.#66CC33.#9900CC.#9900FF.#9933CC.#9933FF.#99CC00.#99CC33.#CC0000.#CC0033.#CC0066.#CC0099.#CC00CC.#CC00FF.#CC3300.#CC3333.#CC3366.#CC3399.#CC33CC.#CC33FF.#CC6600.#CC6633.#CC9900.#CC9933.#CCCC00.#CCCC33.#FF0000.#FF0033.#FF0066.#FF0099.#FF00CC.#FF00FF.#FF3300.#FF3333.#FF3366.#FF3399.#FF33CC.#FF33FF.#FF6600.#FF6633.#FF9900.#FF9933.#FFCC00.#FFCC33".split(".");
	/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/
	function useColors() {
		if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
		if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
		let m;
		return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		if (args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff), !this.useColors) return;
		let c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		let index = 0, lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, (match) => {
			match !== "%%" && (index++, match === "%c" && (lastC = index));
		}), args.splice(lastC, 0, c);
	}
	/**
	* Invokes `console.debug()` when available.
	* No-op when `console.debug` is not a "function".
	* If `console.debug` is not available, falls back
	* to `console.log`.
	*
	* @api public
	*/
	exports.log = console.debug || console.log || (() => {});
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		try {
			namespaces ? exports.storage.setItem("debug", namespaces) : exports.storage.removeItem("debug");
		} catch {}
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		let r;
		try {
			r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
		} catch {}
		return !r && typeof process < "u" && "env" in process && (r = process.env.DEBUG), r;
	}
	/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/
	function localstorage() {
		try {
			return localStorage;
		} catch {}
	}
	module.exports = require_common()(exports);
	let { formatters } = module.exports;
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
	formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return "[UnexpectedJSONParseError]: " + error.message;
		}
	};
})), require_has_flag = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	module.exports = (flag, argv = process.argv) => {
		let prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--", position = argv.indexOf(prefix + flag), terminatorPosition = argv.indexOf("--");
		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
	};
})), require_supports_color = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let os = require("os"), tty$1 = require("tty"), hasFlag = require_has_flag(), { env } = process, forceColor;
	hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never") ? forceColor = 0 : (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) && (forceColor = 1), "FORCE_COLOR" in env && (forceColor = env.FORCE_COLOR === "true" ? 1 : env.FORCE_COLOR === "false" ? 0 : env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3));
	function translateLevel(level) {
		return level === 0 ? !1 : {
			level,
			hasBasic: !0,
			has256: level >= 2,
			has16m: level >= 3
		};
	}
	function supportsColor(haveStream, streamIsTTY) {
		if (forceColor === 0) return 0;
		if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
		if (hasFlag("color=256")) return 2;
		if (haveStream && !streamIsTTY && forceColor === void 0) return 0;
		let min = forceColor || 0;
		if (env.TERM === "dumb") return min;
		if (process.platform === "win32") {
			let osRelease = os.release().split(".");
			return Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586 ? Number(osRelease[2]) >= 14931 ? 3 : 2 : 1;
		}
		if ("CI" in env) return [
			"TRAVIS",
			"CIRCLECI",
			"APPVEYOR",
			"GITLAB_CI",
			"GITHUB_ACTIONS",
			"BUILDKITE"
		].some((sign) => sign in env) || env.CI_NAME === "codeship" ? 1 : min;
		if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
		if (env.COLORTERM === "truecolor") return 3;
		if ("TERM_PROGRAM" in env) {
			let version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
			switch (env.TERM_PROGRAM) {
				case "iTerm.app": return version >= 3 ? 3 : 2;
				case "Apple_Terminal": return 2;
			}
		}
		return /-256(color)?$/i.test(env.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM) || "COLORTERM" in env ? 1 : min;
	}
	function getSupportLevel(stream) {
		return translateLevel(supportsColor(stream, stream && stream.isTTY));
	}
	module.exports = {
		supportsColor: getSupportLevel,
		stdout: translateLevel(supportsColor(!0, tty$1.isatty(1))),
		stderr: translateLevel(supportsColor(!0, tty$1.isatty(2)))
	};
})), require_node = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* Module dependencies.
	*/
	let tty = require("tty"), util = require("util");
	/**
	* Colors.
	*/
	exports.init = init, exports.log = log, exports.formatArgs = formatArgs, exports.save = save, exports.load = load, exports.useColors = useColors, exports.destroy = util.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."), exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		let supportsColor = require_supports_color();
		supportsColor && (supportsColor.stderr || supportsColor).level >= 2 && (exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		]);
	} catch {}
	/**
	* Build up the default `inspectOpts` object from the environment variables.
	*
	*   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	*/
	exports.inspectOpts = Object.keys(process.env).filter((key) => /^debug_/i.test(key)).reduce((obj, key) => {
		let prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => k.toUpperCase()), val = process.env[key];
		return val = /^(yes|on|true|enabled)$/i.test(val) ? !0 : /^(no|off|false|disabled)$/i.test(val) ? !1 : val === "null" ? null : Number(val), obj[prop] = val, obj;
	}, {});
	/**
	* Is stdout a TTY? Colored output is enabled when `true`.
	*/
	function useColors() {
		return "colors" in exports.inspectOpts ? !!exports.inspectOpts.colors : tty.isatty(process.stderr.fd);
	}
	/**
	* Adds ANSI color escape codes if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		let { namespace: name, useColors } = this;
		if (useColors) {
			let c = this.color, colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c), prefix = `  ${colorCode};1m${name} \u001B[0m`;
			args[0] = prefix + args[0].split("\n").join("\n" + prefix), args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = getDate() + name + " " + args[0];
	}
	function getDate() {
		return exports.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
	}
	/**
	* Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
	*/
	function log(...args) {
		return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		namespaces ? process.env.DEBUG = namespaces : delete process.env.DEBUG;
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		return process.env.DEBUG;
	}
	/**
	* Init logic for `debug` instances.
	*
	* Create a new `inspectOpts` object in case `useColors` is set
	* differently for a particular `debug` instance.
	*/
	function init(debug) {
		debug.inspectOpts = {};
		let keys = Object.keys(exports.inspectOpts);
		for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	module.exports = require_common()(exports);
	let { formatters } = module.exports;
	/**
	* Map %O to `util.inspect()`, allowing multiple lines if needed.
	*/
	formatters.o = function(v) {
		return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
	}, formatters.O = function(v) {
		return this.inspectOpts.colors = this.useColors, util.inspect(v, this.inspectOpts);
	};
})), require_src = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	/**
	* Detect Electron renderer / nwjs process, which is node, but we should
	* treat as a browser.
	*/
	typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? module.exports = require_browser() : module.exports = require_node();
})), require_traverser = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let vk = require_ast_utils$1.a(), debug = require_src()("eslint:traverser");
	/**
	* Do nothing.
	* @returns {void}
	*/
	function noop() {}
	/**
	* Check whether the given value is an ASTNode or not.
	* @param {any} x The value to check.
	* @returns {boolean} `true` if the value is an ASTNode.
	*/
	function isNode(x) {
		return typeof x == "object" && !!x && typeof x.type == "string";
	}
	/**
	* Get the visitor keys of a given node.
	* @param {Object} visitorKeys The map of visitor keys.
	* @param {ASTNode} node The node to get their visitor keys.
	* @returns {string[]} The visitor keys of the node.
	*/
	function getVisitorKeys(visitorKeys, node) {
		let keys = visitorKeys[node.type];
		return keys || (keys = vk.getKeys(node), debug("Unknown node type \"%s\": Estimated visitor keys %j", node.type, keys)), keys;
	}
	module.exports = class Traverser {
		constructor() {
			this._current = null, this._parents = [], this._skipped = !1, this._broken = !1, this._visitorKeys = null, this._enter = null, this._leave = null;
		}
		/**
		* Gives current node.
		* @returns {ASTNode} The current node.
		*/
		current() {
			return this._current;
		}
		/**
		* Gives a copy of the ancestor nodes.
		* @returns {ASTNode[]} The ancestor nodes.
		*/
		parents() {
			return this._parents.slice(0);
		}
		/**
		* Break the current traversal.
		* @returns {void}
		*/
		break() {
			this._broken = !0;
		}
		/**
		* Skip child nodes for the current traversal.
		* @returns {void}
		*/
		skip() {
			this._skipped = !0;
		}
		/**
		* Traverse the given AST tree.
		* @param {ASTNode} node The root node to traverse.
		* @param {Object} options The option object.
		* @param {Object} [options.visitorKeys=DEFAULT_VISITOR_KEYS] The keys of each node types to traverse child nodes. Default is `./default-visitor-keys.json`.
		* @param {Function} [options.enter=noop] The callback function which is called on entering each node.
		* @param {Function} [options.leave=noop] The callback function which is called on leaving each node.
		* @returns {void}
		*/
		traverse(node, options) {
			this._current = null, this._parents = [], this._skipped = !1, this._broken = !1, this._visitorKeys = options.visitorKeys || vk.KEYS, this._enter = options.enter || noop, this._leave = options.leave || noop, this._traverse(node, null);
		}
		/**
		* Traverse the given AST tree recursively.
		* @param {ASTNode} node The current node.
		* @param {ASTNode|null} parent The parent node.
		* @returns {void}
		* @private
		*/
		_traverse(node, parent) {
			if (isNode(node)) {
				if (this._current = node, this._skipped = !1, this._enter(node, parent), !this._skipped && !this._broken) {
					let keys = getVisitorKeys(this._visitorKeys, node);
					if (keys.length >= 1) {
						this._parents.push(node);
						for (let i = 0; i < keys.length && !this._broken; ++i) {
							let child = node[keys[i]];
							if (Array.isArray(child)) for (let j = 0; j < child.length && !this._broken; ++j) this._traverse(child[j], node);
							else this._traverse(child, node);
						}
						this._parents.pop();
					}
				}
				this._broken || this._leave(node, parent), this._current = parent;
			}
		}
		/**
		* Calculates the keys to use for traversal.
		* @param {ASTNode} node The node to read keys from.
		* @returns {string[]} An array of keys to visit on the node.
		* @private
		*/
		static getKeys(node) {
			return vk.getKeys(node);
		}
		/**
		* Traverse the given AST tree.
		* @param {ASTNode} node The root node to traverse.
		* @param {Object} options The option object.
		* @param {Object} [options.visitorKeys=DEFAULT_VISITOR_KEYS] The keys of each node types to traverse child nodes. Default is `./default-visitor-keys.json`.
		* @param {Function} [options.enter=noop] The callback function which is called on entering each node.
		* @param {Function} [options.leave=noop] The callback function which is called on leaving each node.
		* @returns {void}
		*/
		static traverse(node, options) {
			new Traverser().traverse(node, options);
		}
		/**
		* The default visitor keys.
		* @type {Object}
		*/
		static get DEFAULT_VISITOR_KEYS() {
			return vk.KEYS;
		}
	};
})), require_no_unmodified_loop_condition = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let Traverser = require_traverser(), astUtils = require_ast_utils$1.t(), SENTINEL_PATTERN = /(?:(?:Call|Class|Function|Member|New|Yield)Expression|Statement|Declaration)$/u, LOOP_PATTERN = /^(?:DoWhile|For|While)Statement$/u, GROUP_PATTERN = /^(?:BinaryExpression|ConditionalExpression)$/u, SKIP_PATTERN = /^(?:ArrowFunction|Class|Function)Expression$/u, DYNAMIC_PATTERN = /^(?:Call|Member|New|TaggedTemplate|Yield)Expression$/u;
	/**
	* @typedef {Object} LoopConditionInfo
	* @property {eslint-scope.Reference} reference - The reference.
	* @property {ASTNode} group - BinaryExpression or ConditionalExpression nodes
	*      that the reference is belonging to.
	* @property {Function} isInLoop - The predicate which checks a given reference
	*      is in this loop.
	* @property {boolean} modified - The flag that the reference is modified in
	*      this loop.
	*/
	/**
	* Checks whether or not a given reference is a write reference.
	* @param {eslint-scope.Reference} reference A reference to check.
	* @returns {boolean} `true` if the reference is a write reference.
	*/
	function isWriteReference(reference) {
		if (reference.init) {
			let def = reference.resolved && reference.resolved.defs[0];
			if (!def || def.type !== "Variable" || def.parent.kind !== "var") return !1;
		}
		return reference.isWrite();
	}
	/**
	* Checks whether or not a given loop condition info does not have the modified
	* flag.
	* @param {LoopConditionInfo} condition A loop condition info to check.
	* @returns {boolean} `true` if the loop condition info is "unmodified".
	*/
	function isUnmodified(condition) {
		return !condition.modified;
	}
	/**
	* Checks whether or not a given loop condition info does not have the modified
	* flag and does not have the group this condition belongs to.
	* @param {LoopConditionInfo} condition A loop condition info to check.
	* @returns {boolean} `true` if the loop condition info is "unmodified".
	*/
	function isUnmodifiedAndNotBelongToGroup(condition) {
		return !(condition.modified || condition.group);
	}
	/**
	* Checks whether or not a given reference is inside of a given node.
	* @param {ASTNode} node A node to check.
	* @param {eslint-scope.Reference} reference A reference to check.
	* @returns {boolean} `true` if the reference is inside of the node.
	*/
	function isInRange(node, reference) {
		let or = node.range, ir = reference.identifier.range;
		return or[0] <= ir[0] && ir[1] <= or[1];
	}
	/**
	* Checks whether or not a given reference is inside of a loop node's condition.
	* @param {ASTNode} node A node to check.
	* @param {eslint-scope.Reference} reference A reference to check.
	* @returns {boolean} `true` if the reference is inside of the loop node's
	*      condition.
	*/
	let isInLoop = {
		WhileStatement: isInRange,
		DoWhileStatement: isInRange,
		ForStatement(node, reference) {
			return isInRange(node, reference) && !(node.init && isInRange(node.init, reference));
		}
	};
	/**
	* Gets the function which encloses a given reference.
	* This supports only FunctionDeclaration.
	* @param {eslint-scope.Reference} reference A reference to get.
	* @returns {ASTNode|null} The function node or null.
	*/
	function getEncloseFunctionDeclaration(reference) {
		let node = reference.identifier;
		for (; node;) {
			if (node.type === "FunctionDeclaration") return node.id ? node : null;
			node = node.parent;
		}
		return null;
	}
	/**
	* Updates the "modified" flags of given loop conditions with given modifiers.
	* @param {LoopConditionInfo[]} conditions The loop conditions to be updated.
	* @param {eslint-scope.Reference[]} modifiers The references to update.
	* @returns {void}
	*/
	function updateModifiedFlag(conditions, modifiers) {
		for (let i = 0; i < conditions.length; ++i) {
			let condition = conditions[i];
			for (let j = 0; !condition.modified && j < modifiers.length; ++j) {
				let modifier = modifiers[j], funcNode, funcVar;
				condition.modified = condition.isInLoop(modifier) || !!((funcNode = getEncloseFunctionDeclaration(modifier)) && (funcVar = astUtils.getVariableByName(modifier.from.upper, funcNode.id.name)) && funcVar.references.some(condition.isInLoop));
			}
		}
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "problem",
			docs: {
				description: "Disallow unmodified loop conditions",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/no-unmodified-loop-condition"
			},
			schema: [],
			messages: { loopConditionNotModified: "'{{name}}' is not modified in this loop." }
		},
		create(context) {
			let sourceCode = context.sourceCode, groupMap = null;
			/**
			* Reports a given condition info.
			* @param {LoopConditionInfo} condition A loop condition info to report.
			* @returns {void}
			*/
			function report(condition) {
				let node = condition.reference.identifier;
				context.report({
					node,
					messageId: "loopConditionNotModified",
					data: node
				});
			}
			/**
			* Registers given conditions to the group the condition belongs to.
			* @param {LoopConditionInfo[]} conditions A loop condition info to
			*      register.
			* @returns {void}
			*/
			function registerConditionsToGroup(conditions) {
				for (let i = 0; i < conditions.length; ++i) {
					let condition = conditions[i];
					if (condition.group) {
						let group = groupMap.get(condition.group);
						group || (group = [], groupMap.set(condition.group, group)), group.push(condition);
					}
				}
			}
			/**
			* Reports references which are inside of unmodified groups.
			* @param {LoopConditionInfo[]} conditions A loop condition info to report.
			* @returns {void}
			*/
			function checkConditionsInGroup(conditions) {
				conditions.every(isUnmodified) && conditions.forEach(report);
			}
			/**
			* Checks whether or not a given group node has any dynamic elements.
			* @param {ASTNode} root A node to check.
			*      This node is one of BinaryExpression or ConditionalExpression.
			* @returns {boolean} `true` if the node is dynamic.
			*/
			function hasDynamicExpressions(root) {
				let retv = !1;
				return Traverser.traverse(root, {
					visitorKeys: sourceCode.visitorKeys,
					enter(node) {
						DYNAMIC_PATTERN.test(node.type) ? (retv = !0, this.break()) : SKIP_PATTERN.test(node.type) && this.skip();
					}
				}), retv;
			}
			/**
			* Creates the loop condition information from a given reference.
			* @param {eslint-scope.Reference} reference A reference to create.
			* @returns {LoopConditionInfo|null} Created loop condition info, or null.
			*/
			function toLoopCondition(reference) {
				if (reference.init) return null;
				let group = null, child = reference.identifier, node = child.parent;
				for (; node;) {
					if (SENTINEL_PATTERN.test(node.type)) {
						if (LOOP_PATTERN.test(node.type) && node.test === child) return {
							reference,
							group,
							isInLoop: isInLoop[node.type].bind(null, node),
							modified: !1
						};
						break;
					}
					if (GROUP_PATTERN.test(node.type)) {
						if (hasDynamicExpressions(node)) break;
						group = node;
					}
					child = node, node = node.parent;
				}
				return null;
			}
			/**
			* Finds unmodified references which are inside of a loop condition.
			* Then reports the references which are outside of groups.
			* @param {eslint-scope.Variable} variable A variable to report.
			* @returns {void}
			*/
			function checkReferences(variable) {
				let conditions = variable.references.map(toLoopCondition).filter(Boolean);
				if (conditions.length === 0) return;
				registerConditionsToGroup(conditions);
				let modifiers = variable.references.filter(isWriteReference);
				modifiers.length > 0 && updateModifiedFlag(conditions, modifiers), conditions.filter(isUnmodifiedAndNotBelongToGroup).forEach(report);
			}
			return { "Program:exit"(node) {
				let queue = [sourceCode.getScope(node)];
				groupMap = /* @__PURE__ */ new Map();
				let scope;
				for (; scope = queue.pop();) queue.push(...scope.childScopes), scope.variables.forEach(checkReferences);
				groupMap.forEach(checkConditionsInGroup), groupMap = null;
			} };
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/no-unmodified-loop-condition.cjs
module.exports = require_no_unmodified_loop_condition().create;
//#endregion
