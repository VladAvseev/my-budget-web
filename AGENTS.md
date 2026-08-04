# AGENTS.md

React 19 + TypeScript + Rsbuild 2 шаблон. Точка входа: `src/index.tsx`.
Тестов и CI нет. Пакетный менеджер — npm. Комментарии и строки UI — на русском.

## Команды

- `npm run dev` — dev-сервер на **порту 3001** (`DEV_PORT` в `.env`; дефолт в `rsbuild.config.ts` — 3000). `.env` закоммичен.
- `npm run build` / `npm run preview` — продакшен-сборка / предпросмотр (порт 3000).
- `npm run lint` — ESLint (flat config `eslint.config.js`).
- `npm run format` — Prettier **без аргументов**; всегда передавай паттерны явно, напр. `npx prettier --write .`.
- **Скрипта typecheck нет** — используй `npx tsc` (в tsconfig стоит `noEmit`).

## Архитектура

- Импорты через алиас `@/*` → `src/*` (tsconfig `paths`; Rsbuild резолвит автоматически).
- `src/shared/api` — axios-клиент с `baseURL` из `process.env.API_BASE_URL` (в `.env` = `http://localhost:3002`) + обёртки `apiGet`/`apiPost`. Бэкенд запускается отдельно.
- `src/shared/styles` — дизайн-токены (`tokens.ts`) + темы light/dark; хук `useStyles(theme)` возвращает `commonStyles` + цвета темы.

## Стиль и проверки

- Prettier: одинарные кавычки, точки с запятой, отступ 2, printWidth 100 (`.prettierrc`).
- ESLint: react recommended (`prop-types` off) + react-hooks, `prettier` — последним.
- После правок: `npm run lint` + `npx tsc`.
