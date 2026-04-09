// TaskCompleted hook: reminds to run type check if TS files were modified.

import { shouldRunInProfiles } from "./hook-profile.ts";

if (!shouldRunInProfiles(["standard", "strict"])) process.exit(0);

try {
  const diff = Bun.spawnSync(["git", "diff", "--name-only"]).stdout.toString();
  const untracked = Bun.spawnSync([
    "git",
    "ls-files",
    "--others",
    "--exclude-standard",
  ]).stdout.toString();
  const allFiles = `${diff}\n${untracked}`;

  if (/\.(ts|tsx)$/.test(allFiles)) {
    process.stderr.write(
      "REMINDER: TypeScript files were modified. Run `bun tc` to type check.\n",
    );
  }
} catch {
  // Don't block on errors
}

process.exit(0);
