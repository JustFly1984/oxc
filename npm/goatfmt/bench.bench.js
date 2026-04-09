import { readFile, writeFile } from "node:fs/promises";
import { join as pathJoin } from "node:path";
import { bench, describe } from "vitest";
import { format } from "./dist/index.js";

// Same fixtures as used in Rust parser benchmarks and napi/parser benchmarks.
// Only JS/TS files (goatfmt formats JavaScript/TypeScript).
const fixtureUrls = [
  "https://cdn.jsdelivr.net/gh/microsoft/TypeScript@v5.3.3/src/compiler/checker.ts",
  "https://cdn.jsdelivr.net/gh/goat-project/benchmark-files@main/cal.com.tsx",
  "https://cdn.jsdelivr.net/gh/goat-project/benchmark-files@main/RadixUIAdoptionSection.jsx",
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.269/build/pdf.mjs",
  "https://cdn.jsdelivr.net/npm/antd@4.16.1/dist/antd.js",
];

// Same directory as Rust benchmarks use for downloaded files
// to avoid re-downloading if Rust benchmarks already downloaded
const cacheDirPath = pathJoin(import.meta.dirname, "../../target");

// Load fixtures
const fixtures = await Promise.all(
  fixtureUrls.map(async (url) => {
    const filename = url.split("/").at(-1),
      path = pathJoin(cacheDirPath, filename);

    let code;
    try {
      code = await readFile(path, "utf8");
    } catch {
      const res = await fetch(url);
      code = await res.text();
      await writeFile(path, code);
    }

    return { filename, code };
  }),
);

// Run benchmarks
for (const { filename, code } of fixtures) {
  // goatlint-disable-next-line jest/valid-title
  describe(filename, () => {
    bench("goatfmt_format", async () => {
      await format(filename, code);
    });

    bench("goatfmt_format_with_options", async () => {
      await format(filename, code, {
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: "all",
      });
    });
  });
}
