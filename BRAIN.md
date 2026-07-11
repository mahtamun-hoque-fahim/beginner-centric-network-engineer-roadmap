# BRAIN.md — Network Engineer Roadmap

> This file is maintained by the Singularity skill. It is the identity document of this project.
> When Claude drifts, hallucinates, or loses context — this file is the source of truth.
> Do not confuse this with PLANNER.md (tasks/phases) or DESIGN_GUIDE.md (design tokens).

---

## The One-Line Truth

A beginner-centric, interactive network engineering roadmap and progress tracker — open to anyone but written to make CSE students genuinely interview-ready, competitive with graduates from dedicated networking/telecom degrees.

---

## Why It Exists

Existing networking resources aren't personalized — they're either too academic/scattered or not tailored to CSE students specifically, leaving CSE students with a real interest in networking unable to compete against graduates of dedicated networking/telecom programs. A markdown roadmap already exists but lives buried in a chat thread — nobody returns daily to a static file. This needs to be a persistent, living place people actually come back to, follow step by step, and eventually point others toward.

---

## What It Must Become

Every track — the roadmap, CV-building, interview-prep — fully complete, not stubbed. A user finishes a track and feels "now I know exactly what to do" and discovers tools/resources/paths they didn't know existed along the way. It becomes the kind of thing Fahim can point to later and say "this is how I did it" — a real, followable, shareable artifact of the method itself.

---

## Core Decisions (Locked)

- [LOCKED] Open to anyone in the world, but content voice/terminology is calibrated for CSE students — non-CS users can still follow it, CS users get terminology they recognize plus specified direction (free/paid resource paths)
- [LOCKED] Auth is optional for browsing/following the roadmap — signup only required to persist progress, store profile data, and appear in tracking
- [LOCKED] Profile data collected on signup: country, education status, university, department, CGPA (used for both personal tracking and admin-level insight)
- [LOCKED] Motivational quote fires on every task completion — this is a core interaction, not a nice-to-have
- [LOCKED] Two dashboards: User dashboard (personal roadmap progress) and Admin dashboard (aggregate view of all user activity)
- [LOCKED] CV-building + interview-prep track unlocks as a separate track after full roadmap completion
- [LOCKED] Scenario/job-framing content style carries over from the original markdown roadmap — never rewritten into academic/lecture tone
- [LOCKED] Visual system inherited from Fahim's personal-website DESIGN_GUIDE.md (academic-line palette), with Google Sans requested as the display/body font — see Context Hooks for a font-availability flag
- [LOCKED] Primary audience framing resolved (Council PRE-BUILD, General): CSE students are the primary voice/copy target — content is written speaking to them first — but access and usability are never gated to CS backgrounds; anyone can use the full site
- [LOCKED] Signup friction reduced (Council PRE-BUILD, Wizard): anonymous users can check off tasks and track progress client-side (localStorage) before ever signing up; signup is prompted at a natural "save your progress across devices" moment, not upfront
- [LOCKED] CV and interview-prep tracks get partial/teaser visibility before full roadmap completion (Council PRE-BUILD, Wizard) — not fully invisible until 100% done; full unlock still requires roadmap completion, but a preview state exists earlier
- [LOCKED] Admin auth uses a real `role` field on the user table, not a hardcoded email check (Council PRE-BUILD, Architect) — `/admin/*` data fetching is server-only, never leaked into client bundles
- [LOCKED] Rate limiting via Upstash Redis on signup/login routes from day one (Council PRE-BUILD, Architect) — same pattern as other Fahim projects
- [LOCKED] Schema left flexible for a future `tier` field (Council PRE-BUILD, Coin-master) — no payment infra built now, but monetization-ready structure like Formify's approach

---

## Visual Identity (Locked)

> Chosen in Phase 1.5, inherited from personal-website's academic-line palette (`#3DF49A` mint accent system), also shared by learnBEE/LearnDE. Do not substitute with `#00e676`, `#0a0a0a`, `#131720`, or `#6C63FF`. Do not invent new values.

| Token          | Value       | Usage                            |
|----------------|-------------|-----------------------------------|
| `bg`           | `#070807`   | Page background                  |
| `surface`      | `#0F0F0F`   | Card, panel, input backgrounds   |
| `surface-elevated` | `#131720` | Raised elements, dropdowns     |
| `accent`       | `#3DF49A`   | Primary actions, links, glows, completed states |
| `accent-dim`   | `#5BFBA8`   | Hover/pressed accent state        |
| `accent-faint` | `#3DF49A1a` | Ring/border accent at ~10% opacity|
| `border`       | `#1F2421`   | Default border colour            |
| `text`         | `#F3F6F4`   | Primary text                     |
| `muted`        | `#8A938E`   | Secondary/meta text               |
| Font (display) | Google Sans (self-hosted) | Headings           |
| Font (body)    | Google Sans (self-hosted) | Body copy          |
| Font (mono)    | JetBrains Mono | Code, task IDs, meta labels    |

---

## What It Must Never Become

- Never academic or lecture-y in tone — job-scenario framing is the whole point, confirmed by Fahim from the very first version of this roadmap
- Never gatekeeping toward non-CS people — the friendly on-ramp must survive even as CS-specific depth is added
- Never a paywalled content trap — free/paid resources are clearly labeled, but the roadmap and core tracking stay free
- Never a static content dump — this is not "another course aggregator" with dead links; it's a living, trackable path
- Never a half-finished track — if a track exists on the site (roadmap, CV, interview-prep), it must be genuinely complete, not a placeholder
- Never a generic/templated dashboard look — needs its own visual identity, not default component-library styling

---

## Current State

```
Status: Pre-build (BRAIN.md just committed)
Last updated: 2026-07-11

What works:
- Original markdown roadmap content exists (16-week, 1hr/day, scenario-based, phases 0-4)

What's broken or incomplete:
- Nothing built yet — this is Phase 2 of Singularity, tree-man and Council PRE-BUILD still pending

What's next (in spirit, not tasks):
- Route manifest (tree-man)
- Council PRE-BUILD verdict
- repo-maintainer scaffolding
- Build begins
```

---

## The Stack (Frozen)

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Neon (PostgreSQL) + Drizzle ORM |
| Auth | Better Auth |
| Deployment | Vercel (primary) + Cloudflare Workers (secondary), Edge Runtime throughout |
| Email | Resend (if needed for auth flows) |
| Rate limiting | Upstash Redis (signup/login routes) |
| Repo | github.com/mahtamun-hoque-fahim/beginner-centric-network-engineer-roadmap |

---

## Constraints & Non-Negotiables

- Must deploy to both Vercel and Cloudflare Workers (Edge Runtime compatible, neon-http driver only)
- No emojis in UI — lucide-react icons only
- Dark-first, no light mode (per inherited academic-line palette)
- No Supabase
- Anonymous users can browse/read the full roadmap — auth only gates progress persistence and profile data
- Admin dashboard must be able to see aggregate user activity (progress, profile fields) without exposing raw credentials

---

## Context Hooks (for Claude)

- Google Sans is self-hosted via actual font files Fahim supplied (SIL OFL 1.1 licensed, static + variable weights) — loaded via `next/font/local`, same pattern as the Bengali font on Bindu. Not a Google Fonts CDN reference. No substitute needed — this is resolved, not a flag.
- This project's palette and academic tone deliberately mirror learnBEE/LearnDE — treat those two projects as sibling references for tone and dashboard patterns, not the SaaS/tooling dark-purple line (Formify, Blacksmith)
- The original 16-week markdown roadmap (Phases 0–4) is the seed content for the curriculum data — do not regenerate it from scratch, adapt/expand it into the site's data model
- CGPA and education fields are sensitive-ish personal data — treat with normal data-handling care in schema design, not just decoration

---

*Last updated by Bushmaster on 2026-07-11*
