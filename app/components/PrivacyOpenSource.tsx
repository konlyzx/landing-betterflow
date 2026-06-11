"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, Shield, EyeOff, Code2, GitBranch, FileText, ExternalLink } from "lucide-react";

const LocalProcessingVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center p-4">
    <div className="relative h-[120px] w-[180px] overflow-hidden rounded-lg border border-white/[0.08] bg-[#0c0c0e]">
      <div className="flex h-5 items-center gap-1.5 border-b border-white/[0.06] px-2">
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="h-2 w-2 rounded-full bg-white/10" />
      </div>
      <div className="flex h-[calc(100%-20px)] flex-col items-center justify-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9d4ff]/20 bg-[#c9d4ff]/10">
          <Lock className="h-5 w-5 text-[#c9d4ff]" />
        </div>
        <span className="font-mono text-[9px] text-white/40">localhost</span>
      </div>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 180 120">
        <circle cx="90" cy="55" r="28" fill="none" stroke="rgba(201,212,255,0.1)" strokeWidth="1" strokeDasharray="4 4">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 90 55"
            to="360 90 55"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
    <div className="absolute top-1/2 -right-2 -translate-y-1/2">
      <div className="rotate-90 font-mono text-[9px] text-white/30">No Upload</div>
    </div>
  </div>
);

const ZeroTelemetryVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center p-4">
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
        <EyeOff className="h-6 w-6 text-[#71717a]" />
        <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#c9d4ff]/30 bg-[#c9d4ff]/20">
          <span className="text-[7px] font-bold text-[#c9d4ff]">0</span>
        </div>
      </div>
      <div className="flex gap-2">
        {["Cookie", "Pixel", "Beacon"].map((label, i) => (
          <div
            key={label}
            className="flex items-center gap-1 rounded border border-white/[0.06] bg-white/[0.03] px-2 py-1"
          >
            <span className="font-mono text-[8px] text-white/30 line-through">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MITLicenseVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center p-4">
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-lg border border-[#c9d4ff]/20 bg-[#c9d4ff]/10 px-4 py-2">
        <span className="text-xs font-semibold tracking-wider text-[#c9d4ff]">APACHE 2.0</span>
      </div>
      <div className="w-full max-w-[140px] space-y-1.5">
        {[
          { label: "Use", width: "100%" },
          { label: "Modify", width: "100%" },
          { label: "Distribute", width: "100%" },
          { label: "Private", width: "100%" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-14 text-right font-mono text-[8px] text-white/40">{item.label}</span>
            <div className="h-1.5 flex-1 rounded-full bg-white/[0.04]">
              <div className="h-full rounded-full bg-[#c9d4ff]/40" style={{ width: item.width }} />
            </div>
            <svg
              className="h-3 w-3 text-[#c9d4ff]/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CONTRIBUTION_INTENSITIES = [
  0.15, 0.75, 0.25, 0.05, 0.45, 0.85, 0.12, 0.65, 0.35, 0.95, 0.08, 0.55, 0.28, 0.72, 0.18, 0.42, 0.88, 0.06, 0.62,
  0.32, 0.78, 0.22, 0.58, 0.92, 0.04, 0.48, 0.82, 0.16, 0.68, 0.38, 0.98, 0.02, 0.52, 0.26, 0.74,
];

const GitHubActivityVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center p-4">
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-7 gap-[3px]">
        {CONTRIBUTION_INTENSITIES.map((intensity, i) => {
          let bg = "rgba(255,255,255,0.04)";
          if (intensity > 0.7) bg = "rgba(201,212,255,0.35)";
          else if (intensity > 0.4) bg = "rgba(201,212,255,0.2)";
          else if (intensity > 0.1) bg = "rgba(201,212,255,0.08)";
          return <div key={i} className="h-[10px] w-[10px] rounded-[2px]" style={{ background: bg }} />;
        })}
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <GitBranch className="h-3 w-3 text-white/30" />
        <span className="font-mono text-[9px] text-white/30">Open for contributions</span>
      </div>
    </div>
  </div>
);

const CodePreviewVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center p-4">
    <div className="w-[190px] overflow-hidden rounded-lg border border-white/[0.06] bg-[#0c0c0e] font-mono text-[9px]">
      <div className="flex items-center gap-1 border-b border-white/[0.06] px-2 py-1">
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <span className="text-white/20">betterflow.config.ts</span>
      </div>
      <div className="space-y-1 p-2.5">
        <div>
          <span className="text-[#7b9cda]">export</span> <span className="text-[#c9d4ff]">default</span>{" "}
          <span className="text-white/50">{"{"}</span>
        </div>
        <div className="pl-3">
          <span className="text-white/60">privacy</span>
          <span className="text-white/30">:</span> <span className="text-[#c9d4ff]">true</span>
          <span className="text-white/30">,</span>
        </div>
        <div className="pl-3">
          <span className="text-white/60">telemetry</span>
          <span className="text-white/30">:</span> <span className="text-[#ff7e40]">false</span>
          <span className="text-white/30">,</span>
        </div>
        <div className="pl-3">
          <span className="text-white/60">localOnly</span>
          <span className="text-white/30">:</span> <span className="text-[#c9d4ff]">true</span>
          <span className="text-white/30">,</span>
        </div>
        <div>
          <span className="text-white/50">{"}"}</span>
        </div>
      </div>
    </div>
  </div>
);

const CodeStatsVisual = () => (
  <div className="relative flex h-full w-full items-center justify-center p-4">
    <div className="flex w-full max-w-[200px] flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/30">TypeScript</span>
        <div className="mx-2 h-1 flex-1 rounded-full bg-white/[0.04]">
          <div className="h-full rounded-full bg-[#c9d4ff]/40" style={{ width: "85%" }} />
        </div>
        <span className="font-mono text-[9px] text-white/30">85%</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/30">CSS</span>
        <div className="mx-2 h-1 flex-1 rounded-full bg-white/[0.04]">
          <div className="h-full rounded-full bg-[#f5d4e8]/40" style={{ width: "15%" }} />
        </div>
        <span className="font-mono text-[9px] text-white/30">15%</span>
      </div>
      <div className="mt-1 flex h-8 items-end gap-[2px]">
        {[40, 25, 60, 35, 80, 45, 70, 30, 55, 90, 40, 65, 50, 75, 35, 60, 45, 85, 55, 40].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[1px]"
            style={{ height: `${h}%`, background: `rgba(201,212,255,${0.15 + (h / 100) * 0.4})` }}
          />
        ))}
      </div>
    </div>
  </div>
);

const CARDS = [
  {
    title: "Local-First Processing",
    desc: "All image processing happens directly in your browser. No server uploads, no cloud dependencies.",
    span: 5,
    visual: <LocalProcessingVisual />,
  },
  {
    title: "Zero Telemetry",
    desc: "No tracking pixels, no analytics cookies, no usage data collection. We literally know nothing.",
    span: 4,
    visual: <ZeroTelemetryVisual />,
  },
  {
    title: "Apache 2.0",
    desc: "Patent-protected open source. Use it, modify it, ship it. Commercial use fully permitted.",
    span: 3,
    visual: <MITLicenseVisual />,
  },
  {
    title: "Community Driven",
    desc: "Open source and open for contributions. Transparent roadmap on GitHub.",
    span: 3,
    visual: <GitHubActivityVisual />,
  },
  {
    title: "Auditable Code",
    desc: "Every line is public. No hidden tracking, no proprietary black boxes. Verify everything.",
    span: 4,
    visual: <CodePreviewVisual />,
  },
  {
    title: "Code Stats",
    desc: "TypeScript-first codebase. Transparent architecture you can audit, extend, and trust.",
    span: 5,
    visual: <CodeStatsVisual />,
  },
];

export default function PrivacyOpenSource() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 px-6 py-24" id="privacy">
      <div className="mx-auto max-w-[1324px]" ref={gridRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "32px" }}
        >
          <h2
            style={{
              fontFamily: "Geist, sans-serif",
              fontSize: "32px",
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Privacy & Open Source
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "16px" }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="ln-privacy-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              style={{ gridColumn: `span ${card.span}` }}
            >
              <div className="ln-privacy-card-visual">{card.visual}</div>
              <div className="ln-privacy-card-body">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex items-center justify-center"
        >
          <a
            href="https://github.com/betterspacx"
            target="_blank"
            rel="noopener noreferrer"
            className="font-regular inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(110deg,#c9d4ff_0%,#e0d4ff_45%,#f5d4e8_100%)] px-5 py-2.5 text-sm text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(80,60,120,0.15)] transition-all hover:brightness-105"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>

      <style>{`
        .ln-privacy-card {
          grid-column: span 12;
          background: rgba(18, 15, 23, 0.45);
          backdrop-filter: blur(32px) saturate(1.3);
          -webkit-backdrop-filter: blur(32px) saturate(1.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s ease, translate 0.3s ease;
          overflow: hidden;
        }
        .ln-privacy-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          translate: 0 -2px;
        }
        .ln-privacy-card-visual {
          height: 180px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .ln-privacy-card-body {
          padding: 18px 22px 22px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }
        .ln-privacy-card-body h3 {
          font-family: 'Geist', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
        .ln-privacy-card-body p {
          font-family: 'Geist', sans-serif;
          font-size: 13px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }
        @media (min-width: 1024px) {
          .ln-privacy-card:nth-child(1) { grid-column: span 5; }
          .ln-privacy-card:nth-child(2) { grid-column: span 4; }
          .ln-privacy-card:nth-child(3) { grid-column: span 3; }
          .ln-privacy-card:nth-child(4) { grid-column: span 3; }
          .ln-privacy-card:nth-child(5) { grid-column: span 4; }
          .ln-privacy-card:nth-child(6) { grid-column: span 5; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .ln-privacy-card:nth-child(odd) { grid-column: span 6; }
          .ln-privacy-card:nth-child(even) { grid-column: span 6; }
        }
      `}</style>
    </section>
  );
}
