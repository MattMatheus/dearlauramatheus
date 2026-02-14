# Private Valentine Site (Next.js + Tailwind)

Super-simple private Valentine site using Next.js App Router + TypeScript + Tailwind.

## What It Includes

- Shared-password login page at `/login`
- Auth middleware for all routes except `/login`, `/api/login`, and static assets
- Cookie session signed with `SESSION_SECRET`
- Home page (`/`) with MySpace-style layout and exactly 3 static posts
- Listing page (`/listing`) with map image, listing card, and 3 photos
- Logout route at `/logout`
- Single content source: `content/siteContent.ts`

## Required Env Vars

Create `.env.local` from `.env.example`:

- `SITE_PASSWORD`
- `SESSION_SECRET`

## Run Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000/login](http://localhost:3000/login).

## Auth Format

- Cookie name: `auth`
- Payload: `v1`
- Signature message: `payload + ":" + SITE_PASSWORD`
- Signature: `HMAC_SHA256(SESSION_SECRET, message)` (hex)
- Cookie value: `payload.sig`

## Content Editing

Edit `content/siteContent.ts`:

- MySpace profile strings
- `posts` (exactly 3): `title`, optional `date`, `body`, `imageUrl`
- `listing`: `address`, `price`, `beds`, `baths`, `sqft`, `description`, `mapImageUrl`, `photos[3]`

## Azure Blob URLs

Use either of these in `content/siteContent.ts` image fields:

- Public blob URLs
- SAS URLs (time-limited)

If you use SAS URLs, keep in mind they expire and images will stop loading when tokens expire.
