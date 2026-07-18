import { safeJsonLd } from "@/lib/seo/schema";

/**
 * Renders one or more JSON-LD objects as a safe <script> tag. Server component.
 *
 *   <JsonLd data={organizationSchema()} />
 *   <JsonLd data={[websiteSchema(), breadcrumbSchema(trail)]} />
 */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(obj) }}
        />
      ))}
    </>
  );
}
