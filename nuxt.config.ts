// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.{js,ts}
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-08-07',
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      webFormsApiKey: process.env.NUXT_PUBLIC_WEB_FORMS_API_KEY
    }
   
  },

  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }
      ]
    }
  },

  nitro: {
    experimental: {
      wasm: true
    }
  },

  vite: {
    define: {
      global: 'globalThis',
    },
    resolve: {
      alias: {
        'form-data': '~/utils/form-data-polyfill.js'
      }
    },
    optimizeDeps: {
      include: ['axios'],
      exclude: ['form-data']
    }
  },

  ssr: true
 
})