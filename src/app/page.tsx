import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { TourCard } from "@/components/tours/tour-card";
import { getFeaturedTours } from "@/lib/catalog/repository";
import GallerySection from "@/components/gallery/gallery-section";
import { HeroContent } from "@/components/home/hero-content";
import { ActivityVideos } from "@/components/home/activity-videos";
import { LoopVideo } from "@/components/ui/loop-video";
import { SITE, SITE_URL } from "@/lib/site";


export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
};

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

      {/* Hero — min-h-dvh (not vh) so mobile browser chrome collapsing
          doesn't leave a gap or overflow under the URL bar */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-midnight px-6 text-center text-surface">
        {/* Background video — non-interactive (autoplay, loop, muted, not
            clickable). Poster = the video's own first frame, so paint is
            instant; preload="metadata" keeps the 3.6MB file off the critical
            path and playback starts via LoopVideo's IntersectionObserver. */}
        <LoopVideo src="/Images/homepage/hero-section.mp4" className="absolute inset-0 size-full" />
        {/* Light tint + grounding gradient — video stays clearly visible */}
        <div className="pointer-events-none absolute inset-0 bg-midnight/25" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-midnight/40 via-transparent to-midnight/75" />
        {/* Sunrise glow + edge vignette for cinematic depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_100%,rgba(242,203,170,0.14),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_50%,transparent_60%,rgba(20,8,2,0.45)_100%)]" />
        <HeroContent />
        {/* Gold hairline seam into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-palegold/50 to-transparent" />
      </section>

      {/* Popular experiences */}
      <section className="relative bg-sand py-14 sm:py-20">
        {/* Soft dune glow behind the grid for layered depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,161,115,0.25),transparent_70%)]" />
        <Container className="relative">
          <div className="mb-10 flex flex-col items-center text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-midnight sm:text-h2">
              Popular Experiences
            </h2>
            <div className="mt-4 flex items-center gap-3" aria-hidden>
              <span className="h-px w-10 bg-linear-to-r from-transparent to-gold/60" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="h-px w-10 bg-linear-to-l from-transparent to-gold/60" />
            </div>
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
            {/* Same label as the hero CTA — one label per intent sitewide */}
            <Link
              href="/tours"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Explore Tours
            </Link>
          </div>
        </Container>
      </section>

      <ActivityVideos />

      <GallerySection />
    </>
  );
}
