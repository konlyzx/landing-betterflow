"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Shield, Route, Eye, MessageCircle } from "lucide-react";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
const VALUES = [
  {
    icon: Shield,
    title: "Community-first",
    description: "Development driven by real user needs. Contributions, discussions, and feedback shape every release.",
  },
  {
    icon: Route,
    title: "Public roadmap",
    description: "See what's coming next. Vote on priorities, track progress, and know exactly what's being built.",
  },
  {
    icon: Eye,
    title: "Transparent development",
    description: "Every commit, every decision, every discussion is open. No black boxes, no surprises.",
  },
  {
    icon: MessageCircle,
    title: "Open feedback",
    description: "Direct line to the maintainers. Feature requests, bug reports, and ideas are always welcome.",
  },
];

export default function OpenSource() {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
      },
    }),
    [],
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.92, y: 30 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      },
    }),
    [],
  );

  return (
    <section className="relative z-10 overflow-hidden py-32">
      <div
        className="pointer-events-none absolute inset-0 flex justify-between px-6"
        style={{ maxWidth: "1324px", margin: "0 auto", left: 0, right: 0 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full w-px bg-white/[0.02]" />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1324px] px-6">
        <motion.div
          className="mb-16 max-w-[640px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="mb-4 inline-block text-xs font-medium tracking-widest uppercase"
            style={{ color: "rgba(255,126,64,0.7)" }}
          >
            Open Source
          </span>
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Built in the open, <span style={{ color: "rgba(255,255,255,0.5)" }}>by everyone.</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={cardVariants}
              >
                <SpotlightCard
                  className="rounded-xl border-transparent bg-transparent p-7"
                  style={{
                    background: "rgba(18, 15, 23, 0.45)",
                    backdropFilter: "blur(32px) saturate(1.3)",
                    WebkitBackdropFilter: "blur(32px) saturate(1.3)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: "rgba(255, 126, 64, 0.8)" }} />
                  </div>
                  <h3 className="mb-2 text-sm font-medium text-white">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-[#71717a]">{value.description}</p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="mt-12 text-center text-sm text-[#52525b]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Numbers will appear as the community grows.
        </motion.p>
      </div>
    </section>
  );
}
