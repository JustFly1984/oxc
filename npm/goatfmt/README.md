<p align="center">
  <br>
  <br>
  <a href="https://goatlint.dev" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://goatlint.dev/oxc-light.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://goatlint.dev/oxc-dark.svg">
      <img alt="Oxc logo" src="https://goatlint.dev/oxc-dark.svg" height="60">
    </picture>
  </a>
  <br>
  <br>
  <br>
</p>

<div align="center">

[![MIT licensed][license-badge]][license-url]
[![npm][npm-badge]][npm-url]
[![Build Status][ci-badge]][ci-url]

[![Discord chat][discord-badge]][discord-url]
[![Playground][playground-badge]][playground-url]

</div>

# Goatfmt

Goatfmt is a high-performance, Prettier-compatible code formatter for JavaScript and TypeScript, written in Rust.

- Drop-in replacement for Prettier in most projects
- Formats JS, TS, JSX, TSX natively; delegates CSS, HTML, Markdown, and others to Prettier
- Built-in import sorting and Tailwind CSS class sorting
- TOML formatting via taplo

## Quick Start

```sh
npx goatfmt@latest
```

Formats the current directory with sensible defaults. No configuration required.

## Installation

```sh
npm install -D goatfmt
```

## Usage

```sh
# Format the current directory (write mode)
npx goatfmt

# Check formatting without writing
npx goatfmt --check

# List files that would change
npx goatfmt --list-different

# Format specific paths
npx goatfmt src/ tests/

# Format via stdin
cat file.ts | npx goatfmt --stdin-filepath=file.ts
```

## Configuration

Create a `.goatfmtrc.json` in your project root:

```json
{
  "$schema": "./node_modules/goatfmt/configuration_schema.json",
  "printWidth": 100,
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

All standard Prettier options are supported: `tabWidth`, `useTabs`, `semi`, `singleQuote`, `jsxSingleQuote`, `quoteProps`, `trailingComma`, `arrowParens`, `bracketSpacing`, `bracketSameLine`, `endOfLine`, `proseWrap`, `htmlWhitespaceSensitivity`, `singleAttributePerLine`, `vueIndentScriptAndStyle`.

### Additional options

| Option               | Default | Description                                         |
| -------------------- | ------- | --------------------------------------------------- |
| `sortImports`        | off     | Sort import statements                              |
| `sortTailwindcss`    | off     | Sort Tailwind CSS classes                           |
| `sortPackageJson`    | `true`  | Sort `package.json` keys                            |
| `insertFinalNewline` | `true`  | Add trailing newline at end of file                 |

See the [config file reference](https://goatlint.dev/docs/guide/usage/formatter/config-file-reference.html) for all options.

## Migrating from Prettier or Biome

```sh
# From Prettier
npx goatfmt --migrate prettier

# From Biome
npx goatfmt --migrate biome
```

This reads your existing config and generates an equivalent `.goatfmtrc.json`.

## Links

- [Documentation](https://goatlint.dev/docs/guide/usage/formatter)
- [CLI Reference](https://goatlint.dev/docs/guide/usage/formatter/cli.html)
- [Config File Reference](https://goatlint.dev/docs/guide/usage/formatter/config-file-reference.html)
- [Unsupported Features](https://goatlint.dev/docs/guide/usage/formatter/unsupported-features.html)
- [Discord](https://discord.gg/9uXCAwqQZW)

## License

[MIT](https://github.com/goat-project/oxc/blob/main/LICENSE)

[discord-badge]: https://img.shields.io/discord/1079625926024900739?logo=discord&label=Discord
[discord-url]: https://discord.gg/9uXCAwqQZW
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/goat-project/oxc/blob/main/LICENSE
[ci-badge]: https://github.com/goat-project/oxc/actions/workflows/ci.yml/badge.svg?event=push&branch=main
[ci-url]: https://github.com/goat-project/oxc/actions/workflows/ci.yml?query=event%3Apush+branch%3Amain
[npm-badge]: https://img.shields.io/npm/v/goatfmt/latest?color=brightgreen
[npm-url]: https://www.npmjs.com/package/goatfmt
[playground-badge]: https://img.shields.io/badge/Playground-blue?color=9BE4E0
[playground-url]: https://playground.goatlint.dev/
