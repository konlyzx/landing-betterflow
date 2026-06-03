"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Palette, Shapes, ImageIcon } from "lucide-react";
import {
  FiType, FiCircle, FiLayers, FiImage, FiCode, FiGrid,
  FiZap, FiBox, FiStar, FiHeart, FiEye, FiCompass,
} from "react-icons/fi";
import { Sparkles } from './ui/Sparkles';

export interface BentoProps {
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "224, 212, 255";
const MOBILE_BREAKPOINT = 768;

const ROW_A = [
  { name: "Screenshot Studio" }, { name: "Chrome Extension" }, { name: "Code Highlight" },
  { name: "3D Frames" }, { name: "Gradients" }, { name: "Animations" },
  { name: "Mockups" }, { name: "Export PNG" }, { name: "Export MP4" },
];

const ROW_B = [
  { name: "Device Frames" }, { name: "Browser Mockups" }, { name: "Glow Effects" },
  { name: "Particle Effects" }, { name: "Spotlight" }, { name: "Tilt Effect" },
  { name: "Export GIF" }, { name: "Shadow Presets" }, { name: "Border Radius" },
];

const ComponentMarquee = () => (
  <div className="ln-feat-marquee">
    <div className="ln-feat-marquee-track">
      <div className="ln-feat-marquee-scroll">
        {[...ROW_A, ...ROW_A].map((c, i) => (
          <span key={i} className="ln-feat-pill">{c.name}</span>
        ))}
      </div>
    </div>
    <div className="ln-feat-marquee-track">
      <div className="ln-feat-marquee-scroll ln-feat-marquee-scroll--rev">
        {[...ROW_B, ...ROW_B].map((c, i) => (
          <span key={i} className="ln-feat-pill">{c.name}</span>
        ))}
      </div>
    </div>
  </div>
);

const ToolsFloat = () => (
  <div className="ln-feat-tools">
    <motion.div className="ln-feat-tool-box ln-feat-tool-box--center" animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <Palette size={22} />
    </motion.div>
    <motion.div className="ln-feat-tool-box ln-feat-tool-box--left" animate={{ y: [3, -3, 3], x: [-3, 2, -3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
      <Shapes size={18} />
    </motion.div>
    <motion.div className="ln-feat-tool-box ln-feat-tool-box--right" animate={{ y: [3, -3, 3], x: [3, -2, 3] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
      <ImageIcon size={18} />
    </motion.div>
  </div>
);

const SparklesCard = () => (
  <div className="relative w-full h-full overflow-hidden rounded-[14px]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a1520] to-[#0d0b12]" />
    
    <div 
      className="absolute bottom-0 left-0 right-0 h-full opacity-40"
      style={{
        background: 'radial-gradient(circle at bottom center, #c9d4ff, transparent 70%)'
      }}
    />
    
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    />
    
    <Sparkles
      density={60}
      speed={1}
      size={1.5}
      color="#e0d4ff"
      direction="up"
      opacity={0.8}
      className="absolute inset-0"
    />
    
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <div className="text-center">
        <div className="inline-block px-3 py-1 text-xs rounded-full border border-[#c9d4ff] bg-[#1a1520] text-[#c9d4ff] mb-2">
          Organized
        </div>
        <div className="flex gap-2 justify-center">
          <span className="w-2 h-2 rounded-full bg-[#c9d4ff]" />
          <span className="w-2 h-2 rounded-full bg-[#e0d4ff]" />
          <span className="w-2 h-2 rounded-full bg-[#f5d4e8]" />
          <span className="w-2 h-2 rounded-full bg-[#edeffd]" />
        </div>
      </div>
    </div>
  </div>
);

const VARIANTS = [
  { label: "PNG Export", accent: "rgba(201,212,255,0.7)" },
  { label: "MP4 Video", accent: "rgba(224,212,255,0.7)" },
  { label: "GIF Animation", accent: "rgba(245,212,232,0.7)" },
  { label: "WebP / SVG", accent: "rgba(201,212,255,0.7)" },
];

const VariantTabs = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % 4), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ln-feat-vrows">
      {VARIANTS.map((v, i) => (
        <motion.div key={i} className="ln-feat-vrow" animate={{ opacity: i === active ? 1 : 0.3 }} transition={{ duration: 0.4 }}>
          <div className="ln-feat-vrow-dot" style={{ background: v.accent }} />
          <span className="ln-feat-vrow-label">{v.label}</span>
          <div className="ln-feat-vrow-bars">
            <div className="ln-feat-vrow-bar" style={{ width: `${35 + i * 8}%` }} />
            <div className="ln-feat-vrow-bar" style={{ width: `${20 + ((i + 2) % 4) * 7}%` }} />
            <div className="ln-feat-vrow-bar" style={{ width: `${45 + ((i + 1) % 3) * 10}%` }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const LocalProcessingVisual = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((p) => (p + 1) % 4), 1800);
    return () => clearInterval(id);
  }, []);

  const steps = [
    { label: "Image loaded", sub: "in browser memory" },
    { label: "Effects applied", sub: "locally via canvas" },
    { label: "Export ready", sub: "no server roundtrip" },
    { label: "Privacy kept", sub: "zero telemetry" },
  ];

  return (
    <div className="ln-feat-aichat">
      <div className="ln-feat-aichat-inner">
        <div className="ln-feat-aichat-head" />
        <div className="ln-feat-aichat-body">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="ln-feat-aichat-row"
              animate={{ opacity: i === step ? 1 : 0.25, x: i === step ? 0 : -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ln-feat-aichat-dot" style={{ background: i === step ? "rgba(201,212,255,0.8)" : "rgba(255,255,255,0.15)" }} />
              <div>
                <div className="ln-feat-aichat-q">{s.label}</div>
                <div className="ln-feat-aichat-a">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OpenSourceVisual = () => (
  <div className="ln-feat-stars">
    <span className="ln-feat-stars-label">Apache 2.0 License</span>
    <span className="ln-feat-stars-count">Open Source</span>
    <div className="ln-feat-stars-chart">
      <svg viewBox="0 0 200 50" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="starFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9d4ff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#f5d4e8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 45 C15 43,30 40,45 36 C60 32,75 30,90 26 C105 22,115 24,125 20 C140 15,155 12,170 10 C180 8,190 5,200 3 L200 50 L0 50Z" fill="url(#starFill)" />
        <motion.path d="M0 45 C15 43,30 40,45 36 C60 32,75 30,90 26 C105 22,115 24,125 20 C140 15,155 12,170 10 C180 8,190 5,200 3"
          stroke="rgba(201,212,255,0.5)" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>
    </div>
  </div>
);

const OpenSourceCard = () => (
  <div className="ln-feat-stars">
    <span className="ln-feat-stars-label">Apache 2.0 License</span>
    <span className="ln-feat-stars-count">Open Source</span>
    <div className="ln-feat-stars-chart">
      <svg viewBox="0 0 200 50" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="starFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9d4ff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#f5d4e8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 45 C15 43,30 40,45 36 C60 32,75 30,90 26 C105 22,115 24,125 20 C140 15,155 12,170 10 C180 8,190 5,200 3 L200 50 L0 50Z" fill="url(#starFill)" />
        <motion.path d="M0 45 C15 43,30 40,45 36 C60 32,75 30,90 26 C105 22,115 24,125 20 C140 15,155 12,170 10 C180 8,190 5,200 3"
          stroke="rgba(201,212,255,0.5)" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>
    </div>
  </div>
);

const CARDS = [
  { title: "Screenshot Studio", desc: "Transform raw screenshots into production-ready visuals with one click. Browser mockups, device frames, and stunning 3D effects.", span: 5, visual: <ComponentMarquee /> },
  { title: "Visual Effects", desc: "Add glow, particles, spotlight, and tilt effects to make your screenshots stand out.", span: 3, visual: <ToolsFloat /> },
  { title: "Well Organized", desc: "Four clear categories: Screenshots, Code Snippets, Device Frames, and Gradients. Find what you need fast.", span: 4, visual: <SparklesCard /> },
  { title: "Export Any Format", desc: "PNG, MP4, GIF - whatever you need for your content. High quality exports ready to share anywhere.", span: 4, visual: <VariantTabs /> },
  { title: "Local Processing", desc: "All editing happens in your browser. No server uploads, no data leaving your machine. Privacy first.", span: 5, visual: <LocalProcessingVisual /> },
  { title: "Open Source", desc: "Built in public with an Apache 2.0 license. Fork it, extend it, or self-host it. The code is yours.", span: 3, visual: <OpenSourceCard /> },
];

interface CardData {
  title: string;
  desc: string;
  span: number;
  visual: React.ReactNode;
}

const HoverCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  enableBorderGlow?: boolean;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = "",
  disableAnimations = false,
  enableBorderGlow = true,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const el = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const relativeX = (x / rect.width) * 100;
      const relativeY = (y / rect.height) * 100;
      el.style.setProperty("--glow-x", `${relativeX}%`);
      el.style.setProperty("--glow-y", `${relativeY}%`);
      el.style.setProperty("--glow-intensity", "1");

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        gsap.to(el, { rotateX, rotateY, duration: 0.15, ease: "power2.out", transformPerspective: 1000 });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;
        gsap.to(el, { x: magnetX, y: magnetY, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseLeave = () => {
      el.style.setProperty("--glow-intensity", "0");
      if (enableTilt) {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.4, ease: "power2.out" });
      }
      if (enableMagnetism) {
        gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement("div");
      ripple.style.cssText = `position:absolute;width:${maxDistance * 2}px;height:${maxDistance * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4)0%,rgba(${glowColor},0.2)30%,transparent 70%);left:${x - maxDistance}px;top:${y - maxDistance}px;pointer-events:none;z-index:1000;`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("click", handleClick);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("click", handleClick);
    };
  }, [disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} ${enableBorderGlow ? "card--border-glow" : ""}`} style={{ position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.15)0%,rgba(${glowColor},0.08)15%,rgba(${glowColor},0.04)25%,rgba(${glowColor},0.02)40%,rgba(${glowColor},0.01)65%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll(".ln-features-card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        cards.forEach((card) => { (card as HTMLElement).style.setProperty("--glow-intensity", "0"); });
        return;
      }

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        const proximity = spotlightRadius * 0.5;
        const fadeDistance = spotlightRadius * 0.75;
        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance) glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        cardElement.style.setProperty("--glow-intensity", glowIntensity.toString());
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(spotlightRef.current, { opacity: 0.6, duration: 0.2, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

const MagicBento: React.FC<BentoProps> = ({
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      <style>{`
        .bento-section { --glow-x: 50%; --glow-y: 50%; --glow-intensity: 0; --glow-radius: 200px; --glow-color: ${glowColor}; }
        .ln-features-card { grid-column: span 12; }
        @media (min-width: 1024px) {
          .ln-features-card:nth-child(1) { grid-column: span 5; }
          .ln-features-card:nth-child(2) { grid-column: span 3; }
          .ln-features-card:nth-child(3) { grid-column: span 4; }
          .ln-features-card:nth-child(4) { grid-column: span 4; }
          .ln-features-card:nth-child(5) { grid-column: span 5; }
          .ln-features-card:nth-child(6) { grid-column: span 3; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .ln-features-card:nth-child(odd) { grid-column: span 6; }
          .ln-features-card:nth-child(even) { grid-column: span 6; }
        }
        .card--border-glow::after { content: ''; position: absolute; inset: 0; padding: 2px; background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%, rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%, transparent 60%); border-radius: inherit; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude; pointer-events: none; opacity: 1; z-index: 1; }
        .card--border-glow:hover {}

        .ln-features-card { background: rgba(18, 15, 23, 0.45); backdrop-filter: blur(32px) saturate(1.3); -webkit-backdrop-filter: blur(32px) saturate(1.3); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; display: flex; flex-direction: column; transition: border-color 0.3s ease, translate 0.3s ease; overflow: hidden; }
        .ln-features-card:hover { border-color: rgba(255, 255, 255, 0.15); translate: 0 -2px; }
        .ln-features-card-visual { height: 180px; width: 100%; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .ln-features-card-body { padding: 18px 22px 22px; border-top: 1px solid rgba(255, 255, 255, 0.04); }
        .ln-features-card-body h3 { font-family: 'Geist', sans-serif; font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 6px; letter-spacing: -0.01em; }
        .ln-features-card-body p { font-family: 'Geist', sans-serif; font-size: 13px; line-height: 1.55; color: rgba(255, 255, 255, 0.5); margin: 0; }
        .ln-feat-marquee { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 0; mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%); -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%); }
        .ln-feat-marquee-track { overflow: hidden; width: 100%; }
        .ln-feat-marquee-scroll { display: flex; gap: 8px; width: max-content; animation: marqueeScroll 25s linear infinite; }
        .ln-feat-marquee-scroll--rev { animation: marqueeScrollRev 28s linear infinite; }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marqueeScrollRev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .ln-feat-pill { font-family: 'Geist Mono', monospace; font-size: 12px; color: rgba(255, 255, 255, 0.5); text-decoration: none; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 7px; padding: 5px 12px; white-space: nowrap; flex-shrink: 0; transition: border-color 0.2s, color 0.2s; }
        .ln-feat-pill:hover { border-color: rgba(255, 255, 255, 0.15); color: rgba(255, 255, 255, 0.85); }
        .ln-feat-tools { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .ln-feat-tool-box { position: absolute; display: flex; align-items: center; justify-content: center; border-radius: 14px; background: #1a1520; border: 1px solid rgba(255, 255, 255, 0.07); color: rgba(255, 255, 255, 0.5); z-index: 2; }
        .ln-feat-tool-box--center { width: 56px; height: 56px; top: calc(50% - 40px); left: calc(50% - 28px); color: rgba(255, 255, 255, 0.6); }
        .ln-feat-tool-box--left { width: 46px; height: 46px; top: calc(50% + 6px); left: calc(50% - 58px); transform: rotate(-12deg); }
        .ln-feat-tool-box--right { width: 46px; height: 46px; top: calc(50% + 6px); left: calc(50% + 12px); transform: rotate(12deg); }
        .ln-feat-orbit { position: relative; width: 280px; height: 280px; }
        .ln-feat-orbit-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 54px; height: 54px; border-radius: 50%; background: #1a1520; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; z-index: 3; }
        .ln-feat-orbit-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.05); }
        .ln-feat-orbit-ring--1 { width: 140px; height: 140px; margin: -70px 0 0 -70px; animation: spinCW 20s linear infinite; }
        .ln-feat-orbit-ring--2 { width: 260px; height: 260px; margin: -130px 0 0 -130px; animation: spinCCW 30s linear infinite; }
        .ln-feat-orbit-node { position: absolute; width: 42px; height: 42px; border-radius: 50%; background: #1a1520; border: 1px solid rgba(255, 255, 255, 0.08); display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.5); z-index: 2; }
        .ln-feat-orbit-ring--1 .ln-feat-orbit-node--top { top: -21px; left: calc(50% - 21px); }
        .ln-feat-orbit-ring--1 .ln-feat-orbit-node--right { right: -21px; top: calc(50% - 21px); }
        .ln-feat-orbit-ring--1 .ln-feat-orbit-node--bottom { bottom: -21px; left: calc(50% - 21px); }
        .ln-feat-orbit-ring--1 .ln-feat-orbit-node--left { left: -21px; top: calc(50% - 21px); }
        .ln-feat-orbit-ring--1 .ln-feat-orbit-node svg { animation: spinCCW 20s linear infinite; }
        .ln-feat-orbit-ring--2 .ln-feat-orbit-node--top { top: -21px; left: calc(50% - 21px); }
        .ln-feat-orbit-ring--2 .ln-feat-orbit-node--tr { top: calc(14.65% - 21px); left: calc(85.35% - 21px); }
        .ln-feat-orbit-ring--2 .ln-feat-orbit-node--right { top: calc(50% - 21px); left: calc(100% - 21px); }
        .ln-feat-orbit-ring--2 .ln-feat-orbit-node--br { top: calc(85.35% - 21px); left: calc(85.35% - 21px); }
        .ln-feat-orbit-ring--2 .ln-feat-orbit-node--bottom { top: calc(100% - 21px); left: calc(50% - 21px); }
        .ln-feat-orbit-ring--2 .ln-feat-orbit-node--bl { top: calc(85.35% - 21px); left: calc(14.65% - 21px); }
        .ln-feat-orbit-ring--2 .ln-feat-orbit-node--left { top: calc(50% - 21px); left: -21px; }
        .ln-feat-orbit-ring--2 .ln-feat-orbit-node--tl { top: calc(14.65% - 21px); left: calc(14.65% - 21px); }
        .ln-feat-orbit-ring--2 .ln-feat-orbit-node svg { animation: spinCW 30s linear infinite; }
        @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .ln-feat-vrows { display: flex; flex-direction: column; gap: 6px; width: 100%; height: 100%; padding: 14px; box-sizing: border-box; }
        .ln-feat-vrow { display: flex; align-items: center; gap: 10px; padding: 0 14px; border-radius: 10px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); flex: 1; }
        .ln-feat-vrow-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .ln-feat-vrow-label { font-family: 'Geist Mono', monospace; font-size: 12px; color: rgba(255, 255, 255, 0.7); white-space: nowrap; flex-shrink: 0; min-width: 80px; }
        .ln-feat-vrow-bars { display: flex; align-items: center; gap: 5px; flex: 1; min-width: 0; }
        .ln-feat-vrow-bar { height: 4px; border-radius: 2px; background: rgba(255, 255, 255, 0.06); }
        .ln-feat-aichat { width: 100%; height: 100%; padding: 14px; box-sizing: border-box; }
        .ln-feat-aichat-inner { width: 100%; height: 100%; display: flex; flex-direction: column; background: rgba(255, 255, 255, 0.005); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; overflow: hidden; }
        .ln-feat-aichat-head { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); flex-shrink: 0; }
        .ln-feat-aichat-dots { display: flex; gap: 5px; }
        .ln-feat-aichat-dots span { width: 7px; height: 7px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); }
        .ln-feat-aichat-title { font-family: 'Geist', sans-serif; font-size: 10px; color: rgba(255, 255, 255, 0.25); letter-spacing: 0.03em; }
        .ln-feat-aichat-prompt-row { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.03); flex-shrink: 0; }
        .ln-feat-aichat-chevron { font-family: 'Geist Mono', monospace; font-size: 11px; color: rgba(255, 255, 255, 0.35); flex-shrink: 0; }
        .ln-feat-aichat-prompt { font-family: 'Geist Mono', monospace; font-size: 11px; color: rgba(255, 255, 255, 0.45); white-space: nowrap; min-height: 1em; }
        .ln-feat-aichat-cursor { width: 2px; height: 13px; background: rgba(255, 255, 255, 0.5); border-radius: 1px; flex-shrink: 0; animation: cursorBlink 0.8s ease-in-out infinite; }
        .ln-feat-aichat-thinking { display: flex; align-items: center; gap: 4px; padding: 12px; flex-shrink: 0; }
        .ln-feat-aichat-thinking span { width: 5px; height: 5px; border-radius: 50%; background: rgba(255, 255, 255, 0.4); opacity: 0.4; animation: thinkPulse 1.2s ease-in-out infinite; }
        .ln-feat-aichat-thinking span:nth-child(2) { animation-delay: 0.2s; }
        .ln-feat-aichat-thinking span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes thinkPulse { 0%, 100% { opacity: 0.2; transform: scale(0.85); } 50% { opacity: 0.7; transform: scale(1); } }
        .ln-feat-aichat-code-block { display: flex; flex-direction: column; padding: 8px 0; flex: 1; min-height: 0; }
        .ln-feat-aichat-code-line { display: flex; align-items: center; gap: 0; padding: 3px 12px; font-family: 'Geist Mono', monospace; font-size: 11px; line-height: 1.6; min-height: 22px; white-space: pre; }
        .ln-feat-aichat-ln { color: rgba(255, 255, 255, 0.12); width: 20px; flex-shrink: 0; text-align: right; margin-right: 12px; font-size: 10px; }
        .ln-feat-aichat-body { display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 12px 14px; flex: 1; overflow: hidden; }
        .ln-feat-aichat-row { display: flex; align-items: flex-start; gap: 10px; }
        .ln-feat-aichat-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
        .ln-feat-aichat-q { font-family: 'Geist', sans-serif; font-size: 12px; color: rgba(255, 255, 255, 0.7); line-height: 1.4; }
        .ln-feat-aichat-a { font-family: 'Geist', sans-serif; font-size: 10px; color: rgba(255, 255, 255, 0.35); line-height: 1.3; }
        .ac-kw { color: rgba(255, 255, 255, 0.5); }
        .ac-comp { color: rgba(255, 255, 255, 0.8); }
        .ac-tag { color: rgba(255, 255, 255, 0.45); }
        .ac-attr { color: rgba(255, 255, 255, 0.6); }
        .ac-punc { color: rgba(255, 255, 255, 0.3); }
        .ac-num { color: rgba(255, 255, 255, 0.7); }
        .ac-str { color: rgba(255, 255, 255, 0.55); }
        @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .ln-feat-stars { width: 100%; height: 100%; padding: 18px 20px 0; box-sizing: border-box; display: flex; flex-direction: column; }
        .ln-feat-stars-label { font-family: 'Geist', sans-serif; font-size: 11px; color: rgba(255, 255, 255, 0.35); letter-spacing: 0.02em; }
        .ln-feat-stars-count { font-family: 'Geist', sans-serif; font-size: 52px; color: rgba(255, 255, 255, 0.45); letter-spacing: -0.03em; line-height: 1.15; background: linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 30%, transparent 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .ln-feat-stars-chart { flex: 1; min-height: 0; margin: 0 -20px; overflow: hidden; }
        .ln-feat-stars-chart svg { width: 100%; height: 100%; display: block; }
      `}</style>

      {enableSpotlight && <GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} glowColor={glowColor} />}

      <section className="bento-section py-20 w-full" ref={gridRef}>
        <div className="max-w-[1324px] w-full mx-auto">
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "Geist, sans-serif", fontSize: "32px", fontWeight: 500, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>What&apos;s inside</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "16px" }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className={`ln-features-card ${enableBorderGlow ? "card--border-glow" : ""}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <HoverCard disableAnimations={shouldDisableAnimations} enableBorderGlow={enableBorderGlow} glowColor={glowColor} enableTilt={enableTilt} clickEffect={clickEffect} enableMagnetism={enableMagnetism}>
                <div className="ln-features-card-visual">{card.visual}</div>
                <div className="ln-features-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </HoverCard>
            </motion.div>
          ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MagicBento;
