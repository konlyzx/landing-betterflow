"use client";

import { motion } from "framer-motion";

interface Milestone {
  version: string;
  displayNum: string;
  timing: string;
  status: "done" | "now" | "planned";
  title: string;
  changes: string[];
}

const MILESTONES: Milestone[] = [
  {
    version: "v0.1",
    displayNum: "1",
    timing: "DONE",
    status: "done",
    title: "Landing Page",
    changes: ["Public website", "Feature showcase", "Waitlist signup"],
  },
  {
    version: "v0.2",
    displayNum: "2",
    timing: "SOON",
    status: "planned",
    title: "Studio Launch",
    changes: ["Screenshot editor", "Browser frames", "Device mockups"],
  },
  {
    version: "v0.3",
    displayNum: "3",
    timing: "LATER",
    status: "planned",
    title: "Export & Video",
    changes: ["PNG / WebP export", "4K resolution", "MP4 / GIF export"],
  },
  {
    version: "v0.4",
    displayNum: "4",
    timing: "LATER",
    status: "planned",
    title: "Chrome Extension",
    changes: ["One-click capture", "Browser integration", "Quick export"],
  },
  {
    version: "v0.5",
    displayNum: "5",
    timing: "LATER",
    status: "planned",
    title: "Social Integrations",
    changes: ["Twitter / X", "LinkedIn", "Direct publishing"],
  },
];

export default function Roadmap() {
  return (
    <section className="relative z-10 px-6 py-28">
      <div className="max-w-[1324px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-[#71717a]">
            Roadmap
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mt-4 tracking-tight">
            What&apos;s next for Better Flow
          </h2>
        </motion.div>

        <div className="relative max-w-[900px]">
          {MILESTONES.map((m, i) => {
            const isNow = m.status === "now";
            const isDone = m.status === "done";
            const isLast = i === MILESTONES.length - 1;

            return (
              <motion.div
                key={m.version}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex gap-8 md:gap-12 pb-10 last:pb-0"
              >
                <div className="relative flex flex-col items-center flex-shrink-0 w-[80px] md:w-[100px]">
                  <span className="text-[11px] text-[#71717a] mb-2 font-medium">
                    {m.timing}
                  </span>

                  <div className="relative z-10">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: isNow
                          ? "#c9d4ff"
                          : isDone
                          ? "#34d399"
                          : "#3f3f46",
                      }}
                    >
                      {isNow && (
                        <div className="absolute -inset-1 rounded-full border border-[#c9d4ff]/30 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {!isLast && (
                    <div
                      className="absolute top-[28px] left-1/2 -translate-x-1/2 w-px h-[calc(100%-20px)]"
                      style={{
                        background: isNow
                          ? "linear-gradient(180deg, rgba(201,212,255,0.3), rgba(255,255,255,0.05))"
                          : "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                      }}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div
                    className="relative rounded-2xl p-6 md:p-8 overflow-hidden"
                    style={{
                      background: isNow
                        ? "linear-gradient(135deg, rgba(201,212,255,0.06) 0%, rgba(201,212,255,0.02) 50%, rgba(255,255,255,0.01) 100%)"
                        : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                      border: "1px solid",
                      borderColor: isNow
                        ? "rgba(201,212,255,0.12)"
                        : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-40 pointer-events-none"
                      style={{
                        background: isNow
                          ? "linear-gradient(135deg, rgba(201,212,255,0.4), transparent)"
                          : "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)",
                      }}
                    />

                    <div
                      className="absolute top-2 right-4 md:right-6 text-[60px] md:text-[80px] font-bold leading-none select-none pointer-events-none"
                      style={{
                        color: isNow
                          ? "rgba(201,212,255,0.15)"
                          : "rgba(255,255,255,0.06)",
                      }}
                    >
                      {m.displayNum}
                    </div>

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-5">
                        <h3 className="text-base md:text-lg font-semibold text-white">
                          {m.title}
                        </h3>
                        <span className="text-[10px] font-medium text-[#71717a] bg-white/[0.06] px-2 py-0.5 rounded-full">
                          {m.version}
                        </span>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#52525b] mb-3">
                          Changes
                        </p>
                        <ul className="space-y-2">
                          {m.changes.map((change, ci) => (
                            <li
                              key={ci}
                              className="text-sm text-white/60 flex items-start gap-2"
                            >
                              <span className="mt-2 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
