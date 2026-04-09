// PreToolUse hook: runs bun tc + bun lint before git push.
// Only runs when "if": "Bash(git push *)" matches.

import { parseStdin, BashHookInputSchema } from "./hook-input.ts";

const input = await parseStdin(BashHookInputSchema);
if (input === null) process.exit(0);
const command = input.tool_input?.command ?? "";
if (!/git push/.test(command)) process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";

const blocked = (msg: string): never => {
  process.stderr.write(`BLOCKED: ${msg}\n`);
  process.exit(2);
};

// Run type check
const tc = Bun.spawnSync(["bun", "tc"], { cwd: projectDir, timeout: 45_000 });
if (tc.exitCode !== 0) {
  const err = tc.stderr.toString().trim() || tc.stdout.toString().trim();
  blocked(
    `Type check failed. Fix errors before pushing:\n${err.slice(0, 500)}`,
  );
}

// Run lint
const lint = Bun.spawnSync(["bun", "lint"], {
  cwd: projectDir,
  timeout: 45_000,
});
if (lint.exitCode !== 0) {
  const err = lint.stderr.toString().trim() || lint.stdout.toString().trim();
  blocked(`Lint failed. Fix errors before pushing:\n${err.slice(0, 500)}`);
}

process.exit(0);
