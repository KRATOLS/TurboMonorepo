// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  pages: true,
  extends: [
    '../../packages/ui-layer'  // Подключаем общий UI-слой
  ],
  runtimeConfig: {
    public: {
      disabledPages: ''
    }
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
    }
  },
  modules: ['@peterbud/nuxt-query'],
  nuxtQuery: {
    autoImports: ['useQuery', 'useMutation'],
    devtools: true,
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
  }
})
