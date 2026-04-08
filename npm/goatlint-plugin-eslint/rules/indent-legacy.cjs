const require_chunk = require("../common/chunk.cjs"), require_ast_utils$1 = require("../common/ast-utils.cjs");
//#region ../../node_modules/.pnpm/eslint@9.39.4_jiti@2.6.1/node_modules/eslint/lib/rules/indent-legacy.js
/**
* @fileoverview This option sets a specific tab width for your code
*
* This rule has been ported and modified from nodeca.
* @author Vitaly Puzrin
* @author Gyandeep Singh
* @deprecated in ESLint v4.0.0
*/
var require_indent_legacy = /* @__PURE__ */ require_chunk.t(((exports, module) => {
	let astUtils = require_ast_utils$1.t();
	/* c8 ignore next */
	/** @type {import('../types').Rule.RuleModule} */
	module.exports = {
		meta: {
			type: "layout",
			docs: {
				description: "Enforce consistent indentation",
				recommended: !1,
				url: "https://eslint.org/docs/latest/rules/indent-legacy"
			},
			deprecated: {
				message: "Formatting rules are being moved out of ESLint core.",
				url: "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
				deprecatedSince: "4.0.0",
				availableUntil: "11.0.0",
				replacedBy: [{
					message: "ESLint Stylistic now maintains deprecated stylistic core rules.",
					url: "https://eslint.style/guide/migration",
					plugin: {
						name: "@stylistic/eslint-plugin",
						url: "https://eslint.style"
					},
					rule: {
						name: "indent",
						url: "https://eslint.style/rules/indent"
					}
				}]
			},
			fixable: "whitespace",
			schema: [{ oneOf: [{ enum: ["tab"] }, {
				type: "integer",
				minimum: 0
			}] }, {
				type: "object",
				properties: {
					SwitchCase: {
						type: "integer",
						minimum: 0
					},
					VariableDeclarator: { oneOf: [{
						type: "integer",
						minimum: 0
					}, {
						type: "object",
						properties: {
							var: {
								type: "integer",
								minimum: 0
							},
							let: {
								type: "integer",
								minimum: 0
							},
							const: {
								type: "integer",
								minimum: 0
							}
						}
					}] },
					outerIIFEBody: {
						type: "integer",
						minimum: 0
					},
					MemberExpression: {
						type: "integer",
						minimum: 0
					},
					FunctionDeclaration: {
						type: "object",
						properties: {
							parameters: { oneOf: [{
								type: "integer",
								minimum: 0
							}, { enum: ["first"] }] },
							body: {
								type: "integer",
								minimum: 0
							}
						}
					},
					FunctionExpression: {
						type: "object",
						properties: {
							parameters: { oneOf: [{
								type: "integer",
								minimum: 0
							}, { enum: ["first"] }] },
							body: {
								type: "integer",
								minimum: 0
							}
						}
					},
					CallExpression: {
						type: "object",
						properties: { parameters: { oneOf: [{
							type: "integer",
							minimum: 0
						}, { enum: ["first"] }] } }
					},
					ArrayExpression: { oneOf: [{
						type: "integer",
						minimum: 0
					}, { enum: ["first"] }] },
					ObjectExpression: { oneOf: [{
						type: "integer",
						minimum: 0
					}, { enum: ["first"] }] }
				},
				additionalProperties: !1
			}],
			messages: { expected: "Expected indentation of {{expected}} but found {{actual}}." }
		},
		create(context) {
			let indentType = "space", indentSize = 4, options = {
				SwitchCase: 0,
				VariableDeclarator: {
					var: 1,
					let: 1,
					const: 1
				},
				outerIIFEBody: null,
				FunctionDeclaration: {
					parameters: null,
					body: 1
				},
				FunctionExpression: {
					parameters: null,
					body: 1
				},
				CallExpression: { arguments: null },
				ArrayExpression: 1,
				ObjectExpression: 1
			}, sourceCode = context.sourceCode;
			if (context.options.length && (context.options[0] === "tab" ? (indentSize = 1, indentType = "tab") : typeof context.options[0] == "number" && (indentSize = context.options[0], indentType = "space"), context.options[1])) {
				let opts = context.options[1];
				options.SwitchCase = opts.SwitchCase || 0;
				let variableDeclaratorRules = opts.VariableDeclarator;
				typeof variableDeclaratorRules == "number" ? options.VariableDeclarator = {
					var: variableDeclaratorRules,
					let: variableDeclaratorRules,
					const: variableDeclaratorRules
				} : typeof variableDeclaratorRules == "object" && Object.assign(options.VariableDeclarator, variableDeclaratorRules), typeof opts.outerIIFEBody == "number" && (options.outerIIFEBody = opts.outerIIFEBody), typeof opts.MemberExpression == "number" && (options.MemberExpression = opts.MemberExpression), typeof opts.FunctionDeclaration == "object" && Object.assign(options.FunctionDeclaration, opts.FunctionDeclaration), typeof opts.FunctionExpression == "object" && Object.assign(options.FunctionExpression, opts.FunctionExpression), typeof opts.CallExpression == "object" && Object.assign(options.CallExpression, opts.CallExpression), (typeof opts.ArrayExpression == "number" || typeof opts.ArrayExpression == "string") && (options.ArrayExpression = opts.ArrayExpression), (typeof opts.ObjectExpression == "number" || typeof opts.ObjectExpression == "string") && (options.ObjectExpression = opts.ObjectExpression);
			}
			let caseIndentStore = {};
			/**
			* Creates an error message for a line, given the expected/actual indentation.
			* @param {number} expectedAmount The expected amount of indentation characters for this line
			* @param {number} actualSpaces The actual number of indentation spaces that were found on this line
			* @param {number} actualTabs The actual number of indentation tabs that were found on this line
			* @returns {string} An error message for this line
			*/
			function createErrorMessageData(expectedAmount, actualSpaces, actualTabs) {
				let expectedStatement = `${expectedAmount} ${indentType}${expectedAmount === 1 ? "" : "s"}`, foundSpacesWord = `space${actualSpaces === 1 ? "" : "s"}`, foundTabsWord = `tab${actualTabs === 1 ? "" : "s"}`, foundStatement;
				return foundStatement = actualSpaces > 0 && actualTabs > 0 ? `${actualSpaces} ${foundSpacesWord} and ${actualTabs} ${foundTabsWord}` : actualSpaces > 0 ? indentType === "space" ? actualSpaces : `${actualSpaces} ${foundSpacesWord}` : actualTabs > 0 ? indentType === "tab" ? actualTabs : `${actualTabs} ${foundTabsWord}` : "0", {
					expected: expectedStatement,
					actual: foundStatement
				};
			}
			/**
			* Reports a given indent violation
			* @param {ASTNode} node Node violating the indent rule
			* @param {number} needed Expected indentation character count
			* @param {number} gottenSpaces Indentation space count in the actual node/code
			* @param {number} gottenTabs Indentation tab count in the actual node/code
			* @param {Object} [loc] Error line and column location
			* @param {boolean} isLastNodeCheck Is the error for last node check
			* @returns {void}
			*/
			function report(node, needed, gottenSpaces, gottenTabs, loc, isLastNodeCheck) {
				if (gottenSpaces && gottenTabs) return;
				let desiredIndent = (indentType === "space" ? " " : "	").repeat(needed), textRange = isLastNodeCheck ? [node.range[1] - node.loc.end.column, node.range[1] - node.loc.end.column + gottenSpaces + gottenTabs] : [node.range[0] - node.loc.start.column, node.range[0] - node.loc.start.column + gottenSpaces + gottenTabs];
				context.report({
					node,
					loc,
					messageId: "expected",
					data: createErrorMessageData(needed, gottenSpaces, gottenTabs),
					fix: (fixer) => fixer.replaceTextRange(textRange, desiredIndent)
				});
			}
			/**
			* Get the actual indent of node
			* @param {ASTNode|Token} node Node to examine
			* @param {boolean} [byLastLine=false] get indent of node's last line
			* @returns {Object} The node's indent. Contains keys `space` and `tab`, representing the indent of each character. Also
			* contains keys `goodChar` and `badChar`, where `goodChar` is the amount of the user's desired indentation character, and
			* `badChar` is the amount of the other indentation character.
			*/
			function getNodeIndent(node, byLastLine) {
				let token = byLastLine ? sourceCode.getLastToken(node) : sourceCode.getFirstToken(node), srcCharsBeforeNode = sourceCode.getText(token, token.loc.start.column).split(""), indentChars = srcCharsBeforeNode.slice(0, srcCharsBeforeNode.findIndex((char) => char !== " " && char !== "	")), spaces = indentChars.filter((char) => char === " ").length, tabs = indentChars.filter((char) => char === "	").length;
				return {
					space: spaces,
					tab: tabs,
					goodChar: indentType === "space" ? spaces : tabs,
					badChar: indentType === "space" ? tabs : spaces
				};
			}
			/**
			* Checks node is the first in its own start line. By default it looks by start line.
			* @param {ASTNode} node The node to check
			* @param {boolean} [byEndLocation=false] Lookup based on start position or end
			* @returns {boolean} true if its the first in the its start line
			*/
			function isNodeFirstInLine(node, byEndLocation) {
				let firstToken = byEndLocation === !0 ? sourceCode.getLastToken(node, 1) : sourceCode.getTokenBefore(node);
				return (byEndLocation === !0 ? node.loc.end.line : node.loc.start.line) !== (firstToken ? firstToken.loc.end.line : -1);
			}
			/**
			* Check indent for node
			* @param {ASTNode} node Node to check
			* @param {number} neededIndent needed indent
			* @returns {void}
			*/
			function checkNodeIndent(node, neededIndent) {
				let actualIndent = getNodeIndent(node, !1);
				node.type !== "ArrayExpression" && node.type !== "ObjectExpression" && (actualIndent.goodChar !== neededIndent || actualIndent.badChar !== 0) && isNodeFirstInLine(node) && report(node, neededIndent, actualIndent.space, actualIndent.tab), node.type === "IfStatement" && node.alternate && (checkNodeIndent(sourceCode.getTokenBefore(node.alternate), neededIndent), isNodeFirstInLine(node.alternate) || checkNodeIndent(node.alternate, neededIndent)), node.type === "TryStatement" && node.handler && checkNodeIndent(sourceCode.getFirstToken(node.handler), neededIndent), node.type === "TryStatement" && node.finalizer && checkNodeIndent(sourceCode.getTokenBefore(node.finalizer), neededIndent), node.type === "DoWhileStatement" && checkNodeIndent(sourceCode.getTokenAfter(node.body), neededIndent);
			}
			/**
			* Check indent for nodes list
			* @param {ASTNode[]} nodes list of node objects
			* @param {number} indent needed indent
			* @returns {void}
			*/
			function checkNodesIndent(nodes, indent) {
				nodes.forEach((node) => checkNodeIndent(node, indent));
			}
			/**
			* Check last node line indent this detects, that block closed correctly
			* @param {ASTNode} node Node to examine
			* @param {number} lastLineIndent needed indent
			* @returns {void}
			*/
			function checkLastNodeLineIndent(node, lastLineIndent) {
				let lastToken = sourceCode.getLastToken(node), endIndent = getNodeIndent(lastToken, !0);
				(endIndent.goodChar !== lastLineIndent || endIndent.badChar !== 0) && isNodeFirstInLine(node, !0) && report(node, lastLineIndent, endIndent.space, endIndent.tab, {
					line: lastToken.loc.start.line,
					column: lastToken.loc.start.column
				}, !0);
			}
			/**
			* Check last node line indent this detects, that block closed correctly
			* This function for more complicated return statement case, where closing parenthesis may be followed by ';'
			* @param {ASTNode} node Node to examine
			* @param {number} firstLineIndent first line needed indent
			* @returns {void}
			*/
			function checkLastReturnStatementLineIndent(node, firstLineIndent) {
				let lastToken = sourceCode.getLastToken(node, astUtils.isClosingParenToken);
				if (sourceCode.getText(lastToken, lastToken.loc.start.column).slice(0, -1).trim()) return;
				let endIndent = getNodeIndent(lastToken, !0);
				endIndent.goodChar !== firstLineIndent && report(node, firstLineIndent, endIndent.space, endIndent.tab, {
					line: lastToken.loc.start.line,
					column: lastToken.loc.start.column
				}, !0);
			}
			/**
			* Check first node line indent is correct
			* @param {ASTNode} node Node to examine
			* @param {number} firstLineIndent needed indent
			* @returns {void}
			*/
			function checkFirstNodeLineIndent(node, firstLineIndent) {
				let startIndent = getNodeIndent(node, !1);
				(startIndent.goodChar !== firstLineIndent || startIndent.badChar !== 0) && isNodeFirstInLine(node) && report(node, firstLineIndent, startIndent.space, startIndent.tab, {
					line: node.loc.start.line,
					column: node.loc.start.column
				});
			}
			/**
			* Returns a parent node of given node based on a specified type
			* if not present then return null
			* @param {ASTNode} node node to examine
			* @param {string} type type that is being looked for
			* @param {string} stopAtList end points for the evaluating code
			* @returns {ASTNode|void} if found then node otherwise null
			*/
			function getParentNodeByType(node, type, stopAtList) {
				let parent = node.parent, stopAtSet = new Set(stopAtList || ["Program"]);
				for (; parent.type !== type && !stopAtSet.has(parent.type) && parent.type !== "Program";) parent = parent.parent;
				return parent.type === type ? parent : null;
			}
			/**
			* Returns the VariableDeclarator based on the current node
			* if not present then return null
			* @param {ASTNode} node node to examine
			* @returns {ASTNode|void} if found then node otherwise null
			*/
			function getVariableDeclaratorNode(node) {
				return getParentNodeByType(node, "VariableDeclarator");
			}
			/**
			* Check to see if the node is part of the multi-line variable declaration.
			* Also if its on the same line as the varNode
			* @param {ASTNode} node node to check
			* @param {ASTNode} varNode variable declaration node to check against
			* @returns {boolean} True if all the above condition satisfy
			*/
			function isNodeInVarOnTop(node, varNode) {
				return varNode && varNode.parent.loc.start.line === node.loc.start.line && varNode.parent.declarations.length > 1;
			}
			/**
			* Check to see if the argument before the callee node is multi-line and
			* there should only be 1 argument before the callee node
			* @param {ASTNode} node node to check
			* @returns {boolean} True if arguments are multi-line
			*/
			function isArgBeforeCalleeNodeMultiline(node) {
				let parent = node.parent;
				return parent.arguments.length >= 2 && parent.arguments[1] === node ? parent.arguments[0].loc.end.line > parent.arguments[0].loc.start.line : !1;
			}
			/**
			* Check to see if the node is a file level IIFE
			* @param {ASTNode} node The function node to check.
			* @returns {boolean} True if the node is the outer IIFE
			*/
			function isOuterIIFE(node) {
				let parent = node.parent, stmt = parent.parent;
				if (parent.type !== "CallExpression" || parent.callee !== node) return !1;
				for (; stmt.type === "UnaryExpression" && (stmt.operator === "!" || stmt.operator === "~" || stmt.operator === "+" || stmt.operator === "-") || stmt.type === "AssignmentExpression" || stmt.type === "LogicalExpression" || stmt.type === "SequenceExpression" || stmt.type === "VariableDeclarator";) stmt = stmt.parent;
				return (stmt.type === "ExpressionStatement" || stmt.type === "VariableDeclaration") && stmt.parent && stmt.parent.type === "Program";
			}
			/**
			* Check indent for function block content
			* @param {ASTNode} node A BlockStatement node that is inside of a function.
			* @returns {void}
			*/
			function checkIndentInFunctionBlock(node) {
				let calleeNode = node.parent, indent;
				if (indent = calleeNode.parent && (calleeNode.parent.type === "Property" || calleeNode.parent.type === "ArrayExpression") ? getNodeIndent(calleeNode, !1).goodChar : getNodeIndent(calleeNode).goodChar, calleeNode.parent.type === "CallExpression") {
					let calleeParent = calleeNode.parent;
					calleeNode.type !== "FunctionExpression" && calleeNode.type !== "ArrowFunctionExpression" ? calleeParent && calleeParent.loc.start.line < node.loc.start.line && (indent = getNodeIndent(calleeParent).goodChar) : isArgBeforeCalleeNodeMultiline(calleeNode) && calleeParent.callee.loc.start.line === calleeParent.callee.loc.end.line && !isNodeFirstInLine(calleeNode) && (indent = getNodeIndent(calleeParent).goodChar);
				}
				let functionOffset = indentSize;
				options.outerIIFEBody !== null && isOuterIIFE(calleeNode) ? functionOffset = options.outerIIFEBody * indentSize : calleeNode.type === "FunctionExpression" ? functionOffset = options.FunctionExpression.body * indentSize : calleeNode.type === "FunctionDeclaration" && (functionOffset = options.FunctionDeclaration.body * indentSize), indent += functionOffset;
				let parentVarNode = getVariableDeclaratorNode(node);
				parentVarNode && isNodeInVarOnTop(node, parentVarNode) && (indent += indentSize * options.VariableDeclarator[parentVarNode.parent.kind]), node.body.length > 0 && checkNodesIndent(node.body, indent), checkLastNodeLineIndent(node, indent - functionOffset);
			}
			/**
			* Checks if the given node starts and ends on the same line
			* @param {ASTNode} node The node to check
			* @returns {boolean} Whether or not the block starts and ends on the same line.
			*/
			function isSingleLineNode(node) {
				let lastToken = sourceCode.getLastToken(node);
				return node.loc.start.line === lastToken.loc.end.line;
			}
			/**
			* Check indent for array block content or object block content
			* @param {ASTNode} node node to examine
			* @returns {void}
			*/
			function checkIndentInArrayOrObjectBlock(node) {
				if (isSingleLineNode(node)) return;
				let elements = node.type === "ArrayExpression" ? node.elements : node.properties;
				elements = elements.filter((elem) => elem !== null);
				let nodeIndent, elementsIndent, parentVarNode = getVariableDeclaratorNode(node);
				if (isNodeFirstInLine(node)) {
					let parent = node.parent;
					if (nodeIndent = getNodeIndent(parent).goodChar, (!parentVarNode || parentVarNode.loc.start.line !== node.loc.start.line) && (parent.type !== "VariableDeclarator" || parentVarNode === parentVarNode.parent.declarations[0])) if (parent.type === "VariableDeclarator" && parentVarNode.loc.start.line === parent.loc.start.line) nodeIndent += indentSize * options.VariableDeclarator[parentVarNode.parent.kind];
					else if (parent.type === "ObjectExpression" || parent.type === "ArrayExpression") {
						let parentElements = node.parent.type === "ObjectExpression" ? node.parent.properties : node.parent.elements;
						parentElements[0] && parentElements[0].loc.start.line === parent.loc.start.line && parentElements[0].loc.end.line !== parent.loc.start.line || (typeof options[parent.type] == "number" ? nodeIndent += options[parent.type] * indentSize : nodeIndent = parentElements[0].loc.start.column);
					} else parent.type === "CallExpression" || parent.type === "NewExpression" ? typeof options.CallExpression.arguments == "number" ? nodeIndent += options.CallExpression.arguments * indentSize : options.CallExpression.arguments === "first" ? parent.arguments.includes(node) && (nodeIndent = parent.arguments[0].loc.start.column) : nodeIndent += indentSize : (parent.type === "LogicalExpression" || parent.type === "ArrowFunctionExpression") && (nodeIndent += indentSize);
					checkFirstNodeLineIndent(node, nodeIndent);
				} else nodeIndent = getNodeIndent(node).goodChar;
				elementsIndent = options[node.type] === "first" ? elements.length ? elements[0].loc.start.column : 0 : nodeIndent + indentSize * options[node.type], isNodeInVarOnTop(node, parentVarNode) && (elementsIndent += indentSize * options.VariableDeclarator[parentVarNode.parent.kind]), checkNodesIndent(elements, elementsIndent), !(elements.length > 0 && elements.at(-1).loc.end.line === node.loc.end.line) && checkLastNodeLineIndent(node, nodeIndent + (isNodeInVarOnTop(node, parentVarNode) ? options.VariableDeclarator[parentVarNode.parent.kind] * indentSize : 0));
			}
			/**
			* Check if the node or node body is a BlockStatement or not
			* @param {ASTNode} node node to test
			* @returns {boolean} True if it or its body is a block statement
			*/
			function isNodeBodyBlock(node) {
				return node.type === "BlockStatement" || node.type === "ClassBody" || node.body && node.body.type === "BlockStatement" || node.consequent && node.consequent.type === "BlockStatement";
			}
			/**
			* Check indentation for blocks
			* @param {ASTNode} node node to check
			* @returns {void}
			*/
			function blockIndentationCheck(node) {
				if (isSingleLineNode(node)) return;
				if (node.parent && (node.parent.type === "FunctionExpression" || node.parent.type === "FunctionDeclaration" || node.parent.type === "ArrowFunctionExpression")) {
					checkIndentInFunctionBlock(node);
					return;
				}
				let indent, nodesToCheck;
				indent = node.parent && [
					"IfStatement",
					"WhileStatement",
					"ForStatement",
					"ForInStatement",
					"ForOfStatement",
					"DoWhileStatement",
					"ClassDeclaration",
					"TryStatement"
				].includes(node.parent.type) && isNodeBodyBlock(node) ? getNodeIndent(node.parent).goodChar : node.parent && node.parent.type === "CatchClause" ? getNodeIndent(node.parent.parent).goodChar : getNodeIndent(node).goodChar, nodesToCheck = node.type === "IfStatement" && node.consequent.type !== "BlockStatement" ? [node.consequent] : Array.isArray(node.body) ? node.body : [node.body], nodesToCheck.length > 0 && checkNodesIndent(nodesToCheck, indent + indentSize), node.type === "BlockStatement" && checkLastNodeLineIndent(node, indent);
			}
			/**
			* Filter out the elements which are on the same line of each other or the node.
			* basically have only 1 elements from each line except the variable declaration line.
			* @param {ASTNode} node Variable declaration node
			* @returns {ASTNode[]} Filtered elements
			*/
			function filterOutSameLineVars(node) {
				return node.declarations.reduce((finalCollection, elem) => {
					let lastElem = finalCollection.at(-1);
					return (elem.loc.start.line !== node.loc.start.line && !lastElem || lastElem && lastElem.loc.start.line !== elem.loc.start.line) && finalCollection.push(elem), finalCollection;
				}, []);
			}
			/**
			* Check indentation for variable declarations
			* @param {ASTNode} node node to examine
			* @returns {void}
			*/
			function checkIndentInVariableDeclarations(node) {
				let elements = filterOutSameLineVars(node), nodeIndent = getNodeIndent(node).goodChar, lastElement = elements.at(-1), elementsIndent = nodeIndent + indentSize * options.VariableDeclarator[node.kind];
				if (checkNodesIndent(elements, elementsIndent), sourceCode.getLastToken(node).loc.end.line <= lastElement.loc.end.line) return;
				let tokenBeforeLastElement = sourceCode.getTokenBefore(lastElement);
				tokenBeforeLastElement.value === "," ? checkLastNodeLineIndent(node, getNodeIndent(tokenBeforeLastElement).goodChar) : checkLastNodeLineIndent(node, elementsIndent - indentSize);
			}
			/**
			* Check and decide whether to check for indentation for blockless nodes
			* Scenarios are for or while statements without braces around them
			* @param {ASTNode} node node to examine
			* @returns {void}
			*/
			function blockLessNodes(node) {
				node.body.type !== "BlockStatement" && blockIndentationCheck(node);
			}
			/**
			* Returns the expected indentation for the case statement
			* @param {ASTNode} node node to examine
			* @param {number} [providedSwitchIndent] indent for switch statement
			* @returns {number} indent size
			*/
			function expectedCaseIndent(node, providedSwitchIndent) {
				let switchNode = node.type === "SwitchStatement" ? node : node.parent, switchIndent = providedSwitchIndent === void 0 ? getNodeIndent(switchNode).goodChar : providedSwitchIndent, caseIndent;
				return caseIndentStore[switchNode.loc.start.line] ? caseIndentStore[switchNode.loc.start.line] : (caseIndent = switchNode.cases.length > 0 && options.SwitchCase === 0 ? switchIndent : switchIndent + indentSize * options.SwitchCase, caseIndentStore[switchNode.loc.start.line] = caseIndent, caseIndent);
			}
			/**
			* Checks whether a return statement is wrapped in ()
			* @param {ASTNode} node node to examine
			* @returns {boolean} the result
			*/
			function isWrappedInParenthesis(node) {
				let regex = /^return\s*\(\s*\)/u, statementWithoutArgument = sourceCode.getText(node).replace(sourceCode.getText(node.argument), "");
				return regex.test(statementWithoutArgument);
			}
			return {
				Program(node) {
					node.body.length > 0 && checkNodesIndent(node.body, getNodeIndent(node).goodChar);
				},
				ClassBody: blockIndentationCheck,
				BlockStatement: blockIndentationCheck,
				WhileStatement: blockLessNodes,
				ForStatement: blockLessNodes,
				ForInStatement: blockLessNodes,
				ForOfStatement: blockLessNodes,
				DoWhileStatement: blockLessNodes,
				IfStatement(node) {
					node.consequent.type !== "BlockStatement" && node.consequent.loc.start.line > node.loc.start.line && blockIndentationCheck(node);
				},
				VariableDeclaration(node) {
					node.declarations.at(-1).loc.start.line > node.declarations[0].loc.start.line && checkIndentInVariableDeclarations(node);
				},
				ObjectExpression(node) {
					checkIndentInArrayOrObjectBlock(node);
				},
				ArrayExpression(node) {
					checkIndentInArrayOrObjectBlock(node);
				},
				MemberExpression(node) {
					if (options.MemberExpression === void 0 || isSingleLineNode(node) || getParentNodeByType(node, "VariableDeclarator", ["FunctionExpression", "ArrowFunctionExpression"]) || getParentNodeByType(node, "AssignmentExpression", ["FunctionExpression"])) return;
					let propertyIndent = getNodeIndent(node).goodChar + indentSize * options.MemberExpression, checkNodes = [node.property], dot = sourceCode.getTokenBefore(node.property);
					dot.type === "Punctuator" && dot.value === "." && checkNodes.push(dot), checkNodesIndent(checkNodes, propertyIndent);
				},
				SwitchStatement(node) {
					let switchIndent = getNodeIndent(node).goodChar, caseIndent = expectedCaseIndent(node, switchIndent);
					checkNodesIndent(node.cases, caseIndent), checkLastNodeLineIndent(node, switchIndent);
				},
				SwitchCase(node) {
					if (isSingleLineNode(node)) return;
					let caseIndent = expectedCaseIndent(node);
					checkNodesIndent(node.consequent, caseIndent + indentSize);
				},
				FunctionDeclaration(node) {
					isSingleLineNode(node) || (options.FunctionDeclaration.parameters === "first" && node.params.length ? checkNodesIndent(node.params.slice(1), node.params[0].loc.start.column) : options.FunctionDeclaration.parameters !== null && checkNodesIndent(node.params, getNodeIndent(node).goodChar + indentSize * options.FunctionDeclaration.parameters));
				},
				FunctionExpression(node) {
					isSingleLineNode(node) || (options.FunctionExpression.parameters === "first" && node.params.length ? checkNodesIndent(node.params.slice(1), node.params[0].loc.start.column) : options.FunctionExpression.parameters !== null && checkNodesIndent(node.params, getNodeIndent(node).goodChar + indentSize * options.FunctionExpression.parameters));
				},
				ReturnStatement(node) {
					if (isSingleLineNode(node)) return;
					let firstLineIndent = getNodeIndent(node).goodChar;
					isWrappedInParenthesis(node) ? checkLastReturnStatementLineIndent(node, firstLineIndent) : checkNodeIndent(node, firstLineIndent);
				},
				CallExpression(node) {
					isSingleLineNode(node) || (options.CallExpression.arguments === "first" && node.arguments.length ? checkNodesIndent(node.arguments.slice(1), node.arguments[0].loc.start.column) : options.CallExpression.arguments !== null && checkNodesIndent(node.arguments, getNodeIndent(node).goodChar + indentSize * options.CallExpression.arguments));
				}
			};
		}
	};
}));
//#endregion
//#region src-js/generated/plugin-eslint/rules/indent-legacy.cjs
module.exports = require_indent_legacy().create;
//#endregion
