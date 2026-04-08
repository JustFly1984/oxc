const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/one-var.js
/**
* @fileoverview A rule to control the use of single variable declarations.
* @author Ian Christian Myers
*/
var require_one_var = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/**
	* Determines whether the given node is in a statement list.
	* @param {ASTNode} node node to check
	* @returns {boolean} `true` if the given node is in a statement list
	*/
	function isInStatementList(node) {
		return astUtils.STATEMENT_LIST_PARENTS.has(node.parent.type);
	}
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "suggestion",
			docs: {
				description: "Enforce variables to be declared either together or separately in functions",
				recommended: !1,
				frozen: !0,
				url: "https://eslint.org/docs/latest/rules/one-var"
			},
			fixable: "code",
			schema: [{ oneOf: [
				{ enum: [
					"always",
					"never",
					"consecutive"
				] },
				{
					type: "object",
					properties: {
						separateRequires: { type: "boolean" },
						var: { enum: [
							"always",
							"never",
							"consecutive"
						] },
						let: { enum: [
							"always",
							"never",
							"consecutive"
						] },
						const: { enum: [
							"always",
							"never",
							"consecutive"
						] },
						using: { enum: [
							"always",
							"never",
							"consecutive"
						] },
						awaitUsing: { enum: [
							"always",
							"never",
							"consecutive"
						] }
					},
					additionalProperties: !1
				},
				{
					type: "object",
					properties: {
						initialized: { enum: [
							"always",
							"never",
							"consecutive"
						] },
						uninitialized: { enum: [
							"always",
							"never",
							"consecutive"
						] }
					},
					additionalProperties: !1
				}
			] }],
			messages: {
				combineUninitialized: "Combine this with the previous '{{type}}' statement with uninitialized variables.",
				combineInitialized: "Combine this with the previous '{{type}}' statement with initialized variables.",
				splitUninitialized: "Split uninitialized '{{type}}' declarations into multiple statements.",
				splitInitialized: "Split initialized '{{type}}' declarations into multiple statements.",
				splitRequires: "Split requires to be separated into a single block.",
				combine: "Combine this with the previous '{{type}}' statement.",
				split: "Split '{{type}}' declarations into multiple statements."
			}
		},
		create(context) {
			let MODE_ALWAYS = "always", MODE_NEVER = "never", MODE_CONSECUTIVE = "consecutive", mode = context.options[0] || MODE_ALWAYS, options = {};
			typeof mode == "string" ? (options.var = {
				uninitialized: mode,
				initialized: mode
			}, options.let = {
				uninitialized: mode,
				initialized: mode
			}, options.const = {
				uninitialized: mode,
				initialized: mode
			}, options.using = {
				uninitialized: mode,
				initialized: mode
			}, options.awaitUsing = {
				uninitialized: mode,
				initialized: mode
			}) : typeof mode == "object" && (options.separateRequires = !!mode.separateRequires, options.var = {
				uninitialized: mode.var,
				initialized: mode.var
			}, options.let = {
				uninitialized: mode.let,
				initialized: mode.let
			}, options.const = {
				uninitialized: mode.const,
				initialized: mode.const
			}, options.using = {
				uninitialized: mode.using,
				initialized: mode.using
			}, options.awaitUsing = {
				uninitialized: mode.awaitUsing,
				initialized: mode.awaitUsing
			}, Object.hasOwn(mode, "uninitialized") && (options.var.uninitialized = mode.uninitialized, options.let.uninitialized = mode.uninitialized, options.const.uninitialized = mode.uninitialized, options.using.uninitialized = mode.uninitialized, options.awaitUsing.uninitialized = mode.uninitialized), Object.hasOwn(mode, "initialized") && (options.var.initialized = mode.initialized, options.let.initialized = mode.initialized, options.const.initialized = mode.initialized, options.using.initialized = mode.initialized, options.awaitUsing.initialized = mode.initialized));
			let sourceCode = context.sourceCode, functionStack = [], blockStack = [];
			/**
			* Increments the blockStack counter.
			* @returns {void}
			* @private
			*/
			function startBlock() {
				blockStack.push({
					let: {
						initialized: !1,
						uninitialized: !1
					},
					const: {
						initialized: !1,
						uninitialized: !1
					},
					using: {
						initialized: !1,
						uninitialized: !1
					},
					awaitUsing: {
						initialized: !1,
						uninitialized: !1
					}
				});
			}
			/**
			* Increments the functionStack counter.
			* @returns {void}
			* @private
			*/
			function startFunction() {
				functionStack.push({
					initialized: !1,
					uninitialized: !1
				}), startBlock();
			}
			/**
			* Decrements the blockStack counter.
			* @returns {void}
			* @private
			*/
			function endBlock() {
				blockStack.pop();
			}
			/**
			* Decrements the functionStack counter.
			* @returns {void}
			* @private
			*/
			function endFunction() {
				functionStack.pop(), endBlock();
			}
			/**
			* Check if a variable declaration is a require.
			* @param {ASTNode} decl variable declaration Node
			* @returns {bool} if decl is a require, return true; else return false.
			* @private
			*/
			function isRequire(decl) {
				return decl.init && decl.init.type === "CallExpression" && decl.init.callee.name === "require";
			}
			/**
			* Records whether initialized/uninitialized/required variables are defined in current scope.
			* @param {string} statementType one of: "var", "let", "const", "using", or "awaitUsing"
			* @param {ASTNode[]} declarations List of declarations
			* @param {Object} currentScope The scope being investigated
			* @returns {void}
			* @private
			*/
			function recordTypes(statementType, declarations, currentScope) {
				for (let i = 0; i < declarations.length; i++) declarations[i].init === null ? options[statementType] && options[statementType].uninitialized === MODE_ALWAYS && (currentScope.uninitialized = !0) : options[statementType] && options[statementType].initialized === MODE_ALWAYS && (options.separateRequires && isRequire(declarations[i]) ? currentScope.required = !0 : currentScope.initialized = !0);
			}
			/**
			* Determines the current scope (function or block)
			* @param {string} statementType one of: "var", "let", "const", "using", or "awaitUsing"
			* @returns {Object} The scope associated with statementType
			*/
			function getCurrentScope(statementType) {
				let currentScope;
				return statementType === "var" ? currentScope = functionStack.at(-1) : statementType === "let" ? currentScope = blockStack.at(-1).let : statementType === "const" ? currentScope = blockStack.at(-1).const : statementType === "using" ? currentScope = blockStack.at(-1).using : statementType === "awaitUsing" && (currentScope = blockStack.at(-1).awaitUsing), currentScope;
			}
			/**
			* Counts the number of initialized and uninitialized declarations in a list of declarations
			* @param {ASTNode[]} declarations List of declarations
			* @returns {Object} Counts of 'uninitialized' and 'initialized' declarations
			* @private
			*/
			function countDeclarations(declarations) {
				let counts = {
					uninitialized: 0,
					initialized: 0
				};
				for (let i = 0; i < declarations.length; i++) declarations[i].init === null ? counts.uninitialized++ : counts.initialized++;
				return counts;
			}
			/**
			* Determines if there is more than one var statement in the current scope.
			* @param {string} statementType one of: "var", "let", "const", "using", or "awaitUsing"
			* @param {ASTNode[]} declarations List of declarations
			* @returns {boolean} Returns true if it is the first var declaration, false if not.
			* @private
			*/
			function hasOnlyOneStatement(statementType, declarations) {
				let declarationCounts = countDeclarations(declarations), currentOptions = options[statementType] || {}, currentScope = getCurrentScope(statementType), hasRequires = declarations.some(isRequire);
				return currentOptions.uninitialized === MODE_ALWAYS && currentOptions.initialized === MODE_ALWAYS && (currentScope.uninitialized || currentScope.initialized) && !hasRequires || declarationCounts.uninitialized > 0 && currentOptions.uninitialized === MODE_ALWAYS && currentScope.uninitialized || declarationCounts.initialized > 0 && currentOptions.initialized === MODE_ALWAYS && currentScope.initialized && !hasRequires || currentScope.required && hasRequires ? !1 : (recordTypes(statementType, declarations, currentScope), !0);
			}
			/**
			* Fixer to join VariableDeclaration's into a single declaration
			* @param {VariableDeclarator[]} declarations The `VariableDeclaration` to join
			* @returns {Function} The fixer function
			*/
			function joinDeclarations(declarations) {
				let declaration = declarations[0], body = Array.isArray(declaration.parent.parent.body) ? declaration.parent.parent.body : [], previousNode = body[body.findIndex((node) => node.range[0] === declaration.parent.range[0]) - 1];
				return function* joinDeclarationsFixer(fixer) {
					let type = sourceCode.getFirstToken(declaration.parent), beforeType = sourceCode.getTokenBefore(type);
					if (previousNode && previousNode.kind === declaration.parent.kind) {
						if (beforeType.value === ";" ? yield fixer.replaceText(beforeType, ",") : yield fixer.insertTextAfter(beforeType, ","), declaration.parent.kind === "await using") {
							let usingToken = sourceCode.getTokenAfter(type);
							yield fixer.remove(usingToken);
						}
						yield fixer.replaceText(type, "");
					}
				};
			}
			/**
			* Fixer to split a VariableDeclaration into individual declarations
			* @param {VariableDeclaration} declaration The `VariableDeclaration` to split
			* @returns {Function|null} The fixer function
			*/
			function splitDeclarations(declaration) {
				let { parent } = declaration;
				return isInStatementList(parent.type === "ExportNamedDeclaration" ? parent : declaration) ? (fixer) => declaration.declarations.map((declarator) => {
					let tokenAfterDeclarator = sourceCode.getTokenAfter(declarator);
					if (tokenAfterDeclarator === null) return null;
					let afterComma = sourceCode.getTokenAfter(tokenAfterDeclarator, { includeComments: !0 });
					if (tokenAfterDeclarator.value !== ",") return null;
					let exportPlacement = declaration.parent.type === "ExportNamedDeclaration" ? "export " : "";
					if (afterComma.range[0] === tokenAfterDeclarator.range[1]) return fixer.replaceText(tokenAfterDeclarator, `; ${exportPlacement}${declaration.kind} `);
					if (afterComma.loc.start.line > tokenAfterDeclarator.loc.end.line || afterComma.type === "Line" || afterComma.type === "Block") {
						let lastComment = afterComma;
						for (; lastComment.type === "Line" || lastComment.type === "Block";) lastComment = sourceCode.getTokenAfter(lastComment, { includeComments: !0 });
						return fixer.replaceTextRange([tokenAfterDeclarator.range[0], lastComment.range[0]], `;${sourceCode.text.slice(tokenAfterDeclarator.range[1], lastComment.range[0])}${exportPlacement}${declaration.kind} `);
					}
					return fixer.replaceText(tokenAfterDeclarator, `; ${exportPlacement}${declaration.kind}`);
				}).filter((x) => x) : null;
			}
			/**
			* Checks a given VariableDeclaration node for errors.
			* @param {ASTNode} node The VariableDeclaration node to check
			* @returns {void}
			* @private
			*/
			function checkVariableDeclaration(node) {
				let parent = node.parent, type = node.kind, key = type === "await using" ? "awaitUsing" : type;
				if (!options[key]) return;
				let declarations = node.declarations, declarationCounts = countDeclarations(declarations), mixedRequires = declarations.some(isRequire) && !declarations.every(isRequire);
				options[key].initialized === MODE_ALWAYS && options.separateRequires && mixedRequires && context.report({
					node,
					messageId: "splitRequires"
				});
				let nodeIndex = parent.body && parent.body.length > 0 && parent.body.indexOf(node) || 0;
				if (nodeIndex > 0) {
					let previousNode = parent.body[nodeIndex - 1], isPreviousNodeDeclaration = previousNode.type === "VariableDeclaration", declarationsWithPrevious = declarations.concat(previousNode.declarations || []);
					if (isPreviousNodeDeclaration && previousNode.kind === type && !(declarationsWithPrevious.some(isRequire) && !declarationsWithPrevious.every(isRequire))) {
						let previousDeclCounts = countDeclarations(previousNode.declarations);
						options[key].initialized === MODE_CONSECUTIVE && options[key].uninitialized === MODE_CONSECUTIVE ? context.report({
							node,
							messageId: "combine",
							data: { type },
							fix: joinDeclarations(declarations)
						}) : options[key].initialized === MODE_CONSECUTIVE && declarationCounts.initialized > 0 && previousDeclCounts.initialized > 0 ? context.report({
							node,
							messageId: "combineInitialized",
							data: { type },
							fix: joinDeclarations(declarations)
						}) : options[key].uninitialized === MODE_CONSECUTIVE && declarationCounts.uninitialized > 0 && previousDeclCounts.uninitialized > 0 && context.report({
							node,
							messageId: "combineUninitialized",
							data: { type },
							fix: joinDeclarations(declarations)
						});
					}
				}
				if (!hasOnlyOneStatement(key, declarations)) {
					if (options[key].initialized === MODE_ALWAYS && options[key].uninitialized === MODE_ALWAYS) context.report({
						node,
						messageId: "combine",
						data: { type },
						fix: joinDeclarations(declarations)
					});
					else if (options[key].initialized === MODE_ALWAYS && declarationCounts.initialized > 0 && context.report({
						node,
						messageId: "combineInitialized",
						data: { type },
						fix: joinDeclarations(declarations)
					}), options[key].uninitialized === MODE_ALWAYS && declarationCounts.uninitialized > 0) {
						if (node.parent.left === node && (node.parent.type === "ForInStatement" || node.parent.type === "ForOfStatement")) return;
						context.report({
							node,
							messageId: "combineUninitialized",
							data: { type },
							fix: joinDeclarations(declarations)
						});
					}
				}
				(parent.type !== "ForStatement" || parent.init !== node) && declarationCounts.uninitialized + declarationCounts.initialized > 1 && (options[key].initialized === MODE_NEVER && options[key].uninitialized === MODE_NEVER ? context.report({
					node,
					messageId: "split",
					data: { type },
					fix: splitDeclarations(node)
				}) : options[key].initialized === MODE_NEVER && declarationCounts.initialized > 0 ? context.report({
					node,
					messageId: "splitInitialized",
					data: { type },
					fix: splitDeclarations(node)
				}) : options[key].uninitialized === MODE_NEVER && declarationCounts.uninitialized > 0 && context.report({
					node,
					messageId: "splitUninitialized",
					data: { type },
					fix: splitDeclarations(node)
				}));
			}
			return {
				Program: startFunction,
				FunctionDeclaration: startFunction,
				FunctionExpression: startFunction,
				ArrowFunctionExpression: startFunction,
				StaticBlock: startFunction,
				BlockStatement: startBlock,
				ForStatement: startBlock,
				ForInStatement: startBlock,
				ForOfStatement: startBlock,
				SwitchStatement: startBlock,
				VariableDeclaration: checkVariableDeclaration,
				"ForStatement:exit": endBlock,
				"ForOfStatement:exit": endBlock,
				"ForInStatement:exit": endBlock,
				"SwitchStatement:exit": endBlock,
				"BlockStatement:exit": endBlock,
				"Program:exit": endFunction,
				"FunctionDeclaration:exit": endFunction,
				"FunctionExpression:exit": endFunction,
				"ArrowFunctionExpression:exit": endFunction,
				"StaticBlock:exit": endFunction
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/one-var.cjs
module.exports = require_one_var().create;
//#endregion
