"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, ArrowUpRight, Menu, X } from "lucide-react";
import DocsSearch from "@/app/components/docs/DocsSearch";

const GITHUB_URL = "https://github.com/betterspacx";
const X_URL = "https://x.com/konlyzx_";

const navigation = [
  {
    section: "Getting Started",
    items: [{ name: "Introduction", href: "/docs" }],
  },
  {
    section: "Reference",
    items: [
      { name: "Architecture", href: "/docs/architecture" },
      { name: "Contributing", href: "/docs/contributing" },
      { name: "Changelog", href: "/docs/changelog" },
    ],
  },
];

type Heading = { id: string; text: string; level: number };

function NavLink({
  href,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  href: string;
  children: React.ReactNode;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: () => void;
}) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 px-4 py-2 text-[13px] font-medium text-[#a1a1aa] hover:text-white transition-colors duration-200"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="relative z-10 px-4 py-2 text-[13px] font-medium text-[#a1a1aa] hover:text-white transition-colors duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const mainRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    const timeout = setTimeout(() => {
      const els = mainRef.current?.querySelectorAll(".docs-category-title, .docs-category-subtitle") ?? [];
      const result: Heading[] = [];
      els.forEach((el) => {
        const text = el.textContent ?? "";
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        if (!el.id) el.id = id;
        result.push({
          id,
          text,
          level: el.classList.contains("docs-category-title") ? 2 : 3,
        });
      });
      setHeadings(result);
    }, 120);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

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

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white">
      <header className="fixed top-5 left-0 right-0 z-50 px-6">
        <div className="mx-auto flex items-center justify-between h-14 rounded-2xl border border-transparent bg-transparent px-5 max-w-[1800px]">
          <div className="flex items-center gap-4 -ml-15">
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="/logo.svg"
                alt="Better Flow"
                className="w-6 h-6 group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-sm font-semibold text-white">Better Flow</span>
            </Link>

            <span className="text-white/30 text-lg font-light">/</span>

            <div
              ref={linksRef}
              className="hidden md:flex items-center relative"
              onMouseLeave={handleLinksLeave}
            >
              <div
                ref={highlightRef}
                className="absolute top-0 left-0 rounded-xl bg-white/[0.06] border border-white/[0.08] pointer-events-none opacity-0 transition-all duration-300 ease-out shadow-[0_2px_16px_rgba(0,0,0,0.2),inset_0_0.5px_0_rgba(255,255,255,0.06)]"
                style={{ transform: "translateX(0)" }}
              />
              <NavLink href="/" onMouseEnter={handleLinkHover} onMouseLeave={handleLinksLeave}>
                Home
              </NavLink>
              <NavLink href="/community" onMouseEnter={handleLinkHover} onMouseLeave={handleLinksLeave}>
                Community
              </NavLink>
              <NavLink href="/docs" onMouseEnter={handleLinkHover} onMouseLeave={handleLinksLeave}>
                Docs
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-3 -mr-10">
            <div className="hidden sm:block">
              <DocsSearch />
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden md:flex group items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 text-white/50 hover:text-white hover:scale-110"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[360deg]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hidden md:flex group items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 text-white/50 hover:text-white hover:scale-110"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[360deg]" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <button
              className="md:hidden relative w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#141416]/60"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {mobileOpen && (
        <div className="fixed top-20 left-4 right-4 z-50 rounded-xl border border-white/[0.08] bg-[#141416] p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            <Link href="/" className="px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/#features" className="px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>Features</Link>
            <Link href="/community" className="px-4 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>Community</Link>
            <Link href="/docs" className="px-4 py-2 text-sm text-[#ff7e40]" onClick={() => setMobileOpen(false)}>Docs</Link>
            <div className="border-t border-white/[0.08] my-2" />
            {navigation.map((group) => (
              <div key={group.section}>
                <p className="px-4 py-1 text-[10px] uppercase tracking-wider text-white/30">{group.section}</p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-sm ${pathname === item.href ? "text-[#ff7e40]" : "text-white/60 hover:text-white"}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}

      <div className="flex pt-20">
        <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto border-r border-white/[0.06] px-5 py-6">
          <nav>
            {navigation.map((group) => (
              <div key={group.section} className="mb-6">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                  {group.section}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`relative block rounded-md px-3 py-1.5 text-sm transition-colors ${
                            active
                              ? "text-[#ff7e40] font-medium"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          {active && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-[#ff7e40]" />
                          )}
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main ref={mainRef} className="flex-1 min-w-0 px-5 sm:px-6 lg:px-10 xl:px-12 py-6 max-w-none">
          <div className="max-w-4xl xl:max-w-5xl">
            {children}
          </div>
        </main>

        <aside className="hidden xl:block w-72 flex-shrink-0 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto border-l border-white/[0.06] px-5 py-6">
          <div className="space-y-6">
            {headings.length > 0 && (
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                  On this page
                </p>
                <nav className="space-y-0.5 border-l border-white/[0.08]">
                  {headings.map((h) => {
                    const isActive = activeId === h.id;
                    return (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(h.id);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                        className={`block border-l -ml-px py-1 text-sm transition-colors ${
                          h.level === 3 ? "pl-5" : "pl-3"
                        } ${
                          isActive
                            ? "border-[#ff7e40] text-[#ff7e40]"
                            : "border-transparent text-white/50 hover:text-white/80"
                        }`}
                      >
                        {h.text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#ff7e40]/[0.08] via-transparent to-[#a445ff]/[0.05] p-4">
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#ff7e40]/10 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Open Source</p>
                    <p className="text-[11px] text-white/40">Apache 2.0 License</p>
                  </div>
                </div>
                <p className="text-xs text-white/50 leading-relaxed mb-3">
                  Better Flow is fully open source. Star the repo, file issues, or contribute features.
                </p>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#ff7e40] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff8f5a] transition-colors shadow-lg shadow-[#ff7e40]/20"
                >
                  <Star className="h-4 w-4" />
                  Star on GitHub
                </a>
              </div>
            </div>

            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                Resources
              </p>
              <div className="space-y-1">
                {[
                  { label: "Report an issue", href: `${GITHUB_URL}/issues`, external: true },
                  { label: "Discussions", href: `${GITHUB_URL}/discussions`, external: true },
                  { label: "Back to site", href: "/", external: false },
                ].map((link) => (
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between text-sm text-white/50 hover:text-white transition-colors py-1"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/60 transition-colors" />
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group flex items-center justify-between text-sm text-white/50 hover:text-white transition-colors py-1"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/60 transition-colors" />
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
