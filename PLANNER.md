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
- Deployment: Vercel (primary), Cloudflare Workers via `@opennextjs/cloudflare` (secondary)

**Deployment topology:**
- `main` → Vercel production
- PRs → Vercel preview
- `main` → Cloudflare Workers production (mirror)

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

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| GET | /api/curriculum | public | — | Phase[] with tasks |
| POST | /api/progress | session | `{ taskId }` | `{ ok: true, quote: string }` |
| GET | /api/progress | session | — | UserProgress[] |
| GET | /api/tracks/cv | session | — | `{ status, data }` |
| GET | /api/tracks/interview-prep | session | — | `{ status, data }` |
| GET | /api/admin/stats | session + admin | — | `{ totalUsers, completionRate, recentActivity }` |
| GET | /api/admin/users | session + admin | query: country?, university?, minProgress? | User[] |
| GET | /api/admin/users/[id] | session + admin | — | User detail + full progress |

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
