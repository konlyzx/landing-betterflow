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
      { label: "Documentation", href: "/docs" },
      { label: "Changelog", href: "/docs/changelog" },
      { label: "GitHub", href: "https://github.com/betterspacx", external: true },
      { label: "License", href: "https://apache.org/licenses/LICENSE-2.0", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#", disabled: true },
      { label: "Blog", href: "#", disabled: true },
      { label: "X / Twitter", href: "https://x.com/konlyzx_", external: true },
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
    return <span className={`${base} cursor-default opacity-35`}>{children}</span>;
  }
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={base}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.04]">
      <div
        className="pointer-events-none absolute inset-0 flex justify-between px-6"
        style={{ maxWidth: "1324px", margin: "0 auto", left: 0, right: 0 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full w-px bg-white/[0.03]" />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1324px] px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-14 lg:flex-row lg:gap-8"
        >
          <div className="max-w-[200px] flex-shrink-0">
            <div className="mb-3 flex items-center gap-2">
              <img src="/logo.svg" alt="Better Flow" className="h-5 w-5" loading="lazy" decoding="async" />
              <span
                className="text-[13px] font-semibold tracking-tight text-white"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Better Flow
              </span>
            </div>
            <p className="text-[10px] leading-relaxed text-[#3f3f46]">
              &copy; {new Date().getFullYear()} betterflow.site
            </p>
          </div>

          <div className="grid grid-cols-3 gap-16 sm:gap-20">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-[10px] font-semibold tracking-[0.12em] text-[#71717a] uppercase">
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
