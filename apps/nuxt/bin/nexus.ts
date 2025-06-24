#!/usr/bin/env bun
import { Command } from "commander";
import { resolve } from "path";
import { readFileSync } from "fs";
import { execSync } from "child_process";
import type { AppConfig } from "~/types";

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), "utf8"),
);

const program = new Command();
program.name("nexus").description("NexusCMS CLI").version(packageJson.version);

program
  .option("-p, --port <number>", "Port to run on", "3333")
  .option("-c, --config <path>", "Path to config file", "./cmsConfig.ts")
  .option("-h, --host <string>", "Host to run on", "localhost")
  .action(async (options) => {
    try {
      const configPath = resolve(process.cwd(), options.config);
      const userConfig: { default: AppConfig } = await import(configPath);

      console.log(`Starting CMS server...`);
      console.log(`- Config: ${configPath}`);
      console.log(`- Host: ${options.host}`);
      console.log(`- Port: ${options.port}`);
      console.log(`- DB Path: ${userConfig.default.absoluteDBPath}`);

      // Run Nuxt directly
      execSync(
        `bun drizzle-kit push && bun run dev -- -p ${options.port} -H ${options.host}`,
        {
          stdio: "inherit",
          cwd: resolve(__dirname, "../"), // Navigate to your Nuxt app directory
          env: {
            ...process.env,
            NUXT_PUBLIC_PROJECT_ROOT: process.cwd(),
            DB_FILE_NAME: `file:${process.cwd()}/${userConfig.default.absoluteDBPath}`,
          },
        },
      );
    } catch (error) {
      console.error("Failed to start CMS server:", error);
      process.exit(1);
    }
  });

program.parse();
