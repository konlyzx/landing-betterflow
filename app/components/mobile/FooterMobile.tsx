"use client";

import { motion } from "framer-motion";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Showcase", href: "#showcase" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Studio", href: "https://app.betterflow.site/", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#", disabled: true },
      { label: "Changelog", href: "#", disabled: true },
      { label: "GitHub", href: "https://github.com/betterspacx", external: true },
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

export default function FooterMobile() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.04]">
      <div className="relative mx-auto max-w-[1324px] px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-2 flex items-center gap-2">
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
          <div className="grid grid-cols-3 gap-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-3 text-[10px] font-semibold tracking-[0.12em] text-[#71717a] uppercase">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2">
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
