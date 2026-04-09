// Stop hook: reminds about test coverage for newly created files.
// Checks git diff for new files that lack corresponding tests.

import { shouldRunInProfiles } from "./hook-profile.ts";
import { parseStdin, StopResponseInputSchema } from "./hook-input.ts";

const input = await parseStdin(StopResponseInputSchema);
if (input === null) process.exit(0);
if (!shouldRunInProfiles(["standard", "strict"])) process.exit(0);
const response: string = input.stop_response?.slice(-1000) ?? "";

// Only trigger if we were writing code (not just chatting)
if (!response) process.exit(0);

try {
  const diff = Bun.spawnSync([
    "git",
    "diff",
    "--name-only",
    "--diff-filter=A",
  ]).stdout.toString();
  const untrackedRaw = Bun.spawnSync([
    "git",
    "ls-files",
    "--others",
    "--exclude-standard",
  ]).stdout.toString();
  const newFiles = [...diff.split("\n"), ...untrackedRaw.split("\n")]
    .map((f) => f.trim())
    .filter((f) => f.length > 0);

  const sourceFiles = newFiles.filter(
    (f) =>
      (f.endsWith(".ts") || f.endsWith(".tsx")) &&
      !f.includes("__tests__/") &&
      !f.includes(".test.") &&
      !f.includes(".spec.") &&
      !f.includes(".claude/") &&
      f.startsWith("src/"),
  );

  if (sourceFiles.length === 0) process.exit(0);

  const untested: Array<string> = [];
  for (const file of sourceFiles) {
    const testFile = file.replace(/\.tsx?$/, ".test.ts");
    const specFile = file.replace(/\.tsx?$/, ".spec.ts");
    const dirTest = file.replace(/\/([^/]+)\.tsx?$/, "/__tests__/$1.test.ts");

    const hasTest = newFiles.some(
      (f) => f === testFile || f === specFile || f === dirTest,
    );
    if (!hasTest) untested.push(file);
  }

  if (untested.length > 0) {
    process.stderr.write(
      `REMINDER: ${untested.length} new file(s) without tests:\n`,
    );
    for (const f of untested.slice(0, 5)) {
      process.stderr.write(`  - ${f}\n`);
    }
    process.stderr.write("Consider adding tests for new source files.\n");
  }
} catch {
  // Don't block on errors in this advisory hook
}

process.exit(0);
