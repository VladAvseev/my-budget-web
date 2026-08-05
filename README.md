# Мой бюджет

Фронтенд-приложение для учёта личного бюджета. React 19 + TypeScript + Rsbuild.

## Стек

- **Runtime:** React 19
- **Сборщик:** Rsbuild (на основе Rspack)
- **Язык:** TypeScript (strict mode)
- **Линтер:** ESLint 9 (flat config)
- **Форматтер:** Prettier
- **HTTP-клиент:** Axios

## Быстрый старт

```bash
npm install
npm run dev
```

Dev-сервер запустится на порту из переменной `DEV_PORT` (по умолчанию 3000).

## Команды

| Команда | Описание |
| --- | --- |
| `npm run dev` | Запуск dev-сервера с HMR |
| `npm run build` | Production-сборка в `dist/` |
| `npm run preview` | Просмотр production-сборки локально |
| `npm run lint` | Проверка кода линтером ESLint |
| `npm run typecheck` | Проверка типов через `tsc --noEmit` |
| `npm run format` | Форматирование всего проекта через Prettier |

## Переменные окружения

| Переменная | Описание | По умолчанию |
| --- | --- | --- |
| `APP_TITLE` | Заголовок страницы (title) | `Мой бюджет` |
| `DEV_PORT` | Порт dev-сервера | `3000` |
| `API_BASE_URL` | Базовый URL API (baseURL axios-клиента) | — |

## Структура

```
src/
├── App.tsx                  # Корневой компонент
├── index.tsx                # Точка входа (createRoot + StrictMode + ThemeProvider)
└── shared/
    ├── api/                 # axios client, apiGet, apiPost
    ├── styles/              # Дизайн-токены: common/light/dark, useStyles
    └── theme/               # ThemeProvider, useTheme, useThemeStyles, storage
```

## Конвенции

- Импорты только через алиас `@/*` → `src/*`.
- Стилизация через `useThemeStyles()` из `@/shared/theme` и дизайн-токены.
- Работа с API только через `apiGet`/`apiPost` из `@/shared/api`.
- Подробнее — в `AGENTS.md`.
