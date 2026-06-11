"use client";

import { useMemo, useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";

const meshGradients = {
  mesh_aurora: 'radial-gradient(at 40% 20%, hsla(330,100%,75%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(190,100%,75%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(270,100%,75%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(39,100%,75%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(210,100%,75%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(150,100%,75%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(60,100%,75%,1) 0px, transparent 50%)',
  mesh_sunset: 'radial-gradient(at 0% 0%, hsla(355,85%,65%,1) 0px, transparent 50%), radial-gradient(at 100% 0%, hsla(30,100%,75%,1) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(290,85%,55%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(15,100%,60%,1) 0px, transparent 50%)',
  mesh_ocean: 'radial-gradient(at 50% 0%, hsla(200,100%,75%,1) 0px, transparent 50%), radial-gradient(at 100% 50%, hsla(190,100%,60%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(180,100%,65%,1) 0px, transparent 50%), radial-gradient(at 50% 100%, hsla(220,100%,45%,1) 0px, transparent 50%)',
  mesh_cosmic: 'radial-gradient(at 10% 10%, hsla(260,100%,40%,1) 0px, transparent 50%), radial-gradient(at 90% 10%, hsla(300,100%,50%,1) 0px, transparent 50%), radial-gradient(at 50% 50%, hsla(220,100%,30%,1) 0px, transparent 50%), radial-gradient(at 90% 90%, hsla(190,100%,60%,1) 0px, transparent 50%), radial-gradient(at 10% 90%, hsla(270,100%,60%,1) 0px, transparent 50%)',
  mesh_candy: 'radial-gradient(at 30% 30%, hsla(340,100%,75%,1) 0px, transparent 50%), radial-gradient(at 70% 20%, hsla(280,100%,75%,1) 0px, transparent 50%), radial-gradient(at 20% 70%, hsla(45,100%,80%,1) 0px, transparent 50%), radial-gradient(at 80% 80%, hsla(330,100%,70%,1) 0px, transparent 50%)',
  mesh_electric: 'radial-gradient(at 0% 50%, hsla(180,100%,50%,1) 0px, transparent 50%), radial-gradient(at 100% 50%, hsla(290,100%,60%,1) 0px, transparent 50%), radial-gradient(at 50% 0%, hsla(200,100%,70%,1) 0px, transparent 50%), radial-gradient(at 50% 100%, hsla(270,100%,50%,1) 0px, transparent 50%)',
};

const magicGradients = {
  magic_amber_center: 'radial-gradient(circle, rgb(255, 184, 44) 0%, transparent 50%, black 100%)',
  magic_cyan_center: 'radial-gradient(circle, rgb(98, 185, 220) 0%, transparent 50%, black 100%)',
  magic_mint_center: 'radial-gradient(circle, rgb(0, 233, 161) 0%, transparent 50%, black 100%)',
  magic_orange_glow: 'radial-gradient(rgb(255, 77, 0) 0%, black 80%)',
  magic_orange_ring: 'radial-gradient(circle, transparent 0%, rgb(255, 77, 0) 50%, transparent 70%, black 100%)',
  magic_orange_mint_vertical: 'radial-gradient(at center bottom, rgb(255, 77, 0) 0%, transparent 60%), radial-gradient(at center top, rgb(0, 233, 161) 0%, transparent 60%), linear-gradient(135deg, rgb(10, 10, 10) 0%, rgb(10, 10, 10) 100%)',
};

type MeshKey = keyof typeof meshGradients;
type MagicKey = keyof typeof magicGradients;

interface OverlayShape {
  src: string;
  size: number;
  x: string;
  y: string;
  speed: number;
  opacity: number;
  rotation: number;
  animationStyle: "breathe" | "float" | "swing" | "drift";
}

interface BlobConfig {
  type: "mesh" | "magic" | "ring";
  size: number;
  x: string;
  y: string;
  blur: number;
  speed: number;
  opacity: number;
  gradient: MeshKey | MagicKey;
  animationStyle: "breathe" | "float" | "swing" | "drift";
}

interface Shapes3DProps {
  className?: string;
  variant?: "hero" | "manifesto" | "opensource" | "activity" | "cta" | "full";
}

type MeshKeyOrMagicKey = MeshKey | MagicKey;

const FULL_OVERLAYS: OverlayShape[] = [
  { src: "/overlay/Torus-Knot-Black.webp", size: 200, x: "82%", y: "8%", speed: 30, opacity: 0.2, rotation: 15, animationStyle: "float" },
  { src: "/overlay/Cube-Blue_5neS6XLEm.webp", size: 130, x: "15%", y: "22%", speed: 25, opacity: 0.18, rotation: -10, animationStyle: "breathe" },
  { src: "/overlay/Icosahedron-Black.webp", size: 100, x: "88%", y: "38%", speed: 35, opacity: 0.15, rotation: 25, animationStyle: "swing" },
  { src: "/overlay/Cone-Black_MA6nEafnH.webp", size: 140, x: "10%", y: "50%", speed: 28, opacity: 0.18, rotation: -20, animationStyle: "float" },
  { src: "/overlay/Torus-Black.webp", size: 120, x: "85%", y: "60%", speed: 22, opacity: 0.15, rotation: 10, animationStyle: "swing" },
  { src: "/overlay/Hemisphere-Black.webp", size: 90, x: "20%", y: "72%", speed: 18, opacity: 0.12, rotation: 0, animationStyle: "drift" },
  { src: "/overlay/Cylinder-Black.webp", size: 130, x: "75%", y: "82%", speed: 30, opacity: 0.18, rotation: 10, animationStyle: "breathe" },
  { src: "/overlay/Pill-Black.webp", size: 95, x: "12%", y: "92%", speed: 20, opacity: 0.15, rotation: 30, animationStyle: "swing" },
  { src: "/overlay/Sphere-Black_J0R1G4FTa.webp", size: 180, x: "55%", y: "15%", speed: 35, opacity: 0.12, rotation: 0, animationStyle: "breathe" },
];

const FULL_BLOBS: BlobConfig[] = [
  { type: "mesh", size: 700, x: "10%", y: "3%", blur: 120, speed: 30, opacity: 0.1, gradient: "mesh_aurora", animationStyle: "breathe" },
  { type: "magic", size: 500, x: "80%", y: "15%", blur: 80, speed: 35, opacity: 0.08, gradient: "magic_amber_center", animationStyle: "float" },
  { type: "ring", size: 400, x: "50%", y: "30%", blur: 60, speed: 25, opacity: 0.06, gradient: "magic_orange_ring", animationStyle: "swing" },
  { type: "mesh", size: 450, x: "5%", y: "40%", blur: 90, speed: 28, opacity: 0.08, gradient: "mesh_sunset", animationStyle: "drift" },
  { type: "magic", size: 600, x: "88%", y: "48%", blur: 100, speed: 32, opacity: 0.07, gradient: "magic_mint_center", animationStyle: "breathe" },
  { type: "ring", size: 350, x: "30%", y: "58%", blur: 55, speed: 22, opacity: 0.05, gradient: "magic_orange_glow", animationStyle: "float" },
  { type: "mesh", size: 500, x: "70%", y: "68%", blur: 85, speed: 26, opacity: 0.07, gradient: "mesh_ocean", animationStyle: "swing" },
  { type: "magic", size: 400, x: "15%", y: "78%", blur: 70, speed: 30, opacity: 0.06, gradient: "magic_cyan_center", animationStyle: "drift" },
  { type: "ring", size: 300, x: "60%", y: "88%", blur: 50, speed: 24, opacity: 0.05, gradient: "magic_orange_ring", animationStyle: "breathe" },
  { type: "mesh", size: 600, x: "85%", y: "92%", blur: 100, speed: 28, opacity: 0.06, gradient: "mesh_cosmic", animationStyle: "float" },
];

const OVERLAY_CONFIGS: Record<string, OverlayShape[]> = {
  hero: [
    { src: "/overlay/Torus-Knot-Black.webp", size: 180, x: "78%", y: "15%", speed: 30, opacity: 0.25, rotation: 15, animationStyle: "float" },
    { src: "/overlay/Cube-Blue_5neS6XLEm.webp", size: 120, x: "20%", y: "65%", speed: 25, opacity: 0.2, rotation: -10, animationStyle: "breathe" },
    { src: "/overlay/Sphere-Black_J0R1G4FTa.webp", size: 100, x: "55%", y: "80%", speed: 20, opacity: 0.15, rotation: 0, animationStyle: "drift" },
    { src: "/overlay/Icosahedron-Black.webp", size: 90, x: "88%", y: "60%", speed: 35, opacity: 0.18, rotation: 25, animationStyle: "swing" },
  ],
  manifesto: [
    { src: "/overlay/Cone-Black_MA6nEafnH.webp", size: 140, x: "15%", y: "20%", speed: 28, opacity: 0.2, rotation: -20, animationStyle: "float" },
    { src: "/overlay/Torus-Black.webp", size: 110, x: "80%", y: "70%", speed: 22, opacity: 0.18, rotation: 10, animationStyle: "swing" },
    { src: "/overlay/Hemisphere-Black.webp", size: 85, x: "65%", y: "15%", speed: 18, opacity: 0.15, rotation: 0, animationStyle: "drift" },
  ],
  opensource: [
    { src: "/overlay/Cylinder-Black.webp", size: 130, x: "22%", y: "30%", speed: 30, opacity: 0.2, rotation: 10, animationStyle: "breathe" },
    { src: "/overlay/Cuboid-Black.webp", size: 100, x: "75%", y: "55%", speed: 25, opacity: 0.18, rotation: -15, animationStyle: "float" },
    { src: "/overlay/Pill-Black.webp", size: 90, x: "90%", y: "18%", speed: 20, opacity: 0.15, rotation: 30, animationStyle: "swing" },
  ],
  activity: [
    { src: "/overlay/Torus-Knot-Black.webp", size: 150, x: "82%", y: "10%", speed: 32, opacity: 0.2, rotation: -5, animationStyle: "drift" },
    { src: "/overlay/Cube-Blue_5neS6XLEm.webp", size: 100, x: "15%", y: "60%", speed: 26, opacity: 0.18, rotation: 20, animationStyle: "swing" },
    { src: "/overlay/Cone-Black_MA6nEafnH.webp", size: 80, x: "50%", y: "40%", speed: 22, opacity: 0.15, rotation: -10, animationStyle: "float" },
  ],
  cta: [
    { src: "/overlay/Sphere-Black_J0R1G4FTa.webp", size: 200, x: "50%", y: "50%", speed: 35, opacity: 0.15, rotation: 0, animationStyle: "breathe" },
    { src: "/overlay/Torus-Black.webp", size: 140, x: "20%", y: "20%", speed: 28, opacity: 0.18, rotation: 15, animationStyle: "float" },
    { src: "/overlay/Icosahedron-Black.webp", size: 110, x: "80%", y: "75%", speed: 24, opacity: 0.15, rotation: -25, animationStyle: "swing" },
    { src: "/overlay/Hemisphere-Black.webp", size: 85, x: "35%", y: "80%", speed: 20, opacity: 0.12, rotation: 5, animationStyle: "drift" },
  ],
};

const BLOB_CONFIGS: Record<string, BlobConfig[]> = {
  hero: [
    { type: "mesh", size: 650, x: "15%", y: "5%", blur: 100, speed: 28, opacity: 0.12, gradient: "mesh_aurora", animationStyle: "breathe" },
    { type: "magic", size: 450, x: "78%", y: "55%", blur: 70, speed: 35, opacity: 0.1, gradient: "magic_amber_center", animationStyle: "float" },
    { type: "ring", size: 350, x: "50%", y: "85%", blur: 50, speed: 22, opacity: 0.08, gradient: "magic_orange_ring", animationStyle: "swing" },
    { type: "mesh", size: 250, x: "85%", y: "10%", blur: 60, speed: 20, opacity: 0.08, gradient: "mesh_electric", animationStyle: "drift" },
  ],
  manifesto: [
    { type: "magic", size: 500, x: "12%", y: "25%", blur: 80, speed: 30, opacity: 0.1, gradient: "magic_cyan_center", animationStyle: "float" },
    { type: "mesh", size: 400, x: "82%", y: "65%", blur: 60, speed: 25, opacity: 0.08, gradient: "mesh_sunset", animationStyle: "breathe" },
    { type: "ring", size: 280, x: "60%", y: "10%", blur: 40, speed: 18, opacity: 0.06, gradient: "magic_orange_ring", animationStyle: "swing" },
  ],
  opensource: [
    { type: "ring", size: 550, x: "18%", y: "35%", blur: 80, speed: 32, opacity: 0.08, gradient: "magic_orange_glow", animationStyle: "swing" },
    { type: "magic", size: 380, x: "72%", y: "55%", blur: 65, speed: 28, opacity: 0.1, gradient: "magic_amber_center", animationStyle: "drift" },
    { type: "mesh", size: 300, x: "88%", y: "15%", blur: 45, speed: 22, opacity: 0.06, gradient: "mesh_cosmic", animationStyle: "breathe" },
  ],
  activity: [
    { type: "magic", size: 550, x: "80%", y: "8%", blur: 85, speed: 30, opacity: 0.08, gradient: "magic_mint_center", animationStyle: "float" },
    { type: "mesh", size: 400, x: "12%", y: "60%", blur: 60, speed: 26, opacity: 0.08, gradient: "mesh_ocean", animationStyle: "breathe" },
    { type: "ring", size: 250, x: "55%", y: "35%", blur: 35, speed: 20, opacity: 0.05, gradient: "magic_orange_ring", animationStyle: "swing" },
  ],
  cta: [
    { type: "magic", size: 750, x: "50%", y: "50%", blur: 120, speed: 35, opacity: 0.1, gradient: "magic_orange_mint_vertical", animationStyle: "breathe" },
    { type: "mesh", size: 500, x: "18%", y: "18%", blur: 70, speed: 28, opacity: 0.06, gradient: "mesh_candy", animationStyle: "float" },
    { type: "ring", size: 400, x: "82%", y: "72%", blur: 55, speed: 24, opacity: 0.05, gradient: "magic_mint_center", animationStyle: "drift" },
    { type: "magic", size: 250, x: "30%", y: "78%", blur: 50, speed: 18, opacity: 0.06, gradient: "magic_amber_center", animationStyle: "swing" },
  ],
};

function getAnimationVariant(style: string, speed: number) {
  const dur = speed;
  const t = { duration: dur, repeat: Infinity, ease: [0.4, 0, 0.2, 1] };
  switch (style) {
    case "breathe":
      return { scale: [1, 1.04, 1, 0.97, 1], rotateX: [0, 2, 0, -2, 0], rotateY: [0, -2, 0, 2, 0], transition: t };
    case "float":
      return { y: [0, -8, 0, 8, 0], rotateX: [0, 3, 0, -3, 0], transition: t };
    case "swing":
      return { rotateZ: [0, -6, 0, 5, 0], rotateY: [0, -8, 0, 6, 0], transition: t };
    case "drift":
      return { x: [0, 10, 0, -10, 0], rotateY: [0, 4, 0, -4, 0], transition: t };
    default:
      return { transition: t };
  }
}

function OverlayShape({ config }: { config: OverlayShape }) {
  const animate = getAnimationVariant(config.animationStyle, config.speed);
  return (
    <motion.img
      src={config.src}
      alt=""
      className="pointer-events-none absolute select-none"
      style={{
        left: config.x, top: config.y,
        width: config.size, height: config.size,
        marginLeft: -(config.size / 2), marginTop: -(config.size / 2),
        zIndex: 0,
        opacity: config.opacity,
        rotate: `${config.rotation}deg`,
        filter: "contrast(0.7) brightness(0.8)",
      }}
      animate={animate as any}
      draggable={false}
    />
  );
}

function GradientBlob({ config }: { config: BlobConfig }) {
  const bg = config.type === "mesh"
    ? meshGradients[config.gradient as MeshKey]
    : magicGradients[config.gradient as MagicKey];
  const animate = getAnimationVariant(config.animationStyle, config.speed);
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: config.x, top: config.y,
        width: config.size, height: config.size,
        marginLeft: -(config.size / 2), marginTop: -(config.size / 2),
        zIndex: -1,
        perspective: "2400px",
      }}
      animate={animate as any}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: bg,
          filter: `blur(${config.blur}px)`,
          opacity: config.opacity,
          willChange: "transform",
        }}
      />
    </motion.div>
  );
}

function MovingBorderRing({ config }: { config: { size: number; x: string; y: string; speed: number; blur: number } }) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);
  const duration = config.speed * 100;

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: config.x, top: config.y,
        width: config.size, height: config.size,
        marginLeft: -(config.size / 2), marginTop: -(config.size / 2),
        zIndex: 0,
      }}
    >
      <svg preserveAspectRatio="none" className="absolute h-full w-full" width="100%" height="100%">
        <rect fill="none" width="100%" height="100%" rx="30%" ry="30%" ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute", top: 0, left: 0, display: "inline-block", transform,
        }}
      >
        <div
          className="h-16 w-16 rounded-full"
          style={{
            background: "radial-gradient(rgba(255,126,64,0.5) 40%, transparent 60%)",
            filter: `blur(${config.blur}px)`,
            opacity: 0.4,
          }}
        />
      </motion.div>
    </div>
  );
}

export default function Shapes3D({ className = "", variant = "hero" }: Shapes3DProps) {
  const isFull = variant === "full";
  const blobs = useMemo(() => isFull ? FULL_BLOBS : (BLOB_CONFIGS[variant] || BLOB_CONFIGS.hero), [variant, isFull]);
  const overlays = useMemo(() => isFull ? FULL_OVERLAYS : (OVERLAY_CONFIGS[variant] || OVERLAY_CONFIGS.hero), [variant, isFull]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {blobs.map((blob, i) => <GradientBlob key={`blob-${i}`} config={blob} />)}
      {overlays.map((shape, i) => <OverlayShape key={`overlay-${i}`} config={shape} />)}
      {variant === "hero" && !isFull && <MovingBorderRing config={{ size: 400, x: "58%", y: "30%", speed: 8, blur: 40 }} />}
    </div>
  );
}
