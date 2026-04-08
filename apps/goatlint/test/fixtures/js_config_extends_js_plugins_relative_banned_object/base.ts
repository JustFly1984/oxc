import { defineConfig } from "#goatlint";

export default defineConfig({
  jsPlugins: [{ name: "basic-custom-plugin-js", specifier: "./plugin.ts" }],
});
