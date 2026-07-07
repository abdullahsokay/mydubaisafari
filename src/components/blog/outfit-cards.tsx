import Image from "next/image";

const CARDS = [
  {
    src: "/Images/wear/blog-what-to-wear-desert-safari-00.jpg",
    label: "Morning Safari Look",
  },
  { src: "/Images/wear/evening-wear.jpg", label: "Evening Safari Look" },
];

export function OutfitCards() {
  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl font-bold text-midnight">
        Morning vs Evening Looks
      </h2>
      <p className="mt-2 text-midnight/60">
        Hover a look to bring it into focus.
      </p>
      <div className="group mt-6 flex flex-col items-stretch justify-center gap-6 sm:flex-row">
        {CARDS.map((c) => (
          <figure
            key={c.src}
            className="relative w-full max-w-xs overflow-hidden rounded-2xl ring-1 ring-gold/30 shadow-[0_0_28px_-8px_rgba(217,161,115,0.5)] transition duration-500 ease-out group-hover:opacity-50 hover:z-10 hover:!opacity-100 hover:scale-[1.04] hover:shadow-[0_0_44px_-6px_rgba(176,66,28,0.7)]"
          >
            <Image
              src={c.src}
              alt={c.label}
              width={320}
              height={427}
              loading="lazy"
              sizes="320px"
              className="aspect-[3/4] w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-midnight/85 to-transparent p-4 text-center font-heading text-sm font-semibold text-white">
              {c.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
