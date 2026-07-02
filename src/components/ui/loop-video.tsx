"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Non-interactive looping background video.
 * Plays only while on-screen (IntersectionObserver) so the browser never
 * throttles it into a paused state — which is what causes the play/skip
 * overlay. No `autoPlay` attribute: JS starts it muted once visible, so no
 * "click to play" overlay ever shows. A transparent shield blocks hover UI.
 */
export function LoopVideo({
  src,
  className,
  preload = "metadata",
  poster,
}: {
  src: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;

    // Under reduced-motion: do not autoplay — show first frame only
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }

    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) play();
          else v.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={ref}
        src={src}
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted
        playsInline
        preload={preload}
        poster={poster}
        tabIndex={-1}
        aria-hidden="true"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      />
      <span className="pointer-events-none absolute inset-0 z-10 block" aria-hidden="true" />
    </div>
  );
}
