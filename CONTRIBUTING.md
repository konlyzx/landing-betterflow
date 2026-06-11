# Contributing

Thank you for your interest in Better Flow! Both the landing page and the screenshot studio are open source and welcome contributions.

---

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Report unacceptable behavior to [hello@betterflow.site](mailto:hello@betterflow.site).

---

## Prerequisites

- **Node.js 18+** (LTS recommended)
- **pnpm** (required — do not use npm or yarn)

```bash
npm install -g pnpm
```

---

## Getting Started

### Landing Page

```bash
git clone https://github.com/konlyzx/landing-betterflow.git
cd landing-betterflow
pnpm install
pnpm dev
```

### Screenshot Studio

```bash
git clone https://github.com/konlyzx/betterflow.git
cd betterflow
pnpm install
pnpm run dev
```

---

## Project Structure

See [ARCHITECTURE.md](ARCHITECTURE.md) for a detailed breakdown of both codebases.

---

## Coding Standards

### General

- **TypeScript strict mode** enabled — avoid using `any`
- **Functional components** with named exports (not default exports)
- **Client components:** Add `"use client"` directive at the top of every component that uses hooks, events, or browser APIs
- **File naming:** `PascalCase.tsx` for components, `kebab-case.ts` for utilities
- **Path alias:** `@/*` maps to project root (configured in `tsconfig.json`)

### TypeScript

```typescript
// Good — strict types
interface Props {
  title: string;
  description?: string;
}

// Avoid — loose types
interface Props {
  title: any;
  description: string | undefined;
}
```

### React

```typescript
// Good — functional component with named export
export function MyComponent({ title }: { title: string }) {
  return <div>{title}</div>;
}

// Avoid — default exports for components
export default function MyComponent() { ... }
```

### Styling (Landing Page)

- **Tailwind CSS v4** with `@import "tailwindcss"` in CSS
- No `tailwind.config.js` — use CSS `@theme` directives for custom values
- Use CSS variables defined in `globals.css` for consistency
- All cards use the standard glass style:
  ```css
  background: rgba(18, 15, 23, 0.45);
  backdrop-filter: blur(32px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  ```

### Styling (Studio)

- **Tailwind CSS v4** with CSS theme variables only — no hardcoded colors
- Use `var(--color-*)` custom properties defined in `globals.css`
- shadcn/ui components use `cn()` utility from `@/lib/utils`

### Animation Conventions

| Use Case | Library | When |
|----------|---------|------|
| Page entrances, stagger, hover | framer-motion | Default choice |
| Scroll-driven animations, pinning | GSAP + ScrollTrigger | Complex scroll choreography |
| Smooth scrolling | Lenis | Enabled globally via root layout |

- GSAP-heavy components must use `dynamic(() => import(...), { ssr: false })`
- Always respect `prefers-reduced-motion` via `useReducedMotion()` hook
- Use `as const` on framer-motion `ease` arrays to satisfy strict TypeScript

---

## Common Tasks

### Landing Page

#### Add a new community section

1. Create the component in `app/components/community/`
2. If it uses GSAP or `useLayoutEffect`, import it via `dynamic(..., { ssr: false })` in the page
3. Import and render it in `app/community/page.tsx`
4. Ensure the component uses the standard card glass style

#### Modify the manifest card stack

- Cards are rendered via `<ScrollStack>` from React Bits
- Adjust `itemDistance`, `itemScale`, `itemStackDistance` for stacking behavior
- Each card is a `<ScrollStackItem>` with glass styling

#### Add a hover effect to a card

- Use framer-motion `whileHover` for simple effects
- For spotlight tracking, wrap with `<SpotlightCard>` component

### Screenshot Studio

#### Add a new control

1. Create the control component in `components/controls/`
2. Add the corresponding section in `components/editor/sections/`
3. Wire up state via `useEditorStore` (Zustand)
4. If it affects the canvas, update `components/canvas/EditorCanvas.tsx`

#### Add a browser mockup style

1. Define the mockup in `lib/constants/mockups.ts`
2. Create the toolbar component in `components/canvas/frames/`
3. Add the rendering logic in `components/canvas/HTMLCanvasRenderer.tsx`
4. Add the control UI in `components/editor/sections/BrowserMockupSection.tsx`

#### Add a new background type

1. Add background data to `lib/constants/backgrounds.ts`
2. Implement rendering in `components/canvas/html/HTMLBackgroundLayer.tsx`
3. Add control UI in `components/editor/sections/BackgroundSection.tsx`

#### Add an animation preset

1. Add the preset definition to `lib/animation/presets.ts`
2. It will automatically appear in the `AnimationPresetGallery`

#### Modify export logic

- **Image export:** Update `lib/export/export-service.ts`
- **Video export:** Update one of the encoders in `lib/export/`
- **Export UI:** Update `components/export/`

---

## Submitting Changes

### Branch Naming

```
feature/description     # New features
fix/description         # Bug fixes
refactor/description    # Code refactoring
docs/description        # Documentation
chore/description       # Maintenance
```

### Commit Conventions

Use [conventional commits](https://www.conventionalcommits.org/):

```
feat: add 3D perspective controls
fix: resolve canvas resize flicker
docs: update API reference
refactor: extract export pipeline
chore: bump dependencies
```

### PR Checklist

- [ ] TypeScript compiles without errors (`pnpm build`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] Follows coding standards (strict types, no `any`, named exports)
- [ ] Respects reduced motion preferences
- [ ] No hardcoded colors or values (uses CSS variables)
- [ ] Branch is up to date with main

---

## Bug Reports

Open an issue on the relevant repository:

- **Landing Page:** [github.com/konlyzx/landing-betterflow/issues](https://github.com/konlyzx/landing-betterflow/issues)
- **Screenshot Studio:** [github.com/konlyzx/betterflow/issues](https://github.com/konlyzx/betterflow/issues)

Include:
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if applicable

---

## Getting Help

- **GitHub Discussions:** [github.com/konlyzx/betterflow/discussions](https://github.com/konlyzx/betterflow/discussions)
- **Email:** [hello@betterflow.site](mailto:hello@betterflow.site)
- **Twitter/X:** [@betterflow](https://x.com/betterflow)
