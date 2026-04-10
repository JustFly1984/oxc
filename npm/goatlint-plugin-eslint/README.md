# goatlint-plugin-eslint

ESLint's built-in rules as a Goatlint JS plugin.

Use this to run ESLint core rules that Goatlint doesn't implement natively yet — no ESLint installation required.

## Installation

```sh
npm install -D goatlint-plugin-eslint
```

## Usage

Add to your `.goatlintrc.json`:

```json
{
  "jsPlugins": ["goatlint-plugin-eslint"],
  "rules": {
    "eslint-js/no-restricted-syntax": [
      "error",
      {
        "selector": "ThrowStatement > CallExpression[callee.name=/Error$/]",
        "message": "Use `new` keyword when throwing an `Error`."
      }
    ]
  }
}
```

All rules are prefixed with `eslint-js/` to distinguish them from Goatlint's native Rust implementations of ESLint rules.

## Links

- [JS Plugins Documentation](https://goatlint.dev/docs/guide/usage/linter/js-plugins)
- [ESLint Rules Reference](https://eslint.org/docs/latest/rules/)
- [GitHub](https://github.com/goat-project/oxc)

## License

[MIT](https://github.com/goat-project/oxc/blob/main/LICENSE)
