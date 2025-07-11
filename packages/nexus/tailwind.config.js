import { tailwindConfig } from "nexus-config";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "../../packages/ui/src/**/*.vue",
  ],
  ...tailwindConfig,
};
