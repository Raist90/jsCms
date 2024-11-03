// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  components: false,
  devtools: { enabled: false },
  modules: [
    "nuxt-lucide-icons",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
  ],
  fonts: {
    defaults: {
      weights: [400],
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
});

