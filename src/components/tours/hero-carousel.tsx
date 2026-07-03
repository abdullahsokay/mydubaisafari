"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Auto-rotating hero gallery for the tour detail page.
 * Crossfades between photos every ~2.5s with a slow Ken Burns drift.
 * Pauses when off-screen, when the tab is hidden, and entirely under
 * prefers-reduced-motion (shows the first photo only). Dots allow manual
 * selection (manual choice pauses auto-advance for a few seconds).
 */
export function HeroCarousel({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // Ticks (of the 2.5s interval) to skip after a manual dot selection.
  const skipTicks = useRef(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animRaf = requestAnimationFrame(() => setAnimate(true));

    const root = rootRef.current;
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (visible = e.isIntersecting)),
      { threshold: 0.05 },
    );
    if (root) io.observe(root);

    const id = setInterval(() => {
      if (!visible || document.visibilityState === "hidden") return;
      if (skipTicks.current > 0) {
        skipTicks.current -= 1;
        return;
      }
      setActive((i) => (i + 1) % images.length);
    }, 2500);

    return () => {
      cancelAnimationFrame(animRaf);
      clearInterval(id);
      io.disconnect();
    };
  }, [images.length]);

  const pick = (i: number) => {
    skipTicks.current = 2; // let a manual choice breathe (~5s)
    setActive(i);
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl ring-1 ring-palegold/25",
        className,
      )}
    >
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== active}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
            i === active ? "opacity-100" : "opacity-0",
            animate && i === active && "kenburns",
          )}
        />
      ))}

      {/* Grounding gradient + gold corners to match the dune-media art language */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-midnight/60 via-midnight/20 to-transparent" />
      <span
        aria-hidden
        className="pointer-events-none absolute top-4 left-4 z-[2] size-8 rounded-tl-2xl border-t border-l border-palegold/70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 bottom-4 z-[2] size-8 rounded-br-2xl border-r border-b border-palegold/70"
      />

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-[3] flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Photo ${i + 1} of ${images.length}`}
              aria-pressed={i === active}
              onClick={() => pick(i)}
              className={cn(
                "h-2 rounded-full ring-1 ring-midnight/20 transition-all duration-300",
                i === active
                  ? "w-6 bg-palegold"
                  : "w-2 bg-surface/70 hover:bg-surface",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
