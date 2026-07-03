import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AddonsSection } from "@/components/tours/addons-section";
import { ToursExplorer } from "@/components/tours/tours-explorer";
import { listCategories, listTours } from "@/lib/catalog/repository";

// Prerendered at build time; ?category= and ?sort= are applied client-side
// by <ToursExplorer>, so every request is served straight from the CDN.
export const dynamic = "force-static";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

export const metadata: Metadata = {
  title: "Dubai Tours & Experiences",
  description:
    "Browse and book Dubai desert safaris and adventure experiences — dune bashing, quad biking, overnight camping and more. Confirmed in minutes via WhatsApp, best price, 24/7 support.",
  alternates: { canonical: `${SITE_URL}/tours` },
  openGraph: {
    title: "Dubai Tours & Experiences",
    description:
      "Browse and book Dubai desert safaris and adventure experiences — dune bashing, quad biking, overnight camping and more. Confirmed in minutes via WhatsApp, best price, 24/7 support.",
    url: `${SITE_URL}/tours`,
  },
};

export default async function ToursPage() {
  const [categories, tours] = await Promise.all([
    listCategories(),
    listTours(),
  ]);

  return (
    <>
      <div className="relative bg-sand pt-24 pb-20 lg:pt-28">
        {/* Sunrise wash behind the page header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(80%_100%_at_20%_0%,rgba(250,231,172,0.35),transparent_65%)]" />
        <Container className="relative">
          <div className="max-w-2xl">
            <Badge tone="orange">All Experiences</Badge>
            <h1 className="mt-4 font-heading text-4xl font-semibold text-midnight leading-tight tracking-tight sm:text-h1">
              Dubai Tours &amp; Experiences
            </h1>
            <p className="mt-3 text-midnight/75">
              Handpicked desert safaris and adventures — confirmed in minutes
              via WhatsApp.
            </p>
            <p className="mt-2 text-sm text-midnight/60">
              Want quads or buggies?{" "}
              <Link
                href="/tours#add-ons"
                className="text-orange underline-offset-2 hover:underline"
              >
                Adventure add-ons available
              </Link>
            </p>
          </div>

          <ToursExplorer categories={categories} tours={tours} />
        </Container>
      </div>
      <AddonsSection />
    </>
  );
}
