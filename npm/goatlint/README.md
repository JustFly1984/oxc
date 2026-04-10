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

# Goatlint

Goatlint is a high-performance JavaScript and TypeScript linter written in Rust. It runs 50-100x faster than ESLint while implementing hundreds of popular rules out of the box.

- Zero configuration required to get started
- Supports ESLint-compatible JS plugins for custom rules
- Built-in support for TypeScript, React, Vue, JSX-A11y, Import, Unicorn, and more
- Autofixes for many rules via `--fix`

## Quick Start

```sh
npx goatlint@latest
```

No setup needed — goatlint lints the current directory with sensible defaults.

## Installation

```sh
npm install -D goatlint
```

## Usage

```sh
# Lint the current directory
npx goatlint

# Lint specific paths
npx goatlint src/ tests/

# Apply autofixes
npx goatlint --fix

# Show all available rules
npx goatlint --rules

# Output as JSON
npx goatlint --format json
```

## Configuration

Create a `.goatlintrc.json` in your project root:

```json
{
  "$schema": "./node_modules/goatlint/configuration_schema.json",
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off"
  },
  "categories": {
    "correctness": "error",
    "suspicious": "warn"
  }
}
```

Or generate one automatically:

```sh
npx goatlint --init
```

See the [config file reference](https://goatlint.dev/docs/guide/usage/linter/config-file-reference.html) for all options.

## Migrating from ESLint

```sh
npx @goatlint/migrate
```

This reads your ESLint config and generates an equivalent `.goatlintrc.json`. See the [migration guide](https://goatlint.dev/docs/guide/usage/linter/migrate-from-eslint.html) for details.

## Links

- [Documentation](https://goatlint.dev/docs/guide/usage/linter)
- [CLI Reference](https://goatlint.dev/docs/guide/usage/linter/cli.html)
- [Rules](https://goatlint.dev/docs/guide/usage/linter/rules.html)
- [JS Plugins](https://goatlint.dev/docs/guide/usage/linter/js-plugins)
- [Editor Integration](https://goatlint.dev/docs/guide/usage/linter/editors.html)
- [Discord](https://discord.gg/9uXCAwqQZW)

## License

[MIT](https://github.com/goat-project/oxc/blob/main/LICENSE)

[discord-badge]: https://img.shields.io/discord/1079625926024900739?logo=discord&label=Discord
[discord-url]: https://discord.gg/9uXCAwqQZW
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/goat-project/oxc/blob/main/LICENSE
[ci-badge]: https://github.com/goat-project/oxc/actions/workflows/ci.yml/badge.svg?event=push&branch=main
[ci-url]: https://github.com/goat-project/oxc/actions/workflows/ci.yml?query=event%3Apush+branch%3Amain
[npm-badge]: https://img.shields.io/npm/v/goatlint/latest?color=brightgreen
[npm-url]: https://www.npmjs.com/package/goatlint
[playground-badge]: https://img.shields.io/badge/Playground-blue?color=9BE4E0
[playground-url]: https://playground.goatlint.dev/
