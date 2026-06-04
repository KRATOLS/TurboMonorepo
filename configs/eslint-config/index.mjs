import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

const baseConfig = createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: true,
  },
})

// Добавляем кастомные правила
const customRules = {
  '@typescript-eslint/no-explicit-any': 'warn',
}

// Применяем кастомные правила к конфигурации
const finalConfig = baseConfig.append({
  rules: customRules,
})

// 1. Базовая конфигурация для обычных пакетов (shared, ui-layer)
export const standaloneConfig = finalConfig

// 2. Конфигурация для Nuxt-приложений
export const nuxtConfig = () => {
  return (withNuxt) => {
    return withNuxt(standaloneConfig)
  }
}

// Экспорт по умолчанию
export default standaloneConfig
