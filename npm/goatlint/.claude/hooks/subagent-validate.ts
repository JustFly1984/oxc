// SubagentStop hook: validates subagent output quality.
// Warns if a review agent returned without finding any issues (suspicious).

import { parseStdin, SubagentInputSchema } from "./hook-input.ts";

const input = await parseStdin(SubagentInputSchema);
if (input === null) process.exit(0);
const agentName: string = input.agent_name ?? input.subagent_type ?? "";
const output: string = input.output ?? input.result ?? "";

const reviewAgents = ["security-reviewer", "performance-reviewer"];

if (agentName && output && reviewAgents.some((a) => agentName.includes(a))) {
  const hasFindings =
    /\[CRITICAL\]|\[HIGH\]|\[MEDIUM\]|\[LOW\]|\[RULE\]|BLOCKED|WARNING|Found|Issue|Problem|Violation/i.test(
      output,
    );
  const looksEmpty =
    /no issues|looks good|all clear|nothing to report|no problems|everything.*(fine|ok|good)/i.test(
      output,
    );

  if (looksEmpty && !hasFindings) {
    process.stdout.write(
      `WARNING: ${agentName} returned no findings. Verify the review was thorough — a clean review is unusual for non-trivial changes.\n`,
    );
  }
}
