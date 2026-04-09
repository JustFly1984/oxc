/*
 * Methods related to globals.
 */

import { debugAssert, debugAssertIsNonNull } from "../utils/asserts.ts";

/**
 * Globals for the file being linted.
 *
 * Globals are deserialized from JSON, so can only contain JSON-compatible values.
 * Each global variable maps to "readonly", "writable", or "off".
 */
export type Globals = Record<string, "readonly" | "writable" | "off">;

/**
 * Environments for the file being linted.
 *
 * Only includes environments that are enabled, so all properties are `true`.
 */
export type Envs = Record<string, true>;

// Globals and envs for current file.
// `globalsJSON` is set before linting a file by `setGlobalsForFile`.
// `globals` and `envs` are deserialized from `globalsJSON` lazily upon first access.
let globalsJSON: string | null = null;
export let globals: Readonly<Globals> | null = null;
export let envs: Readonly<Envs> | null = null;

// Cache: avoid re-parsing identical globals across consecutive files.
// In CLI mode, most files share the same globals, so this skips JSON.parse + freeze overhead.
let cachedGlobalsJSON: string | null = null;
let cachedGlobals: Readonly<Globals> | null = null;
let cachedEnvs: Readonly<Envs> | null = null;

/**
 * Updates the globals for the file.
 *
 * @param globalsJSONInput - Globals for the file as JSON
 */
export function setGlobalsForFile(globalsJSONInput: string): undefined {
  globalsJSON = globalsJSONInput;
}

/**
 * Deserialize globals from JSON.
 *
 * Caller must ensure that `globalsJSON` has been initialized before calling this function.
 */
export function initGlobals(): void {
  debugAssertIsNonNull(globalsJSON);

  // If globals JSON is identical to the last file, reuse the cached parsed objects.
  // The cached objects are already frozen, so they're safe to share across files.
  if (globalsJSON === cachedGlobalsJSON) {
    globals = cachedGlobals;
    envs = cachedEnvs;
    return;
  }

  ({ globals, envs } = JSON.parse(globalsJSON));

  debugAssert(
    typeof globals === "object" && globals !== null && !Array.isArray(globals),
    "`globals` should be an object",
  );
  debugAssert(
    typeof envs === "object" && envs !== null && !Array.isArray(envs),
    "`envs` should be an object",
  );

  Object.freeze(globals);
  Object.freeze(envs);

  // Update cache
  cachedGlobalsJSON = globalsJSON;
  cachedGlobals = globals;
  cachedEnvs = envs;
}

/**
 * Reset globals.
 */
export function resetGlobals(): undefined {
  globals = null;
  envs = null;
  globalsJSON = null;
}
