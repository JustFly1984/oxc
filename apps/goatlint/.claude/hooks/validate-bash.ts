// Pre-tool-use hook: validates Bash commands against project rules.
// Reads JSON from stdin, checks command patterns, exits 2 to block.

import { parseStdin, BashHookInputSchema } from "./hook-input.ts";

const input = await parseStdin(BashHookInputSchema);
if (input === null) process.exit(0);
const command = input.tool_input?.command ?? "";

const blocked = (msg: string): never => {
  process.stderr.write(`BLOCKED: ${msg}\n`);
  process.exit(2);
};

// Block tsc/bunx tsc/npx tsc (but not tsgo, bun tc)
if (/(^|[;&| ])tsc( |$)|bunx tsc|npx tsc/.test(command))
  blocked("Do not run tsc directly. Use 'bun tc' instead.");

// Block node usage (but not NODE_OPTIONS=, NODE_ENV=, etc.)
if (/(^|[;&| ]*)node /.test(command))
  blocked("Do not use node. Use 'bun' instead.");

// Block python/python3/pip/pip3 (scripts, REPL, package installs)
if (/(^|[;&| ]*)(python3?|pip3?)( |$)/.test(command))
  blocked("Do not use python/pip. Use 'bun' instead.");

// Block sh (use bun for scripts)
if (/(^|[;&| ])sh /.test(command))
  blocked("Do not use sh. Use 'bun' to run scripts.");

// Block git stash
if (/git stash/.test(command))
  blocked("git stash is forbidden. Use git diff or git show instead.");

// Block npm usage
if (/(^|[;&| ])npm /.test(command)) blocked("Use bun instead of npm.");

// Block backgrounded lint/tc (must run one at a time, never in background)
if (/bun (run )?(lint|tc).*&\s*$/.test(command))
  blocked("Never run lint or tc in background. Run one at a time.");

// Block force-push to main/master
if (
  /git push.*--force.*\b(main|master)\b|git push.*\b(main|master)\b.*--force/.test(
    command,
  )
)
  blocked("Force-push to main/master is forbidden.");

process.exit(0);
