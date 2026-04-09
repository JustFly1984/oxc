// PostToolUse asyncRewake hook: runs bun tc after code edits.
// Runs in background. If type check fails, wakes model with exit 2.

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
  filePath.includes(".planning/") ||
  filePath.includes("config/") ||
  filePath.includes("tools/")
)
  process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";
const result = Bun.spawnSync(["bun", "tc"], {
  cwd: projectDir,
  timeout: 30_000,
});

const stderr = result.stderr.toString().trim();
const stdout = result.stdout.toString().trim();

if (result.exitCode !== 0) {
  const output = stderr || stdout;
  // Only show first 500 chars to avoid noise
  process.stderr.write(
    `TYPE CHECK FAILED after editing ${basename(filePath)}:\n${output.slice(0, 500)}\n`,
  );
  process.exit(2); // asyncRewake: wake model to fix
}

process.exit(0);
