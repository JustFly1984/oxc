// gsb-hook-version: 1.30.0
// Context Monitor — PostToolUse hook
// Reads context metrics from the statusline bridge file and injects
// warnings when context usage is high.
//
// Thresholds:
//   WARNING  (remaining <= 35%): Agent should wrap up current task
//   CRITICAL (remaining <= 25%): Agent should stop immediately and save state

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import * as v from "valibot";
import { shouldRunInProfiles } from "./hook-profile.ts";
import { parseStdin, SessionMetricsInputSchema } from "./hook-input.ts";

const WARNING_THRESHOLD = 35;
const CRITICAL_THRESHOLD = 25;
const STALE_SECONDS = 60;
const DEBOUNCE_CALLS = 5;

const data = await parseStdin(SessionMetricsInputSchema);
if (data === null) process.exit(0);
if (!shouldRunInProfiles(["standard", "strict"])) process.exit(0);
const sessionId: string = data.session_id ?? "";

if (!sessionId) process.exit(0);

// Check if context warnings are disabled via config
const cwd: string = data.cwd ?? process.cwd();
const configPath = join(cwd, ".planning", "config.json");
if (existsSync(configPath)) {
  try {
    const ConfigSchema = v.object({
      hooks: v.optional(
        v.object({ context_warnings: v.optional(v.boolean()) }),
      ),
    });
    const configResult = v.safeParse(
      ConfigSchema,
      JSON.parse(readFileSync(configPath, "utf8")),
    );
    if (
      configResult.success &&
      configResult.output.hooks?.context_warnings === false
    )
      process.exit(0);
  } catch {
    // Ignore config parse errors
  }
}

const metricsPath = join(tmpdir(), `claude-ctx-${sessionId}.json`);
if (!existsSync(metricsPath)) process.exit(0);

const MetricsSchema = v.object({
  timestamp: v.optional(v.number()),
  remaining_percentage: v.optional(v.number()),
  used_pct: v.optional(v.number()),
});
const metricsResult = v.safeParse(
  MetricsSchema,
  JSON.parse(readFileSync(metricsPath, "utf8")),
);
if (!metricsResult.success) process.exit(0);
const metrics = metricsResult.output;
const now = Math.floor(Date.now() / 1000);

if (metrics.timestamp !== undefined && now - metrics.timestamp > STALE_SECONDS)
  process.exit(0);

const remaining: number | undefined = metrics.remaining_percentage;
const usedPct: number | undefined = metrics.used_pct;

if (remaining === undefined || remaining > WARNING_THRESHOLD) process.exit(0);

// Debounce
const warnPath = join(tmpdir(), `claude-ctx-${sessionId}-warned.json`);
const WarnSchema = v.object({
  callsSinceWarn: v.optional(v.number()),
  lastLevel: v.optional(v.nullable(v.string())),
});
interface WarnData {
  callsSinceWarn: number;
  lastLevel: null | string;
}
let warnData: WarnData = { callsSinceWarn: 0, lastLevel: null };
let firstWarn = true;

if (existsSync(warnPath)) {
  try {
    const warnResult = v.safeParse(
      WarnSchema,
      JSON.parse(readFileSync(warnPath, "utf8")),
    );
    if (warnResult.success) {
      warnData = {
        callsSinceWarn: warnResult.output.callsSinceWarn ?? 0,
        lastLevel: warnResult.output.lastLevel ?? null,
      };
      firstWarn = false;
    }
  } catch {
    // Corrupted file, reset
  }
}

warnData.callsSinceWarn = (warnData.callsSinceWarn || 0) + 1;

const isCritical = remaining <= CRITICAL_THRESHOLD;
const currentLevel = isCritical ? "critical" : "warning";

const severityEscalated =
  currentLevel === "critical" && warnData.lastLevel === "warning";
if (
  !firstWarn &&
  warnData.callsSinceWarn < DEBOUNCE_CALLS &&
  !severityEscalated
) {
  writeFileSync(warnPath, JSON.stringify(warnData));
  process.exit(0);
}

warnData.callsSinceWarn = 0;
warnData.lastLevel = currentLevel;
writeFileSync(warnPath, JSON.stringify(warnData));

const isGsdActive = existsSync(join(cwd, ".planning", "STATE.md"));

let message: string;
if (isCritical) {
  message = isGsdActive
    ? `CONTEXT CRITICAL: Usage at ${usedPct}%. Remaining: ${remaining}%. ` +
      "Context is nearly exhausted. Do NOT start new complex work or write handoff files — " +
      "GSB state is already tracked in STATE.md. Inform the user so they can run " +
      "/gsb:session pause at the next natural stopping point."
    : `CONTEXT CRITICAL: Usage at ${usedPct}%. Remaining: ${remaining}%. ` +
      "Context is nearly exhausted. Inform the user that context is low and ask how they " +
      "want to proceed. Do NOT autonomously save state or write handoff files unless the user asks.";
} else {
  message = isGsdActive
    ? `CONTEXT WARNING: Usage at ${usedPct}%. Remaining: ${remaining}%. ` +
      "Context is getting limited. Avoid starting new complex work. If not between " +
      "defined plan steps, inform the user so they can prepare to pause."
    : `CONTEXT WARNING: Usage at ${usedPct}%. Remaining: ${remaining}%. ` +
      "Be aware that context is getting limited. Avoid unnecessary exploration or " +
      "starting new complex work.";
}

const output = {
  hookSpecificOutput: {
    hookEventName: "PostToolUse",
    additionalContext: message,
  },
};

process.stdout.write(JSON.stringify(output));
