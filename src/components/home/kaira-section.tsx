"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { whatsappUrl } from "@/lib/site";

/**
 * "Meet Kaira" — the kaira.glb photogrammetry point cloud rendered as a live
 * 3D hologram (742k points, 8.9MB web build of the original 89MB scan).
 * three.js is dynamically imported and the model fetched only when the
 * section scrolls near the viewport; the render loop pauses off-screen and
 * under prefers-reduced-motion a single static frame is drawn.
 */
export function KairaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cleanup: (() => void) | null = null;
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started) return;
        started = true;
        io.disconnect();
        setStatus("loading");
        init()
          .then((dispose) => {
            cleanup = dispose;
            setStatus("ready");
          })
          .catch(() => setStatus("error"));
      },
      { rootMargin: "400px" },
    );
    io.observe(section);

    async function init() {
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/addons/loaders/GLTFLoader.js"
      );

      const mount = mountRef.current;
      if (!mount) throw new Error("no mount");

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
      camera.position.set(0, 0.62, 2.1);
      camera.lookAt(0, 0.55, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const gltf = await new GLTFLoader().loadAsync(
        "/Images/kaira-web.glb",
      );
      const material = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.0065,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      gltf.scene.traverse((obj) => {
        if ((obj as { isPoints?: boolean }).isPoints) {
          (obj as unknown as { material: unknown }).material = material;
        }
      });
      // Center the scan on the turntable axis
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf.scene.position.x -= center.x;
      gltf.scene.position.z -= center.z;
      group.add(gltf.scene);

      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      let raf = 0;
      let running = false;
      let t = 0;
      const frame = () => {
        t += 0.016;
        group.rotation.y = t * 0.35; // slow turntable
        group.position.y = Math.sin(t * 0.9) * 0.02; // gentle hover bob
        material.size = 0.0065 + Math.sin(t * 2.2) * 0.0007; // point shimmer
        renderer.render(scene, camera);
        if (running) raf = requestAnimationFrame(frame);
      };

      const start = () => {
        if (!running && !reduceMotion) {
          running = true;
          raf = requestAnimationFrame(frame);
        }
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      if (reduceMotion) {
        group.rotation.y = 0.6;
        renderer.render(scene, camera);
      } else {
        start();
      }

      const onVisibility = () =>
        document.visibilityState === "hidden" ? stop() : start();
      document.addEventListener("visibilitychange", onVisibility);

      const viewIo = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => (e.isIntersecting ? start() : stop())),
        { threshold: 0 },
      );
      viewIo.observe(mount);

      return () => {
        stop();
        viewIo.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("resize", resize);
        material.dispose();
        gltf.scene.traverse((obj) => {
          const geo = (obj as { geometry?: { dispose(): void } }).geometry;
          geo?.dispose();
        });
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      };
    }

    return () => {
      io.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-midnight py-14 sm:py-20"
    >
      {/* Ember glow behind the hologram */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(60%_100%_at_35%_100%,rgba(164,91,47,0.3),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-palegold/40 to-transparent" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* 3D stage */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-palegold/20 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(250,231,172,0.08),transparent_70%)]"
              aria-hidden
            />
            <div
              ref={mountRef}
              className="absolute inset-0"
              role="img"
              aria-label="Rotating 3D hologram of Kaira, the MyDubaiSafarii desert guide"
            />
            {status !== "ready" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-palegold/80">
                  {status === "error"
                    ? "Kaira is resting — try refreshing."
                    : "Summoning Kaira…"}
                </p>
              </div>
            )}
            {/* Base glow disc */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-6 left-1/2 h-4 w-2/3 -translate-x-1/2 rounded-full bg-palegold/20 blur-xl"
            />
          </div>

          {/* Copy */}
          <div className="text-center lg:text-left">
            <Badge className="border border-palegold/35 bg-midnight/40 text-palegold ring-palegold/25">
              Meet Kaira
            </Badge>
            <h2 className="mt-4 font-heading text-3xl tracking-tight text-surface sm:text-h2">
              Your Desert Guide,{" "}
              <span className="bg-linear-to-r from-palegold via-dune to-palegold bg-clip-text text-transparent">
                In Living 3D
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-surface/75 lg:mx-0">
              Say hello to Kaira — the face of MyDubaiSafarii. Soon she&apos;ll
              answer your questions right here on the site. Until then, her
              human team is one tap away on WhatsApp.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
              <a
                href={whatsappUrl("Hi Kaira! I'd like help planning a desert safari.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1a7f40] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#155f30]"
              >
                Ask on WhatsApp
              </a>
              <span className="text-xs text-surface/50">
                AI chat — coming soon
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
