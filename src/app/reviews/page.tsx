import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { listTours } from "@/lib/catalog/repository";
import { whatsappUrl } from "@/lib/site";
import { GUEST_REVIEWS, RATING_DISTRIBUTION } from "@/lib/reviews";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description:
    "Real guest reviews of MyDubaiSafarii desert safaris — dune bashing, camel rides, VIP Bedouin camps and more. 4.9★ average across thousands of verified bookings.",
  alternates: { canonical: `${SITE_URL}/reviews` },
  openGraph: {
    title: "Guest Reviews | MyDubaiSafarii",
    description:
      "Real guest reviews of MyDubaiSafarii desert safaris — 4.9★ average across thousands of verified bookings.",
    url: `${SITE_URL}/reviews`,
  },
};

/** Serialize JSON-LD safely — escapes < > & to prevent script tag breakout. */
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

const WA_REVIEW = whatsappUrl(
  "Hi! I recently completed a tour with MyDubaiSafarii and I'd love to share my feedback.",
);

/** Avatar tints cycled across review cards. */
const AVATAR_TINTS = [
  "bg-gold/20 text-goldink",
  "bg-orange/15 text-orange",
  "bg-midnight/10 text-midnight",
  "bg-dune/30 text-goldink",
];

function StarRow({ filled, size = "size-4" }: { filled: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const pct = Math.min(Math.max(filled - i, 0), 1) * 100;
        return (
          <span key={i} className={`relative ${size} text-gold/25`}>
            <svg viewBox="0 0 20 20" fill="currentColor" className={size} aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.307 4.022a1 1 0 00.95.69h4.23c.969 0 1.371 1.24.588 1.81l-3.42 2.484a1 1 0 00-.364 1.118l1.307 4.022c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.009 2.844c-.784.57-1.838-.197-1.54-1.118l1.307-4.022a1 1 0 00-.364-1.118L3.174 9.449c-.783-.57-.38-1.81.588-1.81h4.23a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
            <span className="absolute inset-0 overflow-hidden text-gold" style={{ width: `${pct}%` }}>
              <svg viewBox="0 0 20 20" fill="currentColor" className={size} aria-hidden>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.307 4.022a1 1 0 00.95.69h4.23c.969 0 1.371 1.24.588 1.81l-3.42 2.484a1 1 0 00-.364 1.118l1.307 4.022c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.009 2.844c-.784.57-1.838-.197-1.54-1.118l1.307-4.022a1 1 0 00-.364-1.118L3.174 9.449c-.783-.57-.38-1.81.588-1.81h4.23a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1).toLocaleDateString("en", {
    month: "long",
    year: "numeric",
  });
}

export default async function ReviewsPage() {
  const tours = await listTours();

  const totalReviews = tours.reduce((sum, t) => sum + t.reviewCount, 0);
  const weightedSum = tours.reduce((sum, t) => sum + t.rating * t.reviewCount, 0);
  const avgRating = totalReviews > 0 ? weightedSum / totalReviews : 0;

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MyDubaiSafarii",
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(avgRating.toFixed(1)),
      reviewCount: totalReviews,
      bestRating: 5,
      worstRating: 1,
    },
    review: GUEST_REVIEWS.slice(0, 6).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      name: r.title,
      reviewBody: r.text,
      datePublished: `${r.date}-01`,
    })),
  };

  const marqueeQuotes = GUEST_REVIEWS.map((r) => ({
    quote: r.title,
    name: r.name,
    flag: r.flag,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(reviewsSchema) }}
      />

      {/* ── Cinematic dark hero ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-midnight pt-28 pb-16 text-center text-surface sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(75%_100%_at_50%_100%,rgba(164,91,47,0.32),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(250,231,172,0.08),transparent_65%)]" />
        <Container className="relative">
          <Badge className="animate-rise rise-1 border border-palegold/40 bg-midnight/30 text-palegold ring-palegold/30 backdrop-blur-md">
            Guest Reviews
          </Badge>
          <h1 className="animate-rise rise-2 mx-auto mt-5 max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-h1">
            Stories From{" "}
            <span className="bg-linear-to-r from-palegold via-dune to-palegold bg-clip-text text-transparent">
              the Dunes
            </span>
          </h1>
          <p className="animate-rise rise-3 mx-auto mt-4 max-w-xl text-surface/75">
            Every rating below comes from verified bookings. No curation, no
            cherry-picking — just what our guests told us after the sand
            settled.
          </p>

          {/* Aggregate strip */}
          <div className="animate-rise rise-4 mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
            <div>
              <div className="flex items-baseline justify-center gap-1">
                <CountUp
                  value={avgRating}
                  decimals={1}
                  className="font-heading text-6xl font-bold text-palegold"
                />
                <span className="font-heading text-2xl text-surface/60">/5</span>
              </div>
              <div className="mt-2 flex justify-center">
                <StarRow filled={avgRating} size="size-5" />
              </div>
            </div>
            <div className="h-14 w-px bg-linear-to-b from-transparent via-palegold/40 to-transparent" aria-hidden />
            <div>
              <CountUp
                value={totalReviews}
                className="font-heading text-6xl font-bold text-surface"
              />
              <p className="mt-2 text-sm text-surface/60">verified guest reviews</p>
            </div>
            <div className="hidden h-14 w-px bg-linear-to-b from-transparent via-palegold/40 to-transparent sm:block" aria-hidden />
            <div className="hidden sm:block">
              <CountUp
                value={tours.length}
                className="font-heading text-6xl font-bold text-surface"
              />
              <p className="mt-2 text-sm text-surface/60">desert experiences</p>
            </div>
          </div>
        </Container>

        {/* Marquee of quote chips */}
        <div className="relative mt-12 overflow-hidden" aria-hidden>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-midnight to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-midnight to-transparent" />
          <div className="flex w-max animate-marquee gap-3 pr-3">
            {[...marqueeQuotes, ...marqueeQuotes].map((q, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-palegold/25 bg-midnight/60 px-4 py-2 text-sm text-surface/85 backdrop-blur-sm"
              >
                <span aria-hidden>{q.flag}</span>
                <span className="font-medium">&ldquo;{q.quote}&rdquo;</span>
                <span className="text-surface/50">— {q.name}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-palegold/50 to-transparent" />
      </section>

      {/* ── Rating distribution ─────────────────────────────── */}
      <section className="relative bg-sand py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(217,182,133,0.25),transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-midnight">
                The breakdown
              </h2>
              <p className="mt-3 max-w-md text-midnight/75">
                Aggregated across every package — from the shared evening
                safari to the Noble Camp. Consistency is the metric we care
                about most: the same driver standards, the same camps, the
                same welcome, every single day.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-midnight/70">
                <BadgeCheck className="size-5 text-gold" />
                Ratings sourced from verified bookings only
              </div>
            </Reveal>
            <div className="space-y-3">
              {RATING_DISTRIBUTION.map(({ stars, pct }, i) => (
                <Reveal key={stars} delay={i * 90}>
                  <div className="flex items-center gap-3">
                    <span className="w-12 shrink-0 text-sm font-medium text-midnight/70">
                      {stars} star{stars > 1 ? "s" : ""}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-midnight/10">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-gold to-palegold"
                        style={{ width: `${Math.max(pct, 1)}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-sm text-midnight/60">
                      {pct}%
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Review wall ─────────────────────────────────────── */}
      <section className="relative bg-sand pb-16">
        <Container>
          <Reveal className="mb-10 text-center">
            <Badge tone="orange">In Their Words</Badge>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-midnight sm:text-h2">
              Recent Guest Stories
            </h2>
          </Reveal>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {GUEST_REVIEWS.map((r, i) => (
              <Reveal
                key={`${r.name}-${r.date}`}
                delay={(i % 3) * 110}
                className="break-inside-avoid"
              >
                <article
                  className={`group relative rounded-2xl bg-surface p-6 shadow-luxe ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe-lg ${
                    r.featured ? "ring-gold/30" : "ring-midnight/5"
                  }`}
                >
                  {r.featured && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-3 right-3 size-7 rounded-tr-2xl border-t border-r border-palegold/80"
                    />
                  )}
                  <Quote className="size-6 text-gold/40" aria-hidden />
                  <h3 className="mt-3 font-heading text-base font-semibold text-midnight">
                    {r.title}
                  </h3>
                  <div className="mt-2">
                    <StarRow filled={r.rating} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-midnight/75">
                    {r.text}
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-midnight/5 pt-4">
                    <span
                      aria-hidden
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold ${AVATAR_TINTS[i % AVATAR_TINTS.length]}`}
                    >
                      {initials(r.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-midnight">
                        {r.name}{" "}
                        <span aria-hidden className="ml-0.5">
                          {r.flag}
                        </span>
                      </p>
                      <p className="text-xs text-midnight/55">
                        {r.country} · {formatMonth(r.date)}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/tours/${r.tourSlug}`}
                    className="mt-4 inline-flex items-center gap-1 rounded-full bg-sand px-3 py-1 text-xs font-medium text-goldink transition-colors hover:bg-gold/20"
                  >
                    {r.tourName}
                    <ArrowRight className="size-3" aria-hidden />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Ratings by tour ─────────────────────────────────── */}
      <section className="relative bg-sand pb-20">
        <Container>
          <Reveal className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-semibold text-midnight">
              Ratings by Package
            </h2>
            <p className="mt-2 text-sm text-midnight/60">
              Tap any package to see details and book.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tours.map((tour, i) => (
              <Reveal key={tour.slug} delay={(i % 4) * 80}>
                <Link
                  href={`/tours/${tour.slug}`}
                  className="group block h-full rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-midnight/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe hover:ring-gold/30"
                >
                  <h3 className="font-heading text-sm font-semibold leading-snug text-midnight transition-colors group-hover:text-orange">
                    {tour.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-2">
                    <StarRow filled={tour.rating} />
                    <span className="text-sm font-semibold text-midnight">
                      {tour.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-midnight/55">
                    {tour.reviewCount.toLocaleString()} reviews
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-midnight py-16 text-center text-surface">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-palegold/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(164,91,47,0.3),transparent_70%)]" />
        <Container className="relative">
          <Reveal>
            <h2 className="mx-auto max-w-xl font-heading text-3xl font-semibold tracking-tight sm:text-h2">
              Been to the dunes with us?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-surface/70">
              Your words help other travellers choose with confidence — and
              they mean the world to our drivers and camp crew.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={WA_REVIEW}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1a7f40] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#155f30]"
              >
                Share your experience on WhatsApp
              </a>
              <Link
                href="/tours"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Plan your first safari
              </Link>
            </div>
            <p className="mt-4 text-xs text-surface/45">
              No forms, no email — just a quick WhatsApp message.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
