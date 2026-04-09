// InstructionsLoaded hook: logs which instruction files were loaded.

import { appendFileSync } from "node:fs";
import { join } from "node:path";
import { parseStdin, InstructionsInputSchema } from "./hook-input.ts";

const input = await parseStdin(InstructionsInputSchema);
if (input === null) process.exit(0);
const files: Array<string> = input.files ?? input.instructions ?? [];

if (files.length === 0) process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";
const ts = new Date().toISOString().replace("T", " ").slice(0, 19);

try {
  const logLine = `${ts} | Loaded: ${Array.isArray(files) ? files.join(", ") : String(files)}\n`;
  appendFileSync(
    join(projectDir, ".claude", "instructions-audit.log"),
    logLine,
  );
} catch {
  // Don't fail if log dir missing
}

process.exit(0);
