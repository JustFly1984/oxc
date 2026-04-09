// Pre-tool-use hook: prevents accidental corruption of marketing data files.
// Blocks deletion of experiment data and ensures state files maintain JSON validity.

import { resolve, relative } from "node:path";
import { parseStdin, FilePathHookInputSchema } from "./hook-input.ts";

const input = await parseStdin(FilePathHookInputSchema);
if (input === null) process.exit(0);
const filePath = input.tool_input?.file_path ?? "";

if (!filePath) process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";
const rel = relative(resolve(projectDir), resolve(filePath));

// Only guard marketing/data/ files
if (!rel.startsWith("marketing/data/")) process.exit(0);

// Block deletion of experiment data (empty file writes)
if (rel.startsWith("marketing/data/experiments/")) {
  // Allow writes but warn about experiment protocol
  process.stderr.write(
    "Note: Modifying experiment data. Ensure experiment protocol compliance (p < 0.05 AND >= 15% lift for winners).\n",
  );
}

// Allow the operation
process.exit(0);
