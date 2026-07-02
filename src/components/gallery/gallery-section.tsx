import { getGalleryImages } from "@/lib/gallery";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import GalleryMarquee from "./gallery-marquee";

export default function GallerySection() {
  // Cap at 24 images to limit DOM node count (duplicated in marquee = 48 total per row)
  const images = getGalleryImages().slice(0, 24);
  if (!images.length) return null;
  return (
    <section className="bg-midnight py-14 sm:py-20">
      <Container>
        <div className="mb-10 text-center">
          <Badge>Our Adventures</Badge>
          <h2 className="mt-4 mb-3 font-heading text-3xl text-surface sm:text-h2">
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
