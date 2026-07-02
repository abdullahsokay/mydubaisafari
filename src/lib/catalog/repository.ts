import { CATEGORIES, TOURS } from "./seed";
import type { Category, Tour } from "./types";

/*
 * Catalog data access. This is the ONLY place that knows where tours come from.
 * Today it reads seed data; when Supabase is provisioned, swap these bodies for
 * Prisma queries — the (async) signatures stay identical, so no call site changes
 * (BUILD_PLAN §4.4).
 */

export type TourSort = "popular" | "price-asc" | "price-desc" | "rating";

export const SORT_OPTIONS: { value: TourSort; label: string }[] = [
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
];

export async function listCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getCategory(slug: string): Promise<Category | null> {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export async function listTours(
  opts: { category?: string; sort?: TourSort; q?: string } = {},
): Promise<Tour[]> {
  let tours = [...TOURS];

  if (opts.category) {
    tours = tours.filter((t) => t.categorySlug === opts.category);
  }
  if (opts.q) {
    const q = opts.q.toLowerCase();
    tours = tours.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q),
    );
  }

  switch (opts.sort) {
    case "price-asc":
      tours.sort((a, b) => a.priceAdult - b.priceAdult);
      break;
    case "price-desc":
      tours.sort((a, b) => b.priceAdult - a.priceAdult);
      break;
    case "rating":
      tours.sort((a, b) => b.rating - a.rating);
      break;
    default:
      tours.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return tours;
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  return TOURS.find((t) => t.slug === slug) ?? null;
}

export async function getFeaturedTours(limit = 4): Promise<Tour[]> {
  return TOURS.filter((t) => t.isFeatured).slice(0, limit);
}

export async function getRelatedTours(tour: Tour, limit = 3): Promise<Tour[]> {
  return TOURS.filter(
    (t) => t.categorySlug === tour.categorySlug && t.slug !== tour.slug,
  ).slice(0, limit);
}

/** All tour slugs — used for static generation of detail pages. */
export async function listTourSlugs(): Promise<string[]> {
  return TOURS.map((t) => t.slug);
}
