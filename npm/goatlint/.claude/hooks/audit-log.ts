// PostToolUse async hook: logs all Bash commands for post-session review.

import { appendFileSync } from "node:fs";
import { join } from "node:path";
import { parseStdin, BashHookInputSchema } from "./hook-input.ts";

const input = await parseStdin(BashHookInputSchema);
if (input === null) process.exit(0);
const cmd = input.tool_input?.command ?? "";

if (!cmd) process.exit(0);

const ts = new Date().toISOString().replace("T", " ").slice(0, 19);
const logFile = join(
  process.env.CLAUDE_PROJECT_DIR ?? ".",
  ".claude",
  "command-audit.log",
);

appendFileSync(logFile, `${ts} | ${cmd}\n`);
process.exit(0);
