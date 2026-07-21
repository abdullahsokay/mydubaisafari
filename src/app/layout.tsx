import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { SandLayer } from "@/components/effects/sand-layer";
import { Analytics } from "@/components/seo/analytics";
import { listCategories, listTours } from "@/lib/catalog/repository";
import { SITE_URL } from "@/lib/site";

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
    default: "MyDubaiSafari — Desert Safari & Adventure Tours Dubai",
    template: "%s | MyDubaiSafari",
  },
  description:
    "Discover and book Dubai's best desert safaris and adventure experiences — dune bashing, quad biking, overnight camping and Bedouin BBQ dinners. Confirmed in minutes via WhatsApp, best price, 24/7 support.",
  metadataBase: new URL(SITE_URL),
  // Google Search Console meta-tag verification — set NEXT_PUBLIC_GSC_VERIFICATION
  // to the token GSC gives you (HTML-tag method). Omitted until then.
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
  openGraph: {
    type: "website",
    siteName: "MyDubaiSafari",
    title: "MyDubaiSafari — Desert Safari & Adventure Tours Dubai",
    description:
      "Discover and book Dubai's best desert safaris and adventure experiences — dune bashing, quad biking, overnight camping and Bedouin BBQ dinners. Confirmed in minutes via WhatsApp, best price, 24/7 support.",
    locale: "en",
    url: SITE_URL,
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
    title: "MyDubaiSafari — Desert Safari & Adventure Tours Dubai",
    description:
      "Discover and book Dubai's best desert safaris and adventure experiences — dune bashing, quad biking, overnight camping and Bedouin BBQ dinners. Confirmed in minutes via WhatsApp, best price, 24/7 support.",
    images: ["/Images/sand.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Build the "Experiences" mega-menu: tours grouped under their category.
  const [categories, tours] = await Promise.all([listCategories(), listTours()]);
  const experiencesMenu = categories.map((c) => ({
    name: c.name,
    slug: c.slug,
    tours: tours
      .filter((t) => t.categorySlug === c.slug)
      .map((t) => ({
        name: t.name,
        slug: t.slug,
        image: t.image ?? null,
        price: t.priceAdult,
        currency: t.currency,
        rating: t.rating,
        durationMinutes: t.durationMinutes,
      })),
  }));

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <Navbar experiences={experiencesMenu} />
        <main id="main-content" className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <WhatsappButton />
        <SandLayer />
        <Analytics />
      </body>
    </html>
  );
}
