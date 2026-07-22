# Network Engineer Roadmap — Planner

> One-line description: An interactive, scenario-based network engineering roadmap and progress tracker, primary voice tuned for CSE students but open to anyone, with dual dashboards and unlockable CV/interview-prep tracks.

## Project Overview

**Purpose.** Existing networking learning resources aren't personalized to CSE students, leaving them unable to compete with graduates of dedicated networking/telecom degree programs. This project gives them a followable, trackable, job-scenario-framed path from zero to interview-ready.

**Target user.** Any student, any semester, any background (zero to advanced networking knowledge) — content voice speaks to CSE students first, but usability never gatekeeps non-CS people.

**Key value.** A living roadmap people actually return to daily, with real progress tracking, that ends in genuine interview-readiness — not another static course aggregator.

**Current phase.** Planning

---

## Architecture

**Stack:**
- Framework: Next.js 16 App Router
- Language: TypeScript (strict)
- Styling: Tailwind CSS v4 + CSS variables
- Database: Neon PostgreSQL
- ORM: Drizzle
- Auth: Better Auth (role: `user | admin`)
- Rate limiting: Upstash Redis (signup/login routes)
- Deployment: Vercel (active). Cloudflare Workers deferred — see BRAIN.md Context Hooks.

**Deployment topology:**
- `main` → Vercel production
- PRs → Vercel preview

**Folder structure (summary):** see README.md

---

## User Flows

### Flow 1: Anonymous visitor follows the roadmap without signing up
1. User lands on `/`
2. Clicks into `/curriculum`
3. Scrolls, expands phase sections, sees tasks + resources
4. Checks off tasks — progress stored client-side (localStorage), motivational quote fires per completion
5. Prompted to sign up only when trying to persist progress across devices

### Flow 2: Signed-up user tracks progress and unlocks tracks
1. User signs up at `/signup` — provides email/password + country, education status, university, dept, CGPA
2. Redirected to `/dashboard` — sees current phase, progress %, streak
3. Works through `/dashboard/roadmap` — checkboxes persist server-side now
4. Sees teaser previews of `/dashboard/cv` and `/dashboard/interview-prep` before full completion
5. On 100% roadmap completion, both tracks fully unlock

### Flow 3: Admin monitors activity
1. Admin logs in — `role: admin` on user table grants access
2. Lands on `/admin` — aggregate stats: total users, completion rates, recent activity
3. Drills into `/admin/users` — filter by country, university, progress %
4. Opens `/admin/users/[id]` for individual detail view

---

## DB Schema

Drizzle schema lives in `lib/db/schema.ts`. Summary:

### users (extends Better Auth's default user table)
| column | type | notes |
|---|---|---|
| id | text PK | Better Auth default |
| email | text unique | |
| name | text | |
| role | enum | `user` \| `admin` — drives `/admin/*` access, never a hardcoded email check |
| country | text | nullable until profile completed |
| educationStatus | text | e.g. "undergraduate", "graduate" |
| university | text | nullable |
| department | text | nullable |
| cgpa | numeric | nullable |
| tier | text | default `free` — reserved for future monetization, no payment logic wired yet |
| createdAt | timestamp | defaultNow |

### sessions / accounts / verification
Standard Better Auth tables.

### roadmap_phases
| column | type | notes |
|---|---|---|
| id | text PK | slug, e.g. `phase-1-junior-it-support` |
| title | text | |
| order | integer | display order |
| description | text | |

### roadmap_tasks
| column | type | notes |
|---|---|---|
| id | text PK | |
| phaseId | text FK → roadmap_phases.id | |
| title | text | scenario title |
| scenario | text | job-framed prompt |
| resources | jsonb | array of `{label, url, type: free\|paid}` |
| order | integer | |

### user_progress
| column | type | notes |
|---|---|---|
| id | text PK | |
| userId | text FK → users.id | |
| taskId | text FK → roadmap_tasks.id | |
| completedAt | timestamp | |

### cv_track / interview_prep_track
| column | type | notes |
|---|---|---|
| id | text PK | |
| userId | text FK → users.id | |
| status | text | `locked` \| `teaser` \| `unlocked` |
| data | jsonb | track-specific content/progress |

---

## API Routes

Curriculum and admin data are fetched directly in Server Components via
`src/lib/curriculum.ts` and `src/lib/admin.ts` — there is no separate
`/api/curriculum` or `/api/admin/*` API layer. Only client-interactive
flows (auth, progress, tracks, profile) go through actual route handlers.

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| GET/POST | /api/auth/[...all] | public | Better Auth internals | Better Auth internals |
| PUT | /api/profile | session | `{ country?, educationStatus?, university?, department?, cgpa? }` | `{ ok: true }` |
| GET | /api/progress | session | — | `{ taskIds: string[] }` |
| POST | /api/progress | session | `{ taskId }` | `{ completed: boolean, quote?: string }` — quote only present when completing (not un-completing) a task |
| PUT | /api/progress | session | `{ taskIds: string[] }` | `{ merged: number }` — merges anonymous localStorage progress into the account on login |
| GET | /api/tracks/cv | session | — | `{ data: object \| null }` |
| PUT | /api/tracks/cv | session | `{ data }` | `{ ok: true }` |
| GET | /api/tracks/interview-prep | session | — | `{ data: object \| null }` |
| PUT | /api/tracks/interview-prep | session | `{ data }` | `{ ok: true }` |

---

## Env Vars

| Name | Required | Description | Example |
|---|---|---|---|
| DATABASE_URL | yes | Neon pooled connection | postgresql://...?sslmode=require |
| DATABASE_URL_UNPOOLED | yes | Neon direct connection (migrations) | postgresql://...?sslmode=require |
| BETTER_AUTH_SECRET | yes | Session signing secret (32+ chars) | (openssl rand -base64 32) |
| BETTER_AUTH_URL | yes | Public app URL | https://[project].com |
| NEXT_PUBLIC_APP_URL | yes | Same as above, client-readable | https://[project].com |
| UPSTASH_REDIS_REST_URL | yes | Rate limiting on auth routes | https://...upstash.io |
| UPSTASH_REDIS_REST_TOKEN | yes | Rate limiting on auth routes | AX... |
| RESEND_API_KEY | optional | Transactional email if added later | re_... |

---

## Timeline / Phases

### Phase 1 — Foundation
Status: `[x]` done

- [x] Repo scaffold, Vercel + Cloudflare connected
- [x] Drizzle schema for core tables
- [x] Better Auth setup with role enum
- [x] Upstash Redis rate limiting on auth routes

### Phase 2 — Core flows
Status: `[x]` done

- [x] Curriculum data seeded (from the original 16-week markdown roadmap)
- [x] Anonymous localStorage progress tracking
- [x] Signup/login with profile fields
- [x] Server-side progress persistence + motivational quote trigger

### Phase 3 — Dashboards
Status: `[x]` done

- [x] User dashboard (progress, streak, current phase)
- [x] CV + interview-prep teaser/unlock logic
- [x] Admin dashboard (aggregate stats, user list, user detail)

### Phase 4 — Polish
Status: `[~]` in progress

- [x] Mobile responsiveness audit — drawer nav added for `/dashboard` and `/admin` (MobileDrawer component, sidebars now have a mobile fallback)
- [x] Accessibility pass (WCAG 2.2 AA) — contrast audit run, `--color-text-faint` corrected from 3.19:1 to 5.08:1; focus-visible rings and aria labels already present from Phase 1-3 build
- [x] OG images — `src/app/opengraph-image.tsx` (next/og, edge runtime, brand palette), full OG/Twitter metadata wired in root layout
- [ ] Production deploy verification on both platforms — **requires real Neon/Upstash/Better Auth credentials**, cannot be completed from this environment; manual step for Fahim
- [x] Waterborne sweep — run and passed clean (no emojis found repo-wide) as part of this session, but re-run after any future copy changes
- [x] motion-hive touch-up — full audit run: fixed broken drawer motion (was instant, now fade+slide), added `:active` press states to every button/checkbox in the app, replaced weak default easing with custom `--ease-out`/`--ease-drawer`/`--ease-subtle` curves, removed `transition-all` anti-pattern in favor of explicit properties
- [ ] Council POST — deferred until after live deploy verification, since POST mode evaluates the finished, deployed product

---

## Next Steps

In order:
1. Fahim: create real Neon project, Upstash Redis instance, and set all env vars in Vercel + Cloudflare dashboards (see .env.example)
2. Run `npm install`, `npx drizzle-kit push`, `npm run db:seed`, `npm run dev` locally to smoke-test before first deploy
3. First deploy to Vercel, verify against Cloudflare via `npm run build:cf` / `npm run preview:cf`
4. OG images, then a dedicated motion-hive pass, then Council POST once live

---

## Notes & decisions

**2026-07-11.** Council PRE-BUILD (CONDITIONAL GO) — locked 7 adjustments: primary audience framing (CSE students as voice target, open access), de-frictioned signup (localStorage-first), teaser visibility for CV/interview-prep tracks, role-based admin auth (not hardcoded email), Upstash rate limiting on auth routes, tier-ready schema for future monetization.

**2026-07-11.** Palette and Google Sans locked from Fahim's personal-website DESIGN_GUIDE.md (academic-line system, shared with learnBEE/LearnDE). Google Sans self-hosted via supplied OFL-licensed font files, not a CDN reference.

**2026-07-19.** Valley of Death audit run — code, auth, data wiring, brand, and copy all passed clean. Only finding: this file's API Routes table had drifted from the actual shipped architecture (documented 4 routes that were never built — curriculum/admin data is fetched directly via lib/ helpers, not API routes — and had a stale response shape for POST /api/progress with the PUT merge endpoint undocumented). Table corrected above to match the real code.

**2026-07-19.** Sentinel security audit run — auth, authorization, and injection all passed clean (zero sql.raw/sql.identifier calls, every personal API route scoped by session.user.id, admin routes properly gated). Two real findings fixed: (1) rate limiting on /api/auth was bypassable by spoofing the x-forwarded-for header — switched to Vercel's trusted x-vercel-forwarded-for; (2) no security headers were set at the app level — added X-Content-Type-Options, Referrer-Policy, and X-Frame-Options to next.config.ts. Lower-priority notes: npm audit's 7 moderate findings are all in dev-only/nested dependency chains (drizzle-kit's esbuild, Next's own internal postcss), not exploitable at runtime; trustedOrigins left at Better Auth's default (fine for now, revisit once a final production domain is locked in).

**2026-07-19.** Airborne SEO pass run and implemented — added app/sitemap.ts and app/robots.ts (both force-dynamic, matching the build-independent-of-DB pattern), noindex on dashboard/admin/auth layouts, real meta title/description on / and /curriculum, generateMetadata on /curriculum/[phase] pulling the real phase.description, and WebSite/Course/HowTo JSON-LD schema. Web search confirmed genuine long-tail demand around CCNA interview prep and networking roadmaps, with the "CSE student" framing being real white space against established paid-program competitors. Content roadmap (blog cluster, cornerstone pages) proposed but not yet written — deferred to Fahim's call on priority. Humanizer pass still recommended before any of the proposed body copy (phase intro paragraphs, blog content) gets written, per Airborne's own closing note.
