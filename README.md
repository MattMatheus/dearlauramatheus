# Private MySpace-Inspired Valentine Site

Next.js App Router + TypeScript app with Tailwind + shadcn-style UI, Prisma + Postgres (Neon), and simple private auth using a shared password.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn-style reusable UI components
- Prisma + Postgres (Neon)
- Server Actions for admin CRUD

## Features

- Entire site is private behind shared-password login
- Cookie-based auth using signed session value (HMAC SHA-256)
- Public routes: `/login`, `/api/login`
- Protected routes: everything else (`/`, `/posts`, `/posts/[id]`, `/admin`, `/logout`)
- Profile page with MySpace-style sections and widgets
- Published posts listing and detail pages
- Admin CRUD for posts and profile sections

## Required Environment Variables

Create `.env` (or `.env.local`) from `.env.example`:

- `DATABASE_URL`: Neon/Postgres connection string
- `SITE_PASSWORD`: shared password for login
- `SESSION_SECRET`: secret used to derive signed session token

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Run migrations:

```bash
npm run prisma:migrate -- --name init
```

4. Seed starter data:

```bash
npm run prisma:seed
```

5. Start dev server:

```bash
npm run dev
```

Open `http://localhost:3000/login` and sign in with `SITE_PASSWORD`.

## Auth Design

- `POST /api/login` compares submitted password with `process.env.SITE_PASSWORD`
- If valid, server sets cookie `valentine_session`
- Cookie value is stable derivation:
  - `HMAC_SHA256(SESSION_SECRET, SITE_PASSWORD)`
- Middleware recomputes that value and compares against cookie with timing-safe comparison
- Cookie flags:
  - `httpOnly: true`
  - `sameSite: "lax"`
  - `secure: true` in production
- `GET /logout` clears cookie and redirects to `/login`

## Deploy (Vercel + Neon)

1. Push repo to GitHub.
2. Create Neon Postgres project, copy pooled connection string to `DATABASE_URL`.
3. In Vercel project settings, set env vars:
   - `DATABASE_URL`
   - `SITE_PASSWORD`
   - `SESSION_SECRET`
4. Configure Build Command:

```bash
npm run build:vercel
```

5. (Optional) Seed production once if needed:

```bash
npm run prisma:seed
```

`build:vercel` runs `prisma db push` and `prisma db seed` before `next build`, so schema and baseline data stay in sync on deploy.

## Milestone Mapping

- M1 complete: scaffold, auth middleware/session, seed data, `/` and `/posts`
- M2 complete: admin CRUD for posts with Server Actions
- M3 complete: admin editor for `ProfileSection` with Server Actions
