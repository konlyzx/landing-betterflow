"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "./Marquee";

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

function TechBadge({
  name,
  url,
  alt,
  onHoverStart,
  onHoverEnd,
  onClick,
  isActive,
}: {
  name: string;
  url: string;
  alt: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <motion.button
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`relative flex items-center justify-center h-10 rounded-lg overflow-hidden cursor-pointer select-none my-2 ${
        isActive ? "ring-1 ring-white/20" : ""
      }`}
    >
      <img src={url} alt={alt} className="h-full w-auto rounded-lg" draggable={false} />
    </motion.button>
  );
}

export default function TechStackMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const activeTechRef = useRef<string | null>(null);

  useEffect(() => {
    activeTechRef.current = activeTech;
  }, [activeTech]);

  const handleHoverStart = useCallback(() => setIsPaused(true), []);
  const handleHoverEnd = useCallback(() => {
    if (!activeTechRef.current) setIsPaused(false);
  }, []);

  const handleClick = useCallback(
    (name: string) => {
      if (activeTech === name) {
        setActiveTech(null);
        activeTechRef.current = null;
        setIsPaused(false);
        return;
      }
      activeTechRef.current = name;
      setIsPaused(true);
      if (
        typeof document !== "undefined" &&
        "startViewTransition" in document
      ) {
        const doc = document as Document & {
          startViewTransition?: (cb: () => void) => void;
        };
        doc.startViewTransition?.(() => {
          setActiveTech(name);
        });
      } else {
        setActiveTech(name);
      }
    },
    [activeTech]
  );

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

  return (
    <>
      <section className="relative z-10 border border-white/10 bg-white/[0.01] py-8 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <div className="text-center -ml-15 md:text-left text-xs text-[#71717a] max-w-[280px] leading-relaxed">
            Built with{" "}
            <strong className="text-[#a1a1aa] font-semibold">
              modern open-source
            </strong>{" "}
            technologies. TypeScript-first, locally processed, no telemetry.
          </div>

          <div className="flex-1 max-w-[680px] ml-15 py-5 px-4">
            <Marquee
              isPaused={isPaused}
              speed={20}
              items={badges.map((b) => (
                <TechBadge
                  key={b.name}
                  name={b.name}
                  url={b.url}
                  alt={b.alt}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                  onClick={() => handleClick(b.name)}
                  isActive={activeTech === b.name}
                />
              ))}
            />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeTech && TECH_DATA[activeTech] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 overflow-hidden"
          >
            <div className="max-w-[1200px] mx-auto px-6 py-8">
              <motion.div
                layoutId={`tech-card-${activeTech}`}
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="inline-flex"
                    >
                      <img
                        src={badges.find((b) => b.name === activeTech)?.url}
                        alt={activeTech}
                        className="h-10 rounded-lg"
                        draggable={false}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mt-3 text-[10px] uppercase tracking-widest text-[#71717a] font-medium"
                    >
                      {TECH_DATA[activeTech].role}
                    </motion.div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg font-semibold text-white mb-2"
                    >
                      {TECH_DATA[activeTech].name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 }}
                      className="text-sm text-[#a1a1aa] leading-relaxed"
                    >
                      {TECH_DATA[activeTech].description}
                    </motion.p>
                    <motion.a
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      href={`https://${TECH_DATA[activeTech].website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-xs text-[#c9d4ff] hover:text-white transition-colors"
                    >
                      Visit {TECH_DATA[activeTech].website}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="opacity-70"
                      >
                        <path
                          d="M3 9L9 3M9 3H4M9 3V8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTech(null);
                    setIsPaused(false);
                  }}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 1L13 13M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
