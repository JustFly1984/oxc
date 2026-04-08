// goatlint-disable no-console

import { execSync } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const goatfmtDirPath = join(import.meta.dirname, ".."),
  distDirPath = join(goatfmtDirPath, "dist");

// Build with tsdown
console.log("Building with tsdown...");
execSync("bun --bun tsdown", { stdio: "inherit", cwd: goatfmtDirPath });

// Copy native `.node` files from `src-js`
console.log("Copying `.node` files...");

for (const filename of readdirSync(join(goatfmtDirPath, "src-js"))) {
  if (!filename.endsWith(".node")) continue;
  copyFile(join(goatfmtDirPath, "src-js", filename), join(distDirPath, filename));
}

console.log("Build complete!");

/**
 * Copy a file, creating parent directories if needed.
 * @param {string} srcPath - Source file path, absolute
 * @param {string} destPath - Destination file path, absolute
 * @returns {void}
 */
function copyFile(srcPath, destPath) {
  mkdirSync(join(destPath, ".."), { recursive: true });
  copyFileSync(srcPath, destPath);
  console.log(`- Copied ${srcPath.split("/").pop()}`);
}
