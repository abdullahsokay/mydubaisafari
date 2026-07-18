"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const INITIAL = 8;

export function WearGallery({ images }: { images: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Move focus into dialog when it opens; restore on close
  useEffect(() => {
    if (active !== null) {
      closeRef.current?.focus();
    }
  }, [active !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  const openLightbox = useCallback((i: number, btn: HTMLButtonElement | null) => {
    triggerRef.current = btn;
    setActive(i);
  }, []);

  const closeLightbox = useCallback(() => {
    setActive(null);
    // Restore focus to the trigger that opened the dialog
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    });
  }, []);

  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowRight") setActive((i) => (i! + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i! - 1 + images.length) % images.length);

      // Focus trap: keep Tab/Shift+Tab within dialog
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("disabled"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length, closeLightbox]);

  if (!images.length) return null;
  const shown = showAll ? images : images.slice(0, INITIAL);

  return (
    <section className="mt-12 rounded-2xl bg-sand p-6 sm:p-8">
      <h2 className="font-heading text-2xl font-bold text-midnight">
        What Our Guests Wore
      </h2>
      <p className="mt-2 text-midnight/65">
        Real outfits from real desert safari guests — get ideas on what to pack.
        Hover to zoom, click to view full size.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={(e) => openLightbox(i, e.currentTarget)}
            className="group aspect-square cursor-zoom-in overflow-hidden rounded-xl"
            aria-label={`View outfit photo ${i + 1}`}
          >
            <Image
              src={src}
              alt="Desert safari guest outfit"
              width={300}
              height={300}
              loading="lazy"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="h-full w-full object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-125"
            />
          </button>
        ))}
      </div>

      {images.length > INITIAL && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="rounded-full bg-midnight px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange"
          >
            {showAll ? "Show less" : `See all ${images.length} photos`}
          </button>
        </div>
      )}

      {/* Lightbox */}
      {active !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${active + 1} of ${images.length}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          onClick={closeLightbox}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close photo viewer"
            className="absolute right-5 top-5 text-white/80 hover:text-white"
            onClick={closeLightbox}
          >
            <X className="size-8" />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-3 text-white/80 hover:text-white sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i! - 1 + images.length) % images.length);
            }}
          >
            <ChevronLeft className="size-9" />
          </button>
          {/* Next-optimized (AVIF/WebP) rather than the raw original — the
              source jpgs run to ~800KB, which is a long wait on a tap. */}
          <div
            className="relative h-[88vh] w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`Desert safari guest outfit ${active + 1} of ${images.length}`}
              fill
              priority
              sizes="92vw"
              className="rounded-lg object-contain"
            />
          </div>
          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-3 text-white/80 hover:text-white sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i! + 1) % images.length);
            }}
          >
            <ChevronRight className="size-9" />
          </button>
          <span className="absolute bottom-5 text-sm text-white/70" aria-live="polite">
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
}
