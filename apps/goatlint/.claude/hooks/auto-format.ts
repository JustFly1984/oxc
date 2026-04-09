// PostToolUse async hook: runs bun format after code edits.
// Non-blocking: always exits 0 (formatting failures don't wake model).

import { basename } from "node:path";
import { shouldRunInProfiles } from "./hook-profile.ts";
import { parseStdin, FilePathHookInputSchema } from "./hook-input.ts";

const input = await parseStdin(FilePathHookInputSchema);
if (input === null) process.exit(0);
if (!shouldRunInProfiles(["standard", "strict"])) process.exit(0);
const filePath = input.tool_input?.file_path ?? "";

if (!filePath) process.exit(0);

const ext = basename(filePath).split(".").pop();
if (ext !== "ts" && ext !== "tsx") process.exit(0);

// Skip non-source files
if (
  filePath.includes("node_modules/") ||
  filePath.includes(".claude/") ||
  filePath.includes("tools/")
)
  process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";
Bun.spawnSync(["bun", "format"], {
  cwd: projectDir,
  timeout: 15_000,
});

process.exit(0);
