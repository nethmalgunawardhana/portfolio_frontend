// https://nuxt.com/docs/api/configuration/nuxt-config
// nuxt.config.{js,ts}
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-08-07',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/seo'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      webFormsApiKey: process.env.NUXT_PUBLIC_WEB_FORMS_API_KEY
    }
   
  },

  // Global SEO configuration
  app: {
    head: {
      title: 'Nethmal Gunawardhana - Full Stack Developer Portfolio',
      titleTemplate: '%s | Nethmal Gunawardhana',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Full Stack Developer specializing in modern web technologies. Explore my portfolio showcasing projects in React, Vue.js, Node.js, and more.' },
        { name: 'keywords', content: 'Full Stack Developer, Web Developer, React, Vue.js, Node.js, JavaScript, TypeScript, Portfolio, Nethmal Gunawardhana' },
        { name: 'author', content: 'Nethmal Gunawardhana' },
        { name: 'robots', content: 'index, follow' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://nethmalgunawardhana.vercel.app/' },
        { property: 'og:title', content: 'Nethmal Gunawardhana - Full Stack Developer Portfolio' },
        { property: 'og:description', content: 'Full Stack Developer specializing in modern web technologies. Explore my portfolio showcasing projects in React, Vue.js, Node.js, and more.' },
        { property: 'og:image', content: 'https://nethmalgunawardhana.vercel.app/profile.png' },
        { property: 'og:site_name', content: 'Nethmal Gunawardhana Portfolio' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://nethmalgunawardhana.vercel.app/' },
        { name: 'twitter:title', content: 'Nethmal Gunawardhana - Full Stack Developer Portfolio' },
        { name: 'twitter:description', content: 'Full Stack Developer specializing in modern web technologies. Explore my portfolio showcasing projects in React, Vue.js, Node.js, and more.' },
        { name: 'twitter:image', content: 'https://nethmalgunawardhana.vercel.app/profile.png' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
        { rel: 'canonical', href: 'https://nethmalgunawardhana.vercel.app/' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // SEO configuration
  site: {
    url: 'https://nethmalgunawardhana.vercel.app',
    name: 'Nethmal Gunawardhana Portfolio',
    description: 'Full Stack Developer specializing in modern web technologies. Explore my portfolio showcasing projects in React, Vue.js, Node.js, and more.',
    defaultLocale: 'en'
  },

  nitro: {
    experimental: {
      wasm: true
    },
    prerender: {
      routes: ['/sitemap.xml']
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