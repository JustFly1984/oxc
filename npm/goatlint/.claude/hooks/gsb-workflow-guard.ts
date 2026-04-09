// gsb-hook-version: 1.30.0
// GSB Workflow Guard — PreToolUse hook
// Detects when Claude attempts file edits outside a GSB workflow context
// and injects an advisory warning. SOFT guard — advises, not blocks.
// Enable via config: hooks.workflow_guard: true (default: false)

import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import * as v from "valibot";
import { parseStdin, ToolGuardInputSchema } from "./hook-input.ts";

const data = await parseStdin(ToolGuardInputSchema);
if (data === null) process.exit(0);
const toolName: string = data.tool_name ?? "";

if (toolName !== "Write" && toolName !== "Edit") process.exit(0);

// Check if inside a GSB workflow (Task subagent or /gsb: command)
if (data.tool_input?.is_subagent === true || data.session_type === "task")
  process.exit(0);

const filePath: string =
  data.tool_input?.file_path ?? data.tool_input?.path ?? "";

// Allow .planning/ edits
if (filePath.includes(".planning/")) process.exit(0);

// Allow common config/docs files
const allowedPatterns = [
  /\.gitignore$/,
  /\.env/,
  /CLAUDE\.md$/,
  /AGENTS\.md$/,
  /settings\.json$/,
];
if (allowedPatterns.some((p) => p.test(filePath))) process.exit(0);

// Check if workflow guard is enabled
const cwd: string = data.cwd ?? process.cwd();
const configPath = join(cwd, ".planning", "config.json");
if (existsSync(configPath)) {
  try {
    const GsdConfigSchema = v.object({
      hooks: v.optional(v.object({ workflow_guard: v.optional(v.boolean()) })),
    });
    const configResult = v.safeParse(
      GsdConfigSchema,
      JSON.parse(readFileSync(configPath, "utf8")),
    );
    if (
      !configResult.success ||
      configResult.output.hooks?.workflow_guard !== true
    )
      process.exit(0);
  } catch {
    process.exit(0);
  }
} else {
  process.exit(0); // No GSB project — don't guard
}

const output = {
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    additionalContext:
      `⚠️ WORKFLOW ADVISORY: You're editing ${basename(filePath)} directly without a GSB command. ` +
      "This edit will not be tracked in STATE.md or produce a SUMMARY.md. " +
      "Consider using /gsb:fast for trivial fixes or /gsb:quick for larger changes " +
      "to maintain project state tracking. " +
      "If this is intentional (e.g., user explicitly asked for a direct edit), proceed normally.",
  },
};

process.stdout.write(JSON.stringify(output));
