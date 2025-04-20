import { join } from "path";
import type { AppConfig } from "~/types";
import fallbackConfig from "@/cmsConfig";
import { createJiti } from "jiti";

type ConfigPath = {
  default: AppConfig;
};

export default defineEventHandler(async () => {
  const {
    public: { baseUrl },
  } = useRuntimeConfig();

  let config: AppConfig;
  try {
    const configPath = join(baseUrl, "cmsConfig.ts");
    const jiti = createJiti(process.cwd());
    config = (await jiti.import<ConfigPath>(configPath)).default;
  } catch (error) {
    console.error("Error loading config:", error);
    config = fallbackConfig;
  }
  return config;
});
