import { defineConfig } from "#goatlint";

import base from "./base.ts";

export default defineConfig({
  extends: [base],
  rules: {
    "no-debugger": "error",
  },
});
