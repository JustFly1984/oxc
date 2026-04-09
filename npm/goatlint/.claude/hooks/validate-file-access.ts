// Pre-tool-use hook: blocks Edit/Write to sensitive files.
// Reads JSON from stdin, checks file path, exits 2 to block.

import { basename } from "node:path";
import { parseStdin, FilePathHookInputSchema } from "./hook-input.ts";

const input = await parseStdin(FilePathHookInputSchema);
if (input === null) process.exit(0);
const filePath = input.tool_input?.file_path ?? "";

if (!filePath) process.exit(0);

const name = basename(filePath);

const blocked = (msg: string): never => {
  process.stderr.write(`BLOCKED: ${msg}\n`);
  process.exit(2);
};

// Block .env files
if (/^\.env(\..*)?$/.test(name))
  blocked(
    "Do not edit .env files. These contain secrets and should be managed manually.",
  );

// Block lock files
if (name === "bun.lock" || name === "bun.lockb")
  blocked("Do not edit lock files. Run 'bun add' or 'bun install' instead.");

// Block certificate files
if (/\.(pem|key|cert|crt|ca)$/.test(filePath))
  blocked("Do not edit certificate files. Use mkcert or proper cert tooling.");

// Block credentials files
if (/credentials|secrets/i.test(name))
  blocked("Do not edit credentials/secrets files directly.");

process.exit(0);
