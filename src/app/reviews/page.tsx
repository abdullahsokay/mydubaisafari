import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { listTours } from "@/lib/catalog/repository";
import { whatsappUrl } from "@/lib/site";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafarii.com";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description:
    "See what travellers say about MyDubaiSafarii desert safari tours. Read aggregate ratings from across our full tour catalogue.",
  alternates: { canonical: `${SITE_URL}/reviews` },
  openGraph: {
    title: "Guest Reviews | MyDubaiSafarii",
    description:
      "See what travellers say about MyDubaiSafarii desert safari tours. Read aggregate ratings from across our full tour catalogue.",
    url: `${SITE_URL}/reviews`,
  },
};

const WA_REVIEW = whatsappUrl(
  "Hi! I recently completed a tour with MyDubaiSafarii and I'd love to share my feedback.",
);

const PLATFORM_PILLS: { name: string; color: string }[] = [
  { name: "Google", color: "bg-[#4285F4]" },
  { name: "TripAdvisor", color: "bg-[#34E0A1]" },
  { name: "Viator", color: "bg-[#142E61]" },
  { name: "GetYourGuide", color: "bg-[#FF5D00]" },
];

function StarBar({ filled }: { filled: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const pct = Math.min(Math.max(filled - i, 0), 1) * 100;
        return (
          <span key={i} className="relative size-5 text-gold/20">
            {/* background star */}
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.307 4.022a1 1 0 00.95.69h4.23c.969 0 1.371 1.24.588 1.81l-3.42 2.484a1 1 0 00-.364 1.118l1.307 4.022c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.009 2.844c-.784.57-1.838-.197-1.54-1.118l1.307-4.022a1 1 0 00-.364-1.118L3.174 9.449c-.783-.57-.38-1.81.588-1.81h4.23a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
            {/* filled overlay */}
            <span
              className="absolute inset-0 overflow-hidden text-gold"
              style={{ width: `${pct}%` }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.307 4.022a1 1 0 00.95.69h4.23c.969 0 1.371 1.24.588 1.81l-3.42 2.484a1 1 0 00-.364 1.118l1.307 4.022c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.009 2.844c-.784.57-1.838-.197-1.54-1.118l1.307-4.022a1 1 0 00-.364-1.118L3.174 9.449c-.783-.57-.38-1.81.588-1.81h4.23a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default async function ReviewsPage() {
  const tours = await listTours();

  // Compute aggregate rating: weighted average across all tours by review count
  const totalReviews = tours.reduce((sum, t) => sum + t.reviewCount, 0);
  const weightedSum = tours.reduce(
    (sum, t) => sum + t.rating * t.reviewCount,
    0,
  );
  const avgRating = totalReviews > 0 ? weightedSum / totalReviews : 0;
  const avgRatingDisplay = avgRating.toFixed(1);

  // Rating band label
  const ratingLabel =
    avgRating >= 4.8
      ? "Exceptional"
      : avgRating >= 4.5
        ? "Excellent"
        : avgRating >= 4.0
          ? "Very Good"
          : "Good";

  return (
    <div className="bg-sand pt-24 pb-20">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <Badge tone="orange">Guest Reviews</Badge>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-midnight leading-tight sm:text-h1">
            What Our Guests Say
          </h1>
          <p className="mt-3 max-w-xl text-midnight/60">
            Ratings aggregated from real guest feedback across all our tours.
            Every number here comes from verified bookings — we do not curate or
            cherry-pick.
          </p>
        </div>

        {/* Aggregate rating hero */}
        <div className="mx-auto mb-14 max-w-2xl rounded-3xl bg-surface p-8 shadow-sm ring-1 ring-black/5 text-center">
          <div className="flex items-baseline justify-center gap-3">
            <span className="font-heading text-7xl font-bold text-midnight leading-none">
              {avgRatingDisplay}
            </span>
            <span className="font-heading text-3xl font-semibold text-gold">
              / 5
            </span>
          </div>

          <div className="mt-3 flex justify-center">
            <StarBar filled={avgRating} />
          </div>

          <p className="mt-3 font-heading text-xl font-semibold text-orange">
            {ratingLabel}
          </p>

          <p className="mt-2 text-sm text-midnight/50">
            Based on{" "}
            <strong className="text-midnight">
              {totalReviews.toLocaleString()}
            </strong>{" "}
            verified guest reviews across{" "}
            <strong className="text-midnight">{tours.length}</strong> tours
          </p>

          {/* Platform trust pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {PLATFORM_PILLS.map(({ name, color }) => (
              <span
                key={name}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white ${color}`}
              >
                {name}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-midnight/40">
            Reviews collected across booking platforms
          </p>
        </div>

        {/* Per-tour ratings */}
        <div className="mb-14">
          <h2 className="font-heading text-2xl font-semibold text-midnight mb-6 text-center">
            Ratings by Tour
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="group rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-base font-semibold text-midnight leading-snug group-hover:text-orange transition-colors">
                    {tour.name}
                  </h3>
                  {tour.tag && (
                    <span className="shrink-0 rounded-full bg-sand px-2 py-0.5 text-xs font-medium text-clay">
                      {tour.tag}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <StarBar filled={tour.rating} />
                  <span className="text-sm font-semibold text-midnight">
                    {tour.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-midnight/40">
                    ({tour.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Share experience CTA */}
        <div className="mx-auto max-w-2xl rounded-3xl bg-midnight px-8 py-10 text-center text-surface">
          <h2 className="font-heading text-2xl font-semibold">
            Enjoyed your safari?
          </h2>
          <p className="mt-3 text-surface/70 leading-relaxed">
            We&rsquo;d love to hear about your experience. Drop us a message on
            WhatsApp — your feedback helps us improve and helps other travellers
            choose with confidence.
          </p>
          <a
            href={WA_REVIEW}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex ${buttonVariants({ variant: "primary", size: "lg" })}`}
          >
            Share your experience on WhatsApp
          </a>
          <p className="mt-3 text-xs text-surface/40">
            No forms, no email — just a quick WhatsApp message.
          </p>
        </div>
      </Container>
    </div>
  );
}
