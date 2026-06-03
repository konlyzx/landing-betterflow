"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface FloatingCard {
  id: string;
  image: string;
  label: string;
  position: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    width: string;
    height: string;
  };
  zIndex: number;
  delay: number;
  rotateRange: number;
}

// Cards positioned within a contained area (percentage-based)
const cards: FloatingCard[] = [
  {
    id: "card-1",
    image: "/images/card-glass-tiles.jpg",
    label: "GlassTiles",
    position: { left: "0%", top: "12%", width: "46%", height: "58%" },
    zIndex: 10,
    delay: 0.2,
    rotateRange: 3,
  },
  {
    id: "card-2",
    image: "/images/card-halftone.jpg",
    label: "DitherCursor",
    position: { right: "0%", top: "26%", width: "50%", height: "60%" },
    zIndex: 10,
    delay: 0.3,
    rotateRange: 2,
  },
  {
    id: "card-3",
    image: "/images/card-liquid.jpg",
    label: "MetallicSwirl",
    position: { left: "12%", bottom: "0%", width: "44%", height: "26%" },
    zIndex: 15,
    delay: 0.4,
    rotateRange: 4,
  },
  {
    id: "card-4",
    image: "/images/card-sphere.jpg",
    label: "FogSphere",
    position: { right: "8%", bottom: "4%", width: "30%", height: "30%" },
    zIndex: 25,
    delay: 0.5,
    rotateRange: 2,
  },
];

const FloatingCardComponent = ({ card }: { card: FloatingCard }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  const rotate = useSpring(useTransform(mouseX, [-0.5, 0.5], [-card.rotateRange, card.rotateRange]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize mouse position relative to card center (-0.5 to 0.5)
      const normalizedX = (e.clientX - centerX) / window.innerWidth;
      const normalizedY = (e.clientY - centerY) / window.innerHeight;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const isRound = card.id === "card-4";

  return (
    <motion.div
      ref={cardRef}
      className={`absolute overflow-hidden border border-white/10 bg-[#111] shadow-2xl group ${isRound ? "rounded-full" : "rounded-3xl"}`}
      style={{
        ...card.position,
        zIndex: card.zIndex,
        x: parallaxX,
        y: parallaxY,
        rotate: rotate,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: card.delay,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Card image */}
      <div className="w-full h-full">
        <img
          src={card.image}
          alt={card.label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Hover overlay with label */}
      <div 
        className={`pointer-events-none absolute inset-x-0 top-0 z-10 flex h-20 items-start justify-between gap-2 px-3 pt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${isRound ? "items-center justify-center" : ""}`}
        style={{
          background: isRound 
            ? "radial-gradient(120% 90% at 50% 0%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)"
            : "linear-gradient(rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.65) 20%, rgba(0,0,0,0.25) 50%, transparent 100%)"
        }}
      >
        {!isRound && (
          <>
            <span className="text-sm font-medium text-white">{card.label}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
              </svg>
            </div>
          </>
        )}
        {isRound && (
          <div className="flex aspect-square w-[20%] items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Gradient blob background
const GradientBlobs = () => (
  <div className="pointer-events-none absolute inset-0 -z-10">
    <div 
      className="absolute inset-x-4 inset-y-8 opacity-70 blur-3xl"
      style={{
        background: "radial-gradient(55% 55% at 35% 40%, #7c3aed 0%, transparent 70%)",
        animation: "hero-blob-breathe 9s ease-in-out infinite"
      }}
    />
    <div 
      className="absolute inset-x-4 inset-y-8 opacity-60 blur-3xl"
      style={{
        background: "radial-gradient(50% 50% at 70% 65%, #ff5fbf 0%, transparent 70%)",
        animation: "hero-blob-breathe 11s ease-in-out infinite",
        animationDelay: "-3s"
      }}
    />
    <div 
      className="absolute inset-x-4 inset-y-8 opacity-55 blur-3xl"
      style={{
        background: "radial-gradient(45% 45% at 25% 75%, #a855f7 0%, transparent 70%)",
        animation: "hero-blob-breathe 13s ease-in-out infinite",
        animationDelay: "-6s"
      }}
    />
    <style>{`
      @keyframes hero-blob-breathe {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `}</style>
  </div>
);

export function FloatingCardsContainer() {
  return (
    <div className="relative w-full max-w-[500px] aspect-[4/5] sm:aspect-[5/6] md:aspect-square">
      <GradientBlobs />
      {cards.map((card) => (
        <FloatingCardComponent key={card.id} card={card} />
      ))}
    </div>
  );
}

// Grid-compatible exports
export function FloatingCardsLeft() {
  return (
    <div className="relative z-10">
      <FloatingCardsContainer />
    </div>
  );
}

export function FloatingCardsRight() {
  return (
    <div className="relative z-10">
      <FloatingCardsContainer />
    </div>
  );
}

export default FloatingCardsContainer;
