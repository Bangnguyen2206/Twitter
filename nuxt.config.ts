// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  css: ["@/assets/main.scss"],
  modules: ["@nuxtjs/tailwindcss"],
  postcss: {
    postcssOptions: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
});
