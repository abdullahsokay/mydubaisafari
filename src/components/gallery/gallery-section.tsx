import { getGalleryImages } from "@/lib/gallery";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import GalleryMarquee from "./gallery-marquee";

export default function GallerySection() {
  // Cap at 24 images to limit DOM node count (duplicated in marquee = 48 total per row)
  const images = getGalleryImages().slice(0, 24);
  if (!images.length) return null;
  return (
    <section className="relative bg-midnight py-14 sm:py-20">
      {/* Warm ember glow rising from the base of the dark section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(80%_100%_at_50%_100%,rgba(164,91,47,0.28),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-palegold/40 to-transparent" />
      <Container className="relative">
        <div className="mb-10 text-center">
          <Badge className="border border-palegold/35 bg-midnight/40 text-palegold ring-palegold/25">
            Our Adventures
          </Badge>
          <h2 className="mt-4 mb-3 font-heading text-3xl tracking-tight text-surface sm:text-h2">
            Moments from the Desert
          </h2>
          <p className="mx-auto max-w-xl text-surface/70">
            Real photos from our guests&apos; unforgettable Dubai safari
            experiences.
          </p>
        </div>
      </Container>
      {/* Full-bleed marquee */}
      <GalleryMarquee images={images} />
    </section>
  );
}
