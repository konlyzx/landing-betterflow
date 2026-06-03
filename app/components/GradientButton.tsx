"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  title?: string;
}

export default function GradientButton({
  children,
  href,
  onClick,
  className = "",
  icon,
  disabled,
  title,
}: GradientButtonProps) {
  const content = (
    <motion.span
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-black bg-[linear-gradient(110deg,#c9d4ff_0%,#e0d4ff_45%,#f5d4e8_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(80,60,120,0.15)] transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5 ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block" title={title}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block" disabled={disabled} title={title}>
      {content}
    </button>
  );
}
