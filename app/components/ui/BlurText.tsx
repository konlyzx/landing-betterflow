"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom" | "left" | "right" | "none";
}

export default function BlurText({
  text,
  delay = 0.05,
  speed = 0.5,
  className = "",
  animateBy = "letters",
  direction = "bottom",
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const items = animateBy === "words" ? text.split(" ") : text.split("");

  const getDirectionOffset = () => {
    switch (direction) {
      case "top":
        return { y: -20, x: 0 };
      case "bottom":
        return { y: 20, x: 0 };
      case "left":
        return { y: 0, x: -20 };
      case "right":
        return { y: 0, x: 20 };
      default:
        return { y: 0, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      ...offset,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: {
        duration: speed,
        ease: [0.21, 0.47, 0.32, 0.98] as any,
      },
    },
  };

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={childVariants}
          style={{
            display: "inline-block",
            whiteSpace: item === " " ? "pre" : "normal",
          }}
        >
          {item}
        </motion.span>
      ))}
    </motion.span>
  );
}
