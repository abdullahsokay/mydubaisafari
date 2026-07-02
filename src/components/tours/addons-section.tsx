import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
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
          <Badge tone="orange">Adventure Add-ons</Badge>
          <h2 className="mt-4 font-heading text-h2 font-semibold text-midnight leading-tight">
            Add More Adrenaline
          </h2>
          <p className="mt-3 text-midnight/75">
            Add any of these to your package — or book directly at the desert.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ADDONS.map((addon) => (
            <div
              key={addon.name}
              className="flex flex-col rounded-2xl border border-midnight/10 bg-sand p-5 shadow-sm"
            >
              <p className="font-heading text-base font-semibold text-midnight">
                {addon.name}
              </p>
              <p className="mt-1 text-xs text-midnight/55">
                {addon.durationMin} minutes
              </p>
              <p className="mt-3 font-heading text-sm font-semibold text-gold">
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
