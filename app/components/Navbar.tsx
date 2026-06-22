"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import MobileNav from "./MobileNav";


const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Community", href: "/community" },
  { label: "Docs", href: "/docs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const linksRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const positionHighlight = useCallback((el: HTMLElement) => {
    const highlight = highlightRef.current;
    const container = linksRef.current;
    if (!highlight || !container || !el) return;
    const linkRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    highlight.style.width = `${linkRect.width}px`;
    highlight.style.height = `${linkRect.height}px`;
    highlight.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
    highlight.style.opacity = "1";
  }, []);

  const handleLinkHover = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    positionHighlight(e.currentTarget);
  }, [positionHighlight]);

  const handleLinksLeave = useCallback(() => {
    const highlight = highlightRef.current;
    if (highlight) highlight.style.opacity = "0";
  }, []);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("/#")) {
        e.preventDefault();
        setMenuOpen(false);
        window.location.href = href;
      } else if (href.startsWith("#")) {
        e.preventDefault();
        setMenuOpen(false);
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  return (
    <>
      <motion.header
        className="fixed top-[calc(3.5rem+1.25rem)] left-0 right-0 z-50 flex justify-center px-6 pointer-events-none"
        initial={false}
      >
        <motion.div
          className="pointer-events-auto w-full flex items-center justify-between h-14 rounded-2xl border border-transparent px-5 transition-all duration-500 ease-out"
          animate={{
            maxWidth: scrolled ? "1324px" : "1680px",
            backgroundColor: scrolled ? "rgba(11, 11, 12, 0.6)" : "rgba(0, 0, 0, 0)",
            backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "blur(0px)",
            borderColor: scrolled ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0)",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center group"
            >
              <img
                src="/logo.svg"
                alt="Better Flow"
                className="w-6 h-6 group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            <span className="text-white/30 text-lg font-light select-none">/</span>

            <div
              ref={linksRef}
              className="hidden md:flex items-center relative"
              onMouseLeave={handleLinksLeave}
            >
              <div
                ref={highlightRef}
                className="absolute top-0 left-0 rounded-xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-md pointer-events-none opacity-0 transition-all duration-300 ease-out shadow-[0_2px_16px_rgba(0,0,0,0.2),inset_0_0.5px_0_rgba(255,255,255,0.06)]"
                style={{ transform: "translateX(0)" }}
              />
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="relative z-10 px-3 py-1.5 text-[13px] font-medium uppercase tracking-wider text-[#a1a1aa] hover:text-white transition-colors duration-200"
                  onMouseEnter={handleLinkHover}
                  onClick={(e) => handleLinkClick(e, href)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://x.com/konlyzx_"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg transition-all text-white/50 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/betterspacx"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden md:flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 text-white/50 hover:text-white hover:scale-110"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[360deg]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://app.betterflow.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 h-9 rounded-md text-[13px] font-medium text-black border border-white/60 bg-[linear-gradient(110deg,#c9d4ff_0%,#e0d4ff_45%,#f5d4e8_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(80,60,120,0.15)] transition-all hover:brightness-105"
            >
              <span>Go Studio</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M20 13.5c0 1.395 0 2.092-.138 2.667a5 5 0 0 1-3.695 3.695C15.592 20 14.894 20 13.5 20H12c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C4 16.2 4 14.8 4 12v-.5c0-2.33 0-3.495.38-4.413A5 5 0 0 1 7.088 4.38c.776-.322 1.73-.372 3.413-.38m9.26 5.454c.262-1.633.31-3.285.142-4.914a.495.495 0 0 0-.142-.3m0 0a.496.496 0 0 0-.301-.143 18.815 18.815 0 0 0-4.913.142m5.214 0L10 14"></path>
              </svg>
            </a>

            <button
              className="md:hidden relative w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#141416]/60 backdrop-blur-md"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}
