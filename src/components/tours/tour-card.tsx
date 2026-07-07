import Link from "next/link";
import Image from "next/image";
import { Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { Price } from "@/components/ui/price";
import { buttonVariants } from "@/components/ui/button";
import { formatDuration } from "@/lib/catalog/format";
import type { Tour } from "@/lib/catalog/types";

export function TourCard({ tour }: { tour: Tour }) {
  const href = `/tours/${tour.slug}`;
  return (
    <Card className="flex flex-col">
      <Link href={href} className="block">
        <div
          className={`dune-media relative h-52 ${tour.image ? "" : tour.gallery[0]}`}
        >
          {tour.image && (
            <Image
              src={tour.image}
              alt={tour.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="z-[1] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* Grounding scrim so overlaid chips always sit on dark glass */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-linear-to-t from-midnight/70 via-midnight/25 to-transparent" />

          {/* Gold corner accent — hairline tick, top-right */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-3 right-3 z-[2] size-7 rounded-tr-2xl border-t border-r border-palegold/80 transition-all duration-300 group-hover:border-palegold"
          />

          {/* Hover sheen sweep (transform/opacity only) */}
          <span aria-hidden className="sheen" />

          {tour.tag && (
            <Badge className="absolute top-3 left-3 z-[3] bg-midnight/45 text-palegold ring-palegold/35 backdrop-blur-md">
              {tour.tag}
            </Badge>
          )}

          {/* Rating + duration chips on dark glass */}
          <div className="absolute inset-x-3 bottom-3 z-[3] flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-midnight/45 px-2.5 py-1 text-xs font-medium text-surface ring-1 ring-surface/25 backdrop-blur-md">
              <Star className="size-3 fill-palegold text-palegold" />
              {tour.rating.toFixed(1)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-midnight/45 px-2.5 py-1 text-xs font-medium text-surface ring-1 ring-surface/25 backdrop-blur-md">
              <Clock className="size-3" />
              {formatDuration(tour.durationMinutes)}
            </span>
          </div>
        </div>
      </Link>
      <CardContent className="flex flex-1 flex-col">
        <Link href={href}>
          <h3 className="line-clamp-2 font-heading text-base font-semibold text-midnight transition-colors group-hover:text-orange">
            {tour.name}
          </h3>
        </Link>
        <div className="mt-2 mb-4">
          <Rating value={tour.rating} count={tour.reviewCount} />
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-midnight/5 pt-4">
          <Price
            amount={tour.priceAdult}
            currency={tour.currency}
            unit={tour.priceUnit}
            regular={tour.regularPrice}
          />
          <Link
            href={href}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
