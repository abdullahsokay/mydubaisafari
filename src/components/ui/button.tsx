import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-midnight shadow-sm hover:-translate-y-0.5 hover:bg-gold/90",
  secondary: "bg-navy text-surface hover:bg-navy/90",
  outline: "border border-gold text-goldink hover:bg-gold hover:text-midnight",
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
