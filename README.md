# Code Doctor

Code Doctor is an evidence-led engineering health platform. Phase 1 contains the product foundation and presentational report experience only; it does not connect to, clone, scan, execute, upload, or otherwise process repositories.

## Prerequisites

- Node.js 22 or newer
- pnpm 11 or newer
- PostgreSQL 16 or newer

## Local setup

1. Copy `.env.example` to `.env` and provide a PostgreSQL URL, an Auth.js secret of at least 32 characters, and GitHub OAuth credentials.
2. Install packages with `pnpm install`.
3. Generate Prisma Client with `pnpm db:generate`.
4. Create the development migration with `pnpm db:migrate:dev -- --name init`.
5. Start the application with `pnpm dev`.

## Commands

- `pnpm dev` — start all development tasks
- `pnpm build` — production build
- `pnpm lint` — run ESLint
- `pnpm format` / `pnpm format:check` — format/check source
- `pnpm typecheck` — strict TypeScript validation
- `pnpm test` — run unit tests
- `pnpm db:validate` — validate the Prisma schema

## Security boundary

The Phase 1 application does not request repository access. Future analysis must run in isolated workers with strict resource limits, must not execute untrusted source code, and must redact secrets from findings, logs, and AI context.
