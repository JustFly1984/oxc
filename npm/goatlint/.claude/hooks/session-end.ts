// SessionEnd hook: appends session summary with usage stats to history log.

import { appendFileSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import * as v from "valibot";
import { parseStdin, SessionMetricsInputSchema } from "./hook-input.ts";

const BridgeEntrySchema = v.object({
  category: v.optional(v.string()),
  severity: v.optional(v.string()),
  phase: v.optional(v.string()),
  plan: v.optional(v.string()),
  task: v.optional(v.string()),
  goal: v.optional(v.string()),
  action: v.optional(v.string()),
  failure: v.optional(v.string()),
  fix: v.optional(v.string()),
  repair_strategy: v.optional(v.string()),
  file: v.optional(v.string()),
  rule_violated: v.optional(v.string()),
});

const BaselineEntrySchema = v.object({ status: v.optional(v.string()) });

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";

function extractPaths(status: string): Set<string> {
  return new Set(
    status
      .split("\n")
      .map((line) => line.trimEnd())
      .filter((line) => line.length >= 4)
      .map((line) => line.slice(3).trim()),
  );
}

try {
  const input = await parseStdin(SessionMetricsInputSchema);
  if (input === null) process.exit(0);
  const sessionId = input.session_id ?? "unknown";

  const branch = Bun.spawnSync(["git", "branch", "--show-current"], {
    cwd: projectDir,
  })
    .stdout.toString()
    .trim();
  const currentStatus = Bun.spawnSync(
    ["git", "status", "--porcelain=v1", "-uall"],
    {
      cwd: projectDir,
    },
  )
    .stdout.toString()
    .trim();
  const ts = new Date().toISOString().replace("T", " ").slice(0, 19);

  const logDir = join(projectDir, ".claude");
  mkdirSync(logDir, { recursive: true });

  // Extract usage stats if available
  const ctxUsed = input.context_window?.used_percentage;
  const fiveHour = input.rate_limits?.five_hour?.used_percentage;

  const baselineFile = join(logDir, "session-baselines", `${sessionId}.json`);
  let touchedCount = 0;
  try {
    const baselineRaw = readFileSync(baselineFile, "utf8");
    const baselineResult = v.safeParse(
      BaselineEntrySchema,
      JSON.parse(baselineRaw),
    );
    if (!baselineResult.success) {
      touchedCount = extractPaths(currentStatus).size;
      rmSync(baselineFile, { force: true });
      throw new Error("baseline parse failed");
    }
    const baseline = baselineResult.output;
    const before = extractPaths(baseline.status ?? "");
    const after = extractPaths(currentStatus);
    touchedCount = [...after].filter((path) => !before.has(path)).length;
    rmSync(baselineFile, { force: true });
  } catch {
    touchedCount = extractPaths(currentStatus).size;
  }

  const summary =
    touchedCount === 0
      ? "no new file-status changes"
      : `${touchedCount} file-status change(s) since session start`;
  const parts = [ts, branch || "unknown", summary];

  if (ctxUsed != null) parts.push(`ctx:${Math.round(ctxUsed)}%`);
  if (fiveHour != null) parts.push(`5h:${Math.round(fiveHour)}%`);

  appendFileSync(join(logDir, "session-history.log"), parts.join(" | ") + "\n");

  // ─── Self-Evolution: extract failure signals from session ───────────────
  try {
    const planningPath = join(projectDir, ".planning");
    const failuresPath = join(planningPath, "failures.jsonl");
    const bridgeDir = join(logDir, "session-failures");

    // Check for session failure bridge files written by tool-failure-guide hook
    if (Bun.spawnSync(["test", "-d", bridgeDir]).exitCode === 0) {
      const bridgeFiles = Bun.spawnSync(["ls", bridgeDir])
        .stdout.toString()
        .trim();
      if (bridgeFiles.length > 0) {
        for (const file of bridgeFiles.split("\n")) {
          if (!file.endsWith(".json")) continue;
          try {
            const content = readFileSync(join(bridgeDir, file), "utf8");
            const raw: unknown = JSON.parse(content);
            const result = v.safeParse(BridgeEntrySchema, raw);
            if (result.success && result.output.category !== undefined) {
              const entry = result.output;
              const failureEntry = {
                id: `f-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
                timestamp: new Date().toISOString(),
                phase: entry.phase ?? "unknown",
                plan: entry.plan ?? "unknown",
                task: entry.task ?? "unknown",
                category: entry.category ?? "general",
                severity: entry.severity ?? "medium",
                goal: entry.goal ?? "",
                action: entry.action ?? "",
                failure: entry.failure ?? "",
                fix: entry.fix ?? "",
                repair_strategy: entry.repair_strategy ?? "manual",
                file: entry.file ?? "",
                rule_violated: entry.rule_violated ?? "",
                session_id: sessionId,
              };
              mkdirSync(planningPath, { recursive: true });
              appendFileSync(failuresPath, JSON.stringify(failureEntry) + "\n");
            }
            rmSync(join(bridgeDir, file), { force: true });
          } catch {
            // Skip malformed bridge files
          }
        }
      }
    }
  } catch {
    // Don't fail evolution tracking on session end
  }
} catch {
  // Don't fail on session end
}
