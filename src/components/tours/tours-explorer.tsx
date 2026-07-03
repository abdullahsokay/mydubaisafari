"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { TourCard } from "@/components/tours/tour-card";
import { SortSelect } from "@/components/tours/sort-select";
import type { Category, Tour } from "@/lib/catalog/types";
import { cn } from "@/lib/utils";

const pill =
  "rounded-full border border-midnight/15 bg-surface/70 px-4 py-2 text-sm text-midnight/70 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:text-midnight";
const pillActive =
  "border-gold bg-gold text-midnight font-medium shadow-[0_8px_20px_-8px_rgba(198,139,87,0.8)]";

type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

function sortTours(tours: Tour[], sort: SortKey): Tour[] {
  const list = [...tours];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.priceAdult - b.priceAdult);
    case "price-desc":
      return list.sort((a, b) => b.priceAdult - a.priceAdult);
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    default:
      // popular: bestsellers first, then by review volume
      return list.sort(
        (a, b) =>
          Number(b.isBestseller ?? false) - Number(a.isBestseller ?? false) ||
          b.reviewCount - a.reviewCount,
      );
  }
}

/**
 * Client-side category filter + sort for the (statically prerendered) /tours
 * page. Reading the query string here keeps the page CDN-cacheable while
 * still supporting shareable /tours?category=...&sort=... URLs.
 */
function Explorer({
  categories,
  tours,
}: {
  categories: Category[];
  tours: Tour[];
}) {
  const sp = useSearchParams();
  const category = sp.get("category") ?? undefined;
  const rawSort = sp.get("sort") as SortKey | null;
  const sort: SortKey =
    rawSort && ["popular", "price-asc", "price-desc", "rating"].includes(rawSort)
      ? rawSort
      : "popular";

  const activeCategory = categories.find((c) => c.slug === category);
  const visible = sortTours(
    activeCategory ? tours.filter((t) => t.categorySlug === category) : tours,
    sort,
  );

  function catHref(slug?: string) {
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    if (sort !== "popular") params.set("sort", sort);
    const qs = params.toString();
    return qs ? `/tours?${qs}` : "/tours";
  }

  return (
    <>
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
          {visible.length} {visible.length === 1 ? "experience" : "experiences"}
        </p>
        <SortSelect />
      </div>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((t) => (
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
    </>
  );
}

export function ToursExplorer(props: {
  categories: Category[];
  tours: Tour[];
}) {
  return (
    <Suspense
      fallback={
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {props.tours.slice(0, 8).map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      }
    >
      <Explorer {...props} />
    </Suspense>
  );
}
