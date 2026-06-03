"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  span?: number;
}

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
  span = 1,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`glass-card overflow-hidden card-lift ${className}`}
      style={{
        gridColumn: `span ${span}`,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: delay * 0.07,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
