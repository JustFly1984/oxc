import Tinypool from "tinypool";
import { resolvePlugins } from "../libs/apis";
import type {
  FormatFileParam,
  FormatEmbeddedCodeParam,
  FormatEmbeddedDocParam,
  SortTailwindClassesArgs,
} from "../libs/apis";

// Worker pool for parallel formatting
let pool: Tinypool | null = null;

export async function initExternalFormatter(numThreads: number): Promise<string[]> {
  pool = new Tinypool({
    filename: new URL("./cli-worker.js", import.meta.url).href,
    minThreads: numThreads,
    maxThreads: numThreads,
  });

  return resolvePlugins();
}

export async function disposeExternalFormatter(): Promise<void> {
  await pool?.destroy();
  pool = null;
}

// ---

// Used for non-JS files formatting
export async function formatFile(
  options: FormatFileParam["options"],
  code: string,
): Promise<string> {
  return pool!.run({ options, code } satisfies FormatFileParam, { name: "formatFile" });
}

// ---

// All functions below are used for JS files with embedded code
//
// NOTE: These functions return `null` on error instead of throwing.
// When errors were propagated as rejected JS promises, which become `napi::Error` values in Rust TSFN await paths.
// In heavily concurrent runs, dropping those error values could reach `napi_reference_unref` during teardown and trigger V8 fatal checks.

export async function formatEmbeddedCode(
  options: FormatEmbeddedCodeParam["options"],
  code: string,
): Promise<string | null> {
  return pool!
    .run({ options, code } satisfies FormatEmbeddedCodeParam, { name: "formatEmbeddedCode" })
    .catch(() => null);
}

export async function formatEmbeddedDoc(
  options: FormatEmbeddedDocParam["options"],
  texts: string[],
): Promise<string[] | null> {
  return pool!
    .run({ options, texts } satisfies FormatEmbeddedDocParam, {
      name: "formatEmbeddedDoc",
    })
    .catch(() => null);
}

export async function sortTailwindClasses(
  options: SortTailwindClassesArgs["options"],
  classes: string[],
): Promise<string[] | null> {
  return pool!
    .run({ classes, options } satisfies SortTailwindClassesArgs, { name: "sortTailwindClasses" })
    .catch(() => null);
}
