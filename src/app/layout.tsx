import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { SandLayer } from "@/components/effects/sand-layer";

// Headings — Poppins (SRS §7.2.2). Poppins is not a variable font, so weights are explicit.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body — Inter (variable font).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MyDubaiSafarii — Desert Safari & Adventure Tours Dubai",
    template: "%s | MyDubaiSafarii",
  },
  description:
    "Discover and book Dubai's best desert safaris and adventure experiences — dune bashing, quad biking, overnight camping and Bedouin BBQ dinners. Confirmed in minutes via WhatsApp, best price, 24/7 support.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    siteName: "MyDubaiSafarii",
    title: "MyDubaiSafarii — Desert Safari & Adventure Tours Dubai",
    description:
      "Discover and book Dubai's best desert safaris and adventure experiences — dune bashing, quad biking, overnight camping and Bedouin BBQ dinners. Confirmed in minutes via WhatsApp, best price, 24/7 support.",
    locale: "en",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com",
    // Sitewide default share image (real desert photo). Pages/tours can override.
    images: [
      {
        url: "/Images/sand.jpg",
        width: 1440,
        height: 1800,
        alt: "Dubai desert dunes at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyDubaiSafarii — Desert Safari & Adventure Tours Dubai",
    description:
      "Discover and book Dubai's best desert safaris and adventure experiences — dune bashing, quad biking, overnight camping and Bedouin BBQ dinners. Confirmed in minutes via WhatsApp, best price, 24/7 support.",
    images: ["/Images/sand.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-midnight focus:shadow-lg"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <WhatsappButton />
        <SandLayer />
      </body>
    </html>
  );
}
