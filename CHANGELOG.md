# Changelog

All notable changes to the Better Flow project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## Landing Page

### [0.1.0] — 2026-06-09

#### Added

- **Community Page** — New `/community` route with 7 sections:
  - **Hero** — Fullscreen with GradientOrb background, animated gradient text, rotating tagline, GSAP scroll-reactive background
  - **Manifesto** — ScrollStack (React Bits) integration: 4 manifesto cards that stack and blur on scroll. Split layout with sticky text
  - **OpenSource** — 4 ethos cards with framer-motion staggered entrance and glass card style
  - **Activity** — 2×2 dynamic-ready grid with polished empty-state illustrations
  - **ContributionFlow** — 4-step contribution cards with SpotlightCard (React Bits) mouse-tracking hover effect. Each card has a glass-style CTA button linking to GitHub actions (Explore Docs, Join Discussion, Submit PR, Get Involved)
  - **Integrations** — GitHub integration showcase with animated SVG logo and feature list
  - **CTA** — Emotional closing with canvas-based aurora background and GSAP fade-in

- **UI Components:**
  - `ScrollStack.tsx` — React Bits ScrollStack component with internal Lenis for scroll-driven card stacking
  - `SpotlightCard.tsx` — React Bits SpotlightCard with radial gradient mouse-tracking hover effect

- **Custom Hooks:**
  - `useReducedMotion.ts` — Media query listener for `prefers-reduced-motion`
  - `useParallax.ts` — Mouse-driven parallax transform with lerp smoothing
  - `useGSAPReveal.ts` — Reusable GSAP ScrollTrigger reveal hook

#### Changed

- **SmoothScroll.tsx** — Added `usePathname()` check to disable global Lenis on `/community` route (ScrollStack manages its own Lenis)
- **Navbar.tsx** — Added "Community" link, fixed logo navigation on `/community` route (starts with `scrolled: true` for immediate glass background)
- **Lenis + GSAP sync** — `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add()` for unified ticker
- **All community cards** — Unified to match home page card glass style (`rgba(18, 15, 23, 0.45)` with `blur(32px)`)
- **Hero RotatingText** — Now always renders on second line via `<br />` (was breaking to different positions)

#### Fixed

- Framer-motion `ease` array TypeScript errors (added `as const`)
- Unused variable lint warnings across community components
- ScrollStack `any` type replaced with `CardTransform` interface
- Unused `scrollContainer` variable removed from ScrollStack

### [0.0.1] — 2025-06-03

#### Added

- Initial landing page with Hero, Features, LiveDemo, Privacy, Roadmap, CTA sections
- Responsive design with desktop and mobile variants
- Lenis smooth scrolling
- GSAP ScrollTrigger animations
- tsparticles integration
- Tailwind CSS v4 with custom theme variables
- Vercel deployment configuration
- SEO metadata, sitemap, robots.txt, Open Graph, Twitter cards
- PWA manifest with Apple touch icon
- Favicon generation script

---

## Screenshot Studio

### [1.0.0] — 2026-06-15 — **Studio Launch**

#### Added

- **Public launch** — Studio live at https://app.betterflow.site/
- **Website integration** — Navbar "Go Studio" button + Footer "Studio" link now active
- **Cloud deployment** — Production build deployed and verified

---

### [0.1.0] — 2026-06-07

#### Security

- **Next.js** — Updated from 16.1.6 to 16.2.7 (fixed 13+ vulnerabilities: WebSocket SSRF, Middleware/Proxy bypass, DoS, Cache poisoning, XSS, RSC CVE-2026-23870)
- **eslint-config-next** — Updated from 16.1.6 to 16.2.7
- **Transitive dependencies** — Updated protobufjs, minimatch, flatted, dompurify, picomatch, fast-xml-parser, defu, brace-expansion, follow-redirects, postcss, effect, esbuild via pnpm overrides

#### Summary

- Total vulnerabilities addressed: 45+
- Dependencies updated: 14 packages
- Breaking changes: None detected
- Build status: ✅ Successful

### [0.0.1] — Initial Release

#### Added

- Full canvas editor with Konva + HTML/CSS dual rendering
- 100+ backgrounds (gradients, solids, images, blur, noise, mesh)
- Browser mockups (Safari, Chrome light/dark)
- Device frames (Arc, Polaroid, glass, outline, border)
- 3D transforms with 30+ presets
- Draw & markup tools
- Tweet & code snippet import
- 20+ animation presets with timeline editor
- Video export (MP4, WebM, GIF) via FFmpeg WASM, WebCodecs, MediaRecorder
- High-res PNG/JPG export up to 5x scale
- Multi-slide support
- Chrome Extension (MV3) for screen recording
- IndexedDB auto-save drafts
- Zustand state management with undo/redo
- Drizzle ORM with SQLite (Cloudflare D1 + local)
- Cloudflare R2 storage integration
- Firebase authentication
- Optional PostHog analytics
