// gsb-hook-version: 1.30.0
// Claude Code Statusline - GSB Edition (Bun/TS)
// Shows: model | current task | directory | context usage | 5h rate limit

import {
  readFileSync,
  readdirSync,
  statSync,
  existsSync,
  writeFileSync,
} from "node:fs";
import { join, basename } from "node:path";
import { homedir, tmpdir } from "node:os";
import * as v from "valibot";
import { parseStdin, SessionMetricsInputSchema } from "./hook-input.ts";

const input = await parseStdin(SessionMetricsInputSchema);
if (input === null) process.exit(0);

const model: string = input.model?.display_name ?? "Claude";
const dir: string = input.workspace?.current_dir ?? process.cwd();
const session: string = input.session_id ?? "";
const remaining: number | undefined =
  input.context_window?.remaining_percentage;

// Git branch + dirty indicator
let gitInfo = "";
if (dir) {
  try {
    const branchResult = Bun.spawnSync(
      ["git", "symbolic-ref", "--short", "HEAD"],
      { cwd: dir },
    );
    let branch = branchResult.stdout.toString().trim();
    if (!branch) {
      const fallback = Bun.spawnSync(["git", "rev-parse", "--short", "HEAD"], {
        cwd: dir,
      });
      branch = fallback.stdout.toString().trim();
    }
    if (branch) {
      const dirtyResult = Bun.spawnSync(["git", "status", "--porcelain"], {
        cwd: dir,
      });
      const dirty = dirtyResult.stdout.toString().trim().length > 0;
      gitInfo = `\x1b[36m${branch}${dirty ? "*" : ""}\x1b[0m`;
    }
  } catch {
    // Not a git repo or git not available
  }
}

// Context window display (shows USED percentage scaled to usable context)
// Claude Code reserves ~16.5% for autocompact buffer, so usable context
// is 83.5% of the total window. We normalize to show 100% at that point.
const AUTO_COMPACT_BUFFER_PCT = 16.5;
let ctx = "";
if (remaining != null) {
  const usableRemaining = Math.max(
    0,
    ((remaining - AUTO_COMPACT_BUFFER_PCT) / (100 - AUTO_COMPACT_BUFFER_PCT)) *
      100,
  );
  const used = Math.max(0, Math.min(100, Math.round(100 - usableRemaining)));

  // Write context metrics to bridge file for the context-monitor PostToolUse hook.
  if (session) {
    try {
      const bridgePath = join(tmpdir(), `claude-ctx-${session}.json`);
      const bridgeData = JSON.stringify({
        session_id: session,
        remaining_percentage: remaining,
        used_pct: used,
        timestamp: Math.floor(Date.now() / 1000),
      });
      writeFileSync(bridgePath, bridgeData);
    } catch {
      // Silent fail -- bridge is best-effort
    }
  }

  // Build progress bar (10 segments)
  const filled = Math.floor(used / 10);
  const bar = "\u2588".repeat(filled) + "\u2591".repeat(10 - filled);

  // Color based on usable context thresholds
  if (used < 50) {
    ctx = ` \x1b[32m${bar} ${used}%\x1b[0m`;
  } else if (used < 65) {
    ctx = ` \x1b[33m${bar} ${used}%\x1b[0m`;
  } else if (used < 80) {
    ctx = ` \x1b[38;5;208m${bar} ${used}%\x1b[0m`;
  } else {
    ctx = ` \x1b[5;31m\u{1F480} ${bar} ${used}%\x1b[0m`;
  }
}

// 5-hour rate limit with reset times + rolling weekly estimate
let rateLimit = "";
const five: number | undefined = input.rate_limits?.five_hour?.used_percentage;
const fiveResetsAt: number | undefined =
  input.rate_limits?.five_hour?.resets_at;
if (five != null) {
  const fmt = (ts: number): string =>
    new Date(ts * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  let fiveStr = `5h:${Math.round(five)}%`;
  if (fiveResetsAt != null) {
    const lastReset = fmt(fiveResetsAt - 18000);
    const nextReset = fmt(fiveResetsAt);
    fiveStr += ` (${lastReset}-${nextReset})`;
  }

  // 7-day rate limit — read directly from API (no inference needed)
  let weeklyStr = "";
  const sevenDay: number | undefined =
    input.rate_limits?.seven_day?.used_percentage;
  if (sevenDay != null) {
    weeklyStr = ` 7d:${Math.round(sevenDay)}%`;
  }

  rateLimit = ` \x1b[2m${fiveStr}${weeklyStr}\x1b[0m`;
}

// Current task from todos
let task = "";
const claudeDir = process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), ".claude");
const todosDir = join(claudeDir, "todos");
if (session && existsSync(todosDir)) {
  try {
    const files = readdirSync(todosDir)
      .filter(
        (f) =>
          f.startsWith(session) && f.includes("-agent-") && f.endsWith(".json"),
      )
      .map((f) => ({ name: f, mtime: statSync(join(todosDir, f)).mtime }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    if (files.length > 0) {
      try {
        const TodosSchema = v.array(
          v.object({ status: v.string(), activeForm: v.optional(v.string()) }),
        );
        const firstFile = files[0];
        if (!firstFile) throw new Error("no files");
        const todosResult = v.safeParse(
          TodosSchema,
          JSON.parse(readFileSync(join(todosDir, firstFile.name), "utf8")),
        );
        if (!todosResult.success) throw new Error("invalid todos");
        const todos = todosResult.output;
        const inProgress = todos.find((t) => t.status === "in_progress");
        if (inProgress) task = inProgress.activeForm ?? "";
      } catch {
        // Silent fail
      }
    }
  } catch {
    // Silent fail on file system errors
  }
}

// GSB update available?
let gsdUpdate = "";
const cacheFile = join(claudeDir, "cache", "gsb-update-check.json");
if (existsSync(cacheFile)) {
  try {
    const CacheSchema = v.object({
      update_available: v.optional(v.boolean()),
      stale_hooks: v.optional(v.array(v.unknown())),
    });
    const cacheResult = v.safeParse(
      CacheSchema,
      JSON.parse(readFileSync(cacheFile, "utf8")),
    );
    if (!cacheResult.success) throw new Error("invalid cache");
    const cache = cacheResult.output;
    if (cache.update_available === true) {
      gsdUpdate = "\x1b[33m\u2B06 /gsb:update\x1b[0m \u2502 ";
    }
    if (cache.stale_hooks !== undefined && cache.stale_hooks.length > 0) {
      gsdUpdate +=
        "\x1b[31m\u26A0 stale hooks \u2014 run /gsb:update\x1b[0m \u2502 ";
    }
  } catch {
    // Silent fail
  }
}

// Output
const dirname = basename(dir);
const gitSeg = gitInfo ? ` \u2502 ${gitInfo}` : "";
if (task) {
  process.stdout.write(
    `${gsdUpdate}\x1b[2m${model}\x1b[0m${gitSeg} \u2502 \x1b[1m${task}\x1b[0m \u2502 \x1b[2m${dirname}\x1b[0m${ctx}${rateLimit}`,
  );
} else {
  process.stdout.write(
    `${gsdUpdate}\x1b[2m${model}\x1b[0m${gitSeg} \u2502 \x1b[2m${dirname}\x1b[0m${ctx}${rateLimit}`,
  );
}
