import Link from "next/link";

/**
 * Visible breadcrumb trail. Mirror it with breadcrumbSchema() so the on-page
 * nav and the structured data agree (Google surfaces breadcrumb rich results).
 * Pass ordered items from site root to the current page; the last is marked
 * aria-current and not linked.
 */
export function Breadcrumbs({
  items,
  className = "",
}: {
  items: { name: string; href: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-midnight/60">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden className="text-midnight/30">
                  /
                </span>
              )}
              {last ? (
                <span aria-current="page" className="font-medium text-midnight/80">
                  {it.name}
                </span>
              ) : (
                <Link href={it.href} className="transition-colors hover:text-orange">
                  {it.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
