# Agent Handoff Notes

## Project Status
- App scaffolded as Next.js App Router + TypeScript + Tailwind.
- Implemented private shared-password auth across the site.
- Implemented Prisma models and seed script for posts/profile sections.
- Implemented pages:
  - `/login`
  - `/` (profile page)
  - `/posts`
  - `/posts/[id]`
  - `/admin`
  - `/logout`
- Implemented Server Actions for admin CRUD:
  - Create/update/delete posts
  - Update profile sections
- README and `.env.example` included.

## Milestone Mapping
- M1: complete (scaffold, auth middleware, seed model/data, `/` + `/posts`)
- M2: complete (admin CRUD for posts)
- M3: complete (admin editor for `ProfileSection`)

## Auth/Privacy Design (Important)
- Entire site is private except:
  - `/login`
  - `/api/login`
  - static assets
- Middleware enforces session cookie on all other routes.
- Session cookie name: `valentine_session`.
- Cookie settings:
  - `httpOnly: true`
  - `sameSite: "lax"`
  - `secure: process.env.NODE_ENV === "production"`
- Session value derivation:
  - HMAC-SHA256 equivalent using Web Crypto API
  - `HMAC(SESSION_SECRET, SITE_PASSWORD)`
- Middleware recomputes and timing-safe compares cookie value.

## Environment Variables
Required:
- `DATABASE_URL`
- `SITE_PASSWORD`
- `SESSION_SECRET`

See `.env.example`.

## Prisma/Data Model
- `Post`: `id`, `title`, `body`, `published`, `createdAt`, `updatedAt`
- `ProfileSection`: `id`, `key` (unique), `content`, `sortOrder`

Seed behavior:
- `ProfileSection` uses upsert by `key`.
- Posts are inserted only when post table is empty.

## Dynamic Rendering Note
- DB-backed routes are marked `export const dynamic = "force-dynamic"` to avoid build-time DB requirement in Next static prerender pass.

## Verification Completed
Commands run successfully:
- `npm install`
- `npm run prisma:generate`
- `npm run lint`
- `npm run build`

## Key Files
- Middleware/auth:
  - `/Users/foundry/Source/dearlauramatheus/middleware.ts`
  - `/Users/foundry/Source/dearlauramatheus/lib/auth.ts`
  - `/Users/foundry/Source/dearlauramatheus/app/api/login/route.ts`
  - `/Users/foundry/Source/dearlauramatheus/app/logout/route.ts`
- Prisma:
  - `/Users/foundry/Source/dearlauramatheus/prisma/schema.prisma`
  - `/Users/foundry/Source/dearlauramatheus/prisma/seed.ts`
  - `/Users/foundry/Source/dearlauramatheus/lib/prisma.ts`
- Pages/admin:
  - `/Users/foundry/Source/dearlauramatheus/app/page.tsx`
  - `/Users/foundry/Source/dearlauramatheus/app/posts/page.tsx`
  - `/Users/foundry/Source/dearlauramatheus/app/posts/[id]/page.tsx`
  - `/Users/foundry/Source/dearlauramatheus/app/login/page.tsx`
  - `/Users/foundry/Source/dearlauramatheus/app/admin/page.tsx`
  - `/Users/foundry/Source/dearlauramatheus/app/admin/actions.ts`

## Notes for Future Agents
- This workspace currently has no Git metadata (`.git` missing), so avoid assuming branch/commit operations are available.
- `next lint` is deprecated in Next 15+, but currently passes with configured ESLint flat config.
- Keep scope tight (no multi-user auth, no social graph/messaging).
