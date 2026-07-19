import Link from "next/link";
import { Container } from "@/components/ui/container";
import { formatDuration, formatPrice } from "@/lib/catalog/format";
import type { Tour } from "@/lib/catalog/types";

/**
 * At-a-glance comparison of every package. Serves two goals: CRO (helps
 * undecided visitors compare price/duration/rating in one view and jump
 * straight to booking) and SEO (a clean data table is prime material for a
 * Google "comparison" featured snippet).
 */
export function PackageComparison({ tours }: { tours: Tour[] }) {
  if (!tours.length) return null;
  return (
    <section className="bg-surface py-16 sm:py-20" aria-labelledby="compare-heading">
      <Container>
        <div className="max-w-2xl">
          <h2
            id="compare-heading"
            className="font-heading text-3xl font-semibold text-midnight sm:text-4xl"
          >
            Compare Desert Safari Packages
          </h2>
          <p className="mt-3 text-midnight/70">
            Every Dubai safari package side by side — price, duration and guest
            rating — so you can pick the right experience in seconds.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-midnight/10 shadow-luxe">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-sand text-midnight">
                <th scope="col" className="px-5 py-4 font-heading font-semibold">Package</th>
                <th scope="col" className="px-5 py-4 font-heading font-semibold">From</th>
                <th scope="col" className="px-5 py-4 font-heading font-semibold">Duration</th>
                <th scope="col" className="px-5 py-4 font-heading font-semibold">Rating</th>
                <th scope="col" className="px-5 py-4 font-heading font-semibold sr-only sm:not-sr-only">Book</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((t, i) => (
                <tr
                  key={t.slug}
                  className={i % 2 === 0 ? "bg-surface" : "bg-sand/40"}
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/tours/${t.slug}`}
                      className="font-medium text-midnight hover:text-orange transition-colors"
                    >
                      {t.name}
                    </Link>
                    {t.tag && (
                      <span className="ml-2 rounded-full bg-palegold/40 px-2 py-0.5 text-[0.7rem] font-medium text-goldink">
                        {t.tag}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap font-semibold text-midnight">
                    {formatPrice(t.priceAdult, t.currency)}
                    <span className="block text-xs font-normal text-midnight/50">
                      {t.priceUnit ?? "per person"}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-midnight/75">
                    {formatDuration(t.durationMinutes)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-midnight/75">
                    <span className="font-medium text-midnight">{t.rating.toFixed(1)}</span>
                    <span aria-hidden className="text-gold"> ★ </span>
                    <span className="text-xs text-midnight/50">({t.reviewCount})</span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/booking/${t.slug}`}
                      className="inline-flex items-center rounded-full bg-midnight px-4 py-1.5 text-xs font-semibold text-white hover:bg-orange transition-colors"
                    >
                      Book
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
