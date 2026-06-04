"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GradientButton from "../../components/GradientButton";
import { GithubIcon } from "../../components/icons";

export default function CTAMobile() {
  return (
    <section className="relative z-10 px-4 py-16 overflow-hidden">
      {/* Vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-4" style={{ maxWidth: "1324px", margin: "0 auto", left: 0, right: 0 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-px h-full bg-white/[0.02]" />
        ))}
      </div>

      <motion.div
        className="max-w-[800px] mx-auto text-center relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className="text-2xl font-semibold text-white mb-4 tracking-tight leading-[1.15]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Your screenshots deserve to look{" "}
          <span
            className="text-transparent bg-clip-text animate-gradient-flow"
            style={{
              backgroundImage: "linear-gradient(90deg, #ff7e40, #ff4b72, #a445ff, #ff7e40, #ff4b72)",
              backgroundSize: "300% 100%",
              animation: "gradient-flow 4s ease infinite",
            }}
          >
            better.
          </span>
        </h2>

        <p className="text-xs text-[#71717a] mb-6 max-w-[320px] mx-auto leading-relaxed">
          Open source screenshot studio. No telemetry, no sign-up, no server roundtrips. Just beautiful visuals.
        </p>

        <div className="flex flex-col gap-3 justify-center items-center">
          <GradientButton
            href="https://github.com/konlyzx/betterflow"
            icon={<GithubIcon className="w-4 h-4 fill-current" />}
          >
            Star on GitHub
          </GradientButton>
          <motion.a
            href="mailto:hello@betterflow.site"
            className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-[linear-gradient(135deg,#ff7e40_0%,#ff4b72_50%,#a445ff_100%)] shadow-[0_4px_24px_rgba(164,69,255,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_32px_rgba(164,69,255,0.35)]"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in Touch
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </motion.a>
        </div>

        <p className="mt-6 text-[10px] text-[#3f3f46] tracking-wide">
          One-time clone. Lifetime updates. Unlimited projects.
        </p>
      </motion.div>
    </section>
  );
}
