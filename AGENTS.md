# AGENTS.md

## О проекте

Фронтенд-приложение для учёта личного бюджета. Разрабатывается на основе React 19 + TypeScript + Rsbuild. Исходный код — русскоязычный (тексты UI, комментарии, сообщения об ошибках).

## Стек

- **Runtime:** React 19
- **Сборщик:** Rsbuild (на основе Rspack)
- **Язык:** TypeScript (strict mode)
- **Линтер:** ESLint 9 (flat config)
- **Форматтер:** Prettier
- **HTTP-клиент:** Axios
- **Окружение:** Node.js с ES-модулями (`"type": "module"`)

## Структура проекта

```
public/
├── favicon.svg              # Фавиконка проекта
└── index.html               # HTML-шаблон с точкой монтирования #root
src/
├── App.tsx                  # Корневой компонент
├── App.css                  # Глобальные стили
├── TestLayout.tsx           # Демо-компонент темы (временный)
├── index.tsx                # Точка входа (createRoot + StrictMode + ThemeProvider)
└── shared/
    ├── api/                 # axios client (client.ts), apiGet, apiPost, index.ts
    ├── styles/              # Дизайн-токены: common/light/dark, useStyles
    └── theme/               # ThemeProvider, useTheme, useThemeStyles, storage
.env                         # Общие переменные окружения (коммитится)
.env.d.ts                    # Типы для Rsbuild env-переменных
.gitignore                   # node_modules, dist
.prettierrc                  # Конфигурация Prettier (singleQuote, semi, tabWidth: 2)
.prettierignore              # Исключения для форматирования
eslint.config.js             # Конфигурация ESLint (flat config, плагины React + TS)
package.json                 # Скрипты, зависимости, type: "module"
rsbuild.config.ts            # Конфигурация Rsbuild (плагины, алиасы, порты, сборка)
tsconfig.json                # Строгая конфигурация TypeScript
```

## Ключевые конвенции

- **Импорты:** только через алиас `@/*` → `src/*` (например, `@/shared/theme`, `@/TestLayout`).
- **Стилизация:** использовать `useThemeStyles()` из `@/shared/theme` и дизайн-токены (`styles.colors`, `styles.spacing`, `styles.radius`, `styles.shadow`, `styles.typography`). Не хардкодить цвета, отступы и размеры в компонентах.
- **Тема:** приложение обёрнуто в `ThemeProvider` на верхнем уровне (`index.tsx`). Тема переключается через `useTheme().setTheme('light' | 'dark')`, выбор сохраняется в localStorage.
- **Работа с API:** только через `apiGet`/`apiPost` из `@/shared/api` (общий axios-клиент с `API_BASE_URL` и таймаутом). Поддерживается передача `signal` для отмены запросов.
- **Компоненты:** функциональные, без классов. `react/prop-types` отключён — типы пропсов описываются через TypeScript.

## Переменные окружения

| Переменная | Описание | По умолчанию |
| --- | --- | --- |
| `APP_TITLE` | Заголовок страницы (title) | `React rsbuild base` |
| `DEV_PORT` | Порт dev-сервера | `3000` |
| `API_BASE_URL` | Базовый URL API (baseURL axios-клиента) | — |

## Команды

| Команда | Описание |
| --- | --- |
| `npm run dev` | Запуск dev-сервера с HMR |
| `npm run build` | Production-сборка в `dist/` |
| `npm run preview` | Просмотр production-сборки локально |
| `npm run lint` | Проверка кода линтером ESLint (только вывод ошибок) |
| `npm run format` | Форматирование всего проекта через Prettier |

Примечание: отдельной команды проверки типов (`tsc --noEmit`) и тестов в проекте нет.
