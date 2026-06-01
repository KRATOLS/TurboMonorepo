// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: [
    '../../packages/ui-layer'  // Подключаем общий UI-слой
  ],
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
