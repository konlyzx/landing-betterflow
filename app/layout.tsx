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
    default: "Better Flow — Screenshot Studio & Browser Tool",
    template: "%s | Better Flow",
  },
  description:
    "Free open-source screenshot studio. Transform screenshots into production-ready visuals with browser frames, 3D effects, animations, and 4K export. Built for developers, designers, and creators.",
  keywords: [
    "screenshot editor",
    "screenshot beautifier",
    "screenshot tool",
    "mockup generator",
    "browser frame mockup",
    "3D screenshot effects",
    "code snippet image",
    "screenshot to png",
    "screenshot animation",
    "screenshot studio",
    "image beautifier",
    "developer tools",
    "design tool",
    "open source",
    "better flow",
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
    title: "Better Flow — Screenshot Studio & Browser Tool",
    description: "Free open-source screenshot studio. Transform screenshots into production-ready visuals with browser frames, 3D effects, and 4K export.",
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
    title: "Better Flow — Screenshot Studio & Browser Tool",
    description: "Free open-source screenshot studio. Transform screenshots into production-ready visuals with browser frames, 3D effects, and 4K export.",
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
