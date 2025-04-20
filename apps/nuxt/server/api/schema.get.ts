import { join } from "path";
import type { AppConfig } from "~/types";
import fallbackConfig from "@/cmsConfig";
import { createJiti } from "jiti";

export default defineEventHandler(async () => {
  let config: AppConfig;
  try {
    const configPath = join(
      String(process.env.NUXT_PUBLIC_PROJECT_ROOT),
      "cmsConfig.ts",
    );
    const jiti = createJiti(process.cwd());
    config = ((await jiti.import(configPath)) as any).default;
  } catch (error) {
    console.error("Error loading config:", error);
    config = fallbackConfig;
  }
  return config;
});
