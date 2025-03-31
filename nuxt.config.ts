// https://nuxt.com/docs/api/configuration/nuxt-config
import {VueQueryPlugin} from "@tanstack/vue-query";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  telemetry: false
})
