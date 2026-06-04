import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/ui/SmoothScroll";

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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Better Flow",
  },
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
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
