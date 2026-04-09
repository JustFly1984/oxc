/*
 * Methods related to settings.
 */

import { deepFreezeJsonValue } from "./json.ts";
import { debugAssertIsNonNull } from "../utils/asserts.ts";

import type { JsonObject } from "./json.ts";

/**
 * Settings for the file being linted.
 *
 * Settings are deserialized from JSON, so can only contain JSON-compatible values.
 */
export type Settings = JsonObject;

// Settings for current file.
// `settingsJSON` is set before linting a file by `setSettingsForFile`.
// `settings` is deserialized from `settingsJSON` lazily upon first access.
let settingsJSON: string | null = null;
export let settings: Readonly<Settings> | null = null;

// Cache: avoid re-parsing identical settings across consecutive files.
// In CLI mode, most files share the same settings, so this skips JSON.parse + deepFreeze overhead.
let cachedSettingsJSON: string | null = null;
let cachedSettings: Readonly<Settings> | null = null;

/**
 * Updates the settings for the file.
 *
 * @param settingsJSONInput - Settings for the file as JSON
 */
export function setSettingsForFile(settingsJSONInput: string): undefined {
  settingsJSON = settingsJSONInput;
}

/**
 * Deserialize settings from JSON.
 */
export function initSettings(): undefined {
  debugAssertIsNonNull(settingsJSON);

  // If settings JSON is identical to the last file, reuse the cached parsed object.
  // The cached object is already deep-frozen, so it's safe to share across files.
  if (settingsJSON === cachedSettingsJSON) {
    settings = cachedSettings;
    return;
  }

  settings = JSON.parse(settingsJSON);
  // Deep freeze the settings object, to prevent any mutation of the settings from plugins
  deepFreezeJsonValue(settings);

  // Update cache
  cachedSettingsJSON = settingsJSON;
  cachedSettings = settings;
}

/**
 * Reset settings.
 */
export function resetSettings(): undefined {
  settings = null;
  settingsJSON = null;
}
