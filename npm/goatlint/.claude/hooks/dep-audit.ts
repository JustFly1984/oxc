// PostToolUse async hook: runs bun knip after bun add to catch unused deps.
// Only runs when "if": "Bash(bun add *)" matches.

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";

try {
  const result = Bun.spawnSync(["bun", "knip", "--no-progress"], {
    cwd: projectDir,
    timeout: 30_000,
  });

  const output = result.stdout.toString().trim();
  if (output && result.exitCode !== 0) {
    process.stderr.write(
      `DEP AUDIT: bun knip found unused exports/deps after install:\n${output.slice(0, 300)}\n`,
    );
  }
} catch {
  // Don't fail on audit errors
}

process.exit(0);
