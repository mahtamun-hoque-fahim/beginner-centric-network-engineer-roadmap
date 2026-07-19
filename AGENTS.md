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
- Deploy target: Vercel (active). Cloudflare Workers deployment is deferred for now — see BRAIN.md Context Hooks before reintroducing `@opennextjs/cloudflare`/`wrangler`
- Auth: Better Auth — session checked server-side via `auth.api.getSession()`, never client-only. Admin access gated by `role: 'admin'` field on the user table, never a hardcoded email check
- Anonymous users track progress via localStorage before signup — do not force signup to use `/curriculum`
- CV and interview-prep tracks (`/dashboard/cv`, `/dashboard/interview-prep`) show a teaser state before full roadmap completion — never fully hide them until 100%
- Google Sans is self-hosted via `next/font/local` from supplied OFL-licensed font files in `public/fonts/` — never swap to a Google Fonts CDN reference
- Motivational quote fires on every task completion — pool must be large/varied enough to avoid repetition fatigue at scale
- Never construct `betterAuth()` or call `getDb()` at module scope in any file that could be imported during Next.js's build-time route collection (this includes `route.ts` files, not just page components) — always go through the lazy `getAuth()` / `getDb()` singletons. This crashed every Vercel deploy once already (2026-07-19); see `src/lib/auth.ts`'s comment for the full explanation
- Pages that query the DB and use no other dynamic API (`headers()`, `cookies()`, etc.) get statically prerendered by default, which also requires DB access at build time — add `export const dynamic = 'force-dynamic'` to any such page unless static generation is deliberately wanted
- Tailwind v4 requires `postcss.config.mjs` with the `@tailwindcss/postcss` plugin registered — without it, `@import "tailwindcss"` in globals.css silently does nothing (no build error, no dev-server warning, just an unstyled page). This was missing entirely from Phase 1 through the first live deploy (2026-07-19) — the site was live and functional but rendered as unstyled default HTML. Always verify actual generated CSS output (`grep` the `.next/static/chunks/*.css` for a real brand color value) after any styling-related setup change, not just that the build exits 0

## Security Gotchas

- `.env.local` is never committed — if a secret leaks into git history or chat, rotate it immediately, don't just remove it going forward
- The GitHub PAT used for repo pushes is session-scoped — rotate it on GitHub after each session it's used in
- Rate limit signup/login routes via Upstash Redis from day one — public signup without it invites credential stuffing
- `/admin/*` data fetching is server-only — never let CGPA/university/country fields leak into client-side bundles

## Session Log

(Newest first. Maximum 10 entries — drop the oldest when an 11th is added.)

### 2026-07-19 (missing PostCSS config — site was live but completely unstyled)
- Did: Fahim's first successful Vercel deploy rendered as plain unstyled HTML (default black-on-white, default font, no dark theme, no layout) despite the build succeeding. Root cause: `postcss.config.mjs` was never created during Phase 1 scaffolding — Tailwind v4's `@import "tailwindcss"` in globals.css requires the `@tailwindcss/postcss` PostCSS plugin to actually process anything; without it, the import is a silent no-op. No build error, no warning, just an unstyled page. Added `@tailwindcss/postcss` as a dev dependency and `postcss.config.mjs`. Verified the fix by grepping the actual generated CSS chunk for real brand color values (`070807`, `3df49a`, etc.) and confirming full utility classes (padding, hover states, colors) were present — not just that `next build` exited 0, since that check would have passed even with the bug present.
- Decided: "Build succeeds" and "site actually looks right" are two different verification levels — going forward, any styling-system change gets checked against actual generated CSS output, not just a clean build exit code.
- Next: Fahim redeploys; confirm the real look renders in the browser this time (dark theme, mint accent, Google Sans).

### 2026-07-19 (Vercel build crash — root cause + fix)
- Did: Every Vercel deploy was failing with "No database connection string was provided to neon()". Root cause: `auth.ts` constructed `betterAuth()` at module scope, which eagerly called `getDb()` on import — Next.js's build-time route collection imports that module before any request, before env vars are guaranteed present. Fixed by making the auth instance a lazy singleton (`getAuth()`), moving handler construction inside the route's GET/POST instead of module scope, and extracting `additionalFields` config into a new zero-dependency `auth-fields.ts` shared by server and client (avoids pulling server-only DB code into the client bundle, and avoids a type-inference mismatch the lazy pattern introduced). Also found and fixed: `next.config.ts` had `reactCompiler: true` with no `babel-plugin-react-compiler` installed (removed it); `/curriculum` and `/curriculum/[phase]` were being statically prerendered by default, which also needs DB access at build time — added `force-dynamic` to both, removed the now-unnecessary `generateStaticParams`.
- Decided: Verified every fix with a full local `npm run build` with **zero env vars set** (the exact worst-case Vercel was hitting) before pushing — build succeeded end to end, all 16 routes compiled. This is the standard going forward for any fix touching build-time behavior: reproduce the failure locally first, don't push-and-pray.
- Next: Fahim re-triggers a Vercel deploy (should succeed now, assuming env vars are set in the dashboard — that's still a separate prerequisite from this fix).

### 2026-07-19 (local setup fixes)
- Did: Fixed two npm install blockers found during Fahim's local setup — `lucide-react@0.383.0`'s peer deps only supported React up to 18 (bumped to `^1.25.0`, which supports React 19); `next@16.0.0` was in the unsupported gap for `@opennextjs/cloudflare@1.20.1`'s peer range (`>=15.5.18 <16 || >=16.2.6`), bumped to `^16.2.10`. Then, per Fahim's call, dropped Cloudflare Workers deployment entirely for now — removed `@opennextjs/cloudflare` and `wrangler` dev dependencies, deleted `wrangler.jsonc` and `open-next.config.ts`, removed the `build:cf`/`preview:cf`/`deploy:cf` scripts. Updated BRAIN.md, PLANNER.md, README.md, AGENTS.md to reflect Vercel-only deployment.
- Decided: Cloudflare is deferred, not abandoned — BRAIN.md Context Hooks documents exactly what to re-add and what to re-check (the Next.js version vs. whatever `@opennextjs/cloudflare` version is current then) if it comes back later.
- Next: Fahim runs `npm install` again locally, should resolve cleanly now without Cloudflare in the tree.

### 2026-07-11 (Phase 4, motion-hive + OG images)
- Did: Ran full motion-hive audit (table printed in-conversation before fixing anything, per skill protocol). Fixed: MobileDrawer had zero animation (backdrop and panel appeared instantly) — added `fade-in`/`drawer-in` keyframes with `--ease-subtle`/`--ease-drawer`; added `active:scale-[0.97]` (or `0.9` for the small checkbox) press feedback to every clickable button/link/checkbox across the app (landing CTAs, login/signup submit, dashboard CTAs, CV builder save, profile save, admin filter, task checkbox, resource chips); replaced `transition-all` with explicit properties on progress bars and the quote toast; swapped default Tailwind easing for the custom `--ease-out` cubic-bezier on chevron rotation and the quote toast. Added `src/app/opengraph-image.tsx` (next/og, edge runtime, brand palette) and full OG/Twitter metadata block in root layout.
- Decided: Skipped stagger-on-render for task lists (motion-hive audit flagged it as `low priority/decorative` — lists are short, 3-8 items typically visible, not worth the added complexity for this pass).
- Next: Fahim provisions real credentials and does the first deploy; then a dedicated valley-of-death spec-vs-code audit and Council POST once live.

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
