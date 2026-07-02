import { cn } from "@/lib/utils";

type Tone = "gold" | "navy" | "orange" | "neutral";

const tones: Record<Tone, string> = {
  gold: "bg-gold/15 text-gold ring-gold/30",
  navy: "bg-navy/10 text-navy ring-navy/25",
  orange: "bg-orange/15 text-orange ring-orange/25",
  neutral: "bg-sand text-midnight/70 ring-midnight/10",
};

export function Badge({
  className,
  tone = "gold",
  ...props
}: React.ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-[0.14em] uppercase ring-1 ring-inset",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
