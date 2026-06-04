import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Better Flow - Mobile",
  description: "Better Flow mobile landing page",
};

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
