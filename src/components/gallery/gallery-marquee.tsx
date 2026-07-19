import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Auto-scrolling photo marquee. The source images are small (206x206 IG
 * thumbnails), so we render them near native size in a moving strip — this
 * keeps them SHARP instead of upscaling a tiny image to full width (which
 * looked blurry). Pure CSS animation; pauses on hover. Swap back to the
 * large slideshow once high-resolution photos are available.
 *
 * Deliberately NO blur placeholder: the strip renders 192 nodes, and inlining
 * a base64 blur into each cost ~25KB of render-blocking HTML to smooth in
 * decorative below-fold thumbnails that are already lazy-loaded. Bad trade.
 */
function Row({ images, reverse }: { images: string[]; reverse?: boolean }) {
  const items = [...images, ...images]; // duplicated for a seamless loop
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
      <div
        className={cn(
          "flex w-max shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className="size-40 shrink-0 overflow-hidden rounded-xl ring-1 ring-surface/10 sm:size-48"
          >
            <Image
              src={src}
              alt="MyDubaiSafari guest photo"
              width={192}
              height={192}
              loading="lazy"
              sizes="192px"
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GalleryMarquee({ images }: { images: string[] }) {
  if (!images.length) return null;
  const row2 = [...images].reverse();
  return (
    <div className="flex flex-col gap-4">
      <Row images={images} />
      <Row images={row2} reverse />
    </div>
  );
}
