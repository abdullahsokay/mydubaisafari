import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";
import { getActivityVideos } from "@/lib/activity-videos";
import { LoopVideo } from "@/components/ui/loop-video";

export function ActivityVideos() {
  const videos = getActivityVideos();
  if (!videos.length) return null;

  return (
    <section className="bg-surface py-14 sm:py-20">
      <Container>
        <div className="mb-10 text-center">
          <Badge tone="orange">Desert Adventures</Badge>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-midnight sm:text-h2">
            See the Thrill in Action
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-midnight/65">
            Dune buggies, Land Cruiser dune bashing and camel rides across
            Dubai&rsquo;s golden dunes.
          </p>
        </div>

        <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((src) => (
            <div
              key={src}
              className="w-full max-w-xs rounded-[1.35rem] bg-linear-to-b from-gold/50 via-dune/25 to-transparent p-px shadow-luxe-lg transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="aspect-[9/16] overflow-hidden rounded-[calc(1.35rem-1px)] bg-midnight ring-1 ring-midnight/10">
                <LoopVideo src={src} className="h-full w-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/tours" className={buttonVariants({ size: "lg" })}>
            Explore Tours
          </Link>
          <a
            href={whatsappUrl("Hi! I'd like to book a desert adventure.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            WhatsApp Us
          </a>
        </div>
      </Container>
    </section>
  );
}
