import { defineConfig } from "#goatlint";

const options = {
  denyWarnings: true,
};

export default defineConfig({
  categories: { correctness: "off" },
  rules: {
    "no-debugger": "warn",
  },
  options,
});
