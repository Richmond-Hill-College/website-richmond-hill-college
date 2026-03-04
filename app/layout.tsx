import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "@/components/Header";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { CookiesBanner } from "@/components/CookiesBanner";
import { WhatsAppChatWidget } from "@/components/WhatsAppChatWidget";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { LangAttribute } from "@/components/LangAttribute";
import { LanguageSplash } from "@/components/LanguageSplash";
import { siteUrl } from "@/lib/site-url";
import { FIRST_HERO_IMAGE } from "@/lib/hero";

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
    images: [{ url: FIRST_HERO_IMAGE.src, width: 1200, height: 630, alt: FIRST_HERO_IMAGE.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Richmond Hill College | Healthcare and Technology Management",
    description:
      "Richmond Hill College of Healthcare and Technology Management offers online, hybrid, and in-person courses. Unlocking potential, building futures.",
    images: [FIRST_HERO_IMAGE.src],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
    languages: { en: siteUrl, fr: `${siteUrl}/fr`, "x-default": siteUrl },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let lang: "en" | "fr" = "en";
  try {
    const pathname = headers().get("x-pathname") ?? "";
    if (pathname.startsWith("/fr")) lang = "fr";
  } catch {
    // During static generation or when middleware didn't run, default to en.
  }
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased" suppressHydrationWarning>
        <LangAttribute />
        <LanguageSplash />
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
