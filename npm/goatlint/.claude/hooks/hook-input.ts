// Shared Valibot schemas for Claude Code hook stdin inputs.
// Each hook receives JSON via stdin — these schemas validate at the boundary.

import * as v from "valibot";

// ---- Reusable fragments ----

const ToolInputCommandSchema = v.object({
  command: v.optional(v.string()),
});

const ToolInputFilePathSchema = v.object({
  file_path: v.optional(v.string()),
});

const ToolInputEditSchema = v.object({
  file_path: v.optional(v.string()),
  content: v.optional(v.string()),
  new_string: v.optional(v.string()),
  path: v.optional(v.string()),
  is_subagent: v.optional(v.boolean()),
  edits: v.optional(
    v.array(
      v.object({
        new_string: v.optional(v.string()),
      }),
    ),
  ),
});

const ContextWindowSchema = v.object({
  remaining_percentage: v.optional(v.number()),
  used_percentage: v.optional(v.number()),
});

const RateLimitsSchema = v.object({
  five_hour: v.optional(
    v.object({
      used_percentage: v.optional(v.number()),
      resets_at: v.optional(v.number()),
    }),
  ),
  seven_day: v.optional(
    v.object({
      used_percentage: v.optional(v.number()),
      resets_at: v.optional(v.number()),
    }),
  ),
});

// ---- Hook input schemas ----

/** Bash tool hooks: validate-bash, validate-commit, audit-log */
export const BashHookInputSchema = v.object({
  tool_input: v.optional(ToolInputCommandSchema),
});

/** Tool failure hook: tool-failure-guide */
export const ToolFailureInputSchema = v.object({
  tool_error: v.optional(v.string()),
  error: v.optional(v.string()),
  tool_input: v.optional(ToolInputCommandSchema),
});

/** File-path tool hooks: auto-format, auto-typecheck, validate-code, validate-edit-scope, validate-file-access */
export const FilePathHookInputSchema = v.object({
  tool_input: v.optional(ToolInputFilePathSchema),
});

/** File-changed / config-changed hooks */
export const FileChangedInputSchema = v.object({
  file_path: v.optional(v.string()),
  config_path: v.optional(v.string()),
});

/** Stop/completion hooks: validate-completion, test-coverage-reminder */
export const StopResponseInputSchema = v.object({
  stop_response: v.optional(v.string()),
});

/** Notification hook: notify */
export const NotifyInputSchema = v.object({
  message: v.optional(v.string()),
});

/** Edit/Write guard hooks: security-reminder, gsb-prompt-guard, gsb-workflow-guard */
export const ToolGuardInputSchema = v.object({
  tool_name: v.optional(v.string()),
  tool_input: v.optional(ToolInputEditSchema),
  session_id: v.optional(v.string()),
  session_type: v.optional(v.string()),
  cwd: v.optional(v.string()),
});

/** Session metrics hooks: gsb-statusline, gsb-context-monitor, session-end */
export const SessionMetricsInputSchema = v.object({
  session_id: v.optional(v.string()),
  cwd: v.optional(v.string()),
  model: v.optional(
    v.object({
      display_name: v.optional(v.string()),
    }),
  ),
  workspace: v.optional(
    v.object({
      current_dir: v.optional(v.string()),
    }),
  ),
  context_window: v.optional(ContextWindowSchema),
  rate_limits: v.optional(RateLimitsSchema),
});

/** Instructions-loaded hook */
export const InstructionsInputSchema = v.object({
  files: v.optional(v.array(v.string())),
  instructions: v.optional(v.array(v.string())),
});

/** Subagent-validate hook */
export const SubagentInputSchema = v.object({
  agent_name: v.optional(v.string()),
  subagent_type: v.optional(v.string()),
  output: v.optional(v.string()),
  result: v.optional(v.string()),
});

// ---- Helper ----

/** Parse stdin JSON with a Valibot schema. Returns null on parse failure. */
export async function parseStdin<T>(
  schema: v.GenericSchema<T>,
): Promise<T | null> {
  try {
    const raw: unknown = JSON.parse(await Bun.stdin.text());
    const result = v.safeParse(schema, raw);
    return result.success ? result.output : null;
  } catch {
    return null;
  }
}
