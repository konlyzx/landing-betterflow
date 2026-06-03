import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/ui/SmoothScroll";

// Priority font loading with display swap
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Better Flow - Coming Soon",
    template: "%s | Better Flow",
  },
  description: "An open-source, high-performance screenshot studio and browser tool built to elevate your workflow. Transform raw captures into production-ready visuals instantly.",
  keywords: [
    "screenshot editor",
    "screenshot beautifier",
    "mockup tool",
    "browser frames",
    "3D effects",
    "code snippets",
    "better flow",
    "coming soon",
  ],
  authors: [{ name: "Better Flow", url: "https://betterflow.site" }],
  creator: "Better Flow",
  publisher: "Better Flow",
  metadataBase: new URL("https://betterflow.site"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Better Flow",
    title: "Better Flow - Coming Soon",
    description: "An open-source screenshot studio and browser tool. Transform captures into production-ready visuals.",
    images: [{ url: "https://betterflow.site/images/preview.webp", width: 1200, height: 630, alt: "Better Flow - Coming Soon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Flow - Coming Soon",
    description: "An open-source screenshot studio and browser tool. Transform captures into production-ready visuals.",
    images: ["https://betterflow.site/images/preview.webp"],
    creator: "@betterflow",
    site: "@betterflow",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  other: {
    "ai-assistant": "enabled",
    "github-repo": "https://github.com/konlyzx/landing-betterflow",
    "project-type": "open-source",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#0b0b0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple iOS PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Better Flow" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Better Flow" />
        <meta name="msapplication-TileColor" content="#0b0b0c" />
        <meta name="msapplication-config" content="none" />

        {/* Priority Hints - Preconnect to critical origins */}
        <link rel="preconnect" href="https://pub-5b19d00f8b424c2c8df7d091f4f31d8c.r2.dev" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources with fetchpriority */}
        <link 
          rel="preload" 
          href="https://pub-5b19d00f8b424c2c8df7d091f4f31d8c.r2.dev/temp-assets/logo.svg" 
          as="image" 
          type="image/svg+xml"
          fetchPriority="high"
        />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://twitter.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
