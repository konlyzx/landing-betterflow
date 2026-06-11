"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GradientButton from "../components/GradientButton";
import { GithubIcon } from "../components/icons";

export default function CTA() {
  return (
    <section className="relative z-10 overflow-hidden px-6 py-32">
      <div
        className="pointer-events-none absolute inset-0 flex justify-between px-6"
        style={{ maxWidth: "1324px", margin: "0 auto", left: 0, right: 0 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full w-px bg-white/[0.02]" />
        ))}
      </div>

      <motion.div
        className="relative mx-auto max-w-[800px] text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className="mb-6 text-4xl leading-[1.08] font-semibold tracking-tight text-white md:text-[56px]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Your screenshots deserve to look{" "}
          <span
            className="animate-gradient-flow bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #ff7e40, #ff4b72, #a445ff, #ff7e40, #ff4b72)",
              backgroundSize: "300% 100%",
              animation: "gradient-flow 4s ease infinite",
            }}
          >
            better.
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-[460px] text-sm leading-relaxed text-[#71717a] md:text-base">
          Open source screenshot studio. No telemetry, no sign-up, no server roundtrips. Just beautiful visuals.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GradientButton href="https://github.com/betterspacx" icon={<GithubIcon className="h-4 w-4 fill-current" />}>
            Star on GitHub
          </GradientButton>
          <motion.a
            href="mailto:hello@betterflow.site"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,#ff7e40_0%,#ff4b72_50%,#a445ff_100%)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_24px_rgba(164,69,255,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_32px_rgba(164,69,255,0.35)] hover:brightness-110"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in Touch
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        <p className="mt-8 text-[11px] tracking-wide text-[#3f3f46]">
          One-time clone. Lifetime updates. Unlimited projects.
        </p>
      </motion.div>
    </section>
  );
}
