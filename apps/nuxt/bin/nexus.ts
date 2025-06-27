#!/usr/bin/env bun
import { execSync } from "child_process";
import { Command } from "commander";
import { readFileSync } from "fs";
import { resolve } from "path";

import type { AppConfig } from "~/types";

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), "utf8"),
);

const program = new Command();
program.name("nexus").description("NexusCMS CLI").version(packageJson.version);

program
  .option("-p, --port <number>", "Port to run on", "3000")
  .option("-c, --config <path>", "Path to config file", "./cmsConfig.ts")
  .option("-h, --host <string>", "Host to run on", "localhost")
  .description("Starting the NexusCMS server...")
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

program
  .command("studio")
  .option("-p, --port <number>", "Port to run on", "3333")
  .option("-c, --config <path>", "path to config file", "./cmsConfig.ts")
  .description("Open drizzle studio for database management")
  .action(async (options) => {
    try {
      const configpath = resolve(process.cwd(), options.config);
      const userConfig: { default: AppConfig } = await import(configpath);

      console.log(`starting drizzle studio...`);
      console.log(`- config: ${configpath}`);
      console.log(`- db path: ${userConfig.default.absoluteDBPath}`);

      execSync(`bun drizzle-kit studio`, {
        stdio: "inherit",
        cwd: resolve(__dirname, "../"),
        env: {
          ...process.env,
          NUXT_PUBLIC_PROJECT_ROOT: process.cwd(),
          DB_FILE_NAME: `file:${process.cwd()}/${userConfig.default.absoluteDBPath}`,
        },
      });
    } catch (error) {
      console.error("Failed to start drizzle studio:", error);
      process.exit(1);
    }
  });

program.parse();
