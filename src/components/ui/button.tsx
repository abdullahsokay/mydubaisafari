import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "ocean";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    // White on terracotta (--color-gold) is ≥4.5:1 (WCAG AA).
    "bg-gold text-white font-semibold shadow-[0_10px_24px_-10px_rgba(176,66,28,0.55)] hover:-translate-y-0.5 hover:bg-gold/90 hover:shadow-[0_14px_30px_-10px_rgba(176,66,28,0.65)] active:translate-y-0",
  secondary:
    "bg-navy text-surface shadow-[0_10px_24px_-12px_rgba(30,27,24,0.5)] hover:-translate-y-0.5 hover:bg-navy/90 active:translate-y-0",
  // Ocean blue — white text on #0077b6 for a bright, high-contrast CTA.
  ocean:
    "bg-[#0077b6] text-white font-semibold shadow-[0_10px_24px_-10px_rgba(0,119,182,0.55)] hover:-translate-y-0.5 hover:bg-[#00618f] hover:shadow-[0_14px_30px_-10px_rgba(0,119,182,0.65)] active:translate-y-0",
  outline:
    "border border-gold text-goldink hover:-translate-y-0.5 hover:bg-gold hover:text-white active:translate-y-0",
  ghost: "text-current hover:opacity-70",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

/** Returns the button class string — use on `<Link>` to style it as a button. */
export function buttonVariants({
  variant = "primary",
  size = "md",
}: { variant?: Variant; size?: Size } = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
