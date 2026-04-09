// CwdChanged hook: injects context when switching between project directories.

import * as v from "valibot";

const CwdInputSchema = v.object({
  cwd: v.optional(v.string()),
  new_cwd: v.optional(v.string()),
});

const parsed = v.safeParse(CwdInputSchema, JSON.parse(await Bun.stdin.text()));
if (!parsed.success) process.exit(0);
const input = parsed.output;
const newCwd: string = input.cwd ?? input.new_cwd ?? "";

if (!newCwd) process.exit(0);

if (newCwd.includes("src/providers")) {
  console.info(`Switched to providers directory:
- Every provider must implement chat() + stream()
- Validate API responses with Valibot schemas in src/core/schemas.ts
- Streaming must yield StreamChunk types (text, tool_call, done)
- Zero runtime deps — only valibot allowed`);
} else if (newCwd.includes("src/platforms")) {
  console.info(`Switched to platforms directory:
- New platform features must be implemented across all active platforms or marked unsupported
- Use Bun APIs over Node.js equivalents
- Validate all incoming payloads with Valibot schemas`);
} else if (newCwd.includes("src/security")) {
  console.info(`Switched to security directory:
- 80% test coverage required
- Every AgentTool must declare a riskLevel
- PermissionGuard rules must match risk levels`);
} else if (newCwd.includes("src/memory")) {
  console.info(`Switched to memory directory:
- SQLite schema changes require versioned migration functions
- Migrations must be idempotent and testable
- Verify FTS5 consistency and index coverage after changes`);
}

process.exit(0);
