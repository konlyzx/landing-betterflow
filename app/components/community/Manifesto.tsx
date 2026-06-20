"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Bug, Sparkles, Map } from "lucide-react";

const CARDS = [
  {
    icon: Lightbulb,
    title: "Share ideas",
    description:
      "Propose new features, improvements, and creative directions. Every idea starts a conversation.",
    color: "#ff7e40",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Bug,
    title: "Report issues",
    description:
      "Found a bug? Let us know. Clear reports help us ship faster and build a more reliable product.",
    color: "#ff4b72",
    span: "md:col-span-2",
  },
  {
    icon: Sparkles,
    title: "Suggest improvements",
    description:
      "Small tweaks make a big difference. Share your perspective on design, performance, or UX.",
    color: "#a445ff",
    span: "md:col-span-2",
  },
  {
    icon: Map,
    title: "Shape the roadmap",
    description:
      "Vote on priorities, discuss trade-offs, and help decide what ships next.",
    color: "#ff7e40",
    span: "md:col-span-4",
  },
];

const glassCardStyle: React.CSSProperties = {
  background: "rgba(18, 15, 23, 0.45)",
  backdropFilter: "blur(32px) saturate(1.3)",
  WebkitBackdropFilter: "blur(32px) saturate(1.3)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <section ref={sectionRef} className="relative z-10 py-24 md:py-32">
      <div
        className="pointer-events-none absolute top-1/3 right-0 z-0 h-[500px] w-[500px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(164,69,255,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="mx-auto max-w-[1324px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto max-w-[640px] text-center"
        >
          <span
            className="mb-4 inline-block text-xs font-medium tracking-widest uppercase"
            style={{ color: "rgba(255,126,64,0.7)" }}
          >
            Manifesto
          </span>
          <h2 className="text-2xl leading-[1.15] font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            Built by the community,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #ff7e40, #ff4b72, #a445ff)",
              }}
            >
              for the community.
            </span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#a1a1aa] md:text-lg">
            BetterFlow is open source from day one. Every line of code, every
            design decision, and every conversation happens in the open.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className={`group relative overflow-hidden rounded-2xl ${card.span}`}
                style={glassCardStyle}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at 30% 0%, ${card.color}1a, transparent 70%)`,
                  }}
                />
                <div className="relative z-10 flex h-full flex-col gap-3 p-6 md:p-7">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: `${card.color}14`,
                      color: card.color,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-medium text-white/90">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#71717a]">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
