# AGENTS.md

React 19 + TypeScript + Rsbuild 2 шаблон. Точка входа: `src/index.tsx` → `src/App.tsx`.
Тестов и CI нет. Пакетный менеджер — npm.

## Команды

- `npm run dev` — dev-сервер на **порту 3001** (`DEV_PORT` в `.env.development`; дефолт в конфиге 3000).
- `npm run build` / `npm run preview` — продакшен-сборка / предпросмотр (порт 3000).
- `npm run lint` — ESLint (flat config `eslint.config.js`).
- `npm run format` — Prettier **без аргументов**; всегда передавай паттерны явно, напр. `npx prettier --write .`.
- **Скрипта typecheck нет** — используй `npx tsc` (в tsconfig стоит `noEmit`).

## Стиль и проверки

- Prettier: одинарные кавычки, точки с запятой, отступ 2, printWidth 100 (`.prettierrc`).
- ESLint: react recommended (`prop-types` off) + react-hooks, `prettier` — последним.
- После правок: `npm run lint`.
