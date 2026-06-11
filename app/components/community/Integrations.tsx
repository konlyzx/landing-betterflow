"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { GitFork, Star, Users } from "lucide-react";
import SpotlightCard from "@/app/components/ui/SpotlightCard";

const FEATURES = [
  {
    icon: GitFork,
    title: "Fork & contribute",
    description: "Clone the repo, make your changes, and submit a pull request. It's that simple.",
  },
  {
    icon: Star,
    title: "Star & follow",
    description: "Show your support and stay updated with releases, discussions, and community highlights.",
  },
  {
    icon: Users,
    title: "Join the community",
    description: "Engage with maintainers and contributors through issues, discussions, and PR reviews.",
  },
];

function GithubLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
      <motion.path
        d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        fill="currentColor"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ color: "rgba(255, 255, 255, 0.5)" }}
      />
    </svg>
  );
}

export default function Integrations() {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
      },
    }),
    [],
  );

  const featureVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
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
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase"
              style={{ color: "rgba(255, 255, 255, 0.4)" }}
            >
              <GitFork className="h-3.5 w-3.5" />
              Integration
            </span>
            <h2 className="mb-4 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Powered by <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>GitHub</span>
            </h2>
            <p className="mb-8 max-w-[440px] text-base leading-relaxed text-[#a1a1aa]">
              Built with GitHub integration from day one. Sign in, contribute, and collaborate — all through the
              open-source platform you already trust.
            </p>

            <motion.div
              className="flex flex-col gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={feature.title} variants={featureVariants}>
                    <SpotlightCard
                      className="rounded-xl border-transparent bg-transparent p-4"
                      style={{
                        background: "rgba(18, 15, 23, 0.45)",
                        backdropFilter: "blur(32px) saturate(1.3)",
                        WebkitBackdropFilter: "blur(32px) saturate(1.3)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "rgba(255, 255, 255, 0.3)" }} />
                        <div>
                          <h4 className="text-sm font-medium text-white/80">{feature.title}</h4>
                          <p className="text-xs leading-relaxed text-[#71717a]">{feature.description}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative flex h-48 w-48 items-center justify-center rounded-3xl md:h-64 md:w-64"
              style={{
                background: "rgba(18, 15, 23, 0.45)",
                backdropFilter: "blur(32px) saturate(1.3)",
                WebkitBackdropFilter: "blur(32px) saturate(1.3)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="h-24 w-24 md:h-32 md:w-32" style={{ color: "rgba(255, 255, 255, 0.15)" }}>
                <GithubLogo />
              </div>
              <div
                className="absolute -inset-4 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(255,126,64,0.06) 0%, transparent 60%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
