"use client";

import { ReactNode } from "react";

interface ShinyTextProps {
  children: ReactNode;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({ children, disabled = false, speed = 5, className = "" }: ShinyTextProps) {
  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>

      <span
        className="pointer-events-none absolute inset-0 z-20 bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.9) 47%, rgba(255, 255, 255, 0) 54%)",
          backgroundSize: "200% auto",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          animation: `shine ${speed}s linear infinite`,
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
