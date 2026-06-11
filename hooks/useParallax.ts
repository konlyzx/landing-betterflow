"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface ParallaxConfig {
  strength?: number;
  damping?: number;
}

export function useParallax<T extends HTMLElement>({ strength = 20, damping = 0.1 }: ParallaxConfig = {}) {
  const ref = useRef<T>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const el = ref.current;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetRef.current.x = ((e.clientX - centerX) / window.innerWidth) * strength;
      targetRef.current.y = ((e.clientY - centerY) / window.innerHeight) * strength;
    };

    const animate = () => {
      offsetRef.current.x = lerp(offsetRef.current.x, targetRef.current.x, damping);
      offsetRef.current.y = lerp(offsetRef.current.y, targetRef.current.y, damping);
      el.style.transform = `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      el.style.transform = "";
    };
  }, [strength, damping, prefersReduced, lerp]);

  return ref;
}
