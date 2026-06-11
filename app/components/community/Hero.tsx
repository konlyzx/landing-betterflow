"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingText from "@/app/components/ui/RotatingText";
import { GithubIcon } from "../icons";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
gsap.registerPlugin(ScrollTrigger);

function GradientOrb() {
  return (
    <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
      <div
        className="h-[500px] w-[500px] animate-gradient-float rounded-full opacity-80 md:h-[700px] md:w-[700px]"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(255,126,64,0.15) 0%, rgba(255,75,114,0.08) 30%, rgba(164,69,255,0.05) 55%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "transform",
          animationDuration: "12s",
        }}
      />
    </div>
  );
}

export default function CommunityHero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = Math.min(self.progress * 2, 1);
          gsap.set(bgRef.current, {
            opacity: 1 - progress * 0.5,
            scale: 1 + progress * 0.03,
          });
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.6 },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
    }),
    [],
  );

  return (
      <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,126,64,0.12) 0%, rgba(164,69,255,0.08) 40%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,75,114,0.08) 0%, transparent 60%), #0b0b0c",
        }}
      />

      <GradientOrb />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 mx-auto max-w-[1324px] px-6 text-center">
        <motion.div initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
          <motion.div
            className="inline-flex items-center gap-3 rounded-lg px-4 py-2 text-xs font-medium"
            style={{
              background: "linear-gradient(135deg, rgba(201,212,255,0.08) 0%, rgba(224,212,255,0.05) 100%)",
              border: "1px solid rgba(201,212,255,0.15)",
              color: "rgba(201,212,255,0.9)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #c9d4ff 0%, #e0d4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Community
            </span>
            <span style={{ color: "rgba(201,212,255,0.3)" }}>•</span>
            <span
              style={{
                background: "linear-gradient(135deg, #e0d4ff 0%, #f5d4e8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Open Source
            </span>
          </motion.div>

          <div ref={titleRef} className="max-w-[850px] space-y-4">
            <h1 className="text-5xl leading-[1.05] font-extrabold tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="text-white">Build </span>
              <span
                className="animate-gradient-flow bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #ff7e40, #ff4b72, #a445ff, #ff7e40, #ff4b72)",
                  backgroundSize: "300% 100%",
                  animation: "gradient-flow 4s ease infinite",
                }}
              >
                Better
              </span>
              <br />
              <RotatingText
                texts={["Together", "In Public", "Openly", "United"]}
                interval={3000}
                className="gradient-text inline-block pb-1"
              />
            </h1>
            <p className="mx-auto max-w-[520px] text-lg leading-relaxed text-[#a1a1aa] md:text-xl">
              Join the community shaping the future of BetterFlow.
            </p>
          </div>

          <motion.div
            className="mt-4 flex flex-col gap-3 sm:flex-row"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              variants={itemVariants}
              href="https://github.com/betterspacx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,#ff7e40_0%,#ff4b72_50%,#a445ff_100%)] px-6 py-3 text-sm font-medium text-white shadow-[0_4px_24px_rgba(164,69,255,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <GithubIcon className="h-4 w-4 fill-current" />
              View GitHub
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="https://github.com/betterspacx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
              }}
              whileHover={{
                scale: 1.04,
                borderColor: "rgba(255,255,255,0.2)",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Start Contributing
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
