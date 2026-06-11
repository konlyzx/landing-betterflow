"use client";

import { useEffect, useRef } from "react";

interface SparklesProps {
  className?: string;
  size?: number;
  density?: number;
  speed?: number;
  opacity?: number;
  direction?: "up" | "down" | "left" | "right";
  color?: string;
  background?: string;
}

export function Sparkles({
  className = "",
  size = 1.2,
  density = 100,
  speed = 1,
  opacity = 0.8,
  direction = "up",
  color = "#ffffff",
  background = "transparent",
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    // Create particles
    for (let i = 0; i < density; i++) {
      const particle = document.createElement("div");
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomDelay = Math.random() * 3;
      const randomDuration = 2 + Math.random() * 3;
      const randomSize = size * (0.5 + Math.random());

      particle.style.cssText = `
        position: absolute;
        left: ${randomX}%;
        top: ${randomY}%;
        width: ${randomSize}px;
        height: ${randomSize}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${opacity * (0.3 + Math.random() * 0.7)};
        animation: sparkle-${direction} ${randomDuration}s ease-in-out ${randomDelay}s infinite;
        pointer-events: none;
      `;

      container.appendChild(particle);
      particles.push(particle);
    }

    // Add keyframes if not already added
    if (!document.getElementById("sparkles-keyframes")) {
      const style = document.createElement("style");
      style.id = "sparkles-keyframes";
      style.textContent = `
        @keyframes sparkle-up {
          0% { transform: translateY(20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        @keyframes sparkle-down {
          0% { transform: translateY(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        @keyframes sparkle-left {
          0% { transform: translateX(20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-20px); opacity: 0; }
        }
        @keyframes sparkle-right {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(20px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [density, size, opacity, direction, color]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    />
  );
}
