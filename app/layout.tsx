import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/ui/SmoothScroll";
import SchemaMarkup from "./components/SchemaMarkup";
import GoogleAnalytics from "./components/GoogleAnalytics";
import PostHog from "./components/PostHog";

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
    default: "Better Flow — Free Screenshot Beautifier & Studio",
    template: "%s | Better Flow",
  },
  description:
    "Better Flow is a free open-source screenshot beautifier. Add browser frames, 3D effects, gradients, and animations to screenshots. Export 4K PNG, MP4, GIF. Alternative to Shots.so, Screely, and Pika.",
  keywords: [
    "screenshot beautifier",
    "screenshot editor",
    "screenshot maker",
    "screenshot tool online",
    "screenshot background",
    "screenshot frame",
    "how to make screenshots look professional",
    "add background to screenshot",
    "browser mockup generator",
    "browser frame screenshot",
    "mac browser frame online",
    "screenshot to mockup",
    "screenshot 3d effect",
    "screenshot animation export",
    "screenshot gradient background",
    "code screenshot tool",
    "screenshot video export",
    "screenshot 4k export",
    "shots.so alternative",
    "screely alternative",
    "pika style alternative",
    "snappify alternative",
    "free screenshot studio",
    "screenshot tool for developers",
    "screenshot tool for designers",
    "open source screenshot editor",
    "better flow",
    "betterflow",
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
    title: "Better Flow — Free Screenshot Beautifier & Studio",
    description: "Free open-source screenshot beautifier. Browser frames, 3D effects, gradients, animations. Export 4K PNG, MP4, GIF. No signup required.",
    images: [
      {
        url: "https://betterflow.site/images/preview.webp",
        width: 1200,
        height: 630,
        alt: "Better Flow Screenshot Studio - Browser frames, 3D effects, and animations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Flow — Free Screenshot Beautifier & Studio",
    description: "Free open-source screenshot beautifier. Browser frames, 3D effects, gradients, animations. Export 4K PNG, MP4, GIF. No signup required.",
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Better Flow",
  },
  other: {
    "ai-assistant": "enabled",
    "github-repo": "https://github.com/betterspacx",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <GoogleAnalytics />
        <PostHog />
        <SchemaMarkup />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
