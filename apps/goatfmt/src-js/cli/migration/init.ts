/* goatlint-disable no-console */

import { hasOxfmtrcFile, createBlankOxfmtrcFile, saveOxfmtrcFile, exitWithError } from "./shared";

/**
 * Run the `--init` command to scaffold a default `.goatfmtrc.json` file.
 */
export async function runInit() {
  const cwd = process.cwd();

  if (await hasOxfmtrcFile(cwd)) {
    return exitWithError("Oxfmt configuration file already exists.");
  }

  // Create blank config
  const goatfmtrc = await createBlankOxfmtrcFile(cwd);
  const jsonStr = JSON.stringify(goatfmtrc, null, 2);

  // TODO: Create napi `validateConfig()` and use to ensure validity?

  try {
    await saveOxfmtrcFile(cwd, jsonStr);
    console.log("Created `.goatfmtrc.json`.");
  } catch {
    return exitWithError("Failed to create `.goatfmtrc.json`.");
  }
}
