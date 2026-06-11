# Architecture

Better Flow consists of two separate codebases: the **Landing Page** (marketing + community site) and the **Screenshot Studio** (full canvas editor). This document covers the architecture of both.

---

## Landing Page (`web`)

### Overview

A Next.js 16 App Router site with no server components — every route and component uses `"use client"`. The site serves as both a marketing landing page and a community hub.

### Routing

| Route | Description |
|-------|-------------|
| `/` | Main landing page with responsive desktop/mobile variants |
| `/mobile` | Dedicated mobile route duplicating the landing page |
| `/community` | Community page with Manifesto, Contribution Flow, Open Source ethos, Activity, Integrations, CTA |

### Component Architecture

```
app/
├── page.tsx               # Main landing — renders desktop sections (md:block)
│                          # and mobile sections (md:hidden) side-by-side
├── mobile/page.tsx        # /mobile route — same as main page but mobile-only
├── community/page.tsx     # Community route — dynamic imports for GSAP-heavy sections
├── components/
│   ├── community/         # Community page sections (Hero, Manifesto, etc.)
│   ├── mobile/            # Mobile variants of landing sections
│   ├── ui/                # Reusable primitives (ScrollStack, SpotlightCard, etc.)
│   ├── Navbar.tsx         # Shared navigation
│   └── Footer.tsx         # Shared footer
├── sections/              # Landing page sections
│   ├── Hero.tsx           # Fullscreen hero with GradientOrb + rotating text
│   ├── Features.tsx       # Feature showcase
│   ├── LiveDemo.tsx       # Interactive product demo area
│   ├── Privacy.tsx        # Zero-telemetry messaging
│   ├── RoadmapSection.tsx # Version milestone timeline
│   └── CTA.tsx            # Final call-to-action
│   └── mobile/            # Mobile variants (HeroMobile, FeaturesMobile, etc.)
└── hooks/                 # Custom hooks (useReducedMotion, useParallax, useGSAPReveal)
```

### Animation Architecture

Three animation libraries coexist with clear boundaries:

| Library | Purpose | Sections |
|---------|---------|----------|
| **framer-motion** | UI entrances, hover effects, stagger children, `whileInView` triggers | OpenSource, Activity, mobile sections, most card animations |
| **GSAP + ScrollTrigger** | Pinned scrolling sections, parallax, scrub-based animations | ContributionFlow scroll-triggered reveals |
| **Lenis** | Smooth scroll engine for the entire page | Wraps root layout via `<SmoothScroll>` |

**Lenis + GSAP Sync:** `SmoothScroll.tsx` in the root layout integrates both via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add()`. On the `/community` route, the global Lenis is disabled — the ScrollStack component creates its own Lenis instance for the manifest cards.

**SSR Strategy:** GSAP-heavy sections (`Manifesto`, `ContributionFlow`, `Integrations`, `CTA`) are loaded via `next/dynamic` with `{ ssr: false }` to avoid SSR issues with window-dependent animation libraries.

### UI Component Patterns

- **Card Style:** `rgba(18, 15, 23, 0.45)` background, `backdropFilter: blur(32px) saturate(1.3)`, `1px solid rgba(255, 255, 255, 0.08)` border, `rounded-xl`
- **Typography:** Dark theme with white text (`#f4f4f5`), secondary (`#a1a1aa`), tertiary (`#71717a`)
- **Brand Colors:** Orange `#ff7e40`, Pink `#ff4b72`, Purple `#a445ff`
- **Buttons:** Glass-style with subtle borders, glow gradient buttons for primary CTAs

### Community Page Sections

| Section | Key Tech | Description |
|---------|----------|-------------|
| **Hero** | Framer Motion, CSS gradients | Fullscreen hero with GradientOrb background, animated "Better" gradient text, RotatingText component (stays on second line) |
| **Manifesto** | ScrollStack (React Bits) | 4 manifesto cards that stack and blur as the user scrolls. Split layout: sticky text left, ScrollStack cards right. Hover glow from top-right corner |
| **OpenSource** | Framer Motion stagger | 4 ethos cards with staggered entrance animation, reusing the home page card style |
| **Activity** | Framer Motion, empty states | 2×2 dynamic-ready grid with polished empty-state illustrations |
| **ContributionFlow** | SpotlightCard (React Bits) | 4 contribution step cards (Discover, Discuss, Contribute, Build Together) with spotlight mouse-tracking hover effect. Each card has a glass-style CTA button linking to GitHub |
| **Integrations** | Animated SVG | GitHub integration showcase with animated logo and feature list |
| **CTA** | Aurora canvas, GSAP | Emotional closing section with canvas-based aurora background |

### Data Flow

- **No API routes** — the landing page is fully static, no backend dependencies
- **No environment variables** needed for development
- **SEO** via `metadata` exports in `layout.tsx`, `sitemap.xml`, `robots.txt`
- **Analytics:** None — zero telemetry by design

---

## Screenshot Studio (`better-flow`)

### Overview

A full browser-based screenshot editor using Next.js 16 with React 19. Canvas rendering via Konva, video export via FFmpeg WASM, state management via Zustand with undo/redo.

### Canvas Rendering Architecture

The editor uses a **dual rendering approach**:

1. **HTML/CSS Layer** — Backgrounds, shadows, borders, text overlays, annotations (styled with Tailwind)
2. **Konva Canvas Layer** — Main image rendering, overlays, and 3D perspective transforms

Rendering flow:

```
User Action → Zustand Store Update → useEditorStore triggers
  → HTMLCanvasRenderer re-renders HTML layers
  → EditorCanvas re-renders Konva layers
  → OverlayToolbar updates interaction handles
  → Blob URL updated for export capture
```

### State Management

Dual Zustand store pattern:

| Store | Purpose | Features |
|-------|---------|----------|
| `useImageStore` | Image source, processing state, upload status | Undo/redo via zundo, temporary blob URLs |
| `useEditorStore` | All editor settings (background, border, shadow, 3D, text, annotations) | 50+ state keys, middleware for persistence |

### Export Pipeline

4-stage compositing:

```
1. HTML Render (html2canvas / modern-screenshot)
   → Captures styled HTML layers (background, shadows, borders, annotations)
2. Konva Render
   → Captures Konva canvas (main image, 3D transforms, overlays)
3. Composite
   → Merges HTML + Konva captures into final image
4. Encode
   → PNG/JPG for images, FFmpeg WASM / WebCodecs / MediaRecorder for video
```

### Export Encoders

| Encoder | Format | Technology | Use Case |
|---------|--------|------------|----------|
| FFmpegEncoder | MP4, WebM, GIF | @ffmpeg/ffmpeg WASM (v0.12.15) | Full-featured video export |
| WebCodecsEncoder | MP4 | WebCodecs API + mp4-muxer | Hardware-accelerated video |
| MediaRecorder | WebM | MediaRecorder API | Simple video capture |

### Video Export System

3 encoder paths:

```
Animation Timeline → Frame Renderer → Encoder Selection
  ├── FFmpegEncoder (default) → MP4/WebM/GIF
  ├── WebCodecsEncoder (fast) → MP4
  └── MediaRecorder (simple) → WebM
```

### Animation System

- **20+ presets** in 5 categories (Fade, Slide, Scale, Rotate, Complex)
- **Timeline Editor** with keyframe markers, playhead, ruler, and track controls
- **Interpolation engine** supporting linear, ease, ease-in, ease-out, ease-in-out, and custom cubic beziers

### API Routes

| Route | Purpose |
|-------|---------|
| `POST /api/upload-url` | Generate presigned R2 upload URL |
| `POST /api/upload-video` | Chrome extension video upload |
| `GET /api/image-proxy` | CORS-safe R2 proxy for images |
| `POST /api/export` | Server-side image export (Sharp-based) |
| `POST /api/cleanup-cache` | Cache cleanup cron endpoint |
| `GET /api/screenshot` | External website screenshot service |
| `GET /api/tweet/[id]` | Tweet import (oEmbed) |

### Browser Storage

| Storage | Purpose |
|---------|---------|
| IndexedDB (image-blobs) | Original uploaded images |
| IndexedDB (exports) | Export history |
| IndexedDB (export-preferences) | User export settings |
| LocalStorage | Editor preferences |

### Chrome Extension

MV3 extension with:

| Component | Technology | Purpose |
|-----------|------------|---------|
| Service Worker | background.js | State management, messaging |
| Popup | popup.html/css/js | UI for capture controls |
| Offscreen Document | offscreen.html/js | MediaRecorder implementation |
| Result Page | result.html/css/js | Recording preview and download |

Permissions: `desktopCapture`, `tabs`, `activeTab`, `storage`, `offscreen`, `scripting`

### Database

SQLite via Drizzle ORM with two tables:

- **projects** — Stores user projects (id, userId, name, timestamps)
- **assets** — Stores project assets (id, projectId, type, url, path, timestamps)

Used with both Cloudflare D1 (production) and local SQLite (development).

### Security

- **COOP/COEP headers** on `/editor` routes for SharedArrayBuffer (FFmpeg)
- **Rate limiting** on API routes
- **Input validation** and size limits on uploads
- **No telemetry** by default (PostHog optional)

---

## Cross-Project Integration

The two codebases are independent but share:

- **Brand identity:** Same color palette, typography, design language
- **GitHub organization:** [github.com/konlyzx](https://github.com/konlyzx)
- **Domain:** betterflow.site (landing page) → links to app.betterflow.site (studio)
- **License:** Apache 2.0
