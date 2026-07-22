# Changelog

## [v0.1.0] — 2026-07-19

First release — full build, security-audited, SEO-ready, deployed to Vercel.

### Added
- Next.js 16 scaffold — Drizzle schema, Better Auth (role + profile fields), DAL, Upstash rate limiting, self-hosted Google Sans, base layout + landing page (7728218)
- Seed data (16-week roadmap migrated), `/curriculum` + `/curriculum/[phase]`, anonymous localStorage progress tracking, motivational quote toast, `/login` + `/signup` with profile fields (72c0e66)
- Server-side progress persistence + merge-on-login, `/dashboard` (progress/streak/current phase), `/dashboard/roadmap`, `/dashboard/profile`, CV + interview-prep tracks (teaser gate + full tools), full `/admin` dashboard (9ce949c)
- Mobile drawer nav for dashboard/admin, WCAG AA contrast fix, Waterborne emoji sweep (b891ba5)
- OG image + full OG/Twitter metadata (75809e4)
- WebGL procedural topographic hero background, brand-recolored, with `prefers-reduced-motion` support (896bbd4, 0c309d2)
- Custom 404 page with reserved art slot + IMAGE-BRIEF (5b985a1)
- `app/sitemap.ts`, `app/robots.ts`, `noindex` on gated routes, real meta titles/descriptions, WebSite/Course/HowTo JSON-LD schema (8918451)
- Humanized phase intro copy on the public curriculum page (a7c6914)
- MIT LICENSE, README version/license/star badges (36a89d7)

### Fixed
- `lucide-react` bumped 0.383.0 → 1.25.0 — old version's peer deps only supported React up to 18, blocking install on React 19 (0650fa7)
- `next` bumped 16.0.0 → ^16.2.10 — `@opennextjs/cloudflare` required `next >=16.2.6` (b4f7b90)
- `drizzle-orm` bumped 0.36.0 → 0.45.2, `drizzle-kit` 0.28.0 → 0.31.10, `@neondatabase/serverless` → 1.1.0 — required by `better-auth@1.6.23`'s peer deps (590a755)
- `db:seed` script wasn't loading `.env.local` — added Node's `--env-file` flag (da726e4)
- Eager `betterAuth()`/`getDb()` construction at module scope was crashing every Vercel build — refactored to a lazy singleton (e8ba779)
- Missing PostCSS config — Tailwind v4 was silently not processing any styles despite a clean build (098c5a9)
- Rate limiting on `/api/auth` was bypassable via a spoofed `x-forwarded-for` header — switched to Vercel's trusted `x-vercel-forwarded-for` (39492bd)
- Missing security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) — added to `next.config.ts` (39492bd)

### Changed
- Dropped Cloudflare Workers deployment for now — Vercel-only (254b4cd)
- `PLANNER.md`'s API Routes table corrected to match the actual shipped architecture, found via Valley of Death audit (d1b58fe)

### Audits run
Waterborne (emoji sweep) → Valley of Death (spec-vs-code) → Sentinel (security) → cave-man (visual opportunity) → Airborne + Humanizer (SEO/copy) → motion-hive (touch-up) → **Council POST: SHIP**
