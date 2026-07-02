import Link from "next/link";
import { Clock } from "lucide-react";
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
        <div className={`relative h-48 ${tour.gallery[0]}`}>
          {tour.tag && (
            <Badge className="absolute top-3 left-3">{tour.tag}</Badge>
          )}
        </div>
      </Link>
      <CardContent className="flex flex-1 flex-col">
        <div className="flex items-center gap-1.5 text-xs text-midnight/70">
          <Clock className="size-3.5" />
          {formatDuration(tour.durationMinutes)}
        </div>
        <Link href={href}>
          <h3 className="mt-2 line-clamp-2 font-heading text-base font-semibold text-midnight transition-colors group-hover:text-orange">
            {tour.name}
          </h3>
        </Link>
        <div className="mt-2">
          <Rating value={tour.rating} count={tour.reviewCount} />
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-midnight/5 pt-4">
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
