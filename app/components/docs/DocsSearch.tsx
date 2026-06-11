"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  section: string;
};

const ITEMS: SearchItem[] = [
  { title: "Introduction", description: "Overview, tech stack and quick start", href: "/docs", section: "Getting Started" },
  { title: "Architecture", description: "Codebase structure, routing, animation, Studio pipeline", href: "/docs/architecture", section: "Reference" },
  { title: "Contributing", description: "Setup, coding standards, PR workflow", href: "/docs/contributing", section: "Reference" },
  { title: "Changelog", description: "Version history and release notes", href: "/docs/changelog", section: "Reference" },
];

export default function DocsSearch({
  trigger,
}: {
  trigger?: (open: () => void) => React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? ITEMS.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q)
        );
      })
    : ITEMS;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, close]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <>
      {trigger ? (
        trigger(() => setOpen(true))
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="relative flex items-center w-44 h-9 rounded-lg border border-white/[0.08] bg-white/[0.04] pl-9 pr-3 text-sm text-white/40 hover:border-white/20 hover:text-white/60 transition-all"
        >
          <Search className="absolute left-2.5 h-4 w-4 text-white/30" />
          <span>Search</span>
          <kbd className="ml-auto text-[11px] text-white/30 font-medium hidden sm:block">⌘K</kbd>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[15vh] px-4">
          <div
            ref={modalRef}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0c] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4">
              <Search className="h-4 w-4 text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search documentation..."
                className="w-full bg-transparent py-4 text-base text-white placeholder-white/30 focus:outline-none caret-[#ff7e40]"
                style={{ caretColor: "#ff7e40" }}
              />
              <kbd className="text-[11px] text-white/40 border border-white/10 rounded px-2 py-1">ESC</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-white/40">
                  No results for &quot;{query}&quot;
                </p>
              ) : (
                results.map((item, i) => (
                  <button
                    key={item.href}
                    onClick={() => go(item.href)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                      active === i ? "bg-[#ff7e40]/10" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${active === i ? "text-[#ff7e40]" : "text-white/90"}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-white/30">
                          {item.section}
                        </span>
                      </div>
                      <p className="truncate text-xs text-white/40 mt-0.5">{item.description}</p>
                    </div>
                    {active === i && <CornerDownLeft className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
