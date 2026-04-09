// Pre-tool-use hook: blocks Edit/Write to files outside allowed directories.
// Reads JSON from stdin, checks file path, exits 2 to block.

import { resolve, relative } from "node:path";
import { parseStdin, FilePathHookInputSchema } from "./hook-input.ts";

const input = await parseStdin(FilePathHookInputSchema);
if (input === null) process.exit(0);
const filePath = input.tool_input?.file_path ?? "";

if (!filePath) process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";
const rel = relative(resolve(projectDir), resolve(filePath));

// Skip files outside the project entirely (absolute paths elsewhere)
if (rel.startsWith("..")) process.exit(0);

const allowedPrefixes = [
  "src/",
  "test/",
  "config/",
  "docs/",
  ".claude/",
  ".planning/",
  "research/",
  "prd/",
  "tdd/",
  "tools/",
  "packages/",
  "deploy/",
  "marketing/",
];

const allowedRootFiles = [
  "CLAUDE.md",
  "README.md",
  "index.ts",
  "package.json",
  "tsconfig.json",
  "biome.json",
  "eslint.config.mjs",
  "eslint.config.js",
  ".gitignore",
  "Dockerfile",
  ".dockerignore",
  "docker-compose.yml",
];

// Check allowed prefixes
for (const prefix of allowedPrefixes) {
  if (rel.startsWith(prefix)) process.exit(0);
}

// Check allowed root files
for (const file of allowedRootFiles) {
  if (rel === file) process.exit(0);
}

process.stderr.write(
  `BLOCKED: Editing files outside allowed directories. File: ${rel}\nAllowed: ${allowedPrefixes.join(", ")} and root config files.\n`,
);
process.exit(2);
