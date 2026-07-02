"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // initialise synchronously so no flash — reduced-motion users see content immediately
  const [visible, setVisible] = useState(() => prefersReducedMotion());
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return; // already visible from initial state

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-out", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDuration: reduced ? "0ms" : "700ms",
        transitionDelay: reduced ? "0ms" : `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
