"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  items?: ReactNode[];
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
  isPaused?: boolean;
}

export default function Marquee({
  items = [],
  speed = 25,
  className = "",
  pauseOnHover = false,
  isPaused = false,
}: MarqueeProps) {
  const allItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <style>{`
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-75%); } }
        .marquee-track { width: 100%; }
        .marquee-scroll { display: flex; gap: 12px; width: max-content; padding: 6px 0; animation: marqueeScroll ${speed}s linear infinite; }
        .marquee-scroll.paused { animation-play-state: paused; }
        .marquee-pill { font-family: 'Geist Mono', monospace; font-size: 12px; color: rgba(255, 255, 255, 0.5); background: rgba(255, 255, 255, 0.04); padding: 5px 12px; white-space: nowrap; flex-shrink: 0; transition: border-color 0.2s, color 0.2s; }
        .marquee-pill:hover { border-color: rgba(255, 255, 255, 0.15); color: rgba(255, 255, 255, 0.85); }
        .marquee-item { display: flex; align-items: center; flex-shrink: 0; white-space: nowrap; }
      `}</style>
      <div style={{ maskImage: "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)" }}>
        <div className="marquee-track">
          <div className={`marquee-scroll ${isPaused ? 'paused' : ''}`}>
            {allItems.map((item, i) => (
              <span key={i} className={typeof item === 'string' ? 'marquee-pill' : 'marquee-item'}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
