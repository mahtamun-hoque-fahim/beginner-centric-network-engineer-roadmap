# Network Engineer Roadmap

Interactive network engineering roadmap and progress tracker, primary voice for CSE students, open to anyone, with user + admin dashboards and unlockable CV/interview-prep tracks.

## Setup & Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Type check: `npx tsc --noEmit`
- DB push (dev only): `npx drizzle-kit push`
- DB migrate (production): `npx drizzle-kit generate` then `npx drizzle-kit migrate`

## Conventions & Non-Negotiables

- No emojis anywhere in code or UI — lucide-react icons or inline SVG only
- Dual deploy target: Vercel (primary) + Cloudflare Workers via `@opennextjs/cloudflare` (secondary) — every route must stay Edge Runtime compatible, neon-http driver only
- Auth: Better Auth — session checked server-side via `auth.api.getSession()`, never client-only. Admin access gated by `role: 'admin'` field on the user table, never a hardcoded email check
- Anonymous users track progress via localStorage before signup — do not force signup to use `/curriculum`
- CV and interview-prep tracks (`/dashboard/cv`, `/dashboard/interview-prep`) show a teaser state before full roadmap completion — never fully hide them until 100%
- Google Sans is self-hosted via `next/font/local` from supplied OFL-licensed font files in `public/fonts/` — never swap to a Google Fonts CDN reference
- Motivational quote fires on every task completion — pool must be large/varied enough to avoid repetition fatigue at scale

## Security Gotchas

- `.env.local` is never committed — if a secret leaks into git history or chat, rotate it immediately, don't just remove it going forward
- The GitHub PAT used for repo pushes is session-scoped — rotate it on GitHub after each session it's used in
- Rate limit signup/login routes via Upstash Redis from day one — public signup without it invites credential stuffing
- `/admin/*` data fetching is server-only — never let CGPA/university/country fields leak into client-side bundles

## Session Log

(Newest first. Maximum 10 entries — drop the oldest when an 11th is added.)

### 2026-07-11 (Phase 4, partial)
- Did: Built MobileDrawer component (hamburger + slide-out panel with backdrop) and wired it into both /dashboard and /admin layouts, so those areas now work below the `md` breakpoint. Ran a Waterborne-style emoji sweep across the entire repo (source + docs) — clean, no emojis found. Ran a WCAG AA contrast check against the design token pairs — found `--color-text-faint` failing at 3.19:1/2.85:1, corrected to `#7a827d` (5.08:1/4.54:1), updated in globals.css and DESIGN_GUIDE.md.
- Decided: Production deploy verification cannot happen from this environment — it needs Fahim to provision a real Neon project and Upstash Redis instance and set env vars in both Vercel and Cloudflare dashboards. Documented as a manual next step rather than attempted. Council POST deferred until after that live deploy, since POST mode is meant to evaluate the actually-deployed product.
- Next: Fahim provisions real credentials and does the first deploy; then OG images, a dedicated motion-hive pass, and Council POST.

### 2026-07-11 (Phase 3)
- Did: Built server-side progress persistence (/api/progress GET/POST/PUT with merge-on-login for localStorage → account migration), useServerProgress hook, DashboardPhaseAccordion. Built /dashboard (stats: progress %, streak from consecutive completedAt days, current phase), /dashboard/roadmap, /dashboard/profile (+ /api/profile). Built /dashboard/cv and /dashboard/interview-prep with TeaserGate (shown until 100% roadmap completion, per Council's teaser-not-fully-hidden adjustment) and full tools once unlocked (CvBuilder, InterviewPrepTool) backed by /api/tracks/cv and /api/tracks/interview-prep. Built /admin, /admin/users (country/university filters), /admin/users/[id] — all gated by requireAdmin (role field, never hardcoded email), aggregate queries server-only via src/lib/admin.ts.
- Decided: Dashboard and admin nav are separate sidebar components (DashboardNav, AdminNav) rather than one shared nav with role branching — keeps admin's smaller link set simple and avoids conditional rendering complexity for a 2-link admin nav.
- Next: Mobile nav (sidebars are `hidden md:block` with no drawer fallback yet), accessibility pass, real credential deploy verification (Vercel + Cloudflare), then Waterborne → motion-hive → Council POST before ship.

### 2026-07-11 (Phase 2)
- Did: Migrated the original 16-week markdown roadmap into seed data (src/lib/db/seed.ts, scripts/seed.ts, npm run db:seed) across 4 phases / ~30 tasks with resources. Built /curriculum (Server Component data fetch) + /curriculum/[phase] deep-link, PhaseAccordion client component wired to a localStorage progress hook (useLocalProgress — reads only inside useEffect to avoid hydration mismatch), TaskRow + QuoteToast components, motivational quote pool (src/lib/quotes.ts). Built /login and /signup pages using Better Auth's client (signIn.email, signUp.email) with full profile field collection on signup. Landing page CTAs wired to /curriculum and /signup.
- Decided: Progress tracking is client-only (localStorage) for now per the de-frictioned signup adjustment from Council — server-side persistence via user_progress deferred to Phase 3 alongside the dashboard, where a login-time merge strategy will reconcile local vs. server progress.
- Next: Wire server-side progress persistence, build /dashboard, /dashboard/cv and /dashboard/interview-prep teaser states, then /admin.

### 2026-07-11 (Phase 1)
- Did: Scaffolded Next.js 16 project — package.json, tsconfig, next.config.ts, Drizzle schema (users extended, roadmap_phases, roadmap_tasks, user_progress, cv_track, interview_prep_track), Better Auth instance with role/profile additionalFields, DAL (requireUser/requireAdmin), Upstash rate limiter wired into auth POST handler, proxy.ts (thin redirect layer only), wrangler.jsonc + open-next.config.ts for Cloudflare, self-hosted Google Sans via next/font/local, globals.css with full token theme, minimal landing page.
- Decided: Rate limiting applied at the route-handler level (wrapping Better Auth's POST), not inside proxy.ts, since proxy stays a thin network layer per Next.js 16 convention — auth/session logic lives in the DAL, not proxy.
- Next: Migrate the 16-week markdown roadmap into seed data for roadmap_phases/roadmap_tasks, build /curriculum with anonymous localStorage progress tracking, build /login and /signup pages.

### 2026-07-11
- Did: Ran full Singularity → tree-man → Council PRE-BUILD → repo-maintainer pipeline. BRAIN.md, SITETREE.md, PLANNER.md, DESIGN_GUIDE.md, README.md, AGENTS.md, CLAUDE.md all committed to repo root.
- Decided: Council PRE-BUILD returned CONDITIONAL GO with 7 adjustments — audience framing (CSE students primary voice, open access), de-frictioned signup (localStorage-first), teaser visibility for CV/interview-prep tracks, role-based admin auth, Upstash rate limiting, tier-ready schema. All locked into BRAIN.md.
- Next: Scaffold Next.js 16 project structure, Better Auth + Drizzle/Neon setup, migrate the original 16-week markdown roadmap into seed data for `roadmap_phases`/`roadmap_tasks`.
