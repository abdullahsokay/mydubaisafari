import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";

export default function NotFound() {
  const waHref = whatsappUrl(
    "Hi! I landed on a page that didn't exist — can you help me find what I'm looking for?",
  );

  return (
    <div className="bg-sand pt-24 pb-20 flex flex-1 items-center">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Brand numerals */}
          <p className="font-heading text-[8rem] font-bold leading-none text-gold/30 select-none">
            404
          </p>

          <h1 className="mt-4 font-heading text-3xl font-semibold text-midnight sm:text-4xl">
            Lost in the dunes?
          </h1>
          <p className="mt-4 text-midnight/60 leading-relaxed">
            The page you&rsquo;re looking for has blown away with the desert
            wind. Head back home or reach us directly on WhatsApp — we&rsquo;ll
            help you find exactly what you need.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Back to home
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick links */}
          <div className="mt-12 border-t border-midnight/10 pt-8">
            <p className="text-sm font-medium text-midnight/50 uppercase tracking-wide">
              Popular pages
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {[
                { label: "All Tours", href: "/tours" },
                { label: "Shared Desert Safari", href: "/tours/shared-desert-safari" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-midnight/20 px-4 py-1.5 text-sm text-midnight/70 transition-colors hover:border-gold hover:text-gold"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
