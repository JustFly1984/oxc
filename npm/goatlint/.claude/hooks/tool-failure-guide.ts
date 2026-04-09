// PostToolUseFailure hook: parses Bash errors and suggests fixes.

import { parseStdin, ToolFailureInputSchema } from "./hook-input.ts";

const input = await parseStdin(ToolFailureInputSchema);
if (input === null) process.exit(0);
const error = input.tool_error ?? input.error ?? "";

if (error === "") process.exit(0);

const suggestions: Array<string> = [];

if (/command not found/.test(error))
  suggestions.push("Package not installed. Try: bun add -D <package>");

if (/ENOENT|No such file or directory/.test(error))
  suggestions.push("File or directory doesn't exist. Check the path and cwd.");

if (/EACCES|Permission denied/.test(error))
  suggestions.push("Permission denied. Check file permissions with ls -la.");

if (/EADDRINUSE|address already in use/.test(error))
  suggestions.push(
    "Port already in use. Check: lsof -i :<port> and kill the process.",
  );

if (/ECONNREFUSED/.test(error))
  suggestions.push("Connection refused. Is the service running?");

if (/Module not found|Cannot find module/.test(error))
  suggestions.push("Missing module. Try: bun install");

if (/SyntaxError|Parse error/.test(error))
  suggestions.push("Syntax error in the code. Check the file for typos.");

if (/out of memory|heap/.test(error))
  suggestions.push(
    "Out of memory. Check for infinite loops or large allocations.",
  );

if (/ETIMEOUT|timed out/.test(error))
  suggestions.push(
    "Operation timed out. Check network connectivity or increase timeout.",
  );

if (suggestions.length > 0) {
  process.stderr.write(`HINT: ${suggestions.join(" | ")}\n`);
}

// ─── Self-Evolution: bridge failure to session-end for aggregation ────────
try {
  const { mkdirSync, writeFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";
  const bridgeDir = join(projectDir, ".claude", "session-failures");
  mkdirSync(bridgeDir, { recursive: true });

  // Infer failure category from error content
  let category = "general";
  if (/Module not found|Cannot find module|import/.test(error))
    category = "import-error";
  else if (/SyntaxError|Parse error/.test(error)) category = "syntax-error";
  else if (/ENOENT|No such file/.test(error)) category = "file-not-found";
  else if (/EACCES|Permission/.test(error)) category = "permission-error";
  else if (/type|typescript|tsc/i.test(error)) category = "type-error";
  else if (/test|expect|assert/i.test(error)) category = "test-failure";
  else if (/lint|eslint|biome/i.test(error)) category = "lint-error";
  else if (/ETIMEOUT|timed out/.test(error)) category = "timeout";
  else if (/out of memory|heap/.test(error)) category = "memory-error";

  const bridgeEntry = {
    category,
    severity: "medium",
    failure: error.slice(0, 500),
    fix: suggestions.join("; "),
    repair_strategy: "manual",
  };

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}.json`;
  writeFileSync(
    join(bridgeDir, filename),
    JSON.stringify(bridgeEntry),
    "utf-8",
  );
} catch {
  // Never fail the hook for evolution tracking
}

process.exit(0);
