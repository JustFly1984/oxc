// PostCompact hook: re-injects critical project rules after context compaction.
// Long sessions lose CLAUDE.md rules when compaction fires — this prevents drift.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";
const recovery = join(projectDir, ".claude", "compact-recovery.md");

if (existsSync(recovery)) {
  console.info("=== SESSION RECOVERY (from pre-compaction snapshot) ===");
  console.info(readFileSync(recovery, "utf8"));
  console.info("=== END RECOVERY ===\n");
}

console.info(`CRITICAL RULES (re-injected after compaction):
- Use bun tc (never tsc), bun (never node/npm/python/sh)
- TypeScript enums forbidden — use as const or union types
- Valibot for validation, never Zod
- Zero runtime deps (only valibot allowed)
- Use Bun APIs over Node.js equivalents
- Array<T> syntax, never T[]
- No any type — use unknown
- Never run lint and tc in parallel or background
- bun add -D to install deps, never edit package.json manually`);
