"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "GitHub", href: "https://github.com/betterspacx", external: true },
];

export default function NavbarMobile() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setScrolled(window.scrollY > 50);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="pointer-events-none fixed top-3 right-0 left-0 z-50 flex justify-center px-4"
        initial={false}
      >
        <motion.div
          initial={false}
          className="pointer-events-auto flex h-12 w-full items-center justify-between rounded-xl border border-transparent px-4 transition-all duration-500 ease-out"
          animate={{
            maxWidth: scrolled ? "1324px" : "100%",
            backgroundColor: scrolled ? "rgba(11, 11, 12, 0.8)" : "rgba(11, 11, 12, 0)",
            backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "blur(0px)",
            borderColor: scrolled ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0)",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="/"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src="/logo.svg" alt="Better Flow" className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-tight text-white">Better Flow</span>
          </a>

          <button
            className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-lg border border-white/[0.08] bg-[#141416]/60 backdrop-blur-md"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block h-[1.5px] w-3.5 bg-white transition-all duration-300 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-3.5 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0b0b0c]/95 pt-20 backdrop-blur-xl"
          >
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-5 px-6"
            >
              {NAV_LINKS.map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-lg font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-white"
                  onClick={(e) => {
                    if (!external && href.startsWith("#")) {
                      e.preventDefault();
                      setMenuOpen(false);
                      const target = document.querySelector(href);
                      if (target) target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {label}
                </a>
              ))}
              <a
                href="https://github.com/betterspacx"
                target="_blank"
                rel="noopener noreferrer"
                className="font-regular mt-4 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(110deg,#c9d4ff_0%,#e0d4ff_45%,#f5d4e8_100%)] px-5 py-2.5 text-sm text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(80,60,120,0.15)] transition-all hover:brightness-105"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Star on GitHub
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
