# Описание монорепозитория

## 1. Структура:

Данный тестовый монорепозиторий сформирован на базе технологий turborepo и pnpm и
имеет следующую структуру:

```
my-nuxt-monorepo/
├── apps/                          # Приложения
│   ├── admin/                     # Админ-панель (Nuxt app)
│   └── web/                       # Основное веб-приложение (Nuxt app)
├── configs/                       # Конфигурации проекта
│   ├── eslint-config/             # Пакет ESLint конфигураций
│   └── eslint.config.mjs          # Общая конфигурация ESLint
├── packages/                      # Общие пакеты
│   ├── shared/                    # Общие утилиты и типы
│   └── ui-layer/                  # UI-компоненты (общая библиотека)
├── package.json                   # Корневой package.json
├── pnpm-lock.yaml                 # Lock-файл pnpm
├── pnpm-workspace.yaml            # Конфигурация workspace pnpm
├── turbo.json                     # Конфигурация Turborepo
├── .gitignore                     # Правила игнорирования Git
└── Readme.md                      # Документация
```

Подробнее о каждом каталоге

### 1.1 apps 

Содержит приложения на базе Nuxt фреймворка. В целом здесь могут располагаться
приложения любого стека.

### 1.2 configs 

Содержит конфиги под разные нужды, используемые в любой части приложения.
В данном примере пакет шарит eslint конфиг под Nuxt и standalone apps.

### 1.3 packages

Содержит пакеты, импортируемые приложениями (или между собой).
Данный каталог поделен на **shared** - утилиты и типы, и **ui-layer** - vue компоненты.

## 2. Работа с пакетами

Каждый модуль имеет свой package.json в котором обозначены 
все инсталлируемые пакеты как внешние, так и внутренние из репозитория.

### 2.1 Добавление локального пакета

При добавлении нового пакета в packages необходимо зарегистрировать его
в **pnpm-workspace.yaml**

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "configs/*"
  - "new/*"
```

Также для того, чтобы пакет можно было подключить, необходимо указать его **name** 
в package.json.

```json5
{
  "name": "@repo/shared", /* Имя пакета */
  "version": "1.0.0",
  "private": true,
  "type": "module", /* Обязательно ставим type = module */
  "exports": {
    "./utils": "./utils/index.ts",
    "./types": "./types/index.ts"
  },
  "scripts": {
    "lint": "eslint . --ext .ts,.js --max-warnings 50",
    "lint:fix": "eslint . --ext .ts,.mjs --fix"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*"
  }
}

```

### 2.2 Подключение локального пакета

Для подключения пакета требуется прописать его в devDependencies в
package.json модуля, который его использует

```json
{
  "devDependencies": {
    "@repo/eslint-config": "workspace:*"
  }
}
```

При импорте vue компонентов в nuxt приложениях для удобства рекомендуется
подключать их в nuxt конфиге через свойство **extends**

```js
export default defineNuxtConfig({
  extends: [
    '../../packages/ui-layer'
    // Подключаем общий UI-слой
  ]
})
```

Для этого в пакете необходимо настроить резолвинг путей.
Проще всего это сделать через **createResolver** от модуля **@nuxt/kit**

```ts
import { createResolver } from '@nuxt/kit'
import { defineNuxtConfig } from 'nuxt/config'
import type { NuxtConfig } from 'nuxt/config'

const { resolve } = createResolver(import.meta.url)

const config: NuxtConfig = {
  compatibilityDate: '2025-05-28',
  css: [resolve('./assets/style.css')],
  components: [
    { path: resolve('./components'), pathPrefix: false },
  ],
  imports: {
    dirs: [resolve('./composables')],
  },
}

export default defineNuxtConfig(config) as NuxtConfig
```

Подключая пакет таким образом в nuxt приложениях компоненты буду импортироваться
автоматически в каждом месте, где они используются, даже не смотря на то, что они 
находятся за пределами каталога приложения

## 3. Turborepo

Для управления монорепозиторием используются задачи turborepo, описанные в **turbo.json**

На данный момент зарегистрированы следующие задачи:

- lint - запуск проверки eslint правил
- lint:fix - запуск скрипта решения eslint ошибок\предупреждений
- dev - запуск дев билда
- build - запуск продакшни билда
- preview - запуск превью 

Для того, чтобы задача выполнялась в необходимом модуле, необходимо 
добавить ее в соответствующий package.json данного модуля 

````json5
{
  "name": "web",
  "type": "module",
  "private": true,
  "scripts": {
    "lint": "eslint . --ext .ts,.js --max-warnings 50" /* Вызывается turbo */,
    "lint:fix": "eslint . --ext .ts,.mjs --fix",
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  }
}
````

Для того чтобы выполнить задачу в конкретном модуле необходимо запустить ее
с параметром --filter

````code
pnpm dev --filter=web
````

Таким образом, будет запущена дев сборка nuxt приложения **web**

## 4. Динамический импорт

### 4.1 Импорт страниц
В nuxt приложениях реализована возможность динамического импорта страниц.
Для этого необходимо прописань в env **NUXT_PUBLIC_DISABLED_PAGES** названия страниц (компонентов) через запятую

````code
NUXT_PUBLIC_DISABLED_PAGES=users
````

При запуске билда с таким значением, env страница **users** будет исключена из итогового бандла.
Также, благодаря тому, что переменная прокинута в **runtimeConfig** можно, например, исключить ссылку
на данную страницу из главного меню или ридеректить на главную при попытке перехода на нее.

### 4.2 Импорт компонентов

Для динамического импорта клиентских компонентов достаточно именовать их с приставкой **lazy**
Подробнее: https://nuxt-ru.vercel.app/docs/4.x/directory-structure/app/components#dynamic-imports

## 5. Каталог

При использовании внешних пакетов в монорепозитории возникает проблема, когда один
и тот же пакет используется сразу несколькими модулями. Приходится следить за версиями
этих пакетов и обновлять в каждом модуле. Эту проблему решают pnpm-каталоги. 

Для объявления каталога достаточно прописать его в **pnpm-workspace.yaml**

````yaml
catalog:
  nuxt: ^4.4.6
  vue-router: ^5.0.7
  '@nuxt/eslint': 1.15.2
  vue: ^3.5.35
````

В package.json модуля при этом необходимо поменять версию на **catalog**
у нужных пакетов

````json
{
  "dependencies": {
    "@nuxt/kit": "^4.4.7",
    "nuxt": "catalog:",
    "vue": "catalog:"
  }
}
````

Это действия можно проделать вручную, или воспользоваться утилитой **workspace-update**,
выполнив команду:

````code
workspace-updater dupes --resolve-latest -y
````

скрипт найдет все дублирующие зависимости и автоматически занесет их в каталог, сделав изменения
во всех package.json 

