"use client";

import LoadingScreen from "../components/LoadingScreen";
import FooterMobile from "../components/mobile/FooterMobile";
import {
  HeroMobile,
  FeaturesMobile,
  LiveDemoMobile,
  PrivacyMobile,
  RoadmapSectionMobile,
  CTAMobile,
} from "../sections/mobile";

export default function MobileLandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0b0b0c] overflow-x-hidden">
      <LoadingScreen />

      <HeroMobile />
      <LiveDemoMobile />
      <FeaturesMobile />
      <PrivacyMobile />
      <RoadmapSectionMobile />
      <CTAMobile />

      <FooterMobile />
    </main>
  );
}
