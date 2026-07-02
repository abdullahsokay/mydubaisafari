import { cn } from "@/lib/utils";

/** Brand price block, e.g. "From AED 250 / person" (SRS §4.2.1 pricing). */
export function Price({
  amount,
  currency = "AED",
  suffix = "person",
  unit,
  regular,
  className,
}: {
  amount: number;
  currency?: string;
  /** @deprecated Use `unit` instead. Kept for backwards-compat with existing callers. */
  suffix?: string | null;
  /** Pricing unit label, e.g. "2 persons · private". Overrides suffix when provided. */
  unit?: string;
  /** Original/regular price — shown as strikethrough before the sale price. */
  regular?: number;
  className?: string;
}) {
  const displayUnit = unit ?? suffix;
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
      {displayUnit && (
        <span className="text-xs text-midnight/50">/ {displayUnit}</span>
      )}
    </div>
  );
}
