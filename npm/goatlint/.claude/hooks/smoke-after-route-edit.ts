// PostToolUse asyncRewake hook: runs tests after editing core source files.
// Triggers for security, provider, and platform modules.

import { basename } from "path";
import * as v from "valibot";
import { shouldRunInProfiles } from "./hook-profile.ts";

const SmokeInputSchema = v.object({
  tool_input: v.optional(v.object({ file_path: v.optional(v.string()) })),
});

const parsed = v.safeParse(
  SmokeInputSchema,
  JSON.parse(await Bun.stdin.text()),
);
if (!parsed.success) process.exit(0);
if (!shouldRunInProfiles(["standard", "strict"])) process.exit(0);
const filePath: string = parsed.output.tool_input?.file_path ?? "";

if (!filePath) process.exit(0);

// Only trigger for core source files that warrant smoke tests
const isCritical =
  filePath.includes("src/security/") ||
  filePath.includes("src/providers/") ||
  filePath.includes("src/core/");
if (!isCritical) process.exit(0);
if (!filePath.endsWith(".ts")) process.exit(0);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";

const result = Bun.spawnSync(["bun", "test"], {
  cwd: projectDir,
  timeout: 90_000,
});

if (result.exitCode !== 0) {
  const err =
    result.stderr.toString().trim() || result.stdout.toString().trim();
  process.stderr.write(
    `TESTS FAILED after editing ${basename(filePath)}:\n${err.slice(0, 500)}\n`,
  );
  process.exit(2); // asyncRewake: wake model to investigate
}

process.exit(0);
