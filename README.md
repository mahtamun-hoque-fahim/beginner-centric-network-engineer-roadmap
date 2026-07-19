# Network Engineer Roadmap

An interactive, scenario-based network engineering roadmap and progress tracker for CSE students (open to anyone), with user and admin dashboards.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Neon (PostgreSQL) + Drizzle ORM
- Better Auth
- Upstash Redis (rate limiting)
- Vercel (production). Cloudflare Workers deployment deferred for now — see BRAIN.md Context Hooks

## Prerequisites

- Node 20+
- A Neon project (pooled + unpooled connection strings)
- Vercel account (for deploy)
- Upstash Redis instance

## Local setup

1. Clone the repo: `git clone https://github.com/mahtamun-hoque-fahim/beginner-centric-network-engineer-roadmap.git`
2. Install: `npm install`
3. Copy `.env.example` to `.env.local` and fill in values (see PLANNER.md → Env Vars)
4. Apply migrations: `npx drizzle-kit migrate`
5. Run dev: `npm run dev`

## Env vars

See PLANNER.md → Env Vars for descriptions. Names only:

```
DATABASE_URL
DATABASE_URL_UNPOOLED
BETTER_AUTH_SECRET
BETTER_AUTH_URL
NEXT_PUBLIC_APP_URL
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
RESEND_API_KEY
```

## Scripts

```bash
npm run dev          # local dev server
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint
npx drizzle-kit generate   # generate migration from schema
npx drizzle-kit migrate    # apply migrations
npx drizzle-kit push       # push schema directly (dev only)
```

## Deploy

- Push to `main` → Vercel auto-deploys to production
- Push to any other branch → Vercel preview deploy

Cloudflare Workers deployment is deferred for now (see BRAIN.md). Set env vars in Vercel's dashboard (Production env) before promoting a deploy.

## Folder structure

```
app/             routes (App Router) — public, dashboard, admin route groups
components/      UI primitives and sections
lib/             auth, db, utils
drizzle/         generated migrations
public/fonts/    self-hosted Google Sans font files (OFL licensed)
```

For the detailed structure and route manifest, see PLANNER.md → Architecture and SITETREE.md.
