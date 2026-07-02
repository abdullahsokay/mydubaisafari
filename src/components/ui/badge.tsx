import { cn } from "@/lib/utils";

type Tone = "gold" | "navy" | "orange" | "neutral";

const tones: Record<Tone, string> = {
  gold: "bg-gold/15 text-gold",
  navy: "bg-navy/10 text-navy",
  orange: "bg-orange/15 text-orange",
  neutral: "bg-sand text-midnight/70",
};

export function Badge({
  className,
  tone = "gold",
  ...props
}: React.ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
