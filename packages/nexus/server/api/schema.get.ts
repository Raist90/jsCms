import { createJiti } from "jiti";
import { join } from "path";

import fallbackConfig from "@/cmsConfig";
import type { AppConfig } from "~/types";

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
    // TODO: This is almost useless as it will not work with Vite's HMR
    const jiti = createJiti(process.cwd(), {
      fsCache: false,
      moduleCache: false,
    });
    config = (await jiti.import<ConfigPath>(configPath)).default;
  } catch (error) {
    console.error("Error loading config:", error);
    config = fallbackConfig;
  }
  return config;
});
