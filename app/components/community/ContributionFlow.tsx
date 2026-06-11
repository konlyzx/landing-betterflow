"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MessageCircle, Code, Heart, ArrowUpRight } from "lucide-react";
import SpotlightCard from "@/app/components/ui/SpotlightCard";

const STEPS = [
  {
    icon: Search,
    label: "Discover",
    description: "Explore the project, read the docs, understand the vision.",
    action: "Explore Docs",
    href: "/docs",
    color: "#ff7e40",
  },
  {
    icon: MessageCircle,
    label: "Discuss",
    description: "Join conversations, ask questions, share your perspective.",
    action: "Join Discussion",
    href: "https://github.com/betterspacx",
    color: "#ff4b72",
  },
  {
    icon: Code,
    label: "Contribute",
    description: "Submit PRs, fix bugs, add features, improve docs.",
    action: "Submit PR",
    href: "https://github.com/betterspacx",
    color: "#a445ff",
  },
  {
    icon: Heart,
    label: "Build Together",
    description: "Grow with the community. Review, mentor, shape the future.",
    action: "Get Involved",
    href: "https://github.com/betterspacx",
    color: "#ff7e40",
  },
];

export default function ContributionFlow() {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.18, delayChildren: 0.3 },
      },
    }),
    [],
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      },
    }),
    [],
  );

  return (
    <section className="relative z-10 overflow-hidden py-32">
      <div className="mx-auto max-w-[1324px] px-6">
        <motion.div
          className="mb-20 max-w-[640px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="mb-4 inline-block text-xs font-medium tracking-widest uppercase"
            style={{ color: "rgba(255, 75, 114, 0.7)" }}
          >
            How to contribute
          </span>
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            From discovery <span style={{ color: "rgba(255,255,255,0.5)" }}>to impact.</span>
          </h2>
        </motion.div>

        <div className="hidden grid-cols-4 gap-6 md:grid">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                className="flex flex-col"
              >
                <SpotlightCard
                  className="flex h-full flex-col rounded-xl p-8 transition-all duration-300"
                  style={{
                    background: "rgba(18, 15, 23, 0.45)",
                    backdropFilter: "blur(32px) saturate(1.3)",
                    WebkitBackdropFilter: "blur(32px) saturate(1.3)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                  spotlightColor={`rgba(${step.color === "#ff7e40" ? "255, 126, 64" : step.color === "#ff4b72" ? "255, 75, 114" : "164, 69, 255"}, 0.08)`}
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: `${step.color}08`,
                      border: `1px solid ${step.color}15`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: `${step.color}99` }} />
                  </div>

                  <h3 className="mb-2 text-base font-semibold text-white">{step.label}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-[#71717a]">{step.description}</p>

                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 self-start rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    {step.action}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:opacity-80" />
                  </a>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="flex flex-col gap-5 md:hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                variants={cardVariants}
                className="rounded-xl p-6"
                style={{
                  background: "rgba(18, 15, 23, 0.45)",
                  backdropFilter: "blur(32px) saturate(1.3)",
                  WebkitBackdropFilter: "blur(32px) saturate(1.3)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: `${step.color}08`,
                      border: `1px solid ${step.color}15`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: `${step.color}99` }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-base font-semibold text-white">{step.label}</h3>
                    <p className="text-sm leading-relaxed text-[#71717a]">{step.description}</p>
                  </div>
                </div>
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  {step.action}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:opacity-80" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
