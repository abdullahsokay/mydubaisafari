import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { TourCard } from "@/components/tours/tour-card";
import { SortSelect } from "@/components/tours/sort-select";
import { AddonsSection } from "@/components/tours/addons-section";
import {
  listCategories,
  listTours,
  getCategory,
  type TourSort,
} from "@/lib/catalog/repository";
import { cn } from "@/lib/utils";

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

const VALID_SORTS: TourSort[] = [
  "popular",
  "price-asc",
  "price-desc",
  "rating",
];

const pill =
  "rounded-full border border-midnight/15 px-4 py-2 text-sm text-midnight/70 transition-colors hover:border-gold hover:text-midnight";
const pillActive = "border-gold bg-gold text-midnight";

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.category;
  const sort: TourSort = VALID_SORTS.includes(sp.sort as TourSort)
    ? (sp.sort as TourSort)
    : "popular";

  const [categories, tours, activeCategory] = await Promise.all([
    listCategories(),
    listTours({ category, sort }),
    category ? getCategory(category) : Promise.resolve(null),
  ]);

  function catHref(slug?: string) {
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    if (sort !== "popular") params.set("sort", sort);
    const qs = params.toString();
    return qs ? `/tours?${qs}` : "/tours";
  }

  return (
    <>
    <div className="bg-sand pt-24 pb-20 lg:pt-28">
      <Container>
        <div className="max-w-2xl">
          <Badge tone="orange">
            {activeCategory ? activeCategory.name : "All Experiences"}
          </Badge>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-midnight leading-tight sm:text-h1">
            {activeCategory ? activeCategory.name : "Dubai Tours & Experiences"}
          </h1>
          <p className="mt-3 text-midnight/75">
            {activeCategory?.tagline ??
              "Handpicked desert safaris and adventures — confirmed in minutes via WhatsApp."}
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

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href={catHref()} className={cn(pill, !category && pillActive)}>
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={catHref(c.slug)}
              className={cn(pill, category === c.slug && pillActive)}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-midnight/75">
            {tours.length} {tours.length === 1 ? "experience" : "experiences"}
          </p>
          <Suspense fallback={null}>
            <SortSelect />
          </Suspense>
        </div>

        {tours.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl bg-surface p-12 text-center">
            <p className="font-heading text-lg text-midnight">
              No experiences found
            </p>
            <p className="mt-2 text-midnight/75">Try a different category.</p>
            <Link
              href="/tours"
              className="mt-4 inline-block text-orange hover:underline"
            >
              View all tours
            </Link>
          </div>
        )}
      </Container>
    </div>
    <AddonsSection />
    </>
  );
}
