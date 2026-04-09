// Post-tool-use hook: validates code written by Edit/Write against project rules.
// Reads JSON from stdin, checks file content patterns, exits 2 to block.

import { existsSync, readFileSync } from "node:fs";
import { extname } from "node:path";
import { parseStdin, FilePathHookInputSchema } from "./hook-input.ts";

const input = await parseStdin(FilePathHookInputSchema);
if (input === null) process.exit(0);
const filePath = input.tool_input?.file_path ?? "";

if (!filePath || !existsSync(filePath)) process.exit(0);

const ext = extname(filePath).slice(1);
const content = readFileSync(filePath, "utf8");

const blocked = (msg: string): never => {
  process.stderr.write(`BLOCKED: ${msg}\n`);
  process.exit(2);
};

// ── TypeScript rules ──────────────────────────────────────────────────────────

if (ext === "ts" || ext === "tsx") {
  // Ban TypeScript enums
  if (/^\s*(export\s+)?(const\s+)?enum\s+/m.test(content))
    blocked(
      "TypeScript enums are forbidden. Use 'as const' objects or union types.",
    );

  // Block Zod imports (project uses Valibot)
  if (/from ["']zod["']/.test(content))
    blocked("Use Valibot instead of Zod. Import: import * as v from 'valibot'");

  // Block require() (ESM only)
  if (/\brequire\s*\(/.test(content) && !filePath.includes(".claude/"))
    blocked("Do not use require(). This project uses ES modules (import).");

  // Warn on 'any' type (outside tests and hooks)
  if (!filePath.endsWith(".test.ts") && !filePath.includes(".claude/")) {
    if (/:\s*any\b/.test(content))
      process.stderr.write(
        "WARNING: Found 'any' type. Prefer 'unknown' for type safety.\n",
      );
  }
}

process.exit(0);
