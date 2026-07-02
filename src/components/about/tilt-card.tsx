"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const glare = glareRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateX = ((y - cy) / cy) * -10;
      const rotateY = ((x - cx) / cx) * 10;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)`;
        glare.style.opacity = "1";
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    const glare = glareRef.current;
    if (card) {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    if (glare) glare.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      data-sand
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative transform-gpu", className)}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
        willChange: "transform",
      }}
      aria-hidden="false"
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{ opacity: 0, transition: "opacity 0.2s ease" }}
      />
      {children}
    </div>
  );
}
