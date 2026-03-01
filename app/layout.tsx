import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { CookiesBanner } from "@/components/CookiesBanner";
import { WhatsAppChatWidget } from "@/components/WhatsAppChatWidget";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/site-url";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Richmond Hill College | Healthcare and Technology Management",
    template: "%s | Richmond Hill College",
  },
  description:
    "Richmond Hill College of Healthcare and Technology Management offers online, hybrid, and in-person courses. Unlocking potential, building futures.",
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Richmond Hill College",
    title: "Richmond Hill College | Healthcare and Technology Management",
    description:
      "Richmond Hill College of Healthcare and Technology Management offers online, hybrid, and in-person courses. Unlocking potential, building futures.",
    url: siteUrl,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Richmond Hill College" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Richmond Hill College | Healthcare and Technology Management",
    description:
      "Richmond Hill College of Healthcare and Technology Management offers online, hybrid, and in-person courses. Unlocking potential, building futures.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <OrganizationJsonLd />
        <div className="sticky top-0 z-50">
          <Header />
          <AnnouncementBanner />
        </div>
        <main className="flex-1 pb-20 tablet:pb-0">{children}</main>
        <Footer />
        <MobileBottomNav />
        <CookiesBanner />
        <WhatsAppChatWidget />
      </body>
    </html>
  );
}
