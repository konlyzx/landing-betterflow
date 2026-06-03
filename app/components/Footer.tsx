"use client";

import { motion } from "framer-motion";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Showcase", href: "#showcase" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Studio", href: "#", disabled: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#", disabled: true },
      { label: "Changelog", href: "#", disabled: true },
      { label: "GitHub", href: "https://github.com/konlyzx/betterflow", external: true },
      { label: "License", href: "#", disabled: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#", disabled: true },
      { label: "Blog", href: "#", disabled: true },
      { label: "Contact", href: "mailto:hello@betterflow.site" },
      { label: "Privacy", href: "#privacy" },
    ],
  },
];

function FooterLink({
  href,
  external,
  disabled,
  children,
}: {
  href: string;
  external?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const base = "text-[11px] text-[#52525b] hover:text-white transition-colors duration-200";
  if (disabled) {
    return <span className={`${base} opacity-35 cursor-default`}>{children}</span>;
  }
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={base}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] overflow-hidden">
      {/* Vertical grid lines background */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-6" style={{ maxWidth: "1324px", margin: "0 auto", left: 0, right: 0 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-px h-full bg-white/[0.03]" />
        ))}
      </div>

      <div className="relative max-w-[1324px] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between gap-14 lg:gap-8"
        >
          {/* Logo + copyright */}
          <div className="flex-shrink-0 max-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.svg" alt="Better Flow" className="w-5 h-5" loading="lazy" decoding="async" />
              <span className="text-white font-semibold text-[13px] tracking-tight" style={{ fontFamily: "Geist, sans-serif" }}>
                Better Flow
              </span>
            </div>
            <p className="text-[10px] text-[#3f3f46] leading-relaxed">
              &copy; {new Date().getFullYear()} betterflow.site
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-16 sm:gap-20">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#71717a] mb-4">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink {...link}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
