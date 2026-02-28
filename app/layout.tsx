import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Richmond Hill College | Healthcare and Technology Management",
    template: "%s | Richmond Hill College",
  },
  description:
    "Richmond Hill College of Healthcare and Technology Management offers online, hybrid, and in-person courses. Unlocking potential, building futures.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Richmond Hill College",
    images: [{ url: "/images/hero/hero-1.jpg", width: 800, height: 600, alt: "Richmond Hill College" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <OrganizationJsonLd />
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
