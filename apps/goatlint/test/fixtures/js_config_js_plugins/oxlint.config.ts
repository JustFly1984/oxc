import { defineConfig } from "#goatlint";

export default defineConfig({
  categories: {
    correctness: "off",
  },
  jsPlugins: ["./plugin.ts"],
  rules: {
    "basic-custom-plugin/no-debugger": "error",
  },
});
