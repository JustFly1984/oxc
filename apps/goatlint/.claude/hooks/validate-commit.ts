// Pre-tool-use hook: validates git commit commands specifically.
// Only runs when "if": "Bash(git commit *)" matches — avoids overhead on every command.

import { parseStdin, BashHookInputSchema } from "./hook-input.ts";

const input = await parseStdin(BashHookInputSchema);
if (input === null) process.exit(0);
const command = input.tool_input?.command ?? "";

if (!/git commit/.test(command)) process.exit(0);

const blocked = (msg: string): never => {
  process.stderr.write(`BLOCKED: ${msg}\n`);
  process.exit(2);
};

// Warn on direct commit to main
const branch = Bun.spawnSync(["git", "branch", "--show-current"])
  .stdout.toString()
  .trim();
if (branch === "main" || branch === "master") {
  process.stderr.write(
    "WARNING: You are committing directly to the main branch. Consider using a feature branch.\n",
  );
}

// Check staged diff for secrets in env-style and structured config formats.
const diff = Bun.spawnSync([
  "git",
  "diff",
  "--cached",
  "--unified=0",
]).stdout.toString();

const secretPatterns = [
  /\b(?:API_KEY|SECRET|TOKEN|PASSWORD|PRIVATE_KEY)\b\s*=\s*[^\s]+/,
  /["'](?:api[_-]?key|secret|token|password|private[_-]?key)["']\s*:\s*["'][^"'$\n]{8,}["']/i,
  /\b(?:api[_-]?key|secret|token|password|private[_-]?key)\b\s*:\s*["'][^"'$\n]{8,}["']/i,
];
const placeholderPattern =
  /(example|placeholder|dummy|changeme|replace[_ -]?me|your[_ -]?(api[_ -]?key|token|secret|password))/i;

if (
  secretPatterns.some((pattern) => pattern.test(diff)) &&
  !placeholderPattern.test(diff)
)
  blocked(
    "Staged diff contains what looks like a secret in a shell/env or structured config format. Remove it before committing.",
  );

if (/console\.log\(/.test(diff))
  process.stderr.write(
    "WARNING: Staged diff contains console.log(). Consider removing before committing.\n",
  );

process.exit(0);
