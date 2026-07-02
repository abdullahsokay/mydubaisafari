import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { TourCard } from "@/components/tours/tour-card";
import { getFeaturedTours } from "@/lib/catalog/repository";
import GallerySection from "@/components/gallery/gallery-section";
import { HeroContent } from "@/components/home/hero-content";
import { ActivityVideos } from "@/components/home/activity-videos";
import { LoopVideo } from "@/components/ui/loop-video";
import { SITE } from "@/lib/site";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

/** Serialize JSON-LD safely — escapes < > & to prevent script tag breakout. */
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default async function Home() {
  const featured = await getFeaturedTours(4);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MyDubaiSafarii",
    url: SITE_URL,
    logo: `${SITE_URL}/Images/sand.jpg`,
    telephone: SITE.phone,
    sameAs: [SITE.instagram, SITE.facebook, SITE.tiktok],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(orgSchema) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-midnight px-6 text-center text-surface">
        {/* Background video — non-interactive (autoplay, loop, muted, not clickable) */}
        <LoopVideo src="/Images/homepage/hero-section.mp4" className="absolute inset-0 size-full" preload="metadata" poster="/Images/sand.jpg" />
        {/* Light tint + grounding gradient — video stays clearly visible */}
        <div className="pointer-events-none absolute inset-0 bg-midnight/25" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-midnight/40 via-transparent to-midnight/75" />
        <HeroContent />
      </section>

      {/* Popular experiences */}
      <section className="bg-sand py-14 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col items-center text-center">
            <Badge tone="orange">Handpicked</Badge>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-midnight sm:text-h2">
              Popular Experiences
            </h2>
            <p className="mt-3 max-w-xl text-midnight/75">
              Our travellers&rsquo; favourite ways to explore the city and the
              dunes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/tours"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              View all tours
            </Link>
          </div>
        </Container>
      </section>

      <ActivityVideos />

      <GallerySection />
    </>
  );
}
