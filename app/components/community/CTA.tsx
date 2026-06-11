"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubIcon } from "../icons";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
gsap.registerPlugin(ScrollTrigger);

function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
      if (!ctx || !canvas) return;
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < 3; i++) {
        const offset = i * 0.4;
        const yBase = h * (0.3 + i * 0.2);
        const amp = 40 + i * 20;

        ctx.beginPath();
        ctx.moveTo(0, yBase + Math.sin(time + offset) * amp);

        for (let x = 0; x <= w; x += 4) {
          const y =
            yBase +
            Math.sin(x * 0.003 + time + offset) * amp +
            Math.sin(x * 0.007 + time * 0.7 + offset * 2) * amp * 0.5;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle =
          i === 0
            ? `rgba(255, 126, 64, ${0.08 + Math.sin(time + offset) * 0.03})`
            : i === 1
              ? `rgba(255, 75, 114, ${0.06 + Math.sin(time * 0.8 + offset) * 0.02})`
              : `rgba(164, 69, 255, ${0.05 + Math.sin(time * 1.2 + offset) * 0.02})`;
        ctx.lineWidth = 120 - i * 30;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(60px)" }} />
  );
}

export default function CommunityCTA() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section ref={sectionRef} className="relative z-10 overflow-hidden py-32 md:py-48">
      <AuroraBackground />

      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,126,64,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="mb-6 text-3xl leading-[1.08] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            The first contribution starts with{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #ff7e40, #ff4b72, #a445ff)",
              }}
            >
              one click.
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-[480px] text-base leading-relaxed text-[#a1a1aa] md:text-lg">
            Every contributor, every issue, every pull request makes BetterFlow stronger. The door is open.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://github.com/betterspacx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,#ff7e40_0%,#ff4b72_50%,#a445ff_100%)] px-6 py-3 text-sm font-medium text-white shadow-[0_4px_24px_rgba(164,69,255,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
            >
              <GithubIcon className="h-4 w-4 fill-current" />
              Open GitHub
            </a>
            <a
              href="https://github.com/betterspacx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              View Community
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <p className="mt-8 text-xs" style={{ color: "rgba(255, 255, 255, 0.2)" }}>
            Apache 2.0 &middot; No telemetry &middot; Built in the open
          </p>
        </motion.div>
      </div>
    </section>
  );
}
