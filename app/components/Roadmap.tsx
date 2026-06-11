"use client";

import { motion } from "framer-motion";

interface Milestone {
  version: string;
  displayNum: string;
  timing: string;
  status: "done" | "now" | "planned";
  variant?: "surprise";
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
    timing: "NOW",
    status: "now",
    title: "Studio Launch",
    changes: ["Create polished screenshots", "Browser frames", "Motion exports", "4K output"],
  },
  {
    version: "v0.3",
    displayNum: "3",
    timing: "NEXT",
    status: "planned",
    variant: "surprise",
    title: "Surprise Release 👀",
    changes: ["Invite-only feature", "New creation workflow", "Hidden until launch"],
  },
  {
    version: "v0.4",
    displayNum: "4",
    timing: "LATER",
    status: "planned",
    title: "Chrome Extension",
    changes: ["Capture → Edit → Export"],
  },
];

export default function Roadmap() {
  return (
    <section className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-[1324px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-medium tracking-widest text-[#71717a] uppercase">Roadmap</span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            What&apos;s next for Better Flow
          </h2>
        </motion.div>

        <div className="relative max-w-[900px]">
          {MILESTONES.map((m, i) => {
            const isNow = m.status === "now";
            const isDone = m.status === "done";
            const isSurprise = m.variant === "surprise";
            const isLast = i === MILESTONES.length - 1;

            const dotColor = isSurprise ? "#a445ff" : isNow ? "#c9d4ff" : isDone ? "#34d399" : "#3f3f46";
            const cardBg = isSurprise
              ? "linear-gradient(135deg, rgba(164,69,255,0.08) 0%, rgba(255,75,114,0.04) 50%, rgba(255,255,255,0.01) 100%)"
              : isNow
                ? "linear-gradient(135deg, rgba(201,212,255,0.06) 0%, rgba(201,212,255,0.02) 50%, rgba(255,255,255,0.01) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)";
            const cardBorder = isSurprise
              ? "rgba(164,69,255,0.25)"
              : isNow
                ? "rgba(201,212,255,0.12)"
                : "rgba(255,255,255,0.06)";
            const glowBg = isSurprise
              ? "linear-gradient(135deg, rgba(164,69,255,0.5), rgba(255,75,114,0.3), transparent)"
              : isNow
                ? "linear-gradient(135deg, rgba(201,212,255,0.4), transparent)"
                : "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)";
            const bigNumColor = isSurprise
              ? "rgba(164,69,255,0.2)"
              : isNow
                ? "rgba(201,212,255,0.15)"
                : "rgba(255,255,255,0.06)";
            const lineGradient = isSurprise
              ? "linear-gradient(180deg, rgba(164,69,255,0.3), rgba(255,255,255,0.05))"
              : isNow
                ? "linear-gradient(180deg, rgba(201,212,255,0.3), rgba(255,255,255,0.05))"
                : "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))";

            return (
              <motion.div
                key={m.version}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex gap-8 pb-10 last:pb-0 md:gap-12"
              >
                <div className="relative flex w-[80px] flex-shrink-0 flex-col items-center md:w-[100px]">
                  <span
                    className="mb-2 text-[11px] font-medium"
                    style={{ color: isSurprise ? "#a445ff" : "#71717a" }}
                  >
                    {m.timing}
                  </span>

                  <div className="relative z-10">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: dotColor }}
                    >
                      {(isNow || isSurprise) && (
                        <div
                          className="absolute -inset-1 animate-pulse rounded-full border"
                          style={{
                            borderColor: isSurprise ? "rgba(164,69,255,0.4)" : "rgba(201,212,255,0.3)",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {!isLast && (
                    <div
                      className="absolute top-[28px] left-1/2 h-[calc(100%-20px)] w-px -translate-x-1/2"
                      style={{ background: lineGradient }}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div
                    className="relative overflow-hidden rounded-2xl p-6 md:p-8"
                    style={{
                      background: cardBg,
                      border: "1px solid",
                      borderColor: cardBorder,
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-40 blur-[60px]"
                      style={{ background: glowBg }}
                    />

                    <div
                      className="pointer-events-none absolute top-2 right-4 text-[60px] leading-none font-bold select-none md:right-6 md:text-[80px]"
                      style={{ color: bigNumColor }}
                    >
                      {m.displayNum}
                    </div>

                    <div className="relative">
                      <div className="mb-5 flex flex-wrap items-start gap-3">
                        <h3
                          className="text-base leading-tight font-semibold md:text-lg"
                          style={{ color: isSurprise ? "#c084fc" : "#fff" }}
                        >
                          {m.title}
                        </h3>
                        <span
                          className="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap"
                          style={{
                            background: isSurprise ? "rgba(164,69,255,0.15)" : "rgba(255,255,255,0.06)",
                            color: isSurprise ? "#c084fc" : "#71717a",
                          }}
                        >
                          {m.version}
                        </span>
                      </div>

                      <div>
                        <p
                          className="mb-3 text-[10px] font-semibold tracking-wider uppercase"
                          style={{ color: isSurprise ? "rgba(164,69,255,0.6)" : "#52525b" }}
                        >
                          {m.title === "Chrome Extension" ? "Flow" : "Changes"}
                        </p>

                        {m.title === "Chrome Extension" ? (
                          <div className="flex items-center gap-2 text-sm flex-wrap">
                            {m.changes[0].split(" → ").map((step, si, arr) => (
                              <span key={si} className="flex items-center gap-2">
                                <span
                                  className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium tracking-wide"
                                  style={{
                                    borderColor: "rgba(255,255,255,0.1)",
                                    background: "rgba(255,255,255,0.04)",
                                    color: "rgba(255,255,255,0.7)",
                                  }}
                                >
                                  {step}
                                </span>
                                {si < arr.length - 1 && (
                                  <span className="text-[#52525b]">→</span>
                                )}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <ul className="space-y-2">
                            {m.changes.map((change, ci) => (
                              <li
                                key={ci}
                                className="flex items-start gap-2 text-sm"
                                style={{ color: isSurprise ? "rgba(192,132,252,0.7)" : "rgba(255,255,255,0.6)" }}
                              >
                                <span
                                  className="mt-2 h-1 w-1 flex-shrink-0 rounded-full"
                                  style={{
                                    background: isSurprise ? "rgba(164,69,255,0.5)" : "rgba(255,255,255,0.2)",
                                  }}
                                />
                                {change}
                              </li>
                            ))}
                          </ul>
                        )}
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
