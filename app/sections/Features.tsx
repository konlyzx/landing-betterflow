"use client";

import MagicBento from "../components/MagicBento";

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-24">
      <div className="max-w-[1324px] mx-auto px-6">
        <MagicBento
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          glowColor="201, 221, 255"
        />
      </div>
    </section>
  );
}
