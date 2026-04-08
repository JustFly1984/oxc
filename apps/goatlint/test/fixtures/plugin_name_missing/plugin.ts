import type { Plugin } from "#goatlint/plugins";

const plugin: Plugin = {
  // No name defined
  rules: {
    rule: {
      create(context) {
        return {
          Program(node) {
            context.report({
              message: `filename: ${context.filename}`,
              node,
            });
          },
        };
      },
    },
  },
};

export default plugin;
