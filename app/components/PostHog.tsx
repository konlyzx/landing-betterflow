"use client";

import { useEffect } from "react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com";

export default function PostHog() {
  useEffect(() => {
    // Skip if no key is configured
    if (!POSTHOG_KEY) return;

    // Avoid double loading
    if (window.posthog) return;

    // Load PostHog with proxy
    const script = document.createElement("script");
    script.src = "/ingest/static/array.js";
    script.async = true;
    script.onload = () => {
      if (window.posthog) {
        window.posthog.init(POSTHOG_KEY, {
          api_host: "/ingest",
          ui_host: POSTHOG_HOST,
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: true,
          disable_session_recording: false,
          // Disable persistence if user has DNT
          disable_persistence: navigator.doNotTrack === "1",
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}

// Type declaration for window.posthog
declare global {
  interface Window {
    posthog?: {
      init: (key: string, config: Record<string, unknown>) => void;
      capture: (event: string, props?: Record<string, unknown>) => void;
      has_opted_out_capturing: () => boolean;
    };
  }
}
