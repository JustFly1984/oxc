# @goatlint/plugins

Utilities for authoring [Goatlint JS plugins](https://goatlint.dev/docs/guide/usage/linter/js-plugins).

Provides `definePlugin`, `defineRule`, and TypeScript types for building custom lint rules that run in Goatlint.

## Installation

```sh
npm install @goatlint/plugins
```

## Usage

### Define a plugin

```typescript
import { definePlugin, defineRule } from "@goatlint/plugins";

const noFoo = defineRule({
  create(context) {
    return {
      Identifier(node) {
        if (node.name === "foo") {
          context.report({ node, message: "Avoid using 'foo'" });
        }
      },
    };
  },
});

export default definePlugin({
  meta: { name: "goatlint-plugin-example" },
  rules: { "no-foo": noFoo },
});
```

### Types only

```typescript
import type { Context, Rule, ESTree } from "@goatlint/plugins";

const rule: Rule = {
  create(context: Context) {
    return {
      Program(node: ESTree.Program) {
        // ...
      },
    };
  },
};
```

### ESLint compatibility

If your plugin uses the [`createOnce` API](https://goatlint.dev/docs/guide/usage/linter/js-plugins#alternative-api), wrap it with `eslintCompatPlugin` to make it work with ESLint too:

```typescript
import { eslintCompatPlugin } from "@goatlint/plugins";

export default eslintCompatPlugin({
  meta: { name: "goatlint-plugin-example" },
  rules: { "no-foo": noFooRule },
});
```

## Compatibility

- Node.js 12.22.0+, 14.17.0+, or 16.0.0+
- ESM and CommonJS entry points
- Works with any version of Goatlint and ESLint 8+

## Links

- [JS Plugins Documentation](https://goatlint.dev/docs/guide/usage/linter/js-plugins)
- [GitHub](https://github.com/goat-project/oxc)

## License

[MIT](https://github.com/goat-project/oxc/blob/main/LICENSE)
