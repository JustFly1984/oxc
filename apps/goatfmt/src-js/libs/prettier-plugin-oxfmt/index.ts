/**
 * Prettier plugin that uses `goat_formatter` for (j|t)s-in-xxx part.
 *
 * When Prettier formats Vue/HTML (which can embed JS/TS code inside) files,
 * it calls the `embed()` function for each block.
 *
 * By default, it uses the `babel` or `typescript` parser and `estree` printer.
 * Therefore, by overriding these internally, we can use `goat_formatter` instead.
 * e.g. Now it's possible to apply our builtin sort-imports for JS/TS code inside Vue `<script>`.
 */

import { textToDoc } from "./text-to-doc";
import type { Parser, Printer, Doc, SupportOptions } from "prettier";

export const options: SupportOptions = {
  _goatfmtPluginOptionsJson: {
    category: "JavaScript",
    type: "string",
    default: "{}",
    description: "Bundled JSON string for goatfmt-plugin options",
  },
};

const goatfmtParser: Parser<Doc> = {
  parse: textToDoc,
  astFormat: "OXFMT",
  // Not used but required
  locStart: () => -1,
  locEnd: () => -1,
};

export const parsers: Record<string, Parser> = {
  // Override default JS/TS parsers
  babel: goatfmtParser,
  "babel-ts": goatfmtParser,
  typescript: goatfmtParser,
};

export const printers: Record<string, Printer<Doc>> = {
  OXFMT: {
    print: ({ node }) => node,
  },
};
