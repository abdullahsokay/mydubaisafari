/** Human-readable tour duration, e.g. 360 -> "6 hours", 90 -> "1h 30m". */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h} hour${h > 1 ? "s" : ""}`;
  return `${h}h ${m}m`;
}

/** Format a price with its currency, e.g. (150, "AED") -> "AED 150". */
export function formatPrice(amount: number, currency = "AED"): string {
  return `${currency} ${amount.toLocaleString("en-US")}`;
}
