"use client";

import dynamic from "next/dynamic";
import CommunityHero from "@/app/components/community/Hero";
import OpenSource from "@/app/components/community/OpenSource";
import Activity from "@/app/components/community/Activity";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Shapes3D from "@/app/components/Shapes3D";

const Manifesto = dynamic(() => import("@/app/components/community/Manifesto"), { ssr: false });

const ContributionFlow = dynamic(() => import("@/app/components/community/ContributionFlow"), { ssr: false });

const Integrations = dynamic(() => import("@/app/components/community/Integrations"), { ssr: false });

const CommunityCTA = dynamic(() => import("@/app/components/community/CTA"), { ssr: false });

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen bg-[#0b0b0c]">
      <Navbar />
      <Shapes3D variant="full" />
      <CommunityHero />
      <Manifesto />
      <OpenSource />
      <Activity />
      <ContributionFlow />
      <Integrations />
      <CommunityCTA />
      <Footer />
    </main>
  );
}
