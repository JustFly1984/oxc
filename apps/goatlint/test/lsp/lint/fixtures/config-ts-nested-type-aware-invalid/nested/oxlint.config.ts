import { defineConfig } from "#goatlint";

export default defineConfig({
  options: {
    typeAware: true,
  },
  rules: {
    "typescript/no-floating-promises": "error",
  },
});
