"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Bug, Sparkles, Map } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/app/components/ui/ScrollStack";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
const CARDS = [
  {
    icon: Lightbulb,
    title: "Share ideas",
    description: "Propose new features, improvements, and creative directions. Every idea starts a conversation.",
    color: "#ff7e40",
  },
  {
    icon: Bug,
    title: "Report issues",
    description: "Found a bug? Let us know. Clear reports help us ship faster and build a more reliable product.",
    color: "#ff4b72",
  },
  {
    icon: Sparkles,
    title: "Suggest improvements",
    description: "Small tweaks make a big difference. Share your perspective on design, performance, or UX.",
    color: "#a445ff",
  },
  {
    icon: Map,
    title: "Shape the roadmap",
    description: "Vote on priorities, discuss trade-offs, and help decide what ships next.",
    color: "#ff7e40",
  },
];

const glassCardStyle: React.CSSProperties = {
  background: "rgba(18, 15, 23, 0.45)",
  backdropFilter: "blur(32px) saturate(1.3)",
  WebkitBackdropFilter: "blur(32px) saturate(1.3)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

export default function Manifesto() {
  const mobileSectionRef = useRef<HTMLElement>(null);
  const isMobileInView = useInView(mobileSectionRef, {
    once: true,
    margin: "-100px",
  });

  // Allow ScrollStack to take over Lenis on mount
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    return () => {
      html.style.scrollBehavior = "";
    };
  }, []);

  return (
    <>
      <section className="relative z-10 hidden min-h-screen md:block">
        <div
          className="pointer-events-none absolute top-1/3 right-0 z-0 h-[500px] w-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(164,69,255,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="flex min-h-screen">
          <div className="sticky top-0 z-10 flex h-screen w-1/2 items-center">
            <div className="ml-80 max-w-[480px]">
              <span
                className="mb-4 inline-block text-xs font-medium tracking-widest uppercase"
                style={{ color: "rgba(255,126,64,0.7)" }}
              >
                Manifesto
              </span>
              <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Built by the community,{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #ff7e40, #ff4b72, #a445ff)",
                  }}
                >
                  for the community.
                </span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#a1a1aa] md:text-lg">
                BetterFlow is open source from day one. Every line of code, every design decision, and every
                conversation happens in the open.
              </p>
            </div>
          </div>

          <div className="relative z-10 w-1/2">
            <ScrollStack
              useWindowScroll
              itemDistance={60}
              itemScale={0.04}
              itemStackDistance={40}
              stackPosition="15%"
              scaleEndPosition="8%"
              baseScale={0.88}
              rotationAmount={0}
              blurAmount={1.5}
            >
              {CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <ScrollStackItem key={card.title}>
                    <SpotlightCard
                      className="rounded-xl border-transparent bg-transparent"
                      style={glassCardStyle}
                      spotlightColor={`rgba(${card.color === "#ff7e40" ? "255, 126, 64" : card.color === "#ff4b72" ? "255, 75, 114" : "164, 69, 255"}, 0.15)`}
                    >
                      <div className="flex items-start gap-4 p-6">
                        <div
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                          style={{
                            background: `${card.color}12`,
                            color: card.color,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1 text-sm font-medium text-white/90">{card.title}</h3>
                          <p className="text-sm leading-relaxed text-[#71717a]">{card.description}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </ScrollStackItem>
                );
              })}
            </ScrollStack>
          </div>
        </div>
      </section>

      <section ref={mobileSectionRef} className="relative z-10 py-24 md:hidden">
        <div
          className="pointer-events-none absolute top-1/3 right-0 z-0 h-[500px] w-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(164,69,255,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="mx-auto max-w-[1324px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isMobileInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span
              className="mb-4 inline-block text-xs font-medium tracking-widest uppercase"
              style={{ color: "rgba(255,126,64,0.7)" }}
            >
              Manifesto
            </span>
            <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl">
              Built by the community,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ff7e40, #ff4b72, #a445ff)",
                }}
              >
                for the community.
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#a1a1aa]">
              BetterFlow is open source from day one. Every line of code, every design decision, and every conversation
              happens in the open.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-3">
            {CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isMobileInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="group relative overflow-hidden rounded-xl"
                  style={glassCardStyle}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at 100% 0%, ${card.color}20, transparent 60%)`,
                    }}
                  />
                  <div className="relative z-10 flex items-start gap-4 p-5">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: `${card.color}12`,
                        color: card.color,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-sm font-medium text-white/90">{card.title}</h3>
                      <p className="text-sm leading-relaxed text-[#71717a]">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
