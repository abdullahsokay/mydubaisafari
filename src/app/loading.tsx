import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="bg-sand pt-24 pb-20 flex flex-1 items-center">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          {/* Animated dune-inspired pulse */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="block size-3 rounded-full bg-gold"
                style={{
                  animation: `pulse 1.2s ease-in-out ${delay}ms infinite`,
                }}
              />
            ))}
          </div>
          <p className="font-heading text-lg font-semibold text-midnight">
            MyDubai<span className="text-gold">Safari</span>
          </p>
          <p className="mt-2 text-sm text-midnight/50">Loading your experience…</p>
        </div>
      </Container>
    </div>
  );
}
