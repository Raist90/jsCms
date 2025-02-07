declare module "jscms-config" {
  import type { Linter } from "eslint";
  import type { Config as TailwindConfig } from "tailwindcss";
  import type { Config as PrettierConfig } from "prettier";

  export const eslintConfig: Linter.Config[];
  export const tailwindConfig: TailwindConfig;
  export const prettierConfig: PrettierConfig;
}
