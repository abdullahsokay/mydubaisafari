export interface Category {
  slug: string;
  name: string;
}

export const CATEGORIES: Category[] = [
  { slug: "dubai-travel-guides", name: "Dubai Travel Guides" },
  { slug: "desert-safari", name: "Desert Safari" },
  { slug: "travel-tips", name: "Travel Tips" },
  { slug: "family-travel", name: "Family Travel" },
  { slug: "food-culture", name: "Food & Culture" },
  { slug: "customer-stories", name: "Customer Stories" },
  { slug: "seasonal", name: "Seasonal Events" },
  { slug: "company-news", name: "Company News & Offers" },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
