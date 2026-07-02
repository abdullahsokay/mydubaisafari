import { cn } from "@/lib/utils";

/** Surface card with hover-lift (SRS §7.6). Add `group` is built in for child hover effects. */
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sand
      className={cn(
        "group overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("p-5", className)} {...props} />;
}
