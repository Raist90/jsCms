declare module "jscms-config" {
  import type { Linter } from "eslint";
  import type { Config as TailwindConfig } from "tailwindcss";

  export const eslintConfig: Linter.Config[];
  export const tailwindConfig: TailwindConfig;
}
