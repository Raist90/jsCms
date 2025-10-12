// @ts-check
// @ts-ignore
import tailwind from "eslint-plugin-tailwindcss";
import { eslintConfig } from "nexus-config";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  ...tailwind.configs["flat/recommended"],
  ...eslintConfig,
  {
    files: ["**/*.{ts,vue}"],
    rules: {
      "vue/attribute-hyphenation": ["error", "never"],
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
