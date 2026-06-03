export function getComingSoonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Better Flow",
    url: "https://betterflow.site",
    description: "An open-source, high-performance screenshot studio and browser tool built to elevate your workflow. Capture your screen via the Chrome extension, add browser frames, 3D effects, and custom gradients, and export flawless visuals in PNG, MP4, or GIF formats.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://betterflow.site/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
