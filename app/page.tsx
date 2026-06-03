"use client";

import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";
import { Hero, Features, LiveDemo, Privacy, RoadmapSection, CTA, AIInfo } from "./sections";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0b0b0c]">
      <LoadingScreen />
      
      <Hero />
      <LiveDemo />
      <Features />
      <Privacy />
      <RoadmapSection />
      <CTA />
      <AIInfo />
      
      <Footer />
    </main>
  );
}
