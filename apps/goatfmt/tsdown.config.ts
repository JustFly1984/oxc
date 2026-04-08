import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src-js/index.ts", "src-js/cli.ts", "src-js/cli-worker.ts"],
  format: "esm",
  platform: "node",
  target: "node20",
  dts: true,
  attw: { profile: "esm-only" },
  clean: true,
  outDir: "dist",
  shims: false,
  fixedExtension: false,
  define: { "import.meta.vitest": "undefined" },
  deps: {
    // Cannot bundle: `cli-worker.js` runs in separate thread and can't resolve bundled chunks
    // Be sure to add it to "dependencies" in `npm/goatfmt/package.json`!
    // "tinypool",
  },
});
