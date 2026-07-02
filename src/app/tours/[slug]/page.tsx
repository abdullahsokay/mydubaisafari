import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  MapPin,
  CalendarClock,
  ShieldCheck,
  Check,
  X,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { TourCard } from "@/components/tours/tour-card";
import {
  getTourBySlug,
  getRelatedTours,
  getCategory,
  listTourSlugs,
} from "@/lib/catalog/repository";
import { formatDuration, formatPrice } from "@/lib/catalog/format";

/** Serialize JSON-LD safely — escapes < > & to prevent script tag breakout. */
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export async function generateStaticParams() {
  const slugs = await listTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Tour not found" };
  const canonicalUrl = `${SITE_URL}/tours/${slug}`;
  return {
    title: tour.name,
    description: tour.shortDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: tour.name,
      description: tour.shortDesc,
      url: canonicalUrl,
      // Real tour photos are client-supplied (gallery is gradient placeholders),
      // so fall back to the sitewide desert share image.
      images: [{ url: "/Images/sand.jpg", width: 1440, height: 1800 }],
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const [category, related] = await Promise.all([
    getCategory(tour.categorySlug),
    getRelatedTours(tour),
  ]);

  const tabs: TabItem[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-4 text-midnight/75">
          <p>{tour.description}</p>
        </div>
      ),
    },
    {
      id: "itinerary",
      label: "Itinerary",
      content: (
        <ol className="space-y-5">
          {tour.itinerary.map((stop, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex size-9 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">
                  {stop.time}
                </span>
                {i < tour.itinerary.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-midnight/10" />
                )}
              </div>
              <div className="pb-2">
                <h4 className="font-heading text-sm font-semibold text-midnight">
                  {stop.title}
                </h4>
                <p className="mt-1 text-sm text-midnight/75">
                  {stop.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "inclusions",
      label: "Inclusions",
      content: (
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h4 className="font-heading text-sm font-semibold text-midnight">
              What&rsquo;s included
            </h4>
            <ul className="mt-3 space-y-2">
              {tour.inclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-midnight/75"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-midnight">
              Not included
            </h4>
            <ul className="mt-3 space-y-2">
              {tour.exclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-midnight/70"
                >
                  <X className="mt-0.5 size-4 shrink-0 text-midnight/45" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "faq",
      label: "FAQ",
      content: (
        <div className="space-y-5">
          {tour.faqs.map((faq) => (
            <div key={faq.question}>
              <h4 className="font-heading text-sm font-semibold text-midnight">
                {faq.question}
              </h4>
              <p className="mt-1 text-sm text-midnight/75">{faq.answer}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    image: `${SITE_URL}/Images/sand.jpg`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: tour.currency,
      price: tour.priceAdult,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/tours/${tour.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(tourSchema) }}
      />

      {/* Gallery */}
      <section className="bg-midnight pt-20">
        <Container className="py-6">
          <div className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
            <div
              className={`h-64 rounded-2xl sm:col-span-2 sm:row-span-2 sm:h-full ${tour.gallery[0]}`}
            />
            {tour.gallery.slice(1, 3).map((g, i) => (
              <div
                key={i}
                className={`hidden h-full min-h-32 rounded-2xl sm:col-span-2 sm:block ${g}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-sand pb-20">
        <Container className="py-10">
          <nav className="text-sm text-midnight/70">
            <Link href="/" className="hover:text-orange">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/tours" className="hover:text-orange">
              Tours
            </Link>{" "}
            /{" "}
            {category && (
              <>
                <Link
                  href={`/tours?category=${category.slug}`}
                  className="hover:text-orange"
                >
                  {category.name}
                </Link>{" "}
                /{" "}
              </>
            )}
            <span className="text-midnight/70">{tour.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Main */}
            <div>
              {tour.tag && <Badge>{tour.tag}</Badge>}
              <h1 className="mt-3 font-heading text-3xl font-semibold text-midnight leading-tight sm:text-h2 lg:text-h1">
                {tour.name}
              </h1>
              <p className="mt-3 text-midnight/70">{tour.shortDesc}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                <Rating value={tour.rating} count={tour.reviewCount} />
                <span className="flex items-center gap-1.5 text-sm text-midnight/75">
                  <Clock className="size-4" />
                  {formatDuration(tour.durationMinutes)}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-midnight/75">
                  <CalendarClock className="size-4" />
                  Pickup {tour.pickupTime}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-midnight/75">
                  <MapPin className="size-4" />
                  {tour.meetingPoint}
                </span>
              </div>

              <div className="mt-8 rounded-2xl bg-surface p-6">
                <Tabs tabs={tabs} />
              </div>

              {/* Reviews */}
              <div className="mt-8 rounded-2xl bg-surface p-6">
                <h3 className="font-heading text-lg font-semibold text-midnight">
                  Guest reviews
                </h3>
                <div className="mt-3 flex items-center gap-3">
                  <span className="flex items-center gap-1 font-heading text-3xl font-semibold text-midnight">
                    <Star className="size-6 fill-gold text-gold" />
                    {tour.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-midnight/75">
                    Based on {tour.reviewCount.toLocaleString("en-US")} verified
                    bookings
                  </span>
                </div>
                <p className="mt-4 text-sm text-midnight/75">
                  Verified guest reviews appear here once the reviews module is
                  live.
                </p>
              </div>
            </div>

            {/* Booking sidebar */}
            <aside>
              <div className="sticky top-24 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
                {tour.regularPrice !== undefined && (
                  <p className="text-sm text-midnight/45 line-through">
                    {tour.currency} {tour.regularPrice.toLocaleString("en-US")}
                  </p>
                )}
                <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                  <span className="text-sm text-midnight/70">From</span>
                  <span className="font-heading text-2xl font-semibold text-midnight">
                    {formatPrice(tour.priceAdult, tour.currency)}
                  </span>
                  <span className="text-sm text-midnight/70">
                    / {tour.priceUnit ?? "adult"}
                  </span>
                </div>
                {!tour.priceUnit || tour.priceUnit === "person" ? (
                  <ul className="mt-4 space-y-2 text-sm text-midnight/70">
                    <li>
                      Child:{" "}
                      {tour.priceChild === 0
                        ? "Not available"
                        : formatPrice(tour.priceChild, tour.currency)}
                    </li>
                    <li>
                      Infant:{" "}
                      {tour.priceInfant === 0
                        ? "Free"
                        : formatPrice(tour.priceInfant, tour.currency)}
                    </li>
                  </ul>
                ) : tour.pricingNote ? (
                  <p className="mt-3 text-sm text-midnight/60">
                    {tour.pricingNote}
                  </p>
                ) : null}
                <Link
                  href={`/booking/${tour.slug}`}
                  className={`mt-6 w-full ${buttonVariants({ variant: "primary", size: "lg" })}`}
                >
                  Check Availability
                </Link>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-midnight/75">
                  <ShieldCheck className="size-4 text-gold" />
                  Free cancellation &middot; Confirmed in minutes via WhatsApp
                </div>
                <p className="mt-4 border-t border-midnight/10 pt-4 text-xs text-midnight/75">
                  {tour.cancellationPolicy}
                </p>
              </div>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-3xl font-semibold text-midnight sm:text-h2">
                You might also like
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((t) => (
                  <TourCard key={t.slug} tour={t} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
