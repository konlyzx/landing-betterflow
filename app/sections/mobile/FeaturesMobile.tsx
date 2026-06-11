"use client";

import MagicBento from "../../components/MagicBento";

export default function FeaturesMobile() {
  return (
    <section id="features" className="relative z-10 py-12">
      <div className="mx-auto max-w-[1324px] px-4">
        <MagicBento
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={200}
          glowColor="201, 221, 255"
        />
      </div>
    </section>
  );
}
