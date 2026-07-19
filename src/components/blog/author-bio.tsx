/**
 * Author bio card shown at the end of each blog post. A visible authorship +
 * expertise statement is a direct EEAT (Experience/Expertise) signal — it tells
 * both readers and search engines who stands behind the content.
 */
export function AuthorBio({ author }: { author: string }) {
  return (
    <aside className="mt-10 flex items-start gap-4 rounded-2xl bg-sand p-6 ring-1 ring-midnight/10">
      <div
        aria-hidden
        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-midnight font-heading text-lg font-bold text-palegold"
      >
        MD
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-midnight/50">
          Written by
        </p>
        <p className="font-heading text-lg font-semibold text-midnight">{author}</p>
        <p className="mt-1 text-sm leading-relaxed text-midnight/70">
          Dubai desert specialists who run daily safaris — dune bashing, sandboarding,
          camel rides and overnight Bedouin camps. Everything here is written from
          first-hand experience on the dunes, not a desk, so you get practical advice
          you can actually use on your trip.
        </p>
      </div>
    </aside>
  );
}
