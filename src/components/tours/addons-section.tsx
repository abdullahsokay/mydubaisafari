import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";
import { ADDONS } from "@/lib/catalog/addons";

const WA = whatsappUrl(
  "Hi! I'd like to add an adventure activity (quad/buggy) to my desert safari.",
);

export function AddonsSection() {
  return (
    <section id="add-ons" className="bg-surface py-14 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-heading text-h2 font-semibold text-midnight leading-tight">
            Add More Adrenaline
          </h2>
          <p className="mt-3 text-midnight/75">
            Add any of these to your package — or book directly at the desert.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ADDONS.map((addon, i) => (
            <div
              key={addon.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-midnight/10 bg-sand p-5 shadow-luxe transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-luxe-lg"
            >
              {/* Gold hairline that brightens on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-gold/0 via-gold/50 to-gold/0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="font-heading text-xs font-semibold tracking-[0.18em] text-goldink/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-heading text-base font-semibold text-midnight">
                {addon.name}
              </p>
              <p className="mt-1 text-xs text-midnight/55">
                {addon.durationMin} minutes
              </p>
              <p className="mt-3 font-heading text-sm font-semibold text-goldink">
                {addon.priceLabel}
              </p>
              {addon.note && (
                <p className="mt-1.5 text-xs text-midnight/55">{addon.note}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
            )}
          >
            Add to My Safari via WhatsApp
          </a>
          <p className="text-sm text-midnight/60">
            Our team will confirm pricing and availability instantly.
          </p>
        </div>
      </Container>
    </section>
  );
}
