import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getTourBySlug, listTourSlugs } from "@/lib/catalog/repository";
import { formatDuration } from "@/lib/catalog/format";
import { BookingForm } from "@/components/booking/booking-form";
import { BackButton } from "@/components/ui/back-button";

// Prerender every booking page at build time (form logic is client-side).
export async function generateStaticParams() {
  const slugs = await listTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Tour not found" };
  return { title: `Book ${tour.name}` };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <div className="bg-sand pt-24 pb-20">
      <Container>
        <BackButton fallback={`/tours/${tour.slug}`} className="mb-4" />
        {/* Breadcrumb */}
        <nav className="text-sm text-midnight/50">
          <Link href="/" className="hover:text-orange">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/tours" className="hover:text-orange">
            Tours
          </Link>{" "}
          /{" "}
          <Link href={`/tours/${tour.slug}`} className="hover:text-orange">
            {tour.name}
          </Link>{" "}
          / <span className="text-midnight/70">Book</span>
        </nav>

        {/* Header */}
        <div className="mt-8 max-w-2xl">
          <Badge tone="gold">WhatsApp Booking</Badge>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-midnight leading-tight sm:text-h1">
            {tour.name}
          </h1>
          <p className="mt-2 text-midnight/60">
            Tell us your plans and we&apos;ll confirm on WhatsApp.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-midnight/55">
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {formatDuration(tour.durationMinutes)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              {tour.meetingPoint}
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="mt-10">
          <BookingForm tour={tour} />
        </div>
      </Container>
    </div>
  );
}
