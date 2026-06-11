"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export default function BeforeAfter() {
  const [position, setPosition] = useState(38);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dimsRef = useRef({ w: 0, h: 0, dpr: 1 });
  const imgsRef = useRef<{ before: HTMLImageElement | null; after: HTMLImageElement | null }>({
    before: null,
    after: null,
  });
  const hasAutoSlid = useRef(false);
  const posRef = useRef(38);

  posRef.current = position;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const { w, h, dpr } = dimsRef.current;
    if (!w || !h) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const before = imgsRef.current.before;
    const after = imgsRef.current.after;
    if (!before || !after) return;

    const pct = posRef.current / 100;
    const splitX = w * pct;

    ctx.clearRect(0, 0, w, h);

    // Draw before (original) full background
    ctx.drawImage(before, 0, 0, before.naturalWidth, before.naturalHeight, 0, 0, w, h);

    // Clip right side and draw after (better flow) on top
    ctx.save();
    ctx.beginPath();
    ctx.rect(splitX, 0, w - splitX, h);
    ctx.clip();
    ctx.drawImage(after, 0, 0, after.naturalWidth, after.naturalHeight, 0, 0, w, h);
    ctx.restore();
  }, []);

  // Load images once
  useEffect(() => {
    const before = new Image();
    const after = new Image();
    before.crossOrigin = "anonymous";
    after.crossOrigin = "anonymous";
    before.src = "/images/before.webp";
    after.src = "/images/after.webp";

    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === 2) {
        imgsRef.current = { before, after };
        draw();
      }
    };
    before.onload = onLoad;
    after.onload = onLoad;
  }, [draw]);

  // Resize observer + redraw
  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;
      dimsRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [draw]);

  // Redraw on position change
  useEffect(() => {
    draw();
  }, [position, draw]);

  const handleMove = useCallback((clientX: number) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    if (hasAutoSlid.current) return;
    hasAutoSlid.current = true;
    const start = 38;
    const end = 62;
    const duration = 800;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPosition(start + (end - start) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="relative z-10 mt-30 px-6 py-16">
      <div className="mx-auto flex max-w-[1324px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <span className="text-xs font-medium tracking-widest text-[#a1a1aa] uppercase">Move to compare</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          ref={wrapRef}
          className="relative aspect-[16/10] w-full cursor-ew-resize overflow-hidden rounded-2xl border border-white/10 select-none"
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          <div
            className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.3)]"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          />
          <div
            className="pointer-events-none absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md"
            style={{ left: `${position}%` }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/80">
              <path
                d="M5 3L1 8L5 13M11 3L15 8L11 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md"
            style={{ opacity: position > 15 ? 1 : 0, transition: "opacity 0.3s" }}
          >
            Original
          </div>
          <div
            className="pointer-events-none absolute top-4 right-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md"
            style={{ opacity: position < 85 ? 1 : 0, transition: "opacity 0.3s" }}
          >
            Better Flow
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-center"
        >
          <p className="text-sm text-[#71717a]">No editing skills required.</p>
        </motion.div>
      </div>
    </section>
  );
}
