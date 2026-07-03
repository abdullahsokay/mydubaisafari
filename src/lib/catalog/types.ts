// UI-facing catalog types. Hand-authored so the UI is decoupled from the DB;
// the repository (repository.ts) maps these from seed data today and from
// Prisma later (BUILD_PLAN §3, §4.4).

export type Category = {
  slug: string;
  name: string;
  tagline?: string;
};

type ItineraryStop = {
  time: string;
  title: string;
  description: string;
};

type Faq = {
  question: string;
  answer: string;
};

export type Tour = {
  slug: string;
  name: string;
  categorySlug: string;
  shortDesc: string;
  description: string;
  durationMinutes: number;
  pickupTime: string;
  meetingPoint: string;
  priceAdult: number;
  priceChild: number;
  priceInfant: number;
  currency: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  /** Marketing label shown on the card, e.g. "Best Seller". */
  tag?: string;
  /** Placeholder media: Tailwind gradient classes until real Cloudinary images exist. */
  gallery: string[];
  /** Real card/hero photo (public path). Falls back to gallery gradient art when absent. */
  image?: string;
  /** Hero gallery photos for the detail page carousel (usually 3, incl. `image`). */
  images?: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryStop[];
  faqs: Faq[];
  cancellationPolicy: string;
  /** E.g. "2 persons · private" for per-vehicle pricing; omit for per-person */
  priceUnit?: string;
  /** Original/crossed-out price shown alongside the sale price */
  regularPrice?: number;
  /** Free-text note shown instead of child/infant rows when priceUnit is set */
  pricingNote?: string;
};
