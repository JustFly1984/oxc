---
name: migrate-goatfmt
description: Guide for migrating a project from Prettier or Biome to Goatfmt. Use when asked to migrate, convert, or switch a JavaScript/TypeScript project's formatter from Prettier or Biome to Goatfmt or oxfmt.
---

This skill guides you through migrating a JavaScript/TypeScript project from Prettier or Biome to [Goatfmt](https://goatlint.dev/docs/guide/usage/formatter).

## Overview

Goatfmt is a high-performance, Prettier-compatible code formatter. Most Prettier options are supported directly.

An automated migration tool is built into goatfmt, supporting both Prettier and Biome as migration sources.

## Step 1: Run Automated Migration

### From Prettier

```bash
npx goatfmt@latest --migrate prettier
```

This will:

- Find and read your Prettier config (any format Prettier supports)
- Create `.goatfmtrc.json` with migrated options
- Migrate `.prettierignore` patterns to `ignorePatterns`
- Migrate `prettier-plugin-tailwindcss` options to `sortTailwindcss`
- Detect `prettier-plugin-packagejson` and enable `sortPackageJson`

### From Biome

```bash
npx goatfmt@latest --migrate biome
```

This will:

- Find and read `biome.json` or `biome.jsonc`
- Create `.goatfmtrc.json` with migrated options
- Migrate negated patterns from `files.includes` to `ignorePatterns`
- Map Biome's two-level config (`formatter.*` and `javascript.formatter.*`) to goatfmt options

Biome option mapping:

| Biome                                                       | goatfmt                             |
| ----------------------------------------------------------- | --------------------------------- |
| `formatter.indentStyle` (`"tab"`/`"space"`)                 | `useTabs` (`true`/`false`)        |
| `formatter.indentWidth`                                     | `tabWidth`                        |
| `formatter.lineWidth`                                       | `printWidth`                      |
| `javascript.formatter.quoteStyle`                           | `singleQuote`                     |
| `javascript.formatter.jsxQuoteStyle`                        | `jsxSingleQuote`                  |
| `javascript.formatter.quoteProperties` (`"asNeeded"`)       | `quoteProps` (`"as-needed"`)      |
| `javascript.formatter.trailingCommas`                       | `trailingComma`                   |
| `javascript.formatter.semicolons` (`"always"`/`"asNeeded"`) | `semi` (`true`/`false`)           |
| `javascript.formatter.arrowParentheses` (`"asNeeded"`)      | `arrowParens` (`"avoid"`)         |
| `formatter.bracketSameLine`                                 | `bracketSameLine`                 |
| `formatter.bracketSpacing`                                  | `bracketSpacing`                  |
| `formatter.attributePosition` (`"multiline"`)               | `singleAttributePerLine` (`true`) |

Notes (both sources):

- Fails if `.goatfmtrc.json` already exists. Delete it first if you want to re-run.
- If no source config is found, creates a blank `.goatfmtrc.json` instead.
- `overrides` cannot be auto-migrated for either source and must be converted manually.

## Step 2: Review Generated Config

After migration, review the generated `.goatfmtrc.json` for these key differences:

### printWidth

Prettier and Biome default is 80, goatfmt default is 100. The migration tool sets `printWidth: 80` if not specified in your source config. Decide whether to keep 80 or adopt 100.

### Unsupported Options (Prettier only)

These Prettier options are skipped during migration:

| Option                         | Status                                           |
| ------------------------------ | ------------------------------------------------ |
| `endOfLine: "auto"`            | Not supported. Use `"lf"` or `"crlf"` explicitly |
| `experimentalTernaries`        | Not supported in JS/TS files yet                 |
| `experimentalOperatorPosition` | Not supported in JS/TS files yet                 |

### sortPackageJson (Prettier only)

Enabled by default in goatfmt, but the migration tool disables it unless `prettier-plugin-packagejson` was detected. Review whether you want this enabled.

Note: goatfmt's sorting algorithm differs from `prettier-plugin-packagejson`.

### embeddedLanguageFormatting (Prettier only)

Embedded language formatting (e.g., CSS-in-JS) generally works, but some formatting may differ from Prettier.

### overrides

The `overrides` field cannot be auto-migrated from either Prettier or Biome. Convert manually:

```json
{
  "overrides": [
    {
      "files": ["*.md"],
      "options": { "tabWidth": 4 }
    }
  ]
}
```

### Nested Config

goatfmt does not support nested configuration files (e.g., a separate `.goatfmtrc.json` in a subdirectory). If your project used per-directory Prettier or Biome configs, consolidate them using `overrides` with file glob patterns, or run goatfmt separately per directory with different working directories.

### Prettier-Compatible Options

These options transfer directly with the same behavior:
`tabWidth`, `useTabs`, `semi`, `singleQuote`, `jsxSingleQuote`, `quoteProps`, `trailingComma`, `arrowParens`, `bracketSpacing`, `bracketSameLine`, `endOfLine`, `proseWrap`, `htmlWhitespaceSensitivity`, `singleAttributePerLine`, `vueIndentScriptAndStyle`

## Step 3: Configure Goatfmt Extensions

goatfmt offers features not available in Prettier:

### sortImports

Sort import statements, inspired by `eslint-plugin-perfectionist/sort-imports` (disabled by default):

```json
{
  "sortImports": {
    "partitionByNewline": true,
    "newlinesBetween": false
  }
}
```

### sortTailwindcss

Replaces `prettier-plugin-tailwindcss`. Auto-migrated with renamed options:

| Prettier (top-level)         | goatfmt (`sortTailwindcss.*`) |
| ---------------------------- | --------------------------- |
| `tailwindConfig`             | `config`                    |
| `tailwindStylesheet`         | `stylesheet`                |
| `tailwindFunctions`          | `functions`                 |
| `tailwindAttributes`         | `attributes`                |
| `tailwindPreserveWhitespace` | `preserveWhitespace`        |
| `tailwindPreserveDuplicates` | `preserveDuplicates`        |

### Other Extensions

| Option               | Default | Description                                                                  |
| -------------------- | ------- | ---------------------------------------------------------------------------- |
| `insertFinalNewline` | `true`  | Whether to add a final newline at end of file                                |
| `sortPackageJson`    | `true`  | Sort `package.json` keys. Set `{ "sortScripts": true }` to also sort scripts |

## Step 4: Update CI and Scripts

Replace formatter commands with goatfmt:

```bash
# Before (Prettier)
npx prettier --write .
npx prettier --check .

# Before (Biome)
npx biome format --write .
npx biome check .

# After
npx goatfmt@latest
npx goatfmt@latest --check
```

### Common CLI Options

| Prettier / Biome                                | goatfmt                                        |
| ----------------------------------------------- | -------------------------------------------- |
| `prettier --write .` / `biome format --write .` | `goatfmt` (default: cwd, `--write` mode)       |
| `prettier --check .` / `biome check .`          | `goatfmt --check`                              |
| `prettier --list-different .`                   | `goatfmt --list-different`                     |
| `prettier --config path`                        | `goatfmt --config path`                        |
| `prettier --ignore-path .prettierignore`        | `goatfmt --ignore-path .prettierignore`        |
| `cat file \| prettier --stdin-filepath=file.ts` | `cat file \| goatfmt --stdin-filepath=file.ts` |

### File Type Coverage

- JS/TS: Formatted natively by goatfmt
- TOML: Formatted natively (via taplo)
- CSS, HTML, YAML, Markdown, GraphQL, etc.: Delegated to Prettier internally (when using `npx goatfmt`)

## Tips

- EditorConfig: goatfmt reads `.editorconfig` automatically for `useTabs`, `tabWidth`, `endOfLine`, `insertFinalNewline`, and `printWidth`. Options in `.goatfmtrc.json` take precedence.
- CI: Use `npx goatfmt@latest --check` to enforce formatting in CI.
- LSP: Run `goatfmt --lsp` for editor integration via Language Server Protocol.
- Schema support: Add `"$schema": "./node_modules/goatfmt/configuration_schema.json"` to `.goatfmtrc.json` for editor autocompletion.
- Init: Run `npx goatfmt@latest --init` to create a default `.goatfmtrc.json` without migration.

## References

- [CLI Reference](https://goatlint.dev/docs/guide/usage/formatter/cli.html)
- [Config File Reference](https://goatlint.dev/docs/guide/usage/formatter/config-file-reference.html)
- [Unsupported Features](https://goatlint.dev/docs/guide/usage/formatter/unsupported-features.html)
