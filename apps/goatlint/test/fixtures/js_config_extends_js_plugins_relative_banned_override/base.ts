import { defineConfig } from "#goatlint";

export default defineConfig({
  overrides: [
    {
      files: ["files/**/*.js"],
      jsPlugins: ["./plugin.ts"],
    },
  ],
});
