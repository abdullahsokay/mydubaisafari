import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Read-only star rating with optional review count (SRS §4.2.1). */
export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  const rounded = Math.round(value);
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < rounded
                ? "fill-gold text-gold"
                : "fill-none text-midnight/25",
            )}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-midnight/80">
        {value.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className="text-sm text-midnight/40">({count})</span>
      )}
      <span className="sr-only">
        Rated {value.toFixed(1)} out of 5
        {count !== undefined ? ` from ${count} reviews` : ""}
      </span>
    </div>
  );
}
