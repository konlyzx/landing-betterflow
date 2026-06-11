import Link from "next/link";
import CodeBlock from "@/app/components/docs/CodeBlock";

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-code" style={{ marginBottom: "1.8em" }}>
      <pre className="docs-pre" style={{ padding: "0", overflow: "hidden" }}>
        {children}
      </pre>
    </div>
  );
}

export default function ContributingPage() {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Contributing</h1>
      <p className="docs-paragraph">
        Thank you for your interest in Better Flow! Both the landing page and the screenshot studio are open source and welcome contributions.
      </p>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Code of Conduct</h2>
      <p className="docs-paragraph">
        This project follows the <a href="https://www.contributor-covenant.org/" className="docs-link">Contributor Covenant</a>. By participating, you are expected to uphold this code. Report unacceptable behavior to <a href="mailto:hello@betterflow.site" className="docs-link">hello@betterflow.site</a>.
      </p>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Prerequisites</h2>
      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">Node.js 18+</span> (LTS recommended)</li>
        <li className="docs-list-item"><span className="docs-highlight">pnpm</span> (required — do not use npm or yarn)</li>
      </ul>
      <CodeBlock>{`npm install -g pnpm`}</CodeBlock>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Getting Started</h2>

      <h3 className="docs-category-subtitle">Landing Page</h3>
      <CodeBlock>{`git clone https://github.com/konlyzx/landing-betterflow.git
cd landing-betterflow
pnpm install
pnpm dev`}</CodeBlock>

      <h3 className="docs-category-subtitle">Screenshot Studio</h3>
      <CodeBlock>{`git clone https://github.com/konlyzx/betterflow.git
cd betterflow
pnpm install
pnpm run dev`}</CodeBlock>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Coding Standards</h2>

      <h3 className="docs-category-subtitle">General</h3>
      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">TypeScript strict mode</span> enabled — avoid using <code className="docs-highlight">any</code></li>
        <li className="docs-list-item"><span className="docs-highlight">Functional components</span> with named exports</li>
        <li className="docs-list-item"><span className="docs-highlight">Client components:</span> Add <code className="docs-highlight">{'"use client"'}</code> at the top of every component that uses hooks, events, or browser APIs</li>
        <li className="docs-list-item"><span className="docs-highlight">File naming:</span> <code className="docs-highlight">PascalCase.tsx</code> for components, <code className="docs-highlight">kebab-case.ts</code> for utilities</li>
        <li className="docs-list-item"><span className="docs-highlight">Path alias:</span> <code className="docs-highlight">@/*</code> maps to project root</li>
      </ul>

      <h3 className="docs-category-subtitle">Animation Conventions</h3>
      <Table>
        <table>
          <thead>
            <tr><th className="docs-highlight" style={{ fontSize: "13px", textAlign: "left", padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-primary)" }}>Use Case</th><th className="docs-highlight" style={{ fontSize: "13px", textAlign: "left", padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-primary)" }}>Library</th></tr>
          </thead>
          <tbody>
            {[
              ["Page entrances, stagger, hover", "framer-motion (default)"],
              ["Scroll-driven animations, pinning", "GSAP + ScrollTrigger"],
              ["Smooth scrolling", "Lenis (global via root layout)"],
            ].map(([useCase, lib], i) => (
              <tr key={i}>
                <td style={{ padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-secondary)", fontSize: "14px", color: "var(--bf-text-secondary)" }}>{useCase}</td>
                <td style={{ padding: "0.5em 1em", borderBottom: "1px solid var(--bf-border-secondary)", fontSize: "14px", color: "var(--bf-text-secondary)" }}><code className="docs-highlight">{lib}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>

      <ul className="docs-list">
        <li className="docs-list-item">GSAP-heavy components must use <code className="docs-highlight">dynamic(() =&gt; import(...), {'{ ssr: false }'})</code></li>
        <li className="docs-list-item">Always respect <code className="docs-highlight">prefers-reduced-motion</code> via <code className="docs-highlight">useReducedMotion()</code> hook</li>
        <li className="docs-list-item">Use <code className="docs-highlight">as const</code> on framer-motion <code className="docs-highlight">ease</code> arrays to satisfy strict TypeScript</li>
      </ul>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Submitting Changes</h2>

      <h3 className="docs-category-subtitle">Branch Naming</h3>
      <CodeBlock>{`feature/description     # New features
fix/description         # Bug fixes
refactor/description    # Code refactoring
docs/description        # Documentation
chore/description       # Maintenance`}</CodeBlock>

      <h3 className="docs-category-subtitle">Commit Conventions</h3>
      <p className="docs-paragraph short">
        Use <a href="https://www.conventionalcommits.org/" className="docs-link">conventional commits</a>:
      </p>
      <CodeBlock>{`feat: add 3D perspective controls
fix: resolve canvas resize flicker
docs: update API reference
refactor: extract export pipeline
chore: bump dependencies`}</CodeBlock>

      <h3 className="docs-category-subtitle">PR Checklist</h3>
      <ul className="docs-list">
        <li className="docs-list-item">TypeScript compiles without errors (<code className="docs-highlight">pnpm build</code>)</li>
        <li className="docs-list-item">ESLint passes (<code className="docs-highlight">pnpm lint</code>)</li>
        <li className="docs-list-item">Follows coding standards (strict types, no <code className="docs-highlight">any</code>, named exports)</li>
        <li className="docs-list-item">Respects reduced motion preferences</li>
        <li className="docs-list-item">No hardcoded colors or values (uses CSS variables)</li>
        <li className="docs-list-item">Branch is up to date with main</li>
      </ul>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Getting Help</h2>
      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">GitHub Discussions:</span> <a href="https://github.com/betterspacx" className="docs-link">github.com/betterspacx</a></li>
        <li className="docs-list-item"><span className="docs-highlight">Email:</span> <a href="mailto:hello@betterflow.site" className="docs-link">hello@betterflow.site</a></li>
        <li className="docs-list-item"><span className="docs-highlight">Twitter/X:</span> <a href="https://x.com/betterflow" className="docs-link">@betterflow</a></li>
      </ul>
    </section>
  );
}
