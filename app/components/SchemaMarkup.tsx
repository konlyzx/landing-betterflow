"use client";

import Script from "next/script";

export default function SchemaMarkup() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Better Flow",
    url: "https://betterflow.site",
    logo: "https://betterflow.site/logo.svg",
    sameAs: [
      "https://github.com/betterspacx",
      "https://x.com/betterflow",
    ],
    description:
      "Free open-source screenshot studio. Transform screenshots into production-ready visuals with browser frames, 3D effects, and animations.",
    founder: {
      "@type": "Person",
      name: "Better Flow Team",
    },
    email: "hello@betterflow.site",
    brand: {
      "@type": "Brand",
      name: "Better Flow",
      slogan: "Transform screenshots into production-ready visuals",
    },
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Better Flow",
    url: "https://betterflow.site",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://betterflow.site/docs?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    description:
      "Free open-source screenshot studio with browser frames, 3D effects, and 4K export.",
    publisher: {
      "@type": "Organization",
      name: "Better Flow",
      url: "https://betterflow.site",
    },
  };

  // SoftwareApplication Schema for the Screenshot Studio
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Better Flow Screenshot Studio",
    applicationCategory: "DesignApplication",
    applicationSubCategory: "PhotoEditingApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
    softwareVersion: "1.0.0",
    url: "https://app.betterflow.site",
    downloadUrl: "https://app.betterflow.site",
    offer: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free - Open Source",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Browser mockups (Safari, Chrome)",
      "3D transforms and effects",
      "100+ background styles",
      "Video animation export (MP4, WebM, GIF)",
      "4K image export",
      "Device frames (Arc, Polaroid)",
      "Timeline editor",
      "Chrome Extension for screen recording",
    ],
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    programminLanguage: "TypeScript",
    author: {
      "@type": "Organization",
      name: "Better Flow",
      url: "https://betterflow.site",
    },
  };

  const schemas = [organizationSchema, websiteSchema, softwareSchema];

  return (
    <Script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
