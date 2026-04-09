// FileChanged hook: notifies when important config files change.

import { basename } from "node:path";
import { parseStdin, FileChangedInputSchema } from "./hook-input.ts";

const input = await parseStdin(FileChangedInputSchema);
if (input === null) process.exit(0);
const filePath = input.file_path ?? "";

if (!filePath) process.exit(0);

const name = basename(filePath);
const watchedPatterns = [
  /^\.env/,
  /^package\.json$/,
  /^tsconfig.*\.json$/,
  /^bunfig\.toml$/,
  /^vite\.config\./,
];

const isWatched = watchedPatterns.some((p) => p.test(name));
if (!isWatched) process.exit(0);

console.info(
  `File changed: ${filePath} — environment or config may need reloading.`,
);
process.exit(0);
