"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export function HeroContent() {
  const [progress, setProgress] = useState(0); // 0..1 scroll through hero

  // Scroll-linked parallax + fade (gives the "feel" of scrolling)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setProgress(
          Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1),
        ),
      );
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
      className="relative z-10 flex flex-col items-center [text-shadow:0_2px_18px_rgba(10,5,0,0.6)]"
      style={{
        transform: `translateY(${progress * -80}px)`,
        opacity: 1 - progress * 1.15,
      }}
    >
      <Badge>Dubai &middot; Desert Adventures</Badge>

      <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-tight sm:text-h1 lg:text-display">
        Where Golden Dunes Meet Endless Adventure
      </h1>

      <p className="mt-5 max-w-2xl text-base text-surface/85 sm:text-lg">
        Blast across the Arabian dunes at golden hour, ride a camel at sunset,
        dine under a Bedouin tent, and stargaze by the fire. MyDubaiSafarii
        crafts unforgettable desert adventures — dune bashing, quad biking,
        overnight camping and authentic BBQ nights beneath a sky full of stars.
        Every experience is handpicked, safe, and built for those who crave the
        real Arabia.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/tours" className={buttonVariants({ size: "lg" })}>
          Explore Tours
        </Link>
        <Link
          href="/tours?category=desert-safari"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Desert Safari
        </Link>
      </div>

      <div className="mt-10 h-1 w-40 rounded-full bg-brand-gradient" />
    </div>
  );
}
