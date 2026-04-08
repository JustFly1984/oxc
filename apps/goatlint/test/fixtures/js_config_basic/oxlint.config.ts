// Basic test for goatlint.config.ts support
import { defineConfig } from "#goatlint";

export default defineConfig({
  rules: {
    "no-debugger": "error",
    eqeqeq: "warn",
  },
});
