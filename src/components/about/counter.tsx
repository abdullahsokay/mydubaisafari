"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Counter({ value, suffix = "", decimals = 0 }: CounterProps) {
  const reduced = prefersReducedMotion();
  const [display, setDisplay] = useState(() =>
    reduced ? value.toFixed(decimals) : "0"
  );
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started, reduced]);

  useEffect(() => {
    if (!started) return;
    const duration = 1600;
    const startTime = performance.now();

    let raf: number;
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = easeOut(progress) * value;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
