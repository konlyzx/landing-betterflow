import Link from "next/link";
import CodeBlock from "@/app/components/docs/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Better Flow technical architecture — Landing page and Screenshot Studio structure, animation patterns, and canvas rendering pipeline. Next.js 16, Konva, FFmpeg WASM.",
  keywords: [
    "better flow architecture",
    "screenshot studio architecture",
    "konva canvas rendering",
    "ffmpeg wasm export",
    "next.js 16 app router",
    "technical documentation",
  ],
  alternates: {
    canonical: "/docs/architecture",
  },
};

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-code" style={{ marginBottom: "1.8em" }}>
      <pre className="docs-pre" style={{ padding: "0", overflow: "hidden" }}>
        {children}
      </pre>
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Architecture</h1>
      <p className="docs-paragraph">
        Better Flow consists of two separate codebases: the <strong className="docs-highlight">Landing Page</strong> (marketing + community site) and the <strong className="docs-highlight">Screenshot Studio</strong> (full canvas editor). This document covers the architecture of both.
      </p>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Landing Page (<code className="docs-highlight">web</code>)</h2>

      <h3 className="docs-category-subtitle">Overview</h3>
      <p className="docs-paragraph">
        A Next.js 16 App Router site with no server components — every route and component uses <code className="docs-highlight">&quot;use client&quot;</code>. The site serves as both a marketing landing page and a community hub.
      </p>

      <h3 className="docs-category-subtitle">Routing</h3>
      <Table>
        <table>
          <thead>
            <tr><th className="docs-highlight" style={{ fontSize: "13px", textAlign: "left", padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-primary)" }}>Route</th><th className="docs-highlight" style={{ fontSize: "13px", textAlign: "left", padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-primary)" }}>Description</th></tr>
          </thead>
          <tbody>
            {[
              ["/", "Main landing page with responsive desktop/mobile variants"],
              ["/mobile", "Dedicated mobile route duplicating the landing page"],
              ["/community", "Community page with Manifesto, Contribution Flow, Open Source ethos, Activity, Integrations, CTA"],
              ["/docs", "Documentation (this site)"],
            ].map(([route, desc], i) => (
              <tr key={i}>
                <td style={{ padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-secondary)", fontSize: "14px" }}><code className="docs-highlight">{route}</code></td>
                <td style={{ padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-secondary)", fontSize: "14px", color: "var(--bf-text-secondary)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>

      <h3 className="docs-category-subtitle">Component Architecture</h3>
      <CodeBlock>{`app/
├── page.tsx               # Main landing
├── mobile/page.tsx        # Mobile route
├── community/page.tsx     # Community route
├── docs/                  # Documentation
├── components/
│   ├── community/         # Community page sections
│   ├── mobile/            # Mobile variants
│   ├── ui/                # ScrollStack, SpotlightCard, etc.
│   ├── Navbar.tsx         # Shared navigation
│   └── Footer.tsx         # Shared footer
├── sections/              # Landing page sections
└── hooks/                 # Custom hooks`}</CodeBlock>

      <h3 className="docs-category-subtitle">Animation Architecture</h3>
      <Table>
        <table>
          <thead>
            <tr><th className="docs-highlight" style={{ fontSize: "13px", textAlign: "left", padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-primary)" }}>Library</th><th className="docs-highlight" style={{ fontSize: "13px", textAlign: "left", padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-primary)" }}>Purpose</th></tr>
          </thead>
          <tbody>
            {[
              ["framer-motion", "UI entrances, hover effects, stagger children, whileInView triggers"],
              ["GSAP + ScrollTrigger", "Pinned scrolling sections, parallax, scrub-based animations"],
              ["Lenis", "Smooth scroll engine for the entire page"],
            ].map(([lib, purpose], i) => (
              <tr key={i}>
                <td style={{ padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-secondary)", fontSize: "14px", color: "var(--bf-text-secondary)" }}><strong className="docs-highlight">{lib}</strong></td>
                <td style={{ padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-secondary)", fontSize: "14px", color: "var(--bf-text-secondary)" }}>{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>

      <h3 className="docs-category-subtitle">UI Component Patterns</h3>
      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">Card Style:</span> <code className="docs-highlight">rgba(18, 15, 23, 0.45)</code> background, <code className="docs-highlight">backdropFilter: blur(32px) saturate(1.3)</code>, <code className="docs-highlight">1px solid rgba(255, 255, 255, 0.08)</code> border</li>
        <li className="docs-list-item"><span className="docs-highlight">Typography:</span> Dark theme with white text, secondary <code className="docs-highlight">#a1a1aa</code>, tertiary <code className="docs-highlight">#71717a</code></li>
        <li className="docs-list-item"><span className="docs-highlight">Brand Colors:</span> Orange <code className="docs-highlight">#ff7e40</code>, Pink <code className="docs-highlight">#ff4b72</code>, Purple <code className="docs-highlight">#a445ff</code></li>
        <li className="docs-list-item"><span className="docs-highlight">Buttons:</span> Glass-style with subtle borders, glow gradient buttons for primary CTAs</li>
      </ul>

      <h3 className="docs-category-subtitle">Community Page Sections</h3>
      <Table>
        <table>
          <thead>
            <tr><th className="docs-highlight" style={{ fontSize: "13px", textAlign: "left", padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-primary)" }}>Section</th><th className="docs-highlight" style={{ fontSize: "13px", textAlign: "left", padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-primary)" }}>Key Tech</th></tr>
          </thead>
          <tbody>
            {[
              ["Hero", "Framer Motion, CSS gradients, Shapes3D"],
              ["Manifesto", "ScrollStack (React Bits), SpotlightCard"],
              ["OpenSource", "Framer Motion stagger, SpotlightCard"],
              ["Activity", "Framer Motion, SpotlightCard"],
              ["ContributionFlow", "SpotlightCard (mouse-tracking)"],
              ["Integrations", "Animated SVG, SpotlightCard"],
              ["CTA", "Aurora canvas, GSAP, Shapes3D"],
            ].map(([section, tech], i) => (
              <tr key={i}>
                <td style={{ padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-secondary)", fontSize: "14px", color: "var(--bf-text-secondary)" }}><strong className="docs-highlight">{section}</strong></td>
                <td style={{ padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-secondary)", fontSize: "14px", color: "var(--bf-text-secondary)" }}>{tech}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Screenshot Studio (<code className="docs-highlight">better-flow</code>)</h2>

      <h3 className="docs-category-subtitle">Overview</h3>
      <p className="docs-paragraph">
        A full browser-based screenshot editor using Next.js 16 with React 19. Canvas rendering via Konva, video export via FFmpeg WASM, state management via Zustand with undo/redo.
      </p>

      <h3 className="docs-category-subtitle">Canvas Rendering Architecture</h3>
      <p className="docs-paragraph">
        The editor uses a <strong className="docs-highlight">dual rendering approach</strong>:
      </p>
      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">HTML/CSS Layer</span> — Backgrounds, shadows, borders, text overlays, annotations (styled with Tailwind)</li>
        <li className="docs-list-item"><span className="docs-highlight">Konva Canvas Layer</span> — Main image rendering, overlays, and 3D perspective transforms</li>
      </ul>

      <h3 className="docs-category-subtitle">State Management</h3>
      <p className="docs-paragraph">
        Dual Zustand store pattern: <strong className="docs-highlight">useImageStore</strong> (image source, processing, upload, undo/redo via zundo) and <strong className="docs-highlight">useEditorStore</strong> (all editor settings — background, border, shadow, 3D, text, annotations).
      </p>

      <h3 className="docs-category-subtitle">Export Pipeline</h3>
      <p className="docs-paragraph">
        4-stage compositing: HTML Render → Konva Render → Composite → Encode. Supports PNG/JPG for images, FFmpeg WASM / WebCodecs / MediaRecorder for video.
      </p>

      <h3 className="docs-category-subtitle">Animation System</h3>
      <ul className="docs-list">
        <li className="docs-list-item">20+ presets in 5 categories (Fade, Slide, Scale, Rotate, Complex)</li>
        <li className="docs-list-item">Timeline Editor with keyframe markers, playhead, ruler, and track controls</li>
        <li className="docs-list-item">Interpolation engine supporting linear, ease, ease-in, ease-out, ease-in-out, and custom cubic beziers</li>
      </ul>

      <hr className="docs-separator" />

      <p className="docs-paragraph dim">
        See the <Link href="/docs/contributing" className="docs-link">Contributing</Link> guide for development setup and standards. Full changelog available <Link href="/docs/changelog" className="docs-link">here</Link>.
      </p>
    </section>
  );
}
