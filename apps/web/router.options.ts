import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  // Базовый путь для Vue Router
  base: process.env.NUXT_APP_BASE_URL || '/',
}
