"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site";

export function ParallaxHero() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reducedMotion.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      if (layer1Ref.current)
        layer1Ref.current.style.transform = `translate(${dx * -12}px, ${dy * -8}px)`;
      if (layer2Ref.current)
        layer2Ref.current.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
      if (layer3Ref.current)
        layer3Ref.current.style.transform = `translate(${dx * -5}px, ${dy * -4}px)`;
    });
  }, []);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice || reducedMotion.current) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      className="relative overflow-hidden bg-midnight"
      style={{ minHeight: "100svh" }}
    >
      {/* Background: sand.jpg with dark overlay */}
      <div
        className="absolute inset-0 bg-[url('/Images/sand.jpg')] bg-cover bg-center"
        style={{ filter: "brightness(0.35)" }}
      />
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-br from-midnight/90 via-midnight/60 to-navy/80" />

      {/* Floating card 1 — top right */}
      <div
        ref={layer1Ref}
        className="animate-float pointer-events-none absolute right-8 top-28 hidden lg:block"
        style={{ transition: "transform 0.12s ease-out", willChange: "transform" }}
      >
        <div className="h-44 w-32 overflow-hidden rounded-2xl shadow-2xl ring-2 ring-gold/30" style={{ rotate: "8deg" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/sand.jpg" alt="" width={128} height={176} loading="lazy" className="h-full w-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-midnight/30 rounded-2xl" />
        </div>
      </div>

      {/* Floating card 2 — bottom left */}
      <div
        ref={layer2Ref}
        className="animate-float pointer-events-none absolute bottom-24 left-8 hidden lg:block"
        style={{
          transition: "transform 0.12s ease-out",
          willChange: "transform",
          animationDelay: "2s",
        }}
      >
        <div className="h-36 w-28 overflow-hidden rounded-2xl shadow-2xl ring-2 ring-palegold/30" style={{ rotate: "-6deg" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/sand.jpg" alt="" width={128} height={176} loading="lazy" className="h-full w-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-midnight/30 rounded-2xl" />
        </div>
      </div>

      {/* Floating card 3 — mid left */}
      <div
        ref={layer3Ref}
        className="animate-float pointer-events-none absolute left-12 top-1/2 hidden xl:block"
        style={{
          transition: "transform 0.12s ease-out",
          willChange: "transform",
          animationDelay: "3.5s",
          marginTop: "-80px",
        }}
      >
        <div className="h-28 w-24 overflow-hidden rounded-xl shadow-xl ring-2 ring-clay/30" style={{ rotate: "4deg" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/sand.jpg" alt="" width={128} height={176} loading="lazy" className="h-full w-full object-cover" aria-hidden="true" />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-40 pb-28 text-center">
        {/* Eyebrow */}
        <span className="mb-6 inline-block rounded-full bg-gold/20 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-widest text-palegold ring-1 ring-gold/30">
          Dubai&rsquo;s #1 Desert Tourism Company
        </span>

        {/* Headline */}
        <h1 className="font-heading text-4xl font-bold leading-tight text-surface sm:text-h1 lg:text-display max-w-4xl">
          We Don&rsquo;t Just Show You Dubai —{" "}
          <span
            className="text-gradient-animated bg-brand-gradient bg-clip-text text-transparent"
          >
            We Make You Feel It
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dune/90">
          From golden dunes at sunset to starlit Bedouin camps at night, MyDubaiSafarii
          crafts desert adventures that stay with you long after the sand
          leaves your shoes.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/tours"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            Explore Tours
          </Link>
          <a
            href={whatsappUrl("Hi! I'd like to know more about your tours.")}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "bg-[#1a7f40] text-white hover:bg-[#155f30]"
            )}
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Brand gradient divider */}
        <div className="mt-14 h-1 w-40 rounded-full bg-brand-gradient opacity-70" />
      </div>
    </section>
  );
}
