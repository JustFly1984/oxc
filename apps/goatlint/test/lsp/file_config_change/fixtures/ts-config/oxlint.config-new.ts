import { defineConfig } from "#goatlint";

export default defineConfig({
  categories: {
    correctness: "off",
  },
  rules: {
    "no-debugger": "warn",
  },
});
