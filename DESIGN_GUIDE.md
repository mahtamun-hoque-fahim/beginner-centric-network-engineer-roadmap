# Network Engineer Roadmap — Design Guide

Implementation spec for the design system. No rationale. No marketing copy. Just tokens, patterns, and constraints.

## Color tokens

CSS variables in `app/globals.css` (Tailwind v4 — tokens auto-promote to utilities):

```css
@import "tailwindcss";

@theme {
  /* Surfaces — inherited from BRAIN.md Visual Identity (academic-line palette) */
  --color-bg: #070807;
  --color-surface: #0F0F0F;
  --color-surface-elevated: #131720;
  --color-border: #1F2421;

  /* Text */
  --color-text: #F3F6F4;
  --color-text-muted: #8A938E;
  --color-text-faint: #7a827d;

  /* Brand */
  --color-accent: #3DF49A;
  --color-accent-hover: #5BFBA8;
  --color-accent-faint: #3DF49A1a;

  /* Semantic — accent is green, so success uses a distinct blue-green to avoid visual collision */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #3b82f6;
}
```

Referenced in Tailwind config:
```ts
theme: {
  extend: {
    colors: {
      bg: 'var(--color-bg)',
      surface: 'var(--color-surface)',
      'surface-elevated': 'var(--color-surface-elevated)',
      border: 'var(--color-border)',
      text: 'var(--color-text)',
      'text-muted': 'var(--color-text-muted)',
      accent: 'var(--color-accent)',
      'accent-hover': 'var(--color-accent-hover)',
      'accent-faint': 'var(--color-accent-faint)',
    }
  }
}
```

## Typography

**Families** (loaded via `next/font/local` in `app/layout.tsx` — Google Sans is self-hosted from supplied OFL-licensed font files, not a Google Fonts CDN reference):
- Display: Google Sans (`--font-google-sans`) — h1, h2, hero text, headings
- Body: Google Sans (`--font-google-sans`) — default for everything else (same family, weight does the differentiation)
- Mono: JetBrains Mono (`--font-jetbrains-mono`) — code, task IDs, meta labels, timestamps

**Weights used:**
- Body: 400 (regular), 500 (medium for emphasis)
- Display: 600 (semibold), 700 (bold for hero)
- Mono: 400, 500

**Font file mapping** (from supplied `Google_Sans.zip`):
| Weight | File |
|---|---|
| Regular 400 | `static/GoogleSans-Regular.ttf` |
| Medium 500 | `static/GoogleSans-Medium.ttf` |
| SemiBold 600 | `static/GoogleSans-SemiBold.ttf` |
| Bold 700 | `static/GoogleSans-Bold.ttf` |
| Italic variants | `static/GoogleSans-Italic.ttf` etc., used sparingly (quotes, emphasis) |

**Size scale** (rem):
| Token | Size | Use |
|---|---|---|
| `text-xs` | 0.75rem | Captions, badges, task meta |
| `text-sm` | 0.875rem | Secondary text, form labels |
| `text-base` | 1rem | Body |
| `text-lg` | 1.125rem | Lead paragraphs, scenario intros |
| `text-xl` | 1.25rem | h4 |
| `text-2xl` | 1.5rem | h3, phase card headings |
| `text-3xl` | 1.875rem | h2 |
| `text-4xl` | 2.25rem | h1 body pages |
| `text-6xl` | 3.75rem | Hero headline |

**Line height:** 1.6 for body, 1.2 for display.

## Spacing scale

Tailwind defaults. Common values: 2 (8px), 4 (16px), 6 (24px), 8 (32px), 12 (48px), 16 (64px), 24 (96px).

## Border radius

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | 4px | Inputs, badges |
| `rounded-md` | 6px | Buttons (default) |
| `rounded-lg` | 8px | Cards, task rows |
| `rounded-xl` | 12px | Modals, phase panels |
| `rounded-full` | 9999px | Avatars, progress pills, streak badges |

## Shadows

```css
--shadow-sm: 0 1px 2px rgb(0 0 0 / 0.4);
--shadow-md: 0 4px 12px rgb(0 0 0 / 0.5);
--shadow-lg: 0 12px 32px rgb(0 0 0 / 0.6);
--shadow-glow: 0 0 24px var(--color-accent-faint);
```

Use sparingly on dark theme — depth comes from surface lightness, not shadow. Accent glow reserved for completed-task states and the motivational quote card.

## Components

### Button — primary
```tsx
<button className="bg-accent text-bg px-4 py-2 rounded-md font-semibold hover:bg-accent-hover transition-colors">
  Mark complete
</button>
```

### Button — secondary
```tsx
<button className="bg-surface text-text px-4 py-2 rounded-md border border-border hover:bg-surface-elevated transition-colors">
  Skip for now
</button>
```

### Button — ghost
```tsx
<button className="text-text-muted hover:text-text px-3 py-2 rounded-md transition-colors">
  View resources
</button>
```

### Input
```tsx
<input className="bg-surface border border-border rounded-md px-3 py-2 text-text placeholder-text-faint focus:border-accent focus:outline-none transition-colors" />
```

### Card — task row
```tsx
<div className="bg-surface border border-border rounded-lg p-6 hover:border-accent-faint transition-colors">
  ...
</div>
```

### Badge — task status
```tsx
// Completed
<span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-accent-faint text-accent">
  COMPLETE
</span>

// Locked (teaser track)
<span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-surface-elevated text-text-muted border border-border">
  LOCKED — FINISH ROADMAP TO UNLOCK
</span>
```

### Motivational quote card (fires on task completion)
```tsx
<div className="bg-surface-elevated border border-accent-faint rounded-xl p-6 shadow-glow">
  <p className="text-text text-lg font-medium">"{quote}"</p>
</div>
```

### Progress bar
```tsx
<div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
  <div className="bg-accent h-full transition-all duration-300" style={{ width: `${progress}%` }} />
</div>
```

## Animation defaults

- Hover transitions: `transition-colors duration-150 ease-out`
- Task completion / quote reveal: `transition-all duration-200 ease-out`
- Page reveal: `transition-opacity duration-300 ease-out`
- Maximum UI animation: 300ms. Longer feels sluggish.

Always wrap motion in `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Dark mode notes

Dark-first, no light mode.

- Never use pure black — use `--color-bg` (`#070807`)
- Never use pure white for text — use `--color-text` (`#F3F6F4`)
- Elevation via `--color-surface-elevated`, not shadow alone

## Focus indicators

Always visible. Never `outline: none` without a replacement.

```css
*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

## Accessibility audit log

**2026-07-11.** WCAG AA contrast check run against `--color-bg` (#070807) and `--color-surface-elevated` (#131720). `--color-text-faint` originally failed at 3.19:1 / 2.85:1 (below the 4.5:1 AA threshold for normal text) — used for task metadata labels, timestamps, and badge type text. Replaced `#5A625E` with `#7a827d`, which passes at 5.08:1 / 4.54:1 on both backgrounds while keeping the same muted tint. All other token pairs (text, muted, accent) passed AA on first check.
