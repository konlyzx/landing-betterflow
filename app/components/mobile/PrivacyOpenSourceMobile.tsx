"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, Shield, EyeOff, Code2, GitBranch, FileText, ExternalLink } from "lucide-react";

const LocalProcessingVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative p-3">
    <div className="relative w-[140px] h-[90px] rounded-lg border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
      <div className="h-4 border-b border-white/[0.06] flex items-center gap-1 px-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
      </div>
      <div className="flex flex-col items-center justify-center h-[calc(100%-16px)] gap-1">
        <div className="w-8 h-8 rounded-full bg-[#c9d4ff]/10 border border-[#c9d4ff]/20 flex items-center justify-center">
          <Lock className="w-4 h-4 text-[#c9d4ff]" />
        </div>
        <span className="text-[8px] text-white/40 font-mono">localhost</span>
      </div>
    </div>
  </div>
);

const ZeroTelemetryVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative p-3">
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
        <EyeOff className="w-5 h-5 text-[#71717a]" />
        <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#c9d4ff]/20 border border-[#c9d4ff]/30 flex items-center justify-center">
          <span className="text-[6px] text-[#c9d4ff] font-bold">0</span>
        </div>
      </div>
      <div className="flex gap-1.5">
        {["Cookie", "Pixel", "Beacon"].map((label) => (
          <div key={label} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[7px] text-white/30 line-through font-mono">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MITLicenseVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative p-3">
    <div className="flex flex-col items-center gap-2">
      <div className="px-3 py-1.5 rounded-lg bg-[#c9d4ff]/10 border border-[#c9d4ff]/20">
        <span className="text-[10px] font-semibold text-[#c9d4ff] tracking-wider">APACHE 2.0</span>
      </div>
      <div className="w-full max-w-[120px] space-y-1">
        {["Use", "Modify", "Distribute", "Private"].map((item) => (
          <div key={item} className="flex items-center gap-1.5">
            <span className="text-[7px] text-white/40 w-10 text-right font-mono">{item}</span>
            <div className="flex-1 h-1 rounded-full bg-white/[0.04]">
              <div className="h-full rounded-full bg-[#c9d4ff]/40 w-full" />
            </div>
            <svg className="w-2.5 h-2.5 text-[#c9d4ff]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CONTRIBUTION_INTENSITIES = [
  0.15, 0.75, 0.25, 0.05, 0.45, 0.85, 0.12,
  0.65, 0.35, 0.95, 0.08, 0.55, 0.28, 0.72,
  0.18, 0.42, 0.88, 0.06, 0.62, 0.32, 0.78,
  0.22, 0.58, 0.92, 0.04, 0.48, 0.82, 0.16,
];

const GitHubActivityVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative p-3">
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-7 gap-[2px]">
        {CONTRIBUTION_INTENSITIES.map((intensity, i) => {
          let bg = "rgba(255,255,255,0.04)";
          if (intensity > 0.7) bg = "rgba(201,212,255,0.35)";
          else if (intensity > 0.4) bg = "rgba(201,212,255,0.2)";
          else if (intensity > 0.1) bg = "rgba(201,212,255,0.08)";
          return (
            <div key={i} className="w-[8px] h-[8px] rounded-[2px]" style={{ background: bg }} />
          );
        })}
      </div>
      <div className="flex items-center gap-1 mt-1">
        <GitBranch className="w-2.5 h-2.5 text-white/30" />
        <span className="text-[8px] text-white/30 font-mono">Open for contributions</span>
      </div>
    </div>
  </div>
);

const CodePreviewVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative p-3">
    <div className="w-[160px] rounded-lg border border-white/[0.06] bg-[#0c0c0e] overflow-hidden font-mono text-[8px]">
      <div className="flex items-center gap-1 px-1.5 py-1 border-b border-white/[0.06]">
        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        <span className="text-white/20">config.ts</span>
      </div>
      <div className="p-2 space-y-0.5">
        <div><span className="text-[#7b9cda]">export</span> <span className="text-[#c9d4ff]">default</span> <span className="text-white/50">{"{"}</span></div>
        <div className="pl-2"><span className="text-white/60">privacy</span><span className="text-white/30">:</span> <span className="text-[#c9d4ff]">true</span><span className="text-white/30">,</span></div>
        <div className="pl-2"><span className="text-white/60">telemetry</span><span className="text-white/30">:</span> <span className="text-[#ff7e40]">false</span><span className="text-white/30">,</span></div>
        <div className="pl-2"><span className="text-white/60">local</span><span className="text-white/30">:</span> <span className="text-[#c9d4ff]">true</span><span className="text-white/30">,</span></div>
        <div><span className="text-white/50">{"}"}</span></div>
      </div>
    </div>
  </div>
);

const CodeStatsVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative p-3">
    <div className="flex flex-col gap-2 w-full max-w-[160px]">
      <div className="flex items-center justify-between">
        <span className="text-[8px] text-white/30 font-mono">TS</span>
        <div className="flex-1 mx-1.5 h-1 rounded-full bg-white/[0.04]">
          <div className="h-full rounded-full bg-[#c9d4ff]/40" style={{ width: "85%" }} />
        </div>
        <span className="text-[8px] text-white/30 font-mono">85%</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[8px] text-white/30 font-mono">CSS</span>
        <div className="flex-1 mx-1.5 h-1 rounded-full bg-white/[0.04]">
          <div className="h-full rounded-full bg-[#f5d4e8]/40" style={{ width: "15%" }} />
        </div>
        <span className="text-[8px] text-white/30 font-mono">15%</span>
      </div>
    </div>
  </div>
);

const CARDS = [
  {
    title: "Local-First Processing",
    desc: "All image processing happens directly in your browser. No server uploads, no cloud dependencies.",
    visual: <LocalProcessingVisual />,
  },
  {
    title: "Zero Telemetry",
    desc: "No tracking pixels, no analytics cookies, no usage data collection. We literally know nothing.",
    visual: <ZeroTelemetryVisual />,
  },
  {
    title: "Apache 2.0",
    desc: "Patent-protected open source. Use it, modify it, ship it. Commercial use fully permitted.",
    visual: <MITLicenseVisual />,
  },
  {
    title: "Community Driven",
    desc: "Open source and open for contributions. Transparent roadmap on GitHub.",
    visual: <GitHubActivityVisual />,
  },
  {
    title: "Auditable Code",
    desc: "Every line is public. No hidden tracking, no proprietary black boxes. Verify everything.",
    visual: <CodePreviewVisual />,
  },
  {
    title: "Code Stats",
    desc: "TypeScript-first codebase. Transparent architecture you can audit, extend, and trust.",
    visual: <CodeStatsVisual />,
  },
];

export default function PrivacyOpenSourceMobile() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <section className="relative z-10 py-12 px-4" id="privacy">
      <div className="max-w-[1324px] mx-auto" ref={gridRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-xl font-medium text-white tracking-tight">
            Privacy & Open Source
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              className="rounded-xl border border-white/[0.08] bg-[rgba(18,15,23,0.45)] backdrop-blur-xl overflow-hidden flex flex-col"
            >
              <div className="h-[120px] w-full flex items-center justify-center relative overflow-hidden">
                {card.visual}
              </div>
              <div className="p-3 border-t border-white/[0.04]">
                <h3 className="text-sm font-semibold text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex items-center justify-center"
        >
          <a
            href="https://github.com/konlyzx/betterflow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-black font-regular text-xs bg-[linear-gradient(110deg,#c9d4ff_0%,#e0d4ff_45%,#f5d4e8_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(80,60,120,0.15)] transition-all hover:brightness-105"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
