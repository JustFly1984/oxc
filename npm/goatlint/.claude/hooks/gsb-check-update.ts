// gsb-hook-version: 1.30.0
// Check bundled GSB metadata in background and write result to cache.
// Called by SessionStart hook — avoids network work during startup.

import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
} from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const homeDir = homedir();
const cwd = process.cwd();

function detectConfigDir(baseDir: string): string {
  const envDir = process.env.CLAUDE_CONFIG_DIR;
  if (
    envDir !== undefined &&
    envDir !== "" &&
    existsSync(join(envDir, "get-shit-bun", "VERSION"))
  )
    return envDir;
  for (const dir of [".config/opencode", ".opencode", ".gemini", ".claude"]) {
    if (existsSync(join(baseDir, dir, "get-shit-bun", "VERSION")))
      return join(baseDir, dir);
  }
  return envDir ?? join(baseDir, ".claude");
}

const globalConfigDir = detectConfigDir(homeDir);
const projectConfigDir = detectConfigDir(cwd);
const cacheDir = join(globalConfigDir, "cache");
const cacheFile = join(cacheDir, "gsb-update-check.json");

const projectVersionFile = join(projectConfigDir, "get-shit-bun", "VERSION");
const globalVersionFile = join(globalConfigDir, "get-shit-bun", "VERSION");

if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true });

// Read installed version
let installed = "0.0.0";
let configDir = "";
if (existsSync(projectVersionFile)) {
  installed = readFileSync(projectVersionFile, "utf8").trim();
  configDir = join(projectConfigDir, "get-shit-bun");
} else if (existsSync(globalVersionFile)) {
  installed = readFileSync(globalVersionFile, "utf8").trim();
  configDir = join(globalConfigDir, "get-shit-bun");
}

// Check for stale hooks
interface StaleHook {
  file: string;
  hookVersion: string;
  installedVersion: string;
}
const staleHooks: Array<StaleHook> = [];
if (configDir) {
  const hooksDir = join(configDir, "hooks");
  try {
    if (existsSync(hooksDir)) {
      const hookFiles = readdirSync(hooksDir).filter(
        (f) => f.startsWith("gsb-") && f.endsWith(".ts"),
      );
      for (const hookFile of hookFiles) {
        try {
          const content = readFileSync(join(hooksDir, hookFile), "utf8");
          const versionMatch = content.match(/\/\/ gsb-hook-version:\s*(.+)/);
          if (versionMatch) {
            const hookVersion = versionMatch[1]?.trim() ?? "";
            if (hookVersion !== installed && !hookVersion.includes("{{")) {
              staleHooks.push({
                file: hookFile,
                hookVersion,
                installedVersion: installed,
              });
            }
          } else {
            staleHooks.push({
              file: hookFile,
              hookVersion: "unknown",
              installedVersion: installed,
            });
          }
        } catch {
          // skip
        }
      }
    }
  } catch {
    // skip
  }
}

const cacheData = {
  update_available: false,
  installed,
  latest: installed,
  checked: Math.floor(Date.now() / 1000),
  stale_hooks: staleHooks.length > 0 ? staleHooks : undefined,
};

writeFileSync(cacheFile, JSON.stringify(cacheData));
