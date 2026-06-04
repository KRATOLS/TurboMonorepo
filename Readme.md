# Пример организации монорепозитория

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

Также для того, чтобы пакет можно было подключить, необходимо указать **name** 
в package.json пакета.

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

