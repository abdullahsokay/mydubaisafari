import { SITE, SITE_URL } from "@/lib/site";

/**
 * Central schema.org / JSON-LD builders. One place to define the site's
 * structured data so every page stays consistent and future SEO work is a
 * matter of composing these, not hand-writing JSON in each route.
 *
 * Entity graph uses stable @id anchors so Google treats them as ONE business
 * rather than several conflicting ones:
 *   - `${SITE_URL}/#organization` — the company (TravelAgency)
 *   - `${SITE_URL}/#website`      — the website itself
 */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Serialize a JSON-LD object for embedding in a <script> tag. Escapes the
 * three characters that could otherwise break out of the tag (< > &). Use
 * this for every JSON-LD payload instead of raw JSON.stringify.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * The business itself, as a TravelAgency (a LocalBusiness subtype that fits a
 * Dubai tour operator). Carries address, contact, and social profiles — the
 * single biggest local-SEO signal, and previously never emitted.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": ORG_ID,
    name: "MyDubaiSafarii",
    url: SITE_URL,
    image: `${SITE_URL}/Images/sand.jpg`,
    logo: `${SITE_URL}/Images/sand.jpg`,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      ...SITE.postalAddress,
    },
    areaServed: { "@type": "City", name: "Dubai" },
    priceRange: "$$",
    sameAs: [SITE.instagram, SITE.facebook, SITE.tiktok],
  };
}

/**
 * The website node. Declaring it (with publisher pointing at the org) lets
 * Google associate the domain with the business and is the anchor a future
 * sitelinks SearchAction would attach to.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "MyDubaiSafarii",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * Breadcrumb trail for a detail page. Pass ordered [name, url] pairs from the
 * site root down to the current page; renders as breadcrumb rich results in
 * search and clarifies site hierarchy to crawlers.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Reference to the shared org node — attach to Review/AggregateRating etc. */
export const orgRef = { "@id": ORG_ID };
