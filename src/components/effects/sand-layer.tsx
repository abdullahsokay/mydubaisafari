"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  alpha: number;
};

/**
 * Ambient desert "blowing sand" effect drawn on a full-screen canvas:
 * - sand streaks drift across the screen with the wind
 * - the cursor stirs up a sand trail (stronger over [data-sand] elements, e.g. cards)
 * pointer-events-none so it never blocks interaction; disabled for reduced-motion.
 * RAF is paused when the document is hidden or the canvas is off-screen.
 */
export function SandLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const ambient: Particle[] = [];
    const trail: Particle[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Reduced ambient count: 40 (was 45/95) for better perf
    const AMBIENT = 40;
    const makeAmbient = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0.3 + Math.random() * 1.0, // wind to the right
      vy: (Math.random() - 0.5) * 0.4,
      size: 0.6 + Math.random() * 1.8,
      life: 0,
      maxLife: 0,
      alpha: 0.05 + Math.random() * 0.22,
    });
    for (let i = 0; i < AMBIENT; i++) ambient.push(makeAmbient());

    const spawnTrail = (x: number, y: number, count: number, strong: boolean) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (strong ? 1.6 : 0.7) * (0.5 + Math.random());
        trail.push({
          x,
          y,
          vx: Math.cos(a) * sp + 0.6,
          vy: Math.sin(a) * sp - 0.2,
          size: 0.8 + Math.random() * (strong ? 2.2 : 1.4),
          life: 0,
          maxLife: 36 + Math.random() * 44,
          alpha: strong ? 0.55 : 0.32,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const el = e.target as Element | null;
      const strong = !!el?.closest?.("[data-sand]");
      spawnTrail(e.clientX, e.clientY, strong ? 4 : 2, strong);
      if (trail.length > 420) trail.splice(0, trail.length - 420);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    let raf = 0;
    let running = false;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#d9b685"; // dune
      for (const p of ambient) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > w + 6) {
          p.x = -6;
          p.y = Math.random() * h;
        }
        if (p.y < -6) p.y = h + 6;
        else if (p.y > h + 6) p.y = -6;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size * 2.2, p.size * 0.7); // streak
      }

      ctx.fillStyle = "#e0c08a"; // lighter sand for the cursor trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01;
        p.vx *= 0.98;
        const t = 1 - p.life / p.maxLife;
        if (t <= 0) {
          trail.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.alpha * t;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause when page is hidden (tab switch, minimise)
    const onVisibility = () => {
      if (document.visibilityState === "hidden") stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Pause when canvas is off-screen (scrolled out of view)
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) startLoop();
          else stopLoop();
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    // Start immediately if visible
    if (document.visibilityState !== "hidden") startLoop();

    return () => {
      stopLoop();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}
