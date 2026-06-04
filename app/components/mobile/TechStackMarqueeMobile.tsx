"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechInfo {
  name: string;
  description: string;
  role: string;
  website: string;
}

const TECH_DATA: Record<string, TechInfo> = {
  React: {
    name: "React",
    description: "A JavaScript library for building user interfaces. Created by Meta, it enables fast, declarative UI rendering with components, hooks, and virtual DOM diffing.",
    role: "UI Framework",
    website: "react.dev",
  },
  "shadcn/ui": {
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS. Copy-paste ready, fully accessible, and endlessly customizable.",
    role: "Component Library",
    website: "ui.shadcn.com",
  },
  "Next.js": {
    name: "Next.js",
    description: "The React Framework for production. Handles routing, SSR, static generation, and edge deployment with zero config.",
    role: "App Framework",
    website: "nextjs.org",
  },
  "Tailwind CSS": {
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid UI development. Write inline utility classes instead of custom CSS.",
    role: "Styling Engine",
    website: "tailwindcss.com",
  },
};

const badges = [
  {
    name: "React",
    url: "https://newshields.vercel.app/api/badge.svg?label=Built%20with&title=React&icon=react_dark&theme=midnight",
    alt: "Built with React",
  },
  {
    name: "shadcn/ui",
    url: "/icons/shadcn_ui.svg",
    alt: "Built with shadcn/ui",
  },
  {
    name: "Next.js",
    url: "/icons/next.js.svg",
    alt: "Built with Next.js",
  },
  {
    name: "Tailwind CSS",
    url: "/icons/tailwind-css.svg",
    alt: "Built with Tailwind CSS",
  },
];

export default function TechStackMarqueeMobile() {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const handleClick = (name: string) => {
    if (activeTech === name) {
      setActiveTech(null);
    } else {
      setActiveTech(name);
    }
  };

  return (
    <>
      <section className="relative z-10 py-6 px-4">
        <p className="text-center text-xs text-[#71717a] mb-5 leading-relaxed max-w-[280px] mx-auto">
          Built with{" "}
          <strong className="text-[#a1a1aa] font-semibold">
            modern open-source
          </strong>{" "}
          technologies. TypeScript-first, locally processed, no telemetry.
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-[300px] mx-auto">
          {badges.map((b) => (
            <motion.button
              key={b.name}
              onClick={() => handleClick(b.name)}
              whileTap={{ scale: 0.96 }}
              className={`relative flex items-center justify-center h-12 rounded-xl overflow-hidden cursor-pointer select-none border transition-all duration-200 ${
                activeTech === b.name
                  ? "border-white/20 bg-white/[0.05]"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              <img src={b.url} alt={b.alt} className="h-8 w-auto" draggable={false} />
            </motion.button>
          ))}
        </div>

        <p className="text-center text-[10px] text-white/30 mt-3">
          Tap a card to learn more
        </p>
      </section>

      <AnimatePresence>
        {activeTech && TECH_DATA[activeTech] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 overflow-hidden px-4"
          >
            <div className="max-w-[400px] mx-auto py-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={badges.find((b) => b.name === activeTech)?.url}
                      alt={activeTech}
                      className="h-8 rounded-lg"
                      draggable={false}
                    />
                    <div className="mt-2 text-[9px] uppercase tracking-widest text-[#71717a] font-medium text-center">
                      {TECH_DATA[activeTech].role}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {TECH_DATA[activeTech].name}
                    </h3>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">
                      {TECH_DATA[activeTech].description}
                    </p>
                    <a
                      href={`https://${TECH_DATA[activeTech].website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-[10px] text-[#c9d4ff] hover:text-white transition-colors"
                    >
                      Visit {TECH_DATA[activeTech].website}
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="opacity-70">
                        <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTech(null)}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
