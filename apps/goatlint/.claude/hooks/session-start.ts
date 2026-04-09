// SessionStart hook: injects git context and stale branch warning.
// Static env vars are now in settings.json "env" field.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseStdin, SessionMetricsInputSchema } from "./hook-input.ts";

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";
const input = await parseStdin(SessionMetricsInputSchema);
const sessionId = input?.session_id ?? "unknown";

const run = (cmd: Array<string>): string | null => {
  try {
    return Bun.spawnSync(cmd, { cwd: projectDir }).stdout.toString().trim();
  } catch {
    return null;
  }
};

try {
  const baselineDir = join(projectDir, ".claude", "session-baselines");
  mkdirSync(baselineDir, { recursive: true });
  const status = run(["git", "status", "--porcelain=v1", "-uall"]) ?? "";
  writeFileSync(
    join(baselineDir, `${sessionId}.json`),
    JSON.stringify({ status }),
  );
} catch {
  // Best effort only
}

const branch = run(["git", "branch", "--show-current"]) ?? "unknown";
const recent = run(["git", "log", "--oneline", "-5"]) ?? "no history";

let staleWarning = "";
if (branch !== "main" && branch !== "master" && branch !== "unknown") {
  const behind = run(["git", "rev-list", "--count", `${branch}..main`]);
  const behindCount = parseInt(behind ?? "0", 10);
  if (behindCount > 20) {
    staleWarning = `\n⚠ Branch is ${behindCount} commits behind main. Consider rebasing to avoid merge conflicts.`;
  }
}

console.info(`Session context:
- Branch: ${branch}
- Recent commits:
${recent}${staleWarning}`);
