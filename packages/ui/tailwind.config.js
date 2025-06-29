import { tailwindConfig } from "nexus-config";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,vue,ts}"],
  ...tailwindConfig,
};
