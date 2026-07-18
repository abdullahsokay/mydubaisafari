/**
 * Canonical site origin — the single source of truth for the domain.
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment (e.g. Vercel) to
 * "https://mydubaisafari.com"; the fallback keeps builds working without it.
 * No trailing slash. Import this everywhere instead of re-deriving it, so the
 * domain can never drift between files again.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydubaisafari.com";

export const SITE = {
  whatsappNumber: "971557788202", // wa.me format (no +)
  whatsappDisplay: "+971 55 778 8202",
  instagram: "https://instagram.com/mydubaisafari",
  facebook: "https://facebook.com/mydubaisafari",
  phone: "+971 55 778 8202",
  email: "rizwanuae1@yahoo.com",
  tiktok: "https://www.tiktok.com/@mydubaisafari",
  address: "4th Floor, City Avenue, opposite Deira City Centre, Deira, Dubai, UAE",
  areas: "Marsa Dubai · Deira, Dubai",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
