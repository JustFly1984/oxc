// Basic test for goatlint.config.ts support
import { defineConfig } from "#goatlint";

export default defineConfig({
  rules: {
    "typescript/no-floating-promises": "error",
  },
  categories: { correctness: "off" },
  options: {
    typeAware: true,
  },
});
