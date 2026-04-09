// ConfigChange hook: alerts when settings or hooks are modified mid-session.

import { parseStdin, FileChangedInputSchema } from "./hook-input.ts";

const input = await parseStdin(FileChangedInputSchema);
if (input === null) process.exit(0);
const file = input.file_path ?? input.config_path ?? "";

if (!file) process.exit(0);

if (
  file.includes("settings.json") ||
  file.includes("hooks/") ||
  file.includes(".mcp.json")
) {
  process.stderr.write(
    `CONFIG CHANGED: ${file} — changes may require a session restart to take effect.\n`,
  );
}

process.exit(0);
