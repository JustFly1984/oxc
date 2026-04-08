import { join } from "node:path";
import { tmpdir } from "node:os";
import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { runCli } from "../utils";

describe("--init", () => {
  it("should create .goatfmtrc.json", async () => {
    const tempDir = await fs.mkdtemp(join(tmpdir(), "goatfmt-init-test"));

    try {
      const result = await runCli(tempDir, ["--init"]);
      expect(result.exitCode).toBe(0);

      const content = await fs.readFile(join(tempDir, ".goatfmtrc.json"), "utf8");
      const goatfmtrc = JSON.parse(content);

      expect(goatfmtrc.ignorePatterns).toEqual([]);
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  it("should add $schema when node_modules/goatfmt exists", async () => {
    const tempDir = await fs.mkdtemp(join(tmpdir(), "goatfmt-init-test"));
    try {
      // Create fake node_modules/goatfmt/configuration_schema.json
      const schemaDir = join(tempDir, "node_modules", "goatfmt");
      await fs.mkdir(schemaDir, { recursive: true });
      await fs.writeFile(join(schemaDir, "configuration_schema.json"), "{}");

      const result = await runCli(tempDir, ["--init"]);
      expect(result.exitCode).toBe(0);

      const content = await fs.readFile(join(tempDir, ".goatfmtrc.json"), "utf8");
      const goatfmtrc = JSON.parse(content);

      expect(goatfmtrc.$schema).toBe("./node_modules/goatfmt/configuration_schema.json");
      expect(Object.keys(goatfmtrc)[0]).toBe("$schema"); // $schema should be first
      expect(goatfmtrc.ignorePatterns).toEqual([]);
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  it("should abort if .goatfmtrc.json already exists", async () => {
    const tempDir = await fs.mkdtemp(join(tmpdir(), "goatfmt-init-test"));
    try {
      // Create existing config file
      await fs.writeFile(join(tempDir, ".goatfmtrc.json"), "{}");

      const result = await runCli(tempDir, ["--init"]);
      expect(result.exitCode).toBe(1);
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });
});
