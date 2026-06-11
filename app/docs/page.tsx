import Link from "next/link";
import CodeBlock from "@/app/components/docs/CodeBlock";

export default function DocsPage() {
  return (
    <section className="docs-section">
      <span className="docs-badge">Documentation</span>
      <h1 className="docs-category-title">Introduction</h1>
      <p className="docs-paragraph">
        Welcome to the <strong className="docs-highlight">Better Flow</strong> documentation. Better Flow is an open-source project made of two codebases: a marketing + community <strong className="docs-highlight">Landing Page</strong> and a full browser-based <strong className="docs-highlight">Screenshot Studio</strong>.
      </p>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Tech Stack</h2>
      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">Framework:</span> Next.js 16 (App Router)</li>
        <li className="docs-list-item"><span className="docs-highlight">Styling:</span> Tailwind CSS v4</li>
        <li className="docs-list-item"><span className="docs-highlight">Animation:</span> framer-motion, GSAP, Lenis</li>
        <li className="docs-list-item"><span className="docs-highlight">Package Manager:</span> pnpm</li>
      </ul>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Quick Start</h2>
      <p className="docs-paragraph short">Clone the repository and start the development server:</p>
      <CodeBlock>{`git clone https://github.com/betterspacx/betterflow.git
cd betterflow
pnpm install
pnpm dev`}</CodeBlock>

      <hr className="docs-separator" />

      <h2 className="docs-category-title">Explore the Docs</h2>
      <ul className="docs-list">
        <li className="docs-list-item">
          <Link href="/docs/architecture" className="docs-link">Architecture</Link> — Codebase structure, routing, animation strategy, and the Screenshot Studio rendering pipeline.
        </li>
        <li className="docs-list-item">
          <Link href="/docs/contributing" className="docs-link">Contributing</Link> — Setup, coding standards, animation conventions, and the PR workflow.
        </li>
        <li className="docs-list-item">
          <Link href="/docs/changelog" className="docs-link">Changelog</Link> — Version history and release notes for both codebases.
        </li>
      </ul>

      <hr className="docs-separator" />

      <p className="docs-paragraph dim">
        Better Flow is open source under the Apache 2.0 License.
      </p>
    </section>
  );
}
