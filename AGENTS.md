<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Better Flow — Comming Soon

## Stack

- **Framework:** Next.js 16 (App Router, no `pages/`)
- **Package manager:** pnpm
- **CSS:** Tailwind v4 (`@import "tailwindcss"` in CSS, `@tailwindcss/postcss` plugin — no JS config file)
- **Animation:** framer-motion, gsap, lenis (smooth scroll)
- **Particles:** @tsparticles/react + @tsparticles/slim

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Dev server |
| `pnpm build` | Build (acts as typecheck + build — no separate typecheck script) |
| `pnpm start` | Start prod server |
| `pnpm lint` | ESLint only |

No test runner or test files exist.

## Architecture

- **`app/page.tsx`** — main landing page, `"use client"`. Renders desktop (`md:block` wrapper) and mobile (`md:hidden` wrapper) section variants side-by-side.
- **`app/mobile/`** — separate `/mobile` route duplicating the page for mobile visitors.
- **Sections** (`app/sections/`) compose the page: Hero, Features, LiveDemo, Privacy, RoadmapSection, CTA. Each has a `Mobile` variant in `app/sections/mobile/`.
- **Components** (`app/components/`) are reusable parts. UI primitives live in `app/components/ui/`. Mobile variants in `app/components/mobile/`.
- **No server components** — every route/component is `"use client"`.
- **Path alias:** `@/*` maps to project root (tsconfig paths).

## Other

- `scripts/create-favicon.js` — run to regenerate favicon/apple-touch-icon/icon.svg from `logo.svg` (brand color #ff7e40).
- `changes.MD` is gitignored dev notes, not project docs.
- No env vars needed for dev.
- Vercel deploy via `vercel.json` — `iad1` region, `pnpm install`/`pnpm build` commands.
