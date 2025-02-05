import { tailwindConfig } from "jscms-config";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,vue,ts}"],
  ...tailwindConfig,
};
