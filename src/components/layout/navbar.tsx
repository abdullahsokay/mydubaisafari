"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { whatsappUrl } from "@/lib/site";

const TOUR_MENU = [
  { label: "All Tours", href: "/tours" },
  { label: "With Camp", href: "/tours?category=with-camp" },
  { label: "Safari Only", href: "/tours?category=safari-only" },
  { label: "Add-ons", href: "/tours#add-ons" },
];

const WA = whatsappUrl("Hi! I'd like to book a tour.");

export function Navbar() {
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

          {/* All Tours UAE dropdown */}
          <div className="group relative">
            <Link
              href="/tours"
              className={cn(link(toursActive), "inline-flex items-center gap-1")}
            >
              All Tours UAE
              <ChevronDown className="size-4" />
            </Link>
            <div className="invisible absolute top-full left-0 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
              <div className="w-56 rounded-xl border border-midnight/10 bg-surface p-2 shadow-xl">
                {TOUR_MENU.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="block rounded-lg px-3 py-2 text-sm text-midnight/80 transition-colors hover:bg-sand hover:text-orange"
                  >
                    {t.label}
                  </Link>
                ))}
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
        <div className="border-t border-midnight/10 bg-surface lg:hidden">
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
              All Tours UAE
            </Link>
            <div className="ml-3 flex flex-col border-l border-midnight/10 pl-2">
              {TOUR_MENU.slice(1).map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm text-midnight/70 transition-colors hover:text-orange"
                >
                  {t.label}
                </Link>
              ))}
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
