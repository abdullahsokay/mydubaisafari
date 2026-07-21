"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { whatsappUrl } from "@/lib/site";
import { formatDuration } from "@/lib/catalog/format";

type ExperienceTour = {
  name: string;
  slug: string;
  image: string | null;
  price: number;
  currency: string;
  rating: number;
  durationMinutes: number;
};
type ExperienceCategory = {
  name: string;
  slug: string;
  tours: ExperienceTour[];
};

const WA = whatsappUrl("Hi! I'd like to book a tour.");

export function Navbar({ experiences }: { experiences: ExperienceCategory[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const toursActive = pathname.startsWith("/tours");

  const link = (active: boolean) =>
    cn(
      "text-sm font-medium transition-colors",
      active ? "text-orange" : "text-midnight hover:text-orange",
    );
  const mobileLink = (active: boolean) =>
    cn(
      "rounded-lg px-2 py-3 text-sm font-medium transition-colors",
      active ? "text-orange" : "text-midnight hover:text-orange",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-midnight/10 bg-surface/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-heading text-lg font-semibold text-midnight"
        >
          MyDubai<span className="text-gold">Safari</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link href="/" className={link(isActive("/"))}>
            Home
          </Link>
          <Link href="/about" className={link(isActive("/about"))}>
            About Us
          </Link>

          {/* Experiences mega-menu — tours grouped by category */}
          <div className="group relative">
            <Link
              href="/tours"
              className={cn(link(toursActive), "inline-flex items-center gap-1")}
            >
              Experiences
              <ChevronDown className="size-4" />
            </Link>
            <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
              <div className="w-[720px] rounded-2xl border border-midnight/10 bg-surface p-5 shadow-2xl">
                {experiences.map((cat, ci) => (
                  <div
                    key={cat.slug}
                    className={ci > 0 ? "mt-4 border-t border-midnight/10 pt-4" : ""}
                  >
                    <div className="mb-2.5 flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-midnight/45">
                        {cat.name}
                      </h3>
                      <Link
                        href={`/tours?category=${cat.slug}`}
                        className="text-xs font-medium text-orange hover:underline"
                      >
                        View all →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {cat.tours.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/tours/${t.slug}`}
                          className="group/card flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-sand"
                        >
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-sand ring-1 ring-midnight/10">
                            {t.image && (
                              <Image
                                src={t.image}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-midnight">
                              {t.name}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-midnight/55">
                              <span className="font-semibold text-midnight/80">
                                {t.currency} {t.price.toLocaleString()}
                              </span>
                              <span className="inline-flex items-center gap-0.5 text-goldink">
                                <Star className="size-3 fill-gold text-gold" />
                                {t.rating.toFixed(1)}
                              </span>
                              <span className="inline-flex items-center gap-0.5">
                                <Clock className="size-3" />
                                {formatDuration(t.durationMinutes)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-between border-t border-midnight/10 pt-3.5">
                  <Link
                    href="/tours"
                    className="text-sm font-semibold text-midnight transition-colors hover:text-orange"
                  >
                    All Experiences →
                  </Link>
                  <Link
                    href="/tours#add-ons"
                    className="text-sm text-midnight/70 transition-colors hover:text-orange"
                  >
                    Adventure Add-ons
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/blog" className={link(isActive("/blog"))}>
            Blog
          </Link>
          <Link href="/reviews" className={link(isActive("/reviews"))}>
            Guest Reviews
          </Link>
          <Link href="/contact" className={link(isActive("/contact"))}>
            Contact Us
          </Link>
        </nav>

        {/* WhatsApp CTA */}
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-[#1a7f40] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#155f30] lg:inline-flex"
        >
          WhatsApp Now
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          className="p-2 -mr-2 text-midnight lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-midnight/10 bg-surface lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={mobileLink(isActive("/"))}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className={mobileLink(isActive("/about"))}
            >
              About Us
            </Link>
            <Link
              href="/tours"
              onClick={() => setOpen(false)}
              className={mobileLink(toursActive)}
            >
              Experiences
            </Link>
            {/* Experiences grouped by category */}
            <div className="ml-3 flex flex-col gap-2 border-l border-midnight/10 pl-3">
              {experiences.map((cat) => (
                <div key={cat.slug}>
                  <Link
                    href={`/tours?category=${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className="block py-1 text-xs font-semibold uppercase tracking-wide text-orange"
                  >
                    {cat.name}
                  </Link>
                  {cat.tours.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tours/${t.slug}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-1.5 text-sm text-midnight/70 transition-colors hover:text-orange"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                href="/tours#add-ons"
                onClick={() => setOpen(false)}
                className="block py-1 text-sm text-midnight/70 hover:text-orange"
              >
                Adventure Add-ons
              </Link>
            </div>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className={mobileLink(isActive("/blog"))}
            >
              Blog
            </Link>
            <Link
              href="/reviews"
              onClick={() => setOpen(false)}
              className={mobileLink(isActive("/reviews"))}
            >
              Guest Reviews
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={mobileLink(isActive("/contact"))}
            >
              Contact Us
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a7f40] px-5 py-3 text-sm font-semibold text-white hover:bg-[#155f30]"
            >
              WhatsApp Now
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
