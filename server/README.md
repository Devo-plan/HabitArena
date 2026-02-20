# Server

NestJS backend for HabitArena. Runs on Vercel as serverless functions.

## Getting started

Install dependencies from the project root, then edit `server/.env` with your MongoDB URI, JWT secrets, and optionally `SENTRY_DSN` for error tracking. Run `npm run dev --workspace=server` for local development.

## Structure

- `api/index.ts` - Vercel serverless entry; bootstraps NestJS and forwards requests
- `src/main.ts` - Local dev entry
- `src/app.module.ts` - Root module (Config, MongoDB)
- `src/modules/` - Feature modules (auth, users, rooms, etc.)
- `src/common/` - Guards, pipes, filters

API base path is `/api/v1`.
Do not use `any` type (ESLint: `@typescript-eslint/no-explicit-any`).
