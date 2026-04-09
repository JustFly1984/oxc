// Notification hook: macOS desktop notification with sound when Claude needs attention.

import { parseStdin, NotifyInputSchema } from "./hook-input.ts";

const input = await parseStdin(NotifyInputSchema);
if (input === null) process.exit(0);
const msg: string = input.message ?? "Claude needs attention";

Bun.spawnSync([
  "osascript",
  "-e",
  `display notification "${msg}" with title "Claude Code" sound name "Glass"`,
]);
process.exit(0);
