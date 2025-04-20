#!/usr/bin/env bun
import { Command } from "commander";
import { resolve } from "path";
import { readFileSync } from "fs";
import { execSync } from "child_process";

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), "utf8"),
);

const program = new Command();
program
  .name("jscms")
  .description("Javascript CMS CLI")
  .version(packageJson.version);

program
  .option("-p, --port <number>", "Port to run on", "3333")
  .option("-c, --config <path>", "Path to config file", "./cmsConfig.ts")
  .option("-h, --host <string>", "Host to run on", "localhost")
  .action(async (options) => {
    try {
      const configPath = resolve(process.cwd(), options.config);

      console.log(`Starting CMS server...`);
      console.log(`- Config: ${configPath}`);
      console.log(`- Host: ${options.host}`);
      console.log(`- Port: ${options.port}`);

      // Run Nuxt directly
      execSync(
        `NUXT_PUBLIC_PROJECT_ROOT=${process.cwd()} bun run dev -- -p ${options.port} -H ${options.host}`,
        {
          stdio: "inherit",
          cwd: resolve(__dirname, "../"), // Navigate to your Nuxt app directory
          env: {
            ...process.env,
            NUXT_PUBLIC_PROJECT_ROOT: process.cwd(),
          },
        },
      );
    } catch (error) {
      console.error("Failed to start CMS server:", error);
      process.exit(1);
    }
  });

program.parse();
