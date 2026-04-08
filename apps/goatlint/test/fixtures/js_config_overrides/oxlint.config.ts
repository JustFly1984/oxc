// Test that overrides work in goatlint.config.ts
import { defineConfig } from "#goatlint";

export default defineConfig({
  rules: {
    "no-debugger": "off",
  },
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "no-debugger": "error",
      },
    },
  ],
});
