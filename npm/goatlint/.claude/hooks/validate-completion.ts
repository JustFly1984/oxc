// Stop hook: detects rationalization patterns in Claude's response.
// During GSB execution (FSM state = executing): exit 2 (blocking, forces continuation).
// Outside GSB execution: exit 0 (warning only).
//
// Inspired by Trail of Bits' anti-rationalization gate methodology.

import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { shouldRunInProfiles } from "./hook-profile.ts";
import { parseStdin, StopResponseInputSchema } from "./hook-input.ts";

const input = await parseStdin(StopResponseInputSchema);
if (input === null) process.exit(0);
if (!shouldRunInProfiles(["standard", "strict"])) process.exit(0);

// Check last 2000 chars for broader coverage
const msg: string = input.stop_response?.slice(-2000) ?? "";
if (!msg) process.exit(0);

// ─── Rationalization patterns ────────────────────────────────────────────────

// High-confidence: almost always rationalization
const highConfidence =
  /pre-existing issue|outside.*scope|follow.up (task|PR|ticket)|separate (PR|task|ticket)|beyond.*current (scope|task)|not related to (this|the current)|too many issues|not feasible.*current|cannot be (fixed|resolved) (here|now|in this)/i;

// Medium-confidence: likely rationalization during GSB execution
const mediumConfidence =
  /deferred to (next|later|future)|will address (later|in|separately)|partially implemented|left as.*(stub|placeholder|TODO)|skipped (because|due|since)|out of scope for (this|the current)|not (part of|included in) (this|the) (plan|phase|task)/i;

// Low-confidence: suspicious but may be legitimate
const lowConfidence =
  /\bTODO\b.*\b(later|future|next)\b|\bplaceholder\b.*\b(for now|temporary)\b|\bstub\b.*\b(implementation|body)\b/i;

const highMatch = highConfidence.test(msg);
const mediumMatch = mediumConfidence.test(msg);
const lowMatch = lowConfidence.test(msg);

if (!highMatch && !mediumMatch && !lowMatch) process.exit(0);

// ─── Determine if in GSB execution context ──────────────────────────────────

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? ".";
let isGsbExecuting = false;

try {
  const statePath = join(projectDir, ".planning", "STATE.md");
  if (existsSync(statePath)) {
    const stateContent = readFileSync(statePath, "utf-8").slice(0, 500);
    isGsbExecuting = /fsm_state:\s*executing/i.test(stateContent);
  }
} catch {
  // Can't determine GSB state — default to warning mode
}

// ─── Bridge failure to self-evolution system ─────────────────────────────────

try {
  const bridgeDir = join(projectDir, ".claude", "session-failures");
  mkdirSync(bridgeDir, { recursive: true });
  const bridgeEntry = {
    category: "rationalization",
    severity: highMatch ? "high" : "medium",
    failure: msg.slice(-300),
    fix: "Forced continuation via anti-rationalization gate",
    repair_strategy: "manual",
  };
  const filename = `${Date.now()}-rationalization.json`;
  writeFileSync(
    join(bridgeDir, filename),
    JSON.stringify(bridgeEntry),
    "utf-8",
  );
} catch {
  // Never fail the hook for evolution tracking
}

// ─── Respond based on context ────────────────────────────────────────────────

if (highMatch && isGsbExecuting) {
  // Block during GSB execution — force continuation
  process.stderr.write(
    "BLOCKED: Rationalization detected during GSB execution. " +
      "Complete the work instead of deferring. " +
      "If truly infeasible, use PRUNE with explicit justification in the repair system.\n",
  );
  process.exit(2);
}

if (mediumMatch && isGsbExecuting) {
  // Block medium-confidence patterns during GSB execution too
  process.stderr.write(
    "BLOCKED: Possible incomplete work detected during GSB execution. " +
      "Verify all tasks are fully implemented — no stubs, placeholders, or deferred items. " +
      "If a task genuinely cannot be completed, use node-repair PRUNE with justification.\n",
  );
  process.exit(2);
}

// Outside GSB execution or low confidence: warn only
const confidence = highMatch ? "HIGH" : mediumMatch ? "MEDIUM" : "LOW";
process.stderr.write(
  `WARNING [${confidence}]: Response may contain rationalization. ` +
    "Verify the task was actually completed — don't let incomplete work slip through.\n",
);

process.exit(0);
