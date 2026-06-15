import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — Better Flow Updates & New Features",
  description:
    "Better Flow changelog: latest updates to the free screenshot beautifier. New browser frames, 3D effects, export formats, and performance improvements. Version history since launch.",
  keywords: [
    "better flow updates",
    "screenshot tool new features",
    "screenshot beautifier changelog",
    "free screenshot editor updates",
    "better flow version history",
    "screenshot studio release notes",
    "screenshot tool improvements",
  ],
  alternates: {
    canonical: "/docs/changelog",
  },
};

export default function ChangelogPage() {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Changelog</h1>
      <p className="docs-paragraph">
        All notable changes to the Better Flow project are documented here.
      </p>
      <p className="docs-paragraph dim">
        The format is based on <a href="https://keepachangelog.com/" className="docs-link">Keep a Changelog</a>, and this project adheres to <a href="https://semver.org/" className="docs-link">Semantic Versioning</a>.
      </p>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Landing Page</h2>

      <h3 className="docs-category-subtitle">0.1.0 &mdash; 2026-06-09</h3>

      <span className="docs-badge">Added</span>
      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">Community Page</span> — New <code className="docs-highlight">/community</code> route with 7 sections</li>
        <li className="docs-list-item"><span className="docs-highlight">UI Components:</span> <code className="docs-highlight">ScrollStack.tsx</code>, <code className="docs-highlight">SpotlightCard.tsx</code></li>
        <li className="docs-list-item"><span className="docs-highlight">Custom Hooks:</span> <code className="docs-highlight">useReducedMotion</code>, <code className="docs-highlight">useParallax</code>, <code className="docs-highlight">useGSAPReveal</code></li>
        <li className="docs-list-item"><span className="docs-highlight">3D Shapes</span> — Decorative <code className="docs-highlight">Shapes3D</code> component using pre-rendered overlay images (torus knot, cube, sphere, icosahedron, cone) from the studio, with mesh/magic gradient atmosphere blobs and moving border effects</li>
        <li className="docs-list-item"><span className="docs-highlight">Custom Docs</span> — Replaced Docusaurus with custom Next.js docs route matching brand dark theme</li>
      </ul>

      <span className="docs-badge" style={{ color: "#3b82f6", borderColor: "rgba(59,130,246,0.15)", background: "rgba(59,130,246,0.08)" }}>Changed</span>
      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">SmoothScroll.tsx</span> — Added <code className="docs-highlight">usePathname()</code> check to disable global Lenis on <code className="docs-highlight">/community</code> route</li>
        <li className="docs-list-item"><span className="docs-highlight">Navbar.tsx</span> — Restored to previous version, improved GitHub icon animation</li>
        <li className="docs-list-item"><span className="docs-highlight">All community cards</span> — Unified to SpotlightCard pattern with mouse-tracking hover</li>
      </ul>

      <span className="docs-badge" style={{ color: "#22c55e", borderColor: "rgba(34,197,94,0.15)", background: "rgba(34,197,94,0.08)" }}>Fixed</span>
      <ul className="docs-list">
        <li className="docs-list-item">Navbar <code className="docs-highlight">handleLinkClick</code> guard for non-fragment hrefs</li>
      </ul>

      <h3 className="docs-category-subtitle">0.0.1 &mdash; 2025-06-03</h3>

      <span className="docs-badge">Added</span>
      <ul className="docs-list">
        <li className="docs-list-item">Initial landing page with Hero, Features, LiveDemo, Privacy, Roadmap, CTA sections</li>
        <li className="docs-list-item">Responsive design with desktop and mobile variants</li>
        <li className="docs-list-item">Lenis smooth scrolling, GSAP ScrollTrigger animations, tsparticles</li>
        <li className="docs-list-item">Tailwind CSS v4, SEO metadata, PWA manifest</li>
      </ul>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Screenshot Studio</h2>

      <h3 className="docs-category-subtitle">0.1.0 &mdash; 2026-06-07</h3>

      <span className="docs-badge" style={{ color: "#ef4444", borderColor: "rgba(239,68,68,0.15)", background: "rgba(239,68,68,0.08)" }}>Security</span>
      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">Next.js</span> — Updated from 16.1.6 to 16.2.7 (fixed 13+ vulnerabilities)</li>
        <li className="docs-list-item"><span className="docs-highlight">eslint-config-next</span> — Updated from 16.1.6 to 16.2.7</li>
        <li className="docs-list-item"><span className="docs-highlight">Transitive dependencies</span> — Updated protobufjs, minimatch, flatted, dompurify, picomatch, fast-xml-parser, defu, brace-expansion, follow-redirects, postcss, effect, esbuild via pnpm overrides</li>
      </ul>

      <p className="docs-paragraph dim" style={{ marginTop: "1em" }}>
        Total vulnerabilities addressed: 45+ | Dependencies updated: 14 packages | Breaking changes: None detected
      </p>

      <h3 className="docs-category-subtitle">0.0.1 &mdash; Initial Release</h3>

      <span className="docs-badge">Added</span>
      <ul className="docs-list">
        <li className="docs-list-item">Full canvas editor with Konva + HTML/CSS dual rendering</li>
        <li className="docs-list-item">100+ backgrounds, browser mockups, device frames</li>
        <li className="docs-list-item">3D transforms with 30+ presets, draw &amp; markup tools</li>
        <li className="docs-list-item">20+ animation presets with timeline editor</li>
        <li className="docs-list-item">Video export via FFmpeg WASM, WebCodecs, MediaRecorder</li>
        <li className="docs-list-item">Chrome Extension (MV3) for screen recording</li>
        <li className="docs-list-item">Zustand state management with undo/redo</li>
      </ul>
    </section>
  );
}
