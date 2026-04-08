// No-op stubs for external formatter callbacks.
// The Rust NAPI side expects these callbacks but they are not used
// when formatting JS/TS/TOML (handled natively by Rust).
// TODO: Add Rust-native CSS/HTML/Vue/Markdown formatters to replace Prettier.

export interface FormatFileParam {
  options: Record<string, any>;
  code: string;
}
export interface FormatEmbeddedCodeParam {
  options: Record<string, any>;
  code: string;
}
export interface FormatEmbeddedDocParam {
  options: Record<string, any>;
  texts: string[];
}
export interface SortTailwindClassesArgs {
  options: Record<string, any>;
  classes: string[];
}

export async function resolvePlugins(): Promise<string[]> {
  return [];
}

export async function formatFile(_param: FormatFileParam): Promise<string> {
  throw new Error("Non-JS file formatting is not yet supported without Prettier. See TODO.");
}

export async function formatEmbeddedCode(_param: FormatEmbeddedCodeParam): Promise<string | null> {
  return null;
}

export async function formatEmbeddedDoc(_param: FormatEmbeddedDocParam): Promise<string[] | null> {
  return null;
}

export async function sortTailwindClasses(_param: SortTailwindClassesArgs): Promise<string[] | null> {
  return null;
}
