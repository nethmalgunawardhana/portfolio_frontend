// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.{js,ts}
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }
      ]
    }
  }
})