// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-16",
  components: false,
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },
  modules: [
    "nuxt-lucide-icons",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/test-utils/module",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "jscms-ui/nuxt",
  ],
  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ["normal", "italic"],
      subsets: [
        "cyrillic-ext",
        "cyrillic",
        "greek-ext",
        "greek",
        "vietnamese",
        "latin-ext",
        "latin",
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_PROJECT_ROOT || "",
    },
  },
  typescript: {
    typeCheck: true,
  },
});
