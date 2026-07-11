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

### 2026-07-11
- Did: Ran full Singularity → tree-man → Council PRE-BUILD → repo-maintainer pipeline. BRAIN.md, SITETREE.md, PLANNER.md, DESIGN_GUIDE.md, README.md, AGENTS.md, CLAUDE.md all committed to repo root.
- Decided: Council PRE-BUILD returned CONDITIONAL GO with 7 adjustments — audience framing (CSE students primary voice, open access), de-frictioned signup (localStorage-first), teaser visibility for CV/interview-prep tracks, role-based admin auth, Upstash rate limiting, tier-ready schema. All locked into BRAIN.md.
- Next: Scaffold Next.js 16 project structure, Better Auth + Drizzle/Neon setup, migrate the original 16-week markdown roadmap into seed data for `roadmap_phases`/`roadmap_tasks`.
