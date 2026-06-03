"use client";

import { useRef, useEffect } from "react";

interface Orb {
  x: number;
  y: number;
  r: number;
  baseR: number;
  vx: number;
  vy: number;
  opacity: number;
  hue: number;
  phase: number;
  pulseSpeed: number;
}

export default function FloatingOrbs({
  count = 12,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const dimsRef = useRef({ w: 0, h: 0, dpr: 1 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dimsRef.current = { w: rect.width, h: rect.height, dpr };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Initialize orbs
    const { w, h } = dimsRef.current;
    orbsRef.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 2 + Math.random() * 4,
      baseR: 2 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.12,
      opacity: 0.15 + Math.random() * 0.25,
      hue: [255, 126, 64] as unknown as number, // brand orange
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.3 + Math.random() * 0.5,
    }));

    const animate = (time: number) => {
      const { w, h } = dimsRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const orb of orbsRef.current) {
        // Very slow drift
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Wrap around edges gently
        if (orb.x < -20) orb.x = w + 20;
        if (orb.x > w + 20) orb.x = -20;
        if (orb.y < -20) orb.y = h + 20;
        if (orb.y > h + 20) orb.y = -20;

        // Gentle pulse
        const pulse =
          1 + Math.sin(time * 0.001 * orb.pulseSpeed + orb.phase) * 0.3;
        orb.r = orb.baseR * pulse;

        // Draw soft glow
        const g = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.r * 4
        );
        g.addColorStop(0, `rgba(201, 212, 255, ${orb.opacity})`);
        g.addColorStop(0.4, `rgba(164, 69, 255, ${orb.opacity * 0.5})`);
        g.addColorStop(1, "rgba(164, 69, 255, 0)");

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${orb.opacity * 0.8})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
