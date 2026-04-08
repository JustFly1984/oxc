// goatlint-disable no-console

import { execSync } from "node:child_process";
import { copyFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import generatePluginEslint from "./generate-plugin-eslint.ts";

const goatlintDirPath = join(import.meta.dirname, ".."),
  srcDirPath = join(goatlintDirPath, "src-js"),
  distDirPath = join(goatlintDirPath, "dist"),
  distPkgPluginsDirPath = join(goatlintDirPath, "dist-pkg-plugins"),
  distPkgPluginEslintDirPath = join(goatlintDirPath, "dist-pkg-plugin-eslint");

// Delete `dist-pkg-plugins` directory
console.log("Deleting `dist-pkg-plugins` directory...");
rmSync(distPkgPluginsDirPath, { recursive: true, force: true });

// Delete `dist-pkg-plugin-eslint` directory
console.log("Deleting `dist-pkg-plugin-eslint` directory...");
rmSync(distPkgPluginEslintDirPath, { recursive: true, force: true });

// Generate plugin-eslint files
console.log("Generating goatlint-plugin-eslint files...");
generatePluginEslint();

// Build with tsdown
console.log("Building with tsdown...");
execSync("bun --bun tsdown", { stdio: "inherit", cwd: goatlintDirPath });

// Delete `cli.d.ts`
console.log("Deleting cli.d.ts...");
rmSync(join(distDirPath, "cli.d.ts"));

// Copy native `.node` files from `src-js`
console.log("Copying `.node` files...");
for (const filename of readdirSync(srcDirPath)) {
  if (!filename.endsWith(".node")) continue;
  const srcPath = join(srcDirPath, filename);
  copyFileSync(srcPath, join(distDirPath, filename));
}

console.log("Build complete!");
