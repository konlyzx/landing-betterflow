"use client";

import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";
import FooterMobile from "./components/mobile/FooterMobile";
import { Hero, Features, LiveDemo, Privacy, RoadmapSection, CTA } from "./sections";
import {
  HeroMobile,
  FeaturesMobile,
  LiveDemoMobile,
  PrivacyMobile,
  RoadmapSectionMobile,
  CTAMobile,
} from "./sections/mobile";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0b0b0c]">
      <LoadingScreen />

      <div className="hidden md:block">
        <Hero />
        <LiveDemo />
        <Features />
        <Privacy />
        <RoadmapSection />
        <CTA />
        <Footer />
      </div>

      <div className="md:hidden">
        <HeroMobile />
        <LiveDemoMobile />
        <FeaturesMobile />
        <PrivacyMobile />
        <RoadmapSectionMobile />
        <CTAMobile />
        <FooterMobile />
      </div>
    </main>
  );
}
