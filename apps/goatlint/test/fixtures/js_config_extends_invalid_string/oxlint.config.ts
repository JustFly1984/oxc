import { defineConfig } from "#goatlint";

export default defineConfig({
  // @ts-expect-error - we are testing invalid config
  extends: ["./base.ts"],
});
