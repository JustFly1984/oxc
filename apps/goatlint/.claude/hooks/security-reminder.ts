// Pre-tool-use hook: warns about security patterns in file edits.
// Reads JSON from stdin. Blocks first occurrence per (file, rule) per session.
// Uses session-scoped state file to avoid repeat warnings.

import { readdir, stat, unlink } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";
import { parseStdin, ToolGuardInputSchema } from "./hook-input.ts";

interface SecurityPattern {
  ruleName: string;
  pathCheck?: (path: string) => boolean;
  substrings?: Array<string>;
  reminder: string;
}

const SECURITY_PATTERNS: Array<SecurityPattern> = [
  {
    ruleName: "github_actions_workflow",
    pathCheck: (path: string): boolean =>
      path.includes(".github/workflows/") &&
      (path.endsWith(".yml") || path.endsWith(".yaml")),
    reminder: [
      "You are editing a GitHub Actions workflow file. Be aware of these security risks:",
      "",
      "1. **Command Injection**: Never use untrusted input directly in run: commands",
      "2. **Use environment variables**: Instead of ${{ github.event.issue.title }}, use env: with proper quoting",
      "3. **Review the guide**: https://github.blog/security/vulnerability-research/how-to-catch-github-actions-workflow-injections-before-attackers-do/",
    ].join("\n"),
  },
  {
    ruleName: "child_process_exec",
    substrings: ["child_process.exec", "execSync("],
    reminder:
      "\u26a0\ufe0f Security Warning: Using child_process.exec() can lead to command injection vulnerabilities. Use execFile/execFileSync with array args instead.",
  },
  {
    ruleName: "new_function_injection",
    substrings: ["new Function"],
    reminder:
      "\u26a0\ufe0f Security Warning: new Function() with dynamic strings can lead to code injection. Consider alternatives.",
  },
  {
    ruleName: "eval_injection",
    substrings: ["eval("],
    reminder:
      "\u26a0\ufe0f Security Warning: eval() executes arbitrary code. Use JSON.parse() for data or alternative patterns.",
  },
  {
    ruleName: "react_dangerously_set_html",
    substrings: ["dangerouslySetInnerHTML"],
    reminder:
      "\u26a0\ufe0f Security Warning: dangerouslySetInnerHTML can lead to XSS. Sanitize with DOMPurify or use safe alternatives.",
  },
  {
    ruleName: "document_write_xss",
    substrings: ["document.write"],
    reminder:
      "\u26a0\ufe0f Security Warning: document.write() can be exploited for XSS. Use createElement()/appendChild() instead.",
  },
  {
    ruleName: "innerHTML_xss",
    substrings: [".innerHTML =", ".innerHTML="],
    reminder:
      "\u26a0\ufe0f Security Warning: innerHTML with untrusted content leads to XSS. Use textContent or DOMPurify.",
  },
  {
    ruleName: "pickle_deserialization",
    substrings: ["pickle"],
    reminder:
      "\u26a0\ufe0f Security Warning: pickle with untrusted content can execute arbitrary code. Use JSON instead.",
  },
  {
    ruleName: "os_system_injection",
    substrings: ["os.system", "from os import system"],
    reminder:
      "\u26a0\ufe0f Security Warning: os.system should only be used with static arguments, never user-controlled input.",
  },
];

function getStateFile(sessionId: string): string {
  return join(
    homedir(),
    ".claude",
    `security_warnings_state_${sessionId}.json`,
  );
}

async function cleanupOldStateFiles(): Promise<void> {
  try {
    const stateDir = join(homedir(), ".claude");
    const entries = await readdir(stateDir);
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const cutoff = Date.now() - thirtyDaysMs;

    for (const filename of entries) {
      if (
        filename.startsWith("security_warnings_state_") &&
        filename.endsWith(".json")
      ) {
        const filePath = join(stateDir, filename);
        try {
          const fileStat = await stat(filePath);
          if (fileStat.mtimeMs < cutoff) await unlink(filePath);
        } catch {
          // ignore
        }
      }
    }
  } catch {
    // ignore
  }
}

async function loadState(sessionId: string): Promise<Set<string>> {
  try {
    const file = Bun.file(getStateFile(sessionId));
    if (await file.exists()) {
      const data: unknown = await file.json();
      if (Array.isArray(data))
        return new Set(
          data.filter(
            (item: unknown): item is string => typeof item === "string",
          ),
        );
    }
  } catch {
    // ignore
  }
  return new Set();
}

async function saveState(sessionId: string, shown: Set<string>): Promise<void> {
  try {
    await Bun.write(getStateFile(sessionId), JSON.stringify(Array.from(shown)));
  } catch {
    // ignore
  }
}

type PatternMatch = {
  ruleName: string;
  reminder: string;
};

function checkPatterns(filePath: string, content: string): PatternMatch | null {
  const normalized = filePath.replace(/^\/+/, "");

  for (const pattern of SECURITY_PATTERNS) {
    if (
      typeof pattern.pathCheck !== "undefined" &&
      pattern.pathCheck(normalized)
    ) {
      return { ruleName: pattern.ruleName, reminder: pattern.reminder };
    }

    if (typeof pattern.substrings !== "undefined" && content.length > 0) {
      for (const sub of pattern.substrings) {
        if (content.includes(sub)) {
          return { ruleName: pattern.ruleName, reminder: pattern.reminder };
        }
      }
    }
  }
  return null;
}

// --- main ---

if (Bun.env.ENABLE_SECURITY_REMINDER === "0") {
  process.exit(0);
}

// Probabilistic cleanup (10% chance)
if (Math.random() < 0.1) await cleanupOldStateFiles();

const input = await parseStdin(ToolGuardInputSchema);

if (input === null) {
  process.exit(0);
}

const toolName: string = input.tool_name ?? "";

const toolInput = input.tool_input ?? {};

if (!["Edit", "Write", "MultiEdit"].includes(toolName)) {
  process.exit(0);
}

const filePath: string = toolInput.file_path ?? "";

if (filePath.length === 0) {
  process.exit(0);
}

let content = "";

if (toolName === "Write") {
  content = toolInput.content ?? "";
} else if (toolName === "Edit") {
  content = toolInput.new_string ?? "";
} else {
  const edits = toolInput.edits ?? [];

  content = edits.map((e) => e.new_string ?? "").join(" ");
}

const match = checkPatterns(filePath, content);

if (match !== null) {
  const sessionId: string = input.session_id ?? "default";

  const warningKey = `${filePath}-${match.ruleName}`;

  const shown = await loadState(sessionId);

  if (!shown.has(warningKey)) {
    shown.add(warningKey);

    await saveState(sessionId, shown);

    process.stderr.write(match.reminder + "\n");

    process.exit(2);
  }
}

process.exit(0);
