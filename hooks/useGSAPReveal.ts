"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface RevealConfig {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: gsap.DOMTarget;
  scroller?: gsap.DOMTarget;
  markers?: boolean;
}

export function useGSAPReveal<T extends HTMLElement>(config: RevealConfig = {}) {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const ctx = gsap.context(() => {
      const fromVars = config.from ?? { opacity: 0, y: 40 };
      const toVars = config.to ?? {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: config.trigger ?? ref.current,
          scroller: config.scroller,
          markers: config.markers,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      };

      gsap.fromTo(ref.current, fromVars, toVars);
    });

    return () => ctx.revert();
  }, [prefersReduced, config.from, config.to, config.trigger, config.scroller, config.markers]);

  return ref;
}
