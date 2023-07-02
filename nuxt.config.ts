// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '@': resolve(__dirname, '/'),
  },
  css: ['@/assets/main.scss'],
  modules: ['@nuxtjs/tailwindcss'],
  postcss: {
    postcssOptions: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    // Keys within public, will be also exposed to the client-side
    jwtRefreshSecret: process.env.JWT_REFRESH_ACCESS_TOKEN_SECRET,
  },
})
