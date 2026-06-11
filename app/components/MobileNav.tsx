"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  pathname?: string;
}

const MAIN_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Community", href: "/community" },
  { label: "Docs", href: "/docs" },
];

const DOCS_LINKS = [
  { section: "Getting Started", items: [{ name: "Introduction", href: "/docs" }] },
  { section: "Reference", items: [
    { name: "Architecture", href: "/docs/architecture" },
    { name: "Contributing", href: "/docs/contributing" },
    { name: "Changelog", href: "/docs/changelog" },
  ]},
];

export default function MobileNav({ isOpen, onClose, pathname = "" }: MobileNavProps) {
  const isDocs = pathname?.startsWith("/docs");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0b0b0c]/95 backdrop-blur-xl md:hidden pt-24"
          >
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-6 px-6"
            >
              {MAIN_LINKS.map(({ label, href }) => {
                const active = pathname === href || (href !== "/" && pathname?.startsWith(href));
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={(e) => {
                      if (href.startsWith("/#")) {
                        e.preventDefault();
                        onClose();
                        window.location.href = href;
                      } else {
                        onClose();
                      }
                    }}
                    className={`text-xl font-medium transition-colors uppercase tracking-wider ${
                      active ? "text-[#ff7e40]" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}

              {isDocs && (
                <div className="w-full max-w-xs border-t border-white/[0.08] my-2">
                  {DOCS_LINKS.map((group) => (
                    <div key={group.section} className="mt-4">
                      <p className="px-4 py-1 text-[10px] uppercase tracking-wider text-white/30 text-center">
                        {group.section}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2 text-sm text-center ${
                            pathname === item.href ? "text-[#ff7e40]" : "text-white/60 hover:text-white"
                          }`}
                          onClick={onClose}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </motion.nav>
          </motion.div>

          <div
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
}
