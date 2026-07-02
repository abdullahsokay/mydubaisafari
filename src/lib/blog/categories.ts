export interface Category {
  slug: string;
  name: string;
  emoji: string;
}

export const CATEGORIES: Category[] = [
  { slug: "dubai-travel-guides", name: "Dubai Travel Guides", emoji: "🌍" },
  { slug: "desert-safari", name: "Desert Safari", emoji: "🏜️" },
  { slug: "travel-tips", name: "Travel Tips", emoji: "💡" },
  { slug: "family-travel", name: "Family Travel", emoji: "👨‍👩‍👧" },
  { slug: "food-culture", name: "Food & Culture", emoji: "🍽️" },
  { slug: "customer-stories", name: "Customer Stories", emoji: "⭐" },
  { slug: "seasonal", name: "Seasonal Events", emoji: "🎉" },
  { slug: "company-news", name: "Company News & Offers", emoji: "📢" },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
