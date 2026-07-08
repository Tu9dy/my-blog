export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/content',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  app: {
    head: {
      title: 'Studio — Developer Portfolio',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A developer\'s journal on frontend engineering, system design, and creative coding.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,100..900,0..100;1,9..144,100..900,0..100&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap', rel: 'stylesheet' },
      ],
    },
  },

  colorMode: {
    classSuffix: '',
    defaultMode: 'dark',
    preference: 'dark',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-dark',
            dark: 'github-dark',
            light: 'github-light',
          },
        },
      },
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/projects': { prerender: true },
  },

  compatibilityDate: '2025-01-01',
})
