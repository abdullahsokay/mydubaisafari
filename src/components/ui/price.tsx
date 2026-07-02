import { cn } from "@/lib/utils";

/** Brand price block, e.g. "From AED 250 / person" (SRS §4.2.1 pricing). */
export function Price({
  amount,
  currency = "AED",
  unit = "person",
  regular,
  className,
}: {
  amount: number;
  currency?: string;
  /** Pricing unit label, e.g. "2 persons · private". Defaults to "person". */
  unit?: string;
  /** Original/regular price — shown as strikethrough before the sale price. */
  regular?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5", className)}>
      {regular !== undefined && (
        <span className="text-xs text-midnight/40 line-through">
          {currency} {regular.toLocaleString("en-US")}
        </span>
      )}
      <span className="text-xs text-midnight/50">From</span>
      <span className="font-heading text-xl font-semibold text-midnight">
        {currency} {amount.toLocaleString("en-US")}
      </span>
      {unit && (
        <span className="text-xs text-midnight/50">/ {unit}</span>
      )}
    </div>
  );
}
