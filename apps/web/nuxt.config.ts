import { resolve } from 'node:path'

export default defineNuxtConfig({
  extends: [
    '../../packages/ui-layer', // Подключаем общий UI-слой
  ],
  modules: [
    '@peterbud/nuxt-query',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/hints',
    'nuxt-icons',
  ],
  ssr: false,
  pages: true,
  devtools: { enabled: true },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    buildAssetsDir: 'nuxt_assets',
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      disabledPages: '',
    },
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'github_pages',
  },
  typescript: {
    typeCheck: true,
  },
  hooks: {
    'pages:extend'(pages) {
      const disabledPages = (process.env.NUXT_PUBLIC_DISABLED_PAGES || '').split(',').filter(Boolean)

      // Удаляем страницы
      for (let i = pages.length - 1; i >= 0; i--) {
        if (disabledPages.some(disabled => pages[i]?.path.includes(disabled))) {
          console.log(`🚫 Страница "${pages[i]?.path}" исключена из сборки`)
          pages.splice(i, 1)
        }
      }
    },
  },
  nuxtQuery: {
    autoImports: ['useQuery', 'useMutation'],
    queryClientOptions: {
      defaultOptions: {
        queries: {
          // for example disable refetching on window focus
          refetchOnWindowFocus: false,

          // or change the default refetch interval
          refetchInterval: 5000,
        },
      },
    },
  },
  pinia: {
    storesDirs: [resolve(__dirname, 'app/stores/**')],
  },
})
