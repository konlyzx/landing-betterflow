<p align="center">
  <img src="./public/images/preview.webp" alt="Better Flow Preview" width="100%" />
</p>

# Better Flow

> An open-source screenshot studio and browser tool. Transform raw captures into production-ready graphics instantly.

<p align="center">
  <img src="https://newshields.vercel.app/api/badge.svg?label=Built%20with&title=React&icon=react_dark&theme=midnight" alt="React" />
  <img src="https://newshields.vercel.app/api/badge.svg?label=Built%20with&title=Next.js&icon=nextjs_icon_dark&theme=graphite" alt="Next.js" />
  <img src="https://newshields.vercel.app/api/badge.svg?label=Built%20with&title=Tailwind%20CSS&icon=tailwindcss&theme=midnight" alt="Tailwind CSS" />
  <img src="https://newshields.vercel.app/api/badge.svg?label=Built%20with&title=shadcn%2Fui&icon=shadcn-ui_dark&theme=graphite" alt="shadcn/ui" />
  <img src="https://newshields.vercel.app/api/badge.svg?label=Built%20with&title=TypeScript&icon=typescript_dark&theme=graphite" alt="TypeScript" />
</p>

---

## Overview

Better Flow is a free, browser-based screenshot editor. Beautiful backgrounds, device frames, 3D effects, animations, and video export — all in your browser. No signup, no watermarks, no data leaving your machine.

**Live:** [betterflow.site](https://betterflow.site)  
**Repository:** [github.com/konlyzx/betterflow](https://github.com/konlyzx/betterflow)  
**Landing Page:** [github.com/konlyzx/landing-betterflow](https://github.com/konlyzx/landing-betterflow)

---

## Projects

Better Flow is split into two repositories:

### 1. Landing Page (`web`)

The public-facing coming-soon and marketing site, including the [Community page](/community). Built with Next.js 16 App Router, Tailwind CSS v4, framer-motion, GSAP, and Lenis for smooth scrolling.

### 2. Screenshot Studio (`better-flow`)

The full screenshot editor application. Canvas-based editing with Konva, 20+ animation presets, video export via FFmpeg WASM, Chrome extension for screen capture, and more.

---

## Features

### Screenshot Studio

| Feature | Description |
|---------|-------------|
| **100+ Backgrounds** | Gradients, solid colors, images, blur, noise, mesh gradients |
| **Browser Mockups** | Safari & Chrome (light/dark) with realistic toolbars, custom URL |
| **Device Frames** | Arc browser, Polaroid, glass, outline, border, and more |
| **3D Transforms** | 30+ perspective presets with realistic depth and tilt controls |
| **Draw & Markup** | Arrows, shapes, blur regions, text overlays, annotations |
| **Tweet & Code Snippets** | Import tweets via URL, generate code screenshot images |
| **Animations** | 20+ presets across 5 categories, timeline editor, keyframe control |
| **Video Export** | MP4, WebM, GIF with hardware-accelerated encoding |
| **High-Res Export** | PNG/JPG up to 5x scale, fully in-browser |
| **Multi-Slide Support** | Slideshow presentations with multiple images and export |

### Chrome Extension

- One-click screen recording from any webpage
- Full page or visible area capture
- Automatic upload to the editor
- MV3 Manifest with desktopCapture API

### Landing Page

- **Hero** — Fullscreen with gradient orb, rotating text, animated gradient
- **Manifesto** — Scroll-driven card stacking via ScrollStack (React Bits)
- **How to Contribute** — 4-step contribution flow with SpotlightCard hover effects
- **Activity** — 2x2 dynamic-ready grid with empty states
- **Integrations** — GitHub integration showcase
- **Open Source** — Ethos cards highlighting community values
- **Features** — Interactive product showcase with before/after comparison
- **Privacy** — Zero-telemetry, local-first processing messaging
- **Roadmap** — Version milestone timeline

---

## Tech Stack

| Technology | Role | Used In |
|------------|------|---------|
| [React 19](https://react.dev) | UI Framework | Both |
| [Next.js 16](https://nextjs.org) | App Framework (App Router) | Both |
| [TypeScript](https://typescriptlang.org) | Language (strict mode) | Both |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling Engine | Both |
| [framer-motion](https://motion.dev) | Animation Library | Landing |
| [GSAP](https://gsap.com) + ScrollTrigger | Scroll Animations | Landing |
| [Lenis](https://lenis.darkroom.engineering) | Smooth Scrolling | Landing |
| [@tsparticles](https://particles.js.org) | Particle Effects | Landing |
| [Konva / React-Konva](https://konvajs.org) | Canvas Rendering | Studio |
| [Zustand](https://zustand-demo.pmnd.rs) | State Management | Studio |
| [FFmpeg WASM](https://ffmpegwasm.netlify.app) | Video Encoding | Studio |
| [Radix UI](https://radix-ui.com) | Headless UI Primitives | Studio |
| [Drizzle ORM](https://orm.drizzle.team) | Database ORM (SQLite) | Studio |
| [Cloudflare R2](https://cloudflare.com) | Object Storage | Studio |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Landing Page (this repo)

```bash
git clone https://github.com/konlyzx/landing-betterflow.git
cd landing-betterflow
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000)

### Screenshot Studio

```bash
git clone https://github.com/konlyzx/betterflow.git
cd betterflow
pnpm install
pnpm run dev
```

Open [localhost:3000](http://localhost:3000)

---

## Project Structure

### Landing Page

```
web/
├── app/
│   ├── community/          # Community route (/community)
│   │   └── page.tsx
│   ├── components/
│   │   ├── community/      # Community section components
│   │   ├── mobile/         # Mobile-specific variants
│   │   └── ui/             # Reusable UI primitives
│   ├── sections/           # Landing page sections
│   │   └── mobile/         # Mobile variants
│   ├── globals.css         # Tailwind v4 + custom keyframes
│   ├── layout.tsx          # Root layout (SmoothScroll wrapper)
│   ├── mobile/             # /mobile route
│   └── page.tsx            # Main landing page
├── hooks/                  # Custom React hooks
├── public/                 # Static assets
├── scripts/                # Build utilities
├── AGENTS.md               # AI agent instructions
├── eslint.config.mjs       # ESLint config
├── next.config.ts          # Next.js config
├── postcss.config.mjs      # PostCSS with @tailwindcss/postcss
└── vercel.json             # Vercel deployment config
```

### Screenshot Studio

```
better-flow/
├── app/
│   ├── api/                # API routes (upload, export, proxy)
│   └── page.tsx             # Editor route
├── components/
│   ├── canvas/             # Konva canvas rendering
│   ├── controls/           # Editor control panels
│   ├── editor/             # Editor layout & sections
│   ├── export/             # Export UI controls
│   ├── timeline/           # Animation timeline
│   └── ui/                 # shadcn/ui + custom primitives
├── lib/
│   ├── animation/          # Animation engine & presets
│   ├── constants/          # Backgrounds, mockups, presets
│   ├── export/             # Export pipeline (3 encoders)
│   ├── store/              # Zustand stores (image + editor)
│   └── workers/            # Web workers for export
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── extension/              # Chrome Extension (MV3)
├── drizzle/                # Database schema & migrations
└── AGENTS.md               # AI agent instructions
```

---

## Scripts

### Landing Page

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | TypeScript check + production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

### Screenshot Studio

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Dev server (forced webpack) |
| `pnpm run build` | DB codegen + Next build |
| `pnpm run lint` | Run ESLint |
| `pnpm run db:generate` | Generate Drizzle migrations |
| `pnpm run db:push` | Push schema to database |
| `pnpm run db:studio` | Open Drizzle Studio |

---

## Deployment

Both projects deploy via **Vercel**.

- **Landing Page:** `iad1` region, `pnpm install` / `pnpm build`
- **Studio:** Standard Vercel Next.js deployment, `pnpm run build`

### Environment Variables (Studio)

See [ENVIRONMENT_VARIABLES.md](https://github.com/konlyzx/betterflow/blob/main/ENVIRONMENT_VARIABLES.md) for full list. Key variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Base URL |
| `R2_ACCESS_KEY_ID` | Yes | Cloudflare R2 access key |
| `R2_SECRET_ACCESS_KEY` | Yes | Cloudflare R2 secret key |
| `R2_BUCKET_NAME` | Yes | R2 bucket name |
| `CLOUDFLARE_ACCOUNT_ID` | Yes | Cloudflare account ID |

---

## Performance

- **Zero Telemetry** — No tracking pixels, no analytics cookies, no usage data collection
- **Local-First** — All image processing happens directly in your browser
- **IndexedDB Storage** — Auto-save drafts locally, never lose your work
- **Canvas Optimized** — Hardware-accelerated rendering with Konva

## License

[Apache 2.0](LICENSE) — Commercial use fully permitted.

---

Built with modern open-source technologies. TypeScript-first, locally processed, no telemetry.
