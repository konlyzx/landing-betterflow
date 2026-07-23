# AGENTS.md — better-space/website

## Quick start

```sh
pnpm install       # deps (pnpm only; bun.lock is stale)
pnpm dev           # dev server at localhost:4321
pnpm build         # static build → dist/
pnpm preview       # preview production build
pnpm lint          # eslint . (no config file exists yet)
```

## Architecture

- **Pure Astro 5** — all components are `.astro` files. **No React/JSX islands** despite what README says. No `.tsx` or `.jsx` files exist.
- **Static output** (`output: 'static'` in `astro.config.mjs`). No SSR.
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin. Config is in CSS `@import` / `@theme`, no JS config file.
- **Path alias**: `@` → `./src/*` (configured in both `tsconfig.json` and `astro.config.mjs` Vite resolve).

## Source layout

| Path | Purpose |
|------|---------|
| `src/pages/` | Astro routes (`.astro` files, one per URL) |
| `src/app/` | Components and sections consumed by pages |
| `src/layouts/Layout.astro` | Root layout (SEO, JSON-LD, fonts) |
| `src/styles/globals.css` | Tailwind import + design tokens + utilities |
| `src/app/globals.css` | Duplicate of `src/styles/globals.css` (both active) |

## Key details

- **PostHog proxy** — Vercel rewrites `/ingest/*` → `us.i.posthog.com/*` (see `vercel.json`).
- **Sitemap** — `/ingest` and `/mobile` routes are excluded via `@astrojs/sitemap` filter.
- **Image service** — disabled (`astro/assets/services/noop`).
- **Two codebases**: this is the landing site. The actual Studio is a **separate Next.js app** at `app.betterflow.site`.
- **Fonts**: custom Inter Variable woff2 (`src/fonts/`) + `@fontsource/geist-*` npm packages.
- **No tests** exist in this project.
- **No ESLint config** — `eslint .` script exists but no config files. `eslint-plugin-astro` is listed as a devDependency.
- **No Prettier config** — `prettier-plugin-astro` and `prettier-plugin-tailwindcss` are devDependencies but unconfigured.
- **Env vars**: optional analytics keys (`PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_POSTHOG_KEY`, `PUBLIC_POSTHOG_HOST`) — see `src/env.d.ts`.
