"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax + fade (gives the "feel" of scrolling).
  // Writes transform/opacity straight to the DOM node inside RAF — no
  // setState, so scrolling never re-renders the React tree.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const progress = Math.min(
          window.scrollY / Math.max(window.innerHeight, 1),
          1,
        );
        el.style.transform = `translateY(${progress * -80}px)`;
        el.style.opacity = String(1 - progress * 1.15);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 flex flex-col items-center [text-shadow:0_2px_18px_rgba(10,5,0,0.6)]"
    >
      <Badge className="animate-rise rise-1 border border-palegold/40 bg-midnight/30 text-palegold ring-palegold/30 backdrop-blur-md">
        Dubai &middot; Desert Adventures
      </Badge>

      {/* Solid palegold (not gradient text): keeps the dark text-shadow so
          the accent words stay readable over the bright dune footage. */}
      <h1 className="animate-rise rise-2 mt-6 max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-h1 lg:text-display">
        Where Golden Dunes Meet{" "}
        <span className="text-palegold">Endless Adventure</span>
      </h1>

      <p className="animate-rise rise-3 mt-5 max-w-2xl text-base text-surface/85 sm:text-lg">
        Blast across the Arabian dunes at golden hour, ride a camel at sunset,
        dine under a Bedouin tent, and stargaze by the fire. MyDubaiSafari
        crafts unforgettable desert adventures — dune bashing, quad biking,
        overnight camping and authentic BBQ nights beneath a sky full of stars.
        Every experience is handpicked, safe, and built for those who crave the
        real Arabia.
      </p>

      <div className="animate-rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/tours" className={buttonVariants({ variant: "ocean", size: "lg" })}>
          Explore Tours
        </Link>
        <Link
          href="/tours?category=with-camp"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "border-palegold/60 text-surface backdrop-blur-sm hover:border-gold",
          )}
        >
          Desert Safari
        </Link>
      </div>

      <div className="animate-rise rise-4 mt-10 flex items-center gap-3">
        <span className="h-px w-14 bg-linear-to-r from-transparent to-palegold/70" />
        <span className="h-1.5 w-1.5 rotate-45 bg-palegold" />
        <span className="h-px w-14 bg-linear-to-l from-transparent to-palegold/70" />
      </div>
    </div>
  );
}
